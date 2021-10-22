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
		, totalSize_t length = TotalSizeNpos
	);
	CustomPacketWrite* WriteString(
		const char* chr
		, totalSize_t length = TotalSizeNpos
	);
	CustomPacketWrite* WriteStringNullTerm(
		  std::string const& str
		, totalSize_t length = TotalSizeNpos
	);
	CustomPacketWrite* WriteStringNullTerm(
		  const char* chr
		, totalSize_t length = TotalSizeNpos
	);

	CustomPacketWrite* WriteUInt8(uint8_t value);
	CustomPacketWrite* WriteInt8(int8_t value);

	CustomPacketWrite* WriteUInt16(uint16_t value);
	CustomPacketWrite* WriteInt16(int16_t value);

	CustomPacketWrite* WriteUInt32(uint32_t value);
	CustomPacketWrite* WriteInt32(int32_t value);

	CustomPacketWrite* WriteUInt64(uint64_t value);
	CustomPacketWrite* WriteInt64(int64_t value);

	CustomPacketWrite* WriteFloat(float value);
	CustomPacketWrite* WriteDouble(double value);

	template <typename T>
	CustomPacketWrite* Write(T value)
	{
		CustomPacketBase::Write(value);
		return this;
	}
	CustomPacketWrite* WriteBytes(totalSize_t size, char const* bytes);
private:
	totalSize_t _strlen(const char* chr, totalSize_t length);
};
