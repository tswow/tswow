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
#include "TSArray.h"
#include "TSLua.h"

#include <sol/sol.hpp>
#include <vector>
#include <string>

struct AchievementEntry;
class TC_GAME_API TSAchievementEntry
{
    AchievementEntry* m_achievement;
public:
    TSAchievementEntry(AchievementEntry * achievement);
    TSAchievementEntry* operator->();
    operator bool() const { return m_achievement != nullptr; }
    bool operator==(TSAchievementEntry const& rhs) { return m_achievement == rhs.m_achievement; }
    TSNumber<uint32> GetEntry();
    TSNumber<int32> GetFaction();
    TSNumber<int32> GetInstanceID();
    TSArray<std::string> GetTitles();
    TSNumber<uint32> GetCategory();
    TSNumber<uint32> GetPoints();
    TSNumber<uint32> GetFlags();
    TSNumber<uint32> GetMinimumCriteria();
    TSNumber<uint32> GetSharesCriteria();

private:
    TSLua::Array<std::string> LGetTitles();
    friend class TSLua;
};

struct AchievementCriteriaEntry;
class TC_GAME_API TSAchievementCriteriaEntry
{
    AchievementCriteriaEntry* m_criteria;
public:
    TSAchievementCriteriaEntry(AchievementCriteriaEntry* criteria);
    TSAchievementCriteriaEntry* operator->();
    operator bool() const { return m_criteria != nullptr; }
    bool operator==(TSAchievementCriteriaEntry const& rhs) { return m_criteria == rhs.m_criteria; }
    TSNumber<uint32> GetEntry();
    TSNumber<uint32> GetAchievementEntry();
    TSNumber<uint32> GetType();
    TSNumber<uint32> GetAssetID();
    TSNumber<uint32> GetQuantity();
    TSNumber<uint32> GetAdditionalType1();
    TSNumber<uint32> GetAdditionalAsset1();
    TSNumber<uint32> GetAdditionalType2();
    TSNumber<uint32> GetAdditionalAsset2();
    TSNumber<uint32> GetFlags();
    TSNumber<uint32> GetStartEvent();
    TSNumber<uint32> GetStartAsset();
    TSNumber<uint32> GetStartTimer();
};

struct TSAchievementEvents;
TC_GAME_API void InitializeAchievementEvent(uint32 entry, TSAchievementEvents* events);
TSAchievementEvents* GetAchievementEvent(uint32 entry);

TC_GAME_API TSAchievementEntry GetAchievementTemplate(uint32 entry);
TC_GAME_API TSAchievementCriteriaEntry GetAchievementCriteria(uint32 entry);
