#include "TSLua.h"
#include "TSCorpse.h"

void TSLua::load_corpse_methods(sol::state& state)
{
    auto ts_corpse = state.new_usertype<TSCorpse>("TSCorpse");
    LUA_FIELD(ts_corpse, TSCorpse, GetOwnerGUID);
    LUA_FIELD(ts_corpse, TSCorpse, GetGhostTime);
    LUA_FIELD(ts_corpse, TSCorpse, GetType);
    LUA_FIELD(ts_corpse, TSCorpse, GetLoot);
    LUA_FIELD(ts_corpse, TSCorpse, ResetGhostTime);
    LUA_FIELD(ts_corpse, TSCorpse, SaveToDB);
}
