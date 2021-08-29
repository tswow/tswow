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

#include "TSString.h"
#include "TSJson.h"
#include <map>
#include <string>
#include <memory>
#include <cstdint>
#include <functional>
#include <set>
#include <mutex>

#define GetDBObject GetObject

struct TC_GAME_API TSCompiledClass {
    uint32_t modid;
    std::shared_ptr<void> ptr;
    TSCompiledClass(uint32_t modid, std::shared_ptr<void> ptr);
    TSCompiledClass();
};

class TC_GAME_API TSCompiledClasses {
    std::map<std::string, TSCompiledClass> m_map;
public:
    bool HasObject(uint32_t modid, TSString key);
    void clear();

    template <typename T>
    std::shared_ptr<T> SetObject(uint32_t modid, TSString key, std::shared_ptr<T> item)
    {
        m_map[key.std_str()] = TSCompiledClass(modid, std::static_pointer_cast<void>(item));
        return item;
    }

    template <typename T>
    std::shared_ptr<T> GetObject(uint32_t modid, TSString key, std::function<std::shared_ptr<T>()> defaultValue = nullptr)
    {
        auto itr = m_map.find(key);
        if(itr == m_map.end())
        {
            return SetObject(modid,key,defaultValue());
        }
        else
        {
            return std::static_pointer_cast<T>(itr->second.ptr);
        }
    }
};

// The class stored on core entities (Object/Map)
class TC_GAME_API TSEntity {
public:
    TSCompiledClasses m_compiledClasses;
    TSJsonObject m_json;
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
    std::shared_ptr<T> SetObject(uint32_t modid, TSString key, std::shared_ptr<T> item)
    {
        return getData()->m_compiledClasses.SetObject(modid, key, item);
    }

    template <typename T>
    std::shared_ptr<T> GetObject(uint32_t modid, TSString key, std::function<std::shared_ptr<T>()> defaultValue = nullptr)
    {
        return getData()->m_compiledClasses.GetObject(modid,key,defaultValue);
    }

    bool HasObject(uint32_t modid, TSString key)
    {
        return getData()->m_compiledClasses.HasObject(modid, key);
    }

    void SetNumber(TSString key, double value) { getData()->m_json.setNumber(key, value); }
    bool HasNumber(TSString key) { return getData()->m_json.hasNumber(key); }
    double GetNumber(TSString key, double def = 0) { return getData()->m_json.getNumber(key, def); }

    void SetBool(TSString key, bool value) { getData()->m_json.setBool(key, value); }
    bool HasBool(TSString key) { return getData()->m_json.hasBool(key); }
    bool GetBool(TSString key, bool def = false) { return getData()->m_json.getBool(key, def); }

    void SetString(TSString key, TSString value) { getData()->m_json.setString(key, value); }
    bool HasString(TSString key) { return getData()->m_json.hasString(key); }
    TSString GetString(TSString key, TSString def = JSTR("")) { return getData()->m_json.getString(key, def); }

    void SetJsonObject(TSString key, TSJsonObject value) { getData()->m_json.setObject(key, value); }
    bool HasJsonObject(TSString key) { return getData()->m_json.hasObject(key); }
    TSJsonObject GetJsonObject(TSString key, TSJsonObject def = TSJsonObject()) { return getData()->m_json.getObject(key, def); }

    void SetJsonArray(TSString key, TSJsonArray value) { getData()->m_json.setArray(key, value); }
    bool HasJsonArray(TSString key) { return getData()->m_json.hasArray(key); }
    TSJsonArray GetJsonArray(TSString key, TSJsonArray def = TSJsonArray()) { return getData()->m_json.getArray(key, def); }

    // backwards compatibility
    void SetUInt(TSString key, uint32_t value) { getData()->m_json.setNumber(key, value); }
    bool HasUInt(TSString key) { return getData()->m_json.hasNumber(key); }
    uint32_t GetUInt(TSString key, uint32_t def = 0) { return uint32_t(getData()->m_json.getNumber(key, def)); }

    void SetInt(TSString key, int32_t value) { getData()->m_json.setNumber(key, value); }
    bool HasInt(TSString key) { return getData()->m_json.hasNumber(key); }
    int32_t GetInt(TSString key, int32_t def = 0) { return int32_t(getData()->m_json.getNumber(key, def)); }

    void SetFloat(TSString key, float value) { getData()->m_json.setNumber(key, value); }
    bool HasFloat(TSString key) { return getData()->m_json.hasNumber(key); }
    float GetFloat(TSString key, float def = 0) { return float(getData()->m_json.getNumber(key, def)); }
};
