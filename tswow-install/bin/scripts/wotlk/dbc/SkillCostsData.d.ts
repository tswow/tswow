import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillCostsDataRow extends DBCRow<SkillCostsDataCreator, SkillCostsDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SkillCostsID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Cost(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SkillCostsDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SkillCostsDataCreator = {
    SkillCostsID?: int;
    Cost?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SkillCostsDataQuery = {
    ID?: Relation<int>;
    SkillCostsID?: Relation<int>;
    Cost?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillCostsDataDBCFile extends DBCFile<SkillCostsDataCreator, SkillCostsDataQuery, SkillCostsDataRow> {
    constructor();
    /** Loads a new SkillCostsData.dbc from a file. */
    static read(path: string): SkillCostsDataDBCFile;
    add(ID: int, c?: SkillCostsDataCreator): SkillCostsDataRow;
    findById(id: number): SkillCostsDataRow;
}
