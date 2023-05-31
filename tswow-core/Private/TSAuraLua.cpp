#include "TSLua.h"
#include "TSAura.h"
#include "TSGUID.h"

void TSLua::load_aura_methods(sol::state& state)
{
    auto ts_auraeffect = state.new_usertype<TSAuraEffect>("TSAuraEffect");
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetCaster);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetCasterGUID);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetAura);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetSpellInfo);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetID);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetEffectIndex);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetAmplitude);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetMiscValueB);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetMiscValue);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetAuraType);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetAmount);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, SetAmount);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetPeriodicTimer);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, SetPeriodicTimer);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetTickNumber);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetRemainingTicks);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, GetTotalTicks);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, ResetPeriodic);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, ResetTicks);
    LUA_FIELD(ts_auraeffect, TSAuraEffect, IsPeriodic);

    auto ts_auraapplication = state.new_usertype<TSAuraApplication>("TSAuraApplication");
    LUA_FIELD(ts_auraapplication, TSAuraApplication, GetTarget);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, GetAura);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, GetSlot);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, GetFlags);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, GetEffectMask);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, GetAppliedEffects);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, GetRemoveMode);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, IsPositive);
    LUA_FIELD(ts_auraapplication, TSAuraApplication, IsSelfCast);

    auto ts_aura = state.new_usertype<TSAura>("TSAura");
    LUA_FIELD(ts_aura, TSAura, GetCaster);
    LUA_FIELD(ts_aura, TSAura, GetCasterGUID);
    LUA_FIELD(ts_aura, TSAura, GetCasterLevel);
    LUA_FIELD(ts_aura, TSAura, GetDuration);
    LUA_FIELD(ts_aura, TSAura, GetAuraID);
    LUA_FIELD(ts_aura, TSAura, GetMaxDuration);
    LUA_FIELD(ts_aura, TSAura, GetStackAmount);
    LUA_FIELD(ts_aura, TSAura, GetOwner);
    LUA_FIELD(ts_aura, TSAura, SetDuration);
    LUA_FIELD(ts_aura, TSAura, SetMaxDuration);
    LUA_FIELD(ts_aura, TSAura, SetStackAmount);
    LUA_FIELD(ts_aura, TSAura, Remove);
    LUA_FIELD(ts_aura, TSAura, GetEffect);
    ts_aura.set_function("GetApplications", &TSAura::LGetApplications);

    auto ts_proc_event_info = state.new_usertype<TSProcEventInfo>("TSProcEventInfo");
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetActor);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetActionTarget);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetProcTarget);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetTypeMask);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetSpellTypeMask);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetSpellPhaseMask);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetHitMask);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetSpellInfo);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetSchoolMask);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetDamageInfo);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetHealInfo);
    LUA_FIELD(ts_proc_event_info, TSProcEventInfo, GetSpell);
}
