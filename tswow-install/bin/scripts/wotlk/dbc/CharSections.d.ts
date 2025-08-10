import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCStringArrayCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CharSectionsRow extends DBCRow<CharSectionsCreator, CharSectionsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get RaceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SexID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BaseSection(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureName(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VariationIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ColorIndex(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CharSectionsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CharSectionsCreator = {
    RaceID?: int;
    SexID?: int;
    BaseSection?: int;
    TextureName?: string[];
    Flags?: int;
    VariationIndex?: int;
    ColorIndex?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type CharSectionsQuery = {
    ID?: Relation<int>;
    RaceID?: Relation<int>;
    SexID?: Relation<int>;
    BaseSection?: Relation<int>;
    TextureName?: Relation<string>;
    Flags?: Relation<int>;
    VariationIndex?: Relation<int>;
    ColorIndex?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CharSectionsDBCFile extends DBCFile<CharSectionsCreator, CharSectionsQuery, CharSectionsRow> {
    constructor();
    /** Loads a new CharSections.dbc from a file. */
    static read(path: string): CharSectionsDBCFile;
    add(ID: int, c?: CharSectionsCreator): CharSectionsRow;
}
