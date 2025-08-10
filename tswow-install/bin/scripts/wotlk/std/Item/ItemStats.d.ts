import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { ItemTemplate } from "./ItemTemplate";
export declare enum Stat {
    MANA = 0,
    HEALTH = 1,
    AGILITY = 3,
    STRENGTH = 4,
    INTELLECT = 5,
    SPIRIT = 6,
    STAMINA = 7,
    DEFENSE_SKILL_RATING = 12,
    DODGE_RATING = 13,
    PARRY_RATING = 14,
    BLOCK_RATING = 15,
    HIT_MELEE_RATING = 16,
    HIT_RANGED_RATING = 17,
    HIT_SPELL_RATING = 18,
    CRIT_MELEE_RATING = 19,
    CRIT_RANGED_RATING = 20,
    CRIT_SPELL_RATING = 21,
    HIT_TAKEN_MELEE_RATING = 22,
    HIT_TAKEN_RANGED_RATING = 23,
    HIT_TAKEN_SPELL_RATING = 24,
    CRIT_TAKEN_MELEE_RATING = 25,
    CRIT_TAKEN_RANGED_RATING = 26,
    CRIT_TAKEN_SPELL_RATING = 27,
    HASTE_MELEE_RATING = 28,
    HASTE_RANGED_RATING = 29,
    HASTE_SPELL_RATING = 30,
    HIT_RATING = 31,
    CRIT_RATING = 32,
    HIT_TAKEN_RATING = 33,
    CRIT_TAKEN_RATING = 34,
    RESILIENCE_RATING = 35,
    HASTE_RATING = 36,
    EXPERTISE_RATING = 37,
    ATTACK_POWER = 38,
    RANGED_ATTACK_POWER = 39,
    SPELL_HEALING_DONE = 41,// deprecated
    SPELL_DAMAGE_DONE = 42,// deprecated
    MANA_REGENERATION = 43,
    ARMOR_PENETRATION_RATING = 44,
    SPELL_POWER = 45,
    HEALTH_REGEN = 46,
    SPELL_PENETRATION = 47,
    BLOCK_VALUE = 48
}
export declare class ItemStat extends ArrayEntry<ItemTemplate> {
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof Stat>;
    get Value(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemStats extends ArraySystem<ItemStat, ItemTemplate> {
    get length(): number;
    get(index: number): ItemStat;
    add(stat: EnumCon<keyof typeof Stat>, value: number): ItemTemplate;
    clearAll(): ItemTemplate;
    addMana(value: number): ItemTemplate;
    addHealth(value: number): ItemTemplate;
    addAgility(value: number): ItemTemplate;
    addStrength(value: number): ItemTemplate;
    addIntellect(value: number): ItemTemplate;
    addSpirit(value: number): ItemTemplate;
    addStamina(value: number): ItemTemplate;
    addDefenseSkillRating(value: number): ItemTemplate;
    addDodgeRating(value: number): ItemTemplate;
    addParryRating(value: number): ItemTemplate;
    addBlockRating(value: number): ItemTemplate;
    addHitMeleeRating(value: number): ItemTemplate;
    addHitRangedRating(value: number): ItemTemplate;
    addHitSpellRating(value: number): ItemTemplate;
    addCritMeleeRating(value: number): ItemTemplate;
    addCritRangedRating(value: number): ItemTemplate;
    addCritSpellRating(value: number): ItemTemplate;
    addHitTakenMeleeRating(value: number): ItemTemplate;
    addHitTakenRangedRating(value: number): ItemTemplate;
    addHitTakenSpellRating(value: number): ItemTemplate;
    addCritTakenMeleeRating(value: number): ItemTemplate;
    addCritTakenRangedRating(value: number): ItemTemplate;
    addCritTakenSpellRating(value: number): ItemTemplate;
    addHasteMeleeRating(value: number): ItemTemplate;
    addHasteRangedRating(value: number): ItemTemplate;
    addHasteSpellRating(value: number): ItemTemplate;
    addHitRating(value: number): ItemTemplate;
    addCritRating(value: number): ItemTemplate;
    addHitTakenRating(value: number): ItemTemplate;
    addCritTakenRating(value: number): ItemTemplate;
    addResilienceRating(value: number): ItemTemplate;
    addHasteRating(value: number): ItemTemplate;
    addExpertiseRating(value: number): ItemTemplate;
    addAttackPower(value: number): ItemTemplate;
    addRangedAttackPower(value: number): ItemTemplate;
    addSpellHealingDone(value: number): ItemTemplate;
    addSpellDamageDone(value: number): ItemTemplate;
    addManaRegeneration(value: number): ItemTemplate;
    addArmorPenetrationRating(value: number): ItemTemplate;
    addSpellPower(value: number): ItemTemplate;
    addHealthRegen(value: number): ItemTemplate;
    addSpellPenetration(value: number): ItemTemplate;
    addBlockValue(value: number): ItemTemplate;
}
