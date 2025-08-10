import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureDisplayInfoExtraRow extends DBCRow<CreatureDisplayInfoExtraCreator, CreatureDisplayInfoExtraQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayRaceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplaySexID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SkinID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FaceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HairStyleID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HairColorID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FacialHairID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get NPCItemDisplay(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BakeName(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureDisplayInfoExtraCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureDisplayInfoExtraCreator = {
    DisplayRaceID?: int;
    DisplaySexID?: int;
    SkinID?: int;
    FaceID?: int;
    HairStyleID?: int;
    HairColorID?: int;
    FacialHairID?: int;
    NPCItemDisplay?: int[];
    Flags?: int;
    BakeName?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureDisplayInfoExtraQuery = {
    ID?: Relation<int>;
    DisplayRaceID?: Relation<int>;
    DisplaySexID?: Relation<int>;
    SkinID?: Relation<int>;
    FaceID?: Relation<int>;
    HairStyleID?: Relation<int>;
    HairColorID?: Relation<int>;
    FacialHairID?: Relation<int>;
    NPCItemDisplay?: Relation<int>;
    Flags?: Relation<int>;
    BakeName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureDisplayInfoExtraDBCFile extends DBCFile<CreatureDisplayInfoExtraCreator, CreatureDisplayInfoExtraQuery, CreatureDisplayInfoExtraRow> {
    constructor();
    /** Loads a new CreatureDisplayInfoExtra.dbc from a file. */
    static read(path: string): CreatureDisplayInfoExtraDBCFile;
    add(ID: int, c?: CreatureDisplayInfoExtraCreator): CreatureDisplayInfoExtraRow;
    findById(id: number): CreatureDisplayInfoExtraRow;
}
