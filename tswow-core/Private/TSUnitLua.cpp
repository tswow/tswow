#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSUnit.h"

#include "TSPlayer.h"
#include "TSAura.h"
#include "TSSpell.h"
#include "TSVehicle.h"
#include "TSCreature.h"
#include "TSItem.h"
#include "TSGameObject.h"
#include "TSCreature.h"
#include "TSCorpse.h"

void TSLua::load_unit_methods(sol::state& state)
{
    auto ts_unit = state.new_usertype<TSUnit>("TSUnit", sol::base_classes, sol::bases<TSWorldObject, TSObject, TSWorldEntityProvider<TSWorldObject>, TSEntityProvider>());
    LUA_FIELD(ts_unit, TSUnit, Attack);
    LUA_FIELD(ts_unit, TSUnit, AttackStop);
    LUA_FIELD(ts_unit, TSUnit, IsStandState);
    LUA_FIELD(ts_unit, TSUnit, IsMounted);
    LUA_FIELD(ts_unit, TSUnit, IsRooted);
    LUA_FIELD(ts_unit, TSUnit, IsFullHealth);
    LUA_FIELD(ts_unit, TSUnit, IsInAccessiblePlaceFor);
    LUA_FIELD(ts_unit, TSUnit, IsAuctioneer);
    LUA_FIELD(ts_unit, TSUnit, IsGuildMaster);
    LUA_FIELD(ts_unit, TSUnit, IsInnkeeper);
    LUA_FIELD(ts_unit, TSUnit, IsTrainer);
    LUA_FIELD(ts_unit, TSUnit, IsGossip);
    LUA_FIELD(ts_unit, TSUnit, IsTaxi);
    LUA_FIELD(ts_unit, TSUnit, IsSpiritHealer);
    LUA_FIELD(ts_unit, TSUnit, IsSpiritGuide);
    LUA_FIELD(ts_unit, TSUnit, IsTabardDesigner);
    LUA_FIELD(ts_unit, TSUnit, IsServiceProvider);
    LUA_FIELD(ts_unit, TSUnit, IsSpiritService);
    LUA_FIELD(ts_unit, TSUnit, IsAlive);
    LUA_FIELD(ts_unit, TSUnit, IsDead);
    LUA_FIELD(ts_unit, TSUnit, IsDying);
    LUA_FIELD(ts_unit, TSUnit, IsBanker);
    LUA_FIELD(ts_unit, TSUnit, IsVendor);
    LUA_FIELD(ts_unit, TSUnit, IsBattleMaster);
    LUA_FIELD(ts_unit, TSUnit, IsCharmed);
    LUA_FIELD(ts_unit, TSUnit, IsArmorer);
    LUA_FIELD(ts_unit, TSUnit, IsAttackingPlayer);
    LUA_FIELD(ts_unit, TSUnit, IsPvPFlagged);
    LUA_FIELD(ts_unit, TSUnit, IsOnVehicle);
    LUA_FIELD(ts_unit, TSUnit, IsInCombat);
    LUA_FIELD(ts_unit, TSUnit, IsUnderWater);
    LUA_FIELD(ts_unit, TSUnit, IsInWater);
    LUA_FIELD(ts_unit, TSUnit, IsStopped);
    LUA_FIELD(ts_unit, TSUnit, IsQuestGiver);
    LUA_FIELD(ts_unit, TSUnit, HealthBelowPct);
    LUA_FIELD(ts_unit, TSUnit, HealthAbovePct);
    LUA_FIELD_OVERLOAD_RET_1_3(ts_unit, TSUnit, HasAura, uint32, uint64, uint64, uint8);
    LUA_FIELD(ts_unit, TSUnit, HasAuraType);
    LUA_FIELD(ts_unit, TSUnit, IsCasting);
    LUA_FIELD(ts_unit, TSUnit, HasUnitState);
    LUA_FIELD(ts_unit, TSUnit, GetOwner);
    LUA_FIELD(ts_unit, TSUnit, GetOwnerGUID);
    LUA_FIELD(ts_unit, TSUnit, GetMountID);
    LUA_FIELD(ts_unit, TSUnit, GetCreatorGUID);
    LUA_FIELD(ts_unit, TSUnit, GetCharmerGUID);
    LUA_FIELD(ts_unit, TSUnit, GetCharmGUID);
    LUA_FIELD(ts_unit, TSUnit, GetPetGUID);
    LUA_FIELD(ts_unit, TSUnit, GetPet);
    LUA_FIELD(ts_unit, TSUnit, GetController);
    LUA_FIELD(ts_unit, TSUnit, GetControllerGUID);
    LUA_FIELD(ts_unit, TSUnit, GetControllerGUIDS);
    LUA_FIELD(ts_unit, TSUnit, GetStat);
    LUA_FIELD(ts_unit, TSUnit, GetBaseSpellPower);
    LUA_FIELD(ts_unit, TSUnit, GetVictim);
    LUA_FIELD(ts_unit, TSUnit, GetCurrentSpell);
    LUA_FIELD(ts_unit, TSUnit, GetStandState);
    LUA_FIELD(ts_unit, TSUnit, GetDisplayID);
    LUA_FIELD(ts_unit, TSUnit, GetNativeDisplayID);
    LUA_FIELD(ts_unit, TSUnit, GetLevel);
    LUA_FIELD(ts_unit, TSUnit, GetHealth);
    LUA_FIELD(ts_unit, TSUnit, PowerSelectorHelper);
    LUA_FIELD(ts_unit, TSUnit, GetPower);
    LUA_FIELD(ts_unit, TSUnit, GetMaxPower);
    LUA_FIELD(ts_unit, TSUnit, GetPowerPct);
    LUA_FIELD(ts_unit, TSUnit, GetGender);
    LUA_FIELD(ts_unit, TSUnit, GetRace);
    LUA_FIELD(ts_unit, TSUnit, GetClass);
    LUA_FIELD(ts_unit, TSUnit, GetRaceMask);
    LUA_FIELD(ts_unit, TSUnit, GetClassMask);
    LUA_FIELD(ts_unit, TSUnit, GetCreatureType);
    LUA_FIELD(ts_unit, TSUnit, GetClassAsString);
    LUA_FIELD(ts_unit, TSUnit, GetRaceAsString);
    LUA_FIELD(ts_unit, TSUnit, GetFaction);
    LUA_FIELD_OVERLOAD_RET_1_3(ts_unit, TSUnit, GetAura, uint32, uint64, uint64, uint8);
    LUA_FIELD_OVERLOAD_RET_1_3(ts_unit, TSUnit, GetAuraOfRankedSpell, uint32, uint64, uint64, uint8);
    LUA_FIELD_OVERLOAD_RET_1_4(ts_unit, TSUnit, GetAuraApplication, uint32, uint64, uint64, uint8, TSAuraApplication);
    LUA_FIELD_OVERLOAD_RET_1_4(ts_unit, TSUnit, GetAuraApplicationOfRankedSpell, uint32, uint64, uint64, uint8, TSAuraApplication);
    ts_unit.set_function("GetAuraApplications", [](TSUnit& unit) {
        TSArray<TSAuraApplication> apps = unit.GetAuraApplications();
        return sol::as_table(*apps.vec);
    });
    ts_unit.set_function("GetAuraEffectsByType", [](TSUnit& unit, uint32 type) {
        TSArray<TSAuraEffect> effs = unit.GetAuraEffectsByType(type);
        return sol::as_table(*effs.vec);
    });
    LUA_FIELD(ts_unit, TSUnit, GetTotalAuraModifier);
    LUA_FIELD(ts_unit, TSUnit, GetTotalAuraMultiplier);
    LUA_FIELD(ts_unit, TSUnit, GetMaxPositiveAuraModifier);
    LUA_FIELD(ts_unit, TSUnit, GetMaxNegativeAuraModifier);

    LUA_FIELD_OVERLOAD_1_1(ts_unit, TSUnit, ResetCooldown, uint32, bool);
    LUA_FIELD(ts_unit, TSUnit, ResetAllCooldowns);
    LUA_FIELD_OVERLOAD_RET_1_2(ts_unit, TSUnit, HasCooldown, uint32, uint32, bool);
    LUA_FIELD(ts_unit, TSUnit, GetRemainingCooldown);
    LUA_FIELD(ts_unit, TSUnit, ModifyCooldown);
    LUA_FIELD_OVERLOAD_1_3(ts_unit, TSUnit, StartCooldown, uint32, uint32, TSSpell, bool);
    LUA_FIELD(ts_unit, TSUnit, LockSpellSchool);
    LUA_FIELD(ts_unit, TSUnit, IsSchoolLocked);

    LUA_FIELD(ts_unit, TSUnit, GetFriendlyUnitsInRange);
    LUA_FIELD(ts_unit, TSUnit, GetUnfriendlyUnitsInRange);
    LUA_FIELD(ts_unit, TSUnit, GetVehicleKit);
    LUA_FIELD(ts_unit, TSUnit, GetVehicle);
    LUA_FIELD(ts_unit, TSUnit, GetCritterGUID);
    LUA_FIELD(ts_unit, TSUnit, GetSpeed);
    LUA_FIELD(ts_unit, TSUnit, GetMovementType);
    LUA_FIELD(ts_unit, TSUnit, SetOwnerGUID);
    LUA_FIELD(ts_unit, TSUnit, SetPvP);
    LUA_FIELD(ts_unit, TSUnit, SetSheath);
    LUA_FIELD(ts_unit, TSUnit, SetName);
    LUA_FIELD(ts_unit, TSUnit, SetSpeed);
    LUA_FIELD(ts_unit, TSUnit, SetFaction);
    LUA_FIELD(ts_unit, TSUnit, SetLevel);
    LUA_FIELD(ts_unit, TSUnit, SetHealth);
    LUA_FIELD(ts_unit, TSUnit, SetMaxHealth);
    LUA_FIELD(ts_unit, TSUnit, SetPower);
    LUA_FIELD(ts_unit, TSUnit, ModifyPower);
    LUA_FIELD(ts_unit, TSUnit, SetMaxPower);
    LUA_FIELD(ts_unit, TSUnit, SetPowerType);
    LUA_FIELD(ts_unit, TSUnit, SetDisplayID);
    LUA_FIELD(ts_unit, TSUnit, SetNativeDisplayID);
    LUA_FIELD(ts_unit, TSUnit, SetFacing);
    LUA_FIELD(ts_unit, TSUnit, SetFacingToObject);
    LUA_FIELD(ts_unit, TSUnit, SetCreatorGUID);
    LUA_FIELD(ts_unit, TSUnit, SetPetGUID);
    LUA_FIELD(ts_unit, TSUnit, SetWaterWalk);
    LUA_FIELD(ts_unit, TSUnit, SetStandState);
    LUA_FIELD(ts_unit, TSUnit, SetFFA);
    LUA_FIELD(ts_unit, TSUnit, SetSanctuary);
    LUA_FIELD(ts_unit, TSUnit, SetCritterGUID);
    LUA_FIELD(ts_unit, TSUnit, SetRooted);
    LUA_FIELD(ts_unit, TSUnit, SetConfused);
    LUA_FIELD(ts_unit, TSUnit, SetFeared);
    LUA_FIELD(ts_unit, TSUnit, ClearThreatList);
    LUA_FIELD(ts_unit, TSUnit, Mount);
    LUA_FIELD(ts_unit, TSUnit, Dismount);
    LUA_FIELD(ts_unit, TSUnit, PerformEmote);
    LUA_FIELD(ts_unit, TSUnit, EmoteState);
    LUA_FIELD(ts_unit, TSUnit, CountPctFromCurHealth);
    LUA_FIELD(ts_unit, TSUnit, CountPctFromMaxHealth);
    LUA_FIELD(ts_unit, TSUnit, SendChatMessageToPlayer);
    LUA_FIELD(ts_unit, TSUnit, MoveStop);
    LUA_FIELD(ts_unit, TSUnit, MoveExpire);
    LUA_FIELD(ts_unit, TSUnit, MoveClear);
    LUA_FIELD(ts_unit, TSUnit, MoveIdle);
    LUA_FIELD(ts_unit, TSUnit, MoveRandom);
    LUA_FIELD(ts_unit, TSUnit, MoveHome);
    LUA_FIELD(ts_unit, TSUnit, MoveFollow);
    LUA_FIELD(ts_unit, TSUnit, MoveChase);
    LUA_FIELD(ts_unit, TSUnit, MoveConfused);
    LUA_FIELD(ts_unit, TSUnit, MoveFleeing);
    LUA_FIELD(ts_unit, TSUnit, MoveTo);
    LUA_FIELD(ts_unit, TSUnit, MoveTakeoff);
    LUA_FIELD(ts_unit, TSUnit, MoveLand);
    LUA_FIELD(ts_unit, TSUnit, MoveJump);
    LUA_FIELD(ts_unit, TSUnit, SendUnitWhisper);
    LUA_FIELD(ts_unit, TSUnit, SendUnitEmote);
    LUA_FIELD(ts_unit, TSUnit, SendUnitSay);
    LUA_FIELD(ts_unit, TSUnit, SendUnitYell);
    LUA_FIELD(ts_unit, TSUnit, DeMorph);
    LUA_FIELD(ts_unit, TSUnit, CastCustomSpell);
    LUA_FIELD(ts_unit, TSUnit, ClearInCombat);
    LUA_FIELD(ts_unit, TSUnit, StopSpellCast);
    LUA_FIELD(ts_unit, TSUnit, InterruptSpell);
    LUA_FIELD(ts_unit, TSUnit, AddAura);
    LUA_FIELD(ts_unit, TSUnit, RemoveAura);
    LUA_FIELD(ts_unit, TSUnit, RemoveAllAuras);
    LUA_FIELD(ts_unit, TSUnit, AddUnitState);
    LUA_FIELD(ts_unit, TSUnit, ClearUnitState);
    LUA_FIELD(ts_unit, TSUnit, NearTeleport);
    LUA_FIELD(ts_unit, TSUnit, DealDamage);
    LUA_FIELD(ts_unit, TSUnit, DealHeal);
    LUA_FIELD(ts_unit, TSUnit, Kill);
    LUA_FIELD(ts_unit, TSUnit, AddThreat);
    LUA_FIELD(ts_unit, TSUnit, ScaleThreat);
    LUA_FIELD(ts_unit, TSUnit, GetResistance);
    LUA_FIELD(ts_unit, TSUnit, GetArmor);
    LUA_FIELD(ts_unit, TSUnit, SetResistance);
    LUA_FIELD(ts_unit, TSUnit, SetArmor);
    LUA_FIELD(ts_unit, TSUnit, RemoveAllControlled);
    LUA_FIELD(ts_unit, TSUnit, GetFirstControlled);
    LUA_FIELD(ts_unit, TSUnit, RemoveAllMinionsByEntry);
    LUA_FIELD(ts_unit, TSUnit, RemoveCharmedBy);
    LUA_FIELD(ts_unit, TSUnit, SetCharm);
    LUA_FIELD_OVERLOAD_RET_2_1(ts_unit, TSUnit, SetCharmedBy, TSUnit, uint32, TSAuraApplication);
    LUA_FIELD_OVERLOAD_2_1(ts_unit, TSUnit, Jump, float, float, bool);
    ts_unit.set_function("GetControlled", &TSUnit::LGetControlled);
    LUA_FIELD(ts_unit, TSUnit, KnockbackFrom);
    ts_unit.set_function("JumpTo", sol::overload(
        [](TSUnit& unit, TSWorldObject obj, float speedZ, bool withOrientation) { return unit.JumpTo(obj, speedZ, withOrientation); },
        [](TSUnit& unit, TSWorldObject obj, float speedZ) { return unit.JumpTo(obj, speedZ); },
        [](TSUnit& unit, float x, float y, float z, float o, float speedXY, float speedZ, bool forward) { return unit.JumpTo(x, y, z, o, speedXY, speedZ, forward); },
        [](TSUnit& unit, float x, float y, float z, float o, float speedXY, float speedZ) { return unit.JumpTo(x, y, z, o, speedXY, speedZ); }
    ));
}
