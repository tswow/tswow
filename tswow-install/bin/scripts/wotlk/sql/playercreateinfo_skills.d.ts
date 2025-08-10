import { int, smallint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class playercreateinfo_skillsRow extends SqlRow<playercreateinfo_skillsCreator, playercreateinfo_skillsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get raceMask(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get classMask(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get skill(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get rank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(raceMask: int, clsMask: int, skill: smallint, c?: playercreateinfo_skillsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_skillsCreator = {
    raceMask?: int;
    classMask?: int;
    skill?: smallint;
    rank?: smallint;
    comment?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_skillsQuery = {
    raceMask?: Relation<int>;
    classMask?: Relation<int>;
    skill?: Relation<smallint>;
    rank?: Relation<smallint>;
    comment?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class playercreateinfo_skillsTable extends SqlTable<playercreateinfo_skillsCreator, playercreateinfo_skillsQuery, playercreateinfo_skillsRow> {
    add(raceMask: int, clsMask: int, skill: smallint, c?: playercreateinfo_skillsCreator): playercreateinfo_skillsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_playercreateinfo_skills: playercreateinfo_skillsTable;
