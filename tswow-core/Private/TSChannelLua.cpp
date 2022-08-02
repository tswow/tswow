#include "TSLua.h"
#include "TSChannel.h"
#include "TSPlayer.h"
#include "TSLuaVarargs.h"

void TSLua::load_channel_methods(sol::state& state)
{
    auto ts_channel = state.new_usertype<TSChannel>("TSChannel");
    LUA_FIELD_OVERLOAD_RET_0_1(ts_channel, TSChannel, GetName, uint32);
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
    LUA_FIELD(ts_channel, TSChannel, Say);
    LUA_FIELD(ts_channel, TSChannel, SetPassword);
    LUA_FIELD(ts_channel, TSChannel, CheckPassword);
    LUA_FIELD_OVERLOAD_1_1(ts_channel, TSChannel, JoinChannel, TSPlayer, std::string const&);
}
