import { int, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCEnumCell, DBCFlagCell, DBCIntCell, DBCKeyCell, DBCPointerCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class AnimationDataRow extends DBCRow<AnimationDataCreator, AnimationDataQuery> {
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
     * 32 = pull out weapons during animation. 16 and 4 puts weapons away during animation.
     */
    get Weaponflags(): DBCFlagCell<this>;
    /**
     * Unknown
     */
    get Bodyflags(): DBCFlagCell<this>;
    /**
     * Unknown
     */
    get Flags(): DBCIntCell<this>;
    /**
     * ID of animation preceding this one
     */
    get Fallback(): DBCPointerCell<this>;
    /**
     * Same as ID for normal animations
     */
    get BehaviorID(): DBCIntCell<this>;
    /**
     * 0 means normal, 3 means fly
     */
    get BehaviorTier(): DBCEnumCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: AnimationDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type AnimationDataCreator = {
    Name?: string;
    Weaponflags?: uint;
    Bodyflags?: uint;
    Flags?: int;
    Fallback?: uint;
    BehaviorID?: int;
    BehaviorTier?: uint;
};
/**
 * Used for queries (Don't comment these)
 */
export type AnimationDataQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Weaponflags?: Relation<number>;
    Bodyflags?: Relation<number>;
    Flags?: Relation<int>;
    Fallback?: Relation<number>;
    BehaviorID?: Relation<int>;
    BehaviorTier?: Relation<number>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class AnimationDataDBCFile extends DBCFile<AnimationDataCreator, AnimationDataQuery, AnimationDataRow> {
    constructor();
    /** Loads a new AnimationData.dbc from a file. */
    static read(path: string): AnimationDataDBCFile;
    add(ID: int, c?: AnimationDataCreator): AnimationDataRow;
    findById(id: number): AnimationDataRow;
}
