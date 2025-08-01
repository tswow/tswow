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
    ts_constructor(packet);
}

TSWorldPacket::TSWorldPacket()
{
    ts_constructor();
}

TSWorldPacket::TSWorldPacket(uint16 opcode, uint32 res)
{
    ts_constructor(opcode,res);
}

TSWorldPacket::~TSWorldPacket()
{
    if(this->owner && this->packet)
    {
        delete this->packet;
        this->packet = nullptr;
    }
}

// Copy constructor - creates a deep copy if owner, otherwise shares pointer
TSWorldPacket::TSWorldPacket(const TSWorldPacket& other)
{
    if (other.owner && other.packet)
    {
        // Deep copy - create new packet
        this->packet = new WorldPacket(*other.packet);
        this->owner = true;
    }
    else
    {
        // Share the pointer for non-owned packets
        this->packet = other.packet;
        this->owner = false;
    }
}

// Move constructor
TSWorldPacket::TSWorldPacket(TSWorldPacket&& other) noexcept
    : packet(other.packet), owner(other.owner)
{
    other.packet = nullptr;
    other.owner = false;
}

// Copy assignment - creates a deep copy if owner
TSWorldPacket& TSWorldPacket::operator=(const TSWorldPacket& other)
{
    if (this != &other)
    {
        // Clean up existing packet if we own it
        if (this->owner && this->packet)
        {
            delete this->packet;
        }

        if (other.owner && other.packet)
        {
            // Deep copy - create new packet
            this->packet = new WorldPacket(*other.packet);
            this->owner = true;
        }
        else
        {
            // Share the pointer for non-owned packets
            this->packet = other.packet;
            this->owner = false;
        }
    }
    return *this;
}

// Move assignment
TSWorldPacket& TSWorldPacket::operator=(TSWorldPacket&& other) noexcept
{
    if (this != &other)
    {
        // Clean up existing packet if we own it
        if (this->owner && this->packet)
        {
            delete this->packet;
        }

        this->packet = other.packet;
        this->owner = other.owner;
        other.packet = nullptr;
        other.owner = false;
    }
    return *this;
}

// Bounds checking helper methods
bool TSWorldPacket::ValidateReadIndex(uint32 index, size_t typeSize) const
{
    if (!packet) return false;

    // Check for integer overflow in index + typeSize
    if (typeSize > 0 && index > UINT32_MAX - typeSize) return false;

    // Check bounds against packet size
    return (static_cast<size_t>(index) + typeSize <= packet->size());
}

bool TSWorldPacket::ValidateWriteIndex(uint32 index, size_t typeSize) const
{
    if (!packet) return false;

    // Check for integer overflow in index + typeSize
    if (typeSize > 0 && index > UINT32_MAX - typeSize) return false;

    // Check bounds against packet size
    return (static_cast<size_t>(index) + typeSize <= packet->size());
}

void TSWorldPacket::ThrowBoundsError(const char* operation, uint32 index, size_t typeSize, size_t packetSize) const
{
    // Log the security violation with detailed information for investigation
    TS_LOG_ERROR("tswow.security", "TSWorldPacket bounds violation: {} at index {} (accessing {} bytes) exceeds packet size {} (opcode: {})",
                 operation, index, typeSize, packetSize, packet ? packet->GetOpcode() : 0);

    // For debugging, also include call stack information if available
    #ifdef _DEBUG
    TS_LOG_DEBUG("tswow.security", "Bounds violation call stack should be investigated for potential exploit attempt");
    #endif

    // We might want to:
    // 1. Disconnect the client that sent malicious data
    // 2. Log the client IP for security monitoring
    // 3. Increment security violation counters
    // For now, we return safely to prevent crashes while logging the violation
}

/**
 * Returns the opcode of the [WorldPacket].
 *
 * @return uint16 opcode
 */
TSNumber<uint16> TSWorldPacket::GetOpcode()
{
    return packet->GetOpcode();
}

/**
 * Returns the size of the [WorldPacket].
 *
 * @return uint32 size
 */
TSNumber<uint32> TSWorldPacket::GetSize()
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

TSNumber<int8> TSWorldPacket::ReadInt8(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(int8))) {
        ThrowBoundsError("ReadInt8", index, sizeof(int8), packet ? packet->size() : 0);
        return 0; // Return safe default value
    }
    return packet->read<int8>(index);
}
TSNumber<int8> TSWorldPacket::ReadInt8()
{
    int8 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt8(uint32 index, int8 value)
{
    if (!ValidateWriteIndex(index, sizeof(int8))) {
        ThrowBoundsError("WriteInt8", index, sizeof(int8), packet ? packet->size() : 0);
        return; // Fail silently for now
    }
    packet->put<int8>(index, value);
}
void TSWorldPacket::WriteInt8(int8 value)
{
    (*packet) << value;
}

TSNumber<uint8> TSWorldPacket::ReadUInt8(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(uint8))) {
        ThrowBoundsError("ReadUInt8", index, sizeof(uint8), packet ? packet->size() : 0);
        return 0;
    }
    return packet->read<uint8>(index);
}
TSNumber<uint8> TSWorldPacket::ReadUInt8()
{
    uint8 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt8(uint32 index, uint8 value)
{
    if (!ValidateWriteIndex(index, sizeof(uint8))) {
        ThrowBoundsError("WriteUInt8", index, sizeof(uint8), packet ? packet->size() : 0);
        return;
    }
    packet->put<uint8>(index, value);
}
void TSWorldPacket::WriteUInt8(uint8 value)
{
    (*packet) << value;
}

TSNumber<int16> TSWorldPacket::ReadInt16(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(int16))) {
        ThrowBoundsError("ReadInt16", index, sizeof(int16), packet ? packet->size() : 0);
        return 0;
    }
    return packet->read<int16>(index);
}
TSNumber<int16> TSWorldPacket::ReadInt16()
{
    int16 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt16(uint32 index, int16 value)
{
    if (!ValidateWriteIndex(index, sizeof(int16))) {
        ThrowBoundsError("WriteInt16", index, sizeof(int16), packet ? packet->size() : 0);
        return;
    }
    packet->put<int16>(index, value);
}
void TSWorldPacket::WriteInt16(int16 value)
{
    (*packet) << value;
}

TSNumber<uint16> TSWorldPacket::ReadUInt16(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(uint16))) {
        ThrowBoundsError("ReadUInt16", index, sizeof(uint16), packet ? packet->size() : 0);
        return 0;
    }
    return packet->read<uint16>(index);
}
TSNumber<uint16> TSWorldPacket::ReadUInt16()
{
    uint16 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt16(uint32 index, uint16 value)
{
    if (!ValidateWriteIndex(index, sizeof(uint16))) {
        ThrowBoundsError("WriteUInt16", index, sizeof(uint16), packet ? packet->size() : 0);
        return;
    }
    packet->put<uint16>(index, value);
}
void TSWorldPacket::WriteUInt16(uint16 value)
{
    (*packet) << value;
}

TSNumber<int32> TSWorldPacket::ReadInt32(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(int32))) {
        ThrowBoundsError("ReadInt32", index, sizeof(int32), packet ? packet->size() : 0);
        return 0;
    }
    return packet->read<int32>(index);
}
TSNumber<int32> TSWorldPacket::ReadInt32()
{
    int32 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt32(uint32 index, int32 value)
{
    if (!ValidateWriteIndex(index, sizeof(int32))) {
        ThrowBoundsError("WriteInt32", index, sizeof(int32), packet ? packet->size() : 0);
        return;
    }
    packet->put<int32>(index, value);
}
void TSWorldPacket::WriteInt32(int32 value)
{
    (*packet) << value;
}

TSNumber<uint32> TSWorldPacket::ReadUInt32(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(uint32))) {
        ThrowBoundsError("ReadUInt32", index, sizeof(uint32), packet ? packet->size() : 0);
        return 0;
    }
    return packet->read<uint32>(index);
}
TSNumber<uint32> TSWorldPacket::ReadUInt32()
{
    uint32 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt32(uint32 index, uint32 value)
{
    if (!ValidateWriteIndex(index, sizeof(uint32))) {
        ThrowBoundsError("WriteUInt32", index, sizeof(uint32), packet ? packet->size() : 0);
        return;
    }
    packet->put<uint32>(index, value);
}
void TSWorldPacket::WriteUInt32(uint32 value)
{
    (*packet) << value;
}

TSNumber<int64> TSWorldPacket::ReadInt64(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(int64))) {
        ThrowBoundsError("ReadInt64", index, sizeof(int64), packet ? packet->size() : 0);
        return 0;
    }
    return packet->read<int64>(index);
}
TSNumber<int64> TSWorldPacket::ReadInt64()
{
    int64 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteInt64(uint32 index, int64 value)
{
    if (!ValidateWriteIndex(index, sizeof(int64))) {
        ThrowBoundsError("WriteInt64", index, sizeof(int64), packet ? packet->size() : 0);
        return;
    }
    packet->put<int64>(index, value);
}
void TSWorldPacket::WriteInt64(int64 value)
{
    (*packet) << value;
}

TSNumber<uint64> TSWorldPacket::ReadUInt64(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(uint64))) {
        ThrowBoundsError("ReadUInt64", index, sizeof(uint64), packet ? packet->size() : 0);
        return 0;
    }
    return packet->read<uint64>(index);
}
TSNumber<uint64> TSWorldPacket::ReadUInt64()
{
    uint64 value;
    (*packet) >> value;
    return value;
}
void TSWorldPacket::WriteUInt64(uint32 index, uint64 value)
{
    if (!ValidateWriteIndex(index, sizeof(uint64))) {
        ThrowBoundsError("WriteUInt64", index, sizeof(uint64), packet ? packet->size() : 0);
        return;
    }
    packet->put<uint64>(index, value);
}
void TSWorldPacket::WriteUInt64(uint64 value)
{
    (*packet) << value;
}

TSNumber<float> TSWorldPacket::ReadFloat(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(float))) {
        ThrowBoundsError("ReadFloat", index, sizeof(float), packet ? packet->size() : 0);
        return 0.0f;
    }
    return packet->read<float>(index);
}
TSNumber<float> TSWorldPacket::ReadFloat()
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
    if (!ValidateWriteIndex(index, sizeof(float))) {
        ThrowBoundsError("WriteFloat", index, sizeof(float), packet ? packet->size() : 0);
        return;
    }
    packet->put<float>(index, value);
}

TSNumber<double> TSWorldPacket::ReadDouble(uint32 index)
{
    if (!ValidateReadIndex(index, sizeof(double))) {
        ThrowBoundsError("ReadDouble", index, sizeof(double), packet ? packet->size() : 0);
        return 0.0;
    }
    return packet->read<double>(index);
}
TSNumber<double> TSWorldPacket::ReadDouble()
{
    double value;
    (*packet) >> value;
    return value;
}

TSArray<uint8> TSWorldPacket::ReadBytes(uint32 index, uint32 size)
{
    TSArray<uint8> arr;
    if (size == 0)
    {
        return arr;
    }

    // Validate that we can read 'size' bytes starting at 'index'
    if (!ValidateReadIndex(index, size)) {
        ThrowBoundsError("ReadBytes", index, size, packet ? packet->size() : 0);
        return arr;
    }

    arr.vec->resize(size);
    memcpy(arr.vec->data(), packet->contents() + index, size);
    return arr;
}

TSArray<uint8> TSWorldPacket::ReadBytes(uint32 size)
{
    TSArray<uint8> arr;
    if (size == 0)
    {
        return arr;
    }
    arr.vec->resize(size);
    packet->read(arr.vec->data(), size);
    return arr;
}

void TSWorldPacket::WriteBytes(uint32 index, TSArray<uint8>& vec)
{
    // Validate that we can write 'vec.get_length()' bytes starting at 'index'
    if (!ValidateWriteIndex(index, vec.get_length())) {
        ThrowBoundsError("WriteBytes", index, vec.get_length(), packet ? packet->size() : 0);
        return;
    }

    packet->put(index, vec.vec->data(), vec.get_length());
}

void TSWorldPacket::WriteBytes(TSArray<uint8>& vec)
{
    packet->append(vec.vec->data(), vec.get_length());
}

void TSWorldPacket::WriteDouble(uint32 index, double value)
{
    if (!ValidateWriteIndex(index, sizeof(double))) {
        ThrowBoundsError("WriteDouble", index, sizeof(double), packet ? packet->size() : 0);
        return;
    }
    packet->put<double>(index, value);
}
void TSWorldPacket::WriteDouble(double value)
{
    (*packet) << value;
}

std::string TSWorldPacket::ReadString()
{
    std::string _val;
    (*packet) >> _val;
    return _val;
}
std::string TSWorldPacket::ReadString(uint32 index)
{
    if (!ValidateReadIndex(index, 1)) {
        ThrowBoundsError("ReadString", index, 1, packet ? packet->size() : 0);
        return "";
    }

    std::string value = "";
    for (uint32 i = index; i < packet->size(); ++i)
    {
        uint8 byte = packet->read<uint8>(i);
        if (byte == 0)
        {
            return value;
        }
        value += char(byte);
    }
    ThrowBoundsError("ReadString (unterminated)", index, 0, packet ? packet->size() : 0);
    return value;
}
void TSWorldPacket::WriteString(std::string const& value)
{
    (*packet) << value;
}
void TSWorldPacket::WriteString(uint32 index, std::string const& value)
{
    // Check if we can write the entire string + null terminator
    if (!ValidateWriteIndex(index, value.length() + 1)) {
        ThrowBoundsError("WriteString", index, value.length() + 1, packet ? packet->size() : 0);
        return;
    }

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

TSNumber<uint32> TSWorldStatePacket::length()
{
    return m_ws->Worldstates.size();
}

TSNumber<int32> TSWorldStatePacket::GetVariable(uint32 index)
{
    return m_ws->Worldstates[index].VariableID;
}

TSNumber<int32> TSWorldStatePacket::GetValue(uint32 index)
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

void TSWorldPacket::ts_constructor(uint16 opcode, uint32 res)
{
    this->packet = new WorldPacket(opcode,res);
    this->owner = true;
}

void TSWorldPacket::ts_constructor(WorldPacket *packet)
{
    this->packet = packet;
    this->owner = false;
}

bool TSWorldPacket::IsEmpty()
{
    return packet->empty();
}

TSArray<uint8> TSWorldPacket::GetBytes()
{
    if (packet->empty())
    {
        return TSArray<uint8>();
    }

    TSArray<uint8> arr;
    arr.vec->resize(packet->size());
    memcpy(arr.vec->data(), packet->contents(), packet->size());
    return arr;
}

void TSWorldPacket::ts_constructor()
{
    this->packet = nullptr;
    this->owner = false;
}

void TSWorldPacket::Seek(size_t ofs)
{
    packet->rpos(ofs);
}

size_t TSWorldPacket::Tell() const
{
    return packet->rpos();
}
