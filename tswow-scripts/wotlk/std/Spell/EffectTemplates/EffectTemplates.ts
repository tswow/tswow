import { makeEnumCell } from "../../../../data/cell/cells/EnumCell";
import { makeMaskCell32 } from "../../../../data/cell/cells/MaskCell";
import { CreatureTemplateRegistry } from "../../Creature/Creatures";
import { EnchantmentRegistry } from "../../Enchant/Enchantment";
import { LanguageRegistry } from "../../Languages/Languages";
import { LockTypeRegistry } from "../../Locks/Locks";
import { PercentCell } from "../../Misc/PercentCell";
import { SchoolMask } from "../../Misc/School";
import { ShiftedNumberCell } from "../../Misc/ShiftedNumberCell";
import { QuestRegistry } from "../../Quest/Quests";
import { RefUnknown } from "../../Refs/Ref";
import { SkillLineRegistry } from "../../SkillLines/SkillLines";
import { SoundEntryRegistry } from "../../Sound/SoundEntry";
import { TaxiPathRegistry } from "../../Taxi/Taxi";
import { EffectClassSet } from "../SpellClassSet";
import { SpellEffectMechanic } from "../SpellEffectMechanics";
import { SpellImplicitTarget } from "../SpellImplicitTarget";
import { SpellRadiusRegistry } from "../SpellRadius";
import { SpellRegistry } from "../Spells";
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
    get TeleportedUnit() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetA, this.index)); }
    get TeleportedTarget() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetB, this.index)); }
}
// 6
// 7
export class EnvironmentalDamage extends DamageBase {
    get Source() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetA, this.index)); }
    get AreaType() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetB, this.index)); }
    get BonusMultiplier() { return this.wrap(this.owner.BonusMultiplier); }
    get Radius() {
        return SpellRadiusRegistry.ref(
              this
            , this.wrapIndex(this.row.EffectRadiusIndex, this.index)
        );
    }
}
// 8
export class PowerDrain extends PowerBase {}
// 9
export class HealthLeech extends DamageBase {}
// 10
export class Heal extends HealBase {}
// 11
export class BindHome extends EffectTemplate {
    get ImplicitTargetA() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetA, this.index)); }
    get ImplicitTargetB() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetB, this.index)); }
}
// 12
export enum TotemCreatureTargetMask {
    SUMMON1 = 0x1,
    SUMMON2 = 0x2,
    SUMMON3 = 0x4,
    SUMMON4 = 0x8,
}

export enum TotemCreatureCommand {
    REACT_PASSIVE    = 0,
    REACT_DEFENSIVE  = 1,
    REACT_AGGRESSIVE = 2,
    STAY             = 3,
    FOLLOW           = 4,
    ATTACK           = 5,
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
    get Quest() { return QuestRegistry.ref(this, this.owner.MiscValueA); }
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
    get Item() { return this.wrap(this.owner.ItemType); }
    get ItemCount() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
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
export class Energize extends PowerBase {}
// 31
export class WeaponPercentDamage extends DamageBasePct {

    /**
     * Percentage (in whole percentage, i.e. value of "200" = 200%)
     */
    get Percentage() {
        return new PercentCell(
            this,()=>this.owner.PointsDieSides.get() > 0
                  ? '[0-99]'
                  : '[0-100]'
          , true
          , this.owner.PointsBase.AsCell()
        );
    }

    setSingleTarget() {
        this.ImplicitTargetA.UNIT_TARGET_ENEMY.set()
        this.ImplicitTargetB.set(0);
        return this.owner;
    }

    setAoE(radius: number, radiusPerLevel: number, radiusMax: number) {
        this.ImplicitTargetA.SRC_CASTER.set()
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
    get LockType() { return LockTypeRegistry.ref(this, this.owner.MiscValueA); }
    get SkillValue() { return this.wrap(this.owner.PointsPerLevel); }

    get ImplicitTargetA() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetA, this.index)); }
    get ImplicitTargetB() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetB, this.index)); }

    setGameObject(lockType: number) {
        this.LockType.set(lockType);
        this.ImplicitTargetA.GAMEOBJECT_TARGET.set()
        this.ImplicitTargetB.set(0)
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
    get SchoolMask() { return makeMaskCell32(SchoolMask,this, this.wrapIndex(this.row.EffectMiscValue, this.index)); }
}
// 39
export class Language extends TargetBase {
    /**
     * Reference to Languages.dbc
     */
    get Language() { return LanguageRegistry.ref(this, this.owner.MiscValueA); }
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
    get TeleportedUnit() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetA, this.index)); }
    get TeleportedTarget() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetB, this.index)); }
}
// 44
export class SkillStep extends TargetBase {
    get Tier() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
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
    get GOTemplate() { return this.wrap(this.owner.MiscValueA); }
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
    get Enchant() { return EnchantmentRegistry.ref(this, this.owner.MiscValueA); }
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
    get Event() { return new RefUnknown(this, this.owner.MiscValueA); }
}
// 62
export class PowerBurn extends PowerBase {}
// 63
export class Threat extends TargetBase {

    get ThreatBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get ThreatDieSides() { return this.wrap(this.owner.PointsDieSides); }
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
    get Mechanic() { return makeEnumCell(SpellEffectMechanic,this, this.wrapIndex(this.row.EffectMechanic, this.index)); }
}
// 69
// 70
// 71
export class Pickpocket extends EffectTemplate {
    get ImplicitTargetA() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetA, this.index)); }
    get ImplicitTargetB() { return makeEnumCell(SpellImplicitTarget,this, this.wrapIndex(this.row.ImplicitTargetB, this.index)); }
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
    get GOTemplate() { return this.wrap(this.owner.MiscValueA); }
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
export enum GameObjectActions {
    NONE            = 0,
    ANIM_CUSTOM0    = 1,
    ANIM_CUSTOM1    = 2,
    ANIM_CUSTOM2    = 3,
    ANIM_CUSTOM3    = 4,
    DISTURB         = 5,
    UNLOCK          = 6,
    LOCK            = 7,
    OPEN            = 8,
    OPEN_AND_UNLOCK = 9,
    CLOSE           = 10,
    TOGGLE_OPEN     = 11,
    DESTROY         = 12,
    REBUILD         = 13,
    CREATION        = 14,
    DESPAWN         = 15,
    MAKE_INERT      = 16,
    MAKE_ACTIVE     = 17,
    CLOSE_AND_LOCK  = 18,
    USE_ART_KIT0    = 19,
    USE_ART_KIT1    = 20,
    USE_ART_KIT2    = 21,
    USE_ART_KIT3    = 22,
    SET_TAP_LIST    = 23,
}

export class ActivateObject extends TargetBase {
    get Action() { return makeEnumCell(GameObjectActions,this, this.wrapIndex(this.row.EffectMiscValue, this.index)); }
}
// 87
export class GameObjectDamage extends DamageBase {}
// 88
export class GameObjectRepair extends PointsRoot {
    get RepairBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get RepairDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get RepairPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get RepairPerCombo() { return this.wrap(this.owner.PointsPerLevel); }
}
// 89
export enum GameObjectDestructibleState {
    INTACT     = 0,
    DAMAGED    = 1,
    DESTROYED  = 2,
    REBUILDING = 3,
}
export class SetGameObjectDestructibleState extends DamageBase {
    get State() { return makeEnumCell(GameObjectDestructibleState,this, this.wrapIndex(this.row.EffectMiscValue, this.index)); }
}
// 90
export class KillCredit extends TargetBase {
    get CreatureTemplate() { return CreatureTemplateRegistry.ref(this, this.owner.MiscValueA); }
}
// 91
// 92
export class EnchantHeldItem extends EffectTemplate {
    get Enchant() { return EnchantmentRegistry.ref(this, this.owner.MiscValueA); }
}
// 93
// 94
export class ResurrectSelf extends EffectTemplate {
    get HealthBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get HealthDieSides() { return this.wrap(this.owner.PointsDieSides); }
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
    get Button() { return new RefUnknown(this, this.owner.MiscValueA); }

    get ButtonCount() { return this.wrap(this.owner.MiscValueB); }
}
// 98
export class Knockback extends TargetBase {
    get HeightBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get HeightDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get HeightPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get KnockbackAmount() { return this.wrap(this.owner.MiscValueA); }
}
// 99
// 100
export class MakeDrunk extends PointsRoot {
    get DrunknessBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get DrunknessDieSides() { return this.wrap(this.owner.PointsDieSides); }
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
    get GOTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 105
export class SummonObjectSlot2 extends TargetBase {
    get GOTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 106
export class SummonObjectSlot3 extends TargetBase {
    get GOTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 107
export class SummonObjectSlot4 extends TargetBase {
    get GOTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 108
export class DispelMechanic extends TargetBase {
    get SchoolMask() { return makeMaskCell32(SchoolMask,this, this.wrapIndex(this.row.EffectMiscValue, this.index)); }
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
    get Skill() { return SkillLineRegistry.ref(this, this.owner.MiscValueA); }
    get SkillTier() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
}
// 119
// 120
// 121
// 122
// 123
export class SendTaxi extends TargetBase {
    get Taxi() { return TaxiPathRegistry.ref(this, this.owner.MiscValueA); }
}
// 124
export class PullTowards extends TargetBase{
    get SpeedZ() { return this.wrap(this.owner.MiscValueA); }
}
// 125
export class ModifyThreatPercent extends TargetBase {
    get ThreatPercentBase() {
        return new PercentCell(
            this
          , ()=>this.ThreatPercentDieSides.get() > 0 ? '[0-99]' : '[0-100]'
          , true
          , this.owner.PointsBase.AsCell()
        )
    }
    get ThreatPercentDieSides() { return this.wrap(this.owner.PointsDieSides); }
}
// 126
export class StealBeneficialBuff extends CountBase {
    get DispelMask() { return makeMaskCell32(SchoolMask,this, this.wrapIndex(this.row.EffectMiscValue, this.index)); }
}
// 127
// 128
// 129
// 130
export class RedirectThreat extends TargetBase {
    get ThreatBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get ThreatDieSides() { return this.wrap(this.owner.PointsDieSides); }
}
// 131
export class PlaySound extends TargetBase {
    get Sound() { return SoundEntryRegistry.ref(this, this.owner.MiscValueA); }
}
// 132
export class PlayMusic extends TargetBase {
    get Sound() { return SoundEntryRegistry.ref(this, this.owner.MiscValueA); }
}
// 133
// 134
// 135
// 136
export class HealPercent extends HealBasePct {}
// 137
export class EnergizePercent extends PowerBasePct {}
// 138
export class LeapBack extends TargetBase {}
// 139
export class ClearQuest extends TargetBase {
    get Quest() { return QuestRegistry.ref(this, this.owner.MiscValueA); }
}
// 140
export class ForceCast extends EffectTemplate {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
    get Mechanic() { return makeEnumCell(SpellEffectMechanic,this, this.wrapIndex(this.row.EffectMechanic, this.index)); }
}
// 141
export class ForceCastWithValue extends PointsBase {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
    get Mechanic() { return makeEnumCell(SpellEffectMechanic,this, this.wrapIndex(this.row.EffectMechanic, this.index)); }
}
// 142
export class TriggerSpellWithValue extends PointsBase {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 143
// 144
export class KnockbackDest extends TargetBase {
    get HeightBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get HeightDieSides() { return this.wrap(this.owner.PointsDieSides); }
    get HeightPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get KnockbackAmount() { return this.wrap(this.owner.MiscValueA); }
}
// 145
export class PullTowardsDest extends TargetBase{
    get SpeedZ() { return this.wrap(this.owner.MiscValueA); }
}
// 146
export enum RuneType {
    BLOOD  = 0,
    UNHOLY = 1,
    FROST  = 2,
    DEATH  = 3,
}

export class ActivateRune extends CountBase {
    get RuneType() { return makeEnumCell(RuneType,this, this.wrapIndex(this.row.EffectMiscValue, this.index)); }
}
// 147
export class FailQuest extends TargetBase {
    get Quest() { return QuestRegistry.ref(this, this.owner.MiscValueA); }
}
// 148
export class TriggerMissileWithValue extends TargetBase {
    get MissileSpell() { return this.wrap(this.owner.TriggerSpell); }
    get PointsBase() {
        return new ShiftedNumberCell(
            this
          , ()=>this.owner.PointsDieSides.get() > 0
                ? 'STORED_AS_MINUS_ONE'
                : 'NO_CHANGE'
          , this.owner.PointsBase.AsCell()
        )
    }
    get PointsPerLevel() { return this.wrap(this.owner.PointsPerLevel); }
    get PointsPerCombo() { return this.wrap(this.owner.PointsPerCombo); }
    get PointsDieSides() { return this.wrap(this.owner.PointsDieSides); }
}
// 149
export class ChargeDest extends TargetBase {}
// 150
export class StartQuest extends TargetBase {
    get Quest() { return QuestRegistry.ref(this, this.owner.MiscValueA); }
}
// 151
// 152
// 153
// 154
// 155
export class CanTitanGrip extends TargetBase {
    get PenaltySpell() {
        return SpellRegistry.ref(this, this.owner.MiscValueA);
    }
}
// 156
export class EnchantPrismaticItem extends EffectTemplate {
    get Enchant() { return EnchantmentRegistry.ref(this, this.owner.MiscValueA); }
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