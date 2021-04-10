import { EffectID, EffectTemplate } from "./EffectTemplate";
import { TargetBase } from "./TargetBase";
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { CountBase, PowerBase, PowerBasePct, DamageBase, PointsRoot, HealBasePct, HealBase, PointsBase, DamageBasePct } from "./PointsBase";
import { SpellPowerType } from "../SpellPowerType";
import { SharedRefs } from "../../Refs/SharedRefs";
import { SpellEffect } from "../SpellEffect";
import { SpellImplicitTarget } from "../SpellImplicitTarget";
import { SpellEffectMechanicEnum } from "../SpellEffectMechanics";
import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { SchoolMask } from "../../Misc/School";
import { EffectClassSet } from "../SpellClassSet";

// 1
// 2
@EffectID(2)
export class SchoolDamage<T> extends DamageBase<T> {}
// 3
// 4
// 5
@EffectID(5)
export class TeleportUnits<T> extends EffectTemplate<T> {
    get TeleportedUnit() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TeleportTarget() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 6
// 7
@EffectID(7)
export class EnvironmentalDamage<T> extends EffectTemplate<T> {
    constructor(owner :T, effect: SpellEffect) {
        super(owner, effect);
    }

    get Source() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get AreaType() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
    get BaseDamage() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
    get DamagePerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get DamagePerCombo() { return this.wrap(this.effect.PointsPerCombo); }
    get BonusMultiplier() { return this.wrap(this.effect.BonusMultiplier); }
    get Radius() { return SharedRefs.getOrCreateSpellRadius(this, this.effect); } 
}
// 8
@EffectID(8)
export class PowerDrain<T> extends PowerBase<T> {}
// 9
@EffectID(9)
export class HealthLeech<T> extends DamageBase<T> {}
// 10
@EffectID(10)
export class Heal<T> extends HealBase<T> {}
// 11
@EffectID(11)
export class BindHome<T> extends EffectTemplate<T> {
    get TargetA() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TargetB() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 12
export class TotemCreatureTargetMask<T> extends MaskCell<T> {
    get Summon1() { return this.bit(0); }
    get Summon2() { return this.bit(1); }
    get Summon3() { return this.bit(2); }
    get Summon4() { return this.bit(3); }
}

export class TotemCreatureCommand<T> extends Enum<T> {
    
    @EnumField(0)
    setReactPassive() { return this.set(0); }

    @EnumField(1)
    setReactDefensive() { return this.set(1); }

    @EnumField(2)
    setReactAggressive() { return this.set(2); }

    @EnumField(3)
    setStay() { return this.set(3); }

    @EnumField(4)
    setFollow() { return this.set(4); }

    @EnumField(5)
    setAttack() { return this.set(5); }
}

@EffectID(12)
export class CommandTotemCreature<T> extends EffectTemplate<T> {
    get Target() { return this.wrap(this.effect.MiscValueA); }
    get Command() { return this.wrap(this.effect.MiscValueB); }
}
// 13
// 14
// 15
// 16
@EffectID(16)
export class CompleteQuest<T> extends TargetBase<T> {
    get QuestID() { return this.wrap(this.effect.MiscValueA); }
}
// 17
@EffectID(17)
export class WeaponDamageNoSchool<T> extends DamageBase<T> {}
// 18
@EffectID(18)
export class Resurrect<T> extends HealBase<T> {}
// 19
@EffectID(19)
export class ExtraAttacks<T> extends DamageBase<T> {}
// 20
// 21
// 22
// 23
// 24
@EffectID(24)
export class CreateItem<T> extends TargetBase<T> {
    get ItemTemplate() { return this.wrap(this.effect.ItemType); }
}
// 25
@EffectID(25)
export class Weapon<T> extends EffectTemplate<T> {}
// 26
// 27
// 28
@EffectID(28)
export class Summon<T> extends TargetBase<T> {
    /**
     * Entry in creature_templates
     */
    get SummonedCreature() { return this.wrap(this.effect.MiscValueA); }

    /**
     * Entry in SummonProperties.dbc
     */
    get SummonProperties() { return this.wrap(this.effect.MiscValueB); }
}
// 29
@EffectID(29)
export class Leap<T> extends TargetBase<T> {}
// 30
@EffectID(30)
export class Energize<T> extends PowerBase<T> {
    get PowerType() { return new SpellPowerType(this, this.effect.MiscValueA); }
}
// 31
@EffectID(31)
export class WeaponPercentDamage<T> extends DamageBasePct<T> {
    
    /**
     * Percentage (in whole percentage, i.e. value of "200" = 200%)
     */
    get Percentage() { return this.wrap(this.effect.BasePoints); }

    setSingleTarget() { 
        this.TargetA.setUnitTargetEnemy();
        this.TargetB.set(0);
        return this.owner;
    }

    setAoE(radius: number, radiusPerLevel: number, radiusMax: number) {
        this.TargetA.setSrcCaster();
        this.Radius.set(radius,radiusPerLevel,radiusMax);
        return this.owner;
    }
}
// 32
@EffectID(32)
export class TriggerMissile<T> extends TargetBase<T> {
    get MissileSpell() { return this.wrap(this.effect.TriggerSpell); }
}
// 33
@EffectID(33)
export class OpenLock<T> extends EffectTemplate<T> {
    get LockType() { return this.wrap(this.effect.MiscValueA); }
    get SkillValue() { return this.wrap(this.effect.PointsPerLevel); }

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
        this.TargetA.setGameobjectTarget();
        this.TargetB.set(0)
        return this.owner;
    }
}
// 34
// 35
// 36
@EffectID(36)
export class LearnSpell<T> extends TargetBase<T> {
    get LearntSpell() { return this.effect.TriggerSpell; }
}
// 37
// 38
@EffectID(38)
export class Dispel<T> extends TargetBase<T> {
    get SchoolMask() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 39
@EffectID(39)
export class Language<T> extends TargetBase<T> {
    /**
     * Reference to Languages.dbc
     */
    get LanguageID() { return this.wrap(this.effect.MiscValueA); }
}
// 40
// 41
@EffectID(41)
export class Jump<T> extends TargetBase<T> {
    get MinHeight() { return this.wrap(this.effect.MiscValueA); }
    get MaxHeight() { return this.wrap(this.effect.MiscValueB); }
}
// 42
@EffectID(42)
export class JumpDest<T> extends TargetBase<T> {
    get MinHeight() { return this.wrap(this.effect.MiscValueA); }
    get MaxHeight() { return this.wrap(this.effect.MiscValueB); }
}
// 43
@EffectID(43)
export class TeleportUnitFaceCaster<T> extends EffectTemplate<T> {
    get TeleportedUnit() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TeleportTarget() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 44
@EffectID(44)
export class SkillStep<T> extends TargetBase<T> {
    get Tier() { return this.wrap(this.effect.BasePoints); }
    get Skill() { return this.wrap(this.effect.MiscValueA); }
}
// 45
@EffectID(45)
export class AddHonor<T> extends CountBase<T> {}
// 46
// 47
@EffectID(47)
export class TradeSkill<T> extends EffectTemplate<T> {
}
// 48
// 49
// 50
@EffectID(50)
export class TransDoor<T> extends TargetBase<T> {
    get GameObjectTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 51
// 52
// 53
@EffectID(53)
export class EnchantItem<T> extends EffectTemplate<T> {
    get EnchantingItem() { return this.wrap(this.effect.ItemType); }
    get Enchant() { return this.wrap(this.effect.MiscValueA); }
}
// 54
@EffectID(54)
export class EnchantItemTemp<T> extends EffectTemplate<T> {
    get EnchantingItem() { return this.wrap(this.effect.ItemType); }
    get EnchantID() { return this.wrap(this.effect.MiscValueA); }
}
// 55
// 56
@EffectID(56)
export class SummonPet<T> extends EffectTemplate<T> {
    get SummonedCreature() {
        return this.wrap(this.effect.MiscValueA); 
    }
}
// 57
@EffectID(57)
export class LearnPetSpell<T> extends TargetBase<T> {
    get LearntSpell() { return this.effect.TriggerSpell; }
}
// 58
@EffectID(58)
export class WeaponDamage<T> extends DamageBase<T> {}
// 59
@EffectID(59)
export class CreateRandomItem<T> extends TargetBase<T> {
    /**
     * Reference to spell_loot_template
     */
    get LootTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 60
// 61
@EffectID(61)
export class SendEvent<T> extends EffectTemplate<T> {
    get EventID() { return this.wrap(this.effect.MiscValueA); }
}
// 62
@EffectID(62)
export class PowerBurn<T> extends PowerBase<T> {}
// 63
@EffectID(63)
export class Threat<T> extends TargetBase<T> {
    
    get ThreatAmount() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
}
// 64
@EffectID(64)
export class TriggerSpell<T> extends EffectTemplate<T> {
    get TriggerSpell() { return this.wrap(this.effect.TriggerSpell); }
}
// 65
// 66
@EffectID(66)
export class CreateManaGem<T> extends TargetBase<T> {
    get ItemType() { return this.wrap(this.effect.ItemType); }
}
// 67
@EffectID(67)
export class HealMaxHealth<T> extends TargetBase<T> {}
// 68
@EffectID(68)
export class InterruptCast<T> extends TargetBase<T> {
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.wrapIndex(this.row.EffectMechanic,this.index))}
}
// 69
// 70
// 71
@EffectID(71)
export class Pickpocket<T> extends EffectTemplate<T> {
    get TargetA() { return new SpellImplicitTarget(this, this.row.ImplicitTargetA, this.index); }
    get TargetB() { return new SpellImplicitTarget(this, this.row.ImplicitTargetB, this.index); }
}
// 72
@EffectID(72)
export class AddFarsight<T> extends TargetBase<T> {}
// 73
// 74
@EffectID(74)
export class ApplyGlyph<T> extends EffectTemplate<T> {
    get Glyph() { return this.wrap(this.effect.MiscValueA); }
    get ClassMask() { return new EffectClassSet(this, this.effect); }
}
// 75
@EffectID(75)
export class HealMechanical<T> extends HealBase<T> {}
// 76
@EffectID(76)
export class SummonObjectWild<T> extends TargetBase<T> {
    get GameObjectTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 77
@EffectID(77)
export class ScriptEffect<T> extends TargetBase<T> {
}
// 78
// 79
@EffectID(79)
export class Sanctuary<T> extends TargetBase<T> {}
// 80
@EffectID(80)
export class AddComboPoints<T> extends CountBase<T> {}
// 81
// 82
// 83
// 84
// 85

// 86
export class GameObjectActions<T> extends Enum<T> {
    setNone() { return this.set(0); }
    setAnimCustom0() { return this.set(1); }
    setAnimCustom1() { return this.set(2); }
    setAnimCustom2() { return this.set(3); }
    setAnimCustom3() { return this.set(4); }
    setDisturb() { return this.set(5); }
    setUnlock() { return this.set(6); }
    setLock() { return this.set(7); }
    setOpen() { return this.set(8); }
    setOpenAndUnlock() { return this.set(9); }
    setClose() { return this.set(10); }
    setToggleOpen() { return this.set(11); }
    setDestroy() { return this.set(12); }
    setRebuild() { return this.set(13); }
    setCreation() { return this.set(14); }
    setDespawn() { return this.set(15); }
    setMakeInert() { return this.set(16); }
    setMakeActive() { return this.set(17); }
    setCloseAndLock() { return this.set(18); }
    setUseArtKit0() { return this.set(19); }
    setUseArtKit1() { return this.set(20); }
    setUseArtKit2() { return this.set(21); }
    setUseArtKit3() { return this.set(22); }
    setSetTapList() { return this.set(23); }
}

@EffectID(86)
export class ActivateObject<T> extends TargetBase<T> {
    get Action() { return new GameObjectActions(this, this.effect.MiscValueA); }
}
// 87
@EffectID(87)
export class GameObjectDamage<T> extends DamageBase<T> {}
// 88
@EffectID(88)
export class GameObjectRepair<T> extends PointsRoot<T> {
    get BaseRepair() { return this.wrap(this.effect.BasePoints); }
    get RandomRepair() { return this.wrap(this.effect.DieSides); }
    get RepairPerLevel() { return this.wrap(this.effect.PointsPerLevel); }
    get RepairPerCombo() { return this.wrap(this.effect.PointsPerLevel); }
}
// 89
@EffectID(89)
export class GameObjectDestructibleState<T> extends Enum<T> {
    @EnumField(0)
    setIntact() { return this.set(0); }

    @EnumField(1)
    setDamaged() { return this.set(1); }

    @EnumField(2)
    setDestroyed() { return this.set(2); }

    @EnumField(3)
    setRebuilding() { return this.set(3); }
}
@EffectID(89)
export class SetGameObjectDestructibleState<T> extends DamageBase<T> {
    get State() { return new GameObjectDestructibleState(this, this.effect.MiscValueA); }
}
// 90
@EffectID(90)
export class KillCredit<T> extends TargetBase<T> {
    get CreatureID() { return this.wrap(this.effect.MiscValueA); }
}
// 91
// 92
@EffectID(92)
export class EnchantHeldItem<T> extends EffectTemplate<T> {
    get EnchantID() { return this.wrap(this.effect.MiscValueA); }
}
// 93
// 94
@EffectID(94)
export class ResurrectSelf<T> extends EffectTemplate<T> {
    get BaseHealth() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
    get HealthPerLevel() {return this.wrap(this.effect.PointsPerLevel); }
    get HealthPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
    get BonusMultiplier() { return this.wrap(this.effect.BonusMultiplier); }
    get MultipleValue() { return this.wrap(this.effect.MultipleValue); } 
    get Mana() { return this.wrap(this.effect.MiscValueA); }
}
// 95
// 96
@EffectID(96)
export class Charge<T> extends TargetBase<T> {}
// 97
@EffectID(97)
export class CastButtons<T> extends EffectTemplate<T> {
    /**
     * Actual ButtonID is this value + 132
     */
    get ButtonID() { return this.wrap(this.effect.MiscValueA); }

    get ButtonCount() { return this.wrap(this.effect.MiscValueB); }
}
// 98
@EffectID(98)
export class Knockback<T> extends TargetBase<T> {
    get Height() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
    get HeightPerLevel() { return this.wrap(this.effect.PointsPerLevel); }
    get KnockbackAmount() { return this.wrap(this.effect.MiscValueA); }
}
// 99
// 100
@EffectID(100)
export class MakeDrunk<T> extends PointsRoot<T> {
    get BaseDrunkness() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
    get DrunknessPerLevel() { return this.wrap(this.effect.PointsPerLevel); }
    get DrunknessPerCombo() { return this.wrap(this.effect.PointsPerLevel); }
}
// 101
// 102
// 103
@EffectID(103)
export class Reputation<T> extends PointsBase<T> {
    get Faction() { return this.wrap(this.effect.MiscValueA); }
}
// 104
@EffectID(104)
export class SummonObjectSlot1<T> extends TargetBase<T> {
    get GameObjectTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 105
@EffectID(105)
export class SummonObjectSlot2<T> extends TargetBase<T> {
    get GameObjectTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 106
@EffectID(106)
export class SummonObjectSlot3<T> extends TargetBase<T> {
    get GameObjectTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 107
@EffectID(107)
export class SummonObjectSlot4<T> extends TargetBase<T> {
    get GameObjectTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 108
@EffectID(108)
export class DispelMechanic<T> extends TargetBase<T> {
    get SchoolMask() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 109
// 110
@EffectID(110)
export class DestroyAllTotems<T> extends EffectTemplate<T> {
    get ClassMask() { return new EffectClassSet(this, this.effect); }
}
// 111
@EffectID(111)
export class DurabilityDamage<T> extends DamageBase<T> {
    get Slot() { return this.wrap(this.effect.MiscValueA); }
}
// 112
// 113
// 114
// 115
@EffectID(115)
export class DurabilityDamagePercent<T> extends DamageBasePct<T> {
    get Slot() { return this.wrap(this.effect.MiscValueA); }
}
// 116
// 117
// 118
@EffectID(118)
export class Skill<T> extends TargetBase<T> {
    SkillID() { return this.wrap(this.effect.MiscValueA); }
}
// 119
// 120
// 121
// 122
// 123
@EffectID(123)
export class SendTaxi<T> extends TargetBase<T> {
    TaxiID() { return this.wrap(this.effect.MiscValueA); }
}
// 124
@EffectID(124)
export class PullTowards<T> extends TargetBase<T>{
    get SpeedZ() { return this.wrap(this.effect.MiscValueA); }
}
// 125
@EffectID(125)
export class ModifyThreatPercent<T> extends TargetBase<T> {
    get ThreatPercentAmount() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
}
// 126
@EffectID(126)
export class StealBeneficialBuff<T> extends CountBase<T> {
    get DispelMask() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 127
// 128
// 129
// 130
@EffectID(130)
export class RedirectThreat<T> extends TargetBase<T> {
    get ThreatAmount() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
}
// 131
@EffectID(131)
export class PlaySound<T> extends TargetBase<T> {
    get SoundID() { return this.wrap(this.effect.MiscValueA); }
}
// 132
@EffectID(132)
export class PlayMusic<T> extends TargetBase<T> {
    get SoundID() { return this.wrap(this.effect.MiscValueA); }
}
// 133
// 134
// 135
// 136
@EffectID(136)
export class HealPercent<T> extends HealBasePct<T> {}
// 137
@EffectID(137)
export class EnergizePercent<T> extends PowerBasePct<T> {
    get PowerType() { return new SpellPowerType(this, this.effect.MiscValueA); }
}
// 138
@EffectID(138)
export class LeapBack<T> extends TargetBase<T> {}
// 139
@EffectID(139)
export class ClearQuest<T> extends TargetBase<T> {
    get QuestID() { return this.wrap(this.effect.MiscValueA); }
}
// 140
@EffectID(140)
export class ForceCast<T> extends EffectTemplate<T> {
    get TriggerSpell() { return this.wrap(this.effect.TriggerSpell); }
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.wrapIndex(this.row.EffectMechanic,this.index)); }
}
// 141
@EffectID(141)
export class ForceCastWithValue<T> extends PointsBase<T> {
    get TriggerSpell() { return this.wrap(this.effect.TriggerSpell); }
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.wrapIndex(this.row.EffectMechanic,this.index)); }
}
// 142
@EffectID(142)
export class TriggerSpellWithValue<T> extends PointsBase<T> {
    get TriggerSpell() { return this.wrap(this.effect.TriggerSpell); }
}
// 143
// 144
@EffectID(144)
export class KnockbackDest<T> extends TargetBase<T> {
    get Height() { return this.wrap(this.effect.BasePoints); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
    get HeightPerLevel() { return this.wrap(this.effect.PointsPerLevel); }
    get KnockbackAmount() { return this.wrap(this.effect.MiscValueA); }
}
// 145
@EffectID(145)
export class PullTowardsDest<T> extends TargetBase<T>{
    get SpeedZ() { return this.wrap(this.effect.MiscValueA); }
}
// 146
export class RuneType<T> extends Enum<T> {
    setBlood() { return this.set(0); }
    setUnholy() { return this.set(1); }
    setFrost() { return this.set(2); }
    setDeath() { return this.set(3); }
}

@EffectID(146)
export class ActivateRune<T> extends CountBase<T> {
    get RuneType() { return new RuneType(this, this.effect.MiscValueA); }
}
// 147
@EffectID(147)
export class FailQuest<T> extends TargetBase<T> {
    get QuestID() { return this.wrap(this.effect.MiscValueA); }
}
// 148
@EffectID(148)
export class TriggerMissileWithValue<T> extends TargetBase<T> {
    get MissileSpell() { return this.wrap(this.effect.TriggerSpell); }
    get BasePoints() { return this.wrap(this.effect.BasePoints); }
    get PointsPerLevel() { return this.wrap(this.effect.PointsPerLevel); }
    get PointsPerCombo() { return this.wrap(this.effect.PointsPerCombo); }
    get DieSides() { return this.wrap(this.effect.DieSides); }
}
// 149
@EffectID(149)
export class ChargeDest<T> extends TargetBase<T> {}
// 150
@EffectID(150)
export class StartQuest<T> extends TargetBase<T> {
    get QuestID() { return this.wrap(this.effect.MiscValueA); }
}
// 151
// 152
// 153
// 154
// 155
@EffectID(155)
export class CanTitanGrip<T> extends TargetBase<T> {
    get PenaltySpellID() { return this.wrap(this.effect.MiscValueA); }
}
// 156
@EffectID(156)
export class EnchantPrismaticItem<T> extends EffectTemplate<T> {
    get EnchantID() { return this.wrap(this.effect.MiscValueA); }
}
// 157
// 158
// 159
// 160
// 161
// 162
// 163
// 164
@EffectID(164)
export class RemoveAura<T> extends TargetBase<T> {
    get RemovedSpell() { return this.wrap(this.effect.TriggerSpell); }
}
// 165
// 166
// 167
// 168
// 169