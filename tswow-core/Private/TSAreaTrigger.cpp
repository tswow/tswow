/*
 * This file is part of tswow (https://github.com/tswow/).
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

#include "TSAreaTrigger.h"
#include "TSEvents.h"
#include "DBCStructure.h"

#include <vector>

#if TRINITY

TSAreaTriggerEntry::TSAreaTriggerEntry(AreaTriggerEntry* entry)
: m_entry(entry)
{}

TSNumber<uint32> TSAreaTriggerEntry::GetEntry()
{
#if TRINITY
    return m_entry->ID;
#elif AZEROTHCORE
    return m_entry->
#endif
}

TSNumber<uint32> TSAreaTriggerEntry::GetContinentID()
{
    return m_entry->ContinentID;
}

TSNumber<float> TSAreaTriggerEntry::GetX()
{
    return m_entry->Pos.X;
}

TSNumber<float> TSAreaTriggerEntry::GetY()
{
    return m_entry->Pos.Y;
}
TSNumber<float> TSAreaTriggerEntry::GetZ()
{
    return m_entry->Pos.Z;
}
TSNumber<float> TSAreaTriggerEntry::GetRadius()
{
    return m_entry->Radius;
}
TSNumber<float> TSAreaTriggerEntry::GetBoxLength()
{
    return m_entry->BoxLength;
}
TSNumber<float> TSAreaTriggerEntry::GetBoxWidth()
{
    return m_entry->BoxWidth;
}
TSNumber<float> TSAreaTriggerEntry::GetBoxHeight()
{
    return m_entry->BoxHeight;
}
TSNumber<float> TSAreaTriggerEntry::GetBoxYaw()
{
    return m_entry->BoxYaw;
}

std::vector<TSAreaTriggerEvents*> triggerEvents;
void InitializeAreaTriggerEvents(uint32 entry, TSAreaTriggerEvents* events)
{
    while (entry >= triggerEvents.size())
    {
        triggerEvents.resize(triggerEvents.size() + 1000, nullptr);
    }
    triggerEvents[entry] = events;
}

TSAreaTriggerEvents* GetAreaTriggerEvents(uint32 entry)
{
    if (entry >= triggerEvents.size())
    {
        return nullptr;
    }
    return triggerEvents[entry];
}
#endif
