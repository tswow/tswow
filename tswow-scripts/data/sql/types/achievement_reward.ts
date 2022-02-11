/*
  * Copyright (C) 2020 tswow <https://github.com/tswow/>
  * This program is free software: you can redistribute it and/or
  * modify it under the terms of the GNU General Public License as
  * published by the Free Software Foundation, version 3.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  * See the GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  */

/* tslint:disable */
import { mediumint, text, varchar } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class achievement_rewardRow extends SqlRow<achievement_rewardCreator,achievement_rewardQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * No comment (yet!)
     */
    get TitleA() {return new SQLCell<mediumint, this>(this, 'TitleA')}

    /**
     * No comment (yet!)
     */
    get TitleH() {return new SQLCell<mediumint, this>(this, 'TitleH')}

    /**
     * No comment (yet!)
     */
    get ItemID() {return new SQLCell<mediumint, this>(this, 'ItemID')}

    /**
     * No comment (yet!)
     */
    get Sender() {return new SQLCell<mediumint, this>(this, 'Sender')}

    /**
     * No comment (yet!)
     */
    get Subject() {return new SQLCell<varchar, this>(this, 'Subject')}

    /**
     * No comment (yet!)
     */
    get Body() {return new SQLCell<text, this>(this, 'Body')}

    /**
     * No comment (yet!)
     */
    get MailTemplateID() {return new SQLCell<mediumint, this>(this, 'MailTemplateID')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : achievement_rewardCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type achievement_rewardCreator = {
    ID? : mediumint,
    TitleA? : mediumint,
    TitleH? : mediumint,
    ItemID? : mediumint,
    Sender? : mediumint,
    Subject? : varchar,
    Body? : text,
    MailTemplateID? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type achievement_rewardQuery = {
    ID? : Relation<mediumint>,
    TitleA? : Relation<mediumint>,
    TitleH? : Relation<mediumint>,
    ItemID? : Relation<mediumint>,
    Sender? : Relation<mediumint>,
    Subject? : Relation<varchar>,
    Body? : Relation<text>,
    MailTemplateID? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class achievement_rewardTable extends SqlTable<
    achievement_rewardCreator,
    achievement_rewardQuery,
    achievement_rewardRow> {
    add(ID : mediumint, c? : achievement_rewardCreator) : achievement_rewardRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_achievement_reward = new achievement_rewardTable(
    'achievement_reward',
    (table, obj)=>new achievement_rewardRow(table, obj))