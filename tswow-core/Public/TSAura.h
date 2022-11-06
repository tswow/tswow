/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
#pragma once

#include "TSEntity.h"
#include "TSMain.h"
#include "TSClasses.h"
#include "TSArray.h"

#include <sol/sol.hpp>
#include <vector>

class AuraEffect;
class ProcEventInfo;
class TSUnit;
class TSSpell;
class TSSpellInfo;
class TSHealInfo;
class TSDamageInfo;

class TC_GAME_API TSAuraEffect : public TSEntityProvider {
    TS_CLASS_DECLARATION(TSAuraEffect,AuraEffect,aura)
    TSUnit GetCaster();
    TSNumber<uint64> GetCasterGUID();
    TSAura GetAura();
    TSSpellInfo GetSpellInfo();
    TSNumber<uint32> GetID();
    TSNumber<uint32> GetEffectIndex();
    TSNumber<uint32> GetAmplitude();
    TSNumber<int32> GetMiscValueB();
    TSNumber<int32> GetMiscValue();
    TSNumber<uint32> GetAuraType();
    TSNumber<int32> GetAmount();
    void SetAmount(int32 amount);
    TSNumber<int32> GetPeriodicTimer();
    void SetPeriodicTimer(int32 periodicTimer);
    TSNumber<uint32> GetTickNumber();
    TSNumber<uint32> GetRemainingTicks();
    TSNumber<uint32> GetTotalTicks();
    void ResetPeriodic();
    void ResetTicks();
    bool IsPeriodic();
};

class AuraApplication;
class TC_GAME_API TSAuraApplication : public TSEntityProvider {
    TS_CLASS_DECLARATION(TSAuraApplication,AuraApplication,aura)
    TSUnit GetTarget();
    TSAura GetAura();
    TSNumber<uint8> GetSlot();
    TSNumber<uint8> GetFlags();
    TSNumber<uint8> GetEffectMask();
    TSNumber<uint8> GetAppliedEffects();
    TSNumber<uint8> GetRemoveMode();
    bool IsPositive();
    bool IsSelfCast();
};

class TC_GAME_API TSAura : public TSEntityProvider {
public:
    Aura *aura;
    TSAura(Aura *aura);
    TSAura();
    bool IsNull() { return aura == nullptr; };
    TSAura* operator->() { return this;}
    operator bool() const { return aura != nullptr; }
    bool operator==(TSAura const& rhs) { return aura == rhs.aura; }
    TSUnit GetCaster();
    TSNumber<uint64> GetCasterGUID();
    TSNumber<uint32> GetCasterLevel();
    TSNumber<int32> GetDuration();
    TSNumber<uint32> GetAuraID();
    TSNumber<int32> GetMaxDuration();
    TSNumber<uint32> GetStackAmount();
    TSWorldObject GetOwner();
    TSAuraEffect GetEffect(uint8 index);
    TSArray<TSAuraApplication> GetApplications();
    void SetDuration(int32 duration);
    void SetMaxDuration(int32 duration);
    void SetStackAmount(uint8 amount);
    void Remove();
private:
    TSLua::Array<TSAuraApplication> LGetApplications();
    friend class TSLua;
};

class TC_GAME_API TSProcEventInfo
{
    TS_CLASS_DECLARATION(TSProcEventInfo, ProcEventInfo, m_info)
    TSUnit GetActor();
    TSUnit GetActionTarget();
    TSUnit GetProcTarget();
    TSNumber<uint32> GetTypeMask();
    TSNumber<uint32> GetSpellTypeMask();
    TSNumber<uint32> GetSpellPhaseMask();
    TSNumber<uint32> GetHitMask();
    TSSpellInfo GetSpellInfo();
    TSNumber<uint32> GetSchoolMask();
    TSDamageInfo GetDamageInfo();
    TSHealInfo GetHealInfo();
    TSSpell GetSpell();
};
