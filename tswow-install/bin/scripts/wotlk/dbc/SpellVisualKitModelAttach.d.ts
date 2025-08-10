import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualKitModelAttachRow extends DBCRow<SpellVisualKitModelAttachCreator, SpellVisualKitModelAttachQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ParentSpellVisualKitID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellVisualEffectNameID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttachmentID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OffsetX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OffsetY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OffsetZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Yaw(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Pitch(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Roll(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellVisualKitModelAttachCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualKitModelAttachCreator = {
    ParentSpellVisualKitID?: int;
    SpellVisualEffectNameID?: int;
    AttachmentID?: int;
    OffsetX?: float;
    OffsetY?: float;
    OffsetZ?: float;
    Yaw?: float;
    Pitch?: float;
    Roll?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualKitModelAttachQuery = {
    ID?: Relation<int>;
    ParentSpellVisualKitID?: Relation<int>;
    SpellVisualEffectNameID?: Relation<int>;
    AttachmentID?: Relation<int>;
    OffsetX?: Relation<float>;
    OffsetY?: Relation<float>;
    OffsetZ?: Relation<float>;
    Yaw?: Relation<float>;
    Pitch?: Relation<float>;
    Roll?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualKitModelAttachDBCFile extends DBCFile<SpellVisualKitModelAttachCreator, SpellVisualKitModelAttachQuery, SpellVisualKitModelAttachRow> {
    constructor();
    /** Loads a new SpellVisualKitModelAttach.dbc from a file. */
    static read(path: string): SpellVisualKitModelAttachDBCFile;
    add(ID: int, c?: SpellVisualKitModelAttachCreator): SpellVisualKitModelAttachRow;
    findById(id: number): SpellVisualKitModelAttachRow;
}
