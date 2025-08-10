import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillTiersRow extends DBCRow<SkillTiersCreator, SkillTiersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Cost(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Value(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SkillTiersCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SkillTiersCreator = {
    Cost?: int[];
    Value?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SkillTiersQuery = {
    ID?: Relation<int>;
    Cost?: Relation<int>;
    Value?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillTiersDBCFile extends DBCFile<SkillTiersCreator, SkillTiersQuery, SkillTiersRow> {
    constructor();
    /** Loads a new SkillTiers.dbc from a file. */
    static read(path: string): SkillTiersDBCFile;
    add(ID: int, c?: SkillTiersCreator): SkillTiersRow;
    findById(id: number): SkillTiersRow;
}
