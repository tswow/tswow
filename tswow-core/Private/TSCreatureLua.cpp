#include "TSLua.h"
#include "TSCreature.h"
#include "TSCreature.h"
#include "TSPlayer.h"
#include "TSGroup.h"
#include "TSSpellInfo.h"
#include "TSGameObject.h"
#include "TSOutfit.h"
#include "TSVehicle.h"
#include "TSSpell.h"
#include "TSCorpse.h"
#include "TSLuaVarargs.h"

void TSLua::load_creature_methods(sol::state & state)
{
    auto ts_creature = state.new_usertype<TSCreature>("TSCreature", sol::base_classes, sol::bases<TSUnit,TSWorldObject,TSObject, TSEntityProvider, TSWorldEntityProvider<TSWorldObject>>());
    LUA_FIELD(ts_creature, TSCreature, GetScriptName);
    LUA_FIELD(ts_creature, TSCreature, GetAIName);
    LUA_FIELD(ts_creature, TSCreature, GetAITargets);
    LUA_FIELD_OVERLOAD_RET_0_3(ts_creature, TSCreature, GetOutfitCopy, Outfit, int32_t, int32_t);
    LUA_FIELD(ts_creature, TSCreature, IsReputationGainDisabled);
    LUA_FIELD(ts_creature, TSCreature, IsReputationGainDisabled);
    LUA_FIELD(ts_creature, TSCreature, CanCompleteQuest);
    LUA_FIELD(ts_creature, TSCreature, IsTargetableForAttack);
    LUA_FIELD(ts_creature, TSCreature, CanAssistTo);
    LUA_FIELD(ts_creature, TSCreature, HasSearchedAssistance);
    LUA_FIELD(ts_creature, TSCreature, IsTappedBy);
    LUA_FIELD(ts_creature, TSCreature, HasLootRecipient);
    LUA_FIELD(ts_creature, TSCreature, CanAggro);
    LUA_FIELD(ts_creature, TSCreature, CanSwim);
    LUA_FIELD(ts_creature, TSCreature, CanWalk);
    LUA_FIELD(ts_creature, TSCreature, IsInEvadeMode);
    LUA_FIELD(ts_creature, TSCreature, IsElite);
    LUA_FIELD(ts_creature, TSCreature, IsGuard);
    LUA_FIELD(ts_creature, TSCreature, IsCivilian);
    LUA_FIELD(ts_creature, TSCreature, IsRacialLeader);
    LUA_FIELD(ts_creature, TSCreature, IsWorldBoss);
    LUA_FIELD(ts_creature, TSCreature, HasCategoryCooldown);
    LUA_FIELD(ts_creature, TSCreature, HasSpell);
    LUA_FIELD(ts_creature, TSCreature, HasQuest);
    LUA_FIELD(ts_creature, TSCreature, HasSpellCooldown);
    LUA_FIELD(ts_creature, TSCreature, CanFly);
    LUA_FIELD(ts_creature, TSCreature, IsTrigger);
    LUA_FIELD(ts_creature, TSCreature, IsDamageEnoughForLootingAndReward);
    LUA_FIELD(ts_creature, TSCreature, CanStartAttack);
    LUA_FIELD(ts_creature, TSCreature, HasLootMode);
    #if TRINITY
    LUA_FIELD(ts_creature, TSCreature, GetAttackDistance);
    #endif
    LUA_FIELD(ts_creature, TSCreature, GetRespawnDelay);
    LUA_FIELD(ts_creature, TSCreature, GetWanderRadius);
    LUA_FIELD(ts_creature, TSCreature, UpdateLevelDependantStats);
    LUA_FIELD(ts_creature, TSCreature, GetWaypointPath);
    LUA_FIELD(ts_creature, TSCreature, GetCurrentWaypointID);
    LUA_FIELD(ts_creature, TSCreature, GetDefaultMovementType);
    LUA_FIELD(ts_creature, TSCreature, GetAggroRange);
    LUA_FIELD(ts_creature, TSCreature, GetLootRecipientGroup);
    LUA_FIELD(ts_creature, TSCreature, GetLootRecipient);
    LUA_FIELD(ts_creature, TSCreature, GetScriptID);
    LUA_FIELD(ts_creature, TSCreature, GetCreatureSpellCooldownDelay);
    LUA_FIELD(ts_creature, TSCreature, GetCorpseDelay);
    LUA_FIELD(ts_creature, TSCreature, GetHomePosition);
    LUA_FIELD(ts_creature, TSCreature, SetHomePosition);
    LUA_FIELD(ts_creature, TSCreature, GetAITarget);
    LUA_FIELD(ts_creature, TSCreature, GetAITargetsCount);
    LUA_FIELD(ts_creature, TSCreature, GetNPCFlags);
    LUA_FIELD(ts_creature, TSCreature, GetShieldBlockValue);
    LUA_FIELD(ts_creature, TSCreature, GetLootMode);
    LUA_FIELD(ts_creature, TSCreature, GetDBTableGUIDLow);
    LUA_FIELD(ts_creature, TSCreature, SetNPCFlags);
    LUA_FIELD(ts_creature, TSCreature, SetDisableGravity);
    LUA_FIELD(ts_creature, TSCreature, SetLootMode);
    LUA_FIELD(ts_creature, TSCreature, SetDeathState);
    LUA_FIELD(ts_creature, TSCreature, SetWalk);
    LUA_FIELD(ts_creature, TSCreature, SetEquipmentSlots);
    LUA_FIELD(ts_creature, TSCreature, SetAggroEnabled);
    LUA_FIELD(ts_creature, TSCreature, SetDisableReputationGain);
    LUA_FIELD(ts_creature, TSCreature, SetInCombatWithZone);
    LUA_FIELD(ts_creature, TSCreature, SetWanderRadius);
    LUA_FIELD(ts_creature, TSCreature, SetRespawnDelay);
    LUA_FIELD(ts_creature, TSCreature, SetDefaultMovementType);
    LUA_FIELD(ts_creature, TSCreature, SetNoSearchAssistance);
    LUA_FIELD(ts_creature, TSCreature, SetNoCallAssistance);
    LUA_FIELD(ts_creature, TSCreature, SetHover);
    LUA_FIELD(ts_creature, TSCreature, SetCanFly);
    LUA_FIELD(ts_creature, TSCreature, DespawnOrUnsummon);
    LUA_FIELD(ts_creature, TSCreature, Respawn);
    LUA_FIELD(ts_creature, TSCreature, RemoveCorpse);
    LUA_FIELD(ts_creature, TSCreature, MoveWaypoint);
    LUA_FIELD(ts_creature, TSCreature, CallAssistance);
    LUA_FIELD(ts_creature, TSCreature, CallForHelp);
    LUA_FIELD(ts_creature, TSCreature, FleeToGetAssistance);
    LUA_FIELD(ts_creature, TSCreature, AttackStart);
    LUA_FIELD(ts_creature, TSCreature, SetReactState);
    LUA_FIELD(ts_creature, TSCreature, GetReactState);
    LUA_FIELD(ts_creature, TSCreature, SaveToDB);
    LUA_FIELD(ts_creature, TSCreature, SelectVictim);
    LUA_FIELD(ts_creature, TSCreature, UpdateEntry);
    LUA_FIELD(ts_creature, TSCreature, ResetLootMode);
    LUA_FIELD(ts_creature, TSCreature, RemoveLootMode);
    LUA_FIELD(ts_creature, TSCreature, AddLootMode);
    LUA_FIELD(ts_creature, TSCreature, GetCreatureFamily);
    LUA_FIELD(ts_creature, TSCreature, GetLoot);
    LUA_FIELD(ts_creature, TSCreature, GetTemplate);
    LUA_FIELD(ts_creature, TSCreature, SetOutfit);
    LUA_FIELD(ts_creature, TSCreature, GetOutfit);
    LUA_FIELD(ts_creature, TSCreature, FireSmartEvent);
    LUA_FIELD(ts_creature, TSCreature, IsAIEnabled);
    LUA_FIELD(ts_creature, TSCreature, SetLootRecipient);
    LUA_FIELD(ts_creature, TSCreature, GetMainhandEquip);
    LUA_FIELD(ts_creature, TSCreature, GetOffhandEquip);
    LUA_FIELD(ts_creature, TSCreature, GetRangedEquip);
    LUA_FIELD(ts_creature, TSCreature, EquipMainhand);
    LUA_FIELD(ts_creature, TSCreature, EquipOffhand);
    LUA_FIELD(ts_creature, TSCreature, EquipRanged);
}