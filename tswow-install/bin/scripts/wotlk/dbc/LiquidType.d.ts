import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LiquidTypeRow extends DBCRow<LiquidTypeCreator, LiquidTypeQuery> {
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
     * No comment (yet!)
     */
    get Type(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxDarkenDepth(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FogDarkenintensity(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get AmbDarkenintensity(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DirDarkenintensity(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LightID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParticleScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ParticleMovement(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParticleTexSlots(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaterialID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Texture(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Color(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Float(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Int(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LiquidTypeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LiquidTypeCreator = {
    Name?: string;
    Flags?: int;
    Type?: int;
    SoundID?: int;
    SpellID?: int;
    MaxDarkenDepth?: float;
    FogDarkenintensity?: float;
    AmbDarkenintensity?: float;
    DirDarkenintensity?: float;
    LightID?: int;
    ParticleScale?: float;
    ParticleMovement?: int;
    ParticleTexSlots?: int;
    MaterialID?: int;
    Texture?: string[];
    Color?: int[];
    Float?: float[];
    Int?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type LiquidTypeQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Flags?: Relation<int>;
    Type?: Relation<int>;
    SoundID?: Relation<int>;
    SpellID?: Relation<int>;
    MaxDarkenDepth?: Relation<float>;
    FogDarkenintensity?: Relation<float>;
    AmbDarkenintensity?: Relation<float>;
    DirDarkenintensity?: Relation<float>;
    LightID?: Relation<int>;
    ParticleScale?: Relation<float>;
    ParticleMovement?: Relation<int>;
    ParticleTexSlots?: Relation<int>;
    MaterialID?: Relation<int>;
    Texture?: Relation<string>;
    Color?: Relation<int>;
    Float?: Relation<float>;
    Int?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LiquidTypeDBCFile extends DBCFile<LiquidTypeCreator, LiquidTypeQuery, LiquidTypeRow> {
    constructor();
    /** Loads a new LiquidType.dbc from a file. */
    static read(path: string): LiquidTypeDBCFile;
    add(ID: int, c?: LiquidTypeCreator): LiquidTypeRow;
    findById(id: number): LiquidTypeRow;
}
