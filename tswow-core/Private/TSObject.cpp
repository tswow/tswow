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

#include "TSIncludes.h"
#include "TSObject.h"
#include "TSGameObject.h"
#include "TSPlayer.h"
#include "TSCreature.h"
#include "TSUnit.h"
#include "TSCorpse.h"

#include "Player.h"
#include "GameObject.h"
#include "Creature.h"
#include "Unit.h"
#include "Corpse.h"
#include "Item.h"
#include "ObjectGuid.h"

TSObject::TSObject(Object *objIn)
    : TSEntityProvider(&objIn->m_tsEntity)
    , obj(objIn)
{
}

TSObject::TSObject()
    : TSEntityProvider(nullptr)
{
}

/**
 * Returns `true` if the specified flag is set, otherwise `false`.
 *
 * @param uint16 index : the index of the flags data in the [Object]
 * @param uint32 flag : the flag to check for in the flags data
 * @return bool hasFlag
 */
bool TSObject::HasFlag(uint16 index,uint32 flag)
{
    return obj->HasFlag(index, flag);
}

/**
 * Returns `true` if the [Object] has been added to its [Map], otherwise `false`.
 *
 * @return bool inWorld
 */
bool TSObject::IsInWorld()
{
    return obj->IsInWorld();
}

/**
 * Returns the data at the specified index, casted to a signed 32-bit integer.
 *
 * @param uint16 index
 * @return int32 value
 */
TSNumber<int32> TSObject::GetCoreInt32(uint16 index)
{
    return obj->GetInt32Value(index);
}

/**
 * Returns the data at the specified index, casted to a unsigned 32-bit integer.
 *
 * @param uint16 index
 * @return uint32 value
 */
TSNumber<uint32> TSObject::GetCoreUInt32(uint16 index)
{
    return obj->GetUInt32Value(index);
}

/**
 * Returns the data at the specified index, casted to a single-precision floating point value.
 *
 * @param uint16 index
 * @return float value
 */
TSNumber<float> TSObject::GetCoreFloat(uint16 index)
{
    return obj->GetFloatValue(index);
}

/**
 * Returns the data at the specified index and offset, casted to an unsigned 8-bit integer.
 *
 * E.g. if you want the second byte at index 10, you would pass in 1 as the offset.
 *
 * @param uint16 index
 * @param uint8 offset : should be 0, 1, 2, or 3
 * @return uint8 value
 */
TSNumber<uint8> TSObject::GetCoreByte(uint16 index,uint8 offset)
{
    return obj->GetByteValue(index, offset);
}

/**
 * Returns the data at the specified index and offset, casted to a signed 16-bit integer.
 *
 * E.g. if you want the second half-word at index 10, you would pass in 1 as the offset.
 *
 * @param uint16 index
 * @param uint8 offset : should be 0 or 1
 * @return uint16 value
 */
TSNumber<uint16> TSObject::GetCoreUInt16(uint16 index,uint8 offset)
{
    return obj->GetUInt16Value(index, offset);
}

/**
 * Returns the scale/size of the [Object].
 *
 * This affects the size of a [WorldObject] in-game, but [Item]s don't have a "scale".
 *
 * @return float scale
 */
TSNumber<float> TSObject::GetScale()
{
#ifndef AZEROTHCORE
    return obj->GetObjectScale();
#else
    return obj->GetFloatValue(OBJECT_FIELD_SCALE_X);
#endif
}

/**
 * Returns the entry of the [Object].
 *
 * [Player]s do not have an "entry".
 *
 * @return uint32 entry
 */
TSNumber<uint32> TSObject::GetEntry()
{
    if (obj == nullptr) return 0;
    return obj->GetEntry();
}

/**
 * Returns the GUID of the [Object].
 *
 * GUID is an unique identifier for the object.
 *
 * However on MaNGOS and cMangos creatures and gameobjects inside different maps can share
 * the same GUID but not on the same map.
 *
 * On TrinityCore this value is unique across all maps
 *
 * @return uint64 guid
 */
TSNumber<uint64> TSObject::GetGUID()
{
    return TS_GUID(obj->GetGUID());
}

/**
 * Returns the low-part of the [Object]'s GUID.
 *
 * On TrinityCore all low GUIDs are different for all objects of the same type.
 * For example creatures in instances are assigned new GUIDs when the Map is created.
 *
 * On MaNGOS and cMaNGOS low GUIDs are unique only on the same map.
 * For example creatures in instances use the same low GUID assigned for that spawn in the database.
 * This is why to identify a creature you have to know the instanceId and low GUID. See [Map:GetIntstanceId]
 *
 * @return uint32 guidLow
 */
TSNumber<uint32> TSObject::GetGUIDLow()
{
#ifdef TRINITY
    return obj->GetGUID().GetCounter();
#elif AZEROTHCORE
    return obj->GetGUID().GetCounter();
#endif
}

/**
 * Returns the TypeId of the [Object].
 *
 *     enum TypeID
 *     {
 *         TYPEID_OBJECT        = 0,
 *         TYPEID_ITEM          = 1,
 *         TYPEID_CONTAINER     = 2,
 *         TYPEID_UNIT          = 3,
 *         TYPEID_PLAYER        = 4,
 *         TYPEID_GAMEOBJECT    = 5,
 *         TYPEID_DYNAMICOBJECT = 6,
 *         TYPEID_CORPSE        = 7
 *
 * @return uint8 typeID
 */
TSNumber<uint8> TSObject::GetTypeID()
{
    return obj->GetTypeId();
}

/**
 * Returns the data at the specified index, casted to an unsigned 64-bit integer.
 *
 * @param uint16 index
 * @return uint64 value
 */
TSNumber<uint64> TSObject::GetCoreUInt64(uint16 index)
{
    return obj->GetUInt64Value(index);
}

/**
 * Sets the specified flag in the data value at the specified index.
 *
 * If the flag was already set, it remains set.
 *
 * To remove a flag, use [Object:RemoveFlag].
 *
 * @param uint16 index
 * @param uint32 value
 */
void TSObject::SetFlag(uint16 index,uint32 flag)
{

    obj->SetFlag(index, flag);
}

/**
 * Sets the data at the specified index to the given value, converted to a signed 32-bit integer.
 *
 * @param uint16 index
 * @param int32 value
 */
void TSObject::SetCoreInt32(uint16 index,int32 value)
{
    obj->SetInt32Value(index, value);
}

/**
 * Sets the data at the specified index to the given value, converted to an unsigned 32-bit integer.
 *
 * @param uint16 index
 * @param uint32 value
 */
void TSObject::SetCoreUInt32(uint16 index,uint32 value)
{
    obj->SetUInt32Value(index, value);
}

/**
 * Sets the data at the specified index to the given value, converted to an unsigned 32-bit integer.
 *
 * @param uint16 index
 * @param uint32 value
 */
void TSObject::UpdateCoreUInt32(uint16 index,uint32 value)
{
    obj->UpdateUInt32Value(index, value);
}

/**
 * Sets the data at the specified index to the given value, converted to a single-precision floating point value.
 *
 * @param uint16 index
 * @param float value
 */
void TSObject::SetCoreFloat(uint16 index,float value)
{

    obj->SetFloatValue(index, value);
}

/**
 * Sets the data at the specified index and offset to the given value, converted to an unsigned 8-bit integer.
 *
 * @param uint16 index
 * @param uint8 offset : should be 0, 1, 2, or 3
 * @param uint8 value
 */
void TSObject::SetCoreByte(uint16 index,uint8 offset,uint8 value)
{
    obj->SetByteValue(index, offset, value);
}

/**
 * Sets the data at the specified index to the given value, converted to an unsigned 16-bit integer.
 *
 * @param uint16 index
 * @param uint8 offset : should be 0 or 1
 * @param uint16 value
 */
void TSObject::SetCoreUInt16(uint16 index,uint8 offset,uint16 value)
{
    obj->SetUInt16Value(index, offset, value);
}

/**
 * Sets the [Object]'s scale/size to the given value.
 *
 * @param float scale
 */
void TSObject::SetScale(float size)
{

    obj->SetObjectScale(size);
}

/**
 * Sets the data at the specified index to the given value, converted to an unsigned 64-bit integer.
 *
 * @param uint16 index
 * @param uint64 value
 */
void TSObject::SetCoreUInt64(uint16 index,uint64 value)
{
    obj->SetUInt64Value(index, value);
}

/**
 * Removes a flag from the value at the specified index.
 *
 * @param uint16 index
 * @param uint32 flag
 */
void TSObject::RemoveFlag(uint16 index,uint32 flag)
{

    obj->RemoveFlag(index, flag);
}

TSPlayer TSObject::ToPlayer()
{
    return TSPlayer((Player*)obj);
}

TSUnit TSObject::ToUnit()
{
    return TSUnit((Unit*)obj);
}

TSWorldObject TSObject::ToWorldObject()
{
    return TSWorldObject((WorldObject*)obj);
}

TSGameObject TSObject::ToGameObject()
{
    return TSGameObject((GameObject*)obj);
}

TSCreature TSObject::ToCreature()
{
    return TSCreature((Creature*)obj);
}

TSCorpse TSObject::ToCorpse()
{
    return TSCorpse((Corpse*)obj);
}

bool TSObject::IsPlayer()
{
    return obj != nullptr && obj->IsPlayer();
}

bool TSObject::IsCreature()
{
#if TRINITY
    return obj != nullptr && obj->IsCreature();
#elif AZEROTHCORE
    return obj && obj->GetTypeId() == TYPEID_UNIT;
#endif
}

bool TSObject::IsUnit()
{
#if TRINITY
    return obj != nullptr && obj->IsUnit();
#elif AZEROTHCORE
    return IsCreature() || IsPlayer();
#endif
}

bool TSObject::IsGameObject()
{
#if TRINITY
    return obj != nullptr && obj->IsGameObject();
#elif AZEROTHCORE
    return obj && obj->isType(TYPEMASK_GAMEOBJECT);
#endif
}

bool TSObject::IsCorpse()
{
#if TRINITY
    return obj != nullptr && obj->IsCorpse();
#elif AZEROTHCORE
    return obj && obj->isType(TYPEMASK_CORPSE);
#endif
}

bool TSObject::operator==(TSObject& rhs)
{
    bool lnull = IsNull();
    bool rnull = rhs.IsNull();

    if(lnull || rnull)
    {
        return lnull == rnull;
    }

    return GetGUID() == rhs.GetGUID();
}

TSUnit TSObject::GetEffectiveOwner()
{
    if (!IsUnit()) return TSUnit(nullptr);
    std::set<ObjectGuid> guids;
    TSUnit cur = ToUnit();
    guids.insert(cur->unit->GetGUID());

    // todo: it should be more performant to access directly,
    // but this is what the internal functions seem to do.

    while (ObjectGuid guid = cur->unit->GetCharmerOrOwnerGUID())
    {
        cur->unit->GetCharmerOrOwner();
        if(!guids.insert(guid).second)
        {
            // it's loop
            return TSUnit(nullptr);
        }
        Unit* found = ObjectAccessor::GetUnit(*cur->unit, guid);
        if (!found) return TSUnit(nullptr);
        cur = TSUnit(found);
    }
    return cur;
}

TSItem TSObject::ToItem()
{
    return TSItem(IsItem() ? static_cast<Item*>(obj) : nullptr);
}

bool TSObject::IsItem()
{
    return obj->isType(TYPEMASK_ITEM);
}