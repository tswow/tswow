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
import { int, mediumint, smallint, tinyint } from '../../primitives'
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
export class quest_template_addonRow extends SqlRow<quest_template_addonCreator,quest_template_addonQuery> {
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
    get MaxLevel() {return new SQLCell<tinyint, this>(this, 'MaxLevel')}

    /**
     * No comment (yet!)
     */
    get AllowableClasses() {return new SQLCell<int, this>(this, 'AllowableClasses')}

    /**
     * No comment (yet!)
     */
    get SourceSpellID() {return new SQLCell<mediumint, this>(this, 'SourceSpellID')}

    /**
     * No comment (yet!)
     */
    get PrevQuestID() {return new SQLCell<mediumint, this>(this, 'PrevQuestID')}

    /**
     * No comment (yet!)
     */
    get NextQuestID() {return new SQLCell<mediumint, this>(this, 'NextQuestID')}

    /**
     * No comment (yet!)
     */
    get ExclusiveGroup() {return new SQLCell<mediumint, this>(this, 'ExclusiveGroup')}

    /**
     * No comment (yet!)
     */
    get BreadcrumbForQuestId() {return new SQLCell<mediumint, this>(this, 'BreadcrumbForQuestId')}

    /**
     * No comment (yet!)
     */
    get RewardMailTemplateID() {return new SQLCell<mediumint, this>(this, 'RewardMailTemplateID')}

    /**
     * No comment (yet!)
     */
    get RewardMailDelay() {return new SQLCell<int, this>(this, 'RewardMailDelay')}

    /**
     * No comment (yet!)
     */
    get RequiredSkillID() {return new SQLCell<smallint, this>(this, 'RequiredSkillID')}

    /**
     * No comment (yet!)
     */
    get RequiredSkillPoints() {return new SQLCell<smallint, this>(this, 'RequiredSkillPoints')}

    /**
     * No comment (yet!)
     */
    get RequiredMinRepFaction() {return new SQLCell<smallint, this>(this, 'RequiredMinRepFaction')}

    /**
     * No comment (yet!)
     */
    get RequiredMaxRepFaction() {return new SQLCell<smallint, this>(this, 'RequiredMaxRepFaction')}

    /**
     * No comment (yet!)
     */
    get RequiredMinRepValue() {return new SQLCell<mediumint, this>(this, 'RequiredMinRepValue')}

    /**
     * No comment (yet!)
     */
    get RequiredMaxRepValue() {return new SQLCell<mediumint, this>(this, 'RequiredMaxRepValue')}

    /**
     * No comment (yet!)
     */
    get ProvidedItemCount() {return new SQLCell<tinyint, this>(this, 'ProvidedItemCount')}

    /**
     * No comment (yet!)
     */
    get SpecialFlags() {return new SQLCell<tinyint, this>(this, 'SpecialFlags')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : quest_template_addonCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_template_addonCreator = {
    ID? : mediumint,
    MaxLevel? : tinyint,
    AllowableClasses? : int,
    SourceSpellID? : mediumint,
    PrevQuestID? : mediumint,
    NextQuestID? : mediumint,
    ExclusiveGroup? : mediumint,
    BreadcrumbForQuestId? : mediumint,
    RewardMailTemplateID? : mediumint,
    RewardMailDelay? : int,
    RequiredSkillID? : smallint,
    RequiredSkillPoints? : smallint,
    RequiredMinRepFaction? : smallint,
    RequiredMaxRepFaction? : smallint,
    RequiredMinRepValue? : mediumint,
    RequiredMaxRepValue? : mediumint,
    ProvidedItemCount? : tinyint,
    SpecialFlags? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_template_addonQuery = {
    ID? : Relation<mediumint>,
    MaxLevel? : Relation<tinyint>,
    AllowableClasses? : Relation<int>,
    SourceSpellID? : Relation<mediumint>,
    PrevQuestID? : Relation<mediumint>,
    NextQuestID? : Relation<mediumint>,
    ExclusiveGroup? : Relation<mediumint>,
    BreadcrumbForQuestId? : Relation<mediumint>,
    RewardMailTemplateID? : Relation<mediumint>,
    RewardMailDelay? : Relation<int>,
    RequiredSkillID? : Relation<smallint>,
    RequiredSkillPoints? : Relation<smallint>,
    RequiredMinRepFaction? : Relation<smallint>,
    RequiredMaxRepFaction? : Relation<smallint>,
    RequiredMinRepValue? : Relation<mediumint>,
    RequiredMaxRepValue? : Relation<mediumint>,
    ProvidedItemCount? : Relation<tinyint>,
    SpecialFlags? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_template_addonTable extends SqlTable<
    quest_template_addonCreator,
    quest_template_addonQuery,
    quest_template_addonRow> {
    add(ID : mediumint, c? : quest_template_addonCreator) : quest_template_addonRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_template_addon = new quest_template_addonTable(
    'quest_template_addon',
    (table, obj)=>new quest_template_addonRow(table, obj))