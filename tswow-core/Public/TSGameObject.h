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
#pragma once

#include "TSLoot.h"
#include "TSMain.h"
#include "TSClasses.h"
#include "TSWorldObject.h"

class TSGameObjectTemplate;

class TC_GAME_API TSGameObject : public TSWorldObject {
public:
    GameObject *go;
    TSGameObject(GameObject *go);
    TSGameObject();
    bool IsNull() { return go == nullptr; };
    TSGameObject* operator->() { return this;}
    bool HasQuest(uint32 questId);
    bool IsSpawned();
    bool IsTransport();
    bool IsActive();
    TSNumber<uint32> GetDisplayID();
    TSNumber<uint32> GetGoState();
    TSNumber<uint32> GetLootState();
    TSPlayer GetLootRecipient();
    TSGroup GetLootRecipientGroup();
    TSNumber<uint32> GetDBTableGUIDLow();
    void SetGoState(uint32 state);
    void SetLootState(uint32 state);
    void SaveToDB();
    void RemoveFromWorld(bool deldb);
    void UseDoorOrButton(uint32 delay);
    void Despawn(bool forced = false, uint32 delayMs = 0, uint32 respawnSec = 0);
    void Respawn();
    void SetRespawnTime(int32 respawn);
    TSLoot GetLoot();
    void FireSmartEvent(uint32 e, TSUnit unit, uint32 var0, uint32 var1, bool bvar, TSSpellInfo spell, TSGameObject gobj);
    bool IsAIEnabled();
    TSGameObjectTemplate GetTemplate();
};
