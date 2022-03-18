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

#include "TSMain.h"
#include "TSClasses.h"
#include "TSArray.h"

#include <sol/sol.hpp>
#include <vector>

class AuraEffect;

class TC_GAME_API TSAuraEffect {
public:
    AuraEffect* aura;
    TSAuraEffect(AuraEffect* aura);
    TSAuraEffect();
    TSAuraEffect* operator->() { return this;}
    operator bool() const { return aura != nullptr; }
    bool operator==(TSAuraEffect const& rhs) {
        return aura == rhs.aura;
    }

    TSUnit GetCaster();
    uint64 GetCasterGUID();
    TSAura GetAura();
    TSSpellInfo GetSpellInfo();
    uint32 GetID();
    uint32 GetEffectIndex();
    uint32 GetAmplitude();
    int32 GetMiscValueB();
    int32 GetMiscValue();
    uint32 GetAuraType();
    int32 GetAmount();
    void SetAmount(int32 amount);
    int32 GetPeriodicTimer();
    void SetPeriodicTimer(int32 periodicTimer);
    uint32 GetTickNumber();
    uint32 GetRemainingTicks();
    uint32 GetTotalTicks();
    void ResetPeriodic();
    void ResetTicks();
    bool IsPeriodic();
};

class AuraApplication;
class TC_GAME_API TSAuraApplication {
public:
    AuraApplication* aura;
    TSAuraApplication(AuraApplication* aura);
    TSAuraApplication();
    TSAuraApplication* operator->() { return this;}
    operator bool() const { return aura != nullptr; }
    bool operator==(TSAuraApplication const& rhs) { return aura == rhs.aura; }
    TSUnit GetTarget();
    TSAura GetAura();
    uint8 GetSlot();
    uint8 GetFlags();
    uint8 GetEffectMask();
    uint8 GetAppliedEffects();
    uint8 GetRemoveMode();
    bool IsPositive();
    bool IsSelfCast();
};

class TC_GAME_API TSAura {
public:
    Aura *aura;
    TSAura(Aura *aura);
    TSAura();
    bool IsNull() { return aura == nullptr; };
    TSAura* operator->() { return this;}
    operator bool() const { return aura != nullptr; }
    bool operator==(TSAura const& rhs) { return aura == rhs.aura; }
    TSUnit GetCaster();
    uint64 GetCasterGUID();
    uint32 GetCasterLevel();
    int32 GetDuration();
    uint32 GetAuraID();
    int32 GetMaxDuration();
    uint32 GetStackAmount();
    TSWorldObject GetOwner();
    TSArray<TSAuraApplication> GetApplications();
    void SetDuration(int32 duration);
    void SetMaxDuration(int32 duration);
    void SetStackAmount(uint8 amount);
    void Remove();
private:
    sol::as_table_t<std::vector<TSAuraApplication>> LGetApplications();
    friend class TSLuaState;
};