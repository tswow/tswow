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
export declare class DurabilityCostsRow extends DBCRow<DurabilityCostsCreator, DurabilityCostsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponSubClassCost(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ArmorSubClassCost(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DurabilityCostsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DurabilityCostsCreator = {
    WeaponSubClassCost?: int[];
    ArmorSubClassCost?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type DurabilityCostsQuery = {
    ID?: Relation<int>;
    WeaponSubClassCost?: Relation<int>;
    ArmorSubClassCost?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DurabilityCostsDBCFile extends DBCFile<DurabilityCostsCreator, DurabilityCostsQuery, DurabilityCostsRow> {
    constructor();
    /** Loads a new DurabilityCosts.dbc from a file. */
    static read(path: string): DurabilityCostsDBCFile;
    add(ID: int, c?: DurabilityCostsCreator): DurabilityCostsRow;
    findById(id: number): DurabilityCostsRow;
}
