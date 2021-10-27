#include "CustomPacketBuffer.h"

CustomPacketBuffer::CustomPacketBuffer(
      chunkSize_t minFragmentSize
    , totalSize_t quota
    , chunkSize_t bufferSize
)
    : m_minFragmentSize(minFragmentSize)
    , m_maxFragmentSize(bufferSize)
    , m_quota(quota)
    , m_cur(0,bufferSize)
{}

CustomPacketBuffer::~CustomPacketBuffer()
{
    // needed on server
    m_cur.Destroy();
}

CustomPacketResult CustomPacketBuffer::ReceivePacket(chunkSize_t size, char* data)
{
    // Check sizes

    if (size <= CustomHeaderSize)
    {
        return _onError(CustomPacketResult::NO_HEADER, data);
    }

    if (size > m_maxFragmentSize)
    {
        return _onError(CustomPacketResult::TOO_BIG_FRAGMENT, data);
    }

    if (size + m_cur.Size() > m_quota)
    {
        m_cur.Destroy();
        return _onError(CustomPacketResult::OUT_OF_SPACE, data);
    }

    CustomPacketChunk chnk(size, data);
    CustomPacketHeader* hdr = chnk.Header();

    switch (hdr->totalFrags)
    {
    case 0:
        return _onError(CustomPacketResult::INVALID_FRAG_COUNT, data);
    case 1:
        AppendFragment(chnk, true);
        return _onSuccess();
    default:
        if (m_cur.ChunkCount() == 0)
        {
            if (hdr->fragmentId != 0)
            {
                return _onError(CustomPacketResult::INVALID_FIRST_FRAG, data);
            }

            if (size < m_minFragmentSize)
            {
                return _onError(CustomPacketResult::TOO_SMALL_FRAGMENT, data);
            }
            AppendFragment(chnk, false);
            return CustomPacketResult::HANDLED_FRAGMENT;
        }
        else
        {
            CustomPacketHeader* lastH = m_cur->Chunk(m_cur->ChunkCount() - 1)->Header();
            if (lastH->totalFrags != hdr->totalFrags)
            {
                return _onError(CustomPacketResult::HEADER_MISMATCH, data);
            }

            if (hdr->fragmentId != lastH->fragmentId + 1)
            {
                return _onError(CustomPacketResult::INVALID_FRAG_ID, data);
            }
        }

        if (
            m_cur.ChunkCount() > 0
            && hdr->fragmentId == m_cur.Chunk(0)->Header()->totalFrags - 1
        ) {
            AppendFragment(chnk, true);
            return _onSuccess();
        }
        else
        {
            // small fragments only apply to
            if (size < m_minFragmentSize)
            {
                return _onError(CustomPacketResult::TOO_SMALL_FRAGMENT, data);
            }
            AppendFragment(chnk, false);
            return CustomPacketResult::HANDLED_FRAGMENT;
        }
    }
}

CustomPacketResult CustomPacketBuffer::_onError(CustomPacketResult error, char* data)
{
    OnError(error);
    m_cur.Destroy();
    return error;
}

CustomPacketResult CustomPacketBuffer::_onSuccess()
{
    OnPacket(&m_cur);

    // destroy all but the last fragment, since it's not a copy
    for (chunkCount_t i = 0; i < m_cur.m_chunks.size() - 1; ++i)
    {
        m_cur.m_chunks[i].Destroy();
    }
    m_cur.Clear();
    return CustomPacketResult::HANDLED_MESSAGE;
}

void CustomPacketBuffer::AppendFragment(CustomPacketChunk & chunk, bool isLast)
{
    // buffer entries need to be made persistent
    if (isLast)
    {
        // todo: probably should happen elsewhere
        m_cur->m_opcode = chunk.Header()->opcode;
        m_cur.Push(chunk);
    }
    else
    {
        CustomPacketChunk cpy(chunk);
        cpy.Copy();
        m_cur.Push(cpy);
    }
}

totalSize_t CustomPacketBuffer::Size()
{
    return m_cur.Size();
}
