import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LightParamsRow extends DBCRow<LightParamsCreator, LightParamsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get HighlightSky(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LightSkyboxID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CloudTypeID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Glow(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WaterShallowAlpha(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WaterDeepAlpha(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OceanShallowAlpha(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OceanDeepAlpha(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LightParamsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LightParamsCreator = {
    HighlightSky?: int;
    LightSkyboxID?: int;
    CloudTypeID?: int;
    Glow?: float;
    WaterShallowAlpha?: float;
    WaterDeepAlpha?: float;
    OceanShallowAlpha?: float;
    OceanDeepAlpha?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type LightParamsQuery = {
    ID?: Relation<int>;
    HighlightSky?: Relation<int>;
    LightSkyboxID?: Relation<int>;
    CloudTypeID?: Relation<int>;
    Glow?: Relation<float>;
    WaterShallowAlpha?: Relation<float>;
    WaterDeepAlpha?: Relation<float>;
    OceanShallowAlpha?: Relation<float>;
    OceanDeepAlpha?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LightParamsDBCFile extends DBCFile<LightParamsCreator, LightParamsQuery, LightParamsRow> {
    constructor();
    /** Loads a new LightParams.dbc from a file. */
    static read(path: string): LightParamsDBCFile;
    add(ID: int, c?: LightParamsCreator): LightParamsRow;
    findById(id: number): LightParamsRow;
}
