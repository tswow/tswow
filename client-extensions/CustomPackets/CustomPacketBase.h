#pragma once

#include "CustomPacketChunk.h"
#include "CustomPacketDefines.h"

#include <vector>

class CUSTOM_PACKET_API CustomPacketBase {
public:
    CustomPacketBase(
        CustomPacketBase const& base
    );
    CustomPacketBase();
    CustomPacketBase(
          opcode_t opcode
        , chunkSize_t maxChunkSize
        , totalSize_t initialSize
    );
    std::vector<CustomPacketChunk> & buildMessages();

    void Reset();
    void Destroy();
    void Clear();

    void Push(CustomPacketChunk& chnk);
    totalSize_t Size();
    CustomPacketChunk* Chunk(chunkCount_t index);
    chunkSize_t ChunkSize(chunkCount_t index);
    chunkCount_t ChunkCount();

    opcode_t Opcode();

    void Print(
        std::function<void(std::ostream&, uint8_t)> cb
        , std::ostream& stream = std::cout
    );

    void PrintAscii(std::ostream& stream = std::cout);
    void PrintBytes(std::ostream& stream = std::cout);

protected:
    chunkSize_t MaxWritableChunkSize();

    // called by constructor and raw byte allocations
    void Increase(totalSize_t increase);

    // invariant: sizeof(T) < m_maxMessageSize
    template <typename T>
    void Write(T value)
    {
        if (sizeof(T) >= sizeof(chunkSize_t) - CustomHeaderSize)
        {
            return;
        }

        if (m_chunks.size() == 0)
        {
            m_chunks.push_back(CustomPacketChunk(sizeof(T)));
        }

        CustomPacketChunk* chnk = &m_chunks[m_chunk];

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
                m_chunks.push_back(CustomPacketChunk(sizeof(T)));
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
        if (sizeof(T) >= sizeof(chunkSize_t) - CustomHeaderSize)
        {
            return def;
        }

        if (m_chunk >= m_chunks.size()) return def;

        CustomPacketChunk& chnk = m_chunks[m_chunk];

        // there is space left to read here
        if (chnk.RemBytes(m_idx) >= sizeof(T))
        {
            chunkCount_t old = m_idx;
            m_idx += chunkCount_t(sizeof(T));
            return chnk.Read<T>(old);
        }

        m_chunk++;
        m_idx = 0;
        return Read(def);
    }

    void WriteBytes(totalSize_t size, char const* bytes);
    char* ReadBytes(totalSize_t size, bool padStr = false);

private:
    std::vector<CustomPacketChunk> m_chunks;
    totalSize_t m_size;
    chunkSize_t m_maxChunkSize; // including header

    chunkSize_t m_idx; // chunk read index
    chunkCount_t m_chunk; // chunk to read

    opcode_t m_opcode;

    friend class CustomPacketBuffer;
};
