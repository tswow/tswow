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

#include "TSMain.h"
#include "TSClasses.h"
#include "TSString.h"

#include <sol/sol.hpp>
#include <vector>

class TC_GAME_API TSChannel {
public:
    Channel* channel;
    TSChannel(Channel* channel);
    TSChannel();
    TSChannel* operator->() { return this;}
    operator bool() const { return channel != nullptr; }
    bool operator==(TSChannel const& rhs) { return channel == rhs.channel; }
    TSString GetName(uint32 locale = 0);
    uint32 GetID();
    bool IsConstant();
    bool IsLFG();
    bool IsAnnounce();
    void SetAnnounce(bool announce);
    void SetDirty();
    void SetPassword(TSString password);
    bool CheckPassword(TSString password);
    uint32 GetNumPlayers();
    uint8 GetFlags();
    bool HasFlag(uint8 flag);
    void JoinChannel(TSPlayer player, TSString password = JSTR(""));
    void LeaveChannel(TSPlayer player, bool send = true);
    void SetInvisible(TSPlayer player, bool on);
    void SetOwner(uint64 guid, bool exclaim = true);
    void Say(uint64 guid, TSString what, uint32 lang);
private:
    std::string LGetName0(uint32 locale);
    std::string LGetName1();

    void LSetPassword(std::string const& password);
    bool LCheckPassword(std::string const& password);

    void LJoinChannel0(TSPlayer player, std::string const& password);
    void LJoinChannel1(TSPlayer player);

    void LSay(uint64 guid, std::string const& what, uint32 lang);
    friend class TSLuaState;
};