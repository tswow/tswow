#include "TSLua.h"
#include "TSBattleground.h"
#include "TSLuaVarargs.h"

#include "TSGameObject.h"
#include "TSCreature.h"
#include "TSMap.h"
#include "TSPlayer.h"
#include "Map.h"
#include "TSGroup.h"
#include "TSWorldPacket.h"
#include "TSGUID.h"

void TSLua::load_battleground_methods(sol::state& state)
{
    auto ts_battlegroundplayer = state.new_usertype<TSBattlegroundPlayer>("TSBattlegroundPlayer");
    LUA_FIELD(ts_battlegroundplayer, TSBattlegroundPlayer, GetGUID);
    LUA_FIELD(ts_battlegroundplayer, TSBattlegroundPlayer, GetTeam);
    LUA_FIELD(ts_battlegroundplayer, TSBattlegroundPlayer, GetOfflineRemoveTime);

    sol::usertype<TSBattlegroundScore> ts_battleground_score = state.new_usertype<TSBattlegroundScore>("TSBattlegroundScore");
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetKillingBlows);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetDeaths);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetHonorableKills);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetBonusHonor);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetDamageDone);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetHealingDone);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetKillingBlows);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetDeaths);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetHonorableKills);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetBonusHonor);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetDamageDone);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetHealingDone);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, ApplyBaseToPacket);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetWSFlagCaptures);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetEYFlagCaptures);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetWSFlagReturns);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetABBasesAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetICBasesAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetABBasesDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetICBasesDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetAVGraveyardsAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetAVGraveyardsDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetAVTowersAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetAVTowersDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetAVMinesCaptured);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetSADestroyedDemolishers);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetSADestroyedGates);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetWSFlagCaptures);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetEYFlagCaptures);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetWSFlagReturns);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetABBasesAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetICBasesAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetABBasesDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetICBasesDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetAVGraveyardsAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetAVGraveyardsDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetAVTowersAssaulted);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetAVTowersDefended);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetAVMinesCaptured);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetSADestroyedDemolishers);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetSADestroyedGates);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetPlayerGUID);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetArenaTeamID);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, GetCustomAttr);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, SetCustomAttr);
    LUA_FIELD(ts_battleground_score, TSBattlegroundScore, ModCustomAttr);

    sol::usertype<TSBattleground> ts_battleground = state.new_usertype<TSBattleground>("TSBattleground", sol::base_classes, sol::bases<TSMap, TSWorldEntityProvider<TSMap>, TSEntityProvider>());
    #if TRINITY
    LUA_FIELD(ts_battleground, TSBattleground, GetBracketID);
    #endif
    LUA_FIELD(ts_battleground, TSBattleground, GetAlivePlayersCountByTeam);
    LUA_FIELD(ts_battleground, TSBattleground, GetBonusHonorFromKillCount);
    LUA_FIELD(ts_battleground, TSBattleground, GetEndTime);
    LUA_FIELD(ts_battleground, TSBattleground, GetFreeSlotsForTeam);
    LUA_FIELD(ts_battleground, TSBattleground, GetInstanceID);
    LUA_FIELD(ts_battleground, TSBattleground, GetTypeID);
    LUA_FIELD(ts_battleground, TSBattleground, GetMaxLevel);
    LUA_FIELD(ts_battleground, TSBattleground, GetMinLevel);
    LUA_FIELD(ts_battleground, TSBattleground, GetMaxPlayers);
    LUA_FIELD(ts_battleground, TSBattleground, GetMinPlayers);
    LUA_FIELD(ts_battleground, TSBattleground, GetMaxPlayersPerTeam);
    LUA_FIELD(ts_battleground, TSBattleground, GetMinPlayersPerTeam);
    LUA_FIELD(ts_battleground, TSBattleground, GetWinner);
    LUA_FIELD(ts_battleground, TSBattleground, GetStatus);
    LUA_FIELD(ts_battleground, TSBattleground, IsRandom);
    LUA_FIELD(ts_battleground, TSBattleground, GetBGPlayers);
    LUA_FIELD(ts_battleground, TSBattleground, SetStartPosition);
    LUA_FIELD(ts_battleground, TSBattleground, GetStartX);
    LUA_FIELD(ts_battleground, TSBattleground, GetStartY);
    LUA_FIELD(ts_battleground, TSBattleground, GetStartZ);
    LUA_FIELD(ts_battleground, TSBattleground, GetStartO);
    LUA_FIELD(ts_battleground, TSBattleground, SetStartMaxDist);
    LUA_FIELD(ts_battleground, TSBattleground, GetStartMaxDist);
    LUA_FIELD(ts_battleground, TSBattleground, SendPacket);
    LUA_FIELD(ts_battleground, TSBattleground, UpdateWorldState);
    LUA_FIELD(ts_battleground, TSBattleground, GetBGRaid);
    LUA_FIELD(ts_battleground, TSBattleground, GetBGPlayerCount);
    LUA_FIELD(ts_battleground, TSBattleground, OpenDoor);
    LUA_FIELD(ts_battleground, TSBattleground, CloseDoor);
    LUA_FIELD(ts_battleground, TSBattleground, GetTeamScore);
    LUA_FIELD(ts_battleground, TSBattleground, SendMessage);
    LUA_FIELD(ts_battleground, TSBattleground, GetUniqueBracketID);
    LUA_FIELD(ts_battleground, TSBattleground, GetStartDelayTime);
    LUA_FIELD(ts_battleground, TSBattleground, SetStartDelayTime);
    LUA_FIELD(ts_battleground, TSBattleground, SetStartTime);
    LUA_FIELD(ts_battleground, TSBattleground, GetStartTime);
    LUA_FIELD(ts_battleground, TSBattleground, RemoveCreature);
    LUA_FIELD(ts_battleground, TSBattleground, RemoveObject);
    LUA_FIELD(ts_battleground, TSBattleground, RemoveObjectFromWorld);
    LUA_FIELD(ts_battleground, TSBattleground, GetObjectType);
    LUA_FIELD(ts_battleground, TSBattleground, SetHoliday);
    LUA_FIELD(ts_battleground, TSBattleground, IsHoliday);
    LUA_FIELD(ts_battleground, TSBattleground, GetBGGameObject);
    LUA_FIELD(ts_battleground, TSBattleground, GetBGCreature);
    LUA_FIELD(ts_battleground, TSBattleground, GetBGName);

    ts_battleground.set_function("GetScore", sol::overload( &TSBattleground::LGetScore0, &TSBattleground::LGetScore1 ));
    ts_battleground.set_function("GetBGPlayer", sol::overload( &TSBattleground::LGetBGPlayer0, &TSBattleground::LGetBGPlayer1 ));
    ts_battleground.set_function("IsPlayerInBG", sol::overload( &TSBattleground::LIsPlayerInBG0, &TSBattleground::LIsPlayerInBG1 ));

    LUA_FIELD_OVERLOAD_1_1(ts_battleground, TSBattleground, PlaySound, uint32, uint32);
    LUA_FIELD_OVERLOAD_1_1(ts_battleground, TSBattleground, CastSpell, uint32, uint32);
    LUA_FIELD_OVERLOAD_1_1(ts_battleground, TSBattleground, RemoveAura, uint32, uint32);
    LUA_FIELD_OVERLOAD_1_1(ts_battleground, TSBattleground, RewardHonor, uint32, uint32);
    LUA_FIELD_OVERLOAD_2_1(ts_battleground, TSBattleground, RewardReputation, uint32, uint32, uint32);
    LUA_FIELD_OVERLOAD_0_1(ts_battleground, TSBattleground, EndBG, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_battleground, TSBattleground, GetBGPlayerCount, uint32);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_battleground, TSBattleground, GetBGAlivePlayerCount, uint32);
    LUA_FIELD_OVERLOAD_6_2(ts_battleground, TSBattleground, AddCreature, uint32, uint32, float, float, float, float, uint32, uint32);
    LUA_FIELD_OVERLOAD_RET_10_2(ts_battleground, TSBattleground, AddObject, uint32, uint32, float, float, float, float, float, float, float, float, uint32, uint32);
    LUA_FIELD_OVERLOAD_5_1(ts_battleground, TSBattleground, AddSpiritGuide, uint32, float, float, float, float, uint32);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_battleground, TSBattleground, GetBGGameObject, uint32, bool);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_battleground, TSBattleground, GetBGCreature, uint32, bool);
}
