

#ifndef PNG_BLP_GAUSSFILTERING_H
#define PNG_BLP_GAUSSFILTERING_H

#include <vector>
#include <stdint.h>


class GaussFiltering {
    uint32_t getPixel(const std::vector<uint32_t>& inputColors, int32_t w, int32_t h, int32_t x, int32_t y);
    uint32_t float4ToColor(float* float4);

public:
    std::vector<uint32_t> operator () (const std::vector<uint32_t>& inputColors, uint32_t w, uint32_t h);
};


#endif //PNG_BLP_GAUSSFILTERING_H
