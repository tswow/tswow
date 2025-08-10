import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemSubClassRow extends DBCRow<ItemSubClassCreator, ItemSubClassQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ClassID(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SubClassID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get PrerequisiteProficiency(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PostrequisiteProficiency(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayFlags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponParrySeq(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponReadySeq(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponAttackSeq(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponSwingSize(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayName(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get VerboseName(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ClassID: int, SubClassID: int, c?: ItemSubClassCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemSubClassCreator = {
    PrerequisiteProficiency?: int;
    PostrequisiteProficiency?: int;
    Flags?: int;
    DisplayFlags?: int;
    WeaponParrySeq?: int;
    WeaponReadySeq?: int;
    WeaponAttackSeq?: int;
    WeaponSwingSize?: int;
    DisplayName?: loc_constructor;
    VerboseName?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemSubClassQuery = {
    ClassID?: Relation<int>;
    SubClassID?: Relation<int>;
    PrerequisiteProficiency?: Relation<int>;
    PostrequisiteProficiency?: Relation<int>;
    Flags?: Relation<int>;
    DisplayFlags?: Relation<int>;
    WeaponParrySeq?: Relation<int>;
    WeaponReadySeq?: Relation<int>;
    WeaponAttackSeq?: Relation<int>;
    WeaponSwingSize?: Relation<int>;
    DisplayName?: Relation<string>;
    VerboseName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemSubClassDBCFile extends DBCFile<ItemSubClassCreator, ItemSubClassQuery, ItemSubClassRow> {
    constructor();
    /** Loads a new ItemSubClass.dbc from a file. */
    static read(path: string): ItemSubClassDBCFile;
    add(ClassID: int, SubClassID: int, c?: ItemSubClassCreator): ItemSubClassRow;
}
