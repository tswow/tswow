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
import { float, int, mediumint, smallint, text, tinyint } from '../../primitives'
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
export class quest_templateRow extends SqlRow<quest_templateCreator,quest_templateQuery> {
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
    get QuestType() {return new SQLCell<tinyint, this>(this, 'QuestType')}

    /**
     * No comment (yet!)
     */
    get QuestLevel() {return new SQLCell<smallint, this>(this, 'QuestLevel')}

    /**
     * No comment (yet!)
     */
    get MinLevel() {return new SQLCell<tinyint, this>(this, 'MinLevel')}

    /**
     * No comment (yet!)
     */
    get QuestSortID() {return new SQLCell<smallint, this>(this, 'QuestSortID')}

    /**
     * No comment (yet!)
     */
    get QuestInfoID() {return new SQLCell<smallint, this>(this, 'QuestInfoID')}

    /**
     * No comment (yet!)
     */
    get SuggestedGroupNum() {return new SQLCell<tinyint, this>(this, 'SuggestedGroupNum')}

    /**
     * No comment (yet!)
     */
    get RequiredFactionId1() {return new SQLCell<smallint, this>(this, 'RequiredFactionId1')}

    /**
     * No comment (yet!)
     */
    get RequiredFactionId2() {return new SQLCell<smallint, this>(this, 'RequiredFactionId2')}

    /**
     * No comment (yet!)
     */
    get RequiredFactionValue1() {return new SQLCell<mediumint, this>(this, 'RequiredFactionValue1')}

    /**
     * No comment (yet!)
     */
    get RequiredFactionValue2() {return new SQLCell<mediumint, this>(this, 'RequiredFactionValue2')}

    /**
     * No comment (yet!)
     */
    get RewardNextQuest() {return new SQLCell<mediumint, this>(this, 'RewardNextQuest')}

    /**
     * No comment (yet!)
     */
    get RewardXPDifficulty() {return new SQLCell<tinyint, this>(this, 'RewardXPDifficulty')}

    /**
     * No comment (yet!)
     */
    get RewardMoney() {return new SQLCell<int, this>(this, 'RewardMoney')}

    /**
     * No comment (yet!)
     */
    get RewardBonusMoney() {return new SQLCell<int, this>(this, 'RewardBonusMoney')}

    /**
     * No comment (yet!)
     */
    get RewardDisplaySpell() {return new SQLCell<mediumint, this>(this, 'RewardDisplaySpell')}

    /**
     * No comment (yet!)
     */
    get RewardSpell() {return new SQLCell<int, this>(this, 'RewardSpell')}

    /**
     * No comment (yet!)
     */
    get RewardHonor() {return new SQLCell<int, this>(this, 'RewardHonor')}

    /**
     * No comment (yet!)
     */
    get RewardKillHonor() {return new SQLCell<float, this>(this, 'RewardKillHonor')}

    /**
     * No comment (yet!)
     */
    get StartItem() {return new SQLCell<mediumint, this>(this, 'StartItem')}

    /**
     * No comment (yet!)
     */
    get Flags() {return new SQLCell<int, this>(this, 'Flags')}

    /**
     * No comment (yet!)
     */
    get RequiredPlayerKills() {return new SQLCell<tinyint, this>(this, 'RequiredPlayerKills')}

    /**
     * No comment (yet!)
     */
    get RewardItem1() {return new SQLCell<mediumint, this>(this, 'RewardItem1')}

    /**
     * No comment (yet!)
     */
    get RewardAmount1() {return new SQLCell<smallint, this>(this, 'RewardAmount1')}

    /**
     * No comment (yet!)
     */
    get RewardItem2() {return new SQLCell<mediumint, this>(this, 'RewardItem2')}

    /**
     * No comment (yet!)
     */
    get RewardAmount2() {return new SQLCell<smallint, this>(this, 'RewardAmount2')}

    /**
     * No comment (yet!)
     */
    get RewardItem3() {return new SQLCell<mediumint, this>(this, 'RewardItem3')}

    /**
     * No comment (yet!)
     */
    get RewardAmount3() {return new SQLCell<smallint, this>(this, 'RewardAmount3')}

    /**
     * No comment (yet!)
     */
    get RewardItem4() {return new SQLCell<mediumint, this>(this, 'RewardItem4')}

    /**
     * No comment (yet!)
     */
    get RewardAmount4() {return new SQLCell<smallint, this>(this, 'RewardAmount4')}

    /**
     * No comment (yet!)
     */
    get ItemDrop1() {return new SQLCell<mediumint, this>(this, 'ItemDrop1')}

    /**
     * No comment (yet!)
     */
    get ItemDropQuantity1() {return new SQLCell<smallint, this>(this, 'ItemDropQuantity1')}

    /**
     * No comment (yet!)
     */
    get ItemDrop2() {return new SQLCell<mediumint, this>(this, 'ItemDrop2')}

    /**
     * No comment (yet!)
     */
    get ItemDropQuantity2() {return new SQLCell<smallint, this>(this, 'ItemDropQuantity2')}

    /**
     * No comment (yet!)
     */
    get ItemDrop3() {return new SQLCell<mediumint, this>(this, 'ItemDrop3')}

    /**
     * No comment (yet!)
     */
    get ItemDropQuantity3() {return new SQLCell<smallint, this>(this, 'ItemDropQuantity3')}

    /**
     * No comment (yet!)
     */
    get ItemDrop4() {return new SQLCell<mediumint, this>(this, 'ItemDrop4')}

    /**
     * No comment (yet!)
     */
    get ItemDropQuantity4() {return new SQLCell<smallint, this>(this, 'ItemDropQuantity4')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID1() {return new SQLCell<mediumint, this>(this, 'RewardChoiceItemID1')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity1() {return new SQLCell<smallint, this>(this, 'RewardChoiceItemQuantity1')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID2() {return new SQLCell<mediumint, this>(this, 'RewardChoiceItemID2')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity2() {return new SQLCell<smallint, this>(this, 'RewardChoiceItemQuantity2')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID3() {return new SQLCell<mediumint, this>(this, 'RewardChoiceItemID3')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity3() {return new SQLCell<smallint, this>(this, 'RewardChoiceItemQuantity3')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID4() {return new SQLCell<mediumint, this>(this, 'RewardChoiceItemID4')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity4() {return new SQLCell<smallint, this>(this, 'RewardChoiceItemQuantity4')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID5() {return new SQLCell<mediumint, this>(this, 'RewardChoiceItemID5')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity5() {return new SQLCell<smallint, this>(this, 'RewardChoiceItemQuantity5')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemID6() {return new SQLCell<mediumint, this>(this, 'RewardChoiceItemID6')}

    /**
     * No comment (yet!)
     */
    get RewardChoiceItemQuantity6() {return new SQLCell<smallint, this>(this, 'RewardChoiceItemQuantity6')}

    /**
     * No comment (yet!)
     */
    get POIContinent() {return new SQLCell<smallint, this>(this, 'POIContinent')}

    /**
     * No comment (yet!)
     */
    get POIx() {return new SQLCell<float, this>(this, 'POIx')}

    /**
     * No comment (yet!)
     */
    get POIy() {return new SQLCell<float, this>(this, 'POIy')}

    /**
     * No comment (yet!)
     */
    get POIPriority() {return new SQLCell<mediumint, this>(this, 'POIPriority')}

    /**
     * No comment (yet!)
     */
    get RewardTitle() {return new SQLCell<tinyint, this>(this, 'RewardTitle')}

    /**
     * No comment (yet!)
     */
    get RewardTalents() {return new SQLCell<tinyint, this>(this, 'RewardTalents')}

    /**
     * No comment (yet!)
     */
    get RewardArenaPoints() {return new SQLCell<smallint, this>(this, 'RewardArenaPoints')}

    /**
     * No comment (yet!)
     */
    get RewardFactionID1() {return new SQLCell<smallint, this>(this, 'RewardFactionID1')}

    /**
     * No comment (yet!)
     */
    get RewardFactionValue1() {return new SQLCell<mediumint, this>(this, 'RewardFactionValue1')}

    /**
     * No comment (yet!)
     */
    get RewardFactionOverride1() {return new SQLCell<mediumint, this>(this, 'RewardFactionOverride1')}

    /**
     * No comment (yet!)
     */
    get RewardFactionID2() {return new SQLCell<smallint, this>(this, 'RewardFactionID2')}

    /**
     * No comment (yet!)
     */
    get RewardFactionValue2() {return new SQLCell<mediumint, this>(this, 'RewardFactionValue2')}

    /**
     * No comment (yet!)
     */
    get RewardFactionOverride2() {return new SQLCell<mediumint, this>(this, 'RewardFactionOverride2')}

    /**
     * No comment (yet!)
     */
    get RewardFactionID3() {return new SQLCell<smallint, this>(this, 'RewardFactionID3')}

    /**
     * No comment (yet!)
     */
    get RewardFactionValue3() {return new SQLCell<mediumint, this>(this, 'RewardFactionValue3')}

    /**
     * No comment (yet!)
     */
    get RewardFactionOverride3() {return new SQLCell<mediumint, this>(this, 'RewardFactionOverride3')}

    /**
     * No comment (yet!)
     */
    get RewardFactionID4() {return new SQLCell<smallint, this>(this, 'RewardFactionID4')}

    /**
     * No comment (yet!)
     */
    get RewardFactionValue4() {return new SQLCell<mediumint, this>(this, 'RewardFactionValue4')}

    /**
     * No comment (yet!)
     */
    get RewardFactionOverride4() {return new SQLCell<mediumint, this>(this, 'RewardFactionOverride4')}

    /**
     * No comment (yet!)
     */
    get RewardFactionID5() {return new SQLCell<smallint, this>(this, 'RewardFactionID5')}

    /**
     * No comment (yet!)
     */
    get RewardFactionValue5() {return new SQLCell<mediumint, this>(this, 'RewardFactionValue5')}

    /**
     * No comment (yet!)
     */
    get RewardFactionOverride5() {return new SQLCell<mediumint, this>(this, 'RewardFactionOverride5')}

    /**
     * No comment (yet!)
     */
    get TimeAllowed() {return new SQLCell<int, this>(this, 'TimeAllowed')}

    /**
     * No comment (yet!)
     */
    get AllowableRaces() {return new SQLCell<smallint, this>(this, 'AllowableRaces')}

    /**
     * No comment (yet!)
     */
    get LogTitle() {return new SQLCell<text, this>(this, 'LogTitle')}

    /**
     * No comment (yet!)
     */
    get LogDescription() {return new SQLCell<text, this>(this, 'LogDescription')}

    /**
     * No comment (yet!)
     */
    get QuestDescription() {return new SQLCell<text, this>(this, 'QuestDescription')}

    /**
     * No comment (yet!)
     */
    get AreaDescription() {return new SQLCell<text, this>(this, 'AreaDescription')}

    /**
     * No comment (yet!)
     */
    get QuestCompletionLog() {return new SQLCell<text, this>(this, 'QuestCompletionLog')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo1() {return new SQLCell<mediumint, this>(this, 'RequiredNpcOrGo1')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo2() {return new SQLCell<mediumint, this>(this, 'RequiredNpcOrGo2')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo3() {return new SQLCell<mediumint, this>(this, 'RequiredNpcOrGo3')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGo4() {return new SQLCell<mediumint, this>(this, 'RequiredNpcOrGo4')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount1() {return new SQLCell<smallint, this>(this, 'RequiredNpcOrGoCount1')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount2() {return new SQLCell<smallint, this>(this, 'RequiredNpcOrGoCount2')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount3() {return new SQLCell<smallint, this>(this, 'RequiredNpcOrGoCount3')}

    /**
     * No comment (yet!)
     */
    get RequiredNpcOrGoCount4() {return new SQLCell<smallint, this>(this, 'RequiredNpcOrGoCount4')}

    /**
     * No comment (yet!)
     */
    get RequiredItemId1() {return new SQLCell<mediumint, this>(this, 'RequiredItemId1')}

    /**
     * No comment (yet!)
     */
    get RequiredItemId2() {return new SQLCell<mediumint, this>(this, 'RequiredItemId2')}

    /**
     * No comment (yet!)
     */
    get RequiredItemId3() {return new SQLCell<mediumint, this>(this, 'RequiredItemId3')}

    /**
     * No comment (yet!)
     */
    get RequiredItemId4() {return new SQLCell<mediumint, this>(this, 'RequiredItemId4')}

    /**
     * No comment (yet!)
     */
    get RequiredItemId5() {return new SQLCell<mediumint, this>(this, 'RequiredItemId5')}

    /**
     * No comment (yet!)
     */
    get RequiredItemId6() {return new SQLCell<mediumint, this>(this, 'RequiredItemId6')}

    /**
     * No comment (yet!)
     */
    get RequiredItemCount1() {return new SQLCell<smallint, this>(this, 'RequiredItemCount1')}

    /**
     * No comment (yet!)
     */
    get RequiredItemCount2() {return new SQLCell<smallint, this>(this, 'RequiredItemCount2')}

    /**
     * No comment (yet!)
     */
    get RequiredItemCount3() {return new SQLCell<smallint, this>(this, 'RequiredItemCount3')}

    /**
     * No comment (yet!)
     */
    get RequiredItemCount4() {return new SQLCell<smallint, this>(this, 'RequiredItemCount4')}

    /**
     * No comment (yet!)
     */
    get RequiredItemCount5() {return new SQLCell<smallint, this>(this, 'RequiredItemCount5')}

    /**
     * No comment (yet!)
     */
    get RequiredItemCount6() {return new SQLCell<smallint, this>(this, 'RequiredItemCount6')}

    /**
     * No comment (yet!)
     */
    get Unknown0() {return new SQLCell<tinyint, this>(this, 'Unknown0')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText1() {return new SQLCell<text, this>(this, 'ObjectiveText1')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText2() {return new SQLCell<text, this>(this, 'ObjectiveText2')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText3() {return new SQLCell<text, this>(this, 'ObjectiveText3')}

    /**
     * No comment (yet!)
     */
    get ObjectiveText4() {return new SQLCell<text, this>(this, 'ObjectiveText4')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : quest_templateCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_templateCreator = {
    ID? : mediumint,
    QuestType? : tinyint,
    QuestLevel? : smallint,
    MinLevel? : tinyint,
    QuestSortID? : smallint,
    QuestInfoID? : smallint,
    SuggestedGroupNum? : tinyint,
    RequiredFactionId1? : smallint,
    RequiredFactionId2? : smallint,
    RequiredFactionValue1? : mediumint,
    RequiredFactionValue2? : mediumint,
    RewardNextQuest? : mediumint,
    RewardXPDifficulty? : tinyint,
    RewardMoney? : int,
    RewardBonusMoney? : int,
    RewardDisplaySpell? : mediumint,
    RewardSpell? : int,
    RewardHonor? : int,
    RewardKillHonor? : float,
    StartItem? : mediumint,
    Flags? : int,
    RequiredPlayerKills? : tinyint,
    RewardItem1? : mediumint,
    RewardAmount1? : smallint,
    RewardItem2? : mediumint,
    RewardAmount2? : smallint,
    RewardItem3? : mediumint,
    RewardAmount3? : smallint,
    RewardItem4? : mediumint,
    RewardAmount4? : smallint,
    ItemDrop1? : mediumint,
    ItemDropQuantity1? : smallint,
    ItemDrop2? : mediumint,
    ItemDropQuantity2? : smallint,
    ItemDrop3? : mediumint,
    ItemDropQuantity3? : smallint,
    ItemDrop4? : mediumint,
    ItemDropQuantity4? : smallint,
    RewardChoiceItemID1? : mediumint,
    RewardChoiceItemQuantity1? : smallint,
    RewardChoiceItemID2? : mediumint,
    RewardChoiceItemQuantity2? : smallint,
    RewardChoiceItemID3? : mediumint,
    RewardChoiceItemQuantity3? : smallint,
    RewardChoiceItemID4? : mediumint,
    RewardChoiceItemQuantity4? : smallint,
    RewardChoiceItemID5? : mediumint,
    RewardChoiceItemQuantity5? : smallint,
    RewardChoiceItemID6? : mediumint,
    RewardChoiceItemQuantity6? : smallint,
    POIContinent? : smallint,
    POIx? : float,
    POIy? : float,
    POIPriority? : mediumint,
    RewardTitle? : tinyint,
    RewardTalents? : tinyint,
    RewardArenaPoints? : smallint,
    RewardFactionID1? : smallint,
    RewardFactionValue1? : mediumint,
    RewardFactionOverride1? : mediumint,
    RewardFactionID2? : smallint,
    RewardFactionValue2? : mediumint,
    RewardFactionOverride2? : mediumint,
    RewardFactionID3? : smallint,
    RewardFactionValue3? : mediumint,
    RewardFactionOverride3? : mediumint,
    RewardFactionID4? : smallint,
    RewardFactionValue4? : mediumint,
    RewardFactionOverride4? : mediumint,
    RewardFactionID5? : smallint,
    RewardFactionValue5? : mediumint,
    RewardFactionOverride5? : mediumint,
    TimeAllowed? : int,
    AllowableRaces? : smallint,
    LogTitle? : text,
    LogDescription? : text,
    QuestDescription? : text,
    AreaDescription? : text,
    QuestCompletionLog? : text,
    RequiredNpcOrGo1? : mediumint,
    RequiredNpcOrGo2? : mediumint,
    RequiredNpcOrGo3? : mediumint,
    RequiredNpcOrGo4? : mediumint,
    RequiredNpcOrGoCount1? : smallint,
    RequiredNpcOrGoCount2? : smallint,
    RequiredNpcOrGoCount3? : smallint,
    RequiredNpcOrGoCount4? : smallint,
    RequiredItemId1? : mediumint,
    RequiredItemId2? : mediumint,
    RequiredItemId3? : mediumint,
    RequiredItemId4? : mediumint,
    RequiredItemId5? : mediumint,
    RequiredItemId6? : mediumint,
    RequiredItemCount1? : smallint,
    RequiredItemCount2? : smallint,
    RequiredItemCount3? : smallint,
    RequiredItemCount4? : smallint,
    RequiredItemCount5? : smallint,
    RequiredItemCount6? : smallint,
    Unknown0? : tinyint,
    ObjectiveText1? : text,
    ObjectiveText2? : text,
    ObjectiveText3? : text,
    ObjectiveText4? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_templateQuery = {
    ID? : Relation<mediumint>,
    QuestType? : Relation<tinyint>,
    QuestLevel? : Relation<smallint>,
    MinLevel? : Relation<tinyint>,
    QuestSortID? : Relation<smallint>,
    QuestInfoID? : Relation<smallint>,
    SuggestedGroupNum? : Relation<tinyint>,
    RequiredFactionId1? : Relation<smallint>,
    RequiredFactionId2? : Relation<smallint>,
    RequiredFactionValue1? : Relation<mediumint>,
    RequiredFactionValue2? : Relation<mediumint>,
    RewardNextQuest? : Relation<mediumint>,
    RewardXPDifficulty? : Relation<tinyint>,
    RewardMoney? : Relation<int>,
    RewardBonusMoney? : Relation<int>,
    RewardDisplaySpell? : Relation<mediumint>,
    RewardSpell? : Relation<int>,
    RewardHonor? : Relation<int>,
    RewardKillHonor? : Relation<float>,
    StartItem? : Relation<mediumint>,
    Flags? : Relation<int>,
    RequiredPlayerKills? : Relation<tinyint>,
    RewardItem1? : Relation<mediumint>,
    RewardAmount1? : Relation<smallint>,
    RewardItem2? : Relation<mediumint>,
    RewardAmount2? : Relation<smallint>,
    RewardItem3? : Relation<mediumint>,
    RewardAmount3? : Relation<smallint>,
    RewardItem4? : Relation<mediumint>,
    RewardAmount4? : Relation<smallint>,
    ItemDrop1? : Relation<mediumint>,
    ItemDropQuantity1? : Relation<smallint>,
    ItemDrop2? : Relation<mediumint>,
    ItemDropQuantity2? : Relation<smallint>,
    ItemDrop3? : Relation<mediumint>,
    ItemDropQuantity3? : Relation<smallint>,
    ItemDrop4? : Relation<mediumint>,
    ItemDropQuantity4? : Relation<smallint>,
    RewardChoiceItemID1? : Relation<mediumint>,
    RewardChoiceItemQuantity1? : Relation<smallint>,
    RewardChoiceItemID2? : Relation<mediumint>,
    RewardChoiceItemQuantity2? : Relation<smallint>,
    RewardChoiceItemID3? : Relation<mediumint>,
    RewardChoiceItemQuantity3? : Relation<smallint>,
    RewardChoiceItemID4? : Relation<mediumint>,
    RewardChoiceItemQuantity4? : Relation<smallint>,
    RewardChoiceItemID5? : Relation<mediumint>,
    RewardChoiceItemQuantity5? : Relation<smallint>,
    RewardChoiceItemID6? : Relation<mediumint>,
    RewardChoiceItemQuantity6? : Relation<smallint>,
    POIContinent? : Relation<smallint>,
    POIx? : Relation<float>,
    POIy? : Relation<float>,
    POIPriority? : Relation<mediumint>,
    RewardTitle? : Relation<tinyint>,
    RewardTalents? : Relation<tinyint>,
    RewardArenaPoints? : Relation<smallint>,
    RewardFactionID1? : Relation<smallint>,
    RewardFactionValue1? : Relation<mediumint>,
    RewardFactionOverride1? : Relation<mediumint>,
    RewardFactionID2? : Relation<smallint>,
    RewardFactionValue2? : Relation<mediumint>,
    RewardFactionOverride2? : Relation<mediumint>,
    RewardFactionID3? : Relation<smallint>,
    RewardFactionValue3? : Relation<mediumint>,
    RewardFactionOverride3? : Relation<mediumint>,
    RewardFactionID4? : Relation<smallint>,
    RewardFactionValue4? : Relation<mediumint>,
    RewardFactionOverride4? : Relation<mediumint>,
    RewardFactionID5? : Relation<smallint>,
    RewardFactionValue5? : Relation<mediumint>,
    RewardFactionOverride5? : Relation<mediumint>,
    TimeAllowed? : Relation<int>,
    AllowableRaces? : Relation<smallint>,
    LogTitle? : Relation<text>,
    LogDescription? : Relation<text>,
    QuestDescription? : Relation<text>,
    AreaDescription? : Relation<text>,
    QuestCompletionLog? : Relation<text>,
    RequiredNpcOrGo1? : Relation<mediumint>,
    RequiredNpcOrGo2? : Relation<mediumint>,
    RequiredNpcOrGo3? : Relation<mediumint>,
    RequiredNpcOrGo4? : Relation<mediumint>,
    RequiredNpcOrGoCount1? : Relation<smallint>,
    RequiredNpcOrGoCount2? : Relation<smallint>,
    RequiredNpcOrGoCount3? : Relation<smallint>,
    RequiredNpcOrGoCount4? : Relation<smallint>,
    RequiredItemId1? : Relation<mediumint>,
    RequiredItemId2? : Relation<mediumint>,
    RequiredItemId3? : Relation<mediumint>,
    RequiredItemId4? : Relation<mediumint>,
    RequiredItemId5? : Relation<mediumint>,
    RequiredItemId6? : Relation<mediumint>,
    RequiredItemCount1? : Relation<smallint>,
    RequiredItemCount2? : Relation<smallint>,
    RequiredItemCount3? : Relation<smallint>,
    RequiredItemCount4? : Relation<smallint>,
    RequiredItemCount5? : Relation<smallint>,
    RequiredItemCount6? : Relation<smallint>,
    Unknown0? : Relation<tinyint>,
    ObjectiveText1? : Relation<text>,
    ObjectiveText2? : Relation<text>,
    ObjectiveText3? : Relation<text>,
    ObjectiveText4? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_templateTable extends SqlTable<
    quest_templateCreator,
    quest_templateQuery,
    quest_templateRow> {
    add(ID : mediumint, c? : quest_templateCreator) : quest_templateRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_template = new quest_templateTable(
    'quest_template',
    (table, obj)=>new quest_templateRow(table, obj))