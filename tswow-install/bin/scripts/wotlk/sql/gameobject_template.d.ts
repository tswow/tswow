import { char, float, int, mediumint, smallint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class gameobject_templateRow extends SqlRow<gameobject_templateCreator, gameobject_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get displayId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get IconName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get castBarCaption(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get unk1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get size(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data7(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data8(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data9(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data10(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data11(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data12(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data13(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data14(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data15(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data16(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data17(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data18(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data19(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data20(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data21(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data22(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Data23(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AIName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: gameobject_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_templateCreator = {
    entry?: mediumint;
    type?: tinyint;
    displayId?: mediumint;
    name?: varchar;
    IconName?: varchar;
    castBarCaption?: varchar;
    unk1?: varchar;
    size?: float;
    Data0?: int;
    Data1?: int;
    Data2?: int;
    Data3?: int;
    Data4?: int;
    Data5?: int;
    Data6?: int;
    Data7?: int;
    Data8?: int;
    Data9?: int;
    Data10?: int;
    Data11?: int;
    Data12?: int;
    Data13?: int;
    Data14?: int;
    Data15?: int;
    Data16?: int;
    Data17?: int;
    Data18?: int;
    Data19?: int;
    Data20?: int;
    Data21?: int;
    Data22?: int;
    Data23?: int;
    AIName?: char;
    ScriptName?: varchar;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_templateQuery = {
    entry?: Relation<mediumint>;
    type?: Relation<tinyint>;
    displayId?: Relation<mediumint>;
    name?: Relation<varchar>;
    IconName?: Relation<varchar>;
    castBarCaption?: Relation<varchar>;
    unk1?: Relation<varchar>;
    size?: Relation<float>;
    Data0?: Relation<int>;
    Data1?: Relation<int>;
    Data2?: Relation<int>;
    Data3?: Relation<int>;
    Data4?: Relation<int>;
    Data5?: Relation<int>;
    Data6?: Relation<int>;
    Data7?: Relation<int>;
    Data8?: Relation<int>;
    Data9?: Relation<int>;
    Data10?: Relation<int>;
    Data11?: Relation<int>;
    Data12?: Relation<int>;
    Data13?: Relation<int>;
    Data14?: Relation<int>;
    Data15?: Relation<int>;
    Data16?: Relation<int>;
    Data17?: Relation<int>;
    Data18?: Relation<int>;
    Data19?: Relation<int>;
    Data20?: Relation<int>;
    Data21?: Relation<int>;
    Data22?: Relation<int>;
    Data23?: Relation<int>;
    AIName?: Relation<char>;
    ScriptName?: Relation<varchar>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gameobject_templateTable extends SqlTable<gameobject_templateCreator, gameobject_templateQuery, gameobject_templateRow> {
    add(entry: mediumint, c?: gameobject_templateCreator): gameobject_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gameobject_template: gameobject_templateTable;
