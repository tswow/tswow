#include "TSLua.h"
#include "TSDamageInfo.h"
#include "TSUnit.h"

void TSLuaState::load_damage_metods(uint32_t modid)
{
    auto ts_meleedamageinfo = new_usertype<TSMeleeDamageInfo>("TSDamageInfo");
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAttacker);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetTarget);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetSchool1);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetSchool2);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetDamage1);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetDamage2);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAbsorb1);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAbsorb2);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetResist1);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetResist2);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetBlocked);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetHitInfo);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetTargetState);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAttackType);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetProcAttacker);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetHitInfo);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetTargetState);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAttackType);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetProcAttacker);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetProcVictim);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetCleanDamage);
    LUA_FIELD(ts_meleedamageinfo, TSMeleeDamageInfo, GetMeleeHitOutcome);

    auto ts_spelldamageinfo = new_usertype<TSSpellDamageInfo>("TSSpellDamageInfo");
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetAttacker);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetTarget);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetSpellID);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetDamage);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetOverkill);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetSchoolMask);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetAbsorb);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetResist);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetPeriodicLog);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetUnused);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetBlocked);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetHitInfo);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetCleanDamage);
    LUA_FIELD(ts_spelldamageinfo, TSSpellDamageInfo, GetFullBlock);
}
