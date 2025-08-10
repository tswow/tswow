import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ObjectEffectGroupRow extends DBCRow<ObjectEffectGroupCreator, ObjectEffectGroupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ObjectEffectGroupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ObjectEffectGroupCreator = {
    Name?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type ObjectEffectGroupQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ObjectEffectGroupDBCFile extends DBCFile<ObjectEffectGroupCreator, ObjectEffectGroupQuery, ObjectEffectGroupRow> {
    constructor();
    /** Loads a new ObjectEffectGroup.dbc from a file. */
    static read(path: string): ObjectEffectGroupDBCFile;
    add(ID: int, c?: ObjectEffectGroupCreator): ObjectEffectGroupRow;
    findById(id: number): ObjectEffectGroupRow;
}
