import { char, float, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class battleground_templateRow extends SqlRow<battleground_templateCreator, battleground_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get MinPlayersPerTeam(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxPlayersPerTeam(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MinLvl(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxLvl(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AllianceStartLoc(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AllianceStartO(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get HordeStartLoc(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get HordeStartO(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get StartMaxDist(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Weight(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: battleground_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type battleground_templateCreator = {
    ID?: mediumint;
    MinPlayersPerTeam?: smallint;
    MaxPlayersPerTeam?: smallint;
    MinLvl?: tinyint;
    MaxLvl?: tinyint;
    AllianceStartLoc?: mediumint;
    AllianceStartO?: float;
    HordeStartLoc?: mediumint;
    HordeStartO?: float;
    StartMaxDist?: float;
    Weight?: tinyint;
    ScriptName?: char;
    Comment?: char;
};
/**
 * Used for object queries (Don't comment these)
 */
export type battleground_templateQuery = {
    ID?: Relation<mediumint>;
    MinPlayersPerTeam?: Relation<smallint>;
    MaxPlayersPerTeam?: Relation<smallint>;
    MinLvl?: Relation<tinyint>;
    MaxLvl?: Relation<tinyint>;
    AllianceStartLoc?: Relation<mediumint>;
    AllianceStartO?: Relation<float>;
    HordeStartLoc?: Relation<mediumint>;
    HordeStartO?: Relation<float>;
    StartMaxDist?: Relation<float>;
    Weight?: Relation<tinyint>;
    ScriptName?: Relation<char>;
    Comment?: Relation<char>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class battleground_templateTable extends SqlTable<battleground_templateCreator, battleground_templateQuery, battleground_templateRow> {
    add(ID: mediumint, c?: battleground_templateCreator): battleground_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_battleground_template: battleground_templateTable;
