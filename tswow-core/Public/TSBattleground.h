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
struct BattlegroundScore;
class TSGUID;

class TC_GAME_API TSBattlegroundPlayer: public TSEntityProvider {
    uint64 m_guid;
    uint32 m_team;
    int64 m_offlineRemoveTime;
public:
    TSBattlegroundPlayer();
    TSBattlegroundPlayer(TSBattleground bg, uint64 guid, uint32 team, int64 offlineRemoveTime);
    operator bool() const { return m_guid > 0; }
    bool operator==(TSBattlegroundPlayer const& rhs) { return m_guid == rhs.m_guid; }
    TSGUID GetGUID();
    TSNumber<uint32> GetTeam();
    TSNumber<int64> GetOfflineRemoveTime();
};

#define TS_TEAM_ALLIANCE 0
#define TS_TEAM_HORDE 1
#define TS_TEAM_NEUTRAL 2

class TC_GAME_API TSBattlegroundScore
{
    TS_CLASS_DECLARATION(TSBattlegroundScore, BattlegroundScore, m_score);
    TSNumber<uint32> GetKillingBlows() const;
    TSNumber<uint32> GetDeaths() const;
    TSNumber<uint32> GetHonorableKills() const;
    TSNumber<uint32> GetBonusHonor() const;
    TSNumber<uint32> GetDamageDone() const;
    TSNumber<uint32> GetHealingDone() const;

    void SetKillingBlows(uint32 value);
    void SetDeaths(uint32 value);
    void SetHonorableKills(uint32 value);
    void SetBonusHonor(uint32 value);
    void SetDamageDone(uint32 value);
    void SetHealingDone(uint32 value);

    void ApplyBaseToPacket(TSBattleground bg, TSWorldPacket packet);

    TSNumber<uint32> GetWSFlagCaptures();
    TSNumber<uint32> GetEYFlagCaptures();
    TSNumber<uint32> GetWSFlagReturns();
    TSNumber<uint32> GetABBasesAssaulted();
    TSNumber<uint32> GetICBasesAssaulted();
    TSNumber<uint32> GetABBasesDefended();
    TSNumber<uint32> GetICBasesDefended();
    TSNumber<uint32> GetAVGraveyardsAssaulted();
    TSNumber<uint32> GetAVGraveyardsDefended();
    TSNumber<uint32> GetAVTowersAssaulted();
    TSNumber<uint32> GetAVTowersDefended();
    TSNumber<uint32> GetAVMinesCaptured();
    TSNumber<uint32> GetSADestroyedDemolishers();
    TSNumber<uint32> GetSADestroyedGates();

    void SetWSFlagCaptures(uint32 value);
    void SetEYFlagCaptures(uint32 value);
    void SetWSFlagReturns(uint32 value);
    void SetABBasesAssaulted(uint32 value);
    void SetICBasesAssaulted(uint32 value);
    void SetABBasesDefended(uint32 value);
    void SetICBasesDefended(uint32 value);
    void SetAVGraveyardsAssaulted(uint32 value);
    void SetAVGraveyardsDefended(uint32 value);
    void SetAVTowersAssaulted(uint32 value);
    void SetAVTowersDefended(uint32 value);
    void SetAVMinesCaptured(uint32 value);
    void SetSADestroyedDemolishers(uint32 value);
    void SetSADestroyedGates(uint32 value);

    uint64 GetPlayerGUID() const;

    TSNumber<uint8> GetArenaTeamID() const;

    TSNumber<uint32> GetCustomAttr(std::string const& key) const;
    void SetCustomAttr(std::string const& key, uint32 value);
    void ModCustomAttr(std::string const& key, int32 mod);
};

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
    TSBattlegroundScore GetScore(TSGUID guid);
    TSBattlegroundScore GetScore(TSNumber<uint32> guid);
    TSBattlegroundPlayer GetBGPlayer(TSGUID guid);
    TSBattlegroundPlayer GetBGPlayer(TSNumber<uint32> guid);
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
    bool IsPlayerInBG(TSGUID guid);
    bool IsPlayerInBG(TSNumber<uint32> guid);
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
    TSNumber<int32> GetObjectType(TSGUID guid);
    void SetHoliday(bool isHoliday);
    bool IsHoliday();

    TSGameObject GetBGGameObject(uint32 type, bool logErrors = false);
    TSCreature GetBGCreature(uint32 type, bool logErrors = false);
private:
    TSBattlegroundPlayer LGetBGPlayer0(TSGUID guid);
    TSBattlegroundPlayer LGetBGPlayer1(TSNumber<uint32> guid);

    TSBattlegroundScore LGetScore0(TSGUID guid);
    TSBattlegroundScore LGetScore1(TSNumber<uint32> guid);

    bool LIsPlayerInBG0(TSGUID guid);
    bool LIsPlayerInBG1(TSNumber<uint32> guid);
    friend class TSLua;
};
