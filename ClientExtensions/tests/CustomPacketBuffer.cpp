
#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp>

#include "MessageBuffer.h"

std::vector<MessageChunk> makePacket(uint16_t packetId, size_t chunkSize, size_t size)
{
	MessageWrite write(0, sizeof(MessageHeader)+chunkSize,size);
	return write.buildMessages(packetId);
}

char* makePacketSingle(uint16_t packetId, size_t size)
{
	return makePacket(packetId, size, size)[0].Data();
}

MessageBuffer buffer(size_t maxFragment, size_t maxTotal, size_t minFragment = 0)
{
	return MessageBuffer(minFragment, maxTotal + sizeof(MessageHeader), maxFragment + sizeof(MessageHeader));
}

TEST_CASE("[MessageBuffer] single packets") {
	for (size_t i = 1; i < 5; ++i) {
			SECTION("single packet " + std::to_string(i)) {
				MessageBuffer b = buffer(i,i);
				char* packet = makePacketSingle(0, i);
				REQUIRE(b.ReceivePacket(i+sizeof(MessageHeader), packet) == MessageResult::HANDLED_MESSAGE);
		}
	}
}

TEST_CASE("[MessageBuffer] multiple packets") {
	MessageBuffer b = buffer(2,4+2*sizeof(MessageHeader));
	std::vector<MessageChunk> chnks = makePacket(0, 2, 4);
	REQUIRE(b.ReceivePacket(sizeof(MessageHeader)+2, chnks[0].Data()) == MessageResult::HANDLED_FRAGMENT);
	REQUIRE(b.ReceivePacket(sizeof(MessageHeader)+2, chnks[1].Data()) == MessageResult::HANDLED_MESSAGE);
}

TEST_CASE("[MessageBuffer] NO_HEADER") {
	MessageBuffer b = buffer(1000,1000);
	REQUIRE(b.ReceivePacket(sizeof(MessageHeader) - 1,new char[1]) == MessageResult::NO_HEADER);
}

TEST_CASE("[MessageBuffer] HEADER_MISMATCH") {
	MessageBuffer b = buffer(1000, 1000);
	std::vector<MessageChunk> chnks = makePacket(0, 2, 4);
	chnks[0].Header()->totalFrags = 25;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())  // sanity
		== MessageResult::HANDLED_FRAGMENT);

	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== MessageResult::HEADER_MISMATCH);
}

TEST_CASE("[MessageBuffer] INVALID_FRAG_COUNT") {
	MessageBuffer b = buffer(1000, 1000);
	std::vector<MessageChunk> chnks = makePacket(0, 1, 1);
	chnks[0].Header()->totalFrags = 0;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== MessageResult::INVALID_FRAG_COUNT);
}

TEST_CASE("[MessageBuffer] INVALID_FIRST_FRAG") {
	MessageBuffer b = buffer(1000, 1000);
	std::vector<MessageChunk> chnks = makePacket(0, 1, 2);
	chnks[0].Header()->fragmentId = 1;
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== MessageResult::INVALID_FIRST_FRAG);
}

TEST_CASE("[MessageBuffer] INVALID_FRAG_ID") {
	MessageBuffer b = buffer(1000, 1000);
	std::vector<MessageChunk> chnks = makePacket(0, 1, 2);
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== MessageResult::HANDLED_FRAGMENT);

	chnks[1].Header()->fragmentId = 0;
	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== MessageResult::INVALID_FRAG_ID);
}

TEST_CASE("[MessageBuffer] TOO_SMALL_FRAGMENT") {
	MessageBuffer b = buffer(1000, 1000,sizeof(MessageHeader) + 2);

	SECTION("does not fire for single packets") {
		std::vector<MessageChunk> chnks = makePacket(0, 1, 1);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== MessageResult::HANDLED_MESSAGE
		);
	}

	SECTION("does not fire for last message") {
		std::vector<MessageChunk> chnks = makePacket(0, 2, 3);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== MessageResult::HANDLED_FRAGMENT
		);
		REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
			== MessageResult::HANDLED_MESSAGE
		);
	}

	SECTION("fires for non-last fragments") {
		std::vector<MessageChunk> chnks = makePacket(0, 1, 2);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== MessageResult::TOO_SMALL_FRAGMENT);
	}
}

TEST_CASE("[MessageBuffer] TOO_BIG_FRAGMENT") {
	MessageBuffer b = buffer(1, 1);
		std::vector<MessageChunk> chnks = makePacket(0, 2, 2);
		REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
			== MessageResult::TOO_BIG_FRAGMENT);
}

TEST_CASE("[MessageBuffer] OUT_OF_SPACE") {
	MessageBuffer b = buffer(9999, 3);
	std::vector<MessageChunk> chnks = makePacket(0, 2, 4);
	REQUIRE(b.ReceivePacket(chnks[0].FullSize(), chnks[0].Data())
		== MessageResult::HANDLED_FRAGMENT);

	REQUIRE(b.ReceivePacket(chnks[1].FullSize(), chnks[1].Data())
		== MessageResult::OUT_OF_SPACE);
}
