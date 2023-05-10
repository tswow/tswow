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
#include "TSEvents.h"
#include "TSGameObject.h"
#include "TSCreature.h"
#include "TSPlayer.h"
#include "TSMap.h"
#include "TSInstance.h"
#include "TSBattleground.h"
#if TRINITY
#include "MapManager.h"
#elif AZEROTHCORE
#include "MapMgr.h"
#endif
#include "GameObject.h"
#include "Creature.h"
#include "ObjectMgr.h"
#include "SpellMgr.h"
#include "CreatureData.h"
#include "DBCStores.h"
#include "AchievementMgr.h"
#include "SpellMgr.h"
#include "SpellInfo.h"
#include "Config.h"

#include <fstream>
#include <map>
#include <limits>

// ============================================================================
//
//  - Registry References -
//
// ============================================================================

TSRegistryRef& TSEvents::SpellEvents::get_registry_ref(uint32_t id)
{
    return const_cast<TSRegistryRef&>(sSpellMgr->GetSpellInfo(id)->events);
}

TSRegistryRef& TSEvents::CreatureEvents::get_registry_ref(uint32_t id)
{
    return const_cast<TSRegistryRef&>(sObjectMgr->GetCreatureTemplate(id)->events);
}

TSRegistryRef& TSEvents::VehicleEvents::get_registry_ref(uint32_t id)
{
    return const_cast<TSRegistryRef&>(sObjectMgr->GetCreatureTemplate(id)->events);
}

TSRegistryRef& TSEvents::GameObjectEvents::get_registry_ref(uint32_t id)
{
    return const_cast<TSRegistryRef&>(sObjectMgr->GetGameObjectTemplate(id)->events);
}

TSRegistryRef& TSEvents::ItemEvents::get_registry_ref(uint32_t id)
{
    return const_cast<TSRegistryRef&>(sObjectMgr->GetItemTemplate(id)->events);
}

TSRegistryRef& TSEvents::QuestEvents::get_registry_ref(uint32_t id)
{
    return const_cast<TSRegistryRef&>(sObjectMgr->GetQuestTemplate(id)->events);
}

// ============================================================================
//
//  - Reloading -
//
// ============================================================================

template <typename TC, typename TS>
class ReloadMapObject {
public:
    ReloadMapObject(std::function<void(TS)> fn, uint32 gobj_id)
        : m_cxx_cb(fn)
        , m_gobj_id(gobj_id)
        {
            Run();
        }

    ReloadMapObject( sol::protected_function cb, uint32 gobj_id)
        : m_cxx_cb(nullptr)
        , m_gobj_id(gobj_id)
        , m_lua_cb(cb)
        {
            Run();
        }

    ReloadMapObject() = default;

    void Visit(std::unordered_map<ObjectGuid, TC*>& objMap)
    {
        for (auto const& entry : objMap)
        {
            if (m_gobj_id == UINT32_MAX || entry.second->GetEntry() == m_gobj_id)
            {
                if (m_cxx_cb)
                {
                    m_cxx_cb(TS(entry.second));
                }

                if(m_lua_cb.valid())
                {
                    m_lua_cb(TS(entry.second));
                }
            }
        }
    }

    template<class T>
    void Visit(std::unordered_map<ObjectGuid, T*>&) { }
private:
    std::function<void(TS)> m_cxx_cb;
    sol::protected_function m_lua_cb;
    uint32 m_gobj_id;

    void Run()
    {
        sMapMgr->DoForAllMaps([&](auto map) {
            TypeContainerVisitor<ReloadMapObject<TC,TS>, MapStoredObjectTypesContainer> visitor(*this);
            visitor.Visit(map->GetObjectsStore());
        });
    }
};

template <typename T>
static void _ReloadMap(T fn, uint32 id)
{
    sMapMgr->DoForAllMaps([&](auto map){
        if(id == UINT32_MAX || id == map->GetId())
        {
            fn(TSMap(map));
        }
    });
}

template <typename T>
static void _ReloadPlayers(T fn)
{
    for (auto & [_,player] : ObjectAccessor::GetPlayers())
    {
        fn(TSPlayer(player), false);
    }
}

template <typename T>
static void _ReloadInstance(T fn, uint32 id)
{
    sMapMgr->DoForAllMaps([&](Map * map) {
        if (InstanceMap* inst = map->ToInstanceMap())
        {
            if (id == UINT32_MAX || id == map->GetId())
            {
                InstanceScript* script = inst->GetInstanceScript();
                if (script)
                {
                    fn(TSInstance(inst,script));
                }
            }
        }
    });
}

template <typename T>
static void _ReloadBattleground(T fn, uint32 id)
{
    sMapMgr->DoForAllMaps([&](Map* map) {
        if (BattlegroundMap* bgmap = map->ToBattlegroundMap())
        {
            if (id == std::numeric_limits<uint32_t>::max() || id == map->GetId())
            {
                Battleground* bg = bgmap->GetBG();
                if (bg)
                {
                    fn(TSBattleground(bgmap,bg));
                }
            }
        }
    });
}

void ReloadPlayer(std::function<void(TSPlayer,bool)> fn)
{
    _ReloadPlayers(fn);
}
void ReloadPlayer(sol::protected_function cb)
{
    _ReloadPlayers(cb);
}

void ReloadCreature(std::function<void(TSCreature)> fn)
{
    ReloadMapObject<Creature,TSCreature>(fn, UINT32_MAX);
}
void ReloadCreature(std::function<void(TSCreature)> fn, TSNumber<uint32> id)
{
    ReloadMapObject<Creature, TSCreature>(fn, id);
}
void ReloadCreature(sol::protected_function cb)
{
    ReloadMapObject<Creature, TSCreature>(cb, UINT32_MAX);
}
void ReloadCreature(sol::protected_function cb, TSNumber<uint32> id)
{
    ReloadMapObject<Creature, TSCreature>(cb, id);
}

void ReloadGameObject(std::function<void(TSGameObject)> fn)
{
    ReloadMapObject<GameObject, TSGameObject>(fn, UINT32_MAX);
}
void ReloadGameObject(std::function<void(TSGameObject)> fn, TSNumber<uint32> id)
{
    ReloadMapObject<GameObject, TSGameObject>(fn, id);
}
void ReloadGameObject(sol::protected_function cb)
{
    ReloadMapObject<GameObject, TSGameObject>(cb, UINT32_MAX);
}
void ReloadGameObject(sol::protected_function cb, TSNumber<uint32> id)
{
    ReloadMapObject<GameObject, TSGameObject>(cb, id);
}

void ReloadMap(std::function<void(TSMap)> fn)
{
    _ReloadMap(fn, UINT32_MAX);
}

void ReloadMap(std::function<void(TSMap)> fn, TSNumber<uint32> id)
{
    _ReloadMap(fn, id);
}

void ReloadMap(sol::protected_function cb)
{
    _ReloadMap(cb, UINT32_MAX);
}

void ReloadMap(sol::protected_function cb, TSNumber<uint32> id)
{
    _ReloadMap(cb, id);
}

void ReloadBattleground(std::function<void(TSBattleground)> fn)
{
    _ReloadBattleground(fn, UINT32_MAX);
}
void ReloadBattleground(std::function<void(TSBattleground)> fn, TSNumber<uint32> id)
{
    _ReloadBattleground(fn, id);
}
void ReloadBattleground(sol::protected_function cb)
{
    _ReloadBattleground(cb, UINT32_MAX);
}
void ReloadBattleground(sol::protected_function cb, TSNumber<uint32> id)
{
    _ReloadBattleground(cb, id);
}

void ReloadInstance(std::function<void(TSInstance)> fn)
{
    _ReloadInstance(fn, UINT32_MAX);
}
void ReloadInstance(std::function<void(TSInstance)> fn, TSNumber<uint32> id)
{
    _ReloadInstance(fn, id);
}
void ReloadInstance(sol::protected_function cb)
{
    _ReloadInstance(cb, UINT32_MAX);
}
void ReloadInstance(sol::protected_function cb, TSNumber<uint32> id)
{
    _ReloadInstance(cb, id);
}

TSEvents ts_events;
