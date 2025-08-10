import { SmartScript } from "./SmartScript";
/**
 * A helper class for building Timed Action Lists with largely
 * standard TS-WoW Syntax.
 */
export declare class TimedActionList {
    private entryOrGUID;
    private id;
    private ooc;
    private curRowIndex;
    constructor(entryOrGUID: number, index?: number, ooc?: bool);
    /**
     * Add a stage to the action list.
     * @param delay How many milliseconds after the previous timed action should this one start.
     * @param callback Use to customise the action that will occur.
     */
    addAction(delay: number, callback: (script: SmartScript) => void): TimedActionList;
    get EntryOrGUID(): number;
    get ID(): number;
}
/**
 * Entrypoint.
 */
export declare class ActionLists {
    create(entryOrGUID: number, index?: number, ooc?: bool): TimedActionList;
}
export declare const ActionListRegistry: ActionLists;
