import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { loc_constructor } from "../../../data/primitives";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { LocValue } from "../Misc/LocValueCell";
export declare class BattlegroundStatInfoField extends CellSystemTop {
    constructor();
    set(name: loc_constructor, icon: string | undefined, tooltip: loc_constructor): undefined;
    get Name(): LocValue<this>;
    get Tooltip(): LocValue<this>;
    get Icon(): CellBasic<string, undefined>;
    objectify(): {
        name: any;
        icon: string;
        tooltip: any;
    };
    protected icon?: string;
    protected name: LocValue<this>;
    protected tooltip: LocValue<this>;
}
export declare class BattlegroundStatInfoBase<T> {
    protected id: number;
    protected count?: number;
    protected overrides: {
        [key: string]: BattlegroundStatInfoField;
    };
    protected owner: T;
    constructor(owner: T, id: number);
    static setOwner<T>(info: BattlegroundStatInfoBase<T>, owner: T): void;
    protected get_override(name: string): BattlegroundStatInfoField;
    set(index: number, name: loc_constructor, icon: string | undefined, tooltip: loc_constructor): T;
    get(index: number): BattlegroundStatInfoField;
    mod(index: number, callback: (v: BattlegroundStatInfoField) => void): T;
    forEach(callback: (key: string, field: BattlegroundStatInfoField) => void): void;
    map<V>(callback: (key: string, field: BattlegroundStatInfoField) => V): V[];
    get Count(): CellBasic<number, T>;
    get ID(): number;
}
export declare class BattlegroundStatInfo extends BattlegroundStatInfoBase<BattlegroundStatInfo> {
}
export declare class BattlegroundStatInfoRegistryClass {
    get(map: number): BattlegroundStatInfo;
}
export declare const BattlegroundStatInfoRegistry: BattlegroundStatInfoRegistryClass;
