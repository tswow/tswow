#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSItem.h"
#include "TSObject.h"
#include "TSEntity.h"

#include "TSPlayer.h"

void TSLua::load_item_methods(sol::state& state)
{
    auto ts_item = state.new_usertype < TSItem>("TSItem", sol::base_classes, sol::bases<TSObject, TSEntityProvider>());
    LUA_FIELD(ts_item, TSItem, IsSoulBound);
    LUA_FIELD(ts_item, TSItem, GetItemLink);
    LUA_FIELD(ts_item, TSItem, GetName);
    LUA_FIELD(ts_item, TSItem, IsBoundAccountWide);
    LUA_FIELD(ts_item, TSItem, IsBoundByEnchant);
    LUA_FIELD(ts_item, TSItem, IsNotBoundToPlayer);
    LUA_FIELD(ts_item, TSItem, IsLocked);
    LUA_FIELD(ts_item, TSItem, IsBag);
    LUA_FIELD(ts_item, TSItem, IsCurrencyToken);
    LUA_FIELD(ts_item, TSItem, IsNotEmptyBag);
    LUA_FIELD(ts_item, TSItem, IsBroken);
    LUA_FIELD(ts_item, TSItem, CanBeTraded);
    LUA_FIELD(ts_item, TSItem, IsInTrade);
    LUA_FIELD(ts_item, TSItem, IsInBag);
    LUA_FIELD(ts_item, TSItem, IsEquipped);
    LUA_FIELD(ts_item, TSItem, HasQuest);
    LUA_FIELD(ts_item, TSItem, IsPotion);
    LUA_FIELD(ts_item, TSItem, IsWeaponVellum);
    LUA_FIELD(ts_item, TSItem, IsArmorVellum);
    LUA_FIELD(ts_item, TSItem, IsConjuredConsumable);
    LUA_FIELD(ts_item, TSItem, GetTemplate);
    LUA_FIELD(ts_item, TSItem, GetOwnerGUID);
    LUA_FIELD(ts_item, TSItem, GetCount);
    LUA_FIELD(ts_item, TSItem, GetMaxStackCount);
    LUA_FIELD(ts_item, TSItem, GetSlot);
    LUA_FIELD(ts_item, TSItem, GetBagSlot);
    LUA_FIELD(ts_item, TSItem, GetEnchantmentID);
    LUA_FIELD(ts_item, TSItem, GetSpellID);
    LUA_FIELD(ts_item, TSItem, GetSpellTrigger);
    LUA_FIELD(ts_item, TSItem, GetClass);
    LUA_FIELD(ts_item, TSItem, GetSubClass);
    LUA_FIELD(ts_item, TSItem, GetDisplayID);
    LUA_FIELD(ts_item, TSItem, GetQuality);
    LUA_FIELD(ts_item, TSItem, GetBuyCount);
    LUA_FIELD(ts_item, TSItem, GetBuyPrice);
    LUA_FIELD(ts_item, TSItem, GetSellPrice);
    LUA_FIELD(ts_item, TSItem, GetInventoryType);
    LUA_FIELD(ts_item, TSItem, GetAllowableClass);
    LUA_FIELD(ts_item, TSItem, GetAllowableRace);
    LUA_FIELD(ts_item, TSItem, GetItemLevel);
    LUA_FIELD(ts_item, TSItem, GetRequiredLevel);
    LUA_FIELD(ts_item, TSItem, GetStatsCount);
    LUA_FIELD(ts_item, TSItem, GetRandomProperty);
    LUA_FIELD(ts_item, TSItem, GetRandomSuffix);
    LUA_FIELD(ts_item, TSItem, GetItemSet);
    LUA_FIELD(ts_item, TSItem, GetBagSize);
    LUA_FIELD(ts_item, TSItem, SetOwner);
    LUA_FIELD(ts_item, TSItem, SetBinding);
    LUA_FIELD(ts_item, TSItem, SetCount);
    LUA_FIELD(ts_item, TSItem, SetEnchantment);
    LUA_FIELD(ts_item, TSItem, ClearEnchantment);
    LUA_FIELD(ts_item, TSItem, SaveToDB);
    state.set_function("CreateItem", sol::overload(
        [](uint32 entry, uint32 count) { return CreateItem(entry, count); },
        [](uint32 entry) { return CreateItem(entry); },
        []() { return CreateItem(); }
    ));
}
