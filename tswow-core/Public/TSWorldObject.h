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
#include "TSClasses.h"
#include "TSObject.h"
#include "TSPosition.h"
#include "TSDictionary.h"
#include "TSEntity.h"
#include "TSWorldEntity.h"
#include "TSItem.h"
#include <chrono>
#include <vector>
#include <list>

class TSCollisions;
class TSCollisionEntry;
class TSEntity;
class TSUnit;
class TSMainThreadContext;

#define CollisionCallback std::function<void(TSWorldObject,TSWorldObject,TSMutableNumber<uint32>,TSCollisionEntry*)>

class TSFactionTemplate;

class TC_GAME_API TSWorldObject : public TSObject, public TSWorldEntityProvider<TSWorldObject> {
public:
    WorldObject* obj;
    TSWorldObject();
    TSWorldObject(WorldObject* obj);
    bool IsNull() { return obj == nullptr; };
    bool operator< (const TSWorldObject&) const;
    operator TSWorldObject() const { return obj; }
    operator bool() const { return obj != nullptr; }

    TSWorldObject* operator->() { return this;}
    TSArray<TSCreature> GetCreaturesInRange(float range, uint32 entry, uint32 hostile, uint32 dead);
    TSArray<TSPlayer> GetPlayersInRange(float range, uint32 hostile, uint32 dead);
    TSArray<TSUnit> GetUnitsInRange(float range, uint32 hostile, uint32 dead);
    TSArray<TSGameObject> GetGameObjectsInRange(float range, uint32 entry, uint32 hostile);

    TSPlayer GetNearestPlayer(float range = 533.33333, uint32 hostile = 0, uint32 dead = 1);
    TSGameObject GetNearestGameObject(float range = 533.33333, uint32 entry = 0, uint32 hostile = 0);
    TSCreature GetNearestCreature(float range = 533.33333, uint32 entry = 0, uint32 hostile = 0, uint32 dead = 1);

    TSNumber<float> GetDistance(TSWorldObject target);
    TSNumber<float> GetDistanceToPoint(float X, float Y, float Z);

    TSNumber<float> GetDistance2d(TSWorldObject target);
    TSNumber<float> GetDistanceToPoint2d(float X, float Y);

    TSGameObject  SummonGameObject(uint32 entry, float x, float y, float z, float o, uint32 respawnDelay);
    TSCreature  SpawnCreature(uint32 entry, float x, float y, float z, float o, uint32 spawnType, uint32 despawnTimer);

    void SendPacket(TSWorldPacket data);
    void SendPacket(std::shared_ptr<TSWorldPacket> data);
    bool IsWithinLoS(TSWorldObject target, float x, float y, float z);
    bool IsInMap(TSWorldObject target);

    bool IsWithinDist(TSWorldObject target, float distance, bool is3D);
    bool IsWithinDistInMap(TSWorldObject target, float distance, bool is3D);
    bool IsInRange(TSWorldObject target, float minrange, float maxrange, bool is3D);

    bool IsInFront(TSWorldObject target, float arc);
    bool IsInBack(TSWorldObject target, float arc);
    void PlayMusic(uint32 musicid, TSPlayer player);
    void PlayDirectSound(uint32 soundId, TSPlayer player);
    void PlayDistanceSound(uint32 soundId, TSPlayer player);

    TSMap GetMap();
    std::string GetName();
    TSNumber<uint32> GetPhaseMask();
    TSNumber<uint64> GetPhaseID();
    void SetPhaseMask(uint32 phaseMask, bool update, uint64 id = 0);
    TSNumber<uint32> GetInstanceID();
    TSNumber<uint32> GetAreaID();
    TSNumber<uint32> GetZoneID();
    TSNumber<uint32> GetMapID();
    TSNumber<float> GetAngle(TSWorldObject target,float x,float y);
    TSNumber<float> GetX();
    TSNumber<float> GetY();
    TSNumber<float> GetZ();
    TSNumber<float> GetO();
    TSPosition GetPosition();
    // TODO: Fix
    //GetExactDistance(TSWorldObject _target, float x1, float y1, float z1);
    TSPosition GetRelativePoint(float dist, float rad);
    bool IsWithinDist3d(float x, float y, float z, float dist);
    bool IsWithinDist2d(float x, float y, float dist);
    bool IsInRange2d(float x, float y, float minrange, float maxrange);
    bool IsInRange3d(float x, float y, float z, float minrange, float maxrange);

    bool IsFriendlyTo(TSWorldObject object);
    bool IsHostileTo(TSWorldObject object);
    bool IsFriendlyToPlayers();
    bool IsHostileToPlayers();
    bool IsNeutralToAll();

    TSNumber<uint32> CastSpell(TSWorldObject target, uint32 spell, bool triggered = false);
    TSNumber<uint32> CastSpellAoF(float _x, float _y, float _z, uint32 spell, bool triggered = false);
    TSNumber<uint32> CastCustomSpell(
          TSWorldObject target
        , uint32 spell
        , bool triggered = false
        , int32 bp0 = 0
        , int32 bp1 = 0
        , int32 bp2 = 0
        , TSItem castItem = TSItem()
        , uint64 originalCaster = 0
    );

    TSGameObject GetGameObject(uint64 guid);
    TSCorpse GetCorpse(uint64 guid);
    TSUnit GetUnit(uint64 guid);
    TSCreature GetCreature(uint64 guid);
    TSPlayer GetPlayer(uint64 guid);

    bool HasCollision(std::string const& id) ;
    void AddCollision(std::string const& id, float range, uint32_t minDelay, uint32_t maxHits, CollisionCallback callback);
    TSCollisionEntry * GetCollision(std::string const& id);
    TSCollisions* GetCollisions();

    TSFactionTemplate GetFactionTemplate();

    void SetActive(bool active);
    bool IsActive();

    void AddedByGroup(TSWorldObjectGroup* group);
    void RemovedByGroup(TSWorldObjectGroup* group);

    void DoDelayed(std::function<void(TSWorldObject, TSMainThreadContext)> callback);
private:
    friend class TSLua;
    void LDoDelayed(sol::protected_function callback);
    TSLua::Array<TSCreature> LGetCreaturesInRange(float range, uint32 entry, uint32 hostile, uint32 dead);
    TSLua::Array<TSUnit> LGetUnitsInRange(float range, uint32 hostile, uint32 dead);
    TSLua::Array<TSGameObject> LGetGameObjectsInRange(float range, uint32 entry, uint32 hostile);
    TSLua::Array<TSPlayer> LGetPlayersInRange(float range, uint32 hostile, uint32 dead);
};

class TC_GAME_API TSCollisionEntry {
public:
    TSDictionary<uint64,uint32> hitmap;
    CollisionCallback callback;
    std::string name;
    uint32_t lastReload;
    uint32_t maxHits;
    float range;
    uint64_t minDelay;
    uint64_t lastHit = 0;

    TSCollisionEntry(std::string const& name, float range, uint32_t minDelay,uint32_t maxHits, CollisionCallback callback);
    bool Tick(TSWorldObject value, bool force = true);
};

class TC_GAME_API TSCollisions {
public:
    std::vector<TSCollisionEntry> callbacks;
    TSCollisionEntry* Add(std::string const& id, float range, uint32_t minDelay, uint32_t maxHits, CollisionCallback callback);
    bool Contains(std::string const& id);
    TSCollisionEntry* Get(std::string const& id);
    void Tick(TSWorldObject obj);
};

class TC_GAME_API TSMutableWorldObject
{
    TS_CLASS_DECLARATION(TSMutableWorldObject, WorldObject, m_obj)
    TSWorldObject get();
    void set(TSWorldObject value);
};

class TC_GAME_API TSWorldObjectCollection
{
    TS_CLASS_DECLARATION(TSWorldObjectCollection, std::list<WorldObject*>, m_info)
    void filterInPlace(std::function<bool(TSWorldObject)> callback);
    void forEach(std::function<void(TSWorldObject)> callback);
    TSWorldObject find(std::function<bool(TSWorldObject)> callback);
    TSNumber<uint32> get_length();
    TSWorldObject get(uint32 index);
};

#define BROADCAST_PHASE_ID 0xffffff
