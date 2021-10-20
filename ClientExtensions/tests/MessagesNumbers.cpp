#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp >

#include "MessageWrite.h"
#include "MessageRead.h"

#define INT_TEST(writeFn,readFn,name,min,max,norm)     \
TEST_CASE(#name,"[MessageBase]") {                     \
  MessageWrite write;                                  \
  SECTION("writes upper boundary") {                   \
    write.writeFn(max);                                \
    REQUIRE(MessageRead(write).readFn() == max);       \
  }                                                    \
                                                       \
  SECTION("writes lower boundary") {                   \
    write.writeFn(min);                                \
    REQUIRE(MessageRead(write).readFn() == min);       \
  }                                                    \
                                                       \
  SECTION("writes zero") {                             \
    write.writeFn(0);                                  \
    REQUIRE(MessageRead(write).readFn() == 0);         \
  }                                                    \
                                                       \
  SECTION("writes normal value") {                     \
    write.writeFn(norm);                               \
    REQUIRE(MessageRead(write).readFn() == norm);      \
  }                                                    \
}

INT_TEST(WriteUInt8, ReadUInt8, uint8, 0, UINT8_MAX, 176)
INT_TEST(WriteInt8, ReadInt8, int8, INT8_MIN,INT8_MAX, -5)

INT_TEST(WriteUInt16, ReadUInt16, uint16, 0, UINT16_MAX, 25)
INT_TEST(WriteInt16, ReadInt16, int16, INT16_MIN,INT16_MAX, -1768)

INT_TEST(WriteUInt32, ReadUInt32, uint32, 0, UINT32_MAX, 1007688)
INT_TEST(WriteInt32, ReadInt32, int32, INT32_MIN,INT32_MAX, -1007688)

INT_TEST(WriteUInt64, ReadUInt64, uint64, 0, UINT64_MAX, 10076880000)
INT_TEST(WriteInt64, ReadInt64, int64, INT64_MIN,INT64_MAX, -10076880000)

TEST_CASE("[MessageBase] floats") {
  MessageWrite write;
  SECTION("writes high value") {
    write.WriteFloat(1007688);
    REQUIRE(MessageRead(write).ReadFloat() == 1007688);
  }

  SECTION("writes low value") {
    write.WriteFloat(-1007688);
    REQUIRE(MessageRead(write).ReadFloat() == -1007688);
  }

  SECTION("writes normal fractions") {
    write.WriteFloat(1.5);
    REQUIRE_THAT(
      MessageRead(write).ReadFloat(),Catch::Matchers::WithinAbs(1.5f,0.001)
    );
  }
}

TEST_CASE("[MessageBase] doubles") {
  MessageWrite write;
  SECTION("writes high value") {
    write.WriteDouble(10076881007688);
    REQUIRE(MessageRead(write).ReadDouble() == 10076881007688);
  }

  SECTION("writes low value") {
    write.WriteDouble(-10076881007688);
    REQUIRE(MessageRead(write).ReadDouble() == -10076881007688);
  }

  SECTION("writes big fractions") {
    write.WriteDouble(1007688.1007688);
    REQUIRE_THAT(
        MessageRead(write).ReadDouble()
      , Catch::Matchers::WithinAbs(1007688.1007688, 0.0001)
    );
  }
}
