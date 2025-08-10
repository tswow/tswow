import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureMovementInfoRow extends DBCRow<CreatureMovementInfoCreator, CreatureMovementInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SmoothFacingChaseRate(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureMovementInfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureMovementInfoCreator = {
    SmoothFacingChaseRate?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureMovementInfoQuery = {
    ID?: Relation<int>;
    SmoothFacingChaseRate?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureMovementInfoDBCFile extends DBCFile<CreatureMovementInfoCreator, CreatureMovementInfoQuery, CreatureMovementInfoRow> {
    constructor();
    /** Loads a new CreatureMovementInfo.dbc from a file. */
    static read(path: string): CreatureMovementInfoDBCFile;
    add(ID: int, c?: CreatureMovementInfoCreator): CreatureMovementInfoRow;
    findById(id: number): CreatureMovementInfoRow;
}
