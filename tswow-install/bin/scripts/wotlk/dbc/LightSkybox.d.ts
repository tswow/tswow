import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LightSkyboxRow extends DBCRow<LightSkyboxCreator, LightSkyboxQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LightSkyboxCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LightSkyboxCreator = {
    Name?: string;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type LightSkyboxQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LightSkyboxDBCFile extends DBCFile<LightSkyboxCreator, LightSkyboxQuery, LightSkyboxRow> {
    constructor();
    /** Loads a new LightSkybox.dbc from a file. */
    static read(path: string): LightSkyboxDBCFile;
    add(ID: int, c?: LightSkyboxCreator): LightSkyboxRow;
    findById(id: number): LightSkyboxRow;
}
