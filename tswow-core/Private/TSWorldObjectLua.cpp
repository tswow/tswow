#include "TSLua.h"
#include "TSWorldEntityLua.h"
#include "TSWorldObject.h"
#include "TSCreature.h"
#include "TSGameObject.h"
#include "TSCorpse.h"
#include "TSLuaVarargs.h"
#include "TSItem.h"
#include "TSGUID.h"

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
    LUA_FIELD(ts_worldobject, TSWorldObject, IsOutdoors);
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
    LUA_FIELD(ts_worldobject, TSWorldObject, IsBehind);

    ts_worldobject.set_function("GetCreature", sol::overload(&TSWorldObject::LGetCreature0, &TSWorldObject::LGetCreature1));
    ts_worldobject.set_function("GetGameObject", sol::overload(&TSWorldObject::LGetGameObject0, &TSWorldObject::LGetGameObject1));
    ts_worldobject.set_function("GetPlayer", sol::overload(&TSWorldObject::LGetPlayer0, &TSWorldObject::LGetPlayer1));
    ts_worldobject.set_function("GetCorpse", sol::overload(&TSWorldObject::LGetCorpse0, &TSWorldObject::LGetCorpse1));

    LUA_FIELD(ts_worldobject, TSWorldObject, GetUnit);
    LUA_FIELD(ts_worldobject, TSWorldObject, HasCollision);
    LUA_FIELD(ts_worldobject, TSWorldObject, AddCollision);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetCollision);
    LUA_FIELD(ts_worldobject, TSWorldObject, GetCollisions);
    LUA_FIELD(ts_worldobject, TSWorldObject, SetActive);
    LUA_FIELD(ts_worldobject, TSWorldObject, IsActive);
    ts_worldobject.set_function("DoDelayed", &TSWorldObject::LDoDelayed);

    ts_worldobject.set_function("CastSpell", sol::overload(
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell, bool triggered) { return caster.CastSpell(target, spell, triggered); },
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell) { return caster.CastSpell(target, spell); },
        [](TSWorldObject& caster, TSItem target, uint32 spell, bool triggered) { return caster.CastSpell(target, spell, triggered); },
        [](TSWorldObject& caster, TSItem target, uint32 spell) { return caster.CastSpell(target, spell); }
    ));

    ts_worldobject.set_function("CastCustomSpell", sol::overload(
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell, bool triggered, int32 bp0, int32 bp1, int32 bp2, TSItem castItem, uint64 originalCaster)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1, bp2, castItem, originalCaster); },
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell, bool triggered, int32 bp0, int32 bp1, int32 bp2, TSItem castItem)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1, bp2, castItem); },
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell, bool triggered, int32 bp0, int32 bp1, int32 bp2)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1, bp2); },
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell, bool triggered, int32 bp0, int32 bp1)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1); },
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell, bool triggered, int32 bp0)
            { return caster.CastCustomSpell(target, spell, triggered, bp0); },
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell, bool triggered)
            { return caster.CastCustomSpell(target, spell, triggered); },
        [](TSWorldObject& caster, TSWorldObject target, uint32 spell)
            { return caster.CastCustomSpell(target, spell); },

        [](TSWorldObject& caster, TSItem target, uint32 spell, bool triggered, int32 bp0, int32 bp1, int32 bp2, TSItem castItem, uint64 originalCaster)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1, bp2, castItem, originalCaster); },
        [](TSWorldObject& caster, TSItem target, uint32 spell, bool triggered, int32 bp0, int32 bp1, int32 bp2, TSItem castItem)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1, bp2, castItem); },
        [](TSWorldObject& caster, TSItem target, uint32 spell, bool triggered, int32 bp0, int32 bp1, int32 bp2)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1, bp2); },
        [](TSWorldObject& caster, TSItem target, uint32 spell, bool triggered, int32 bp0, int32 bp1)
            { return caster.CastCustomSpell(target, spell, triggered, bp0, bp1); },
        [](TSWorldObject& caster, TSItem target, uint32 spell, bool triggered, int32 bp0)
            { return caster.CastCustomSpell(target, spell, triggered, bp0); },
        [](TSWorldObject& caster, TSItem target, uint32 spell, bool triggered)
            { return caster.CastCustomSpell(target, spell, triggered); },
        [](TSWorldObject& caster, TSItem target, uint32 spell)
            { return caster.CastCustomSpell(target, spell); }
    ));

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
