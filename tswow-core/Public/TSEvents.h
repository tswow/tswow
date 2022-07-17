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
#include "TSEvent.h"
#include "TSWorldPacket.h"
#include "TSInstance.h"
#include "TSSmartScript.h"
#include "TSPlayer.h"
#include "TSMutable.h"
#include "TSMutableString.h"
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
#include "TSMainThreadContext.h"
#include "TSSpellInfo.h"

#include <cstdint>

void TC_GAME_API ReloadPlayer(void(ptr)(TSPlayer, bool));
void TC_GAME_API ReloadPlayer(sol::protected_function);

void TC_GAME_API ReloadCreature(void(ptr)(TSCreature));
void TC_GAME_API ReloadCreature(void(ptr)(TSCreature), uint32_t id);
void TC_GAME_API ReloadCreature(sol::protected_function);
void TC_GAME_API ReloadCreature(sol::protected_function, uint32_t id);

void TC_GAME_API ReloadGameObject(void(ptr)(TSGameObject));
void TC_GAME_API ReloadGameObject(void(ptr)(TSGameObject), uint32_t id);
void TC_GAME_API ReloadGameObject(sol::protected_function);
void TC_GAME_API ReloadGameObject(sol::protected_function, uint32_t id);

void TC_GAME_API ReloadMap(void(ptr)(TSMap));
void TC_GAME_API ReloadMap(void(ptr)(TSMap), uint32_t id);
void TC_GAME_API ReloadMap(sol::protected_function);
void TC_GAME_API ReloadMap(sol::protected_function, uint32_t id);

void TC_GAME_API ReloadBattleground(void(ptr)(TSBattleground));
void TC_GAME_API ReloadBattleground(void(ptr)(TSBattleground), uint32_t id);
void TC_GAME_API ReloadBattleground(sol::protected_function);
void TC_GAME_API ReloadBattleground(sol::protected_function, uint32_t id);

void TC_GAME_API ReloadInstance(void(ptr)(TSInstance));
void TC_GAME_API ReloadInstance(void(ptr)(TSInstance), uint32_t id);
void TC_GAME_API ReloadInstance(sol::protected_function);
void TC_GAME_API ReloadInstance(sol::protected_function, uint32_t id);

struct TSEvents
{
    struct ServerEvents
    {
        EVENTS_HEADER(ServerEvents)
    } Server;

    struct WorldEvents
    {
         EVENTS_HEADER(WorldEvents)
         EVENT(OnOpenStateChange, bool)
         EVENT(OnConfigLoad, bool)
         EVENT(OnMotdChange, TSString)
         EVENT(OnShutdownInitiate, uint32, uint32)
         EVENT(OnUpdate, uint32, TSMainThreadContext)
         EVENT(OnStartup)
         EVENT(OnShutdownCancel)
         EVENT(OnShutdown)
         EVENT(OnCalcHonor
             , TSMutable<float> honor
             , uint8 level
             , float multiplier
         )
    } World;

    struct WeatherEvents
    {
        EVENTS_HEADER(WeatherEvents)
    } Weather;

    struct AuctionEvents
    {
        EVENTS_HEADER(AuctionEvents)
        EVENT(OnAuctionAdd, TSAuctionHouseObject, TSAuctionEntry)
        EVENT(OnAuctionRemove, TSAuctionHouseObject, TSAuctionEntry)
        EVENT(OnAuctionSuccessful, TSAuctionHouseObject, TSAuctionEntry)
        EVENT(OnAuctionExpire, TSAuctionHouseObject, TSAuctionEntry)
    } AuctionHouse;

    struct VehicleEvents
    {
        EVENTS_HEADER(VehicleEvents)
        EVENT(OnInstall, TSVehicle)
        EVENT(OnUninstall, TSVehicle)
        EVENT(OnReset, TSVehicle)
        EVENT(OnInstallAccessory, TSVehicle, TSCreature)
        EVENT(OnAddPassenger, TSVehicle, TSUnit, int8)
        EVENT(OnRemovePassenger, TSVehicle, TSUnit)
    } Vehicle;

    struct AchievementEvents : public TSMappedEventsDirect
    {
        EVENTS_HEADER(AchievementEvents)
        ID_EVENT(OnUpdate
            , TSPlayer
            , TSAchievementEntry
            , TSAchievementCriteriaEntry
            , uint32 progressType
            , uint32 timeElapsed
            , bool timedCompleted
        )
        ID_EVENT(OnComplete, TSPlayer, TSAchievementEntry)
    } Achievement;

    struct PlayerEvents
    {
         EVENTS_HEADER(PlayerEvents)
         EVENT(OnPVPKill, TSPlayer, TSPlayer)
         EVENT(OnCreatureKill, TSPlayer, TSCreature)
         EVENT(OnPlayerKilledByCreature, TSCreature, TSPlayer)
         EVENT(OnLevelChanged, TSPlayer, uint8)
         EVENT(OnFreeTalentPointsChanged, TSPlayer, uint32)
         EVENT(OnTalentsResetEarly, TSPlayer, TSMutable<bool>)
         EVENT(OnTalentsReset, TSPlayer, bool)
         EVENT(OnTalentsResetLate, TSPlayer, bool /*noCost*/)
         EVENT(OnMoneyChanged, TSPlayer, TSMutable<int32>)
         EVENT(OnMoneyLimit, TSPlayer, int32)
         EVENT(OnGiveXP, TSPlayer, TSMutable<uint32>, TSUnit)
         EVENT(OnReputationChange, TSPlayer, uint32, TSMutable<int32>, bool)
         EVENT(OnDuelRequest, TSPlayer, TSPlayer)
         EVENT(OnDuelStart, TSPlayer, TSPlayer)
         EVENT(OnDuelEnd, TSPlayer, TSPlayer, uint32)
         EVENT(OnSay, TSPlayer, TSMutableString, uint32, uint32)
         EVENT(OnWhisper, TSPlayer, TSPlayer, TSMutableString, uint32, uint32)
         EVENT(OnChatGroup, TSPlayer, TSGroup, TSMutableString, uint32, uint32)
         EVENT(OnChatGuild, TSPlayer, TSGuild, TSMutableString, uint32, uint32)
         EVENT(OnChat, TSPlayer, TSChannel, TSMutableString, uint32, uint32)
         EVENT(OnCommand, TSPlayer, TSMutableString, TSMutable<bool>)
         EVENT(OnEmote, TSPlayer, uint32)
         EVENT(OnTextEmote, TSPlayer, uint32, uint32, uint64)
         EVENT(OnSpellCast, TSPlayer, TSSpell, bool)
         EVENT(OnLogin, TSPlayer, bool)
         EVENT_FN(OnReload, ReloadPlayer, TSPlayer, bool)
         EVENT(OnLogout, TSPlayer)
         EVENT(OnCreateEarly, TSPlayer)
         EVENT(OnCreate, TSPlayer)
         EVENT(OnDelete, uint64, uint32)
         EVENT(OnFailedDelete, uint64, uint32)
         EVENT(OnSave, TSPlayer)
         EVENT(OnBindToInstance, TSPlayer, uint32, uint32, bool, uint8)
         EVENT(OnUpdateZone, TSPlayer, uint32, uint32)
         EVENT(OnMapChanged, TSPlayer)
         EVENT(OnQuestObjectiveProgress, TSPlayer, TSQuest, uint32, uint16)
         EVENT(OnQuestStatusChange, TSPlayer, uint32)
         EVENT(OnMovieComplete, TSPlayer, uint32)
         EVENT(OnPlayerRepop, TSPlayer)
         EVENT(OnSendMail, TSPlayer, TSMailDraft, TSMutable<uint32>)

         EVENT(OnGenerateItemLoot, TSPlayer, TSItem, TSLoot, uint32)
         EVENT(OnLootCorpse, TSPlayer, TSCorpse)
         EVENT(OnLearnTalent, TSPlayer, uint32_t tabId, uint32_t talentId, uint32_t talentRank, uint32_t spellId, TSMutable<bool>)

         EVENT(OnGossipSelect, TSPlayer, TSPlayer, uint32_t, uint32_t, TSMutable<bool>)
         EVENT(OnGossipSelectCode, TSPlayer, TSPlayer, uint32_t, uint32_t, TSString, TSMutable<bool>)

         EVENT(
             OnTradeCompleted
             , TSPlayer me
             , TSPlayer him
             , TSArray<TSItem> myItems
             , TSArray<TSItem> hisItems
             , uint32 myMoney
             , uint32 hisMoney
         );

         EVENT(OnUpdateDodgePercentage
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateBlockPercentage
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateParryPercentage
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateArmor
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateMaxHealth
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateMaxPower
             , TSPlayer
             , TSMutable<float>
             , int8 power
             , float bonus
         )
         EVENT(OnUpdateManaRegen
             , TSPlayer
             , TSMutable<float>
             , TSMutable<float>
             , TSMutable<int32>
         );
        EVENT(OnUpdateMeleeHitChance
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateRuneRegen
             , TSPlayer
             , TSMutable<float>
             , uint32 runeType
         )
         EVENT(OnUpdateExpertise
             , TSPlayer
             , TSMutable<int32>
             , uint32 attackType
             , TSItem
         )
         EVENT(OnUpdateSpellCrit
             , TSPlayer
             , TSMutable<float>
             , uint32 school
         )
         EVENT(OnUpdateArmorPenetration
             , TSPlayer
             , TSMutable<int32>
         )
         EVENT(OnUpdateMeleeHitChances
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateRangedHitChances
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateSpellHitChances
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateResistance
             , TSPlayer
             , TSMutable<float>
             , uint32 school
         )
         EVENT(OnUpdateShieldBlock
             , TSPlayer
             , TSMutable<uint32>
         )
         EVENT(OnUpdateCrit
             , TSPlayer
             , TSMutable<float>
             , uint32 attackType
         )
         EVENT(OnCalcGreyLevel
             , TSPlayer killer
             , TSMutable<uint8> greyLevel
         )
         EVENT(OnCalcZeroDiff
             , TSPlayer killer
             , TSMutable<uint8> zeroDiff
         )
         EVENT(OnCalcGroupGain
             , TSPlayer killer
             , TSMutable<float> groupRate
             , uint32 count
             , bool isRaid
         )

         EVENT(OnCalcStaminaHealthBonus
             , TSPlayer
             , TSMutable<float>
             , float
             , float
         );
        EVENT(OnCalcIntellectManaBonus
             , TSPlayer
             , TSMutable<float>
             , float
             , float
         );
         EVENT(OnCalcSkillGainChance
             , TSPlayer
             , TSMutable<int>
             , int
             , int
             , int
             , int
             , int
         )

         EVENT(OnUpdateAttackPower
             , TSPlayer
             , TSMutable<float>
         )
         EVENT(OnUpdateRangedAttackPower
             , TSPlayer
             , TSMutable<float>
         )

         EVENT(OnCalcTalentPoints
             , TSPlayer
             , TSMutable<uint32>
         )

         EVENT(OnGlyphInitForLevel
             , TSPlayer
             , TSMutable<uint32> /* active glyph slots bitmask 0x3F = 0x01 | 0x02 | 0x04 | 0x08 | 0x10 | 0x20 for 80 level */
         )

         EVENT(OnReputationPriceDiscount
            , TSPlayer player
            , TSFactionTemplate faction
            , TSCreature creature
            , TSMutable<float> money
         )
    } Player;

    struct AccountEvents
    {
         EVENTS_HEADER(AccountEvents)
         EVENT(OnAccountLogin, uint32)
         EVENT(OnFailedAccountLogin, uint32)
         EVENT(OnEmailChange, uint32)
         EVENT(OnFailedEmailChange, uint32)
         EVENT(OnPasswordChange, uint32)
         EVENT(OnFailedPasswordChange, uint32)
    } Account;

    struct GuildEvents
    {
         EVENTS_HEADER(GuildEvents)
         EVENT(OnAddMember, TSGuild, TSPlayer, TSMutable<uint8>)
         EVENT(OnRemoveMember, TSGuild, TSPlayer, bool, bool)
         EVENT(OnMOTDChanged, TSGuild, TSString)
         EVENT(OnInfoChanged, TSGuild, TSString)
         EVENT(OnCreate, TSGuild, TSPlayer, TSString)
         EVENT(OnDisband, TSGuild)
         EVENT(OnMemberWitdrawMoney, TSGuild, TSPlayer, TSMutable<uint32>, bool)
         EVENT(OnMemberDepositMoney, TSGuild, TSPlayer, TSMutable<uint32>)
         EVENT(OnEvent, TSGuild, uint8, uint32, uint32, uint8)
         EVENT(OnBankEvent, TSGuild, uint8, uint8, uint32, uint32, uint16, uint8)
    } Guild;

    struct GroupEvents
    {
         EVENTS_HEADER(GroupEvents)
         EVENT(OnAddMember, TSGroup, uint64 member_id)
         EVENT(OnInviteMember, TSGroup, uint64 member_id)
         EVENT(OnRemoveMember, TSGroup, uint64 member_id, uint32, uint64, TSString)
         EVENT(OnChangeLeader, TSGroup, uint64, uint64)
         EVENT(OnDisband, TSGroup)
    } Group;

    struct UnitEvents
    {
        EVENTS_HEADER(UnitEvents)
        EVENT(OnCalcMissChance
            , TSUnit
            , TSMutable<float>
        )
        EVENT(OnCalcHeal
            , TSUnit
            , TSUnit
            , TSMutable<uint32>
        )
        EVENT(OnMeleeDamageEarly
            , TSMeleeDamageInfo
            , TSMutable<uint32>
            , uint32
            , uint32
        )
        EVENT(OnMeleeDamageLate
            , TSMeleeDamageInfo
            , TSMutable<uint32>
            , uint32
            , uint32
        )
        EVENT(OnCalcMeleeCrit
            , TSUnit
            , TSUnit
            , TSMutable<float>
            , uint32
        )
        EVENT(OnCalcMeleeOutcome
            , TSUnit
            , TSUnit
            , TSMutable<float>
            , TSMutable<float>
            , TSMutable<float>
            , TSMutable<float>
            , TSMutable<float>
            , uint32
        );
        EVENT(OnCalcThreatEarly
            , TSUnit
            , TSUnit
            , TSMutable<float>
            , TSSpellInfo
            , bool
        );
        EVENT(OnCalcThreatLate
            , TSUnit
            , TSUnit
            , TSMutable<float>
            , TSSpellInfo
            , bool
        );
        EVENT(OnCalcScaleThreat
            , TSUnit
            , TSUnit
            , TSMutable<float>
            , bool
        );
        EVENT(OnDeathEarly, TSUnit victim, TSUnit killer)
        EVENT(OnDeath, TSUnit victim, TSUnit killer)
        EVENT(OnEnterCombat, TSUnit unit)
        EVENT(OnExitCombat, TSUnit unit)
        EVENT(OnEnterCombatWith, TSUnit me, TSUnit other)
        EVENT(OnExitCombatWith, TSUnit me, TSUnit other)
        EVENT(OnSetTarget, TSUnit, uint64 new_target, uint64 old_target)
        EVENT(OnApplyDiminishingReturn
            , TSUnit target
            , TSSpellInfo info
            , TSMutable<int32> duration
            , int32 oldDuration
            , uint8 level
            , float mod
        )
    } Unit;

    struct SpellEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(SpellEvents)
        TSRegistryRef& get_registry_ref(uint32_t id) override;
        ID_EVENT(OnCast, TSSpell)
        ID_EVENT(OnCheckCast, TSSpell, TSMutable<uint8>)
        ID_EVENT(OnSuccessfulDispel, TSSpell, uint32)
        ID_EVENT(OnEffect, TSSpell, TSMutable<bool> preventDefault, TSSpellEffectInfo, uint32 mode, TSUnit unitTarget, TSItem itemTarget, TSGameObject gameObjectTarget, TSCorpse corpseTarget)
        ID_EVENT(OnEffectApplyGlyph
            , TSSpell
            , TSMutable<bool> isLocked
        )
        ID_EVENT(OnHit, TSSpell)
        ID_EVENT(OnTick, TSAuraEffect)
        ID_EVENT(OnRemove, TSAuraEffect, TSAuraApplication, uint32)
        ID_EVENT(OnApply, TSAuraEffect, TSAuraApplication, uint32)
        ID_EVENT(OnDamageEarly, TSSpell, TSMutable<int32>, TSSpellDamageInfo, uint32, bool, uint32 effectMask)
        ID_EVENT(OnDamageLate, TSSpell, TSMutable<uint32>, TSSpellDamageInfo, uint32, bool, uint32 effectMask)
        ID_EVENT(OnPeriodicDamage, TSAuraEffect, TSMutable<uint32>)
        ID_EVENT(OnCalcSpellPowerLevelPenalty
            , TSSpellInfo spell
            , TSMutable<float> penalty
            , TSUnit caster
        )
        ID_EVENT(OnTrainerSend, TSSpellInfo spell, uint32 trainerId, TSPlayer receiver, TSMutable<bool> allowTrain)
        ID_EVENT(OnCalcMiss, TSSpell, TSUnit, TSMutable<uint32>, TSMutable<uint32>)
        ID_EVENT(OnCalcCrit, TSSpell, TSMutable<float>)
        ID_EVENT(OnCalcAuraCrit, TSAuraEffect, TSMutable<float>)
        ID_EVENT(OnCalcReflect, TSSpellInfo, TSMutable<int32>, TSWorldObject, TSUnit)
        ID_EVENT(OnCalcHit, TSSpellInfo, TSMutable<int32>, TSWorldObject, TSUnit)
        ID_EVENT(OnCalcResist, TSSpellInfo, TSMutable<int32>, TSWorldObject, TSUnit)
        ID_EVENT(OnCalcMeleeMiss, TSSpellInfo, TSMutable<float>, TSUnit, TSUnit, uint8 attackType, int32 skillDiff)

        ID_EVENT(OnCheckAreaTarget, TSAura, TSUnit, TSMutable<bool> result, TSMutable<bool> cancelDefault)
        ID_EVENT(OnCheckEffectProc, TSAuraEffect, TSAuraApplication, TSProcEventInfo, TSMutable<bool> result, TSMutable<bool> cancelDefault)
        ID_EVENT(OnCheckProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool> result, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectPeriodic, TSAuraEffect, TSAuraApplication, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectProc, TSAuraEffect, TSAuraApplication, TSProcEventInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnPrepareProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool> prepare, TSMutable<bool> cancelDefault)
        ID_EVENT(OnProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool> handled, TSMutable<bool> cancelDefault)
        ID_EVENT(OnAfterDispel, TSAura, TSDispelInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnAfterEffectApply, TSAuraEffect, TSAuraApplication, uint32 modes, TSMutable<bool> cancelDefault)
        ID_EVENT(OnAfterEffectProc, TSAuraEffect, TSAuraApplication, TSProcEventInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnAfterEffectRemove, TSAuraEffect, TSAuraApplication, uint32 modes, TSMutable<bool> cancelDefault)
        ID_EVENT(OnAfterProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnDispel, TSAura, TSDispelInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectAbsorb, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutable<uint32> absorbAmount, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectAfterAbsorb, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutable<uint32> absorbAmount, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectAfterManaShield, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutable<uint32> absorbAmount, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectCalcAmount, TSAuraEffect, TSMutable<int32> amount, TSMutable<bool> canBeRecalculated, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectCalcPeriodic, TSAuraEffect, TSMutable<bool> isPeriodic, TSMutable<int32> amplitude, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectCalcSpellMod, TSAuraEffect, TSSpellModifier, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectManaShield, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutable<uint32> absorbAmount, TSMutable<bool> cancelDefault)
        ID_EVENT(OnEffectSplit, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutable<uint32> splitAmount, TSMutable<bool> cancelDefault)

        ID_EVENT(OnAfterCast, TSSpell, TSMutable<bool> cancelDefault)
        ID_EVENT(OnAfterHit, TSSpell, TSMutable<bool> cancelDefault)
        ID_EVENT(OnBeforeCast, TSSpell, TSMutable<bool> cancelDefault)
        ID_EVENT(OnBeforeHit, TSSpell, uint32, TSMutable<bool> cancelDefault)
        ID_EVENT(OnDestinationTargetSelect, TSSpell, TSSpellDestination, uint32 index, TSSpellImplicitTargetInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnObjectAreaTargetSelect, TSSpell, TSWorldObjectCollection, uint32 index, TSSpellImplicitTargetInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnObjectTargetSelect, TSSpell, TSMutableWorldObject, uint32 index, TSSpellImplicitTargetInfo, TSMutable<bool> cancelDefault)
        ID_EVENT(OnOnResistAbsorbCalculate, TSSpell, TSDamageInfo, TSMutable<uint32> resistAmount, TSMutable<int32> absorbAmount, TSMutable<bool> cancelDefault)
    } Spell;

    struct CreatureEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(CreatureEvents)
        TSRegistryRef& get_registry_ref(uint32_t id) override;
        ID_EVENT(OnMoveInLOS, TSCreature, TSUnit)
        ID_EVENT(OnJustEnteredCombat, TSCreature, TSUnit)
        ID_EVENT(OnJustEngagedWith, TSCreature, TSUnit)
        ID_EVENT(OnDeathEarly, TSCreature, TSUnit)
        ID_EVENT(OnDeath, TSCreature, TSUnit)
        ID_EVENT(OnKilledUnit, TSCreature, TSUnit)
        ID_EVENT(OnSummoned, TSCreature, TSCreature)
        ID_EVENT(OnIsSummoned, TSCreature, TSWorldObject)
        ID_EVENT(OnSummonDespawn, TSCreature, TSCreature)
        ID_EVENT(OnSummonDies, TSCreature, TSCreature, TSUnit)
        ID_EVENT(OnHitBySpell, TSCreature, TSWorldObject, TSSpellInfo)
        ID_EVENT(OnSpellHitTarget, TSCreature, TSWorldObject, TSSpellInfo)
        ID_EVENT(OnSpellCastFinished, TSCreature, TSSpellInfo, uint32)
        ID_EVENT(OnJustAppeared, TSCreature)
        ID_EVENT(OnCharmed, TSCreature, bool)
        ID_EVENT(OnReachedHome, TSCreature)
        ID_EVENT(OnReceiveEmote, TSCreature, TSPlayer, uint32)
        ID_EVENT(OnOwnerAttacked, TSCreature, TSUnit)
        ID_EVENT(OnOwnerAttacks, TSCreature, TSUnit)
        ID_EVENT(OnCorpseRemoved, TSCreature, uint32)
        ID_EVENT(OnWaypointStarted, TSCreature, uint32, uint32)
        ID_EVENT(OnWaypointReached, TSCreature, uint32, uint32)
        ID_EVENT(OnWaypointPathEnded, TSCreature, uint32, uint32)
        ID_EVENT(OnPassengerBoarded, TSCreature, TSUnit, int8, bool)
        ID_EVENT(OnSpellClick, TSCreature, TSUnit, bool)
        ID_EVENT(OnUpdateAI, TSCreature, uint32)
        ID_EVENT(OnGenerateLoot, TSCreature, TSPlayer)
        ID_EVENT(OnCreate, TSCreature, TSMutable<bool>)
        ID_EVENT_FN(OnReload, ReloadCreature, TSCreature)
        ID_EVENT(OnRemove, TSCreature)

        ID_EVENT(OnGossipHello, TSCreature, TSPlayer, TSMutable<bool>)
        ID_EVENT(OnGossipSelect, TSCreature, TSPlayer, uint32, uint32, TSMutable<bool>)
        ID_EVENT(OnGossipSelectCode, TSCreature, TSPlayer, uint32, uint32, TSString, TSMutable<bool>)
        ID_EVENT(OnQuestAccept, TSCreature, TSPlayer, TSQuest)
        ID_EVENT(OnQuestReward, TSCreature, TSPlayer, TSQuest, uint32)

        ID_EVENT(OnCanGeneratePickPocketLoot, TSCreature, TSPlayer, TSMutable<bool>)
        ID_EVENT(OnGeneratePickPocketLoot, TSCreature, TSPlayer, TSLoot)
        ID_EVENT(OnGenerateSkinningLoot, TSCreature, TSPlayer, TSLoot)

        ID_EVENT(OnUpdateLvlDepMaxHealth
            , TSCreature
            , TSMutable<uint32> maxHealth
            , float rankHealthMod
            , uint32 basehp
        )
        // extension: add "ForceMana" mutable after maxMana for ignoring creature class (not sure it works well)
        ID_EVENT(OnUpdateLvlDepMaxMana
            , TSCreature
            , TSMutable<uint32> maxMana
            , float baseMana
        )
        ID_EVENT(OnUpdateLvlDepBaseDamage
            , TSCreature
            , TSMutable<float> baseMinDamage
            , TSMutable<float> baseMaxDamage
            , float baseDamageIn
        )
        ID_EVENT(OnUpdateLvlDepArmor
            , TSCreature
            , TSMutable<float> armorOut
            , float baseArmor
        )
        ID_EVENT(OnUpdateLvlDepAttackPower
            , TSCreature
            , TSMutable<uint32> attackPower
            , TSMutable<uint32> rangedAttackPower
        )
        ID_EVENT(OnSendVendorItem, TSCreature vendor, TSItemTemplate item, TSPlayer player, TSMutable<bool> shouldSend)
        ID_EVENT(OnUpdateResistance
            , TSCreature
            , TSMutable<float>
            , bool isGuardian
            , uint32 school
        )
        ID_EVENT(OnUpdateArmor
            , TSCreature
            , TSMutable<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateMaxHealth
            , TSCreature
            , TSMutable<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateMaxPower
            , TSCreature
            , TSMutable<float>
            , bool isGuardian
            , int8 powerType
        )
        ID_EVENT(OnUpdateAttackPowerDamage
            , TSCreature
            , TSMutable<float> base
            , TSMutable<float> mod
            , TSMutable<float> multiplier
            , bool isGuardian
            , bool ranged
        )
        ID_EVENT(OnUpdateDamagePhysical
            , TSCreature
            , TSMutable<float>
            , TSMutable<float>
            , bool isGuardian
            , uint8 attType
        )
        ID_EVENT(OnCalcColorCode
            , TSCreature
            , TSMutable<uint8> code
            , TSPlayer
            , uint32 playerLevel
            , uint32 creatureLevel
        )
        ID_EVENT(OnCalcGain
            , TSCreature victim
            , TSMutable<uint32>
            , TSPlayer killer
        )
        ID_EVENT(OnCalcBaseGain
            , TSCreature victim
            , TSMutable<uint32>
            , TSPlayer killer
        )
    } Creature;

    struct GameObjectEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(GameObjectEvents)
        TSRegistryRef& get_registry_ref(uint32_t id) override;
        ID_EVENT(OnUpdate, TSGameObject, uint32)
        ID_EVENT(OnDialogStatus, TSGameObject, TSPlayer)
        ID_EVENT(OnDestroyed, TSGameObject, TSWorldObject)
        ID_EVENT(OnDamaged, TSGameObject, TSWorldObject)
        ID_EVENT(OnLootStateChanged, TSGameObject, uint32, TSUnit)
        ID_EVENT(OnGOStateChanged, TSGameObject, uint32)
        ID_EVENT(OnGossipHello, TSGameObject, TSPlayer, TSMutable<bool>)
        ID_EVENT(OnGossipSelect, TSGameObject, TSPlayer, uint32, uint32, TSMutable<bool>)
        ID_EVENT(OnGossipSelectCode, TSGameObject, TSPlayer, uint32, uint32, TSString, TSMutable<bool>)
        ID_EVENT(OnCreate, TSGameObject, TSMutable<bool>)
        ID_EVENT_FN(OnReload, ReloadGameObject, TSGameObject)
        ID_EVENT(OnRemove, TSGameObject)
        ID_EVENT(OnUse, TSGameObject, TSUnit, TSMutable<bool>)
        ID_EVENT(OnQuestAccept, TSGameObject, TSPlayer, TSQuest)
        ID_EVENT(OnQuestReward, TSGameObject, TSPlayer, TSQuest, uint32)
        ID_EVENT(OnGenerateLoot, TSGameObject, TSPlayer)
        ID_EVENT(OnGenerateFishLoot, TSGameObject, TSPlayer, TSLoot, bool)
    } GameObject;

    struct MapEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(MapEvents)
        ID_EVENT(OnCreate, TSMap)
        ID_EVENT_FN(OnReload, ReloadMap, TSMap)
        ID_EVENT(OnUpdate, TSMap, uint32)
        ID_EVENT(OnUpdateDelayed, TSMap, uint32, TSMainThreadContext)
        ID_EVENT(OnPlayerEnter, TSMap, TSPlayer)
        ID_EVENT(OnPlayerLeave, TSMap, TSPlayer)
        ID_EVENT(OnCreatureCreate, TSMap, TSCreature, TSMutable<bool>)
        ID_EVENT(OnCreatureRemove, TSMap, TSCreature)
        ID_EVENT(OnGameObjectCreate, TSMap, TSGameObject, TSMutable<bool>)
        ID_EVENT(OnGameObjectRemove, TSMap, TSGameObject)
        ID_EVENT(OnCheckEncounter, TSMap, TSPlayer)
    } Map;

    struct BattlegroundEvents : public TSMappedEventsDirect
    {
        EVENTS_HEADER(BattlegroundEvents)
        ID_EVENT(OnCanCreate, TSBattleground, TSMutable<bool>)
        ID_EVENT(OnCreate, TSBattleground)
        ID_EVENT_FN(OnReload, ReloadBattleground, TSBattleground)
        ID_EVENT(OnAddPlayer, TSBattleground, TSPlayer)
        ID_EVENT(OnPlayerLogin, TSBattleground, TSPlayer)
        ID_EVENT(OnPlayerLogout, TSBattleground, TSPlayer)
        ID_EVENT(OnUpdateScore, TSBattleground, TSPlayer, uint32_t type, bool isAddHonor, TSMutable<uint32> value)
        ID_EVENT(OnUpdateEarly, TSBattleground, uint32 diff)
        ID_EVENT(OnUpdateLate, TSBattleground, uint32 diff)
        ID_EVENT(OnKillPlayer, TSBattleground, TSPlayer victim, TSPlayer killer)
        ID_EVENT(OnEndEarly, TSBattleground, TSMutable<uint32> winner)
        ID_EVENT(OnEndLate, TSBattleground, uint32 winner)
        ID_EVENT(OnAddGameObject
            , TSBattleground
            , uint32 type
            , TSMutable<uint32> entry
            , TSMutable<uint8> goState
            , TSMutable<float> x
            , TSMutable<float> y
            , TSMutable<float> z
            , TSMutable<float> o
            , TSMutable<float> rot0
            , TSMutable<float> rot1
            , TSMutable<float> rot2
            , TSMutable<float> rot3
        )
        ID_EVENT(OnAddCreature
            , TSBattleground
            , uint32 type
            , TSMutable<uint32> entry
            , TSMutable<float> x
            , TSMutable<float> y
            , TSMutable<float> z
            , TSMutable<float> o
            , TSMutable<uint32_t> respawnTime
        )
        ID_EVENT(OnAddSpiritGuide
            , TSBattleground
            , uint32 type
            , TSMutable<uint32> entry
            , TSMutable<uint8> teamId
            , TSMutable<float> x
            , TSMutable<float> y
            , TSMutable<float> z
            , TSMutable<float> o
        )
        ID_EVENT(OnKillCreature, TSBattleground, TSCreature victim, TSPlayer killer)
        ID_EVENT(OnRemovePlayer, TSBattleground, uint64 guid, TSPlayer, uint32 team)
        ID_EVENT(OnPlayerUnderMap, TSBattleground, TSPlayer, TSMutable<bool> handled)
        ID_EVENT(OnGenericEvent, TSBattleground, TSWorldObject, uint32 eventId, TSWorldObject invoker)
        ID_EVENT(OnClickFlag, TSBattleground, TSPlayer, TSGameObject flag_obj)
        ID_EVENT(OnDropFlag, TSBattleground, TSPlayer)
        ID_EVENT(OnDestroyGate, TSBattleground, TSPlayer destroyer, TSGameObject target)
        ID_EVENT(OnOpenDoors, TSBattleground)
        ID_EVENT(OnCloseDoors, TSBattleground)
        ID_EVENT(OnReset, TSBattleground)
        // requires special handling functions
        ID_EVENT(OnAchievementCriteria
            , TSBattleground
            , uint32 criteriaId
            , TSPlayer player
            , TSUnit target
            , uint32 miscvalueA
            , TSMutable<bool> handled
        )
        ID_EVENT(OnAreaTrigger, TSBattleground, TSPlayer, uint32 trigger, TSMutable<bool> handled)
        ID_EVENT(
            OnWeight
            , uint32 bgType
            , TSMutable<float> weight
            , uint32 origType
        )
        ID_EVENT(
            OnSelect
            , TSMutable<uint32> bgType
        )
    } Battleground;

    struct InstanceEvents : public TSMappedEventsDirect
    {
        EVENTS_HEADER(InstanceEvents)
        ID_EVENT(OnCreate, TSInstance)
        ID_EVENT_FN(OnReload, ReloadInstance, TSInstance)
        ID_EVENT(OnLoad, TSInstance)
        ID_EVENT(OnSave, TSInstance)
        ID_EVENT(OnUpdate, TSInstance, uint32 diff)
        ID_EVENT(OnPlayerEnter, TSInstance, TSPlayer)
        ID_EVENT(OnPlayerLeave, TSInstance, TSPlayer)
        ID_EVENT(OnBossStateChange, TSInstance, uint32 id, uint32 state)
        ID_EVENT(OnCanKillBoss, TSInstance, uint32 bossId, TSPlayer player, TSMutable<bool> canKill)
        ID_EVENT(OnFillInitialWorldStates, TSInstance, TSWorldStatePacket)
        ID_EVENT(OnSetBossNumber, TSInstance, TSMutable<uint32>)
        ID_EVENT(OnLoadBossBoundaries, TSInstance)
        ID_EVENT(OnLoadMinionData, TSInstance)
        ID_EVENT(OnLoadDoorData, TSInstance)
        ID_EVENT(OnLoadObjectData, TSInstance)
    } Instance;

     struct ItemEvents : public TSMappedEventsRegistry
     {
         EVENTS_HEADER(ItemEvents)
         TSRegistryRef& get_registry_ref(uint32_t id);
         ID_EVENT(OnUse, TSItem, TSPlayer, void*, TSMutable<bool>)
         ID_EVENT(OnExpire, TSItemTemplate, TSPlayer, TSMutable<bool>)
         ID_EVENT(OnRemove, TSItem, TSPlayer, TSMutable<bool>)
         ID_EVENT(OnCastSpell, TSItem, TSPlayer, TSUnit, TSSpellInfo, TSMutable<bool>)
         ID_EVENT(OnQuestAccept, TSItem, TSPlayer, TSQuest)
         ID_EVENT(OnGossipHello, TSItem, TSPlayer, TSMutable<bool>)
         ID_EVENT(OnGossipSelect, TSItem, TSPlayer, uint32, uint32, TSMutable<bool>)
         ID_EVENT(OnGossipSelectCode, TSItem, TSPlayer, uint32, uint32, TSString, TSMutable<bool>)
         ID_EVENT(OnCanChangeEquipState, TSItemTemplate, TSMutable<bool>)
         ID_EVENT(OnUnequip, TSItem, TSPlayer, bool, TSMutable<uint32> result)
         ID_EVENT(OnBank, TSItem, TSPlayer, uint8 bag, uint8 slot, bool swap, TSMutable<uint32> result)
         ID_EVENT(OnCanEquip, TSItem, TSPlayer, uint8 slot, bool swap, TSMutable<uint32> result)
         ID_EVENT(OnEquip, TSItem, TSPlayer, uint8 slot, bool isMerge)
         ID_EVENT(OnCanUse, TSItem, TSPlayer, TSMutable<uint32> result)
         ID_EVENT(OnCanUseType, TSItemTemplate, TSPlayer, TSMutable<uint32> result)
         ID_EVENT(OnLFGRollEarly, TSItemTemplate, TSWorldObject looted, TSPlayer looter, TSMutable<int32> result)
         ID_EVENT(OnDestroyEarly, TSItem, TSPlayer, TSMutable<bool>)
         ID_EVENT(OnTakenAsLoot, TSItem, TSLootItem, TSLoot, TSPlayer)
     } Item;

    struct QuestEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(QuestEvents)
        TSRegistryRef& get_registry_ref(uint32_t id) override;
        ID_EVENT(OnAccept, TSQuest, TSPlayer, TSObject questgiver)
        ID_EVENT(OnReward, TSQuest, TSPlayer, TSObject questgiver, uint32 value)
        ID_EVENT(OnSpellFinish, TSQuest, TSPlayer, TSSpell)
        ID_EVENT(OnObjectiveProgress, TSQuest, TSPlayer, uint32, uint16)
        ID_EVENT(OnStatusChanged, TSQuest, TSPlayer)
        ID_EVENT(OnRewardXP, TSQuest, TSPlayer, TSMutable<uint32>)
    } Quest;
#if TRINITY
    struct AreaTriggerEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(AreaTriggerEvents)
        ID_EVENT(OnTrigger, uint8, TSPlayer, TSMutable<bool>)
    } AreaTrigger;
#endif

    struct GameEventsEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(GameEventsEvents)
        ID_EVENT(OnStart,uint16 /*event_id*/)
        // todo: can we get a next_event_id here?
        ID_EVENT(OnUpdateState,uint16 cur_event_id)
        ID_EVENT(OnEnd,uint16 cur_event_id)
    } GameEvent;

    struct SmartActionEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(SmartActionEvents)
        ID_EVENT(OnActivateEarly, TSSmartScriptValues, TSMutable<bool> cancelAction, TSMutable<bool> cancelLink)
        ID_EVENT(OnActivateLate, TSSmartScriptValues, TSMutable<bool> cancelLink)
    } SmartAction;

    struct ConditionEvents: public TSMappedEventsDirect {
        EVENTS_HEADER(ConditionEvents)
        ID_EVENT(OnCheck, TSCondition condition, TSConditionSourceInfo, TSMutable<bool> condMeets)
    } Condition;

    struct CustomPacketEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(CustomPacketEvents)
        ID_EVENT(OnReceive, uint32 opcode, TSPacketRead, TSPlayer)
    } CustomPacket;

    struct WorldPacketEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(WorldPacketEvents)
        ID_EVENT(OnReceive, uint32 opcode, TSWorldPacket, TSPlayer)
        ID_EVENT(OnSend, TSWorldPacket, TSPlayer)
    } WorldPacket;
#if TRINITY
    struct TestEvents {
        TestEvents* operator->() { return this; }

        std::shared_ptr<TSManualTestBuilder> ManualTest(TSString mod, TSString name)
        {
            return RegisterManualTest(mod, name);
        }

        void AutomaticTest(TSString mod, TSString name, TSTestCallback callback)
        {
            return RegisterAutomaticTest(mod, name, callback);
        }

        void Unload()
        {
            UnloadTestModule();
        }
    } Test;
#endif
};

extern TC_GAME_API TSEvents ts_events;
