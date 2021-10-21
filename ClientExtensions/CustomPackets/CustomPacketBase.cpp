#include "CustomPacketBase.h"

#include <string>
#include <stdexcept>

CustomPacketBase::CustomPacketBase(CustomPacketBase const& base)
	: m_size(base.m_size)
	, m_maxChunkSize(base.m_maxChunkSize)
	, m_idx(0)
	, m_chunk(0)
	, m_chunks(base.m_chunks)
	, m_opcode(base.m_opcode)
{}

CustomPacketBase::CustomPacketBase()
	: m_size(0)
	, m_maxChunkSize(0)
	, m_idx(0)
	, m_chunk(0)
	, m_opcode(0)
{}

CustomPacketBase::CustomPacketBase(
	  PACKET_OPCODE_TYPE opcode
	, size_t maxChunkSize
	, size_t initialSize
	)
	: m_size(0)
	, m_idx(0)
	, m_chunk(0)
	, m_maxChunkSize(maxChunkSize)
	, m_opcode(opcode)
{
	if (maxChunkSize <= sizeof(CustomPacketHeader))
	{
		throw std::runtime_error(
			"Maximum chunk size ("
			+ std::to_string(maxChunkSize)
			+ ") is <= message header size ("
			+ std::to_string(sizeof(CustomPacketHeader))
			+ "), you can't send any messages!"
		);
	}

	if (initialSize > 0)
	{
		Increase(initialSize);
	}
}

std::vector<CustomPacketChunk> & CustomPacketBase::buildMessages(uint16_t messageId)
{
	for (uint16_t i = 0; i < m_chunks.size(); ++i)
	{
		CustomPacketChunk& chnk = m_chunks[i];
		CustomPacketHeader* hdr = chnk.Header();
		hdr->opcode = m_opcode;
		hdr->msgId = messageId;
		hdr->fragmentId = i;
		hdr->totalFrags = m_chunks.size();
	}
	return m_chunks;
}

void CustomPacketBase::Reset()
{
	m_chunk = 0;
	m_idx = 0;
}

void CustomPacketBase::Destroy()
{
	for (auto& chunk : m_chunks)
	{
		chunk.Destroy();
	}
	m_chunks.clear();
	Reset();
}

void CustomPacketBase::Push(CustomPacketChunk& chnk)
{
	m_size += chnk.Size();
	m_chunks.push_back(chnk);
}


size_t CustomPacketBase::Size()
{
	return m_size;
}


CustomPacketChunk* CustomPacketBase::Chunk(size_t index)
{
	return &m_chunks[index];
}


size_t CustomPacketBase::ChunkSize(size_t index)
{
	return m_chunks[index].Size();
}


size_t CustomPacketBase::ChunkCount()
{
	return m_chunks.size();
}

void CustomPacketBase::Print(
	std::function<void(std::ostream&, uint8_t)> cb
	, std::ostream& stream
) {
	stream << "message [\n";
	for (size_t chnkCtr = 0; chnkCtr < m_chunks.size(); ++chnkCtr)
	{
		CustomPacketChunk& chnk = m_chunks[chnkCtr];
		chnk.Print(cb, stream, 2);
	}
	stream << "]\n";
}


void CustomPacketBase::PrintAscii(std::ostream& stream)
{
	Print([](auto& stream, uint8_t byte) {
		stream << char(byte);
	}, stream);
}

void CustomPacketBase::PrintBytes(std::ostream& stream)
{
	Print([](auto& stream, uint8_t byte) {
		stream << "0x" << std::hex << uint32_t(byte);
	}, stream);
}




size_t CustomPacketBase::MaxWritableChunkSize()
{
	return m_maxChunkSize - sizeof(CustomPacketHeader);
}

void CustomPacketBase::Increase(size_t increase)
{
	// increase size
	if (m_chunks.size() > 0)
	{
		CustomPacketChunk& chnk = m_chunks[m_chunks.size() - 1];
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
		m_chunks[i] = CustomPacketChunk(size);
	}
	m_size = newSize;
}

void CustomPacketBase::WriteBytes(size_t size, char const* bytes)
{
	while (size > 0)
	{
		if (m_chunk >= m_chunks.size())
		{
			m_chunks.push_back(CustomPacketChunk(std::min(size, MaxWritableChunkSize())));
		}
		CustomPacketChunk& chnk = m_chunks[m_chunk];
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

char* CustomPacketBase::ReadBytes(size_t size, bool padStr)
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
		CustomPacketChunk& chunk = m_chunks[m_chunk];
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

void CustomPacketBase::Clear()
{
	m_chunks.clear();
	Reset();
}

PACKET_OPCODE_TYPE CustomPacketBase::Opcode()
{
	return m_opcode;
}
