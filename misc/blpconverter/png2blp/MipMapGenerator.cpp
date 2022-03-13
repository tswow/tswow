#include <cmath>
#include <algorithm>
#include <stdexcept>
#include "MipMapGenerator.h"
#include "GaussFiltering.h"


unsigned int msb32(unsigned int bits)
{
    for(unsigned pos = 31; pos != ::std::numeric_limits<unsigned>::max(); --pos)
        if(bits & 1 << pos)
            return(pos);

    throw ::std::invalid_argument("no bit set in msb32");
}

std::vector<std::vector<uint32_t> > MipMapGenerator::operator()(
        const std::vector<uint32_t> &colors,
        uint32_t width,
        uint32_t height) {
    uint32_t layersW, layersH;
    // asm("\tbsr %1, %0\n" : "=r"(layersW) : "r"(width));
    // asm("\tbsr %1, %0\n" : "=r"(layersH) : "r"(height));

    layersW = msb32(width);
    layersH = msb32(height);

    uint32_t numLayers = std::max(layersW, layersH) + 1;
    std::vector<std::vector<uint32_t> > retLayers(numLayers);
    retLayers[0] = colors;
    uint32_t lastW = width;
    uint32_t lastH = height;
    for (uint32_t i = 1; i < numLayers; ++i) {
        uint32_t curW = std::max(1u, lastW >> 1);
        uint32_t curH = std::max(1u, lastH >> 1);
        std::vector<uint32_t> filtered = GaussFiltering()(retLayers[i - 1], lastW, lastH);
        std::vector<uint32_t> layerData(curW * curH);
        for (uint32_t y = 0; y < curH; ++y) {
            for (uint32_t x = 0; x < curW; ++x) {
                uint32_t facW = (lastW / curW);
                uint32_t facH = (lastH / curH);
                layerData[y * curW + x] = filtered[(y * facH) * lastW + x * facW];
            }
        }
        retLayers[i] = layerData;
        lastW = curW;
        lastH = curH;
    }

    return retLayers;
}
