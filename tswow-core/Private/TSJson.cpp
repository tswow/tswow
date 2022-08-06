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

#include "TSJson.h"
#include <nlohmann/json.hpp>

/*
 * JsonTag
 */

JsonTag::JsonTag(JsonType type, JsonValue value)
    : m_type(type), m_value(value) {}

JsonTag::JsonTag()
    : m_type(JsonType::NULL_LITERAL) {}

static void writeArray(TSJsonArray self, nlohmann::json& json);
static void readArray(TSJsonArray self, nlohmann::json const& source);
static void writeObject(TSJsonObject self, nlohmann::json& target);
static void readObject(TSJsonObject self, nlohmann::json const& source);

static void writeArray(TSJsonArray self, nlohmann::json& json)
{
    for (auto& value : *self.m_tags)
    {
        switch (value.m_type)
        {
        case JsonType::NUMBER:
            json.push_back(std::get<double>(value.m_value));
            break;
        case JsonType::STRING:
            json.push_back(std::get<std::string>(value.m_value));
            break;
        case JsonType::BOOL:
            json.push_back(std::get<bool>(value.m_value));
            break;
        case JsonType::OBJECT:
        {
            auto obj = std::get<TSJsonObject>(value.m_value);
            nlohmann::json objJson = nlohmann::json::object();
            writeObject(obj, objJson);
            json.push_back(objJson);
            break;
        }
        case JsonType::LIST:
        {
            auto list = std::get<TSJsonArray>(value.m_value);
            nlohmann::json listJson = nlohmann::json::array();
            writeArray(list, listJson);
            json.push_back(listJson);
            break;
        }
        case JsonType::NULL_LITERAL:
            json.push_back(nullptr);
            break;
        }
    }
}
static void readArray(TSJsonArray self, nlohmann::json const& source)
{
    self.m_tags->clear();
    self.m_tags->reserve(source.size());
    for (unsigned i = 0; i < source.size(); ++i)
    {
        auto val = source[i];
        switch (val.type())
        {
        case nlohmann::json::value_t::number_float:
        case nlohmann::json::value_t::number_integer:
        case nlohmann::json::value_t::number_unsigned:
            self.PushNumber(val);
            break;
        case nlohmann::json::value_t::boolean:
            self.PushBool(val);
            break;
        case nlohmann::json::value_t::string:
            self.PushString(val);
            break;
        case nlohmann::json::value_t::object: {
            TSJsonObject obj;
            readObject(obj, val);
            self.PushJsonObject(obj);
            break;
        }
        case nlohmann::json::value_t::array: {
            TSJsonArray arr;
            readArray(arr, val);
            self.PushJsonArray(arr);
            break;
        }
        case nlohmann::json::value_t::null: {
            self.PushNull();
            break;
        }
        }
    }
}
static void writeObject(TSJsonObject self, nlohmann::json& target)
{
    for (auto const& pair : *self.m_tags)
    {
        switch (pair.second.m_type)
        {
        case JsonType::NUMBER:
            target[pair.first] = std::get<double>(pair.second.m_value);
            break;
        case JsonType::STRING:
            target[pair.first] = std::get<std::string>(pair.second.m_value);
            break;
        case JsonType::BOOL:
            target[pair.first] = std::get<bool>(pair.second.m_value);
            break;
        case JsonType::OBJECT:
        {
            auto obj = std::get<TSJsonObject>(pair.second.m_value);
            writeObject(obj, target[pair.first] = nlohmann::json::object());
            break;
        }
        case JsonType::LIST:
        {
            auto list = std::get<TSJsonArray>(pair.second.m_value);
            writeArray(list, target[pair.first] = nlohmann::json::array());
            break;
        }
        case JsonType::NULL_LITERAL:
            target[pair.first] = nullptr;
            break;
        }
    }
}
static void readObject(TSJsonObject self, nlohmann::json const& source)
{
    for (auto& pair : source.items())
    {
        switch (pair.value().type())
        {
        case nlohmann::json::value_t::number_float:
        case nlohmann::json::value_t::number_integer:
        case nlohmann::json::value_t::number_unsigned:
            self.SetNumber(pair.key(), pair.value());
            break;
        case nlohmann::json::value_t::boolean:
            self.SetBool(pair.key(), pair.value());
            break;
        case nlohmann::json::value_t::string:
            self.SetString(pair.key(), pair.value());
            break;
        case nlohmann::json::value_t::object: {
            TSJsonObject obj;
            readObject(obj, pair.value());
            self.SetJsonObject(pair.key(), obj);
            break;
        }
        case nlohmann::json::value_t::array: {
            TSJsonArray arr;
            readArray(arr, pair.value());
            self.SetJsonArray(pair.key(), arr);
            break;
        }
        case nlohmann::json::value_t::null: {
            self.SetNull(pair.key());
        }
        }
    }
}

/*
 * TSJsonObject
 */

TSJsonObject::TSJsonObject()
    : m_tags(std::make_shared<std::map<std::string, JsonTag>>())
{

}

TSJsonObject::TSJsonObject(TSJsonObject const& map)
    : m_tags(map.m_tags) {}

bool TSJsonObject::IsValid()
{
    return m_is_valid;
}

template <typename T>
T TSJsonObject::get(std::string const& key, JsonType type, T value)
{
    if (contains(key, type))
    {
        return std::get<T>((*m_tags)[key].m_value);
    }
    else
    {
        return value;
    }
}

template <typename T>
TSJsonObject TSJsonObject::set(std::string const& key, JsonType type, T value)
{
    (*m_tags)[key] = JsonTag(type, value);
    return *this;
}

bool TSJsonObject::contains(std::string const& key, JsonType type)
{
    return m_tags->find(key) != m_tags->end()
        && (*m_tags)[key].m_type == type;
}

TSJsonObject TSJsonObject::SetBool(std::string const& key, bool value)
{
    return set(key, JsonType::BOOL, value);
}
bool TSJsonObject::HasBool(std::string const& key)
{
    return contains(key, JsonType::BOOL);
}

bool TSJsonObject::GetBool(std::string const& key, bool def)
{
    return get(key, JsonType::BOOL, def);
}

TSJsonObject TSJsonObject::SetNumber(std::string const& key, double value)
{
    return set(key, JsonType::NUMBER, value);
}
bool TSJsonObject::HasNumber(std::string const& key)
{
    return contains(key, JsonType::NUMBER);
}

double TSJsonObject::GetNumber(std::string const& key, double def)
{
    return get(key, JsonType::NUMBER, def);
}

TSJsonObject TSJsonObject::SetString(std::string const& key, std::string const& value)
{
    return set(key, JsonType::STRING, value);
}
bool TSJsonObject::HasString(std::string const& key)
{
    return contains(key, JsonType::STRING);
}

std::string TSJsonObject::GetString(std::string const& key, std::string const& def)
{
    return get(key, JsonType::STRING, def);
}

TSJsonObject TSJsonObject::SetNull(std::string const& key)
{
    return set(key, JsonType::NULL_LITERAL, nullptr);
}

bool TSJsonObject::HasNull(std::string const& key)
{
    return contains(key, JsonType::NULL_LITERAL);
}

TSJsonObject TSJsonObject::SetJsonObject(std::string const& key, TSJsonObject value)
{
    return set(key, JsonType::OBJECT, value);
}

bool TSJsonObject::HasJsonObject(std::string const& key)
{
    return contains(key, JsonType::OBJECT);
}

TSJsonObject TSJsonObject::GetJsonObject(std::string const& key, TSJsonObject value)
{
    return get(key, JsonType::OBJECT, value);
}

TSJsonObject TSJsonObject::SetJsonArray(std::string const& key, TSJsonArray value = TSJsonArray())
{
    return set(key, JsonType::LIST, value);
}

bool TSJsonObject::HasJsonArray(std::string const& key)
{
    return contains(key, JsonType::LIST);
}

TSJsonArray TSJsonObject::GetJsonArray(std::string const& key, TSJsonArray value = TSJsonArray())
{
    return get(key, JsonType::LIST, value);
}

void TSJsonObject::Parse(std::string const& json)
{
    try {
        readObject(*this, nlohmann::json::parse(json));
        m_is_valid = true;
    }
    catch (std::exception e)
    {
        m_is_valid = false;
    }
}

std::string TSJsonObject::toString(int indents)
{
    if (m_tags->size() == 0)
    {
        return "{}";
    }
    nlohmann::json json = nlohmann::json::object();
    writeObject(*this, json);
    return indents >= 0 ? json.dump(indents) : json.dump();
}

TSJsonObject TSJsonObject::Remove(std::string const& key)
{
    m_tags->erase(key);
    return *this;
}

TSNumber<unsigned> TSJsonObject::get_length()
{
    return m_tags->size();
}

/*
 * TSJsonArray
 */

TSJsonArray::TSJsonArray()
    : m_tags(std::make_shared<std::vector<JsonTag>>()) {}

TSJsonArray::TSJsonArray(TSJsonArray const& arr)
    : m_tags(arr.m_tags) {}

bool TSJsonArray::isValid()
{
    return m_is_valid;
}

bool TSJsonArray::contains(unsigned key, JsonType type)
{
    return m_tags->size() > key && (*m_tags)[key].m_type == type;
}

template <typename T>
T TSJsonArray::get(unsigned key, JsonType type, T def)
{
    return contains(key, type) ? std::get<T>((*m_tags)[key].m_value) : def;
}

template <typename T>
TSJsonArray TSJsonArray::set(unsigned key, JsonType type, T value)
{
    if (key >= m_tags->size())
    {
        m_tags->resize(key + 1);
    }
    (*m_tags)[key] = JsonTag(type, value);
    return *this;
}

template <typename T>
TSJsonArray TSJsonArray::insert(unsigned key, JsonType type, T value)
{
    if (key >= m_tags->size())
    {
        m_tags->resize(key);
    }
    m_tags->insert(m_tags->begin() + key, JsonTag(type, value));
    return *this;
}

template <typename T>
TSJsonArray TSJsonArray::push(JsonType type, T value)
{
    m_tags->push_back(JsonTag(type, value));
    return *this;
}

TSJsonArray TSJsonArray::SetBool(unsigned key, bool value)
{
    return set(key, JsonType::BOOL, value);
}

bool TSJsonArray::HasBool(unsigned key)
{
    return contains(key, JsonType::BOOL);
}

bool TSJsonArray::GetBool(unsigned key, bool def)
{
    return get(key, JsonType::BOOL, def);
}

TSJsonArray TSJsonArray::InsertBool(unsigned key, bool value)
{
    return set(key, JsonType::BOOL, value);
}

TSJsonArray TSJsonArray::PushBool(bool value)
{
    return push(JsonType::BOOL, value);
}

TSJsonArray TSJsonArray::SetNumber(unsigned key, double value)
{
    return set(key, JsonType::NUMBER, value);
}

bool TSJsonArray::HasNumber(unsigned key)
{
    return contains(key, JsonType::NUMBER);
}

double TSJsonArray::GetNumber(unsigned key, double def)
{
    return get(key, JsonType::NUMBER, def);
}

TSJsonArray TSJsonArray::InsertNumber(unsigned key, double value)
{
    return insert(key, JsonType::NUMBER, value);
}

TSJsonArray TSJsonArray::PushNumber(double value)
{
    return push(JsonType::NUMBER, value);
}

TSJsonArray TSJsonArray::SetString(unsigned key, std::string const& value)
{
    return set(key, JsonType::STRING, value);
}

bool TSJsonArray::HasString(unsigned key)
{
    return contains(key, JsonType::STRING);
}

std::string TSJsonArray::GetString(unsigned key, std::string const& def)
{
    return get(key, JsonType::STRING, def);
}

TSJsonArray TSJsonArray::SetNull(unsigned key)
{
    return set(key, JsonType::NULL_LITERAL, nullptr);
}

bool TSJsonArray::HasNull(unsigned key)
{
    return contains(key, JsonType::NULL_LITERAL);
}

TSJsonArray TSJsonArray::InsertNull(unsigned key)
{
    return insert(key, JsonType::NULL_LITERAL, nullptr);
}

TSJsonArray TSJsonArray::PushNull()
{
    return push(JsonType::NULL_LITERAL, nullptr);
}

TSJsonArray TSJsonArray::InsertString(unsigned key, std::string const& value)
{
    return insert(key, JsonType::STRING, value);
}

TSJsonArray TSJsonArray::PushString(std::string const& value)
{
    return push(JsonType::STRING, value);
}

TSJsonArray TSJsonArray::SetJsonObject(unsigned key, TSJsonObject value)
{
    return set(key, JsonType::OBJECT, value);
}

bool TSJsonArray::HasJsonObject(unsigned key)
{
    return contains(key, JsonType::OBJECT);
}

TSJsonObject TSJsonArray::GetJsonObject(unsigned key, TSJsonObject value)
{
    return get(key, JsonType::OBJECT, value);
}

TSJsonArray TSJsonArray::InsertJsonObject(unsigned key, TSJsonObject value)
{
    return insert(key, JsonType::OBJECT, value);
}

TSJsonArray TSJsonArray::PushJsonObject(TSJsonObject value)
{
    return push(JsonType::OBJECT, value);
}

TSJsonArray TSJsonArray::SetJsonArray(unsigned key, TSJsonArray arr)
{
    return set(key, JsonType::LIST, arr);
}

bool TSJsonArray::HasJsonArray(unsigned key)
{
    return contains(key, JsonType::LIST);
}

TSJsonArray TSJsonArray::GetJsonArray(unsigned key, TSJsonArray value)
{
    return get(key, JsonType::LIST, value);
}

TSJsonArray TSJsonArray::InsertJsonArray(unsigned key, TSJsonArray value)
{
    return insert(key, JsonType::LIST, value);
}

TSJsonArray TSJsonArray::PushJsonArray(TSJsonArray value)
{
    return push(JsonType::LIST, value);
}

std::string TSJsonArray::toString(int indents)
{
    if (m_tags->size() == 0)
    {
        return "[]";
    }
    nlohmann::json json = nlohmann::json::array();
    writeArray(*this, json);
    return indents >= 0 ? json.dump(indents) : json.dump();
}

TSJsonArray TSJsonArray::Remove(unsigned key)
{
    m_tags->erase(m_tags->begin()+key);
    return *this;
}

void TSJsonArray::Parse(std::string const& json)
{
    try {
        readArray(*this, nlohmann::json::parse(json));
        m_is_valid = true;
    }
    catch (std::exception e)
    {
        m_is_valid = false;
    }
}

TSNumber<unsigned> TSJsonArray::get_length()
{
    return m_tags->size();
}
