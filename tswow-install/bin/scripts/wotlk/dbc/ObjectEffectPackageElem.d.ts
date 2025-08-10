import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ObjectEffectPackageElemRow extends DBCRow<ObjectEffectPackageElemCreator, ObjectEffectPackageElemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ObjectEffectPackageID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ObjectEffectGroupID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get StateType(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ObjectEffectPackageElemCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ObjectEffectPackageElemCreator = {
    ObjectEffectPackageID?: int;
    ObjectEffectGroupID?: int;
    StateType?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ObjectEffectPackageElemQuery = {
    ID?: Relation<int>;
    ObjectEffectPackageID?: Relation<int>;
    ObjectEffectGroupID?: Relation<int>;
    StateType?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ObjectEffectPackageElemDBCFile extends DBCFile<ObjectEffectPackageElemCreator, ObjectEffectPackageElemQuery, ObjectEffectPackageElemRow> {
    constructor();
    /** Loads a new ObjectEffectPackageElem.dbc from a file. */
    static read(path: string): ObjectEffectPackageElemDBCFile;
    add(ID: int, c?: ObjectEffectPackageElemCreator): ObjectEffectPackageElemRow;
    findById(id: number): ObjectEffectPackageElemRow;
}
