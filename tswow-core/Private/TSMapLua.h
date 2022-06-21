#pragma once

#include "TSLua.h"
#include "TSMap.h"
#include "TSWorldEntityLua.h"
#include "TSEntityLua.h"

template <typename T>
void TSLua::load_map_methods_t(sol::state& state, sol::usertype<T> & target, std::string const& name)
{
    load_entity_methods_t<T>(state, target, name);
    load_world_entity_methods_t<TSMap, T>(state, target, name);
    LUA_FIELD(target, TSMap, IsArena);
    LUA_FIELD(target, TSMap, IsBG);
    LUA_FIELD(target, TSMap, ToBG);
    LUA_FIELD(target, TSMap, IsDungeon);
    LUA_FIELD(target, TSMap, IsEmpty);
    LUA_FIELD(target, TSMap, IsHeroic);
    LUA_FIELD(target, TSMap, GetName);
    LUA_FIELD(target, TSMap, GetHeight);
    LUA_FIELD(target, TSMap, GetDifficulty);
    LUA_FIELD(target, TSMap, GetInstanceID);
    LUA_FIELD(target, TSMap, GetPlayerCount);
    LUA_FIELD(target, TSMap, GetMapID);
    LUA_FIELD(target, TSMap, IsInstance);
    LUA_FIELD(target, TSMap, ToInstance);
    LUA_FIELD(target, TSMap, GetCreature);
    LUA_FIELD(target, TSMap, GetGameObject);
    LUA_FIELD(target, TSMap, GetPlayer);
    LUA_FIELD(target, TSMap, GetCreatureByDBGUID);
    LUA_FIELD(target, TSMap, GetGameObjectByDBGUID);
    LUA_FIELD(target, TSMap, SpawnCreature);
    LUA_FIELD(target, TSMap, SpawnGameObject);
    LUA_FIELD(target, TSMap, GetAreaID);
    LUA_FIELD(target, TSMap, GetWorldObject);
    LUA_FIELD(target, TSMap, SetWeather);

    target.set_function("DoDelayed", &TSMap::LDoDelayed);
    target.set_function("GetName", &TSMap::LGetName);
    target.set_function("GetUnits", &TSMap::GetUnits);
    target.set_function("GetPlayers", sol::overload(
        & TSMap::LGetPlayers0
        , &TSMap::LGetPlayers1
    ));
    target.set_function("GetGameObjects", sol::overload(
        & TSMap::LGetGameObjects0
        , &TSMap::LGetGameObjects1
    ));
    target.set_function("GetCreatures", sol::overload(
        & TSMap::LGetCreatures0
        , &TSMap::LGetCreatures1
    ));
}