#include "TSLua.h"
#include "TSWorldPacket.h"

static TSWorldPacket LCreateWorldPacket0(uint16 opcode, uint32 res)
{
    return CreateWorldPacket(opcode, res);
};

static TSWorldPacket LCreateWorldPacket1(uint16 opcode)
{
    return CreateWorldPacket(opcode);
};

#define LUA_WORLD_PACKET_FIELD(target,cls,name) target.set_function(#name, sol::overload(&cls::L##name##0, &cls::L##name##1))

void TSLua::load_world_packet_methods(sol::state & state)
{
    auto ts_world_packet = state.new_usertype<TSWorldPacket>("TSWorldPacket");
    LUA_FIELD(ts_world_packet, TSWorldPacket, IsNull);
    LUA_FIELD(ts_world_packet, TSWorldPacket, GetOpcode);
    LUA_FIELD(ts_world_packet, TSWorldPacket, GetSize);
    LUA_FIELD(ts_world_packet, TSWorldPacket, SetOpcode);

    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadInt8);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadUInt8);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadInt16);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadUInt16);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadInt32);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadUInt32);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadInt64);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadUInt64);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadFloat);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadDouble);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, ReadString);

    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteInt8);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteUInt8);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteInt16);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteUInt16);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteInt32);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteUInt32);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteInt64);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteUInt64);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteFloat);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteDouble);
    LUA_WORLD_PACKET_FIELD(ts_world_packet, TSWorldPacket, WriteString);

    state.set_function("CreateWorldPacket", sol::overload(LCreateWorldPacket0, LCreateWorldPacket1));

    auto ts_world_state_packet = state.new_usertype<TSWorldStatePacket>("TSWorldStatePacket");
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, push);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, length);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, GetVariable);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, GetValue);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, Remove);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, Clear);
}