/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
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
import { CellIndexWrapper } from "wotlkdata/wotlkdata/cell/cells/CellArray";
import { EnumCellTransform } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { ActivateObject, ActivateRune, AddComboPoints, AddFarsight, AddHonor, ApplyGlyph, BindHome, CanTitanGrip, CastButtons, Charge, ChargeDest, ClearQuest, CommandTotemCreature, CompleteQuest, CreateItem, CreateManaGem, CreateRandomItem, DestroyAllTotems, Dispel, DispelMechanic, DurabilityDamage, DurabilityDamagePercent, EnchantHeldItem, EnchantItem, EnchantItemTemp, EnchantPrismaticItem, Energize, EnergizePercent, EnvironmentalDamage, ExtraAttacks, FailQuest, ForceCast, ForceCastWithValue, GameObjectDamage, GameObjectRepair, Heal, HealMaxHealth, HealMechanical, HealPercent, HealthLeech, InterruptCast, Jump, JumpDest, KillCredit, Knockback, KnockbackDest, Language, Leap, LeapBack, LearnPetSpell, LearnSpell, MakeDrunk, ModifyThreatPercent, OpenLock, Pickpocket, PlayMusic, PlaySound, PowerBurn, PowerDrain, PullTowards, PullTowardsDest, RedirectThreat, RemoveAura, Reputation, Resurrect, ResurrectSelf, Sanctuary, SchoolDamage, ScriptEffect, SendEvent, SendTaxi, SetGameObjectDestructibleState, Skill, SkillStep, StartQuest, StealBeneficialBuff, Summon, SummonObjectSlot1, SummonObjectSlot2, SummonObjectSlot3, SummonObjectSlot4, SummonObjectWild, SummonPet, TeleportUnitFaceCaster, TeleportUnits, Threat, TradeSkill, TransDoor, TriggerMissile, TriggerMissileWithValue, TriggerSpell, TriggerSpellWithValue, Weapon, WeaponDamage, WeaponDamageNoSchool, WeaponPercentDamage } from "./EffectTemplates/EffectTemplates";
import { SpellEffect } from "./SpellEffect";

export class SpellEffectType extends EnumCellTransform<SpellEffect> {
    constructor(owner: SpellEffect, index: number) {
        super(owner, new CellIndexWrapper(undefined, owner.row.Effect, index));
    }

    /** Enum Value:                                         0 */
    get NULL()                          { return this.value(0, x=>x) }
    /** Enum Value:                                         1 */
    get INSTAKILL()                     { return this.value(1, x=>x) }
    /** Enum Value:                                         2 */
    get SCHOOL_DAMAGE()                 { return this.value(2, x=>new SchoolDamage(x)) }
    /** Enum Value:                                         3 */
    get DUMMY()                         { return this.value(3, x=>x) }
    /** Enum Value:                                         4 */
    get PORTAL_TELEPORT()              { return this.value(4, x=>x) }
    /** Enum Value:                                         5 */
    get TELEPORT_UNITS()                { return this.value(5, x=>new TeleportUnits(x)) }
    /** Enum Value:                                         6 */
    get APPLY_AURA()                    { return this.value(6, x=>x) }
    /** Enum Value:                                         7 */
    get ENVIRONMENTAL_DAMAGE()          { return this.value(7, x=>new EnvironmentalDamage(x)) }
    /** Enum Value:                                         8 */
    get POWER_DRAIN()                   { return this.value(8, x=>new PowerDrain(x)) }
    /** Enum Value:                                         9 */
    get HEALTH_LEECH()                  { return this.value(9, x=>new HealthLeech(x)) }
    /** Enum Value:                                         10 */
    get HEAL()                          { return this.value(10, x=>new Heal(x)) }
    /** Enum Value:                                         11 */
    get BIND()                          { return this.value(11, x=>new BindHome(x)) }
    /** Enum Value:                                         12 */
    get CONTROL_TOTEM_CREATURE()        { return this.value(12, x=>new CommandTotemCreature(x)) }
    /** Enum Value:                                         13 */
    get RITUAL_BASE()                  { return this.value(13, x=>x) }
    /** Enum Value:                                         14 */
    get RITUAL_SPECIALIZE()            { return this.value(14, x=>x) }
    /** Enum Value:                                         15 */
    get RITUAL_ACTIVATE_PORTAL()       { return this.value(15, x=>x) }
    /** Enum Value:                                         16 */
    get QUEST_COMPLETE()                { return this.value(16, x=>new CompleteQuest(x)) }
    /** Enum Value:                                         17 */
    get WEAPON_DAMAGE_NOSCHOOL()        { return this.value(17, x=>new WeaponDamageNoSchool(x)) }
    /** Enum Value:                                         18 */
    get RESURRECT()                     { return this.value(18, x=>new Resurrect(x)) }
    /** Enum Value:                                         19 */
    get ADD_EXTRA_ATTACKS()             { return this.value(19, x=>x) }
    /** Enum Value:                                         20 */
    get DODGE()                        { return this.value(20, x=>new ExtraAttacks(x)) }
    /** Enum Value:                                         21 */
    get EVADE()                        { return this.value(21, x=>x) }
    /** Enum Value:                                         22 */
    get PARRY()                         { return this.value(22, x=>x) }
    /** Enum Value:                                         23 */
    get BLOCK()                        { return this.value(23, x=>x) }
    /** Enum Value:                                         24 */
    get CREATE_ITEM()                   { return this.value(24, x=>new CreateItem(x)) }
    /** Enum Value:                                         25 */
    get WEAPON()                        { return this.value(25, x=>new Weapon(x)) }
    /** Enum Value:                                         26 */
    get DEFENSE()                      { return this.value(26, x=>x) }
    /** Enum Value:                                         27 */
    get PERSISTENT_AREA_AURA()          { return this.value(27, x=>x) }
    /** Enum Value:                                         28 */
    get SUMMON()                        { return this.value(28, x=>new Summon(x)) }
    /** Enum Value:                                         29 */
    get LEAP()                          { return this.value(29, x=>new Leap(x)) }
    /** Enum Value:                                         30 */
    get ENERGIZE()                      { return this.value(30, x=>new Energize(x)) }
    /** Enum Value:                                         31 */
    get WEAPON_PERCENT_DAMAGE()         { return this.value(31, x=>new WeaponPercentDamage(x)) }
    /** Enum Value:                                         32 */
    get TRIGGER_MISSILE()               { return this.value(32, x=>new TriggerMissile(x)) }
    /** Enum Value:                                         33 */
    get OPEN_LOCK()                     { return this.value(33, x=>new OpenLock(x)) }
    /** Enum Value:                                         34 */
    get SUMMON_CHANGE_ITEM()            { return this.value(34, x=>x) }
    /** Enum Value:                                         35 */
    get APPLY_AREA_AURA_PARTY()         { return this.value(35, x=>x) }
    /** Enum Value:                                         36 */
    get LEARN_SPELL()                   { return this.value(36, x=>new LearnSpell(x)) }
    /** Enum Value:                                         37 */
    get SPELL_DEFENSE()                { return this.value(37, x=>x) }
    /** Enum Value:                                         38 */
    get DISPEL()                        { return this.value(38, x=>new Dispel(x)) }
    /** Enum Value:                                         39 */
    get LANGUAGE()                      { return this.value(39, x=>new Language(x)) }
    /** Enum Value:                                         40 */
    get DUAL_WIELD()                    { return this.value(40, x=>x) }
    /** Enum Value:                                         41 */
    get JUMP()                          { return this.value(41, x=>new Jump(x)) }
    /** Enum Value:                                         42 */
    get JUMP_DEST()                     { return this.value(42, x=>new JumpDest(x)) }
    /** Enum Value:                                         43 */
    get TELEPORT_UNITS_FACE_CASTER()    { return this.value(43, x=>new TeleportUnitFaceCaster(x)) }
    /** Enum Value:                                         44 */
    get SKILL_STEP()                    { return this.value(44, x=>new SkillStep(x)) }
    /** Enum Value:                                         45 */
    get ADD_HONOR()                     { return this.value(45, x=>new AddHonor(x)) }
    /** Enum Value:                                         46 */
    get SPAWN()                        { return this.value(46, x=>x) }
    /** Enum Value:                                         47 */
    get TRADE_SKILL()                   { return this.value(47, x=>new TradeSkill(x)) }
    /** Enum Value:                                         48 */
    get STEALTH()                      { return this.value(48, x=>x) }
    /** Enum Value:                                         49 */
    get DETECT()                       { return this.value(49, x=>x) }
    /** Enum Value:                                         50 */
    get TRANS_DOOR()                    { return this.value(50, x=>new TransDoor(x)) }
    /** Enum Value:                                         51 */
    get FORCE_CRITICAL_HIT()           { return this.value(51, x=>x) }
    /** Enum Value:                                         52 */
    get GUARANTEE_HIT()                { return this.value(52, x=>x) }
    /** Enum Value:                                         53 */
    get ENCHANT_ITEM()                  { return this.value(53, x=>new EnchantItem(x)) }
    /** Enum Value:                                         54 */
    get ENCHANT_ITEM_TEMPORARY()        { return this.value(54, x=>new EnchantItemTemp(x)) }
    /** Enum Value:                                         55 */
    get TAMECREATURE()                  { return this.value(55, x=>x) }
    /** Enum Value:                                         56 */
    get SUMMON_PET()                    { return this.value(56, x=>new SummonPet(x)) }
    /** Enum Value:                                         57 */
    get LEARN_PET_SPELL()               { return this.value(57, x=>new LearnPetSpell(x)) }
    /** Enum Value:                                         58 */
    get WEAPON_DAMAGE()                 { return this.value(58, x=>new WeaponDamage(x)) }
    /** Enum Value:                                         59 */
    get CREATE_RANDOM_ITEM()           { return this.value(59, x=>new CreateRandomItem(x)) }
    /** Enum Value:                                         60 */
    get PROFICIENCY()                   { return this.value(60, x=>x) }
    /** Enum Value:                                         61 */
    get SEND_EVENT()                    { return this.value(61, x=>new SendEvent(x)) }
    /** Enum Value:                                         62 */
    get POWER_BURN()                    { return this.value(62, x=>new PowerBurn(x)) }
    /** Enum Value:                                         63 */
    get THREAT()                        { return this.value(63, x=>new Threat(x)) }
    /** Enum Value:                                         64 */
    get TRIGGER_SPELL()                 { return this.value(64, x=>new TriggerSpell(x)) }
    /** Enum Value:                                         65 */
    get APPLY_AREA_AURA_RAID()          { return this.value(65, x=>x) }
    /** Enum Value:                                         66 */
    get CREATE_MANA_GEM()              { return this.value(66, x=>new CreateManaGem(x)) }
    /** Enum Value:                                         67 */
    get HEAL_MAX_HEALTH()               { return this.value(67, x=>new HealMaxHealth(x)) }
    /** Enum Value:                                         68 */
    get INTERRUPT_CAST()                { return this.value(68, x=>new InterruptCast(x)) }
    /** Enum Value:                                         69 */
    get DISTRACT()                      { return this.value(69, x=>x) }
    /** Enum Value:                                         70 */
    get PULL()                         { return this.value(70, x=>x) }
    /** Enum Value:                                         71 */
    get PICKPOCKET()                    { return this.value(71, x=>new Pickpocket(x)) }
    /** Enum Value:                                         72 */
    get ADD_FARSIGHT()                  { return this.value(72, x=>new AddFarsight(x)) }
    /** Enum Value:                                         73 */
    get UNTRAIN_TALENTS()               { return this.value(73, x=>x) }
    /** Enum Value:                                         74 */
    get APPLY_GLYPH()                   { return this.value(74, x=>new ApplyGlyph(x)) }
    /** Enum Value:                                         75 */
    get HEAL_MECHANICAL()              { return this.value(75, x=>new HealMechanical(x)) }
    /** Enum Value:                                         76 */
    get SUMMON_OBJECT_WILD()            { return this.value(76, x=>new SummonObjectWild(x)) }
    /** Enum Value:                                         77 */
    get SCRIPT_EFFECT()                 { return this.value(77, x=>new ScriptEffect(x)) }
    /** Enum Value:                                         78 */
    get ATTACK()                        { return this.value(78, x=>x) }
    /** Enum Value:                                         79 */
    get SANCTUARY()                     { return this.value(79, x=>new Sanctuary(x)) }
    /** Enum Value:                                         80 */
    get ADD_COMBO_POINTS()              { return this.value(80, x=>new AddComboPoints(x)) }
    /** Enum Value:                                         81 */
    get CREATE_HOUSE()                 { return this.value(81, x=>x) }
    /** Enum Value:                                         82 */
    get BIND_SIGHT()                    { return this.value(82, x=>x) }
    /** Enum Value:                                         83 */
    get DUEL()                          { return this.value(83, x=>x) }
    /** Enum Value:                                         84 */
    get STUCK()                         { return this.value(84, x=>x) }
    /** Enum Value:                                         85 */
    get SUMMON_PLAYER()                 { return this.value(85, x=>x) }
    /** Enum Value:                                         86 */
    get ACTIVATE_OBJECT()               { return this.value(86, x=>new ActivateObject(x)) }
    /** Enum Value:                                         87 */
    get GAMEOBJECT_DAMAGE()             { return this.value(87, x=>new GameObjectDamage(x)) }
    /** Enum Value:                                         88 */
    get GAMEOBJECT_REPAIR()             { return this.value(88, x=>new GameObjectRepair(x)) }
    /** Enum Value:                                         89 */
    get GAMEOBJECT_SET_DESTRUCTION_STATE() { return this.value(89, x=>new SetGameObjectDestructibleState(x)) }
    /** Enum Value:                                         90 */
    get KILL_CREDIT()                  { return this.value(90, x=>new KillCredit(x)) }
    /** Enum Value:                                         91 */
    get THREAT_ALL()                   { return this.value(91, x=>x) }
    /** Enum Value:                                         92 */
    get ENCHANT_HELD_ITEM()             { return this.value(92, x=>new EnchantHeldItem(x)) }
    /** Enum Value:                                         93 */
    get FORCE_DESELECT()                { return this.value(93, x=>x) }
    /** Enum Value:                                         94 */
    get SELF_RESURRECT()                { return this.value(94, x=>new ResurrectSelf(x)) }
    /** Enum Value:                                         95 */
    get SKINNING()                      { return this.value(95, x=>x) }
    /** Enum Value:                                         96 */
    get CHARGE()                        { return this.value(96, x=>new Charge(x)) }
    /** Enum Value:                                         97 */
    get CAST_BUTTON()                  { return this.value(97, x=>new CastButtons(x)) }
    /** Enum Value:                                         98 */
    get KNOCK_BACK()                    { return this.value(98, x=>new Knockback(x)) }
    /** Enum Value:                                         99 */
    get DISENCHANT()                    { return this.value(99, x=>x) }
    /** Enum Value:                                         100 */
    get INEBRIATE()                     { return this.value(100, x=>new MakeDrunk(x)) }
    /** Enum Value:                                         101 */
    get FEED_PET()                      { return this.value(101, x=>x) }
    /** Enum Value:                                         102 */
    get DISMISS_PET()                   { return this.value(102, x=>x) }
    /** Enum Value:                                         103 */
    get REPUTATION()                    { return this.value(103, x=>new Reputation(x)) }
    /** Enum Value:                                         104 */
    get SUMMON_OBJECT_SLOT1()           { return this.value(104, x=>new SummonObjectSlot1(x)) }
    /** Enum Value:                                         105 */
    get SUMMON_OBJECT_SLOT2()           { return this.value(105, x=>new SummonObjectSlot2(x)) }
    /** Enum Value:                                         106 */
    get SUMMON_OBJECT_SLOT3()           { return this.value(106, x=>new SummonObjectSlot3(x)) }
    /** Enum Value:                                         107 */
    get SUMMON_OBJECT_SLOT4()           { return this.value(107, x=>new SummonObjectSlot4(x)) }
    /** Enum Value:                                         108 */
    get DISPEL_MECHANIC()               { return this.value(108, x=>new DispelMechanic(x)) }
    /** Enum Value:                                         109 */
    get SUMMON_DEAD_PET()               { return this.value(109, x=>x) }
    /** Enum Value:                                         110 */
    get DESTROY_ALL_TOTEMS()            { return this.value(110, x=>new DestroyAllTotems(x)) }
    /** Enum Value:                                         111 */
    get DURABILITY_DAMAGE()             { return this.value(111, x=>new DurabilityDamage(x)) }
    /** Enum Value:                                         112 */
    get SPELL_EFFECT112()               { return this.value(112, x=>x) }
    /** Enum Value:                                         113 */
    get RESURRECT_NEW()                 { return this.value(113, x=>x) }
    /** Enum Value:                                         114 */
    get ATTACK_ME()                     { return this.value(114, x=>x) }
    /** Enum Value:                                         115 */
    get DURABILITY_DAMAGE_PCT()         { return this.value(115, x=>new DurabilityDamagePercent(x)) }
    /** Enum Value:                                         116 */
    get SKIN_PLAYER_CORPSE()           { return this.value(116, x=>x) }
    /** Enum Value:                                         117 */
    get SPIRIT_HEAL()                  { return this.value(117, x=>x) }
    /** Enum Value:                                         118 */
    get SKILL()                        { return this.value(118, x=>new Skill(x)) }
    /** Enum Value:                                         119 */
    get APPLY_AREA_AURA_PET()           { return this.value(119, x=>x) }
    /** Enum Value:                                         120 */
    get TELEPORT_GRAVEYARD()           { return this.value(120, x=>x) }
    /** Enum Value:                                         121 */
    get NORMALIZED_WEAPON_DMG()         { return this.value(121, x=>x) }
    /** Enum Value:                                         122 */
    get SPELL_EFFECT122()              { return this.value(122, x=>x) }
    /** Enum Value:                                         123 */
    get SEND_TAXI()                    { return this.value(123, x=>new SendTaxi(x)) }
    /** Enum Value:                                         124 */
    get PULL_TOWARDS()                  { return this.value(124, x=>new PullTowards(x)) }
    /** Enum Value:                                         125 */
    get MODIFY_THREAT_PERCENT()         { return this.value(125, x=>new ModifyThreatPercent(x)) }
    /** Enum Value:                                         126 */
    get STEAL_BENEFICIAL_BUFF()        { return this.value(126, x=>new StealBeneficialBuff(x)) }
    /** Enum Value:                                         127 */
    get PROSPECTING()                  { return this.value(127, x=>x) }
    /** Enum Value:                                         128 */
    get APPLY_AREA_AURA_FRIEND()        { return this.value(128, x=>x) }
    /** Enum Value:                                         129 */
    get APPLY_AREA_AURA_ENEMY()         { return this.value(129, x=>x) }
    /** Enum Value:                                         130 */
    get REDIRECT_THREAT()               { return this.value(130, x=>new RedirectThreat(x)) }
    /** Enum Value:                                         131 */
    get PLAYER_NOTIFICATION()          { return this.value(131, x=>new PlaySound(x)) }
    /** Enum Value:                                         132 */
    get PLAY_MUSIC()                   { return this.value(132, x=>new PlayMusic(x)) }
    /** Enum Value:                                         133 */
    get UNLEARN_SPECIALIZATION()       { return this.value(133, x=>x) }
    /** Enum Value:                                         134 */
    get KILL_CREDIT2()                 { return this.value(134, x=>x) }
    /** Enum Value:                                         135 */
    get CALL_PET()                      { return this.value(135, x=>x) }
    /** Enum Value:                                         136 */
    get HEAL_PCT()                      { return this.value(136, x=>new HealPercent(x)) }
    /** Enum Value:                                         137 */
    get ENERGIZE_PCT()                  { return this.value(137, x=>new EnergizePercent(x)) }
    /** Enum Value:                                         138 */
    get LEAP_BACK()                    { return this.value(138, x=>new LeapBack(x)) }
    /** Enum Value:                                         139 */
    get CLEAR_QUEST()                  { return this.value(139, x=>new ClearQuest(x)) }
    /** Enum Value:                                         140 */
    get FORCE_CAST()                    { return this.value(140, x=>new ForceCast(x)) }
    /** Enum Value:                                         141 */
    get FORCE_CAST_WITH_VALUE()         { return this.value(141, x=>new ForceCastWithValue(x)) }
    /** Enum Value:                                         142 */
    get TRIGGER_SPELL_WITH_VALUE()      { return this.value(142, x=>new TriggerSpellWithValue(x)) }
    /** Enum Value:                                         143 */
    get APPLY_AREA_AURA_OWNER()         { return this.value(143, x=>x) }
    /** Enum Value:                                         144 */
    get KNOCK_BACK_DEST()               { return this.value(144, x=>new KnockbackDest(x)) }
    /** Enum Value:                                         145 */
    get PULL_TOWARDS_DEST()            { return this.value(145, x=>new PullTowardsDest(x)) }
    /** Enum Value:                                         146 */
    get ACTIVATE_RUNE()                 { return this.value(146, x=>new ActivateRune(x)) }
    /** Enum Value:                                         147 */
    get QUEST_FAIL()                   { return this.value(147, x=>new FailQuest(x)) }
    /** Enum Value:                                         148 */
    get TRIGGER_MISSILE_SPELL_WITH_VALUE()  { return this.value(148, x=>new TriggerMissileWithValue(x)) }
    /** Enum Value:                                         149 */
    get CHARGE_DEST()                   { return this.value(149, x=>new ChargeDest(x)) }
    /** Enum Value:                                         150 */
    get QUEST_START()                   { return this.value(150, x=>new StartQuest(x)) }
    /** Enum Value:                                         151 */
    get TRIGGER_SPELL2()                { return this.value(151, x=>x) }
    /** Enum Value:                                         152 */
    get SUMMON_RAF_FRIEND()            { return this.value(152, x=>x) }
    /** Enum Value:                                         153 */
    get CREATE_TAMED_PET()             { return this.value(153, x=>x) }
    /** Enum Value:                                         154 */
    get DISCOVER_TAXI()                 { return this.value(154, x=>x) }
    /** Enum Value:                                         155 */
    get TITAN_GRIP()                   { return this.value(155, x=>new CanTitanGrip(x)) }
    /** Enum Value:                                         156 */
    get ENCHANT_ITEM_PRISMATIC()        { return this.value(156, x=>new EnchantPrismaticItem(x)) }
    /** Enum Value:                                         157 */
    get CREATE_ITEM2()                 { return this.value(157, x=>x) }
    /** Enum Value:                                         158 */
    get MILLING()                       { return this.value(158, x=>x) }
    /** Enum Value:                                         159 */
    get ALLOW_RENAME_PET()             { return this.value(159, x=>x) }
    /** Enum Value:                                         160 */
    get SPELL_EFFECT160()               { return this.value(160, x=>x) }
    /** Enum Value:                                         161 */
    get TALENT_SPEC_COUNT()            { return this.value(161, x=>x) }
    /** Enum Value:                                         162 */
    get TALENT_SPEC_SELECT()            { return this.value(162, x=>x) }
    /** Enum Value:                                         163 */
    get UNUSED()                        { return this.value(163, x=>x) }
    /** Enum Value:                                         164 */
    get REMOVE_AURA()                   { return this.value(164, x=>new RemoveAura(x)) }
}