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
#include "TSArray.h"

#include <sol/sol.hpp>

class TC_GAME_API TSGuild {
public:
    Guild *guild;
    TSGuild(Guild *guild);
    TSGuild();
    TSGuild* operator->() { return this;}
    operator bool() const { return guild != nullptr; }
    bool operator==(TSGuild const& rhs) { return guild == rhs.guild; }
    bool IsNull() { return guild == nullptr; };
    TSArray<TSPlayer> GetMembers();
    TSNumber<uint32> GetMemberCount();
    TSPlayer GetLeader();
    TSNumber<uint64> GetLeaderGUID();
    TSNumber<uint32> GetID();
    std::string GetName();
    std::string GetMOTD();
    std::string GetInfo();
    void SetLeader(TSPlayer player);
    void SetBankTabText(uint8 tabId, std::string const& text);
    void SendPacket(TSWorldPacket data);
    void SendPacket(std::shared_ptr<TSWorldPacket> data);
    void SendPacketToRanked(TSWorldPacket data, uint8 ranked);
    void SendPacketToRanked(std::shared_ptr<TSWorldPacket> data, uint8 ranked);
    void Disband();
    void AddMember(TSPlayer player, uint8 rankId);
    void DeleteMember(TSPlayer player, bool isDisbanding);
    void SetMemberRank(TSPlayer player, uint8 newRank);
private:
    TSLua::Array<TSPlayer> LGetMembers();
};

TSGuild TC_GAME_API GetGuild(uint32 id);
TSGuild TC_GAME_API GetGuildByName(std::string const& name);
TSGuild TC_GAME_API GetGuildByLeader(uint64 owner);
