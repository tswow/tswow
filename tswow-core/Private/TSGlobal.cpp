/*
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

#include "TSGlobal.h"
#include "ObjectAccessor.h"

#include "HTTPRequest.h"

#include "Mail.h"
#include "Item.h"
#include "Player.h"
#include "World.h"
#include "Timer.h"
#include "GameEventMgr.h"
#include "TSItemTemplate.h"

TSItemTemplate CreateItemTemplate(uint32 entry,uint32 copyItemID)
{
#if TRINITY
    return sObjectMgr->CreateItemTemplate(entry,copyItemID);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSGlobal::getNewItemTemplate not implemented for AzerothCore");
    return TSItemTemplate();
#endif
}

void SendWorldMessage(std::string const& string)
{
    sWorld->SendServerMessage(SERVER_MSG_STRING, string);
}

TSNumber<uint32> GetCurrTime()
{
    return getMSTime();
}

TSNumber<uint64> GetUnixTime()
{
    using namespace std::chrono;
    return uint64(duration_cast<milliseconds>(system_clock::now().time_since_epoch()).count());
}

std::string SyncHttpGet(std::string const& url)
{
    http::Request request{url};
    const auto response = request.send("GET");
    return std::string{response.body.begin(), response.body.end()};
}

bool TC_GAME_API IsGameEventActive(uint16_t event_id)
{
    return IsEventActive(event_id);
}

bool TC_GAME_API IsHolidayActive(uint16_t holiday_id)
{
    return IsHolidayActive(HolidayIds(holiday_id));
}

TSArray<TSNumber<uint16> > TC_GAME_API GetActiveGameEvents()
{
    TSArray<TSNumber<uint16> > arr;
    for (auto const& evt: sGameEventMgr->GetActiveEventList())
    {
        arr.push(evt);
    }
    return arr;
}

void StartGameEvent(uint16_t event_id)
{
    sGameEventMgr->StartEvent(event_id, true);
}

void StopGameEvent(uint16_t event_id)
{
    sGameEventMgr->StopEvent(event_id, true);
}

bool HAS_TAG(uint32_t id, std::initializer_list<uint32_t> const& list)
{
    for (uint32_t value : list)
    {
        if (id == value)
        {
            return true;
        }
    }
    return false;
}

bool L_HAS_TAG(uint32_t id, sol::table list)
{
    for (auto const& [_,value] : list)
    {
        if (id == value.as<uint32_t>())
        {
            return true;
        }
    }
    return false;
}

TSLua::Array<TSNumber<uint16>> TC_GAME_API LGetActiveGameEvents()
{
    return sol::as_table(*GetActiveGameEvents().vec);
}
