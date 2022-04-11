#include "TSLua.h"
#include "TSBattleground.h"
#include "TSMapLua.h"

#include "TSGameObject.h"
#include "TSCreature.h"
#include "TSMap.h"
#include "TSPlayer.h"
#include "Map.h"
#include "TSGroup.h"
#include "TSWorldPacket.h"

void TSLuaState::load_battleground_methods(uint32_t modid)
{
    auto ts_battlegroundplayer = new_usertype<TSBattlegroundPlayer>("TSBattlegroundPlayer");
    LUA_FIELD(ts_battlegroundplayer, TSBattlegroundPlayer, GetGUID);
    LUA_FIELD(ts_battlegroundplayer, TSBattlegroundPlayer, GetTeam);
    LUA_FIELD(ts_battlegroundplayer, TSBattlegroundPlayer, GetOfflineRemoveTime);

    sol::usertype<TSBattleground> ts_battleground = new_usertype<TSBattleground>("TSBattleground");
    load_map_methods_t(ts_battleground, modid, "TSBattleground");
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
    LUA_FIELD(ts_battleground, TSBattleground, GetBGPlayer);
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
    LUA_FIELD(ts_battleground, TSBattleground, IsPlayerInBG);
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
    ts_battleground.set_function("GetBGName", &TSBattleground::LGetBGName);
    ts_battleground.set_function("PlaySound", sol::overload(
        &TSBattleground::LPlaySound0
        , &TSBattleground::LPlaySound1
    ));
    ts_battleground.set_function("CastSpell", sol::overload(
        &TSBattleground::LCastSpell0
        , &TSBattleground::LCastSpell1
    ));
    ts_battleground.set_function("RemoveAura", sol::overload(
        &TSBattleground::LRemoveAura0
        , &TSBattleground::LRemoveAura1
    ));
    ts_battleground.set_function("RewardHonor", sol::overload(
        &TSBattleground::LRewardHonor0
        , &TSBattleground::LRewardHonor1
    ));

    ts_battleground.set_function("RewardReputation", sol::overload(
        &TSBattleground::LRewardReputation0
        , &TSBattleground::LRewardReputation1
    ));

    ts_battleground.set_function("EndBG", sol::overload(
        &TSBattleground::LEndBG0
        , &TSBattleground::LEndBG1
    ));

    ts_battleground.set_function("GetBGPlayerCount", sol::overload(
        &TSBattleground::LGetBGPlayerCount0
        , &TSBattleground::LGetBGPlayerCount1
    ));
    ts_battleground.set_function("GetBGAlivePlayerCount", sol::overload(
        &TSBattleground::LGetBGAlivePlayerCount0
        , &TSBattleground::LGetBGAlivePlayerCount1
    ));
    ts_battleground.set_function("AddCreature", sol::overload(
        &TSBattleground::LAddCreature0
        , &TSBattleground::LAddCreature1
        , &TSBattleground::LAddCreature2
    ));
    ts_battleground.set_function("AddObject", sol::overload(
        &TSBattleground::LAddObject0
        , &TSBattleground::LAddObject1
        , &TSBattleground::LAddObject2
    ));
    ts_battleground.set_function("AddSpiritGuide", sol::overload(
        &TSBattleground::LAddSpiritGuide0
        , &TSBattleground::LAddSpiritGuide1
    ));
    ts_battleground.set_function("GetBGGameObject", sol::overload(
        &TSBattleground::LGetBGGameObject0
        , &TSBattleground::LGetBGGameObject1
    ));
    ts_battleground.set_function("GetBGCreature", sol::overload(
        &TSBattleground::LGetBGCreature0
        , &TSBattleground::LGetBGCreature1
    ));
}
