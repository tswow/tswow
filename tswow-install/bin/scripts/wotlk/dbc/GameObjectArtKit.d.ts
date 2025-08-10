import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCStringArrayCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class GameObjectArtKitRow extends DBCRow<GameObjectArtKitCreator, GameObjectArtKitQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureVariation(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get AttachModel(): DBCStringArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GameObjectArtKitCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GameObjectArtKitCreator = {
    TextureVariation?: string[];
    AttachModel?: string[];
};
/**
 * Used for queries (Don't comment these)
 */
export type GameObjectArtKitQuery = {
    ID?: Relation<int>;
    TextureVariation?: Relation<string>;
    AttachModel?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GameObjectArtKitDBCFile extends DBCFile<GameObjectArtKitCreator, GameObjectArtKitQuery, GameObjectArtKitRow> {
    constructor();
    /** Loads a new GameObjectArtKit.dbc from a file. */
    static read(path: string): GameObjectArtKitDBCFile;
    add(ID: int, c?: GameObjectArtKitCreator): GameObjectArtKitRow;
    findById(id: number): GameObjectArtKitRow;
}
