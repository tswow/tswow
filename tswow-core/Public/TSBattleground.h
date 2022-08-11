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
#include "TSEntity.h"
#include "TSWorldEntity.h"
#include "TSMap.h"

#include <sol/sol.hpp>
#include <vector>

class TSPlayer;
class TSWorldPacket;

class TC_GAME_API TSBattlegroundPlayer: public TSEntityProvider {
    uint64 m_guid;
    uint32 m_team;
    int64 m_offlineRemoveTime;
public:
    TSBattlegroundPlayer();
    TSBattlegroundPlayer(TSBattleground bg, uint64 guid, uint32 team, int64 offlineRemoveTime);
    operator bool() const { return m_guid > 0; }
    bool operator==(TSBattlegroundPlayer const& rhs) { return m_guid == rhs.m_guid; }
    TSNumber<uint64> GetGUID();
    TSNumber<uint32> GetTeam();
    TSNumber<int64> GetOfflineRemoveTime();
};

#define TS_TEAM_ALLIANCE 0
#define TS_TEAM_HORDE 1
#define TS_TEAM_NEUTRAL 2

class TC_GAME_API TSBattleground: public TSMap {
public:
    friend class TSBattlegroundPlayer;
    Battleground* bg;
    TSBattleground(Map*, Battleground* bg);
    TSBattleground();
    bool IsNull() { return bg == nullptr || map == nullptr; };
    operator bool() const { return map != nullptr && bg != nullptr; }
    TSBattleground* operator->() { return this;}
    TSNumber<uint32> GetBracketID();
    std::string GetBGName();
    TSNumber<uint32> GetAlivePlayersCountByTeam(uint32 team);
    TSNumber<uint32> GetBonusHonorFromKillCount(uint32 kills);
    TSNumber<uint32> GetEndTime();
    TSNumber<uint32> GetFreeSlotsForTeam(uint32 team);
    TSNumber<uint32> GetInstanceID();
    TSNumber<uint32> GetTypeID();
    TSNumber<uint32> GetMaxLevel();
    TSNumber<uint32> GetMinLevel();
    TSNumber<uint32> GetMaxPlayers();
    TSNumber<uint32> GetMinPlayers();
    TSNumber<uint32> GetMaxPlayersPerTeam();
    TSNumber<uint32> GetMinPlayersPerTeam();
    TSNumber<uint32> GetWinner();
    TSNumber<uint32> GetStatus();

    bool IsRandom();
    TSBattlegroundPlayer GetBGPlayer(uint64 guid);
    TSArray<TSBattlegroundPlayer> GetBGPlayers();
    void SetStartPosition(uint32 teamid, float x, float y, float z, float o);
    TSNumber<float> GetStartX(uint32 teamid);
    TSNumber<float> GetStartY(uint32 teamid);
    TSNumber<float> GetStartZ(uint32 teamid);
    TSNumber<float> GetStartO(uint32 teamid);
    void SetStartMaxDist(float maxDist);
    TSNumber<float> GetStartMaxDist();
    void SendPacket(TSWorldPacket packet, uint32 team, TSPlayer sender, bool self);
    void PlaySound(uint32 sound, uint32 team = TS_TEAM_NEUTRAL);
    void CastSpell(uint32 spell, uint32 team = TS_TEAM_NEUTRAL);
    void RemoveAura(uint32 aura, uint32 team = TS_TEAM_NEUTRAL);
    void RewardHonor(uint32 honor, uint32 team = TS_TEAM_NEUTRAL);
    void RewardReputation(uint32 faction, uint32 reputation, uint32 team = TS_TEAM_NEUTRAL);
    void UpdateWorldState(uint32 variable, uint32 value);
    void EndBG(uint32 winnerTeam = TS_TEAM_NEUTRAL);
    TSGroup GetBGRaid(uint32 faction);
    TSNumber<uint32> GetBGPlayerCount(uint32 team = TS_TEAM_NEUTRAL);
    TSNumber<uint32> GetBGAlivePlayerCount(uint32 team = TS_TEAM_NEUTRAL);
    TSCreature AddCreature(uint32 entry, uint32 type, float x, float y, float z, float o, uint32 respawnTime = 0, uint32 teamId = TS_TEAM_NEUTRAL);
    bool AddObject(uint32 type, uint32 entry, float x, float y, float z, float o, float rot0, float rot1, float rot2, float rot3, uint32 respawnTime = 0, uint32 goState = 1);
    void AddSpiritGuide(uint32 type, float x, float y, float z, float o, uint32 teamId = TS_TEAM_NEUTRAL);
    void OpenDoor(uint32 type);
    void CloseDoor(uint32 type);
    bool IsPlayerInBG(uint64 guid);
    TSNumber<uint32> GetTeamScore(uint32 team);
    void SendMessage(uint32 entry, uint8 type, TSPlayer source);
    TSNumber<uint32> GetUniqueBracketID();

    TSNumber<int32> GetStartDelayTime();
    void SetStartDelayTime(int32 time);
    void SetStartTime(uint32 time);
    TSNumber<uint32> GetStartTime();
    bool RemoveCreature(uint32 type);
    bool RemoveObject(uint32 type);
    bool RemoveObjectFromWorld(uint32 type);
    TSNumber<int32> GetObjectType(uint64 guid);
    void SetHoliday(bool isHoliday);
    bool IsHoliday();

    TSGameObject GetBGGameObject(uint32 type, bool logErrors = false);
    TSCreature GetBGCreature(uint32 type, bool logErrors = false);
};
