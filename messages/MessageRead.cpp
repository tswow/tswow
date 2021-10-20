#include "MessageRead.h"

MessageRead::MessageRead()
	: MessageBase()
{}

MessageRead::MessageRead(size_t chunkSize)
	: MessageBase(chunkSize, 0)
{}

MessageRead::MessageRead(MessageWrite const& write)
	: MessageBase(write)
{}

MessageRead* MessageRead::operator->() { return this; }

std::string MessageRead::ReadString(std::string const& def)
{
	uint32_t size = ReadUInt32(std::string::npos);
	if (size == std::string::npos) return def;
	if (size == 0) return "";
	char* chr = ReadBytes(size, true);
	if (chr == nullptr) return def;
	chr[size] = '\0';
	std::string str(chr);
	delete[] chr;
	return str;
}

uint8_t MessageRead::ReadUInt8(uint8_t def)
{
	return Read<uint8_t>(def);
}
int8_t MessageRead::ReadInt8(int8_t def)
{
	return Read<int8_t>(def);
}

uint16_t MessageRead::ReadUInt16(uint16_t def)
{
	return Read<uint16_t>(def);
}
int16_t MessageRead::ReadInt16(int16_t def)
{
	return Read<int16_t>(def);
}

uint32_t MessageRead::ReadUInt32(uint32_t def)
{
	return Read<uint32_t>(def);
}
int32_t MessageRead::ReadInt32(int32_t def)
{
	return Read<int32_t>(def);
}

uint64_t MessageRead::ReadUInt64(uint64_t def)
{
	return Read<uint64_t>(def);
}

int64_t MessageRead::ReadInt64(int64_t def)
{
	return Read<int64_t>(def);
}

float MessageRead::ReadFloat(float def)
{
	return Read<float>(def);
}

double MessageRead::ReadDouble(double def)
{
	return Read<double>(def);
}

char* MessageRead::ReadBytes(size_t size, bool padStr = false)
{
	return MessageBase::ReadBytes(size, padStr);
}

