import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { SchoolMask } from "../../Misc/School";
import { EffectClassSet } from "../SpellClassSet";
import { SpellEffectMechanicEnum } from "../SpellEffectMechanics";
import { SpellImplicitTarget } from "../SpellImplicitTarget";
import { SpellPowerType } from "../SpellPowerType";
import { SpellRadiusRef } from "../SpellRadius";
import { EffectTemplate } from "./EffectTemplate";
import { CountBase, DamageBase, DamageBasePct, HealBase, HealBasePct, PointsBase, PointsRoot, PowerBase, PowerBasePct } from "./PointsBase";
import { TargetBase } from "./TargetBase";

// 1
// 2
export class SchoolDamage extends DamageBase {}
// 3
// 4
// 5
export class TeleportUnits extends EffectTemplate {
    get TeleportedUnit() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TeleportTarget() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 6
// 7
export class EnvironmentalDamage extends EffectTemplate {
    get Source() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get AreaType() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
    get BaseDamage() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
    get DamagePerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get DamagePerCombo() { return this.wrap(this.owner.PointsPerCombo); }
    get BonusMultiplier() { return this.wrap(this.owner.BonusMultiplier); }
    get Radius() {
        return new SpellRadiusRef(this, this.wrapIndex(this.row.EffectRadiusIndex, this.index)); }
}
// 8
export class PowerDrain extends PowerBase {}
// 9
export class HealthLeech extends DamageBase {}
// 10
export class Heal extends HealBase {}
// 11
export class BindHome extends EffectTemplate {
    get TargetA() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TargetB() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 12
export class TotemCreatureTargetMask<T> extends MaskCell32<T> {
    get Summon1() { return this.bit(0); }
    get Summon2() { return this.bit(1); }
    get Summon3() { return this.bit(2); }
    get Summon4() { return this.bit(3); }
}

export class TotemCreatureCommand<T> extends EnumCell<T> {
    /** Enum Value:                           0 */
    get ReactPassive()    { return this.value(0) }
    /** Enum Value:                           1 */
    get ReactDefensive()  { return this.value(1) }
    /** Enum Value:                           2 */
    get ReactAggressive() { return this.value(2) }
    /** Enum Value:                           3 */
    get Stay()            { return this.value(3) }
    /** Enum Value:                           4 */
    get Follow()          { return this.value(4) }
    /** Enum Value:                           5 */
    get Attack()          { return this.value(5) }
}

export class CommandTotemCreature extends EffectTemplate {
    get Target() { return this.wrap(this.owner.MiscValueA); }
    get Command() { return this.wrap(this.owner.MiscValueB); }
}
// 13
// 14
// 15
// 16
export class CompleteQuest extends TargetBase {
    get QuestID() { return this.wrap(this.owner.MiscValueA); }
}
// 17
export class WeaponDamageNoSchool extends DamageBase {}
// 18
export class Resurrect extends HealBase {}
// 19
export class ExtraAttacks extends DamageBase {}
// 20
// 21
// 22
// 23
// 24
export class CreateItem extends TargetBase {
    get ItemTemplate() { return this.wrap(this.owner.ItemType); }

    /**
     * Set to desired item count -1 (i.e. set to 199 for 200)
     */
    get ItemCount() { return this.wrap(this.owner.BasePoints); }
}
// 25
export class Weapon extends EffectTemplate {}
// 26
// 27
// 28
export class Summon extends TargetBase {
    /**
     * Entry in creature_templates
     */
    get SummonedCreature() { return this.wrap(this.owner.MiscValueA); }

    /**
     * Entry in SummonProperties.dbc
     */
    get SummonProperties() { return this.wrap(this.owner.MiscValueB); }
}
// 29
export class Leap extends TargetBase {}
// 30
export class Energize extends PowerBase {
    get PowerType() { return new SpellPowerType(this, this.owner.MiscValueA); }
}
// 31
export class WeaponPercentDamage extends DamageBasePct {

    /**
     * Percentage (in whole percentage, i.e. value of "200" = 200%)
     */
    get Percentage() { return this.wrap(this.owner.BasePoints); }

    setSingleTarget() {
        this.TargetA.UnitTargetEnemy.set()
        this.TargetB.set(0);
        return this.owner;
    }

    setAoE(radius: number, radiusPerLevel: number, radiusMax: number) {
        this.TargetA.SrcCaster.set()
        this.Radius.modRefCopy(x=>x.set(radius,radiusPerLevel,radiusMax));
        return this.owner;
    }
}
// 32
export class TriggerMissile extends TargetBase {
    get MissileSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 33
export class OpenLock extends EffectTemplate {
    get LockType() { return this.wrap(this.owner.MiscValueA); }
    get SkillValue() { return this.wrap(this.owner.PointsPerLevel); }

    /**
     * Generic Target type.
     */
    get TargetA() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }

    /**
     * Generic Target type. Value depends on TargetA
     */
    get TargetB() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }

    setGameObject(lockType: number) {
        this.LockType.set(lockType);
        this.TargetA.GameobjectTarget.set()
        this.TargetB.set(0)
        return this.owner;
    }
}
// 34
// 35
// 36
export class LearnSpell extends TargetBase {
    get LearntSpell() { return this.owner.TriggerSpell; }
}
// 37
// 38
export class Dispel extends TargetBase {
    get SchoolMask() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 39
export class Language extends TargetBase {
    /**
     * Reference to Languages.dbc
     */
    get LanguageID() { return this.wrap(this.owner.MiscValueA); }
}
// 40
// 41
export class Jump extends TargetBase {
    get MinHeight() { return this.wrap(this.owner.MiscValueA); }
    get MaxHeight() { return this.wrap(this.owner.MiscValueB); }
}
// 42
export class JumpDest extends TargetBase {
    get MinHeight() { return this.wrap(this.owner.MiscValueA); }
    get MaxHeight() { return this.wrap(this.owner.MiscValueB); }
}
// 43
export class TeleportUnitFaceCaster extends EffectTemplate {
    get TeleportedUnit() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TeleportTarget() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 44
export class SkillStep extends TargetBase {
    get Tier() { return this.wrap(this.owner.BasePoints); }
    get Skill() { return this.wrap(this.owner.MiscValueA); }
}
// 45
export class AddHonor extends CountBase {}
// 46
// 47
export class TradeSkill extends EffectTemplate {
}
// 48
// 49
// 50
export class TransDoor extends TargetBase {
    get GameObjectTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 51
// 52
// 53
export class EnchantItem extends EffectTemplate {
    get EnchantingItem() { return this.wrap(this.owner.ItemType); }
    get Enchant() { return this.wrap(this.owner.MiscValueA); }
}
// 54
export class EnchantItemTemp extends EffectTemplate {
    get EnchantingItem() { return this.wrap(this.owner.ItemType); }
    get EnchantID() { return this.wrap(this.owner.MiscValueA); }
}
// 55
// 56
export class SummonPet extends EffectTemplate {
    get SummonedCreature() {
        return this.wrap(this.owner.MiscValueA);
    }
}
// 57
export class LearnPetSpell extends TargetBase {
    get LearntSpell() { return this.owner.TriggerSpell; }
}
// 58
export class WeaponDamage extends DamageBase {}
// 59
export class CreateRandomItem extends TargetBase {
    /**
     * Reference to spell_loot_template
     */
    get LootTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 60
// 61
export class SendEvent extends EffectTemplate {
    get EventID() { return this.wrap(this.owner.MiscValueA); }
}
// 62
export class PowerBurn extends PowerBase {}
// 63
export class Threat extends TargetBase {

    get ThreatAmount() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
}
// 64
export class TriggerSpell extends EffectTemplate {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 65
// 66
export class CreateManaGem extends TargetBase {
    get ItemType() { return this.wrap(this.owner.ItemType); }
}
// 67
export class HealMaxHealth extends TargetBase {}
// 68
export class InterruptCast extends TargetBase {
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.wrapIndex(this.row.EffectMechanic,this.index))}
}
// 69
// 70
// 71
export class Pickpocket extends EffectTemplate {
    get TargetA() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TargetB() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 72
export class AddFarsight extends TargetBase {}
// 73
// 74
export class ApplyGlyph extends EffectTemplate {
    get Glyph() { return this.wrap(this.owner.MiscValueA); }
    get ClassMask() { return new EffectClassSet(this, this.owner); }
}
// 75
export class HealMechanical extends HealBase {}
// 76
export class SummonObjectWild extends TargetBase {
    get GameObjectTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 77
export class ScriptEffect extends TargetBase {
}
// 78
// 79
export class Sanctuary extends TargetBase {}
// 80
export class AddComboPoints extends CountBase {}
// 81
// 82
// 83
// 84
// 85

// 86
export class GameObjectActions<T> extends EnumCell<T> {
    /** Enum Value:                         0 */
    get None()          { return this.value(0) }
    /** Enum Value:                         1 */
    get AnimCustom0()   { return this.value(1) }
    /** Enum Value:                         2 */
    get AnimCustom1()   { return this.value(2) }
    /** Enum Value:                         3 */
    get AnimCustom2()   { return this.value(3) }
    /** Enum Value:                         4 */
    get AnimCustom3()   { return this.value(4) }
    /** Enum Value:                         5 */
    get Disturb()       { return this.value(5) }
    /** Enum Value:                         6 */
    get Unlock()        { return this.value(6) }
    /** Enum Value:                         7 */
    get Lock()          { return this.value(7) }
    /** Enum Value:                         8 */
    get Open()          { return this.value(8) }
    /** Enum Value:                         9 */
    get OpenAndUnlock() { return this.value(9) }
    /** Enum Value:                         10 */
    get Close()         { return this.value(10) }
    /** Enum Value:                         11 */
    get ToggleOpen()    { return this.value(11) }
    /** Enum Value:                         12 */
    get Destroy()       { return this.value(12) }
    /** Enum Value:                         13 */
    get Rebuild()       { return this.value(13) }
    /** Enum Value:                         14 */
    get Creation()      { return this.value(14) }
    /** Enum Value:                         15 */
    get Despawn()       { return this.value(15) }
    /** Enum Value:                         16 */
    get MakeInert()     { return this.value(16) }
    /** Enum Value:                         17 */
    get MakeActive()    { return this.value(17) }
    /** Enum Value:                         18 */
    get CloseAndLock()  { return this.value(18) }
    /** Enum Value:                         19 */
    get UseArtKit0()    { return this.value(19) }
    /** Enum Value:                         20 */
    get UseArtKit1()    { return this.value(20) }
    /** Enum Value:                         21 */
    get UseArtKit2()    { return this.value(21) }
    /** Enum Value:                         22 */
    get UseArtKit3()    { return this.value(22) }
    /** Enum Value:                         23 */
    get SetTapList()    { return this.value(23) }
}

export class ActivateObject extends TargetBase {
    get Action() { return new GameObjectActions(this, this.owner.MiscValueA); }
}
// 87
export class GameObjectDamage extends DamageBase {}
// 88
export class GameObjectRepair extends PointsRoot {
    get BaseRepair() { return this.wrap(this.owner.BasePoints); }
    get RandomRepair() { return this.wrap(this.owner.DieSides); }
    get RepairPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get RepairPerCombo() { return this.wrap(this.owner.PointsPerLevel); }
}
// 89
export class GameObjectDestructibleState<T> extends EnumCell<T> {
    /** Enum Value:                      0 */
    get Intact()     { return this.value(0) }
    /** Enum Value:                      1 */
    get Damaged()    { return this.value(1) }
    /** Enum Value:                      2 */
    get Destroyed()  { return this.value(2) }
    /** Enum Value:                      3 */
    get Rebuilding() { return this.value(3) }
}
export class SetGameObjectDestructibleState extends DamageBase {
    get State() { return new GameObjectDestructibleState(this, this.owner.MiscValueA); }
}
// 90
export class KillCredit extends TargetBase {
    get CreatureID() { return this.wrap(this.owner.MiscValueA); }
}
// 91
// 92
export class EnchantHeldItem extends EffectTemplate {
    get EnchantID() { return this.wrap(this.owner.MiscValueA); }
}
// 93
// 94
export class ResurrectSelf extends EffectTemplate {
    get BaseHealth() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
    get HealthPerLevel() {return this.wrap(this.owner.PointsPerLevel); }
    get HealthPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
    get BonusMultiplier() { return this.wrap(this.owner.BonusMultiplier); }
    get MultipleValue() { return this.wrap(this.owner.MultipleValue); }
    get Mana() { return this.wrap(this.owner.MiscValueA); }
}
// 95
// 96
export class Charge extends TargetBase {}
// 97
export class CastButtons extends EffectTemplate {
    /**
     * Actual ButtonID is this value + 132
     */
    get ButtonID() { return this.wrap(this.owner.MiscValueA); }

    get ButtonCount() { return this.wrap(this.owner.MiscValueB); }
}
// 98
export class Knockback extends TargetBase {
    get Height() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
    get HeightPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get KnockbackAmount() { return this.wrap(this.owner.MiscValueA); }
}
// 99
// 100
export class MakeDrunk extends PointsRoot {
    get BaseDrunkness() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
    get DrunknessPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get DrunknessPerCombo() { return this.wrap(this.owner.PointsPerLevel); }
}
// 101
// 102
// 103
export class Reputation extends PointsBase {
    get Faction() { return this.wrap(this.owner.MiscValueA); }
}
// 104
export class SummonObjectSlot1 extends TargetBase {
    get GameObjectTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 105
export class SummonObjectSlot2 extends TargetBase {
    get GameObjectTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 106
export class SummonObjectSlot3 extends TargetBase {
    get GameObjectTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 107
export class SummonObjectSlot4 extends TargetBase {
    get GameObjectTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 108
export class DispelMechanic extends TargetBase {
    get SchoolMask() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 109
// 110
export class DestroyAllTotems extends EffectTemplate {
    get ClassMask() { return new EffectClassSet(this, this.owner); }
}
// 111
export class DurabilityDamage extends DamageBase {
    get Slot() { return this.wrap(this.owner.MiscValueA); }
}
// 112
// 113
// 114
// 115
export class DurabilityDamagePercent extends DamageBasePct {
    get Slot() { return this.wrap(this.owner.MiscValueA); }
}
// 116
// 117
// 118
export class Skill extends TargetBase {
    get SkillID() { return this.wrap(this.owner.MiscValueA); }
    get SkillTier() { return this.wrap(this.owner.BasePoints); }
}
// 119
// 120
// 121
// 122
// 123
export class SendTaxi extends TargetBase {
    get TaxiID() { return this.wrap(this.owner.MiscValueA); }
}
// 124
export class PullTowards extends TargetBase{
    get SpeedZ() { return this.wrap(this.owner.MiscValueA); }
}
// 125
export class ModifyThreatPercent extends TargetBase {
    get ThreatPercentAmount() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
}
// 126
export class StealBeneficialBuff extends CountBase {
    get DispelMask() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 127
// 128
// 129
// 130
export class RedirectThreat extends TargetBase {
    get ThreatAmount() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
}
// 131
export class PlaySound extends TargetBase {
    get SoundID() { return this.wrap(this.owner.MiscValueA); }
}
// 132
export class PlayMusic extends TargetBase {
    get SoundID() { return this.wrap(this.owner.MiscValueA); }
}
// 133
// 134
// 135
// 136
export class HealPercent extends HealBasePct {}
// 137
export class EnergizePercent extends PowerBasePct {
    get PowerType() { return new SpellPowerType(this, this.owner.MiscValueA); }
}
// 138
export class LeapBack extends TargetBase {}
// 139
export class ClearQuest extends TargetBase {
    get QuestID() { return this.wrap(this.owner.MiscValueA); }
}
// 140
export class ForceCast extends EffectTemplate {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.wrapIndex(this.row.EffectMechanic,this.index)); }
}
// 141
export class ForceCastWithValue extends PointsBase {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.wrapIndex(this.row.EffectMechanic,this.index)); }
}
// 142
export class TriggerSpellWithValue extends PointsBase {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 143
// 144
export class KnockbackDest extends TargetBase {
    get Height() { return this.wrap(this.owner.BasePoints); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
    get HeightPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get KnockbackAmount() { return this.wrap(this.owner.MiscValueA); }
}
// 145
export class PullTowardsDest extends TargetBase{
    get SpeedZ() { return this.wrap(this.owner.MiscValueA); }
}
// 146
export class RuneType<T> extends EnumCell<T> {
    /** Enum Value:                  0 */
    get Blood()  { return this.value(0) }
    /** Enum Value:                  1 */
    get Unholy() { return this.value(1) }
    /** Enum Value:                  2 */
    get Frost()  { return this.value(2) }
    /** Enum Value:                  3 */
    get Death()  { return this.value(3) }
}

export class ActivateRune extends CountBase {
    get RuneType() { return new RuneType(this, this.owner.MiscValueA); }
}
// 147
export class FailQuest extends TargetBase {
    get QuestID() { return this.wrap(this.owner.MiscValueA); }
}
// 148
export class TriggerMissileWithValue extends TargetBase {
    get MissileSpell() { return this.wrap(this.owner.TriggerSpell); }
    get BasePoints() { return this.wrap(this.owner.BasePoints); }
    get PointsPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get PointsPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
    get DieSides() { return this.wrap(this.owner.DieSides); }
}
// 149
export class ChargeDest extends TargetBase {}
// 150
export class StartQuest extends TargetBase {
    get QuestID() { return this.wrap(this.owner.MiscValueA); }
}
// 151
// 152
// 153
// 154
// 155
export class CanTitanGrip extends TargetBase {
    get PenaltySpellID() { return this.wrap(this.owner.MiscValueA); }
}
// 156
export class EnchantPrismaticItem extends EffectTemplate {
    get EnchantID() { return this.wrap(this.owner.MiscValueA); }
}
// 157
// 158
// 159
// 160
// 161
// 162
// 163
// 164
export class RemoveAura extends TargetBase {
    get RemovedSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 165
// 166
// 167
// 168
// 169