import { SQL } from "../../SQLFiles";
import { SmartScript } from "./SmartScript";

/** The default values for the initial row creation. */
const DEFAULTS = {
    action_param1: 0,
    action_param2: 0,
    action_param3: 0,
    action_param4: 0,
    action_param5: 0,
    action_param6: 0,
    action_type: 0,
    comment: "",
    event_chance: 100,
    event_flags: 0,
    event_param1: 0,
    event_param2: 0,
    event_param3: 0,
    event_param4: 0,
    event_param5: 0,
    event_phase_mask: 0,
    event_type: 0,
    target_o: 0,
    target_param1: 0,
    target_param2: 0,
    target_param3: 0,
    target_param4: 0,
    target_type: 0,
    target_x: 0,
    target_y: 0,
    target_z: 0
};

/**
 * A helper class for building Timed Action Lists with largely 
 * standard TS-WoW Syntax.
 */
export class TimedActionList {
    private entryOrGUID: number;
    private id: number | undefined;
    private ooc: bool;
    private curRowIndex: number;

    constructor(entryOrGUID: number, index: number = 0, ooc: bool = true) {
        this.entryOrGUID = entryOrGUID;
        this.ooc = ooc;
        this.curRowIndex = index;
    }

    /**
     * Add a stage to the action list.
     * @param delay How many milliseconds after the previous timed action should this one start.
     * @param callback Use to customise the action that will occur. 
     */
    addAction(delay: number = 0, callback: (script: SmartScript) => void): TimedActionList {
        /** Generate an ID. */
        if (this.id === undefined) {
            this.id = 0;
        } else {
            this.id++;
        }

        /** Create Intial Row */
        let row = SQL.smart_scripts.add(this.ID, 9, this.id === undefined ? 0 : this.id, 0, DEFAULTS);

        /** Force Event Data */
        row.event_type.set(this.ooc ? 1 : 0);
        row.event_chance.set(100);
        row.event_flags.set(1);
        row.event_param1.set(delay);
        row.event_param2.set(delay);
        
        /** Hydrate Smart Script entity and pass to callback for editing. */
        let ss = new SmartScript(row);
        callback(ss)

        return this;
    }

    get EntryOrGUID() { return this.entryOrGUID; }
    get ID() { return (this.entryOrGUID * 100) + this.curRowIndex; }
}

/**
 * Entrypoint.
 */
export class ActionLists {
    create(entryOrGUID: number, index: number = 0, ooc: bool = true): TimedActionList {
        return new TimedActionList(entryOrGUID, index, ooc);
    }
}

export const ActionListRegistry = new ActionLists();