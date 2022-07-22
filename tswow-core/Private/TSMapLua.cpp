#include "TSLua.h"
#include "TSMap.h"
#include "TSWorldEntityLua.h"

#include "TSPlayer.h"
#include "TSWorldObject.h"
#include "TSGameObject.h"
#include "TSUnit.h"
#include "TSCreature.h"
#include "TSBattleground.h"
#include "TSInstance.h"

void TSLua::load_map_methods(sol::state& state)
{
    auto ts_map = state.new_usertype<TSMap>("TSMap", sol::base_classes, sol::bases<TSEntityProvider, TSWorldEntityProvider<TSMap>>());
    load_world_entity_methods_t<TSMap>(state, ts_map, "TSMap");
    LUA_FIELD(ts_map, TSMap, IsArena);
    LUA_FIELD(ts_map, TSMap, IsBG);
    LUA_FIELD(ts_map, TSMap, ToBG);
    LUA_FIELD(ts_map, TSMap, IsDungeon);
    LUA_FIELD(ts_map, TSMap, IsEmpty);
    LUA_FIELD(ts_map, TSMap, IsHeroic);
    LUA_FIELD(ts_map, TSMap, GetName);
    LUA_FIELD(ts_map, TSMap, GetHeight);
    LUA_FIELD(ts_map, TSMap, GetDifficulty);
    LUA_FIELD(ts_map, TSMap, GetInstanceID);
    LUA_FIELD(ts_map, TSMap, GetPlayerCount);
    LUA_FIELD(ts_map, TSMap, GetMapID);
    LUA_FIELD(ts_map, TSMap, IsInstance);
    LUA_FIELD(ts_map, TSMap, ToInstance);
    LUA_FIELD(ts_map, TSMap, GetCreature);
    LUA_FIELD(ts_map, TSMap, GetGameObject);
    LUA_FIELD(ts_map, TSMap, GetPlayer);
    LUA_FIELD(ts_map, TSMap, GetCreatureByDBGUID);
    LUA_FIELD(ts_map, TSMap, GetGameObjectByDBGUID);
    LUA_FIELD(ts_map, TSMap, SpawnCreature);
    LUA_FIELD(ts_map, TSMap, SpawnGameObject);
    LUA_FIELD(ts_map, TSMap, GetAreaID);
    LUA_FIELD(ts_map, TSMap, GetWorldObject);
    LUA_FIELD(ts_map, TSMap, SetWeather);
    LUA_FIELD(ts_map, TSMap, GetName);

    ts_map.set_function("DoDelayed", &TSMap::LDoDelayed);
    ts_map.set_function("GetUnits", &TSMap::GetUnits);
    ts_map.set_function("GetPlayers", sol::overload(
        &TSMap::LGetPlayers0
        , &TSMap::LGetPlayers1
    ));
    ts_map.set_function("GetGameObjects", sol::overload(
        &TSMap::LGetGameObjects0
        , &TSMap::LGetGameObjects1
    ));
    ts_map.set_function("GetCreatures", sol::overload(
        &TSMap::LGetCreatures0
        , &TSMap::LGetCreatures1
    ));
}
