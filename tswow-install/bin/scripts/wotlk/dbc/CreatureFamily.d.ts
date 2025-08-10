import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureFamilyRow extends DBCRow<CreatureFamilyCreator, CreatureFamilyQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MinScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinScaleLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxScaleLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SkillLine(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get PetFoodMask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PetTalentType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CategoryEnumID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get IconFile(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureFamilyCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureFamilyCreator = {
    MinScale?: float;
    MinScaleLevel?: int;
    MaxScale?: float;
    MaxScaleLevel?: int;
    SkillLine?: int[];
    PetFoodMask?: int;
    PetTalentType?: int;
    CategoryEnumID?: int;
    Name?: loc_constructor;
    IconFile?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureFamilyQuery = {
    ID?: Relation<int>;
    MinScale?: Relation<float>;
    MinScaleLevel?: Relation<int>;
    MaxScale?: Relation<float>;
    MaxScaleLevel?: Relation<int>;
    SkillLine?: Relation<int>;
    PetFoodMask?: Relation<int>;
    PetTalentType?: Relation<int>;
    CategoryEnumID?: Relation<int>;
    Name?: Relation<string>;
    IconFile?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureFamilyDBCFile extends DBCFile<CreatureFamilyCreator, CreatureFamilyQuery, CreatureFamilyRow> {
    constructor();
    /** Loads a new CreatureFamily.dbc from a file. */
    static read(path: string): CreatureFamilyDBCFile;
    add(ID: int, c?: CreatureFamilyCreator): CreatureFamilyRow;
    findById(id: number): CreatureFamilyRow;
}
