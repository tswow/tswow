import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualEffectNameRow extends DBCRow<SpellVisualEffectNameCreator, SpellVisualEffectNameQuery> {
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
    get FileName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaEffectSize(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Scale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinAllowedScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxAllowedScale(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellVisualEffectNameCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualEffectNameCreator = {
    Name?: string;
    FileName?: string;
    AreaEffectSize?: float;
    Scale?: float;
    MinAllowedScale?: float;
    MaxAllowedScale?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualEffectNameQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    FileName?: Relation<string>;
    AreaEffectSize?: Relation<float>;
    Scale?: Relation<float>;
    MinAllowedScale?: Relation<float>;
    MaxAllowedScale?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualEffectNameDBCFile extends DBCFile<SpellVisualEffectNameCreator, SpellVisualEffectNameQuery, SpellVisualEffectNameRow> {
    constructor();
    /** Loads a new SpellVisualEffectName.dbc from a file. */
    static read(path: string): SpellVisualEffectNameDBCFile;
    add(ID: int, c?: SpellVisualEffectNameCreator): SpellVisualEffectNameRow;
    findById(id: number): SpellVisualEffectNameRow;
}
