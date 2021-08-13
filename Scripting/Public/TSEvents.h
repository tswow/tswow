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

#include "TSEvent.h"
#include "TSPlayer.h"
#include "TSMutable.h"
#include "TSMutableString.h"
#include "TSMacros.h"
#include "TSChannel.h"
#include "TSAura.h"
#include "TSLoot.h"
#include "TSMail.h"
#include "TSAuction.h"
#include "TSDamageInfo.h"
#include "BinReader.h"
#include "TSJson.h"
#include "TSTests.h"
#include "TSAreaTrigger.h"
#include "TSAchievementTemplate.h"
#include <cstdint>

// Addon
EVENT_TYPE(AddonOnMessage,BinReader<uint8>)
EVENT_TYPE(AddonOnLongMessage,TSPlayer,uint16,TSString)
EVENT_TYPE(AddonOnLongMessageError,TSPlayer,uint8)

// WorldScript
EVENT_TYPE(WorldOnOpenStateChange,bool)
EVENT_TYPE(WorldOnConfigLoad,bool)
EVENT_TYPE(WorldOnMotdChange,TSString)
EVENT_TYPE(WorldOnShutdownInitiate,uint32,uint32)
EVENT_TYPE(WorldOnUpdate,uint32)

// FormulaScript
EVENT_TYPE(FormulaOnHonorCalculation,TSMutable<float>,uint8,float)
EVENT_TYPE(FormulaOnGrayLevelCalculation,TSMutable<uint8>,uint8)
EVENT_TYPE(FormulaOnColorCodeCalculation,TSMutable<uint8>,uint8,uint8)
EVENT_TYPE(FormulaOnZeroDifferenceCalculation,TSMutable<uint8>,uint8)
EVENT_TYPE(FormulaOnBaseGainCalculation,TSMutable<uint32>,uint8,uint8,uint32)
EVENT_TYPE(FormulaOnGainCalculation,TSMutable<uint32>,TSPlayer,TSUnit)
EVENT_TYPE(FormulaOnGroupRateCalculation,TSMutable<float>,uint32,bool)
EVENT_TYPE(FormulaOnMeleeDamageEarly,TSMeleeDamageInfo,uint32,uint32,TSMutable<uint32>)
EVENT_TYPE(FormulaOnMeleeDamageLate,TSMeleeDamageInfo,uint32,uint32,TSMutable<uint32>)
EVENT_TYPE(FormulaOnMeleeCrit,TSUnit,TSUnit,uint32,TSMutable<float>)
EVENT_TYPE(FormulaOnMeleeOutcome
     , TSUnit
     , TSUnit
     , uint32
     , TSMutable<float>
     , TSMutable<float>
     , TSMutable<float>
     , TSMutable<float>
     , TSMutable<float>);
EVENT_TYPE(FormulaOnAddThreatEarly
     , TSUnit
     , TSUnit
     , TSSpellInfo
     , bool
     , TSMutable<float>
     );

EVENT_TYPE(FormulaOnAddThreatLate
     , TSUnit
     , TSUnit
     , TSSpellInfo
     , bool
     , TSMutable<float>
     );

EVENT_TYPE(FormulaOnScaleThreat
     , TSUnit
     , TSUnit
     , bool
     , TSMutable<float>
     );

EVENT_TYPE(FormulaOnHeal,TSUnit,TSUnit,TSMutable<uint32>)
EVENT_TYPE(FormulaOnStaminaHealthBonus,TSPlayer,float,float,TSMutable<float>);
EVENT_TYPE(FormulaOnIntellectManaBonus,TSPlayer,float,float,TSMutable<float>);
EVENT_TYPE(FormulaOnMaxHealth,TSPlayer,TSMutable<float>);
EVENT_TYPE(FormulaOnMaxPower,TSPlayer,uint32,float,TSMutable<float>);
EVENT_TYPE(FormulaOnManaRegen,TSPlayer,TSMutable<float>,TSMutable<float>,TSMutable<int32>);
EVENT_TYPE(FormulaOnSkillGainChance, TSPlayer, int, int, int, int, int, TSMutable<int>)

EVENT_TYPE(FormulaOnQuestXP
    , TSPlayer
    , TSQuest
    , TSMutable<uint32>)

// UnitScript
//EVENT_TYPE(UnitModifyVehiclePassengerExitPos,TSUnit,TSVehicle,TSMutable<Position>)

// WeatherScript
//EVENT_TYPE(WeatherOnChange,Weather*,WeatherState,float)

// AuctionHouseScript
EVENT_TYPE(AuctionHouseOnAuctionAdd, TSAuctionHouseObject, TSAuctionEntry)
EVENT_TYPE(AuctionHouseOnAuctionRemove, TSAuctionHouseObject, TSAuctionEntry)
EVENT_TYPE(AuctionHouseOnAuctionSuccessful, TSAuctionHouseObject, TSAuctionEntry)
EVENT_TYPE(AuctionHouseOnAuctionExpire, TSAuctionHouseObject, TSAuctionEntry)

// ConditionScript
//EVENT_TYPE(ConditionOnConditionCheck,const*,TSMutable<ConditionSourceInfo>, TSMutable<bool>)

// VehicleScript
EVENT_TYPE(VehicleOnInstall, TSVehicle)
EVENT_TYPE(VehicleOnUninstall, TSVehicle)
EVENT_TYPE(VehicleOnReset, TSVehicle)
EVENT_TYPE(VehicleOnInstallAccessory, TSVehicle, TSCreature)
EVENT_TYPE(VehicleOnAddPassenger, TSVehicle, TSUnit, int8)
EVENT_TYPE(VehicleOnRemovePassenger, TSVehicle, TSUnit)

// AchievementScript
EVENT_TYPE(
    AchievementOnUpdate
    , TSPlayer
    , TSAchievementEntry
    , TSAchievementCriteriaEntry
    , uint32 /*progressType*/
    , uint32 /*timeElapsed*/
    , bool /*timedCompleted*/
)
EVENT_TYPE(AchievementOnComplete, TSPlayer, TSAchievementEntry)
struct TSAchievementEvents {
    EVENT(AchievementOnComplete)
    EVENT(AchievementOnUpdate)
};

class TSAchievementMap : public TSEventMap<TSAchievementEvents>
{
    void OnAdd(uint32_t, TSAchievementEvents*);
    void OnRemove(uint32_t);
};

// PlayerScript
EVENT_TYPE(PlayerOnPVPKill, TSPlayer, TSPlayer)
EVENT_TYPE(PlayerOnCreatureKill, TSPlayer, TSCreature)
EVENT_TYPE(PlayerOnPlayerKilledByCreature, TSCreature, TSPlayer)
EVENT_TYPE(PlayerOnLevelChanged, TSPlayer, uint8)
EVENT_TYPE(PlayerOnFreeTalentPointsChanged, TSPlayer, uint32)
EVENT_TYPE(PlayerOnTalentsReset, TSPlayer, bool)
EVENT_TYPE(PlayerOnMoneyChanged, TSPlayer, TSMutable<int32>)
EVENT_TYPE(PlayerOnMoneyLimit, TSPlayer, int32)
EVENT_TYPE(PlayerOnGiveXP, TSPlayer, TSMutable<uint32>, TSUnit)
EVENT_TYPE(PlayerOnReputationChange, TSPlayer, uint32, TSMutable<int32>, bool)
EVENT_TYPE(PlayerOnDuelRequest, TSPlayer, TSPlayer)
EVENT_TYPE(PlayerOnDuelStart, TSPlayer, TSPlayer)
EVENT_TYPE(PlayerOnDuelEnd, TSPlayer, TSPlayer, uint32)
EVENT_TYPE(PlayerOnSay, TSPlayer, uint32, uint32, TSMutableString)
EVENT_TYPE(PlayerOnWhisper, TSPlayer, uint32, uint32, TSMutableString, TSPlayer)
EVENT_TYPE(PlayerOnChatGroup, TSPlayer, uint32, uint32, TSMutableString, TSGroup)
EVENT_TYPE(PlayerOnChatGuild, TSPlayer, uint32, uint32, TSMutableString, TSGuild)
EVENT_TYPE(PlayerOnChat, TSPlayer, uint32, uint32, TSMutableString, TSChannel)
EVENT_TYPE(PlayerOnCommand, TSPlayer, TSMutableString, TSMutable<bool>)
EVENT_TYPE(PlayerOnEmote, TSPlayer, uint32)
EVENT_TYPE(PlayerOnTextEmote, TSPlayer, uint32, uint32, uint64)
EVENT_TYPE(PlayerOnSpellCast, TSPlayer, TSSpell, bool)
EVENT_TYPE(PlayerOnLogin, TSPlayer, bool)
EVENT_TYPE(PlayerOnReload, TSPlayer, bool)
EVENT_TYPE(PlayerOnLogout, TSPlayer)
EVENT_TYPE(PlayerOnCreateEarly, TSPlayer)
EVENT_TYPE(PlayerOnCreate, TSPlayer)
EVENT_TYPE(PlayerOnDelete, uint64, uint32)
EVENT_TYPE(PlayerOnFailedDelete, uint64, uint32)
EVENT_TYPE(PlayerOnSave, TSPlayer)
EVENT_TYPE(PlayerOnBindToInstance, TSPlayer, uint32, uint32, bool, uint8)
EVENT_TYPE(PlayerOnUpdateZone, TSPlayer, uint32, uint32)
EVENT_TYPE(PlayerOnMapChanged, TSPlayer)
EVENT_TYPE(PlayerOnQuestObjectiveProgress, TSPlayer, TSQuest, uint32, uint16)
EVENT_TYPE(PlayerOnQuestStatusChange, TSPlayer, uint32)
EVENT_TYPE(PlayerOnMovieComplete, TSPlayer, uint32)
EVENT_TYPE(PlayerOnPlayerRepop, TSPlayer)
EVENT_TYPE(PlayerOnSendMail, TSPlayer, TSMailDraft, TSMutable<uint32>)

EVENT_TYPE(PlayerOnGenerateItemLoot, TSPlayer, TSItem, TSLoot, uint32)
EVENT_TYPE(PlayerOnLootCorpse, TSPlayer, TSCorpse)
EVENT_TYPE(PlayerOnLearnTalent, TSPlayer, uint32_t tabId, uint32_t talentId, uint32_t talentRank, uint32_t spellId, TSMutable<bool>)

EVENT_TYPE(PlayerOnGossipSelect, TSPlayer, TSPlayer, uint32_t, uint32_t, TSMutable<bool>)
EVENT_TYPE(PlayerOnGossipSelectCode, TSPlayer, TSPlayer, uint32_t, uint32_t, TSString, TSMutable<bool>)

// AccountScript
EVENT_TYPE(AccountOnAccountLogin,uint32)
EVENT_TYPE(AccountOnFailedAccountLogin,uint32)
EVENT_TYPE(AccountOnEmailChange,uint32)
EVENT_TYPE(AccountOnFailedEmailChange,uint32)
EVENT_TYPE(AccountOnPasswordChange,uint32)
EVENT_TYPE(AccountOnFailedPasswordChange,uint32)

// GuildScript
EVENT_TYPE(GuildOnAddMember,TSGuild,TSPlayer,TSMutable<uint8>)
EVENT_TYPE(GuildOnRemoveMember,TSGuild,TSPlayer,bool,bool)
EVENT_TYPE(GuildOnMOTDChanged,TSGuild,TSString)
EVENT_TYPE(GuildOnInfoChanged,TSGuild,TSString)
EVENT_TYPE(GuildOnCreate,TSGuild,TSPlayer,TSString)
EVENT_TYPE(GuildOnDisband,TSGuild)
EVENT_TYPE(GuildOnMemberWitdrawMoney,TSGuild,TSPlayer,TSMutable<uint32>,bool)
EVENT_TYPE(GuildOnMemberDepositMoney,TSGuild,TSPlayer,TSMutable<uint32>)
EVENT_TYPE(GuildOnEvent,TSGuild,uint8,uint32,uint32,uint8)
EVENT_TYPE(GuildOnBankEvent,TSGuild,uint8,uint8,uint32,uint32,uint16,uint8)

// GroupScript
EVENT_TYPE(GroupOnAddMember,TSGroup,uint64)
EVENT_TYPE(GroupOnInviteMember,TSGroup,uint64)
EVENT_TYPE(GroupOnRemoveMember,TSGroup,uint64,uint32,uint64,TSString)
EVENT_TYPE(GroupOnChangeLeader,TSGroup,uint64,uint64)
EVENT_TYPE(GroupOnDisband,TSGroup)

// AreaTrigger
EVENT_TYPE(AreaTriggerOnTrigger,TSAreaTriggerEntry,TSPlayer,TSMutable<bool>)
struct TSAreaTriggerEvents {
    EVENT(AreaTriggerOnTrigger)
};
class TSAreaTriggerMap: public TSEventMap<TSAreaTriggerEvents>
{
    void OnAdd(uint32_t, TSAreaTriggerEvents*);
    void OnRemove(uint32_t);
};

// SpellScript
EVENT_TYPE(SpellOnCast,TSSpell)
EVENT_TYPE(SpellOnCheckCast,TSSpell, TSMutable<uint8>)
EVENT_TYPE(SpellOnDispel,TSSpell,uint32)
EVENT_TYPE(SpellOnHit,TSSpell)
EVENT_TYPE(SpellOnTick,TSAuraEffect)
EVENT_TYPE(SpellOnRemove,TSAuraEffect,TSAuraApplication, uint32)
EVENT_TYPE(SpellOnApply,TSAuraEffect,TSAuraApplication, uint32)

EVENT_TYPE(SpellOnDamageEarly, TSSpellDamageInfo, TSSpell, uint32, bool, TSMutable<int32>)
EVENT_TYPE(SpellOnDamageLate, TSSpellDamageInfo, TSSpell, uint32, bool, TSMutable<uint32>)
EVENT_TYPE(SpellOnPeriodicDamage, TSAuraEffect, TSMutable<uint32>)
EVENT_TYPE(SpellOnCritFormula, TSSpell, TSMutable<float>)
EVENT_TYPE(SpellOnAuraCritFormula, TSAuraEffect, TSMutable<float>)
EVENT_TYPE(SpellOnReflectFormula, TSWorldObject, TSUnit, TSSpellInfo, TSMutable<int32>)
EVENT_TYPE(SpellOnHitFormula, TSWorldObject, TSUnit, TSSpellInfo, TSMutable<int32>)
EVENT_TYPE(SpellOnResistFormula, TSWorldObject, TSUnit, TSSpellInfo, TSMutable<int32>)

struct TSSpellEvents {
     EVENT(SpellOnCast)
     EVENT(SpellOnCheckCast)
     EVENT(SpellOnDispel)
     EVENT(SpellOnHit)
     EVENT(SpellOnTick)
     EVENT(SpellOnRemove)
     EVENT(SpellOnApply)

     EVENT(SpellOnDamageEarly)
     EVENT(SpellOnDamageLate)
     EVENT(SpellOnPeriodicDamage)
     EVENT(SpellOnCritFormula)
     EVENT(SpellOnAuraCritFormula)
     EVENT(SpellOnReflectFormula)
     EVENT(SpellOnHitFormula)
     EVENT(SpellOnResistFormula)
};

class TSSpellMap : public TSEventMap<TSSpellEvents> 
{
     void OnAdd(uint32_t,TSSpellEvents*);
     void OnRemove(uint32_t);
};

// CreatureScript
EVENT_TYPE(CreatureOnMoveInLOS,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnJustEnteredCombat,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnJustEngagedWith,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnDeath,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnKilledUnit,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnSummoned,TSCreature,TSCreature)
EVENT_TYPE(CreatureOnIsSummoned,TSCreature,TSWorldObject)
EVENT_TYPE(CreatureOnSummonDespawn,TSCreature,TSCreature)
EVENT_TYPE(CreatureOnSummonDies,TSCreature,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnHitBySpell,TSCreature,TSWorldObject,TSSpellInfo)
EVENT_TYPE(CreatureOnSpellHitTarget,TSCreature,TSWorldObject,TSSpellInfo)
EVENT_TYPE(CreatureOnSpellCastFinished,TSCreature,TSSpellInfo,uint32)
EVENT_TYPE(CreatureOnJustAppeared,TSCreature)
EVENT_TYPE(CreatureOnCharmed,TSCreature, bool)
EVENT_TYPE(CreatureOnReachedHome,TSCreature)
EVENT_TYPE(CreatureOnReceiveEmote,TSCreature,TSPlayer,uint32)
EVENT_TYPE(CreatureOnOwnerAttacked,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnOwnerAttacks,TSCreature,TSUnit)
EVENT_TYPE(CreatureOnCorpseRemoved,TSCreature,uint32)

EVENT_TYPE(CreatureOnWaypointStarted,TSCreature,uint32,uint32)
EVENT_TYPE(CreatureOnWaypointReached,TSCreature,uint32,uint32)
EVENT_TYPE(CreatureOnWaypointPathEnded,TSCreature,uint32,uint32)
EVENT_TYPE(CreatureOnPassengerBoarded,TSCreature,TSUnit,int8,bool)
EVENT_TYPE(CreatureOnSpellClick,TSCreature,TSUnit,bool)
EVENT_TYPE(CreatureOnUpdateAI,TSCreature,uint32)
EVENT_TYPE(CreatureOnGenerateLoot,TSCreature,TSPlayer)
EVENT_TYPE(CreatureOnCreate,TSCreature,TSMutable<bool>)
EVENT_TYPE(CreatureOnReload,TSCreature)
EVENT_TYPE(CreatureOnRemove,TSCreature)

EVENT_TYPE(CreatureOnGossipHello,TSCreature,TSPlayer,TSMutable<bool>)
EVENT_TYPE(CreatureOnGossipSelect,TSCreature,TSPlayer,uint32,uint32,TSMutable<bool>)
EVENT_TYPE(CreatureOnGossipSelectCode,TSCreature,TSPlayer,uint32,uint32,TSString,TSMutable<bool>)
EVENT_TYPE(CreatureOnQuestAccept,TSCreature,TSPlayer,TSQuest)
EVENT_TYPE(CreatureOnQuestReward,TSCreature,TSPlayer,TSQuest,uint32)

EVENT_TYPE(CreatureOnCanGeneratePickPocketLoot,TSCreature,TSPlayer,TSMutable<bool>)
EVENT_TYPE(CreatureOnGeneratePickPocketLoot,TSCreature,TSPlayer,TSLoot)
EVENT_TYPE(CreatureOnGenerateSkinningLoot,TSCreature,TSPlayer,TSLoot)

EVENT_TYPE(CreatureOnMaxHealth, TSCreature, float /*rankHealthMod*/, uint32 /*basehp*/, TSMutable<uint32> /*maxHealth*/)
// extension: add "ForceMana" mutable after maxMana for ignoring creature class (not sure it works well)
EVENT_TYPE(CreatureOnMaxMana, TSCreature, float /*baseMana*/, TSMutable<uint32> /*maxMana*/) 
EVENT_TYPE(CreatureOnBaseDamage, TSCreature, float /*baseDamageIn*/, TSMutable<float> /*baseMinDamage*/, TSMutable<float> /*baseMaxDamage*/)
EVENT_TYPE(CreatureOnArmor, TSCreature, float /*baseArmor*/, TSMutable<float> /*armorOut*/)
EVENT_TYPE(CreatureOnAttackPower, TSCreature, TSMutable<uint32> /*attackPower*/, TSMutable<uint32> /*rangedAttackPower*/)

struct TSCreatureEvents {
     EVENT(CreatureOnMoveInLOS)
     EVENT(CreatureOnJustEnteredCombat)
     EVENT(CreatureOnJustEngagedWith)
     EVENT(CreatureOnDeath)
     EVENT(CreatureOnKilledUnit)
     EVENT(CreatureOnSummoned)
     EVENT(CreatureOnIsSummoned)
     EVENT(CreatureOnSummonDespawn)
     EVENT(CreatureOnSummonDies)
     EVENT(CreatureOnHitBySpell)
     EVENT(CreatureOnSpellHitTarget)
     EVENT(CreatureOnSpellCastFinished)
     EVENT(CreatureOnJustAppeared)
     EVENT(CreatureOnCharmed)
     EVENT(CreatureOnReachedHome)
     EVENT(CreatureOnReceiveEmote)
     EVENT(CreatureOnOwnerAttacked)
     EVENT(CreatureOnOwnerAttacks)
     EVENT(CreatureOnCorpseRemoved)
     EVENT(CreatureOnWaypointStarted)
     EVENT(CreatureOnWaypointReached)
     EVENT(CreatureOnWaypointPathEnded)
     EVENT(CreatureOnPassengerBoarded)
     EVENT(CreatureOnSpellClick)
     EVENT(CreatureOnUpdateAI)
     EVENT(CreatureOnGenerateLoot)
     EVENT(CreatureOnCreate)
     EVENT(CreatureOnReload)
     EVENT(CreatureOnRemove)

     EVENT(CreatureOnGossipHello)
     EVENT(CreatureOnGossipSelect)
     EVENT(CreatureOnGossipSelectCode)
     EVENT(CreatureOnQuestAccept)
     EVENT(CreatureOnQuestReward)

     EVENT(CreatureOnCanGeneratePickPocketLoot)
     EVENT(CreatureOnGeneratePickPocketLoot)
     EVENT(CreatureOnGenerateSkinningLoot)

     EVENT(CreatureOnMaxHealth)
     EVENT(CreatureOnMaxMana)
     EVENT(CreatureOnBaseDamage)
     EVENT(CreatureOnArmor)
     EVENT(CreatureOnAttackPower)
};

class TSCreatureMap : public TSEventMap<TSCreatureEvents>
{
     void OnAdd(uint32_t,TSCreatureEvents*);
     void OnRemove(uint32_t);
};

// ItemScript
EVENT_TYPE(ItemOnUse,TSItem,TSPlayer,void*,TSMutable<bool>)
EVENT_TYPE(ItemOnExpire,TSItemTemplate,TSPlayer, TSMutable<bool>)
EVENT_TYPE(ItemOnRemove,TSItem,TSPlayer,TSMutable<bool>)
EVENT_TYPE(ItemOnCastSpell,TSItem,TSPlayer,TSUnit,TSSpellInfo,TSMutable<bool>)

EVENT_TYPE(ItemOnQuestAccept,TSItem,TSPlayer,TSQuest)

EVENT_TYPE(ItemOnGossipHello,TSItem,TSPlayer,TSMutable<bool>)
EVENT_TYPE(ItemOnGossipSelect,TSItem,TSPlayer,uint32,uint32,TSMutable<bool>)
EVENT_TYPE(ItemOnGossipSelectCode,TSItem,TSPlayer,uint32,uint32,TSString,TSMutable<bool>)
EVENT_TYPE(ItemOnCanChangeEquipState,TSItemTemplate,TSMutable<bool>)

EVENT_TYPE(ItemOnUnequip,TSItem,TSPlayer,bool,TSMutable<uint32> /*result*/)
EVENT_TYPE(ItemOnBank,TSItem,TSPlayer,uint8/*bag*/,uint8/*slot*/,bool/*swap*/,TSMutable<uint32> /*result*/)
EVENT_TYPE(ItemOnEquipEarly,TSItem,TSPlayer,uint8/*slot*/,bool/*swap*/,TSMutable<uint32> /*result*/)
EVENT_TYPE(ItemOnUseLate,TSItem,TSPlayer,TSMutable<uint32> /*result*/)
EVENT_TYPE(ItemOnLFGRollEarly,TSItemTemplate,TSWorldObject /*looted*/,TSPlayer/*looter*/,TSMutable<int32> /*result*/)
EVENT_TYPE(ItemOnDestroyEarly,TSItem,TSPlayer,TSMutable<bool>)
EVENT_TYPE(ItemOnTakenAsLoot,TSItem,TSLootItem,TSLoot,TSPlayer)

struct TSItemEvents {
     EVENT(ItemOnUse)
     EVENT(ItemOnExpire)
     EVENT(ItemOnRemove)
     EVENT(ItemOnCastSpell)

     EVENT(ItemOnQuestAccept)

     EVENT(ItemOnGossipHello)
     EVENT(ItemOnGossipSelect)
     EVENT(ItemOnGossipSelectCode)
     EVENT(ItemOnCanChangeEquipState)

     EVENT(ItemOnUnequip)
     EVENT(ItemOnBank)
     EVENT(ItemOnEquipEarly)
     EVENT(ItemOnUseLate)
     EVENT(ItemOnLFGRollEarly)
     EVENT(ItemOnDestroyEarly)
     EVENT(ItemOnTakenAsLoot)
};

class TSItemMap : public TSEventMap<TSItemEvents>
{
     void OnAdd(uint32_t,TSItemEvents*);
     void OnRemove(uint32_t);
};

// GameObjectScript
EVENT_TYPE(GameObjectOnUpdate,TSGameObject,uint32)
EVENT_TYPE(GameObjectOnDialogStatus,TSGameObject,TSPlayer)
EVENT_TYPE(GameObjectOnDestroyed,TSGameObject,TSWorldObject)
EVENT_TYPE(GameObjectOnDamaged,TSGameObject,TSWorldObject)
EVENT_TYPE(GameObjectOnLootStateChanged,TSGameObject,uint32,TSUnit)
EVENT_TYPE(GameObjectOnGOStateChanged,TSGameObject,uint32)

EVENT_TYPE(GameObjectOnGossipHello,TSGameObject,TSPlayer,TSMutable<bool>)
EVENT_TYPE(GameObjectOnGossipSelect,TSGameObject,TSPlayer,uint32,uint32,TSMutable<bool>)
EVENT_TYPE(GameObjectOnGossipSelectCode,TSGameObject,TSPlayer,uint32,uint32,TSString,TSMutable<bool>)

EVENT_TYPE(GameObjectOnCreate,TSGameObject,TSMutable<bool>)
EVENT_TYPE(GameObjectOnReload,TSGameObject)
EVENT_TYPE(GameObjectOnRemove,TSGameObject)
EVENT_TYPE(GameObjectOnUse,TSGameObject,TSUnit,TSMutable<bool>)
EVENT_TYPE(GameObjectOnQuestAccept,TSGameObject,TSPlayer,TSQuest)
EVENT_TYPE(GameObjectOnQuestReward,TSGameObject,TSPlayer,TSQuest,uint32)
EVENT_TYPE(GameObjectOnGenerateLoot,TSGameObject,TSPlayer)
EVENT_TYPE(GameObjectOnGenerateFishLoot,TSGameObject,TSPlayer,TSLoot,bool)

struct TSGameObjectEvents {
     EVENT(GameObjectOnUpdate)
     EVENT(GameObjectOnDialogStatus)
     EVENT(GameObjectOnDestroyed)
     EVENT(GameObjectOnDamaged)
     EVENT(GameObjectOnLootStateChanged)
     EVENT(GameObjectOnGOStateChanged)

     EVENT(GameObjectOnGossipHello)
     EVENT(GameObjectOnGossipSelect)
     EVENT(GameObjectOnGossipSelectCode)

     EVENT(GameObjectOnCreate)
     EVENT(GameObjectOnReload)
     EVENT(GameObjectOnRemove)
     EVENT(GameObjectOnUse)
     EVENT(GameObjectOnQuestAccept)
     EVENT(GameObjectOnQuestReward)
     EVENT(GameObjectOnGenerateLoot)
     EVENT(GameObjectOnGenerateFishLoot)
};

class TSGameObjectMap : public TSEventMap<TSGameObjectEvents>
{
    void OnAdd(uint32_t, TSGameObjectEvents*);
    void OnRemove(uint32_t);
};

EVENT_TYPE(MapOnCreate,TSMap)
EVENT_TYPE(MapOnReload,TSMap)
EVENT_TYPE(MapOnUpdate,TSMap,uint32)
EVENT_TYPE(MapOnPlayerEnter,TSMap,TSPlayer)
EVENT_TYPE(MapOnPlayerLeave,TSMap,TSPlayer)
EVENT_TYPE(MapOnCreatureCreate,TSMap,TSCreature,TSMutable<bool>)
EVENT_TYPE(MapOnCreatureRemove,TSMap,TSCreature)
EVENT_TYPE(MapOnGameObjectCreate,TSMap,TSGameObject,TSMutable<bool>)
EVENT_TYPE(MapOnGameObjectRemove,TSMap,TSGameObject)
EVENT_TYPE(MapOnCheckEncounter,TSMap,TSPlayer)
EVENT_TYPE(MapOnMessage,TSMap,unsigned char channel,TSJsonObject)

struct TSMapEvents {
     EVENT(MapOnCreate)
     EVENT(MapOnReload)
     EVENT(MapOnUpdate)
     EVENT(MapOnPlayerEnter)
     EVENT(MapOnPlayerLeave)
     EVENT(MapOnCreatureCreate)
     EVENT(MapOnCreatureRemove)
     EVENT(MapOnGameObjectCreate)
     EVENT(MapOnGameObjectRemove)
     EVENT(MapOnCheckEncounter)
     EVENT(MapOnMessage)
};

class TSMapMap : public TSEventMap<TSMapEvents>
{
    void OnAdd(uint32_t, TSMapEvents*);
    void OnRemove(uint32_t);
};

struct TSMapDataExtra {
     TSMapEvents* events = nullptr;
};
TC_GAME_API TSMapDataExtra* GetMapDataExtra(uint32_t);

struct TSEvents
{
    // AddonScript
    EVENT(AddonOnMessage)
    EVENT(AddonOnLongMessage)
    EVENT(AddonOnLongMessageError)

    // WorldScript
    EVENT(WorldOnOpenStateChange)
    EVENT(WorldOnConfigLoad)
    EVENT(WorldOnMotdChange)
    EVENT(WorldOnShutdownInitiate)
    EVENT(WorldOnUpdate)

    // FormulaScript
    EVENT(FormulaOnHonorCalculation)
    EVENT(FormulaOnGrayLevelCalculation)
    EVENT(FormulaOnColorCodeCalculation)
    EVENT(FormulaOnZeroDifferenceCalculation)
    EVENT(FormulaOnBaseGainCalculation)
    EVENT(FormulaOnGainCalculation)
    EVENT(FormulaOnGroupRateCalculation)
    EVENT(FormulaOnMeleeDamageEarly)
    EVENT(FormulaOnMeleeDamageLate)
    EVENT(FormulaOnMeleeCrit)
    EVENT(FormulaOnMeleeOutcome)
    EVENT(FormulaOnAddThreatEarly)
    EVENT(FormulaOnAddThreatLate)
    EVENT(FormulaOnScaleThreat)

    // ItemScript
    EVENT(ItemOnUse)
    EVENT(ItemOnExpire)
    EVENT(ItemOnRemove)
    EVENT(ItemOnCastSpell)

    EVENT(ItemOnQuestAccept)

    EVENT(ItemOnGossipHello)
    EVENT(ItemOnGossipSelect)
    EVENT(ItemOnGossipSelectCode)
    EVENT(ItemOnCanChangeEquipState)

    EVENT(ItemOnUnequip)
    EVENT(ItemOnBank)
    EVENT(ItemOnEquipEarly)
    EVENT(ItemOnUseLate)
    EVENT(ItemOnLFGRollEarly)
    EVENT(ItemOnDestroyEarly)
    EVENT(ItemOnTakenAsLoot)

    // UnitScript
    EVENT(FormulaOnHeal);
    EVENT(FormulaOnStaminaHealthBonus);
    EVENT(FormulaOnIntellectManaBonus);
    EVENT(FormulaOnMaxHealth);
    EVENT(FormulaOnMaxPower);
    EVENT(FormulaOnManaRegen);
    EVENT(FormulaOnSkillGainChance);
    EVENT(FormulaOnQuestXP);
    //EVENT(UnitModifyVehiclePassengerExitPos)

    // WeatherScript
    //EVENT(WeatherOnChange)

    // AuctionHouseScript
    EVENT(AuctionHouseOnAuctionAdd)
    EVENT(AuctionHouseOnAuctionRemove)
    EVENT(AuctionHouseOnAuctionSuccessful)
    EVENT(AuctionHouseOnAuctionExpire)

    // ConditionScript
    //EVENT(ConditionOnConditionCheck)

    // VehicleScript
    EVENT(VehicleOnInstall)
    EVENT(VehicleOnUninstall)
    EVENT(VehicleOnReset)
    EVENT(VehicleOnInstallAccessory)
    EVENT(VehicleOnAddPassenger)
    EVENT(VehicleOnRemovePassenger)

    // AchievementCriteriaScript
    //EVENT(AchievementCriteriaOnCheck)

    // PlayerScript
    EVENT(PlayerOnPVPKill)
    EVENT(PlayerOnCreatureKill)
    EVENT(PlayerOnPlayerKilledByCreature)
    EVENT(PlayerOnLevelChanged)
    EVENT(PlayerOnFreeTalentPointsChanged)
    EVENT(PlayerOnTalentsReset)
    EVENT(PlayerOnMoneyChanged)
    EVENT(PlayerOnMoneyLimit)
    EVENT(PlayerOnGiveXP)
    EVENT(PlayerOnReputationChange)
    EVENT(PlayerOnDuelRequest)
    EVENT(PlayerOnDuelStart)
    EVENT(PlayerOnDuelEnd)
    EVENT(PlayerOnSay)
    EVENT(PlayerOnWhisper)
    EVENT(PlayerOnChatGroup)
    EVENT(PlayerOnChatGuild)
    EVENT(PlayerOnChat) // <-- On Chat Channel
    EVENT(PlayerOnCommand)
    EVENT(PlayerOnEmote)
    EVENT(PlayerOnTextEmote)
    EVENT(PlayerOnSpellCast)
    EVENT(PlayerOnLogin)
    EVENT(PlayerOnReload)
    EVENT(PlayerOnLogout)
    EVENT(PlayerOnCreate)
    EVENT(PlayerOnCreateEarly)
    EVENT(PlayerOnDelete)
    EVENT(PlayerOnFailedDelete)
    EVENT(PlayerOnSave)
    EVENT(PlayerOnBindToInstance)
    EVENT(PlayerOnUpdateZone)
    EVENT(PlayerOnMapChanged)
    EVENT(PlayerOnQuestObjectiveProgress)
    EVENT(PlayerOnQuestStatusChange)
    EVENT(PlayerOnMovieComplete)
    EVENT(PlayerOnPlayerRepop)
    EVENT(PlayerOnSendMail)
    EVENT(PlayerOnGossipSelect)
    EVENT(PlayerOnGossipSelectCode)
    EVENT(PlayerOnGenerateItemLoot)
    EVENT(PlayerOnLootCorpse)
    EVENT(PlayerOnLearnTalent)

    // AccountScript
    EVENT(AccountOnAccountLogin)
    EVENT(AccountOnFailedAccountLogin)
    EVENT(AccountOnEmailChange)
    EVENT(AccountOnFailedEmailChange)
    EVENT(AccountOnPasswordChange)
    EVENT(AccountOnFailedPasswordChange)

    // GuildScript
    EVENT(GuildOnAddMember)
    EVENT(GuildOnRemoveMember)
    EVENT(GuildOnMOTDChanged)
    EVENT(GuildOnInfoChanged)
    EVENT(GuildOnCreate)
    EVENT(GuildOnDisband)
    EVENT(GuildOnMemberWitdrawMoney)
    EVENT(GuildOnMemberDepositMoney)
    EVENT(GuildOnEvent)
    EVENT(GuildOnBankEvent)

    // GroupScript
    EVENT(GroupOnAddMember)
    EVENT(GroupOnInviteMember)
    EVENT(GroupOnRemoveMember)
    EVENT(GroupOnChangeLeader)
    EVENT(GroupOnDisband)

    // CreatureScript
    EVENT(CreatureOnMoveInLOS)
    EVENT(CreatureOnJustEnteredCombat)
    EVENT(CreatureOnJustEngagedWith)
    EVENT(CreatureOnDeath)
    EVENT(CreatureOnKilledUnit)
    EVENT(CreatureOnSummoned)
    EVENT(CreatureOnIsSummoned)
    EVENT(CreatureOnSummonDespawn)
    EVENT(CreatureOnSummonDies)
    EVENT(CreatureOnHitBySpell)
    EVENT(CreatureOnSpellHitTarget)
    EVENT(CreatureOnSpellCastFinished)
    EVENT(CreatureOnJustAppeared)
    EVENT(CreatureOnCharmed)
    EVENT(CreatureOnReachedHome)
    EVENT(CreatureOnReceiveEmote)
    EVENT(CreatureOnOwnerAttacked)
    EVENT(CreatureOnOwnerAttacks)
    EVENT(CreatureOnCorpseRemoved)
    EVENT(CreatureOnWaypointStarted)
    EVENT(CreatureOnWaypointReached)
    EVENT(CreatureOnWaypointPathEnded)
    EVENT(CreatureOnPassengerBoarded)
    EVENT(CreatureOnSpellClick)
    EVENT(CreatureOnUpdateAI)
    EVENT(CreatureOnGenerateLoot)
    EVENT(CreatureOnCreate)
    EVENT(CreatureOnReload)
    EVENT(CreatureOnRemove)

    EVENT(CreatureOnGossipHello)
    EVENT(CreatureOnGossipSelect)
    EVENT(CreatureOnGossipSelectCode)
    EVENT(CreatureOnQuestAccept)
    EVENT(CreatureOnQuestReward)
    EVENT(CreatureOnCanGeneratePickPocketLoot)
    EVENT(CreatureOnGeneratePickPocketLoot)
    EVENT(CreatureOnGenerateSkinningLoot)

    EVENT(CreatureOnMaxHealth)
    EVENT(CreatureOnMaxMana)
    EVENT(CreatureOnBaseDamage)
    EVENT(CreatureOnArmor)
    EVENT(CreatureOnAttackPower)

    // AreaTrigger
    EVENT(AreaTriggerOnTrigger)

    // SpellScript
    EVENT(SpellOnCast)
    EVENT(SpellOnCheckCast)
    EVENT(SpellOnDispel)
    EVENT(SpellOnHit)
    EVENT(SpellOnTick)
    EVENT(SpellOnRemove)
    EVENT(SpellOnApply)

    EVENT(SpellOnDamageEarly)
    EVENT(SpellOnDamageLate)
    EVENT(SpellOnPeriodicDamage)
    EVENT(SpellOnCritFormula)
    EVENT(SpellOnAuraCritFormula)
    EVENT(SpellOnReflectFormula)
    EVENT(SpellOnHitFormula)
    EVENT(SpellOnResistFormula)

    // GameObjects
    EVENT(GameObjectOnUpdate)
    EVENT(GameObjectOnDialogStatus)
    EVENT(GameObjectOnDestroyed)
    EVENT(GameObjectOnDamaged)
    EVENT(GameObjectOnLootStateChanged)
    EVENT(GameObjectOnGOStateChanged)

    EVENT(GameObjectOnGossipHello)
    EVENT(GameObjectOnGossipSelect)
    EVENT(GameObjectOnGossipSelectCode)

    EVENT(GameObjectOnCreate)
    EVENT(GameObjectOnReload)
    EVENT(GameObjectOnRemove)
    EVENT(GameObjectOnUse)
    EVENT(GameObjectOnQuestAccept)
    EVENT(GameObjectOnQuestReward)
    EVENT(GameObjectOnGenerateLoot)
    EVENT(GameObjectOnGenerateFishLoot)

    // Maps
    EVENT(MapOnCreate)
    EVENT(MapOnReload)
    EVENT(MapOnUpdate)
    EVENT(MapOnPlayerEnter)
    EVENT(MapOnPlayerLeave)
    EVENT(MapOnCreatureCreate)
    EVENT(MapOnCreatureRemove)
    EVENT(MapOnGameObjectCreate)
    EVENT(MapOnGameObjectRemove)
    EVENT(MapOnCheckEncounter)
    EVENT(MapOnMessage)

    EVENT(AchievementOnUpdate)
    EVENT(AchievementOnComplete)

    TSAchievementMap Achievements;
    TSSpellMap Spells;
    TSCreatureMap Creatures;
    TSGameObjectMap GameObjects;
    TSMapMap Maps;
    TSItemMap Items;
    TSAreaTriggerMap AreaTriggers;
};

TC_GAME_API void ReloadGameObject(GameObjectOnReloadType fn, uint32 id);
TC_GAME_API void ReloadPlayer(PlayerOnReloadType fn, uint32 id);
TC_GAME_API void ReloadCreature(CreatureOnReloadType fn, uint32 id);
TC_GAME_API void ReloadMap(MapOnReloadType fn, uint32 id);

class TSEventHandlers
{
public:
     uint32_t m_modid;
     std::string m_modName;

     TSEventHandlers(uint32_t modid, std::string const& modName)
         : m_modid(modid)
         , m_modName(modName)
         , Tests(modid,modName)
     {
     }

     TSEventHandlers() = default;

    struct ServerEvents: public EventHandler
    {
         ServerEvents* operator->() { return this;}
    } Server;

    struct WorldEvents: public EventHandler
    {
         WorldEvents* operator->() { return this;}
         EVENT_HANDLE(World,OnOpenStateChange)
         EVENT_HANDLE(World,OnConfigLoad)
         EVENT_HANDLE(World,OnMotdChange)
         EVENT_HANDLE(World,OnShutdownInitiate)
         EVENT_HANDLE(World,OnUpdate)
    } World;

    struct FormulaEvents: public EventHandler
    {
         FormulaEvents* operator->() { return this;}
         EVENT_HANDLE(Formula,OnHonorCalculation)
         EVENT_HANDLE(Formula,OnGrayLevelCalculation)
         EVENT_HANDLE(Formula,OnColorCodeCalculation)
         EVENT_HANDLE(Formula,OnZeroDifferenceCalculation)
         EVENT_HANDLE(Formula,OnBaseGainCalculation)
         EVENT_HANDLE(Formula,OnGainCalculation)
         EVENT_HANDLE(Formula,OnGroupRateCalculation)
         EVENT_HANDLE(Formula,OnMeleeDamageEarly)
         EVENT_HANDLE(Formula,OnMeleeDamageLate)
         EVENT_HANDLE(Formula,OnMeleeCrit)
         EVENT_HANDLE(Formula,OnMeleeOutcome)
         EVENT_HANDLE(Formula,OnAddThreatEarly)
         EVENT_HANDLE(Formula,OnAddThreatLate)
         EVENT_HANDLE(Formula,OnScaleThreat)
         EVENT_HANDLE(Formula,OnHeal)
         EVENT_HANDLE(Formula,OnStaminaHealthBonus);
         EVENT_HANDLE(Formula,OnIntellectManaBonus);
         EVENT_HANDLE(Formula,OnMaxHealth);
         EVENT_HANDLE(Formula,OnMaxPower);
         EVENT_HANDLE(Formula,OnManaRegen);
         EVENT_HANDLE(Formula,OnSkillGainChance);
         EVENT_HANDLE(Formula,OnQuestXP);
    } Formula;

    struct UnitEvents: public EventHandler
    {
         UnitEvents* operator->() { return this;}
    } Unit;

    struct WeatherEvents: public EventHandler
    {
         WeatherEvents* operator->() { return this;}
         //EVENT_HANDLE(Weather,OnChange)
    } Weather;

    struct AuctionEvents: public EventHandler
    {
         AuctionEvents* operator->() { return this;}
         EVENT_HANDLE(AuctionHouse,OnAuctionAdd)
         EVENT_HANDLE(AuctionHouse,OnAuctionRemove)
         EVENT_HANDLE(AuctionHouse,OnAuctionSuccessful)
         EVENT_HANDLE(AuctionHouse,OnAuctionExpire)
    } AuctionHouse;

    struct ConditionEvents: public EventHandler
    {
         ConditionEvents* operator->() { return this;}
         //EVENT_HANDLE(Condition,OnConditionCheck)
    } Condition;

    struct VehicleEvents: public EventHandler
    {
         VehicleEvents* operator->() { return this;}
         EVENT_HANDLE(Vehicle,OnInstall)
         EVENT_HANDLE(Vehicle,OnUninstall)
         EVENT_HANDLE(Vehicle,OnReset)
         EVENT_HANDLE(Vehicle,OnInstallAccessory)
         EVENT_HANDLE(Vehicle,OnAddPassenger)
         EVENT_HANDLE(Vehicle,OnRemovePassenger)
    } Vehicle;

    struct AchievementEvents : public EventHandler
    {
        AchievementEvents* operator->() { return this; }
        EVENT_HANDLE(Achievement, OnComplete)
        EVENT_HANDLE(Achievement, OnUpdate)
    } Achievements;

    struct AchievementIDEvents : public MappedEventHandler<TSAchievementMap>
    {
        AchievementIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(Achievement, OnComplete)
        MAP_EVENT_HANDLE(Achievement, OnUpdate)
    } AchievementID;


    struct PlayerEvents : public EventHandler
    {
         PlayerEvents* operator->() { return this;}
         EVENT_HANDLE(Player,OnPVPKill)
         EVENT_HANDLE(Player,OnCreatureKill)
         EVENT_HANDLE(Player,OnPlayerKilledByCreature)
         EVENT_HANDLE(Player,OnLevelChanged)
         EVENT_HANDLE(Player,OnFreeTalentPointsChanged)
         EVENT_HANDLE(Player,OnTalentsReset)
         EVENT_HANDLE(Player,OnMoneyChanged)
         EVENT_HANDLE(Player,OnMoneyLimit)
         EVENT_HANDLE(Player,OnGiveXP)
         EVENT_HANDLE(Player,OnReputationChange)
         EVENT_HANDLE(Player,OnDuelRequest)
         EVENT_HANDLE(Player,OnDuelStart)
         EVENT_HANDLE(Player,OnDuelEnd)
         EVENT_HANDLE(Player,OnSay)
         EVENT_HANDLE(Player,OnWhisper)
         EVENT_HANDLE(Player,OnChatGroup)
         EVENT_HANDLE(Player,OnChatGuild)
         EVENT_HANDLE(Player,OnChat)
         EVENT_HANDLE(Player,OnCommand)
         EVENT_HANDLE(Player,OnEmote)
         EVENT_HANDLE(Player,OnTextEmote)
         EVENT_HANDLE(Player,OnSpellCast)
         EVENT_HANDLE(Player,OnLogin)
         EVENT_HANDLE_FN(Player,OnReload,ReloadPlayer)
         EVENT_HANDLE(Player,OnLogout)
         EVENT_HANDLE(Player,OnCreate)
         EVENT_HANDLE(Player,OnCreateEarly)
         EVENT_HANDLE(Player,OnDelete)
         EVENT_HANDLE(Player,OnFailedDelete)
         EVENT_HANDLE(Player,OnSave)
         EVENT_HANDLE(Player,OnBindToInstance)
         EVENT_HANDLE(Player,OnUpdateZone)
         EVENT_HANDLE(Player,OnMapChanged)
         EVENT_HANDLE(Player,OnQuestObjectiveProgress)
         EVENT_HANDLE(Player,OnQuestStatusChange)
         EVENT_HANDLE(Player,OnMovieComplete)
         EVENT_HANDLE(Player,OnPlayerRepop)
         EVENT_HANDLE(Player,OnSendMail)
         EVENT_HANDLE(Player,OnGossipSelect)
         EVENT_HANDLE(Player,OnGossipSelectCode)
         EVENT_HANDLE(Player,OnGenerateItemLoot)
         EVENT_HANDLE(Player,OnLearnTalent)
         EVENT_HANDLE(Player,OnLootCorpse)
    } Player;

    struct AccountEvents : public EventHandler
    {
         AccountEvents* operator->() { return this;}
         EVENT_HANDLE(Account,OnAccountLogin)
         EVENT_HANDLE(Account,OnFailedAccountLogin)
         EVENT_HANDLE(Account,OnEmailChange)
         EVENT_HANDLE(Account,OnFailedEmailChange)
         EVENT_HANDLE(Account,OnPasswordChange)
         EVENT_HANDLE(Account,OnFailedPasswordChange)
    } Account;

    struct GuildEvents : public EventHandler
    {
         GuildEvents* operator->() { return this;}
         EVENT_HANDLE(Guild,OnAddMember)
         EVENT_HANDLE(Guild,OnRemoveMember)
         EVENT_HANDLE(Guild,OnMOTDChanged)
         EVENT_HANDLE(Guild,OnInfoChanged)
         EVENT_HANDLE(Guild,OnCreate)
         EVENT_HANDLE(Guild,OnDisband)
         EVENT_HANDLE(Guild,OnMemberWitdrawMoney)
         EVENT_HANDLE(Guild,OnMemberDepositMoney)
         EVENT_HANDLE(Guild,OnEvent)
         EVENT_HANDLE(Guild,OnBankEvent)
    } Guild;

    struct GroupEvents : public EventHandler
    {
         GroupEvents* operator->(){return this;}
         EVENT_HANDLE(Group,OnAddMember)
         EVENT_HANDLE(Group,OnInviteMember)
         EVENT_HANDLE(Group,OnRemoveMember)
         EVENT_HANDLE(Group,OnChangeLeader)
         EVENT_HANDLE(Group,OnDisband)
    } Group;

     struct SpellEvents : public EventHandler
    {
          SpellEvents* operator->(){return this;}
          EVENT_HANDLE(Spell,OnCast)
          EVENT_HANDLE(Spell,OnCheckCast)
          EVENT_HANDLE(Spell,OnDispel)
          EVENT_HANDLE(Spell,OnHit)
          EVENT_HANDLE(Spell,OnTick)
          EVENT_HANDLE(Spell,OnRemove)
          EVENT_HANDLE(Spell,OnApply)

          EVENT_HANDLE(Spell,OnDamageEarly)
          EVENT_HANDLE(Spell,OnDamageLate)
          EVENT_HANDLE(Spell,OnPeriodicDamage)
          EVENT_HANDLE(Spell,OnCritFormula)
          EVENT_HANDLE(Spell,OnAuraCritFormula)
          EVENT_HANDLE(Spell,OnReflectFormula)
          EVENT_HANDLE(Spell,OnHitFormula)
          EVENT_HANDLE(Spell,OnResistFormula)
    } Spells;

    struct SpellIDEvents : public MappedEventHandler<TSSpellMap>
    {
          SpellIDEvents* operator->(){return this;}
          MAP_EVENT_HANDLE(Spell,OnCast)
          MAP_EVENT_HANDLE(Spell,OnCheckCast)
          MAP_EVENT_HANDLE(Spell,OnDispel)
          MAP_EVENT_HANDLE(Spell,OnHit)
          MAP_EVENT_HANDLE(Spell,OnTick)
          MAP_EVENT_HANDLE(Spell,OnRemove)
          MAP_EVENT_HANDLE(Spell,OnApply)

          MAP_EVENT_HANDLE(Spell, OnDamageEarly)
          MAP_EVENT_HANDLE(Spell, OnDamageLate)
          MAP_EVENT_HANDLE(Spell, OnPeriodicDamage)
          MAP_EVENT_HANDLE(Spell, OnCritFormula)
          MAP_EVENT_HANDLE(Spell, OnAuraCritFormula)
          MAP_EVENT_HANDLE(Spell, OnReflectFormula)
          MAP_EVENT_HANDLE(Spell, OnHitFormula)
          MAP_EVENT_HANDLE(Spell, OnResistFormula)
    } SpellID;

     struct CreatureEvents: public EventHandler
    {
          CreatureEvents* operator->(){return this;}
          EVENT_HANDLE(Creature,OnMoveInLOS)
          EVENT_HANDLE(Creature,OnJustEnteredCombat)
          EVENT_HANDLE(Creature,OnJustEngagedWith)
          EVENT_HANDLE(Creature,OnDeath)
          EVENT_HANDLE(Creature,OnKilledUnit)
          EVENT_HANDLE(Creature,OnSummoned)
          EVENT_HANDLE(Creature,OnIsSummoned)
          EVENT_HANDLE(Creature,OnSummonDespawn)
          EVENT_HANDLE(Creature,OnSummonDies)
          EVENT_HANDLE(Creature,OnHitBySpell)
          EVENT_HANDLE(Creature,OnSpellHitTarget)
          EVENT_HANDLE(Creature,OnSpellCastFinished)
          EVENT_HANDLE(Creature,OnJustAppeared)
          EVENT_HANDLE(Creature,OnCharmed)
          EVENT_HANDLE(Creature,OnReachedHome)
          EVENT_HANDLE(Creature,OnReceiveEmote)
          EVENT_HANDLE(Creature,OnOwnerAttacked)
          EVENT_HANDLE(Creature,OnOwnerAttacks)
          EVENT_HANDLE(Creature,OnCorpseRemoved)
          EVENT_HANDLE(Creature,OnWaypointStarted)
          EVENT_HANDLE(Creature,OnWaypointReached)
          EVENT_HANDLE(Creature,OnWaypointPathEnded)
          EVENT_HANDLE(Creature,OnPassengerBoarded)
          EVENT_HANDLE(Creature,OnSpellClick)
          EVENT_HANDLE(Creature,OnUpdateAI)
          EVENT_HANDLE(Creature,OnGenerateLoot)
          EVENT_HANDLE(Creature,OnCreate)
          EVENT_HANDLE_FN(Creature,OnReload,ReloadCreature)
          EVENT_HANDLE(Creature,OnRemove)

          EVENT_HANDLE(Creature,OnCanGeneratePickPocketLoot)
          EVENT_HANDLE(Creature,OnGeneratePickPocketLoot)
          EVENT_HANDLE(Creature,OnGenerateSkinningLoot)

          EVENT_HANDLE(Creature,OnMaxHealth)
          EVENT_HANDLE(Creature,OnMaxMana)
          EVENT_HANDLE(Creature,OnBaseDamage)
          EVENT_HANDLE(Creature,OnArmor)
          EVENT_HANDLE(Creature,OnAttackPower)

          EVENT_HANDLE(Creature,OnGossipHello)
          EVENT_HANDLE(Creature,OnGossipSelect)
          EVENT_HANDLE(Creature,OnGossipSelectCode)
          EVENT_HANDLE(Creature,OnQuestAccept)
          EVENT_HANDLE(Creature,OnQuestReward)
    } Creatures;

    struct CreatureIDEvents : public MappedEventHandler<TSCreatureMap>
    {
          CreatureIDEvents* operator->(){return this;}
          MAP_EVENT_HANDLE(Creature,OnMoveInLOS)
          MAP_EVENT_HANDLE(Creature,OnJustEnteredCombat)
          MAP_EVENT_HANDLE(Creature,OnJustEngagedWith)
          MAP_EVENT_HANDLE(Creature,OnDeath)
          MAP_EVENT_HANDLE(Creature,OnKilledUnit)
          MAP_EVENT_HANDLE(Creature,OnSummoned)
          MAP_EVENT_HANDLE(Creature,OnIsSummoned)
          MAP_EVENT_HANDLE(Creature,OnSummonDespawn)
          MAP_EVENT_HANDLE(Creature,OnSummonDies)
          MAP_EVENT_HANDLE(Creature,OnHitBySpell)
          MAP_EVENT_HANDLE(Creature,OnSpellHitTarget)
          MAP_EVENT_HANDLE(Creature,OnSpellCastFinished)
          MAP_EVENT_HANDLE(Creature,OnJustAppeared)
          MAP_EVENT_HANDLE(Creature,OnCharmed)
          MAP_EVENT_HANDLE(Creature,OnReachedHome)
          MAP_EVENT_HANDLE(Creature,OnReceiveEmote)
          MAP_EVENT_HANDLE(Creature,OnOwnerAttacked)
          MAP_EVENT_HANDLE(Creature,OnOwnerAttacks)
          MAP_EVENT_HANDLE(Creature,OnCorpseRemoved)
          MAP_EVENT_HANDLE(Creature,OnWaypointStarted)
          MAP_EVENT_HANDLE(Creature,OnWaypointReached)
          MAP_EVENT_HANDLE(Creature,OnWaypointPathEnded)
          MAP_EVENT_HANDLE(Creature,OnPassengerBoarded)
          MAP_EVENT_HANDLE(Creature,OnSpellClick)
          MAP_EVENT_HANDLE(Creature,OnUpdateAI)
          MAP_EVENT_HANDLE(Creature,OnGenerateLoot)
          MAP_EVENT_HANDLE(Creature,OnCreate)
          MAP_EVENT_HANDLE_FN(Creature,OnReload,ReloadCreature)
          MAP_EVENT_HANDLE(Creature,OnRemove)

          MAP_EVENT_HANDLE(Creature,OnCanGeneratePickPocketLoot)
          MAP_EVENT_HANDLE(Creature,OnGeneratePickPocketLoot)
          MAP_EVENT_HANDLE(Creature,OnGenerateSkinningLoot)

          MAP_EVENT_HANDLE(Creature,OnMaxHealth)
          MAP_EVENT_HANDLE(Creature,OnMaxMana)
          MAP_EVENT_HANDLE(Creature,OnBaseDamage)
          MAP_EVENT_HANDLE(Creature,OnArmor)
          MAP_EVENT_HANDLE(Creature,OnAttackPower)

          MAP_EVENT_HANDLE(Creature,OnGossipHello)
          MAP_EVENT_HANDLE(Creature,OnGossipSelect)
          MAP_EVENT_HANDLE(Creature,OnGossipSelectCode)
          MAP_EVENT_HANDLE(Creature,OnQuestAccept) 
          MAP_EVENT_HANDLE(Creature,OnQuestReward)
    } CreatureID;

    struct GameObjectEvents: public EventHandler {
          GameObjectEvents* operator->(){return this;}
          EVENT_HANDLE(GameObject,OnUpdate)
          EVENT_HANDLE(GameObject,OnDialogStatus)
          EVENT_HANDLE(GameObject,OnDestroyed)
          EVENT_HANDLE(GameObject,OnDamaged)
          EVENT_HANDLE(GameObject,OnLootStateChanged)
          EVENT_HANDLE(GameObject,OnGOStateChanged)

          EVENT_HANDLE(GameObject,OnGossipHello)
          EVENT_HANDLE(GameObject,OnGossipSelect)
          EVENT_HANDLE(GameObject,OnGossipSelectCode)

          EVENT_HANDLE(GameObject,OnCreate)
          EVENT_HANDLE_FN(GameObject,OnReload,ReloadGameObject)
          EVENT_HANDLE(GameObject,OnRemove)
          EVENT_HANDLE(GameObject,OnUse)
          EVENT_HANDLE(GameObject,OnQuestAccept)
          EVENT_HANDLE(GameObject,OnQuestReward)
          EVENT_HANDLE(GameObject,OnGenerateLoot)
          EVENT_HANDLE(GameObject,OnGenerateFishLoot)
    } GameObjects;

     struct GameObjectIDEvents: public MappedEventHandler<TSGameObjectMap> {
          GameObjectIDEvents* operator->(){return this;}
          MAP_EVENT_HANDLE(GameObject,OnUpdate)
          MAP_EVENT_HANDLE(GameObject,OnDialogStatus)
          MAP_EVENT_HANDLE(GameObject,OnDestroyed)
          MAP_EVENT_HANDLE(GameObject,OnDamaged)
          MAP_EVENT_HANDLE(GameObject,OnLootStateChanged)
          MAP_EVENT_HANDLE(GameObject,OnGOStateChanged)

          MAP_EVENT_HANDLE(GameObject,OnGossipHello)
          MAP_EVENT_HANDLE(GameObject,OnGossipSelect)
          MAP_EVENT_HANDLE(GameObject,OnGossipSelectCode)

          MAP_EVENT_HANDLE(GameObject,OnCreate)
          MAP_EVENT_HANDLE_FN(GameObject,OnReload,ReloadGameObject)
          MAP_EVENT_HANDLE(GameObject,OnRemove)
          MAP_EVENT_HANDLE(GameObject,OnUse)
          MAP_EVENT_HANDLE(GameObject,OnQuestAccept)
          MAP_EVENT_HANDLE(GameObject,OnQuestReward)
          MAP_EVENT_HANDLE(GameObject,OnGenerateLoot)
          MAP_EVENT_HANDLE(GameObject,OnGenerateFishLoot)
    } GameObjectID;

    struct MapEvents: public EventHandler {
          MapEvents* operator->(){return this;}

          EVENT_HANDLE(Map,OnCreate)
          EVENT_HANDLE_FN(Map,OnReload,ReloadMap)
          EVENT_HANDLE(Map,OnUpdate)
          EVENT_HANDLE(Map,OnPlayerEnter)
          EVENT_HANDLE(Map,OnPlayerLeave)
          EVENT_HANDLE(Map,OnCreatureCreate)
          EVENT_HANDLE(Map,OnCreatureRemove)
          EVENT_HANDLE(Map,OnGameObjectCreate)
          EVENT_HANDLE(Map,OnGameObjectRemove)
          EVENT_HANDLE(Map,OnCheckEncounter) 
          EVENT_HANDLE(Map,OnMessage) 
    } Maps;

    struct MapIDEvents: public MappedEventHandler<TSMapMap>
    {
          MapIDEvents* operator->(){return this;}
          MAP_EVENT_HANDLE(Map,OnCreate)
          MAP_EVENT_HANDLE_FN(Map,OnReload,ReloadMap)
          MAP_EVENT_HANDLE(Map,OnUpdate)
          MAP_EVENT_HANDLE(Map,OnPlayerEnter)
          MAP_EVENT_HANDLE(Map,OnPlayerLeave)
          MAP_EVENT_HANDLE(Map,OnCreatureCreate)
          MAP_EVENT_HANDLE(Map,OnCreatureRemove)
          MAP_EVENT_HANDLE(Map,OnGameObjectCreate)
          MAP_EVENT_HANDLE(Map,OnGameObjectRemove)
          MAP_EVENT_HANDLE(Map,OnCheckEncounter) 
          MAP_EVENT_HANDLE(Map,OnMessage) 
    } MapID;

     struct ItemEvents: public EventHandler {
         ItemEvents* operator->(){return this;}
         EVENT_HANDLE(Item,OnUse)
         EVENT_HANDLE(Item,OnExpire)
         EVENT_HANDLE(Item,OnRemove)
         EVENT_HANDLE(Item,OnCastSpell)

         EVENT_HANDLE(Item,OnQuestAccept)

         EVENT_HANDLE(Item,OnGossipHello)
         EVENT_HANDLE(Item,OnGossipSelect)
         EVENT_HANDLE(Item,OnGossipSelectCode)
         EVENT_HANDLE(Item,OnCanChangeEquipState)
         EVENT_HANDLE(Item,OnUnequip)
         EVENT_HANDLE(Item,OnBank)
         EVENT_HANDLE(Item,OnEquipEarly)
         EVENT_HANDLE(Item,OnUseLate)
         EVENT_HANDLE(Item,OnLFGRollEarly)
         EVENT_HANDLE(Item,OnDestroyEarly)
         EVENT_HANDLE(Item,OnTakenAsLoot)
     } Items;

    struct ItemIDEvents: public MappedEventHandler<TSItemMap> {
         ItemIDEvents* operator->(){return this;}
         MAP_EVENT_HANDLE(Item,OnUse)
         MAP_EVENT_HANDLE(Item,OnExpire)
         MAP_EVENT_HANDLE(Item,OnRemove)
         MAP_EVENT_HANDLE(Item,OnCastSpell)

         MAP_EVENT_HANDLE(Item,OnQuestAccept)

         MAP_EVENT_HANDLE(Item,OnGossipHello)
         MAP_EVENT_HANDLE(Item,OnGossipSelect)
         MAP_EVENT_HANDLE(Item,OnGossipSelectCode)
         MAP_EVENT_HANDLE(Item,OnCanChangeEquipState)

         MAP_EVENT_HANDLE(Item,OnUnequip)
         MAP_EVENT_HANDLE(Item,OnBank)
         MAP_EVENT_HANDLE(Item,OnEquipEarly)
         MAP_EVENT_HANDLE(Item,OnUseLate)
         MAP_EVENT_HANDLE(Item,OnLFGRollEarly)
         MAP_EVENT_HANDLE(Item,OnDestroyEarly)
         MAP_EVENT_HANDLE(Item,OnTakenAsLoot)
    } ItemID;

    struct AreaTriggerEvents : public EventHandler {
        AreaTriggerEvents* operator->() { return this; }
        EVENT_HANDLE(AreaTrigger,OnTrigger)
    } AreaTriggers;

    struct AreaTriggerIDEvents : public MappedEventHandler<TSAreaTriggerMap> {
        AreaTriggerIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(AreaTrigger,OnTrigger)
    } AreaTriggerID;

    struct AddonEvents: public EventHandler {
         AddonEvents* operator->(){return this;}
         EVENT_HANDLE(Addon,OnMessage)
         EVENT_HANDLE(Addon,OnLongMessage)
         EVENT_HANDLE(Addon,OnLongMessageError)

         template <typename T>
         void _OnMessageID(uint16_t opcode, void (*func)(TSPlayer,std::shared_ptr<T>))
         {
              AddMessageListener(opcode,(void(*)(TSPlayer,std::shared_ptr<void>))func);
         }
    } Addon;

    struct TestEvents {
        uint32_t m_modid;
        std::string m_modName;
        TestEvents(uint32_t modid, std::string const& modName)
            : m_modid(modid)
            , m_modName(modName)
        {}
        TestEvents() = default;
        TestEvents* operator->() { return this; }

        std::shared_ptr<TSManualTestBuilder> ManualTest(TSString name)
        {
            return RegisterManualTest(m_modid, m_modName, name);
        }

        void AutomaticTest(TSString name, TSTestCallback callback)
        {
            return RegisterAutomaticTest(m_modid, m_modName, name, callback);
        }

        void Unload()
        {
            UnloadTestModule(m_modid);
        }
    } Tests;

    void LoadEvents(TSEvents* events)
    {
        Addon.LoadEvents(events);
        Server.LoadEvents(events);
        World.LoadEvents(events);
        Formula.LoadEvents(events);
        Unit.LoadEvents(events);
        AreaTriggers.LoadEvents(events);
        Weather.LoadEvents(events);
        AuctionHouse.LoadEvents(events);
        Condition.LoadEvents(events);
        Vehicle.LoadEvents(events);
        Player.LoadEvents(events);
        Account.LoadEvents(events);
        Guild.LoadEvents(events);
        Group.LoadEvents(events);
        SpellID.LoadEvents(&events->Spells);
        CreatureID.LoadEvents(&events->Creatures);
        Creatures.LoadEvents(events);
        Spells.LoadEvents(events);
        GameObjects.LoadEvents(events);
        GameObjectID.LoadEvents(&events->GameObjects);
        Items.LoadEvents(events);
        ItemID.LoadEvents(&events->Items);
        AreaTriggers.LoadEvents(events);
        AreaTriggerID.LoadEvents(&events->AreaTriggers);
        Maps.LoadEvents(events);
        MapID.LoadEvents(&events->Maps);
        Achievements.LoadEvents(events);
        AchievementID.LoadEvents(&events->Achievements);
    }

    void Unload()
    {
         Addon.Unload();
         Server.Unload();
         World.Unload();
         Formula.Unload();
         Unit.Unload();
         AreaTriggers.Unload();
         Weather.Unload();
         AuctionHouse.Unload();
         Condition.Unload();
         Vehicle.Unload();
         Achievements.Unload();
         AchievementID.Unload();
         Player.Unload();
         Account.Unload();
         Guild.Unload();
         Group.Unload();
         SpellID.Unload();
         CreatureID.Unload();
         Spells.Unload();
         Creatures.Unload();
         GameObjects.Unload();
         GameObjectID.Unload();
         Items.Unload();
         ItemID.Unload();
         AreaTriggers.Unload();
         AreaTriggerID.Unload();
         Maps.Unload();
         MapID.Unload();
         Tests.Unload();
    }
};

#define OnMessageID(type,func) _OnMessageID<type>(type::GetID(),func)

TC_GAME_API TSEvents* GetTSEvents();

void TSLoadEvents();
