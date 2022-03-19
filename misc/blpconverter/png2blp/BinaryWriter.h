

#ifndef PNG_BLP_BINARYWRITER_H
#define PNG_BLP_BINARYWRITER_H

#include <vector>
#include <stdint.h>
#include <cstdlib>
#include <cstring>

class BinaryWriter {
    std::vector<uint8_t> mData;

public:
    BinaryWriter& write(const void* data, std::size_t dataSize) {
        mData.insert(mData.end(), (uint8_t*) data, ((uint8_t*) data) + dataSize);
        return *this;
    }

    template<typename T>
    BinaryWriter& write(const T& value) {
        write(&value, sizeof(T));
        return *this;
    }

    template<typename T>
    BinaryWriter& operator << (const T& value) {
        return write(value);
    }

    template<typename T>
    BinaryWriter& writeArray(const std::vector<T>& data) {
        return write(data.data(), data.size() * sizeof(T));
    }

    void *getData(uint32_t &fileSize) const {
        void* ret = malloc(mData.size());
        memcpy(ret, mData.data(), mData.size());
        fileSize = static_cast<uint32_t>(mData.size());
        return ret;
    }
};


#endif //PNG_BLP_BINARYWRITER_H
