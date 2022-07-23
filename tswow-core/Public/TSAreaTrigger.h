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
#pragma once

#include "TSMain.h"
#include "TSBase.h"

struct AreaTriggerEntry;
struct TSAreaTriggerEvents;

#if TRINITY

class TC_GAME_API TSAreaTriggerEntry {
    AreaTriggerEntry* m_entry;
public:
    TSAreaTriggerEntry(AreaTriggerEntry* entry);
    TSAreaTriggerEntry* operator->() { return this; }
    operator bool() const { return m_entry != nullptr; }
    bool operator==(TSAreaTriggerEntry const& rhs) {
        return m_entry == rhs.m_entry;
    }
    TSNumber<uint32> GetEntry();
    TSNumber<uint32> GetContinentID();
    TSNumber<float> GetX();
    TSNumber<float> GetY();
    TSNumber<float> GetZ();
    TSNumber<float> GetRadius();
    TSNumber<float> GetBoxLength();
    TSNumber<float> GetBoxWidth();
    TSNumber<float> GetBoxHeight();
    TSNumber<float> GetBoxYaw();
};

void InitializeAreaTriggerEvents(uint32 entry, TSAreaTriggerEvents* events);
TSAreaTriggerEvents* GetAreaTriggerEvents(uint32 entry);
#endif
