import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { AddCasterHitTrigger, AddFlatModifier, AddPctModifier, AddTargetTrigger, AllowOnlyAbility, AllowTamePetType, AoECharm, ArenaPreparation, AurasVisible, BindSight, CannotBeDodged, ChannelDeathItem, CloneCaster, ComprehendLanguage, ConsumeNoAmmo, ControlVehicle, ConvertRune, DamageImmunity, DamageShield, DeflectSpells, DetectAmore, DetectStealth, DispelImmunity, EffectImmunity, Empathy, FarSight, FeatherFall, FeignDeath, Fly, ForceMoveForward, ForceReaction, Ghost, HasteRanged, HasteSpells, Hover, IgnoreHitDirection, IgnoreMeleeReset, IncreaseBaseHealthPercent, InitializeImages, InterruptRegen, ManaShield, MechanicDurationMod, MechanicDurationModNotStack, MechanicImmunity, MechanicImmunityMask, MeleeAttackPowerAttackerBonus, MeleeSlow, ModAbilityAffectedTargets, ModAoEAvoidance, ModAoEDamageAvoidance, ModAttackerMeleeCritChance, ModAttackerMeleeCritDamage, ModAttackerMeleeHitChance, ModAttackerRangedCritChance, ModAttackerRangedCritDamage, ModAttackerRangedHitChance, ModAttackerSpellAndWeaponCritChance, ModAttackerSpellCritChance, ModAttackerSpellHitChance, ModAttackPower, ModAttackPowerOfArmor, ModAttackPowerOfStatPercent, ModAttackPowerPct, ModAttackSpeed, ModAuraDurationByDispel, ModAuraDurationByDispelNotStack, ModBaseResistance, ModBaseResistancePct, ModBlockCritChance, ModBlockPercent, ModCastingSpeedNotStack, ModCharm, ModCombatResultChance, ModConfuse, ModCooldown, ModCreatureAoEDamageAvoidance, ModCritDamageBonus, ModCriticalHealAmount, ModCriticalThreat, ModCritPct, ModCritPercentVersus, ModDamageDone, ModDamageDoneCreature, ModDamageDoneVersus, ModDamageFromCaster, ModDamagePercentDone, ModDamagePercentTaken, ModDamageTaken, ModDebuffResistance, ModDecreaseSpeed, ModDetaunt, ModDetect, ModDetectedRange, ModDetectRange, ModDisarm, ModDisarmOffhand, ModDisarmRanged, ModDispelResist, ModDodgePercent, ModEnemyDodge, ModExpertise, ModFaction, ModFactionReputationGain, ModFear, ModFlatSpellDamageVersus, ModFlightSpeedNotStack, ModHealing, ModHealingDone, ModHealingDonePercent, ModHealingPct, ModHealingReceived, ModHealthRegenPercent, ModHitChance, ModHonorGainPct, ModHotPct, ModIgnoreShapeshift, ModIgnoreTargetResist, ModImmuneAuraApplySchool, ModIncreaseEnergy, ModIncreaseEnergyPercent, ModIncreaseFlightSpeed, ModIncreaseHealth, ModIncreaseHealth2, ModIncreaseHealth3, ModIncreaseHealthPercent, ModIncreaseMountedFlightSpeed, ModIncreaseMountSpeed, ModIncreaseSpeed, ModIncreasesSpellPctToHit, ModIncreaseSwimSpeed, ModIncreaseVehicleFlightSpeed, ModInvisibility, ModInvisibilityDetection, ModLanguage, ModManaRegenFromStat, ModManaRegenInterrupt, ModMechanicDamageTakenPercent, ModMechanicResistance, ModMeleeAttackPowerVersus, ModMeleeDamageTaken, ModMeleeDamageTakenPct, ModMeleeHaste, ModMeleeRangedHaste, ModMinimumSpeed, ModMountedFlightSpeedAlways, ModMountedSpeedAlways, ModMountedSpeedNotStack, ModOffhandDamagePct, ModPacify, ModPacifySilence, ModParryPercent, ModPercentStat, ModPetTalentPoints, ModPossess, ModPossessPet, ModPowerCostSchool, ModPowerCostSchoolPct, ModPowerRegen, ModPowerRegenPercent, ModRageFromDamageDealt, ModRangedAmmoHaste, ModRangedAttackPower, ModRangedAttackPowerOfStatPercent, ModRangedAttackPowerPct, ModRangedAttackPowerVersus, ModRangedDamageTaken, ModRangedDamageTakenPct, ModRangedHaste, ModRating, ModRatingFromStat, ModRegen, ModRegenDuringCombat, ModReputationGain, ModResistance, ModResistanceExclusive, ModResistanceOfStatPercent, ModResistancePct, ModRoot, ModScale, ModScale2, ModSchoolCritDmgTaken, ModShapeshift, ModShieldBlockValue, ModShieldBlockValuePct, ModSilence, ModSkill, ModSkillTalent, ModSpeedAlways, ModSpeedNotStack, ModSpellCritChance, ModSpellCritChanceSchool, ModSpellDamageFromHealing, ModSpellDamageOfAttackPower, ModSpellDamageOfStatPercent, ModSpellHealingOfAttackPower, ModSpellHealingOfStatPercent, ModSpellHitChance, ModStalked, ModStat, ModStealth, ModStealthLevel, ModStun, ModTargetAbilityAbsorbSchool, ModTargetAbsorbSchool, ModTargetArmorPct, ModTargetResistance, ModTargetResistBySpellClass, ModTaunt, ModThreat, ModTotalStatPercentage, ModTotalThreat, ModUnattackable, ModVehicleSpeedAlways, ModWaterBreathing, ModWeaponCritPercent, ModXpPct, ModXpQuestPct, Mounted, NoPvPCredit, NoReagentUse, ObsModHealth, ObsModPower, PeriodicDamage, PeriodicDamagePercent, PeriodicEnergize, PeriodicHeal, PeriodicHealthFunnel, PeriodicLeech, PeriodicManaLeech, PetDamageMulti, Phase, PowerBurn, PreventRegeneratePower, PreventResurrection, PreventsFleeing, ProcTriggerDamage, ProcTriggerSpell, RaidProcFromCharge, RaidProcFromChargeWithValue, RangedAttackPowerAttackerBonus, ReducePushback, ReflectSpells, ReflectSpellsSchool, RetainComboPoints, SafeFall, SchoolAbsorb, SchoolHealAbsorb, SchoolImmunity, ScreenEffect, SetVehicleId, ShareDamagePct, SpellMagnet, SpiritOfRedemption, SplitDamageFlat, SplitDamagePct, StateImmunity, Tamed, TrackCreatures, TrackResources, TrackStealthed, Transform, UnderwaterWalking, Untrackable, UseNormalMovementSpeed, WaterBreathing, WaterWalk } from "./EffectTemplates/AuraTemplates";
import { SpellEffect } from "./SpellEffect";
export declare class AuraType extends EnumCellTransform<SpellEffect> {
    constructor(owner: SpellEffect, effectIndex: number);
    /** Enum Value:                                               0 */
    get NONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               1 */
    get BIND_SIGHT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, BindSight>;
    /** Enum Value:                                               2 */
    get MOD_POSSESS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPossess>;
    /** Enum Value:                                               3 */
    get PERIODIC_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PeriodicDamage>;
    /** Enum Value:                                               4 */
    get DUMMY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               5 */
    get MOD_CONFUSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModConfuse>;
    /** Enum Value:                                               6 */
    get MOD_CHARM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCharm>;
    /** Enum Value:                                               7 */
    get MOD_FEAR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModFear>;
    /** Enum Value:                                               8 */
    get PERIODIC_HEAL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PeriodicHeal>;
    /** Enum Value:                                               9 */
    get MOD_ATTACKSPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackSpeed>;
    /** Enum Value:                                               10 */
    get MOD_THREAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModThreat>;
    /** Enum Value:                                               11 */
    get MOD_TAUNT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTaunt>;
    /** Enum Value:                                               12 */
    get MOD_STUN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModStun>;
    /** Enum Value:                                               13 */
    get MOD_DAMAGE_DONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDamageDone>;
    /** Enum Value:                                               14 */
    get MOD_DAMAGE_TAKEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDamageTaken>;
    /** Enum Value:                                               15 */
    get DAMAGE_SHIELD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DamageShield>;
    /** Enum Value:                                               16 */
    get MOD_STEALTH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModStealth>;
    /** Enum Value:                                               17 */
    get MOD_DETECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDetect>;
    /** Enum Value:                                               18 */
    get MOD_INVISIBILITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModInvisibility>;
    /** Enum Value:                                               19 */
    get MOD_INVISIBILITY_DETECTION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModInvisibilityDetection>;
    /** Enum Value:                                               20 */
    get OBS_MOD_HEALTH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ObsModHealth>;
    /** Enum Value:                                               21 */
    get OBS_MOD_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ObsModPower>;
    /** Enum Value:                                               22 */
    get MOD_RESISTANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModResistance>;
    /** Enum Value:                                               23 */
    get PERIODIC_TRIGGER_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               24 */
    get PERIODIC_ENERGIZE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PeriodicEnergize>;
    /** Enum Value:                                               25 */
    get MOD_PACIFY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPacify>;
    /** Enum Value:                                               26 */
    get MOD_ROOT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRoot>;
    /** Enum Value:                                               27 */
    get MOD_SILENCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSilence>;
    /** Enum Value:                                               28 */
    get REFLECT_SPELLS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ReflectSpells>;
    /** Enum Value:                                               29 */
    get MOD_STAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModStat>;
    /** Enum Value:                                               30 */
    get MOD_SKILL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSkill>;
    /** Enum Value:                                               31 */
    get MOD_INCREASE_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseSpeed>;
    /** Enum Value:                                               32 */
    get MOD_INCREASE_MOUNTED_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseMountSpeed>;
    /** Enum Value:                                               33 */
    get MOD_DECREASE_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDecreaseSpeed>;
    /** Enum Value:                                               34 */
    get MOD_INCREASE_HEALTH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseHealth>;
    /** Enum Value:                                               35 */
    get MOD_INCREASE_ENERGY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseEnergy>;
    /** Enum Value:                                               36 */
    get MOD_SHAPESHIFT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModShapeshift>;
    /** Enum Value:                                               37 */
    get EFFECT_IMMUNITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, EffectImmunity>;
    /** Enum Value:                                               38 */
    get STATE_IMMUNITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, StateImmunity>;
    /** Enum Value:                                               39 */
    get SCHOOL_IMMUNITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SchoolImmunity>;
    /** Enum Value:                                               40 */
    get DAMAGE_IMMUNITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DamageImmunity>;
    /** Enum Value:                                               41 */
    get DISPEL_IMMUNITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DispelImmunity>;
    /** Enum Value:                                               42 */
    get PROC_TRIGGER_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ProcTriggerSpell>;
    /** Enum Value:                                               43 */
    get PROC_TRIGGER_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ProcTriggerDamage>;
    /** Enum Value:                                               44 */
    get TRACK_CREATURES(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TrackCreatures>;
    /** Enum Value:                                               45 */
    get TRACK_RESOURCES(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TrackResources>;
    /** Enum Value:                                               46 */
    get SPELL_AURA46(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               47 */
    get MOD_PARRY_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModParryPercent>;
    /** Enum Value:                                               48 */
    get SPELL_AURA48(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               49 */
    get MOD_DODGE_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDodgePercent>;
    /** Enum Value:                                               50 */
    get MOD_CRITICAL_HEALING_AMOUNT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCriticalHealAmount>;
    /** Enum Value:                                               51 */
    get MOD_BLOCK_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModBlockPercent>;
    /** Enum Value:                                               52 */
    get MOD_WEAPON_CRIT_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModWeaponCritPercent>;
    /** Enum Value:                                               53 */
    get PERIODIC_LEECH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PeriodicLeech>;
    /** Enum Value:                                               54 */
    get MOD_HIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHitChance>;
    /** Enum Value:                                               55 */
    get MOD_SPELL_HIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellHitChance>;
    /** Enum Value:                                               56 */
    get TRANSFORM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Transform>;
    /** Enum Value:                                               57 */
    get MOD_SPELL_CRIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellCritChance>;
    /** Enum Value:                                               58 */
    get MOD_INCREASE_SWIM_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseSwimSpeed>;
    /** Enum Value:                                               59 */
    get MOD_DAMAGE_DONE_CREATURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDamageDoneCreature>;
    /** Enum Value:                                               60 */
    get MOD_PACIFY_SILENCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPacifySilence>;
    /** Enum Value:                                               61 */
    get MOD_SCALE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModScale>;
    /** Enum Value:                                               62 */
    get PERIODIC_HEALTH_FUNNEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PeriodicHealthFunnel>;
    /** Enum Value:                                               63 */
    get SPELL_AURA63(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               64 */
    get PERIODIC_MANA_LEECH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PeriodicManaLeech>;
    /** Enum Value:                                               65 */
    get MOD_CASTING_SPEED_NOT_STACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCastingSpeedNotStack>;
    /** Enum Value:                                               66 */
    get FEIGN_DEATH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, FeignDeath>;
    /** Enum Value:                                               67 */
    get MOD_DISARM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDisarm>;
    /** Enum Value:                                               68 */
    get MOD_STALKED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModStalked>;
    /** Enum Value:                                               69 */
    get SCHOOL_ABSORB(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SchoolAbsorb>;
    /** Enum Value:                                               70 */
    get EXTRA_ATTACKS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               71 */
    get MOD_SPELL_CRIT_CHANCE_SCHOOL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellCritChanceSchool>;
    /** Enum Value:                                               72 */
    get MOD_POWER_COST_SCHOOL_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPowerCostSchoolPct>;
    /** Enum Value:                                               73 */
    get MOD_POWER_COST_SCHOOL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPowerCostSchool>;
    /** Enum Value:                                               74 */
    get REFLECT_SPELLS_SCHOOL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ReflectSpellsSchool>;
    /** Enum Value:                                               75 */
    get MOD_LANGUAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModLanguage>;
    /** Enum Value:                                               76 */
    get FAR_SIGHT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, FarSight>;
    /** Enum Value:                                               77 */
    get MECHANIC_IMMUNITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, MechanicImmunity>;
    /** Enum Value:                                               78 */
    get MOUNTED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Mounted>;
    /** Enum Value:                                               79 */
    get MOD_DAMAGE_PERCENT_DONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDamagePercentDone>;
    /** Enum Value:                                               80 */
    get MOD_PERCENT_STAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPercentStat>;
    /** Enum Value:                                               81 */
    get SPLIT_DAMAGE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SplitDamagePct>;
    /** Enum Value:                                               82 */
    get WATER_BREATHING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, WaterBreathing>;
    /** Enum Value:                                               83 */
    get MOD_BASE_RESISTANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModBaseResistance>;
    /** Enum Value:                                               84 */
    get MOD_REGEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRegen>;
    /** Enum Value:                                               85 */
    get MOD_POWER_REGEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPowerRegen>;
    /** Enum Value:                                               86 */
    get CHANNEL_DEATH_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ChannelDeathItem>;
    /** Enum Value:                                               87 */
    get MOD_DAMAGE_PERCENT_TAKEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDamagePercentTaken>;
    /** Enum Value:                                               88 */
    get MOD_HEALTH_REGEN_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHealthRegenPercent>;
    /** Enum Value:                                               89 */
    get PERIODIC_DAMAGE_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PeriodicDamagePercent>;
    /** Enum Value:                                               90 */
    get SPELL_AURA90(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               91 */
    get MOD_DETECT_RANGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDetectRange>;
    /** Enum Value:                                               92 */
    get PREVENTS_FLEEING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PreventsFleeing>;
    /** Enum Value:                                               93 */
    get MOD_UNATTACKABLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModUnattackable>;
    /** Enum Value:                                               94 */
    get INTERRUPT_REGEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, InterruptRegen>;
    /** Enum Value:                                               95 */
    get GHOST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Ghost>;
    /** Enum Value:                                               96 */
    get SPELL_MAGNET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellMagnet>;
    /** Enum Value:                                               97 */
    get MANA_SHIELD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ManaShield>;
    /** Enum Value:                                               98 */
    get MOD_SKILL_TALENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSkillTalent>;
    /** Enum Value:                                               99 */
    get MOD_ATTACK_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackPower>;
    /** Enum Value:                                               100 */
    get AURAS_VISIBLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AurasVisible>;
    /** Enum Value:                                               101 */
    get MOD_RESISTANCE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModResistancePct>;
    /** Enum Value:                                               102 */
    get MOD_MELEE_ATTACK_POWER_VERSUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMeleeAttackPowerVersus>;
    /** Enum Value:                                               103 */
    get MOD_TOTAL_THREAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTotalThreat>;
    /** Enum Value:                                               104 */
    get WATER_WALK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, WaterWalk>;
    /** Enum Value:                                               105 */
    get FEATHER_FALL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, FeatherFall>;
    /** Enum Value:                                               106 */
    get HOVER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Hover>;
    /** Enum Value:                                               107 */
    get ADD_FLAT_MODIFIER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AddFlatModifier>;
    /** Enum Value:                                               108 */
    get ADD_PCT_MODIFIER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AddPctModifier>;
    /** Enum Value:                                               109 */
    get ADD_TARGET_TRIGGER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AddTargetTrigger>;
    /** Enum Value:                                               110 */
    get MOD_POWER_REGEN_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPowerRegenPercent>;
    /** Enum Value:                                               111 */
    get ADD_CASTER_HIT_TRIGGER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AddCasterHitTrigger>;
    /** Enum Value:                                               112 */
    get OVERRIDE_CLASS_SCRIPTS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               113 */
    get MOD_RANGED_DAMAGE_TAKEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedDamageTaken>;
    /** Enum Value:                                               114 */
    get MOD_RANGED_DAMAGE_TAKEN_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedDamageTakenPct>;
    /** Enum Value:                                               115 */
    get MOD_HEALING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHealing>;
    /** Enum Value:                                               116 */
    get MOD_REGEN_DURING_COMBAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRegenDuringCombat>;
    /** Enum Value:                                               117 */
    get MOD_MECHANIC_RESISTANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMechanicResistance>;
    /** Enum Value:                                               118 */
    get MOD_HEALING_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHealingPct>;
    /** Enum Value:                                               119 */
    get SPELL_AURA119(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               120 */
    get UNTRACKABLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Untrackable>;
    /** Enum Value:                                               121 */
    get EMPATHY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Empathy>;
    /** Enum Value:                                               122 */
    get MOD_OFFHAND_DAMAGE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModOffhandDamagePct>;
    /** Enum Value:                                               123 */
    get MOD_TARGET_RESISTANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTargetResistance>;
    /** Enum Value:                                               124 */
    get MOD_RANGED_ATTACK_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedAttackPower>;
    /** Enum Value:                                               125 */
    get MOD_MELEE_DAMAGE_TAKEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMeleeDamageTaken>;
    /** Enum Value:                                               126 */
    get MOD_MELEE_DAMAGE_TAKEN_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMeleeDamageTakenPct>;
    /** Enum Value:                                               127 */
    get RANGED_ATTACK_POWER_ATTACKER_BONUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, RangedAttackPowerAttackerBonus>;
    /** Enum Value:                                               128 */
    get MOD_POSSESS_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPossessPet>;
    /** Enum Value:                                               129 */
    get MOD_SPEED_ALWAYS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpeedAlways>;
    /** Enum Value:                                               130 */
    get MOD_MOUNTED_SPEED_ALWAYS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMountedSpeedAlways>;
    /** Enum Value:                                               131 */
    get MOD_RANGED_ATTACK_POWER_VERSUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedAttackPowerVersus>;
    /** Enum Value:                                               132 */
    get MOD_INCREASE_ENERGY_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseEnergyPercent>;
    /** Enum Value:                                               133 */
    get MOD_INCREASE_HEALTH_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseHealthPercent>;
    /** Enum Value:                                               134 */
    get MOD_MANA_REGEN_INTERRUPT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModManaRegenInterrupt>;
    /** Enum Value:                                               135 */
    get MOD_HEALING_DONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHealingDone>;
    /** Enum Value:                                               136 */
    get MOD_HEALING_DONE_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHealingDonePercent>;
    /** Enum Value:                                               137 */
    get MOD_TOTAL_STAT_PERCENTAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTotalStatPercentage>;
    /** Enum Value:                                               138 */
    get MOD_MELEE_HASTE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMeleeHaste>;
    /** Enum Value:                                               139 */
    get FORCE_REACTION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ForceReaction>;
    /** Enum Value:                                               140 */
    get MOD_RANGED_HASTE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedHaste>;
    /** Enum Value:                                               141 */
    get MOD_RANGED_AMMO_HASTE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedAmmoHaste>;
    /** Enum Value:                                               142 */
    get MOD_BASE_RESISTANCE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModBaseResistancePct>;
    /** Enum Value:                                               143 */
    get MOD_RESISTANCE_EXCLUSIVE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModResistanceExclusive>;
    /** Enum Value:                                               144 */
    get SAFE_FALL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SafeFall>;
    /** Enum Value:                                               145 */
    get MOD_PET_TALENT_POINTS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModPetTalentPoints>;
    /** Enum Value:                                               146 */
    get ALLOW_TAME_PET_TYPE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AllowTamePetType>;
    /** Enum Value:                                               147 */
    get MECHANIC_IMMUNITY_MASK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, MechanicImmunityMask>;
    /** Enum Value:                                               148 */
    get RETAIN_COMBO_POINTS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, RetainComboPoints>;
    /** Enum Value:                                               149 */
    get REDUCE_PUSHBACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ReducePushback>;
    /** Enum Value:                                               150 */
    get MOD_SHIELD_BLOCKVALUE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModShieldBlockValuePct>;
    /** Enum Value:                                               151 */
    get TRACK_STEALTHED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TrackStealthed>;
    /** Enum Value:                                               152 */
    get MOD_DETECTED_RANGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDetectedRange>;
    /** Enum Value:                                               153 */
    get SPLIT_DAMAGE_FLAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SplitDamageFlat>;
    /** Enum Value:                                               154 */
    get MOD_STEALTH_LEVEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModStealthLevel>;
    /** Enum Value:                                               155 */
    get MOD_WATER_BREATHING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModWaterBreathing>;
    /** Enum Value:                                               156 */
    get MOD_REPUTATION_GAIN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModReputationGain>;
    /** Enum Value:                                               157 */
    get PET_DAMAGE_MULTI(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PetDamageMulti>;
    /** Enum Value:                                               158 */
    get MOD_SHIELD_BLOCKVALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModShieldBlockValue>;
    /** Enum Value:                                               159 */
    get NO_PVP_CREDIT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, NoPvPCredit>;
    /** Enum Value:                                               160 */
    get MOD_AOE_AVOIDANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAoEAvoidance>;
    /** Enum Value:                                               161 */
    get MOD_HEALTH_REGEN_IN_COMBAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               162 */
    get POWER_BURN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PowerBurn>;
    /** Enum Value:                                               163 */
    get MOD_CRIT_DAMAGE_BONUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCritDamageBonus>;
    /** Enum Value:                                               164 */
    get SPELL_AURA164(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               165 */
    get MELEE_ATTACK_POWER_ATTACKER_BONUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, MeleeAttackPowerAttackerBonus>;
    /** Enum Value:                                               166 */
    get MOD_ATTACK_POWER_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackPowerPct>;
    /** Enum Value:                                               167 */
    get MOD_RANGED_ATTACK_POWER_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedAttackPowerPct>;
    /** Enum Value:                                               168 */
    get MOD_DAMAGE_DONE_VERSUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDamageDoneVersus>;
    /** Enum Value:                                               169 */
    get MOD_CRIT_PERCENT_VERSUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCritPercentVersus>;
    /** Enum Value:                                               170 */
    get DETECT_AMORE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DetectAmore>;
    /** Enum Value:                                               171 */
    get MOD_SPEED_NOT_STACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpeedNotStack>;
    /** Enum Value:                                               172 */
    get MOD_MOUNTED_SPEED_NOT_STACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMountedSpeedNotStack>;
    /** Enum Value:                                               173 */
    get SPELL_AURA173(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               174 */
    get MOD_SPELL_DAMAGE_OF_STAT_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellDamageOfStatPercent>;
    /** Enum Value:                                               175 */
    get MOD_SPELL_HEALING_OF_STAT_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellHealingOfStatPercent>;
    /** Enum Value:                                               176 */
    get SPIRIT_OF_REDEMPTION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpiritOfRedemption>;
    /** Enum Value:                                               177 */
    get AOE_CHARM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AoECharm>;
    /** Enum Value:                                               178 */
    get MOD_DEBUFF_RESISTANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDebuffResistance>;
    /** Enum Value:                                               179 */
    get MOD_ATTACKER_SPELL_CRIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerSpellCritChance>;
    /** Enum Value:                                               180 */
    get MOD_FLAT_SPELL_DAMAGE_VERSUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModFlatSpellDamageVersus>;
    /** Enum Value:                                               181 */
    get SPELL_AURA181(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               182 */
    get MOD_RESISTANCE_OF_STAT_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModResistanceOfStatPercent>;
    /** Enum Value:                                               183 */
    get MOD_CRITICAL_THREAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCriticalThreat>;
    /** Enum Value:                                               184 */
    get MOD_ATTACKER_MELEE_HIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerMeleeHitChance>;
    /** Enum Value:                                               185 */
    get MOD_ATTACKER_RANGED_HIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerRangedHitChance>;
    /** Enum Value:                                               186 */
    get MOD_ATTACKER_SPELL_HIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerSpellHitChance>;
    /** Enum Value:                                               187 */
    get MOD_ATTACKER_MELEE_CRIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerMeleeCritChance>;
    /** Enum Value:                                               188 */
    get MOD_ATTACKER_RANGED_CRIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerRangedCritChance>;
    /** Enum Value:                                               189 */
    get MOD_RATING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRating>;
    /** Enum Value:                                               190 */
    get MOD_FACTION_REPUTATION_GAIN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModFactionReputationGain>;
    /** Enum Value:                                               191 */
    get USE_NORMAL_MOVEMENT_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, UseNormalMovementSpeed>;
    /** Enum Value:                                               192 */
    get MOD_MELEE_RANGED_HASTE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMeleeRangedHaste>;
    /** Enum Value:                                               193 */
    get MELEE_SLOW(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, MeleeSlow>;
    /** Enum Value:                                               194 */
    get MOD_TARGET_ABSORB_SCHOOL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTargetAbsorbSchool>;
    /** Enum Value:                                               195 */
    get MOD_TARGET_ABILITY_ABSORB_SCHOOL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTargetAbilityAbsorbSchool>;
    /** Enum Value:                                               196 */
    get MOD_COOLDOWN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCooldown>;
    /** Enum Value:                                               197 */
    get MOD_ATTACKER_SPELL_AND_WEAPON_CRIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerSpellAndWeaponCritChance>;
    /** Enum Value:                                               198 */
    get SPELL_AURA198(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               199 */
    get MOD_INCREASES_SPELL_PCT_TO_HIT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreasesSpellPctToHit>;
    /** Enum Value:                                               200 */
    get MOD_XP_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModXpPct>;
    /** Enum Value:                                               201 */
    get FLY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Fly>;
    /** Enum Value:                                               202 */
    get CANNOT_BE_DODGED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CannotBeDodged>;
    /** Enum Value:                                               203 */
    get MOD_ATTACKER_MELEE_CRIT_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerMeleeCritDamage>;
    /** Enum Value:                                               204 */
    get MOD_ATTACKER_RANGED_CRIT_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackerRangedCritDamage>;
    /** Enum Value:                                               205 */
    get MOD_SCHOOL_CRIT_DMG_TAKEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSchoolCritDmgTaken>;
    /** Enum Value:                                               206 */
    get MOD_INCREASE_VEHICLE_FLIGHT_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseVehicleFlightSpeed>;
    /** Enum Value:                                               207 */
    get MOD_INCREASE_MOUNTED_FLIGHT_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseMountedFlightSpeed>;
    /** Enum Value:                                               208 */
    get MOD_INCREASE_FLIGHT_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseFlightSpeed>;
    /** Enum Value:                                               209 */
    get MOD_MOUNTED_FLIGHT_SPEED_ALWAYS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMountedFlightSpeedAlways>;
    /** Enum Value:                                               210 */
    get MOD_VEHICLE_SPEED_ALWAYS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModVehicleSpeedAlways>;
    /** Enum Value:                                               211 */
    get MOD_FLIGHT_SPEED_NOT_STACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModFlightSpeedNotStack>;
    /** Enum Value:                                               212 */
    get MOD_RANGED_ATTACK_POWER_OF_STAT_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRangedAttackPowerOfStatPercent>;
    /** Enum Value:                                               213 */
    get MOD_RAGE_FROM_DAMAGE_DEALT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRageFromDamageDealt>;
    /** Enum Value:                                               214 */
    get TAMED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Tamed>;
    /** Enum Value:                                               215 */
    get ARENA_PREPARATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ArenaPreparation>;
    /** Enum Value:                                               216 */
    get HASTE_SPELLS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, HasteSpells>;
    /** Enum Value:                                               217 */
    get SPELL_AURA217(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               218 */
    get HASTE_RANGED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, HasteRanged>;
    /** Enum Value:                                               219 */
    get MOD_MANA_REGEN_FROM_STAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModManaRegenFromStat>;
    /** Enum Value:                                               220 */
    get MOD_RATING_FROM_STAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModRatingFromStat>;
    /** Enum Value:                                               221 */
    get MOD_DETAUNT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDetaunt>;
    /** Enum Value:                                               222 */
    get SPELL_AURA222(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               223 */
    get RAID_PROC_FROM_CHARGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, RaidProcFromCharge>;
    /** Enum Value:                                               224 */
    get SPELL_AURA224(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               225 */
    get RAID_PROC_FROM_CHARGE_WITH_VALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, RaidProcFromChargeWithValue>;
    /** Enum Value:                                               226 */
    get PERIODIC_DUMMY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               227 */
    get PERIODIC_TRIGGER_SPELL_WITH_VALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               228 */
    get DETECT_STEALTH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DetectStealth>;
    /** Enum Value:                                               229 */
    get MOD_AOE_DAMAGE_AVOIDANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAoEDamageAvoidance>;
    /** Enum Value:                                               230 */
    get MOD_INCREASE_HEALTH2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseHealth2>;
    /** Enum Value:                                               231 */
    get PROC_TRIGGER_SPELL_WITH_VALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               232 */
    get MECHANIC_DURATION_MOD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, MechanicDurationMod>;
    /** Enum Value:                                               233 */
    get SPELL_AURA233(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               234 */
    get MECHANIC_DURATION_MOD_NOT_STACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, MechanicDurationModNotStack>;
    /** Enum Value:                                               235 */
    get MOD_DISPEL_RESIST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDispelResist>;
    /** Enum Value:                                               236 */
    get CONTROL_VEHICLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ControlVehicle>;
    /** Enum Value:                                               237 */
    get MOD_SPELL_DAMAGE_OF_ATTACK_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellDamageOfAttackPower>;
    /** Enum Value:                                               238 */
    get MOD_SPELL_HEALING_OF_ATTACK_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellHealingOfAttackPower>;
    /** Enum Value:                                               239 */
    get MOD_SCALE2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModScale2>;
    /** Enum Value:                                               240 */
    get MOD_EXPERTISE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModExpertise>;
    /** Enum Value:                                               241 */
    get FORCE_MOVE_FORWARD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ForceMoveForward>;
    /** Enum Value:                                               242 */
    get MOD_SPELL_DAMAGE_FROM_HEALING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModSpellDamageFromHealing>;
    /** Enum Value:                                               243 */
    get MOD_FACTION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModFaction>;
    /** Enum Value:                                               244 */
    get COMPREHEND_LANGUAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ComprehendLanguage>;
    /** Enum Value:                                               245 */
    get MOD_AURA_DURATION_BY_DISPEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAuraDurationByDispel>;
    /** Enum Value:                                               246 */
    get MOD_AURA_DURATION_BY_DISPEL_NOT_STACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAuraDurationByDispelNotStack>;
    /** Enum Value:                                               247 */
    get CLONE_CASTER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CloneCaster>;
    /** Enum Value:                                               248 */
    get MOD_COMBAT_RESULT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCombatResultChance>;
    /** Enum Value:                                               249 */
    get CONVERT_RUNE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ConvertRune>;
    /** Enum Value:                                               250 */
    get MOD_INCREASE_HEALTH3(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIncreaseHealth3>;
    /** Enum Value:                                               251 */
    get MOD_ENEMY_DODGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModEnemyDodge>;
    /** Enum Value:                                               252 */
    get SPELL_AURA252(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               253 */
    get MOD_BLOCK_CRIT_CHANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModBlockCritChance>;
    /** Enum Value:                                               254 */
    get MOD_DISARM_OFFHAND(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDisarmOffhand>;
    /** Enum Value:                                               255 */
    get MOD_MECHANIC_DAMAGE_TAKEN_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMechanicDamageTakenPercent>;
    /** Enum Value:                                               256 */
    get NO_REAGENT_USE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, NoReagentUse>;
    /** Enum Value:                                               257 */
    get MOD_TARGET_RESIST_BY_SPELL_CLASS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTargetResistBySpellClass>;
    /** Enum Value:                                               258 */
    get MOD_SPELL_VISUAL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               259 */
    get MOD_HOT_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHotPct>;
    /** Enum Value:                                               260 */
    get SCREEN_EFFECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ScreenEffect>;
    /** Enum Value:                                               261 */
    get PHASE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Phase>;
    /** Enum Value:                                               262 */
    get ABILITY_IGNORE_AURASTATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               263 */
    get ALLOW_ONLY_ABILITY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AllowOnlyAbility>;
    /** Enum Value:                                               264 */
    get SPELL_AURA264(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               265 */
    get SPELL_AURA265(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               266 */
    get SPELL_AURA266(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               267 */
    get MOD_IMMUNE_AURA_APPLY_SCHOOL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModImmuneAuraApplySchool>;
    /** Enum Value:                                               268 */
    get MOD_ATTACK_POWER_OF_STAT_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackPowerOfStatPercent>;
    /** Enum Value:                                               269 */
    get MOD_IGNORE_TARGET_RESIST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIgnoreTargetResist>;
    /** Enum Value:                                               270 */
    get MOD_ABILITY_IGNORE_TARGET_RESIST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               271 */
    get MOD_DAMAGE_FROM_CASTER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDamageFromCaster>;
    /** Enum Value:                                               272 */
    get IGNORE_MELEE_RESET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, IgnoreMeleeReset>;
    /** Enum Value:                                               273 */
    get SPELL_AURA273(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               274 */
    get CONSUME_NO_AMMO(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ConsumeNoAmmo>;
    /** Enum Value:                                               275 */
    get MOD_IGNORE_SHAPESHIFT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModIgnoreShapeshift>;
    /** Enum Value:                                               276 */
    get SPELL_AURA276(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               277 */
    get MOD_ABILITY_AFFECTED_TARGETS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAbilityAffectedTargets>;
    /** Enum Value:                                               278 */
    get MOD_DISARM_RANGED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModDisarmRanged>;
    /** Enum Value:                                               279 */
    get INITIALIZE_IMAGES(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, InitializeImages>;
    /** Enum Value:                                               280 */
    get MOD_TARGET_ARMOR_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModTargetArmorPct>;
    /** Enum Value:                                               281 */
    get MOD_HONOR_GAIN_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHonorGainPct>;
    /** Enum Value:                                               282 */
    get INCREASE_BASE_HEALTH_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, IncreaseBaseHealthPercent>;
    /** Enum Value:                                               283 */
    get MOD_HEALING_RECEIVED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModHealingReceived>;
    /** Enum Value:                                               284 */
    get LINKED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               285 */
    get MOD_ATTACK_POWER_OF_ARMOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModAttackPowerOfArmor>;
    /** Enum Value:                                               286 */
    get ABILITY_PERIODIC_CRIT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               287 */
    get DEFLECT_SPELLS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DeflectSpells>;
    /** Enum Value:                                               288 */
    get IGNORE_HIT_DIRECTION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, IgnoreHitDirection>;
    /** Enum Value:                                               289 */
    get SPELL_AURA289(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               290 */
    get MOD_CRIT_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCritPct>;
    /** Enum Value:                                               291 */
    get MOD_XP_QUEST_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModXpQuestPct>;
    /** Enum Value:                                               292 */
    get OPEN_STABLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               293 */
    get SPELL_AURA293(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               294 */
    get PREVENT_REGENERATE_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PreventRegeneratePower>;
    /** Enum Value:                                               295 */
    get SPELL_AURA295(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               296 */
    get SET_VEHICLE_ID(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SetVehicleId>;
    /** Enum Value:                                               297 */
    get SPELL_AURA297(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               298 */
    get SPELL_AURA298(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               299 */
    get SPELL_AURA299(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               300 */
    get SHARE_DAMAGE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ShareDamagePct>;
    /** Enum Value:                                               301 */
    get SCHOOL_HEAL_ABSORB(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SchoolHealAbsorb>;
    /** Enum Value:                                               302 */
    get SPELL_AURA302(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               303 */
    get MOD_DAMAGE_DONE_VERSUS_AURASTATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               304 */
    get MOD_DRUNK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               305 */
    get MOD_MINIMUM_SPEED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModMinimumSpeed>;
    /** Enum Value:                                               306 */
    get SPELL_AURA306(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               307 */
    get SPELL_AURA307(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               308 */
    get SPELL_AURA308(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               309 */
    get SPELL_AURA309(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               310 */
    get MOD_CREATURE_AOE_DAMAGE_AVOIDANCE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModCreatureAoEDamageAvoidance>;
    /** Enum Value:                                               311 */
    get SPELL_AURA311(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               312 */
    get SPELL_AURA312(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               313 */
    get SPELL_AURA313(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                               314 */
    get PREVENT_RESURRECTION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PreventResurrection>;
    /** Enum Value:                                               315 */
    get UNDERWATER_WALKING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, UnderwaterWalking>;
    /** Enum Value:                                               316 */
    get PERIODIC_HASTE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
}
