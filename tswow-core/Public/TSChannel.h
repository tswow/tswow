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
    std::string GetName(uint32 locale = 0);
    TSNumber<uint32> GetID();
    bool IsConstant();
    bool IsLFG();
    bool IsAnnounce();
    void SetAnnounce(bool announce);
    void SetDirty();
    void SetPassword(std::string const& password);
    bool CheckPassword(std::string const& password);
    TSNumber<uint32> GetNumPlayers();
    TSNumber<uint8> GetFlags();
    bool HasFlag(uint8 flag);
    void JoinChannel(TSPlayer player, std::string const& password = "");
    void LeaveChannel(TSPlayer player, bool send = true);
    void SetInvisible(TSPlayer player, bool on);
    void SetOwner(uint64 guid, bool exclaim = true);
    void Say(uint64 guid, std::string const& what, uint32 lang);
};