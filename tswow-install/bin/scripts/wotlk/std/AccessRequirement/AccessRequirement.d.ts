import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { access_requirementQuery, access_requirementRow } from "../../sql/access_requirement";
import { MinMaxCell } from "../Misc/LimitCells";
export declare class AccessRequirement<T> extends CellSystem<T> {
    readonly row: access_requirementRow;
    constructor(owner: T, row: access_requirementRow);
    get Map(): import("../Refs/Ref").RefReadOnly<T, import("../Map/Map").Map>;
    get Difficulty(): number;
    get Level(): MinMaxCell<T>;
    get ItemLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Achievement(): import("../Refs/Ref").RefNoCreate<T, import("../Achievement/Achievement").Achievement>;
    get Text(): import("../../../data/cell/cells/Cell").CellWrapper<string, T>;
    get HordeQuest(): import("../Refs/Ref").RefStatic<T, import("../Quest/Quest").Quest>;
    get AllianceQuest(): import("../Refs/Ref").RefStatic<T, import("../Quest/Quest").Quest>;
    get HordeItem(): import("../Refs/Ref").RefStatic<T, import("../Item/ItemTemplate").ItemTemplate>;
    get AllianceItem(): import("../Refs/Ref").RefStatic<T, import("../Item/ItemTemplate").ItemTemplate>;
}
export declare class AccessRequirementStandalone extends AccessRequirement<AccessRequirementStandalone> {
    constructor(row: access_requirementRow);
}
export declare const AccessRequirementRegistry: {
    get(map: number, difficulty: number): AccessRequirementStandalone;
    filter(query: access_requirementQuery): AccessRequirementStandalone[];
    find(query: access_requirementQuery): AccessRequirementStandalone;
};
