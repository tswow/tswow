#ifndef CYTHON_BLP_BYTESTREAM_H
#define CYTHON_BLP_BYTESTREAM_H

#include <stdint.h>
#include <cstdlib>

namespace python_blp {
    class ByteStream {
        unsigned char* data;
        std::size_t size;
        std::size_t position;

        ByteStream& operator = (const ByteStream& other) { return *this; }
        ByteStream(const ByteStream& other) { };

    public:
        explicit ByteStream(unsigned char* bytes, std::size_t size);
        virtual ~ByteStream() { };

        void setPosition(const std::size_t& position) {
            this->position = position;
        }

        const std::size_t& getPosition() const {
            return position;
        }

        void read(void* buffer, std::size_t numBytes);

        template<typename T>
        T read() {
            T ret = { 0 };
            read(ret);
            return ret;
        }

        template<typename T>
        void read(T& value) {
            read(&value, sizeof(T));
        }

        template<typename T, uint32_t size>
        void read(T (&data)[size]) {
            read(data, size * sizeof(T));
        };
    };
}


#endif //CYTHON_BLP_BYTESTREAM_H
