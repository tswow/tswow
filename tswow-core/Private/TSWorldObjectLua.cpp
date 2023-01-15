#include "TSLua.h"
#include "TSWorldEntityLua.h"
#include "TSWorldObject.h"
#include "TSCreature.h"
#include "TSGameObject.h"
#include "TSCorpse.h"
#include "TSLuaVarargs.h"

void TSLua::load_world_object_methods(sol::state& state)
{
    auto ts_worldobject = state.new_usertype<TSWorldObject>("TSWorldObject", sol::base_classes, sol::bases<TSObject,TSWorldEntityProvider<TSWorldObject>, TSEntityProvider>());
    load_world_entity_methods_t<TSWorldObject>(state, ts_worldobject, "TSWorldObject");

    ts_worldobject.set_function("GetCreaturesInRange", &TSWorldObject::LGetCreaturesInRange);
    ts_worldobject.set_function("GetPlayersInRange", &TSWorldObject::LGetPlayersInRange);
    ts_worldobject.set_function("GetUnitsInRange", &TSWorldObject::LGetUnitsInRange);
    ts_worldobject.set_function("GetGameObjectsInRange", &TSWorldObject::LGetGameObjectsInRange);

    LUA_FIELD_OVERLOAD_RET_0_3(ts_worldobject, TSWorldObject, GetNearestPlayer, float, uint32, uint32);
    LUA_FIELD_OVERLOAD_RET_0_3(ts_worldobject, TSWorldObject, GetNearestGameObject, float, uint32, uint32);
    LUA_FIELD_OVERLOAD_RET_0_4(ts_worldobject, TSWorldObject, GetNearestCreature, float, uint32, uint32, uint32);

    LUA_FIELD(ts_worldobject, TSWorldObject, GetDistance);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetDistanceToPoint);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetDistance2d);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetDistanceToPoint2d);
    LUA_FIELD(ts_worldobject, TSWorldObject, SummonGameObject);
    LUA_FIELD(ts_worldobject, TSWorldObject, SpawnCreature);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsWithinLoS);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsInMap);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsWithinDist);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsWithinDistInMap);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsInRange);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsInFront);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsInBack);
    LUA_FIELD(ts_worldobject, TSWorldObject, PlayMusic);
    LUA_FIELD(ts_worldobject, TSWorldObject, PlayDirectSound);
    LUA_FIELD(ts_worldobject, TSWorldObject, PlayDistanceSound);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetMap);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetName);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetPhaseMask);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetPhaseID);
    LUA_FIELD(ts_worldobject, TSWorldObject, SetPhaseMask);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetInstanceID);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetAreaID);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetZoneID);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetMapID);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetAngle);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetX);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetY);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetZ);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetO);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetPosition);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetRelativePoint);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsWithinDist2d);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsWithinDist3d);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsInRange2d);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsInRange3d);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsFriendlyTo);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsHostileTo);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsFriendlyToPlayers);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsHostileToPlayers);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsNeutralToAll);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetGameObject);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetCorpse);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetUnit);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetCreature);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetPlayer);
    LUA_FIELD(ts_worldobject, TSWorldObject, HasCollision);
    LUA_FIELD(ts_worldobject, TSWorldObject, AddCollision);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetCollision);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetCollisions);
    LUA_FIELD(ts_worldobject, TSWorldObject, SetActive);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsActive);
    ts_worldobject.set_function("DoDelayed", &TSWorldObject::LDoDelayed);

    LUA_FIELD_OVERLOAD_2_6(ts_worldobject, TSWorldObject, CastCustomSpell, TSWorldObject, uint32, bool, int32, int32, int32, TSItem, uint64);
    LUA_FIELD_OVERLOAD_2_1(ts_worldobject, TSWorldObject, CastSpell, TSWorldObject, uint32, bool);
    LUA_FIELD_OVERLOAD_4_1(ts_worldobject, TSWorldObject, CastSpellAoF, float, float, float, uint32, bool);

    auto ts_mutable_worldobject = state.new_usertype<TSMutableWorldObject>("TSMutableWorldObject");
    LUA_FIELD(ts_mutable_worldobject, TSMutableWorldObject, get);
    LUA_FIELD(ts_mutable_worldobject, TSMutableWorldObject, set);

    auto ts_worldobject_collection = state.new_usertype<TSWorldObjectCollection>("TSWorldObjectCollection");
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, filterInPlace);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, forEach);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, find);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, get_length);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, get);
}
