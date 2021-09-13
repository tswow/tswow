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
import { int, mediumint, smallint, text } from '../../primitives'
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
export class quest_offer_rewardRow extends SqlRow<quest_offer_rewardCreator,quest_offer_rewardQuery> {
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
    get Emote1() {return new SQLCell<smallint, this>(this, 'Emote1')}

    /**
     * No comment (yet!)
     */
    get Emote2() {return new SQLCell<smallint, this>(this, 'Emote2')}

    /**
     * No comment (yet!)
     */
    get Emote3() {return new SQLCell<smallint, this>(this, 'Emote3')}

    /**
     * No comment (yet!)
     */
    get Emote4() {return new SQLCell<smallint, this>(this, 'Emote4')}

    /**
     * No comment (yet!)
     */
    get EmoteDelay1() {return new SQLCell<int, this>(this, 'EmoteDelay1')}

    /**
     * No comment (yet!)
     */
    get EmoteDelay2() {return new SQLCell<int, this>(this, 'EmoteDelay2')}

    /**
     * No comment (yet!)
     */
    get EmoteDelay3() {return new SQLCell<int, this>(this, 'EmoteDelay3')}

    /**
     * No comment (yet!)
     */
    get EmoteDelay4() {return new SQLCell<int, this>(this, 'EmoteDelay4')}

    /**
     * No comment (yet!)
     */
    get RewardText() {return new SQLCell<text, this>(this, 'RewardText')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : quest_offer_rewardCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_offer_rewardCreator = {
    ID? : mediumint,
    Emote1? : smallint,
    Emote2? : smallint,
    Emote3? : smallint,
    Emote4? : smallint,
    EmoteDelay1? : int,
    EmoteDelay2? : int,
    EmoteDelay3? : int,
    EmoteDelay4? : int,
    RewardText? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_offer_rewardQuery = {
    ID? : Relation<mediumint>,
    Emote1? : Relation<smallint>,
    Emote2? : Relation<smallint>,
    Emote3? : Relation<smallint>,
    Emote4? : Relation<smallint>,
    EmoteDelay1? : Relation<int>,
    EmoteDelay2? : Relation<int>,
    EmoteDelay3? : Relation<int>,
    EmoteDelay4? : Relation<int>,
    RewardText? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_offer_rewardTable extends SqlTable<
    quest_offer_rewardCreator,
    quest_offer_rewardQuery,
    quest_offer_rewardRow> {
    add(ID : mediumint, c? : quest_offer_rewardCreator) : quest_offer_rewardRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_offer_reward = new quest_offer_rewardTable(
    'quest_offer_reward',
    (table, obj)=>new quest_offer_rewardRow(table, obj))