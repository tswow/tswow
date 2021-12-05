/*
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * Copyright (C) 2010 - 2016 Eluna Lua Engine <http://emudevs.com/>
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
#include <memory.h>
#include "Object.h"
#include "Battleground.h"

#include "TSIncludes.h"
#include "TSBattleground.h"
#include "TSGameObject.h"
#include "TSCreature.h"
#include "TSMap.h"
#include "Map.h"
#include "TSGroup.h"
#include "TSWorldPacket.h"

TSBattlegroundPlayer::TSBattlegroundPlayer(TSBattleground bg, uint64 guid, uint32 team, int64 offlineRemoveTime)
    : TSEntityProvider(&bg.bg->m_playerEntityMap[guid])
    , m_guid(guid)
    , m_team(team)
    , m_offlineRemoveTime(offlineRemoveTime)
{
}

TSBattlegroundPlayer::TSBattlegroundPlayer()
    : TSEntityProvider(nullptr)
    , m_guid(0)
    , m_team(0)
    , m_offlineRemoveTime(0)
{}

uint64 TSBattlegroundPlayer::GetGUID()
{
    return m_guid;
}
uint32 TSBattlegroundPlayer::GetTeam()
{
    return m_team;
}
int64 TSBattlegroundPlayer::GetOfflineRemoveTime()
{
    return m_offlineRemoveTime;
}

TSBattleground::TSBattleground(Map* map, Battleground *bg)
    : TSMap(map)
    , bg(bg)
{
}

TSBattleground::TSBattleground()
    : TSMap(nullptr)
    , bg(nullptr)
{}

/**
 * Returns the name of the [BattleGround].
 *
 * @return string name
 */
TSString TSBattleground::GetName()
{
     return TSString(bg->GetName());
}

/**
 * Returns the amount of alive players in the [BattleGround] by the team ID.
 *
 * @param [Team] team : team ID
 * @return uint32 count
 */
uint32 TSBattleground::GetAlivePlayersCountByTeam(uint32 team)
{

#ifndef AZEROTHCORE
    return bg->GetAlivePlayersCountByTeam((Team)team);
#else
    return bg->GetAlivePlayersCountByTeam((TeamId)team);
#endif
}

/**
 * Returns the bonus honor given by amount of kills in the specific [BattleGround].
 *
 * @param uint32 kills : amount of kills
 * @return uint32 bonusHonor
 */
uint32 TSBattleground::GetBonusHonorFromKillCount(uint32 kills)
{
    return bg->GetBonusHonorFromKill(kills);
}

#ifndef AZEROTHCORE
/**
 * Returns the bracket ID of the specific [BattleGround].
 *
 * @return [BattleGroundBracketId] bracketId
 */
uint32 TSBattleground::GetBracketId()
{
    return bg->GetBracketId();
}
#endif

/**
 * Returns the end time of the [BattleGround].
 *
 * @return uint32 endTime
 */
uint32 TSBattleground::GetEndTime()
{
#ifdef CATA
    return bg->GetRemainingTime();
#else
    return bg->GetEndTime();
#endif
}

/**
 * Returns the amount of free slots for the selected team in the specific [BattleGround].
 *
 * @param [Team] team : team ID
 * @return uint32 freeSlots
 */
uint32 TSBattleground::GetFreeSlotsForTeam(uint32 team)
{

#ifndef AZEROTHCORE
    return bg->GetFreeSlotsForTeam((Team)team);
#else
    return bg->GetFreeSlotsForTeam((TeamId)team);
#endif
}

/**
 * Returns the instance ID of the [BattleGround].
 *
 * @return uint32 instanceId
 */
uint32 TSBattleground::GetInstanceId()
{
    return bg->GetInstanceID();
}

/**
 * Returns the map ID of the [BattleGround].
 *
 * @return uint32 mapId
 */
uint32 TSBattleground::GetMapId()
{
    return bg->GetMapId();
}

/**
 * Returns the type ID of the [BattleGround].
 *
 * @return [BattleGroundTypeId] typeId
 */
uint32 TSBattleground::GetTypeId()
{
#ifndef AZEROTHCORE
    return bg->GetTypeID();
#else
    return bg->GetBgTypeID();
#endif
}

/**
 * Returns the max allowed [Player] level of the specific [BattleGround].
 *
 * @return uint32 maxLevel
 */
uint32 TSBattleground::GetMaxLevel()
{
    return bg->GetMaxLevel();
}

/**
 * Returns the minimum allowed [Player] level of the specific [BattleGround].
 *
 * @return uint32 minLevel
 */
uint32 TSBattleground::GetMinLevel()
{
    return bg->GetMinLevel();
}

/**
 * Returns the maximum allowed [Player] count of the specific [BattleGround].
 *
 * @return uint32 maxPlayerCount
 */
uint32 TSBattleground::GetMaxPlayers()
{
#ifndef AZEROTHCORE
    return bg->GetMaxPlayers();
#else
    return bg->GetMaxPlayersPerTeam() * 2;
#endif
}

/**
 * Returns the minimum allowed [Player] count of the specific [BattleGround].
 *
 * @return uint32 minPlayerCount
 */
uint32 TSBattleground::GetMinPlayers()
{
#ifndef AZEROTHCORE
    return bg->GetMinPlayers();
#else
    return bg->GetMaxPlayersPerTeam() * 2;
#endif
}

/**
 * Returns the maximum allowed [Player] count per team of the specific [BattleGround].
 *
 * @return uint32 maxTeamPlayerCount
 */
uint32 TSBattleground::GetMaxPlayersPerTeam()
{
    return bg->GetMaxPlayersPerTeam();
}

/**
 * Returns the minimum allowed [Player] count per team of the specific [BattleGround].
 *
 * @return uint32 minTeamPlayerCount
 */
uint32 TSBattleground::GetMinPlayersPerTeam()
{
    return bg->GetMinPlayersPerTeam();
}

/**
 * Returns the winning team of the specific [BattleGround].
 *
 * @return [Team] team
 */
uint32 TSBattleground::GetWinner()
{
    return bg->GetWinner();
}

/**
 * Returns the status of the specific [BattleGround].
 *
 * @return [BattleGroundStatus] status
 */
uint32 TSBattleground::GetStatus()
{
    return bg->GetStatus();
}

bool TSBattleground::IsRandom()
{
    return bg->IsRandom();
}

TSArray<TSBattlegroundPlayer> TSBattleground::GetBGPlayers()
{
    TSArray<TSBattlegroundPlayer> players;
    for (auto& player : bg->GetPlayers())
    {
        players.push(TSBattlegroundPlayer(
              *this
            , player.first.GetRawValue()
            , player.second.Team
            , player.second.OfflineRemoveTime
        ));
    }
    return players;
}

TSBattlegroundPlayer TSBattleground::GetPlayer(uint64 guid)
{
    for (auto& player : bg->GetPlayers())
    {
        if (player.first.GetRawValue() == guid)
        {
            return TSBattlegroundPlayer(
                  *this
                , player.first.GetRawValue()
                , player.second.Team
                , player.second.OfflineRemoveTime
            );
        }
    }
    return TSBattlegroundPlayer(*this,0,0,0);
}

void TSBattleground::SetStartPosition(uint32 teamid, float x, float y, float z, float o)
{
    bg->SetTeamStartPosition(TeamId(teamid), Position(x, y, z, o));
}

float TSBattleground::GetStartX(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetPositionX();
}

float TSBattleground::GetStartY(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetPositionY();
}

float TSBattleground::GetStartZ(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetPositionZ();
}

float TSBattleground::GetStartO(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetOrientation();
}

void TSBattleground::SetStartMaxDist(float maxDist)
{
    bg->SetStartMaxDist(maxDist);
}

float TSBattleground::GetStartMaxDist()
{
    return bg->GetStartMaxDist();
}

void TSBattleground::SendPacket(TSWorldPacket packet, uint32 team = TS_TEAM_NEUTRAL, TSPlayer sender = TSPlayer(nullptr), bool self = false)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->SendPacketToAll(packet.packet);
    }
    else
    {
        bg->SendPacketToTeam(team,packet.packet, sender.player, self);
    }
}

void TSBattleground::PlaySound(uint32 sound, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->PlaySoundToAll(sound);
    }
    else
    {
        bg->PlaySoundToTeam(sound, team);
    }
}

void TSBattleground::CastSpell(uint32 spell, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->CastSpellOnTeam(spell, TS_TEAM_ALLIANCE);
        bg->CastSpellOnTeam(spell, TS_TEAM_HORDE);
    }
    else
    {
        bg->CastSpellOnTeam(spell, team);
    }
}

void TSBattleground::RemoveAura(uint32 aura, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->RemoveAuraOnTeam(aura, TS_TEAM_ALLIANCE);
        bg->RemoveAuraOnTeam(aura, TS_TEAM_HORDE);
    }
    else
    {
        bg->RemoveAuraOnTeam(aura, team);
    }
}
void TSBattleground::RewardHonor(uint32 honor, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->RewardHonorToTeam(honor, TS_TEAM_HORDE);
        bg->RewardHonorToTeam(honor, TS_TEAM_ALLIANCE);
    }
    else
    {
        bg->RewardHonorToTeam(honor, team);
    }
}
void TSBattleground::RewardReputation(uint32 faction, uint32 reputation, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->RewardReputationToTeam(faction, reputation, TS_TEAM_HORDE);
        bg->RewardReputationToTeam(faction, reputation, TS_TEAM_ALLIANCE);
    }
    else
    {
        bg->RewardReputationToTeam(faction, reputation, team);
    }
}

void TSBattleground::UpdateWorldState(uint32 variable, uint32 value)
{
    bg->UpdateWorldState(variable, value);
}

void TSBattleground::EndBattleground(uint32 winnerTeam)
{
    bg->EndBattleground(winnerTeam);
}

TSGroup TSBattleground::GetRaid(uint32 faction)
{
    return TSGroup(bg->GetBgRaid(faction));
}

uint32 TSBattleground::GetPlayerCount(uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        return bg->GetPlayersCountByTeam(TS_TEAM_ALLIANCE)
             + bg->GetPlayersCountByTeam(TS_TEAM_HORDE);
    }
    else
    {
        return bg->GetPlayersCountByTeam(team);
    }
}
uint32 TSBattleground::GetAlivePlayerCount(uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        return bg->GetAlivePlayersCountByTeam(TS_TEAM_ALLIANCE)
            + bg->GetAlivePlayersCountByTeam(TS_TEAM_HORDE);
    }
    else
    {
        return bg->GetAlivePlayersCountByTeam(team);
    }
}
TSCreature TSBattleground::AddCreature(uint32 entry, uint32 type, float x, float y, float z, float o, uint32 respawnTime, uint32 teamId)
{
    return TSCreature(bg->AddCreature(entry, type, Position(x, y, z, o), TeamId(teamId), respawnTime));
}

bool TSBattleground::AddObject(uint32 type, uint32 entry, float x, float y, float z, float o, float rot0, float rot1, float rot2, float rot3, uint32 respawnTime, uint32 goState)
{
    return bg->AddObject(type, entry, Position(x, y, z, o), rot0, rot1, rot2, rot3, respawnTime, GOState(goState));
}

void TSBattleground::AddSpiritGuide(uint32 type, float x, float y, float z, float o, uint32 teamId)
{
    bg->AddSpiritGuide(type, Position(x, y, z, o), TeamId(teamId));
}

void TSBattleground::OpenDoor(uint32 type)
{
    bg->DoorOpen(type);
}

void TSBattleground::CloseDoor(uint32 type)
{
    bg->DoorClose(type);
}

bool TSBattleground::IsPlayerInBattleground(uint64 guid)
{
    return bg->IsPlayerInBattleground(ObjectGuid(guid));
}

uint32 TSBattleground::GetTeamScore(uint32 team)
{
    return bg->GetTeamScore(team);
}

void TSBattleground::SendMessage(uint32 entry, uint8 type, TSPlayer source = TSPlayer(nullptr))
{
    bg->SendMessageToAll(entry, ChatMsg(type), source.player);
}

uint32 TSBattleground::GetUniqueBracketID()
{
    return bg->GetUniqueBracketId();
}

int32 TSBattleground::GetStartDelayTime()
{
    return bg->GetStartDelayTime();
}

void TSBattleground::SetStartDelayTime(int32 time)
{
    bg->SetStartDelayTime(time);
}

void TSBattleground::SetStartTime(uint32 time)
{
    bg->SetStartTime(time);
}

uint32 TSBattleground::GetStartTime()
{
    return bg->GetStartTime();
}
bool TSBattleground::RemoveCreature(uint32 type)
{
    return bg->DelCreature(type);
}
bool TSBattleground::RemoveObject(uint32 type)
{
    return bg->DelObject(type);
}
bool TSBattleground::RemoveObjectFromWorld(uint32 type)
{
    return bg->RemoveObjectFromWorld(type);
}
int32 TSBattleground::GetObjectType(uint64 guid)
{
    return bg->GetObjectType(ObjectGuid(guid));
}
void TSBattleground::SetHoliday(bool isHoliday)
{
    bg->SetHoliday(isHoliday);
}
bool TSBattleground::IsHoliday()
{
    return bg->m_HonorMode == BG_HOLIDAY;
}

TSGameObject TSBattleground::GetGameObject(uint32 type, bool logErrors)
{
    return TSGameObject(bg->GetBGObject(type, logErrors));
}

TSCreature TSBattleground::GetCreature(uint32 type, bool logErrors)
{
    return TSCreature(bg->GetBGCreature(type, logErrors));
}
