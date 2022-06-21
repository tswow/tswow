#pragma once

#include "TSMain.h"
#include "TSString.h"
#include "TSLua.h"

#include "sol/sol.hpp"

#include <cstdint>

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

uint64_t TC_GAME_API now();

template <typename T>
class TSTimer;

template <typename T>
class TSTimers;

template <typename T>
using TimerCallback = std::function<void(T, TSTimer<T>*)>;

template <typename T>
class TC_GAME_API TSTimer {
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
    TSTimer(TSString name, uint32_t delay, int32_t repeats, uint32 flags, TimerCallback<T> callback)
        : m_name(name)
        , m_delay(delay)
        , m_repeats(repeats)
        , m_lastTick(now())
        , m_flags(flags)
        , m_callback(callback)
    {}

    TSTimer(TSString name, uint32_t delay, int32_t repeats, uint32 flags, sol::protected_function callback)
        : m_name(name)
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
                TSLua::handle_error(m_lua_callback(ctx, this));
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
    friend class TSLua;
    friend class TSTimers<T>;
};

template <typename T>
class TSTimers {
    std::vector<TSTimer<T>> m_timers;
    bool m_ticking = false;
public:

    void add(uint32_t time, int32_t repeats, uint32_t flags, TimerCallback<T> callback)
    {
        m_timers.push_back(TSTimer<T>(JSTR(""), time, repeats, flags, callback));
    }

    void add_named(TSString name, uint32_t time, int32_t repeats, uint32_t flags, TimerCallback<T> callback)
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
                    m_timers[i] = TSTimer<T>(name, time, repeats, flags, callback);
                    return;
                }
            }
        }
        m_timers.push_back(TSTimer<T>(name, time, repeats, flags, callback));
    }

    void add(uint32_t time, int32_t repeats, uint32_t flags, sol::protected_function callback)
    {
        m_timers.push_back(TSTimer<T>(JSTR(""), time, repeats, flags, callback));
    }

    void add_named(std::string const& name, uint32_t time, int32_t repeats, uint32_t flags, sol::protected_function callback)
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
                    m_timers[i] = TSTimer<T>(name, time, repeats, flags, callback);
                    return;
                }
            }
        }
        m_timers.push_back(TSTimer<T>(name, time, repeats, flags, callback));
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
