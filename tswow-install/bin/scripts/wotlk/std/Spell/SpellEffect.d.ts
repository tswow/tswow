import { EnumValueTransform } from "../../../data/cell/cells/EnumCell";
import { Objectified, ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { ShiftedNumberCell } from "../Misc/ShiftedNumberCell";
import { AuraType } from "./AuraType";
import { Spell } from "./Spell";
import { EffectClassSet } from "./SpellClassSet";
import { SpellEffectMechanic } from "./SpellEffectMechanics";
import { SpellEffectType } from "./SpellEffectType";
import { SpellImplicitTarget } from "./SpellImplicitTarget";
import { SpellTargetPosition } from "./SpellTargetPosition";
export declare class SpellEffects extends ArraySystem<SpellEffect, Spell> {
    get length(): number;
    objectifyPlain(): {
        [key: string]: any;
    }[];
    swap(index1: number, index2: number): Spell;
    get(index: number): SpellEffect;
    mod(index: number, callback: (eff: SpellEffect) => void): Spell;
    addMod(callback: (eff: SpellEffect) => void): Spell;
    addLearnSpells(spells: number[]): Spell;
    addGetTriggerSpell(mod: string, id: string, parent?: number): Spell;
    findType<T extends Objectified>(callback: (eff: SpellEffectType) => EnumValueTransform<SpellEffect, T>): T;
    findAura<T extends Objectified>(callback: (eff: AuraType) => EnumValueTransform<SpellEffect, T>): T;
    /**
     * @param parent set to 0 for no parent
     */
    addModTriggerSpell(mod: string, id: string, parent: number, callback: (spell: Spell) => void): Spell;
    /**
     * Adds an effect via this spell that may override
     * and become a secondary triggered spell
     * @note if this is a combat spell, the dynamic id will break
     *       combat logs over time because the id can vary.
     *
     *       To set up static spell triggers that
     *       work with combat logs, use "add*TriggerSpell"
     *       instead.
     */
    addFreeEffect(callback: (effect: SpellEffect) => void): Spell;
}
export declare class SpellEffect extends ArrayEntry<Spell> {
    isClear(): boolean;
    clear(): this;
    private w;
    get row(): import("../../dbc/Spell").SpellRow;
    get Radius(): import("./SpellRadius").SpellRadiusRef<this>;
    get ItemType(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Aura(): AuraType;
    get Type(): SpellEffectType;
    get Mechanic(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellEffectMechanic>;
    get PointsBase(): ShiftedNumberCell<this>;
    get PointsDieSides(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get PointsPerLevel(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get PointsPerCombo(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get ImplicitTargetA(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get ImplicitTargetB(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get AuraPeriod(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get MultipleValue(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get ChainTarget(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get MiscValueA(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get MiscValueB(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get TriggerSpell(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get ChainAmplitude(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get BonusMultiplier(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get ClassMask(): EffectClassSet<this>;
    get TargetPosition(): SpellTargetPosition<this>;
    objectifyPlain(): {
        [key: string]: any;
    };
    objectify(options?: ObjectifyOptions): {
        [key: string]: any;
    };
    setPoints(base: number, dieSides: number, pointsPerLevel: number, pointsPerCombo: number): undefined;
    copyFrom(source: SpellEffect): undefined;
}
