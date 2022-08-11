#pragma once

#include <string>
#include <cstdint>
#include "TSBase.h"

#define INDENT_SIZE 4

template <typename T>
std::string ToStr(T value, int indent = 0)
{ 
    return value->stringify(indent); 
}

TC_GAME_API std::string ToStr(const char* str, int indent = 0);
TC_GAME_API std::string spaces(int spaces);
TC_GAME_API std::string ToStr(uint8 val, int indent = 0);
TC_GAME_API std::string ToStr(int8 val, int indent = 0);
TC_GAME_API std::string ToStr(uint16 val, int indent = 0);
TC_GAME_API std::string ToStr(int16 val, int indent = 0);
TC_GAME_API std::string ToStr(uint32 val, int indent = 0);
TC_GAME_API std::string ToStr(int32 val, int indent = 0);
TC_GAME_API std::string ToStr(uint64 val, int indent = 0);
TC_GAME_API std::string ToStr(int64 val, int indent = 0);
TC_GAME_API std::string ToStr(float val, int indent = 0);
TC_GAME_API std::string ToStr(double val, int indent = 0);
TC_GAME_API std::string ToStr(bool val, int indent = 0);
TC_GAME_API std::string ToStr(std::string const& val, int indent = 0);
TC_GAME_API TSNumber<int32> parseInt(std::string const& str);
TC_GAME_API TSNumber<float> parseFloat(std::string const& str);
TC_GAME_API TSNumber<uint8> ToUInt8(std::string const& value);
TC_GAME_API TSNumber<int8> ToInt8(std::string const& value);
TC_GAME_API TSNumber<uint16> ToUInt16(std::string const& value);
TC_GAME_API TSNumber<int16> ToInt16(std::string const& value);
TC_GAME_API TSNumber<uint32> ToUInt32(std::string const& value);
TC_GAME_API TSNumber<int32> ToInt32(std::string const& value);
TC_GAME_API TSNumber<uint64> ToUInt64(std::string const& value);
TC_GAME_API TSNumber<int64> ToInt64(std::string const& value);
TC_GAME_API TSNumber<double> ToDouble(std::string const& value);
TC_GAME_API TSNumber<float> ToFloat(std::string const& value);
