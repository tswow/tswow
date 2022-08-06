#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSLoot.h"

void TSLua::load_loot_methods(sol::state& state)
{
    auto ts_lootitem = state.new_usertype<TSLootItem>("TSLootItem");
    LUA_FIELD(ts_lootitem, TSLootItem, GetItemID);
    LUA_FIELD(ts_lootitem, TSLootItem, GetRandomSuffix);
    LUA_FIELD(ts_lootitem, TSLootItem, GetRandomPropertyID);
    LUA_FIELD(ts_lootitem, TSLootItem, GetCount);
    LUA_FIELD(ts_lootitem, TSLootItem, SetItemID);
    LUA_FIELD(ts_lootitem, TSLootItem, SetRandomSuffix);
    LUA_FIELD(ts_lootitem, TSLootItem, SetRandomPropertyID);
    LUA_FIELD(ts_lootitem, TSLootItem, SetCount);
    LUA_FIELD(ts_lootitem, TSLootItem, SetFakeRandomSuffix);
    LUA_FIELD(ts_lootitem, TSLootItem, SetFakeRandomPropertyID);
    LUA_FIELD(ts_lootitem, TSLootItem, GetFakeRandomSuffix);
    LUA_FIELD(ts_lootitem, TSLootItem, GetFakeRandomPropertyID);

    auto ts_loot = state.new_usertype<TSLoot>("TSLoot");
    LUA_FIELD_OVERLOAD_3_3(ts_loot, TSLoot, AddItem, uint32, uint8, uint8, uint16, bool, uint8);
    ts_loot.set_function("Filter", &TSLoot::LFilter);
    LUA_FIELD(ts_loot, TSLoot, Clear);
    LUA_FIELD(ts_loot, TSLoot, IsLooted);
    LUA_FIELD(ts_loot, TSLoot, AddItem);
    LUA_FIELD(ts_loot, TSLoot, AddLooter);
    LUA_FIELD(ts_loot, TSLoot, RemoveLooter);
    LUA_FIELD(ts_loot, TSLoot, GetLootType);
    LUA_FIELD(ts_loot, TSLoot, SetLootType);
    LUA_FIELD(ts_loot, TSLoot, GetMoney);
    LUA_FIELD(ts_loot, TSLoot, SetMoney);
    LUA_FIELD(ts_loot, TSLoot, GetLootOwner);
    LUA_FIELD(ts_loot, TSLoot, SetLootOwner);
    LUA_FIELD(ts_loot, TSLoot, GetItemCount);
    LUA_FIELD(ts_loot, TSLoot, GetQuestItemCount);
    LUA_FIELD(ts_loot, TSLoot, GetItem);
    LUA_FIELD(ts_loot, TSLoot, GetQuestItem);
    LUA_FIELD(ts_loot, TSLoot, GetGeneratesNormally);
    LUA_FIELD(ts_loot, TSLoot, SetGeneratesNormally);
}
