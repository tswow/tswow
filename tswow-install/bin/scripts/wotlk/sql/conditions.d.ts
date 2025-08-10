import { char, int, mediumint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class conditionsRow extends SqlRow<conditionsCreator, conditionsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SourceTypeOrReferenceId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SourceGroup(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SourceEntry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SourceId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ElseGroup(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ConditionTypeOrReference(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ConditionTarget(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ConditionValue1(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ConditionValue2(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ConditionValue3(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get NegativeCondition(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ErrorType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ErrorTextId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(SourceTypeOrReferenceId: mediumint, SourceGroup: mediumint, SourceEntry: mediumint, SourceId: int, ElseGroup: mediumint, ConditionTypeOrReference: mediumint, ConditionTarget: tinyint, ConditionValue1: mediumint, ConditionValue2: mediumint, ConditionValue3: mediumint, c?: conditionsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type conditionsCreator = {
    SourceTypeOrReferenceId?: mediumint;
    SourceGroup?: mediumint;
    SourceEntry?: mediumint;
    SourceId?: int;
    ElseGroup?: mediumint;
    ConditionTypeOrReference?: mediumint;
    ConditionTarget?: tinyint;
    ConditionValue1?: mediumint;
    ConditionValue2?: mediumint;
    ConditionValue3?: mediumint;
    NegativeCondition?: tinyint;
    ErrorType?: mediumint;
    ErrorTextId?: mediumint;
    ScriptName?: char;
    Comment?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type conditionsQuery = {
    SourceTypeOrReferenceId?: Relation<mediumint>;
    SourceGroup?: Relation<mediumint>;
    SourceEntry?: Relation<mediumint>;
    SourceId?: Relation<int>;
    ElseGroup?: Relation<mediumint>;
    ConditionTypeOrReference?: Relation<mediumint>;
    ConditionTarget?: Relation<tinyint>;
    ConditionValue1?: Relation<mediumint>;
    ConditionValue2?: Relation<mediumint>;
    ConditionValue3?: Relation<mediumint>;
    NegativeCondition?: Relation<tinyint>;
    ErrorType?: Relation<mediumint>;
    ErrorTextId?: Relation<mediumint>;
    ScriptName?: Relation<char>;
    Comment?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class conditionsTable extends SqlTable<conditionsCreator, conditionsQuery, conditionsRow> {
    add(SourceTypeOrReferenceId: mediumint, SourceGroup: mediumint, SourceEntry: mediumint, SourceId: int, ElseGroup: mediumint, ConditionTypeOrReference: mediumint, ConditionTarget: tinyint, ConditionValue1: mediumint, ConditionValue2: mediumint, ConditionValue3: mediumint, c?: conditionsCreator): conditionsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_conditions: conditionsTable;
