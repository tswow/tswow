#include "TSWorldObjectGroup.h"

TSWorldObjectGroup::~TSWorldObjectGroup()
{
    for (auto entry : entries)
    {
        entry.RemovedByGroup(this);
    }
}

void TSWorldObjectGroup::Add(TSWorldObject obj)
{
    entries.insert(obj);
    obj.AddedByGroup(this);
}

void TSWorldObjectGroup::Remove(TSWorldObject obj)
{
    entries.erase(obj);
    obj.RemovedByGroup(this);
}

void TSWorldObjectGroup::RemovedByObject(TSWorldObject obj)
{
    entries.erase(obj);
}

std::set<TSWorldObject>::iterator TSWorldObjectGroup::begin()
{
    return entries.begin();
}

std::set<TSWorldObject>::iterator TSWorldObjectGroup::end()
{
    return entries.end();
}

TSNumber<uint32> TSWorldObjectGroup::get_length()
{
    return entries.size();
}

void TSWorldObjectGroup::forEach(std::function<void(TSWorldObject)> callback)
{
    for (auto& entry : entries)
    {
        callback(entry);
    }
}

void TSWorldObjectGroup::filterInPlace(std::function<bool(TSWorldObject)> callback)
{
    std::set<TSWorldObject>::iterator it = entries.begin();
    while (it != entries.end())
    {
        if (!callback(*it))
        {
            it = entries.erase(it);
        }
        else
        {
            ++it;
        }
    }
}

void TSWorldObjectGroup::Clear()
{
    for (auto entry : entries)
    {
        entry.RemovedByGroup(this);
    }
    entries.clear();
}

TSWorldObjectGroup* TSWorldObjectGroups::GetGroup(std::string const& key)
{
    if (groups.find(key) == groups.end())
    {
        groups[key] = TSWorldObjectGroup();
    }
    return &groups[key];
}

void TSWorldObjectGroups::RemoveGroup(std::string const& key)
{
    if (groups.find(key) == groups.end())
    {
        return;
    }
    groups[key].Clear();
    groups.erase(key);
}

void TSWorldObjectGroups::ClearGroups()
{
    for (auto& group : groups)
    {
        group.second.Clear();
    }
    groups.clear();
}