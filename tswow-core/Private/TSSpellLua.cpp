#include "TSLua.h"
#include "TSSpell.h"

void TSLuaState::load_spell_methods(uint32_t modid)
{
    auto ts_spell = new_usertype<TSSpell>("TSSpell");
    LUA_FIELD(ts_spell, TSSpell, IsAutoRepeat);
    LUA_FIELD(ts_spell, TSSpell, GetCaster);
    LUA_FIELD(ts_spell, TSSpell, GetOriginalCaster);
    LUA_FIELD(ts_spell, TSSpell, GetOriginalOrCurrentCaster);
    LUA_FIELD(ts_spell, TSSpell, GetCastTime);
    LUA_FIELD(ts_spell, TSSpell, GetEntry);
    LUA_FIELD(ts_spell, TSSpell, GetGlyphSlot);
    LUA_FIELD(ts_spell, TSSpell, GetPowerCost);
    LUA_FIELD(ts_spell, TSSpell, GetDuration);
    LUA_FIELD(ts_spell, TSSpell, GetTargetDest);
    LUA_FIELD(ts_spell, TSSpell, GetTarget);
    LUA_FIELD(ts_spell, TSSpell, GetSpellInfo);
    LUA_FIELD(ts_spell, TSSpell, SetAutoRepeat);
    LUA_FIELD(ts_spell, TSSpell, Cast);
    LUA_FIELD(ts_spell, TSSpell, Cancel);
    LUA_FIELD(ts_spell, TSSpell, Finish);
}
