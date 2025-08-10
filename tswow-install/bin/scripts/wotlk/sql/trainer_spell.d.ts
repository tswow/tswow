import { int, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class trainer_spellRow extends SqlRow<trainer_spellCreator, trainer_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get TrainerId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SpellId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get MoneyCost(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ReqSkillLine(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ReqSkillRank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ReqAbility1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ReqAbility2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ReqAbility3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ReqLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Custom tswow field
     */
    get raceMask(): SQLCell<number, this>;
    /**
     * Custom tswow field
     */
    get classMask(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(TrainerId: int, SpellId: int, c?: trainer_spellCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type trainer_spellCreator = {
    TrainerId?: int;
    SpellId?: int;
    MoneyCost?: int;
    ReqSkillLine?: int;
    ReqSkillRank?: int;
    ReqAbility1?: int;
    ReqAbility2?: int;
    ReqAbility3?: int;
    ReqLevel?: tinyint;
    VerifiedBuild?: smallint;
    raceMask?: int;
    classMask?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type trainer_spellQuery = {
    TrainerId?: Relation<int>;
    SpellId?: Relation<int>;
    MoneyCost?: Relation<int>;
    ReqSkillLine?: Relation<int>;
    ReqSkillRank?: Relation<int>;
    ReqAbility1?: Relation<int>;
    ReqAbility2?: Relation<int>;
    ReqAbility3?: Relation<int>;
    ReqLevel?: Relation<tinyint>;
    VerifiedBuild?: Relation<smallint>;
    raceMask?: Relation<int>;
    classMask?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class trainer_spellTable extends SqlTable<trainer_spellCreator, trainer_spellQuery, trainer_spellRow> {
    add(TrainerId: int, SpellId: int, c?: trainer_spellCreator): trainer_spellRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_trainer_spell: trainer_spellTable;
