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
#include "TSString.h"
#include "TSClasses.h"

class TC_GAME_API TSWorldPacket {
public:
    WorldPacket *packet;
    bool owner;

    TSWorldPacket();
    TSWorldPacket(uint16 opcode, uint32 res = 200);
    TSWorldPacket(WorldPacket *packet);
    TSWorldPacket* operator->() { return this;}
    ~TSWorldPacket();
    bool IsNull() { return packet == nullptr; }
    uint16 GetOpcode();
    uint32 GetSize();
    void SetOpcode(uint32 opcode);
    int8 ReadByte();
    uint8 ReadUByte();
    int16 ReadShort();
    uint16 ReadUShort();
    int32 ReadLong();
    uint32 ReadULong();
    float ReadFloat();
    double ReadDouble();
    uint64 ReadGUID();
    TSString ReadString();
    void WriteGUID(uint64 guid);
    void WriteString(TSString _val);
    void WriteByte(int8 byte);
    void WriteUByte(uint8 byte);
    void WriteShort(int16 _short);
    void WriteUShort(uint16 _ushort);
    void WriteLong(int32 _long);
    void WriteULong(uint32 _ulong);
    void WriteFloat(float _val);
    void WriteDouble(double _val);
};

namespace WorldPackets {
    namespace WorldState {
        class InitWorldStates;
    }
}
class TC_GAME_API TSWorldStatePacket
{
public:
    WorldPackets::WorldState::InitWorldStates* m_ws;
    TSWorldStatePacket(WorldPackets::WorldState::InitWorldStates* ws);
    void push(int32 variableId, int32 value);
    uint32 length();
    int32 GetVariable(uint32 index);
    int32 GetValue(uint32 index);
    void Remove(uint32 index);
    void Clear();
};
