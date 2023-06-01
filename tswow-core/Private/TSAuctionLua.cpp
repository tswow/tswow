#include "TSLua.h"
#include "TSAuction.h"
#include "TSGUID.h"

void TSLua::load_auction_methods(sol::state& state)
{
    auto ts_auctionentry = state.new_usertype<TSAuctionEntry>("TSAuctionEntry");
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetID);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetHouseID);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetItemID);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetItemEntry);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetItemCount);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetOwnerGUID);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetStartBid);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetBid);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetBuyout);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetExpireTime);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetBidderGUID);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetDeposit);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetETime);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, GetFlags);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetItemID);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetItemEntry);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetItemCount);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetOwnerID);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetStartBid);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetBid);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetBuyout);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetBidder);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetDeposit);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetETime);
    LUA_FIELD(ts_auctionentry, TSAuctionEntry, SetFlags);
    ts_auctionentry.set_function("GetBidders", &TSAuctionEntry::LGetBidders);

    auto ts_auctionhouseobject = state.new_usertype<TSAuctionHouseObject>("TSAuctionHouseObject");
    ts_auctionhouseobject.set_function("GetKeys", &TSAuctionHouseObject::LGetKeys);
    LUA_FIELD(ts_auctionhouseobject, TSAuctionHouseObject, GetEntry);
    LUA_FIELD(ts_auctionhouseobject, TSAuctionHouseObject, GetCount);
    LUA_FIELD(ts_auctionhouseobject, TSAuctionHouseObject, AddAuction);
}
