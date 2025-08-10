import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class FactionGroupRow extends DBCRow<FactionGroupCreator, FactionGroupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MaskID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get InternalName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: FactionGroupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type FactionGroupCreator = {
    MaskID?: int;
    InternalName?: string;
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type FactionGroupQuery = {
    ID?: Relation<int>;
    MaskID?: Relation<int>;
    InternalName?: Relation<string>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class FactionGroupDBCFile extends DBCFile<FactionGroupCreator, FactionGroupQuery, FactionGroupRow> {
    constructor();
    /** Loads a new FactionGroup.dbc from a file. */
    static read(path: string): FactionGroupDBCFile;
    add(ID: int, c?: FactionGroupCreator): FactionGroupRow;
    findById(id: number): FactionGroupRow;
}
