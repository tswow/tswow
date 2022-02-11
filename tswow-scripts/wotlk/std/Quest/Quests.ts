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
import { SQL } from "../../SQLFiles";
import { quest_templateQuery, quest_templateRow } from "../../sql/quest_template";
import { Table } from "../../../data/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { Quest } from "./Quest";

export class QuestRegistryClass extends RegistryStatic<Quest,quest_templateRow,quest_templateQuery> {
    protected Clone(mod: string, name: string, r: Quest, parent: Quest): void {
        if(parent.AddonRow.exists()) {
            parent.AddonRow.get().clone(r.ID);
        }
    }
    protected Table(): Table<any, quest_templateQuery, quest_templateRow> & { add: (id: number) => quest_templateRow; } {
        return SQL.quest_template
    }
    protected IDs(): StaticIDGenerator {
        return Ids.quest_template
    }
    protected Entity(r: quest_templateRow): Quest {
        return new Quest(r);
    }
    protected FindByID(id: number): quest_templateRow {
        return SQL.quest_template.query({ID:id});
    }
    protected EmptyQuery(): quest_templateQuery {
        return {}
    }
    ID(e: Quest): number {
        return e.ID;
    }
    Clear(r: Quest) {
        r.row.AllowableRaces.set(0)
             .AreaDescription.set("")
             .Flags.set(0)
             .ItemDrop1.set(0)
             .ItemDrop2.set(0)
             .ItemDrop3.set(0)
             .ItemDrop4.set(0)
             .ItemDropQuantity1.set(0)
             .ItemDropQuantity2.set(0)
             .ItemDropQuantity3.set(0)
             .ItemDropQuantity4.set(0)
             .LogDescription.set('')
             .LogTitle.set('')
             .MinLevel.set(0)
             .ObjectiveText1.set('')
             .ObjectiveText2.set('')
             .ObjectiveText3.set('')
             .ObjectiveText4.set('')
             .POIContinent.set(0)
             .POIPriority.set(0)
             .POIx.set(0)
             .POIy.set(0)
             .QuestCompletionLog.set('')
             .QuestDescription.set('')
             .QuestInfoID.set(0)
             .QuestLevel.set(0)
             .QuestSortID.set(0)
             .QuestType.set(2)
             .RequiredFactionId1.set(0)
             .RequiredFactionId2.set(0)
             .RequiredFactionValue1.set(0)
             .RequiredFactionValue2.set(0)
             .RequiredItemCount1.set(0)
             .RequiredItemCount2.set(0)
             .RequiredItemCount3.set(0)
             .RequiredItemCount4.set(0)
             .RequiredItemCount5.set(0)
             .RequiredItemCount6.set(0)
             .RequiredItemId1.set(0)
             .RequiredItemId2.set(0)
             .RequiredItemId3.set(0)
             .RequiredItemId4.set(0)
             .RequiredItemId5.set(0)
             .RequiredItemId6.set(0)
             .RequiredNpcOrGo1.set(0)
             .RequiredNpcOrGo2.set(0)
             .RequiredNpcOrGo3.set(0)
             .RequiredNpcOrGo4.set(0)
             .RequiredNpcOrGoCount1.set(0)
             .RequiredNpcOrGoCount2.set(0)
             .RequiredNpcOrGoCount3.set(0)
             .RequiredNpcOrGoCount4.set(0)
             .RequiredPlayerKills.set(0)
             .RewardAmount1.set(0)
             .RewardAmount2.set(0)
             .RewardAmount3.set(0)
             .RewardAmount4.set(0)
             .RewardArenaPoints.set(0)
             .RewardBonusMoney.set(0)
             .RewardBonusMoney.set(0)
             .RewardChoiceItemID1.set(0)
             .RewardChoiceItemID2.set(0)
             .RewardChoiceItemID3.set(0)
             .RewardChoiceItemID4.set(0)
             .RewardChoiceItemID5.set(0)
             .RewardChoiceItemID6.set(0)
             .RewardChoiceItemQuantity1.set(0)
             .RewardChoiceItemQuantity2.set(0)
             .RewardChoiceItemQuantity3.set(0)
             .RewardChoiceItemQuantity4.set(0)
             .RewardChoiceItemQuantity5.set(0)
             .RewardChoiceItemQuantity6.set(0)
             .RewardDisplaySpell.set(0)
             .RewardFactionID1.set(0)
             .RewardFactionID2.set(0)
             .RewardFactionID3.set(0)
             .RewardFactionID4.set(0)
             .RewardFactionID5.set(0)
             .RewardFactionOverride1.set(0)
             .RewardFactionOverride2.set(0)
             .RewardFactionOverride3.set(0)
             .RewardFactionOverride4.set(0)
             .RewardFactionOverride5.set(0)
             .RewardFactionValue1.set(0)
             .RewardFactionValue2.set(0)
             .RewardFactionValue3.set(0)
             .RewardFactionValue4.set(0)
             .RewardFactionValue5.set(0)
             .RewardHonor.set(0)
             .RewardItem1.set(0)
             .RewardItem2.set(0)
             .RewardItem3.set(0)
             .RewardItem4.set(0)
             .RewardKillHonor.set(0)
             .RewardMoney.set(0)
             .RewardNextQuest.set(0)
             .RewardSpell.set(0)
             .RewardTalents.set(0)
             .RewardTitle.set(0)
             .RewardXPDifficulty.set(0)
             .StartItem.set(0)
             .SuggestedGroupNum.set(0)
             .TimeAllowed.set(0)
             .Unknown0.set(0)
             .VerifiedBuild.set(101)
    }
}

export const QuestRegistry = new QuestRegistryClass();