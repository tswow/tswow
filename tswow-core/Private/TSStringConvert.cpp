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

TSNumber<int32> parseInt(std::string const& str)
{
    return double(std::stoi(str));
}

TSNumber<float> parseFloat(std::string const& str)
{
    return std::stof(str);
}

TSNumber<uint8> ToUInt8(std::string const& value)
{
    return uint8_t(std::stoi(value));
}

TSNumber<int8> ToInt8(std::string const& value)
{
    return int8_t(std::stoi(value));
}

TSNumber<uint16> ToUInt16(std::string const& value)
{
    return uint16_t(std::stoi(value));
}

TSNumber<int16> ToInt16(std::string const& value)
{
    return int16_t(std::stoi(value));
}

TSNumber<uint32> ToUInt32(std::string const& value)
{
    return uint32_t(std::stoul(value));
}

TSNumber<int32> ToInt32(std::string const& value)
{
    return int32_t(std::stoi(value));
}

TSNumber<uint64> ToUInt64(std::string const& value)
{
    return uint64_t(std::stoull(value));
}

TSNumber<int64> ToInt64(std::string const& value)
{
    return int64_t(std::stoll(value));
}

TSNumber<double> ToDouble(std::string const& value)
{
    return std::stod(value);
}

TSNumber<float> ToFloat(std::string const& value)
{
    return std::stof(value);
}

std::string ToStr(const char* str, int indent)
{
    return str;
}

