import { int, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class npc_vendorRow extends SqlRow<npc_vendorCreator, npc_vendorQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get slot(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get item(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get maxcount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get incrtime(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ExtendedCost(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Custom tswow field
     */
    get raceMask(): SQLCell<number, this>;
    /**
     * Custom tswow field
     */
    get classMask(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, item: mediumint, ExtendedCost: mediumint, c?: npc_vendorCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type npc_vendorCreator = {
    entry?: mediumint;
    slot?: smallint;
    item?: mediumint;
    maxcount?: tinyint;
    incrtime?: int;
    ExtendedCost?: mediumint;
    VerifiedBuild?: smallint;
    raceMask?: int;
    classMask?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type npc_vendorQuery = {
    entry?: Relation<mediumint>;
    slot?: Relation<smallint>;
    item?: Relation<mediumint>;
    maxcount?: Relation<tinyint>;
    incrtime?: Relation<int>;
    ExtendedCost?: Relation<mediumint>;
    VerifiedBuild?: Relation<smallint>;
    raceMask?: Relation<int>;
    classMask?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class npc_vendorTable extends SqlTable<npc_vendorCreator, npc_vendorQuery, npc_vendorRow> {
    add(entry: mediumint, item: mediumint, ExtendedCost: mediumint, c?: npc_vendorCreator): npc_vendorRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_npc_vendor: npc_vendorTable;
