/*
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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

#include "TSStorage.h"
#include "TSWorldObject.h"

TSObjectGroup::~TSObjectGroup()
{
    for (auto entry : entries)
    {
        entry.RemovedByGroup(this);
    }
}

void TSObjectGroup::add(TSWorldObject obj)
{
    entries.insert(obj);
    obj.AddedByGroup(this);
}

void TSObjectGroup::remove(TSWorldObject obj)
{
    entries.erase(obj);
    obj.RemovedByGroup(this);
}

void TSObjectGroup::RemovedByObject(TSWorldObject obj)
{
    entries.erase(obj);
}

std::set<TSWorldObject>::iterator TSObjectGroup::begin()
{
    return entries.begin();
}

std::set<TSWorldObject>::iterator TSObjectGroup::end()
{
    return entries.end();
}

uint32 TSObjectGroup::size()
{
    return entries.size();
}

void TSObjectGroup::forEach(std::function<void(TSWorldObject)> callback)
{
    for (auto& entry : entries)
    {
        callback(entry);
    }
}

void TSObjectGroup::filterInPlace(std::function<bool(TSWorldObject)> callback)
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

void TSObjectGroup::clear()
{
    for(auto entry: entries)
    {
        entry.RemovedByGroup(this);
    }
    entries.clear();
}

TSObjectGroup* TSStorage::GetGroup(TSString key)
{
    if (groups.find(key.std_str()) == groups.end())
    {
        groups[key.std_str()] = TSObjectGroup();
    }
    return &groups[key.std_str()];
}

void TSStorage::RemoveGroup(TSString key)
{
    if(groups.find(key.std_str()) == groups.end())
    {
        return;
    }
    groups[key.std_str()].clear();
    groups.erase(key.std_str());
}

void TSStorage::ClearGroups()
{
    for(auto & group: groups)
    {
        group.second.clear();
    }
    groups.clear();
}
