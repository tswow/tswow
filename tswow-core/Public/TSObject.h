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
    float GetScale();
    uint32 GetEntry();
    uint64 GetGUID();
    uint32 GetGUIDLow();
    uint8 GetTypeID();
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

    uint8 GetCoreByte(uint16 index, uint8 offset);
    int32 GetCoreInt32(uint16 index);
    uint32 GetCoreUInt32(uint16 index);
    float GetCoreFloat(uint16 index);
    uint16 GetCoreUInt16(uint16 index, uint8 offset);
    uint64 GetCoreUInt64(uint16 index);

    template <typename T> T GetUpdateField(uint16 index, uint8 offset);
    template <typename T> T GetUpdateField(uint16 index);

    template <typename T> void SetUpdateField(uint16 index, uint8 offset, T value);
    template <typename T> void SetUpdateField(uint16 index, T value);

    // Note: commented out fields are never used, do not enable unless core changes
    template <> uint8 GetUpdateField<uint8>(uint16 index, uint8 offset) { return GetCoreByte(index, offset); }
    template <> uint8 GetUpdateField<uint8>(uint16 index) { return GetCoreByte(index, 0); }
    //template <> int8 GetUpdateField<int8>(uint16 index, uint8 offset) { return GetCoreInt8(index, offset); }
    //template <> int8 GetUpdateField<int8>(uint16 index) { return GetCoreInt8(index, 0); }
    template <> uint16 GetUpdateField<uint16>(uint16 index, uint8 offset) { return GetCoreUInt16(index, offset); }
    template <> uint16 GetUpdateField<uint16>(uint16 index) { return GetCoreUInt16(index, 0); }
    //template <> int16 GetUpdateField<int16>(uint16 index, uint8 offset) { return GetCoreInt16(index, offset); }
    //template <> int16 GetUpdateField<int16>(uint16 index) { return GetCoreInt16(index, 0); }
    template <> uint32 GetUpdateField<uint32>(uint16 index) { return GetCoreUInt32(index); }
    template <> int32 GetUpdateField<int32>(uint16 index) { return GetCoreInt32(index); }
    template <> uint64 GetUpdateField<uint64>(uint16 index) { return GetCoreUInt64(index); }
    //template <> int64 GetUpdateField<int64>(uint16 index) { return GetCoreInt64(index); }
    template <> float GetUpdateField<float>(uint16 index) { return GetCoreFloat(index); }
    template <> void SetUpdateField<uint8>(uint16 index, uint8 offset, uint8 value) { SetCoreByte(index, offset, value); }
    template <> void SetUpdateField<uint8>(uint16 index, uint8 value) { SetCoreByte(index, 0, value); }
    //template <> void SetUpdateField<int8>(uint16 index, uint8 offset, int8 value) { SetCoreInt8(index, offset, value); }
    //template <> void SetUpdateField<int8>(uint16 index, int8 value) { SetCoreInt8(index, 0, value); }
    template <> void SetUpdateField<uint16>(uint16 index, uint8 offset, uint16 value) { SetCoreUInt16(index, offset, value); }
    template <> void SetUpdateField<uint16>(uint16 index, uint16 value) { SetCoreUInt16(index, 0, value); }
    //template <> void SetUpdateField<int16>(uint16 index, int16 value) { SetCoreInt16(index, 0, value); }
    template <> void SetUpdateField<uint32>(uint16 index, uint32 value) { SetCoreUInt32(index, value); }
    template <> void SetUpdateField<int32>(uint16 index, int32 value) { SetCoreInt32(index, value); }
    template <> void SetUpdateField<uint64>(uint16 index, uint64 value) { SetCoreUInt64(index, value); }
    //template <> void SetUpdateField<int64>(uint16 index, int64 value) { SetCoreInt64(index, value); }

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
