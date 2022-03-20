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
#include "TSAuction.h"
#include "AuctionHouseMgr.h"

TSAuctionEntry::TSAuctionEntry(AuctionEntry* entry)
{
    this->entry = entry;
}

uint32 TSAuctionEntry::GetID()
{
    return entry->Id;
}

uint8 TSAuctionEntry::GetHouseID()
{
    return entry->houseId;
}

uint64 TSAuctionEntry::GetItemID()
{
#if TRINITY
    return entry->itemGUIDLow;
#elif AZEROTHCORE
    return entry->item_guid.GetEntry();
#endif
}

uint32 TSAuctionEntry::GetItemEntry()
{
#if TRINITY
    return entry->itemEntry;
#elif AZEROTHCORE
    return entry->item_template;
#endif
}

uint32 TSAuctionEntry::GetItemCount()
{
    return entry->itemCount;
}

uint64 TSAuctionEntry::GetOwnerID()
{
    return TS_GUID(entry->owner);
}

uint32 TSAuctionEntry::GetStartBid()
{
    return entry->startbid;
}

uint32 TSAuctionEntry::GetBid()
{
    return entry->bid;
}

uint32 TSAuctionEntry::GetBuyout()
{
    return entry->buyout;
}

uint64 TSAuctionEntry::GetExpireTime()
{
    return (uint64) entry->expire_time;
}

uint64 TSAuctionEntry::GetBidder()
{
    return TS_GUID(entry->bidder);
}

uint32 TSAuctionEntry::GetDeposit()
{
    return entry->deposit;
}

uint32 TSAuctionEntry::GetETime()
{
#if TRINITY
    return entry->etime;
#elif AZEROTHCORE
    return entry->expire_time;
#endif
}

TSArray<uint64> TSAuctionEntry::GetBidders()
{
    TSArray<uint64> arr;
#if TRINITY
    for(auto& bidder: entry->bidders)
    {
        arr.push(bidder);
    }
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSAuctionEntry::GetBidders not implemented for AzerothCore (bidders aren't stored).");
    return 0;
#endif
    return arr;
}

uint32 TSAuctionEntry::GetFlags()
{
#if TRINITY
    return entry->Flags;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSAuctionEntry::GetFlags not implemented for AzerothCore.");
    return 0;
#endif
}

void TSAuctionEntry::SetOwnerID(uint64 ownerId)
{
    entry->owner = ObjectGuid(ownerId);
}


void TSAuctionEntry::SetItemID(uint64 itemId)
{
#if TRINITY
    entry->itemGUIDLow = ObjectGuid(itemId);
#elif AZEROTHCORE
    entry->item_guid = ObjectGuid(itemId);
#endif
}

void TSAuctionEntry::SetItemEntry(uint32 itemEntry)
{
#if TRINITY
    entry->itemEntry = itemEntry;
#elif AZEROTHCORE
    entry->item_template = itemEntry;
#endif
}

void TSAuctionEntry::SetItemCount(uint32 count)
{
    entry->itemCount = count;
}

void TSAuctionEntry::SetStartBid(uint32 startBid)
{
    entry->startbid= startBid;
}

void TSAuctionEntry::SetBid(uint32 bid)
{
    entry->bid= bid;
}

void TSAuctionEntry::SetBuyout(uint32 buyout)
{
    entry->buyout = buyout;
}

void TSAuctionEntry::SetBidder(uint64 bidder)
{
    entry->bidder = ObjectGuid(bidder);
}

void TSAuctionEntry::SetDeposit(uint32 deposit)
{
    entry->deposit = deposit;
}

void TSAuctionEntry::SetETime(uint32 etime)
{
#if TRINITY
    entry->etime = etime;
#elif AZEROTHCORE
    entry->expire_time = etime;
#endif
}

void TSAuctionEntry::SetFlags(uint32 flags)
{
#if TRINITY
    entry->Flags = AuctionEntryFlag(flags);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSAuctionEntry::SetFlags not implemented for AzerothCore.");
#endif
}

TSArray<uint32> TSAuctionHouseObject::GetKeys()
{
    TSArray<uint32> keys;
    keys.vec->reserve(obj->Getcount());
    int ctr = 0;
    for(auto i = obj->GetAuctionsBegin(); i != obj->GetAuctionsEnd();++i)
    {
        keys.set(ctr++,i->first);
    }
    return keys;
}

TSAuctionEntry TSAuctionHouseObject::GetEntry(uint32 key)
{
    return TSAuctionEntry(obj->GetAuction(key));
}

bool TSAuctionHouseObject::RemoveAuction(TSAuctionEntry entry)
{
    return entry.entry ? obj->RemoveAuction(entry.entry) : false;
}

bool TSAuctionHouseObject::RemoveAuction(uint32 key)
{
    auto a = obj->GetAuction(key);
    return a ? obj->RemoveAuction(a) : false;
}

uint32 TSAuctionHouseObject::GetCount()
{
    return obj->Getcount();
}

void TSAuctionHouseObject::AddAuction(TSAuctionEntry entry)
{
    // TODO: Pretty sure this isn't enough
    obj->AddAuction(entry->entry);
}

sol::as_table_t<std::vector<uint64>> TSAuctionEntry::LGetBidders()
{
    return sol::as_table(*GetBidders().vec);
}

sol::as_table_t<std::vector<uint32>> TSAuctionHouseObject::LGetKeys()
{
    return sol::as_table(*GetKeys().vec);
}
