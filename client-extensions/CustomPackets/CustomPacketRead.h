#pragma once

#include "CustomPacketDefines.h"

#include "CustomPacketBase.h"
#include "CustomPacketWrite.h"

class CUSTOM_PACKET_API CustomPacketRead : public CustomPacketBase {
public:
    CustomPacketRead();
    CustomPacketRead(opcode_t opcode, chunkSize_t chunkSize);
    CustomPacketRead(CustomPacketWrite const& write);
    CustomPacketRead* operator->();

    std::string ReadString(std::string const& def = "");

    template<typename T>
    T Read(T def)
    {
        return CustomPacketBase::Read(def);
    }

    char* ReadBytes(totalSize_t size, bool padStr = false);
};
