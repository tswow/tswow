#include <string>
#include <iostream>
#include <sstream>
#include <fstream>
#include <algorithm>
#ifdef _WIN32
#include <direct.h>
#endif
#include <sys/stat.h>
#include <image.hpp>
#include "BlpConvert.h"
#include "BlpConvertException.h"

namespace python_blp {
    namespace _detail {
#ifdef _WIN32
        static const char separator = '/';
#else
        static const char separator = '/';
#endif

        static const uint32_t alphaLookup1[] = {0x00, 0xFF};
        static const uint32_t alphaLookup4[] = {0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB,
                                               0xCC, 0xDD, 0xEE, 0xFF};

        static void rgb565ToRgb8Array(const uint32_t& input, uint8_t* output) {
            uint32_t r = (uint32_t) (input & 0x1Fu);
            uint32_t g = (uint32_t) ((input >> 5u) & 0x3Fu);
            uint32_t b = (uint32_t) ((input >> 11u) & 0x1Fu);

            r = (r << 3u) | (r >> 2u);
            g = (g << 2u) | (g >> 4u);
            b = (b << 3u) | (b >> 2u);

            output[0] = (uint8_t) b;
            output[1] = (uint8_t) g;
            output[2] = (uint8_t) r;
        }
    }

    void BlpConvert::convert(unsigned char *inputFile, std::size_t fileSize, const char *inputFileName,
                             const char *outputPath) const {
        std::string basePath = outputPath;
        handleFile(inputFile, fileSize, inputFileName, basePath);
    }

    void BlpConvert::handleFile(unsigned char *buffer, std::size_t size, const char *fileName,
                                const std::string &basePath) const {
        using _detail::separator;

        bool hasEndSlash = basePath.rfind(separator) == basePath.length() - 1;
        std::stringstream pathStream;
        pathStream << basePath;
        if(!hasEndSlash) {
            pathStream << separator;
        }
        pathStream << std::string(fileName);
        std::string filePath = changeExtension(pathStream.str());
        {
            std::ofstream os(filePath.c_str(), std::ios::binary);
            if(!os) {
                createDirectories(filePath);
            }
        }

        ByteStream stream(buffer, size);
        BlpHeader header = stream.read<BlpHeader>();
        png::image<png::rgba_pixel> outImage(header.width, header.height);
        loadFirstLayer(header, stream, outImage);
        outImage.write(filePath);
    }

    void
    BlpConvert::loadFirstLayer(const BlpHeader &header, ByteStream &data, png::image<png::rgba_pixel> &image) const {
        Format format = getFormat(header);
        if (format == UNKNOWN) {
            throw BlpConvertException("Unable to determine format");
        }

        uint32_t size = header.sizes[0];
        uint32_t offset = header.offsets[0];
        data.setPosition(offset);

        switch (format) {
            case RGB:
                parseUncompressed(data, image);
                break;

            case RGB_PALETTE:
                parseUncompressedPalette(header.alphaDepth, data, size, image);
                break;

            case DXT1:
            case DXT2:
            case DXT3:
                parseCompressed(format, data, image);
                break;

            default:
                throw BlpConvertException("Unsupported format of BLP");
        }
    }

    Format BlpConvert::getFormat(const BlpHeader &header) const {
        switch (header.compression) {
            case 1:
                return RGB_PALETTE;
            case 2: {
                switch (header.alphaCompression) {
                    case 0:
                        return DXT1;
                    case 1:
                        return DXT2;
                    case 7:
                        return DXT3;
                    default:
                        return UNKNOWN;
                }
            }
            case 3:
                return RGB;
            default:
                return UNKNOWN;
        }
    }

    void BlpConvert::parseUncompressed(ByteStream &data, png::image<png::rgba_pixel> &image) const {
        uint32_t rowPitch = image.get_width();
        uint32_t numRows = image.get_height();
        uint32_t size = rowPitch * numRows;

        std::vector<uint32_t> pixels(size);
        data.read(pixels.data(), pixels.size() * sizeof(uint32_t));

        for (uint32_t i = 0u; i < numRows; ++i) {
            png::image<png::rgba_pixel>::row_type &row = image[i];
            memcpy(row.data(), pixels.data() + i * rowPitch, rowPitch);
        }
    }

    void BlpConvert::parseUncompressedPalette(const uint8_t& alphaDepth, ByteStream &data, std::size_t size, png::image<png::rgba_pixel> &image) const {
        uint32_t palette[256] = { 0 };
        uint64_t curPosition = (uint64_t) data.getPosition();
        data.setPosition(sizeof(BlpHeader));
        data.read(palette, sizeof(palette));
        data.setPosition(curPosition);

        std::vector<uint8_t> indices(size);
        data.read(indices.data(), size);

        if(alphaDepth == 8) {
            decompressPaletteFastPath(palette, indices, image);
        } else {
            decompressPaletteARGB8(alphaDepth, palette, indices, image);
        }
    }

    void BlpConvert::decompressPaletteFastPath(const uint32_t *const palette, const std::vector<uint8_t> &indices,
                                               png::image<png::rgba_pixel> &image) const {
        uint32_t w = image.get_width();
        uint32_t h = image.get_height();

        png::image<png::rgba_pixel>::pixbuf& buf = image.get_pixbuf();
        std::vector<uint32_t> rowBuffer(w);

        uint32_t numEntries = w * h;
        uint32_t counter = 0u;

        for(uint32_t y = 0u; y < h; ++y) {
            for(uint32_t x = 0u; x < w; ++x) {
                uint8_t index = indices[counter];
                uint8_t alpha = indices[numEntries + counter];
                uint32_t color = palette[index];
                color = (color & 0x00FFFFFFu) | (((uint32_t) alpha) << 24u);
                rowBuffer[x] = color;
                ++counter;
            }

            png::image<png::rgba_pixel>::row_type& row = buf.get_row(y);
            memcpy(row.data(), rowBuffer.data(), rowBuffer.size() * sizeof(uint32_t));
        }
    }

    void BlpConvert::decompressPaletteARGB8(const uint8_t &alphaDepth, uint32_t *const palette,
                                            const std::vector<uint8_t> &indices,
                                            png::image<png::rgba_pixel> &image) const {
        uint32_t w = image.get_width();
        uint32_t h = image.get_height();
        uint32_t numEntries = w * h;

        png::image<png::rgba_pixel>::pixbuf& buf = image.get_pixbuf();
        std::vector<uint32_t> colorBuffer(numEntries);
        for(uint32_t i = 0u; i < numEntries; ++i) {
            uint8_t index = indices[i];
            uint32_t color = palette[index];
            color = (color & 0x00FFFFFFu) | 0xFF000000u;
            colorBuffer[i] = color;
        }

        switch(alphaDepth) {
            case 0:
                break;

            case 1: {
                uint32_t colorIndex = 0u;
                for(uint32_t i = 0u; i < (numEntries / 8u); ++i) {
                    uint8_t value = indices[i + numEntries];
                    for(uint32_t j = 0u; j < 8; ++j, ++colorIndex) {
                        uint32_t& color = colorBuffer[colorIndex];
                        color &= 0x00FFFFFF;
                        color |= _detail::alphaLookup1[(((value & (1u << j))) != 0) ? 1 : 0] << 24u;
                    }
                }

                if((numEntries % 8) != 0) {
                    uint8_t value = indices[numEntries + numEntries / 8];
                    for(uint32_t j = 0u; j < (numEntries % 8); ++j, ++colorIndex) {
                        uint32_t& color = colorBuffer[colorIndex];
                        color &= 0x00FFFFFF;
                        color |= _detail::alphaLookup1[(((value & (1u << j))) != 0) ? 1 : 0] << 24u;
                    }
                }

                break;
            }

            case 4: {
                uint32_t colorIndex = 0u;
                for(uint32_t i = 0u; i < (numEntries / 2u); ++i) {
                    uint8_t value = indices[i + numEntries];
                    uint8_t alpha0 = _detail::alphaLookup4[value & 0x0Fu];
                    uint8_t alpha1 = _detail::alphaLookup4[value >> 4u];
                    uint32_t& color1 = colorBuffer[colorIndex++];
                    uint32_t& color2 = colorBuffer[colorIndex++];
                    color1 = (color1 & 0x00FFFFFFu) | (alpha0 << 24u);
                    color2 = (color2 & 0x00FFFFFFu) | (alpha1 << 24u);
                }

                if((numEntries % 2) != 0) {
                    uint8_t value = indices[numEntries + numEntries / 2];
                    uint8_t alpha = _detail::alphaLookup4[value & 0x0Fu];
                    uint32_t& color = colorBuffer[colorIndex];
                    color = (color & 0x00FFFFFFu) | (alpha << 24u);
                }

                break;
            }

            default:
                throw BlpConvertException("Unsupported alpha depth");
        }

        for(uint32_t i = 0u; i < h; ++i) {
            png::image<png::rgba_pixel>::row_type& row = buf.get_row(i);
            memcpy(row.data(), colorBuffer.data() + i * w, w * sizeof(uint32_t));
        }
    }

    void BlpConvert::parseCompressed(const Format &format, ByteStream &data, png::image<png::rgba_pixel> &image) const {
        uint32_t w = image.get_width();
        uint32_t h = image.get_height();
        png::image<png::rgba_pixel>::pixbuf& buf = image.get_pixbuf();

        uint32_t numBlocks = ((w + 3u) / 4u) * ((h + 3u) / 4u);
        std::vector<uint32_t> blockData(numBlocks * 16u);
        tConvertFunction converter = getDxtConvertFunction(format);
        for(uint32_t i = 0u; i < numBlocks; ++i) {
            (this->*converter)(data, blockData, std::size_t(i * 16));
        }

        std::vector<uint32_t> rowBuffer(w);
        for(uint32_t y = 0u; y < h; ++y) {
            for(uint32_t x = 0u; x < w; ++x) {
                uint32_t bx = x / 4u;
                uint32_t by = y / 4u;

                uint32_t ibx = x % 4u;
                uint32_t iby = y % 4u;

                uint32_t blockIndex = by * ((w + 3u) / 4u) + bx;
                uint32_t innerIndex = iby * 4u + ibx;
                rowBuffer[x] = blockData[blockIndex * 16u + innerIndex];
            }

            png::image<png::rgba_pixel>::row_type& row = buf.get_row(y);
            memcpy(row.data(), rowBuffer.data(), rowBuffer.size() * sizeof(uint32_t));
        }
    }

    BlpConvert::tConvertFunction BlpConvert::getDxtConvertFunction(const Format &format) const {
        switch(format) {
            case DXT1: return &BlpConvert::dxt1GetBlock;
            case DXT2: return &BlpConvert::dxt2GetBlock;
            case DXT3: return &BlpConvert::dxt3GetBlock;
            default: throw BlpConvertException("Unrecognized dxt format");
        }
    }

    void BlpConvert::dxt1GetBlock(ByteStream &stream, std::vector<uint32_t> &blockData,
                                  const size_t &blockOffset) const {
         _detail::RgbDataArray colors[4];
        readDXTColors(stream, colors, true);

        uint32_t indices = stream.read<uint32_t>();
        for(uint32_t i = 0u; i < 16u; ++i) {
            uint8_t idx = (uint8_t) ((indices >> (2u * i)) & 3u);
            blockData[blockOffset + i] = colors[idx].data.color;
        }
    }

    void BlpConvert::dxt2GetBlock(ByteStream &stream, std::vector<uint32_t> &blockData,
                                  const size_t &blockOffset) const {
        uint8_t alphaValues[16];
        uint64_t alpha = stream.read<uint64_t>();
        for(uint32_t i = 0u; i < 16u; ++i) {
            alphaValues[i] = (uint8_t)(((alpha >> (4u * i)) & 0x0Fu) * 17);
        }

        _detail::RgbDataArray colors[4];
        readDXTColors(stream, colors, false, true);

        uint32_t indices = stream.read<uint32_t>();
        for(uint32_t i = 0u; i < 16u; ++i) {
            uint8_t idx = (uint8_t) ((indices >> (2u * i)) & 3u);
            uint32_t alphaVal = (uint32_t) alphaValues[i];
            blockData[blockOffset + i] = (colors[idx].data.color & 0x00FFFFFFu) | (alphaVal << 24u);
        }
    }

    void BlpConvert::dxt3GetBlock(ByteStream &stream, std::vector<uint32_t> &blockData, const size_t &blockOffset) const {
        uint8_t alphaValues[8];
        uint8_t alphaLookup[16];

        uint32_t alpha1 = (uint32_t) stream.read<uint8_t>();
        uint32_t alpha2 = (uint32_t) stream.read<uint8_t>();

        alphaValues[0] = (uint8_t) alpha1;
        alphaValues[1] = (uint8_t) alpha2;

        if(alpha1 > alpha2) {
            for(uint32_t i = 0u; i < 6u; ++i) {
                alphaValues[i + 2u] = (uint8_t) (((6u - i) * alpha1 + (1u + i) * alpha2) / 7u);
            }
        } else {
            for(uint32_t i = 0u; i < 4u; ++i) {
                alphaValues[i + 2u] = (uint8_t) (((4u - i) * alpha1 + (1u + i) * alpha2) / 5u);
            }

            alphaValues[6] = 0;
            alphaValues[7] = 255;
        }

        uint64_t lookupValue = 0;
        stream.read(&lookupValue, 6);

        for(uint32_t i = 0u; i < 16u; ++i) {
            alphaLookup[i] = (uint8_t) ((lookupValue >> (i * 3u)) & 7u);
        }

        _detail::RgbDataArray colors[4];
        readDXTColors(stream, colors, false);

        uint32_t indices = stream.read<uint32_t>();
        for(uint32_t i = 0u; i < 16u; ++i) {
            uint8_t idx = (uint8_t) ((indices >> (2u * i)) & 3u);
            uint32_t alphaVal = (uint32_t) alphaValues[alphaLookup[i]];
            blockData[blockOffset + i] = (colors[idx].data.color & 0x00FFFFFFu) | (alphaVal << 24u);
        }
    }

    void BlpConvert::readDXTColors(ByteStream &stream, _detail::RgbDataArray *colors, bool preMultipliedAlpha, bool use4Colors) const {
        uint16_t color1 = stream.read<uint16_t>();
        uint16_t color2 = stream.read<uint16_t>();

        _detail::rgb565ToRgb8Array(color1, colors[0].data.buffer);
        _detail::rgb565ToRgb8Array(color2, colors[1].data.buffer);

        colors[0].data.buffer[3] = 0xFFu;
        colors[1].data.buffer[3] = 0xFFu;
        colors[2].data.buffer[3] = 0xFFu;
        colors[3].data.buffer[3] = 0xFFu;

        if(use4Colors || color1 > color2) {
            for(uint32_t i = 0u; i < 3u; ++i) {
                colors[3].data.buffer[i] = (uint8_t) ((colors[0].data.buffer[i] + 2u * colors[1].data.buffer[i]) / 3u);
                colors[2].data.buffer[i] = (uint8_t) ((2u * colors[0].data.buffer[i] + colors[1].data.buffer[i]) / 3u);
            }
        } else {
            for(uint32_t i = 0u; i < 3u; ++i) {
                colors[2].data.buffer[i] = (uint8_t) ((colors[0].data.buffer[i] + colors[1].data.buffer[i]) / 2u);
                colors[3].data.buffer[i] = 0;
            }
            
            if(preMultipliedAlpha) {
                colors[3].data.buffer[3] = 0;
            }
        }
    }

    void BlpConvert::createDirectories(const std::string &path) const {
        std::string::size_type lastSlash = path.rfind(_detail::separator);
        if(lastSlash == std::string::npos) {
            return;
        }

        std::cout << "Attempting to create directories for: " << path << std::endl;
        std::string pathPart;
        std::stringstream pathStream;
        pathStream << path.substr(0, lastSlash);
        std::stringstream curPath;

        while(std::getline(pathStream, pathPart, _detail::separator)) {
            if(pathPart.empty()) {
                curPath << _detail::separator;
                continue;
            }

            curPath << pathPart;
#ifdef _WIN32
            int ret = _mkdir(curPath.str().c_str());
#else
            int ret = mkdir(curPath.str().c_str(), S_IRWXU | S_IRWXG | S_IROTH);
#endif
            if(ret != 0 && errno != EEXIST) {
                std::cout << "Failed to create directories at: " << curPath.str() << " with error: " << errno << std::endl;
                throw BlpConvertException("Unable to create directory");
            }
            curPath << _detail::separator;
        }
    }

    std::string BlpConvert::changeExtension(const std::string &path) const {
        std::string::size_type extStart = path.rfind('.');
        if(extStart == std::string::npos) {
            return path + ".png";
        } else {
            return path.substr(0, extStart) + ".png";
        }
    }
}
