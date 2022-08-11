#include "TSLua.h"
#include "TSLuaVarargs.h"
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
    auto ts_world_packet = state.new_usertype<TSWorldPacket>("TSWorldPacket",sol::factories(
        [](uint16 opcode, uint32 size) { return std::make_shared<TSWorldPacket>(opcode, size); },
        [](uint16 opcode) { return std::make_shared<TSWorldPacket>(opcode); }
    ));
    LUA_FIELD(ts_world_packet, TSWorldPacket, IsNull);
    LUA_FIELD(ts_world_packet, TSWorldPacket, GetOpcode);
    LUA_FIELD(ts_world_packet, TSWorldPacket, GetSize);
    LUA_FIELD(ts_world_packet, TSWorldPacket, SetOpcode);

    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadInt8, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadUInt8, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadInt16, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadUInt16, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadInt32, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadUInt32, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadInt64, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadUInt64, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadFloat, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadDouble, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_world_packet, TSWorldPacket, ReadString, uint32);

    ts_world_packet.set_function("WriteInt8", sol::overload(
        [](TSWorldPacket& pkt, int8 value) { pkt.WriteInt8(value); },
        [](TSWorldPacket& pkt, uint32 index, int8 value) { pkt.WriteInt8(index,value); }
    ));

    ts_world_packet.set_function("WriteUInt8", sol::overload(
        [](TSWorldPacket& pkt, uint8 value) { pkt.WriteUInt8(value); },
        [](TSWorldPacket& pkt, uint32 index, uint8 value) { pkt.WriteUInt8(index,value); }
    ));

    ts_world_packet.set_function("WriteInt16", sol::overload(
        [](TSWorldPacket& pkt, int16 value) { pkt.WriteInt16(value); },
        [](TSWorldPacket& pkt, uint32 index, int16 value) { pkt.WriteInt16(index, value); }
    ));

    ts_world_packet.set_function("WriteUInt16", sol::overload(
        [](TSWorldPacket& pkt, uint16 value) { pkt.WriteUInt16(value); },
        [](TSWorldPacket& pkt, uint32 index, uint16 value) { pkt.WriteUInt16(index, value); }
    ));
    ts_world_packet.set_function("WriteInt32", sol::overload(
        [](TSWorldPacket& pkt, int32 value) { pkt.WriteInt32(value); },
        [](TSWorldPacket& pkt, uint32 index, int32 value) { pkt.WriteInt32(index, value); }
    ));

    ts_world_packet.set_function("WriteUInt32", sol::overload(
        [](TSWorldPacket& pkt, uint32 value) { pkt.WriteUInt32(value); },
        [](TSWorldPacket& pkt, uint32 index, uint32 value) { pkt.WriteUInt32(index, value); }
    ));
    ts_world_packet.set_function("WriteInt64", sol::overload(
        [](TSWorldPacket& pkt, int64 value) { pkt.WriteInt64(value); },
        [](TSWorldPacket& pkt, uint32 index, int64 value) { pkt.WriteInt64(index, value); }
    ));
    ts_world_packet.set_function("WriteUInt64", sol::overload(
        [](TSWorldPacket& pkt, uint64 value) { pkt.WriteUInt64(value); },
        [](TSWorldPacket& pkt, uint32 index, uint64 value) { pkt.WriteUInt64(index, value); }
    ));

    ts_world_packet.set_function("WriteFloat", sol::overload(
        [](TSWorldPacket& pkt, float value) { pkt.WriteFloat(value); },
        [](TSWorldPacket& pkt, uint32 index, float value) { pkt.WriteFloat(index, value); }
    ));
    ts_world_packet.set_function("WriteDouble", sol::overload(
        [](TSWorldPacket& pkt, double value) { pkt.WriteDouble(value); },
        [](TSWorldPacket& pkt, uint32 index, double value) { pkt.WriteDouble(index, value); }
    ));
    state.set_function("CreateWorldPacket", sol::overload(LCreateWorldPacket0, LCreateWorldPacket1));

    auto ts_world_state_packet = state.new_usertype<TSWorldStatePacket>("TSWorldStatePacket");
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, push);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, length);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, GetVariable);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, GetValue);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, Remove);
    LUA_FIELD(ts_world_state_packet, TSWorldStatePacket, Clear);
}