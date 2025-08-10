import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
import { Faction } from "./Faction";
export declare enum FactionReputationFlags {
    VISIBLE = 1,
    AT_WAR = 2,
    HIDDEN = 4,
    INVISIBLE_FORCED = 8,
    PEACE_FORCED = 16,
    INACTIVE = 32,
    RIVAL = 64,
    SPECIAL = 128
}
export declare class FactionReputation extends ArrayEntry<Faction> {
    get RaceMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof RaceMask>;
    get ClassMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof ClassMask>;
    get StartReputation(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof FactionReputationFlags>;
    clear(): this;
    isClear(): boolean;
}
export declare class FactionReputations extends ArraySystem<FactionReputation, Faction> {
    get length(): number;
    get(index: number): FactionReputation;
    addGet(): FactionReputation;
    addMod(callback?: (reputation: FactionReputation) => void): Faction;
    addSimple(startReputation: number, races?: MaskCon<keyof typeof RaceMask>, classes?: MaskCon<keyof typeof ClassMask>, flags?: MaskCon<keyof typeof FactionReputationFlags>): Faction;
}
