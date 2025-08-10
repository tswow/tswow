import { float, int, mediumint, smallint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class quest_templateRow extends SqlRow<quest_templateCreator, quest_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get QuestType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get QuestLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MinLevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get QuestSortID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get QuestInfoID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SuggestedGroupNum(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredFactionId1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredFactionId2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredFactionValue1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredFactionValue2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardNextQuest(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardXPDifficulty(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardMoney(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardBonusMoney(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardDisplaySpell(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardSpell(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardHonor(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardKillHonor(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get StartItem(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredPlayerKills(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardItem1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardAmount1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardItem2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardAmount2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardItem3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardAmount3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardItem4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardAmount4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDrop1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDropQuantity1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDrop2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDropQuantity2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDrop3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDropQuantity3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDrop4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemDropQuantity4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get POIContinent(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get POIx(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get POIy(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get POIPriority(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardTitle(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardTalents(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardTalentsPermanent(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardArenaPoints(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionID1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionValue1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionOverride1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionID2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionValue2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionOverride2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionID3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionValue3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionOverride3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionID4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionValue4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionOverride4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionID5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionValue5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardFactionOverride5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get TimeAllowed(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AllowableRaces(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get LogTitle(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get LogDescription(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get QuestDescription(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get AreaDescription(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get QuestCompletionLog(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemId1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemId2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemId3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemId4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemId5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemId6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemCount1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemCount2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemCount3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemCount4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemCount5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RequiredItemCount6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Unknown0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ObjectiveText1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get ObjectiveText2(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get ObjectiveText3(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get ObjectiveText4(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: quest_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_templateCreator = {
    ID?: mediumint;
    QuestType?: tinyint;
    QuestLevel?: smallint;
    MinLevel?: tinyint;
    QuestSortID?: smallint;
    QuestInfoID?: smallint;
    SuggestedGroupNum?: tinyint;
    RequiredFactionId1?: smallint;
    RequiredFactionId2?: smallint;
    RequiredFactionValue1?: mediumint;
    RequiredFactionValue2?: mediumint;
    RewardNextQuest?: mediumint;
    RewardXPDifficulty?: tinyint;
    RewardMoney?: int;
    RewardBonusMoney?: int;
    RewardDisplaySpell?: mediumint;
    RewardSpell?: int;
    RewardHonor?: int;
    RewardKillHonor?: float;
    StartItem?: mediumint;
    Flags?: int;
    RequiredPlayerKills?: tinyint;
    RewardItem1?: mediumint;
    RewardAmount1?: smallint;
    RewardItem2?: mediumint;
    RewardAmount2?: smallint;
    RewardItem3?: mediumint;
    RewardAmount3?: smallint;
    RewardItem4?: mediumint;
    RewardAmount4?: smallint;
    ItemDrop1?: mediumint;
    ItemDropQuantity1?: smallint;
    ItemDrop2?: mediumint;
    ItemDropQuantity2?: smallint;
    ItemDrop3?: mediumint;
    ItemDropQuantity3?: smallint;
    ItemDrop4?: mediumint;
    ItemDropQuantity4?: smallint;
    RewardChoiceItemID1?: mediumint;
    RewardChoiceItemQuantity1?: smallint;
    RewardChoiceItemID2?: mediumint;
    RewardChoiceItemQuantity2?: smallint;
    RewardChoiceItemID3?: mediumint;
    RewardChoiceItemQuantity3?: smallint;
    RewardChoiceItemID4?: mediumint;
    RewardChoiceItemQuantity4?: smallint;
    RewardChoiceItemID5?: mediumint;
    RewardChoiceItemQuantity5?: smallint;
    RewardChoiceItemID6?: mediumint;
    RewardChoiceItemQuantity6?: smallint;
    POIContinent?: smallint;
    POIx?: float;
    POIy?: float;
    POIPriority?: mediumint;
    RewardTitle?: tinyint;
    RewardTalents?: tinyint;
    RewardArenaPoints?: smallint;
    RewardFactionID1?: smallint;
    RewardFactionValue1?: mediumint;
    RewardFactionOverride1?: mediumint;
    RewardFactionID2?: smallint;
    RewardFactionValue2?: mediumint;
    RewardFactionOverride2?: mediumint;
    RewardFactionID3?: smallint;
    RewardFactionValue3?: mediumint;
    RewardFactionOverride3?: mediumint;
    RewardFactionID4?: smallint;
    RewardFactionValue4?: mediumint;
    RewardFactionOverride4?: mediumint;
    RewardFactionID5?: smallint;
    RewardFactionValue5?: mediumint;
    RewardFactionOverride5?: mediumint;
    TimeAllowed?: int;
    AllowableRaces?: smallint;
    LogTitle?: text;
    LogDescription?: text;
    QuestDescription?: text;
    AreaDescription?: text;
    QuestCompletionLog?: text;
    RequiredNpcOrGo1?: mediumint;
    RequiredNpcOrGo2?: mediumint;
    RequiredNpcOrGo3?: mediumint;
    RequiredNpcOrGo4?: mediumint;
    RequiredNpcOrGoCount1?: smallint;
    RequiredNpcOrGoCount2?: smallint;
    RequiredNpcOrGoCount3?: smallint;
    RequiredNpcOrGoCount4?: smallint;
    RequiredItemId1?: mediumint;
    RequiredItemId2?: mediumint;
    RequiredItemId3?: mediumint;
    RequiredItemId4?: mediumint;
    RequiredItemId5?: mediumint;
    RequiredItemId6?: mediumint;
    RequiredItemCount1?: smallint;
    RequiredItemCount2?: smallint;
    RequiredItemCount3?: smallint;
    RequiredItemCount4?: smallint;
    RequiredItemCount5?: smallint;
    RequiredItemCount6?: smallint;
    Unknown0?: tinyint;
    ObjectiveText1?: text;
    ObjectiveText2?: text;
    ObjectiveText3?: text;
    ObjectiveText4?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_templateQuery = {
    ID?: Relation<mediumint>;
    QuestType?: Relation<tinyint>;
    QuestLevel?: Relation<smallint>;
    MinLevel?: Relation<tinyint>;
    QuestSortID?: Relation<smallint>;
    QuestInfoID?: Relation<smallint>;
    SuggestedGroupNum?: Relation<tinyint>;
    RequiredFactionId1?: Relation<smallint>;
    RequiredFactionId2?: Relation<smallint>;
    RequiredFactionValue1?: Relation<mediumint>;
    RequiredFactionValue2?: Relation<mediumint>;
    RewardNextQuest?: Relation<mediumint>;
    RewardXPDifficulty?: Relation<tinyint>;
    RewardMoney?: Relation<int>;
    RewardBonusMoney?: Relation<int>;
    RewardDisplaySpell?: Relation<mediumint>;
    RewardSpell?: Relation<int>;
    RewardHonor?: Relation<int>;
    RewardKillHonor?: Relation<float>;
    StartItem?: Relation<mediumint>;
    Flags?: Relation<int>;
    RequiredPlayerKills?: Relation<tinyint>;
    RewardItem1?: Relation<mediumint>;
    RewardAmount1?: Relation<smallint>;
    RewardItem2?: Relation<mediumint>;
    RewardAmount2?: Relation<smallint>;
    RewardItem3?: Relation<mediumint>;
    RewardAmount3?: Relation<smallint>;
    RewardItem4?: Relation<mediumint>;
    RewardAmount4?: Relation<smallint>;
    ItemDrop1?: Relation<mediumint>;
    ItemDropQuantity1?: Relation<smallint>;
    ItemDrop2?: Relation<mediumint>;
    ItemDropQuantity2?: Relation<smallint>;
    ItemDrop3?: Relation<mediumint>;
    ItemDropQuantity3?: Relation<smallint>;
    ItemDrop4?: Relation<mediumint>;
    ItemDropQuantity4?: Relation<smallint>;
    RewardChoiceItemID1?: Relation<mediumint>;
    RewardChoiceItemQuantity1?: Relation<smallint>;
    RewardChoiceItemID2?: Relation<mediumint>;
    RewardChoiceItemQuantity2?: Relation<smallint>;
    RewardChoiceItemID3?: Relation<mediumint>;
    RewardChoiceItemQuantity3?: Relation<smallint>;
    RewardChoiceItemID4?: Relation<mediumint>;
    RewardChoiceItemQuantity4?: Relation<smallint>;
    RewardChoiceItemID5?: Relation<mediumint>;
    RewardChoiceItemQuantity5?: Relation<smallint>;
    RewardChoiceItemID6?: Relation<mediumint>;
    RewardChoiceItemQuantity6?: Relation<smallint>;
    POIContinent?: Relation<smallint>;
    POIx?: Relation<float>;
    POIy?: Relation<float>;
    POIPriority?: Relation<mediumint>;
    RewardTitle?: Relation<tinyint>;
    RewardTalents?: Relation<tinyint>;
    RewardArenaPoints?: Relation<smallint>;
    RewardFactionID1?: Relation<smallint>;
    RewardFactionValue1?: Relation<mediumint>;
    RewardFactionOverride1?: Relation<mediumint>;
    RewardFactionID2?: Relation<smallint>;
    RewardFactionValue2?: Relation<mediumint>;
    RewardFactionOverride2?: Relation<mediumint>;
    RewardFactionID3?: Relation<smallint>;
    RewardFactionValue3?: Relation<mediumint>;
    RewardFactionOverride3?: Relation<mediumint>;
    RewardFactionID4?: Relation<smallint>;
    RewardFactionValue4?: Relation<mediumint>;
    RewardFactionOverride4?: Relation<mediumint>;
    RewardFactionID5?: Relation<smallint>;
    RewardFactionValue5?: Relation<mediumint>;
    RewardFactionOverride5?: Relation<mediumint>;
    TimeAllowed?: Relation<int>;
    AllowableRaces?: Relation<smallint>;
    LogTitle?: Relation<text>;
    LogDescription?: Relation<text>;
    QuestDescription?: Relation<text>;
    AreaDescription?: Relation<text>;
    QuestCompletionLog?: Relation<text>;
    RequiredNpcOrGo1?: Relation<mediumint>;
    RequiredNpcOrGo2?: Relation<mediumint>;
    RequiredNpcOrGo3?: Relation<mediumint>;
    RequiredNpcOrGo4?: Relation<mediumint>;
    RequiredNpcOrGoCount1?: Relation<smallint>;
    RequiredNpcOrGoCount2?: Relation<smallint>;
    RequiredNpcOrGoCount3?: Relation<smallint>;
    RequiredNpcOrGoCount4?: Relation<smallint>;
    RequiredItemId1?: Relation<mediumint>;
    RequiredItemId2?: Relation<mediumint>;
    RequiredItemId3?: Relation<mediumint>;
    RequiredItemId4?: Relation<mediumint>;
    RequiredItemId5?: Relation<mediumint>;
    RequiredItemId6?: Relation<mediumint>;
    RequiredItemCount1?: Relation<smallint>;
    RequiredItemCount2?: Relation<smallint>;
    RequiredItemCount3?: Relation<smallint>;
    RequiredItemCount4?: Relation<smallint>;
    RequiredItemCount5?: Relation<smallint>;
    RequiredItemCount6?: Relation<smallint>;
    Unknown0?: Relation<tinyint>;
    ObjectiveText1?: Relation<text>;
    ObjectiveText2?: Relation<text>;
    ObjectiveText3?: Relation<text>;
    ObjectiveText4?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_templateTable extends SqlTable<quest_templateCreator, quest_templateQuery, quest_templateRow> {
    add(ID: mediumint, c?: quest_templateCreator): quest_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_template: quest_templateTable;
