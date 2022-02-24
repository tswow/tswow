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

void ReloadItemTemplate()
{
    sObjectMgr->LoadItemTemplates();
    sObjectMgr->InitializeQueriesData(QUERY_DATA_ITEMS);
}

void ReloadSingleItemTemplate(TSString itemID)
{
    sObjectMgr->LoadSingleItemTemplate(itemID);
}

void LoadCustomItems()
{
    sObjectMgr->LoadCustomItemTemplates();
}

void ReloadSingleItemTemplateObject(TSItemTemplate item) {
    sObjectMgr->LoadSingleItemTemplateObject(item->_GetInfo());
}

void SendMail(uint8 senderType, uint64 from, uint64 to, TSString subject, TSString body, uint32 money, uint32 cod, uint32 delay, TSArray<TSItem> items)
{
    auto player = ObjectAccessor::FindPlayer(ObjectGuid(to));
    MailSender sender(MailMessageType(senderType),from);
    MailDraft draft(subject.std_str(),body.std_str());
    draft.AddMoney(money);
    draft.AddCOD(cod);
    CharacterDatabaseTransaction trans = CharacterDatabase.BeginTransaction();

    for(int i=0;i<items.get_length();++i)
    {
        auto item = items.get(i);
        item->item->SaveToDB(trans);
        draft.AddItem(item.item);
    }

    draft.SendMailTo(trans,MailReceiver(player,ObjectGuid(to)),sender, MAIL_CHECK_MASK_NONE, delay);
    CharacterDatabase.CommitTransaction(trans);
}

void SendWorldMessage(TSString string)
{
    sWorld->SendServerMessage(SERVER_MSG_STRING, string);
}

uint32 GetCurrTime()
{
    return getMSTime();
}

uint64 GetUnixTime()
{
    using namespace std::chrono;
    return uint64(duration_cast<milliseconds>(system_clock::now().time_since_epoch()).count());
}

TSString SyncHttpGet(TSString url)
{
    http::Request request{url.std_str()};
    const auto response = request.send("GET");
    return TSString(std::string{response.body.begin(), response.body.end()});
}

bool TC_GAME_API IsGameEventActive(uint16_t event_id)
{
    return IsEventActive(event_id);
}

bool TC_GAME_API IsHolidayActive(uint16_t holiday_id)
{
    return IsHolidayActive(HolidayIds(holiday_id));
}

TSArray<uint16_t> TC_GAME_API GetActiveGameEvents()
{
    TSArray<uint16_t> arr;
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
