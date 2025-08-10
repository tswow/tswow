import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class DestructibleModelDataRow extends DBCRow<DestructibleModelDataCreator, DestructibleModelDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get State0Wmo(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State0DestructionDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State0ImpactEffectDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State0AmbientDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State1Wmo(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State1DestructionDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State1ImpactEffectDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State1AmbientDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State2Wmo(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State2DestructionDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State2ImpactEffectDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State2AmbientDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State3Wmo(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State3DestructionDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State3ImpactEffectDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get State3AmbientDoodadSet(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field17(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field18(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DestructibleModelDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DestructibleModelDataCreator = {
    State0Wmo?: int;
    State0DestructionDoodadSet?: int;
    State0ImpactEffectDoodadSet?: int;
    State0AmbientDoodadSet?: int;
    State1Wmo?: int;
    State1DestructionDoodadSet?: int;
    State1ImpactEffectDoodadSet?: int;
    State1AmbientDoodadSet?: int;
    State2Wmo?: int;
    State2DestructionDoodadSet?: int;
    State2ImpactEffectDoodadSet?: int;
    State2AmbientDoodadSet?: int;
    State3Wmo?: int;
    State3DestructionDoodadSet?: int;
    State3ImpactEffectDoodadSet?: int;
    State3AmbientDoodadSet?: int;
    Field17?: int;
    Field18?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type DestructibleModelDataQuery = {
    ID?: Relation<int>;
    State0Wmo?: Relation<int>;
    State0DestructionDoodadSet?: Relation<int>;
    State0ImpactEffectDoodadSet?: Relation<int>;
    State0AmbientDoodadSet?: Relation<int>;
    State1Wmo?: Relation<int>;
    State1DestructionDoodadSet?: Relation<int>;
    State1ImpactEffectDoodadSet?: Relation<int>;
    State1AmbientDoodadSet?: Relation<int>;
    State2Wmo?: Relation<int>;
    State2DestructionDoodadSet?: Relation<int>;
    State2ImpactEffectDoodadSet?: Relation<int>;
    State2AmbientDoodadSet?: Relation<int>;
    State3Wmo?: Relation<int>;
    State3DestructionDoodadSet?: Relation<int>;
    State3ImpactEffectDoodadSet?: Relation<int>;
    State3AmbientDoodadSet?: Relation<int>;
    Field17?: Relation<int>;
    Field18?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DestructibleModelDataDBCFile extends DBCFile<DestructibleModelDataCreator, DestructibleModelDataQuery, DestructibleModelDataRow> {
    constructor();
    /** Loads a new DestructibleModelData.dbc from a file. */
    static read(path: string): DestructibleModelDataDBCFile;
    add(ID: int, c?: DestructibleModelDataCreator): DestructibleModelDataRow;
    findById(id: number): DestructibleModelDataRow;
}
