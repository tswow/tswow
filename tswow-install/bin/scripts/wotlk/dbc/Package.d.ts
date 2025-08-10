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
export declare class PackageRow extends DBCRow<PackageCreator, PackageQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Icon(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Cost(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: PackageCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type PackageCreator = {
    Icon?: string;
    Cost?: int;
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type PackageQuery = {
    ID?: Relation<int>;
    Icon?: Relation<string>;
    Cost?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class PackageDBCFile extends DBCFile<PackageCreator, PackageQuery, PackageRow> {
    constructor();
    /** Loads a new Package.dbc from a file. */
    static read(path: string): PackageDBCFile;
    add(ID: int, c?: PackageCreator): PackageRow;
    findById(id: number): PackageRow;
}
