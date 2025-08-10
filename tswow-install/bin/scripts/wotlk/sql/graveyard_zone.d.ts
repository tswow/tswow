import { mediumint, smallint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class graveyard_zoneRow extends SqlRow<graveyard_zoneCreator, graveyard_zoneQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get GhostZone(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Faction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, GhostZone: mediumint, c?: graveyard_zoneCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type graveyard_zoneCreator = {
    ID?: mediumint;
    GhostZone?: mediumint;
    Faction?: smallint;
    Comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type graveyard_zoneQuery = {
    ID?: Relation<mediumint>;
    GhostZone?: Relation<mediumint>;
    Faction?: Relation<smallint>;
    Comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class graveyard_zoneTable extends SqlTable<graveyard_zoneCreator, graveyard_zoneQuery, graveyard_zoneRow> {
    add(ID: mediumint, GhostZone: mediumint, c?: graveyard_zoneCreator): graveyard_zoneRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_graveyard_zone: graveyard_zoneTable;
