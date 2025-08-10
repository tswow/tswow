import { Cell } from "../../../data/cell/cells/Cell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Talent } from "./Talent";
export declare class TalentRankWrap extends Cell<number, Talent> {
    protected index: number;
    constructor(owner: Talent, index: number);
    get(): number;
    set(value: number): Talent;
}
export declare class TalentRequirement extends ArrayEntry<Talent> {
    clear(): this;
    isClear(): boolean;
    get Talent(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Rank(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    set(talent: number, rank: number): this;
}
export declare class TalentRequirements extends ArraySystem<TalentRequirement, Talent> {
    get length(): number;
    get(index: number): TalentRequirement;
    add(talent: number, rank: number): Talent;
    addPos(row: number, column: number, rank: number): Talent;
}
