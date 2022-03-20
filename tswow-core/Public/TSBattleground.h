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
    uint64 GetGUID();
    uint32 GetTeam();
    int64 GetOfflineRemoveTime();
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
    uint32 GetBracketID();
    TSString GetBGName();
    uint32 GetAlivePlayersCountByTeam(uint32 team);
    uint32 GetBonusHonorFromKillCount(uint32 kills);
    uint32 GetEndTime();
    uint32 GetFreeSlotsForTeam(uint32 team);
    uint32 GetInstanceID();
    uint32 GetTypeID();
    uint32 GetMaxLevel();
    uint32 GetMinLevel();
    uint32 GetMaxPlayers();
    uint32 GetMinPlayers();
    uint32 GetMaxPlayersPerTeam();
    uint32 GetMinPlayersPerTeam();
    uint32 GetWinner();
    uint32 GetStatus();

    bool IsRandom();
    TSBattlegroundPlayer GetBGPlayer(uint64 guid);
    TSArray<TSBattlegroundPlayer> GetBGPlayers();
    void SetStartPosition(uint32 teamid, float x, float y, float z, float o);
    float GetStartX(uint32 teamid);
    float GetStartY(uint32 teamid);
    float GetStartZ(uint32 teamid);
    float GetStartO(uint32 teamid);
    void SetStartMaxDist(float maxDist);
    float GetStartMaxDist();
    void SendPacket(TSWorldPacket packet, uint32 team, TSPlayer sender, bool self);
    void PlaySound(uint32 sound, uint32 team = TS_TEAM_NEUTRAL);
    void CastSpell(uint32 spell, uint32 team = TS_TEAM_NEUTRAL);
    void RemoveAura(uint32 aura, uint32 team = TS_TEAM_NEUTRAL);
    void RewardHonor(uint32 honor, uint32 team = TS_TEAM_NEUTRAL);
    void RewardReputation(uint32 faction, uint32 reputation, uint32 team = TS_TEAM_NEUTRAL);
    void UpdateWorldState(uint32 variable, uint32 value);
    void EndBG(uint32 winnerTeam = TS_TEAM_NEUTRAL);
    TSGroup GetBGRaid(uint32 faction);
    uint32 GetBGPlayerCount(uint32 team = TS_TEAM_NEUTRAL);
    uint32 GetBGAlivePlayerCount(uint32 team = TS_TEAM_NEUTRAL);
    TSCreature AddCreature(uint32 entry, uint32 type, float x, float y, float z, float o, uint32 respawnTime = 0, uint32 teamId = TS_TEAM_NEUTRAL);
    bool AddObject(uint32 type, uint32 entry, float x, float y, float z, float o, float rot0, float rot1, float rot2, float rot3, uint32 respawnTime = 0, uint32 goState = 1);
    void AddSpiritGuide(uint32 type, float x, float y, float z, float o, uint32 teamId = TS_TEAM_NEUTRAL);
    void OpenDoor(uint32 type);
    void CloseDoor(uint32 type);
    bool IsPlayerInBG(uint64 guid);
    uint32 GetTeamScore(uint32 team);
    void SendMessage(uint32 entry, uint8 type, TSPlayer source);
    uint32 GetUniqueBracketID();

    int32 GetStartDelayTime();
    void SetStartDelayTime(int32 time);
    void SetStartTime(uint32 time);
    uint32 GetStartTime();
    bool RemoveCreature(uint32 type);
    bool RemoveObject(uint32 type);
    bool RemoveObjectFromWorld(uint32 type);
    int32 GetObjectType(uint64 guid);
    void SetHoliday(bool isHoliday);
    bool IsHoliday();

    TSGameObject GetBGGameObject(uint32 type, bool logErrors = false);
    TSCreature GetBGCreature(uint32 type, bool logErrors = false);
private:
    std::string LGetBGName();

    void LPlaySound0(uint32 sound, uint32 team);
    void LPlaySound1(uint32 sound);

    void LCastSpell0(uint32 spell, uint32 team);
    void LCastSpell1(uint32 spell);

    void LRemoveAura0(uint32 aura, uint32 team);
    void LRemoveAura1(uint32 aura);

    void LRewardHonor0(uint32 honor, uint32 team);
    void LRewardHonor1(uint32 honor);

    void LRewardReputation0(uint32 faction, uint32 reputation, uint32 team);
    void LRewardReputation1(uint32 faction, uint32 reputation);

    void LEndBG0(uint32 winnerTeam);
    void LEndBG1();

    uint32 LGetBGPlayerCount0(uint32 team);
    uint32 LGetBGPlayerCount1();

    uint32 LGetBGAlivePlayerCount0(uint32 team);
    uint32 LGetBGAlivePlayerCount1();

    TSCreature LAddCreature0(uint32 entry, uint32 type, float x, float y, float z, float o, uint32 respawnTime, uint32 teamId);
    TSCreature LAddCreature1(uint32 entry, uint32 type, float x, float y, float z, float o, uint32 respawnTime);
    TSCreature LAddCreature2(uint32 entry, uint32 type, float x, float y, float z, float o);

    bool LAddObject0(uint32 type, uint32 entry, float x, float y, float z, float o, float rot0, float rot1, float rot2, float rot3, uint32 respawnTime, uint32 goState);
    bool LAddObject1(uint32 type, uint32 entry, float x, float y, float z, float o, float rot0, float rot1, float rot2, float rot3, uint32 respawnTime);
    bool LAddObject2(uint32 type, uint32 entry, float x, float y, float z, float o, float rot0, float rot1, float rot2, float rot3);

    void LAddSpiritGuide0(uint32 type, float x, float y, float z, float o, uint32 teamId);
    void LAddSpiritGuide1(uint32 type, float x, float y, float z, float o);

    TSGameObject LGetBGGameObject0(uint32 type, bool logErrors);
    TSGameObject LGetBGGameObject1(uint32 type);

    TSCreature LGetBGCreature0(uint32 type, bool logErrors);
    TSCreature LGetBGCreature1(uint32 type);
    friend class TSLuaState;
};
