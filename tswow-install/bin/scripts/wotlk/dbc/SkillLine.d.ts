import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillLineRow extends DBCRow<SkillLineCreator, SkillLineQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get CategoryID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SkillCostsID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayName(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellIconID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AlternateVerb(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get CanLink(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SkillLineCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SkillLineCreator = {
    CategoryID?: int;
    SkillCostsID?: int;
    DisplayName?: loc_constructor;
    Description?: loc_constructor;
    SpellIconID?: int;
    AlternateVerb?: loc_constructor;
    CanLink?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SkillLineQuery = {
    ID?: Relation<int>;
    CategoryID?: Relation<int>;
    SkillCostsID?: Relation<int>;
    DisplayName?: Relation<string>;
    Description?: Relation<string>;
    SpellIconID?: Relation<int>;
    AlternateVerb?: Relation<string>;
    CanLink?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillLineDBCFile extends DBCFile<SkillLineCreator, SkillLineQuery, SkillLineRow> {
    constructor();
    /** Loads a new SkillLine.dbc from a file. */
    static read(path: string): SkillLineDBCFile;
    add(ID: int, c?: SkillLineCreator): SkillLineRow;
    findById(id: number): SkillLineRow;
}
