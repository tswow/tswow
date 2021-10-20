
#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp>

#include "CustomPacketBuffer.h"

std::vector<CustomPacketChunk> makePacket(uint16_t packetId, size_t chunkSize, size_t size)
{
	CustomPacketWrite write(0, sizeof(CustomPacketHeader)+chunkSize,size);
	return write.buildMessages(packetId);
}

char* makePacketSingle(uint16_t packetId, size_t size)
{
	return makePacket(packetId, size, size)[0].Data();
}

CustomPacketBuffer buffer(size_t maxFragment, size_t maxTotal, size_t minFragment = 0)
{
	return CustomPacketBuffer(minFragment, maxTotal + sizeof(CustomPacketHeader), maxFragment + sizeof(CustomPacketHeader));
}

TEST_CASE("[MessageBuffer] single packets") {
	for (size_t i = 1; i < 5; ++i) {
			SECTION("single packet " + std::to_string(i)) {
				CustomPacketBuffer b = buffer(i,i);
				char* packet = makePacketSingle(0, i);
				REQUIRE(b.ReceivePacket(i+sizeof(CustomPacketHeader), packet) == CustomPacketResult::HANDLED_MESSAGE);
		}
	}
}

TEST_CASE("[MessageBuffer] multiple packets") {
	CustomPacketBuffer b = buffer(2,4+2*sizeof(CustomPacketHeader));
	std::vector<CustomPacketChunk> chnks = makePacket(0, 2, 4);
	REQUIRE(b.ReceivePacket(sizeof(CustomPacketHeader)+2, chnks[0].Data()) == CustomPacketResult::HANDLED_FRAGMENT);
	REQUIRE(b.ReceivePacket(sizeof(CustomPacketHeader)+2, chnks[1].Data()) == CustomPacketResult::HANDLED_MESSAGE);
}

TEST_CASE("[MessageBuffer] NO_HEADER") {
	CustomPacketBuffer b = buffer(1000,1000);
	REQUIRE(b.ReceivePacket(sizeof(CustomPacketHeader) - 1,new char[1]) == CustomPacketResult::NO_HEADER);
}

TEST_CASE("[MessageBuffer] HEADER_MISMATCH") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(0, 2, 4);
	chnks[0].Header()->totalFrags = 25;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())  // sanity
		== CustomPacketResult::HANDLED_FRAGMENT);

	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== CustomPacketResult::HEADER_MISMATCH);
}

TEST_CASE("[MessageBuffer] INVALID_FRAG_COUNT") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(0, 1, 1);
	chnks[0].Header()->totalFrags = 0;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::INVALID_FRAG_COUNT);
}

TEST_CASE("[MessageBuffer] INVALID_FIRST_FRAG") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(0, 1, 2);
	chnks[0].Header()->fragmentId = 1;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::INVALID_FIRST_FRAG);
}

TEST_CASE("[MessageBuffer] INVALID_FRAG_ID") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(0, 1, 2);
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::HANDLED_FRAGMENT);

	chnks[1].Header()->fragmentId = 0;
	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== CustomPacketResult::INVALID_FRAG_ID);
}

TEST_CASE("[MessageBuffer] TOO_SMALL_FRAGMENT") {
	CustomPacketBuffer b = buffer(1000, 1000,sizeof(CustomPacketHeader) + 2);

	SECTION("does not fire for single packets") {
		std::vector<CustomPacketChunk> chnks = makePacket(0, 1, 1);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::HANDLED_MESSAGE
		);
	}

	SECTION("does not fire for last message") {
		std::vector<CustomPacketChunk> chnks = makePacket(0, 2, 3);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::HANDLED_FRAGMENT
		);
		REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
			== CustomPacketResult::HANDLED_MESSAGE
		);
	}

	SECTION("fires for non-last fragments") {
		std::vector<CustomPacketChunk> chnks = makePacket(0, 1, 2);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::TOO_SMALL_FRAGMENT);
	}
}

TEST_CASE("[MessageBuffer] TOO_BIG_FRAGMENT") {
	CustomPacketBuffer b = buffer(1, 1);
		std::vector<CustomPacketChunk> chnks = makePacket(0, 2, 2);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::TOO_BIG_FRAGMENT);
}

TEST_CASE("[MessageBuffer] OUT_OF_SPACE") {
	CustomPacketBuffer b = buffer(9999, 3);
	std::vector<CustomPacketChunk> chnks = makePacket(0, 2, 4);
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::HANDLED_FRAGMENT);

	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== CustomPacketResult::OUT_OF_SPACE);
}
