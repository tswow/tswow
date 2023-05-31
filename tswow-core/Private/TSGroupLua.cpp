#include "TSLua.h"
#include "TSGroup.h"

#include "TSPlayer.h"
#include "TSWorldPacket.h"
#include "TSGroup.h"
#include "TSGUID.h"

void TSLua::load_group_methods(sol::state& state)
{
    auto ts_group = state.new_usertype<TSGroup>("TSGroup");
    ts_group.set_function("IsLeader", sol::overload(&TSGroup::LIsLeader0, &TSGroup::LIsLeader1));
    ts_group.set_function("IsMember", sol::overload(&TSGroup::LIsMember0, &TSGroup::LIsMember1));
    ts_group.set_function("IsAssistant", sol::overload(&TSGroup::LIsAssistant0, &TSGroup::LIsAssistant1));
    ts_group.set_function("GetMemberGroup", sol::overload(&TSGroup::LGetMemberGroup0, &TSGroup::LGetMemberGroup1));
    ts_group.set_function("SetLeader", sol::overload(&TSGroup::LSetLeader0, &TSGroup::LSetLeader1));
    ts_group.set_function("RemoveMember", sol::overload(&TSGroup::LRemoveMember0, &TSGroup::LRemoveMember1));
    ts_group.set_function("SetMembersGroup", sol::overload(&TSGroup::LSetMembersGroup0, &TSGroup::LSetMembersGroup1));
    LUA_FIELD(ts_group, TSGroup, IsFull);
    LUA_FIELD(ts_group, TSGroup, IsRaidGroup);
    LUA_FIELD(ts_group, TSGroup, IsBGGroup);
    LUA_FIELD(ts_group, TSGroup, SameSubGroup);
    LUA_FIELD(ts_group, TSGroup, HasFreeSlotSubGroup);
    LUA_FIELD(ts_group, TSGroup, AddMember);
    LUA_FIELD(ts_group, TSGroup, GetLeaderGUID);
    LUA_FIELD(ts_group, TSGroup, GetGUID);
    LUA_FIELD(ts_group, TSGroup, GetMemberGUID);
    LUA_FIELD(ts_group, TSGroup, GetMembersCount);
    LUA_FIELD(ts_group, TSGroup, Disband);
    LUA_FIELD(ts_group, TSGroup, ConvertToRaid);
    LUA_FIELD(ts_group, TSGroup, SetTargetIcon);
    LUA_FIELD(ts_group, TSGroup, IsLFGGroup);
    LUA_FIELD(ts_group, TSGroup, IsBFGroup);
    ts_group.set_function("SendPacket", sol::overload(
        [](TSGroup& group, TSWorldPacket data, bool ignorePlayersInBg, uint64 ignore) { group.SendPacket(data, ignorePlayersInBg, ignore); },
        [](TSGroup& group, TSWorldPacket data, bool ignorePlayersInBg, TSGUID ignore) { group.SendPacket(data, ignorePlayersInBg, ignore); },
        [](TSGroup& group, std::shared_ptr<TSWorldPacket> data, bool ignorePlayersInBg, uint64 ignore) { group.SendPacket(data, ignorePlayersInBg, ignore);},
        [](TSGroup& group, std::shared_ptr<TSWorldPacket> data, bool ignorePlayersInBg, TSGUID ignore) { group.SendPacket(data, ignorePlayersInBg, ignore);}
    ));
    ts_group.set_function("GetMembers", &TSGroup::LGetMembers);
}
