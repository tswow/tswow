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
#include "TSClasses.h"
#include "TSEntity.h"

class TC_GAME_API TSSpellEffectInfo
{
public:
    SpellEffectInfo* m_info;
    TSSpellEffectInfo(SpellEffectInfo const* info);
    TSSpellEffectInfo();
    TSSpellEffectInfo* operator->() { return this; }
    operator bool() const { return m_info != nullptr; }
    bool operator==(TSSpellEffectInfo const& rhs) { return m_info == rhs.m_info; }
    bool IsNull() { return m_info == nullptr; }

    int32 CalcValue(TSWorldObject caster);
    uint32 GetEffectIndex();
    uint32 GetType();
    uint32 GetAura();
    uint32 GetAmplitude();
    int32 GetDieSides();
    float GetRealPointsPerLevel();
    int32 GetBasePoints();
    float GetPointsPerComboPoint();
    float GetValueMultiplier();
    float GetDamageMultiplier();
    float GetBonusMultiplier();
    int32 GetMiscValue();
    int32 GetMiscValueB();
    uint32 GetMechanic();
    // TODO: GetTargetA/GetTargetB
    uint32 GetChainTarget();
    uint32 GetItemType();
    uint32 GetTriggerSpell();

    bool IsEffect();
    bool IsAura();
};

class TC_GAME_API TSSpellInfo: public TSEntityProvider {
public:
    SpellInfo * info;
    TSSpellInfo(SpellInfo const* info);
    TSSpellInfo();
    TSSpellInfo* operator->() { return this;}
    operator bool() const { return info != nullptr; }
    bool operator==(TSSpellInfo const& rhs) { return info == rhs.info; }
    bool IsNull() { return info == nullptr; }

    uint32 GetEntry();
    uint32 GetSchool();
    uint32 GetBaseLevel();
    uint32 GetDmgClass();
    uint32 GetActiveIconID();
    uint32 GetAreaGroupID();
    uint32 GetAttributes();
    uint32 GetAttributesCu();
    uint32 GetAttributesEx();
    uint32 GetAttributesEx2();
    uint32 GetAttributesEx3();
    uint32 GetAttributesEx4();
    uint32 GetAttributesEx5();
    uint32 GetAttributesEx6();
    uint32 GetAttributesEx7();
    uint32 GetAuraInterruptFlags();
    uint32 GetCasterAuraSpell();
    uint32 GetCasterAuraState();
    uint32 GetCasterAuraStateNot();
    uint32 GetCategoryRecoveryTime();
    uint32 GetChannelInterruptFlags();
    uint32 GetDispel();
    uint32 GetEquippedItemClass();
    uint32 GetEquippedItemInventoryTypeMask();
    uint32 GetEquippedItemSubClassMask();
    uint32 GetExcludeCasterAuraSpell();
    uint32 GetExcludeTargetAuraSpell();
    uint32 GetExplicitTargetMask();
    uint32 GetFacingCasterFlags();
    uint32 GetInterruptFlags();
    uint32 GetManaCost();
    uint32 GetManaCostPercentage();
    uint32 GetManaCostPerlevel();
    uint32 GetManaPerSecond();
    uint32 GetManaPerSecondPerLevel();
    uint32 GetMaxAffectedTargets();
    uint32 GetMaxLevel();
    uint32 GetMaxTargetLevel();
    uint32 GetMechanic();
    uint32 GetPowerType();
    uint32 GetPreventionType();
    uint32 GetPriority();
    uint32 GetProcChance();
    uint32 GetProcCharges();
    uint32 GetProcFlags();
    uint32 GetRecoveryTime();
    uint32 GetRequiresSpellFocus();
    uint32 GetRuneCostID();
    uint32 GetSchoolMask();
    uint32 GetSpeed();
    uint32 GetSpellFamilyFlags();
    uint32 GetSpellFamilyName();
    uint32 GetSpellIconID();
    uint32 GetSpellLevel();
    uint32 GetStackAmount();
    uint32 GetStances();
    uint32 GetStancesNot();
    uint32 GetStartRecoveryCategory();
    uint32 GetStartRecoveryTime();
    uint32 GetTargetAuraSpell();
    uint32 GetTargetAuraState();
    uint32 GetTargetAuraStateNot();
    uint32 GetTargetCreatureType();
    uint32 GetTargets();
    uint32 GetTotem(uint32 index);
    TSSpellEffectInfo GetEffect(uint32 index);
    TSEntity * GetData();
};

TC_GAME_API TSSpellInfo GetSpellInfo(uint32 entry);
