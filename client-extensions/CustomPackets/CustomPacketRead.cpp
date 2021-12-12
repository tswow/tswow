#include "CustomPacketRead.h"

CustomPacketRead::CustomPacketRead()
    : CustomPacketBase()
{}

CustomPacketRead::CustomPacketRead(opcode_t opcode, chunkSize_t chunkSize)
    : CustomPacketBase(opcode, chunkSize, 0)
{}

CustomPacketRead::CustomPacketRead(CustomPacketWrite const& write)
    : CustomPacketBase(write)
{}

CustomPacketRead* CustomPacketRead::operator->() { return this; }

std::string CustomPacketRead::ReadString(std::string const& def)
{
    totalSize_t size = Read<totalSize_t>(TotalSizeNpos);
    if (size == TotalSizeNpos) return def;
    if (size == 0) return "";
    char* chr = ReadBytes(size, true);
    if (chr == nullptr) return def;
    chr[size] = '\0';
    std::string str(chr);
    delete[] chr;
    return str;
}

char* CustomPacketRead::ReadBytes(totalSize_t size, bool padStr)
{
    return CustomPacketBase::ReadBytes(size, padStr);
}

