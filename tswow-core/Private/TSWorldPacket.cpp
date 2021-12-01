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
#include "WorldPacket.h"
#include "WorldStatePackets.h"

#include "TSIncludes.h"
#include "TSWorldPacket.h"

TSWorldPacket::TSWorldPacket(WorldPacket *packet)
{
    this->packet = packet;
    this->owner = false;
}

TSWorldPacket::TSWorldPacket()
{
    this->packet = nullptr;
    this->owner = false;
}

TSWorldPacket::TSWorldPacket(uint16 opcode, uint32 res)
{
    this->packet = new WorldPacket(opcode,res);
    this->owner = true;
}

TSWorldPacket::~TSWorldPacket()
{
    if(this->owner)
    {
        // TODO: why does this segfault? I'm just leaving it like this
        // because that looks like what eluna is doing.
        //delete this->packet;
    }
}

/**
 * Returns the opcode of the [WorldPacket].
 *
 * @return uint16 opcode
 */
uint16 TSWorldPacket::GetOpcode()
{
    return packet->GetOpcode();
}

/**
 * Returns the size of the [WorldPacket].
 *
 * @return uint32 size
 */
uint32 TSWorldPacket::GetSize()
{
    return packet->size();
}

/**
 * Sets the opcode of the [WorldPacket] to the specified opcode.
 *
 * @param [Opcodes] opcode : see Opcodes.h for all known opcodes
 */
void TSWorldPacket::SetOpcode(uint32 opcode)
{
    packet->SetOpcode(opcode);
}

int8 TSWorldPacket::ReadInt8(uint32 index)
{
    return packet->read<int8>(index);
}
int8 TSWorldPacket::ReadInt8()
{
    int8 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt8(uint32 index, int8 value)
{
    packet->put<int8>(index, value);
}
void TSWorldPacket::WriteInt8(int8 value)
{
    (*packet) << value;
}

uint8 TSWorldPacket::ReadUInt8(uint32 index)
{
    return packet->read<uint8>(index);
}
uint8 TSWorldPacket::ReadUInt8()
{
    uint8 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt8(uint32 index, uint8 value)
{
    packet->put<uint8>(index, value);
}
void TSWorldPacket::WriteUInt8(uint8 value)
{
    (*packet) << value;
}

int16 TSWorldPacket::ReadInt16(uint32 index)
{
    return packet->read<int16>(index);
}
int16 TSWorldPacket::ReadInt16()
{
    int16 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt16(uint32 index, int16 value)
{
    packet->put<int16>(index, value);
}
void TSWorldPacket::WriteInt16(int16 value)
{
    (*packet) << value;
}

uint16 TSWorldPacket::ReadUInt16(uint32 index)
{
    return packet->read<uint16>(index);
}
uint16 TSWorldPacket::ReadUInt16()
{
    uint16 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt16(uint32 index, uint16 value)
{
    packet->put<uint16>(index, value);
}
void TSWorldPacket::WriteUInt16(uint16 value)
{
    (*packet) << value;
}

int32 TSWorldPacket::ReadInt32(uint32 index)
{
    return packet->read<int32>(index);
}
int32 TSWorldPacket::ReadInt32()
{
    int32 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt32(uint32 index, int32 value)
{
    packet->put<int32>(index, value);
}
void TSWorldPacket::WriteInt32(int32 value)
{
    (*packet) << value;
}

uint32 TSWorldPacket::ReadUInt32(uint32 index)
{
    return packet->read<uint32>(index);
}
uint32 TSWorldPacket::ReadUInt32()
{
    uint32 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt32(uint32 index, uint32 value)
{
    packet->put<uint32>(index, value);
}
void TSWorldPacket::WriteUInt32(uint32 value)
{
    (*packet) << value;
}

int64 TSWorldPacket::ReadInt64(uint32 index)
{
    return packet->read<int64>(index);
}
int64 TSWorldPacket::ReadInt64()
{
    int64 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt64(uint32 index, int64 value)
{
    packet->put<int64>(index, value);
}
void TSWorldPacket::WriteInt64(int64 value)
{
    (*packet) << value;
}

uint64 TSWorldPacket::ReadUInt64(uint32 index)
{
    return packet->read<uint64>(index);
}
uint64 TSWorldPacket::ReadUInt64()
{
    uint64 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt64(uint32 index, uint64 value)
{
    packet->put<uint64>(index, value);
}
void TSWorldPacket::WriteUInt64(uint64 value)
{
    (*packet) << value;
}

float TSWorldPacket::ReadFloat(uint32 index)
{
    return packet->read<float>(index);
}
float TSWorldPacket::ReadFloat()
{
    float value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteFloat(float value)
{
    (*packet) << value;
}
void TSWorldPacket::WriteFloat(uint32 index, float value)
{
    packet->put<float>(index, value);
}

double TSWorldPacket::ReadDouble(uint32 index)
{
    return packet->read<double>(index);
}
double TSWorldPacket::ReadDouble()
{
    double value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteDouble(uint32 index, double value)
{
    packet->put<double>(index, value);
}
void TSWorldPacket::WriteDouble(double value)
{
    (*packet) << value;
}

TSString TSWorldPacket::ReadString()
{
    std::string _val;
    (*packet) >> _val;
    return TSString(_val);
}
TSString TSWorldPacket::ReadString(uint32 index)
{
    std::string value = "";
    for (int i = index; i < packet->size(); ++i)
    {
        uint8 byte = packet->read<uint8>(i);
        if (byte == 0)
        {
            return TSString(value);
        }
    }
    throw std::runtime_error(
        "string at "+std::to_string(index)+" is never terminated"
    );
}
void TSWorldPacket::WriteString(TSString value)
{
    (*packet) << value.std_str();
}
void TSWorldPacket::WriteString(uint32 index, TSString value)
{
    for (uint32 i = 0; i < value.length(); ++i)
    {
        packet->put<uint8>(index + i, value.c_str()[i]);
    }
    packet->put<uint8>(index + value.length(), 0);
}


TSWorldStatePacket::TSWorldStatePacket(WorldPackets::WorldState::InitWorldStates* ws)
    : m_ws(ws)
{
}

void TSWorldStatePacket::push(int32 variableId, int32 value)
{
    m_ws->Worldstates.emplace_back(variableId, value);
}

uint32 TSWorldStatePacket::length()
{
    return m_ws->Worldstates.size();
}

int32 TSWorldStatePacket::GetVariable(uint32 index)
{
    return m_ws->Worldstates[index].VariableID;
}

int32 TSWorldStatePacket::GetValue(uint32 index)
{
    return m_ws->Worldstates[index].Value;
}

void TSWorldStatePacket::Remove(uint32 index)
{
    m_ws->Worldstates.erase(m_ws->Worldstates.begin() + index);
}

void TSWorldStatePacket::Clear()
{
    m_ws->Worldstates.clear();
}
