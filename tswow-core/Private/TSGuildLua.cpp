#include "TSLua.h"
#include "TSGuild.h"

#include "TSGuild.h"
#include "TSPlayer.h"
#include "TSWorldPacket.h"

void TSLuaState::load_guild_methods(uint32_t modid)
{
    auto ts_guild = new_usertype<TSGuild>("TSGuild");
    LUA_FIELD(ts_guild, TSGuild, GetMemberCount);
    LUA_FIELD(ts_guild, TSGuild, GetLeader);
    LUA_FIELD(ts_guild, TSGuild, GetLeaderGUID);
    LUA_FIELD(ts_guild, TSGuild, GetID);
    LUA_FIELD(ts_guild, TSGuild, SetLeader);
    LUA_FIELD(ts_guild, TSGuild, SetBankTabText);
    LUA_FIELD(ts_guild, TSGuild, Disband);
    LUA_FIELD(ts_guild, TSGuild, AddMember);
    LUA_FIELD(ts_guild, TSGuild, DeleteMember);
    LUA_FIELD(ts_guild, TSGuild, SetMemberRank);
    ts_guild.set_function("GetMembers", &TSGuild::LGetMembers);
    ts_guild.set_function("GetName", &TSGuild::LGetName);
    ts_guild.set_function("GetMOTD", &TSGuild::LGetMOTD);
    ts_guild.set_function("GetInfo", &TSGuild::LGetInfo);
    ts_guild.set_function("SendPacket", &TSGuild::LSendPacket);
    ts_guild.set_function("SendPacketToRanked", &TSGuild::LSendPacketToRanked);
}
