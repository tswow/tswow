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
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { quest_templateRow } from "wotlkdata/sql/types/quest_template";
import { quest_template_addonRow } from "wotlkdata/sql/types/quest_template_addon";
import { QuestGameEventsForward } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RefReadOnly, RefStatic } from "../Refs/Ref";
import { QuestRequiredReputation, QuestRequiredSkill } from "./QuestAddon";
import { QuestFlags } from "./QuestFlags";
import { QuestGameEventCondition } from "./QuestGameEventPoints";
import { QuestNPC } from "./QuestGiver";
import { QuestObjective } from "./QuestObjective";
import { QuestPOIs } from "./QuestPOI";
import { QuestReward } from "./QuestReward";
import { Quests } from "./Quests";
import { QuestText } from "./QuestText";

export class Quest extends MainEntity<quest_templateRow> {
    private _addonRow: quest_template_addonRow|undefined = undefined;

    @Transient
    get addonRow() {
        let addon = this._addonRow
            || SQL.quest_template_addon.find({ID:this.ID})
            || SQL.quest_template_addon.add(this.ID)
            .MaxLevel.set(0)
            .NextQuestID.set(0)
            .PrevQuestID.set(0)
            .ProvidedItemCount.set(0)
            .RequiredMaxRepFaction.set(0)
            .RequiredMaxRepValue.set(0)
            .RequiredMinRepFaction.set(0)
            .RequiredMinRepValue.set(0)
            .RequiredSkillID.set(0)
            .RequiredSkillPoints.set(0)
            .RewardMailDelay.set(0)
            .RewardMailTemplateID.set(0)
            .SourceSpellID.set(0)
            .SpecialFlags.set(0)
            .AllowableClasses.set(0)
            .BreadcrumbForQuestId.set(0)
            .ExclusiveGroup.set(0)
        this._addonRow = addon;
        return addon;
    }

    get SpecialFlags() { return this.wrap(this.addonRow.SpecialFlags); }
    get MaxLevel() { return this.wrap(this.addonRow.MaxLevel); }
    get NextQuestID() { return this.wrap(this.addonRow.NextQuestID); }
    get PrevQuestID() { return this.wrap(this.addonRow.PrevQuestID); }
    get ProvidedItemCount() { return this.wrap(this.addonRow.ProvidedItemCount); }

    get SourceSpellID() { return this.wrap(this.addonRow.SourceSpellID); }
    get AllowableClasses() { return new MaskCell32(this,this.addonRow.AllowableClasses); }
    get BreadcrumbForQuestId() { return this.wrap(this.addonRow.BreadcrumbForQuestId); }
    get ExclusiveGroup() { return this.wrap(this.addonRow.ExclusiveGroup); }

    get RequiredMaxRep() {
        return new QuestRequiredReputation(this
            , this.addonRow.RequiredMaxRepFaction
            , this.addonRow.RequiredMaxRepValue)
    }

    get RequiredMinRep() {
        return new QuestRequiredReputation(this
            , this.addonRow.RequiredMinRepFaction
            , this.addonRow.RequiredMinRepValue)
    }

    get RequiredSKill() {
        return new QuestRequiredSkill(this
            , this.addonRow.RequiredSkillID
            , this.addonRow.RequiredSkillPoints)
    }

    get ID() { return this.row.ID.get(); }
    get Questgiver() { return new QuestNPC(this); }
    get Rewards() { return new QuestReward(this); }
    get Objectives() { return new QuestObjective(this); }
    get Text() { return new QuestText(this); }
    get SortID() { return this.wrap(this.row.QuestSortID); }
    get MinLevel() { return this.wrap(this.row.MinLevel); }
    get QuestLevel() { return this.wrap(this.row.QuestLevel); }
    get StartItem() { return this.wrap(this.row.StartItem); }
    get Flags() { return new QuestFlags(this, this.row.Flags); }
    get POIs() { return new QuestPOIs(this); }
    get GameEvents() { return new QuestGameEventsForward(this); }
    readonly GameEventPoints = new QuestGameEventCondition(this);
}

export class QuestRef<T> extends RefStatic<T,Quest> {
    protected create(mod: string, id: string): Quest {
        return Quests.create(mod,id);
    }
    protected clone(mod: string, id: string): Quest {
        return new Quest(
            SQL.quest_template
                .add(Ids.quest_template.id(mod,id)
            )
        )
    }

    exists(): boolean {
        return this.cell.get() > 0;
    }

    protected id(v: Quest): number {
        return v.ID;
    }

    protected resolve(): Quest {
        return Quests.load(this.cell.get());
    }
}

export class QuestRefReadOnly<T> extends RefReadOnly<T,Quest> {
    getRef(): Quest {
        return Quests.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}