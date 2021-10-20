#include "CustomPacketBuffer.h"

CustomPacketBuffer::CustomPacketBuffer(size_t minFragmentSize, size_t quota, size_t bufferSize)
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

CustomPacketResult CustomPacketBuffer::ReceivePacket(size_t size, char* data)
{
	// Check sizes

	if (size < sizeof(CustomPacketHeader))
	{
		return _onError(CustomPacketResult::NO_HEADER, data);
	}

	if (size > m_maxFragmentSize)
	{
		return _onError(CustomPacketResult::TOO_BIG_FRAGMENT, data);
	}

	if (size + m_cur.Size() > m_quota)
	{
		return _onError(CustomPacketResult::OUT_OF_SPACE, data);
	}

	CustomPacketChunk chnk(size, data);
	CustomPacketHeader* hdr = chnk.Header();

	// remove old message on id mismatch
	// (packets out of order are not permitted)
	if (m_cur.ChunkCount() > 0)
	{
		if (m_cur.Chunk(0)->Header()->msgId != hdr->msgId)
		{
			m_cur.Destroy();
		}
	}

	switch (hdr->totalFrags)
	{
	case 0:
		return _onError(CustomPacketResult::INVALID_FRAG_COUNT, data);
	case 1:
		m_cur.Push(chnk);
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

			m_cur.Push(chnk);
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
			m_cur.Push(chnk);
			return _onSuccess();
		}
		else
		{
			// small fragments only apply to
			if (size < m_minFragmentSize)
			{
				return _onError(CustomPacketResult::TOO_SMALL_FRAGMENT, data);
			}
			m_cur.Push(chnk);
			return CustomPacketResult::HANDLED_FRAGMENT;
		}
	}
}

CustomPacketResult CustomPacketBuffer::_onError(CustomPacketResult error, char* data)
{
	OnError(error);
	m_cur.Destroy();
	delete[] data;
	return error;
}

CustomPacketResult CustomPacketBuffer::_onSuccess()
{
	OnPacket(&m_cur);
	m_cur.Clear();;
	return CustomPacketResult::HANDLED_MESSAGE;
}
