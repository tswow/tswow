#include "CustomPacketBase.h"

#include <string>
#include <stdexcept>

CustomPacketBase::CustomPacketBase(CustomPacketBase const& base)
    : m_size(base.m_size)
    , m_maxChunkSize(base.m_maxChunkSize)
    , m_idx(0)
    , m_global_idx(0)
    , m_chunk(0)
    , m_chunks(base.m_chunks)
    , m_opcode(base.m_opcode)
{}

CustomPacketBase::CustomPacketBase()
    : m_size(0)
    , m_maxChunkSize(0)
    , m_idx(0)
    , m_global_idx(0)
    , m_chunk(0)
    , m_opcode(0)
{}

CustomPacketBase::CustomPacketBase(
      opcode_t opcode
    , chunkSize_t maxChunkSize
    , totalSize_t initialSize
    )
    : m_size(0)
    , m_idx(0)
    , m_global_idx(0)
    , m_chunk(0)
    , m_maxChunkSize(maxChunkSize)
    , m_opcode(opcode)
{
    if (maxChunkSize <= CustomHeaderSize)
    {
        throw std::runtime_error(
            "Maximum chunk size ("
            + std::to_string(maxChunkSize)
            + ") is <= message header size ("
            + std::to_string(CustomHeaderSize)
            + "), you can't send any messages!"
        );
    }

    if (initialSize > 0)
    {
        Increase(initialSize);
    }
}

std::vector<CustomPacketChunk> & CustomPacketBase::buildMessages()
{
    for (chunkCount_t i = 0; i < m_chunks.size(); ++i)
    {
        CustomPacketChunk& chnk = m_chunks[i];
        CustomPacketHeader* hdr = chnk.Header();
        hdr->opcode = m_opcode;
        hdr->fragmentId = i;
        hdr->totalFrags = chunkCount_t(m_chunks.size());
    }
    return m_chunks;
}

void CustomPacketBase::Reset()
{
    m_chunk = 0;
    m_idx = 0;
    m_global_idx = 0;
    m_size = 0;
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


totalSize_t CustomPacketBase::Size()
{
    return m_size;
}


CustomPacketChunk* CustomPacketBase::Chunk(chunkCount_t index)
{
    return &m_chunks[index];
}


chunkSize_t CustomPacketBase::ChunkSize(chunkCount_t index)
{
    return m_chunks[index].Size();
}


chunkCount_t CustomPacketBase::ChunkCount()
{
    return chunkCount_t(m_chunks.size());
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




chunkSize_t CustomPacketBase::MaxWritableChunkSize()
{
    return m_maxChunkSize - CustomHeaderSize;
}

void CustomPacketBase::Increase(totalSize_t increase)
{
    // increase size
    if (m_chunks.size() > 0)
    {
        CustomPacketChunk& chnk = m_chunks[m_chunks.size() - 1];
        chunkSize_t inc = std::min(
              uint32_t(chnk.Size() + increase)
            , uint32_t(MaxWritableChunkSize())
        );
        if (inc > 0)
        {
            chnk.Increase(inc);
        }
    }

    totalSize_t newSize = m_size + increase;
    chunkCount_t firstNewChunk = chunkCount_t(m_chunks.size());
    m_chunks.resize(
        chunkCount_t(std::ceil(double(newSize) / double(MaxWritableChunkSize())))
    );
    chunkCount_t remInc = newSize;
    for (chunkCount_t i = firstNewChunk; i < m_chunks.size(); ++i)
    {
        chunkSize_t size = i == (m_chunks.size() - 1)
            ? remInc
            : MaxWritableChunkSize();
        remInc -= size;
        m_chunks[i] = CustomPacketChunk(size);
    }
    m_size = newSize;
}

void CustomPacketBase::WriteBytes(totalSize_t size, char const* bytes)
{
    while (size > 0)
    {
        if (m_chunk >= m_chunks.size())
        {
            chunkSize_t inc = chunkSize_t(
                std::min(uint32_t(size)
                    , uint32_t(MaxWritableChunkSize()))
            );
            m_size += inc;
            m_chunks.push_back(CustomPacketChunk(inc));
        } else if (m_idx == MaxWritableChunkSize()) {
            m_chunk++;
            m_idx = 0;
            continue;
        }

        CustomPacketChunk& chnk = m_chunks[m_chunk];
        if (size >= chnk.RemBytes(m_idx))
        {
            totalSize_t inc = std::min(
                  uint32_t(size-chnk.RemBytes(m_idx))
                , uint32_t(MaxWritableChunkSize()-chnk.Size())
            );
            chnk.Increase(inc);
            m_size += inc;
        }

        totalSize_t written = chunkSize_t(
            std::min(totalSize_t(chnk.RemBytes(m_idx)), size)
        );

        chnk.WriteBytes(m_idx, written, bytes);
        bytes += written;
        size -= written;
        if (size == 0)
        {
            incIdx(written);
        }
        else
        {
            m_idx = 0;
            ++m_chunk;
        }
    }
}

void CustomPacketBase::ReadBytes(totalSize_t size, char* bytes)
{
    if (m_size - m_global_idx < size)
    {
        return;
    }
    totalSize_t offset = 0;
    while (size > 0)
    {
        if (m_chunk >= m_chunks.size()) break;
        CustomPacketChunk& chunk = m_chunks[m_chunk];
        chunkSize_t read = chunkSize_t(std::min(
            size
            , totalSize_t(chunk.RemBytes(m_idx))
        ));
        chunk.ReadBytes(m_idx, read, bytes + offset);
        size -= read;
        offset += read;
        if (size == 0)
        {
            incIdx(read);
        }
        else
        {
            m_idx = 0;
            ++m_chunk;
        }
    }
}

char* CustomPacketBase::ReadBytes(totalSize_t size, bool padStr)
{
    if (m_size - m_global_idx < size)
    {
        return nullptr;
    }
    char* c = new char[size + (padStr ? 1 : 0)];
    ReadBytes(size, c);
    return c;
}

void CustomPacketBase::Clear()
{
    m_chunks.clear();
    Reset();
}

opcode_t CustomPacketBase::Opcode()
{
    return m_opcode;
}

void CustomPacketBase::incIdx(chunkSize_t amount)
{
    m_idx += amount;
    m_global_idx += amount;
}
