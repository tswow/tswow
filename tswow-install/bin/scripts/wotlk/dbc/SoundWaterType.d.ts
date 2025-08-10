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
export declare class SoundWaterTypeRow extends DBCRow<SoundWaterTypeCreator, SoundWaterTypeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get LiquidTypeID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FluidSpeed(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundWaterTypeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundWaterTypeCreator = {
    LiquidTypeID?: int;
    FluidSpeed?: int;
    SoundID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundWaterTypeQuery = {
    ID?: Relation<int>;
    LiquidTypeID?: Relation<int>;
    FluidSpeed?: Relation<int>;
    SoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundWaterTypeDBCFile extends DBCFile<SoundWaterTypeCreator, SoundWaterTypeQuery, SoundWaterTypeRow> {
    constructor();
    /** Loads a new SoundWaterType.dbc from a file. */
    static read(path: string): SoundWaterTypeDBCFile;
    add(ID: int, c?: SoundWaterTypeCreator): SoundWaterTypeRow;
    findById(id: number): SoundWaterTypeRow;
}
