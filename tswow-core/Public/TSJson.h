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
    bool IsValid();
    TSJsonObject* operator->() { return this; }

    TSJsonObject SetBool(TSString key, bool value);
    bool HasBool(TSString key);
    bool GetBool(TSString key, bool def = false);

    TSJsonObject SetNumber(TSString key, double number);
    bool HasNumber(TSString key);
    double GetNumber(TSString key, double def = 0);

    TSJsonObject SetString(TSString key, TSString number);
    bool HasString(TSString key);
    TSString GetString(TSString key, TSString def = JSTR(""));

    TSJsonObject SetNull(TSString key);
    bool HasNull(TSString key);

    TSJsonObject SetJsonObject(TSString key, TSJsonObject value = TSJsonObject());
    bool HasJsonObject(TSString key);
    TSJsonObject GetJsonObject(TSString key, TSJsonObject value = TSJsonObject());

    TSJsonArray GetJsonArray(TSString key, TSJsonArray arr);
    bool HasJsonArray(TSString key);
    TSJsonObject SetJsonArray(TSString key, TSJsonArray value);
    TSString toString(int indents = -1);
    TSJsonObject Remove(TSString key);
    unsigned get_length();
    void Parse(TSString json);
private:
    TSJsonObject LSetBool(std::string const& key, bool value);
    bool LHasBool(std::string const& key);
    bool LGetBool0(std::string const& key, bool def);
    bool LGetBool1(std::string const& key);

    TSJsonObject LSetNumber(std::string const& key, double number);
    bool LHasNumber(std::string const& key);
    double LGetNumber0(std::string const& key, double def);
    double LGetNumber1(std::string const& key);

    TSJsonObject LSetString(std::string const& key, std::string const& number);
    bool LHasString(std::string const& key);
    std::string LGetString0(std::string const& key, std::string const& def);
    std::string LGetString1(std::string const& key);

    TSJsonObject LSetNull(std::string const& key);
    bool lHasNull(std::string const& key);

    TSJsonObject LSetJsonObject(std::string const& key, TSJsonObject value);
    bool LHasJsonObject(std::string const& key);
    TSJsonObject LGetJsonObject0(std::string const& key, TSJsonObject value);
    TSJsonObject LGetJsonObject1(std::string const& key);

    TSJsonArray LGetJsonArray0(std::string const& key, TSJsonArray arr);
    TSJsonArray LGetJsonArray1(std::string const& key);
    bool LHasJsonArray(std::string const& key);
    TSJsonObject LSetJsonArray(std::string const& key, TSJsonArray value);
    std::string LtoString0(int indents);
    std::string LtoString1();
    TSJsonObject LRemove(std::string const& key);
    friend class TSLuaState;
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
    double GetNumber(unsigned key, double def = 0);
    TSJsonArray InsertNumber(unsigned key, double value);
    TSJsonArray PushNumber(double value);

    TSJsonArray SetString(unsigned key, TSString number);
    bool HasString(unsigned key);
    TSString GetString(unsigned key, TSString def = JSTR(""));
    TSJsonArray InsertString(unsigned key, TSString value);
    TSJsonArray PushString(TSString value);

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
    void Parse(TSString json);
    TSString toString(int indents = -1);
    unsigned get_length();

private:
    bool LGetBool0(unsigned key, bool def);
    bool LGetBool1(unsigned key);
    double LGetNumber0(unsigned key, double def);
    double LGetNumber1(unsigned key);

    std::string LGetString0(unsigned key, std::string const& def);
    std::string LGetString1(unsigned key);
    TSJsonArray LSetString(unsigned key, std::string const& number);
    TSJsonArray LInsertString(unsigned key, std::string const& value);
    TSJsonArray LPushString(std::string const& value);

    TSJsonArray LSetJsonObject0(unsigned key, TSJsonObject value);
    TSJsonArray LSetJsonObject1(unsigned key);
    TSJsonObject LGetJsonObject0(unsigned key, TSJsonObject value);
    TSJsonObject LGetJsonObject1(unsigned key);
    TSJsonArray LInsertJsonObject0(unsigned key, TSJsonObject value);
    TSJsonArray LInsertJsonObject1(unsigned key);

    TSJsonArray LPushJsonObject0(TSJsonObject value);
    TSJsonArray LPushJsonObject1();

    TSJsonArray LSetJsonArray0(unsigned key, TSJsonArray arr);
    TSJsonArray LSetJsonArray1(unsigned key);

    TSJsonArray LGetJsonArray0(unsigned key, TSJsonArray value);
    TSJsonArray LGetJsonArray1(unsigned key);

    TSJsonArray LInsertJsonArray0(unsigned key, TSJsonArray value);
    TSJsonArray LInsertJsonArray1(unsigned key);

    TSJsonArray LPushJsonArray0(TSJsonArray value);
    TSJsonArray LPushJsonArray1();

    TSString LtoString0(int indents);
    TSString LtoString1();

    friend class TSLuaState;
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
    TSJsonObject ParseObject(TSString json)
    {
        TSJsonObject map;
        map.Parse(json);
        return map;
    }
    TSJsonArray ParseArray(TSString json)
    {
        TSJsonArray arr;
        arr.Parse(json);
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
