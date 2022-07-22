#include "TSStringConvert.h"

#define INDENT_SIZE 4

std::string spaces(int spaces)
{
    std::string lol = "";
    for (int i = 0; i < spaces * INDENT_SIZE; ++i) lol += " ";
    return lol;
}

std::string ToStr(uint8 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(int8 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(uint16 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(int16 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(uint32 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(int32 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(uint64 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(int64 val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(float val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(double val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(bool val, int indent)
{
    return std::to_string(val);
}

std::string ToStr(std::string const& val, int indent)
{
    return val;
}

double parseInt(std::string const& str)
{
    return double(std::stoi(str));
}

double parseFloat(std::string const& str)
{
    return std::stof(str);
}

uint8 ToUInt8(std::string const& value)
{
    return uint8_t(std::stoi(value));
}

int8 ToInt8(std::string const& value)
{
    return int8_t(std::stoi(value));
}

uint16 ToUInt16(std::string const& value)
{
    return uint16_t(std::stoi(value));
}

int16 ToInt16(std::string const& value)
{
    return int16_t(std::stoi(value));
}

uint32 ToUInt32(std::string const& value)
{
    return uint32_t(std::stoul(value));
}

int32 ToInt32(std::string const& value)
{
    return int32_t(std::stoi(value));
}

uint64 ToUInt64(std::string const& value)
{
    return uint64_t(std::stoull(value));
}

int64 ToInt64(std::string const& value)
{
    return int64_t(std::stoll(value));
}

double ToDouble(std::string const& value)
{
    return std::stod(value);
}

float ToFloat(std::string const& value)
{
    return std::stof(value);
}

std::string ToStr(const char* str, int indent)
{
    return str;
}

