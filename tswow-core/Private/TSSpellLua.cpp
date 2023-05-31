#include "TSLua.h"
#include "TSSpell.h"
#include "TSGUID.h"

void TSLua::load_spell_methods(sol::state& state)
{
    auto ts_spell = state.new_usertype<TSSpell>("TSSpell");
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

    auto ts_spell_destination = state.new_usertype<TSSpellDestination>("TSSpellDestination");
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetX);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetY);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetZ);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetO);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetMap);

    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetOffsetX);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetOffsetY);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetOffsetZ);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetOffsetO);

    LUA_FIELD(ts_spell_destination, TSSpellDestination, GetTransportGUID);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, Relocate);
    LUA_FIELD(ts_spell_destination, TSSpellDestination, RelocateOffset);

    auto ts_spell_implicit_target_info = state.new_usertype<TSSpellImplicitTargetInfo>("TSSpellImplicitTargetInfo");
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, IsArea);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, GetSelectionCategory);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, GetReferenceType);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, GetObjectType);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, GetCheckType);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, GetDirectionType);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, CalcDirectionAngle);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, GetTarget);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, GetExplicitTargetMask);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, IsSourceSet);
    LUA_FIELD(ts_spell_implicit_target_info, TSSpellImplicitTargetInfo, IsTargetSet);

    auto ts_dispel_info = state.new_usertype<TSDispelInfo>("TSDispelInfo");
    LUA_FIELD(ts_dispel_info, TSDispelInfo, GetDispeller);
    LUA_FIELD(ts_dispel_info, TSDispelInfo, GetDispellerSpellId);
    LUA_FIELD(ts_dispel_info, TSDispelInfo, GetRemovedCharges);
    LUA_FIELD(ts_dispel_info, TSDispelInfo, SetRemovedCharges);

    auto ts_player_spell = state.new_usertype<TSPlayerSpell>("TSPlayerSpell");
    LUA_FIELD(ts_player_spell, TSPlayerSpell, GetState);
    LUA_FIELD(ts_player_spell, TSPlayerSpell, GetActive);
    LUA_FIELD(ts_player_spell, TSPlayerSpell, GetDependent);
    LUA_FIELD(ts_player_spell, TSPlayerSpell, GetDisabled);
}
