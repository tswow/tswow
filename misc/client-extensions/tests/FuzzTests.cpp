#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp >
#include <catch2/catch_approx.hpp >

#include "CustomPacketWrite.h"
#include "CustomPacketRead.h"
#include "CustomPacketBase.h"
#include "CustomPacketBuffer.h"

#include "windows.h"
#include <cstdlib>
#include <functional>

#define ITERATIONS 10000
#define SEED 1007688

template <typename T>
T rint(T low, T high)
{
    return low == high ? low : low + T((rand() % (high-low) + 1));
}

float rfloat(float low, float high)
{
    return low + static_cast <float> (rand())
        / (static_cast <float> (RAND_MAX / (high - low)));
}

struct TestBase {
    virtual ~TestBase() {};
    virtual void Write(CustomPacketWrite* write) = 0;
    virtual void Read(CustomPacketRead* read) = 0;
};

template <typename T>
struct TestVal : TestBase {
    T m_value;
    virtual T generate() = 0;
    void Write(CustomPacketWrite* write) override
    {
        m_value = generate();
        write->Write<T>(m_value);
    }
    virtual void Read(CustomPacketRead* read) override
    {
        T r = read->Read<T>(generate());
        REQUIRE(m_value == r);
    }
};

struct TestU8 : public TestVal<uint8_t> {
    virtual uint8_t generate() { return rint<uint8_t>(0,UINT8_MAX); }
};

struct TestI8 : public TestVal<int8_t> {
    virtual int8_t generate() { return rint<int8_t>(INT8_MIN,INT8_MAX); }
};

struct TestU16 : public TestVal<uint16_t> {
    virtual uint16_t generate() { return rint<uint16_t>(0, UINT16_MAX); }
};

struct TestI16 : public TestVal<int16_t> {
    virtual int16_t generate() { return rint<int16_t>(INT16_MIN, INT16_MAX); }
};

struct TestU32 : public TestVal<uint32_t> {
    virtual uint32_t generate() { return rint<uint32_t>(0, UINT32_MAX); }
};

struct TestI32 : public TestVal<int32_t> {
    virtual int32_t generate() { return rint<int32_t>(INT32_MIN, INT32_MAX); }
};

struct TestString : public TestBase {
    std::string m_str = "";
    virtual void Write(CustomPacketWrite* write)
    {
        uint32_t size = rint<uint32_t>(5, 100);
        m_str.resize(size);
        for (size_t i = 0; i < size; ++i)
        {
            m_str[i] = (rint<uint8_t>(0, UINT8_MAX));
        }
        write->WriteString(m_str);
    }
    virtual void Read(CustomPacketRead* read)
    {
        std::string v = read->ReadString();
        REQUIRE_THAT(
              v
            , Catch::Matchers::Equals(m_str)
        );
    }
};

struct TestFloat : public TestBase {
    float m_value;
    virtual void Write(CustomPacketWrite* write)
    {
        m_value = rfloat(INT16_MIN, INT16_MAX);
        write->Write<float>(m_value);
    }
    virtual void Read(CustomPacketRead* read)
    {
        REQUIRE(
            read->Read<float>(m_value-UINT16_MAX) == Catch::Approx(m_value)
        );
    }
};

std::vector < std::function<std::unique_ptr<TestBase>()>> valueGenerators = {
    []() { return std::make_unique<TestU8>(); },
    []() { return std::make_unique<TestI8>(); },
    []() { return std::make_unique<TestU16>(); },
    []() { return std::make_unique<TestI16>(); },
    []() { return std::make_unique<TestU32>(); },
    []() { return std::make_unique<TestI32>(); },
    []() { return std::make_unique<TestFloat>(); },
    []() { return std::make_unique<TestString>(); },
};

std::vector < std::function<uint32_t()>> valueCountGenerators = {
    []() { return rint(0,10); },
    []() { return rint(0,100); },
    []() { return rint(0,1000); },
};

std::vector < std::function<chunkSize_t()>> chunkSizeGenerators = {
    []() { return CustomHeaderSize + 4; },
    []() { return CustomHeaderSize + rint<chunkSize_t>(4,10); },
    []() { return CustomHeaderSize + rint<chunkSize_t>(4,100); },
    []() { return CustomHeaderSize + rint<chunkSize_t>(4,1000); },
};

std::vector < std::function<totalSize_t()>> initSizeGenerators = {
    []() { return 0; },
    []() { return rint<totalSize_t>(0,10); },
    []() { return rint<totalSize_t>(0,100); },
    []() { return rint<totalSize_t>(0,1000); },
};

#define rentry(vec) vec[rint<uint32_t>(0, vec.size() - 1)]()

TEST_CASE("[MessageBase] Fuzz Tests") {
    srand(SEED);
    HANDLE out = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(out, &cursorInfo);
    cursorInfo.bVisible = false;
    SetConsoleCursorInfo(out, &cursorInfo);
    for (size_t i = 0; i < ITERATIONS; ++i)
    {
        std::cout << "Fuzzing " << i+1 << "/" << ITERATIONS << "\r";
        std::vector<std::unique_ptr<TestBase>> values;
        size_t valueCount = rentry(valueCountGenerators);
        for (size_t j = 0; j < valueCount; ++j)
        {
            values.push_back(rentry(valueGenerators));
        }

        chunkSize_t chunk = rentry(chunkSizeGenerators);
        totalSize_t init = rentry(initSizeGenerators);
        CustomPacketWrite a(0, chunk, init);
        for (std::unique_ptr<TestBase> & value : values)
        {
            value->Write(&a);
        }
        a.buildMessages();

        CustomPacketBuffer bfr(0,UINT32_MAX,chunk);
        for (chunkCount_t i = 0; i < a.ChunkCount(); ++i)
        {
            CustomPacketChunk* chnk = a.Chunk(i);
            CustomPacketResult res =
                bfr.ReceivePacket(chnk->FullSize(), chnk->Data());
            if (i == a.ChunkCount() - 1)
            {
                REQUIRE(res == CustomPacketResult::HANDLED_MESSAGE);
            }
            else
            {
                REQUIRE(res == CustomPacketResult::HANDLED_FRAGMENT);
            }
        }

        CustomPacketRead r(a);
        for (std::unique_ptr<TestBase> & value : values)
        {
            value->Read(&r);
        }
        a.Destroy();
    }
    std::cout << "\n";
}
