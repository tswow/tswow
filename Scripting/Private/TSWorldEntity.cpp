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
#include "TSWorldEntity.h"
#include "TSWorldObject.h"

uint64_t now()
{
    return std::chrono::duration_cast<std::chrono::milliseconds>
        (std::chrono::high_resolution_clock::now().time_since_epoch()).count();
}


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

uint32 TSWorldObjectGroup::get_length()
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
    for(auto entry: entries)
    {
        entry.RemovedByGroup(this);
    }
    entries.clear();
}

TSWorldObjectGroup* TSWorldObjectGroups::GetGroup(TSString key)
{
    if (groups.find(key.std_str()) == groups.end())
    {
        groups[key.std_str()] = TSWorldObjectGroup();
    }
    return &groups[key.std_str()];
}

void TSWorldObjectGroups::RemoveGroup(TSString key)
{
    if(groups.find(key.std_str()) == groups.end())
    {
        return;
    }
    groups[key.std_str()].Clear();
    groups.erase(key.std_str());
}

void TSWorldObjectGroups::ClearGroups()
{
    for(auto & group: groups)
    {
        group.second.Clear();
    }
    groups.clear();
}

TSBinaryMessage::TSBinaryMessage(uint32_t size)
{
    bytes = new uint8_t[size];
}

TSBinaryMessage::~TSBinaryMessage()
{
    delete[] bytes;
}
