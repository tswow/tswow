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
export declare class ParticleColorRow extends DBCRow<ParticleColorCreator, ParticleColorQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Start(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Mid(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get End(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ParticleColorCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ParticleColorCreator = {
    Start?: int[];
    Mid?: int[];
    End?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type ParticleColorQuery = {
    ID?: Relation<int>;
    Start?: Relation<int>;
    Mid?: Relation<int>;
    End?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ParticleColorDBCFile extends DBCFile<ParticleColorCreator, ParticleColorQuery, ParticleColorRow> {
    constructor();
    /** Loads a new ParticleColor.dbc from a file. */
    static read(path: string): ParticleColorDBCFile;
    add(ID: int, c?: ParticleColorCreator): ParticleColorRow;
    findById(id: number): ParticleColorRow;
}
