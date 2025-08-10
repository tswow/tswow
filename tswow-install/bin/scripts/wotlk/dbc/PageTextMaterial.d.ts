import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class PageTextMaterialRow extends DBCRow<PageTextMaterialCreator, PageTextMaterialQuery> {
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
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: PageTextMaterialCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type PageTextMaterialCreator = {
    Name?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type PageTextMaterialQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class PageTextMaterialDBCFile extends DBCFile<PageTextMaterialCreator, PageTextMaterialQuery, PageTextMaterialRow> {
    constructor();
    /** Loads a new PageTextMaterial.dbc from a file. */
    static read(path: string): PageTextMaterialDBCFile;
    add(ID: int, c?: PageTextMaterialCreator): PageTextMaterialRow;
    findById(id: number): PageTextMaterialRow;
}
