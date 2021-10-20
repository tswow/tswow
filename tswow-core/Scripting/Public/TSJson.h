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
#include "TSString.h"
#include <memory>
#include <variant>
#include <vector>
#include <map>
#include <functional>

class TSJsonObject;
class TSJsonArray;

typedef std::variant<double, bool, void*, TSString, TSJsonObject, TSJsonArray> JsonValue;
enum class JsonType { NUMBER, BOOL, STRING, OBJECT, LIST, NULL_LITERAL};
struct JsonTag;

class TC_GAME_API TSJsonObject {
    bool m_is_valid = true;
    bool contains(TSString key, JsonType type);

    template <typename T>
    T get(TSString key, JsonType type, T def);

    template <typename T>
    TSJsonObject set(TSString key, JsonType type, T value);
public:
    std::shared_ptr<std::map<std::string, JsonTag>> m_tags;
    TSJsonObject();
    TSJsonObject(TSJsonObject const& map);
    bool isValid();

    TSJsonObject setBool(TSString key, bool value);
    TSJsonObject* operator->() { return this; }
    bool hasBool(TSString key);
    bool getBool(TSString key, bool def = false);

    TSJsonObject setNumber(TSString key, double number);
    bool hasNumber(TSString key);
    double getNumber(TSString key, double def = 0);

    TSJsonObject setString(TSString key, TSString number);
    bool hasString(TSString key);
    TSString getString(TSString key, TSString def = JSTR(""));

    TSJsonObject setNull(TSString key);
    bool hasNull(TSString key);

    TSJsonObject setObject(TSString key, TSJsonObject value = TSJsonObject());
    bool hasObject(TSString key);
    TSJsonObject getObject(TSString key, TSJsonObject value = TSJsonObject());

    TSJsonObject setArray(TSString key, TSJsonArray arr);
    bool hasArray(TSString key);
    TSJsonArray getArray(TSString key, TSJsonArray value);
    TSString toString(int indents = -1);
    TSJsonObject remove(TSString key);
    unsigned get_length();
    void parse(TSString json);
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
    TSJsonArray setBool(unsigned key, bool value);
    bool hasBool(unsigned key);
    bool getBool(unsigned key, bool def = false);
    TSJsonArray insertBool(unsigned key, bool value);
    TSJsonArray pushBool(bool value);

    TSJsonArray setNumber(unsigned key, double number);
    bool hasNumber(unsigned key);
    double getNumber(unsigned key, double def = 0);
    TSJsonArray insertNumber(unsigned key, double value);
    TSJsonArray pushNumber(double value);

    TSJsonArray setString(unsigned key, TSString number);
    bool hasString(unsigned key);
    TSString getString(unsigned key, TSString def = JSTR(""));
    TSJsonArray insertString(unsigned key, TSString value);
    TSJsonArray pushString(TSString value);

    TSJsonArray setNull(unsigned key);
    bool hasNull(unsigned key);
    TSJsonArray insertNull(unsigned key);
    TSJsonArray pushNull();

    TSJsonArray setObject(unsigned key, TSJsonObject value = TSJsonObject());
    bool hasObject(unsigned key);
    TSJsonObject getObject(unsigned key, TSJsonObject value = TSJsonObject());
    TSJsonArray insertObject(unsigned key, TSJsonObject value = TSJsonObject());
    TSJsonArray pushObject(TSJsonObject value = TSJsonObject());

    TSJsonArray setArray(unsigned key, TSJsonArray arr = TSJsonArray());
    bool hasArray(unsigned key);
    TSJsonArray getArray(unsigned key, TSJsonArray value = TSJsonArray());
    TSJsonArray insertArray(unsigned key, TSJsonArray value = TSJsonArray());
    TSJsonArray pushArray(TSJsonArray value = TSJsonArray());

    TSJsonArray remove(unsigned key);
    void parse(TSString json);
    TSString toString(int indents = -1);
    unsigned get_length();
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
    TSJsonObject parseObject(TSString json)
    {
        TSJsonObject map;
        map.parse(json);
        return map;
    }
    TSJsonArray parseArray(TSString json)
    {
        TSJsonArray arr;
        arr.parse(json);
        return arr;
    }

    TSString stringify(TSJsonObject obj, int indents = -1)
    {
        return obj.toString(indents);
    }

    TSString stringify(TSJsonArray arr, int indents = -1)
    {
        return arr.toString(indents);
    }
} TSJSON;
