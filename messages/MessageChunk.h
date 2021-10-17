#pragma once

#include <cstdint>
#include <functional>
#include <iostream>

#pragma pack(push,1)
struct MessageHeader {
	uint16_t msgId;
	uint16_t fragmentId;
	uint16_t totalFrags;
};
#pragma pack(pop)

struct MessageChunk {
public:
	MessageChunk(MessageChunk const& other);
	MessageChunk(size_t size, char* chunk);
	MessageChunk(size_t size);
	MessageChunk();
	void Destroy();
	char* Data();
	MessageHeader* Header();
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
