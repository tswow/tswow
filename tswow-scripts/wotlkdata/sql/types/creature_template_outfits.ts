import { int, text, tinyint } from "../../primitives"
import { Relation } from "../../query/Relations"
import { PrimaryKey } from "../../table/PrimaryKey"
import { SQLCell, SQLCellReadOnly } from "../SQLCell"
import { SqlRow } from "../SQLRow"
import { SqlTable } from "../SQLTable"

export type creature_template_outfitsConstructor = {
    entry? : int,
    npcsoundsid? : int,
    race? : tinyint,
    class? : tinyint,
    gender? : tinyint,
    skin? : tinyint,
    face? : tinyint,
    hair? : tinyint,
    haircolor? : tinyint,
    facialhair? : tinyint,
    head? : int,
    shoulders? : int,
    body? : int,
    chest? : int,
    waist? : int,
    legs? : int,
    feet? : int,
    wrists? : int,
    hands? : int,
    back? : int,
    tabard? : int,
    guildid? : int,
    mainhand?: int
    offhand?: int
    ranged?: int
    description? : text,
}

export type creature_template_outfitsQuery = {
    entry? : Relation<int>,
    npcsoundsid? : Relation<int>,
    race? : Relation<tinyint>,
    class? : Relation<tinyint>,
    gender? : Relation<tinyint>,
    skin? : Relation<tinyint>,
    face? : Relation<tinyint>,
    hair? : Relation<tinyint>,
    haircolor? : Relation<tinyint>,
    facialhair? : Relation<tinyint>,
    head? : Relation<int>,
    shoulders? : Relation<int>,
    body? : Relation<int>,
    chest? : Relation<int>,
    waist? : Relation<int>,
    legs? : Relation<int>,
    feet? : Relation<int>,
    wrists? : Relation<int>,
    hands? : Relation<int>,
    back? : Relation<int>,
    tabard? : Relation<int>,
    guildid? : Relation<int>,
    mainhand? : Relation<int>,
    offhand? : Relation<int>,
    ranged? : Relation<int>,
    description? : Relation<text>,
}

export class creature_template_outfitsRow extends SqlRow<creature_template_outfitsConstructor,creature_template_outfitsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<int, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get npcsoundsid() {return new SQLCell<int, this>(this, 'npcsoundsid')}

    /**
     * No comment (yet!)
     */
    get race() {return new SQLCell<tinyint, this>(this, 'race')}

    /**
     * No comment (yet!)
     */
    get class() {return new SQLCell<tinyint, this>(this, 'class')}

    /**
     * No comment (yet!)
     */
    get gender() {return new SQLCell<tinyint, this>(this, 'gender')}

    /**
     * No comment (yet!)
     */
    get skin() {return new SQLCell<tinyint, this>(this, 'skin')}

    /**
     * No comment (yet!)
     */
    get face() {return new SQLCell<tinyint, this>(this, 'face')}

    /**
     * No comment (yet!)
     */
    get hair() {return new SQLCell<tinyint, this>(this, 'hair')}

    /**
     * No comment (yet!)
     */
    get haircolor() {return new SQLCell<tinyint, this>(this, 'haircolor')}

    /**
     * No comment (yet!)
     */
    get facialhair() {return new SQLCell<tinyint, this>(this, 'facialhair')}

    /**
     * No comment (yet!)
     */
    get head() {return new SQLCell<int, this>(this, 'head')}

    /**
     * No comment (yet!)
     */
    get shoulders() {return new SQLCell<int, this>(this, 'shoulders')}

    /**
     * No comment (yet!)
     */
    get body() {return new SQLCell<int, this>(this, 'body')}

    /**
     * No comment (yet!)
     */
    get chest() {return new SQLCell<int, this>(this, 'chest')}

    /**
     * No comment (yet!)
     */
    get waist() {return new SQLCell<int, this>(this, 'waist')}

    /**
     * No comment (yet!)
     */
    get legs() {return new SQLCell<int, this>(this, 'legs')}

    /**
     * No comment (yet!)
     */
    get feet() {return new SQLCell<int, this>(this, 'feet')}

    /**
     * No comment (yet!)
     */
    get wrists() {return new SQLCell<int, this>(this, 'wrists')}

    /**
     * No comment (yet!)
     */
    get hands() {return new SQLCell<int, this>(this, 'hands')}

    /**
     * No comment (yet!)
     */
    get back() {return new SQLCell<int, this>(this, 'back')}

    /**
     * No comment (yet!)
     */
    get tabard() {return new SQLCell<int, this>(this, 'tabard')}

    /**
     * No comment (yet!)
     */
    get guildid() {return new SQLCell<int, this>(this, 'guildid')}

    /**
     * No comment (yet!)
     */
    get mainhand() { return new SQLCell<int, this>(this, 'mainhand')}

    /**
     * No comment (yet!)
     */
    get offhand() { return new SQLCell<int, this>(this, 'offhand')}

    /**
     * No comment (yet!)
     */
    get ranged() { return new SQLCell<int, this>(this, 'ranged')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<text, this>(this, 'description')}

    clone(entry : int, c? : creature_template_outfitsConstructor) : this {
        return this.cloneInternal([entry],c)
    }
}

export class creature_template_outfitsTable extends SqlTable<
    creature_template_outfitsConstructor,
    creature_template_outfitsQuery,
    creature_template_outfitsRow> {
    add(entry : int, c? : creature_template_outfitsConstructor) : creature_template_outfitsRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_template_outfits
    = new creature_template_outfitsTable("creature_template_outfits",(table,obj)=>
        new creature_template_outfitsRow(table,obj))