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
#include "TSArray.h"

#include <sol/sol.hpp>

#include <functional>

struct LootItem;
struct TC_GAME_API TSLootItem {
    LootItem* item;
    TSLootItem(LootItem* item);
    TSLootItem* operator->() {return this;}
    operator bool() const { return item != nullptr; }
    bool operator==(TSLootItem const& rhs) { return item == rhs.item; }

    uint32 GetItemID();
    uint32 GetRandomSuffix();
    int32 GetRandomPropertyID();
    uint8 GetCount();

    void SetItemID(uint32 itemId);
    void SetRandomSuffix(uint32 randomSuffix);
    void SetRandomPropertyID(int32 propertyId);
    void SetCount(uint8 count);
};

struct Loot;
class TC_GAME_API TSLoot {
    public:
        Loot * loot;
        TSLoot(Loot *loot);
        TSLoot();
        TSLoot* operator->() {return this;}
        operator bool() const { return loot != nullptr; }
        bool operator==(TSLoot const& rhs) { return loot == rhs.loot; }

        bool IsNull() { return loot == nullptr; }
        void Clear();
        bool IsLooted();
        void AddItem(uint32 id, uint8 minCount, uint8 maxCount, uint16 lootmode = 0, bool needsQuest = false, uint8 groupId = 0);
        void AddLooter(uint64 looter);
        void RemoveLooter(uint64 looter);

        uint32 GetLootType();
        void SetLootType(uint32 lootType);

        uint32 GetMoney();
        void SetMoney(uint32 money);

        uint64 GetLootOwner();
        void SetLootOwner(uint64 owner);

        uint32 GetItemCount();
        uint32 GetQuestItemCount();

        TSLootItem GetItem(uint32 index);
        TSLootItem GetQuestItem(uint32 index);

        void Filter(std::function<bool(TSLootItem)> predicate);

        bool GetGeneratesNormally();
        void SetGeneratesNormally(bool normal);
private:
    void LAddItem0(uint32 id, uint8 minCount, uint8 maxCount, uint16 lootmode, bool needsQuest, uint8 groupId);
    void LAddItem1(uint32 id, uint8 minCount, uint8 maxCount, uint16 lootmode, bool needsQuest);
    void LAddItem2(uint32 id, uint8 minCount, uint8 maxCount, uint16 lootmode);
    void LAddItem3(uint32 id, uint8 minCount, uint8 maxCount);
    void LFilter(sol::protected_function predicate);
    friend class TSLuaState;
};
