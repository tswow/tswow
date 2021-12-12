#pragma once

#include "CustomPacketDefines.h"
#include "CustomPacketBase.h"

#include <string>

class CUSTOM_PACKET_API CustomPacketWrite : public CustomPacketBase {
public:
    CustomPacketWrite(
          opcode_t opcode
        , chunkSize_t chunkSize
        , totalSize_t size = 0
    );
    CustomPacketWrite();
    CustomPacketWrite* operator->();

    CustomPacketWrite* WriteString(
          std::string const& str
        , totalSize_t length
    );

    CustomPacketWrite* WriteString(
        std::string const& str
    );

    CustomPacketWrite* WriteString(
        const char* str
    );

    CustomPacketWrite* WriteString(
        const char* chr
        , totalSize_t length
    );

    CustomPacketWrite* WriteStringNullTerm(
        std::string const& str
    );

    CustomPacketWrite* WriteStringNullTerm(
        const char* chr
    );

    CustomPacketWrite* WriteStringNullTerm(
          std::string const& str
        , totalSize_t length
    );
    CustomPacketWrite* WriteStringNullTerm(
          const char* chr
        , totalSize_t length
    );

    template <typename T>
    CustomPacketWrite* Write(T value)
    {
        CustomPacketBase::Write(value);
        return this;
    }
    CustomPacketWrite* WriteBytes(totalSize_t size, char const* bytes);
};
