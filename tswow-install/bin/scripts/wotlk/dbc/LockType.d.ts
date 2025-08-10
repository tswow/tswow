import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LockTypeRow extends DBCRow<LockTypeCreator, LockTypeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get ResourceName(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Verb(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get CursorName(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LockTypeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LockTypeCreator = {
    Name?: loc_constructor;
    ResourceName?: loc_constructor;
    Verb?: loc_constructor;
    CursorName?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type LockTypeQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    ResourceName?: Relation<string>;
    Verb?: Relation<string>;
    CursorName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LockTypeDBCFile extends DBCFile<LockTypeCreator, LockTypeQuery, LockTypeRow> {
    constructor();
    /** Loads a new LockType.dbc from a file. */
    static read(path: string): LockTypeDBCFile;
    add(ID: int, c?: LockTypeCreator): LockTypeRow;
    findById(id: number): LockTypeRow;
}
