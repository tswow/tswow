import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ChrClassesRow extends DBCRow<ChrClassesCreator, ChrClassesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Field01(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayPower(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PetNameToken(): DBCIntCell<this>;
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
    get Filename(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellClassSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CinematicSequenceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Required_Expansion(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ChrClassesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ChrClassesCreator = {
    Field01?: int;
    DisplayPower?: int;
    PetNameToken?: int;
    Name?: loc_constructor;
    Name_Female?: loc_constructor;
    Name_Male?: loc_constructor;
    Filename?: string;
    SpellClassSet?: int;
    Flags?: int;
    CinematicSequenceID?: int;
    Required_Expansion?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ChrClassesQuery = {
    ID?: Relation<int>;
    Field01?: Relation<int>;
    DisplayPower?: Relation<int>;
    PetNameToken?: Relation<int>;
    Name?: Relation<string>;
    Name_Female?: Relation<string>;
    Name_Male?: Relation<string>;
    Filename?: Relation<string>;
    SpellClassSet?: Relation<int>;
    Flags?: Relation<int>;
    CinematicSequenceID?: Relation<int>;
    Required_Expansion?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ChrClassesDBCFile extends DBCFile<ChrClassesCreator, ChrClassesQuery, ChrClassesRow> {
    constructor();
    /** Loads a new ChrClasses.dbc from a file. */
    static read(path: string): ChrClassesDBCFile;
    add(ID: int, c?: ChrClassesCreator): ChrClassesRow;
    findById(id: number): ChrClassesRow;
}
