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
#include <vector>

struct AuctionEntry;

struct TC_GAME_API TSAuctionEntry {
    AuctionEntry* entry;

    TSAuctionEntry(AuctionEntry* entry);

    TSAuctionEntry* operator->() {return this;}
    operator bool() const { return entry != nullptr; }
    bool operator==(TSAuctionEntry const& rhs) { return entry == rhs.entry; }

    TSNumber<uint32> GetID();
    TSNumber<uint8> GetHouseID();
    TSNumber<uint64> GetItemID();
    TSNumber<uint32> GetItemEntry();
    TSNumber<uint32> GetItemCount();
    TSNumber<uint64> GetOwnerID();
    TSNumber<uint32> GetStartBid();
    TSNumber<uint32> GetBid();
    TSNumber<uint32> GetBuyout();
    TSNumber<uint64> GetExpireTime();
    TSNumber<uint64> GetBidder();
    TSNumber<uint32> GetDeposit();
    TSNumber<uint32> GetETime();
    TSArray<TSNumber<uint64>> GetBidders();
    TSNumber<uint32> GetFlags();

    void SetItemID(uint64 itemId);
    void SetItemEntry(uint32 itemEntry);
    void SetItemCount(uint32 itemCount);
    void SetOwnerID(uint64 ownerId);
    void SetStartBid(uint32 startBid);
    void SetBid(uint32 bid);
    void SetBuyout(uint32 buyout);
    void SetBidder(uint64 bidder);
    void SetDeposit(uint32 deposit);
    void SetETime(uint32 eTime);
    void SetFlags(uint32 flags);
private:
    TSLua::Array<TSNumber<uint64> > LGetBidders();
    friend class TSLua;
};

class AuctionHouseObject;
struct TC_GAME_API TSAuctionHouseObject {
    AuctionHouseObject* obj;
    TSAuctionHouseObject(AuctionHouseObject* obj) { this->obj = obj;};
    TSAuctionHouseObject* operator->(){return this;}
    operator bool() const { return obj != nullptr; }
    bool operator==(TSAuctionHouseObject const& rhs) { return obj == rhs.obj; }
    TSArray<TSNumber<uint32>> GetKeys();
    TSAuctionEntry GetEntry(uint32 key);
    bool RemoveAuction(uint32 key);
    bool RemoveAuction(TSAuctionEntry entry);
    uint32 GetCount();
    void AddAuction(TSAuctionEntry entry);
private:
    TSLua::Array<TSNumber<uint32>> LGetKeys();
    friend class TSLua;
};