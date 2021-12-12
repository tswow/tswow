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
#include "ScriptMgr.h"
#include "ObjectMgr.h"
#include "Player.h"
#include "TSEvents.h"
#include "TSEventLoader.h"
#include "TSMutable.h"
#include "Player.h"
#include "TSPlayer.h"
#include "TSVehicle.h"
#include "TSUnit.h"
#include "TSSpell.h"
#include "TSCreature.h"
#include "TSGameObject.h"
#include "TSQuest.h"
#include "TSItem.h"
#include "QuestDef.h"
#include "TSMutableString.h"
#include "ItemTemplate.h"
#include "TSItemTemplate.h"
#include "TSSpellInfo.h"
#include "Group.h"
#include "TSGroup.h"
#include "Guild.h"
#include "TSGuild.h"
#include "SpellMgr.h"
#include "SpellInfo.h"
#include "TSChannel.h"
#include "TSWorldEntity.h"
#include "DBCStores.h"
#include "MapManager.h"
#include "Config.h"

#include <fstream>
#include <map>
#include <limits>

TSEventStore tsEvents;
std::map<std::string,TSEvents> eventHandlers;

std::map<std::string,uint32_t> modIds;
std::vector<uint32_t> reloads;

/** Network Message maps */
std::vector<MessageHandle<void>> messageMap;
std::map<uint32_t, std::vector<uint16_t>> messageModMap;

std::vector<MessageHandle<void>> & getMessageMap()
{
    return messageMap;
}

TSEventStore* GetTSEvents()
{
    return &tsEvents;
}

uint32_t GetReloads(uint32_t modid)
{
    return reloads[modid];
}

namespace {
    std::string getDatasetName(std::string const& dataDir)
    {
        boost::filesystem::path dataDirPath = dataDir;
        std::string curName = dataDirPath.filename().string();
        dataDirPath = dataDirPath.parent_path();
        while (dataDirPath.has_parent_path())
        {
            dataDirPath = dataDirPath.parent_path();
            std::string curDir = dataDirPath.filename().string();
            if (curDir == "modules") {
                return curName;
            }
            else {
                curName = curDir + std::string(".") + curName;
            }
        }
        throw std::runtime_error("DataDir is not in a valid submodule: " + dataDir);
    }

    std::string getLibraryDataset(std::string const& libName)
    {
        size_t name_offset = libName.find("scripts_tswow_") + strlen("scripts_tswow_");
        return libName.substr(name_offset, libName.find("_", name_offset) - name_offset);
    }
}

bool TSShouldLoadEventHandler(boost::filesystem::path const& name)
{
    std::string name_str = name.filename().string();
    if(name_str.size() <= 4)
    {
        return false;
    }
    auto res = getLibraryDataset(name_str) == getDatasetName(
        sConfigMgr->GetStringDefault("DataDir", "")
    );
    return res;
}

TSEvents* TSLoadEventHandler(boost::filesystem::path const& modulePath, std::string const& moduleName)
{
    std::string spath = modulePath.string();
    uint32_t modid = 0;
    if(modIds.find(spath) != modIds.end())
    {
        modid = modIds[spath];
    }
    else
    {
        modid = reloads.size();
        reloads.push_back(0);
    }

    auto handler = &(eventHandlers[spath] = TSEvents(modid,moduleName));
    handler->LoadEvents(&tsEvents);
    return handler;
}

static void RemoveData(WorldObject* obj)
{
    obj->m_tsEntity.m_compiledClasses.clear();
    obj->m_tsWorldEntity.clear();
    obj->m_tsCollisions.callbacks.clear();
}

struct RemoveWorker {
    void Visit(std::unordered_map<ObjectGuid, Creature*>& creatureMap)
    {
        for(auto const& p : creatureMap)
            RemoveData(p.second);
    }

    void Visit(std::unordered_map<ObjectGuid, GameObject*>& gameObjectMap)
    {
        for(auto const& p : gameObjectMap)
            RemoveData(p.second);
    }

    template<class T>
    void Visit(std::unordered_map<ObjectGuid, T*>&) { }
};

void TSUnloadEventHandler(boost::filesystem::path const& name)
{
    std::string sname = name.string();
    // Unload network message classes and handlers
    auto modid = modIds[sname];
    if(messageModMap.find(modid) != messageModMap.end())
    {
        auto vec = messageModMap[modid];
        for(auto g : vec)
        {
            if(g>messageMap.size()) {
                continue;
            }
            messageMap[g] = MessageHandle<void>();
        }
        messageModMap.erase(modid);
    }

    // Unload events
    std::map<std::string,TSEvents>::iterator iter
        = eventHandlers.find(sname);
    if(iter!=eventHandlers.end())
    {
        iter->second.Unload();
        reloads[iter->second.m_modid]++;
        eventHandlers.erase(sname);
    }

    // Clean up timers and storage for creatures and gameobjects
    sMapMgr->DoForAllMaps([](auto map){
        map->m_tsWorldEntity.clear();
        map->m_tsEntity.m_compiledClasses.clear();
        RemoveWorker worker;
        TypeContainerVisitor<RemoveWorker, MapStoredObjectTypesContainer> visitor(worker);
        visitor.Visit(map->GetObjectsStore());
    });

    // Clean up timers and storage for players
    for(auto &p : ObjectAccessor::GetPlayers())
    {
        RemoveData(p.second);
    }
}

struct ReloadGameObjectWorker {
    GameObjectOnReloadType _fn;
    uint32 _gobj_id;

    ReloadGameObjectWorker( GameObjectOnReloadType fn
                          , uint32 gobj_id
                          )
                          : _fn(fn)
                          , _gobj_id(gobj_id)
                          {}

    void Visit(std::unordered_map<ObjectGuid, GameObject*>& gameObjectMap)
    {
        for(auto const& p : gameObjectMap)
            if(_gobj_id == std::numeric_limits<uint32_t>::max() || p.second->GetGOInfo()->entry == _gobj_id)
                _fn(TSGameObject(p.second));
    }

    template<class T>
    void Visit(std::unordered_map<ObjectGuid, T*>&) { }
};
void ReloadGameObject(GameObjectOnReloadType fn, uint32 id)
{
    sMapMgr->DoForAllMaps([&](auto map){
        ReloadGameObjectWorker worker(fn,id);
        TypeContainerVisitor<ReloadGameObjectWorker, MapStoredObjectTypesContainer> visitor(worker);
        visitor.Visit(map->GetObjectsStore());
    });
}

void ReloadPlayer(PlayerOnReloadType fn, uint32 id)
{
    for(auto &p : ObjectAccessor::GetPlayers())
    {
        fn(TSPlayer(p.second), false);
    }
}

struct ReloadCreatureWorker {
    CreatureOnReloadType _fn;
    uint32 _creature_id;

    ReloadCreatureWorker( CreatureOnReloadType fn
                          , uint32 creature_id
                          )
                          : _fn(fn)
                          , _creature_id(creature_id)
                          {}

    void Visit(std::unordered_map<ObjectGuid, Creature*>& creatureMap)
    {
        for(auto const& p : creatureMap)
            if(_creature_id == std::numeric_limits<uint32_t>::max() || _creature_id == p.second->GetCreatureTemplate()->Entry)
                _fn(TSCreature(p.second));
    }

    template<class T>
    void Visit(std::unordered_map<ObjectGuid, T*>&) { }
};
void ReloadCreature(CreatureOnReloadType fn, uint32 id)
{
    sMapMgr->DoForAllMaps([&](auto map){
        ReloadCreatureWorker worker(fn,id);
        TypeContainerVisitor<ReloadCreatureWorker, MapStoredObjectTypesContainer> visitor(worker);
        visitor.Visit(map->GetObjectsStore());
    });
}

void ReloadMap(MapOnReloadType fn, uint32 id)
{
    sMapMgr->DoForAllMaps([&](auto map){
        if(id==std::numeric_limits<uint32_t>::max() || id == map->GetId())
        {
            fn(TSMap(map));
        }
    });
}

void ReloadInstance(InstanceOnReloadType fn, uint32 id)
{
    sMapMgr->DoForAllMaps([&](Map * map) {
        if (InstanceMap* inst = map->ToInstanceMap())
        {
            if (id == std::numeric_limits<uint32_t>::max() || id == map->GetId())
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

void ReloadBattleground(BattlegroundOnReloadType fn, uint32 id)
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



static std::map<uint32_t, TSMapDataExtra*> mapData;
TSMapDataExtra* GetMapDataExtra(uint32_t id)
{
    if(mapData.find(id) == mapData.end())
    {
        return (mapData[id] = new TSMapDataExtra());
    }
    else
    {
        return mapData[id];
    }
}

/** Network events */

void RegisterMessage(uint32_t modid, uint16_t opcode, uint8_t size, std::function<std::shared_ptr<void>(uint8_t*)> constructor)
{
    if(messageModMap.find(modid)==messageModMap.end())
    {
        messageModMap[modid] = std::vector<uint16_t>();
    }
    (&messageModMap[modid])->push_back(opcode);


    if(opcode>=messageMap.size())
    {
        messageMap.resize(opcode+1);
    }

    messageMap[opcode] = MessageHandle<void>(size,constructor);
}

MessageHandle<void>* GetMessage(uint16_t opcode)
{
    return &messageMap[opcode];
}

const std::string TSWOW_ITEM_PREFIX = "tswow_item:";
const std::string TSWOW_CREATURE_PREFIX = "tswow_creature:";

bool handleTSWoWGMMessage(Player* player, Player* receiver, std::string & msgIn)
{
    if(msgIn.size()<2) return false;
    std::string msg = msgIn.substr(1);

    if(player != receiver || !player->CanBeGameMaster()) {
        return false;
    }

    if(msg == "tswow_am_i_gm") {
        TSPlayer(player)->SendAddonMessage(JSTR(""),TSString("tswow_you_are_gm"),7,TSPlayer(player));
        return true;
    }

    if(msg.rfind(TSWOW_ITEM_PREFIX,0) == 0) {
        int itemId = atoi(msg.substr(TSWOW_ITEM_PREFIX.size()).c_str());
        auto data = sObjectMgr->GetItemTemplate(itemId);
        if(!data) return true;
        int displayId = data->DisplayInfoID;
        TSPlayer(player)->SendAddonMessage(
            JSTR("") ,
            TSString(
              std::string("tswow_item_response:") +
              std::to_string(itemId) +
              ":" +
              std::to_string(displayId)),
              7,
              TSPlayer(player));
        return true;
    }

    if(msg.rfind(TSWOW_CREATURE_PREFIX,0) == 0)
    {
        int creatureId = atoi(msg.substr(TSWOW_CREATURE_PREFIX.size()).c_str());
        auto data = sObjectMgr->GetCreatureTemplate(creatureId);
        if(!data) return true;
        TSPlayer(player)->SendAddonMessage(
              JSTR(""), TSString(
              std::string("tswow_creature_response:")+ std::to_string(creatureId) +
               ":" + std::to_string(data->faction)  +
               ":" + std::to_string(data->Modelid1) +
               ":" + std::to_string(data->Modelid2) +
               ":" + std::to_string(data->Modelid3) +
               ":" + std::to_string(data->Modelid4)),
               7,
               TSPlayer(player));
        return true;
    }

    return false;
}

void AddSC_tswow_commandscript();
void TSInitializeEvents()
{
    TSLoadEvents();
    AddSC_tswow_commandscript();
};
