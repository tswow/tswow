
#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp>

#include "CustomPacketDefines.h"
#include "CustomPacketBuffer.h"

std::vector<CustomPacketChunk> makePacket(chunkSize_t chunkSize, totalSize_t size)
{
	CustomPacketWrite write(0, CustomHeaderSize+chunkSize,size);
	return write.buildMessages();
}

char* makePacketSingle(chunkSize_t size)
{
	return makePacket(size, size)[0].Data();
}

CustomPacketBuffer buffer(chunkSize_t maxFragment, totalSize_t maxTotal, chunkSize_t minFragment = 0)
{
	return CustomPacketBuffer(minFragment, maxTotal + CustomHeaderSize, maxFragment + CustomHeaderSize);
}

TEST_CASE("[MessageBuffer] single packets") {
	for (chunkSize_t i = 1; i < 5; ++i) {
			SECTION("single packet " + std::to_string(i)) {
				CustomPacketBuffer b = buffer(i,i);
				char* packet = makePacketSingle(i);
				REQUIRE(b.ReceivePacket(i+CustomHeaderSize, packet) == CustomPacketResult::HANDLED_MESSAGE);
		}
	}
}

TEST_CASE("[MessageBuffer] multiple packets") {
	CustomPacketBuffer b = buffer(2,4+2*CustomHeaderSize);
	std::vector<CustomPacketChunk> chnks = makePacket(2, 4);
	REQUIRE(b.ReceivePacket(CustomHeaderSize+2, chnks[0].Data()) == CustomPacketResult::HANDLED_FRAGMENT);
	REQUIRE(b.ReceivePacket(CustomHeaderSize+2, chnks[1].Data()) == CustomPacketResult::HANDLED_MESSAGE);
}

TEST_CASE("[MessageBuffer] NO_HEADER") {
	CustomPacketBuffer b = buffer(1000,1000);
	REQUIRE(b.ReceivePacket(CustomHeaderSize - 1,new char[1]) == CustomPacketResult::NO_HEADER);
}

TEST_CASE("[MessageBuffer] HEADER_MISMATCH") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(2, 4);
	chnks[0].Header()->totalFrags = 25;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())  // sanity
		== CustomPacketResult::HANDLED_FRAGMENT);

	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== CustomPacketResult::HEADER_MISMATCH);
}

TEST_CASE("[MessageBuffer] INVALID_FRAG_COUNT") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(1, 1);
	chnks[0].Header()->totalFrags = 0;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::INVALID_FRAG_COUNT);
}

TEST_CASE("[MessageBuffer] INVALID_FIRST_FRAG") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(1, 2);
	chnks[0].Header()->fragmentId = 1;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::INVALID_FIRST_FRAG);
}

TEST_CASE("[MessageBuffer] INVALID_FRAG_ID") {
	CustomPacketBuffer b = buffer(1000, 1000);
	std::vector<CustomPacketChunk> chnks = makePacket(1, 2);
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::HANDLED_FRAGMENT);

	chnks[1].Header()->fragmentId = 0;
	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== CustomPacketResult::INVALID_FRAG_ID);
}

TEST_CASE("[MessageBuffer] TOO_SMALL_FRAGMENT") {
	CustomPacketBuffer b = buffer(1000, 1000,CustomHeaderSize + 2);

	SECTION("does not fire for single packets") {
		std::vector<CustomPacketChunk> chnks = makePacket(1, 1);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::HANDLED_MESSAGE
		);
	}

	SECTION("does not fire for last message") {
		std::vector<CustomPacketChunk> chnks = makePacket(2, 3);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::HANDLED_FRAGMENT
		);
		REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
			== CustomPacketResult::HANDLED_MESSAGE
		);
	}

	SECTION("fires for non-last fragments") {
		std::vector<CustomPacketChunk> chnks = makePacket(1, 2);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::TOO_SMALL_FRAGMENT);
	}
}

TEST_CASE("[MessageBuffer] TOO_BIG_FRAGMENT") {
	CustomPacketBuffer b = buffer(1, 1);
		std::vector<CustomPacketChunk> chnks = makePacket(2, 2);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== CustomPacketResult::TOO_BIG_FRAGMENT);
}

TEST_CASE("[MessageBuffer] OUT_OF_SPACE") {
	CustomPacketBuffer b = buffer(9999, 3);
	std::vector<CustomPacketChunk> chnks = makePacket(2, 4);
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== CustomPacketResult::HANDLED_FRAGMENT);

	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== CustomPacketResult::OUT_OF_SPACE);
}

TEST_CASE("[MessageBuffer] Memory") {
	SECTION("does not release memory for single packets") {
		CustomPacketBuffer b = buffer(1, 1);
		std::vector<CustomPacketChunk> chnks = makePacket(1, 1);
		b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data());
		chnks[0].Destroy();
	}

	SECTION("does not release memory for the last packet received") {
		CustomPacketBuffer b = buffer(1, 2);
		std::vector<CustomPacketChunk> chnks = makePacket(1, 2);
		b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data());
		b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data());
		chnks[1].Destroy();
	}
}
