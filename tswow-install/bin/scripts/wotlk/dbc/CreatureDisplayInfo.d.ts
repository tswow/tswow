import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureDisplayInfoRow extends DBCRow<CreatureDisplayInfoCreator, CreatureDisplayInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ModelID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExtendedDisplayInfoID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureModelScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureModelAlpha(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureVariation(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get PortraitTextureName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get BloodLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BloodID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get NPCSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParticleColorID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureGeosetData(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ObjectEffectPackageID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureDisplayInfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureDisplayInfoCreator = {
    ModelID?: int;
    SoundID?: int;
    ExtendedDisplayInfoID?: int;
    CreatureModelScale?: float;
    CreatureModelAlpha?: int;
    TextureVariation?: string[];
    PortraitTextureName?: string;
    BloodLevel?: int;
    BloodID?: int;
    NPCSoundID?: int;
    ParticleColorID?: int;
    CreatureGeosetData?: int;
    ObjectEffectPackageID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureDisplayInfoQuery = {
    ID?: Relation<int>;
    ModelID?: Relation<int>;
    SoundID?: Relation<int>;
    ExtendedDisplayInfoID?: Relation<int>;
    CreatureModelScale?: Relation<float>;
    CreatureModelAlpha?: Relation<int>;
    TextureVariation?: Relation<string>;
    PortraitTextureName?: Relation<string>;
    BloodLevel?: Relation<int>;
    BloodID?: Relation<int>;
    NPCSoundID?: Relation<int>;
    ParticleColorID?: Relation<int>;
    CreatureGeosetData?: Relation<int>;
    ObjectEffectPackageID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureDisplayInfoDBCFile extends DBCFile<CreatureDisplayInfoCreator, CreatureDisplayInfoQuery, CreatureDisplayInfoRow> {
    constructor();
    /** Loads a new CreatureDisplayInfo.dbc from a file. */
    static read(path: string): CreatureDisplayInfoDBCFile;
    add(ID: int, c?: CreatureDisplayInfoCreator): CreatureDisplayInfoRow;
    findById(id: number): CreatureDisplayInfoRow;
}
