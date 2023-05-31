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
#include "TSArray.h"
#include "TSClasses.h"

#include <sol/sol.hpp>

class TSGUID;

class TC_GAME_API TSGroup {
public:
    Group* group;
    TSGroup(Group* group);
    TSGroup();
    TSGroup* operator->() { return this;}
    operator bool() const { return group != nullptr; }
    bool operator==(TSGroup const& rhs) { return group == rhs.group; }

    bool IsNull() { return group == nullptr; };
    bool IsLeader(TSGUID guid);
    bool IsLeader(TSNumber<uint32> guid);
    bool IsFull();
    bool IsRaidGroup();
    bool IsBGGroup();
    bool IsMember(TSGUID guid);
    bool IsAssistant(TSGUID guid);
    bool IsMember(TSNumber<uint32> guid);
    bool IsAssistant(TSNumber<uint32> guid);
    bool SameSubGroup(TSPlayer player1, TSPlayer player2);
    bool HasFreeSlotSubGroup(uint8 subGroup);
    bool AddMember(TSPlayer player);
    TSArray<TSPlayer> GetMembers();
    TSGUID GetLeaderGUID();
    TSGUID GetGUID();
    TSGUID GetMemberGUID(std::string const& name);
    TSNumber<uint32> GetMembersCount();
    TSNumber<uint8> GetMemberGroup(TSGUID guid);
    TSNumber<uint8> GetMemberGroup(TSNumber<uint32> guid);
    void SetLeader(TSGUID guid);
    void SetLeader(TSNumber<uint32> guid);
    void SendPacket(TSWorldPacket data, bool ignorePlayersInBg, TSGUID ignore);
    void SendPacket(TSWorldPacket data, bool ignorePlayersInBg, TSNumber<uint32> ignore);
    void SendPacket(std::shared_ptr<TSWorldPacket> data, bool ignorePlayersInBg, TSGUID ignore);
    void SendPacket(std::shared_ptr<TSWorldPacket> data, bool ignorePlayersInBg, TSNumber<uint32> ignore);
    bool RemoveMember(TSGUID guid, uint32 method);
    bool RemoveMember(TSNumber<uint32> guid, uint32 method);
    void Disband();
    void ConvertToRaid();
    void SetMembersGroup(TSGUID guid, uint8 subGroup);
    void SetMembersGroup(TSNumber<uint32> guid, uint8 subGroup);
    void SetTargetIcon(uint8 icon, TSGUID target, TSGUID setter);
    bool IsLFGGroup();
    bool IsBFGroup();
private:
    friend class TSLua;
    TSLua::Array<TSPlayer> LGetMembers();

    bool LIsLeader0(TSGUID guid);
    bool LIsLeader1(TSNumber<uint32> guid);

    bool LIsAssistant0(TSGUID guid);
    bool LIsAssistant1(TSNumber<uint32> guid);
    bool LIsMember0(TSGUID guid);
    bool LIsMember1(TSNumber<uint32> guid);

    void LSetLeader0(TSGUID guid);
    void LSetLeader1(TSNumber<uint32> guid);

    bool LRemoveMember0(TSGUID guid, uint32 method);
    bool LRemoveMember1(TSNumber<uint32> guid, uint32 method);

    TSNumber<uint8> LGetMemberGroup0(TSGUID guid);
    TSNumber<uint8> LGetMemberGroup1(TSNumber<uint32> guid);

    void LSetMembersGroup0(TSGUID guid, uint8 subGroup);
    void LSetMembersGroup1(TSNumber<uint32> guid, uint8 subGroup);
};
