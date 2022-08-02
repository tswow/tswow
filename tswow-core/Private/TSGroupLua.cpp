#include "TSLua.h"
#include "TSGroup.h"

#include "TSPlayer.h"
#include "TSWorldPacket.h"
#include "TSGroup.h"

void TSLua::load_group_methods(sol::state& state)
{
    auto ts_group = state.new_usertype<TSGroup>("TSGroup");
    LUA_FIELD(ts_group, TSGroup, IsLeader);
    LUA_FIELD(ts_group, TSGroup, IsFull);
    LUA_FIELD(ts_group, TSGroup, IsRaidGroup);
    LUA_FIELD(ts_group, TSGroup, IsBGGroup);
    LUA_FIELD(ts_group, TSGroup, IsMember);
    LUA_FIELD(ts_group, TSGroup, IsAssistant);
    LUA_FIELD(ts_group, TSGroup, SameSubGroup);
    LUA_FIELD(ts_group, TSGroup, HasFreeSlotSubGroup);
    LUA_FIELD(ts_group, TSGroup, AddMember);
    LUA_FIELD(ts_group, TSGroup, GetLeaderGUID);
    LUA_FIELD(ts_group, TSGroup, GetGUID);
    LUA_FIELD(ts_group, TSGroup, GetMemberGUID);
    LUA_FIELD(ts_group, TSGroup, GetMembersCount);
    LUA_FIELD(ts_group, TSGroup, GetMemberGroup);
    LUA_FIELD(ts_group, TSGroup, SetLeader);
    LUA_FIELD(ts_group, TSGroup, RemoveMember);
    LUA_FIELD(ts_group, TSGroup, Disband);
    LUA_FIELD(ts_group, TSGroup, ConvertToRaid);
    LUA_FIELD(ts_group, TSGroup, SetMembersGroup);
    LUA_FIELD(ts_group, TSGroup, SetTargetIcon);
    LUA_FIELD(ts_group, TSGroup, IsLFGGroup);
    LUA_FIELD(ts_group, TSGroup, IsBFGroup);
    ts_group.set_function("SendPacket", sol::overload(
        [](TSGroup& group, TSWorldPacket data, bool ignorePlayersInBg, uint64 ignore) { group.SendPacket(data, ignorePlayersInBg, ignore); },
        [](TSGroup& group, std::shared_ptr<TSWorldPacket> data, bool ignorePlayersInBg, uint64 ignore) { group.SendPacket(data, ignorePlayersInBg, ignore); }
    ));
    ts_group.set_function("GetMembers", &TSGroup::LGetMembers);
}
