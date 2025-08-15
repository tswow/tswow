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

#include "TSIncludes.h"
#include "TSUnit.h"
#include "TSPlayer.h"
#include "TSAura.h"
#include "TSSpell.h"
#include "TSVehicle.h"
#include "TSCreature.h"
#include "TSItem.h"
#include "TSMap.h"
#include "TSGUID.h"

#include "Object.h"
#include "Unit.h"
#include "Chat.h"
#include "Unit.h"
#include "SpellMgr.h"
#include "SpellInfo.h"
#include "SpellAuraDefines.h"
#include "MotionMaster.h"
#include "Unit.h"
#include "Player.h"
#include "SpellHistory.h"
#include "SpellMgr.h"

#include <memory.h>

TSUnit::TSUnit(Unit *unit) : TSWorldObject(unit)
{
    this->unit = unit;
}

TSUnit::TSUnit() : TSWorldObject()
{
    this->unit = nullptr;
}

/**
 * The [Unit] tries to attack a given target
 *
 * @param [Unit] who : [Unit] to attack
 * @param bool meleeAttack = false: attack with melee or not
 * @return didAttack : if the [Unit] did not attack
 */
bool TSUnit::Attack(TSUnit _who,bool meleeAttack)
{
    auto who = _who.unit;
    return unit->Attack(who, meleeAttack);
}

/**
 * The [Unit] stops attacking its target
 *
 * @return bool isAttacking : if the [Unit] wasn't attacking already
 */
bool TSUnit::AttackStop()
{
    return unit->AttackStop();
}

/**
 * Returns true if the [Unit] is standing.
 *
 * @return bool isStanding
 */
bool TSUnit::IsStandState()
{
    return unit->IsStandState();
}

/**
 * Returns true if the [Unit] is mounted.
 *
 * @return bool isMounted
 */
bool TSUnit::IsMounted()
{
    return unit->IsMounted();
}

/**
 * Returns true if the [Unit] is rooted.
 *
 * @return bool isRooted
 */
bool TSUnit::IsRooted()
{
#ifdef TRINITY
    return unit->IsRooted() || unit->HasUnitMovementFlag(MOVEMENTFLAG_ROOT);
#endif
#ifdef CMANGOS
    return unit->isInRoots() || unit->IsRooted();
#endif
#ifdef MANGOS
    return unit->IsInRoots() || unit->IsRooted();
#endif
}

/**
 * Returns true if the [Unit] has full health.
 *
 * @return bool hasFullHealth
 */
bool TSUnit::IsFullHealth()
{
    return unit->IsFullHealth();
}

/**
 * Returns true if the [Unit] is in an accessible place for the given [Creature].
 *
 * @param [WorldObject] obj
 * @param float radius
 * @return bool isAccessible
 */
bool TSUnit::IsInAccessiblePlaceFor(TSCreature _creature)
{
    auto creature = _creature.creature;

#if defined TRINITY
    return unit->isInAccessiblePlaceFor(creature);
#else
    return unit->isInAccessablePlaceFor(creature);
#endif
}

/**
 * Returns true if the [Unit] an auctioneer.
 *
 * @return bool isAuctioneer
 */
bool TSUnit::IsAuctioneer()
{
#if defined TRINITY
    return unit->IsAuctioner();
#else
    return unit->isAuctioner();
#endif
}

/**
 * Returns true if the [Unit] a guild master.
 *
 * @return bool isGuildMaster
 */
bool TSUnit::IsGuildMaster()
{
#ifdef CMANGOS
    return unit->isGuildMaster();
#else
    return unit->IsGuildMaster();
#endif
}

/**
 * Returns true if the [Unit] an innkeeper.
 *
 * @return bool isInnkeeper
 */
bool TSUnit::IsInnkeeper()
{
#ifdef CMANGOS
    return unit->isInnkeeper();
#else
    return unit->IsInnkeeper();
#endif
}

/**
 * Returns true if the [Unit] a trainer.
 *
 * @return bool isTrainer
 */
bool TSUnit::IsTrainer()
{
#ifdef CMANGOS
    return unit->isTrainer();
#else
    return unit->IsTrainer();
#endif
}

/**
 * Returns true if the [Unit] is able to show a gossip window.
 *
 * @return bool hasGossip
 */
bool TSUnit::IsGossip()
{
#ifdef CMANGOS
    return unit->isGossip();
#else
    return unit->IsGossip();
#endif
}

/**
 * Returns true if the [Unit] is a taxi master.
 *
 * @return bool isTaxi
 */
bool TSUnit::IsTaxi()
{
#ifdef CMANGOS
    return unit->isTaxi();
#else
    return unit->IsTaxi();
#endif
}

/**
 * Returns true if the [Unit] is a spirit healer.
 *
 * @return bool isSpiritHealer
 */
bool TSUnit::IsSpiritHealer()
{
#ifdef CMANGOS
    return unit->isSpiritHealer();
#else
    return unit->IsSpiritHealer();
#endif
}

/**
 * Returns true if the [Unit] is a spirit guide.
 *
 * @return bool isSpiritGuide
 */
bool TSUnit::IsSpiritGuide()
{
#ifdef CMANGOS
    return unit->isSpiritGuide();
#else
    return unit->IsSpiritGuide();
#endif
}

/**
 * Returns true if the [Unit] is a tabard designer.
 *
 * @return bool isTabardDesigner
 */
bool TSUnit::IsTabardDesigner()
{
#ifdef CMANGOS
    return unit->isTabardDesigner();
#else
    return unit->IsTabardDesigner();
#endif
}

/**
 * Returns true if the [Unit] provides services like vendor, training and auction.
 *
 * @return bool isTabardDesigner
 */
bool TSUnit::IsServiceProvider()
{
#ifdef CMANGOS
    return unit->isServiceProvider();
#else
    return unit->IsServiceProvider();
#endif
}

/**
 * Returns true if the [Unit] is a spirit guide or spirit healer.
 *
 * @return bool isSpiritService
 */
bool TSUnit::IsSpiritService()
{
#ifdef CMANGOS
    return unit->isSpiritService();
#else
    return unit->IsSpiritService();
#endif
}

/**
 * Returns true if the [Unit] is alive.
 *
 * @return bool isAlive
 */
bool TSUnit::IsAlive()
{
#ifdef CMANGOS
    return unit->isAlive();
#else
    return unit->IsAlive();
#endif
}

/**
 * Returns true if the [Unit] is dead.
 *
 * @return bool isDead
 */
bool TSUnit::IsDead()
{
#ifdef MANGOS
    return unit->IsDead();
#else
    return unit->isDead();
#endif
}

/**
 * Returns true if the [Unit] is dying.
 *
 * @return bool isDying
 */
bool TSUnit::IsDying()
{
#ifdef MANGOS
    return unit->IsDying();
#else
    return unit->isDying();
#endif
}

/**
 * Returns true if the [Unit] is a banker.
 *
 * @return bool isBanker
 */
bool TSUnit::IsBanker()
{
#ifdef CMANGOS
    return unit->isBanker();
#else
    return unit->IsBanker();
#endif
}

/**
 * Returns true if the [Unit] is a vendor.
 *
 * @return bool isVendor
 */
bool TSUnit::IsVendor()
{
#ifdef CMANGOS
    return unit->isVendor();
#else
    return unit->IsVendor();
#endif
}

/**
 * Returns true if the [Unit] is a battle master.
 *
 * @return bool isBattleMaster
 */
bool TSUnit::IsBattleMaster()
{
#ifdef CMANGOS
    return unit->isBattleMaster();
#else
    return unit->IsBattleMaster();
#endif
}

/**
 * Returns true if the [Unit] is a charmed.
 *
 * @return bool isCharmed
 */
bool TSUnit::IsCharmed()
{
#ifdef CMANGOS
    return unit->isCharmed();
#else
    return unit->IsCharmed();
#endif
}

/**
 * Returns true if the [Unit] is an armorer and can repair equipment.
 *
 * @return bool isArmorer
 */
bool TSUnit::IsArmorer()
{
#ifdef CMANGOS
    return unit->isArmorer();
#else
    return unit->IsArmorer();
#endif
}

/**
 * Returns true if the [Unit] is attacking a player.
 *
 * @return bool isAttackingPlayer
 */
bool TSUnit::IsAttackingPlayer()
{
    return unit->isAttackingPlayer();
}

/**
 * Returns true if the [Unit] flagged for PvP.
 *
 * @return bool isPvP
 */
bool TSUnit::IsPvPFlagged()
{
    return unit->IsPvP();
}

#ifndef CLASSIC
/**
 * Returns true if the [Unit] is on a [Vehicle].
 *
 * @return bool isOnVehicle
 */
bool TSUnit::IsOnVehicle()
{
#if defined TRINITY
    return unit->GetVehicle();
#else
    return unit->IsBoarded();
#endif
}
#endif

/**
 * Returns true if the [Unit] is in combat.
 *
 * @return bool inCombat
 */
bool TSUnit::IsInCombat()
{
#ifdef CMANGOS
    return unit->isInCombat();
#else
    return unit->IsInCombat();
#endif
}

/**
 * Returns true if the [Unit] is in combat with [Unit].
 *
 * @return bool inCombatWith
 */
bool TSUnit::IsInCombatWith(TSUnit _who)
{
    auto who = _who.unit;
    return unit->IsInCombatWith(who);
}

/**
 * Returns true if the [Unit] is under water.
 *
 * @return bool underWater
 */
bool TSUnit::IsUnderWater()
{
    return unit->IsUnderWater();
}

/**
 * Returns true if the [Unit] is in water.
 *
 * @return bool inWater
 */
bool TSUnit::IsInWater()
{
    return unit->IsInWater();
}

/**
 * Returns true if the [Unit] is not moving.
 *
 * @return bool notMoving
 */
bool TSUnit::IsStopped()
{
    return unit->IsStopped();
}

/**
 * Returns true if the [Unit] is a quest giver.
 *
 * @return bool questGiver
 */
bool TSUnit::IsQuestGiver()
{
#ifdef CMANGOS
    return unit->isQuestGiver();
#else
    return unit->IsQuestGiver();
#endif
}

/**
 * Returns true if the [Unit]'s health is below the given percentage.
 *
 * @param int32 healthpct : percentage in integer from
 * @return bool isBelow
 */
bool TSUnit::HealthBelowPct(int32 pct)
{
    return unit->HealthBelowPct(pct);
}

/**
 * Returns true if the [Unit]'s health is above the given percentage.
 *
 * @param int32 healthpct : percentage in integer from
 * @return bool isAbove
 */
bool TSUnit::HealthAbovePct(int32 pct)
{
    return unit->HealthAbovePct(pct);
}

/**
 * Returns true if the [Unit] has an aura from the given spell entry.
 *
 * @param uint32 spell : entry of the aura spell
 * @return bool hasAura
 */
bool TSUnit::HasAura(uint32 spell, TSGUID casterGUID , TSGUID itemCasterGUID, uint8 reqEffMask)
{
    return unit->HasAura(spell, casterGUID.asGUID(), itemCasterGUID.asGUID(), reqEffMask);
}

/**
 * Returns true if the [Unit] is casting a spell
 *
 * @return bool isCasting
 */
bool TSUnit::IsCasting()
{
#if defined TRINITY
    return unit->HasUnitState(UNIT_STATE_CASTING);
#else
    return unit->IsNonMeleeSpellCasted(false);
#endif
}

/**
 * Returns true if the [Unit] has the given unit state.
 *
 * @param [UnitState] state : an unit state
 * @return bool hasState
 */
bool TSUnit::HasUnitState(uint32 state)
{
#if defined TRINITY
    return unit->HasUnitState(state);
#else
    return unit->hasUnitState(state);
#endif
}

/*int TSUnit::IsVisible(lua_State* L, Unit* unit)
{
    return unit->IsVisible();
}*/

/*int TSUnit::IsMoving(lua_State* L, Unit* unit)
{
    return unit->isMoving();
}*/

/*int TSUnit::IsFlying(lua_State* L, Unit* unit)
{
    return unit->IsFlying();
}*/

/**
 * Returns the [Unit]'s owner.
 *
 * @return [Unit] owner
 */
TSUnit  TSUnit::GetOwner()
{
     return TSUnit(unit->GetOwner());
}

/**
 * Returns the [Unit]'s owner's GUID.
 *
 * @return uint64 ownerGUID
 */
TSGUID TSUnit::GetOwnerGUID()
{
    return TSGUID(unit->GetOwnerGUID());
}

/**
 * Returns the [Unit]'s mount's modelID.
 *
 * @return uint32 mountId : displayId of the mount
 */
TSNumber<uint32> TSUnit::GetMountID()
{
    return unit->GetMountDisplayId();
}

/**
 * Returns the [Unit]'s creator's GUID.
 *
 * @return uint64 creatorGUID
 */
TSGUID TSUnit::GetCreatorGUID()
{
    return TSGUID(unit->GetCreatorGUID());
}

/**
 * Returns the [Unit]'s charmer's GUID.
 *
 * @return uint64 charmerGUID
 */
TSGUID TSUnit::GetCharmerGUID()
{
    return TSGUID(unit->GetCharmerGUID());
}

/**
 * Returns the GUID of the [Unit]'s charmed entity.
 *
 * @return uint64 charmedGUID
 */
TSGUID TSUnit::GetCharmGUID()
{
#if TRINITY
    return TSGUID(unit->GetCharmedGUID());
#endif
}

/**
 * Returns the GUID of the [Unit]'s pet.
 *
 * @return uint64 petGUID
 */
TSGUID TSUnit::GetPetGUID(uint32 summonSlot)
{
    return TSGUID(unit->m_SummonSlot[summonSlot]);
}

TSCreature TSUnit::GetPet(uint32 slot)
{
    return GetCreature(GetPetGUID(slot));
}

/** 
* Returns the GUID of the [Unit]'s object.
* 
* @return uint64 objectGUID
*/
TSGUID TSUnit::GetSummonedObjectGUID(uint32 summonSlot)
{
    return TSGUID(unit->m_ObjectSlot[summonSlot]);
}

/**
 * Returns the GUID of the [Unit]'s charmer or owner.
 *
 * @return uint64 controllerGUID
 */
TSGUID TSUnit::GetControllerGUID()
{
    return TSGUID(unit->GetCharmerOrOwnerGUID());
}

TSUnit TSUnit::GetController()
{
    return GetMap()->GetWorldObject(GetControllerGUID()).ToUnit();
}

/**
 * Returns the GUID of the [Unit]'s charmer or owner or its own GUID.
 *
 * @return uint64 controllerGUID
 */
TSGUID TSUnit::GetControllerGUIDS()
{
    return TSGUID(unit->GetCharmerOrOwnerOrOwnGUID());
}

/**
 * Returns [Unit]'s specified stat
 *
 * @param uint32 statType
 * @return float stat
 */
TSNumber<float> TSUnit::GetStat(uint32 stat)
{

    return unit->GetStat((Stats)stat);
}

/**
 * Returns the [Unit]'s base spell power
 *
 * @param uint32 spellSchool
 * @return uint32 spellPower
 */
TSNumber<uint32> TSUnit::GetBaseSpellPower(uint32 spellschool)
{

    return unit->GetUInt32Value(PLAYER_FIELD_MOD_DAMAGE_DONE_POS + spellschool);
}

/**
 * Returns the [Unit]'s current victim target or nil.
 *
 * @return [Unit] victim
 */
TSUnit  TSUnit::GetVictim()
{
#if defined TRINITY
     return TSUnit(unit->GetVictim());
#else
     return TSUnit(unit->getVictim());
#endif
}

/**
 * Returns the currently casted [Spell] of given type or nil.
 *
 * <pre>
 * enum CurrentSpellTypes
 * {
 *     CURRENT_MELEE_SPELL             = 0,
 *     CURRENT_GENERIC_SPELL           = 1,
 *     CURRENT_CHANNELED_SPELL         = 2,
 *     CURRENT_AUTOREPEAT_SPELL        = 3
 * </pre>
 *
 * @param [CurrentSpellTypes] spellType
 * @return [Spell] castedSpell
 */
TSSpell  TSUnit::GetCurrentSpell(uint32 type)
{
     return TSSpell(unit->GetCurrentSpell(type));
}

/**
 * Returns the [Unit]'s current stand state.
 *
 * @return uint8 standState
 */
TSNumber<uint8> TSUnit::GetStandState()
{
#ifdef TRINITY
    return unit->GetStandState();
#else
    return unit->getStandState();
#endif
}

/**
 * Returns the [Unit]'s current display ID.
 *
 * @return uint32 displayId
 */
TSNumber<uint32> TSUnit::GetDisplayID()
{
    return unit->GetDisplayId();
}

/**
 * Returns the [Unit]'s native/original display ID.
 *
 * @return uint32 displayId
 */
TSNumber<uint32> TSUnit::GetNativeDisplayID()
{
    return unit->GetNativeDisplayId();
}

/**
 * Returns the [Unit]'s level.
 *
 * @return uint8 level
 */
TSNumber<uint8> TSUnit::GetLevel()
{
#ifdef TRINITY
    return unit->GetLevel();
#else
    return unit->getLevel();
#endif
}

/**
 * Returns the [Unit]'s health amount.
 *
 * @return uint32 healthAmount
 */
TSNumber<uint32> TSUnit::GetHealth()
{
    return unit->GetHealth();
}

TSNumber<uint32> TSUnit::PowerSelectorHelper(TSUnit unit, int powerType)
{
#ifdef TRINITY
    if (powerType == -1)
        return unit.unit->GetPowerType();
#else
    if (powerType == -1)
        return unit.unit->GetPowerType();
#endif
    // TODO: Cause error if invalid power type input

    return (Powers)powerType;
}

/**
 * Returns the [Unit]'s power amount for given power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
 * @return uint32 powerAmount
 */
TSNumber<uint32> TSUnit::GetPower(int type)
{
    Powers power = (Powers) PowerSelectorHelper(TSUnit(unit), type);
    return unit->GetPower(power);
}

/**
 * Returns the [Unit]'s power amount for given power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
 * @return uint32 powerAmount
 */
TSNumber<uint32> TSUnit::GetCreatePowerValue(int type)
{
    Powers power = (Powers) PowerSelectorHelper(TSUnit(unit), type);
    return unit->GetCreatePowerValue(power);
}

/**
 * Returns the [Unit]'s max power amount for given power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
 * @return uint32 maxPowerAmount
 */
TSNumber<uint32> TSUnit::GetMaxPower(int type)
{
    Powers power = (Powers) PowerSelectorHelper(TSUnit(unit), type);
    return unit->GetMaxPower(power);
}

/**
 * Returns the [Unit]'s power percent for given power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
 * @return float powerPct
 */
TSNumber<float> TSUnit::GetPowerPct(int type)
{
    Powers power = (Powers) PowerSelectorHelper(TSUnit(unit), type);

#if (!defined(TRINITY) && defined(WOTLK))
    float percent = ((float)unit->GetPower(power) / (float)unit->GetMaxPower(power)) * 100.0f;
#else
    float percent = ((float)unit->GetPower(power) / (float)unit->GetMaxPower(power)) * 100.0f;
#endif
    return percent;
}

/**
 * Returns the [Unit]'s current power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @return [Powers] powerType
 */
TSNumber<uint32> TSUnit::GetPowerType()
{
#ifdef TRINITY
    return unit->GetPowerType();
#else
    return unit->GetPowerType();
#endif
}

/**
 * Returns the [Unit]'s max health.
 *
 * @return uint32 maxHealth
 */
TSNumber<uint32> TSUnit::GetMaxHealth()
{
    return unit->GetMaxHealth();
}

/**
 * Returns the [Unit]'s health percent.
 *
 * @return float healthPct
 */
TSNumber<float> TSUnit::GetHealthPct()
{
#if defined TRINITY
    return unit->GetHealthPct();
#else
    return unit->GetHealthPercent();
#endif
}

/**
 * Returns the [Unit]'s gender.
 *
 * @return uint8 gender : 0 for male, 1 for female and 2 for none
 */
TSNumber<uint8> TSUnit::GetGender()
{
#ifdef TRINITY
    return unit->GetGender();
#else
    return unit->getGender();
#endif
}

/**
 * Returns the [Unit]'s race ID.
 *
 * @return [Races] race
 */
TSNumber<uint32> TSUnit::GetRace()
{
#ifdef TRINITY
    return unit->GetRace();
#else
    return (Races) unit->getRace();
#endif
}

/**
 * Returns the [Unit]'s class ID.
 *
 * @return [Classes] class
 */
TSNumber<uint32> TSUnit::GetClass()
{
#ifdef TRINITY
    return unit->GetClass();
#else
    return unit->getClass();
#endif
}

/**
* Returns the race mask
*
* @return uint32 racemask
*/
TSNumber<uint32> TSUnit::GetRaceMask()
{
#ifdef TRINITY
    return unit->GetRaceMask();
#else
    return unit->getRaceMask();
#endif
}

/**
* Returns the class mask
*
* @return uint32 classmask
*/
TSNumber<uint32> TSUnit::GetClassMask()
{
#ifdef TRINITY
    return unit->GetClassMask();
#else
    return unit->getClassMask();
#endif
}

/**
 * Returns the [Unit]'s creature type ID (enumerated in CreatureType.dbc).
 *
 * <pre>
 * enum CreatureType
 * {
 *     CREATURE_TYPE_BEAST            = 1,
 *     CREATURE_TYPE_DRAGONKIN        = 2,
 *     CREATURE_TYPE_DEMON            = 3,
 *     CREATURE_TYPE_ELEMENTAL        = 4,
 *     CREATURE_TYPE_GIANT            = 5,
 *     CREATURE_TYPE_UNDEAD           = 6,
 *     CREATURE_TYPE_HUMANOID         = 7,
 *     CREATURE_TYPE_CRITTER          = 8,
 *     CREATURE_TYPE_MECHANICAL       = 9,
 *     CREATURE_TYPE_NOT_SPECIFIED    = 10,
 *     CREATURE_TYPE_TOTEM            = 11,
 *     CREATURE_TYPE_NON_COMBAT_PET   = 12,     // This and below is TBC+
 *     CREATURE_TYPE_GAS_CLOUD        = 13
 * </pre>
 *
 * @return [CreatureType] creatureType
 */
TSNumber<uint32> TSUnit::GetCreatureType()
{
    return unit->GetCreatureType();
}

/**
 * Returns the [Unit]'s class' name in given or default locale or nil.
 *
 * <pre>
 * enum LocaleConstant
 * {
 *     LOCALE_enUS = 0,
 *     LOCALE_koKR = 1,
 *     LOCALE_frFR = 2,
 *     LOCALE_deDE = 3,
 *     LOCALE_zhCN = 4,
 *     LOCALE_zhTW = 5,
 *     LOCALE_esES = 6,
 *     LOCALE_esMX = 7,
 *     LOCALE_ruRU = 8
 * </pre>
 *
 * @param [LocaleConstant] locale = DEFAULT_LOCALE
 * @return string className : class name or nil
 */
std::string TSUnit::GetClassAsString(uint8 locale)
{

#ifdef TRINITY
    const ChrClassesEntry* entry = sChrClassesStore.LookupEntry(unit->GetClass());
    return entry->Name[locale];
#endif
}

/**
 * Returns the [Unit]'s race's name in given or default locale or nil.
 *
 * <pre>
 * enum LocaleConstant
 * {
 *     LOCALE_enUS = 0,
 *     LOCALE_koKR = 1,
 *     LOCALE_frFR = 2,
 *     LOCALE_deDE = 3,
 *     LOCALE_zhCN = 4,
 *     LOCALE_zhTW = 5,
 *     LOCALE_esES = 6,
 *     LOCALE_esMX = 7,
 *     LOCALE_ruRU = 8
 * </pre>
 *
 * @param [LocaleConstant] locale = DEFAULT_LOCALE : locale to return the race name in
 * @return string raceName : race name or nil
 */
std::string TSUnit::GetRaceAsString(uint8 locale)
{

#ifdef TRINITY
    const ChrRacesEntry* entry = sChrRacesStore.LookupEntry(unit->GetRace());
    return entry->Name[locale];
#endif
}

/**
 * Returns the [Unit]'s faction ID.
 *
 * @return uint32 faction
 */
TSNumber<uint32> TSUnit::GetFaction()
{
    return unit->GetFaction();
}

/**
 * Returns the [Aura] of the given spell entry on the [Unit] or nil.
 *
 * @param uint32 spellID : entry of the aura spell
 * @return [Aura] aura : aura object or nil
 */
TSAura  TSUnit::GetAura(uint32 spellID, TSGUID casterGUID, TSGUID itemCasterGUID, uint8 reqEffMask)
{
#if defined TRINITY
     return TSAura(unit->GetAura(spellID, casterGUID.asGUID(), itemCasterGUID.asGUID(), reqEffMask));
#else
     return TSAura(unit->GetAura(spellID, EFFECT_INDEX_0));
#endif
}

TSAura  TSUnit::GetAuraOfRankedSpell(uint32 spellID, TSGUID casterGUID, TSGUID itemCasterGUID, uint8 reqEffMask)
{
#if defined TRINITY
     return TSAura(unit->GetAuraOfRankedSpell(spellID, casterGUID.asGUID(), itemCasterGUID.asGUID(), reqEffMask));
#else
     return TSAura(unit->GetAura(spellID, EFFECT_INDEX_0));
#endif
}

/**
 * Returns a table containing friendly [Unit]'s within given range of the [Unit].
 *
 * @param float range = 533.333 : search radius
 * @return table friendyUnits : table filled with friendly units
 */
TSArray<TSUnit> TSUnit::GetFriendlyUnitsInRange(float range)
{
    // TODO: Fix this
    return TSArray<TSUnit>();
}

/**
 * Returns a table containing unfriendly [Unit]'s within given range of the [Unit].
 *
 * @param float range = 533.333 : search radius
 * @return table unfriendyUnits : table filled with unfriendly units
 */
TSArray<TSUnit> TSUnit::GetUnfriendlyUnitsInRange(float range)
{
    // TODO: Fix this
    return TSArray<TSUnit>();
}

#if (!defined(TBC) && !defined(CLASSIC))
/**
 * Returns [Unit]'s [Vehicle] methods
 *
 * @return [Vehicle] vehicle
 */
TSVehicle  TSUnit::GetVehicleKit()
{
#if defined TRINITY
     return TSVehicle(unit->GetVehicleKit());
#else
     return TSVehicle(unit->GetVehicleInfo());
#endif
}

TSVehicle TSUnit::GetVehicle()
{
    return TSVehicle(unit->GetVehicle());
}

/**
 * Returns the Critter Guid
 *
 * @return uint64 critterGuid
 */
TSGUID TSUnit::GetCritterGUID()
{
    return TSGUID(unit->GetCritterGUID());
}
#endif

/**
 * Returns the [Unit]'s speed of given [UnitMoveType].
 *
 * <pre>
 * enum UnitMoveType
 * {
 *     MOVE_WALK           = 0,
 *     MOVE_RUN            = 1,
 *     MOVE_RUN_BACK       = 2,
 *     MOVE_SWIM           = 3,
 *     MOVE_SWIM_BACK      = 4,
 *     MOVE_TURN_RATE      = 5,
 *     MOVE_FLIGHT         = 6,
 *     MOVE_FLIGHT_BACK    = 7,
 *     MOVE_PITCH_RATE     = 8
 * </pre>
 *
 * @param [UnitMoveType] type
 * @return float speed
 */
TSNumber<float> TSUnit::GetSpeed(uint32 type)
{

#ifndef TRINITY
    return unit->GetSpeedRate((UnitMoveType)type);
#else
    return unit->GetSpeed((UnitMoveType)type);
#endif
}

/**
 * Returns the current movement type for this [Unit].
 *
 * <pre>
 * enum MovementGeneratorType
 * {
 *     IDLE_MOTION_TYPE                = 0,
 *     RANDOM_MOTION_TYPE              = 1,
 *     WAYPOINT_MOTION_TYPE            = 2,
 *     MAX_DB_MOTION_TYPE              = 3,
 *     ANIMAL_RANDOM_MOTION_TYPE       = 3, // TC
 *
 *     CONFUSED_MOTION_TYPE            = 4,
 *     CHASE_MOTION_TYPE               = 5,
 *     HOME_MOTION_TYPE                = 6,
 *     FLIGHT_MOTION_TYPE              = 7,
 *     POINT_MOTION_TYPE               = 8,
 *     FLEEING_MOTION_TYPE             = 9,
 *     DISTRACT_MOTION_TYPE            = 10,
 *     ASSISTANCE_MOTION_TYPE          = 11,
 *     ASSISTANCE_DISTRACT_MOTION_TYPE = 12,
 *     TIMED_FLEEING_MOTION_TYPE       = 13,
 *     FOLLOW_MOTION_TYPE              = 14,
 *     EFFECT_MOTION_TYPE              = 15, // mangos
 *     ROTATE_MOTION_TYPE              = 15, // TC
 *     EFFECT_MOTION_TYPE              = 16, // TC
 *     NULL_MOTION_TYPE                = 17, // TC
 * </pre>
 *
 * @return [MovementGeneratorType] movementType
 */
TSNumber<uint32> TSUnit::GetMovementType()
{
    return unit->GetMotionMaster()->GetCurrentMovementGeneratorType();
}

/**
 * Sets the [Unit]'s owner GUID to given GUID.
 *
 * @param uint64 guid : new owner guid
 */
void TSUnit::SetOwnerGUID(TSGUID guid)
{
    unit->SetOwnerGUID(guid.asGUID());
}

/**
 * Sets the [Unit]'s PvP on or off.
 *
 * @param bool apply = true : true if set on, false if off
 */
void TSUnit::SetPvP(bool apply)
{

    unit->SetPvP(apply);
}

/**
 * Sets the [Unit]'s sheath state.
 *
 *     enum SheathState
 *     {
 *         SHEATH_STATE_UNARMED  = 0, // non prepared weapon
 *         SHEATH_STATE_MELEE    = 1, // prepared melee weapon
 *         SHEATH_STATE_RANGED   = 2  // prepared ranged weapon
 *
 * @param [SheathState] sheathState : valid SheathState
 */
void TSUnit::SetSheath(uint32 sheathed)
{

    unit->SetSheath((SheathState)sheathed);
}

/**
 * Sets the [Unit]'s name internally.
 *
 * @param string name : new name
 */
void TSUnit::SetName(std::string const& name)
{
    if (name.length() > 0)
        unit->SetName(name.c_str());
}

/**
 * Sets the [Unit]'s speed of given [UnitMoveType] to given rate.
 * If forced, packets sent to clients forcing the visual change.
 *
 * <pre>
 * enum UnitMoveType
 * {
 *     MOVE_WALK           = 0,
 *     MOVE_RUN            = 1,
 *     MOVE_RUN_BACK       = 2,
 *     MOVE_SWIM           = 3,
 *     MOVE_SWIM_BACK      = 4,
 *     MOVE_TURN_RATE      = 5,
 *     MOVE_FLIGHT         = 6,
 *     MOVE_FLIGHT_BACK    = 7,
 *     MOVE_PITCH_RATE     = 8
 * </pre>
 *
 * @param [UnitMoveType] type
 * @param float rate
 * @param bool forced = false
 */
void TSUnit::SetSpeed(uint32 type,float rate,bool forced)
{
    (void)forced; // ensure that the variable is referenced in order to pass compiler checks
#if defined TRINITY
    unit->SetSpeedRate((UnitMoveType)type, rate);
#else
    unit->SetSpeedRate((UnitMoveType)type, rate, forced);
#endif
}

/**
 * Sets the [Unit]'s faction.
 *
 * @param uint32 faction : new faction ID
 */
void TSUnit::SetFaction(uint32 factionId)
{
    unit->SetFaction(factionId);
}

/**
 * Sets the [Unit]'s level.
 *
 * @param uint8 level : new level
 */
void TSUnit::SetLevel(uint8 newlevel)
{


    if (newlevel > STRONG_MAX_LEVEL)
        newlevel = STRONG_MAX_LEVEL;

    if (Player* player = unit->ToPlayer())
    {
        player->GiveLevel(newlevel);
        player->InitTalentForLevel();
        player->SetUInt32Value(PLAYER_XP, 0);
    }
    else
        unit->SetLevel(newlevel);

}

/**
 * Sets the [Unit]'s health.
 *
 * @param uint32 health : new health
 */
void TSUnit::SetHealth(uint32 amt)
{
    unit->SetHealth(amt);
}

/**
 * Sets the [Unit]'s max health.
 *
 * @param uint32 maxHealth : new max health
 */
void TSUnit::SetMaxHealth(uint32 amt)
{
    unit->SetMaxHealth(amt);
}

/**
 * Sets the [Unit]'s power amount for the given power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param uint32 amount : new power amount
 * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
 * @param bool withPowerUpdate : if power should be updated with power update, default = true
 * @param bool force : if power update should be forced, default = false
 */
void TSUnit::SetPower(int type, uint32 amt, bool withPowerUpdate /*= true*/, bool force /*= false*/)
{
    Powers power = (Powers) PowerSelectorHelper(TSUnit(unit), type);
    unit->SetPower(power, amt, withPowerUpdate, force);
}

/**
 * modifies the [Unit]'s power amount for the given power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param int32 amount : amount to modify
 * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
 * @param bool withPowerUpdate : if power should be updated with power update, default = true
 */
void TSUnit::ModifyPower(int type, int32 amt, bool withPowerUpdate /*= true*/)
{
    Powers power = (Powers) PowerSelectorHelper(TSUnit(unit), type);
    unit->ModifyPower(power, amt, withPowerUpdate);
}

/**
 * Sets the [Unit]'s max power amount for the given power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
 * @param uint32 maxPower : new max power amount
 */
void TSUnit::SetMaxPower(int type,uint32 amt)
{
    Powers power = (Powers) PowerSelectorHelper(TSUnit(unit), type);
    unit->SetMaxPower(power, amt);
}

/**
 * Sets the [Unit]'s power type.
 *
 *     enum Powers
 *     {
 *         POWER_MANA        = 0,
 *         POWER_RAGE        = 1,
 *         POWER_FOCUS       = 2,
 *         POWER_ENERGY      = 3,
 *         POWER_HAPPINESS   = 4,
 *         POWER_RUNE        = 5,
 *         POWER_RUNIC_POWER = 6,
 *         MAX_POWERS        = 7,
 *         POWER_ALL         = 127,         // default for class?
 *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
 *
 * @param [Powers] type : a valid power type
 */
void TSUnit::SetPowerType(uint32 type)
{

#ifdef TRINITY
    unit->SetPowerType((Powers)type);
#else
    unit->SetPowerType((Powers)type);
#endif
}

/**
 * Sets the [Unit]'s modelID.
 *
 * @param uint32 displayId
 */
void TSUnit::SetDisplayID(uint32 model)
{
    unit->SetDisplayId(model);
}

/**
 * Sets the [Unit]'s native/default modelID.
 *
 * @param uint32 displayId
 */
void TSUnit::SetNativeDisplayID(uint32 model)
{
    unit->SetNativeDisplayId(model);
}

/**
 * Sets the [Unit]'s facing/orientation.
 *
 * @param uint32 orientation
 */
void TSUnit::SetFacing(float o)
{
    unit->SetFacingTo(o);
}

/**
 * Sets the [Unit] to face the given [WorldObject]'s direction.
 *
 * @param [WorldObject] target
 */
void TSUnit::SetFacingToObject(TSWorldObject _obj)
{
    auto obj = _obj.obj;
    unit->SetFacingToObject(obj);
}

/**
 * Sets creator GUID
 *
 * @param uint64 guid
 */
void TSUnit::SetCreatorGUID(TSGUID guid)
{
#if defined TRINITY
    unit->SetCreatorGUID(guid.asGUID());
#else
    unit->SetCreatorGuid(ObjectGuid(guid));
#endif
}

/**
 * Sets pet GUID
 *
 * @param uint64 guid
 */
void TSUnit::SetPetGUID(TSGUID guid)
{
#if defined TRINITY
    unit->SetPetGUID(guid.asGUID());
#else
    unit->SetPetGuid(ObjectGuid(guid));
#endif
}

/**
 * Toggles (Sets) [Unit]'s water walking
 *
 * @param bool enable = true
 */
void TSUnit::SetWaterWalk(bool enable)
{
#if defined TRINITY
    unit->SetWaterWalking(enable);
#else
    unit->SetWaterWalk(enable);
#endif
}

/**
 * Sets the [Unit]'s stand state
 *
 * @param uint8 state : stand state
 */
void TSUnit::SetStandState(uint8 state)
{
    unit->SetStandState(UnitStandStateType(state));
}

#if (!defined(TBC) && !defined(CLASSIC))
/**
 * Sets the [Unit]'s FFA flag on or off.
 *
 * @param bool apply = true
 */
void TSUnit::SetFFA(bool apply)
{

#ifdef TRINITY
    if (apply)
    {
        unit->SetByteFlag(UNIT_FIELD_BYTES_2, 1, UNIT_BYTE2_FLAG_FFA_PVP);
        for (Unit::ControlList::iterator itr = unit->m_Controlled.begin(); itr != unit->m_Controlled.end(); ++itr)
            (*itr)->SetByteValue(UNIT_FIELD_BYTES_2, 1, UNIT_BYTE2_FLAG_FFA_PVP);
    }
    else
    {
        unit->RemoveByteFlag(UNIT_FIELD_BYTES_2, 1, UNIT_BYTE2_FLAG_FFA_PVP);
        for (Unit::ControlList::iterator itr = unit->m_Controlled.begin(); itr != unit->m_Controlled.end(); ++itr)
            (*itr)->RemoveByteFlag(UNIT_FIELD_BYTES_2, 1, UNIT_BYTE2_FLAG_FFA_PVP);
    }
#else
    unit->SetFFAPvP(apply);
#endif
}

/**
 * Sets the [Unit]'s sanctuary flag on or off.
 *
 * @param bool apply = true
 */
void TSUnit::SetSanctuary(bool apply)
{

    if (apply)
    {
        unit->SetByteFlag(UNIT_FIELD_BYTES_2, 1, UNIT_BYTE2_FLAG_SANCTUARY);
        unit->CombatStop();
        unit->CombatStopWithPets();
    }
    else
        unit->RemoveByteFlag(UNIT_FIELD_BYTES_2, 1, UNIT_BYTE2_FLAG_SANCTUARY);

}

void TSUnit::SetCritterGUID(TSGUID guid)
{
#if defined TRINITY
    unit->SetCritterGUID(guid.asGUID());
#else
    unit->SetCritterGuid(ObjectGuid(guid));
#endif
}
#endif

/*int TSUnit::SetStunned(lua_State* L, Unit* unit)
{
unit->SetControlled(apply, UNIT_STATE_STUNNED);
}*/

/**
 * Roots the [Unit] to the ground, if 'false' specified, unroots the [Unit].
 *
 * @param bool apply = true
 */
void TSUnit::SetRooted(bool apply)
{
#if defined TRINITY
    unit->SetControlled(apply, UNIT_STATE_ROOT);
#else
    unit->SetRoot(apply);
#endif
}

/**
 * Confuses the [Unit], if 'false' specified, the [Unit] is no longer confused.
 *
 * @param bool apply = true
 */
void TSUnit::SetConfused(bool apply)
{
#if defined TRINITY
    unit->SetControlled(apply, UNIT_STATE_CONFUSED);
#else
    unit->SetConfused(apply);
#endif
}

/**
 * Fears the [Unit], if 'false' specified, the [Unit] is no longer feared.
 *
 * @param bool apply = true
 */
void TSUnit::SetFeared(bool apply)
{
#if defined TRINITY
    unit->SetControlled(apply, UNIT_STATE_FLEEING);
#else
    unit->SetFeared(apply);
#endif
}

/*int TSUnit::SetCanFly(lua_State* L, Unit* unit)
{
    unit->SetCanFly(apply);
}*/

/*int TSUnit::SetVisible(lua_State* L, Unit* unit)
{
    unit->SetVisible(x);
}*/

/**
 * Clears the [Unit]'s threat list.
 */
void TSUnit::ClearThreatList(bool apply,bool x)
{
#ifdef TRINITY
    unit->GetThreatManager().ClearAllThreat();
#else
    unit->GetThreatManager().clearReferences();
#endif
}

/**
 * Mounts the [Unit] on the given displayID/modelID.
 *
 * @param uint32 displayId
 */
void TSUnit::Mount(uint32 displayId)
{

    unit->Mount(displayId);
}

/**
 * Dismounts the [Unit].
 */
void TSUnit::Dismount()
{
    if (unit->IsMounted())
    {
#if defined TRINITY
        unit->Dismount();
        unit->RemoveAurasByType(SPELL_AURA_MOUNTED);
#else
        unit->Unmount();
        unit->RemoveSpellsCausingAura(SPELL_AURA_MOUNTED);
#endif
    }

}

/**
 * Makes the [Unit] perform the given emote.
 *
 * @param uint32 emoteId
 */
void TSUnit::PerformEmote(uint32 emoteId)
{
    unit->HandleEmoteCommand(static_cast<Emote>(emoteId));
}

/**
 * Makes the [Unit] perform the given emote continuously.
 *
 * @param uint32 emoteId
 */
void TSUnit::EmoteState(uint32 emoteId)
{

    unit->SetUInt32Value(UNIT_NPC_EMOTESTATE, emoteId);
}

/**
 * Returns calculated percentage from Health
 *
 * @return int32 percentage
 */
TSNumber<int32> TSUnit::CountPctFromCurHealth(int32 health)
{
    return unit->CountPctFromCurHealth(health);
}

/**
 * Returns calculated percentage from Max Health
 *
 * @return int32 percentage
 */
TSNumber<int32> TSUnit::CountPctFromMaxHealth(int32 health)
{
    return unit->CountPctFromMaxHealth(health);
}

/**
 * Sends chat message to [Player]
 *
 * @param uint8 type : chat, whisper, etc
 * @param uint32 lang : language to speak
 * @param string msg
 * @param [Player] target
 */
void TSUnit::SendChatMessageToPlayer(uint8 type,uint32 lang, std::string const& msg,TSPlayer _target)
{
    auto target = _target.player;

    WorldPacket data;
#if TRINITY
    ChatHandler::BuildChatPacket(data, ChatMsg(type), Language(lang), unit, target, msg);
    //ChatHandler::BuildChatPacket(data, ChatMsg(type), Language(lang), unit, target, msg);
#endif
    target->GetSession()->SendPacket(&data);
}

/**
 * Stops the [Unit]'s movement
 */
void TSUnit::MoveStop()
{
    unit->StopMoving();
}

/**
 * The [Unit]'s movement expires and clears movement
 *
 * @param bool reset = true : cleans movement
 */
void TSUnit::MoveExpire(bool reset)
{
#ifdef TRINITY
     // ensure that the variable is referenced in order to pass compiler checks
    unit->GetMotionMaster()->Clear();
#else
    unit->GetMotionMaster()->MovementExpired(reset);
#endif
}

/**
 * Clears the [Unit]'s movement
 *
 * @param bool reset = true : clean movement
 */
void TSUnit::MoveClear(bool reset)
{
#ifdef TRINITY
     // ensure that the variable is referenced in order to pass compiler checks
    unit->GetMotionMaster()->Clear();
#else
    unit->GetMotionMaster()->Clear(reset);
#endif
}

/**
 * The [Unit] will be idle
 */
void TSUnit::MoveIdle()
{
    unit->GetMotionMaster()->MoveIdle();
}

/**
 * The [Unit] will move at random
 *
 * @param float radius : limit on how far the [Unit] will move at random
 */
void TSUnit::MoveRandom(float radius)
{
    float x, y, z;
    unit->GetPosition(x, y, z);
#if defined TRINITY
    unit->GetMotionMaster()->MoveRandom(radius);
#else
    unit->GetMotionMaster()->MoveRandomAroundPoint(x, y, z, radius);
#endif
}

/**
 * The [Unit] will move to its set home location
 */
void TSUnit::MoveHome()
{
    unit->GetMotionMaster()->MoveTargetedHome();
}

/**
 * The [Unit] will follow the target
 *
 * @param [Unit] target : target to follow
 * @param float dist = 0 : distance to start following
 * @param float angle = 0
 */
void TSUnit::MoveFollow(TSUnit _target,float dist,float angle)
{
    auto target = _target.unit;
    unit->GetMotionMaster()->MoveFollow(target, dist, angle);
}

/**
 * The [Unit] will chase the target
 *
 * @param [Unit] target : target to chase
 * @param float dist = 0 : distance start chasing
 * @param float angle = 0
 */
void TSUnit::MoveChase(TSUnit _target,float dist,float angle)
{
    auto target = _target.unit;
    unit->GetMotionMaster()->MoveChase(target, dist, angle);
}

/**
 * The [Unit] will move confused
 */
void TSUnit::MoveConfused()
{
    unit->GetMotionMaster()->MoveConfused();
}

/**
 * The [Unit] will flee
 *
 * @param [Unit] target
 * @param uint32 time = 0 : flee delay
 */
void TSUnit::MoveFleeing(TSUnit _target,uint32 time)
{
    auto target = _target.unit;
    unit->GetMotionMaster()->MoveFleeing(target, time);
}

/**
 * The [Unit] will move to the coordinates
 *
 * @param uint32 id : unique waypoint Id
 * @param float x
 * @param float y
 * @param float z
 * @param bool genPath = true : if true, generates path
 */
void TSUnit::MoveTo(uint32 id,float x,float y,float z,bool genPath,float finalAngle)
{
    unit->GetMotionMaster()->MovePoint(id, x, y, z, genPath, finalAngle);
}

float TSUnit::GetRelativeAngle(float x, float y)
{
    return unit->GetRelativeAngle(x,y);
}

/**
 * The [Unit] will take off from the ground and fly to the coordinates.
 *
 * @param uint32 id : unique waypoint Id
 * @param float x
 * @param float y
 * @param float z
 */
void TSUnit::MoveTakeoff(uint32 id,float x,float y,float z)
{
    unit->GetMotionMaster()->MoveTakeoff(id, {x, y, z, 0.0f});
}

/**
 * The [Unit] will land from the air at the coordinates.
 *
 * @param uint32 id : unique waypoint Id
 * @param float x
 * @param float y
 * @param float z
 */
void TSUnit::MoveLand(uint32 id,float x,float y,float z)
{
    unit->GetMotionMaster()->MoveLand(id, {x, y, z, 0.0f});
}

#if (!defined(TBC) && !defined(CLASSIC))
/**
 * Makes the [Unit] jump to the coordinates
 *
 * @param float x
 * @param float y
 * @param float z
 * @param float zSpeed : start velocity
 * @param float maxHeight : maximum height
 * @param uint32 id = 0 : unique movement Id
 */
void TSUnit::MoveJump(float x,float y,float z,float zSpeed,float maxHeight,uint32 id)
{

#if (defined(CMANGOS) || defined(MANGOS)) && defined(WOTLK)
    unit->GetMotionMaster()->MoveJump(x, y, z, zSpeed, maxHeight, id);
#else
Position pos(x, y, z);
    unit->GetMotionMaster()->MoveJump(pos, zSpeed, maxHeight, id);
#endif
}
#endif

/**
 * The [Unit] will whisper the message to a [Player]
 *
 * @param string msg : message for the [Unit] to emote
 * @param uint32 lang : language for the [Unit] to speak
 * @param [Player] receiver : specific [Unit] to receive the message
 * @param bool bossWhisper = false : is a boss whisper
 */
void TSUnit::SendUnitWhisper(std::string const& msg,uint32 lang,TSPlayer _receiver,bool bossWhisper)
{
    auto receiver = _receiver.player;
    if (msg.size() > 0)
        unit->Whisper(msg.c_str(), (Language)lang, receiver, bossWhisper);
}

/**
 * The [Unit] will emote the message
 *
 * @param string msg : message for the [Unit] to emote
 * @param [Unit] receiver = nil : specific [Unit] to receive the message
 * @param bool bossEmote = false : is a boss emote
 */
void TSUnit::SendUnitEmote(std::string const& msg,TSUnit _receiver,bool bossEmote)
{
    auto receiver = _receiver.unit;
    if (msg.length() > 0)
        unit->TextEmote(msg, receiver, bossEmote);
}

/**
 * The [Unit] will say the message
 *
 * @param string msg : message for the [Unit] to say
 * @param uint32 language : language for the [Unit] to speak
 */
void TSUnit::SendUnitSay(std::string const& msg,uint32 language)
{
    if (msg.length() > 0)
        unit->Say(msg.c_str(), (Language)language, unit);
}

/**
 * The [Unit] will yell the message
 *
 * @param string msg : message for the [Unit] to yell
 * @param uint32 language : language for the [Unit] to speak
 */
void TSUnit::SendUnitYell(std::string const& msg,uint32 language)
{
    if (msg.length() > 0)
        unit->Yell(msg, (Language)language, unit);
}

/**
 * Unmorphs the [Unit] setting it's display ID back to the native display ID.
 */
void TSUnit::DeMorph()
{
    unit->DeMorph();
}


/**
 * Clears the [Unit]'s combat
 */
void TSUnit::ClearInCombat()
{
    unit->ClearInCombat();
}

/**
 * Stops the [Unit]'s current spell cast
 *
 * @param uint32 spell = 0 : entry of a spell
 */
void TSUnit::StopSpellCast(uint32 spellId)
{
    unit->CastStop(spellId);
}

/**
 * Interrupts [Unit]'s spell state, casting, etc.
 *
 * if spell is not interruptible, it will return
 *
 * @param int32 spellType : type of spell to interrupt
 * @param bool delayed = true : skips if the spell is delayed
 */
void TSUnit::InterruptSpell(int spellType,bool delayed)
{
    switch (spellType)
    {
        case 0:
            spellType = CURRENT_MELEE_SPELL;
            break;
        case 1:
            spellType = CURRENT_GENERIC_SPELL;
            break;
        case 2:
            spellType = CURRENT_CHANNELED_SPELL;
            break;
        case 3:
            spellType = CURRENT_AUTOREPEAT_SPELL;
            break;
        // TODO: Error on default
    }

    unit->InterruptSpell((CurrentSpellTypes)spellType, delayed);
}

/**
 * Adds the [Aura] of the given spell entry on the given target from the [Unit].
 *
 * @param uint32 spell : entry of a spell
 * @param [Unit] target : aura will be applied on the target
 * @return [Aura] aura
 */

TSAura TSUnit::AddAura(uint32 spell,TSUnit _target)
{
    auto target = _target.unit;
#ifdef CMANGOS
    SpellEntry const* spellEntry = GetSpellStore()->LookupEntry<SpellEntry>(spell);
#endif
#ifdef MANGOS
    SpellEntry const* spellEntry = sSpellStore.LookupEntry(spell);
#endif
#ifdef TRINITY
    SpellInfo const* spellEntry = sSpellMgr->GetSpellInfo(spell);
#endif

#if defined TRINITY
     return TSAura(unit->AddAura(spell, target));
#else

    SpellAuraHolder* holder = CreateSpellAuraHolder(spellEntry, target, unit);

    for (uint32 i = 0; i < MAX_EFFECT_INDEX; ++i)
    {
        uint8 eff = spellEntry->Effect[i];
        if (eff >= TOTAL_SPELL_EFFECTS)
            continue;
        if (IsAreaAuraEffect(eff) ||
            eff == SPELL_EFFECT_APPLY_AURA ||
            eff == SPELL_EFFECT_PERSISTENT_AREA_AURA)
        {
            Aura* aur = CreateAura(spellEntry, SpellEffIndex(i), NULL, holder, target);
            holder->AddAura(aur, SpellEffIndex(i));
        }
    }
     return TSAura(target->AddSpellAuraHolder(holder));
#endif
}

/**
 * Removes [Aura] of the given spell entry from the [Unit].
 *
 * @param uint32 spell : entry of a spell
 */
void TSUnit::RemoveAura(uint32 spellId)
{
    unit->RemoveAurasDueToSpell(spellId);
}

/**
 * Removes all [Aura]'s from the [Unit].
 *
 *     Note: talents and racials are also auras, use with caution
 */
void TSUnit::RemoveAllAuras()
{
    unit->RemoveAllAuras();
}

/**
* Modifies [Aura State] of the [Unit].
* 
* @param uint32 auraState
* @param bool isApplied
*/
void TSUnit::ModifyAuraState(uint8 auraState, bool isApplied)
{
    unit->ModifyAuraState(static_cast<AuraStateType>(auraState), isApplied);
}

/**
 * Adds the given unit state for the [Unit].
 *
 * @param [UnitState] state
 */
void TSUnit::AddUnitState(uint32 state)
{

#if defined TRINITY
    unit->AddUnitState(state);
#else
    unit->addUnitState(state);
#endif
}

/**
 * Removes the given unit state from the [Unit].
 *
 * @param [UnitState] state
 */
void TSUnit::ClearUnitState(uint32 state)
{

#if defined TRINITY
    unit->ClearUnitState(state);
#else
    unit->clearUnitState(state);
#endif
}

/**
 * Makes the [Unit] teleport to given coordinates within same map.
 *
 * @param float x
 * @param float y
 * @param float z
 * @param float o : orientation
 */
void TSUnit::NearTeleport(float x,float y,float z,float o)
{

    unit->NearTeleportTo(x, y, z, o);
}

/**
 * Makes the [Unit] damage the target [Unit]
 *
 * <pre>
 * enum SpellSchools
 * {
 *     SPELL_SCHOOL_NORMAL  = 0,
 *     SPELL_SCHOOL_HOLY    = 1,
 *     SPELL_SCHOOL_FIRE    = 2,
 *     SPELL_SCHOOL_NATURE  = 3,
 *     SPELL_SCHOOL_FROST   = 4,
 *     SPELL_SCHOOL_SHADOW  = 5,
 *     SPELL_SCHOOL_ARCANE  = 6,
 *     MAX_SPELL_SCHOOL     = 7
 * </pre>
 *
 * @param [Unit] target : [Unit] to damage
 * @param uint32 damage : amount to damage
 * @param bool durabilityloss = true : if false, the damage does not do durability damage
 * @param [SpellSchools] school = MAX_SPELL_SCHOOL : school the damage is done in or MAX_SPELL_SCHOOL for direct damage
 *                                (note that MAX_SPELL_SCHOOL works differently if schoolMask > 0)
 * @param uint32 spell = 0 : spell that inflicts the damage
 * @param [SpellSchoolMask] schoolmask : bitmask of spell school (1 << SPELL_SCHOOL), use with school = MAX_SPELL_SCHOOL to take an effect
 */
void TSUnit::DealDamage(TSUnit _target,uint32 damage,bool durabilityloss,uint32 school,uint32 spell, uint32 schoolMask)
{
    auto target = _target.unit;

    // flat melee damage without resistence/etc reduction
    if (school == MAX_SPELL_SCHOOL && !schoolMask)
    {
        Unit::DealDamage(unit, target, damage, NULL, DIRECT_DAMAGE, SPELL_SCHOOL_MASK_NORMAL, NULL, durabilityloss);
        unit->SendAttackStateUpdate(HITINFO_AFFECTS_VICTIM, target, 1, SPELL_SCHOOL_MASK_NORMAL, damage, 0, 0, VICTIMSTATE_HIT, 0);
        return;
    }

    SpellSchoolMask schoolmask;

    if (!schoolMask)
        schoolmask = SpellSchoolMask(1 << school);
    else
        schoolmask = SpellSchoolMask(schoolMask);

    if (Unit::IsDamageReducedByArmor(schoolmask))
        damage = Unit::CalcArmorReducedDamage(unit, target, damage, NULL, BASE_ATTACK);

    // melee damage by specific school
    if (!spell)
    {
        DamageInfo dmgInfo(unit, target, damage, nullptr, schoolmask, SPELL_DIRECT_DAMAGE, BASE_ATTACK);
        unit->CalcAbsorbResist(dmgInfo);

        if (!dmgInfo.GetDamage())
            damage = 0;
        else
            damage = dmgInfo.GetDamage();

        uint32 absorb = dmgInfo.GetAbsorb();
        uint32 resist = dmgInfo.GetResist();
        unit->DealDamageMods(target, damage, &absorb);
        Unit::DealDamage(unit, target, damage, NULL, DIRECT_DAMAGE, schoolmask, NULL, durabilityloss);
        unit->SendAttackStateUpdate(HITINFO_AFFECTS_VICTIM, target, 0, schoolmask, damage, absorb, resist, VICTIMSTATE_HIT, 0);
        return;
    }

    SpellInfo const* spellInfo = sSpellMgr->GetSpellInfo(spell);
    if (!spellInfo)
    {
        TC_LOG_ERROR("scripts", "attempted to do damage with invalid spell id %u", spell);
        return;
    }

    if (target->IsImmunedToDamage(spellInfo))
    {
        return;
    }
    
    SpellNonMeleeDamage damageInfo(unit, target, spell, schoolmask);
    unit->SetLastDamagedTargetGuid(target->GetGUID());
    unit->CalculateSpellDamageTaken(&damageInfo, damage, spellInfo, WeaponAttackType::BASE_ATTACK);
    Unit::DealDamageMods(damageInfo.target, damageInfo.damage, &damageInfo.absorb);
    unit->SendSpellNonMeleeDamageLog(&damageInfo);
    unit->DealSpellDamage(&damageInfo, durabilityloss);
}

/**
 * Makes the [Unit] heal the target [Unit] with given spell
 *
 * @param [Unit] target : [Unit] to heal
 * @param uint32 spell : spell that causes the healing
 * @param uint32 amount : amount to heal
 * @param bool critical = false : if true, heal is logged as critical
 */
void TSUnit::DealHeal(TSUnit _target,uint32 spell,uint32 amount,bool critical)
{
    auto target = _target.unit;
#if defined TRINITY
    if (const SpellInfo* info = sSpellMgr->GetSpellInfo(spell))
    {
        HealInfo healInfo(unit, target, amount, info, info->GetSchoolMask());
        unit->HealBySpell(healInfo, critical);
    }
#else
#ifdef CMANGOS
    SpellEntry const* spellEntry = GetSpellStore()->LookupEntry<SpellEntry>(spell);
#else
    SpellEntry const* spellEntry = sSpellStore.LookupEntry(spell);
#endif
    if (spellEntry)
        unit->DealHeal(target, amount, spellEntry, critical);
#endif
    return;

}

/**
 * Makes the [Unit] kill the target [Unit]
 *
 * @param [Unit] target : [Unit] to kill
 * @param bool durLoss = true : when true, the target's items suffer durability loss
 */
void TSUnit::Kill(TSUnit _target,bool durLoss)
{
    auto target = _target.unit;

#if defined TRINITY
    Unit::Kill(unit, target, durLoss);
#else
    unit->DealDamage(target, target->GetHealth(), NULL, DIRECT_DAMAGE, SPELL_SCHOOL_MASK_NORMAL, NULL, durLoss);
#endif
}

/**
 * Adds threat to the [Unit] from the victim.
 *
 * <pre>
 * enum SpellSchoolMask
 * {
 *     SPELL_SCHOOL_MASK_NONE    = 0,
 *     SPELL_SCHOOL_MASK_NORMAL  = 1,
 *     SPELL_SCHOOL_MASK_HOLY    = 2,
 *     SPELL_SCHOOL_MASK_FIRE    = 4,
 *     SPELL_SCHOOL_MASK_NATURE  = 8,
 *     SPELL_SCHOOL_MASK_FROST   = 16,
 *     SPELL_SCHOOL_MASK_SHADOW  = 32,
 *     SPELL_SCHOOL_MASK_ARCANE  = 64,
 * }
 * </pre>
 *
 * @param [Unit] victim : [Unit] that caused the threat
 * @param float threat : threat amount
 * @param [SpellSchoolMask] schoolMask = 0 : [SpellSchoolMask] of the threat causer
 * @param uint32 spell = 0 : spell entry used for threat
 */
void TSUnit::AddThreat(TSUnit _victim,float threat,uint32 spell,uint32 schoolMask, bool ignoreModifiers, bool ignoreRedirects, bool raw)
{
    auto victim = _victim.unit;

#ifdef TRINITY
    unit->GetThreatManager().AddThreat(victim, threat, spell ? sSpellMgr->GetSpellInfo(spell) : NULL, ignoreModifiers, ignoreRedirects, raw);
#else
#ifdef CMANGOS
    SpellEntry const* spellEntry = GetSpellStore()->LookupEntry<SpellEntry>(spell);
    unit->AddThreat(victim, threat, false, spellEntry ? spellEntry->SchoolMask : SPELL_SCHOOL_MASK_NONE, spellEntry);
#else
    SpellEntry const* spellEntry = sSpellStore.LookupEntry(spell);
#ifdef CLASSIC
    unit->AddThreat(victim, threat, false, spellEntry ? GetSchoolMask(spellEntry->School) : SPELL_SCHOOL_MASK_NONE, spellEntry);
#else
    unit->AddThreat(victim, threat, false, spellEntry ? static_cast<SpellSchoolMask>(spellEntry->SchoolMask) : SPELL_SCHOOL_MASK_NONE, spellEntry);
#endif
#endif
#endif
}

void TSUnit::ScaleThreat(TSUnit victim, float scale, bool raw)
{
#if TRINITY
    unit->GetThreatManager().ScaleThreat(victim.unit, scale, raw);
#endif
}

TSNumber<uint32> TSUnit::GetResistance(uint32 school)
{
    return unit->GetResistance(static_cast<SpellSchools>(school));
}

TSNumber<uint32> TSUnit::GetArmor()
{
    return unit->GetArmor();
}

void TSUnit::SetResistance(uint32 school, int32 val)
{
    unit->SetResistance(static_cast<SpellSchools>(school),val);
}

void TSUnit::SetArmor(int32 val)
{
    unit->SetArmor(val);
}

void TSUnit::UpdateResistance(uint32 school)
{
    unit->UpdateResistances(school);
}

void TSUnit::UpdateAllResistances()
{
    for (uint8 i = 0; i < MAX_SPELL_SCHOOL; i++)
        unit->UpdateResistances(i);
}

bool TSUnit::HasAuraType(uint32 type)
{
    return unit->HasAuraType(static_cast<AuraType>(type));
}

bool TSUnit::HasAuraState(uint8 auraState, TSSpellInfo _spell, TSUnit _caster)
{
    auto spellInfo = _spell ? _spell.info : nullptr;
    auto caster = _caster ? _caster.unit : nullptr;

    return unit->HasAuraState(static_cast<AuraStateType>(auraState), spellInfo, caster);
}

TSArray<TSUnit> TSUnit::GetControlled()
{
    TSArray<TSUnit> arr;
    for (Unit* unit : unit->m_Controlled)
    {
        arr.push(TSUnit(unit));
    }
    return arr;
}

void TSUnit::RemoveAllControlled()
{
    unit->RemoveAllControlled();
}

TSUnit TSUnit::GetFirstControlled()
{
    return TSUnit(unit->GetFirstControlled());
}

TSLua::Array<TSUnit> TSUnit::LGetControlled()
{
    return sol::as_table(*GetControlled().vec);
}

void TSUnit::RemoveAllMinionsByEntry(uint32 entry)
{
    unit->RemoveAllMinionsByEntry(entry);
}

void TSUnit::SetCharm(TSUnit target, bool apply)
{
    unit->SetCharm(target.unit, apply);
}

bool TSUnit::SetCharmedBy(TSUnit charmer, uint32 type, TSAuraApplication aurApp)
{
    return unit->SetCharmedBy(charmer.unit, CharmType(type), aurApp->aura);
}

bool TSUnit::SetCharmedBy(TSUnit charmer, uint32 type)
{
    return unit->SetCharmedBy(charmer.unit, CharmType(type));
}

void TSUnit::RemoveCharmedBy(TSUnit charmer)
{
    unit->RemoveCharmedBy(charmer.unit);
}

void TSUnit::KnockbackFrom(float x, float y, float speedXY, float speedZ)
{
    unit->KnockbackFrom(x, y, speedXY, speedZ);
}

void TSUnit::Jump(float speedXY, float speedZ, bool forward)
{
    unit->JumpTo(speedXY, speedZ, forward);
}

void TSUnit::JumpTo(TSWorldObject obj, float speedZ, bool withOrientation)
{
    unit->JumpTo(obj->obj, speedZ, withOrientation);
}

void TSUnit::JumpTo(float x, float y, float z, float o, float speedXY, float speedZ, bool forward)
{
    unit->JumpTo(speedXY, speedZ, forward, Position{ x,y,z });
}

TSAuraApplication TSUnit::GetAuraApplication(uint32 spellID, TSGUID casterGUID, TSGUID itemCasterGUID, uint8 reqEffMask, TSAuraApplication except)
{
    return TSAuraApplication(unit->GetAuraApplication(spellID, casterGUID.asGUID(), itemCasterGUID.asGUID(), reqEffMask, except.aura));
}

TSAuraApplication TSUnit::GetAuraApplicationOfRankedSpell(uint32 spellID, TSGUID casterGUID, TSGUID itemCasterGUID, uint8 reqEffMask, TSAuraApplication except)
{
    return TSAuraApplication(unit->GetAuraApplicationOfRankedSpell(spellID, casterGUID.asGUID(), itemCasterGUID.asGUID(), reqEffMask, except.aura));
}

TSArray<TSAuraApplication> TSUnit::GetAuraApplications()
{
    TSArray<TSAuraApplication> applications;
    applications.reserve(unit->GetAppliedAuras().size());
    for (auto const& [_, app] : unit->GetAppliedAuras())
    {
        applications.push(TSAuraApplication(app));
    }
    return applications;
}

TSArray<TSAuraEffect> TSUnit::GetAuraEffectsByType(uint32 type)
{
    TSArray<TSAuraEffect> effects;
    Unit::AuraEffectList & list = unit->GetAuraEffectsByType(AuraType(type));
    effects.reserve(list.size());
    for (AuraEffect* eff : list)
    {
        effects.push(eff);
    }
    return effects;
}

int32 TSUnit::GetTotalAuraModifier(uint32 auraType)
{
    return unit->GetTotalAuraModifier(AuraType(auraType));
}

float TSUnit::GetTotalAuraMultiplier(uint32 auraType)
{
    return unit->GetTotalAuraMultiplier(AuraType(auraType));
}

int32 TSUnit::GetTotalAuraModifierByMiscMask(uint32 auraType, uint32 miscMask)
{
    return unit->GetTotalAuraModifierByMiscMask(AuraType(auraType), miscMask);
}

int32 TSUnit::GetMaxPositiveAuraModifier(uint32 auraType)
{
    return unit->GetMaxPositiveAuraModifier(AuraType(auraType));
}

int32 TSUnit::GetMaxNegativeAuraModifier(uint32 auraType)
{
    return unit->GetMaxNegativeAuraModifier(AuraType(auraType));
}

void TSUnit::ResetCooldown(uint32 spellId, bool update)
{
    unit->GetSpellHistory()->ResetCooldown(spellId, update);
}

void TSUnit::ResetAllCooldowns()
{
    unit->GetSpellHistory()->ResetAllCooldowns();
}

bool TSUnit::HasCooldown(uint32 spell, uint32 itemId, bool ignoreCategory)
{
    return unit->GetSpellHistory()->HasCooldown(spell, itemId, ignoreCategory);
}

uint32 TSUnit::GetRemainingCooldown(uint32 spell)
{
    return unit->GetSpellHistory()->GetRemainingCooldown(sSpellMgr->AssertSpellInfo(spell));
}

void TSUnit::ModifyCooldown(uint32 spell, int32 cooldownModMs)
{
    unit->GetSpellHistory()->ModifyCooldown(spell, cooldownModMs);
}

void TSUnit::StartCooldown(uint32 spell, uint32 item, TSSpell spl, bool onHold)
{
    unit->GetSpellHistory()->StartCooldown(sSpellMgr->AssertSpellInfo(spell), item, spl.spell, onHold);
}

void TSUnit::LockSpellSchool(uint32 schoolMask, uint32 lockoutTime)
{
    unit->GetSpellHistory()->LockSpellSchool(SpellSchoolMask(schoolMask), lockoutTime);
}

bool TSUnit::IsSchoolLocked(uint32 schoolMask)
{
    return unit->GetSpellHistory()->IsSchoolLocked(SpellSchoolMask(schoolMask));
}

TSNumber<float> TSUnit::GetTotalAttackPowerValue(uint8 AttackType) const {
    return unit->GetTotalAttackPowerValue(WeaponAttackType(AttackType));
}

TSNumber<float> TSUnit::SpellBaseDamageBonusDone(uint32 SchoolMask) const {
    return unit->SpellBaseDamageBonusDone(SpellSchoolMask(SchoolMask));
}

TSNumber<uint32> TSUnit::GetAttackTime(uint8 AttackType) const {
    return unit->GetAttackTime(WeaponAttackType(AttackType));
}

TSNumber<float> TSUnit::GetWeaponDamageRange(uint8 AttackType, uint8 Range, uint8 Index) const {
    return unit->GetWeaponDamageRange(WeaponAttackType(AttackType), WeaponDamageRange(Range), Index);
}

TSNumber<float> TSUnit::ApplyEffectModifiers(TSSpellInfo info, uint8 index, float value) const {
    return unit->ApplyEffectModifiers(info->info, index, value);
}

bool TSUnit::RollChance(uint8 chance) {
    return roll_chance_i(chance);
}

bool TSUnit::RollChanceF(float chance) {
    return roll_chance_f(chance);
}

bool TSUnit::HasAuraWithMechanic(uint32 mech) {
    return unit->HasAuraWithMechanic(mech);
}

TSArray<TSAuraApplication> TSUnit::GetAppliedAurasById(uint32 spellId) {
    auto auras = unit->GetAppliedAurasById(spellId);
    TSArray<TSAuraApplication> out;
    out.reserve(auras.size());
    for (AuraApplication* aura : auras) {
        out.push(TSAuraApplication(aura));
    }
    return out;
}

TSNumber<uint32> TSUnit::GetDiseasesByCaster(TSGUID casterGUID, bool remove) {
    return unit->GetDiseasesByCaster(casterGUID.asGUID(), remove);
}

TSNumber<uint32> TSUnit::GetBleedsByCaster(TSGUID casterGUID, bool remove) {
    return unit->GetBleedsByCaster(casterGUID.asGUID(), remove);
}

TSArray<TSUnit> TSUnit::SelectNearbyAllies(TSUnit target, TSArray<TSUnit> exclude, float dist, uint32 amount, uint32 without) {
    std::list<Unit*> ExcludedUnits = {};
    for (auto tsUnit : exclude) {
        ExcludedUnits.push_back(tsUnit.unit);
    }

    auto units = unit->SelectNearbyAllies(ExcludedUnits, dist, amount);

    TSArray<TSUnit> out;
    out.reserve(units.size());
    for (Unit* u : units) {
        out.push(TSUnit(u));
    }

    return out;
}

TSArray<TSUnit> TSUnit::SelectTargetsNearTarget(TSUnit target, TSArray<TSUnit> exclude, float dist, uint32 amount, uint32 without) {
    std::list<Unit*> ExcludedUnits = {};
    for (auto tsUnit : exclude) {
        ExcludedUnits.push_back(tsUnit.unit);
    }

    auto units = unit->SelectTargetsNearTarget(target.unit, ExcludedUnits, dist, amount, without);

    TSArray<TSUnit> out;
    out.reserve(units.size());
    for (Unit* u : units) {
        out.push(TSUnit(u));
    }

    return out;
}

bool TSUnit::HasUnitMovementFlag(uint32 flag)
{
    return unit->HasUnitMovementFlag(flag);
}

void TSUnit::SetStatFlatModifier(uint8 unitMod, uint8 modifierType, float val) {
    unit->SetStatFlatModifier(UnitMods(unitMod), UnitModifierFlatType(modifierType), val);
}

void TSUnit::SetStatPctModifier(uint8 unitMod, uint8 modifierType, float val) {
    unit->SetStatPctModifier(UnitMods(unitMod), UnitModifierPctType(modifierType), val);
}

TSNumber<float> TSUnit::GetFlatModifierValue(uint8 unitMod, uint8 modifierType) const {
    return unit->GetFlatModifierValue(UnitMods(unitMod), UnitModifierFlatType(modifierType));
}

TSNumber<float> TSUnit::GetPctModifierValue(uint8 unitMod, uint8 modifierType) const {
    return unit->GetPctModifierValue(UnitMods(unitMod), UnitModifierPctType(modifierType));
}

bool TSUnit::IsSummon() {
    return unit->IsSummon();
}
bool TSUnit::IsGuardian() {
    return unit->IsGuardian();
}
bool TSUnit::IsPet() {
    return unit->IsPet();
}
bool TSUnit::IsHunterPet() {
    return unit->IsHunterPet();
}
bool TSUnit::IsTotem() {
    return unit->IsTotem();
}
bool TSUnit::IsVehicle() {
    return unit->IsVehicle();
}

bool TSUnit::HasOffhandWeapon() {
    return unit->haveOffhandWeapon();
}

float TSUnit::GetPPMProcChance(uint32 speed, float PPM, TSSpellInfo spell) {
    return unit->GetPPMProcChance(speed, PPM, spell->info);
}

void TSUnit::SetControlled(bool apply, uint32 unitState) {
    unit->SetControlled(apply, UnitState(unitState));
}

bool TSUnit::HasDispellableAuraOfType(uint32 DispelMask) {
    return unit->HasDispellableAuraOfType(DispelMask);
}
