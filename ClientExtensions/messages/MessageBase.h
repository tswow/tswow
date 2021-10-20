#pragma once

#include "MessageChunk.h"

#include <vector>

class MessageBase {
public:
	MessageBase(MessageBase const& base);
	MessageBase();
	MessageBase(size_t maxChunkSize, size_t initialSize);
	std::vector<MessageChunk> const& buildMessages(uint16_t messageId);

	void Reset();
	void Destroy();
	void Clear();

	bool IsPersistent();
	void SetPersistent();

	void Push(MessageChunk& chnk);
	size_t Size();
	MessageChunk* Chunk(size_t index);
	size_t ChunkSize(size_t index);
	size_t ChunkCount();

	void Print(
		std::function<void(std::ostream&, uint8_t)> cb
		, std::ostream& stream = std::cout
	);

	void PrintAscii(std::ostream& stream = std::cout);
	void PrintBytes(std::ostream& stream = std::cout);

protected:
	size_t MaxWritableChunkSize();

	// called by constructor and raw byte allocations
	void Increase(size_t increase);

	// invariant: sizeof(T) < m_maxMessageSize
	template <typename T>
	void Write(T value)
	{
		if (m_chunks.size() == 0)
		{
			m_chunks.push_back(MessageChunk(sizeof(T)));
		}

		MessageChunk* chnk = &m_chunks[m_chunk];

		// we have space
		if (chnk->RemBytes(m_idx) >= sizeof(T))
		{
			chnk->Write(m_idx, value);
			m_idx += sizeof(T);
		}

		// we can increase the current chunk
		else if ((m_idx + sizeof(value)) <= MaxWritableChunkSize())
		{
			chnk->Increase(sizeof(T) - chnk->RemBytes(m_idx));
			chnk->Write(m_idx, value);
			m_idx += sizeof(T);
		}

		// we need to allocate a new chunk
		else
		{
			if (m_chunk == m_chunks.size() - 1)
			{
				m_chunks.push_back(MessageChunk(sizeof(T)));
				m_size += sizeof(T);
			}
			++m_chunk;
			chnk = &m_chunks[m_chunk];
			chnk->Write(0, value);
			m_idx = sizeof(T);
		}
	}

	template <typename T>
	T Read(T def)
	{
		if (m_chunk >= m_chunks.size()) return def;

		MessageChunk& chnk = m_chunks[m_chunk];

		// there is space left to read here
		if (chnk.RemBytes(m_idx) >= sizeof(T))
		{
			size_t old = m_idx;
			m_idx += sizeof(T);
			return chnk.Read<T>(old);
		}

		m_chunk++;
		m_idx = 0;
		return Read(def);
	}

	void WriteBytes(size_t size, char const* bytes);
	char* ReadBytes(size_t size, bool padStr = false);

private:
	std::vector<MessageChunk> m_chunks;
	size_t m_size;
	size_t m_maxChunkSize; // including header

	size_t m_idx; // chunk read index
	size_t m_chunk; // chunk to read

	bool m_persistent;
};
