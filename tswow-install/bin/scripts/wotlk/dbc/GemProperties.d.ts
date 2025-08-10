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
export declare class GemPropertiesRow extends DBCRow<GemPropertiesCreator, GemPropertiesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Enchant_Id(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Maxcount_Inv(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Maxcount_Item(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Type(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GemPropertiesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GemPropertiesCreator = {
    Enchant_Id?: int;
    Maxcount_Inv?: int;
    Maxcount_Item?: int;
    Type?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GemPropertiesQuery = {
    ID?: Relation<int>;
    Enchant_Id?: Relation<int>;
    Maxcount_Inv?: Relation<int>;
    Maxcount_Item?: Relation<int>;
    Type?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GemPropertiesDBCFile extends DBCFile<GemPropertiesCreator, GemPropertiesQuery, GemPropertiesRow> {
    constructor();
    /** Loads a new GemProperties.dbc from a file. */
    static read(path: string): GemPropertiesDBCFile;
    add(ID: int, c?: GemPropertiesCreator): GemPropertiesRow;
    findById(id: number): GemPropertiesRow;
}
