/*
 * This file is part of tswow (https://github.com/tswow)
 *
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
import { SQL } from "wotlkdata/sql/SQLFiles";
import { quest_templateQuery } from "wotlkdata/sql/types/quest_template";
import { Ids } from "../Misc/Ids";
import { Quest } from "./Quest";

export const Quests = {
    create(mod : string, id : string) {
        const genid = Ids.quest_template.id(mod,id);
        const row = SQL.quest_template.add(genid,{
            AllowableRaces:0,
            AreaDescription: "",
            Flags: 0,
            ItemDrop1: 0,
            ItemDrop2: 0,
            ItemDrop3: 0,
            ItemDrop4: 0,
            ItemDropQuantity1: 0,
            ItemDropQuantity2: 0,
            ItemDropQuantity3: 0,
            ItemDropQuantity4: 0,
            LogDescription: "Placeholder Description",
            LogTitle: "Placeholder Title",
            MinLevel: 0,
            ObjectiveText1: "",
            ObjectiveText2: "",
            ObjectiveText3: "",
            ObjectiveText4: "",
            POIContinent: 0,
            POIPriority: 0,
            POIx: 0,
            POIy: 0,
            QuestCompletionLog: "",
            QuestDescription: "",
            QuestInfoID: 0,
            QuestLevel: 0,
            QuestSortID: 0,
            QuestType: 2,
            RequiredFactionId1: 0,
            RequiredFactionId2: 0,
            RequiredFactionValue1: 0,
            RequiredFactionValue2: 0,
            RequiredItemCount1: 0,
            RequiredItemCount2: 0,
            RequiredItemCount3: 0,
            RequiredItemCount4: 0,
            RequiredItemCount5: 0,
            RequiredItemCount6: 0,
            RequiredItemId1: 0,
            RequiredItemId2: 0,
            RequiredItemId3: 0,
            RequiredItemId4: 0,
            RequiredItemId5: 0,
            RequiredItemId6: 0,
            RequiredNpcOrGo1: 0,
            RequiredNpcOrGo2: 0,
            RequiredNpcOrGo3: 0,
            RequiredNpcOrGo4: 0,
            RequiredNpcOrGoCount1: 0,
            RequiredNpcOrGoCount2: 0,
            RequiredNpcOrGoCount3: 0,
            RequiredNpcOrGoCount4: 0,
            RequiredPlayerKills: 0,
            RewardAmount1: 0,
            RewardAmount2: 0,
            RewardAmount3: 0,
            RewardAmount4: 0,
            RewardArenaPoints: 0,
            RewardBonusMoney: 0,
            RewardChoiceItemID1: 0,
            RewardChoiceItemID2: 0,
            RewardChoiceItemID3: 0,
            RewardChoiceItemID4: 0,
            RewardChoiceItemID5: 0,
            RewardChoiceItemID6: 0,
            RewardChoiceItemQuantity1: 0,
            RewardChoiceItemQuantity2: 0,
            RewardChoiceItemQuantity3: 0,
            RewardChoiceItemQuantity4: 0,
            RewardChoiceItemQuantity5: 0,
            RewardChoiceItemQuantity6: 0,
            RewardDisplaySpell: 0,
            RewardFactionID1: 0,
            RewardFactionID2: 0,
            RewardFactionID3: 0,
            RewardFactionID4: 0,
            RewardFactionID5: 0,
            RewardFactionOverride1: 0,
            RewardFactionOverride2: 0,
            RewardFactionOverride3: 0,
            RewardFactionOverride4: 0,
            RewardFactionOverride5: 0,
            RewardFactionValue1: 0,
            RewardFactionValue2: 0,
            RewardFactionValue3: 0,
            RewardFactionValue4: 0,
            RewardFactionValue5: 0,
            RewardHonor: 0,
            RewardItem1: 0,
            RewardItem2: 0,
            RewardItem3: 0,
            RewardItem4: 0,
            RewardKillHonor: 0,
            RewardMoney: 0,
            RewardNextQuest: 0,
            RewardSpell: 0,
            RewardTalents: 0,
            RewardTitle :0,
            RewardXPDifficulty: 0,
            StartItem: 0,
            SuggestedGroupNum: 0,
            TimeAllowed: 0,
            Unknown0: 0,
            VerifiedBuild: 101,
        });
        return new Quest(row);
    },

    load(id: number) {
        return new Quest(SQL.quest_template.find({ID:id}))
    },

    filter(query: quest_templateQuery) {
        return SQL.quest_template.filter(query).map(x=>new Quest(x));
    },
}