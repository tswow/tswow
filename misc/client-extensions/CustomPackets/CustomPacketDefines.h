#pragma once

#include <cstdint>

// <= uint32_t
typedef uint16_t opcode_t;

// <= uint32_t
typedef uint32_t totalSize_t;
constexpr totalSize_t TotalSizeNpos = UINT16_MAX;

// <= totalSize_t
typedef uint16_t chunkSize_t;

// <= uint32_t
typedef uint16_t chunkCount_t;

// The maximum size of a single packet fragment.
constexpr chunkSize_t MAX_FRAGMENT_SIZE = 30000;
constexpr chunkSize_t MIN_FRAGMENT_SIZE = 25000;

// default: ~8mb
constexpr totalSize_t BUFFER_QUOTA = 8000000;

#define CustomHeaderSize chunkSize_t(sizeof(CustomPacketHeader))

// These are the _base_ opcodes, not to be confused with custom packet opcode.
// I currently use a CMSG packet id for server->client,
// because I couldn't get the client to accept higher message ids.
constexpr uint16_t SERVER_TO_CLIENT_OPCODE = 0x102;
constexpr uint16_t CLIENT_TO_SERVER_OPCODE = 0x51f;

#ifndef TC_GAME_API
#if defined(_MSC_VER)
#define CUSTOM_PACKET_API __declspec(dllexport)
#else
#define CUSTOM_PACKET_API __attribute__((visibility("default")))
#endif
#endif
