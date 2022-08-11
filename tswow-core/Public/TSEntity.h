/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
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

#include "TSBase.h"
#include "TSJson.h"

#include "sol/sol.hpp"

#include <map>
#include <string>
#include <memory>
#include <cstdint>
#include <functional>
#include <set>
#include <mutex>

struct TC_GAME_API TSCompiledClass {
    std::shared_ptr<void> ptr;
    TSCompiledClass(std::shared_ptr<void> ptr);
    TSCompiledClass();
};

class TC_GAME_API TSCompiledClasses {
    std::map<std::string, TSCompiledClass> m_map;
public:
    bool HasObject(std::string const& key);
    void clear();

    template <typename T>
    std::shared_ptr<T> SetObject(std::string const& key, std::shared_ptr<T> item)
    {
        m_map[key] = TSCompiledClass(std::static_pointer_cast<void>(item));
        return item;
    }

    template <typename T>
    std::shared_ptr<T> GetObject(std::string const& key, std::function<std::shared_ptr<T>()> defaultValue = nullptr)
    {
        auto itr = m_map.find(key);
        if(itr == m_map.end())
        {
            return SetObject(key,defaultValue());
        }
        else
        {
            return std::static_pointer_cast<T>(itr->second.ptr);
        }
    }
};

// The class stored on core entities (Object/Map)
struct ModTable
{
    sol::table table;
};

// todo: change these values to pointers that can be activated on demand
class TC_GAME_API TSEntity {
public:
    TSCompiledClasses m_compiledClasses;
    TSJsonObject m_json;
    std::map<std::string, ModTable> m_lua_tables;
    TSEntity * operator->(){return this;}
};

// The class extended by TSObject/TSMap
class TSEntityProvider {
    TSEntity * m_entity;
    TSEntity * getData() { return m_entity; }
public:
    TSEntityProvider(TSEntity * entity)
        : m_entity(entity)
    {}

    template <typename T>
    std::shared_ptr<T> SetObject(std::string const& key, std::shared_ptr<T> item)
    {
        return getData()->m_compiledClasses.SetObject(key, item);
    }

    template <typename T>
    std::shared_ptr<T> GetObject(std::string const& key, std::function<std::shared_ptr<T>()> defaultValue = nullptr)
    {
        return getData()->m_compiledClasses.GetObject(key,defaultValue);
    }

    bool HasObject(std::string const& key)
    {
        return getData()->m_compiledClasses.HasObject(key);
    }

    void SetNumber(std::string const& key, double value) { getData()->m_json.SetNumber(key, value); }
    bool HasNumber(std::string const& key) { return getData()->m_json.HasNumber(key); }
    TSNumber<double> GetNumber(std::string const& key, double def = 0) { return getData()->m_json.GetNumber(key, def); }

    void SetBool(std::string const& key, bool value) { getData()->m_json.SetBool(key, value); }
    bool HasBool(std::string const& key) { return getData()->m_json.HasBool(key); }
    bool GetBool(std::string const& key, bool def = false) { return getData()->m_json.GetBool(key, def); }

    void SetString(std::string const& key, std::string const& value) { getData()->m_json.SetString(key, value); }
    bool HasString(std::string const& key) { return getData()->m_json.HasString(key); }
    std::string GetString(std::string const& key, std::string const& def = "") { return getData()->m_json.GetString(key, def); }

    void SetJsonObject(std::string const& key, TSJsonObject value = TSJsonObject()) { getData()->m_json.SetJsonObject(key, value); }
    bool HasJsonObject(std::string const& key) { return getData()->m_json.HasJsonObject(key); }
    TSJsonObject GetJsonObject(std::string const& key, TSJsonObject def = TSJsonObject()) { return getData()->m_json.GetJsonObject(key, def); }

    void SetJsonArray(std::string const& key, TSJsonArray value = TSJsonArray()) { getData()->m_json.SetJsonArray(key, value); }
    bool HasJsonArray(std::string const& key) { return getData()->m_json.HasJsonArray(key); }
    TSJsonArray GetJsonArray(std::string const& key, TSJsonArray def = TSJsonArray()) { return getData()->m_json.GetJsonArray(key, def); }

    // backwards compatibility
    void SetUInt(std::string const& key, uint32_t value) { getData()->m_json.SetNumber(key, value); }
    void SetUInt64(std::string const& key, uint64_t value) { getData()->m_json.SetNumber(key, double(value)); }
    bool HasUInt(std::string const& key) { return getData()->m_json.HasNumber(key); }
    bool HasUInt64(std::string const& key) { return getData()->m_json.HasNumber(key); }
    TSNumber<uint32> GetUInt(std::string const& key, uint32_t def = 0) { return uint32_t(getData()->m_json.GetNumber(key, def)); }
    TSNumber<uint64> GetUInt64(std::string const& key, uint64_t def = 0) { return TSNumber<uint64_t>(getData()->m_json.GetNumber(key, double(def))); }

    void SetInt(std::string const& key, int32_t value) { getData()->m_json.SetNumber(key, value); }
    bool HasInt(std::string const& key) { return getData()->m_json.HasNumber(key); }
    TSNumber<int32> GetInt(std::string const& key, int32_t def = 0) { return int32_t(getData()->m_json.GetNumber(key, def)); }

    void SetFloat(std::string const& key, float value) { getData()->m_json.SetNumber(key, value); }
    bool HasFloat(std::string const& key) { return getData()->m_json.HasNumber(key); }
    TSNumber<float> GetFloat(std::string const& key, float def = 0) { return float(getData()->m_json.GetNumber(key, def)); }

    void Remove(std::string const& key) { getData()->m_json.Remove(key); }
    void LRemoveObject(std::string const& key) { getData()->m_lua_tables.erase(key); }
    void LSetObject(std::string const& key, sol::table table) { getData()->m_lua_tables[key] = { table }; }
    bool LHasObject(std::string const& key) {
        auto const& classes = getData()->m_lua_tables;
        return classes.find(key) != classes.end();
    }
    sol::table LGetObject(std::string const& key, sol::table def)
    {
        auto & classes = getData()->m_lua_tables;
        auto const& itr = classes.find(key);
        if (itr != classes.end())
        {
            return itr->second.table;
        }
        else
        {
            classes[key] = { def };
            return def;
        }
    }

    friend class TSLua;
};
