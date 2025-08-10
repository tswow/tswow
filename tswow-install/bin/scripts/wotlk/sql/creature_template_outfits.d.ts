import { int, text, tinyint } from "../../data/primitives";
import { Relation } from "../../data/query/Relations";
import { SQLCell, SQLCellReadOnly } from "../../data/sql/SQLCell";
import { SqlRow } from "../../data/sql/SQLRow";
import { SqlTable } from "../../data/sql/SQLTable";
export type creature_template_outfitsConstructor = {
    entry?: int;
    npcsoundsid?: int;
    race?: tinyint;
    class?: tinyint;
    gender?: tinyint;
    skin?: tinyint;
    face?: tinyint;
    hair?: tinyint;
    haircolor?: tinyint;
    facialhair?: tinyint;
    head?: int;
    shoulders?: int;
    body?: int;
    chest?: int;
    waist?: int;
    legs?: int;
    feet?: int;
    wrists?: int;
    hands?: int;
    back?: int;
    tabard?: int;
    guildid?: int;
    mainhand?: int;
    offhand?: int;
    ranged?: int;
    description?: text;
};
export type creature_template_outfitsQuery = {
    entry?: Relation<int>;
    npcsoundsid?: Relation<int>;
    race?: Relation<tinyint>;
    class?: Relation<tinyint>;
    gender?: Relation<tinyint>;
    skin?: Relation<tinyint>;
    face?: Relation<tinyint>;
    hair?: Relation<tinyint>;
    haircolor?: Relation<tinyint>;
    facialhair?: Relation<tinyint>;
    head?: Relation<int>;
    shoulders?: Relation<int>;
    body?: Relation<int>;
    chest?: Relation<int>;
    waist?: Relation<int>;
    legs?: Relation<int>;
    feet?: Relation<int>;
    wrists?: Relation<int>;
    hands?: Relation<int>;
    back?: Relation<int>;
    tabard?: Relation<int>;
    guildid?: Relation<int>;
    mainhand?: Relation<int>;
    offhand?: Relation<int>;
    ranged?: Relation<int>;
    description?: Relation<text>;
};
export declare class creature_template_outfitsRow extends SqlRow<creature_template_outfitsConstructor, creature_template_outfitsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get npcsoundsid(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get race(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get class(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get gender(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get skin(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get face(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get hair(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get haircolor(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get facialhair(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get head(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get shoulders(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get body(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get chest(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get waist(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get legs(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get feet(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get wrists(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get hands(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get back(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get tabard(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get guildid(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get mainhand(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get offhand(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ranged(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    clone(entry: int, c?: creature_template_outfitsConstructor): this;
}
export declare class creature_template_outfitsTable extends SqlTable<creature_template_outfitsConstructor, creature_template_outfitsQuery, creature_template_outfitsRow> {
    add(entry: int, c?: creature_template_outfitsConstructor): creature_template_outfitsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_template_outfits: creature_template_outfitsTable;
