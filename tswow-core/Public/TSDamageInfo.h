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

#include "TSBase.h"
#include "TSUnit.h"

struct CalcDamageInfo;
struct SpellNonMeleeDamage;
class DamageInfo;
class HealInfo;

class TC_GAME_API TSMeleeDamageInfo {
public:
    CalcDamageInfo * _info;
    TSMeleeDamageInfo(CalcDamageInfo * info);
    TSMeleeDamageInfo * operator->() { return this;}
    operator bool() const { return _info != nullptr; }
    bool operator==(TSMeleeDamageInfo const& rhs) { return _info == rhs._info; }

    TSUnit GetAttacker();
    TSUnit GetTarget();

    TSNumber<uint32> GetSchool1();
    TSNumber<uint32> GetSchool2();

    TSNumber<uint32> GetDamage1();
    TSNumber<uint32> GetDamage2();

    TSNumber<uint32> GetAbsorb1();
    TSNumber<uint32> GetAbsorb2();

    TSNumber<uint32> GetResist1();
    TSNumber<uint32> GetResist2();

    TSNumber<uint32> GetBlocked();
    TSNumber<uint32> GetHitInfo();
    TSNumber<uint32> GetTargetState();

    TSNumber<uint32> GetAttackType();
    TSNumber<uint32> GetProcAttacker();
    TSNumber<uint32> GetProcVictim();
    TSNumber<uint32> GetCleanDamage();

    TSNumber<uint8> GetMeleeHitOutcome();
};

class TC_GAME_API TSSpellDamageInfo {
public:
    SpellNonMeleeDamage * _info;
    TSSpellDamageInfo(SpellNonMeleeDamage * info);
    TSSpellDamageInfo* operator->() { return this; }
    operator bool() const { return _info != nullptr; }
    bool operator==(TSSpellDamageInfo const& rhs) { return _info == rhs._info; }
    TSUnit GetAttacker();
    TSUnit GetTarget();
    TSNumber<uint32> GetSpellID();
    TSNumber<uint32> GetDamage();
    TSNumber<uint32> GetOverkill();
    TSNumber<uint32> GetSchoolMask();
    TSNumber<uint32> GetAbsorb();
    TSNumber<uint32> GetResist();
    bool GetPeriodicLog();
    bool GetUnused();
    TSNumber<uint32> GetBlocked();
    TSNumber<uint32> GetHitInfo();
    TSNumber<uint32> GetCleanDamage();
    bool GetFullBlock();
};

class TC_GAME_API TSHealInfo {
    TS_CLASS_DECLARATION(TSHealInfo, HealInfo, m_info)
    void AbsorbHeal(uint32 amount);
    void SetEffectiveHeal(uint32 amount);
    TSUnit GetHealer();
    TSUnit GetTarget();
    TSNumber<uint32> GetHeal();
    TSNumber<uint32> GetEffectiveHeal();
    TSNumber<uint32> GetAbsorb();
    TSSpellInfo GetSpellInfo();
    TSNumber<uint32> GetSchoolMask();
    TSNumber<uint32> GetHitMask();
};

class TC_GAME_API TSDamageInfo {
    TS_CLASS_DECLARATION(TSDamageInfo, DamageInfo, m_info)
    void ModifyDamage(int32 amount);
    void AbsorbDamage(uint32 amount);
    void ResistDamage(uint32 amount);
    void BlockDamage(uint32 amount);
    TSUnit GetAttacker();
    TSUnit GetVictim();
    TSSpellInfo GetSpellInfo();
    TSNumber<uint32> GetSchoolMask();
    TSNumber<uint32> GetDamageType();
    TSNumber<uint32> GetAttackType();
    TSNumber<uint32> GetDamage();
    TSNumber<uint32> GetAbsorb();
    TSNumber<uint32> GetBlock();
    TSNumber<uint32> GetHitMask();
};
