import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { ActivateObject, ActivateRune, AddComboPoints, AddFarsight, AddHonor, ApplyGlyph, BindHome, CanTitanGrip, CastButtons, Charge, ChargeDest, ClearQuest, CommandTotemCreature, CompleteQuest, CreateItem, CreateManaGem, CreateRandomItem, DestroyAllTotems, Dispel, DispelMechanic, DurabilityDamage, DurabilityDamagePercent, EnchantHeldItem, EnchantItem, EnchantItemTemp, EnchantPrismaticItem, Energize, EnergizePercent, EnvironmentalDamage, ExtraAttacks, FailQuest, ForceCast, ForceCastWithValue, GameObjectDamage, GameObjectRepair, Heal, HealMaxHealth, HealMechanical, HealPercent, HealthLeech, InterruptCast, Jump, JumpDest, KillCredit, Knockback, KnockbackDest, Language, Leap, LeapBack, LearnPetSpell, LearnSpell, MakeDrunk, ModifyThreatPercent, OpenLock, Pickpocket, PlayMusic, PlaySound, PowerBurn, PowerDrain, PullTowards, PullTowardsDest, RedirectThreat, RemoveAura, Reputation, Resurrect, ResurrectSelf, Sanctuary, SchoolDamage, ScriptEffect, SendEvent, SendTaxi, SetGameObjectDestructibleState, Skill, SkillStep, StartQuest, StealBeneficialBuff, Summon, SummonObjectSlot1, SummonObjectSlot2, SummonObjectSlot3, SummonObjectSlot4, SummonObjectWild, SummonPet, TeleportUnitFaceCaster, TeleportUnits, Threat, TradeSkill, TransDoor, TriggerMissile, TriggerMissileWithValue, TriggerSpell, TriggerSpellWithValue, Weapon, WeaponDamage, WeaponDamageNoSchool, WeaponPercentDamage } from "./EffectTemplates/EffectTemplates";
import { SpellEffect } from "./SpellEffect";
export declare class SpellEffectType extends EnumCellTransform<SpellEffect> {
    constructor(owner: SpellEffect, index: number);
    /** Enum Value:                                         0 */
    get NULL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         1 */
    get INSTAKILL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         2 */
    get SCHOOL_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SchoolDamage>;
    /** Enum Value:                                         3 */
    get DUMMY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         4 */
    get PORTAL_TELEPORT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         5 */
    get TELEPORT_UNITS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TeleportUnits>;
    /** Enum Value:                                         6 */
    get APPLY_AURA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         7 */
    get ENVIRONMENTAL_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, EnvironmentalDamage>;
    /** Enum Value:                                         8 */
    get POWER_DRAIN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PowerDrain>;
    /** Enum Value:                                         9 */
    get HEALTH_LEECH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, HealthLeech>;
    /** Enum Value:                                         10 */
    get HEAL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Heal>;
    /** Enum Value:                                         11 */
    get BIND(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, BindHome>;
    /** Enum Value:                                         12 */
    get CONTROL_TOTEM_CREATURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CommandTotemCreature>;
    /** Enum Value:                                         13 */
    get RITUAL_BASE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         14 */
    get RITUAL_SPECIALIZE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         15 */
    get RITUAL_ACTIVATE_PORTAL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         16 */
    get QUEST_COMPLETE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CompleteQuest>;
    /** Enum Value:                                         17 */
    get WEAPON_DAMAGE_NOSCHOOL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, WeaponDamageNoSchool>;
    /** Enum Value:                                         18 */
    get RESURRECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Resurrect>;
    /** Enum Value:                                         19 */
    get ADD_EXTRA_ATTACKS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ExtraAttacks>;
    /** Enum Value:                                         20 */
    get DODGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         21 */
    get EVADE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         22 */
    get PARRY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         23 */
    get BLOCK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         24 */
    get CREATE_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CreateItem>;
    /** Enum Value:                                         25 */
    get WEAPON(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Weapon>;
    /** Enum Value:                                         26 */
    get DEFENSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         27 */
    get PERSISTENT_AREA_AURA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         28 */
    get SUMMON(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Summon>;
    /** Enum Value:                                         29 */
    get LEAP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Leap>;
    /** Enum Value:                                         30 */
    get ENERGIZE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Energize>;
    /** Enum Value:                                         31 */
    get WEAPON_PERCENT_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, WeaponPercentDamage>;
    /** Enum Value:                                         32 */
    get TRIGGER_MISSILE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TriggerMissile>;
    /** Enum Value:                                         33 */
    get OPEN_LOCK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, OpenLock>;
    /** Enum Value:                                         34 */
    get SUMMON_CHANGE_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         35 */
    get APPLY_AREA_AURA_PARTY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         36 */
    get LEARN_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, LearnSpell>;
    /** Enum Value:                                         37 */
    get SPELL_DEFENSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         38 */
    get DISPEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Dispel>;
    /** Enum Value:                                         39 */
    get LANGUAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Language>;
    /** Enum Value:                                         40 */
    get DUAL_WIELD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         41 */
    get JUMP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Jump>;
    /** Enum Value:                                         42 */
    get JUMP_DEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, JumpDest>;
    /** Enum Value:                                         43 */
    get TELEPORT_UNITS_FACE_CASTER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TeleportUnitFaceCaster>;
    /** Enum Value:                                         44 */
    get SKILL_STEP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SkillStep>;
    /** Enum Value:                                         45 */
    get ADD_HONOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AddHonor>;
    /** Enum Value:                                         46 */
    get SPAWN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         47 */
    get TRADE_SKILL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TradeSkill>;
    /** Enum Value:                                         48 */
    get STEALTH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         49 */
    get DETECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         50 */
    get TRANS_DOOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TransDoor>;
    /** Enum Value:                                         51 */
    get FORCE_CRITICAL_HIT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         52 */
    get GUARANTEE_HIT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         53 */
    get ENCHANT_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, EnchantItem>;
    /** Enum Value:                                         54 */
    get ENCHANT_ITEM_TEMPORARY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, EnchantItemTemp>;
    /** Enum Value:                                         55 */
    get TAMECREATURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         56 */
    get SUMMON_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SummonPet>;
    /** Enum Value:                                         57 */
    get LEARN_PET_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, LearnPetSpell>;
    /** Enum Value:                                         58 */
    get WEAPON_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, WeaponDamage>;
    /** Enum Value:                                         59 */
    get CREATE_RANDOM_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CreateRandomItem>;
    /** Enum Value:                                         60 */
    get PROFICIENCY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         61 */
    get SEND_EVENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SendEvent>;
    /** Enum Value:                                         62 */
    get POWER_BURN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PowerBurn>;
    /** Enum Value:                                         63 */
    get THREAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Threat>;
    /** Enum Value:                                         64 */
    get TRIGGER_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TriggerSpell>;
    /** Enum Value:                                         65 */
    get APPLY_AREA_AURA_RAID(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         66 */
    get CREATE_MANA_GEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CreateManaGem>;
    /** Enum Value:                                         67 */
    get HEAL_MAX_HEALTH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, HealMaxHealth>;
    /** Enum Value:                                         68 */
    get INTERRUPT_CAST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, InterruptCast>;
    /** Enum Value:                                         69 */
    get DISTRACT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         70 */
    get PULL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         71 */
    get PICKPOCKET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Pickpocket>;
    /** Enum Value:                                         72 */
    get ADD_FARSIGHT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AddFarsight>;
    /** Enum Value:                                         73 */
    get UNTRAIN_TALENTS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         74 */
    get APPLY_GLYPH(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ApplyGlyph>;
    /** Enum Value:                                         75 */
    get HEAL_MECHANICAL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, HealMechanical>;
    /** Enum Value:                                         76 */
    get SUMMON_OBJECT_WILD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SummonObjectWild>;
    /** Enum Value:                                         77 */
    get SCRIPT_EFFECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ScriptEffect>;
    /** Enum Value:                                         78 */
    get ATTACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         79 */
    get SANCTUARY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Sanctuary>;
    /** Enum Value:                                         80 */
    get ADD_COMBO_POINTS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, AddComboPoints>;
    /** Enum Value:                                         81 */
    get CREATE_HOUSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         82 */
    get BIND_SIGHT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         83 */
    get DUEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         84 */
    get STUCK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         85 */
    get SUMMON_PLAYER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         86 */
    get ACTIVATE_OBJECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ActivateObject>;
    /** Enum Value:                                         87 */
    get GAMEOBJECT_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, GameObjectDamage>;
    /** Enum Value:                                         88 */
    get GAMEOBJECT_REPAIR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, GameObjectRepair>;
    /** Enum Value:                                         89 */
    get GAMEOBJECT_SET_DESTRUCTION_STATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SetGameObjectDestructibleState>;
    /** Enum Value:                                         90 */
    get KILL_CREDIT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, KillCredit>;
    /** Enum Value:                                         91 */
    get THREAT_ALL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         92 */
    get ENCHANT_HELD_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, EnchantHeldItem>;
    /** Enum Value:                                         93 */
    get FORCE_DESELECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         94 */
    get SELF_RESURRECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ResurrectSelf>;
    /** Enum Value:                                         95 */
    get SKINNING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         96 */
    get CHARGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Charge>;
    /** Enum Value:                                         97 */
    get CAST_BUTTON(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CastButtons>;
    /** Enum Value:                                         98 */
    get KNOCK_BACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Knockback>;
    /** Enum Value:                                         99 */
    get DISENCHANT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         100 */
    get INEBRIATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, MakeDrunk>;
    /** Enum Value:                                         101 */
    get FEED_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         102 */
    get DISMISS_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         103 */
    get REPUTATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Reputation>;
    /** Enum Value:                                         104 */
    get SUMMON_OBJECT_SLOT1(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SummonObjectSlot1>;
    /** Enum Value:                                         105 */
    get SUMMON_OBJECT_SLOT2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SummonObjectSlot2>;
    /** Enum Value:                                         106 */
    get SUMMON_OBJECT_SLOT3(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SummonObjectSlot3>;
    /** Enum Value:                                         107 */
    get SUMMON_OBJECT_SLOT4(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SummonObjectSlot4>;
    /** Enum Value:                                         108 */
    get DISPEL_MECHANIC(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DispelMechanic>;
    /** Enum Value:                                         109 */
    get SUMMON_DEAD_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         110 */
    get DESTROY_ALL_TOTEMS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DestroyAllTotems>;
    /** Enum Value:                                         111 */
    get DURABILITY_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DurabilityDamage>;
    /** Enum Value:                                         112 */
    get SPELL_EFFECT112(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         113 */
    get RESURRECT_NEW(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         114 */
    get ATTACK_ME(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         115 */
    get DURABILITY_DAMAGE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, DurabilityDamagePercent>;
    /** Enum Value:                                         116 */
    get SKIN_PLAYER_CORPSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         117 */
    get SPIRIT_HEAL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         118 */
    get SKILL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, Skill>;
    /** Enum Value:                                         119 */
    get APPLY_AREA_AURA_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         120 */
    get TELEPORT_GRAVEYARD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         121 */
    get NORMALIZED_WEAPON_DMG(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         122 */
    get SPELL_EFFECT122(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         123 */
    get SEND_TAXI(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SendTaxi>;
    /** Enum Value:                                         124 */
    get PULL_TOWARDS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PullTowards>;
    /** Enum Value:                                         125 */
    get MODIFY_THREAT_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ModifyThreatPercent>;
    /** Enum Value:                                         126 */
    get STEAL_BENEFICIAL_BUFF(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, StealBeneficialBuff>;
    /** Enum Value:                                         127 */
    get PROSPECTING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         128 */
    get APPLY_AREA_AURA_FRIEND(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         129 */
    get APPLY_AREA_AURA_ENEMY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         130 */
    get REDIRECT_THREAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, RedirectThreat>;
    /** Enum Value:                                         131 */
    get PLAYER_NOTIFICATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PlaySound>;
    /** Enum Value:                                         132 */
    get PLAY_MUSIC(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PlayMusic>;
    /** Enum Value:                                         133 */
    get UNLEARN_SPECIALIZATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         134 */
    get KILL_CREDIT2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         135 */
    get CALL_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         136 */
    get HEAL_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, HealPercent>;
    /** Enum Value:                                         137 */
    get ENERGIZE_PCT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, EnergizePercent>;
    /** Enum Value:                                         138 */
    get LEAP_BACK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, LeapBack>;
    /** Enum Value:                                         139 */
    get CLEAR_QUEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ClearQuest>;
    /** Enum Value:                                         140 */
    get FORCE_CAST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ForceCast>;
    /** Enum Value:                                         141 */
    get FORCE_CAST_WITH_VALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ForceCastWithValue>;
    /** Enum Value:                                         142 */
    get TRIGGER_SPELL_WITH_VALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TriggerSpellWithValue>;
    /** Enum Value:                                         143 */
    get APPLY_AREA_AURA_OWNER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         144 */
    get KNOCK_BACK_DEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, KnockbackDest>;
    /** Enum Value:                                         145 */
    get PULL_TOWARDS_DEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, PullTowardsDest>;
    /** Enum Value:                                         146 */
    get ACTIVATE_RUNE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ActivateRune>;
    /** Enum Value:                                         147 */
    get QUEST_FAIL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, FailQuest>;
    /** Enum Value:                                         148 */
    get TRIGGER_MISSILE_SPELL_WITH_VALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, TriggerMissileWithValue>;
    /** Enum Value:                                         149 */
    get CHARGE_DEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, ChargeDest>;
    /** Enum Value:                                         150 */
    get QUEST_START(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, StartQuest>;
    /** Enum Value:                                         151 */
    get TRIGGER_SPELL2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         152 */
    get SUMMON_RAF_FRIEND(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         153 */
    get CREATE_TAMED_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         154 */
    get DISCOVER_TAXI(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         155 */
    get TITAN_GRIP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, CanTitanGrip>;
    /** Enum Value:                                         156 */
    get ENCHANT_ITEM_PRISMATIC(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, EnchantPrismaticItem>;
    /** Enum Value:                                         157 */
    get CREATE_ITEM2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         158 */
    get MILLING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         159 */
    get ALLOW_RENAME_PET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         160 */
    get SPELL_EFFECT160(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         161 */
    get TALENT_SPEC_COUNT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         162 */
    get TALENT_SPEC_SELECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         163 */
    get UNUSED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, SpellEffect>;
    /** Enum Value:                                         164 */
    get REMOVE_AURA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellEffect, RemoveAura>;
}
