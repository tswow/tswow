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
    TSNumber<uint32> get_length();

    void forEach(std::function<void(TSWorldObject)> callback);
    void filterInPlace(std::function<bool(TSWorldObject)> callback);
};

class TC_GAME_API TSWorldObjectGroups {
    std::map<std::string, TSWorldObjectGroup> groups;
public:
    TSWorldObjectGroup* GetGroup(std::string const& key);
    void RemoveGroup(std::string const& key);
    void ClearGroups();
};