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
#include <set>
#include <map>
#include <cstdint>
#include <functional>
#include <string>
#include <chrono>
#include "TSString.h"
#include "TSJson.h"
#include "TSMutable.h"

uint64_t TC_GAME_API now();

enum class TimerFlags: uint32 {
    CLEARS_ON_DEATH       = 0x1,
    CLEARS_ON_MAP_CHANGED = 0x2,
    AGGREGATE_LOOPS       = 0x4,
//  SYNCHRONIZED          = 0x8,
};

enum class TimerLoops {
    ONCE = 1,
    INDEFINITE = -1,
};

class TSWorldObject;
class TC_GAME_API TSWorldObjectGroup {
    std::set<TSWorldObject> entries;
public:
    ~TSWorldObjectGroup();
    TSWorldObjectGroup * operator->() { return this; }

    void Add(TSWorldObject obj);
    void Remove(TSWorldObject obj);
    void RemovedByObject(TSWorldObject obj);
    void Clear();

    std::set<TSWorldObject>::iterator begin();
    std::set<TSWorldObject>::iterator end();
    uint32_t get_length();

    void forEach(std::function<void(TSWorldObject)> callback);
    void filterInPlace(std::function<bool(TSWorldObject)> callback);
};

class TC_GAME_API TSWorldObjectGroups {
    std::map<std::string, TSWorldObjectGroup> groups;
public:
    TSWorldObjectGroup* GetGroup(TSString key);
    void RemoveGroup(TSString key);
    void ClearGroups();
};

class TC_GAME_API TSBinaryMessage {
    uint8_t* bytes;
public:
    TSBinaryMessage(uint32_t size);
    ~TSBinaryMessage();
};

template <typename T>
using JsonMessageCallback = std::function<void(uint32_t,TSJsonObject,T)>;

template <typename T>
class TC_GAME_API JsonMessage {
    uint8_t m_channel;
    TSJsonObject m_obj;
    JsonMessageCallback<T> m_callback;
public:
    JsonMessage(uint8_t channel, TSJsonObject obj, JsonMessageCallback<T> callback)
        : m_channel(channel)
        , m_obj(obj)
        , m_callback(callback)
    {}

    void fire(T ctx)
    {
        m_callback(m_channel, m_obj, ctx);
    }
};

template <typename T>
class TSTimer;

template <typename T>
class TSTimers;

template <typename T>
using TimerCallback = std::function<void(T,TSTimer<T>*)>;

template <typename T>
class TC_GAME_API TSTimer {
    uint32_t m_modid;
    TSString m_name;
    uint32_t m_delay;
    int32_t m_repeats;
    uint64_t m_lastTick;
    uint64_t m_diff; // temp for callback
    bool     m_stopped = false;
    bool     m_deleted = false; // used internally
    uint32 m_flags;
    TimerCallback<T> m_callback = nullptr;
    sol::protected_function m_lua_callback;
public:
    TSTimer(uint32_t modid, TSString name, uint32_t delay, int32_t repeats, uint32 flags, TimerCallback<T> callback)
        : m_modid(modid)
        , m_name(name)
        , m_delay(delay)
        , m_repeats(repeats)
        , m_lastTick(now())
        , m_flags(flags)
        , m_callback(callback)
    {}

    TSTimer(uint32_t modid, TSString name, uint32_t delay, int32_t repeats, uint32 flags, sol::protected_function callback)
        : m_modid(modid)
        , m_name(name)
        , m_delay(delay)
        , m_repeats(repeats)
        , m_lastTick(now())
        , m_flags(flags)
        , m_lua_callback(callback)
    {}


    void Stop()
    {
        m_stopped = true;
    }

    uint32 GetDelay()
    {
        return m_delay;
    }

    void SetDelay(uint32 delay)
    {
        m_delay = delay;
    }

    uint64 GetDiff()
    {
        return m_diff;
    }

    uint32 GetFlags()
    {
        return m_flags;
    }

    void SetFlags(uint32_t flags)
    {
        m_flags = flags;
    }

    int32 GetRepeats()
    {
        return m_repeats;
    }

    void SetRepeats(int32 repeats)
    {
        m_repeats = repeats;
    }

    TSString GetName()
    {
        return m_name;
    }

    bool Tick(T ctx)
    {
        uint64_t n = now();
        uint64_t diff = n - m_lastTick;
        m_diff = diff;
        uint64_t loops = m_delay == 0 ? 1 : uint64_t(double(diff) / double(m_delay));

        if (m_repeats != 0)
        {
            loops = loops < m_repeats ? loops : m_repeats;
        }

        uint64_t effLoops = loops == 0 || (m_flags & uint32(TimerFlags::AGGREGATE_LOOPS))
            ? loops
            : 1;

        for (uint64_t loop = 0; loop < effLoops; ++loop)
        {
            if (m_callback)
            {
                m_callback(ctx, this);
            }
            else
            {
                m_lua_callback(ctx, this);
            }

            m_lastTick = n;
            m_diff = 0;
            if (m_stopped)
            {
                return true;
            }
        }

        if (m_repeats >= 0)
        {
            m_repeats -= loops;
            if (m_repeats <= 0)
            {
                return true;
            }
        }
        return false;
    }
private:
    std::string LGetName() { return GetName().std_str(); }
    friend class TSLuaState;
    friend class TSTimers<T>;
};

template <typename T>
class TSTimers {
    std::vector<TSTimer<T>> m_timers;
    bool m_ticking = false;
public:

    void add(uint32_t modid, uint32_t time, int32_t repeats, uint32_t flags, TimerCallback<T> callback)
    {
        m_timers.push_back(TSTimer<T>(modid, JSTR(""), time, repeats, flags, callback));
    }

    void add_named(uint32_t modid, TSString name, uint32_t time, int32_t repeats, uint32_t flags, TimerCallback<T> callback)
    {
        for (int i = 0; i < m_timers.size(); ++i)
        {
            if (m_timers[i].GetName() == name)
            {
                if (m_ticking)
                {
                    m_timers[i].m_deleted = true;
                }
                else
                {
                    m_timers[i] = TSTimer<T>(modid, name, time, repeats, flags, callback);
                    return;
                }
            }
        }
        m_timers.push_back(TSTimer<T>(modid, name, time, repeats, flags, callback));
    }

    void add(uint32_t mod, uint32_t time, int32_t repeats, uint32_t flags, sol::protected_function callback)
    {
        m_timers.push_back(TSTimer<T>(mod, JSTR(""), time, repeats, flags, callback));
    }

    void add_named(uint32_t mod, std::string const& name, uint32_t time, int32_t repeats, uint32_t flags, sol::protected_function callback)
    {
        TSString nname = TSString(name);
        for (int i = 0; i < m_timers.size(); ++i)
        {
            if (m_timers[i].GetName() == nname)
            {
                if (m_ticking)
                {
                    m_timers[i].m_deleted = true;
                }
                else
                {
                    m_timers[i] = TSTimer<T>(mod, name, time, repeats, flags, callback);
                    return;
                }
            }
        }
        m_timers.push_back(TSTimer<T>(mod, name, time, repeats, flags, callback));
    }

    void remove_on_death()
    {
        for (auto itr = m_timers.begin(); itr != m_timers.end();)
        {
            if (itr->GetFlags() & uint32(TimerFlags::CLEARS_ON_DEATH))
            {
                if (m_ticking)
                {
                    itr->m_deleted = true;
                    itr++;
                }
                else
                {
                    m_timers.erase(itr);
                }
            }
            else
            {
                itr++;
            }
        }
    }

    void remove_on_map_change()
    {
        for (auto itr = m_timers.begin(); itr != m_timers.end();)
        {
            if (itr->GetFlags() & uint32(TimerFlags::CLEARS_ON_MAP_CHANGED))
            {
                if (m_ticking)
                {
                    itr->m_deleted = true;
                    itr++;
                }
                else
                {
                    m_timers.erase(itr);
                }
            }
            else
            {
                itr++;
            }
        }
    }

    void remove(TSString name)
    {
        for (auto iter = m_timers.begin(); iter != m_timers.end(); ++iter)
        {
            if (iter->GetName() == name)
            {
                if (m_ticking)
                {
                    iter->m_deleted = true;
                }
                else
                {
                    m_timers.erase(iter);
                    return;
                }
            }
        }
    }

    void tick(T context)
    {
        m_ticking = true;
        auto it = m_timers.begin();
        while (it != m_timers.end())
        {
            if (it->Tick(context))
            {
                it = m_timers.erase(it);
            }
            else
            {
                ++it;
            }
        }

        for (it = m_timers.begin(); it != m_timers.end();)
        {
            if (it->m_deleted)
            {
                it = m_timers.erase(it);
            }
            else
            {
                it++;
            }
        }

        m_ticking = false;
    }

    void clear()
    {
        if (m_ticking)
        {
            for (TSTimer<T>& timer : m_timers)
            {
                timer.m_deleted = true;
            }
        }
        else
        {
            m_timers.clear();
        }
    }
};

// The class stored on core entities (Map/WorldObject)
template <typename T>
struct TSWorldEntity {
    TSWorldObjectGroups m_groups;
    TSTimers<T> m_timers;

    void tick(T ctx)
    {
        m_timers.tick(ctx);
    }

    void clear()
    {
        m_timers.clear();
    }
};

// The class extended by TSMap/TSWorldObject
template <typename T>
class TC_GAME_API TSWorldEntityProvider {
    TSWorldEntity<T>* m_entity;
public:
    TSWorldEntityProvider(TSWorldEntity<T>* entity)
        : m_entity(entity){}


    void AddNamedTimer(uint32_t modid, TSString name, uint32_t time, int32_t loops, uint32_t flags, TimerCallback<T> callback)
    {
        m_entity->m_timers.add_named(modid, name, time, loops, flags, callback);
    }

    void AddNamedTimer(uint32_t modid, TSString name, uint32_t time, int32_t loops, TimerCallback<T> callback)
    {
        m_entity->m_timers.add_named(modid, name, time, loops, 0, callback);
    }

    void AddNamedTimer(uint32_t modid, TSString name, uint32_t time, TimerCallback<T> callback)
    {
        m_entity->m_timers.add_named(modid, name, time, 1, 0, callback);
    }
    
    void AddTimer(uint32_t modid, uint32_t time, int32_t loops, uint32_t flags, TimerCallback<T> callback)
    {
        m_entity->m_timers.add(modid, time, loops, flags, callback);
    }

    void AddTimer(uint32_t modid, uint32_t time, int32_t loops, TimerCallback<T> callback)
    {
        m_entity->m_timers.add(modid, time, loops, 0, callback);
    }

    void AddTimer(uint32_t modid, uint32_t time, TimerCallback<T> callback)
    {
        m_entity->m_timers.add(modid, time, 1, 0, callback);
    }

    void RemoveTimer(TSString name)
    {
        m_entity->m_timers.remove(name);
    }

    TSWorldObjectGroup * GetEntityGroup(TSString key)
    {
        return m_entity->m_groups.GetGroup(key);
    }

    void RemoveEntityGroup(TSString key)
    {
        m_entity->m_groups.RemoveGroup(key);
    }

    void ClearEntityGroup()
    {
        m_entity->m_groups.ClearGroups();
    }
private:
    void LRemoveTimer(std::string const& name) { RemoveTimer(name); }

    TSWorldObjectGroup* LGetEntityGroup(std::string const& key)
    {
        return m_entity->m_groups.GetGroup(key);
    }

    void LRemoveEntityGroup(std::string const& key)
    {
        m_entity->m_groups.RemoveGroup(key);
    }

    void LAddNamedTimer0(uint32_t modid, std::string const& name, uint32_t time, int32_t loops, uint32_t flags, sol::protected_function callback)
    {
        m_entity->m_timers.add_named(modid, name, time, loops, flags, callback);
    }

    void LAddNamedTimer1(uint32_t modid, std::string const& name, uint32_t time, int32_t loops, sol::protected_function callback)
    {
        m_entity->m_timers.add_named(modid, name, time, loops, 0, callback);
    }

    void LAddNamedTimer2(uint32_t modid, std::string const& name, uint32_t time, sol::protected_function callback)
    {
        m_entity->m_timers.add_named(modid, name, time, 1, 0, callback);
    }

    void LAddTimer0(uint32_t modid, uint32_t time, int32_t loops, uint32_t flags, sol::protected_function callback)
    {
        m_entity->m_timers.add(modid, time, loops, flags, callback);
    }

    void LAddTimer1(uint32_t modid, uint32_t time, int32_t loops, sol::protected_function callback)
    {
        m_entity->m_timers.add(modid, time, loops, 0, callback);
    }

    void LAddTimer2(uint32_t modid, uint32_t time, sol::protected_function callback)
    {
        m_entity->m_timers.add(modid, time, 1, 0, callback);
    }

    friend class TSLuaState;
};
