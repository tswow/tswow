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
export declare class LiquidMaterialRow extends DBCRow<LiquidMaterialCreator, LiquidMaterialQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get LVF(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LiquidMaterialCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LiquidMaterialCreator = {
    LVF?: int;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type LiquidMaterialQuery = {
    ID?: Relation<int>;
    LVF?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LiquidMaterialDBCFile extends DBCFile<LiquidMaterialCreator, LiquidMaterialQuery, LiquidMaterialRow> {
    constructor();
    /** Loads a new LiquidMaterial.dbc from a file. */
    static read(path: string): LiquidMaterialDBCFile;
    add(ID: int, c?: LiquidMaterialCreator): LiquidMaterialRow;
    findById(id: number): LiquidMaterialRow;
}
