import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class UnitBloodLevelsRow extends DBCRow<UnitBloodLevelsCreator, UnitBloodLevelsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Violencelevel(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: UnitBloodLevelsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type UnitBloodLevelsCreator = {
    Violencelevel?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type UnitBloodLevelsQuery = {
    ID?: Relation<int>;
    Violencelevel?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class UnitBloodLevelsDBCFile extends DBCFile<UnitBloodLevelsCreator, UnitBloodLevelsQuery, UnitBloodLevelsRow> {
    constructor();
    /** Loads a new UnitBloodLevels.dbc from a file. */
    static read(path: string): UnitBloodLevelsDBCFile;
    add(ID: int, c?: UnitBloodLevelsCreator): UnitBloodLevelsRow;
    findById(id: number): UnitBloodLevelsRow;
}
