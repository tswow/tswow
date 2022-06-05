#include "TSLua.h"
#include "TSChannel.h"
#include "TSPlayer.h"

void TSLuaState::load_channel_methods(sol::state& state)
{
    auto ts_channel = state.new_usertype<TSChannel>("TSChannel");
    ts_channel.set_function("GetName", sol::overload(
        &TSChannel::LGetName0
        , &TSChannel::LGetName1
    ));
    LUA_FIELD(ts_channel, TSChannel, GetID);
    LUA_FIELD(ts_channel, TSChannel, IsConstant);
    LUA_FIELD(ts_channel, TSChannel, IsLFG);
    LUA_FIELD(ts_channel, TSChannel, IsAnnounce);
    LUA_FIELD(ts_channel, TSChannel, SetAnnounce);
    LUA_FIELD(ts_channel, TSChannel, SetDirty);
    LUA_FIELD(ts_channel, TSChannel, GetNumPlayers);
    LUA_FIELD(ts_channel, TSChannel, GetFlags);
    LUA_FIELD(ts_channel, TSChannel, HasFlag);
    LUA_FIELD(ts_channel, TSChannel, JoinChannel);
    LUA_FIELD(ts_channel, TSChannel, LeaveChannel);
    LUA_FIELD(ts_channel, TSChannel, SetInvisible);
    LUA_FIELD(ts_channel, TSChannel, SetOwner);
    ts_channel.set_function("Say", &TSChannel::LSay);
    ts_channel.set_function("SetPassword", &TSChannel::LSetPassword);
    ts_channel.set_function("CheckPassword", &TSChannel::LCheckPassword);
    ts_channel.set_function("JoinChannel", sol::overload(
        &TSChannel::LJoinChannel0
        , &TSChannel::LJoinChannel1
    ));
}
