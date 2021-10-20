#include "MessageWrite.h"

MessageWrite::MessageWrite(
	  PACKET_OPCODE_TYPE opcode
	, size_t chunkSize
	, size_t size
)
	: MessageBase(opcode, chunkSize, size)
{}

MessageWrite::MessageWrite()
	: MessageBase()
{}

MessageWrite* MessageWrite::operator->() { return this; }

MessageWrite* MessageWrite::WriteString(
	  std::string const& str
	, uint32_t length
) {
	return WriteString(str.c_str(), length);
}

MessageWrite* MessageWrite::WriteString(
	  const char* chr
	, uint32_t length
) {
	length = _strlen(chr, length);
	WriteUInt32(length);
	WriteBytes(length, chr);
	return this;
}

MessageWrite* MessageWrite::WriteStringNullTerm(
	  std::string const& str
	, uint32_t length
) {
	return WriteStringNullTerm(str.c_str(), length);
}

MessageWrite* MessageWrite::WriteStringNullTerm(
	  const char* chr
	, uint32_t length
) {
	length = _strlen(chr, length);
	WriteBytes(length, chr);
	WriteUInt8(0);
	return this;
}

MessageWrite* MessageWrite::WriteUInt8(uint8_t value) {
	Write(value);
	return this;
}
MessageWrite* MessageWrite::WriteInt8(int8_t value) {
	Write(value);
	return this;
}

MessageWrite* MessageWrite::WriteUInt16(uint16_t value) {
	Write(value);
	return this;
}
MessageWrite* MessageWrite::WriteInt16(int16_t value) {
	Write(value);
	return this;
}

MessageWrite* MessageWrite::WriteUInt32(uint32_t value) {
	Write(value);
	return this;
}
MessageWrite* MessageWrite::WriteInt32(int32_t value) {
	Write(value);
	return this;
}

MessageWrite* MessageWrite::WriteUInt64(uint64_t value) {
	Write(value);
	return this;
}
MessageWrite* MessageWrite::WriteInt64(int64_t value) {
	Write(value);
	return this;
}

MessageWrite* MessageWrite::WriteFloat(float value) {
	Write(value);
	return this;
}
MessageWrite* MessageWrite::WriteDouble(double value) {
	Write(value);
	return this;
}

size_t MessageWrite::_strlen(const char* chr, size_t length)
{
	return length == std::string::npos ? strlen(chr) : length;
}

MessageWrite* MessageWrite::WriteBytes(size_t size, char const* bytes)
{
	MessageBase::WriteBytes(size, bytes);
	return this;
}
