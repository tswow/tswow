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
#include "TSLua.h"

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

    TSNumber<int32> CalcValue(TSWorldObject caster);
    TSNumber<uint32> GetEffectIndex();
    TSNumber<uint32> GetType();
    TSNumber<uint32> GetAura();
    TSNumber<uint32> GetAmplitude();
    TSNumber<int32> GetDieSides();
    TSNumber<float> GetRealPointsPerLevel();
    TSNumber<int32> GetBasePoints();
    TSNumber<float> GetPointsPerComboPoint();
    TSNumber<float> GetValueMultiplier();
    TSNumber<float> GetDamageMultiplier();
    TSNumber<float> GetBonusMultiplier();
    TSNumber<int32> GetMiscValue();
    TSNumber<int32> GetMiscValueB();
    TSNumber<uint32> GetMechanic();
    // TODO: GetTargetA/GetTargetB
    TSNumber<uint32> GetChainTarget();
    TSNumber<uint32> GetItemType();
    TSNumber<uint32> GetTriggerSpell();

    bool IsEffect();
    bool IsAura();

    /** @epoch-start */
    TSNumber<float> CalcRadius(TSWorldObject caster);
    /** @epoch-end */
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

    TSNumber<uint32> GetEntry();
    TSNumber<uint32> GetSchool();
    TSNumber<uint32> GetBaseLevel();
    TSNumber<uint32> GetDmgClass();
    TSNumber<uint32> GetActiveIconID();
    TSNumber<uint32> GetAreaGroupID();
    TSNumber<uint32> GetAttributes();
    TSNumber<uint32> GetAttributesCu();
    TSNumber<uint32> GetAttributesCu1();
    TSNumber<uint32> GetAttributesEx();
    TSNumber<uint32> GetAttributesEx2();
    TSNumber<uint32> GetAttributesEx3();
    TSNumber<uint32> GetAttributesEx4();
    TSNumber<uint32> GetAttributesEx5();
    TSNumber<uint32> GetAttributesEx6();
    TSNumber<uint32> GetAttributesEx7();
    TSNumber<uint32> GetAuraInterruptFlags();
    TSNumber<uint32> GetCasterAuraSpell();
    TSNumber<uint32> GetCasterAuraState();
    TSNumber<uint32> GetCasterAuraStateNot();
    TSNumber<uint32> GetCategoryRecoveryTime();
    TSNumber<uint32> GetChannelInterruptFlags();
    TSNumber<uint32> GetDispel();
    TSNumber<uint32> GetEquippedItemClass();
    TSNumber<uint32> GetEquippedItemInventoryTypeMask();
    TSNumber<uint32> GetEquippedItemSubClassMask();
    TSNumber<uint32> GetExcludeCasterAuraSpell();
    TSNumber<uint32> GetExcludeTargetAuraSpell();
    TSNumber<uint32> GetExplicitTargetMask();
    TSNumber<uint32> GetFacingCasterFlags();
    TSNumber<uint32> GetInterruptFlags();
    TSNumber<uint32> GetManaCost();
    TSNumber<uint32> GetManaCostPercentage();
    TSNumber<uint32> GetManaCostPerlevel();
    TSNumber<uint32> GetManaPerSecond();
    TSNumber<uint32> GetManaPerSecondPerLevel();
    TSNumber<uint32> GetMaxAffectedTargets();
    TSNumber<uint32> GetMaxLevel();
    TSNumber<uint32> GetMaxTargetLevel();
    TSNumber<uint32> GetMechanic();
    TSNumber<uint32> GetPowerType();
    TSNumber<uint32> GetPreventionType();
    TSNumber<uint32> GetPriority();
    TSNumber<uint32> GetProcChance();
    TSNumber<uint32> GetProcCharges();
    TSNumber<uint32> GetProcFlags();
    TSNumber<uint32> GetRecoveryTime();
    TSNumber<uint32> GetRequiresSpellFocus();
    TSNumber<uint32> GetRuneCostID();
    TSNumber<uint32> GetSchoolMask();
    TSNumber<uint32> GetSpeed();
    TSNumber<uint32> GetSpellFamilyFlags(uint32 flag);
    TSNumber<uint32> GetSpellFamilyName();
    TSNumber<uint32> GetSpellIconID();
    TSNumber<uint32> GetSpellLevel();
    TSNumber<uint32> GetStackAmount();
    TSNumber<uint32> GetStances();
    TSNumber<uint32> GetStancesNot();
    TSNumber<uint32> GetStartRecoveryCategory();
    TSNumber<uint32> GetStartRecoveryTime();
    TSNumber<uint32> GetTargetAuraSpell();
    TSNumber<uint32> GetTargetAuraState();
    TSNumber<uint32> GetTargetAuraStateNot();
    TSNumber<uint32> GetTargetCreatureType();
    TSNumber<uint32> GetTargets();
    TSNumber<uint32> GetTotem(uint32 index);
    TSNumber<uint32> GetTalentCost();
    TSSpellEffectInfo GetEffect(uint32 index);
    TSEntity * GetData();
    TSNumber<uint32> GetRank();

    /** epoch-start */
    bool HasAura(uint32 auraType);
    bool IsPositive();
    TSNumber<float> GetMinRange(bool positive = false);
    TSNumber<float> GetMaxRange(bool positive = false);
    /** epoch-end */
};

TC_GAME_API TSSpellInfo GetSpellInfo(uint32 entry);
TC_GAME_API TSSpellInfo GetSpellWithRank(uint32 entry, uint32 rank);
TC_GAME_API TSNumber<uint32> GetTalentCost(uint32 entry);

LUA_PTR_TYPE(TSSpellInfo)
LUA_PTR_TYPE(TSSpellEffectInfo)
