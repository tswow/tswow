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
#include "TSLoot.h"
#if TRINITY
#include "Loot.h"
#elif AZEROTHCORE
#include "LootMgr.h"
#endif
#include "LootMgr.h"
#include "ObjectGuid.h"
#include "TSMath.h"

TSLoot::TSLoot(Loot *loot)
{
    this->loot = loot;
}

TSLoot::TSLoot()
{
    this->loot = nullptr;
}

void TSLoot::Clear()
{
    loot->clear();
}

bool TSLoot::IsLooted()
{
    return loot->isLooted();
}

void TSLoot::AddItem(uint32 id, uint8 minCount, uint8 maxCount, uint16 lootmode, bool needsQuest, uint8 groupId)
{
    loot->items.reserve(MAX_NR_LOOT_ITEMS);
    loot->quest_items.reserve(MAX_NR_QUEST_ITEMS);
    loot->AddItem(LootStoreItem(id,0,100,lootmode,needsQuest,groupId,minCount,maxCount));
}

void TSLoot::AddLooter(uint64 looter)
{
    loot->AddLooter(ObjectGuid(looter));
}

void TSLoot::RemoveLooter(uint64 looter)
{
    loot->RemoveLooter(ObjectGuid(looter));
}

void TSLoot::SetMoney(uint32 money)
{
    loot->gold = money;
}

TSNumber<uint32> TSLoot::GetMoney()
{
    return loot->gold;
}

void TSLoot::SetLootType(uint32 lootType)
{
    loot->loot_type = LootType(lootType);
}

TSNumber<uint32> TSLoot::GetLootType()
{
    return loot->loot_type;
}

void TSLoot::SetLootOwner(uint64 owner)
{
    loot->lootOwnerGUID = ObjectGuid(owner);
}

TSNumber<uint64> TSLoot::GetLootOwner()
{
    return TS_GUID(loot->lootOwnerGUID);
}

TSLootItem::TSLootItem(LootItem* item)
{
    this->item = item;
}

TSNumber<uint32> TSLootItem::GetItemID()
{
    return item->itemid;
}

TSNumber<uint32> TSLootItem::GetRandomSuffix()
{
    return item->randomSuffix;
}

TSNumber<int32> TSLootItem::GetRandomPropertyID()
{
    return item->randomPropertyId;
}

TSNumber<uint8> TSLootItem::GetCount()
{
    return item->count;
}

void TSLootItem::SetItemID(uint32 id)
{
    item->itemid = id;
}

void TSLootItem::SetRandomSuffix(uint32 randomSuffix)
{
    item->randomSuffix = randomSuffix;
}

void TSLootItem::SetRandomPropertyID(int32 randomPropertyId)
{
    item->randomPropertyId = randomPropertyId;
}

void TSLootItem::SetCount(uint8 count)
{
    item->count = count;
}

TSNumber<uint32> TSLoot::GetItemCount()
{
    return loot->items.size();
}

TSNumber<uint32> TSLoot::GetQuestItemCount()
{
    return loot->quest_items.size();
}

TSLootItem TSLoot::GetItem(uint32 index)
{
    return TSLootItem(&loot->items[index]);
}

TSLootItem TSLoot::GetQuestItem(uint32 index)
{
    return TSLootItem(&loot->quest_items[index]);
}

void TSLoot::Filter(std::function<bool(TSLootItem)> predicate)
{
    auto it = loot->items.begin();
    while(it != loot->items.end())
    {
        if(!predicate(TSLootItem(&*it)))
        {
            --loot->unlootedCount;
            it = loot->items.erase(it);
        }
        else
        {
            ++it;
        }
    }

    it = loot->quest_items.begin();
    while(it != loot->quest_items.end())
    {
        if(!predicate(TSLootItem(&*it)))
        {
            --loot->unlootedCount;
            it = loot->quest_items.erase(it);
        }
        else
        {
            ++it;
        }
    }
}

bool TSLoot::GetGeneratesNormally()
{
#if TRINITY
    return loot->generateNormally;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSLoot::GetGeneratesNormally not implemented for AzerothCore");
    return true;
#endif
}

void TSLoot::SetGeneratesNormally(bool generatesNormally)
{
#if TRINITY
    loot->generateNormally = generatesNormally;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSLoot::SetGeneratesNormally not implemented for AzerothCore");
#endif
}

void TSLoot::LFilter(sol::protected_function predicate)
{
    return Filter([predicate](auto const& v) {
        return predicate(v);
    });
}

TSNumber<uint32> TSLootItem::GetFakeRandomSuffix()
{
    return item->fakeRandomSuffix;
}

TSNumber<uint32> TSLootItem::GetFakeRandomPropertyID()
{
    return item->fakeRandomPropertyId;
}

void TSLootItem::SetFakeRandomSuffix(uint32 fakeRandomSuffix)
{
    item->fakeRandomSuffix = fakeRandomSuffix;
}

void TSLootItem::SetFakeRandomPropertyID(uint32 fakePropertyId)
{
    item->fakeRandomPropertyId = fakePropertyId;
}

