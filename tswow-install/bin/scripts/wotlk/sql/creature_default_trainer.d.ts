import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_default_trainerRow extends SqlRow<creature_default_trainerCreator, creature_default_trainerQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get CreatureId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get TrainerId(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureId: int, c?: creature_default_trainerCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_default_trainerCreator = {
    CreatureId?: int;
    TrainerId?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_default_trainerQuery = {
    CreatureId?: Relation<int>;
    TrainerId?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_default_trainerTable extends SqlTable<creature_default_trainerCreator, creature_default_trainerQuery, creature_default_trainerRow> {
    add(CreatureId: int, c?: creature_default_trainerCreator): creature_default_trainerRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_default_trainer: creature_default_trainerTable;
