import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiFloatWrapper, MultiIntWrapper, MultiUIntWrapper } from "../../../data/dbc/DBCCell";
import { SpellVisualKitRow } from "../../dbc/SpellVisualKit";
export declare class CharacterProcedureType extends EnumCellTransform<SpellCharacterProcedure> {
    get CHAIN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, ChainProcedure>;
    get COLOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, ColorProcedure>;
    get SCALE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, ScaleProcedure>;
    get EMISSIVE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, EmissiveProcedure>;
    get ECLIPSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, EclipseProcedure>;
    get ANIMATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, SpellCharacterProcedurePlain>;
    get WEAPON_TRAIL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, WeaponTrail>;
    get BLIZZARD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, Blizzard>;
    get FISHING_LINE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, SpellCharacterProcedurePlain>;
    get UNK_13(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<SpellCharacterProcedure, SpellCharacterProcedurePlain>;
}
export declare class SpellCharacterProcedure extends CellSystemTop {
    row: SpellVisualKitRow;
    index: number;
    constructor(row: SpellVisualKitRow, index: number);
    get Type(): CharacterProcedureType;
    objectify(options?: ObjectifyOptions): {
        [key: string]: any;
    };
}
export declare class SpellCharacterProcedurePlain extends SpellCharacterProcedure {
    get Param0(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Param1(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Param2(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class ChainProcedure extends SpellCharacterProcedure {
    get ChainEffect(): import("../Refs/Ref").RefDynamic<this, import("./SpellChainEffect").SpellChainEffect>;
    get TargetCount(): MultiFloatWrapper<this>;
    get Forever(): MultiFloatWrapper<this>;
}
export declare class ColorProcedure extends SpellCharacterProcedure {
    get Color(): MultiFloatWrapper<this>;
    get Period(): MultiFloatWrapper<this>;
    get EndTime(): MultiFloatWrapper<this>;
    get FadeOutTime(): MultiFloatWrapper<this>;
}
export declare class ScaleProcedure extends SpellCharacterProcedure {
    get Scale(): MultiFloatWrapper<this>;
}
export declare class EmissiveProcedure extends SpellCharacterProcedure {
    get Color(): MultiFloatWrapper<this>;
}
export declare class EclipseProcedure extends SpellCharacterProcedure {
    get Color(): MultiFloatWrapper<this>;
    get FadeInTime(): MultiFloatWrapper<this>;
}
export declare class StandWalkAnim extends SpellCharacterProcedure {
    get StandAnim(): MultiUIntWrapper<this>;
    get WalkAnim(): MultiUIntWrapper<this>;
}
export declare class WeaponTrail extends SpellCharacterProcedure {
    get Color(): MultiUIntWrapper<this>;
    get FadeOutRate(): MultiIntWrapper<this>;
    get Duration(): MultiUIntWrapper<this>;
    get Alpha(): MultiUIntWrapper<this>;
}
export declare class Blizzard extends SpellCharacterProcedure {
    get ModelName(): MultiUIntWrapper<this>;
    get EmissionRate(): MultiFloatWrapper<this>;
}
export declare class SpellCharacterProcedures<T> extends CellSystem<T> {
    protected row: SpellVisualKitRow;
    get(index: number): SpellCharacterProcedurePlain;
    objectify(options?: ObjectifyOptions): ({
        [key: string]: any;
    } | "<empty>")[];
    get length(): number;
    forEachValid(callback: (proc: SpellCharacterProcedurePlain) => void): T;
    addGet(): SpellCharacterProcedurePlain;
    mod(index: number, callback: (proc: SpellCharacterProcedurePlain) => void): T;
    addMod(callback: (proc: SpellCharacterProcedure) => void): T;
    clearAll(): T;
    clear(index: number): T;
    constructor(owner: T, row: SpellVisualKitRow);
}
