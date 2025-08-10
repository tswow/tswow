import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class GameTipsRow extends DBCRow<GameTipsCreator, GameTipsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Text(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GameTipsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GameTipsCreator = {
    Text?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type GameTipsQuery = {
    ID?: Relation<int>;
    Text?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GameTipsDBCFile extends DBCFile<GameTipsCreator, GameTipsQuery, GameTipsRow> {
    constructor();
    /** Loads a new GameTips.dbc from a file. */
    static read(path: string): GameTipsDBCFile;
    add(ID: int, c?: GameTipsCreator): GameTipsRow;
}
