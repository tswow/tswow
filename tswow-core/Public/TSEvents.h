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
#include "TSArray.h"
#include "TSDamageInfo.h"
#include "TSSpell.h"
#include "TSWeather.h"

#include <cstdint>

void TC_GAME_API ReloadPlayer(std::function<void(TSPlayer, bool)> fn);
void TC_GAME_API ReloadPlayer(sol::protected_function);

void TC_GAME_API ReloadCreature(std::function<void(TSCreature)> fn);
void TC_GAME_API ReloadCreature(std::function<void(TSCreature)> fn, TSNumber<uint32> id);
void TC_GAME_API ReloadCreature(sol::protected_function);
void TC_GAME_API ReloadCreature(sol::protected_function, TSNumber<uint32> id);

void TC_GAME_API ReloadGameObject(std::function<void(TSGameObject)> fn);
void TC_GAME_API ReloadGameObject(std::function<void(TSGameObject)> fn, TSNumber<uint32> id);
void TC_GAME_API ReloadGameObject(sol::protected_function);
void TC_GAME_API ReloadGameObject(sol::protected_function, TSNumber<uint32> id);

void TC_GAME_API ReloadMap(std::function<void(TSMap)> fn);
void TC_GAME_API ReloadMap(std::function<void(TSMap)> fn, TSNumber<uint32> id);
void TC_GAME_API ReloadMap(sol::protected_function);
void TC_GAME_API ReloadMap(sol::protected_function, TSNumber<uint32> id);

void TC_GAME_API ReloadBattleground(std::function<void(TSBattleground)> fn);
void TC_GAME_API ReloadBattleground(std::function<void(TSBattleground)> fn, TSNumber<uint32> id);
void TC_GAME_API ReloadBattleground(sol::protected_function);
void TC_GAME_API ReloadBattleground(sol::protected_function, TSNumber<uint32> id);

void TC_GAME_API ReloadInstance(std::function<void(TSInstance)> fn);
void TC_GAME_API ReloadInstance(std::function<void(TSInstance)> fn, TSNumber<uint32> id);
void TC_GAME_API ReloadInstance(sol::protected_function);
void TC_GAME_API ReloadInstance(sol::protected_function, TSNumber<uint32> id);

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
         EVENT(OnMotdChange, std::string const&)
         EVENT(OnShutdownInitiate, TSNumber<uint32>, TSNumber<uint32>)
         EVENT(OnUpdate, TSNumber<uint32>, TSMainThreadContext)
         EVENT(OnStartup)
         EVENT(OnShutdownCancel)
         EVENT(OnShutdown)
         EVENT(OnCalcHonor
             , TSMutableNumber<float> honor
             , TSNumber<uint8> level
             , TSNumber<float> multiplier
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

    struct VehicleEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(VehicleEvents)
        TSRegistryRef& get_registry_ref(uint32_t id) override;
        ID_EVENT(OnInstall, TSVehicle)
        ID_EVENT(OnUninstall, TSVehicle)
        ID_EVENT(OnReset, TSVehicle)
        ID_EVENT(OnAddPassenger, TSVehicle, TSUnit, TSNumber<uint8>)
        ID_EVENT(OnRemovePassenger, TSVehicle, TSUnit, TSNumber<uint8>)
    } Vehicle;

    struct AchievementEvents : public TSMappedEventsDirect
    {
        EVENTS_HEADER(AchievementEvents)
        ID_EVENT(OnUpdate
            , TSPlayer
            , TSAchievementEntry
            , TSAchievementCriteriaEntry
            , TSNumber<uint32> progressType
            , TSNumber<uint32> timeElapsed
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
         EVENT(OnLevelChanged, TSPlayer, TSNumber<uint8>)
         EVENT(OnFreeTalentPointsChanged, TSPlayer, TSNumber<uint32>)
         EVENT(OnTalentsResetEarly, TSPlayer, TSMutable<bool,bool>)
         EVENT(OnTalentsReset, TSPlayer, bool)
         EVENT(OnTalentsResetLate, TSPlayer, bool /*noCost*/)
         EVENT(OnMoneyChanged, TSPlayer, TSMutableNumber<int32>)
         EVENT(OnMoneyLimit, TSPlayer, TSNumber<int32>)
         EVENT(OnGiveXP, TSPlayer, TSMutableNumber<uint32>, TSUnit)
         EVENT(OnReputationChange, TSPlayer, TSNumber<uint32>, TSMutableNumber<int32>, bool)
         EVENT(OnDuelRequest, TSPlayer, TSPlayer)
         EVENT(OnDuelStart, TSPlayer, TSPlayer)
         EVENT(OnDuelEnd, TSPlayer, TSPlayer, TSNumber<uint32>)
         EVENT(OnSay, TSPlayer, TSMutableString, TSNumber<uint32>, TSNumber<uint32>)
         EVENT(OnWhisper, TSPlayer, TSPlayer, TSMutableString, TSNumber<uint32>, TSNumber<uint32>)
         EVENT(OnChatGroup, TSPlayer, TSGroup, TSMutableString, TSNumber<uint32>, TSNumber<uint32>)
         EVENT(OnChatGuild, TSPlayer, TSGuild, TSMutableString, TSNumber<uint32>, TSNumber<uint32>)
         EVENT(OnChat, TSPlayer, TSChannel, TSMutableString, TSNumber<uint32>, TSNumber<uint32>)
         EVENT(OnCommand, TSPlayer, TSMutableString, TSMutable<bool,bool>)
         EVENT(OnEmote, TSPlayer, TSNumber<uint32>)
         EVENT(OnTextEmote, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, TSNumber<uint64>)
         EVENT(OnSpellCast, TSPlayer, TSSpell, bool)
         EVENT(OnLogin, TSPlayer, bool)
         EVENT_FN(OnReload, ReloadPlayer, TSPlayer, bool)
         EVENT(OnLogout, TSPlayer)
         EVENT(OnCreateEarly, TSPlayer)
         EVENT(OnCreate, TSPlayer)
         EVENT(OnDelete, TSNumber<uint64>, TSNumber<uint32>)
         EVENT(OnFailedDelete, TSNumber<uint64>, TSNumber<uint32>)
         EVENT(OnSave, TSPlayer)
         EVENT(OnBindToInstance, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, bool, TSNumber<uint8>)
         EVENT(OnUpdateZone, TSPlayer, TSNumber<uint32>, TSNumber<uint32>)
         EVENT(OnMapChanged, TSPlayer)
         EVENT(OnQuestObjectiveProgress, TSPlayer, TSQuest, TSNumber<uint32>, TSNumber<uint16>)
         EVENT(OnQuestStatusChange, TSPlayer, TSNumber<uint32>)
         EVENT(OnMovieComplete, TSPlayer, TSNumber<uint32>)
         EVENT(OnPlayerRepop, TSPlayer)
         EVENT(OnSendMail, TSPlayer, TSMailDraft, TSMutableNumber<uint32>)

         EVENT(OnActivateTaxiPathEarly, TSPlayer, TSMutable<bool, bool>)
         EVENT(OnSendDoFlight, TSPlayer, TSNumber<uint32>, TSMutableNumber<uint32>, TSMutable<bool, bool>)

         EVENT(OnGenerateItemLoot, TSPlayer, TSItem, TSLoot, TSNumber<uint32>)
         EVENT(OnLootCorpse, TSPlayer, TSCorpse)
         EVENT(OnLearnTalent, TSPlayer, TSNumber<uint32> tabId, TSNumber<uint32> talentId, TSNumber<uint32> talentRank, TSNumber<uint32> spellId, TSMutable<bool,bool>)

         EVENT(OnGossipSelect, TSPlayer, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, TSMutable<bool,bool>)
         EVENT(OnGossipSelectCode, TSPlayer, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, std::string const&, TSMutable<bool,bool>)

         EVENT(OnCastPetTalentAuras, TSPlayer, TSCreature)

         EVENT(OnCheckAreaIsPvP, TSPlayer, TSMutable<bool,bool>)

         EVENT(OnRewardHonorEarly, TSMutable<bool, bool>)

         EVENT(
             OnTradeCompleted
             , TSPlayer me
             , TSPlayer him
             , TSArray<TSItem> myItems
             , TSArray<TSItem> hisItems
             , TSNumber<uint32> myMoney
             , TSNumber<uint32> hisMoney
         );

         EVENT(OnUpdateDodgePercentage
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateBlockPercentage
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateParryPercentage
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateArmor
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateMaxHealth
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateMaxPower
             , TSPlayer
             , TSMutableNumber<float>
             , TSNumber<int8> power
             , TSNumber<float> bonus
         )
         EVENT(OnUpdateManaRegen
             , TSPlayer
             , TSMutableNumber<float>
             , TSMutableNumber<float>
             , TSMutableNumber<int32>
         );
        EVENT(OnUpdateMeleeHitChance
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateRuneRegen
             , TSPlayer
             , TSMutableNumber<float>
             , TSNumber<uint32> runeType
         )
         EVENT(OnUpdateExpertise
             , TSPlayer
             , TSMutableNumber<int32>
             , TSNumber<uint32> attackType
             , TSItem
         )
         EVENT(OnUpdateSpellCrit
             , TSPlayer
             , TSMutableNumber<float>
             , TSNumber<uint32> school
         )
         EVENT(OnUpdateArmorPenetration
             , TSPlayer
             , TSMutableNumber<int32>
         )
         EVENT(OnUpdateMeleeHitChances
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateRangedHitChances
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateSpellHitChances
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateResistance
             , TSPlayer
             , TSMutableNumber<float>
             , TSNumber<uint32> school
         )
         EVENT(OnUpdateShieldBlock
             , TSPlayer
             , TSMutableNumber<uint32>
         )
         EVENT(OnUpdateCrit
             , TSPlayer
             , TSMutableNumber<float>
             , TSNumber<uint32> attackType
         )
         EVENT(OnCalcGreyLevel
             , TSPlayer killer
             , TSMutableNumber<uint8> greyLevel
         )
         EVENT(OnCalcZeroDiff
             , TSPlayer killer
             , TSMutableNumber<uint8> zeroDiff
         )
         EVENT(OnCalcGroupGain
             , TSPlayer killer
             , TSMutableNumber<float> groupRate
             , TSNumber<uint32> count
             , bool isRaid
         )

         EVENT(OnCalcStaminaHealthBonus
             , TSPlayer
             , TSMutableNumber<float>
             , TSNumber<float>
             , TSNumber<float>
         );
        EVENT(OnCalcIntellectManaBonus
             , TSPlayer
             , TSMutableNumber<float>
             , TSNumber<float>
             , TSNumber<float>
         );
         EVENT(OnCalcSkillGainChance
             , TSPlayer
             , TSMutableNumber<int32>
             , TSNumber<int>
             , TSNumber<int>
             , TSNumber<int>
             , TSNumber<int>
             , TSNumber<int>
         )

         EVENT(OnUpdateAttackPower
             , TSPlayer
             , TSMutableNumber<float>
         )
         EVENT(OnUpdateRangedAttackPower
             , TSPlayer
             , TSMutableNumber<float>
         )

         EVENT(OnCalcTalentPoints
             , TSPlayer
             , TSMutableNumber<uint32>
         )

         EVENT(OnGlyphInitForLevel
             , TSPlayer
             , TSMutableNumber<uint32> /* active glyph slots bitmask 0x3F = 0x01 | 0x02 | 0x04 | 0x08 | 0x10 | 0x20 for 80 level */
         )

         EVENT(OnReputationPriceDiscount
            , TSPlayer player
            , TSFactionTemplate faction
            , TSCreature creature
            , TSMutableNumber<float> money
         )

         EVENT(OnCalcKillXP, TSPlayer, TSMutableNumber<uint32>)
    } Player;

    struct AccountEvents
    {
         EVENTS_HEADER(AccountEvents)
         EVENT(OnAccountLogin, TSNumber<uint32>)
         EVENT(OnFailedAccountLogin, TSNumber<uint32>)
         EVENT(OnEmailChange, TSNumber<uint32>)
         EVENT(OnFailedEmailChange, TSNumber<uint32>)
         EVENT(OnPasswordChange, TSNumber<uint32>)
         EVENT(OnFailedPasswordChange, TSNumber<uint32>)
    } Account;

    struct GuildEvents
    {
         EVENTS_HEADER(GuildEvents)
         EVENT(OnAddMember, TSGuild, TSPlayer, TSMutableNumber<uint8>)
         EVENT(OnRemoveMember, TSGuild, TSPlayer, bool, bool)
         EVENT(OnMOTDChanged, TSGuild, std::string const&)
         EVENT(OnInfoChanged, TSGuild, std::string const&)
         EVENT(OnCreate, TSGuild, TSPlayer, std::string const&)
         EVENT(OnDisband, TSGuild)
         EVENT(OnMemberWitdrawMoney, TSGuild, TSPlayer, TSMutableNumber<uint32>, bool)
         EVENT(OnMemberDepositMoney, TSGuild, TSPlayer, TSMutableNumber<uint32>)
         EVENT(OnEvent, TSGuild, TSNumber<uint8>, TSNumber<uint32>, TSNumber<uint32>, TSNumber<uint8>)
         EVENT(OnBankEvent, TSGuild, TSNumber<uint8>, TSNumber<uint8>, TSNumber<uint32>, TSNumber<uint32>, TSNumber<uint16>, TSNumber<uint8>)
    } Guild;

    struct GroupEvents
    {
         EVENTS_HEADER(GroupEvents)
         EVENT(OnAddMember, TSGroup, TSNumber<uint64> member_id)
         EVENT(OnInviteMember, TSGroup, TSNumber<uint64> member_id)
         EVENT(OnRemoveMember, TSGroup, TSNumber<uint64> member_id, TSNumber<uint32>, TSNumber<uint64>, std::string const&)
         EVENT(OnChangeLeader, TSGroup, TSNumber<uint64>, TSNumber<uint64>)
         EVENT(OnDisband, TSGroup)
    } Group;

    struct UnitEvents
    {
        EVENTS_HEADER(UnitEvents)
        EVENT(OnCalcMissChance
            , TSUnit
            , TSMutableNumber<float>
        )
        EVENT(OnCalcHeal
            , TSUnit
            , TSUnit
            , TSMutableNumber<uint32>
        )
        EVENT(OnMeleeDamageEarly
            , TSMeleeDamageInfo
            , TSMutableNumber<uint32>
            , TSNumber<uint32>
            , TSNumber<uint32>
        )
        // @epoch-start
        EVENT(OnMeleeDamage
            , TSMeleeDamageInfo
            , TSMutableNumber<uint32>
            , TSNumber<uint32>
            , TSNumber<uint32>
        )
        // @epoch-end
        EVENT(OnMeleeDamageLate
            , TSMeleeDamageInfo
            , TSMutableNumber<uint32>
            , TSNumber<uint32>
            , TSNumber<uint32>
        )
        EVENT(OnCalcMeleeCrit
            , TSUnit
            , TSUnit
            , TSMutableNumber<float>
            , TSNumber<uint32>
        )
        EVENT(OnCalcMeleeOutcome
            , TSUnit
            , TSUnit
            , TSMutableNumber<float>
            , TSMutableNumber<float>
            , TSMutableNumber<float>
            , TSMutableNumber<float>
            , TSMutableNumber<float>
            , TSNumber<uint32>
        );
        EVENT(OnCalcThreatEarly
            , TSUnit
            , TSUnit
            , TSMutableNumber<float>
            , TSSpellInfo
            , bool
        );
        EVENT(OnCalcThreatLate
            , TSUnit
            , TSUnit
            , TSMutableNumber<float>
            , TSSpellInfo
            , bool
        );
        EVENT(OnCalcScaleThreat
            , TSUnit
            , TSUnit
            , TSMutableNumber<float>
            , bool
        );
        EVENT(OnDeathEarly, TSUnit victim, TSUnit killer)
        EVENT(OnDeath, TSUnit victim, TSUnit killer)
        EVENT(OnEnterCombat, TSUnit unit)
        EVENT(OnExitCombat, TSUnit unit)
        EVENT(OnEnterCombatWith, TSUnit me, TSUnit other)
        EVENT(OnExitCombatWith, TSUnit me, TSUnit other)
        EVENT(OnSetTarget, TSUnit, TSNumber<uint64> new_target, TSNumber<uint64> old_target)
        EVENT(OnLiquidStatusChanged, TSUnit, TSMutableNumber<uint32> newStatus);
        EVENT(OnOutdoorsChanged, TSUnit, TSMutable<bool,bool> isOutdoors);

        /** @epoch-start */
        EVENT(OnInitPossessCreateSpells, TSUnit, TSNumber<uint8>, TSMutableNumber<uint32> spell_id);
        EVENT(OnInitCharmCreateSpells, TSUnit, TSNumber<uint8>, TSMutableNumber<uint32> spell_id);
        /** @epoch-end */
    } Unit;

    struct SpellEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(SpellEvents)
        TSRegistryRef& get_registry_ref(uint32 id) override;

        ID_EVENT(OnLearn, TSSpellInfo, TSPlayer, bool active, bool disabled, bool superceded, TSNumber<std::uint32_t> from_skill)
        ID_EVENT(OnUnlearnTalent, TSSpellInfo, TSPlayer, TSNumber<std::uint32_t> tab_index, TSNumber<std::uint32_t> tier, TSNumber<std::uint32_t> column, TSNumber<std::uint32_t> rank, bool direct)
        ID_EVENT(OnLearnTalent, TSSpellInfo, TSPlayer, TSNumber<uint32> tabId, TSNumber<uint32> talentId, TSNumber<uint32> talentRank, TSNumber<uint32> spellId, TSMutable<bool, bool>)
        ID_EVENT(OnUnlearn, TSSpellInfo, TSPlayer, bool disabled, bool learn_low_rank)

        ID_EVENT(OnCast, TSSpell)
        ID_EVENT(OnCheckCast, TSSpell, TSMutableNumber<uint8>)
        // @epoch-start
        ID_EVENT(OnCheckFishingCast, TSSpell, TSWorldObject, TSNumber<uint32>, TSMutableNumber<uint8>)
        // @epoch-end
        ID_EVENT(OnSuccessfulDispel, TSSpell, TSNumber<uint32>)
        ID_EVENT(OnCancel, TSSpell, TSNumber<uint32> oldState)
        ID_EVENT(OnEffect, TSSpell, TSMutable<bool,bool> preventDefault, TSSpellEffectInfo, TSNumber<uint32> mode, TSUnit unitTarget, TSItem itemTarget, TSGameObject gameObjectTarget, TSCorpse corpseTarget)
        ID_EVENT(OnEffectApplyGlyph
            , TSSpell
            , TSMutable<bool,bool> isLocked
        )
        ID_EVENT(OnCalcEnchantDuration, TSSpell, TSMutable<uint32,uint32> duration)
        ID_EVENT(OnHit, TSSpell)
        ID_EVENT(OnTick, TSAuraEffect)
        ID_EVENT(OnRemove, TSAuraEffect, TSAuraApplication, TSNumber<uint32>)
        ID_EVENT(OnApply, TSAuraEffect, TSAuraApplication, TSNumber<uint32>)
        ID_EVENT(OnDamageEarly, TSSpell, TSMutableNumber<int32>, TSSpellDamageInfo, TSNumber<uint32>, bool, TSNumber<uint32> effectMask)
        // @epoch-start
        ID_EVENT(OnDamage, TSSpell, TSMutableNumber<int32>, TSSpellDamageInfo, TSNumber<uint32>, bool, TSNumber<uint32> effectMask)
        // @epoch-end
        ID_EVENT(OnDamageLate, TSSpell, TSMutableNumber<uint32>, TSSpellDamageInfo, TSNumber<uint32>, bool, TSNumber<uint32> effectMask)
        ID_EVENT(OnPeriodicDamage, TSAuraEffect, TSMutableNumber<uint32>)
        ID_EVENT(OnCalcSpellPowerLevelPenalty
            , TSSpellInfo spell
            , TSMutableNumber<float> penalty
            , TSUnit caster
        )
        ID_EVENT(OnTrainerSend, TSSpellInfo spell, TSNumber<uint32> trainerId, TSPlayer receiver, TSMutable<bool,bool> allowTrain)
        ID_EVENT(OnCalcMiss, TSSpell, TSUnit, TSMutableNumber<uint32>, TSMutableNumber<uint32>)
        ID_EVENT(OnCalcCrit, TSSpell, TSMutableNumber<float>)
        ID_EVENT(OnCalcAuraCrit, TSAuraEffect, TSMutableNumber<float>)
        ID_EVENT(OnCalcReflect, TSSpellInfo, TSMutableNumber<int32>, TSWorldObject, TSUnit)
        ID_EVENT(OnCalcHit, TSSpellInfo, TSMutableNumber<int32>, TSWorldObject, TSUnit)
        ID_EVENT(OnCalcResist, TSSpellInfo, TSMutableNumber<int32>, TSWorldObject, TSUnit)
        ID_EVENT(OnCalcMeleeMiss, TSSpellInfo, TSMutableNumber<float>, TSUnit, TSUnit, TSNumber<uint8> attackType, TSNumber<int32> skillDiff)

        ID_EVENT(OnCheckAreaTarget, TSAura, TSUnit, TSMutable<bool,bool> result, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnCheckEffectProc, TSAuraEffect, TSAuraApplication, TSProcEventInfo, TSMutable<bool,bool> result, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnCheckProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool,bool> result, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectPeriodic, TSAuraEffect, TSAuraApplication, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectProc, TSAuraEffect, TSAuraApplication, TSProcEventInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnPrepareProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool,bool> prepare, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool,bool> handled, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnAfterDispel, TSAura, TSDispelInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnAfterEffectApply, TSAuraEffect, TSAuraApplication, TSNumber<uint32> modes, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnAfterEffectProc, TSAuraEffect, TSAuraApplication, TSProcEventInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnAfterEffectRemove, TSAuraEffect, TSAuraApplication, TSNumber<uint32> modes, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnAfterProc, TSAuraApplication, TSProcEventInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnDispel, TSAura, TSDispelInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectAbsorb, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutableNumber<uint32> absorbAmount, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectAfterAbsorb, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutableNumber<uint32> absorbAmount, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectAfterManaShield, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutableNumber<uint32> absorbAmount, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectCalcAmount, TSAuraEffect, TSMutableNumber<int32> amount, TSMutable<bool,bool> canBeRecalculated, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectCalcPeriodic, TSAuraEffect, TSMutable<bool,bool> isPeriodic, TSMutableNumber<int32> amplitude, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectCalcSpellMod, TSAuraEffect, TSSpellModifier, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectManaShield, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutableNumber<uint32> absorbAmount, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnEffectSplit, TSAuraEffect, TSAuraApplication, TSDamageInfo, TSMutableNumber<uint32> splitAmount, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnSetDuration, TSAura, TSMutableNumber<int32> duration, TSMutable<bool,bool> withMods);
        ID_EVENT(OnAfterCast, TSSpell, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnAfterHit, TSSpell, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnBeforeCast, TSSpell, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnBeforeHit, TSSpell, TSNumber<uint32>, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnDestinationTargetSelect, TSSpell, TSSpellDestination, TSNumber<uint32> index, TSSpellImplicitTargetInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnObjectAreaTargetSelect, TSSpell, TSWorldObjectCollection, TSNumber<uint32> index, TSSpellImplicitTargetInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnObjectTargetSelect, TSSpell, TSMutableWorldObject, TSNumber<uint32> index, TSSpellImplicitTargetInfo, TSMutable<bool,bool> cancelDefault)
        ID_EVENT(OnOnResistAbsorbCalculate, TSSpell, TSDamageInfo, TSMutableNumber<uint32> resistAmount, TSMutableNumber<int32> absorbAmount, TSMutable<bool,bool> cancelDefault)
            /** @epoch-start */
        ID_EVENT(OnHealEarly, TSSpellInfo, TSUnit, TSMutableNumber<uint32>)
            /** @epoch-end */
        ID_EVENT(OnHealLate, TSSpellInfo, TSUnit, TSUnit, TSNumber<uint32>, TSNumber<uint32>, bool)
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
        ID_EVENT(OnDespawn, TSCreature, TSWorldObject)
        ID_EVENT(OnSummonDies, TSCreature, TSCreature, TSUnit)
        ID_EVENT(OnHitBySpell, TSCreature, TSWorldObject, TSSpellInfo)
        ID_EVENT(OnSpellHitTarget, TSCreature, TSWorldObject, TSSpellInfo)
        ID_EVENT(OnSpellCastFinished, TSCreature, TSSpellInfo, TSNumber<uint32>)
        ID_EVENT(OnJustAppeared, TSCreature)
        ID_EVENT(OnCharmed, TSCreature, bool)
        ID_EVENT(OnReachedHome, TSCreature)
        ID_EVENT(OnReceiveEmote, TSCreature, TSPlayer, TSNumber<uint32>)
        ID_EVENT(OnOwnerAttacked, TSCreature, TSUnit)
        ID_EVENT(OnOwnerAttacks, TSCreature, TSUnit)
        ID_EVENT(OnCorpseRemoved, TSCreature, TSNumber<uint32>)
        ID_EVENT(OnWaypointStarted, TSCreature, TSNumber<uint32>, TSNumber<uint32>)
        ID_EVENT(OnWaypointReached, TSCreature, TSNumber<uint32>, TSNumber<uint32>)
        ID_EVENT(OnWaypointPathEnded, TSCreature, TSNumber<uint32>, TSNumber<uint32>)
        ID_EVENT(OnMovementInform, TSCreature, TSNumber<uint32>, TSNumber<uint32>)
        ID_EVENT(OnPassengerBoarded, TSCreature, TSUnit, TSNumber<int8>, bool)
        ID_EVENT(OnSpellClick, TSCreature, TSUnit, bool)
        ID_EVENT(OnCombatTick, TSCreature, TSNumber<uint32>)
        ID_EVENT(OnGenerateLoot, TSCreature, TSPlayer)
        ID_EVENT(OnCreate, TSCreature, TSMutable<bool,bool>)
        ID_EVENT_FN(OnReload, ReloadCreature, TSCreature)
        ID_EVENT(OnRemove, TSCreature)

        ID_EVENT(OnGossipHello, TSCreature, TSPlayer, TSMutable<bool,bool>)
        ID_EVENT(OnGossipSelect, TSCreature, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, TSMutable<bool,bool>)
        ID_EVENT(OnGossipSelectCode, TSCreature, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, std::string const&, TSMutable<bool,bool>)
        ID_EVENT(OnQuestAccept, TSCreature, TSPlayer, TSQuest)
        ID_EVENT(OnQuestReward, TSCreature, TSPlayer, TSQuest, TSNumber<uint32>)

        ID_EVENT(OnCanGeneratePickPocketLoot, TSCreature, TSPlayer, TSMutable<bool,bool>)
        ID_EVENT(OnGeneratePickPocketLoot, TSCreature, TSPlayer, TSLoot)
        ID_EVENT(OnGenerateSkinningLoot, TSCreature, TSPlayer, TSLoot)

        ID_EVENT(OnUpdateLvlDepMaxHealth
            , TSCreature
            , TSMutableNumber<uint32> maxHealth
            , TSNumber<float> rankHealthMod
            , TSNumber<uint32> basehp
        )
        // extension: add "ForceMana" mutable after maxMana for ignoring creature class (not sure it works well)
        ID_EVENT(OnUpdateLvlDepMaxMana
            , TSCreature
            , TSMutableNumber<uint32> maxMana
            , TSNumber<float> baseMana
        )
        ID_EVENT(OnUpdateLvlDepBaseDamage
            , TSCreature
            , TSMutableNumber<float> baseMinDamage
            , TSMutableNumber<float> baseMaxDamage
            , TSNumber<float> baseDamageIn
        )
        ID_EVENT(OnUpdateLvlDepArmor
            , TSCreature
            , TSMutableNumber<float> armorOut
            , TSNumber<float> baseArmor
        )
        ID_EVENT(OnUpdateLvlDepAttackPower
            , TSCreature
            , TSMutableNumber<uint32> attackPower
            , TSMutableNumber<uint32> rangedAttackPower
        )
        ID_EVENT(OnSendVendorItem, TSCreature vendor, TSItemTemplate item, TSPlayer player, TSMutable<bool,bool> shouldSend)
        ID_EVENT(OnUpdateResistance
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
            , TSNumber<uint32> school
        )
        ID_EVENT(OnUpdateArmor
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateMaxHealth
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateMaxPower
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
            , TSNumber<int8> powerType
        )
        ID_EVENT(OnUpdateAttackPowerDamage
            , TSCreature
            , TSMutableNumber<float> base
            , TSMutableNumber<float> mod
            , TSMutableNumber<float> multiplier
            , bool isGuardian
            , bool ranged
        )
        ID_EVENT(OnUpdateDamagePhysical
            , TSCreature
            , TSMutableNumber<float>
            , TSMutableNumber<float>
            , bool isGuardian
            , TSNumber<uint8> attType
        )
        // @epoch-start
        ID_EVENT(OnUpdateSpellPower
            , TSCreature
            , TSMutableNumber<int32>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateStamina
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateAgility
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateStrength
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateIntellect
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
        )
        ID_EVENT(OnUpdateSpirit
            , TSCreature
            , TSMutableNumber<float>
            , bool isGuardian
        )
        // @epoch-end
        ID_EVENT(OnCalcColorCode
            , TSCreature
            , TSMutableNumber<uint8> code
            , TSPlayer
            , TSNumber<uint32> playerLevel
            , TSNumber<uint32> creatureLevel
        )
        ID_EVENT(OnCalcGain
            , TSCreature victim
            , TSMutableNumber<uint32>
            , TSPlayer killer
        )
        ID_EVENT(OnCalcBaseGain
            , TSCreature victim
            , TSMutableNumber<uint32>
            , TSPlayer killer
        )

        /** @epoch-start */
        ID_EVENT(OnCheckHasSpell, TSCreature creature, TSNumber<uint32>, TSMutable<bool, bool>)
        /** @epoch-end */
    } Creature;

    struct GameObjectEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(GameObjectEvents)
        TSRegistryRef& get_registry_ref(uint32_t id) override;
        ID_EVENT(OnUpdate, TSGameObject, TSNumber<uint32>)
        ID_EVENT(OnDialogStatus, TSGameObject, TSPlayer)
        ID_EVENT(OnDestroyed, TSGameObject, TSWorldObject)
        ID_EVENT(OnDamaged, TSGameObject, TSWorldObject)
        ID_EVENT(OnLootStateChanged, TSGameObject, TSNumber<uint32>, TSUnit)
        ID_EVENT(OnGOStateChanged, TSGameObject, TSNumber<uint32>)
        ID_EVENT(OnGossipHello, TSGameObject, TSPlayer, TSMutable<bool,bool>)
        ID_EVENT(OnGossipSelect, TSGameObject, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, TSMutable<bool,bool>)
        ID_EVENT(OnGossipSelectCode, TSGameObject, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, std::string const&, TSMutable<bool,bool>)
        ID_EVENT(OnCreate, TSGameObject, TSMutable<bool,bool>)
        ID_EVENT_FN(OnReload, ReloadGameObject, TSGameObject)
        ID_EVENT(OnRemove, TSGameObject)
        ID_EVENT(OnUse, TSGameObject, TSUnit, TSMutable<bool,bool>)
        ID_EVENT(OnQuestAccept, TSGameObject, TSPlayer, TSQuest)
        ID_EVENT(OnQuestReward, TSGameObject, TSPlayer, TSQuest, TSNumber<uint32>)
        ID_EVENT(OnGenerateLoot, TSGameObject, TSPlayer)
        ID_EVENT(OnGenerateFishLoot, TSGameObject, TSPlayer, TSLoot, bool)
    } GameObject;

    struct MapEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(MapEvents)
        ID_EVENT(OnCreate, TSMap)
        ID_EVENT_FN(OnReload, ReloadMap, TSMap)
        ID_EVENT(OnUpdate, TSMap, TSNumber<uint32>)
        ID_EVENT(OnUpdateDelayed, TSMap, TSNumber<uint32>, TSMainThreadContext)
        ID_EVENT(OnPlayerEnter, TSMap, TSPlayer)
        ID_EVENT(OnPlayerLeave, TSMap, TSPlayer)
        ID_EVENT(OnCreatureCreate, TSMap, TSCreature, TSMutable<bool,bool>)
        ID_EVENT(OnCreatureRemove, TSMap, TSCreature)
        ID_EVENT(OnGameObjectCreate, TSMap, TSGameObject, TSMutable<bool,bool>)
        ID_EVENT(OnGameObjectRemove, TSMap, TSGameObject)
        ID_EVENT(OnCheckEncounter, TSMap, TSPlayer)
        ID_EVENT(OnWeatherUpdate, TSMap, TSWeather)
        ID_EVENT(OnWeatherChange, TSMap, TSWeather)
    } Map;

    struct BattlegroundEvents : public TSMappedEventsDirect
    {
        EVENTS_HEADER(BattlegroundEvents)
        ID_EVENT(OnCanCreate, TSBattleground, TSMutable<bool,bool>)
        ID_EVENT(OnCreate, TSBattleground)
        ID_EVENT_FN(OnReload, ReloadBattleground, TSBattleground)
        ID_EVENT(OnAddPlayer, TSBattleground, TSPlayer)
        ID_EVENT(OnPlayerLogin, TSBattleground, TSPlayer)
        ID_EVENT(OnPlayerLogout, TSBattleground, TSPlayer)
        ID_EVENT(OnUpdateScore, TSBattleground, TSPlayer, TSNumber<uint32> type, bool isAddHonor, TSMutableNumber<uint32> value)
        ID_EVENT(OnUpdateEarly, TSBattleground, TSNumber<uint32> diff)
        ID_EVENT(OnUpdateLate, TSBattleground, TSNumber<uint32> diff)
        ID_EVENT(OnKillPlayer, TSBattleground, TSPlayer victim, TSPlayer killer)
        ID_EVENT(OnEndEarly, TSBattleground, TSMutableNumber<uint32> winner)
        ID_EVENT(OnEndLate, TSBattleground, TSNumber<uint32> winner)
        ID_EVENT(OnAddGameObject
            , TSBattleground
            , TSNumber<uint32> type
            , TSMutableNumber<uint32> entry
            , TSMutableNumber<uint8> goState
            , TSMutableNumber<float> x
            , TSMutableNumber<float> y
            , TSMutableNumber<float> z
            , TSMutableNumber<float> o
            , TSMutableNumber<float> rot0
            , TSMutableNumber<float> rot1
            , TSMutableNumber<float> rot2
            , TSMutableNumber<float> rot3
        )
        ID_EVENT(OnAddCreature
            , TSBattleground
            , TSNumber<uint32> type
            , TSMutableNumber<uint32> entry
            , TSMutableNumber<float> x
            , TSMutableNumber<float> y
            , TSMutableNumber<float> z
            , TSMutableNumber<float> o
            , TSMutableNumber<uint32> respawnTime
        )
        ID_EVENT(OnAddSpiritGuide
            , TSBattleground
            , TSNumber<uint32> type
            , TSMutableNumber<uint32> entry
            , TSMutableNumber<uint8> teamId
            , TSMutableNumber<float> x
            , TSMutableNumber<float> y
            , TSMutableNumber<float> z
            , TSMutableNumber<float> o
        )
        ID_EVENT(OnKillCreature, TSBattleground, TSCreature victim, TSPlayer killer)
        ID_EVENT(OnRemovePlayer, TSBattleground, TSNumber<uint64> guid, TSPlayer, TSNumber<uint32> team)
        ID_EVENT(OnPlayerUnderMap, TSBattleground, TSPlayer, TSMutable<bool,bool> handled)
        ID_EVENT(OnGenericEvent, TSBattleground, TSWorldObject, TSNumber<uint32> eventId, TSWorldObject invoker)
        ID_EVENT(OnClickFlag, TSBattleground, TSPlayer, TSGameObject flag_obj)
        ID_EVENT(OnDropFlag, TSBattleground, TSPlayer)
        ID_EVENT(OnDestroyGate, TSBattleground, TSPlayer destroyer, TSGameObject target)
        ID_EVENT(OnOpenDoors, TSBattleground)
        ID_EVENT(OnCloseDoors, TSBattleground)
        ID_EVENT(OnReset, TSBattleground)
        ID_EVENT(OnSendScore, TSBattleground, TSBattlegroundScore, TSWorldPacket, TSMutable<bool,bool> cancel)
        // requires special handling functions
        ID_EVENT(OnAchievementCriteria
            , TSBattleground
            , TSNumber<uint32> criteriaId
            , TSPlayer player
            , TSUnit target
            , TSNumber<uint32> miscvalueA
            , TSMutable<bool,bool> handled
        )
        ID_EVENT(OnAreaTrigger, TSBattleground, TSPlayer, TSNumber<uint32> trigger, TSMutable<bool,bool> handled)
        ID_EVENT(
            OnWeight
            , TSNumber<uint32> bgType
            , TSMutableNumber<float> weight
            , TSNumber<uint32> origType
        )
        ID_EVENT(
            OnSelect
            , TSMutableNumber<uint32> bgType
        )

        ID_EVENT(OnPlayerCapturedFlag, TSBattleground, TSPlayer, TSNumber<uint32> object);
        ID_EVENT(OnPlayerReturnedFlag, TSBattleground, TSPlayer);
        ID_EVENT(OnPlayerCapturedAreaPoint, TSBattleground, TSPlayer, TSNumber<uint32> point);
    } Battleground;

    struct InstanceEvents : public TSMappedEventsDirect
    {
        EVENTS_HEADER(InstanceEvents)
        ID_EVENT(OnCreate, TSInstance)
        ID_EVENT_FN(OnReload, ReloadInstance, TSInstance)
        ID_EVENT(OnLoad, TSInstance, bool)
        ID_EVENT(OnSave, TSInstance)
        ID_EVENT(OnUpdate, TSInstance, TSNumber<uint32> diff)
        ID_EVENT(OnPlayerEnter, TSInstance, TSPlayer)
        ID_EVENT(OnPlayerLeave, TSInstance, TSPlayer)
        ID_EVENT(OnBossStateChange, TSInstance, TSNumber<uint32> id, TSNumber<uint32> state)
        ID_EVENT(OnCanKillBoss, TSInstance, TSNumber<uint32> bossId, TSPlayer player, TSMutable<bool,bool> canKill)
        ID_EVENT(OnFillInitialWorldStates, TSInstance, TSWorldStatePacket)
        ID_EVENT(OnSetBossNumber, TSInstance, TSMutableNumber<uint32>)
        ID_EVENT(OnLoadBossBoundaries, TSInstance)
        ID_EVENT(OnLoadMinionData, TSInstance)
        ID_EVENT(OnLoadDoorData, TSInstance)
        ID_EVENT(OnLoadObjectData, TSInstance)
        ID_EVENT(OnCreatureCreate, TSInstance, TSCreature)
        ID_EVENT(OnGameObjectCreate, TSInstance, TSGameObject)
        ID_EVENT(OnWriteSaveDataMore, TSInstance, TSMutable<TSArray<uint32>, TSArray<uint32>>)
        ID_EVENT(OnBeforeReadSaveDataMore, TSInstance, TSMutable<uint8, uint8>)
        ID_EVENT(OnReadSaveDataMore, TSInstance, TSArray<uint32>)
        ID_EVENT(OnDataSet, TSInstance, TSNumber<uint32> type, TSNumber<uint32> data)
        ID_EVENT(OnDataGet, TSInstance, TSNumber<uint32> type, TSMutableNumber<uint32> data)
    } Instance;

     struct ItemEvents : public TSMappedEventsRegistry
     {
         EVENTS_HEADER(ItemEvents)
         TSRegistryRef& get_registry_ref(uint32_t id);
         ID_EVENT(OnUse, TSItem, TSPlayer, void*, TSMutable<bool,bool>)
         ID_EVENT(OnExpire, TSItemTemplate, TSPlayer, TSMutable<bool,bool>)
         ID_EVENT(OnRemove, TSItem, TSPlayer, TSMutable<bool,bool>)
         ID_EVENT(OnCastSpell, TSItem, TSPlayer, TSUnit, TSSpellInfo, TSMutable<bool,bool>)
         ID_EVENT(OnQuestAccept, TSItem, TSPlayer, TSQuest)
         ID_EVENT(OnGossipHello, TSItem, TSPlayer, TSMutable<bool,bool>)
         ID_EVENT(OnGossipSelect, TSItem, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, TSMutable<bool,bool>)
         ID_EVENT(OnGossipSelectCode, TSItem, TSPlayer, TSNumber<uint32>, TSNumber<uint32>, std::string const&, TSMutable<bool,bool>)
         ID_EVENT(OnCanChangeEquipState, TSItemTemplate, TSMutable<bool,bool>)
         ID_EVENT(OnUnequip, TSItem, TSPlayer, bool, TSMutableNumber<uint32> result)
         ID_EVENT(OnBank, TSItem, TSPlayer, TSNumber<uint8> bag, TSNumber<uint8> slot, bool swap, TSMutableNumber<uint32> result)
         ID_EVENT(OnCanEquip, TSItem, TSPlayer, TSNumber<uint8> slot, bool swap, TSMutableNumber<uint32> result)
         ID_EVENT(OnEquip, TSItem, TSPlayer, TSNumber<uint8> slot, bool isMerge)
         ID_EVENT(OnCanUse, TSItem, TSPlayer, TSMutableNumber<uint32> result)
         ID_EVENT(OnCanUseType, TSItemTemplate, TSPlayer, TSMutableNumber<uint32> result)
         ID_EVENT(OnLFGRollEarly, TSItemTemplate, TSWorldObject looted, TSPlayer looter, TSMutableNumber<int32> result)
         ID_EVENT(OnDestroyEarly, TSItem, TSPlayer, TSMutable<bool,bool>)
         ID_EVENT(OnTakenAsLoot, TSItem, TSLootItem, TSLoot, TSPlayer)
         ID_EVENT(OnCalculateFeralAttackPower, TSItemTemplate, TSNumber<int32>, TSMutableNumber<int32> result)
         ID_EVENT(OnBeforeSendItemQuery, TSItemTemplate, TSMutable<bool,bool>)
         ID_EVENT(OnCreate, TSItem)
     } Item;

    struct QuestEvents : public TSMappedEventsRegistry
    {
        EVENTS_HEADER(QuestEvents)
        TSRegistryRef& get_registry_ref(uint32_t id) override;
        ID_EVENT(OnAccept, TSQuest, TSPlayer, TSObject questgiver)
        ID_EVENT(OnReward, TSQuest, TSPlayer, TSObject questgiver, TSNumber<uint32> value)
        ID_EVENT(OnSpellFinish, TSQuest, TSPlayer, TSSpell)
        ID_EVENT(OnObjectiveProgress, TSQuest, TSPlayer, TSNumber<uint32>, TSNumber<uint16>)
        ID_EVENT(OnStatusChanged, TSQuest, TSPlayer)
        ID_EVENT(OnRewardXP, TSQuest, TSPlayer, TSMutableNumber<uint32>)
        ID_EVENT(OnCalcXP, TSQuest, TSPlayer, TSMutableNumber<uint32>)
        ID_EVENT(OnSendQuestGiverDetails, TSQuest)
        ID_EVENT(OnQuery, TSQuest, TSMutable<bool,bool>)
    } Quest;

    struct AreaTriggerEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(AreaTriggerEvents)
        ID_EVENT(OnTrigger, TSAreaTriggerEntry, TSPlayer, TSMutable<bool,bool>)
    } AreaTrigger;

    struct GameEventsEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(GameEventsEvents)
        ID_EVENT(OnStart, TSNumber<uint16>/*event_id*/, TSMainThreadContext)
        // todo: can we get a next_event_id here?
        ID_EVENT(OnUpdateState, TSNumber<uint16> cur_event_id)
        ID_EVENT(OnEnd, TSNumber<uint16> cur_event_id)
    } GameEvent;

    struct SmartActionEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(SmartActionEvents)
        ID_EVENT(OnActivateEarly, TSSmartScriptValues, TSMutable<bool,bool> cancelAction, TSMutable<bool,bool> cancelLink)
        ID_EVENT(OnActivateLate, TSSmartScriptValues, TSMutable<bool,bool> cancelLink)
    } SmartAction;

    struct ConditionEvents: public TSMappedEventsDirect {
        EVENTS_HEADER(ConditionEvents)
        ID_EVENT(OnCheck, TSCondition condition, TSConditionSourceInfo, TSMutable<bool,bool> condMeets)
    } Condition;

    struct CustomPacketEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(CustomPacketEvents)
        ID_EVENT(OnReceive, TSNumber<uint32> opcode, TSPacketRead, TSPlayer)
    } CustomPacket;

    struct WorldPacketEvents : public TSMappedEventsDirect {
        EVENTS_HEADER(WorldPacketEvents)
        ID_EVENT(OnReceive, TSNumber<uint32> opcode, TSWorldPacket, TSPlayer)
        ID_EVENT(OnSend, TSWorldPacket, TSPlayer)
    } WorldPacket;
#if TRINITY
    struct TestEvents {
        TestEvents* operator->() { return this; }

        std::shared_ptr<TSManualTestBuilder> ManualTest(std::string const& mod, std::string const& name)
        {
            return RegisterManualTest(mod, name);
        }

        void AutomaticTest(std::string const& mod, std::string const& name, TSTestCallback callback)
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
