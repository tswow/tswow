#include "TSLua.h"
#include "TSCorpse.h"

void TSLuaState::load_corpse_methods(uint32_t modid)
{
    auto ts_corpse = new_usertype<TSCorpse>("TSCorpse");
    LUA_FIELD(ts_corpse, TSCorpse, GetOwnerGUID);
    LUA_FIELD(ts_corpse, TSCorpse, GetGhostTime);
    LUA_FIELD(ts_corpse, TSCorpse, GetType);
    LUA_FIELD(ts_corpse, TSCorpse, GetLoot);
    LUA_FIELD(ts_corpse, TSCorpse, ResetGhostTime);
    LUA_FIELD(ts_corpse, TSCorpse, SaveToDB);
}
