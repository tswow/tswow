#include "CustomPacketWrite.h"

CustomPacketWrite::CustomPacketWrite(
      opcode_t opcode
    , chunkSize_t chunkSize
    , totalSize_t size
)
    : CustomPacketBase(opcode, chunkSize, size)
{}

CustomPacketWrite::CustomPacketWrite()
    : CustomPacketBase()
{}

CustomPacketWrite* CustomPacketWrite::operator->() { return this; }

CustomPacketWrite* CustomPacketWrite::WriteString(std::string const& str)
{
    return WriteString(str, str.size());
}

CustomPacketWrite* CustomPacketWrite::WriteString(const char* str)
{
    return WriteString(str, strlen(str));
}

CustomPacketWrite* CustomPacketWrite::WriteString(
      std::string const& str
    , totalSize_t length
) {
    return WriteString(str.c_str(), length);
}

CustomPacketWrite* CustomPacketWrite::WriteString(
      const char* chr
    , totalSize_t length
) {
    Write<totalSize_t>(length);
    WriteBytes(length, chr);
    return this;
}

CustomPacketWrite* CustomPacketWrite::WriteStringNullTerm(
      std::string const& str
    , totalSize_t length
) {
    return WriteStringNullTerm(str.c_str(), length);
}

CustomPacketWrite* CustomPacketWrite::WriteStringNullTerm(
      const char* chr
    , totalSize_t length
) {
    WriteBytes(length, chr);
    Write<uint8_t>(0);
    return this;
}

CustomPacketWrite* CustomPacketWrite::WriteStringNullTerm(
    std::string const& str
)
{
    return WriteStringNullTerm(str, str.size());
}

CustomPacketWrite* CustomPacketWrite::WriteStringNullTerm(
    const char* chr
)
{
    return WriteStringNullTerm(chr, strlen(chr));
}

CustomPacketWrite* CustomPacketWrite::WriteBytes(totalSize_t size, char const* bytes)
{
    CustomPacketBase::WriteBytes(size, bytes);
    return this;
}
