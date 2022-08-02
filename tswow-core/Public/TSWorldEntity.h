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

#include "TSTimer.h"
#include "TSWorldObjectGroup.h"
#include "TSJson.h"
#include "TSMutable.h"

#include <set>
#include <map>
#include <cstdint>
#include <functional>
#include <string>

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

    void AddNamedTimer(std::string const& name, uint32_t time, int32_t loops, uint32_t flags, TimerCallback<T> callback)
    {
        m_entity->m_timers.add_named(name, time, loops, flags, callback);
    }

    void AddNamedTimer(std::string const& name, uint32_t time, int32_t loops, TimerCallback<T> callback)
    {
        m_entity->m_timers.add_named(name, time, loops, 0, callback);
    }

    void AddNamedTimer(std::string const& name, uint32_t time, TimerCallback<T> callback)
    {
        m_entity->m_timers.add_named(name, time, 1, 0, callback);
    }
    
    void AddTimer(uint32_t time, int32_t loops, uint32_t flags, TimerCallback<T> callback)
    {
        m_entity->m_timers.add(time, loops, flags, callback);
    }

    void AddTimer(uint32_t time, int32_t loops, TimerCallback<T> callback)
    {
        m_entity->m_timers.add(time, loops, 0, callback);
    }

    void AddTimer(uint32_t time, TimerCallback<T> callback)
    {
        m_entity->m_timers.add(time, 1, 0, callback);
    }

    void RemoveTimer(std::string const& name)
    {
        m_entity->m_timers.remove(name);
    }

    TSWorldObjectGroup * GetEntityGroup(std::string const& key)
    {
        return m_entity->m_groups.GetGroup(key);
    }

    void RemoveEntityGroup(std::string const& key)
    {
        m_entity->m_groups.RemoveGroup(key);
    }

    void ClearEntityGroup()
    {
        m_entity->m_groups.ClearGroups();
    }
private:
    void LAddNamedTimer0(std::string const& name, uint32_t time, int32_t loops, uint32_t flags, sol::protected_function callback)
    {
        m_entity->m_timers.add_named(name, time, loops, flags, callback);
    }

    void LAddNamedTimer1(std::string const& name, uint32_t time, int32_t loops, sol::protected_function callback)
    {
        m_entity->m_timers.add_named(name, time, loops, 0, callback);
    }

    void LAddNamedTimer2(std::string const& name, uint32_t time, sol::protected_function callback)
    {
        m_entity->m_timers.add_named(name, time, 1, 0, callback);
    }

    void LAddTimer0(uint32_t time, int32_t loops, uint32_t flags, sol::protected_function callback)
    {
        m_entity->m_timers.add(time, loops, flags, callback);
    }

    void LAddTimer1(uint32_t time, int32_t loops, sol::protected_function callback)
    {
        m_entity->m_timers.add(time, loops, 0, callback);
    }

    void LAddTimer2(uint32_t time, sol::protected_function callback)
    {
        m_entity->m_timers.add(time, 1, 0, callback);
    }
    friend class TSLua;
};
