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

/***
 * A basic game object (either an [Item] or a [WorldObject]).
 *
 * Objects in MaNGOS/Trinity are stored an a giant block of "values".
 * Subclasses of Object, like [WorldObject], extend the block with more data specific to that subclass.
 * Further subclasses, like [Player], extend it even further.
 *
 * A detailed map of all the fields in this data block can be found in the UpdateFields.h file of your emulator
 *   (it varies depending on the expansion supported).
 *
 * The GetValue methods in this class (e.g. [Object:GetInt32Value]) provide low-level access to the data block.
 * Other methods, like [Object:HasFlag] and [Object:GetScale], merely wrap the GetValue methods and provide a simpler interface.
 *
 * Inherits all methods from: none
 */

#include "TSMain.h"
#include "TSClasses.h"
#include "TSEntity.h"

class TSPlayer;
class TSUnit;
class TSGameObject;
class TSWorldObject;
class TSCreature;
class TSCorpse;

class TC_GAME_API TSObject: public TSEntityProvider {
public:
    Object* obj;
    TSObject(Object* obj);
    TSObject();
    TSObject* operator->() { return this;}
    operator bool() const { return obj != nullptr; }
    bool operator==(TSObject const& rhs) { return obj == rhs.obj; }
    bool IsNull() { return obj == nullptr; };
    bool IsInWorld();
    TSNumber<float> GetScale();
    TSNumber<uint32> GetEntry();
    TSNumber<uint64> GetGUID();
    TSNumber<uint32> GetGUIDLow();
    TSNumber<uint8> GetTypeID();
    void SetScale(float size);

    void SetFlag(uint16 index, uint32 flag);
    void RemoveFlag(uint16 index, uint32 flag);
    bool HasFlag(uint16 index, uint32 flag);

    void SetCoreInt32(uint16 index, int32 value);
    void SetCoreUInt32(uint16 index, uint32 value);
    void UpdateCoreUInt32(uint16 index, uint32 value);
    void SetCoreFloat(uint16 index, float value);
    void SetCoreByte(uint16 index, uint8 offset, uint8 value);
    void SetCoreUInt16(uint16 index, uint8 offset, uint16 value);
    void SetCoreUInt64(uint16 index, uint64 value);

    TSNumber<uint8> GetCoreByte(uint16 index, uint8 offset);
    TSNumber<int32> GetCoreInt32(uint16 index);
    TSNumber<uint32> GetCoreUInt32(uint16 index);
    TSNumber<float> GetCoreFloat(uint16 index);
    TSNumber<uint16> GetCoreUInt16(uint16 index, uint8 offset);
    TSNumber<uint64> GetCoreUInt64(uint16 index);

    TSPlayer ToPlayer();
    TSUnit ToUnit();
    TSCreature ToCreature();
    TSWorldObject ToWorldObject();
    TSGameObject ToGameObject();
    TSCorpse ToCorpse();
    TSItem ToItem();
    TSUnit GetEffectiveOwner();

    bool IsPlayer();
    bool IsGameObject();
    bool IsCreature();
    bool IsUnit();
    bool IsCorpse();
    bool IsItem();

    bool operator==(TSObject& rhs);
};
