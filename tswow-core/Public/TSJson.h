/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
#include <memory>
#include <variant>
#include <vector>
#include <map>
#include <functional>

class TSJsonObject;
class TSJsonArray;

typedef std::variant<double, bool, void*, std::string, TSJsonObject, TSJsonArray> JsonValue;
enum class JsonType { NUMBER, BOOL, STRING, OBJECT, LIST, NULL_LITERAL};
struct JsonTag;

class TC_GAME_API TSJsonObject {
    bool m_is_valid = true;
    bool contains(std::string const& key, JsonType type);

    template <typename T>
    T get(std::string const& key, JsonType type, T def);

    template <typename T>
    TSJsonObject set(std::string const& key, JsonType type, T value);
public:
    std::shared_ptr<std::map<std::string, JsonTag>> m_tags;
    TSJsonObject();
    TSJsonObject(TSJsonObject const& map);
    bool IsValid();
    TSJsonObject* operator->() { return this; }

    TSJsonObject SetBool(std::string const& key, bool value);
    bool HasBool(std::string const& key);
    bool GetBool(std::string const& key, bool def = false);

    TSJsonObject SetNumber(std::string const& key, double number);
    bool HasNumber(std::string const& key);
    TSNumber<double> GetNumber(std::string const& key, double def = 0);

    TSJsonObject SetString(std::string const& key, std::string const& number);
    bool HasString(std::string const& key);
    std::string GetString(std::string const& key, std::string const& def = "");

    TSJsonObject SetNull(std::string const& key);
    bool HasNull(std::string const& key);

    TSJsonObject SetJsonObject(std::string const& key, TSJsonObject value = TSJsonObject());
    bool HasJsonObject(std::string const& key);
    TSJsonObject GetJsonObject(std::string const& key, TSJsonObject value = TSJsonObject());

    TSJsonArray GetJsonArray(std::string const& key, TSJsonArray arr);
    bool HasJsonArray(std::string const& key);
    TSJsonObject SetJsonArray(std::string const& key, TSJsonArray value);
    std::string toString(int indents = -1);
    TSJsonObject Remove(std::string const& key);
    TSNumber<unsigned> get_length();
    void Parse(std::string const& json);
};

class TC_GAME_API TSJsonArray {
    bool m_is_valid = true;
    bool contains(unsigned key, JsonType type);
    template <typename T>
    T get(unsigned key, JsonType type, T def);
    template <typename T>
    TSJsonArray set(unsigned key, JsonType type, T value);
    template <typename T>
    TSJsonArray insert(unsigned key, JsonType type, T value);
    template <typename T>
    TSJsonArray push(JsonType type, T value);
public:
    std::shared_ptr<std::vector<JsonTag>> m_tags;
    TSJsonArray();
    TSJsonArray(TSJsonArray const& other);
    TSJsonArray* operator->() { return this; }
    bool isValid();
    TSJsonArray SetBool(unsigned key, bool value);
    bool HasBool(unsigned key);
    bool GetBool(unsigned key, bool def = false);
    TSJsonArray InsertBool(unsigned key, bool value);
    TSJsonArray PushBool(bool value);

    TSJsonArray SetNumber(unsigned key, double number);
    bool HasNumber(unsigned key);
    TSNumber<double> GetNumber(unsigned key, double def = 0);
    TSJsonArray InsertNumber(unsigned key, double value);
    TSJsonArray PushNumber(double value);

    TSJsonArray SetString(unsigned key, std::string const& number);
    bool HasString(unsigned key);
    std::string GetString(unsigned key, std::string const& def = "");
    TSJsonArray InsertString(unsigned key, std::string const& value);
    TSJsonArray PushString(std::string const& value);

    TSJsonArray SetNull(unsigned key);
    bool HasNull(unsigned key);
    TSJsonArray InsertNull(unsigned key);
    TSJsonArray PushNull();

    TSJsonArray SetJsonObject(unsigned key, TSJsonObject value = TSJsonObject());
    bool HasJsonObject(unsigned key);
    TSJsonObject GetJsonObject(unsigned key, TSJsonObject value = TSJsonObject());
    TSJsonArray InsertJsonObject(unsigned key, TSJsonObject value = TSJsonObject());
    TSJsonArray PushJsonObject(TSJsonObject value = TSJsonObject());

    TSJsonArray SetJsonArray(unsigned key, TSJsonArray arr = TSJsonArray());
    bool HasJsonArray(unsigned key);
    TSJsonArray GetJsonArray(unsigned key, TSJsonArray value = TSJsonArray());
    TSJsonArray InsertJsonArray(unsigned key, TSJsonArray value = TSJsonArray());
    TSJsonArray PushJsonArray(TSJsonArray value = TSJsonArray());

    TSJsonArray Remove(unsigned key);
    void Parse(std::string const& json);
    std::string toString(int indents = -1);
    TSNumber<unsigned> get_length();
};

struct JsonTag {
    JsonType m_type;
    JsonValue m_value;
    JsonTag(JsonType type, JsonValue value);
    JsonTag();
};

static struct TSJSON
{
    TSJSON* operator->() { return this; }
    TSJsonObject ParseObject(std::string const& json)
    {
        TSJsonObject map;
        map.Parse(json);
        return map;
    }
    TSJsonArray ParseArray(std::string const& json)
    {
        TSJsonArray arr;
        arr.Parse(json);
        return arr;
    }

    std::string stringify(TSJsonObject obj, int indents = -1)
    {
        return obj.toString(indents);
    }

    std::string stringify(TSJsonArray arr, int indents = -1)
    {
        return arr.toString(indents);
    }
} TSJSON;
