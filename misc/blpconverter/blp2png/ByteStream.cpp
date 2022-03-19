#include <stdexcept>
#include <cstring>
#include <stdint.h>
#include "ByteStream.h"

namespace python_blp {
    ByteStream::ByteStream(unsigned char *bytes, std::size_t size) : data(bytes), size(size), position(0) {

    }

    void ByteStream::read(void *buffer, std::size_t numBytes) {
        if(position + numBytes > size) {
            throw std::out_of_range("Cannot read past the end of stream");
        }

        memcpy(buffer, data + position, numBytes);
        position += numBytes;
    }
}