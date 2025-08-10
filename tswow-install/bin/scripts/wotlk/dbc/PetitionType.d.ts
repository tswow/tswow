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
export declare class PetitionTypeRow extends DBCRow<PetitionTypeCreator, PetitionTypeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get RefName(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field02(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: PetitionTypeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type PetitionTypeCreator = {
    RefName?: int;
    Field02?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type PetitionTypeQuery = {
    ID?: Relation<int>;
    RefName?: Relation<int>;
    Field02?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class PetitionTypeDBCFile extends DBCFile<PetitionTypeCreator, PetitionTypeQuery, PetitionTypeRow> {
    constructor();
    /** Loads a new PetitionType.dbc from a file. */
    static read(path: string): PetitionTypeDBCFile;
    add(ID: int, c?: PetitionTypeCreator): PetitionTypeRow;
    findById(id: number): PetitionTypeRow;
}
