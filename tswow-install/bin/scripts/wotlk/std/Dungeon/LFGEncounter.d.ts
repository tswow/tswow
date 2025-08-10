import { Cell } from "../../../data/cell/cells/Cell";
import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { DungeonEncounterQuery, DungeonEncounterRow } from "../../dbc/DungeonEncounter";
import { instance_encountersQuery, instance_encountersRow } from "../../sql/instance_encounters";
import { SQLDBCEntity } from "../Misc/SQLDBCEntity";
export declare enum DungeonEncounterCreditType {
    KILL_CREATURE = 0,
    CAST_SPELL = 1,
    COMPLETE_ENCOUNTER = 2
}
export declare class DungeonEncounterIndexCell<T extends DungeonEncounter> extends Cell<number, T> {
    get(): number;
    /**
     * @param value
     */
    set(value: number): T;
}
export declare class DungeonEncounterType<T extends DungeonEncounter> extends EnumCellTransform<T> {
    get KILL_CREATURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DungeonEncounterCreature>;
    get CAST_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DungeonEncounterSpell>;
    get COMPLETE_ENCOUNTER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DungeonEncounterBoss>;
}
export declare class DungeonEncounter extends SQLDBCEntity<DungeonEncounterRow, instance_encountersRow> {
    protected readonly id: number;
    constructor(id: number);
    protected createDBC(): DungeonEncounterRow;
    protected createSQL(): instance_encountersRow;
    protected findDBC(): DungeonEncounterRow;
    protected findSQL(): instance_encountersRow;
    protected isValidDBC(dbc: DungeonEncounterRow): boolean;
    protected isValidSQL(sql: instance_encountersRow): boolean;
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get Difficulty(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Index(): DungeonEncounterIndexCell<this>;
    get Type(): DungeonEncounterType<this>;
    /**
     * The dungeon that this is the last encounter for
     */
    get LastEncounterFor(): import("../Refs/Ref").RefStatic<this, import("./LFGDungeon").LFGDungeon>;
    objectify(options?: ObjectifyOptions): any;
}
export declare class DungeonEncounterPlain extends DungeonEncounter {
    get Entry(): import("../Misc/SQLDBCEntity").MaybeSQLCell<this, number, instance_encountersRow, this>;
}
export declare class DungeonEncounterCreature extends DungeonEncounter {
    get CreatureTemplate(): import("../Refs/Ref").RefStatic<this, import("../Creature/CreatureTemplate").CreatureTemplate>;
}
export declare class DungeonEncounterSpell extends DungeonEncounter {
    get Spell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
}
export declare class DungeonEncounterBoss extends DungeonEncounter {
    get Boss(): import("../Misc/SQLDBCEntity").MaybeSQLCell<this, number, instance_encountersRow, this>;
}
export declare class LFGDungeonEncounters<T> extends MultiRowSystem<DungeonEncounterPlain, T> {
    protected readonly mapId: number;
    constructor(owner: T, mapId: number);
    protected getAllRows(): DungeonEncounterPlain[];
    addGet(): DungeonEncounterPlain;
    addMod(callback: (encounter: DungeonEncounterPlain) => void): T;
    protected isDeleted(value: DungeonEncounterPlain): boolean;
}
export declare const DungeonEncounterRegistry: {
    create(map: number, index: number): DungeonEncounterPlain;
    createCreature(map: number, index: number): any;
    createSpell(map: number, index: number): any;
    load(id: number): DungeonEncounter;
    queryAllDBC(query: DungeonEncounterQuery): DungeonEncounterPlain[];
    queryAllSQL(query: instance_encountersQuery): DungeonEncounterPlain[];
    queryDBC(query: DungeonEncounterQuery): DungeonEncounterPlain;
    querySQL(query: instance_encountersQuery): DungeonEncounterPlain;
};
