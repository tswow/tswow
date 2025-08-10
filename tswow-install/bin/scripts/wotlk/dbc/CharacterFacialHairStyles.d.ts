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
export declare class CharacterFacialHairStylesRow extends DBCRow<CharacterFacialHairStylesCreator, CharacterFacialHairStylesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get RaceID(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SexID(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get VariationID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Geoset(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(RaceID: int, SexID: int, VariationID: int, c?: CharacterFacialHairStylesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CharacterFacialHairStylesCreator = {
    Geoset?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type CharacterFacialHairStylesQuery = {
    RaceID?: Relation<int>;
    SexID?: Relation<int>;
    VariationID?: Relation<int>;
    Geoset?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CharacterFacialHairStylesDBCFile extends DBCFile<CharacterFacialHairStylesCreator, CharacterFacialHairStylesQuery, CharacterFacialHairStylesRow> {
    constructor();
    /** Loads a new CharacterFacialHairStyles.dbc from a file. */
    static read(path: string): CharacterFacialHairStylesDBCFile;
    add(RaceID: int, SexID: int, VariationID: int, c?: CharacterFacialHairStylesCreator): CharacterFacialHairStylesRow;
}
