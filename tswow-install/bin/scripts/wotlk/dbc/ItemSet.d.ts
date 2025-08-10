import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemSetRow extends DBCRow<ItemSetCreator, ItemSetQuery> {
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
    get ItemID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get SetSpellID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get SetThreshold(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkill(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkillRank(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemSetCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemSetCreator = {
    Name?: loc_constructor;
    ItemID?: int[];
    SetSpellID?: int[];
    SetThreshold?: int[];
    RequiredSkill?: int;
    RequiredSkillRank?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemSetQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    ItemID?: Relation<int>;
    SetSpellID?: Relation<int>;
    SetThreshold?: Relation<int>;
    RequiredSkill?: Relation<int>;
    RequiredSkillRank?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemSetDBCFile extends DBCFile<ItemSetCreator, ItemSetQuery, ItemSetRow> {
    constructor();
    /** Loads a new ItemSet.dbc from a file. */
    static read(path: string): ItemSetDBCFile;
    add(ID: int, c?: ItemSetCreator): ItemSetRow;
    findById(id: number): ItemSetRow;
}
