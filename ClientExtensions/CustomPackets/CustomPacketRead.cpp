#include "CustomPacketRead.h"

CustomPacketRead::CustomPacketRead()
	: CustomPacketBase()
{}

CustomPacketRead::CustomPacketRead(opcode_t opcode, chunkSize_t chunkSize)
	: CustomPacketBase(opcode, chunkSize, 0)
{}

CustomPacketRead::CustomPacketRead(CustomPacketWrite const& write)
	: CustomPacketBase(write)
{}

CustomPacketRead* CustomPacketRead::operator->() { return this; }

std::string CustomPacketRead::ReadString(std::string const& def)
{
	totalSize_t size = Read<totalSize_t>(TotalSizeNpos);
	if (size == TotalSizeNpos) return def;
	if (size == 0) return "";
	char* chr = ReadBytes(size, true);
	if (chr == nullptr) return def;
	chr[size] = '\0';
	std::string str(chr);
	delete[] chr;
	return str;
}

uint8_t CustomPacketRead::ReadUInt8(uint8_t def)
{
	return Read<uint8_t>(def);
}
int8_t CustomPacketRead::ReadInt8(int8_t def)
{
	return Read<int8_t>(def);
}

uint16_t CustomPacketRead::ReadUInt16(uint16_t def)
{
	return Read<uint16_t>(def);
}
int16_t CustomPacketRead::ReadInt16(int16_t def)
{
	return Read<int16_t>(def);
}

uint32_t CustomPacketRead::ReadUInt32(uint32_t def)
{
	return Read<uint32_t>(def);
}
int32_t CustomPacketRead::ReadInt32(int32_t def)
{
	return Read<int32_t>(def);
}

uint64_t CustomPacketRead::ReadUInt64(uint64_t def)
{
	return Read<uint64_t>(def);
}

int64_t CustomPacketRead::ReadInt64(int64_t def)
{
	return Read<int64_t>(def);
}

float CustomPacketRead::ReadFloat(float def)
{
	return Read<float>(def);
}

double CustomPacketRead::ReadDouble(double def)
{
	return Read<double>(def);
}

char* CustomPacketRead::ReadBytes(totalSize_t size, bool padStr)
{
	return CustomPacketBase::ReadBytes(size, padStr);
}

