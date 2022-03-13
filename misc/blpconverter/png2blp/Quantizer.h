

#ifndef PNG_BLP_QUANTIZER_H
#define PNG_BLP_QUANTIZER_H

#include <vector>
#include <stdint.h>


class Quantizer {
public:
    void quantize(const std::vector<uint32_t>& colorData, uint32_t width, uint32_t height, uint8_t minQuality, uint8_t maxQuality,
                  std::vector<uint8_t>& indices, std::vector<uint32_t>& palette);
};


#endif //PNG_BLP_QUANTIZER_H
