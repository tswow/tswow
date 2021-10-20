#pragma once

#include "CustomPacketDefines.h"

#include <cstdint>
#include <functional>
#include <iostream>

#pragma pack(push,1)
struct CustomPacketHeader {
	uint16_t msgId;
	uint16_t fragmentId;
	uint16_t totalFrags;
	PACKET_OPCODE_TYPE opcode;
};
#pragma pack(pop)

struct CustomPacketChunk {
public:
	CustomPacketChunk(CustomPacketChunk const& other);
	CustomPacketChunk(size_t size, char* chunk);
	CustomPacketChunk(size_t size);
	CustomPacketChunk();
	void Destroy();
	char* Data();
	CustomPacketHeader* Header();
	void Increase(size_t size);
	size_t FullSize();
	size_t Size();
	// how many bytes we have left to write
	size_t RemBytes(size_t idx);
	// The offset from the writable part of this chunk
	char* Offset(size_t offset);
	void WriteBytes(size_t idx, size_t size, char const* value);
	void ReadBytes(size_t idx, size_t size, char* out);

	void Print(
		std::function<void(std::ostream&, uint8_t)> fn
		, std::ostream& stream = std::cout
		, size_t indent = 0
	);
	void PrintBytes(
		std::ostream& stream = std::cout
		, size_t indent = 0
	);
	void PrintAscii(
		std::ostream& stream = std::cout
		, size_t indent = 0
	);

	template<typename T>
	void Write(size_t index, T value)
	{
		*((T*)(Offset(index))) = value;
	}

	template<typename T>
	T Read(size_t index)
	{
		return *((T*)(Offset(index)));
	}
private:
	size_t m_size;
	char* m_chunk;
};
