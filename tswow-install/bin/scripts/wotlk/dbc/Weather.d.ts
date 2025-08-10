import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WeatherRow extends DBCRow<WeatherCreator, WeatherQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get AmbienceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TransitionSkyBox(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectColor(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectTexture(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WeatherCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WeatherCreator = {
    AmbienceID?: int;
    EffectType?: int;
    TransitionSkyBox?: float;
    EffectColor?: float[];
    EffectTexture?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type WeatherQuery = {
    ID?: Relation<int>;
    AmbienceID?: Relation<int>;
    EffectType?: Relation<int>;
    TransitionSkyBox?: Relation<float>;
    EffectColor?: Relation<float>;
    EffectTexture?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WeatherDBCFile extends DBCFile<WeatherCreator, WeatherQuery, WeatherRow> {
    constructor();
    /** Loads a new Weather.dbc from a file. */
    static read(path: string): WeatherDBCFile;
    add(ID: int, c?: WeatherCreator): WeatherRow;
    findById(id: number): WeatherRow;
}
