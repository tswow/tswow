#pragma once

#include "TSMain.h"
#define CUSTOM_PACKET_API TC_GAME_API
#include "CustomPacketRead.h"
#include "CustomPacketWrite.h"
#include "CustomPacketBuffer.h"

#include "TSString.h"

class TSWorldObject;
class TSPlayer;
class TSMap;
class TSBattleground;

class TC_GAME_API TSPacketWrite
{
	CustomPacketWrite* write;
public:
	TSPacketWrite(CustomPacketWrite* write);
	TSPacketWrite* operator->() { return this; };
	operator bool() const { return write != nullptr; }
	bool operator==(TSPacketWrite const& rhs) { return write == rhs.write; }
	template <typename T>
	TSPacketWrite* Write(T value)
	{
		write->Write(value);
		return this;
	}

	TSPacketWrite * WriteUInt8(uint8_t value) { return Write(value); }
	TSPacketWrite * WriteInt8(int8_t value)   { return Write(value); }

	TSPacketWrite * WriteUInt16(uint16_t value) { return Write(value); }
	TSPacketWrite * WriteInt16(int16_t value)   { return Write(value); }

	TSPacketWrite * WriteUInt32(uint32_t value) { return Write(value); }
	TSPacketWrite * WriteInt32(int32_t value)   { return Write(value); }

	TSPacketWrite * WriteUInt64(uint64_t value) { return Write(value); }
	TSPacketWrite * WriteInt64(int64_t value)   { return Write(value); }

	TSPacketWrite * WriteFloat(float value)   { return Write(value); }
	TSPacketWrite * WriteDouble(double value) { return Write(value); }

	TSPacketWrite* WriteString(TSString str) {
		write->WriteString(str.c_str(), str.get_length());
		return this;
	}

	totalSize_t Size() { return write->Size(); }

	void SendToPlayer(TSPlayer player);
	void BroadcastMap(TSMap map, uint32_t teamOnly = 0);
	void BroadcastAround(TSWorldObject obj, float range, bool self = true);
};

class TC_GAME_API TSPacketRead
{
	CustomPacketRead* read;
public:
	TSPacketRead(CustomPacketRead* read);
	TSPacketRead* operator->() { return this; };
	operator bool() const { return read != nullptr; }
	bool operator==(TSPacketRead const& rhs) { return read == rhs.read; }

	template <typename T>
	T Read(T defaultValue)
	{
		return read->Read(defaultValue);
	}

	uint8_t ReadUInt8(uint8_t def = 0) { return Read(def); }
	int8_t ReadInt8(int8_t def = 0) { return Read(def); }

	uint16_t ReadUInt16(uint16_t def = 0) { return Read(def); }
	int16_t ReadInt16(int16_t def = 0) { return Read(def); }

	uint32_t ReadUInt32(uint32_t def = 0) { return Read(def); }
	int32_t ReadInt32(int32_t def = 0) { return Read(def); }

	uint64_t ReadUInt64(uint64_t def = 0) { return Read(def); }
	int64_t ReadInt64(int64_t def = 0) { return Read(def); }

	float ReadFloat(float def = 0) { return Read(def); }
	double ReadDouble(double def = 0) { return Read(def); }

	TSString ReadString(TSString def = JSTR(""))
	{
		return TSString(read->ReadString(def.std_str()));
	}

	totalSize_t Size() { return read->Size(); }
};

class TSServerBuffer : public CustomPacketBuffer
{
public:
	TSServerBuffer(TSPlayer player);
	TSPlayer m_player = nullptr;
	virtual void OnPacket(CustomPacketRead* value) override final;
	virtual void OnError(CustomPacketResult error) override final;
};

TC_GAME_API TSPacketWrite CreateCustomPacket(
		opcode_t opcode
	, totalSize_t size
);
