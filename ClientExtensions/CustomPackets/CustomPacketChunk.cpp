#include "CustomPacketChunk.h"

#include <string>

MessageChunk::MessageChunk(MessageChunk const& other)
	: m_size(other.m_size)
	, m_chunk(other.m_chunk)
{}

MessageChunk::MessageChunk(size_t size, char* chunk)
	: m_size(size)
	, m_chunk(chunk)
{}

MessageChunk::MessageChunk(size_t size)
	: m_size(size)
	, m_chunk(new char[size + sizeof(MessageHeader)])
{}

MessageChunk::MessageChunk() : MessageChunk(0, nullptr)
{}

void MessageChunk::Destroy()
{
	delete[] m_chunk;
}

char* MessageChunk::Data()
{
	return m_chunk;
}

MessageHeader* MessageChunk::Header()
{
	return (MessageHeader*)m_chunk;
}

void MessageChunk::Increase(size_t size)
{
	if (m_chunk == nullptr)
	{
		m_chunk = new char[size + sizeof(MessageHeader)];
	}
	else
	{
		char* old = m_chunk;
		m_chunk = new char[m_size + size + sizeof(MessageHeader)];
		memcpy(m_chunk, old, m_size + sizeof(MessageHeader));
		m_size = m_size + size;
		delete old;
	}
}

size_t MessageChunk::FullSize()
{
	return Size() + sizeof(MessageHeader);
}

size_t MessageChunk::Size()
{
	return m_size;
}

// how many bytes we have left to write
size_t MessageChunk::RemBytes(size_t idx)
{
	return m_size - idx;
}

char* MessageChunk::Offset(size_t offset)
{
	return m_chunk + sizeof(MessageHeader) + offset;
}

void MessageChunk::WriteBytes(size_t idx, size_t size, char const* value)
{
	memcpy(Offset(idx), value, size);
}

void MessageChunk::ReadBytes(size_t idx, size_t size, char* out)
{
	memcpy(out, Offset(idx), size);
}

void MessageChunk::Print(
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
	for (size_t i = 0; i < sizeof(MessageHeader); ++i)
	{
		fn(stream, m_chunk[i]);
		if (i < sizeof(MessageHeader) - 1) stream << ",";
	}
	stream << "), ";
	for (size_t i = 0; i < m_size; ++i)
	{
		fn(stream, Offset(i)[0]);
		if (i < m_size - 1) stream << ",";
	}
	stream << "]\n";
}

void MessageChunk::PrintBytes(
	std::ostream& stream
	, size_t indent
) {
	return Print([](auto& stream, uint8_t byte) {
		stream << std::hex << uint32_t(byte);
	}, stream, indent);
}

void MessageChunk::PrintAscii(
	std::ostream& stream
	, size_t indent
) {
	return Print([](auto& stream, uint8_t byte) {
		stream << char(byte);
	}, stream, indent);
}

