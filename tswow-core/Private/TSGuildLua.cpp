#include "TSLua.h"
#include "TSGuild.h"

#include "TSGuild.h"
#include "TSPlayer.h"
#include "TSWorldPacket.h"

void TSLua::load_guild_methods(sol::state& state)
{
    auto ts_guild = state.new_usertype<TSGuild>("TSGuild");
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
    LUA_FIELD(ts_guild, TSGuild, GetMembers);
    LUA_FIELD(ts_guild, TSGuild, GetName);
    LUA_FIELD(ts_guild, TSGuild, GetMOTD);
    LUA_FIELD(ts_guild, TSGuild, GetInfo);
    ts_guild.set_function("SendPacket", sol::overload(
        [](TSGuild& guild, TSWorldPacket data) { guild.SendPacket(data); },
        [](TSGuild& guild, std::shared_ptr<TSWorldPacket> data) { guild.SendPacket(data); }
    ));
    ts_guild.set_function("SendPacketToRanked", sol::overload(
        [](TSGuild& guild, TSWorldPacket data, uint8 ranked) { guild.SendPacketToRanked(data, ranked); },
        [](TSGuild& guild, std::shared_ptr<TSWorldPacket> data, uint8 ranked) { guild.SendPacketToRanked(data, ranked); }
    ));
    state.set_function("GetGuildByName", GetGuildByName);
    state.set_function("GetGuild", GetGuild);
    state.set_function("GetGuildByLeader", GetGuildByLeader);
}
