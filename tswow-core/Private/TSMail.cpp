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

#include "TSMail.h"
#include "Mail.h"
#include "Item.h"

TSMailItemInfo::TSMailItemInfo(MailItemInfo* info)
{
    this->info = info;
}

uint64 TSMailItemInfo::GetGUID()
{
    return info->item_guid;
}

uint32 TSMailItemInfo::GetItemTemplate()
{
    return info->item_template;
}

TSMail::TSMail(Mail* mail)
{
    this->mail = mail;
}

uint32 TSMail::GetID()
{
    return mail->messageID;
}

uint8 TSMail::GetType()
{
    return mail->messageType;
}

uint16 TSMail::GetTemplateID()
{
    return mail->mailTemplateId;
}

uint64 TSMail::GetSender()
{
    return mail->sender;
}

uint64 TSMail::GetReceiver()
{
    return mail->receiver;
}

TSString TSMail::GetSubject()
{
    return TSString(mail->subject);
}

TSString TSMail::GetBody()
{
    return TSString(mail->body);
}

TSArray<TSMailItemInfo> TSMail::GetItems()
{
    TSArray<TSMailItemInfo> arr;
    for(auto& info: mail->items)
    {
        arr.push(TSMailItemInfo(&info));
    }
    return arr;
}

uint32 TSMail::GetItemCount()
{
    return mail->items.size();
}

void TSMail::FilterItems(std::function<bool(TSMailItemInfo)> predicate)
{
    auto it = mail->items.begin();
    while(it != mail->items.end())
    {
        if(!predicate(TSMailItemInfo(&*it)))
        {
            it = mail->items.erase(it);
        }
    }
}

uint16 TSMail::GetState()
{
    return mail->state;
}

uint32 TSMail::GetMoney()
{
    return mail->money;
}

void TSMail::SetMoney(uint32 money)
{
    mail->money = money;
}

uint32 TSMail::GetCOD()
{
    return mail->COD;
}

void TSMail::SetCOD(uint32 cod)
{
    mail->COD = cod;
}

uint32 TSMail::GetChecked()
{
    return mail->checked;
}

void TSMail::SetChecked(uint32 checked)
{
    mail->checked = checked;
}

void TSMail::RemoveAllItems()
{
    mail->items.clear();
}

void TSMail::AddItem(uint32 entry, uint8 count, TSPlayer player)
{
    auto guid = Item::CreateItem(entry,count,player->player)->GetGUID();
#if TRINITY
    mail->AddItem(guid,entry);
#elif AZEROTHCORE
    mail->AddItem(guid.GetEntry(),entry);
#endif
}

void TSMail::SetSender(uint8 type, uint64 guid)
{
    mail->messageType = type;
#if TRINITY
    mail->sender = ObjectGuid(guid);
#elif AZEROTHCORE
    mail->sender = ObjectGuid(guid).GetEntry();
#endif
}

void TSMail::SetSubject(TSString subject)
{
    mail->subject = subject.std_str();
}

void TSMail::SetBody(TSString body)
{
    mail->body = body.std_str();
}

void TSMail::SetState(uint8 state)
{
    mail->state = MailState(state);
}

TSMailDraft::TSMailDraft(MailDraft* draft)
{
    this->draft = draft;
}

uint16 TSMailDraft::GetTemplateID()
{
#ifdef TRINITY
    return draft->m_mailTemplateId;
#elif AZEROTHCORE
    return draft->GetMailTemplateId();
#endif
}

TSString TSMailDraft::GetSubject()
{
#ifdef TRINITY
    return TSString(draft->m_subject);
#elif AZEROTHCORE
    return TSString(draft->GetSubject());
#endif
}

TSString TSMailDraft::GetBody()
{
#ifdef TRINITY
    return TSString(draft->m_body);
#elif AZEROTHCORE
    return TSString(draft->GetBody());
#endif
}

uint32 TSMailDraft::GetMoney()
{
#ifdef TRINITY
    return draft->m_money;
#elif AZEROTHCORE
    return draft->GetMoney();
#endif
}

uint32 TSMailDraft::GetCOD()
{
#ifdef TRINITY
    return draft->m_COD;
#elif AZEROTHCORE
    return draft->GetCOD();
#endif
}

TSArray<uint64> TSMailDraft::GetItemKeys()
{
    TSArray<uint64> arr;
    for(auto& itr : draft->m_items)
    {
        arr.push(TS_GUID(itr.first));
    }
    return arr;
}

TSItem TSMailDraft::GetItem(uint64 item)
{
    return draft->m_items[ObjectGuid(item)];
}

void TSMailDraft::SetTemplateID(uint16 id)
{
#if TRINITY
    draft->m_mailTemplateId = id;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMailDraft::SetTemplateID not implemented for AzerothCore");
#endif
}

void TSMailDraft::SetSubject(TSString subject)
{
#if TRINITY
    draft->m_subject = subject.std_str();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMailDraft::SetSubject not implemented for AzerothCore");
#endif
}

void TSMailDraft::SetBody(TSString body)
{
#if TRINITY
    draft->m_body = body.std_str();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMailDraft::SetBody not implemented for AzerothCore");
#endif
}

void TSMailDraft::AddItem(uint32 entry, uint8 count, TSPlayer player)
{
    auto item = Item::CreateItem(entry,count,player->player);
    CharacterDatabaseTransaction trans = CharacterDatabase.BeginTransaction();
    item->SaveToDB(trans);
    CharacterDatabase.CommitTransaction(trans);
    draft->AddItem(item);
}

void TSMailDraft::FilterItems(std::function<bool(TSItem)> predicate)
{
    auto it = draft->m_items.begin();
    while (it != draft->m_items.end())
    {
        if (!predicate(it->second))
        {
            it = draft->m_items.erase(it);
        }
        else
        {
            ++it;
        }
    }
}

std::string TSMail::LGetSubject()
{
    return GetSubject().std_str();
}

std::string TSMail::LGetBody()
{
    return GetBody().std_str();
}
TSLua::Array<TSMailItemInfo> TSMail::LGetItems()
{
    return sol::as_table(*GetItems().vec);
}
void TSMail::LFilterItems(sol::protected_function predicate)
{
    return FilterItems([predicate](auto const& item) {
        return predicate(item);
    });
}
void TSMail::LAddItem0(uint32 entry, uint8 count, TSPlayer player)
{
    return AddItem(entry, count, player);
}
void TSMail::LAddItem1(uint32 entry, uint8 count)
{
    return AddItem(entry, count);
}
void TSMail::LSetSubject(std::string const& subject)
{
    SetSubject(subject);
}
void TSMail::LSetBody(std::string const& body)
{
    SetBody(body);
}

std::string TSMailDraft::LGetSubject()
{
    return GetSubject().std_str();
}
std::string TSMailDraft::LGetBody()
{
    return GetSubject().std_str();
}
TSLua::Array<uint64> TSMailDraft::LGetItemKeys()
{
    return sol::as_table(*GetItemKeys().vec);
}
void TSMailDraft::LAddItem0(uint32 entry, uint8 count, TSPlayer player)
{
    AddItem(entry, count, player);
}
void TSMailDraft::LAddItem1(uint32 entry, uint8 count)
{
    AddItem(entry, count);
}
void TSMailDraft::LFilterItems(sol::protected_function predicate)
{
    FilterItems([predicate](auto const& item) {
        return predicate(item);
    });
}
