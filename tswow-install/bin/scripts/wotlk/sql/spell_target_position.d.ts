import { float, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_target_positionRow extends SqlRow<spell_target_positionCreator, spell_target_positionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get EffectIndex(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get MapID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PositionX(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PositionY(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PositionZ(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Orientation(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, EffectIndex: tinyint, c?: spell_target_positionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_target_positionCreator = {
    ID?: mediumint;
    EffectIndex?: tinyint;
    MapID?: smallint;
    PositionX?: float;
    PositionY?: float;
    PositionZ?: float;
    Orientation?: float;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_target_positionQuery = {
    ID?: Relation<mediumint>;
    EffectIndex?: Relation<tinyint>;
    MapID?: Relation<smallint>;
    PositionX?: Relation<float>;
    PositionY?: Relation<float>;
    PositionZ?: Relation<float>;
    Orientation?: Relation<float>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_target_positionTable extends SqlTable<spell_target_positionCreator, spell_target_positionQuery, spell_target_positionRow> {
    add(ID: mediumint, EffectIndex: tinyint, c?: spell_target_positionCreator): spell_target_positionRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_target_position: spell_target_positionTable;
