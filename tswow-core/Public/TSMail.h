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
    TSNumber<uint32> GetID();
    TSNumber<uint8> GetType();
    TSNumber<uint16> GetTemplateID();
    TSNumber<uint64> GetSender();
    TSNumber<uint64> GetReceiver();
    TSNumber<uint16> GetState();
    TSNumber<uint32> GetMoney();
    TSNumber<uint32> GetCOD();
    TSNumber<uint32> GetChecked();

    std::string GetSubject();
    std::string GetBody();

    TSArray<TSMailItemInfo> GetItems();
    uint32 GetItemCount();
    void FilterItems(std::function<bool(TSMailItemInfo)> predicate);
    void RemoveAllItems();
    void AddItem(uint32 entry, uint8 count, TSPlayer player = TSPlayer(nullptr));
    void SetMoney(uint32 money);
    void SetCOD(uint32 cod);
    void SetChecked(uint32 checked);
    void SetSender(uint8 type, uint64 guid);
    void SetSubject(std::string const& subject);
    void SetBody(std::string const& body);
    void SetState(uint8 state);

private:
    TSLua::Array<TSMailItemInfo> LGetItems();
    void LFilterItems(sol::protected_function predicate);
    friend class TSLua;
};

class MailDraft;
struct TC_GAME_API TSMailDraft {
    MailDraft* draft;
    TSMailDraft() { draft = nullptr; }
    TSMailDraft(MailDraft* draft);
    TSMailDraft* operator->(){return this;}
    operator bool() const { return draft != nullptr; }
    bool operator==(TSMailDraft const& rhs) { return draft == rhs.draft; }

    TSNumber<uint16> GetTemplateID();
    std::string GetSubject();
    std::string GetBody();
    TSNumber<uint32> GetMoney();
    TSNumber<uint32> GetCOD();
    TSArray<TSNumber<uint64> > GetItemKeys();
    TSItem GetItem(uint64 item);

    void SetTemplateID(uint16 id);
    void SetSubject(std::string const& subject);
    void SetBody(std::string const& body);
    void AddItem(uint32 entry, uint8 count, TSPlayer player = TSPlayer(nullptr));
    void FilterItems(std::function<bool(TSItem)> predicate);
private:
    TSLua::Array<TSNumber<uint64>> LGetItemKeys();
    void LFilterItems(sol::protected_function predicate);
    friend class TSLua;
};
