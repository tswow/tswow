import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class AreaGroupRow extends DBCRow<AreaGroupCreator, AreaGroupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get NextAreaID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: AreaGroupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type AreaGroupCreator = {
    AreaID?: int[];
    NextAreaID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type AreaGroupQuery = {
    ID?: Relation<int>;
    AreaID?: Relation<int>;
    NextAreaID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class AreaGroupDBCFile extends DBCFile<AreaGroupCreator, AreaGroupQuery, AreaGroupRow> {
    constructor();
    /** Loads a new AreaGroup.dbc from a file. */
    static read(path: string): AreaGroupDBCFile;
    add(ID: int, c?: AreaGroupCreator): AreaGroupRow;
    findById(id: number): AreaGroupRow;
}
