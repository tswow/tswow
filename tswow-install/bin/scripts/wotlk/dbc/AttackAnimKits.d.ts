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
export declare class AttackAnimKitsRow extends DBCRow<AttackAnimKitsCreator, AttackAnimKitsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Animation(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Type(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field04(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: AttackAnimKitsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type AttackAnimKitsCreator = {
    Animation?: int;
    Type?: int;
    Flags?: int;
    Field04?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type AttackAnimKitsQuery = {
    ID?: Relation<int>;
    Animation?: Relation<int>;
    Type?: Relation<int>;
    Flags?: Relation<int>;
    Field04?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class AttackAnimKitsDBCFile extends DBCFile<AttackAnimKitsCreator, AttackAnimKitsQuery, AttackAnimKitsRow> {
    constructor();
    /** Loads a new AttackAnimKits.dbc from a file. */
    static read(path: string): AttackAnimKitsDBCFile;
    add(ID: int, c?: AttackAnimKitsCreator): AttackAnimKitsRow;
    findById(id: number): AttackAnimKitsRow;
}
