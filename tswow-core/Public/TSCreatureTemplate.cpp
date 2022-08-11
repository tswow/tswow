/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
#include "TSCreatureTemplate.h"
#include "ObjectMgr.h"
#include "CreatureData.h"

TSCreatureTemplate::TSCreatureTemplate(CreatureTemplate * ctIn)
    : TSEntityProvider(&ctIn->m_tsEntity)
    , ct(ctIn)
{}

TSNumber<uint32> TSCreatureTemplate::GetEntry()
{
    return ct->Entry;
}

TSNumber<uint32> TSCreatureTemplate::GetDifficultyEntryA()
{
    return ct->DifficultyEntry[0];
}

TSNumber<uint32> TSCreatureTemplate::GetDifficultyEntryB()
{
    return ct->DifficultyEntry[1];
}

TSNumber<uint32> TSCreatureTemplate::GetDifficultyEntryC()
{
    return ct->DifficultyEntry[2];
}

TSNumber<uint32> TSCreatureTemplate::GetKillCreditA()
{
    return ct->KillCredit[0];
}

TSNumber<uint32> TSCreatureTemplate::GetKillCreditB()
{
    return ct->KillCredit[1];
}

TSNumber<uint32> TSCreatureTemplate::GetModelID1()
{
    return ct->Modelid1;
}

TSNumber<uint32> TSCreatureTemplate::GetModelID2()
{
    return ct->Modelid2;
}

TSNumber<uint32> TSCreatureTemplate::GetModelID3()
{
    return ct->Modelid3;
}

TSNumber<uint32> TSCreatureTemplate::GetModelID4()
{
    return ct->Modelid4;
}

std::string TSCreatureTemplate::GetName()
{
    return ct->Name;
}

std::string TSCreatureTemplate::GetTitle()
{
#if TRINITY
    return ct->Title;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TScreatureTemplate::GetTitle not implemented for AzerothCore.");
    return "";
#endif
}

std::string TSCreatureTemplate::GetIconName()
{
    return ct->IconName;
}
TSNumber<uint32> TSCreatureTemplate::GetGossipMenuID()
{
    return ct->GossipMenuId;
}

TSNumber<uint8> TSCreatureTemplate::GetMinLevel()
{
    return ct->minlevel;
}
TSNumber<uint8> TSCreatureTemplate::GetMaxLevel()
{
    return ct->maxlevel;
}
TSNumber<uint32> TSCreatureTemplate::GetExpansion()
{
    return ct->expansion;
}
TSNumber<uint32> TSCreatureTemplate::GetFaction()
{
    return ct->faction;
}
TSNumber<uint32> TSCreatureTemplate::GetNPCFlag()
{
    return ct->npcflag;
}
TSNumber<float> TSCreatureTemplate::GetSpeedWalk()
{
    return ct->speed_walk;
}
TSNumber<float> TSCreatureTemplate::GetSpeedRun()
{
    return ct->speed_run;
}
TSNumber<float> TSCreatureTemplate::GetScale()
{
    return ct->scale;
}
TSNumber<uint32> TSCreatureTemplate::GetRank()
{
    return ct->rank;
}
TSNumber<uint32> TSCreatureTemplate::GetDamageSchool()
{
    return ct->dmgschool;
}
TSNumber<uint32> TSCreatureTemplate::GetBaseAttackTime()
{
    return ct->BaseAttackTime;
}
TSNumber<uint32> TSCreatureTemplate::GetRangeAttackTime()
{
    return ct->RangeAttackTime;
}
TSNumber<float> TSCreatureTemplate::GetBaseVariance()
{
    return ct->BaseVariance;
}
TSNumber<float> TSCreatureTemplate::GetRangeVariance()
{
    return ct->RangeVariance;
}
TSNumber<uint32> TSCreatureTemplate::GetUnitClass()
{
    return ct->unit_class;
}
TSNumber<uint32> TSCreatureTemplate::GetUnitFlags()
{
    return ct->unit_flags;
}
TSNumber<uint32> TSCreatureTemplate::GetUnitFlags2()
{
    return ct->unit_flags2;
}
TSNumber<uint32> TSCreatureTemplate::GetDynamicFlags()
{
    return ct->dynamicflags;
}
TSNumber<uint32> TSCreatureTemplate::GetFamily()
{
    return ct->family;
}
TSNumber<uint32> TSCreatureTemplate::GetType()
{
    return ct->type;
}
TSNumber<uint32> TSCreatureTemplate::GetTypeFlags()
{
    return ct->type_flags;
}
TSNumber<uint32> TSCreatureTemplate::GetLootID()
{
    return ct->lootid;
}
TSNumber<uint32> TSCreatureTemplate::GetPickpocketLootID()
{
    return ct->pickpocketLootId;
}
TSNumber<uint32> TSCreatureTemplate::GetSkinLootID()
{
    return ct->SkinLootId;
}
TSNumber<int32> TSCreatureTemplate::GetNormalResistance()
{
    return ct->SkinLootId;
}
TSNumber<int32> TSCreatureTemplate::GetHolyResistance()
{
    return ct->resistance[0];
}
TSNumber<int32> TSCreatureTemplate::GetFireResistance()
{
    return ct->resistance[1];
}
TSNumber<int32> TSCreatureTemplate::GetNatureResistance()
{
    return ct->resistance[2];
}
TSNumber<int32> TSCreatureTemplate::GetFrostResistance()
{
    return ct->resistance[3];
}
TSNumber<int32> TSCreatureTemplate::GetShadowResistance()
{
    return ct->resistance[4];
}
TSNumber<int32> TSCreatureTemplate::GetArcaneResistance()
{
    return ct->resistance[5];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellA()
{
    return ct->spells[0];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellB()
{
    return ct->spells[1];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellC()
{
    return ct->spells[2];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellD()
{
    return ct->spells[3];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellE()
{
    return ct->spells[4];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellF()
{
    return ct->spells[5];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellG()
{
    return ct->spells[6];
}
TSNumber<uint32> TSCreatureTemplate::GetSpellH()
{
    return ct->spells[7];
}
TSNumber<uint32> TSCreatureTemplate::GetPetSpellDataID()
{
    return ct->PetSpellDataId;
}
TSNumber<uint32> TSCreatureTemplate::GetVehicleID()
{
    return ct->VehicleId;
}
TSNumber<uint32> TSCreatureTemplate::GetMinGold()
{
    return ct->mingold;
}
TSNumber<uint32> TSCreatureTemplate::GetMaxGold()
{
    return ct->maxgold;
}
std::string TSCreatureTemplate::GetAIName()
{
    return ct->AIName;
}
TSNumber<uint32> TSCreatureTemplate::GetMovementType()
{
    return ct->MovementType;
}
TSNumber<float> TSCreatureTemplate::GetHoverHeight()
{
    return ct->HoverHeight;
}
TSNumber<float> TSCreatureTemplate::GetModHealth()
{
    return ct->ModHealth;
}
TSNumber<float> TSCreatureTemplate::GetModMana()
{
    return ct->ModMana;
}
TSNumber<float> TSCreatureTemplate::GetModArmor()
{
    return ct->ModArmor;
}
TSNumber<float> TSCreatureTemplate::GetModDamage()
{
#if TRINITY
    return ct->ModDamage;
#elif AZEROTHCORE
    return  ct->DamageModifier;
#endif
}
TSNumber<float> TSCreatureTemplate::GetModExperience()
{
    return ct->ModExperience;
}
bool TSCreatureTemplate::GetRacialLeader()
{
    return ct->RacialLeader;
}
TSNumber<uint32> TSCreatureTemplate::GetMovementID()
{
    return ct->movementId;
}
bool TSCreatureTemplate::GetRegenHealth()
{
    return ct->RegenHealth;
}
TSNumber<uint32> TSCreatureTemplate::GetMechanicImmuneMask()
{
    return ct->MechanicImmuneMask;
}
TSNumber<uint32> TSCreatureTemplate::GetSpellSchoolImmuneMask()
{
    return ct->SpellSchoolImmuneMask;
}
TSNumber<uint32> TSCreatureTemplate::GetFlagsExtra()
{
    return ct->flags_extra;
}
TSNumber<uint32> TSCreatureTemplate::GetScriptID()
{
    return ct->ScriptID;
}
TSNumber<uint32> TSCreatureTemplate::GetRandomValidModelID() const
{
    return ct->GetRandomValidModelId();
}
TSNumber<uint32> TSCreatureTemplate::GetFirstValidModelID() const
{
    return ct->GetFirstValidModelId();
}
TSNumber<uint32> TSCreatureTemplate::GetFirstInvisibleModel() const
{
#if TRINITY
    return ct->GetFirstInvisibleModel();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSCreatureTemplate::GetFirstInvisibleModel not implemented for AzerothCore");
#endif
}
TSNumber<uint32> TSCreatureTemplate::GetFirstVisibleModel() const
{
#if TRINITY
    return ct->GetFirstVisibleModel();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSCreatureTemplate::GetFirstVisibleModel not implemented for AzerothCore");
#endif
}
TSEntity * TSCreatureTemplate::GetData()
{
    return &ct->m_tsEntity;
}
TSNumber<uint32> TSCreatureTemplate::GetRequiredLootSkill() const
{
    return ct->GetRequiredLootSkill();
}
bool TSCreatureTemplate::GetIsExotic() const
{
    return ct->IsExotic();
}
bool TSCreatureTemplate::GetIsTameable(bool canTameExotic) const
{
    return ct->IsTameable(canTameExotic);
}


// CreatureMovementData
TSNumber<uint32> TSCreatureTemplate::GetGroundMovement()
{
    return static_cast<uint32>(ct->Movement.Ground);
}
TSNumber<uint32> TSCreatureTemplate::GetFlightMovement()
{
    return static_cast<uint32>(ct->Movement.Flight);
}
bool TSCreatureTemplate::GetSwims()
{
    return ct->Movement.Swim;
}
bool TSCreatureTemplate::GetRooted()
{
    return ct->Movement.Rooted;
}
TSNumber<uint32> TSCreatureTemplate::GetChaseMovement()
{
    return static_cast<uint32>(ct->Movement.Chase);
}
TSNumber<uint32> TSCreatureTemplate::GetRandomMovement()
{
    return static_cast<uint32>(ct->Movement.Random);
}
TSNumber<uint32> TSCreatureTemplate::GetInteractionPauseTimer()
{
    return ct->Movement.InteractionPauseTimer;
}
bool TSCreatureTemplate::GetIsGroundAllowed()
{
    return ct->Movement.IsGroundAllowed();
}
bool TSCreatureTemplate::GetIsSwimAllowed()
{
    return ct->Movement.IsSwimAllowed();
}
bool TSCreatureTemplate::GetIsFlightAllowed()
{
    return ct->Movement.IsFlightAllowed();
}
bool TSCreatureTemplate::GetIsRooted()
{
    return ct->Movement.IsRooted();
}

TSCreatureTemplate GetCreatureTemplate(uint32 entry)
{
    return TSCreatureTemplate(
        const_cast<CreatureTemplate*>(sObjectMgr->GetCreatureTemplate(entry)));
}
