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
#include "TSMain.h"
#include "TSEntity.h"

#include <sol/sol.hpp>
#include <string>

struct CreatureTemplate;

class TC_GAME_API TSCreatureTemplate : public TSEntityProvider
{
public:
    CreatureTemplate * ct;
    TSCreatureTemplate(CreatureTemplate * ct);
    TSCreatureTemplate * operator->(){ return this; }
    operator bool() const { return ct != nullptr; }
    bool operator==(TSCreatureTemplate const& rhs) { return ct == rhs.ct; }


    TSNumber<uint32> GetEntry();
    TSNumber<uint32> GetDifficultyEntryA();
    TSNumber<uint32> GetDifficultyEntryB();
    TSNumber<uint32> GetDifficultyEntryC();

    TSNumber<uint32> GetKillCreditA();
    TSNumber<uint32> GetKillCreditB();
    TSNumber<uint32> GetModelID1();
    TSNumber<uint32> GetModelID2();
    TSNumber<uint32> GetModelID3();
    TSNumber<uint32> GetModelID4();
    std::string GetName();
    std::string GetTitle();
    std::string GetIconName();
    TSNumber<uint32> GetGossipMenuID();
    TSNumber<uint8> GetMinLevel();
    TSNumber<uint8> GetMaxLevel();
    TSNumber<uint32> GetExpansion();
    TSNumber<uint32> GetFaction();
    TSNumber<uint32> GetNPCFlag();
    TSNumber<float> GetSpeedWalk();
    TSNumber<float> GetSpeedRun();
    TSNumber<float> GetScale();
    TSNumber<uint32> GetRank();
    TSNumber<uint32> GetDamageSchool();
    TSNumber<uint32> GetBaseAttackTime();
    TSNumber<uint32> GetRangeAttackTime();
    TSNumber<float> GetBaseVariance();
    TSNumber<float> GetRangeVariance();
    TSNumber<uint32> GetUnitClass();                                     // enum Classes. Note only 4 classes are known for creatures.
    TSNumber<uint32> GetUnitFlags();                                     // enum UnitFlags mask values
    TSNumber<uint32> GetUnitFlags2();                                    // enum UnitFlags2 mask values
    TSNumber<uint32> GetDynamicFlags();
    TSNumber<uint32> GetFamily();                                 // enum CreatureFamily values (optional)
    TSNumber<uint32> GetType();                                           // enum CreatureType values
    TSNumber<uint32> GetTypeFlags();                                     // enum CreatureTypeFlags mask values
    TSNumber<uint32> GetLootID();
    TSNumber<uint32> GetPickpocketLootID();
    TSNumber<uint32> GetSkinLootID();

    TSNumber<int32> GetNormalResistance();
    TSNumber<int32> GetHolyResistance();
    TSNumber<int32> GetFireResistance();
    TSNumber<int32> GetNatureResistance();
    TSNumber<int32> GetFrostResistance();
    TSNumber<int32> GetShadowResistance();
    TSNumber<int32> GetArcaneResistance();

    TSNumber<uint32> GetSpellA();
    TSNumber<uint32> GetSpellB();
    TSNumber<uint32> GetSpellC();
    TSNumber<uint32> GetSpellD();
    TSNumber<uint32> GetSpellE();
    TSNumber<uint32> GetSpellF();
    TSNumber<uint32> GetSpellG();
    TSNumber<uint32> GetSpellH();
    TSNumber<uint32> GetPetSpellDataID();
    TSNumber<uint32> GetVehicleID();
    TSNumber<uint32> GetMinGold();
    TSNumber<uint32> GetMaxGold();
    std::string GetAIName();
    TSNumber<uint32> GetMovementType();

    TSNumber<float> GetHoverHeight();
    TSNumber<float> GetModHealth();
    TSNumber<float> GetModMana();
    TSNumber<float> GetModArmor();
    TSNumber<float> GetModDamage();
    TSNumber<float> GetModExperience();
    bool        GetRacialLeader();
    TSNumber<uint32> GetMovementID();
    bool        GetRegenHealth();
    TSNumber<uint32> GetMechanicImmuneMask();
    TSNumber<uint32> GetSpellSchoolImmuneMask();
    TSNumber<uint32> GetFlagsExtra();
    TSNumber<uint32> GetScriptID();
    TSNumber<uint32> GetRandomValidModelID() const;
    TSNumber<uint32> GetFirstValidModelID() const;
    TSNumber<uint32> GetFirstInvisibleModel() const;
    TSNumber<uint32> GetFirstVisibleModel() const;
    TSEntity * GetData();
    TSNumber<uint32> GetRequiredLootSkill() const;
    bool        GetIsExotic() const;
    bool        GetIsTameable(bool canTameExotic) const;

    // CreatureMovementData
    TSNumber<uint32> GetGroundMovement();
    TSNumber<uint32> GetFlightMovement();
    bool      GetSwims();
    bool      GetRooted();
    TSNumber<uint32> GetChaseMovement();
    TSNumber<uint32> GetRandomMovement();
    TSNumber<uint32> GetInteractionPauseTimer();
    bool      GetIsGroundAllowed();
    bool      GetIsSwimAllowed();
    bool      GetIsFlightAllowed();
    bool      GetIsRooted();
};

TC_GAME_API TSCreatureTemplate GetCreatureTemplate(uint32 entry);
