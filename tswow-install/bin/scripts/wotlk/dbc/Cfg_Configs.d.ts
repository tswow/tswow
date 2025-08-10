import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class Cfg_ConfigsRow extends DBCRow<Cfg_ConfigsCreator, Cfg_ConfigsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Id(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get RealmType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PlayerKillingAllowed(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Roleplaying(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(Id: int, c?: Cfg_ConfigsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type Cfg_ConfigsCreator = {
    RealmType?: int;
    PlayerKillingAllowed?: int;
    Roleplaying?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type Cfg_ConfigsQuery = {
    Id?: Relation<int>;
    RealmType?: Relation<int>;
    PlayerKillingAllowed?: Relation<int>;
    Roleplaying?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class Cfg_ConfigsDBCFile extends DBCFile<Cfg_ConfigsCreator, Cfg_ConfigsQuery, Cfg_ConfigsRow> {
    constructor();
    /** Loads a new Cfg_Configs.dbc from a file. */
    static read(path: string): Cfg_ConfigsDBCFile;
    add(Id: int, c?: Cfg_ConfigsCreator): Cfg_ConfigsRow;
}
