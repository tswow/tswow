#include <algorithm>
#include <map>
#include <set>
#include <stdexcept>
#include <cmath>
#include <sstream>
#include "Png2Blp.h"
#include "PngReader.h"
#include "BinaryWriter.h"
#include "MipMapGenerator.h"
#include "Quantizer.h"
#include <png.hpp>


extern "C" {
#include <txc_dxtn.h>
}


Png2Blp::Png2Blp() {
}

void* Png2Blp::createBlpPalettedInMemory(bool generateMipMaps, uint8_t alphaDepth, uint8_t minQuality,
                                                        uint8_t maxQuality, uint32_t& fileSize) {
    std::vector<uint32_t> palette;
    std::vector<uint8_t> indices;
    Quantizer().quantize(mColors, mWidth, mHeight, minQuality, maxQuality, indices, palette);
    std::vector<uint32_t> reconstructedImage(mWidth * mHeight);
    for (uint32_t i = 0u; i < mWidth * mHeight; ++i) {
        reconstructedImage[i] = (palette[indices[i]] & 0x00FFFFFF) | (mColors[i] & 0xFF000000);
    }

    std::vector<std::vector<uint32_t> > layerData = std::vector<std::vector<uint32_t> >();
    if (generateMipMaps) {
        layerData = MipMapGenerator()(reconstructedImage, mWidth, mHeight);
    } else {
        layerData.push_back(reconstructedImage);
    }

    std::vector<std::vector<uint8_t> > layerIndices(layerData.size());
    layerIndices[0] = indices;

    for (uint32_t i = 1u; i < layerData.size(); ++i) {
        uint32_t w = std::max(mWidth >> i, 1u);
        uint32_t h = std::max(mHeight >> i, 1u);
        quantizeLayer(layerData[i], w, h, minQuality, maxQuality,
                      palette,
                      layerIndices[i]);
    }

    BinaryWriter writer;
    writePaletteBlp(writer, palette, layerData, layerIndices, alphaDepth);
    return writer.getData(fileSize);
}

void Png2Blp::quantizeLayer(std::vector<uint32_t> &layerData, uint32_t width, uint32_t height, uint8_t minQuality,
                            uint8_t maxQuality, std::vector<uint32_t> &palette, std::vector<uint8_t> &layerIndices) {
    std::vector<uint32_t> layerPalette;
    std::vector<uint8_t> indices;
    Quantizer().quantize(layerData, width, height, minQuality, maxQuality, indices, layerPalette);
    layerIndices = unionizePalette(palette, layerPalette, indices);
}

std::vector<uint8_t> Png2Blp::unionizePalette(std::vector<uint32_t> &destPalette,
                                              const std::vector<uint32_t> &srcPalette,
                                              const std::vector<uint8_t> &srcIndices) {
    std::vector<uint8_t> destIndices;
    std::map<uint32_t, uint8_t> lookupMap;
    for (uint32_t i = 0; i < srcIndices.size(); ++i) {
        uint32_t curColor = srcPalette[srcIndices[i]];
        std::map<uint32_t, uint8_t>::iterator existing = lookupMap.find(curColor & 0x00FFFFFF);
        if (existing != lookupMap.end()) {
            destIndices.push_back(existing->second);
            continue;
        }

        std::pair<uint32_t, uint8_t> closestColor;
        float minDiff = 256.0f;
        bool exactMatch = false;
        for (uint32_t j = 0; j < destPalette.size(); ++j) {
            const uint32_t &paletteColor = destPalette[j];
            if (paletteColor == curColor) {
                lookupMap.insert(std::make_pair(curColor & 0x00FFFFFF, j));
                destIndices.push_back(static_cast<uint8_t>(j));
                exactMatch = true;
                break;
            }

            int32_t pr = paletteColor & 0xFF;
            int32_t pg = (paletteColor >> 8) & 0xFF;
            int32_t pb = (paletteColor >> 16) & 0xFF;

            uint32_t dr = static_cast<uint32_t>(std::abs((int) (pr - (curColor & 0xFF))));
            uint32_t dg = static_cast<uint32_t>(std::abs((int) (pg - ((curColor >> 8) & 0xFF))));
            uint32_t db = static_cast<uint32_t>(std::abs((int) (pb - ((curColor >> 16) & 0xFF))));
            float totalDiff = (dr + dg + db) / 3.0f;
            if (totalDiff < minDiff) {
                minDiff = totalDiff;
                closestColor = std::pair<uint32_t, uint8_t>(paletteColor & 0x00FFFFFF, static_cast<const uint8_t &>(j));
            }
        }

        if (exactMatch) {
            continue;
        }

        if (minDiff < 12.0f || destPalette.size() >= 256) {
            lookupMap.insert(closestColor);
            lookupMap.insert(std::make_pair(curColor & 0x00FFFFFF, closestColor.second));
            destIndices.push_back(closestColor.second);
            continue;
        }

        uint8_t newIndex = static_cast<uint8_t>(destPalette.size());
        destPalette.push_back(curColor);
        destIndices.push_back(newIndex);
    }

    return destIndices;
}

void Png2Blp::writePaletteBlp(BinaryWriter &writer, std::vector<uint32_t> &palette,
                              const std::vector<std::vector<uint32_t> > &layerData,
                              const std::vector<std::vector<uint8_t> > &indices,
                              uint32_t alphaDepth) {
    writer << uint32_t(0x32504C42) << uint32_t(1) << uint8_t(1) << uint8_t(alphaDepth)
           << uint8_t(8) << uint8_t(indices.size()) << mWidth << mHeight;
    std::vector<std::vector<uint8_t> > alphaData = createAlphaOfBits(layerData, alphaDepth);

    uint32_t offset = 20 + 32 * 4 + 256 * 4;
    for (uint32_t i = 0u; i < 16u; ++i) {
        if (i >= indices.size()) {
            writer << uint32_t(0);
        } else {
            writer << offset;
            offset += indices[i].size() + alphaData[i].size();
        }
    }

    for (uint32_t i = 0u; i < 16u; ++i) {
        if (i >= indices.size()) {
            writer << uint32_t(0);
        } else {
            writer << uint32_t(indices[i].size() + alphaData[i].size());
        }
    }

    if (palette.size() != 256) {
        palette.resize(256);
    }
    for (uint32_t i = 0u; i < 256u; ++i) {
        uint32_t &color = palette[i];
        uint8_t r = static_cast<uint8_t>(color & 0xFF);
        uint8_t g = static_cast<uint8_t>(((color & 0x00FF0000) >> 16) & 0xFF);
        color = (color & 0xFF00FF00) | (r << 16) | g;
    }

    writer.writeArray(palette);

    for (uint32_t i = 0u; i < indices.size(); ++i) {
        writer.writeArray(indices[i]);
        writer.writeArray(alphaData[i]);
    }
}

std::vector<std::vector<uint8_t> > Png2Blp::createAlphaOfBits(const std::vector<std::vector<uint32_t> > &layerData,
                                                              uint32_t alphaDepth) {
    std::vector<std::vector<uint8_t> > alphaData;
    if (alphaDepth == 8) {
        for (uint32_t i = 0; i < layerData.size(); ++i) {
            std::vector<uint8_t> alpha;
            for (uint32_t j = 0; j < layerData[i].size(); ++j) {
                alpha.push_back(static_cast<uint8_t>(layerData[i][j] >> 24));
            }
            alphaData.push_back(alpha);
        }
    } else if (alphaDepth == 4) {
        for (uint32_t i = 0; i < layerData.size(); ++i) {
            std::vector<uint8_t> alpha;
            for (uint32_t j = 0; j < layerData[i].size(); j += 2) {
                uint8_t alpha0 = static_cast<uint8_t>(layerData[i][j] >> 24);
                uint8_t alpha1 = static_cast<uint8_t>(layerData[i][j + 1] >> 24);
                alpha0 = static_cast<uint8_t>((alpha0 / 255.0f) * 15.0f);
                alpha1 = static_cast<uint8_t>((alpha1 / 255.0f) * 15.0f);
                alpha.push_back(alpha0 | (alpha1 << 4));
            }

            if (layerData[i].size() % 2) {
                uint8_t alpha0 = static_cast<uint8_t>(layerData[i][layerData[i].size() - 1] >> 24);
                alpha.push_back(alpha0);
            }

            alphaData.push_back(alpha);
        }

    } else if (alphaDepth == 1) {
        for (uint32_t i = 0; i < layerData.size(); ++i) {
            std::vector<uint8_t> alpha;
            for (uint32_t j = 0; j < layerData[i].size(); j += 8) {
                uint8_t alphaValue = 0;
                for (uint32_t k = 0; k < 8; ++k) {
                    alphaValue |= (layerData[i][j + k] >> 24) > 0x7F ? (1 << k) : 0;
                }
                alpha.push_back(alphaValue);
            }

            if (layerData[i].size() % 8) {
                uint8_t alphaValue = 0;
                uint32_t startOffset = static_cast<uint32_t>(layerData[i].size() - (layerData[i].size() % 8));
                for (uint32_t k = 0; k < layerData[i].size() % 8; ++k) {
                    alphaValue |= (layerData[i][startOffset + k] >> 24) > 0x7F ? (1 << k) : 0;
                }
                alpha.push_back(alphaValue);
            }

            alphaData.push_back(alpha);
        }
    } else {
        throw std::runtime_error("Alpha depth must be 1, 4 or 8");
    }

    return alphaData;
}

void* Png2Blp::createBlpUncompressedInMemory(bool generateMipMaps, uint32_t &fileSize) {
    std::vector<std::vector<uint32_t> > layerData = std::vector<std::vector<uint32_t> >();
    if (generateMipMaps) {
        layerData = MipMapGenerator()(mColors, mWidth, mHeight);
    } else {
        layerData.push_back(mColors);
    }

    BinaryWriter writer;
    writer << uint32_t(0x32504C42) << uint32_t(1) << uint8_t(3) << uint8_t(8)
           << uint8_t(8) << uint8_t(layerData.size()) << mWidth << mHeight;

    uint32_t offset = 20 + 32 * 4 + 256 * 4;
    std::vector<uint32_t> offsets(16);
    std::vector<uint32_t> sizes(16);
    for (uint32_t i = 0; i < layerData.size(); ++i) {
        sizes[i] = static_cast<uint32_t>(layerData[i].size());
        offsets[i] = offset;
        offset += layerData[i].size();

    }

    writer.writeArray(offsets);
    writer.writeArray(sizes);
    writer.writeArray(std::vector<uint32_t>(256));

    for (uint32_t i = 0; i < layerData.size(); ++i) {
        writer.writeArray(layerData[i]);
    }

    return writer.getData(fileSize);
}

void* Png2Blp::createBlpDxtInMemory(bool generateMipMaps, int dxtFormat, uint32_t& fileSize) {
    std::vector<std::vector<uint32_t> > layerData = std::vector<std::vector<uint32_t> >();
    if (generateMipMaps) {
        layerData = MipMapGenerator()(mColors, mWidth, mHeight);
    } else {
        layerData.push_back(mColors);
    }

    std::vector<std::vector<uint8_t> > dxtData = createDxtCompression(layerData, static_cast<uint32_t>(dxtFormat));
    BinaryWriter writer;
    writer << uint32_t(0x32504C42) << uint32_t(1) << uint8_t(2) << uint8_t(0)
           << uint8_t(dxtFormatToBlpFormat(static_cast<uint32_t>(dxtFormat)))
           << uint8_t(layerData.size()) << mWidth << mHeight;

    uint32_t offset = 20 + 32 * 4 + 256 * 4;
    std::vector<uint32_t> offsets(16);
    std::vector<uint32_t> sizes(16);
    for (uint32_t i = 0; i < dxtData.size(); ++i) {
        sizes[i] = static_cast<uint32_t>(dxtData[i].size());
        offsets[i] = offset;
        offset += dxtData[i].size();

    }

    writer.writeArray(offsets);
    writer.writeArray(sizes);
    writer.writeArray(std::vector<uint32_t>(256));

    for (uint32_t i = 0; i < dxtData.size(); ++i) {
        writer.writeArray(dxtData[i]);
    }

    return writer.getData(fileSize);
}

std::vector<std::vector<uint8_t> > Png2Blp::createDxtCompression(const std::vector<std::vector<uint32_t> > &layerData,
                                                                 uint32_t dxtFormat) {
    std::vector<std::vector<uint8_t> > dxtData(layerData.size());
    for (uint32_t i = 0; i < layerData.size(); ++i) {
        uint32_t w = std::max(mWidth >> i, 1u);
        uint32_t h = std::max(mHeight >> i, 1u);

        uint32_t blockSize = dxtFormat == FORMAT_DXT1 ? 8 : 16;

        dxtData[i].resize(blockSize * ((w + 3) / 4) * ((h + 3) / 4));

        uint32_t format;
        switch (dxtFormat) {
            case FORMAT_DXT1: {
                format = GL_COMPRESSED_RGBA_S3TC_DXT1_EXT;
                break;
            }

            case FORMAT_DXT3: {
                format = GL_COMPRESSED_RGBA_S3TC_DXT3_EXT;
                break;
            }

            case FORMAT_DXT5: {
                format = GL_COMPRESSED_RGBA_S3TC_DXT5_EXT;
                break;
            }

            default: {
                throw std::runtime_error("DXT format must be FORMAT_DXT1, FORMAT_DXT3 or FORMAT_DXT5");
            }
        }

        tx_compress_dxtn(4, w, h, (const uint8_t *) layerData[i].data(), format, dxtData[i].data(), 0);
    }

    return dxtData;
}

uint32_t Png2Blp::dxtFormatToBlpFormat(uint32_t dxtFormat) {
    switch (dxtFormat) {
        case FORMAT_DXT1:
            return 0;
        case FORMAT_DXT3:
            return 1;
        case FORMAT_DXT5:
            return 7;
        default:
            throw std::runtime_error("DXT format must be FORMAT_DXT1, FORMAT_DXT3 or FORMAT_DXT5");
    }
}

void Png2Blp::load(const void* rawData, uint32_t pngSize) {
    std::vector<uint8_t> pngData(pngSize);
    memcpy(pngData.data(), rawData, pngSize);
    mColors = PngReader()(pngData, pngSize, mWidth, mHeight);
}

