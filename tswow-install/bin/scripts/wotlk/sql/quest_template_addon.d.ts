import { int, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class quest_template_addonRow extends SqlRow<quest_template_addonCreator, quest_template_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AllowableClasses(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SourceSpellID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PrevQuestID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get NextQuestID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExclusiveGroup(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BreadcrumbForQuestId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardMailTemplateID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardMailDelay(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkillID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkillPoints(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredMinRepFaction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredMaxRepFaction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredMinRepValue(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredMaxRepValue(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ProvidedItemCount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpecialFlags(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: quest_template_addonCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_template_addonCreator = {
    ID?: mediumint;
    MaxLevel?: tinyint;
    AllowableClasses?: int;
    SourceSpellID?: mediumint;
    PrevQuestID?: mediumint;
    NextQuestID?: mediumint;
    ExclusiveGroup?: mediumint;
    BreadcrumbForQuestId?: mediumint;
    RewardMailTemplateID?: mediumint;
    RewardMailDelay?: int;
    RequiredSkillID?: smallint;
    RequiredSkillPoints?: smallint;
    RequiredMinRepFaction?: smallint;
    RequiredMaxRepFaction?: smallint;
    RequiredMinRepValue?: mediumint;
    RequiredMaxRepValue?: mediumint;
    ProvidedItemCount?: tinyint;
    SpecialFlags?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_template_addonQuery = {
    ID?: Relation<mediumint>;
    MaxLevel?: Relation<tinyint>;
    AllowableClasses?: Relation<int>;
    SourceSpellID?: Relation<mediumint>;
    PrevQuestID?: Relation<mediumint>;
    NextQuestID?: Relation<mediumint>;
    ExclusiveGroup?: Relation<mediumint>;
    BreadcrumbForQuestId?: Relation<mediumint>;
    RewardMailTemplateID?: Relation<mediumint>;
    RewardMailDelay?: Relation<int>;
    RequiredSkillID?: Relation<smallint>;
    RequiredSkillPoints?: Relation<smallint>;
    RequiredMinRepFaction?: Relation<smallint>;
    RequiredMaxRepFaction?: Relation<smallint>;
    RequiredMinRepValue?: Relation<mediumint>;
    RequiredMaxRepValue?: Relation<mediumint>;
    ProvidedItemCount?: Relation<tinyint>;
    SpecialFlags?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_template_addonTable extends SqlTable<quest_template_addonCreator, quest_template_addonQuery, quest_template_addonRow> {
    add(ID: mediumint, c?: quest_template_addonCreator): quest_template_addonRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_template_addon: quest_template_addonTable;
