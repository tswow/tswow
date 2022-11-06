#include "TSLibLoader.h"

#include "TSLua.h"
#include "TSLivescripts.h"
#include "TSEvents.h"

#include "Config.h"
#include "MapManager.h"
#include "ObjectAccessor.h"

#include <string>
#include <map>
#include <iostream>
#include <boost/filesystem.hpp>
#include <iostream>
#include <thread>

namespace fs = boost::filesystem;
typedef void (*LibFuncPtr)(TSEvents*);

struct TSEvents;

struct DataRemover {
    static void RemoveData(WorldObject* obj)
    {
        obj->m_tsEntity.m_compiledClasses.clear();
        obj->m_tsEntity.m_lua_tables.clear();
        obj->m_tsWorldEntity.clear();
        obj->m_tsCollisions.callbacks.clear();
        obj->m_delayedLuaCallbacks.clear();
        obj->m_delayedCallbacks.clear();
    }
    void Visit(std::unordered_map<ObjectGuid, Creature*>& creatureMap)
    {
        for (auto const& p : creatureMap)
            RemoveData(p.second);
    }

    void Visit(std::unordered_map<ObjectGuid, GameObject*>& gameObjectMap)
    {
        for (auto const& p : gameObjectMap)
            RemoveData(p.second);
    }

    template<class T>
    void Visit(std::unordered_map<ObjectGuid, T*>&) { }

    static void Run()
    {
        sMapMgr->DoForAllMaps([](Map* map) {
            map->m_tsWorldEntity.clear();
            map->m_tsEntity.m_compiledClasses.clear();
            map->m_tsEntity.m_lua_tables.clear();
            map->m_delayLuaCallbacks.clear();
            map->m_delayCallbacks.clear();
            DataRemover worker;
            TypeContainerVisitor<DataRemover, MapStoredObjectTypesContainer> visitor(worker);
            visitor.Visit(map->GetObjectsStore());
        });

        for (auto& p : ObjectAccessor::GetPlayers())
        {
            RemoveData(p.second);
        }
    }
};

void LoadTSLibraries()
{
    TS_LOG_INFO("tswow.livescripts", "Reloading livescripts");
    ts_clear_events();
    DataRemover::Run();
    if (sConfigMgr->GetBoolDefault("TSWoW.EnableLua", true))
    {
        TSLua::Load();
    }
    TSLivescripts::Load();
}