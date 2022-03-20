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

#include "TSMain.h"
#include "TSString.h"
#include "TSUnit.h"
#include "TSPlayer.h"
#include "TSItem.h"

#include <sol/sol.hpp>

struct MailItemInfo;
struct TC_GAME_API TSMailItemInfo {
    MailItemInfo* info;

    TSMailItemInfo() { info = nullptr; }
    TSMailItemInfo(MailItemInfo* info);
    TSMailItemInfo* operator->(){return this;}
    operator bool() const { return info != nullptr; }
    bool operator==(TSMailItemInfo const& rhs) { return info == rhs.info; }

    uint64 GetGUID();
    uint32 GetItemTemplate();
};

struct Mail;
struct TC_GAME_API TSMail {
    Mail* mail;
    TSMail(Mail* mail);
    TSMail* operator->(){return this;}
    TSMail() { mail = nullptr;  }
    operator bool() const { return mail != nullptr; }
    bool operator==(TSMail const& rhs) { return mail == rhs.mail; }
    uint32 GetID();
    uint8 GetType();
    uint16 GetTemplateID();
    uint64 GetSender();
    uint64 GetReceiver();
    uint16 GetState();
    uint32 GetMoney();
    uint32 GetCOD();
    uint32 GetChecked();

    TSString GetSubject();
    TSString GetBody();

    TSArray<TSMailItemInfo> GetItems();
    uint32 GetItemCount();
    void FilterItems(std::function<bool(TSMailItemInfo)> predicate);
    void RemoveAllItems();
    void AddItem(uint32 entry, uint8 count, TSPlayer player = TSPlayer(nullptr));
    void SetMoney(uint32 money);
    void SetCOD(uint32 cod);
    void SetChecked(uint32 checked);
    void SetSender(uint8 type, uint64 guid);
    void SetSubject(TSString subject);
    void SetBody(TSString body);
    void SetState(uint8 state);

private:
    std::string LGetSubject();
    std::string LGetBody();
    sol::as_table_t<std::vector<TSMailItemInfo>> LGetItems();
    void LFilterItems(sol::protected_function predicate);
    void LAddItem0(uint32 entry, uint8 count, TSPlayer player);
    void LAddItem1(uint32 entry, uint8 count);
    void LSetSubject(std::string const& subject);
    void LSetBody(std::string const& body);
    friend class TSLuaState;
};

class MailDraft;
struct TC_GAME_API TSMailDraft {
    MailDraft* draft;
    TSMailDraft() { draft = nullptr; }
    TSMailDraft(MailDraft* draft);
    TSMailDraft* operator->(){return this;}
    operator bool() const { return draft != nullptr; }
    bool operator==(TSMailDraft const& rhs) { return draft == rhs.draft; }

    uint16 GetTemplateID();
    TSString GetSubject();
    TSString GetBody();
    uint32 GetMoney();
    uint32 GetCOD();
    TSArray<uint64> GetItemKeys();
    TSItem GetItem(uint64 item);

    void SetTemplateID(uint16 id);
    void SetSubject(TSString subject);
    void SetBody(TSString body);
    void AddItem(uint32 entry, uint8 count, TSPlayer player = TSPlayer(nullptr));
    void FilterItems(std::function<bool(TSItem)> predicate);
private:
    std::string LGetSubject();
    std::string LGetBody();
    sol::as_table_t<std::vector<uint64>> LGetItemKeys();
    void LAddItem0(uint32 entry, uint8 count, TSPlayer player);
    void LAddItem1(uint32 entry, uint8 count);
    void LFilterItems(sol::protected_function predicate);
    friend class TSLuaState;
};
