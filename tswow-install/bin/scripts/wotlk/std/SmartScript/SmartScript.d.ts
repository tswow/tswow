import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { smart_scriptsRow } from "../../sql/smart_scripts";
import { Condition } from "../Conditions/Condition";
import { PercentCell } from "../Misc/PercentCell";
import { ActionType } from "./ActionType";
import { EventType } from "./EventType";
import { TargetType } from "./TargetType";
export declare function getRealEntryOrGuid(row: smart_scriptsRow): number;
export declare class SmartScript extends CellSystemTop {
    readonly row: smart_scriptsRow;
    constructor(row: smart_scriptsRow);
    get EntityEntryOrGUID(): number;
    get EntryOrGUID(): number;
    get ConditionSelf(): Condition<this>;
    get ConditionInvoker(): Condition<this>;
    get Chance(): PercentCell<this>;
    get Action(): ActionType;
    get Target(): TargetType;
    get Event(): EventType<unknown>;
    then(): SmartScript;
    objectify(options?: ObjectifyOptions): {
        action: {
            type: string;
            arguments: {
                [key: string]: number;
            };
        };
        target: {
            type: string;
            arguments: {
                [key: string]: number;
            };
        };
        event: {
            type: string;
            arguments: {
                [key: string]: number;
            };
        };
    };
}
export declare const SmartScripts: {
    creature(entry: number): SmartScript;
    uniqueCreature(guid: number, isChain?: boolean): SmartScript;
    gameObject(entry: number, link?: number): SmartScript;
    uniqueGameObject(guid: number, link?: number): SmartScript;
    area(entry: number, link?: number): SmartScript;
    loadCreature(creature: number): SmartScript[];
    printCreature(creature: number): string;
};
