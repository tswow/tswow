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
export declare class ObjectEffectRow extends DBCRow<ObjectEffectCreator, ObjectEffectQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get ObjectEffectGroupID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TriggerType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EventType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectRecType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectRecID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Attachment(): DBCIntCell<this>;
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
    get ObjectEffectModifierID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ObjectEffectCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ObjectEffectCreator = {
    Name?: string;
    ObjectEffectGroupID?: int;
    TriggerType?: int;
    EventType?: int;
    EffectRecType?: int;
    EffectRecID?: int;
    Attachment?: int;
    OffsetX?: float;
    OffsetY?: float;
    OffsetZ?: float;
    ObjectEffectModifierID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ObjectEffectQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    ObjectEffectGroupID?: Relation<int>;
    TriggerType?: Relation<int>;
    EventType?: Relation<int>;
    EffectRecType?: Relation<int>;
    EffectRecID?: Relation<int>;
    Attachment?: Relation<int>;
    OffsetX?: Relation<float>;
    OffsetY?: Relation<float>;
    OffsetZ?: Relation<float>;
    ObjectEffectModifierID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ObjectEffectDBCFile extends DBCFile<ObjectEffectCreator, ObjectEffectQuery, ObjectEffectRow> {
    constructor();
    /** Loads a new ObjectEffect.dbc from a file. */
    static read(path: string): ObjectEffectDBCFile;
    add(ID: int, c?: ObjectEffectCreator): ObjectEffectRow;
    findById(id: number): ObjectEffectRow;
}
