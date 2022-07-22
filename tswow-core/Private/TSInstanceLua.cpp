#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSInstance.h"
#include "TSVehicle.h"
#include "TSGameObject.h"
#include "TSCreature.h"

void TSLua::load_instance_methods(sol::state& state)
{
    auto ts_guidset = state.new_usertype<TSGuidSet>("TSGuidSet");
    LUA_FIELD(ts_guidset, TSGuidSet, Contains);
    LUA_FIELD(ts_guidset, TSGuidSet, Add);
    LUA_FIELD(ts_guidset, TSGuidSet, Remove);

    auto ts_bossinfo = state.new_usertype<TSBossInfo>("TSBossInfo");
    LUA_FIELD(ts_bossinfo, TSBossInfo, GetBossState);
    LUA_FIELD(ts_bossinfo, TSBossInfo, GetMinionGUIDs);
    LUA_FIELD(ts_bossinfo, TSBossInfo, GetDoorsOpenDuringEncounter);
    LUA_FIELD(ts_bossinfo, TSBossInfo, GetDoorsClosedDuringEncounter);
    LUA_FIELD(ts_bossinfo, TSBossInfo, GetDoorsOpenAfterEncounter);

    auto ts_instance = state.new_usertype<TSInstance>("TSInstance", sol::base_classes, sol::bases<TSMap, TSWorldEntityProvider<TSMap>, TSEntityProvider>());
    LUA_FIELD(ts_instance, TSInstance, SaveInstanceToDB);
    LUA_FIELD(ts_instance, TSInstance, IsEncounterInProgress);
    LUA_FIELD(ts_instance, TSInstance, GetObjectGUID);
    LUA_FIELD(ts_instance, TSInstance, DoCloseDoorOrButton);
    LUA_FIELD(ts_instance, TSInstance, DoRespawnGameObject);
    LUA_FIELD(ts_instance, TSInstance, DoUpdateWorldState);
    LUA_FIELD(ts_instance, TSInstance, DoUpdateAchievementCriteria);
    LUA_FIELD(ts_instance, TSInstance, DoStartTimedAchievement);
    LUA_FIELD(ts_instance, TSInstance, DoStopTimedAchievement);
    LUA_FIELD(ts_instance, TSInstance, DoRemoveAurasDueToSpellOnPlayers);
    LUA_FIELD(ts_instance, TSInstance, DoStartTimedAchievement);
    LUA_FIELD(ts_instance, TSInstance, DoStopTimedAchievement);
    LUA_FIELD(ts_instance, TSInstance, DoRemoveAurasDueToSpellOnPlayers);
    LUA_FIELD(ts_instance, TSInstance, SetBossState);
    LUA_FIELD(ts_instance, TSInstance, GetBossState);
    LUA_FIELD(ts_instance, TSInstance, MarkAreaTriggerDone);
    LUA_FIELD(ts_instance, TSInstance, ResetAreaTriggerDone);
    LUA_FIELD(ts_instance, TSInstance, GetEncounterCount);
    LUA_FIELD(ts_instance, TSInstance, BindAllPlayers);
    LUA_FIELD(ts_instance, TSInstance, HasPermBoundPlayers);
    LUA_FIELD(ts_instance, TSInstance, GetMaxPlayers);
    LUA_FIELD(ts_instance, TSInstance, GetMaxResetDelay);
    LUA_FIELD(ts_instance, TSInstance, GetTeamIDInInstance);
    LUA_FIELD(ts_instance, TSInstance, GetFactionInInstance);
    LUA_FIELD(ts_instance, TSInstance, GetBossInfo);
    LUA_FIELD(ts_instance, TSInstance, DoSendNotify);
    LUA_FIELD_OVERLOAD_1_2(ts_instance, TSInstance, DoCastSpellOnPlayers, uint32, bool, bool);
    LUA_FIELD_OVERLOAD_1_2(ts_instance, TSInstance, DoUseDoorOrButton, uint64, uint32, bool);
    LUA_FIELD_OVERLOAD_1_2(ts_instance, TSInstance, DoRemoveAurasDueToSpellOnPlayers, uint32, bool, bool);
}