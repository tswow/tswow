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
#include "GameObject.h"
#include "Map.h"

#include "TSIncludes.h"
#include "TSPlayer.h"
#include "TSGroup.h"
#include "TSWorldObject.h"
#include "TSGameObject.h"
#include "TSSpellInfo.h"
#include "TSGameObjectTemplate.h"
#include "SmartAI.h"


TSGameObject::TSGameObject(GameObject *go) : TSWorldObject(go)
{
    this->go = go;
}

TSGameObject::TSGameObject() : TSWorldObject()
{
    this->go = nullptr;
}

/**
 * Returns 'true' if the [GameObject] can give the specified [Quest]
 *
 * @param uint32 questId : quest entry Id to check
 * @return bool hasQuest
 */
bool TSGameObject::HasQuest(uint32 questId)
{

#if defined TRINITY
    return go->hasQuest(questId);
#else
    return go->HasQuest(questId);
#endif
}

/**
 * Returns 'true' if the [GameObject] is spawned
 *
 * @return bool isSpawned
 */
bool TSGameObject::IsSpawned()
{
    return go->isSpawned();
}

/**
 * Returns 'true' if the [GameObject] is a transport
 *
 * @return bool isTransport
 */
bool TSGameObject::IsTransport()
{
    return go->IsTransport();
}

/**
 * Returns 'true' if the [GameObject] is active
 *
 * @return bool isActive
 */
bool TSGameObject::IsActive()
{
    return go->isActiveObject();
}

/*int TSGameObject::IsDestructible(lua_State* L, GameObject* go) // TODO: Implementation core side
{
    return go->IsDestructibleBuilding();
}*/

/**
 * Returns display ID of the [GameObject]
 *
 * @return uint32 displayId
 */
TSNumber<uint32> TSGameObject::GetDisplayID()
{
    return go->GetDisplayId();
}

/**
 * Returns the [GameObject]'s owner's GUID.
 *
 * @return uint64 ownerGUID
 */
TSGUID TSGameObject::GetOwnerGUID()
{
    return TSGUID(go->GetOwnerGUID());
}

/**
 * Returns the state of a [GameObject]
 * Below are client side [GOState]s off of 3.3.5a
 *
 * <pre>
 * enum GOState
 * {
 *     GO_STATE_ACTIVE             = 0,                        // show in world as used and not reset (closed door open)
 *     GO_STATE_READY              = 1,                        // show in world as ready (closed door close)
 *     GO_STATE_ACTIVE_ALTERNATIVE = 2                         // show in world as used in alt way and not reset (closed door open by cannon fire)
 * </pre>
 *
 * @return [GOState] goState
 */
TSNumber<uint32> TSGameObject::GetGoState()
{
    return go->GetGoState();
}

/**
 * Returns the [LootState] of a [GameObject]
 * Below are [LootState]s off of 3.3.5a
 *
 * <pre>
 * enum LootState
 * {
 *     GO_NOT_READY = 0,
 *     GO_READY,                                               // can be ready but despawned, and then not possible activate until spawn
 *     GO_ACTIVATED,
 *     GO_JUST_DEACTIVATED
 * </pre>
 *
 * @return [LootState] lootState
 */
TSNumber<uint32> TSGameObject::GetLootState()
{
    return go->getLootState();
}

/**
 * Returns the [Player] that can loot the [GameObject]
 *
 * Not the original looter and may be nil.
 *
 * @return [Player] player
 */
TSPlayer  TSGameObject::GetLootRecipient()
{
     return TSPlayer(go->GetLootRecipient());
}

/**
 * Returns the [Group] that can loot the [GameObject]
 *
 * Not the original looter and may be nil.
 *
 * @return [Group] group
 */
TSGroup  TSGameObject::GetLootRecipientGroup()
{
#if defined TRINITY
     return TSGroup(go->GetLootRecipientGroup());
#else
     return TSGroup(go->GetGroupLootRecipient());
#endif
}

/**
 * Returns the guid of the [GameObject] that is used as the ID in the database
 *
 * @return uint32 dbguid
 */
TSNumber<uint32> TSGameObject::GetDBTableGUIDLow()
{
#ifdef TRINITY
    return go->GetSpawnId();
#else
    // on mangos based this is same as lowguid
    return go->GetGUIDLow();
#endif
}

/**
 * Sets the state of a [GameObject]
 *
 * <pre>
 * enum GOState
 * {
 *     GO_STATE_ACTIVE             = 0,                        // show in world as used and not reset (closed door open)
 *     GO_STATE_READY              = 1,                        // show in world as ready (closed door close)
 *     GO_STATE_ACTIVE_ALTERNATIVE = 2                         // show in world as used in alt way and not reset (closed door open by cannon fire)
 * </pre>
 *
 * @param [GOState] state : all available go states can be seen above
 */
void TSGameObject::SetGoState(uint32 state)
{

    if (state == 0)
        go->SetGoState(GO_STATE_ACTIVE);
    else if (state == 1)
        go->SetGoState(GO_STATE_READY);
    else if (state == 2)
    {
#ifdef TRINITY
        go->SetGoState(GO_STATE_DESTROYED);
#else
        go->SetGoState(GO_STATE_ACTIVE_ALTERNATIVE);
#endif
    }

}

/**
 * Sets the [LootState] of a [GameObject]
 * Below are [LootState]s off of 3.3.5a
 *
 * <pre>
 * enum LootState
 * {
 *     GO_NOT_READY = 0,
 *     GO_READY,                                               // can be ready but despawned, and then not possible activate until spawn
 *     GO_ACTIVATED,
 *     GO_JUST_DEACTIVATED
 * </pre>
 *
 * @param [LootState] state : all available loot states can be seen above
 */
void TSGameObject::SetLootState(uint32 state)
{

    if (state == 0)
        go->SetLootState(GO_NOT_READY);
    else if (state == 1)
        go->SetLootState(GO_READY);
    else if (state == 2)
        go->SetLootState(GO_ACTIVATED);
    else if (state == 3)
        go->SetLootState(GO_JUST_DEACTIVATED);

}

/**
 * Saves [GameObject] to the database
 *
 */
void TSGameObject::SaveToDB()
{
    go->SaveToDB();
}

/**
 * Removes [GameObject] from the world
 *
 * The object is no longer reachable after this and it is not respawned.
 *
 * @param bool deleteFromDB : if true, it will delete the [GameObject] from the database
 */
void TSGameObject::RemoveFromWorld(bool deldb)
{

    // cs_gobject.cpp copy paste
#if defined TRINITY
    ObjectGuid ownerGuid = go->GetOwnerGUID();
#else
    ObjectGuid ownerGuid = go->GetOwnerGuid();
#endif
    if (ownerGuid)
    {
        Unit* owner = eObjectAccessor()GetUnit(*go, ownerGuid);

        owner->RemoveGameObject(go, false);
    }

    if (deldb)
    {
#ifdef TRINITY
        GameObject::DeleteFromDB(go->GetSpawnId());
#else
        go->DeleteFromDB();
#endif
    }

    go->SetRespawnTime(0);
    go->Delete();

}

/**
 * Activates a door or a button/lever
 *
 * @param uint32 delay = 0 : cooldown time in seconds to restore the [GameObject] back to normal. 0 for infinite duration
 */
void TSGameObject::UseDoorOrButton(uint32 delay)
{

    go->UseDoorOrButton(delay);
}

/**
 * Despawns a [GameObject]
 *
 * The gameobject may be automatically respawned by the core
 */
void TSGameObject::Despawn(bool forced, uint32 delayMs, uint32 respawnSec)
{
    if (forced)
    {
        go->DespawnOrUnsummon(std::chrono::milliseconds(delayMs), std::chrono::seconds(respawnSec));
    }
    else
    {
        go->SetLootState(GO_JUST_DEACTIVATED);
    }
}

/**
 * Respawns a [GameObject]
 */
void TSGameObject::Respawn()
{
    go->Respawn();
}

/**
 * Sets the respawn or despawn time for the gameobject.
 *
 * Respawn time is also used as despawn time depending on gameobject settings
 *
 * @param int32 delay = 0 : cooldown time in seconds to respawn or despawn the object. 0 means never
 */
void TSGameObject::SetRespawnTime(int32 respawn)
{

    go->SetRespawnTime(respawn);
}

TSLoot TSGameObject::GetLoot()
{
    return TSLoot(&go->loot);
}

void TSGameObject::FireSmartEvent(uint32 e, TSUnit unit, uint32 var0, uint32 var1, bool bvar, TSSpellInfo spell, TSGameObject gobj)
{
#if TRINITY
    auto ai = go->AI();
    if (!ai) return;
    if (SmartAI* sai = dynamic_cast<SmartAI*>(ai))
    {
        sai->ProcessEventsFor(SMART_EVENT(e), unit.unit, var0, var1, bvar, spell.info, gobj.go);
    }
#endif
}

bool TSGameObject::IsAIEnabled()
{
    return go->AI();
}

TSGameObjectTemplate TSGameObject::GetTemplate()
{
    return TSGameObjectTemplate(const_cast<GameObjectTemplate*>(go->GetGOInfo()));
}

// Helper function for applying rotation changes
// Returns the new GameObject pointer after reload, or nullptr on failure
static GameObject* ApplyRotationChange(GameObject* go, float yaw, float pitch, float roll)
{
    // Based on HandleGameObjectTurnCommand from cs_gobject.cpp
    ObjectGuid::LowType guidLow = go->GetSpawnId();
    Map* map = go->GetMap();
    
    // Update position and rotation
    go->Relocate(go->GetPositionX(), go->GetPositionY(), go->GetPositionZ(), yaw);
    go->SetLocalRotationAngles(yaw, pitch, roll);
    go->SaveToDB();
    
    // Delete and reload to avoid client caching issues
    // 3.3.5a client caches recently deleted objects and brings them back to life
    // when CreateObject block for this guid is received again
    // however it entirely skips parsing that block and only uses already known location
    go->Delete();
    
    GameObject* newObject = new GameObject();
    if (!newObject->LoadFromDB(guidLow, map, true))
    {
        delete newObject;
        return nullptr;
    }
    
    return newObject;
}

/**
 * Gets the yaw (Z-axis rotation) of the [GameObject]
 *
 * @return float yaw : yaw in radians
 */
TSNumber<float> TSGameObject::GetYaw()
{
    return go->GetOrientation();
}

/**
 * Gets the pitch (Y-axis rotation) of the [GameObject]
 *
 * @return float pitch : pitch in radians
 */
TSNumber<float> TSGameObject::GetPitch()
{
    float yaw, pitch, roll;
    go->GetLocalRotation().toEulerAnglesZYX(yaw, pitch, roll);
    return pitch;
}

/**
 * Gets the roll (X-axis rotation) of the [GameObject]
 *
 * @return float roll : roll in radians
 */
TSNumber<float> TSGameObject::GetRoll()
{
    float yaw, pitch, roll;
    go->GetLocalRotation().toEulerAnglesZYX(yaw, pitch, roll);
    return roll;
}

/**
 * Sets the absolute rotation of the [GameObject]
 *
 * @param float yaw : yaw (Z-axis) in radians
 * @param float pitch = 0.0f : pitch (Y-axis) in radians
 * @param float roll = 0.0f : roll (X-axis) in radians
 */
void TSGameObject::SetRotation(float yaw, float pitch, float roll)
{
    go = ApplyRotationChange(go, yaw, pitch, roll);
}

/**
 * Sets the yaw (Z-axis rotation) of the [GameObject]
 *
 * @param float yaw : yaw in radians
 */
void TSGameObject::SetYaw(float yaw)
{
    float currentYaw, pitch, roll;
    go->GetLocalRotation().toEulerAnglesZYX(currentYaw, pitch, roll);
    SetRotation(yaw, pitch, roll);
}

/**
 * Sets the pitch (Y-axis rotation) of the [GameObject]
 *
 * @param float pitch : pitch in radians
 */
void TSGameObject::SetPitch(float pitch)
{
    float yaw, currentPitch, roll;
    go->GetLocalRotation().toEulerAnglesZYX(yaw, currentPitch, roll);
    SetRotation(yaw, pitch, roll);
}

/**
 * Sets the roll (X-axis rotation) of the [GameObject]
 *
 * @param float roll : roll in radians
 */
void TSGameObject::SetRoll(float roll)
{
    float yaw, pitch, currentRoll;
    go->GetLocalRotation().toEulerAnglesZYX(yaw, pitch, currentRoll);
    SetRotation(yaw, pitch, roll);
}

/**
 * Rotates the [GameObject] by the specified deltas (relative rotation)
 *
 * @param float deltaYaw : change in yaw (Z-axis) in radians
 * @param float deltaPitch = 0.0f : change in pitch (Y-axis) in radians
 * @param float deltaRoll = 0.0f : change in roll (X-axis) in radians
 */
void TSGameObject::Rotate(float deltaYaw, float deltaPitch, float deltaRoll)
{
    float currentYaw, currentPitch, currentRoll;
    go->GetLocalRotation().toEulerAnglesZYX(currentYaw, currentPitch, currentRoll);
    SetRotation(currentYaw + deltaYaw, currentPitch + deltaPitch, currentRoll + deltaRoll);
}

/**
 * Rotates the [GameObject] yaw (Z-axis) by the specified delta
 *
 * @param float delta : change in yaw in radians
 */
void TSGameObject::RotateYaw(float delta)
{
    float currentYaw, pitch, roll;
    go->GetLocalRotation().toEulerAnglesZYX(currentYaw, pitch, roll);
    SetRotation(currentYaw + delta, pitch, roll);
}

/**
 * Rotates the [GameObject] pitch (Y-axis) by the specified delta
 *
 * @param float delta : change in pitch in radians
 */
void TSGameObject::RotatePitch(float delta)
{
    float yaw, currentPitch, roll;
    go->GetLocalRotation().toEulerAnglesZYX(yaw, currentPitch, roll);
    SetRotation(yaw, currentPitch + delta, roll);
}

/**
 * Rotates the [GameObject] roll (X-axis) by the specified delta
 *
 * @param float delta : change in roll in radians
 */
void TSGameObject::RotateRoll(float delta)
{
    float yaw, pitch, currentRoll;
    go->GetLocalRotation().toEulerAnglesZYX(yaw, pitch, currentRoll);
    SetRotation(yaw, pitch, currentRoll + delta);
}

// Helper function for applying position changes
// Returns the new GameObject pointer after reload, or nullptr on failure
static GameObject* ApplyPositionChange(GameObject* go, float x, float y, float z, bool preserveOrientation)
{
    // Based on HandleGameObjectMoveCommand from cs_gobject.cpp
    ObjectGuid::LowType guidLow = go->GetSpawnId();
    Map* map = go->GetMap();
    
    // Create new position, preserving orientation if requested
    Position pos(x, y, z, preserveOrientation ? go->GetOrientation() : 0.0f);
    go->Relocate(pos);
    
    // Update which cell has this gameobject registered for loading
    sObjectMgr->RemoveGameobjectFromGrid(guidLow, go->GetGameObjectData());
    go->SaveToDB();
    sObjectMgr->AddGameobjectToGrid(guidLow, go->GetGameObjectData());
    
    // Delete and reload to avoid client caching issues
    go->Delete();
    
    GameObject* newObject = new GameObject();
    if (!newObject->LoadFromDB(guidLow, map, true))
    {
        delete newObject;
        return nullptr;
    }
    
    return newObject;
}

/**
 * Sets the absolute position of the [GameObject]
 *
 * @param float x : X coordinate
 * @param float y : Y coordinate
 * @param float z : Z coordinate
 * @param bool preserveOrientation : whether to keep current orientation (default: true)
 */
void TSGameObject::SetPosition(float x, float y, float z, bool preserveOrientation)
{
    go = ApplyPositionChange(go, x, y, z, preserveOrientation);
}

/**
 * Sets the X coordinate of the [GameObject]
 *
 * @param float x : X coordinate
 */
void TSGameObject::SetX(float x)
{
    SetPosition(x, go->GetPositionY(), go->GetPositionZ(), true);
}

/**
 * Sets the Y coordinate of the [GameObject]
 *
 * @param float y : Y coordinate
 */
void TSGameObject::SetY(float y)
{
    SetPosition(go->GetPositionX(), y, go->GetPositionZ(), true);
}

/**
 * Sets the Z coordinate of the [GameObject]
 *
 * @param float z : Z coordinate
 */
void TSGameObject::SetZ(float z)
{
    SetPosition(go->GetPositionX(), go->GetPositionY(), z, true);
}

/**
 * Moves the [GameObject] by the specified deltas (relative movement)
 *
 * @param float dx : change in X coordinate
 * @param float dy : change in Y coordinate
 * @param float dz : change in Z coordinate
 */
void TSGameObject::Move(float dx, float dy, float dz)
{
    SetPosition(go->GetPositionX() + dx, go->GetPositionY() + dy, go->GetPositionZ() + dz, true);
}

/**
 * Moves the [GameObject] along the X axis by the specified delta
 *
 * @param float dx : change in X coordinate
 */
void TSGameObject::MoveX(float dx)
{
    SetPosition(go->GetPositionX() + dx, go->GetPositionY(), go->GetPositionZ(), true);
}

/**
 * Moves the [GameObject] along the Y axis by the specified delta
 *
 * @param float dy : change in Y coordinate
 */
void TSGameObject::MoveY(float dy)
{
    SetPosition(go->GetPositionX(), go->GetPositionY() + dy, go->GetPositionZ(), true);
}

/**
 * Moves the [GameObject] along the Z axis by the specified delta
 *
 * @param float dz : change in Z coordinate
 */
void TSGameObject::MoveZ(float dz)
{
    SetPosition(go->GetPositionX(), go->GetPositionY(), go->GetPositionZ() + dz, true);
}
