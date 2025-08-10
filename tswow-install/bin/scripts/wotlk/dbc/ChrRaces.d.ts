import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ChrRacesRow extends DBCRow<ChrRacesCreator, ChrRacesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FactionID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExplorationSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaleDisplayId(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FemaleDisplayId(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ClientPrefix(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get BaseLanguage(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ResSicknessSpellID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SplashSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ClientFilestring(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get CinematicSequenceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Alliance(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Name_Female(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Name_Male(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get FacialHairCustomization(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get HairCustomization(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Required_Expansion(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ChrRacesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ChrRacesCreator = {
    Flags?: int;
    FactionID?: int;
    ExplorationSoundID?: int;
    MaleDisplayId?: int;
    FemaleDisplayId?: int;
    ClientPrefix?: string;
    BaseLanguage?: int;
    CreatureType?: int;
    ResSicknessSpellID?: int;
    SplashSoundID?: int;
    ClientFilestring?: string;
    CinematicSequenceID?: int;
    Alliance?: int;
    Name?: loc_constructor;
    Name_Female?: loc_constructor;
    Name_Male?: loc_constructor;
    FacialHairCustomization?: string[];
    HairCustomization?: string;
    Required_Expansion?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ChrRacesQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    FactionID?: Relation<int>;
    ExplorationSoundID?: Relation<int>;
    MaleDisplayId?: Relation<int>;
    FemaleDisplayId?: Relation<int>;
    ClientPrefix?: Relation<string>;
    BaseLanguage?: Relation<int>;
    CreatureType?: Relation<int>;
    ResSicknessSpellID?: Relation<int>;
    SplashSoundID?: Relation<int>;
    ClientFilestring?: Relation<string>;
    CinematicSequenceID?: Relation<int>;
    Alliance?: Relation<int>;
    Name?: Relation<string>;
    Name_Female?: Relation<string>;
    Name_Male?: Relation<string>;
    FacialHairCustomization?: Relation<string>;
    HairCustomization?: Relation<string>;
    Required_Expansion?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ChrRacesDBCFile extends DBCFile<ChrRacesCreator, ChrRacesQuery, ChrRacesRow> {
    constructor();
    /** Loads a new ChrRaces.dbc from a file. */
    static read(path: string): ChrRacesDBCFile;
    add(ID: int, c?: ChrRacesCreator): ChrRacesRow;
    findById(id: number): ChrRacesRow;
}
