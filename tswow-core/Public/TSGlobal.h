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

#include "TSArray.h"
#include "TSItem.h"
#include "TSBase.h"
#include "TSLua.h"

TSItemTemplate TC_GAME_API CreateItemTemplate(uint32 entry,uint32 copyItemID = 38);

void TC_GAME_API SendWorldMessage(std::string const& string);

TSNumber<uint32> TC_GAME_API GetCurrTime();
TSNumber<uint64> TC_GAME_API GetUnixTime();

std::string TC_GAME_API SyncHttpGet(std::string const& url);

bool TC_GAME_API IsGameEventActive(uint16_t event_id);
bool TC_GAME_API IsHolidayActive(uint16_t holiday_id);
TSArray<TSNumber<uint16>> TC_GAME_API GetActiveGameEvents();

void TC_GAME_API StartGameEvent(uint16_t event_id);
void TC_GAME_API StopGameEvent(uint16_t event_id);

bool TC_GAME_API HAS_TAG(uint32_t id, std::initializer_list<uint32_t> const& list);
bool TC_GAME_API L_HAS_TAG(uint32_t id, sol::table);

TSLua::Array<TSNumber<uint16> > TC_GAME_API LGetActiveGameEvents();
