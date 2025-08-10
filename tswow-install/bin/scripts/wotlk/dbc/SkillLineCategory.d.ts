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
export declare class SkillLineCategoryRow extends DBCRow<SkillLineCategoryCreator, SkillLineCategoryQuery> {
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
    get SortIndex(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SkillLineCategoryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SkillLineCategoryCreator = {
    Name?: loc_constructor;
    SortIndex?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SkillLineCategoryQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    SortIndex?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillLineCategoryDBCFile extends DBCFile<SkillLineCategoryCreator, SkillLineCategoryQuery, SkillLineCategoryRow> {
    constructor();
    /** Loads a new SkillLineCategory.dbc from a file. */
    static read(path: string): SkillLineCategoryDBCFile;
    add(ID: int, c?: SkillLineCategoryCreator): SkillLineCategoryRow;
    findById(id: number): SkillLineCategoryRow;
}
