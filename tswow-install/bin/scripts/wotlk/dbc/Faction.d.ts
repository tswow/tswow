import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class FactionRow extends DBCRow<FactionCreator, FactionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ReputationIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ReputationRaceMask(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ReputationClassMask(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ReputationBase(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ReputationFlags(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ParentFactionID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParentFactionMod(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ParentFactionCap(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: FactionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type FactionCreator = {
    ReputationIndex?: int;
    ReputationRaceMask?: int[];
    ReputationClassMask?: int[];
    ReputationBase?: int[];
    ReputationFlags?: int[];
    ParentFactionID?: int;
    ParentFactionMod?: float[];
    ParentFactionCap?: int[];
    Name?: loc_constructor;
    Description?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type FactionQuery = {
    ID?: Relation<int>;
    ReputationIndex?: Relation<int>;
    ReputationRaceMask?: Relation<int>;
    ReputationClassMask?: Relation<int>;
    ReputationBase?: Relation<int>;
    ReputationFlags?: Relation<int>;
    ParentFactionID?: Relation<int>;
    ParentFactionMod?: Relation<float>;
    ParentFactionCap?: Relation<int>;
    Name?: Relation<string>;
    Description?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class FactionDBCFile extends DBCFile<FactionCreator, FactionQuery, FactionRow> {
    constructor();
    /** Loads a new Faction.dbc from a file. */
    static read(path: string): FactionDBCFile;
    add(ID: int, c?: FactionCreator): FactionRow;
    findById(id: number): FactionRow;
}
