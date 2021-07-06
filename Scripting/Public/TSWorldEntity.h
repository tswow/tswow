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
class TC_GAME_API TSMessageQueue {
    std::mutex m_jsonMessageLock;
    std::vector<JsonMessage<T>> m_jsonMessages;
public:
    void queue(uint8_t channel, TSJsonObject obj, JsonMessageCallback<T> callback)
    {
        const std::lock_guard<std::mutex> lock(m_jsonMessageLock);
        m_jsonMessages.push_back(JsonMessage(channel, obj, callback));
    }

    void fire(T ctx)
    {
        // avoid deadlock: do not fire arbitrary code when locked
        m_jsonMessageLock.lock();
        std::vector<JsonMessage<T>> copiedMessages(m_jsonMessages);
        m_jsonMessages.clear();
        m_jsonMessageLock.unlock();
        for (auto& msg : copiedMessages)
        {
            msg.fire(ctx);
        }
    }

    void clear()
    {
        const std::lock_guard<std::mutex> lock(m_jsonMessageLock);
        m_jsonMessages.clear();
    }
};

template <typename T>
class TSTimer;

template <typename T>
using TimerCallback = std::function<void(TSTimer<T>*,T,unsigned,TSMutable<bool>)>;

template <typename T>
class TC_GAME_API TSTimer {
    uint32_t m_modid;
    TSString m_name;
    uint32_t m_delay;
    uint32_t m_repeats;
    uint32_t m_lastTick;
    TimerCallback<T> m_callback;
public:
    TSTimer(uint32_t modid, TSString name, uint32_t delay, uint32_t repeats, TimerCallback<T> callback)
        : m_modid(modid)
        , m_name(name)
        , m_delay(delay)
        , m_repeats(repeats)
        , m_lastTick(now())
        , m_callback(callback)
    {}

    TSString getName()
    {
        return m_name;
    }

    bool Tick(T ctx)
    {
        uint64_t n = now();
        uint64_t diff = n - m_lastTick;
        uint64_t loops = m_delay == 0 ? 1 : uint64_t(double(diff) / double(m_delay));
        if (m_repeats != 0)
        {
            loops = loops < m_repeats ? loops : m_repeats;
        }
        bool stop = false;

        for (uint64_t loop = 0; loop < loops; ++loop)
        {
            m_callback(this, ctx, diff, TSMutable<bool>(&stop));
            m_lastTick = n;
            if (stop)
            {
                return true;
            }
        }

        if (m_repeats != 0)
        {
            m_repeats -= loops;
            if (m_repeats == 0)
            {
                return true;
            }
        }
        return false;
    }
};

template <typename T>
class TSTimers {
    std::vector<TSTimer<T>> m_timers;
public:
    void add(uint32_t modid, TSString name, uint32_t time, uint32_t repeats, TimerCallback<T> callback)
    {
        for (int i = 0; i < m_timers.size(); ++i)
        {
            if (m_timers[i].getName() == name)
            {
                m_timers[i] = TSTimer<T>(modid, name, time, repeats, callback);
                return;
            }
        }
        m_timers.push_back(TSTimer<T>(modid, name, time, repeats, callback));
    }

    void remove(TSString name)
    {
        for (auto iter = m_timers.begin(); iter != m_timers.end(); ++iter)
        {
            if (iter->name == name)
            {
                m_timers.erase(iter);
            }
        }
    }

    void tick(T context)
    {
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
    }

    void clear()
    {
        m_timers.clear();
    }
};

// The class stored on core entities (Map/WorldObject)
template <typename T>
struct TSWorldEntity {
    TSWorldObjectGroups m_groups;
    TSMessageQueue<T> m_messages;
    TSTimers<T> m_timers;

    void tick(T ctx)
    {
        m_messages.fire(ctx);
        m_timers.tick(ctx);
    }

    void clear()
    {
        m_messages.clear();
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

    void AddTimer(uint32_t modid, TSString name, uint32_t time, uint32_t repeats, TimerCallback<T> callback)
    {
        m_entity->m_timers.add(modid, name, time, repeats, callback);
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

    void QueueMessage(uint8_t channel, TSJsonObject obj, JsonMessageCallback<T> callback)
    {
        m_entity->m_messages.queue(channel, obj, callback);
    }
};
