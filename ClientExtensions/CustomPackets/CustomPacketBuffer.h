#pragma once

#include "CustomPacketRead.h"

enum class CustomPacketResult {
	NO_HEADER            = 0x1,   // 1
	HEADER_MISMATCH      = 0x2,   // 2
	INVALID_FRAG_COUNT   = 0x4,   // 4
	INVALID_FIRST_FRAG   = 0x8,   // 8
	INVALID_FRAG_ID      = 0x10,  // 16
	TOO_SMALL_FRAGMENT   = 0x20,  // 32
	TOO_BIG_FRAGMENT     = 0x40,  // 64
	OUT_OF_SPACE         = 0x80,  // 128
	HANDLED_FRAGMENT     = 0x100, // 256
	HANDLED_MESSAGE      = 0x200, // 512

	ANY_SUCCESS = HANDLED_FRAGMENT
							| HANDLED_MESSAGE,

	ANY_ERROR = NO_HEADER
						| HEADER_MISMATCH
						| INVALID_FRAG_COUNT
						| INVALID_FRAG_ID
						| TOO_SMALL_FRAGMENT
						| TOO_BIG_FRAGMENT
						| OUT_OF_SPACE
						| INVALID_FIRST_FRAG
};

class CustomPacketBuffer {
public:
	CustomPacketBuffer(size_t minFragmentSize, size_t quota, size_t bufferSize);
	~CustomPacketBuffer();
	CustomPacketResult ReceivePacket(size_t size, char* data);
protected:
	// Note: it is your own responsibility to destroy
	// the message chunks, the buffer only destroys
	// the message itself!
	virtual void OnPacket(CustomPacketRead * value) {}
	virtual void OnError(CustomPacketResult error) {}
private:
	size_t m_quota;
	size_t m_minFragmentSize;
	size_t m_maxFragmentSize;
	CustomPacketRead m_cur;
	CustomPacketResult _onError(CustomPacketResult error, char* data);
	CustomPacketResult _onSuccess();
};
