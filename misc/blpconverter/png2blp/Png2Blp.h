

#ifndef PNG_BLP_PNG2BLP_H
#define PNG_BLP_PNG2BLP_H

#include <vector>
#include <stdint.h>
#include "BinaryWriter.h"

const int FORMAT_DXT1 = 0;
const int FORMAT_DXT3 = 1;
const int FORMAT_DXT5 = 2;

class Png2Blp {
    uint32_t mWidth;
    uint32_t mHeight;
    std::vector<uint32_t> mColors;

    std::vector<uint8_t> unionizePalette(std::vector<uint32_t> &destPalette, const std::vector<uint32_t> &srcPalette,
                                         const std::vector<uint8_t> &srcIndices);

    void quantizeLayer(std::vector<uint32_t> &layerData, uint32_t width, uint32_t height, uint8_t minQuality,
                       uint8_t maxQuality,
                       std::vector<uint32_t> &palette, std::vector<uint8_t> &layerIndices);

    void writePaletteBlp(BinaryWriter& writer, std::vector<uint32_t>& palette, const std::vector<std::vector<uint32_t> >& layerData,
            const std::vector<std::vector<uint8_t> >& indices, uint32_t alphaDepth);

    std::vector<std::vector<uint8_t> > createAlphaOfBits(const std::vector<std::vector<uint32_t> >& layerData, uint32_t alphaDepth);

    std::vector<std::vector<uint8_t> > createDxtCompression(const std::vector<std::vector<uint32_t> >& layerData, uint32_t dxtFormat);

    uint32_t dxtFormatToBlpFormat(uint32_t dxtFormat);

public:
    Png2Blp();
    void load(const void* pngData, uint32_t pngSize);

    void* createBlpPalettedInMemory(bool generateMipMaps, uint8_t alphaDepth, uint8_t minQuality, uint8_t maxQuality, uint32_t& fileSize);
    void* createBlpUncompressedInMemory(bool generateMipMaps, uint32_t &fileSize);
    void* createBlpDxtInMemory(bool generateMipMaps, int dxtFormat, uint32_t& fileSize);
};


#endif //PNG_BLP_PNG2BLP_H
