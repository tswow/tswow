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
	length = _strlen(chr, length);
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
	length = _strlen(chr, length);
	WriteBytes(length, chr);
	WriteUInt8(0);
	return this;
}

CustomPacketWrite* CustomPacketWrite::WriteUInt8(uint8_t value) {
	Write(value);
	return this;
}
CustomPacketWrite* CustomPacketWrite::WriteInt8(int8_t value) {
	Write(value);
	return this;
}

CustomPacketWrite* CustomPacketWrite::WriteUInt16(uint16_t value) {
	Write(value);
	return this;
}
CustomPacketWrite* CustomPacketWrite::WriteInt16(int16_t value) {
	Write(value);
	return this;
}

CustomPacketWrite* CustomPacketWrite::WriteUInt32(uint32_t value) {
	Write(value);
	return this;
}
CustomPacketWrite* CustomPacketWrite::WriteInt32(int32_t value) {
	Write(value);
	return this;
}

CustomPacketWrite* CustomPacketWrite::WriteUInt64(uint64_t value) {
	Write(value);
	return this;
}
CustomPacketWrite* CustomPacketWrite::WriteInt64(int64_t value) {
	Write(value);
	return this;
}

CustomPacketWrite* CustomPacketWrite::WriteFloat(float value) {
	Write(value);
	return this;
}
CustomPacketWrite* CustomPacketWrite::WriteDouble(double value) {
	Write(value);
	return this;
}

totalSize_t CustomPacketWrite::_strlen(const char* chr, totalSize_t length)
{
	return length == TotalSizeNpos ?
			totalSize_t(std::min(size_t(BUFFER_QUOTA), strlen(chr)))
		: length;
}

CustomPacketWrite* CustomPacketWrite::WriteBytes(totalSize_t size, char const* bytes)
{
	CustomPacketBase::WriteBytes(size, bytes);
	return this;
}
