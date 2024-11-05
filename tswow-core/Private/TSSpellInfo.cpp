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
#include "TSIncludes.h"
#include "TSSpellInfo.h"
#include <memory.h>
#include "SpellInfo.h"
#include "SpellMgr.h"

TSSpellInfo::TSSpellInfo(SpellInfo const* infoIn)
    : TSEntityProvider(&(const_cast<SpellInfo*>(infoIn)->m_tsEntity))
    , info(const_cast<SpellInfo*>(infoIn))
{}

TSSpellInfo::TSSpellInfo()
    : TSEntityProvider(nullptr)
    , info(nullptr)
{}

TSNumber<uint32> TSSpellInfo::GetEntry()  {
    return info->Id;
}

TSNumber<uint32> TSSpellInfo::GetSchool()
{
    return info->SchoolMask;
}
TSNumber<uint32> TSSpellInfo::GetBaseLevel()
{
    return info->BaseLevel;
}

TSNumber<uint32> TSSpellInfo::GetDmgClass()
{
    return info->DmgClass;
}

TSNumber<uint32> TSSpellInfo::GetActiveIconID()
{
    return info->ActiveIconID;
}

TSNumber<uint32> TSSpellInfo::GetAreaGroupID()
{
    return info->AreaGroupId;
}

TSNumber<uint32> TSSpellInfo::GetAttributes()
{
    return info->Attributes;
}

TSNumber<uint32> TSSpellInfo::GetAttributesCu()
{
    return info->AttributesCu;
}

TSNumber<uint32> TSSpellInfo::GetAttributesCu1()
{
    return info->AttributesCu1;
}

TSNumber<uint32> TSSpellInfo::GetAttributesEx()
{
    return info->AttributesEx;
}

TSNumber<uint32> TSSpellInfo::GetAttributesEx2()
{
    return info->AttributesEx2;
}

TSNumber<uint32> TSSpellInfo::GetAttributesEx3()
{
    return info->AttributesEx3;
}

TSNumber<uint32> TSSpellInfo::GetAttributesEx4()
{
    return info->AttributesEx4;
}

TSNumber<uint32> TSSpellInfo::GetAttributesEx5()
{
    return info->AttributesEx5;
}

TSNumber<uint32> TSSpellInfo::GetAttributesEx6()
{
    return info->AttributesEx6;
}

TSNumber<uint32> TSSpellInfo::GetAttributesEx7()
{
    return info->AttributesEx7;
}

TSNumber<uint32> TSSpellInfo::GetAuraInterruptFlags()
{
    return info->AuraInterruptFlags;
}

TSNumber<uint32> TSSpellInfo::GetCasterAuraSpell()
{
    return info->CasterAuraSpell;
}

TSNumber<uint32> TSSpellInfo::GetCasterAuraState()
{
    return info->CasterAuraState;
}

TSNumber<uint32> TSSpellInfo::GetCasterAuraStateNot()
{
    return info->CasterAuraStateNot;
}

TSNumber<uint32> TSSpellInfo::GetCategoryRecoveryTime()
{
    return info->CategoryRecoveryTime;
}

TSNumber<uint32> TSSpellInfo::GetChannelInterruptFlags()
{
    return info->ChannelInterruptFlags;
}

TSNumber<uint32> TSSpellInfo::GetDispel()
{
    return info->Dispel;
}

TSNumber<uint32> TSSpellInfo::GetEquippedItemClass()
{
    return info->EquippedItemClass;
}

TSNumber<uint32> TSSpellInfo::GetEquippedItemInventoryTypeMask()
{
    return info->EquippedItemInventoryTypeMask;
}

TSNumber<uint32> TSSpellInfo::GetEquippedItemSubClassMask()
{
    return info->EquippedItemSubClassMask;
}

TSNumber<uint32> TSSpellInfo::GetExcludeCasterAuraSpell()
{
    return info->ExcludeCasterAuraSpell;
}

TSNumber<uint32> TSSpellInfo::GetExcludeTargetAuraSpell()
{
    return info->ExcludeTargetAuraSpell;
}

TSNumber<uint32> TSSpellInfo::GetExplicitTargetMask()
{
    return info->ExplicitTargetMask;
}

TSNumber<uint32> TSSpellInfo::GetFacingCasterFlags()
{
    return info->FacingCasterFlags;
}

TSNumber<uint32> TSSpellInfo::GetInterruptFlags()
{
    return info->InterruptFlags;
}

TSNumber<uint32> TSSpellInfo::GetManaCost()
{
    return info->ManaCost;
}

TSNumber<uint32> TSSpellInfo::GetManaCostPercentage()
{
    return info->ManaCostPercentage;
}

TSNumber<uint32> TSSpellInfo::GetManaCostPerlevel()
{
    return info->ManaCostPerlevel;
}

TSNumber<uint32> TSSpellInfo::GetManaPerSecond()
{
    return info->ManaPerSecond;
}

TSNumber<uint32> TSSpellInfo::GetManaPerSecondPerLevel()
{
    return info->ManaPerSecondPerLevel;
}

TSNumber<uint32> TSSpellInfo::GetMaxAffectedTargets()
{
    return info->MaxAffectedTargets;
}

TSNumber<uint32> TSSpellInfo::GetMaxLevel()
{
    return info->MaxLevel;
}

TSNumber<uint32> TSSpellInfo::GetMaxTargetLevel()
{
    return info->MaxTargetLevel;
}

TSNumber<uint32> TSSpellInfo::GetMechanic()
{
    return info->Mechanic;
}

TSNumber<uint32> TSSpellInfo::GetPowerType()
{
    return info->PowerType;
}

TSNumber<uint32> TSSpellInfo::GetPreventionType()
{
    return info->PreventionType;
}

TSNumber<uint32> TSSpellInfo::GetPriority()
{
#if TRINITY
    return info->Priority;
#endif
}

TSNumber<uint32> TSSpellInfo::GetProcChance()
{
    return info->ProcChance;
}

TSNumber<uint32> TSSpellInfo::GetProcCharges()
{
    return info->ProcCharges;
}

TSNumber<uint32> TSSpellInfo::GetProcFlags()
{
    return info->ProcFlags;
}

TSNumber<uint32> TSSpellInfo::GetRecoveryTime()
{
    return info->RecoveryTime;
}

TSNumber<uint32> TSSpellInfo::GetRequiresSpellFocus()
{
    return info->RequiresSpellFocus;
}

TSNumber<uint32> TSSpellInfo::GetRuneCostID()
{
    return info->RuneCostID;
}

TSNumber<uint32> TSSpellInfo::GetSchoolMask()
{
    return info->SchoolMask;
}

TSNumber<uint32> TSSpellInfo::GetSpeed()
{
    return info->Speed;
}

TSNumber<uint32> TSSpellInfo::GetSpellFamilyFlags(uint32 flag)
{
    return info->SpellFamilyFlags[flag];
}

TSNumber<uint32> TSSpellInfo::GetRank()
{
    return info->GetRank();
}

TSNumber<uint32> TSSpellInfo::GetSpellFamilyName()
{
    return info->SpellFamilyName;
}

TSNumber<uint32> TSSpellInfo::GetSpellIconID()
{
    return info->SpellIconID;
}

TSNumber<uint32> TSSpellInfo::GetSpellLevel()
{
    return info->SpellLevel;
}

TSNumber<uint32> TSSpellInfo::GetStackAmount()
{
    return info->StackAmount;
}

TSNumber<uint32> TSSpellInfo::GetStances()
{
    return info->Stances;
}

TSNumber<uint32> TSSpellInfo::GetStancesNot()
{
    return info->StancesNot;
}

TSNumber<uint32> TSSpellInfo::GetStartRecoveryCategory()
{
    return info->StartRecoveryCategory;
}

TSNumber<uint32> TSSpellInfo::GetStartRecoveryTime()
{
    return info->StartRecoveryTime;
}

TSNumber<uint32> TSSpellInfo::GetTargetAuraSpell()
{
    return info->TargetAuraSpell;
}

TSNumber<uint32> TSSpellInfo::GetTargetAuraState()
{
    return info->TargetAuraState;
}

TSNumber<uint32> TSSpellInfo::GetTargetAuraStateNot()
{
    return info->TargetAuraStateNot;
}

TSNumber<uint32> TSSpellInfo::GetTargetCreatureType()
{
    return info->TargetCreatureType;
}

TSNumber<uint32> TSSpellInfo::GetTargets()
{
    return info->Targets;
}

TSSpellEffectInfo TSSpellInfo::GetEffect(uint32 index)
{
    return TSSpellEffectInfo(&info->GetEffect(static_cast<SpellEffIndex>(index)));
}

TSEntity * TSSpellInfo::GetData()
{
    return const_cast<TSEntity*>(&info->m_tsEntity);
}

TSSpellInfo GetSpellInfo(uint32 entry)
{
    return TSSpellInfo(sSpellMgr->GetSpellInfo(entry));
}

TSSpellInfo GetSpellWithRank(uint32 entry, uint32 rank)
{
    return TSSpellInfo(sSpellMgr->GetSpellInfo(sSpellMgr->GetSpellWithRank(entry, rank)));
}

TSSpellEffectInfo::TSSpellEffectInfo()
    : m_info(nullptr)
{}

TSSpellEffectInfo::TSSpellEffectInfo(SpellEffectInfo const* info)
    : m_info(const_cast<SpellEffectInfo*>(info))
{}

TSNumber<uint32> TSSpellEffectInfo::GetEffectIndex()
{
#if TRINITY
    return static_cast<uint32>(m_info->EffectIndex);
#endif
}

TSNumber<uint32> TSSpellEffectInfo::GetType()
{
    return static_cast<uint32>(m_info->Effect);
}

TSNumber<uint32> TSSpellEffectInfo::GetAura()
{
    return static_cast<uint32>(m_info->ApplyAuraName);
}

TSNumber<uint32> TSSpellEffectInfo::GetAmplitude()
{
    return m_info->Amplitude;
}

TSNumber<int32> TSSpellEffectInfo::GetDieSides()
{
    return m_info->DieSides;
}

TSNumber<float> TSSpellEffectInfo::GetRealPointsPerLevel()
{
    return m_info->RealPointsPerLevel;
}

TSNumber<int32> TSSpellEffectInfo::GetBasePoints()
{
    return m_info->BasePoints;
}

TSNumber<float> TSSpellEffectInfo::GetPointsPerComboPoint()
{
    return m_info->PointsPerComboPoint;
}

TSNumber<float> TSSpellEffectInfo::GetValueMultiplier()
{
    return m_info->ValueMultiplier;
}

TSNumber<float> TSSpellEffectInfo::GetDamageMultiplier()
{
    return m_info->DamageMultiplier;
}
TSNumber<float> TSSpellEffectInfo::GetBonusMultiplier()
{
    return m_info->BonusMultiplier;
}
TSNumber<int32> TSSpellEffectInfo::GetMiscValue()
{
    return m_info->MiscValue;
}
TSNumber<int32> TSSpellEffectInfo::GetMiscValueB()
{
    return m_info->MiscValueB;
}
TSNumber<uint32> TSSpellEffectInfo::GetMechanic()
{
    return static_cast<uint32>(m_info->Mechanic);
}
TSNumber<uint32> TSSpellEffectInfo::GetChainTarget()
{
    return m_info->ChainTarget;
}
TSNumber<uint32> TSSpellEffectInfo::GetItemType()
{
    return m_info->ItemType;
}
TSNumber<uint32> TSSpellEffectInfo::GetTriggerSpell()
{
    return m_info->TriggerSpell;
}

bool TSSpellEffectInfo::IsEffect()
{
    return m_info->IsEffect();
}
bool TSSpellEffectInfo::IsAura()
{
    return m_info->IsAura();
}

TSNumber<int32> TSSpellEffectInfo::CalcValue(TSWorldObject caster)
{
#if TRINITY
    return m_info->CalcValue(caster.obj);
#endif
}

TSNumber<uint32> TSSpellInfo::GetTotem(uint32 index)
{
    return info->Totem[index];
}

TSNumber<uint32> TSSpellInfo::GetTalentCost()
{
    return GetTalentSpellCost(info->Id);
}

TSNumber<uint32> GetTalentCost(uint32 entry)
{
    return GetTalentSpellCost(entry);
}

/** epoch-start */
bool TSSpellInfo::HasAura(uint32 auraType)
{
    return info->HasAura(static_cast<AuraType>(auraType));
}

TSNumber<float> TSSpellInfo::GetMinRange(bool positive /*= false*/)
{
    return info->GetMinRange(positive);
}

TSNumber<float> TSSpellInfo::GetMaxRange(bool positive /*= false*/)
{
    return info->GetMaxRange(positive, nullptr, nullptr);
}

bool TSSpellInfo::IsPositive()
{
    return info->IsPositive();
}

TSNumber<float> TSSpellEffectInfo::CalcRadius(TSWorldObject caster)
{
    return m_info->CalcRadius(caster.obj);
}
/** epoch-end */