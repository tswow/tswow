#ifndef CYTHON_BLP_BLPSTRUCTURE_H
#define CYTHON_BLP_BLPSTRUCTURE_H

#include <stdint.h>

namespace python_blp {
#pragma pack(push, 1)
    struct BlpHeader {
        uint32_t signature;
        uint32_t version;
        uint8_t compression;
        uint8_t alphaDepth;
        uint8_t alphaCompression;
        uint8_t mipLevels;
        uint32_t width;
        uint32_t height;
        uint32_t offsets[16];
        uint32_t sizes[16];
    };

#pragma pack(pop)
}

#endif //CYTHON_BLP_BLPSTRUCTURE_H
