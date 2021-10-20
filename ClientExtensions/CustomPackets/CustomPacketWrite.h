#pragma once

#include "CustomPacketDefines.h"
#include "CustomPacketBase.h"

#include <string>

class MessageWrite : public MessageBase {
public:
	MessageWrite(PACKET_OPCODE_TYPE opcode, size_t chunkSize, size_t size = 0);
	MessageWrite();
	MessageWrite* operator->();

	MessageWrite* WriteString(
		  std::string const& str
		, uint32_t length = std::string::npos
	);
	MessageWrite* WriteString(
		const char* chr
		, uint32_t length = std::string::npos
	);
	MessageWrite* WriteStringNullTerm(
		  std::string const& str
		, uint32_t length = std::string::npos
	);
	MessageWrite* WriteStringNullTerm(
		  const char* chr
		, uint32_t length = std::string::npos
	);

	MessageWrite* WriteUInt8(uint8_t value);
	MessageWrite* WriteInt8(int8_t value);

	MessageWrite* WriteUInt16(uint16_t value);
	MessageWrite* WriteInt16(int16_t value);

	MessageWrite* WriteUInt32(uint32_t value);
	MessageWrite* WriteInt32(int32_t value);

	MessageWrite* WriteUInt64(uint64_t value);
	MessageWrite* WriteInt64(int64_t value);

	MessageWrite* WriteFloat(float value);
	MessageWrite* WriteDouble(double value);

	template <typename T>
	MessageWrite* Write(T value)
	{
		MessageBase::Write(value);
		return this;
	}
	MessageWrite* WriteBytes(size_t size, char const* bytes);
private:
	size_t _strlen(const char* chr, size_t length);
};
