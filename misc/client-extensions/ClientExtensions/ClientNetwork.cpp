#include "ClientNetwork.h"
#include "ClientDetours.h"

#include "CustomPacketBuffer.h"
#include "Logger.h"
#include "ClientLua.h"

#include "CustomPacketDefines.h"

#include <map>
#include <sstream>

// note: most of the mess here is because I didn't
// figure out how to register userdata yet

struct ClientPacket;

CLIENT_FUNCTION(InitializePacket, 0x00401050, __thiscall, void, (ClientPacket* packet))
CLIENT_FUNCTION(FinalizePacket, 0x00401130, __thiscall, void, (ClientPacket* packet))
CLIENT_FUNCTION(SendPacket, 0x006B0B50, __cdecl, void, (ClientPacket* packet))

// The raw client packet
struct ClientPacket {
    uint32_t m_padding;
    uint8_t* m_buffer;
    uint32_t m_base;
    uint32_t m_alloc;
    uint32_t m_size;
    uint32_t m_read;
    ClientPacket(uint8_t* buffer, size_t size)
        : m_padding(0)
        , m_buffer(0)
        , m_size(0)
        , m_alloc(0)
        , m_base(0)
        , m_read(0)
    {
        InitializePacket(this);
        m_buffer = buffer;
        m_size = size;
        m_alloc = size;
    }
};


class ClientMessageWrite : public CustomPacketWrite
{
public:
    ClientMessageWrite()
        : CustomPacketWrite(0, MAX_FRAGMENT_SIZE,0)
    {}
    ClientMessageWrite(opcode_t opcode, totalSize_t size)
        : CustomPacketWrite(opcode, MAX_FRAGMENT_SIZE,size)
    {}

    void Send()
    {
        std::vector<CustomPacketChunk>& chunks = buildMessages();
        for (auto& chunk : chunks)
        {
            // the API assumes the opcode is not a part of the payload,
            // because TrinityCore WorldPackets do not include it.
            //
            // This means just a single copy on the client.
            // Getting rid of it would be very cumbersome to almost no benefit.

            size_t fullSize = sizeof(uint32_t) + chunk.FullSize();
            char* c = new char[fullSize];
#pragma warning(push)
#pragma warning(disable: 6001)
            (*(uint32_t*)c) = CLIENT_TO_SERVER_OPCODE;
#pragma warning(pop)
            memcpy(c + sizeof(uint32_t), chunk.Data(), chunk.FullSize());
            ClientPacket* p = new ClientPacket((uint8_t*)c, fullSize);
            FinalizePacket(p);
            SendPacket(p);
            chunk.Destroy();
        }
        Clear(); // we already destroyed each chunk individually
    }
};

template <typename T>
class MessageRegistry {
    // if you store 4 billion messages at once you'll have other problems
    uint32_t m_cur = 0;
public:
    std::map<uint32_t, T> m_map;
    uint32_t freeId()
    {
        while (m_map.find(m_cur) != m_map.end())
        {
            ++m_cur;
        }
        return m_cur;
    }

    uint32_t add(T& value, T** ptr)
    {
        *ptr = &(m_map[freeId()] = value);
        return m_cur++;
    }

    T* get(uint32_t id)
    {
        auto itr = m_map.find(id);
        if (itr == m_map.end())
        {
            return nullptr;
        }
        return &itr->second;
    }
};

MessageRegistry<ClientMessageWrite> writes;
CustomPacketRead* curRead = nullptr;

std::map < opcode_t, std::vector<std::function<void(CustomPacketRead*)>>> cppListeners;

class ClientMessageBuffer : public CustomPacketBuffer {
public:
    ClientMessageBuffer()
        : CustomPacketBuffer(MIN_FRAGMENT_SIZE, BUFFER_QUOTA, MAX_FRAGMENT_SIZE)
    {}

    virtual void OnPacket(CustomPacketRead* value) override final
    {
        LOG_DEBUG << "Client receive full packet with opcode" << value->Opcode();
        curRead = value;
        ClientLua::DoString(
              ("__FireCustomPacket(" + std::to_string(value->Opcode()) + ")").c_str()
            , ClientLua::State()
        );
        curRead = nullptr;
        auto itr = cppListeners.find(value->Opcode());
        if (itr != cppListeners.end())
        {
            for (auto const& cb : itr->second)
            {
                cb(value);
            }
        }
    }

    virtual void OnError(CustomPacketResult error) override final
    {
        LOG_ERROR << "Packet reading error " << uint32_t(error);
    }
};

int ClientNetwork::OnCustomPacket(
      opcode_t opcode
    , std::function<void(CustomPacketRead*)> callback
) {
    auto itr = cppListeners.find(opcode);
    if (itr != cppListeners.end())
    {
        itr->second.push_back(callback);
        return 1;
    }
    else
    {
        cppListeners[opcode] = { callback };
        return 2;
    }
}


namespace
{
    ClientMessageBuffer clientBuffer;
}

template <typename T>
int WriteNum(lua_State* L)
{
    uint32_t id = uint32_t(ClientLua::GetNumber(L, 2, 0));
    T val = T(ClientLua::GetNumber(L, 3, 0));

    auto itr = writes.m_map.find(id);
    if (itr == writes.m_map.end())
    {
        // todo: error message
        return 0;
    }
    itr->second.Write(val);
    return 0;
}

template <typename T>
int ReadNum(lua_State* L)
{
    T def = T(ClientLua::GetNumber(L, 2, 0));
    ClientLua::PushNumber(
        L,
        curRead == nullptr
            ? def
            : curRead->Read<T>(def)
    );
    return 1;
}

enum class LuaNetworkOpcode {
    WRITE_SIZE          = 0,
    READ_SIZE           = 1,
    WRITE_UINT8         = 2,
    WRITE_INT8          = 3,
    WRITE_UINT16        = 4,
    WRITE_INT16         = 5,
    WRITE_UINT32        = 6,
    WRITE_INT32         = 7,
    WRITE_UINT64        = 8,
    WRITE_INT64         = 9,
    WRITE_FLOAT         = 10,
    WRITE_DOUBLE        = 11,
    WRITE_STRING        = 12,

    READ_UINT8          = 13,
    READ_INT8           = 14,
    READ_UINT16         = 15,
    READ_INT16          = 16,
    READ_UINT32         = 17,
    READ_INT32          = 18,
    READ_UINT64         = 19,
    READ_INT64          = 20,
    READ_FLOAT          = 21,
    READ_DOUBLE         = 22,
    READ_STRING         = 23,
    MAKE_CUSTOM_PACKET  = 24,
    SEND_CUSTOM_PACKET  = 25,
    RESET_CUSTOM_PACKET = 26,
};

void ClientNetwork::initialize()
{
    ClientLua::AddFunction(
        "_CLIENT_NETWORK"
        , [](lua_State* L) {
        LuaNetworkOpcode opcode = (LuaNetworkOpcode) ClientLua::GetNumber(L, 1);
        switch (opcode) {
            case LuaNetworkOpcode::WRITE_SIZE: {
                auto itr = writes.m_map.find(ClientLua::GetNumber(L, 2, 0));
                ClientLua::PushNumber(L, itr == writes.m_map.end() ? 0 : itr->second.Size());
                return 1;
            }
            case LuaNetworkOpcode::READ_SIZE: {
                ClientLua::PushNumber(L, curRead ? curRead->Size() : 0);
                return 1;
            }
            case LuaNetworkOpcode::WRITE_UINT8: {
                return WriteNum<uint8_t>(L);
            }
            case LuaNetworkOpcode::WRITE_INT8: {
                return WriteNum<int8_t>(L);
            }
            case LuaNetworkOpcode::WRITE_UINT16: {
                return WriteNum<uint16_t>(L);
            }
            case LuaNetworkOpcode::WRITE_INT16: {
                return WriteNum<int16_t>(L);
            }
            case LuaNetworkOpcode::WRITE_UINT32: {
                return WriteNum<uint32_t>(L);
            }
            case LuaNetworkOpcode::WRITE_INT32: {
                return WriteNum<int32_t>(L);
            }
            case LuaNetworkOpcode::WRITE_UINT64: {
                return WriteNum<uint64_t>(L);
            }
            case LuaNetworkOpcode::WRITE_INT64: {
                return WriteNum<int64_t>(L);
            }
            case LuaNetworkOpcode::WRITE_FLOAT: {
                return WriteNum<float>(L);
            }
            case LuaNetworkOpcode::WRITE_DOUBLE: {
                return WriteNum<double>(L);
            }

            case LuaNetworkOpcode::WRITE_STRING: {
                uint32_t id = uint32_t(ClientLua::GetNumber(L, 2, 0));
                std::string str = ClientLua::GetString(L, 3, "");
                auto itr = writes.m_map.find(id);
                if (itr == writes.m_map.end())
                {
                    // todo: error message
                    return 0;
                }
                itr->second.WriteString(str);
                return 0;
            }
            case LuaNetworkOpcode::READ_UINT8: {
                return ReadNum<uint8_t>(L);
            }
            case LuaNetworkOpcode::READ_INT8: {
                return ReadNum<int8_t>(L);
            }
            case LuaNetworkOpcode::READ_UINT16: {
                return ReadNum<uint16_t>(L);
            }
            case LuaNetworkOpcode::READ_INT16: {
                return ReadNum<int16_t>(L);
            }
            case LuaNetworkOpcode::READ_UINT32: {
                return ReadNum<uint32_t>(L);
            }
            case LuaNetworkOpcode::READ_INT32: {
                return ReadNum<int32_t>(L);
            }
            case LuaNetworkOpcode::READ_UINT64: {
                return ReadNum<uint64_t>(L);
            }
            case LuaNetworkOpcode::READ_INT64: {
                return ReadNum<int64_t>(L);
            }
            case LuaNetworkOpcode::READ_FLOAT: {
                return ReadNum<float>(L);
            }
            case LuaNetworkOpcode::READ_DOUBLE: {
                return ReadNum<double>(L);
            }
            case LuaNetworkOpcode::READ_STRING: {
                ClientLua::PushString(L, curRead == nullptr
                    ? ""
                    : curRead->ReadString().c_str());
                return 1;
            }
            case LuaNetworkOpcode::MAKE_CUSTOM_PACKET: {
                opcode_t opcode{ opcode_t(ClientLua::GetNumber(L, 2, 0)) };
                totalSize_t size{ totalSize_t(ClientLua::GetNumber(L, 3, 0)) };
                uint32_t id = writes.freeId();
                writes.m_map[id] = ClientMessageWrite{ opcode, size };
                ClientLua::PushNumber(L, id);
                return 1;
            }
            case LuaNetworkOpcode::SEND_CUSTOM_PACKET: {
                uint32_t id{ uint32_t(ClientLua::GetNumber(L, 2)) };
                ClientMessageWrite* write = writes.get(id);
                if (write == nullptr)
                {
                    LOG_ERROR << "Failed to send message: no such write message";
                    // todo error message
                    return 0;
                }
                write->Send();
                writes.m_map.erase(id);
                return 0;
            }
            case LuaNetworkOpcode::RESET_CUSTOM_PACKET: {
                if (curRead == nullptr) return 0;
                curRead->Reset();
                return 0;
            }
            default: {
                LOG_ERROR << "Received invalid LuaNetworkOpcode: " << int(opcode);
                break;
            }
        }
    }, __FILE__, __LINE__);
}

typedef bool(* ClientPacketHandler)
(
        void* unk
    , uint32_t opcode
    , int time
    , ClientPacket* msg
);

CLIENT_DETOUR(
      OnSetMessageHandler
    , 0x006B0B80
    , __cdecl
    , int
    , (uint32_t opcode, ClientPacketHandler handler, void* param)
) {
    // the last opcodes in each batch that seems to register them
    if (opcode == 253 || opcode == 50 || opcode == 532)
    {
        OnSetMessageHandler(
                SERVER_TO_CLIENT_OPCODE
            , [](void* a, uint32_t b, int time, ClientPacket* c) {
                    if (c->m_size <= 2) return true; // can this ever happen?
                    // -2 is ok, we already safety checked
                    clientBuffer.ReceivePacket(c->m_size - 2, (char*)c->m_buffer + 2);
                    return true;
            }
            , nullptr
            );
    }
    return OnSetMessageHandler(opcode, handler, param);
}
