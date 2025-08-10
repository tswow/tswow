import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ObjectEffectModifierRow extends DBCRow<ObjectEffectModifierCreator, ObjectEffectModifierQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get InputType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MapType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OutputType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Param(): DBCFloatArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ObjectEffectModifierCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ObjectEffectModifierCreator = {
    InputType?: int;
    MapType?: int;
    OutputType?: int;
    Param?: float[];
};
/**
 * Used for queries (Don't comment these)
 */
export type ObjectEffectModifierQuery = {
    ID?: Relation<int>;
    InputType?: Relation<int>;
    MapType?: Relation<int>;
    OutputType?: Relation<int>;
    Param?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ObjectEffectModifierDBCFile extends DBCFile<ObjectEffectModifierCreator, ObjectEffectModifierQuery, ObjectEffectModifierRow> {
    constructor();
    /** Loads a new ObjectEffectModifier.dbc from a file. */
    static read(path: string): ObjectEffectModifierDBCFile;
    add(ID: int, c?: ObjectEffectModifierCreator): ObjectEffectModifierRow;
    findById(id: number): ObjectEffectModifierRow;
}
