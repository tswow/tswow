import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LoadingScreenTaxiSplinesRow extends DBCRow<LoadingScreenTaxiSplinesCreator, LoadingScreenTaxiSplinesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get PathID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Locx(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Locy(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get LegIndex(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LoadingScreenTaxiSplinesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LoadingScreenTaxiSplinesCreator = {
    PathID?: int;
    Locx?: float[];
    Locy?: float[];
    LegIndex?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type LoadingScreenTaxiSplinesQuery = {
    ID?: Relation<int>;
    PathID?: Relation<int>;
    Locx?: Relation<float>;
    Locy?: Relation<float>;
    LegIndex?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LoadingScreenTaxiSplinesDBCFile extends DBCFile<LoadingScreenTaxiSplinesCreator, LoadingScreenTaxiSplinesQuery, LoadingScreenTaxiSplinesRow> {
    constructor();
    /** Loads a new LoadingScreenTaxiSplines.dbc from a file. */
    static read(path: string): LoadingScreenTaxiSplinesDBCFile;
    add(ID: int, c?: LoadingScreenTaxiSplinesCreator): LoadingScreenTaxiSplinesRow;
    findById(id: number): LoadingScreenTaxiSplinesRow;
}
