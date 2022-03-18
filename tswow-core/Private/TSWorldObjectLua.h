#pragma once

#include "TSLua.h"
#include "TSWorldObject.h"
#include "TSEntityLua.h"
#include "TSWorldEntityLua.h"
#include "TSObjectLua.h"

template <typename T>
void TSLuaState::load_world_object_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name)
{
    load_object_methods_t<T>(target, modid, name);
    load_world_entity_methods_t<TSWorldObject, T>(target, modid, name);
    LUA_FIELD(target, TSWorldObject, GetCreaturesInRange);
    LUA_FIELD(target, TSWorldObject, GetPlayersInRange);
    LUA_FIELD(target, TSWorldObject, GetUnitsInRange);
    LUA_FIELD(target, TSWorldObject, GetGameObjectsInRange);
    LUA_FIELD(target, TSWorldObject, GetNearestPlayer);
    LUA_FIELD(target, TSWorldObject, GetNearestGameObject);
    LUA_FIELD(target, TSWorldObject, GetNearestCreature);
    LUA_FIELD(target, TSWorldObject, GetDistance);
    LUA_FIELD(target, TSWorldObject, GetDistanceToPoint);
    LUA_FIELD(target, TSWorldObject, GetDistance2d);
    LUA_FIELD(target, TSWorldObject, GetDistanceToPoint2d);
    LUA_FIELD(target, TSWorldObject, SummonGameObject);
    LUA_FIELD(target, TSWorldObject, SpawnCreature);
    LUA_FIELD(target, TSWorldObject, IsWithinLoS);
    LUA_FIELD(target, TSWorldObject, IsInMap);
    LUA_FIELD(target, TSWorldObject, IsWithinDist);
    LUA_FIELD(target, TSWorldObject, IsWithinDistInMap);
    LUA_FIELD(target, TSWorldObject, IsInRange);
    LUA_FIELD(target, TSWorldObject, IsInFront);
    LUA_FIELD(target, TSWorldObject, IsInBack);
    LUA_FIELD(target, TSWorldObject, PlayMusic);
    LUA_FIELD(target, TSWorldObject, PlayDirectSound);
    LUA_FIELD(target, TSWorldObject, PlayDistanceSound);
    LUA_FIELD(target, TSWorldObject, GetMap);
    LUA_FIELD(target, TSWorldObject, GetName);
    LUA_FIELD(target, TSWorldObject, GetPhaseMask);
    LUA_FIELD(target, TSWorldObject, GetPhaseID);
    LUA_FIELD(target, TSWorldObject, SetPhaseMask);
    LUA_FIELD(target, TSWorldObject, GetInstanceID);
    LUA_FIELD(target, TSWorldObject, GetAreaID);
    LUA_FIELD(target, TSWorldObject, GetZoneID);
    LUA_FIELD(target, TSWorldObject, GetMapID);
    LUA_FIELD(target, TSWorldObject, GetAngle);
    LUA_FIELD(target, TSWorldObject, GetX);
    LUA_FIELD(target, TSWorldObject, GetY);
    LUA_FIELD(target, TSWorldObject, GetZ);
    LUA_FIELD(target, TSWorldObject, GetO);
    LUA_FIELD(target, TSWorldObject, GetPosition);
    LUA_FIELD(target, TSWorldObject, GetRelativePoint);
    LUA_FIELD(target, TSWorldObject, IsWithinDist2d);
    LUA_FIELD(target, TSWorldObject, IsWithinDist3d);
    LUA_FIELD(target, TSWorldObject, IsInRange2d);
    LUA_FIELD(target, TSWorldObject, IsInRange3d);
    LUA_FIELD(target, TSWorldObject, IsFriendlyTo);
    LUA_FIELD(target, TSWorldObject, IsHostileTo);
    LUA_FIELD(target, TSWorldObject, IsFriendlyToPlayers);
    LUA_FIELD(target, TSWorldObject, IsHostileToPlayers);
    LUA_FIELD(target, TSWorldObject, IsNeutralToAll);
    LUA_FIELD(target, TSWorldObject, GetGameObject);
    LUA_FIELD(target, TSWorldObject, GetCorpse);
    LUA_FIELD(target, TSWorldObject, GetUnit);
    LUA_FIELD(target, TSWorldObject, GetCreature);
    LUA_FIELD(target, TSWorldObject, GetPlayer);
    LUA_FIELD(target, TSWorldObject, HasCollision);
    LUA_FIELD(target, TSWorldObject, AddCollision);
    LUA_FIELD(target, TSWorldObject, GetCollision);
    LUA_FIELD(target, TSWorldObject, GetCollisions);
    LUA_FIELD(target, TSWorldObject, SetActive);
    LUA_FIELD(target, TSWorldObject, IsActive);
}
