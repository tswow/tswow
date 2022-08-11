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
#include "TSClasses.h"
#include "TSObject.h"
#include "TSItemTemplate.h"

class TC_GAME_API TSItem : public TSObject {
public:
    Item* item;
    bool IsNull() { return item == nullptr; };
    TSItem(Item* item);
    TSItem();
    TSItem* operator->() { return this;}
    bool IsSoulBound();
    bool IsBoundAccountWide();
    bool IsBoundByEnchant();
    bool IsNotBoundToPlayer(TSPlayer player);
    bool IsLocked();
    bool IsBag();
    bool IsCurrencyToken();
    bool IsNotEmptyBag();
    bool IsBroken();
    bool CanBeTraded(bool mail);
    bool IsInTrade();
    bool IsInBag();
    bool IsEquipped();
    bool HasQuest(uint32 quest);
    bool IsPotion();
    bool IsWeaponVellum();
    bool IsArmorVellum();
    bool IsConjuredConsumable();
    TSItemTemplate GetTemplate();
    std::string GetItemLink(uint8 locale);
    TSNumber<uint64> GetOwnerGUID();
    TSPlayer  GetOwner();
    TSNumber<uint32> GetCount();
    TSNumber<uint32> GetMaxStackCount();
    TSNumber<uint8> GetSlot();
    TSNumber<uint8> GetBagSlot();
    TSNumber<uint32> GetEnchantmentID(uint32 enchant_slot);
    TSNumber<uint32> GetSpellID(uint32 index);
    TSNumber<uint32> GetSpellTrigger(uint32 index);
    TSNumber<uint32> GetClass();
    TSNumber<uint32> GetSubClass();
    std::string GetName();
    TSNumber<uint32> GetDisplayID();
    TSNumber<uint32> GetQuality();
    TSNumber<uint32> GetBuyCount();
    TSNumber<uint32> GetBuyPrice();
    TSNumber<uint32> GetSellPrice();
    TSNumber<uint32> GetInventoryType();
    TSNumber<uint32> GetAllowableClass();
    TSNumber<uint32> GetAllowableRace();
    TSNumber<uint32> GetItemLevel();
    TSNumber<uint32> GetRequiredLevel();
    TSNumber<uint32> GetStatsCount();
    TSNumber<uint32> GetRandomProperty();
    TSNumber<int32> GetRandomSuffix();
    TSNumber<uint32> GetItemSet();
    TSNumber<uint32> GetBagSize();
    void SetOwner(TSPlayer player);
    void SetBinding(bool soulbound);
    void SetCount(uint32 count);
    bool SetEnchantment(uint32 enchant, uint32 slot);
    bool ClearEnchantment(uint32 slot);
    void SaveToDB();
};

TC_GAME_API TSItem CreateItem(uint32 entry = 0, uint32 count = 0);