#include "MessageBase.h"

#include <string>
#include <stdexcept>

MessageBase::MessageBase(MessageBase const& base)
	: m_size(base.m_size)
	, m_maxChunkSize(base.m_maxChunkSize)
	, m_idx(0)
	, m_chunk(0)
	, m_chunks(base.m_chunks)
{}

MessageBase::MessageBase()
	: m_size(0)
	, m_maxChunkSize(0)
	, m_idx(0)
	, m_chunk(0)
{}

MessageBase::MessageBase(size_t maxChunkSize, size_t initialSize)
	: m_size(0)
	, m_idx(0)
	, m_chunk(0)
	, m_maxChunkSize(maxChunkSize)
{
	if (maxChunkSize <= sizeof(MessageHeader))
	{
		throw std::runtime_error(
			"Maximum chunk size ("
			+ std::to_string(maxChunkSize)
			+ ") is <= message header size ("
			+ std::to_string(sizeof(MessageHeader))
			+ "), you can't send any messages!"
		);
	}

	if (initialSize > 0)
	{
		Increase(initialSize);
	}
}

std::vector<MessageChunk> const& MessageBase::buildMessages(uint16_t messageId)
{
	for (uint16_t i = 0; i < m_chunks.size(); ++i)
	{
		MessageChunk& chnk = m_chunks[i];
		MessageHeader* hdr = chnk.Header();
		hdr->msgId = messageId;
		hdr->fragmentId = i;
		hdr->totalFrags = m_chunks.size();
	}
	return m_chunks;
}

void MessageBase::Reset()
{
	m_chunk = 0;
	m_idx = 0;
}


void MessageBase::Destroy()
{
	for (auto& chunk : m_chunks)
	{
		chunk.Destroy();
	}
	m_chunks.clear();
	Reset();
}

void MessageBase::Push(MessageChunk& chnk)
{
	m_size += chnk.Size();
	m_chunks.push_back(chnk);
}


size_t MessageBase::Size()
{
	return m_size;
}


MessageChunk* MessageBase::Chunk(size_t index)
{
	return &m_chunks[index];
}


size_t MessageBase::ChunkSize(size_t index)
{
	return m_chunks[index].Size();
}


size_t MessageBase::ChunkCount()
{
	return m_chunks.size();
}

void MessageBase::Print(
	std::function<void(std::ostream&, uint8_t)> cb
	, std::ostream& stream
) {
	stream << "message [\n";
	for (size_t chnkCtr = 0; chnkCtr < m_chunks.size(); ++chnkCtr)
	{
		MessageChunk& chnk = m_chunks[chnkCtr];
		chnk.Print(cb, stream, 2);
	}
	stream << "]\n";
}


void MessageBase::PrintAscii(std::ostream& stream)
{
	Print([](auto& stream, uint8_t byte) {
		stream << char(byte);
	}, stream);
}

void MessageBase::PrintBytes(std::ostream& stream)
{
	Print([](auto& stream, uint8_t byte) {
		stream << "0x" << std::hex << uint32_t(byte);
	}, stream);
}




size_t MessageBase::MaxWritableChunkSize()
{
	return m_maxChunkSize - sizeof(MessageHeader);
}

void MessageBase::Increase(size_t increase)
{
	// increase size
	if (m_chunks.size() > 0)
	{
		MessageChunk& chnk = m_chunks[m_chunks.size() - 1];
		size_t inc = std::min(chnk.Size() + increase, MaxWritableChunkSize());
		if (inc > 0)
		{
			chnk.Increase(inc);
		}
	}

	size_t newSize = m_size + increase;
	size_t firstNewChunk = m_chunks.size();
	m_chunks.resize(
		size_t(std::ceil(float(newSize) / float(MaxWritableChunkSize())))
	);
	size_t remInc = newSize;
	for (size_t i = firstNewChunk; i < m_chunks.size(); ++i)
	{
		size_t size = i == (m_chunks.size() - 1)
			? remInc
			: MaxWritableChunkSize();
		remInc -= size;
		m_chunks[i] = MessageChunk(size);
	}
	m_size = newSize;
}

void MessageBase::WriteBytes(size_t size, char const* bytes)
{
	while (size > 0)
	{
		if (m_chunk >= m_chunks.size())
		{
			m_chunks.push_back(MessageChunk(std::min(size, MaxWritableChunkSize())));
		}
		MessageChunk& chnk = m_chunks[m_chunk];
		size_t written = std::min(chnk.RemBytes(m_idx), size);
		chnk.WriteBytes(m_idx, written, bytes);
		bytes += written;
		size -= written;
		if (size == 0)
		{
			m_idx += written;
		}
		else
		{
			m_idx = 0;
			++m_chunk;
		}
	}
}

char* MessageBase::ReadBytes(size_t size, bool padStr)
{
	if (m_chunk >= m_chunks.size())
	{
		return nullptr;
	}

	char* c = new char[size + (padStr ? 1 : 0)];
	size_t offset = 0;
	while (size > 0)
	{
		if (m_chunk >= m_chunks.size()) break;
		MessageChunk& chunk = m_chunks[m_chunk];
		size_t read = std::min(size, chunk.RemBytes(m_idx));
		chunk.ReadBytes(m_idx, read, c + offset);
		size -= read;
		offset += read;
		if (size == 0)
		{
			m_idx += read;
		}
		else
		{
			m_idx = 0;
			++m_chunk;
		}
	}
	return c;
}
