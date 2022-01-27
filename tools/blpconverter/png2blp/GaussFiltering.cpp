#include <cstdio>
#include <algorithm>
#include "GaussFiltering.h"

static float kernel[] = {
        1.0f / 256.0f, 4.0f / 256.0f, 6.0f / 256.0f, 4.0f / 256.0f, 1.0f / 256.0f,
        4.0f / 256.0f, 16.0f / 256.0f, 24.0f / 256.0f, 16.0f / 256.0f, 4.0f / 256.0f,
        6.0f / 256.0f, 24.0f / 256.0f, 36.0f / 256.0f, 24.0f / 256.0f, 6.0f / 256.0f,
        4.0f / 256.0f, 16.0f / 256.0f, 24.0f / 256.0f, 16.0f / 256.0f, 4.0f / 256.0f,
        1.0f / 256.0f, 4.0f / 256.0f, 6.0f / 256.0f, 4.0f / 256.0f, 1.0f / 256.0f
};

std::vector<uint32_t> GaussFiltering::operator()(const std::vector<uint32_t> &inputColors, uint32_t w, uint32_t h) {
    std::vector<uint32_t> retColors(inputColors.size());

    for(int32_t y = 0; y < static_cast<int32_t>(h); ++y) {
        for(int32_t x = 0; x < static_cast<int32_t>(w); ++x) {
            float components[4] = { 0 };
            for(int32_t ky = -2; ky <= 2; ++ky) {
                for(int32_t kx = -2; kx <= 2; ++kx) {
                    uint32_t pixel = getPixel(inputColors, w, h, x + kx, y + ky);

                    for(uint32_t c = 0; c < 4; ++c) {
                        components[c] += ((pixel & (0xFF << (c * 8))) >> (c * 8)) * kernel[24 - ((ky + 2) * 5 + kx + 2)];
                    }
                }
            }

            retColors[y * w + x] = float4ToColor(components);
        }
    }

    return retColors;
}

uint32_t GaussFiltering::float4ToColor(float *float4) {
    uint32_t r = static_cast<uint8_t>(float4[0]);
    uint32_t g = static_cast<uint8_t>(float4[1]);
    uint32_t b = static_cast<uint8_t>(float4[2]);
    uint32_t a = static_cast<uint8_t>(float4[3]);

    return r | (g << 8) | (b << 16) | (a << 24);
}

uint32_t GaussFiltering::getPixel(const std::vector<uint32_t> &inputColors, int32_t w, int32_t h, int32_t x, int32_t y) {
    x = std::min(std::max(x, 0), w - 1);
    y = std::min(std::max(y, 0), h - 1);
    return inputColors[y * w + x];
}
