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
export declare class CharHairGeosetsRow extends DBCRow<CharHairGeosetsCreator, CharHairGeosetsQuery> {
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
    get VariationID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get GeosetID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Showscalp(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CharHairGeosetsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CharHairGeosetsCreator = {
    RaceID?: int;
    SexID?: int;
    VariationID?: int;
    GeosetID?: int;
    Showscalp?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type CharHairGeosetsQuery = {
    ID?: Relation<int>;
    RaceID?: Relation<int>;
    SexID?: Relation<int>;
    VariationID?: Relation<int>;
    GeosetID?: Relation<int>;
    Showscalp?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CharHairGeosetsDBCFile extends DBCFile<CharHairGeosetsCreator, CharHairGeosetsQuery, CharHairGeosetsRow> {
    constructor();
    /** Loads a new CharHairGeosets.dbc from a file. */
    static read(path: string): CharHairGeosetsDBCFile;
    add(ID: int, c?: CharHairGeosetsCreator): CharHairGeosetsRow;
    findById(id: number): CharHairGeosetsRow;
}
