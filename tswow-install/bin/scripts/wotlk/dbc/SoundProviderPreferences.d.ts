import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundProviderPreferencesRow extends DBCRow<SoundProviderPreferencesCreator, SoundProviderPreferencesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EAXEnvironmentSelection(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EAXDecayTime(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2EnvironmentSize(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2EnvironmentDiffusion(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2Room(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2RoomHF(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2DecayHFRatio(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2Reflections(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2ReflectionsDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2Reverb(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2ReverbDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2RoomRolloff(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX2AirAbsorption(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3RoomLF(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3DecayLFRatio(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3EchoTime(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3EchoDepth(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3ModulationTime(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3ModulationDepth(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3HFReference(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EAX3LFReference(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundProviderPreferencesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundProviderPreferencesCreator = {
    Description?: string;
    Flags?: int;
    EAXEnvironmentSelection?: int;
    EAXDecayTime?: float;
    EAX2EnvironmentSize?: float;
    EAX2EnvironmentDiffusion?: float;
    EAX2Room?: int;
    EAX2RoomHF?: int;
    EAX2DecayHFRatio?: float;
    EAX2Reflections?: int;
    EAX2ReflectionsDelay?: float;
    EAX2Reverb?: int;
    EAX2ReverbDelay?: float;
    EAX2RoomRolloff?: float;
    EAX2AirAbsorption?: float;
    EAX3RoomLF?: int;
    EAX3DecayLFRatio?: float;
    EAX3EchoTime?: float;
    EAX3EchoDepth?: float;
    EAX3ModulationTime?: float;
    EAX3ModulationDepth?: float;
    EAX3HFReference?: float;
    EAX3LFReference?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundProviderPreferencesQuery = {
    ID?: Relation<int>;
    Description?: Relation<string>;
    Flags?: Relation<int>;
    EAXEnvironmentSelection?: Relation<int>;
    EAXDecayTime?: Relation<float>;
    EAX2EnvironmentSize?: Relation<float>;
    EAX2EnvironmentDiffusion?: Relation<float>;
    EAX2Room?: Relation<int>;
    EAX2RoomHF?: Relation<int>;
    EAX2DecayHFRatio?: Relation<float>;
    EAX2Reflections?: Relation<int>;
    EAX2ReflectionsDelay?: Relation<float>;
    EAX2Reverb?: Relation<int>;
    EAX2ReverbDelay?: Relation<float>;
    EAX2RoomRolloff?: Relation<float>;
    EAX2AirAbsorption?: Relation<float>;
    EAX3RoomLF?: Relation<int>;
    EAX3DecayLFRatio?: Relation<float>;
    EAX3EchoTime?: Relation<float>;
    EAX3EchoDepth?: Relation<float>;
    EAX3ModulationTime?: Relation<float>;
    EAX3ModulationDepth?: Relation<float>;
    EAX3HFReference?: Relation<float>;
    EAX3LFReference?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundProviderPreferencesDBCFile extends DBCFile<SoundProviderPreferencesCreator, SoundProviderPreferencesQuery, SoundProviderPreferencesRow> {
    constructor();
    /** Loads a new SoundProviderPreferences.dbc from a file. */
    static read(path: string): SoundProviderPreferencesDBCFile;
    add(ID: int, c?: SoundProviderPreferencesCreator): SoundProviderPreferencesRow;
    findById(id: number): SoundProviderPreferencesRow;
}
