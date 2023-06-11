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

#include "BattlegroundAB.h"
#include "BattlegroundAV.h"
#include "BattlegroundEY.h"
#include "BattlegroundIC.h"
#include "BattlegroundWS.h"
#include "BattlegroundSA.h"

#include "BattlegroundScore.h"
#include "ArenaScore.h"

#include "TSIncludes.h"
#include "TSBattleground.h"
#include "TSGameObject.h"
#include "TSCreature.h"
#include "TSMap.h"
#include "TSPlayer.h"
#include "Map.h"
#include "TSGroup.h"
#include "TSWorldPacket.h"
#include "TSGUID.h"

#if TRINITY
#define TSTeamId(x) x
#elif AZEROTHCORE
#define TSTeamId(x) TeamId(x)
#endif

TS_CLASS_DEFINITION(TSBattlegroundScore, BattlegroundScore, m_score)

TSNumber<uint32> TSBattlegroundScore::GetKillingBlows() const
{
    return m_score->GetKillingBlows();
}

TSNumber<uint32> TSBattlegroundScore::GetDeaths() const
{
    return m_score->GetDeaths();
}
TSNumber<uint32> TSBattlegroundScore::GetHonorableKills() const
{
    return m_score->GetHonorableKills();
}
TSNumber<uint32> TSBattlegroundScore::GetBonusHonor() const
{
    return m_score->GetBonusHonor();
}
TSNumber<uint32> TSBattlegroundScore::GetDamageDone() const
{
    return m_score->GetDamageDone();
}
TSNumber<uint32> TSBattlegroundScore::GetHealingDone() const
{
    return m_score->GetHealingDone();
}

TSNumber<uint32> TSBattlegroundScore::GetWSFlagCaptures()
{
    if (BattlegroundWGScore* score = dynamic_cast<BattlegroundWGScore*>(m_score))
    {
        return score->FlagCaptures;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetEYFlagCaptures()
{
    if (BattlegroundEYScore* score = dynamic_cast<BattlegroundEYScore*>(m_score))
    {
        return score->FlagCaptures;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetWSFlagReturns()
{
    if (BattlegroundWGScore* score = dynamic_cast<BattlegroundWGScore*>(m_score))
    {
        return score->FlagReturns;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetABBasesAssaulted()
{
    if (BattlegroundABScore* score = dynamic_cast<BattlegroundABScore*>(m_score))
    {
        return score->BasesAssaulted;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetICBasesAssaulted()
{
    if (BattlegroundICScore* score = dynamic_cast<BattlegroundICScore*>(m_score))
    {
        return score->BasesAssaulted;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetABBasesDefended()
{
    if (BattlegroundABScore* score = dynamic_cast<BattlegroundABScore*>(m_score))
    {
        return score->BasesDefended;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetICBasesDefended()
{
    if (BattlegroundICScore* score = dynamic_cast<BattlegroundICScore*>(m_score))
    {
        return score->BasesDefended;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetAVGraveyardsAssaulted()
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        return score->GraveyardsAssaulted;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetAVGraveyardsDefended()
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        return score->GraveyardsDefended;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetAVTowersAssaulted()
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        return score->TowersAssaulted;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetAVTowersDefended()
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        return score->TowersDefended;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetAVMinesCaptured()
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        return score->MinesCaptured;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetSADestroyedDemolishers()
{
    if (BattlegroundSAScore* score = dynamic_cast<BattlegroundSAScore*>(m_score))
    {
        return score->DemolishersDestroyed;
    }
    else
    {
        return 0;
    }
}
TSNumber<uint32> TSBattlegroundScore::GetSADestroyedGates()
{
    if (BattlegroundSAScore* score = dynamic_cast<BattlegroundSAScore*>(m_score))
    {
        return score->GatesDestroyed;
    }
    else
    {
        return 0;
    }
}

void TSBattlegroundScore::SetWSFlagCaptures(uint32 value)
{
    if (BattlegroundWGScore* score = dynamic_cast<BattlegroundWGScore*>(m_score))
    {
        score->FlagCaptures = value;
    }
}
void TSBattlegroundScore::SetEYFlagCaptures(uint32 value)
{
    if (BattlegroundEYScore* score = dynamic_cast<BattlegroundEYScore*>(m_score))
    {
        score->FlagCaptures = value;
    }
}
void TSBattlegroundScore::SetWSFlagReturns(uint32 value)
{
    if (BattlegroundWGScore* score = dynamic_cast<BattlegroundWGScore*>(m_score))
    {
        score->FlagReturns = value;
    }
}
void TSBattlegroundScore::SetABBasesAssaulted(uint32 value)
{
    if (BattlegroundABScore* score = dynamic_cast<BattlegroundABScore*>(m_score))
    {
        score->BasesAssaulted = value;
    }
}
void TSBattlegroundScore::SetICBasesAssaulted(uint32 value)
{
    if (BattlegroundICScore* score = dynamic_cast<BattlegroundICScore*>(m_score))
    {
        score->BasesAssaulted = value;
    }
}
void TSBattlegroundScore::SetABBasesDefended(uint32 value)
{
    if (BattlegroundABScore* score = dynamic_cast<BattlegroundABScore*>(m_score))
    {
        score->BasesDefended = value;
    }
}
void TSBattlegroundScore::SetICBasesDefended(uint32 value)
{
    if (BattlegroundICScore* score = dynamic_cast<BattlegroundICScore*>(m_score))
    {
        score->BasesDefended = value;
    }
}
void TSBattlegroundScore::SetAVGraveyardsAssaulted(uint32 value)
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        score->GraveyardsAssaulted = value;
    }
}
void TSBattlegroundScore::SetAVGraveyardsDefended(uint32 value)
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        score->GraveyardsDefended = value;
    }
}
void TSBattlegroundScore::SetAVTowersAssaulted(uint32 value)
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        score->TowersAssaulted = value;
    }
}
void TSBattlegroundScore::SetAVTowersDefended(uint32 value)
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        score->TowersDefended = value;
    }
}
void TSBattlegroundScore::SetAVMinesCaptured(uint32 value)
{
    if (BattlegroundAVScore* score = dynamic_cast<BattlegroundAVScore*>(m_score))
    {
        score->MinesCaptured = value;
    }
}
void TSBattlegroundScore::SetSADestroyedDemolishers(uint32 value)
{
    if (BattlegroundSAScore* score = dynamic_cast<BattlegroundSAScore*>(m_score))
    {
        score->DemolishersDestroyed = value;
    }
}
void TSBattlegroundScore::SetSADestroyedGates(uint32 value)
{
    if (BattlegroundSAScore* score = dynamic_cast<BattlegroundSAScore*>(m_score))
    {
        score->GatesDestroyed = value;
    }
}

TSNumber<uint32> TSBattlegroundScore::GetCustomAttr(std::string const& key) const
{
    auto itr = m_score->CustomAttributes.find(key);
    if (itr != m_score->CustomAttributes.end())
    {
        return itr->second;
    }
    else
    {
        return 0;
    }
}

void TSBattlegroundScore::SetCustomAttr(std::string const& key, uint32 value)
{
    m_score->CustomAttributes[key] = value;
}

void TSBattlegroundScore::ModCustomAttr(std::string const& key, int32 mod)
{
    m_score->CustomAttributes[key] += mod;
}

uint64 TSBattlegroundScore::GetPlayerGUID() const
{
    return m_score->PlayerGuid;
}

TSNumber<uint8> TSBattlegroundScore::GetArenaTeamID() const
{
    if (ArenaScore* score = dynamic_cast<ArenaScore*>(m_score))
    {
        return score->TeamId;
    }
    else
    {
        return 0;
    }
}

void TSBattlegroundScore::SetKillingBlows(uint32 value)
{
    m_score->KillingBlows = value;
}

void TSBattlegroundScore::SetDeaths(uint32 value)
{
    m_score->Deaths = value;
}

void TSBattlegroundScore::SetHonorableKills(uint32 value)
{
    m_score->HonorableKills = value;
}

void TSBattlegroundScore::SetBonusHonor(uint32 value)
{
    m_score->BonusHonor = value;
}

void TSBattlegroundScore::SetDamageDone(uint32 value)
{
    m_score->DamageDone = value;
}

void TSBattlegroundScore::SetHealingDone(uint32 value)
{
    m_score->HealingDone = value;
}

void TSBattlegroundScore::ApplyBaseToPacket(TSBattleground bg, TSWorldPacket packet)
{
    packet.WriteUInt64(GetPlayerGUID());
    if (bg.IsArena())
    {
        packet.WriteUInt32(GetKillingBlows());
        packet.WriteUInt32(GetArenaTeamID());
        packet.WriteUInt32(GetDamageDone());
        packet.WriteUInt32(GetHealingDone());
    }
    else
    {
        packet.WriteUInt32(GetKillingBlows());
        packet.WriteUInt32(GetHonorableKills());
        packet.WriteUInt32(GetDeaths());
        packet.WriteUInt32(GetBonusHonor());
        packet.WriteUInt32(GetDamageDone());
        packet.WriteUInt32(GetHealingDone());
    }
}

TSBattlegroundPlayer::TSBattlegroundPlayer(TSBattleground bg, uint64 guid, uint32 team, int64 offlineRemoveTime)
#if TRINITY
    : TSEntityProvider(&bg.bg->m_playerEntityMap[guid])
#elif AZEROTHCORE // TODO: fix
    : TSEntityProvider(nullptr)
#endif
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

TSGUID TSBattlegroundPlayer::GetGUID()
{
    return TSGUID(m_guid);
}
TSNumber<uint32> TSBattlegroundPlayer::GetTeam()
{
    return m_team;
}
TSNumber<int64> TSBattlegroundPlayer::GetOfflineRemoveTime()
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
std::string TSBattleground::GetBGName()
{
     return bg->GetName();
}

/**
 * Returns the amount of alive players in the [BattleGround] by the team ID.
 *
 * @param [Team] team : team ID
 * @return uint32 count
 */
TSNumber<uint32> TSBattleground::GetAlivePlayersCountByTeam(uint32 team)
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
TSNumber<uint32> TSBattleground::GetBonusHonorFromKillCount(uint32 kills)
{
    return bg->GetBonusHonorFromKill(kills);
}

/**
 * Returns the bracket ID of the specific [BattleGround].
 *
 * @return [BattleGroundBracketId] bracketId
 */
TSNumber<uint32> TSBattleground::GetBracketID()
{
#if TRINITY
    return bg->GetBracketId();
#else
    TS_LOG_ERROR("tswow.api","TSBattleground::GetBracketID not implemented for AzerothCore");
    return 0;
#endif
}

/**
 * Returns the end time of the [BattleGround].
 *
 * @return uint32 endTime
 */
TSNumber<uint32> TSBattleground::GetEndTime()
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
TSNumber<uint32> TSBattleground::GetFreeSlotsForTeam(uint32 team)
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
TSNumber<uint32> TSBattleground::GetInstanceID()
{
    return bg->GetInstanceID();
}

/**
 * Returns the type ID of the [BattleGround].
 *
 * @return [BattleGroundTypeId] typeId
 */
TSNumber<uint32> TSBattleground::GetTypeID()
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
TSNumber<uint32> TSBattleground::GetMaxLevel()
{
    return bg->GetMaxLevel();
}

/**
 * Returns the minimum allowed [Player] level of the specific [BattleGround].
 *
 * @return uint32 minLevel
 */
TSNumber<uint32> TSBattleground::GetMinLevel()
{
    return bg->GetMinLevel();
}

/**
 * Returns the maximum allowed [Player] count of the specific [BattleGround].
 *
 * @return uint32 maxPlayerCount
 */
TSNumber<uint32> TSBattleground::GetMaxPlayers()
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
TSNumber<uint32> TSBattleground::GetMinPlayers()
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
TSNumber<uint32> TSBattleground::GetMaxPlayersPerTeam()
{
    return bg->GetMaxPlayersPerTeam();
}

/**
 * Returns the minimum allowed [Player] count per team of the specific [BattleGround].
 *
 * @return uint32 minTeamPlayerCount
 */
TSNumber<uint32> TSBattleground::GetMinPlayersPerTeam()
{
    return bg->GetMinPlayersPerTeam();
}

/**
 * Returns the winning team of the specific [BattleGround].
 *
 * @return [Team] team
 */
TSNumber<uint32> TSBattleground::GetWinner()
{
    return bg->GetWinner();
}

/**
 * Returns the status of the specific [BattleGround].
 *
 * @return [BattleGroundStatus] status
 */
TSNumber<uint32> TSBattleground::GetStatus()
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
#if TRINITY
            , player.second.Team
            , player.second.OfflineRemoveTime
#elif AZEROTHCORE
            , 0
            , 0
#endif
        ));
    }
    return players;
}

TSBattlegroundScore TSBattleground::GetScore(TSGUID guid)
{
    auto itr = bg->PlayerScores.find(guid.GetCounter());
    if (itr != bg->PlayerScores.end())
    {
        return TSBattlegroundScore(itr->second);
    }
    else
    {
        return TSBattlegroundScore(nullptr);
    }
}

TSBattlegroundScore TSBattleground::GetScore(TSNumber<uint32> guid)
{
    return GetScore(TSGUID(guid));
}

TSBattlegroundPlayer TSBattleground::GetBGPlayer(TSNumber<uint32> guid)
{
    return GetBGPlayer(TSGUID(guid));
}

TSBattlegroundPlayer TSBattleground::GetBGPlayer(TSGUID guid)
{
    for (auto& player : bg->GetPlayers())
    {
        if (player.first.GetRawValue() == guid.asGUID())
        {
            return TSBattlegroundPlayer(
                  *this
                , player.first.GetRawValue()
#if TRINITY
                , player.second.Team
                , player.second.OfflineRemoveTime
#elif AZEROTHCORE
                , 0
                , 0
#endif
            );
        }
    }
    return TSBattlegroundPlayer(*this,0,0,0);
}

void TSBattleground::SetStartPosition(uint32 teamid, float x, float y, float z, float o)
{
    bg->SetTeamStartPosition(TeamId(teamid), Position(x, y, z, o));
}

TSNumber<float> TSBattleground::GetStartX(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetPositionX();
}

TSNumber<float> TSBattleground::GetStartY(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetPositionY();
}

TSNumber<float> TSBattleground::GetStartZ(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetPositionZ();
}

TSNumber<float> TSBattleground::GetStartO(uint32 teamid)
{
    return bg->GetTeamStartPosition(TeamId(teamid))->GetOrientation();
}

void TSBattleground::SetStartMaxDist(float maxDist)
{
    bg->SetStartMaxDist(maxDist);
}

TSNumber<float> TSBattleground::GetStartMaxDist()
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
        bg->SendPacketToTeam(TSTeamId(team),packet.packet, sender.player, self);
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
#if TRINITY
        bg->PlaySoundToTeam(sound, team);
#elif AZEROTHCORE
        TS_LOG_ERROR("tswow.api", "TSBattleground::PlaySound not implemented for AzerothCore with non-neutral team.");
#endif
    }
}

void TSBattleground::CastSpell(uint32 spell, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->CastSpellOnTeam(spell, TSTeamId(TS_TEAM_ALLIANCE));
        bg->CastSpellOnTeam(spell, TSTeamId(TS_TEAM_HORDE));
    }
    else
    {
        bg->CastSpellOnTeam(spell, TSTeamId(team));
    }
}

void TSBattleground::RemoveAura(uint32 aura, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->RemoveAuraOnTeam(aura, TSTeamId(TS_TEAM_ALLIANCE));
        bg->RemoveAuraOnTeam(aura, TSTeamId(TS_TEAM_HORDE));
    }
    else
    {
        bg->RemoveAuraOnTeam(aura, TSTeamId(team));
    }
}
void TSBattleground::RewardHonor(uint32 honor, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->RewardHonorToTeam(honor, TSTeamId(TS_TEAM_HORDE));
        bg->RewardHonorToTeam(honor, TSTeamId(TS_TEAM_ALLIANCE));
    }
    else
    {
        bg->RewardHonorToTeam(honor, TSTeamId(team));
    }
}
void TSBattleground::RewardReputation(uint32 faction, uint32 reputation, uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        bg->RewardReputationToTeam(faction, reputation, TSTeamId(TS_TEAM_HORDE));
        bg->RewardReputationToTeam(faction, reputation, TSTeamId(TS_TEAM_ALLIANCE));
    }
    else
    {
        bg->RewardReputationToTeam(faction, reputation, TSTeamId(team));
    }
}

void TSBattleground::UpdateWorldState(uint32 variable, uint32 value)
{
    bg->UpdateWorldState(variable, value);
}

void TSBattleground::EndBG(uint32 winnerTeam)
{
    bg->EndBattleground(TSTeamId(winnerTeam));
}

TSGroup TSBattleground::GetBGRaid(uint32 faction)
{
    return TSGroup(bg->GetBgRaid(TSTeamId(faction)));
}

TSNumber<uint32> TSBattleground::GetBGPlayerCount(uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        return bg->GetPlayersCountByTeam(TSTeamId(TS_TEAM_ALLIANCE))
             + bg->GetPlayersCountByTeam(TSTeamId(TS_TEAM_HORDE));
    }
    else
    {
        return bg->GetPlayersCountByTeam(TSTeamId(team));
    }
}
TSNumber<uint32> TSBattleground::GetBGAlivePlayerCount(uint32 team)
{
    if (team == TS_TEAM_NEUTRAL)
    {
        return bg->GetAlivePlayersCountByTeam(TSTeamId(TS_TEAM_ALLIANCE))
            + bg->GetAlivePlayersCountByTeam(TSTeamId(TS_TEAM_HORDE));
    }
    else
    {
        return bg->GetAlivePlayersCountByTeam(TSTeamId(team));
    }
}
TSCreature TSBattleground::AddCreature(uint32 entry, uint32 type, float x, float y, float z, float o, uint32 respawnTime, uint32 teamId)
{
#if TRINITY
    return TSCreature(bg->AddCreature(entry, type, Position(x, y, z, o), TeamId(teamId), respawnTime));
#elif AZEROTHCORE
    if (teamId != TS_TEAM_NEUTRAL)
    {
        TS_LOG_ERROR("tswow.api", "TSBattleground::AddCreature not implemented for AzerothCore with non-neutral teamId");
    }
    else
    {
        return TSCreature(bg->AddCreature(entry, type, x, y, z, o,respawnTime));
    }
#endif
}

bool TSBattleground::AddObject(uint32 type, uint32 entry, float x, float y, float z, float o, float rot0, float rot1, float rot2, float rot3, uint32 respawnTime, uint32 goState)
{
#if TRINITY
    return bg->AddObject(type, entry, Position(x, y, z, o), rot0, rot1, rot2, rot3, respawnTime, GOState(goState));
#elif AZEROTHCORE
    return bg->AddObject(type, entry, x, y, z, o, rot0, rot1, rot2, rot3, respawnTime, GOState(goState));
#endif
}

void TSBattleground::AddSpiritGuide(uint32 type, float x, float y, float z, float o, uint32 teamId)
{
#if TRINITY
    bg->AddSpiritGuide(type, Position(x, y, z, o), TeamId(teamId));
#elif AZEROTHCORE
    bg->AddSpiritGuide(type, x, y, z, o, TeamId(teamId));
#endif
}

void TSBattleground::OpenDoor(uint32 type)
{
    bg->DoorOpen(type);
}

void TSBattleground::CloseDoor(uint32 type)
{
    bg->DoorClose(type);
}

bool TSBattleground::IsPlayerInBG(TSNumber<uint32> guid)
{
    return IsPlayerInBG(TSGUID(guid));
}

bool TSBattleground::IsPlayerInBG(TSGUID guid)
{
    return bg->IsPlayerInBattleground(guid.asGUID());
}

TSNumber<uint32> TSBattleground::GetTeamScore(uint32 team)
{
    return bg->GetTeamScore(TSTeamId(team));
}

void TSBattleground::SendMessage(uint32 entry, uint8 type, TSPlayer source = TSPlayer(nullptr))
{
    bg->SendMessageToAll(entry, ChatMsg(type), source.player);
}

TSNumber<uint32> TSBattleground::GetUniqueBracketID()
{
    return bg->GetUniqueBracketId();
}

TSNumber<int32> TSBattleground::GetStartDelayTime()
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

TSNumber<uint32> TSBattleground::GetStartTime()
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
#if TRINITY
    return bg->RemoveObjectFromWorld(type);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSBattleground::RemoveObjectFromWorld not implemented for AzerothCore.");
    return false;
#endif
}
TSNumber<int32> TSBattleground::GetObjectType(TSGUID guid)
{
    return bg->GetObjectType(guid.asGUID());
}
void TSBattleground::SetHoliday(bool isHoliday)
{
    bg->SetHoliday(isHoliday);
}
bool TSBattleground::IsHoliday()
{
#if TRINITY
    return bg->m_HonorMode == BG_HOLIDAY;
#elif AZEROTHCORE
    return bg->m_HonorMode == BG_HOLIDAY;
#endif
}

TSGameObject TSBattleground::GetBGGameObject(uint32 type, bool logErrors)
{
#if TRINITY
    return TSGameObject(bg->GetBGObject(type, logErrors));
#elif AZEROTHCORE
    // ac always logs errors
    return TSGameObject(bg->GetBGObject(type));
#endif
}

TSCreature TSBattleground::GetBGCreature(uint32 type, bool logErrors)
{
#if TRINITY
    return TSCreature(bg->GetBGCreature(type, logErrors));
#elif AZEROTHCORE
    return TSCreature(bg->GetBGCreature(type));
#endif
}

TSBattlegroundPlayer TSBattleground::LGetBGPlayer0(TSGUID guid)
{
    return GetBGPlayer(guid);
}

TSBattlegroundPlayer TSBattleground::LGetBGPlayer1(TSNumber<uint32> guid)
{
    return GetBGPlayer(guid);
}

bool TSBattleground::LIsPlayerInBG0(TSGUID guid)
{
    return IsPlayerInBG(guid);
}

bool TSBattleground::LIsPlayerInBG1(TSNumber<uint32> guid)
{
    return IsPlayerInBG(guid);
}

TSBattlegroundScore TSBattleground::LGetScore0(TSGUID guid)
{
    return GetScore(guid);
}

TSBattlegroundScore TSBattleground::LGetScore1(TSNumber<uint32> guid)
{
    return GetScore(guid);
}