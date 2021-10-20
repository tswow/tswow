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

#pragma once

#include "TSBase.h"
#include "TSMain.h"
#include "TSEntity.h"
#include "TSString.h"
#include "TSArray.h"

struct AchievementEntry;
class TC_GAME_API TSAchievementEntry
{
    AchievementEntry* m_achievement;
public:
    TSAchievementEntry(AchievementEntry * achievement);
    TSAchievementEntry* operator->();
    uint32 GetEntry();
    int32 GetFaction();
    int32 GetInstanceID();
    TSArray<TSString> GetTitles();
    uint32 GetCategory();
    uint32 GetPoints();
    uint32 GetFlags();
    uint32 GetMinimumCriteria();
    uint32 GetSharesCriteria();
};

struct AchievementCriteriaEntry;
class TC_GAME_API TSAchievementCriteriaEntry
{
    AchievementCriteriaEntry* m_criteria;
public:
    TSAchievementCriteriaEntry(AchievementCriteriaEntry* criteria);
    TSAchievementCriteriaEntry* operator->();
    uint32 GetEntry();
    uint32 GetAchievementEntry();
    uint32 GetType();
    uint32 GetAssetID();
    uint32 GetQuantity();
    uint32 GetAdditionalType1();
    uint32 GetAdditionalAsset1();
    uint32 GetAdditionalType2();
    uint32 GetAdditionalAsset2();
    uint32 GetFlags();
    uint32 GetStartEvent();
    uint32 GetStartAsset();
    uint32 GetStartTimer();
};

struct TSAchievementEvents;
TC_GAME_API void InitializeAchievementEvent(uint32 entry, TSAchievementEvents* events);
TSAchievementEvents* GetAchievementEvent(uint32 entry);

TC_GAME_API TSAchievementEntry GetAchievementTemplate(uint32 entry);
TC_GAME_API TSAchievementCriteriaEntry GetAchievementCriteria(uint32 entry);
