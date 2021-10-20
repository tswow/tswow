#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp >

#include "MessageChunk.h"

TEST_CASE("[MessageChunk] construction") {
	MessageChunk chunk(10);
	chunk.Destroy();
}

TEST_CASE("[MessageChunk] size") {
	SECTION("correct on empty chunk") {
		MessageChunk chunk(0);
		REQUIRE(chunk.Size() == 0);
		chunk.Destroy();
	}

	SECTION("correct on non-empty chunk") {
		MessageChunk chunk(1);
		REQUIRE(chunk.Size() == 1);
		chunk.Destroy();
	}
}

TEST_CASE("[MessageChunk] read/write") {
	MessageChunk chunk(10);

	SECTION("single value") {
		chunk.Write<uint8_t>(0,25);
		REQUIRE(MessageChunk(chunk).Read<uint8_t>(0) == 25);
	}

	SECTION("multiple values") {
		chunk.Write<uint8_t>(0, 25);
		chunk.Write<uint16_t>(1, 1768);
		MessageChunk r(chunk);
		REQUIRE(r.Read<uint8_t>(0) == 25);
		REQUIRE(r.Read<uint16_t>(1) == 1768);
	}
	chunk.Destroy();
}

TEST_CASE("[MessageChunk] offset") {
	MessageChunk chunk(1);
	SECTION("zero argument") {
		REQUIRE(chunk.Offset(0) == chunk.Data() + sizeof(MessageHeader));
	}

	SECTION("non-zero argument") {
		REQUIRE(chunk.Offset(1) == chunk.Data() + 1 + sizeof(MessageHeader));
	}
	chunk.Destroy();
}

TEST_CASE("[MessageChunk] writeBytes") {
	MessageChunk chunk(10);
	SECTION("single value") {
		chunk.WriteBytes(0, 5, "abcd\0");
		REQUIRE_THAT(chunk.Offset(0), Catch::Matchers::Equals("abcd"));
	}

	SECTION("multiple values") {
		chunk.WriteBytes(0, 5, "abcd\0");
		chunk.WriteBytes(5, 5, "efgh\0");
		REQUIRE_THAT(chunk.Offset(0), Catch::Matchers::Equals("abcd"));
		REQUIRE_THAT(chunk.Offset(5), Catch::Matchers::Equals("efgh"));
	}
	chunk.Destroy();
}
