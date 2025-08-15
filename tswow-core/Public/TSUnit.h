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
#include "TSArray.h"
#include "TSWorldObject.h"
#include "TSItem.h"
#include "TSClasses.h"
#include "TSLua.h"
#include "TSAura.h"
#include "TSSpell.h"

class TSAuraApplication;

class TC_GAME_API TSUnit : public TSWorldObject {
public:
    Unit* unit;
    TSUnit(Unit* unit);
    TSUnit();
    TSUnit* operator->() { return this;}
    operator Unit* () const { return unit; }
    bool IsNull() { return unit == nullptr; }
    bool Attack(TSUnit who, bool meleeAttack);
    bool AttackStop();
    bool IsStandState();
    bool IsMounted();
    bool IsRooted();
    bool IsFullHealth();
    bool IsInAccessiblePlaceFor(TSCreature creature);
    bool IsAuctioneer();
    bool IsGuildMaster();
    bool IsInnkeeper();
    bool IsTrainer();
    bool IsGossip();
    bool IsTaxi();
    bool IsSpiritHealer();
    bool IsSpiritGuide();
    bool IsTabardDesigner();
    bool IsServiceProvider();
    bool IsSpiritService();
    bool IsAlive();
    bool IsDead();
    bool IsDying();
    bool IsBanker();
    bool IsVendor();
    bool IsBattleMaster();
    bool IsCharmed();
    bool IsArmorer();
    bool IsAttackingPlayer();
    bool IsPvPFlagged();
    bool IsOnVehicle();
    bool IsInCombat();
    bool IsInCombatWith(TSUnit who);
    bool IsUnderWater();
    bool IsInWater();
    bool IsStopped();
    bool IsQuestGiver();
    bool HealthBelowPct(int32 pct);
    bool HealthAbovePct(int32 pct);
    bool HasAura(uint32 spell, TSGUID casterGUID = EmptyGUID(), TSGUID itemCasterGUID = EmptyGUID(), uint8 reqEffMask = 0);
    bool HasAuraType(uint32 auraType);
    bool HasAuraState(uint8 auraState, TSSpellInfo spell = nullptr, TSUnit caster = nullptr);
    bool IsCasting();
    bool HasUnitState(uint32 state);
    TSUnit  GetOwner();
    TSGUID GetOwnerGUID();
    TSNumber<uint32> GetMountID();
    TSGUID GetCreatorGUID();
    TSGUID GetCharmerGUID();
    TSGUID GetCharmGUID();
    TSGUID GetPetGUID(uint32 slot = 0);
    TSCreature GetPet(uint32 slot = 0);
    TSGUID GetSummonedObjectGUID(uint32 slot = 0);

    TSUnit GetController();
    TSGUID GetControllerGUID();
    TSGUID GetControllerGUIDS();
    TSArray<TSUnit> GetControlled();
    void RemoveAllControlled();
    TSUnit GetFirstControlled();
    void RemoveAllMinionsByEntry(uint32 entry);

    void SetCharm(TSUnit target, bool apply);
    bool SetCharmedBy(TSUnit charmer, uint32 type, TSAuraApplication aurApp);
    bool SetCharmedBy(TSUnit charmer, uint32 type);
    void RemoveCharmedBy(TSUnit charmer);

    TSNumber<float> GetStat(uint32 stat);
    TSNumber<uint32> GetBaseSpellPower(uint32 spellschool);
    TSUnit  GetVictim();
    TSSpell  GetCurrentSpell(uint32 type);
    TSNumber<uint8> GetStandState();
    TSNumber<uint32> GetDisplayID();
    TSNumber<uint32> GetNativeDisplayID();
    TSNumber<uint8> GetLevel();
    TSNumber<uint32> GetHealth();
    TSNumber<uint32> PowerSelectorHelper(TSUnit unit, int powerType = -1);
    TSNumber<uint32> GetPower(int type);
    TSNumber<uint32> GetCreatePowerValue(int type);
    TSNumber<uint32> GetMaxPower(int type);
    TSNumber<float> GetPowerPct(int type);
    TSNumber<uint32> GetPowerType();
    TSNumber<uint32> GetMaxHealth();
    TSNumber<float> GetHealthPct();
    TSNumber<uint8> GetGender();
    TSNumber<uint32> GetRace();
    TSNumber<uint32> GetClass();
    TSNumber<uint32> GetRaceMask();
    TSNumber<uint32> GetClassMask();
    TSNumber<uint32> GetCreatureType();
    std::string GetClassAsString(uint8 locale);
    std::string GetRaceAsString(uint8 locale);
    TSNumber<uint32> GetFaction();
    TSArray<TSAuraApplication> GetAuraApplications();
    TSArray<TSAuraEffect> GetAuraEffectsByType(uint32 type);
    TSAura  GetAura(uint32 spellID, TSGUID casterGUID = EmptyGUID(), TSGUID itemCasterGUID = EmptyGUID(), uint8 reqEffMask = 0);
    TSAura  GetAuraOfRankedSpell(uint32 spellID, TSGUID casterGUID = EmptyGUID(), TSGUID itemCasterGUID = EmptyGUID(), uint8 reqEffMask = 0);
    TSAuraApplication GetAuraApplication(uint32 spellID, TSGUID casterGUID = EmptyGUID(), TSGUID itemCasterGUID = EmptyGUID(), uint8 reqEffMask = 0, TSAuraApplication except = TSAuraApplication());
    TSAuraApplication GetAuraApplicationOfRankedSpell(uint32 spellID, TSGUID casterGUID = EmptyGUID(), TSGUID itemCasterGUID = EmptyGUID(), uint8 reqEffMask = 0, TSAuraApplication except = TSAuraApplication());
    int32 GetTotalAuraModifier(uint32 auraType);
    float GetTotalAuraMultiplier(uint32 auraType);
    int32 GetTotalAuraModifierByMiscMask(uint32 auraType, uint32 miscMask);
    int32 GetMaxPositiveAuraModifier(uint32 auraType);
    int32 GetMaxNegativeAuraModifier(uint32 auraType);
    void ResetCooldown(uint32 spellId, bool update = true);
    void ResetAllCooldowns();
    bool HasCooldown(uint32 spell, uint32 itemId = 0, bool ignoreCategory = false);
    uint32 GetRemainingCooldown(uint32 spell);
    void ModifyCooldown(uint32 spell, int32 cooldownModMs);
    void StartCooldown(uint32 spell, uint32 item = 0, TSSpell spl = TSSpell(), bool onHold = false);
    void LockSpellSchool(uint32 schoolMask, uint32 lockoutTime);
    bool IsSchoolLocked(uint32 schoolMask);
    TSArray<TSUnit> GetFriendlyUnitsInRange(float range);
    TSArray<TSUnit> GetUnfriendlyUnitsInRange(float range);
    TSVehicle  GetVehicleKit();
    TSVehicle GetVehicle();
    TSGUID GetCritterGUID();
    TSNumber<float> GetSpeed(uint32 type);
    TSNumber<uint32> GetMovementType();
    void SetOwnerGUID(TSGUID guid);
    void SetPvP(bool apply);
    void SetSheath(uint32 sheathed);
    void SetName(std::string const& name);
    void SetSpeed(uint32 type, float rate, bool forced);
    void SetFaction(uint32 factionId);
    void SetLevel(uint8 newlevel);
    void SetHealth(uint32 amt);
    void SetMaxHealth(uint32 amt);
    void SetPower(int type, uint32 amt, bool withPowerUpdate = true, bool force = false);
    void ModifyPower(int type, int32 amt, bool withPowerUpdate = true);
    void SetMaxPower(int type, uint32 amt);
    void SetPowerType(uint32 type);
    void SetDisplayID(uint32 model);
    void SetNativeDisplayID(uint32 model);
    void SetFacing(float o);
    void SetFacingToObject(TSWorldObject obj);
    void SetCreatorGUID(TSGUID guid);
    void SetPetGUID(TSGUID guid);
    void SetWaterWalk(bool enable);
    void SetStandState(uint8 state);
    void SetFFA(bool apply);
    void SetSanctuary(bool apply);
    void SetCritterGUID(TSGUID guid);
    void SetRooted(bool apply);
    void SetConfused(bool apply);
    void SetFeared(bool apply);
    void ClearThreatList(bool apply, bool x);
    void Mount(uint32 displayId);
    void Dismount();
    void PerformEmote(uint32 emoteId);
    void EmoteState(uint32 emoteId);
    TSNumber<int32> CountPctFromCurHealth(int32 health);
    TSNumber<int32> CountPctFromMaxHealth(int32 health);
    void SendChatMessageToPlayer(uint8 type, uint32 lang, std::string const& msg, TSPlayer target);
    void MoveStop();
    void MoveExpire(bool reset);
    void MoveClear(bool reset);
    void MoveIdle();
    void MoveRandom(float radius);
    void MoveHome();
    void MoveFollow(TSUnit target, float dist, float angle);
    void MoveChase(TSUnit target, float dist, float angle);
    void MoveConfused();
    void MoveFleeing(TSUnit target, uint32 time);
    void MoveTo(uint32 id, float x, float y, float z, bool genPath, float finalAngle = 0);
    float GetRelativeAngle(float x, float y);
    void MoveTakeoff(uint32 id, float x, float y, float z);
    void MoveLand(uint32 id, float x, float y, float z);
    void MoveJump(float x, float y, float z, float zSpeed, float maxHeight, uint32 id);

    void KnockbackFrom(float x, float y, float speedXY, float speedZ);
    void Jump(float speedXY, float speedZ, bool forward = true);
    void JumpTo(TSWorldObject obj, float speedZ, bool withOrientation = false);
    void JumpTo(float x, float y, float z, float o, float speedXY, float speedZ, bool forward = true);

    void SendUnitWhisper(std::string const& msg, uint32 lang, TSPlayer receiver, bool bossWhisper);
    void SendUnitEmote(std::string const& msg, TSUnit receiver, bool bossEmote);
    void SendUnitSay(std::string const& msg, uint32 language);
    void SendUnitYell(std::string const& msg, uint32 language);
    void DeMorph();
    void ClearInCombat();
    void StopSpellCast(uint32 spellId);
    void InterruptSpell(int spellType, bool delayed);
    TSAura AddAura(uint32 spell, TSUnit target);
    void RemoveAura(uint32 spellId);
    void RemoveAllAuras();
    void ModifyAuraState(uint8 auraState, bool isApplied);
    void AddUnitState(uint32 state);
    void ClearUnitState(uint32 state);
    void NearTeleport(float x, float y, float z, float o);
    void DealDamage(TSUnit target, uint32 damage, bool durabilityloss, uint32 school, uint32 spell = 0, uint32 schoolMask = 0);
    void DealHeal(TSUnit target, uint32 spell, uint32 amount, bool critical);
    void Kill(TSUnit target, bool durLoss);
    void AddThreat(TSUnit victim, float threat, uint32 spell = 0, uint32 schoolMask = 0, bool ignoreModifiers = true, bool ignoreRedirects = true, bool raw = false);
    void ScaleThreat(TSUnit victim, float scale, bool raw = false);

    TSNumber<uint32> GetResistance(uint32 school);
    TSNumber<uint32> GetArmor();
    void SetResistance(uint32 school, int32 val);
    void SetArmor(int32 val);
    void UpdateResistance(uint32 school);
    void UpdateAllResistances();

    TSNumber<float> GetTotalAttackPowerValue(uint8) const;
    TSNumber<uint32> GetAttackTime(uint8) const;
    TSNumber<float> GetWeaponDamageRange(uint8, uint8, uint8) const;
    TSNumber<float> ApplyEffectModifiers(TSSpellInfo, uint8, float) const;

    TSNumber<int32> SpellBaseDamageBonusDone(uint32) const;

    bool RollChance(uint8);
    bool RollChanceF(float);

    TSArray<TSAuraApplication> GetAppliedAurasById(uint32);

    TSNumber<uint32> GetDiseasesByCaster(TSGUID casterGUID, bool remove);
    TSNumber<uint32> GetBleedsByCaster(TSGUID casterGUID, bool remove);

    TSArray<TSUnit> SelectNearbyAllies(TSUnit target, TSArray<TSUnit> exclude, float dist, uint32 amount, uint32 WithoutAura);
    TSArray<TSUnit> SelectTargetsNearTarget(TSUnit target, TSArray<TSUnit> exclude, float dist, uint32 amount, uint32 WithoutAura);

    bool HasAuraWithMechanic(uint32);

    bool HasUnitMovementFlag(uint32 flag);

    TSNumber<float> GetFlatModifierValue(uint8 unitMod, uint8 modifierType) const;
    TSNumber<float> GetPctModifierValue(uint8 unitMod, uint8 modifierType) const;
    void SetStatFlatModifier(uint8 unitMod, uint8 modifierType, float val);
    void SetStatPctModifier(uint8 unitMod, uint8 modifierType, float val);

    bool IsSummon();
    bool IsGuardian();
    bool IsPet();
    bool IsHunterPet();
    bool IsTotem();
    bool IsVehicle();

    bool HasOffhandWeapon();

    float GetPPMProcChance(uint32 speed, float PPM, TSSpellInfo spell);
    void SetControlled(bool apply, uint32 unitState);

    bool HasDispellableAuraOfType(uint32 DispelMask);
private:
    TSLua::Array<TSUnit> LGetControlled();
    friend class TSLua;
};

LUA_PTR_TYPE(TSUnit)
