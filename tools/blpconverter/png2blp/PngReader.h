

#ifndef PNG_BLP_PNGREADER_H
#define PNG_BLP_PNGREADER_H

#include <vector>
#include <stdint.h>

class PngReader {
public:
    std::vector<uint32_t> operator()(const std::vector<uint8_t> &pngData,
                                     std::size_t pngSize, uint32_t &width, uint32_t &height);
};


#endif //PNG_BLP_PNGREADER_H
