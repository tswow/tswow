#include "TSLua.h"
#include "TSCustomPacket.h"
#include "TSPlayer.h"
#include "TSMap.h"
#include "TSEvents.h"
#include "TSBattleground.h"

void TSLua::load_packet_methods(sol::state& state)
{
    auto ts_packetwrite = state.new_usertype<TSPacketWrite>("TSPacketWrite");
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteUInt8);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteInt8);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteUInt16);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteInt16);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteUInt32);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteInt32);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteUInt64);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteInt64);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteFloat);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, WriteDouble);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, Size);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, SendToPlayer);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, BroadcastMap);
    LUA_FIELD(ts_packetwrite, TSPacketWrite, BroadcastAround);
    ts_packetwrite.set_function("WriteString", &TSPacketWrite::WriteString);

    auto ts_packetread = state.new_usertype<TSPacketRead>("TSPacketRead");
    LUA_FIELD(ts_packetread, TSPacketRead, ReadUInt8);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadInt8);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadUInt16);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadInt16);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadUInt32);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadInt32);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadUInt64);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadInt64);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadFloat);
    LUA_FIELD(ts_packetread, TSPacketRead, ReadDouble);
    LUA_FIELD(ts_packetread, TSPacketRead, Size);
    ts_packetread.set_function("ReadString", &TSPacketRead::ReadString);
}
