import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell, DBCStringArrayCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class UnitBloodRow extends DBCRow<UnitBloodCreator, UnitBloodQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get CombatBloodSpurtFront(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CombatBloodSpurtBack(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get GroundBlood(): DBCStringArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: UnitBloodCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type UnitBloodCreator = {
    CombatBloodSpurtFront?: int[];
    CombatBloodSpurtBack?: int[];
    GroundBlood?: string[];
};
/**
 * Used for queries (Don't comment these)
 */
export type UnitBloodQuery = {
    ID?: Relation<int>;
    CombatBloodSpurtFront?: Relation<int>;
    CombatBloodSpurtBack?: Relation<int>;
    GroundBlood?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class UnitBloodDBCFile extends DBCFile<UnitBloodCreator, UnitBloodQuery, UnitBloodRow> {
    constructor();
    /** Loads a new UnitBlood.dbc from a file. */
    static read(path: string): UnitBloodDBCFile;
    add(ID: int, c?: UnitBloodCreator): UnitBloodRow;
    findById(id: number): UnitBloodRow;
}
