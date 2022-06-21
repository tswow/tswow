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

uint32 TSSpellInfo::GetEntry()  {
    return info->Id;
}

uint32 TSSpellInfo::GetSchool()
{
    return info->SchoolMask;
}
uint32 TSSpellInfo::GetBaseLevel()
{
    return info->BaseLevel;
}

uint32 TSSpellInfo::GetDmgClass()
{
    return info->DmgClass;
}

uint32 TSSpellInfo::GetActiveIconID()
{
    return info->ActiveIconID;
}

uint32 TSSpellInfo::GetAreaGroupID()
{
    return info->AreaGroupId;
}

uint32 TSSpellInfo::GetAttributes()
{
    return info->Attributes;
}

uint32 TSSpellInfo::GetAttributesCu()
{
    return info->AttributesCu;
}

uint32 TSSpellInfo::GetAttributesEx()
{
    return info->AttributesEx;
}

uint32 TSSpellInfo::GetAttributesEx2()
{
    return info->AttributesEx2;
}

uint32 TSSpellInfo::GetAttributesEx3()
{
    return info->AttributesEx3;
}

uint32 TSSpellInfo::GetAttributesEx4()
{
    return info->AttributesEx4;
}

uint32 TSSpellInfo::GetAttributesEx5()
{
    return info->AttributesEx5;
}

uint32 TSSpellInfo::GetAttributesEx6()
{
    return info->AttributesEx6;
}

uint32 TSSpellInfo::GetAttributesEx7()
{
    return info->AttributesEx7;
}

uint32 TSSpellInfo::GetAuraInterruptFlags()
{
    return info->AuraInterruptFlags;
}

uint32 TSSpellInfo::GetCasterAuraSpell()
{
    return info->CasterAuraSpell;
}

uint32 TSSpellInfo::GetCasterAuraState()
{
    return info->CasterAuraState;
}

uint32 TSSpellInfo::GetCasterAuraStateNot()
{
    return info->CasterAuraStateNot;
}

uint32 TSSpellInfo::GetCategoryRecoveryTime()
{
    return info->CategoryRecoveryTime;
}

uint32 TSSpellInfo::GetChannelInterruptFlags()
{
    return info->ChannelInterruptFlags;
}

uint32 TSSpellInfo::GetDispel()
{
    return info->Dispel;
}

uint32 TSSpellInfo::GetEquippedItemClass()
{
    return info->EquippedItemClass;
}

uint32 TSSpellInfo::GetEquippedItemInventoryTypeMask()
{
    return info->EquippedItemInventoryTypeMask;
}

uint32 TSSpellInfo::GetEquippedItemSubClassMask()
{
    return info->EquippedItemSubClassMask;
}

uint32 TSSpellInfo::GetExcludeCasterAuraSpell()
{
    return info->ExcludeCasterAuraSpell;
}

uint32 TSSpellInfo::GetExcludeTargetAuraSpell()
{
    return info->ExcludeTargetAuraSpell;
}

uint32 TSSpellInfo::GetExplicitTargetMask()
{
    return info->ExplicitTargetMask;
}

uint32 TSSpellInfo::GetFacingCasterFlags()
{
    return info->FacingCasterFlags;
}

uint32 TSSpellInfo::GetInterruptFlags()
{
    return info->InterruptFlags;
}

uint32 TSSpellInfo::GetManaCost()
{
    return info->ManaCost;
}

uint32 TSSpellInfo::GetManaCostPercentage()
{
    return info->ManaCostPercentage;
}

uint32 TSSpellInfo::GetManaCostPerlevel()
{
    return info->ManaCostPerlevel;
}

uint32 TSSpellInfo::GetManaPerSecond()
{
    return info->ManaPerSecond;
}

uint32 TSSpellInfo::GetManaPerSecondPerLevel()
{
    return info->ManaPerSecondPerLevel;
}

uint32 TSSpellInfo::GetMaxAffectedTargets()
{
    return info->MaxAffectedTargets;
}

uint32 TSSpellInfo::GetMaxLevel()
{
    return info->MaxLevel;
}

uint32 TSSpellInfo::GetMaxTargetLevel()
{
    return info->MaxTargetLevel;
}

uint32 TSSpellInfo::GetMechanic()
{
    return info->Mechanic;
}

uint32 TSSpellInfo::GetPowerType()
{
    return info->PowerType;
}

uint32 TSSpellInfo::GetPreventionType()
{
    return info->PreventionType;
}

uint32 TSSpellInfo::GetPriority()
{
#if TRINITY
    return info->Priority;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSSpellInfo::GetPriority not implemented for AzerothCore");
    return 0;
#endif
}

uint32 TSSpellInfo::GetProcChance()
{
    return info->ProcChance;
}

uint32 TSSpellInfo::GetProcCharges()
{
    return info->ProcCharges;
}

uint32 TSSpellInfo::GetProcFlags()
{
    return info->ProcFlags;
}

uint32 TSSpellInfo::GetRecoveryTime()
{
    return info->RecoveryTime;
}

uint32 TSSpellInfo::GetRequiresSpellFocus()
{
    return info->RequiresSpellFocus;
}

uint32 TSSpellInfo::GetRuneCostID()
{
    return info->RuneCostID;
}

uint32 TSSpellInfo::GetSchoolMask()
{
    return info->SchoolMask;
}

uint32 TSSpellInfo::GetSpeed()
{
    return info->Speed;
}

uint32 TSSpellInfo::GetSpellFamilyFlags()
{
    return info->SpellFamilyFlags;
}

uint32 TSSpellInfo::GetSpellFamilyName()
{
    return info->SpellFamilyName;
}

uint32 TSSpellInfo::GetSpellIconID()
{
    return info->SpellIconID;
}

uint32 TSSpellInfo::GetSpellLevel()
{
    return info->SpellLevel;
}

uint32 TSSpellInfo::GetStackAmount()
{
    return info->StackAmount;
}

uint32 TSSpellInfo::GetStances()
{
    return info->Stances;
}

uint32 TSSpellInfo::GetStancesNot()
{
    return info->StancesNot;
}

uint32 TSSpellInfo::GetStartRecoveryCategory()
{
    return info->StartRecoveryCategory;
}

uint32 TSSpellInfo::GetStartRecoveryTime()
{
    return info->StartRecoveryTime;
}

uint32 TSSpellInfo::GetTargetAuraSpell()
{
    return info->TargetAuraSpell;
}

uint32 TSSpellInfo::GetTargetAuraState()
{
    return info->TargetAuraState;
}

uint32 TSSpellInfo::GetTargetAuraStateNot()
{
    return info->TargetAuraStateNot;
}

uint32 TSSpellInfo::GetTargetCreatureType()
{
    return info->TargetCreatureType;
}

uint32 TSSpellInfo::GetTargets()
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

TSSpellEffectInfo::TSSpellEffectInfo()
    : m_info(nullptr)
{}

TSSpellEffectInfo::TSSpellEffectInfo(SpellEffectInfo const* info)
    : m_info(const_cast<SpellEffectInfo*>(info))
{}

uint32 TSSpellEffectInfo::GetEffectIndex()
{
#if TRINITY
    return static_cast<uint32>(m_info->EffectIndex);
#elif AZEROTHCORE
    return static_cast<uint32>(m_info->_effIndex);
#endif
}

uint32 TSSpellEffectInfo::GetType()
{
    return static_cast<uint32>(m_info->Effect);
}

uint32 TSSpellEffectInfo::GetAura()
{
    return static_cast<uint32>(m_info->ApplyAuraName);
}

uint32 TSSpellEffectInfo::GetAmplitude()
{
    return m_info->Amplitude;
}

int32 TSSpellEffectInfo::GetDieSides()
{
    return m_info->DieSides;
}

float TSSpellEffectInfo::GetRealPointsPerLevel()
{
    return m_info->RealPointsPerLevel;
}

int32 TSSpellEffectInfo::GetBasePoints()
{
    return m_info->BasePoints;
}

float TSSpellEffectInfo::GetPointsPerComboPoint()
{
    return m_info->PointsPerComboPoint;
}

float TSSpellEffectInfo::GetValueMultiplier()
{
    return m_info->ValueMultiplier;
}

float TSSpellEffectInfo::GetDamageMultiplier()
{
    return m_info->DamageMultiplier;
}
float TSSpellEffectInfo::GetBonusMultiplier()
{
    return m_info->BonusMultiplier;
}
int32 TSSpellEffectInfo::GetMiscValue()
{
    return m_info->MiscValue;
}
int32 TSSpellEffectInfo::GetMiscValueB()
{
    return m_info->MiscValueB;
}
uint32 TSSpellEffectInfo::GetMechanic()
{
    return static_cast<uint32>(m_info->Mechanic);
}
uint32 TSSpellEffectInfo::GetChainTarget()
{
    return m_info->ChainTarget;
}
uint32 TSSpellEffectInfo::GetItemType()
{
    return m_info->ItemType;
}
uint32 TSSpellEffectInfo::GetTriggerSpell()
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

int32 TSSpellEffectInfo::CalcValue(TSWorldObject caster)
{
#if TRINITY
    return m_info->CalcValue(caster.obj);
#elif AZEROTHCORE
    if (Unit* unit = caster.obj->ToUnit())
    {
        return m_info->CalcValue(unit);
    }
    else
    {
        TS_LOG_ERROR("tswow.api", "TSSpellEffectInfo::CalcValue not implemented for GameObjects on AzerothCore.");
        return 0;
    }
#endif
}

uint32 TSSpellInfo::GetTotem(uint32 index)
{
    return info->Totem[index];
}


uint32 TSSpellInfo::GetTalentCost()
{
    return GetTalentSpellCost(info->Id);
}
