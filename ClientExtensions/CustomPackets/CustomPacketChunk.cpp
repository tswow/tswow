#include "CustomPacketChunk.h"

#include <string>

CustomPacketChunk::CustomPacketChunk(CustomPacketChunk const& other)
	: m_size(other.m_size)
	, m_chunk(other.m_chunk)
{}

CustomPacketChunk::CustomPacketChunk(size_t size, char* chunk)
	: m_size(size)
	, m_chunk(chunk)
{}

CustomPacketChunk::CustomPacketChunk(size_t size)
	: m_size(size)
	, m_chunk(new char[size + sizeof(CustomPacketHeader)])
{}

CustomPacketChunk::CustomPacketChunk() : CustomPacketChunk(0, nullptr)
{}

void CustomPacketChunk::Destroy()
{
	delete[] m_chunk;
}

char* CustomPacketChunk::Data()
{
	return m_chunk;
}

CustomPacketHeader* CustomPacketChunk::Header()
{
	return (CustomPacketHeader*)m_chunk;
}

void CustomPacketChunk::Increase(size_t size)
{
	if (m_chunk == nullptr)
	{
		m_chunk = new char[size + sizeof(CustomPacketHeader)];
	}
	else
	{
		char* old = m_chunk;
		m_chunk = new char[m_size + size + sizeof(CustomPacketHeader)];
		memcpy(m_chunk, old, m_size + sizeof(CustomPacketHeader));
		m_size = m_size + size;
		delete old;
	}
}

size_t CustomPacketChunk::FullSize()
{
	return Size() + sizeof(CustomPacketHeader);
}

size_t CustomPacketChunk::Size()
{
	return m_size;
}

// how many bytes we have left to write
size_t CustomPacketChunk::RemBytes(size_t idx)
{
	return m_size - idx;
}

char* CustomPacketChunk::Offset(size_t offset)
{
	return m_chunk + sizeof(CustomPacketHeader) + offset;
}

void CustomPacketChunk::WriteBytes(size_t idx, size_t size, char const* value)
{
	memcpy(Offset(idx), value, size);
}

void CustomPacketChunk::ReadBytes(size_t idx, size_t size, char* out)
{
	memcpy(out, Offset(idx), size);
}

void CustomPacketChunk::Print(
	std::function<void(std::ostream&, uint8_t)> fn
	, std::ostream& stream
	, size_t indent
) {
	std::string spaces = std::string(' ', indent);
	for (size_t i = 0; i < indent; ++i)
	{
		stream << ' ';
	}
	stream << "chunk [ header (";
	for (size_t i = 0; i < sizeof(CustomPacketHeader); ++i)
	{
		fn(stream, m_chunk[i]);
		if (i < sizeof(CustomPacketHeader) - 1) stream << ",";
	}
	stream << "), ";
	for (size_t i = 0; i < m_size; ++i)
	{
		fn(stream, Offset(i)[0]);
		if (i < m_size - 1) stream << ",";
	}
	stream << "]\n";
}

void CustomPacketChunk::PrintBytes(
	std::ostream& stream
	, size_t indent
) {
	return Print([](auto& stream, uint8_t byte) {
		stream << "0x" << std::hex << uint32_t(byte);
	}, stream, indent);
}

void CustomPacketChunk::PrintAscii(
	std::ostream& stream
	, size_t indent
) {
	return Print([](auto& stream, uint8_t byte) {
		stream << char(byte);
	}, stream, indent);
}

