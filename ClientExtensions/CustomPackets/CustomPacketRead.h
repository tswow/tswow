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

	uint8_t ReadUInt8(uint8_t def = 0);
	int8_t ReadInt8(int8_t def = 0);

	uint16_t ReadUInt16(uint16_t def = 0);
	int16_t ReadInt16(int16_t def = 0);

	uint32_t ReadUInt32(uint32_t def = 0);
	int32_t ReadInt32(int32_t def = 0);

	uint64_t ReadUInt64(uint64_t def = 0);
	int64_t ReadInt64(int64_t def = 0);

	float ReadFloat(float def = 0);
	double ReadDouble(double def = 0);

	template<typename T>
	T Read(T def)
	{
		return CustomPacketBase::Read(def);
	}

	char* ReadBytes(totalSize_t size, bool padStr = false);
};
