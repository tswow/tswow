import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class TransportPhysicsRow extends DBCRow<TransportPhysicsCreator, TransportPhysicsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get WaveAmp(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WaveTimeScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RollAmp(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RollTimeScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PitchAmp(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PitchTimeScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxBank(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxBankTurnSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get SpeedDampThresh(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get SpeedDamp(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TransportPhysicsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TransportPhysicsCreator = {
    WaveAmp?: float;
    WaveTimeScale?: float;
    RollAmp?: float;
    RollTimeScale?: float;
    PitchAmp?: float;
    PitchTimeScale?: float;
    MaxBank?: float;
    MaxBankTurnSpeed?: float;
    SpeedDampThresh?: float;
    SpeedDamp?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type TransportPhysicsQuery = {
    ID?: Relation<int>;
    WaveAmp?: Relation<float>;
    WaveTimeScale?: Relation<float>;
    RollAmp?: Relation<float>;
    RollTimeScale?: Relation<float>;
    PitchAmp?: Relation<float>;
    PitchTimeScale?: Relation<float>;
    MaxBank?: Relation<float>;
    MaxBankTurnSpeed?: Relation<float>;
    SpeedDampThresh?: Relation<float>;
    SpeedDamp?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TransportPhysicsDBCFile extends DBCFile<TransportPhysicsCreator, TransportPhysicsQuery, TransportPhysicsRow> {
    constructor();
    /** Loads a new TransportPhysics.dbc from a file. */
    static read(path: string): TransportPhysicsDBCFile;
    add(ID: int, c?: TransportPhysicsCreator): TransportPhysicsRow;
    findById(id: number): TransportPhysicsRow;
}
