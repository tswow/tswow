import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundEmittersRow extends DBCRow<SoundEmittersCreator, SoundEmittersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get PositionX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PositionY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PositionZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DirectionX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DirectionY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DirectionZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundEntriesID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundEmittersCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundEmittersCreator = {
    PositionX?: float;
    PositionY?: float;
    PositionZ?: float;
    DirectionX?: float;
    DirectionY?: float;
    DirectionZ?: float;
    SoundEntriesID?: int;
    MapID?: int;
    Name?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundEmittersQuery = {
    ID?: Relation<int>;
    PositionX?: Relation<float>;
    PositionY?: Relation<float>;
    PositionZ?: Relation<float>;
    DirectionX?: Relation<float>;
    DirectionY?: Relation<float>;
    DirectionZ?: Relation<float>;
    SoundEntriesID?: Relation<int>;
    MapID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundEmittersDBCFile extends DBCFile<SoundEmittersCreator, SoundEmittersQuery, SoundEmittersRow> {
    constructor();
    /** Loads a new SoundEmitters.dbc from a file. */
    static read(path: string): SoundEmittersDBCFile;
    add(ID: int, c?: SoundEmittersCreator): SoundEmittersRow;
    findById(id: number): SoundEmittersRow;
}
