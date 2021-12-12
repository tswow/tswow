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
        WriteBytes(sizeof(value), (char const*)&value);
    }

    template <typename T>
    T Read(T def)
    {
        if (m_size - m_global_idx < sizeof(T))
        {
            return def;
        }
        ReadBytes(sizeof(def), (char*)&def);
        return def;
    }

    void WriteBytes(totalSize_t size, char const* bytes);
    void ReadBytes(totalSize_t size, char* bytes);
    char* ReadBytes(totalSize_t size, bool padStr = false);
private:
    void incIdx(chunkSize_t amount);

    std::vector<CustomPacketChunk> m_chunks;
    totalSize_t m_size;
    chunkSize_t m_maxChunkSize; // including header
    totalSize_t m_global_idx; // global read index
    chunkSize_t m_idx; // chunk read index
    chunkCount_t m_chunk; // chunk to read
    opcode_t m_opcode;

    friend class CustomPacketBuffer;
};
