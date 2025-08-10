import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCIntArrayCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class PetPersonalityRow extends DBCRow<PetPersonalityCreator, PetPersonalityQuery> {
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
    get HappinessThreshold(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get HappinessDamage(): DBCFloatArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: PetPersonalityCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type PetPersonalityCreator = {
    Name?: loc_constructor;
    HappinessThreshold?: int[];
    HappinessDamage?: float[];
};
/**
 * Used for queries (Don't comment these)
 */
export type PetPersonalityQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    HappinessThreshold?: Relation<int>;
    HappinessDamage?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class PetPersonalityDBCFile extends DBCFile<PetPersonalityCreator, PetPersonalityQuery, PetPersonalityRow> {
    constructor();
    /** Loads a new PetPersonality.dbc from a file. */
    static read(path: string): PetPersonalityDBCFile;
    add(ID: int, c?: PetPersonalityCreator): PetPersonalityRow;
    findById(id: number): PetPersonalityRow;
}
