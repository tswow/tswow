/*
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * Copyright (C) 2010 - 2016 Eluna Lua Engine <http://emudevs.com/>
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

#include <memory.h>
#include "Object.h"
#include "TSFactionTemplate.h"
#include "TSIncludes.h"
#include "TSWorldObject.h"
#include "TSArray.h"
#include "TSCreature.h"
#include "TSPlayer.h"
#include "TSWorldObject.h"
#include "TSGameObject.h"
#include "TSWorldPacket.h"
#include "TSWorldObject.h"
#include "TSUnit.h"
#include "TSMap.h"
#include "Cell.h"
#include "CellImpl.h"
#include "GridNotifiers.h"
#include "GridNotifiersImpl.h"
#include "ObjectGuid.h"
#include "TSCorpse.h"
#include "TSEntity.h"
#include "TSItem.h"
#include "TSMainThreadContext.h"

TSWorldObject::TSWorldObject(WorldObject *objIn)
    : TSObject(objIn)
    , TSWorldEntityProvider(&objIn->m_tsWorldEntity)
    , obj(objIn)
{
}

TSWorldObject::TSWorldObject()
    : TSObject()
    , TSWorldEntityProvider(nullptr)
    , obj(nullptr)
{
}

/**
 * Returns the name of the [WorldObject]
 *
 * @return string name
 */
std::string TSWorldObject::GetName()
{
     return obj->GetName();
}

/**
 * Returns the current [Map] object of the [WorldObject]
 *
 * @return [Map] mapObject
 */
TSMap  TSWorldObject::GetMap()
{
     return TSMap(obj->GetMap());
}

#if (!defined(TBC) && !defined(CLASSIC))
/**
 * Returns the current phase of the [WorldObject]
 *
 * @return uint32 phase
 */
TSNumber<uint32> TSWorldObject::GetPhaseMask()
{
    return obj->GetPhaseMask();
}

TSNumber<uint64> TSWorldObject::GetPhaseID()
{
#if TRINITY
    return uint32(obj->m_phase_id);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetPhaseID not implemented for AzerothCore");
    return 0;
#endif
}

/**
* Sets the [WorldObject]'s phase mask.
*
* @param uint32 phaseMask
* @param bool update = true : update visibility to nearby objects
*/
void TSWorldObject::SetPhaseMask(uint32 phaseMask,bool update, uint64 id)
{
#if TRINITY
    obj->SetPhaseMask(phaseMask, update, id);
#elif AZEROTHCORE
    obj->SetPhaseMask(phaseMask, update);
    if (id != 0)
    {
        TS_LOG_ERROR(
              "tswow.api"
            , "TSWorldObject::SetPhaseMask not implemented for AzerothCore with phase id parameter (phase ids not implemented)"
        );
    }

#endif
}
#endif

/**
 * Returns the current instance ID of the [WorldObject]
 *
 * @return uint32 instanceId
 */
TSNumber<uint32> TSWorldObject::GetInstanceID()
{
    return obj->GetInstanceId();
}

/**
 * Returns the current area ID of the [WorldObject]
 *
 * @return uint32 areaId
 */
TSNumber<uint32> TSWorldObject::GetAreaID()
{
    return obj->GetAreaId();
}

/**
 * Returns the current zone ID of the [WorldObject]
 *
 * @return uint32 zoneId
 */
TSNumber<uint32> TSWorldObject::GetZoneID()
{
    return obj->GetZoneId();
}

/**
 * Returns the current map ID of the [WorldObject]
 *
 * @return uint32 mapId
 */
TSNumber<uint32> TSWorldObject::GetMapID()
{
    return obj->GetMapId();
}

/**
 * Returns the current X coordinate of the [WorldObject]
 *
 * @return float x
 */
TSNumber<float> TSWorldObject::GetX()
{
    return obj->GetPositionX();
}

/**
 * Returns the current Y coordinate of the [WorldObject]
 *
 * @return float y
 */
TSNumber<float> TSWorldObject::GetY()
{
    return obj->GetPositionY();
}

/**
 * Returns the current Z coordinate of the [WorldObject]
 *
 * @return float z
 */
TSNumber<float> TSWorldObject::GetZ()
{
    return obj->GetPositionZ();
}

/**
 * Returns the current orientation of the [WorldObject]
 *
 * @return float orientation / facing
 */
TSNumber<float> TSWorldObject::GetO()
{
    return obj->GetOrientation();
}

/**
 * Returns the distance from this [WorldObject] to another [WorldObject]
 *
 * The function takes into account the given object sizes. See also [WorldObject:GetExactDistance], [WorldObject:GetDistance2d]
 *
 * @proto dist = (obj)
 *
 * @param [WorldObject] obj
 *
 * @return float dist : the distance in yards
 */
TSNumber<float> TSWorldObject::GetDistance(TSWorldObject _target)
{
    return obj->GetDistance(_target.obj);
}

TSNumber<float> TSWorldObject::GetDistanceToPoint(float X, float Y, float Z)
{
    return obj->GetDistance(X, Y, Z);
}

/**
 * Returns the distance from this [WorldObject] to another [WorldObject]
 *
 * The function takes into account the given object sizes. See also [WorldObject:GetDistance], [WorldObject:GetExactDistance2d]
 *
 * @proto dist = (obj)
 *
 * @param [WorldObject] obj
 *
 * @return float dist : the distance in yards
 */
TSNumber<float> TSWorldObject::GetDistance2d(TSWorldObject _target)
{
    return obj->GetDistance2d(_target.obj);
}

TSNumber<float> TSWorldObject::GetDistanceToPoint2d(float X, float Y)
{
    return obj->GetDistance2d(X,Y);
}

/**
 * Returns the x, y and z of a point dist away from the [WorldObject].
 *
 * @param float distance : specifies the distance of the point from the [WorldObject] in yards
 * @param float angle : specifies the angle of the point relative to the orientation / facing of the [WorldObject] in radians
 *
 * @return float x
 * @return float y
 * @return float z
 */
TSPosition TSWorldObject::GetRelativePoint(float dist,float rad) {
    float x, y, z;
    obj->GetClosePoint(x, y, z, 0.0f, dist, rad);
    return TSPosition(GetMap()->GetMapID(), x,y,z,0);
}

/**
 * Returns the angle between this [WorldObject] and another [WorldObject] or a point.
 *
 * The angle is the angle between two points and orientation will be ignored.
 *
 * @proto dist = (obj)
 * @proto dist = (x, y)
 *
 * @param [WorldObject] object
 * @param float x
 * @param float y
 *
 * @return float angle : angle in radians in range 0..2*pi
 */
TSNumber<float> TSWorldObject::GetAngle(TSWorldObject _target,float x,float y)
{
    auto target = _target.obj;
#if defined TRINITY && !AZEROTHCORE
    if (target)
        return obj->GetAbsoluteAngle(target);
    else
    {
        return obj->GetAbsoluteAngle(x, y);
    }
#else
    if (target)
        return obj->GetAngle(target);
    else
    {
        return obj->GetAngle(x, y);
    }
#endif
}

void TSWorldObject::SendPacket(std::shared_ptr<TSWorldPacket> _data)
{
    SendPacket(*_data);
}

/**
 * Sends a [WorldPacket] to [Player]s in sight of the [WorldObject].
 *
 * @param [WorldPacket] packet
 */
void TSWorldObject::SendPacket(TSWorldPacket _data)
{
    auto data = _data.packet;
#ifdef CMANGOS
    obj->SendMessageToSet(*data, true);
#else
    obj->SendMessageToSet(data, true);
#endif
}

/**
 * Spawns a [GameObject] at specified location.
 *
 * @param uint32 entry : [GameObject] entry ID
 * @param float x
 * @param float y
 * @param float z
 * @param float o
 * @param uint32 respawnDelay = 30 : respawn time in seconds
 * @return [GameObject] gameObject
 */
TSGameObject  TSWorldObject::SummonGameObject(uint32 entry,float x,float y,float z,float o,uint32 respawnDelay)
{
#ifdef TRINITY
    QuaternionData rot = QuaternionData::fromEulerAnglesZYX(o, 0.f, 0.f);
    return TSGameObject(obj->SummonGameObject(entry, Position(x, y, z, o), rot, std::chrono::seconds(respawnDelay)));
#elif AZEROTHCORE
    return TSGameObject(obj->SummonGameObject(entry, x, y, z, o, 0, 0, 0, 0, respawnDelay));
#else
    return TSGameObject(obj->SummonGameObject(entry, x, y, z, o, std::chrono::seconds(respawnDelay)));
#endif
}

/**
 * Spawns the creature at specified location.
 *
 *     enum TempSummonType
 *     {
 *         TEMPSUMMON_TIMED_OR_DEAD_DESPAWN       = 1, // despawns after a specified time OR when the creature disappears
 *         TEMPSUMMON_TIMED_OR_CORPSE_DESPAWN     = 2, // despawns after a specified time OR when the creature dies
 *         TEMPSUMMON_TIMED_DESPAWN               = 3, // despawns after a specified time
 *         TEMPSUMMON_TIMED_DESPAWN_OUT_OF_COMBAT = 4, // despawns after a specified time after the creature is out of combat
 *         TEMPSUMMON_CORPSE_DESPAWN              = 5, // despawns instantly after death
 *         TEMPSUMMON_CORPSE_TIMED_DESPAWN        = 6, // despawns after a specified time after death
 *         TEMPSUMMON_DEAD_DESPAWN                = 7, // despawns when the creature disappears
 *         TEMPSUMMON_MANUAL_DESPAWN              = 8, // despawnswhen TSWorldObject::UnSummon() is called
 *         TEMPSUMMON_TIMED_OOC_OR_CORPSE_DESPAWN = 9, // despawns after a specified time (OOC) OR when the creature dies
 *         TEMPSUMMON_TIMED_OOC_OR_DEAD_DESPAWN   = 10 // despawns after a specified time (OOC) OR when the creature disappears
 *
 * @param uint32 entry : [Creature]'s entry ID
 * @param float x
 * @param float y
 * @param float z
 * @param float o
 * @param [TempSummonType] spawnType = MANUAL_DESPAWN : defines how and when the creature despawns
 * @param uint32 despawnTimer = 0 : despawn time in milliseconds
 * @return [Creature] spawnedCreature
 */
TSCreature  TSWorldObject::SpawnCreature(uint32 entry,float x,float y,float z,float o,uint32 spawnType,uint32 despawnTimer)
{

    TempSummonType type;
    switch (spawnType)
    {
        case 1:
            type = TEMPSUMMON_TIMED_OR_DEAD_DESPAWN;
            break;
        case 2:
            type = TEMPSUMMON_TIMED_OR_CORPSE_DESPAWN;
            break;
        case 3:
            type = TEMPSUMMON_TIMED_DESPAWN;
            break;
        case 4:
#if defined TRINITY || AZEROTHCORE
            type = TEMPSUMMON_TIMED_DESPAWN_OUT_OF_COMBAT;
#else
            type = TEMPSUMMON_TIMED_OOC_DESPAWN;
#endif
            break;
        case 5:
            type = TEMPSUMMON_CORPSE_DESPAWN;
            break;
        case 6:
            type = TEMPSUMMON_CORPSE_TIMED_DESPAWN;
            break;
        case 7:
            type = TEMPSUMMON_DEAD_DESPAWN;
            break;
        case 8:
            type = TEMPSUMMON_MANUAL_DESPAWN;
            break;
#if !defined TRINITY && !AZEROTHCORE
        case 9:
            type = TEMPSUMMON_TIMED_OOC_OR_CORPSE_DESPAWN;
            break;
        case 10:
            type = TEMPSUMMON_TIMED_OOC_OR_DEAD_DESPAWN;
            break;
#endif
    }
#ifdef TRINITY
    auto c = (Creature*) (obj->SummonCreature(entry, x, y, z, o, type, std::chrono::milliseconds(despawnTimer)));
#elif AZEROTHCORE
    auto c = (Creature*) (obj->SummonCreature(entry, Position(x, y, z, o), type, despawnTimer));
#endif
    return TSCreature(c);
}

/**
 * Returns true if the given [WorldObject] or coordinates are in the [WorldObject]'s line of sight
 *
 * @proto isInLoS = (worldobject)
 * @proto isInLoS = (x, y, z)
 *
 * @param [WorldObject] worldobject
 * @param float x
 * @param float y
 * @param float z
 * @return bool isInLoS
 */
bool TSWorldObject::IsWithinLoS(TSWorldObject _target,float x,float y,float z)
{
    auto target = _target.obj;

    if (target)
        return obj->IsWithinLOSInMap(target);
    else
    {
        return obj->IsWithinLOS(x, y, z);
    }
}

/**
 * Returns true if the [WorldObject]s are on the same map
 *
 * @param [WorldObject] worldobject
 * @return bool isInMap
 */
bool TSWorldObject::IsInMap(TSWorldObject _target)
{
    auto target = _target.obj;
    return obj->IsInMap(target);
}

/**
 * Returns true if the point is in the given distance of the [WorldObject]
 *
 * Notice that the distance is measured from the edge of the [WorldObject].
 *
 * @param float x
 * @param float y
 * @param float z
 * @param float distance
 * @return bool isInDistance
 */
bool TSWorldObject::IsWithinDist3d(float x,float y,float z,float dist)
{
    return obj->IsWithinDist3d(x, y, z, dist);
}

/**
 * Returns true if the point is in the given distance of the [WorldObject]
 *
 * The distance is measured only in x,y coordinates.
 * Notice that the distance is measured from the edge of the [WorldObject].
 *
 * @param float x
 * @param float y
 * @param float distance
 * @return bool isInDistance
 */
bool TSWorldObject::IsWithinDist2d(float x,float y,float dist)
{
    return obj->IsWithinDist2d(x, y, dist);
}

/**
 * Returns true if the target is in the given distance of the [WorldObject]
 *
 * Notice that the distance is measured from the edge of the [WorldObject]s.
 *
 * @param [WorldObject] target
 * @param float distance
 * @param bool is3D = true : if false, only x,y coordinates used for checking
 * @return bool isInDistance
 */
bool TSWorldObject::IsWithinDist(TSWorldObject _target,float distance,bool is3D)
{
    auto target = _target.obj;
    return obj->IsWithinDist(target, distance, is3D);
}

/**
 * Returns true if the [WorldObject] is on the same map and within given distance
 *
 * Notice that the distance is measured from the edge of the [WorldObject]s.
 *
 * @param [WorldObject] target
 * @param float distance
 * @param bool is3D = true : if false, only x,y coordinates used for checking
 * @return bool isInDistance
 */
bool TSWorldObject::IsWithinDistInMap(TSWorldObject _target,float distance,bool is3D)
{
    auto target = _target.obj;
    return obj->IsWithinDistInMap(target, distance, is3D);
}

/**
 * Returns true if the target is within given range
 *
 * Notice that the distance is measured from the edge of the [WorldObject]s.
 *
 * @param [WorldObject] target
 * @param float minrange
 * @param float maxrange
 * @param bool is3D = true : if false, only x,y coordinates used for checking
 * @return bool isInDistance
 */
bool TSWorldObject::IsInRange(TSWorldObject _target,float minrange,float maxrange,bool is3D)
{
    auto target = _target.obj;
    return obj->IsInRange(target, minrange, maxrange, is3D);
}

/**
 * Returns true if the point is within given range
 *
 * Notice that the distance is measured from the edge of the [WorldObject].
 *
 * @param float x
 * @param float y
 * @param float minrange
 * @param float maxrange
 * @return bool isInDistance
 */
bool TSWorldObject::IsInRange2d(float x,float y,float minrange,float maxrange)
{
    return obj->IsInRange2d(x, y, minrange, maxrange);
}

/**
 * Returns true if the point is within given range
 *
 * Notice that the distance is measured from the edge of the [WorldObject].
 *
 * @param float x
 * @param float y
 * @param float z
 * @param float minrange
 * @param float maxrange
 * @return bool isInDistance
 */
bool TSWorldObject::IsInRange3d(float x,float y,float z,float minrange,float maxrange)
{
    return obj->IsInRange3d(x, y, z, minrange, maxrange);
}

/**
 * Returns true if the target is in the given arc in front of the [WorldObject]
 *
 * @param [WorldObject] target
 * @param float arc = pi
 * @return bool isInFront
 */
bool TSWorldObject::IsInFront(TSWorldObject _target,float arc)
{
    auto target = _target.obj;

#ifdef MANGOS
    return obj->IsInFront(target, arc);
#else
    return obj->isInFront(target, arc);
#endif
}

/**
 * Returns true if the target is in the given arc behind the [WorldObject]
 *
 * @param [WorldObject] target
 * @param float arc = pi
 * @return bool isInBack
 */
bool TSWorldObject::IsInBack(TSWorldObject _target,float arc)
{
    auto target = _target.obj;

#ifdef MANGOS
    return obj->IsInBack(target, arc);
#else
    return obj->isInBack(target, arc);
#endif
}

/**
 * The [WorldObject] plays music to a [Player]
 *
 * If no [Player] provided it will play the music to everyone near.
 * This method does not interrupt previously played music.
 *
 * See also [WorldObject:PlayDistanceSound], [WorldObject:PlayDirectSound]
 *
 * @param uint32 music : entry of a music
 * @param [Player] player = nil : [Player] to play the music to
 */
void TSWorldObject::PlayMusic(uint32 musicid,TSPlayer _player)
{
    auto player = _player.player;

WorldPacket data(SMSG_PLAY_MUSIC, 4);
    data << uint32(musicid);
#ifdef CMANGOS
    if (player)
        player->SendDirectMessage(data);
    else
        obj->SendMessageToSet(data, true);
#else
    if (player)
        player->SendDirectMessage(&data);
    else
        obj->SendMessageToSet(&data, true);
#endif
}

/**
 * The [WorldObject] plays a sound to a [Player]
 *
 * If no [Player] provided it will play the sound to everyone near.
 * This method will play sound and does not interrupt prvious sound.
 *
 * See also [WorldObject:PlayDistanceSound], [WorldObject:PlayMusic]
 *
 * @param uint32 sound : entry of a sound
 * @param [Player] player = nil : [Player] to play the sound to
 */
void TSWorldObject::PlayDirectSound(uint32 soundId,TSPlayer _player)
{
    auto player = _player.player;

    if (player)
        obj->PlayDirectSound(soundId, player);
    else
        obj->PlayDirectSound(soundId);
}

/**
 * The [WorldObject] plays a sound to a [Player]
 *
 * If no [Player] it will play the sound to everyone near.
 * Sound will fade the further you are from the [WorldObject].
 * This method interrupts previously playing sound.
 *
 * See also [WorldObject:PlayDirectSound], [WorldObject:PlayMusic]
 *
 * @param uint32 sound : entry of a sound
 * @param [Player] player = nil : [Player] to play the sound to
 */
void TSWorldObject::PlayDistanceSound(uint32 soundId,TSPlayer _player)
{
    auto player = _player.player;

    if (player)
        obj->PlayDistanceSound(soundId, player);
    else
        obj->PlayDistanceSound(soundId);
}

// (From ElunaUtil.h/cpp)
// Doesn't get self
class WorldObjectInRangeCheck
{
public:
    WorldObjectInRangeCheck(bool nearest, WorldObject const* obj, float range,
        uint16 typeMask = 0, uint32 entry = 0, uint32 hostile = 0, uint32 dead = 0);
    WorldObject const& GetFocusObject() const;
    bool operator()(WorldObject* u);

    WorldObject const* const i_obj;
    Unit const* i_obj_unit;
    FactionTemplateEntry const* i_obj_fact;
    uint32 const i_hostile; // 0 both, 1 hostile, 2 friendly
    uint32 const i_entry;
    float i_range;
    uint16 const i_typeMask;
    uint32 const i_dead; // 0 both, 1 alive, 2 dead
    bool const i_nearest;
};

WorldObjectInRangeCheck::WorldObjectInRangeCheck(bool nearest, WorldObject const* obj, float range,
    uint16 typeMask, uint32 entry, uint32 hostile, uint32 dead) :
    i_obj(obj), i_obj_unit(nullptr), i_obj_fact(nullptr), i_hostile(hostile), i_entry(entry), i_range(range), i_typeMask(typeMask), i_dead(dead), i_nearest(nearest)
{
    i_obj_unit = i_obj->ToUnit();
    if (!i_obj_unit)
        if (GameObject const* go = i_obj->ToGameObject())
            i_obj_unit = go->GetOwner();
    if (!i_obj_unit)
        i_obj_fact = sFactionTemplateStore.LookupEntry(14);
}

WorldObject const& WorldObjectInRangeCheck::GetFocusObject() const
{
    return *i_obj;
}

bool WorldObjectInRangeCheck::operator()(WorldObject* u)
{
    if (i_typeMask && !u->isType(TypeMask(i_typeMask)))
        return false;
    if (i_entry && u->GetEntry() != i_entry)
        return false;
    if (i_obj->GetGUID() == u->GetGUID())
        return false;
    if (!i_obj->IsWithinDistInMap(u, i_range))
        return false;
    Unit const* target = u->ToUnit();
    if (!target)
        if (GameObject const* go = u->ToGameObject())
            target = go->GetOwner();
    if (target)
    {
#ifdef CMANGOS
        if (i_dead && (i_dead == 1) != target->isAlive())
            return false;
#else
        if (i_dead && (i_dead == 1) != target->IsAlive())
            return false;
#endif
        if (i_hostile)
        {
            if (!i_obj_unit)
            {
                if (i_obj_fact)
                {
#if defined TRINITY || AZEROTHCORE
                    if ((i_obj_fact->IsHostileTo(*target->GetFactionTemplateEntry())) != (i_hostile == 1))
                        return false;
#else
                    if ((i_obj_fact->IsHostileTo(*target->getFactionTemplateEntry())) != (i_hostile == 1))
                        return false;
#endif
                }
                else if (i_hostile == 1)
                    return false;
            }
            else if ((i_hostile == 1) != i_obj_unit->IsHostileTo(target))
                return false;
        }
    }
    if (i_nearest)
        i_range = i_obj->GetDistance(u);
    return true;
}

TSArray<TSCreature> TSWorldObject::GetCreaturesInRange(float range, uint32 entry, uint32 hostile, uint32 dead)
{
    TSArray<TSCreature> arr;
#if TRINITY
    std::list<Creature*> list;
    WorldObjectInRangeCheck checker(false, obj, range, TYPEMASK_UNIT, entry, hostile, dead);
    Trinity::CreatureListSearcher<WorldObjectInRangeCheck> searcher(obj, list, checker);
    Cell::VisitAllObjects(obj, searcher, range);
    for (std::list<Creature*>::const_iterator it = list.begin(); it != list.end(); ++it)
    {
        arr.push(TSCreature(*it));
    }
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetCreaturesInRange not implemented for AzerothCore.");
#endif
    return arr;
}

TSArray<TSUnit> TSWorldObject::GetUnitsInRange(float range, uint32 hostile, uint32 dead)
{
    TSArray<TSUnit> arr;
#if TRINITY
    std::list<Unit*> list;
    WorldObjectInRangeCheck checker(false, obj, range, TYPEMASK_UNIT, 0, hostile, dead);
    Trinity::UnitListSearcher<WorldObjectInRangeCheck> searcher(obj, list, checker);
    Cell::VisitAllObjects(obj, searcher, range);
    for (std::list<Unit*>::const_iterator it = list.begin(); it != list.end(); ++it)
    {
        arr.push(TSUnit(*it));
    }
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetUnitsInRange not implemented for AzerothCore.");
#endif
    return arr;
}

TSArray<TSPlayer> TSWorldObject::GetPlayersInRange(float range, uint32 hostile, uint32 dead)
{
    TSArray<TSPlayer> arr;
#if TRINITY
    std::list<Player*> list;
    WorldObjectInRangeCheck checker(false, obj, range, TYPEMASK_PLAYER, 0, hostile, dead);
    Trinity::PlayerListSearcher<WorldObjectInRangeCheck> searcher(obj, list, checker);
    Cell::VisitAllObjects(obj, searcher, range);
    for (std::list<Player*>::const_iterator it = list.begin(); it != list.end(); ++it)
    {
        arr.push(TSPlayer(*it));
    }
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetPlayersInRange not implemented for AzerothCore");
#endif
    return arr;
}

TSArray<TSGameObject> TSWorldObject::GetGameObjectsInRange(float range, uint32 entry, uint32 hostile)
{
    TSArray<TSGameObject> arr;
#if TRINITY
    std::list<GameObject*> list;
    WorldObjectInRangeCheck checker(false, obj, range, TYPEMASK_GAMEOBJECT, entry, hostile);
    Trinity::GameObjectListSearcher<WorldObjectInRangeCheck> searcher(obj, list, checker);
    Cell::VisitAllObjects(obj, searcher, range);
    for (std::list<GameObject*>::const_iterator it = list.begin(); it != list.end(); ++it)
    {
        arr.push(TSGameObject(*it));
    }
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetGameObjectsInRange not implemented for AzerothCore");
#endif
    return arr;
}

TSPlayer TSWorldObject::GetNearestPlayer(float range, uint32 hostile, uint32 dead)
{
#if TRINITY
    Unit* target = NULL;
    WorldObjectInRangeCheck checker(true, obj, range, TYPEMASK_PLAYER, 0, hostile, dead);
    Trinity::UnitLastSearcher<WorldObjectInRangeCheck> searcher(obj, target, checker);
    Cell::VisitAllObjects(obj, searcher, range);
    return target ? TSPlayer(target->ToPlayer()) : TSPlayer(nullptr);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetNearestPlayer not implemented for AzerothCore");
    return TSPlayer(nullptr);
#endif
}

TSGameObject TSWorldObject::GetNearestGameObject(float range, uint32 entry, uint32 hostile)
{
#if TRINITY
    GameObject* target = NULL;
    WorldObjectInRangeCheck checker(true, obj, range, TYPEMASK_GAMEOBJECT, entry, hostile);
    Trinity::GameObjectLastSearcher<WorldObjectInRangeCheck> searcher(obj, target, checker);
    Cell::VisitAllObjects(obj, searcher, range);
    return target ? TSGameObject(target->ToGameObject()) : TSGameObject(nullptr);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetNearestGameObject not implemented for AzerothCore");
    return TSGameObject(nullptr);
#endif
}

TSCreature TSWorldObject::GetNearestCreature(float range, uint32 entry, uint32 hostile, uint32 dead)
{
#if TRINITY
    Unit* target = NULL;
    WorldObjectInRangeCheck checker(true, obj, range, TYPEMASK_UNIT, entry, hostile);
    Trinity::UnitLastSearcher<WorldObjectInRangeCheck> searcher(obj, target, checker);
    Cell::VisitAllObjects(obj, searcher, range);
    return target ? TSCreature(target->ToCreature()) : TSCreature(nullptr);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::GetNearestCreate not implemented for AzerothCore");
    return TSCreature(nullptr);
#endif
}

TSGameObject TSWorldObject::GetGameObject(uint64 guid)
{
    return TSGameObject(ObjectAccessor::GetGameObject(*obj,ObjectGuid(guid)));
}

TSCorpse TSWorldObject::GetCorpse(uint64 guid)
{
    return TSCorpse(ObjectAccessor::GetCorpse(*obj,ObjectGuid(guid)));
}

TSUnit TSWorldObject::GetUnit(uint64 guid)
{
    return TSUnit(ObjectAccessor::GetUnit(*obj,ObjectGuid(guid)));
}

TSCreature TSWorldObject::GetCreature(uint64 guid)
{
    return TSCreature(ObjectAccessor::GetCreature(*obj,ObjectGuid(guid)));
}

TSPlayer TSWorldObject::GetPlayer(uint64 guid)
{
    return TSPlayer(ObjectAccessor::GetPlayer(*obj,ObjectGuid(guid)));
}

TSPosition TSWorldObject::GetPosition()
{
    return TSPosition(GetMap()->GetMapID(),GetX(),GetY(),GetZ(),GetO());
}

void TSWorldObject::RemovedByGroup(TSWorldObjectGroup * group)
{
    obj->m_tsGroups.erase(group);
}

void TSWorldObject::AddedByGroup(TSWorldObjectGroup * group)
{
    obj->m_tsGroups.insert(group);
}

TSCollisions* TSWorldObject::GetCollisions()
{
    return &obj->m_tsCollisions;
}

bool TSWorldObject::HasCollision(std::string const& id)
{
    return GetCollisions()->Contains(id);
}

void TSWorldObject::AddCollision(std::string const& id, float range, uint32_t minDelay, uint32_t maxHits, CollisionCallback callback)
{
    GetCollisions()->Add(id,range,minDelay,maxHits,callback);
}

TSCollisionEntry * TSWorldObject::GetCollision(std::string const& id)
{
    return GetCollisions()->Get(id);
}

TSCollisionEntry* TSCollisions::Get(std::string const& id)
{
    for(int i=0;i<callbacks.size();++i)
    {
        if((&callbacks[i])->name == id)
        {
            return &callbacks[i];
        }
    }
    return nullptr;
}

bool TSCollisions::Contains(std::string const& id)
{
    for(int i=0;i<callbacks.size();++i)
    {
        if((&callbacks[i])->name == id)
        {
            return true;
        }
    }
    return false;
}

TSCollisionEntry::TSCollisionEntry(std::string const& name, float range, uint32_t minDelay,uint32_t maxHits, CollisionCallback callback)
{
    this->name = name;
    this->callback = callback;
    this->range = range;
    this->maxHits = maxHits;
    this->minDelay = minDelay;
}

bool TSCollisionEntry::Tick(TSWorldObject value, bool force)
{
    uint64_t now = std::chrono::duration_cast<std::chrono::milliseconds>
    (std::chrono::high_resolution_clock::now().time_since_epoch()).count();

    if(!force && now-lastHit < minDelay)
    {
        return false;
    }
    else
    {
        lastHit = now;
    }

    auto units = value->GetUnitsInRange(this->range,0,0);

    uint32_t cancelMode = 0;
    for(auto &unit: *(units.vec))
    {
        uint32_t hits = 0;
        if(maxHits == 0)
        {

        }
        else if(!hitmap.contains(unit->GetGUID()))
        {
            hitmap.set(unit->GetGUID(),1);
        }
        else
        {
            hits = hitmap.get(unit->GetGUID());
            hitmap.set(unit->GetGUID(),hits+1);
        }

        if(maxHits == 0 || hits < maxHits)
        {
            callback(value,unit,TSMutableNumber<uint32>(&cancelMode), this);
            if(cancelMode == 2)
            {
                return true;
            }

            if(cancelMode == 3)
            {
                return false;
            }
        }
    }
    return cancelMode == 1;
}

TSCollisionEntry* TSCollisions::Add(std::string const& id, float range, uint32_t minDelay, uint32_t maxHits, CollisionCallback callback)
{
    for(int i=0;i<callbacks.size();++i)
    {
        if((&(callbacks[i]))->name == id)
        {
            return &(callbacks[i] = TSCollisionEntry(id,range,minDelay,maxHits,callback));
        }
    }
    callbacks.push_back(TSCollisionEntry(id,range,minDelay,maxHits,callback));
    return &(callbacks[callbacks.size()-1]);
}

void TSCollisions::Tick(TSWorldObject obj)
{
    auto iter = callbacks.begin();
    while(iter!=callbacks.end())
    {
        if(iter->Tick(obj, false))
        {
            iter = callbacks.erase(iter);
        }
        else
        {
            ++iter;
        }
    }
}

bool TSWorldObject::operator< (const TSWorldObject& e) const {
    return obj < e.obj;
}

void TSWorldObject::SetActive(bool active)
{
    obj->setActive(active);
}

bool TSWorldObject::IsActive()
{
    return obj->isActiveObject();
}

bool TSWorldObject::IsFriendlyTo(TSWorldObject object)
{
#if TRINITY
    return obj->IsFriendlyTo(object.obj);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::IsFriendlyTo not implemented for AzerothCore");
    return true;
#endif
}

bool TSWorldObject::IsHostileTo(TSWorldObject object)
{
#if TRINITY
    return obj->IsHostileTo(object.obj);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::IsHostileTo not implemented for AzerothCore");
    return false;
#endif
}

bool TSWorldObject::IsFriendlyToPlayers()
{
#if TRINITY
    return !obj->IsHostileToPlayers();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::IsFriendlyToPlayers not implemented for AzerothCore");
    return true;
#endif

}

bool TSWorldObject::IsHostileToPlayers()
{
#if TRINITY
    return obj->IsHostileToPlayers();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::IsHostileToPlayers not implemented for AzerothCore");
    return false;
#endif
}

bool TSWorldObject::IsNeutralToAll()
{
#if TRINITY
    return obj->IsNeutralToAll();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::IsNeutralToAll not implemented for AzerothCore");
    return false;
#endif
}

/**
 * Makes the [WorldObject] cast the spell on the target.
 *
 * @param [Unit] target = nil : can be self or another unit
 * @param uint32 spell : entry of a spell
 * @param bool triggered = false : if true the spell is instant and has no cost
 */
TSNumber<uint32> TSWorldObject::CastSpell(TSWorldObject _target, uint32 spell, bool triggered)
{
#if TRINITY
    return obj->CastSpell(_target.obj, spell, triggered);
#elif AZEROTHCORE
    if (!_target.IsNull() && !_target.IsUnit())
    {
        TS_LOG_ERROR("tswow.api", "TSWorldObject::CastSpell not implemented for GameObject targets on AzerothCore.");
        return SPELL_FAILED_UNKNOWN;
    }
    Unit* target = _target.obj->ToUnit();

    if (Unit * unit = obj->ToUnit())
    {
        return unit->CastSpell(target, spell, triggered);
    }

    if (GameObject* gobj = obj->ToGameObject())
    {
        if (triggered)
        {
            TS_LOG_ERROR("tswow.api", "TSWorldObject::CastSpell 'triggered' parameter not implemented for AzerothCore.");
        }
        gobj->CastSpell(target, spell);
        return SPELL_FAILED_SUCCESS;
    }
#endif
}

/**
 * Makes the [Unit] cast the spell to the given coordinates, used for area effect spells.
 *
 * @param float x
 * @param float y
 * @param float z
 * @param uint32 spell : entry of a spell
 * @param bool triggered = false : if true the spell is instant and has no cost
 */
TSNumber<uint32> TSWorldObject::CastSpellAoF(float _x, float _y, float _z, uint32 spell, bool triggered)
{
#if AZEROTHCORE
    if (Unit* unit = obj->ToUnit())
    {
        // SpellCastResult Unit::CastSpell(float x, float y, float z, uint32 spellId, bool triggered, Item* castItem, AuraEffect const* triggeredByAura, ObjectGuid originalCaster)
        return unit->CastSpell(_x, _y, _z, spell, triggered);
    }

    if (GameObject* gobj = obj->ToGameObject())
    {
        TS_LOG_ERROR("tswow.api", "TSWorldObject::CastSpellAoF not implemented for AzerothCore");
        return 0;
    }
#elif TRINITY
    CastSpellExtraArgs args;
    if (triggered)
        args.TriggerFlags = TRIGGERED_FULL_MASK;
    return obj->CastSpell(Position(_x, _y, _z), spell, args);
#endif
}

/**
 * Casts the [Spell] at target [Unit] with custom basepoints or casters.
 * See also [Unit:CastSpell].
 *
 * @param [Unit] target = nil
 * @param uint32 spell
 * @param bool triggered = false
 * @param int32 bp0 = nil : custom basepoints for [Spell] effect 1. If nil, no change is made
 * @param int32 bp1 = nil : custom basepoints for [Spell] effect 2. If nil, no change is made
 * @param int32 bp2 = nil : custom basepoints for [Spell] effect 3. If nil, no change is made
 * @param [Item] castItem = nil
 * @param uint64 originalCaster = 0
 */
TSNumber<uint32> TSWorldObject::CastCustomSpell(
      TSWorldObject _target
    , uint32 spell
    , bool triggered
    , int32 bp0
    , int32 bp1
    , int32 bp2
    , TSItem _castItem
    , uint64 originalCaster
) {
    auto target = _target.obj;
    auto castItem = _castItem.item;
    bool has_bp0 = bp0 != 0;
    bool has_bp1 = bp1 != 0;
    bool has_bp2 = bp2 != 0;

#ifdef TRINITY
    CastSpellExtraArgs args;
    if (has_bp0)
        args.AddSpellMod(SPELLVALUE_BASE_POINT0, bp0);
    if (has_bp1)
        args.AddSpellMod(SPELLVALUE_BASE_POINT1, bp1);
    if (has_bp2)
        args.AddSpellMod(SPELLVALUE_BASE_POINT2, bp2);
    if (triggered)
        args.TriggerFlags = TRIGGERED_FULL_MASK;
    if (castItem)
        args.SetCastItem(castItem);
    if (originalCaster)
        args.SetOriginalCaster(ObjectGuid(originalCaster));
    return obj->CastSpell(target, spell, args);
#else
    if (Unit* unit = obj->ToUnit())
    {
        if (Unit* unitTarget = target->ToUnit())
        {
            CustomSpellValues args;
            if (has_bp0)
                args.AddSpellMod(SPELLVALUE_BASE_POINT0, bp0);

            if (has_bp1)
                args.AddSpellMod(SPELLVALUE_BASE_POINT0, bp1);

            if (has_bp2)
                args.AddSpellMod(SPELLVALUE_BASE_POINT0, bp2);
            return unit->CastCustomSpell(
                spell
                , args
                , unitTarget
                , triggered
                    ? TriggerCastFlags::TRIGGERED_FULL_MASK
                    : TriggerCastFlags::TRIGGERED_NONE
                , castItem
            );
        }
    }

    if (GameObject * gobj = obj->ToGameObject())
    {
        TS_LOG_ERROR("tswow.api", "TSWorldObject::CastCustomSpell not implemented for GameObjects with AzerothCore.");
        return SPELL_FAILED_UNKNOWN;
    }

    if (GameObject * gobj = target->ToGameObject())
    {
        TS_LOG_ERROR("tswow.api", "TSWorldObject::CastCustomSpell not implemented for GameObjects with AzerothCore.");
        return SPELL_FAILED_UNKNOWN;
    }
#endif
}

void TSWorldObject::DoDelayed(std::function<void(TSWorldObject, TSMainThreadContext)> callback)
{
#if TRINITY
    obj->m_delayedCallbacks.push_back(callback);
    obj->GetMap()->m_delayedGuids.insert(obj->GetGUID());
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::DoDelayed not implemented on AzerothCore");
#endif
}


void TSWorldObject::LDoDelayed(sol::protected_function callback)
{
#if TRINITY
    obj->m_delayedLuaCallbacks.push_back(callback);
    obj->GetMap()->m_delayedGuids.insert(obj->GetGUID());
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldObject::DoDelayed not implemented on AzerothCore");
#endif
}

TS_CLASS_DEFINITION(TSMutableWorldObject, WorldObject, m_obj)
TSWorldObject TSMutableWorldObject::get()
{
    return TSWorldObject(m_obj);
}
void TSMutableWorldObject::set(TSWorldObject value)
{
    m_obj = value.obj;
}

TS_CLASS_DEFINITION(TSWorldObjectCollection, std::list<WorldObject*>, m_info)

void TSWorldObjectCollection::filterInPlace(std::function<bool(TSWorldObject)> callback)
{
    auto itr = m_info->begin();
    while (itr != m_info->end())
    {
        if (!callback(TSWorldObject(*itr)))
        {
            itr = m_info->erase(itr);
        }
        else
        {
            itr++;
        }
    }
}

TSNumber<uint32> TSWorldObjectCollection::get_length()
{
    return m_info->size();
}

TSWorldObject TSWorldObjectCollection::get(uint32 index)
{
    auto front = m_info->begin();
    std::advance(front, 4);
    return TSWorldObject(*front);
}

void TSWorldObjectCollection::forEach(std::function<void(TSWorldObject)> callback)
{
    for (WorldObject* obj : *m_info)
    {
        callback(TSWorldObject(obj));
    }
}

TSWorldObject TSWorldObjectCollection::find(std::function<bool(TSWorldObject)> callback)
{
    for (WorldObject* obj : *m_info)
    {
        if (callback(obj))
        {
            return TSWorldObject(obj);
        }
    }
    return TSWorldObject(nullptr);
}


TSFactionTemplate TSWorldObject::GetFactionTemplate()
{
    return TSFactionTemplate(obj->GetFactionTemplateEntry());
}


TSLua::Array<TSCreature> TSWorldObject::LGetCreaturesInRange(float range, uint32 entry, uint32 hostile, uint32 dead)
{
    return sol::as_table(*GetCreaturesInRange(range,entry,hostile,dead).vec);
}

TSLua::Array<TSUnit> TSWorldObject::LGetUnitsInRange(float range, uint32 hostile, uint32 dead)
{
    return sol::as_table(*GetUnitsInRange(range,hostile,dead).vec);
}

TSLua::Array<TSGameObject> TSWorldObject::LGetGameObjectsInRange(float range, uint32 entry, uint32 hostile)
{
    return sol::as_table(*GetGameObjectsInRange(range,entry,hostile).vec);
}

TSLua::Array<TSPlayer> TSWorldObject::LGetPlayersInRange(float range, uint32 hostile, uint32 dead)
{
    return sol::as_table(*GetPlayersInRange(range,hostile,dead).vec);
}