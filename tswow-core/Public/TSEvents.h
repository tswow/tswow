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
#include "TSWorldPacket.h"
#include "TSInstance.h"
#include "TSSmartScript.h"
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
#include "TSJson.h"
#include "TSTests.h"
#include "TSAreaTrigger.h"
#include "TSAchievementTemplate.h"
#include "TSBattleground.h"
#include "TSCustomPacket.h"
#include "TSMapManager.h"

#include <cstdint>

EVENT_TYPE(CustomPacketOnReceive
  , uint32       /*opcode*/
  , TSPacketRead /*packet*/
  , TSPlayer     /*sender*/
)

struct TSPacketEvents {
  EVENT(CustomPacketOnReceive)
};

class TSPacketMap : public TSEventMap<TSPacketEvents>
{
  void OnAdd(uint32_t, TSPacketEvents*);
  void OnRemove(uint32_t);
};

TSPacketEvents* GetPacketEvent(uint32_t id);

// WorldPacket
EVENT_TYPE(WorldPacketOnReceive, TSWorldPacket, TSPlayer)
EVENT_TYPE(WorldPacketOnSend, TSWorldPacket, TSPlayer)
struct TSWorldPacketEvents {
    EVENT(WorldPacketOnReceive)
    EVENT(WorldPacketOnSend)
};
class TSWorldPacketMap : public TSEventMap<TSWorldPacketEvents>
{
    void OnAdd(uint32, TSWorldPacketEvents*);
    void OnRemove(uint32_t);
};
TSWorldPacketEvents* GetWorldPacketEvent(uint32_t id);

// WorldScript
EVENT_TYPE(WorldOnOpenStateChange,bool)
EVENT_TYPE(WorldOnConfigLoad,bool)
EVENT_TYPE(WorldOnMotdChange,TSString)
EVENT_TYPE(WorldOnShutdownInitiate,uint32,uint32)
EVENT_TYPE(WorldOnUpdate,uint32, TSMapManager)
EVENT_TYPE(WorldOnStartup)
EVENT_TYPE(WorldOnShutdownCancel)
EVENT_TYPE(WorldOnShutdown)
EVENT_TYPE(WorldOnCalcHonor
    , TSMutable<float> /*honor*/
    , uint8 /*level*/
    , float /*multiplier*/
)

// UnitScript
//EVENT_TYPE(UnitModifyVehiclePassengerExitPos,TSUnit,TSVehicle,TSMutable<Position>)
EVENT_TYPE(UnitOnCalcMissChance
    , TSUnit
    , TSMutable<float>
)
EVENT_TYPE(UnitOnCalcHeal
    , TSUnit
    , TSUnit
    , TSMutable<uint32>
)
EVENT_TYPE(UnitOnMeleeDamageEarly
    , TSMeleeDamageInfo
    , TSMutable<uint32>
    , uint32
    , uint32
)
EVENT_TYPE(UnitOnMeleeDamageLate
    , TSMeleeDamageInfo
    , TSMutable<uint32>
    , uint32
    , uint32
)
EVENT_TYPE(UnitOnCalcMeleeCrit
    , TSUnit
    , TSUnit
    , TSMutable<float>
    , uint32
)
EVENT_TYPE(UnitOnCalcMeleeOutcome
    , TSUnit
    , TSUnit
    , TSMutable<float>
    , TSMutable<float>
    , TSMutable<float>
    , TSMutable<float>
    , TSMutable<float>
    , uint32
);
EVENT_TYPE(UnitOnCalcThreatEarly
    , TSUnit
    , TSUnit
    , TSMutable<float>
    , TSSpellInfo
    , bool
);

EVENT_TYPE(UnitOnCalcThreatLate
    , TSUnit
    , TSUnit
    , TSMutable<float>
    , TSSpellInfo
    , bool
);

EVENT_TYPE(UnitOnCalcScaleThreat
    , TSUnit
    , TSUnit
    , TSMutable<float>
    , bool
);

EVENT_TYPE(UnitOnDeathEarly,TSUnit /*victim*/, TSUnit /*killer*/)
EVENT_TYPE(UnitOnDeath,TSUnit /*victim*/, TSUnit /*killer*/)

EVENT_TYPE(UnitOnEnterCombat,TSUnit /*unit*/)
EVENT_TYPE(UnitOnExitCombat, TSUnit /*unit*/)
EVENT_TYPE(UnitOnEnterCombatWith, TSUnit /*me*/, TSUnit /*other*/)
EVENT_TYPE(UnitOnExitCombatWith, TSUnit /*me*/, TSUnit /*other*/)

// WeatherScript
//EVENT_TYPE(WeatherOnChange,Weather*,WeatherState,float)

// AuctionHouseScript
EVENT_TYPE(AuctionHouseOnAuctionAdd, TSAuctionHouseObject, TSAuctionEntry)
EVENT_TYPE(AuctionHouseOnAuctionRemove, TSAuctionHouseObject, TSAuctionEntry)
EVENT_TYPE(AuctionHouseOnAuctionSuccessful, TSAuctionHouseObject, TSAuctionEntry)
EVENT_TYPE(AuctionHouseOnAuctionExpire, TSAuctionHouseObject, TSAuctionEntry)

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
EVENT_TYPE(PlayerOnSay, TSPlayer, TSMutableString, uint32, uint32)
EVENT_TYPE(PlayerOnWhisper, TSPlayer, TSPlayer, TSMutableString, uint32, uint32)
EVENT_TYPE(PlayerOnChatGroup, TSPlayer, TSGroup, TSMutableString, uint32, uint32)
EVENT_TYPE(PlayerOnChatGuild, TSPlayer, TSGuild, TSMutableString, uint32, uint32)
EVENT_TYPE(PlayerOnChat, TSPlayer, TSChannel, TSMutableString, uint32, uint32)
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

EVENT_TYPE(
      PlayerOnTradeCompleted
    , TSPlayer /* me */
    , TSPlayer /* him */
    , TSArray<TSItem> /* myItems */
    , TSArray<TSItem> /* hisItems*/
    , uint32 /* myMoney */
    , uint32 /* hisMoney*/
);

EVENT_TYPE(PlayerOnUpdateDodgePercentage
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateBlockPercentage
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateParryPercentage
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateArmor
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateMaxHealth
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateMaxPower
    , TSPlayer
    , TSMutable<float>
    , int8 /*power*/
    , float/*bonus*/
)
EVENT_TYPE(PlayerOnUpdateManaRegen
    , TSPlayer
    , TSMutable<float>
    , TSMutable<float>
    , TSMutable<int32>
);
EVENT_TYPE(PlayerOnUpdateMeleeHitChance
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateRuneRegen
    , TSPlayer
    , TSMutable<float>
    , uint32 /*runeType*/
)
EVENT_TYPE(PlayerOnUpdateExpertise
    , TSPlayer
    , TSMutable<int32>
    , uint32 /*attackType*/
    , TSItem
)
EVENT_TYPE(PlayerOnUpdateSpellCrit
    , TSPlayer
    , TSMutable<float>
    , uint32 /*school*/
)
EVENT_TYPE(PlayerOnUpdateArmorPenetration
    , TSPlayer
    , TSMutable<int32>
)
EVENT_TYPE(PlayerOnUpdateMeleeHitChances
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateRangedHitChances
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateSpellHitChances
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateResistance
    , TSPlayer
    , TSMutable<float>
    , uint32 /*school*/
)
EVENT_TYPE(PlayerOnUpdateShieldBlock
    , TSPlayer
    , TSMutable<uint32>
)
EVENT_TYPE(PlayerOnUpdateCrit
    , TSPlayer
    , TSMutable<float>
    , uint32 /*attackType*/
)
EVENT_TYPE(PlayerOnCalcGreyLevel
    , TSPlayer /*killer*/
    , TSMutable<uint8> /*greyLevel*/
)
EVENT_TYPE(PlayerOnCalcZeroDiff
    , TSPlayer /*killer*/
    , TSMutable<uint8> /*zeroDiff*/
)
EVENT_TYPE(PlayerOnCalcGroupGain
    , TSPlayer /*killer*/
    , TSMutable<float> /*groupRate*/
    , uint32 /*count*/
    , bool /*isRaid*/
)

EVENT_TYPE(PlayerOnCalcStaminaHealthBonus
    , TSPlayer
    , TSMutable<float>
    , float
    , float
);
EVENT_TYPE(PlayerOnCalcIntellectManaBonus
    , TSPlayer
    , TSMutable<float>
    , float
    , float
);
EVENT_TYPE(PlayerOnCalcSkillGainChance
    , TSPlayer
    , TSMutable<int>
    , int
    , int
    , int
    , int
    , int
)

EVENT_TYPE(PlayerOnUpdateAttackPower
    , TSPlayer
    , TSMutable<float>
)
EVENT_TYPE(PlayerOnUpdateRangedAttackPower
    , TSPlayer
    , TSMutable<float>
)

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
EVENT_TYPE(SpellOnEffect,TSSpell, TSMutable<bool> /*preventDefault*/, TSSpellEffectInfo, uint32 /*mode*/, TSUnit /*unitTarget*/, TSItem /*itemTarget*/, TSGameObject /*gameObjectTarget*/, TSCorpse /*corpseTarget*/)
EVENT_TYPE(SpellOnHit,TSSpell)
EVENT_TYPE(SpellOnTick,TSAuraEffect)
EVENT_TYPE(SpellOnRemove,TSAuraEffect,TSAuraApplication, uint32)
EVENT_TYPE(SpellOnApply,TSAuraEffect,TSAuraApplication, uint32)

EVENT_TYPE(SpellOnDamageEarly, TSSpell, TSMutable<int32>, TSSpellDamageInfo, uint32, bool)
EVENT_TYPE(SpellOnDamageLate, TSSpell, TSMutable<uint32>, TSSpellDamageInfo, uint32, bool)
EVENT_TYPE(SpellOnPeriodicDamage, TSAuraEffect, TSMutable<uint32>)
EVENT_TYPE(SpellOnCalcSpellPowerLevelPenalty
    , TSSpellInfo /*spell*/
    , TSMutable<float> /*penalty*/
    , TSUnit /*caster*/
)
EVENT_TYPE(SpellOnTrainerSend, TSSpellInfo /*spell*/, uint32 /*trainerId*/, TSPlayer /*receiver*/, TSMutable<bool> /*allowTrain*/)

EVENT_TYPE(SpellOnCalcCrit, TSSpell, TSMutable<float>)
EVENT_TYPE(SpellOnCalcAuraCrit, TSAuraEffect, TSMutable<float>)
EVENT_TYPE(SpellOnCalcReflect, TSSpellInfo, TSMutable<int32>, TSWorldObject, TSUnit)
EVENT_TYPE(SpellOnCalcHit, TSSpellInfo, TSMutable<int32>, TSWorldObject, TSUnit)
EVENT_TYPE(SpellOnCalcResist, TSSpellInfo, TSMutable<int32>, TSWorldObject, TSUnit)
EVENT_TYPE(SpellOnCalcMeleeMiss, TSSpellInfo, TSMutable<float>, TSUnit, TSUnit, uint8 attackType, int32 skillDiff)

struct TSSpellEvents {
     EVENT(SpellOnCast)
     EVENT(SpellOnCheckCast)
     EVENT(SpellOnDispel)
     EVENT(SpellOnEffect)
     EVENT(SpellOnHit)
     EVENT(SpellOnTick)
     EVENT(SpellOnRemove)
     EVENT(SpellOnApply)

     EVENT(SpellOnDamageEarly)
     EVENT(SpellOnDamageLate)
     EVENT(SpellOnPeriodicDamage)
     EVENT(SpellOnCalcCrit)
     EVENT(SpellOnCalcAuraCrit)
     EVENT(SpellOnCalcReflect)
     EVENT(SpellOnCalcHit)
     EVENT(SpellOnCalcResist)
     EVENT(SpellOnCalcMeleeMiss)
     EVENT(SpellOnCalcSpellPowerLevelPenalty)
     EVENT(SpellOnTrainerSend)
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
EVENT_TYPE(CreatureOnDeathEarly,TSCreature,TSUnit)
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

EVENT_TYPE(CreatureOnUpdateLvlDepMaxHealth
    , TSCreature
    , TSMutable<uint32> /*maxHealth*/
    , float /*rankHealthMod*/
    , uint32 /*basehp*/
)
// extension: add "ForceMana" mutable after maxMana for ignoring creature class (not sure it works well)
EVENT_TYPE(CreatureOnUpdateLvlDepMaxMana
    , TSCreature
    , TSMutable<uint32> /*maxMana*/
    , float /*baseMana*/
)
EVENT_TYPE(CreatureOnUpdateLvlDepBaseDamage
    , TSCreature
    , TSMutable<float> /*baseMinDamage*/
    , TSMutable<float> /*baseMaxDamage*/
    , float /*baseDamageIn*/
)
EVENT_TYPE(CreatureOnUpdateLvlDepArmor
    , TSCreature
    , TSMutable<float> /*armorOut*/
    , float /*baseArmor*/
)
EVENT_TYPE(CreatureOnUpdateLvlDepAttackPower
    , TSCreature
    , TSMutable<uint32> /*attackPower*/
    , TSMutable<uint32> /*rangedAttackPower*/
)
EVENT_TYPE(CreatureOnSendVendorItem, TSCreature /*vendor*/, TSItemTemplate /*item*/, TSPlayer /*player*/, TSMutable<bool> /*shouldSend*/)

EVENT_TYPE(CreatureOnUpdateResistance
    , TSCreature
    , TSMutable<float>
    , bool /*isGuardian*/
    , uint32 /*school*/
)
EVENT_TYPE(CreatureOnUpdateArmor
    , TSCreature
    , TSMutable<float>
    , bool /*isGuardian*/
)
EVENT_TYPE(CreatureOnUpdateMaxHealth
    , TSCreature
    , TSMutable<float>
    , bool /*isGuardian*/
)
EVENT_TYPE(CreatureOnUpdateMaxPower
    , TSCreature
    , TSMutable<float>
    , bool /*isGuardian*/
    , int8 /*powerType*/
)
EVENT_TYPE(
      CreatureOnUpdateAttackPowerDamage
    , TSCreature
    , TSMutable<float> /*base*/
    , TSMutable<float> /*mod*/
    , TSMutable<float> /*multiplier*/
    , bool /*isGuardian*/
    , bool /*ranged*/
)
EVENT_TYPE(
    CreatureOnUpdateDamagePhysical
    , TSCreature
    , TSMutable<float>
    , TSMutable<float>
    , bool /*isGuardian*/
    , uint8 /*attType*/
)
EVENT_TYPE(CreatureOnCalcColorCode
    , TSCreature
    , TSMutable<uint8> /*code*/
    , TSPlayer
    , uint32 /*playerLevel*/
    , uint32 /*creatureLevel*/
)
EVENT_TYPE(
    CreatureOnCalcGain
    , TSCreature /*victim*/
    , TSMutable<uint32>
    , TSPlayer /*killer*/
)
EVENT_TYPE(CreatureOnCalcBaseGain
    , TSCreature /*victim*/
    , TSMutable<uint32>
    , TSPlayer /*killer*/
)

struct TSCreatureEvents {
     EVENT(CreatureOnMoveInLOS)
     EVENT(CreatureOnJustEnteredCombat)
     EVENT(CreatureOnJustEngagedWith)
     EVENT(CreatureOnDeathEarly)
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

     EVENT(CreatureOnUpdateLvlDepMaxHealth)
     EVENT(CreatureOnUpdateLvlDepMaxMana)
     EVENT(CreatureOnUpdateLvlDepBaseDamage)
     EVENT(CreatureOnUpdateLvlDepArmor)
     EVENT(CreatureOnUpdateLvlDepAttackPower)
     EVENT(CreatureOnSendVendorItem)

     EVENT(CreatureOnUpdateResistance)
     EVENT(CreatureOnUpdateArmor)
     EVENT(CreatureOnUpdateMaxHealth)
     EVENT(CreatureOnUpdateMaxPower)
     EVENT(CreatureOnUpdateAttackPowerDamage)
     EVENT(CreatureOnUpdateDamagePhysical)

     EVENT(CreatureOnCalcColorCode)
     EVENT(CreatureOnCalcGain)
     EVENT(CreatureOnCalcBaseGain)
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
EVENT_TYPE(ItemOnCanEquip,TSItem,TSPlayer,uint8/*slot*/,bool/*swap*/,TSMutable<uint32> /*result*/)
EVENT_TYPE(ItemOnEquip,TSItem,TSPlayer,uint8/*slot*/, bool /*isMerge*/)
EVENT_TYPE(ItemOnCanUse,TSItem,TSPlayer,TSMutable<uint32> /*result*/)
EVENT_TYPE(ItemOnCanUseType,TSItemTemplate,TSPlayer,TSMutable<uint32> /*result*/)
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
     EVENT(ItemOnCanEquip)
     EVENT(ItemOnEquip)
     EVENT(ItemOnCanUse)
     EVENT(ItemOnCanUseType)
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

EVENT_TYPE(QuestOnAccept,TSQuest,TSPlayer, TSObject /*questgiver*/)
EVENT_TYPE(QuestOnReward,TSQuest,TSPlayer, TSObject /*questgiver*/, uint32 /*value?*/)
EVENT_TYPE(QuestOnSpellFinish,TSQuest, TSPlayer, TSSpell)
EVENT_TYPE(QuestOnObjectiveProgress, TSQuest, TSPlayer, uint32, uint16)
EVENT_TYPE(QuestOnStatusChanged, TSQuest, TSPlayer)
EVENT_TYPE(QuestOnRewardXP, TSQuest, TSPlayer, TSMutable<uint32>)

struct TSQuestEvents {
    EVENT(QuestOnAccept)
    EVENT(QuestOnReward)
    EVENT(QuestOnRewardXP)
    EVENT(QuestOnObjectiveProgress)
    EVENT(QuestOnStatusChanged)
    EVENT(QuestOnSpellFinish)
};

class TSQuestMap : public TSEventMap<TSQuestEvents>
{
    void OnAdd(uint32_t, TSQuestEvents*);
    void OnRemove(uint32_t);
};

EVENT_TYPE(MapOnCreate, TSMap)
EVENT_TYPE(MapOnReload, TSMap)
EVENT_TYPE(MapOnUpdate, TSMap, uint32)
EVENT_TYPE(MapOnUpdateDelayed, TSMap, uint32, TSMapManager)
EVENT_TYPE(MapOnPlayerEnter, TSMap, TSPlayer)
EVENT_TYPE(MapOnPlayerLeave, TSMap, TSPlayer)
EVENT_TYPE(MapOnCreatureCreate, TSMap, TSCreature, TSMutable<bool>)
EVENT_TYPE(MapOnCreatureRemove, TSMap, TSCreature)
EVENT_TYPE(MapOnGameObjectCreate, TSMap, TSGameObject, TSMutable<bool>)
EVENT_TYPE(MapOnGameObjectRemove, TSMap, TSGameObject)
EVENT_TYPE(MapOnCheckEncounter, TSMap, TSPlayer)
EVENT_TYPE(MapOnMessage, TSMap, unsigned char channel, TSJsonObject)

struct TSMapEvents {
     EVENT(MapOnCreate)
     EVENT(MapOnReload)
     EVENT(MapOnUpdate)
     EVENT(MapOnUpdateDelayed)
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


// SetupBattleground
EVENT_TYPE(BattlegroundOnCanCreate,TSBattleground,TSMutable<bool>)
EVENT_TYPE(BattlegroundOnCreate,TSBattleground)
EVENT_TYPE(BattlegroundOnReload,TSBattleground)
EVENT_TYPE(BattlegroundOnAddPlayer,TSBattleground,TSPlayer)
EVENT_TYPE(BattlegroundOnPlayerLogin,TSBattleground,TSPlayer)
EVENT_TYPE(BattlegroundOnPlayerLogout,TSBattleground,TSPlayer)
EVENT_TYPE(BattlegroundOnUpdateScore,TSBattleground,TSPlayer,uint32_t /*type*/, bool isAddHonor, TSMutable<uint32> /*value*/)
EVENT_TYPE(BattlegroundOnUpdateEarly,TSBattleground, uint32 /*diff*/)
EVENT_TYPE(BattlegroundOnUpdateLate,TSBattleground, uint32 /*diff*/)
EVENT_TYPE(BattlegroundOnKillPlayer,TSBattleground,TSPlayer /*victim*/,TSPlayer /*killer*/)
EVENT_TYPE(BattlegroundOnEndEarly,TSBattleground,TSMutable<uint32> /*winner*/)
EVENT_TYPE(BattlegroundOnEndLate,TSBattleground,uint32 /*winner*/)

EVENT_TYPE(BattlegroundOnAddGameObject
    , TSBattleground
    , uint32 /*type*/
    , TSMutable<uint32> /*entry*/
    , TSMutable<uint8> /* goState */
    , TSMutable<float> /* x */
    , TSMutable<float> /* y */
    , TSMutable<float> /* z */
    , TSMutable<float> /* o */
    , TSMutable<float> /* rot0 */
    , TSMutable<float> /* rot1 */
    , TSMutable<float> /* rot2 */
    , TSMutable<float> /* rot3 */
)

EVENT_TYPE(BattlegroundOnAddCreature
    , TSBattleground
    , uint32 /* type */
    , TSMutable<uint32> /* entry */
    , TSMutable<float> /* x */
    , TSMutable<float> /* y */
    , TSMutable<float> /* z */
    , TSMutable<float> /* o */
    , TSMutable<uint32_t> /* respawnTime */
)

EVENT_TYPE(BattlegroundOnAddSpiritGuide
    , TSBattleground
    , uint32 /* type */
    , TSMutable<uint32> /* entry */
    , TSMutable<uint8> /* teamId */
    , TSMutable<float> /* x */
    , TSMutable<float> /* y */
    , TSMutable<float> /* z */
    , TSMutable<float> /* o */
)

// need to be call explicitly from subclasses

// HandleKillUnit (check)
EVENT_TYPE(BattlegroundOnKillCreature,TSBattleground,TSCreature /*victim*/, TSPlayer /*killer*/)

// RemovePlayer (check)
EVENT_TYPE(BattlegroundOnRemovePlayer,TSBattleground,uint64 /*guid*/,TSPlayer, uint32 /*team*/)

// HandlePlayerUnderMap
EVENT_TYPE(BattlegroundOnPlayerUnderMap,TSBattleground, TSPlayer, TSMutable<bool> /*handled*/)

// ProcessEvent
EVENT_TYPE(BattlegroundOnGenericEvent,TSBattleground,TSWorldObject,uint32 /*eventId*/,TSWorldObject /*invoker*/)

// EventPlayerClickedOnFlag
EVENT_TYPE(BattlegroundOnClickFlag,TSBattleground,TSPlayer,TSGameObject /*flag_obj*/)

// EventPlayerDroppedFlag
EVENT_TYPE(BattlegroundOnDropFlag,TSBattleground,TSPlayer)

// DestroyGate
EVENT_TYPE(BattlegroundOnDestroyGate,TSBattleground,TSPlayer /*destroyer*/,TSGameObject /*target*/)

// StartingEventOpenDoors
EVENT_TYPE(BattlegroundOnOpenDoors,TSBattleground)
// StartingEventCloseDoors
EVENT_TYPE(BattlegroundOnCloseDoors,TSBattleground)
// Reset
EVENT_TYPE(BattlegroundOnReset,TSBattleground)

// requires special handling functions
EVENT_TYPE(BattlegroundOnAchievementCriteria
    , TSBattleground
    , uint32 /*criteriaId*/
    , TSPlayer /*player*/
    , TSUnit /*target*/
    , uint32 /*miscvalueA*/
    , TSMutable<bool> handled
)
EVENT_TYPE(BattlegroundOnAreaTrigger,TSBattleground,TSPlayer,uint32 /*trigger*/, TSMutable<bool> handled)

EVENT_TYPE(
      BattlegroundOnWeight
    , uint32 /*bgType*/
    , TSMutable<float> /*weight*/
    , uint32 /*origType*/
)

EVENT_TYPE(
      BattlegroundOnSelect
    , TSMutable<uint32> /*bgType*/
)

struct TSBattlegroundEvents
{
    EVENT(BattlegroundOnCanCreate)
    EVENT(BattlegroundOnCreate)
    EVENT(BattlegroundOnReload)
    EVENT(BattlegroundOnReset)
    EVENT(BattlegroundOnOpenDoors)
    EVENT(BattlegroundOnCloseDoors)
    EVENT(BattlegroundOnDestroyGate)
    EVENT(BattlegroundOnAchievementCriteria)
    EVENT(BattlegroundOnAddPlayer)
    EVENT(BattlegroundOnPlayerLogin)
    EVENT(BattlegroundOnPlayerLogout)
    EVENT(BattlegroundOnUpdateScore)
    EVENT(BattlegroundOnPlayerUnderMap)
    EVENT(BattlegroundOnEndEarly)
    EVENT(BattlegroundOnEndLate)
    EVENT(BattlegroundOnUpdateEarly)
    EVENT(BattlegroundOnUpdateLate)
    EVENT(BattlegroundOnRemovePlayer)
    EVENT(BattlegroundOnKillPlayer)
    EVENT(BattlegroundOnKillCreature)
    EVENT(BattlegroundOnAddCreature)
    EVENT(BattlegroundOnAddGameObject)
    EVENT(BattlegroundOnAddSpiritGuide)
    EVENT(BattlegroundOnAreaTrigger)
    EVENT(BattlegroundOnGenericEvent)
    EVENT(BattlegroundOnDropFlag)
    EVENT(BattlegroundOnClickFlag)
};

class TSBattlegroundMap : public TSEventMap<TSBattlegroundEvents>
{
    void OnAdd(uint32_t, TSBattlegroundEvents*);
    void OnRemove(uint32_t);
};

TSBattlegroundEvents * GetBattlegroundEvent(uint32_t id);

EVENT_TYPE(InstanceOnCreate, TSInstance)
EVENT_TYPE(InstanceOnReload, TSInstance)
EVENT_TYPE(InstanceOnLoad, TSInstance)
EVENT_TYPE(InstanceOnSave, TSInstance)
EVENT_TYPE(InstanceOnUpdate, TSInstance, uint32 /*diff*/)
EVENT_TYPE(InstanceOnPlayerEnter, TSInstance, TSPlayer)
EVENT_TYPE(InstanceOnPlayerLeave, TSInstance, TSPlayer)
EVENT_TYPE(InstanceOnBossStateChange, TSInstance, uint32 /*id*/, uint32 /*state*/)
EVENT_TYPE(InstanceOnCanKillBoss, TSInstance, uint32 /*bossId*/, TSPlayer /*player*/, TSMutable<bool> /*canKill*/)
EVENT_TYPE(InstanceOnFillInitialWorldStates, TSInstance, TSWorldStatePacket)
EVENT_TYPE(InstanceOnSetBossNumber, TSInstance, TSMutable<uint32>)
EVENT_TYPE(InstanceOnLoadBossBoundaries, TSInstance)
EVENT_TYPE(InstanceOnLoadMinionData, TSInstance)
EVENT_TYPE(InstanceOnLoadDoorData, TSInstance)
EVENT_TYPE(InstanceOnLoadObjectData, TSInstance)

struct TSInstanceEvents
{
     EVENT(InstanceOnCreate)
     EVENT(InstanceOnReload)
     EVENT(InstanceOnLoad)
     EVENT(InstanceOnSave)
     EVENT(InstanceOnUpdate)
     EVENT(InstanceOnPlayerEnter)
     EVENT(InstanceOnPlayerLeave)
     EVENT(InstanceOnBossStateChange)
     EVENT(InstanceOnCanKillBoss)
     EVENT(InstanceOnFillInitialWorldStates)
     EVENT(InstanceOnSetBossNumber)
     EVENT(InstanceOnLoadBossBoundaries)
     EVENT(InstanceOnLoadMinionData)
     EVENT(InstanceOnLoadDoorData)
     EVENT(InstanceOnLoadObjectData)
};

class TSInstanceMap: public TSEventMap<TSInstanceEvents>
{
    void OnAdd(uint32_t, TSInstanceEvents*);
    void OnRemove(uint32_t);
};

TC_GAME_API TSInstanceEvents* GetInstanceEvent(uint32_t id);

// GameEvent
EVENT_TYPE(GameEventOnStart,uint16 /*event_id*/)
// todo: can we get a next_event_id here?
EVENT_TYPE(GameEventOnUpdateState,uint16 /*cur_event_id*/)
EVENT_TYPE(GameEventOnEnd,uint16 /*cur_event_id*/)
struct TSGameEventEvents {
    EVENT(GameEventOnStart)
    EVENT(GameEventOnUpdateState)
    EVENT(GameEventOnEnd)
};

class TSGameEventMap : public TSEventMap<TSGameEventEvents> {
    void OnAdd(uint32_t, TSGameEventEvents*);
    void OnRemove(uint32_t);
};

TSGameEventEvents* GetGameEventsEvent(uint32_t id);


// SAI
EVENT_TYPE(SmartActionOnActivateEarly, TSSmartScriptValues, TSMutable<bool> /*cancelAction*/, TSMutable<bool> /*cancelLink*/)
EVENT_TYPE(SmartActionOnActivateLate, TSSmartScriptValues, TSMutable<bool> /*cancelLink*/)
struct TSSmartActionEvents {
    EVENT(SmartActionOnActivateEarly)
    EVENT(SmartActionOnActivateLate)
};

class TSSmartActionMap : public TSEventMap<TSSmartActionEvents> {
    void OnAdd(uint32_t, TSSmartActionEvents*);
    void OnRemove(uint32_t);
};

TSSmartActionEvents* GetSmartActionEvent(uint32_t id);

// Condition
EVENT_TYPE(ConditionOnCheck, TSCondition, TSConditionSourceInfo, TSMutable<bool> /*condMeets*/)
struct TSConditionEvents {
    EVENT(ConditionOnCheck)
};

class TSConditionMap : public TSEventMap<TSConditionEvents> {
    void OnAdd(uint32_t, TSConditionEvents*);
    void OnRemove(uint32_t);
};

TSConditionEvents* GetConditionEvent(uint32_t id);

struct TSEventStore
{
    // WorldScript
    EVENT(WorldOnOpenStateChange)
    EVENT(WorldOnStartup)
    EVENT(WorldOnShutdown)
    EVENT(WorldOnShutdownCancel)
    EVENT(WorldOnConfigLoad)
    EVENT(WorldOnMotdChange)
    EVENT(WorldOnShutdownInitiate)
    EVENT(WorldOnUpdate)
    EVENT(WorldOnCalcHonor)

    // BattlegroundScript
    EVENT(BattlegroundOnCanCreate)
    EVENT(BattlegroundOnCreate)
    EVENT(BattlegroundOnReload)
    EVENT(BattlegroundOnReset)
    EVENT(BattlegroundOnOpenDoors)
    EVENT(BattlegroundOnCloseDoors)
    EVENT(BattlegroundOnDestroyGate)
    EVENT(BattlegroundOnAchievementCriteria)
    EVENT(BattlegroundOnAddPlayer)
    EVENT(BattlegroundOnPlayerLogin)
    EVENT(BattlegroundOnPlayerLogout)
    EVENT(BattlegroundOnUpdateScore)
    EVENT(BattlegroundOnEndEarly)
    EVENT(BattlegroundOnEndLate)
    EVENT(BattlegroundOnPlayerUnderMap)
    EVENT(BattlegroundOnUpdateEarly)
    EVENT(BattlegroundOnUpdateLate)
    EVENT(BattlegroundOnRemovePlayer)
    EVENT(BattlegroundOnKillPlayer)
    EVENT(BattlegroundOnKillCreature)
    EVENT(BattlegroundOnAddCreature)
    EVENT(BattlegroundOnAddGameObject)
    EVENT(BattlegroundOnAddSpiritGuide)
    EVENT(BattlegroundOnAreaTrigger)
    EVENT(BattlegroundOnGenericEvent)
    EVENT(BattlegroundOnDropFlag)
    EVENT(BattlegroundOnClickFlag)
    EVENT(BattlegroundOnWeight)
    EVENT(BattlegroundOnSelect)


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
    EVENT(ItemOnCanEquip)
    EVENT(ItemOnEquip)
    EVENT(ItemOnCanUse)
    EVENT(ItemOnCanUseType)
    EVENT(ItemOnLFGRollEarly)
    EVENT(ItemOnDestroyEarly)
    EVENT(ItemOnTakenAsLoot)

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
    EVENT(PlayerOnTradeCompleted)

    EVENT(PlayerOnUpdateDodgePercentage)
    EVENT(PlayerOnUpdateBlockPercentage)
    EVENT(PlayerOnUpdateParryPercentage)
    EVENT(PlayerOnUpdateArmor)
    EVENT(PlayerOnUpdateMaxHealth)
    EVENT(PlayerOnUpdateMaxPower)
    EVENT(PlayerOnUpdateManaRegen)
    EVENT(PlayerOnUpdateMeleeHitChance)
    EVENT(PlayerOnUpdateRuneRegen)
    EVENT(PlayerOnUpdateExpertise)
    EVENT(PlayerOnUpdateSpellCrit)
    EVENT(PlayerOnUpdateArmorPenetration)
    EVENT(PlayerOnUpdateMeleeHitChances)
    EVENT(PlayerOnUpdateRangedHitChances)
    EVENT(PlayerOnUpdateSpellHitChances)
    EVENT(PlayerOnUpdateResistance)
    EVENT(PlayerOnUpdateShieldBlock)
    EVENT(PlayerOnUpdateCrit)
    EVENT(PlayerOnCalcGreyLevel)
    EVENT(PlayerOnCalcZeroDiff)
    EVENT(PlayerOnCalcGroupGain)
    EVENT(PlayerOnCalcStaminaHealthBonus)
    EVENT(PlayerOnCalcIntellectManaBonus)
    EVENT(PlayerOnCalcSkillGainChance)
    EVENT(PlayerOnUpdateAttackPower)
    EVENT(PlayerOnUpdateRangedAttackPower)

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

    // UnitScript
    EVENT(UnitOnCalcMissChance)
    EVENT(UnitOnCalcHeal)
    EVENT(UnitOnMeleeDamageEarly)
    EVENT(UnitOnMeleeDamageLate)
    EVENT(UnitOnCalcMeleeCrit)
    EVENT(UnitOnCalcMeleeOutcome)
    EVENT(UnitOnCalcThreatEarly)
    EVENT(UnitOnCalcThreatLate)
    EVENT(UnitOnCalcScaleThreat)
    EVENT(UnitOnDeathEarly)
    EVENT(UnitOnDeath)

    EVENT(UnitOnEnterCombat)
    EVENT(UnitOnExitCombat)
    EVENT(UnitOnEnterCombatWith)
    EVENT(UnitOnExitCombatWith)

    // CreatureScript
    EVENT(CreatureOnMoveInLOS)
    EVENT(CreatureOnJustEnteredCombat)
    EVENT(CreatureOnJustEngagedWith)
    EVENT(CreatureOnDeathEarly)
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

    EVENT(CreatureOnUpdateLvlDepMaxHealth)
    EVENT(CreatureOnUpdateLvlDepMaxMana)
    EVENT(CreatureOnUpdateLvlDepBaseDamage)
    EVENT(CreatureOnUpdateLvlDepArmor)
    EVENT(CreatureOnUpdateLvlDepAttackPower)
    EVENT(CreatureOnSendVendorItem)

    EVENT(CreatureOnUpdateResistance)
    EVENT(CreatureOnUpdateArmor)
    EVENT(CreatureOnUpdateMaxHealth)
    EVENT(CreatureOnUpdateMaxPower)
    EVENT(CreatureOnUpdateAttackPowerDamage)
    EVENT(CreatureOnUpdateDamagePhysical)
    EVENT(CreatureOnCalcColorCode)
    EVENT(CreatureOnCalcGain)
    EVENT(CreatureOnCalcBaseGain)

    // AreaTrigger
    EVENT(AreaTriggerOnTrigger)

    // SpellScript
    EVENT(SpellOnCast)
    EVENT(SpellOnCheckCast)
    EVENT(SpellOnDispel)
    EVENT(SpellOnEffect)
    EVENT(SpellOnHit)
    EVENT(SpellOnTick)
    EVENT(SpellOnRemove)
    EVENT(SpellOnApply)

    EVENT(SpellOnDamageEarly)
    EVENT(SpellOnDamageLate)
    EVENT(SpellOnPeriodicDamage)
    EVENT(SpellOnCalcCrit)
    EVENT(SpellOnCalcAuraCrit)
    EVENT(SpellOnCalcReflect)
    EVENT(SpellOnCalcHit)
    EVENT(SpellOnCalcResist)
    EVENT(SpellOnCalcMeleeMiss)
    EVENT(SpellOnCalcSpellPowerLevelPenalty)
    EVENT(SpellOnTrainerSend)

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

    EVENT(QuestOnAccept)
    EVENT(QuestOnReward)
    EVENT(QuestOnRewardXP)
    EVENT(QuestOnObjectiveProgress)
    EVENT(QuestOnStatusChanged)
    EVENT(QuestOnSpellFinish)

    // Maps
    EVENT(MapOnCreate)
    EVENT(MapOnReload)
    EVENT(MapOnUpdate)
    EVENT(MapOnUpdateDelayed)
    EVENT(MapOnPlayerEnter)
    EVENT(MapOnPlayerLeave)
    EVENT(MapOnCreatureCreate)
    EVENT(MapOnCreatureRemove)
    EVENT(MapOnGameObjectCreate)
    EVENT(MapOnGameObjectRemove)
    EVENT(MapOnCheckEncounter)
    EVENT(MapOnMessage)
    EVENT(InstanceOnCreate)
    EVENT(InstanceOnReload)
    EVENT(InstanceOnLoad)
    EVENT(InstanceOnSave)
    EVENT(InstanceOnUpdate)
    EVENT(InstanceOnPlayerEnter)
    EVENT(InstanceOnPlayerLeave)
    EVENT(InstanceOnBossStateChange)
    EVENT(InstanceOnCanKillBoss)
    EVENT(InstanceOnFillInitialWorldStates)
    EVENT(InstanceOnSetBossNumber)
    EVENT(InstanceOnLoadBossBoundaries)
    EVENT(InstanceOnLoadMinionData)
    EVENT(InstanceOnLoadDoorData)
    EVENT(InstanceOnLoadObjectData)



    EVENT(AchievementOnUpdate)
    EVENT(AchievementOnComplete)

    // GameEvent
    EVENT(GameEventOnStart)
    EVENT(GameEventOnUpdateState)
    EVENT(GameEventOnEnd)

    // SAI
    EVENT(SmartActionOnActivateEarly)
    EVENT(SmartActionOnActivateLate)

    // Conditions
    EVENT(ConditionOnCheck)

    // Packets
    EVENT(CustomPacketOnReceive)

    // WorldPackets
    EVENT(WorldPacketOnSend)
    EVENT(WorldPacketOnReceive)

    TSAchievementMap Achievements;
    TSSpellMap Spells;
    TSCreatureMap Creatures;
    TSGameObjectMap GameObjects;
    TSMapMap Maps;
    TSInstanceMap Instances;
    TSItemMap Items;
    TSAreaTriggerMap AreaTriggers;
    TSBattlegroundMap Battlegrounds;
    TSGameEventMap GameEvents;
    TSSmartActionMap SmartActions;
    TSConditionMap Conditions;
    TSPacketMap Packets;
    TSWorldPacketMap WorldPackets;
    TSQuestMap Quests;
};

TC_GAME_API void ReloadGameObject(GameObjectOnReload__Type fn, uint32 id);
TC_GAME_API void ReloadPlayer(PlayerOnReload__Type fn, uint32 id);
TC_GAME_API void ReloadCreature(CreatureOnReload__Type fn, uint32 id);
TC_GAME_API void ReloadMap(MapOnReload__Type fn, uint32 id);
TC_GAME_API void ReloadInstance(InstanceOnReload__Type fn, uint32 id);
TC_GAME_API void ReloadBattleground(BattlegroundOnReload__Type fn, uint32 id);

class TSEvents
{
public:
     uint32_t m_modid;
     std::string m_modName;

     TSEvents(uint32_t modid, std::string const& modName)
         : m_modid(modid)
         , m_modName(modName)
         , Tests(modid,modName)
     {
     }

     TSEvents() = default;

    struct ServerEvents: public EventHandler
    {
         ServerEvents* operator->() { return this;}
    } Server;

    struct WorldEvents: public EventHandler
    {
         WorldEvents* operator->() { return this;}
         EVENT_HANDLE(World,OnOpenStateChange)
         EVENT_HANDLE(World,OnStartup)
         EVENT_HANDLE(World,OnShutdown)
         EVENT_HANDLE(World,OnShutdownCancel)
         EVENT_HANDLE(World,OnConfigLoad)
         EVENT_HANDLE(World,OnMotdChange)
         EVENT_HANDLE(World,OnShutdownInitiate)
         EVENT_HANDLE(World,OnUpdate)
         EVENT_HANDLE(World,OnCalcHonor)
    } World;

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
         EVENT_HANDLE(Player,OnTradeCompleted)

         EVENT_HANDLE(Player,OnUpdateDodgePercentage)
         EVENT_HANDLE(Player,OnUpdateBlockPercentage)
         EVENT_HANDLE(Player,OnUpdateParryPercentage)
         EVENT_HANDLE(Player,OnUpdateArmor)
         EVENT_HANDLE(Player,OnUpdateMaxHealth)
         EVENT_HANDLE(Player,OnUpdateMaxPower)
         EVENT_HANDLE(Player,OnUpdateManaRegen)
         EVENT_HANDLE(Player,OnUpdateMeleeHitChance)
         EVENT_HANDLE(Player,OnUpdateRuneRegen)
         EVENT_HANDLE(Player,OnUpdateExpertise)
         EVENT_HANDLE(Player,OnUpdateSpellCrit)
         EVENT_HANDLE(Player,OnUpdateArmorPenetration)
         EVENT_HANDLE(Player,OnUpdateMeleeHitChances)
         EVENT_HANDLE(Player,OnUpdateRangedHitChances)
         EVENT_HANDLE(Player,OnUpdateSpellHitChances)
         EVENT_HANDLE(Player,OnUpdateResistance)
         EVENT_HANDLE(Player,OnUpdateShieldBlock)
         EVENT_HANDLE(Player,OnUpdateCrit)

         EVENT_HANDLE(Player,OnCalcGreyLevel)
         EVENT_HANDLE(Player,OnCalcZeroDiff)
         EVENT_HANDLE(Player,OnCalcGroupGain)
         EVENT_HANDLE(Player,OnCalcStaminaHealthBonus)
         EVENT_HANDLE(Player,OnCalcIntellectManaBonus)
         EVENT_HANDLE(Player,OnCalcSkillGainChance)
         EVENT_HANDLE(Player,OnUpdateAttackPower)
         EVENT_HANDLE(Player,OnUpdateRangedAttackPower)
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

    struct UnitEvents : public EventHandler
    {
        UnitEvents* operator->() { return this; }
        EVENT_HANDLE(Unit,OnCalcMissChance)
        EVENT_HANDLE(Unit,OnCalcHeal)
        EVENT_HANDLE(Unit,OnMeleeDamageEarly)
        EVENT_HANDLE(Unit,OnMeleeDamageLate)
        EVENT_HANDLE(Unit,OnCalcMeleeCrit)
        EVENT_HANDLE(Unit,OnCalcMeleeOutcome)
        EVENT_HANDLE(Unit,OnCalcThreatEarly)
        EVENT_HANDLE(Unit,OnCalcThreatLate)
        EVENT_HANDLE(Unit,OnCalcScaleThreat)
        EVENT_HANDLE(Unit,OnDeathEarly)
        EVENT_HANDLE(Unit,OnDeath)
        EVENT_HANDLE(Unit,OnEnterCombat)
        EVENT_HANDLE(Unit,OnExitCombat)
        EVENT_HANDLE(Unit,OnEnterCombatWith)
        EVENT_HANDLE(Unit,OnExitCombatWith)
    } Unit;

     struct SpellEvents : public EventHandler
    {
          SpellEvents* operator->(){return this;}
          EVENT_HANDLE(Spell,OnCast)
          EVENT_HANDLE(Spell,OnCheckCast)
          EVENT_HANDLE(Spell,OnDispel)
          EVENT_HANDLE(Spell,OnEffect)
          EVENT_HANDLE(Spell,OnHit)
          EVENT_HANDLE(Spell,OnTick)
          EVENT_HANDLE(Spell,OnRemove)
          EVENT_HANDLE(Spell,OnApply)

          EVENT_HANDLE(Spell,OnDamageEarly)
          EVENT_HANDLE(Spell,OnDamageLate)
          EVENT_HANDLE(Spell,OnPeriodicDamage)
          EVENT_HANDLE(Spell,OnCalcCrit)
          EVENT_HANDLE(Spell,OnCalcAuraCrit)
          EVENT_HANDLE(Spell,OnCalcReflect)
          EVENT_HANDLE(Spell,OnCalcHit)
          EVENT_HANDLE(Spell,OnCalcResist)
          EVENT_HANDLE(Spell,OnCalcMeleeMiss)
          EVENT_HANDLE(Spell,OnCalcSpellPowerLevelPenalty)
          EVENT_HANDLE(Spell,OnTrainerSend)
    } Spells;

    struct SpellIDEvents : public MappedEventHandler<TSSpellMap>
    {
          SpellIDEvents* operator->(){return this;}
          MAP_EVENT_HANDLE(Spell,OnCast)
          MAP_EVENT_HANDLE(Spell,OnCheckCast)
          MAP_EVENT_HANDLE(Spell,OnDispel)
          MAP_EVENT_HANDLE(Spell,OnEffect)
          MAP_EVENT_HANDLE(Spell,OnHit)
          MAP_EVENT_HANDLE(Spell,OnTick)
          MAP_EVENT_HANDLE(Spell,OnRemove)
          MAP_EVENT_HANDLE(Spell,OnApply)

          MAP_EVENT_HANDLE(Spell, OnDamageEarly)
          MAP_EVENT_HANDLE(Spell, OnDamageLate)
          MAP_EVENT_HANDLE(Spell, OnPeriodicDamage)
          MAP_EVENT_HANDLE(Spell, OnCalcCrit)
          MAP_EVENT_HANDLE(Spell, OnCalcAuraCrit)
          MAP_EVENT_HANDLE(Spell, OnCalcReflect)
          MAP_EVENT_HANDLE(Spell, OnCalcHit)
          MAP_EVENT_HANDLE(Spell, OnCalcResist)
          MAP_EVENT_HANDLE(Spell, OnCalcMeleeMiss)
          MAP_EVENT_HANDLE(Spell, OnCalcSpellPowerLevelPenalty)
          MAP_EVENT_HANDLE(Spell, OnTrainerSend)
    } SpellID;

     struct CreatureEvents: public EventHandler
    {
          CreatureEvents* operator->(){return this;}
          EVENT_HANDLE(Creature,OnMoveInLOS)
          EVENT_HANDLE(Creature,OnJustEnteredCombat)
          EVENT_HANDLE(Creature,OnJustEngagedWith)
          EVENT_HANDLE(Creature,OnDeathEarly)
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

          EVENT_HANDLE(Creature,OnUpdateLvlDepMaxHealth)
          EVENT_HANDLE(Creature,OnUpdateLvlDepMaxMana)
          EVENT_HANDLE(Creature,OnUpdateLvlDepBaseDamage)
          EVENT_HANDLE(Creature,OnUpdateLvlDepArmor)
          EVENT_HANDLE(Creature,OnUpdateLvlDepAttackPower)
          EVENT_HANDLE(Creature,OnSendVendorItem)

          EVENT_HANDLE(Creature,OnGossipHello)
          EVENT_HANDLE(Creature,OnGossipSelect)
          EVENT_HANDLE(Creature,OnGossipSelectCode)
          EVENT_HANDLE(Creature,OnQuestAccept)
          EVENT_HANDLE(Creature,OnQuestReward)

          EVENT_HANDLE(Creature,OnUpdateResistance)
          EVENT_HANDLE(Creature,OnUpdateArmor)
          EVENT_HANDLE(Creature,OnUpdateMaxHealth)
          EVENT_HANDLE(Creature,OnUpdateMaxPower)
          EVENT_HANDLE(Creature,OnUpdateAttackPowerDamage)
          EVENT_HANDLE(Creature,OnUpdateDamagePhysical)
          EVENT_HANDLE(Creature,OnCalcColorCode)
          EVENT_HANDLE(Creature,OnCalcGain)
          EVENT_HANDLE(Creature,OnCalcBaseGain)
    } Creatures;

    struct CreatureIDEvents : public MappedEventHandler<TSCreatureMap>
    {
          CreatureIDEvents* operator->(){return this;}
          MAP_EVENT_HANDLE(Creature,OnMoveInLOS)
          MAP_EVENT_HANDLE(Creature,OnJustEnteredCombat)
          MAP_EVENT_HANDLE(Creature,OnJustEngagedWith)
          MAP_EVENT_HANDLE(Creature,OnDeathEarly)
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

          MAP_EVENT_HANDLE(Creature,OnUpdateLvlDepMaxHealth)
          MAP_EVENT_HANDLE(Creature,OnUpdateLvlDepMaxMana)
          MAP_EVENT_HANDLE(Creature,OnUpdateLvlDepBaseDamage)
          MAP_EVENT_HANDLE(Creature,OnUpdateLvlDepArmor)
          MAP_EVENT_HANDLE(Creature,OnUpdateLvlDepAttackPower)
          MAP_EVENT_HANDLE(Creature,OnSendVendorItem)

          MAP_EVENT_HANDLE(Creature,OnGossipHello)
          MAP_EVENT_HANDLE(Creature,OnGossipSelect)
          MAP_EVENT_HANDLE(Creature,OnGossipSelectCode)
          MAP_EVENT_HANDLE(Creature,OnQuestAccept)
          MAP_EVENT_HANDLE(Creature,OnQuestReward)

          MAP_EVENT_HANDLE(Creature, OnUpdateResistance)
          MAP_EVENT_HANDLE(Creature, OnUpdateArmor)
          MAP_EVENT_HANDLE(Creature, OnUpdateMaxHealth)
          MAP_EVENT_HANDLE(Creature, OnUpdateMaxPower)
          MAP_EVENT_HANDLE(Creature, OnUpdateAttackPowerDamage)
          MAP_EVENT_HANDLE(Creature, OnUpdateDamagePhysical)

          MAP_EVENT_HANDLE(Creature, OnCalcColorCode)
          MAP_EVENT_HANDLE(Creature, OnCalcGain)
          MAP_EVENT_HANDLE(Creature, OnCalcBaseGain)
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
          EVENT_HANDLE(Map,OnUpdateDelayed)
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
          MAP_EVENT_HANDLE(Map,OnUpdateDelayed)
          MAP_EVENT_HANDLE(Map,OnPlayerEnter)
          MAP_EVENT_HANDLE(Map,OnPlayerLeave)
          MAP_EVENT_HANDLE(Map,OnCreatureCreate)
          MAP_EVENT_HANDLE(Map,OnCreatureRemove)
          MAP_EVENT_HANDLE(Map,OnGameObjectCreate)
          MAP_EVENT_HANDLE(Map,OnGameObjectRemove)
          MAP_EVENT_HANDLE(Map,OnCheckEncounter)
          MAP_EVENT_HANDLE(Map,OnMessage)
    } MapID;

    struct BattlegroundEvents : public EventHandler {
        BattlegroundEvents* operator->() { return this; }
        EVENT_HANDLE(Battleground,OnCanCreate)
        EVENT_HANDLE_FN(Battleground,OnReload,ReloadBattleground)
        EVENT_HANDLE(Battleground,OnCreate)
        EVENT_HANDLE(Battleground,OnReset)
        EVENT_HANDLE(Battleground,OnOpenDoors)
        EVENT_HANDLE(Battleground,OnCloseDoors)
        EVENT_HANDLE(Battleground,OnDestroyGate)
        EVENT_HANDLE(Battleground,OnAchievementCriteria)
        EVENT_HANDLE(Battleground,OnAddPlayer)
        EVENT_HANDLE(Battleground,OnPlayerLogin)
        EVENT_HANDLE(Battleground,OnPlayerLogout)
        EVENT_HANDLE(Battleground,OnUpdateScore)
        EVENT_HANDLE(Battleground,OnEndEarly)
        EVENT_HANDLE(Battleground,OnEndLate)
        EVENT_HANDLE(Battleground,OnUpdateEarly)
        EVENT_HANDLE(Battleground,OnUpdateLate)
        EVENT_HANDLE(Battleground,OnRemovePlayer)
        EVENT_HANDLE(Battleground,OnKillPlayer)
        EVENT_HANDLE(Battleground,OnKillCreature)
        EVENT_HANDLE(Battleground,OnAddCreature)
        EVENT_HANDLE(Battleground,OnAddGameObject)
        EVENT_HANDLE(Battleground,OnAddSpiritGuide)
        EVENT_HANDLE(Battleground,OnAreaTrigger)
        EVENT_HANDLE(Battleground,OnGenericEvent)
        EVENT_HANDLE(Battleground,OnDropFlag)
        EVENT_HANDLE(Battleground,OnClickFlag)
        EVENT_HANDLE(Battleground,OnPlayerUnderMap)
        EVENT_HANDLE(Battleground,OnWeight)
        EVENT_HANDLE(Battleground,OnSelect)
    } Battlegrounds;

    struct BattlegroundIDEvents : public MappedEventHandler<TSBattlegroundMap> {
        BattlegroundIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(Battleground, OnCanCreate)
        MAP_EVENT_HANDLE_FN(Battleground, OnReload, ReloadBattleground)
        MAP_EVENT_HANDLE(Battleground, OnCreate)
        MAP_EVENT_HANDLE(Battleground, OnReset)
        MAP_EVENT_HANDLE(Battleground, OnOpenDoors)
        MAP_EVENT_HANDLE(Battleground, OnCloseDoors)
        MAP_EVENT_HANDLE(Battleground, OnDestroyGate)
        MAP_EVENT_HANDLE(Battleground, OnAchievementCriteria)
        MAP_EVENT_HANDLE(Battleground, OnAddPlayer)
        MAP_EVENT_HANDLE(Battleground, OnPlayerLogin)
        MAP_EVENT_HANDLE(Battleground, OnPlayerLogout)
        MAP_EVENT_HANDLE(Battleground, OnUpdateScore)
        MAP_EVENT_HANDLE(Battleground, OnEndEarly)
        MAP_EVENT_HANDLE(Battleground, OnEndLate)
        MAP_EVENT_HANDLE(Battleground, OnPlayerUnderMap)
        MAP_EVENT_HANDLE(Battleground, OnUpdateEarly)
        MAP_EVENT_HANDLE(Battleground, OnUpdateLate)
        MAP_EVENT_HANDLE(Battleground, OnRemovePlayer)
        MAP_EVENT_HANDLE(Battleground, OnKillPlayer)
        MAP_EVENT_HANDLE(Battleground, OnKillCreature)
        MAP_EVENT_HANDLE(Battleground, OnAddCreature)
        MAP_EVENT_HANDLE(Battleground, OnAddGameObject)
        MAP_EVENT_HANDLE(Battleground, OnAddSpiritGuide)
        MAP_EVENT_HANDLE(Battleground, OnAreaTrigger)
        MAP_EVENT_HANDLE(Battleground, OnGenericEvent)
        MAP_EVENT_HANDLE(Battleground, OnDropFlag)
        MAP_EVENT_HANDLE(Battleground, OnClickFlag)
    } BattlegroundID;

    struct InstanceEvents : public EventHandler
    {
        InstanceEvents* operator->() { return this; }
        EVENT_HANDLE(Instance,OnCreate)
        EVENT_HANDLE_FN(Instance,OnReload,ReloadInstance)
        EVENT_HANDLE(Instance,OnLoad)
        EVENT_HANDLE(Instance,OnSave)
        EVENT_HANDLE(Instance,OnUpdate)
        EVENT_HANDLE(Instance,OnPlayerEnter)
        EVENT_HANDLE(Instance,OnPlayerLeave)
        EVENT_HANDLE(Instance,OnBossStateChange)
        EVENT_HANDLE(Instance,OnCanKillBoss)
        EVENT_HANDLE(Instance,OnFillInitialWorldStates)
        EVENT_HANDLE(Instance,OnSetBossNumber)
        EVENT_HANDLE(Instance,OnLoadBossBoundaries)
        EVENT_HANDLE(Instance,OnLoadMinionData)
        EVENT_HANDLE(Instance,OnLoadDoorData)
        EVENT_HANDLE(Instance,OnLoadObjectData)

    } Instances;

    struct InstanceIDEvents : public MappedEventHandler<TSInstanceMap>
    {
        InstanceIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(Instance, OnCreate)
        MAP_EVENT_HANDLE_FN(Instance,OnReload,ReloadInstance)
        MAP_EVENT_HANDLE(Instance, OnLoad)
        MAP_EVENT_HANDLE(Instance, OnSave)
        MAP_EVENT_HANDLE(Instance, OnUpdate)
        MAP_EVENT_HANDLE(Instance, OnPlayerEnter)
        MAP_EVENT_HANDLE(Instance, OnPlayerLeave)
        MAP_EVENT_HANDLE(Instance, OnBossStateChange)
        MAP_EVENT_HANDLE(Instance, OnCanKillBoss)
        MAP_EVENT_HANDLE(Instance, OnFillInitialWorldStates)
        MAP_EVENT_HANDLE(Instance, OnSetBossNumber)
        MAP_EVENT_HANDLE(Instance, OnLoadBossBoundaries)
        MAP_EVENT_HANDLE(Instance, OnLoadMinionData)
        MAP_EVENT_HANDLE(Instance, OnLoadDoorData)
        MAP_EVENT_HANDLE(Instance, OnLoadObjectData)
    } InstanceID;

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
         EVENT_HANDLE(Item,OnCanEquip)
         EVENT_HANDLE(Item,OnEquip)
         EVENT_HANDLE(Item,OnCanUse)
         EVENT_HANDLE(Item,OnCanUseType)
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
         MAP_EVENT_HANDLE(Item,OnCanEquip)
         MAP_EVENT_HANDLE(Item,OnEquip)
         MAP_EVENT_HANDLE(Item,OnCanUse)
         MAP_EVENT_HANDLE(Item,OnCanUseType)
         MAP_EVENT_HANDLE(Item,OnLFGRollEarly)
         MAP_EVENT_HANDLE(Item,OnDestroyEarly)
         MAP_EVENT_HANDLE(Item,OnTakenAsLoot)
    } ItemID;

    struct QuestEvents : public EventHandler {
        EVENT_HANDLE(Quest,OnAccept)
        EVENT_HANDLE(Quest,OnReward)
        EVENT_HANDLE(Quest,OnRewardXP)
        EVENT_HANDLE(Quest,OnObjectiveProgress)
        EVENT_HANDLE(Quest,OnStatusChanged)
        EVENT_HANDLE(Quest,OnSpellFinish)
    } Quests;

    struct QuestIDEvents : public MappedEventHandler<TSQuestMap> {
        MAP_EVENT_HANDLE(Quest,OnAccept)
        MAP_EVENT_HANDLE(Quest,OnReward)
        MAP_EVENT_HANDLE(Quest,OnRewardXP)
        MAP_EVENT_HANDLE(Quest,OnObjectiveProgress)
        MAP_EVENT_HANDLE(Quest,OnStatusChanged)
        MAP_EVENT_HANDLE(Quest,OnSpellFinish)
    } QuestID;

    struct AreaTriggerEvents : public EventHandler {
        AreaTriggerEvents* operator->() { return this; }
        EVENT_HANDLE(AreaTrigger,OnTrigger)
    } AreaTriggers;

    struct AreaTriggerIDEvents : public MappedEventHandler<TSAreaTriggerMap> {
        AreaTriggerIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(AreaTrigger,OnTrigger)
    } AreaTriggerID;

    struct GameEventsEvents : public EventHandler {
        GameEventsEvents* operator->() { return this; }
        EVENT_HANDLE(GameEvent,OnStart)
        EVENT_HANDLE(GameEvent,OnUpdateState)
        EVENT_HANDLE(GameEvent,OnEnd)
    } GameEvents;

    struct GameEventIDEvents : public MappedEventHandler<TSGameEventMap> {
        GameEventIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(GameEvent, OnStart)
        MAP_EVENT_HANDLE(GameEvent, OnUpdateState)
        MAP_EVENT_HANDLE(GameEvent, OnEnd)
    } GameEventID;

    struct SmartActionEvents : public EventHandler {
        SmartActionEvents * operator->() { return this; }
        EVENT_HANDLE(SmartAction, OnActivateEarly)
        EVENT_HANDLE(SmartAction, OnActivateLate)
    } SmartActions;

    struct SmartActionIDEvents : public MappedEventHandler<TSSmartActionMap> {
        SmartActionIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(SmartAction, OnActivateEarly)
        MAP_EVENT_HANDLE(SmartAction, OnActivateLate)
    } SmartActionID;

    struct ConditionEvents : public EventHandler {
        ConditionEvents* operator->() { return this; }
        EVENT_HANDLE(Condition,OnCheck)
    } Conditions;

    struct ConditionIDEvents : public MappedEventHandler<TSConditionMap> {
        ConditionIDEvents * operator->() { return this; }
        MAP_EVENT_HANDLE(Condition,OnCheck)
    } ConditionID;

    struct CustomPacketEvents : public EventHandler {
      CustomPacketEvents* operator->() { return this; }
      EVENT_HANDLE(CustomPacket, OnReceive)
    } CustomPackets;

    struct CustomPacketIDEvents : public MappedEventHandler<TSPacketMap>
    {
      CustomPacketIDEvents* operator->() { return this; }
      MAP_EVENT_HANDLE(CustomPacket,OnReceive)
    } CustomPacketID;

    struct WorldPacketEvents : public EventHandler {
        WorldPacketEvents* operator->() { return this; }
        EVENT_HANDLE(WorldPacket, OnReceive)
        EVENT_HANDLE(WorldPacket, OnSend)
    } WorldPackets;

    struct WorldPacketIDEvents : public MappedEventHandler<TSWorldPacketMap>
    {
        WorldPacketIDEvents* operator->() { return this; }
        MAP_EVENT_HANDLE(WorldPacket, OnReceive)
        MAP_EVENT_HANDLE(WorldPacket, OnSend)
    } WorldPacketID;

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

    void LoadEvents(TSEventStore* events)
    {
        Server.LoadEvents(events);
        World.LoadEvents(events);
        Unit.LoadEvents(events);
        AreaTriggers.LoadEvents(events);
        Weather.LoadEvents(events);
        AuctionHouse.LoadEvents(events);
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
        Battlegrounds.LoadEvents(events);
        BattlegroundID.LoadEvents(&events->Battlegrounds);
        Items.LoadEvents(events);
        ItemID.LoadEvents(&events->Items);
        Quests.LoadEvents(events);
        QuestID.LoadEvents(&events->Quests);
        AreaTriggers.LoadEvents(events);
        AreaTriggerID.LoadEvents(&events->AreaTriggers);
        Maps.LoadEvents(events);
        MapID.LoadEvents(&events->Maps);
        Instances.LoadEvents(events);
        InstanceID.LoadEvents(&events->Instances);
        Achievements.LoadEvents(events);
        AchievementID.LoadEvents(&events->Achievements);
        GameEvents.LoadEvents(events);
        GameEventID.LoadEvents(&events->GameEvents);
        SmartActions.LoadEvents(events);
        SmartActionID.LoadEvents(&events->SmartActions);
        Conditions.LoadEvents(events);
        ConditionID.LoadEvents(&events->Conditions);
        CustomPackets.LoadEvents(events);
        CustomPacketID.LoadEvents(&events->Packets);
        WorldPackets.LoadEvents(events);
        WorldPacketID.LoadEvents(&events->WorldPackets);
    }

    void Unload()
    {
         Server.Unload();
         World.Unload();
         Unit.Unload();
         AreaTriggers.Unload();
         Weather.Unload();
         AuctionHouse.Unload();
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
         Battlegrounds.Unload();
         BattlegroundID.Unload();
         Items.Unload();
         ItemID.Unload();
         Quests.Unload();
         QuestID.Unload();
         AreaTriggers.Unload();
         AreaTriggerID.Unload();
         Maps.Unload();
         MapID.Unload();
         Instances.Unload();
         InstanceID.Unload();
         Tests.Unload();
         GameEvents.Unload();
         GameEventID.Unload();
         SmartActions.Unload();
         SmartActionID.Unload();
         Conditions.Unload();
         ConditionID.Unload();
         CustomPackets.Unload();
         CustomPacketID.Unload();
         WorldPackets.Unload();
         WorldPacketID.Unload();
    }
};

#define OnMessageID(type,func) _OnMessageID<type>(type::GetID(),func)

TC_GAME_API TSEventStore* GetTSEvents();

void TSLoadEvents();
