import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundEntriesRow extends DBCRow<SoundEntriesCreator, SoundEntriesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get File(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Freq(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get DirectoryBase(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Volumefloat(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinDistance(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DistanceCutoff(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAXDef(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundEntriesAdvancedID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundEntriesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundEntriesCreator = {
    SoundType?: int;
    Name?: string;
    File?: string[];
    Freq?: int[];
    DirectoryBase?: string;
    Volumefloat?: float;
    Flags?: int;
    MinDistance?: float;
    DistanceCutoff?: float;
    EAXDef?: int;
    SoundEntriesAdvancedID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundEntriesQuery = {
    ID?: Relation<int>;
    SoundType?: Relation<int>;
    Name?: Relation<string>;
    File?: Relation<string>;
    Freq?: Relation<int>;
    DirectoryBase?: Relation<string>;
    Volumefloat?: Relation<float>;
    Flags?: Relation<int>;
    MinDistance?: Relation<float>;
    DistanceCutoff?: Relation<float>;
    EAXDef?: Relation<int>;
    SoundEntriesAdvancedID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundEntriesDBCFile extends DBCFile<SoundEntriesCreator, SoundEntriesQuery, SoundEntriesRow> {
    constructor();
    /** Loads a new SoundEntries.dbc from a file. */
    static read(path: string): SoundEntriesDBCFile;
    add(ID: int, c?: SoundEntriesCreator): SoundEntriesRow;
    findById(id: number): SoundEntriesRow;
}
