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
            json.push_back(std::get<TSString>(value.m_value));
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
            self.pushNumber(val);
            break;
        case nlohmann::json::value_t::boolean:
            self.pushBool(val);
            break;
        case nlohmann::json::value_t::string:
            self.pushString(TSString(val));
            break;
        case nlohmann::json::value_t::object: {
            TSJsonObject obj;
            readObject(obj, val);
            self.pushObject(obj);
            break;
        }
        case nlohmann::json::value_t::array: {
            TSJsonArray arr;
            readArray(arr, val);
            self.pushArray(arr);
            break;
        }
        case nlohmann::json::value_t::null: {
            self.pushNull();
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
            target[pair.first] = std::get<TSString>(pair.second.m_value);
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
            self.setNumber(TSString(pair.key()), pair.value());
            break;
        case nlohmann::json::value_t::boolean:
            self.setBool(TSString(pair.key()), pair.value());
            break;
        case nlohmann::json::value_t::string:
            self.setString(TSString(pair.key()), TSString(pair.value()));
            break;
        case nlohmann::json::value_t::object: {
            TSJsonObject obj;
            readObject(obj, pair.value());
            self.setObject(TSString(pair.key()), obj);
            break;
        }
        case nlohmann::json::value_t::array: {
            TSJsonArray arr;
            readArray(arr, pair.value());
            self.setArray(TSString(pair.key()), arr);
            break;
        }
        case nlohmann::json::value_t::null: {
            self.setNull(TSString(pair.key()));
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

bool TSJsonObject::isValid()
{
    return m_is_valid;
}

template <typename T>
T TSJsonObject::get(TSString key, JsonType type, T value)
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
TSJsonObject TSJsonObject::set(TSString key, JsonType type, T value)
{
    (*m_tags)[key] = JsonTag(type, value);
    return *this;
}

bool TSJsonObject::contains(TSString key, JsonType type)
{
    return m_tags->find(key.std_str()) != m_tags->end()
        && (*m_tags)[key.std_str()].m_type == type;
}

TSJsonObject TSJsonObject::setBool(TSString key, bool value)
{
    return set(key, JsonType::BOOL, value);
}
bool TSJsonObject::hasBool(TSString key)
{
    return contains(key, JsonType::BOOL);
}

bool TSJsonObject::getBool(TSString key, bool def)
{
    return get(key, JsonType::BOOL, def);
}

TSJsonObject TSJsonObject::setNumber(TSString key, double value)
{
    return set(key, JsonType::NUMBER, value);
}
bool TSJsonObject::hasNumber(TSString key)
{
    return contains(key, JsonType::NUMBER);
}

double TSJsonObject::getNumber(TSString key, double def)
{
    return get(key, JsonType::NUMBER, def);
}

TSJsonObject TSJsonObject::setString(TSString key, TSString value)
{
    return set(key, JsonType::STRING, value);
}
bool TSJsonObject::hasString(TSString key)
{
    return contains(key, JsonType::STRING);
}

TSString TSJsonObject::getString(TSString key, TSString def)
{
    return get(key, JsonType::STRING, def);
}

TSJsonObject TSJsonObject::setNull(TSString key)
{
    return set(key, JsonType::NULL_LITERAL, nullptr);
}

bool TSJsonObject::hasNull(TSString key)
{
    return contains(key, JsonType::NULL_LITERAL);
}

TSJsonObject TSJsonObject::setObject(TSString key, TSJsonObject value)
{
    return set(key, JsonType::OBJECT, value);
}

bool TSJsonObject::hasObject(TSString key)
{
    return contains(key, JsonType::OBJECT);
}

TSJsonObject TSJsonObject::getObject(TSString key, TSJsonObject value)
{
    return get(key, JsonType::OBJECT, value);
}

TSJsonObject TSJsonObject::setArray(TSString key, TSJsonArray value = TSJsonArray())
{
    return set(key, JsonType::LIST, value);
}

bool TSJsonObject::hasArray(TSString key)
{
    return contains(key, JsonType::LIST);
}

TSJsonArray TSJsonObject::getArray(TSString key, TSJsonArray value = TSJsonArray())
{
    return get(key, JsonType::LIST, value);
}

void TSJsonObject::parse(TSString json)
{
    try {
        readObject(*this, nlohmann::json::parse(json.std_str()));
        m_is_valid = true;
    }
    catch (std::exception e)
    {
        m_is_valid = false;
    }
}

TSString TSJsonObject::toString(int indents)
{
    if (m_tags->size() == 0)
    {
        return JSTR("{}");
    }
    nlohmann::json json = nlohmann::json::object();
    writeObject(*this, json);
    return TSString(indents >= 0 ? json.dump(indents) : json.dump());
}

TSJsonObject TSJsonObject::remove(TSString key)
{
    m_tags->erase(key.std_str());
    return *this;
}

unsigned TSJsonObject::get_length()
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

TSJsonArray TSJsonArray::setBool(unsigned key, bool value)
{
    return set(key, JsonType::BOOL, value);
}

bool TSJsonArray::hasBool(unsigned key)
{
    return contains(key, JsonType::BOOL);
}

bool TSJsonArray::getBool(unsigned key, bool def)
{
    return get(key, JsonType::BOOL, def);
}

TSJsonArray TSJsonArray::insertBool(unsigned key, bool value)
{
    return set(key, JsonType::BOOL, value);
}

TSJsonArray TSJsonArray::pushBool(bool value)
{
    return push(JsonType::BOOL, value);
}

TSJsonArray TSJsonArray::setNumber(unsigned key, double value)
{
    return set(key, JsonType::NUMBER, value);
}

bool TSJsonArray::hasNumber(unsigned key)
{
    return contains(key, JsonType::NUMBER);
}

double TSJsonArray::getNumber(unsigned key, double def)
{
    return get(key, JsonType::NUMBER, def);
}

TSJsonArray TSJsonArray::insertNumber(unsigned key, double value)
{
    return insert(key, JsonType::NUMBER, value);
}

TSJsonArray TSJsonArray::pushNumber(double value)
{
    return push(JsonType::NUMBER, value);
}

TSJsonArray TSJsonArray::setString(unsigned key, TSString value)
{
    return set(key, JsonType::STRING, value);
}

bool TSJsonArray::hasString(unsigned key)
{
    return contains(key, JsonType::STRING);
}

TSString TSJsonArray::getString(unsigned key, TSString def)
{
    return get(key, JsonType::STRING, def);
}

TSJsonArray TSJsonArray::setNull(unsigned key)
{
    return set(key, JsonType::NULL_LITERAL, nullptr);
}

bool TSJsonArray::hasNull(unsigned key)
{
    return contains(key, JsonType::NULL_LITERAL);
}

TSJsonArray TSJsonArray::insertNull(unsigned key)
{
    return insert(key, JsonType::NULL_LITERAL, nullptr);
}

TSJsonArray TSJsonArray::pushNull()
{
    return push(JsonType::NULL_LITERAL, nullptr);
}

TSJsonArray TSJsonArray::insertString(unsigned key, TSString value)
{
    return insert(key, JsonType::STRING, value);
}

TSJsonArray TSJsonArray::pushString(TSString value)
{
    return push(JsonType::STRING, value);
}

TSJsonArray TSJsonArray::setObject(unsigned key, TSJsonObject value)
{
    return set(key, JsonType::OBJECT, value);
}

bool TSJsonArray::hasObject(unsigned key)
{
    return contains(key, JsonType::OBJECT);
}

TSJsonObject TSJsonArray::getObject(unsigned key, TSJsonObject value)
{
    return get(key, JsonType::OBJECT, value);
}

TSJsonArray TSJsonArray::insertObject(unsigned key, TSJsonObject value)
{
    return insert(key, JsonType::OBJECT, value);
}

TSJsonArray TSJsonArray::pushObject(TSJsonObject value)
{
    return push(JsonType::OBJECT, value);
}

TSJsonArray TSJsonArray::setArray(unsigned key, TSJsonArray arr)
{
    return set(key, JsonType::LIST, arr);
}

bool TSJsonArray::hasArray(unsigned key)
{
    return contains(key, JsonType::LIST);
}

TSJsonArray TSJsonArray::getArray(unsigned key, TSJsonArray value)
{
    return get(key, JsonType::LIST, value);
}

TSJsonArray TSJsonArray::insertArray(unsigned key, TSJsonArray value)
{
    return insert(key, JsonType::LIST, value);
}

TSJsonArray TSJsonArray::pushArray(TSJsonArray value)
{
    return push(JsonType::LIST, value);
}

TSString TSJsonArray::toString(int indents)
{
    if (m_tags->size() == 0)
    {
        return JSTR("[]");
    }
    nlohmann::json json = nlohmann::json::array();
    writeArray(*this, json);
    return TSString(indents >= 0 ? json.dump(indents) : json.dump());
}

TSJsonArray TSJsonArray::remove(unsigned key)
{
    m_tags->erase(m_tags->begin()+key);
    return *this;
}

void TSJsonArray::parse(TSString json)
{
    try {
        readArray(*this, nlohmann::json::parse(json.std_str()));
        m_is_valid = true;
    }
    catch (std::exception e)
    {
        m_is_valid = false;
    }
}

unsigned TSJsonArray::get_length()
{
    return m_tags->size();
}