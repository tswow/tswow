#pragma once

#include "TSMain.h"

#include <map>
#include <set>
#include <functional>

class TSWorldObject;
class TC_GAME_API TSWorldObjectGroup {
    std::set<TSWorldObject> entries;
public:
    ~TSWorldObjectGroup();
    TSWorldObjectGroup* operator->() { return this; }

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