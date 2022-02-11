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
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { quest_templateRow } from "../../sql/quest_template";
import { quest_template_addonRow } from "../../sql/quest_template_addon";
import { QuestGameEventsForward } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { MinMaxTargetCell } from "../Misc/LimitCells";
import { RaceMask } from "../Race/RaceType";
import { QuestAddon } from "./QuestAddon";
import { QuestFlags } from "./QuestFlags";
import { QuestGameEventCondition } from "./QuestGameEventPoints";
import { QuestNPC } from "./QuestGiver";
import { QuestObjective } from "./QuestObjective";
import { QuestPOIs } from "./QuestPOI";
import { QuestReward } from "./QuestReward";
import { Description, LogTitle, ObjectiveDescription, QuestCompletionLog, QuestText, RequestItems, Reward } from "./QuestText";

export class QuestAddonRow extends CellSystem<Quest> {
    protected readonly Addon = new QuestAddon(this.owner);

    get() { return this.Addon.getSQL(); }

    mod(callback: (row: quest_template_addonRow)=>void) {
        callback(this.get());
    }

    exists() { return this.Addon.exists(); }

    static addon(template: Quest) {
        return template.AddonRow.Addon
    }
}

export class Quest extends MainEntity<quest_templateRow> {
    @Transient
    protected get Addon() { return QuestAddonRow.addon(this); }
    @Transient
    readonly AddonRow = new QuestAddonRow(this);

    get Name() { return new LogTitle(this); }
    get PickupText() { return new Description(this); }
    get IncompleteText() { return new RequestItems(this); }
    get CompleteText() { return new Reward(this); }
    get ObjectiveText() { return new ObjectiveDescription(this); }
    get CompleteLogText() { return new QuestCompletionLog(this); }

    get SpecialFlags() { return this.Addon.SpecialFlags; }

    get Level() {
        return new MinMaxTargetCell(
              this
            , this.row.MinLevel
            , this.Addon.MaxLevel
            , this.QuestLevel
        )
    }

    get MaxLevel() { return this.Addon.MaxLevel; }
    get MinLevel() { return this.wrap(this.row.MinLevel); }
    get QuestLevel() { return this.wrap(this.row.QuestLevel); }

    get NextQuest() { return this.Addon.NextQuest }
    get PrevQuest() { return this.Addon.PrevQuest }
    get ProvidedItemCount() { return this.Addon.ProvidedItemCount }
    get SourceSpell() { return this.Addon.SourceSpell }
    get ClassMask() { return this.Addon.ClassMask }
    get BreadcrumbForQuest() { return this.Addon.BreadcrumbForQuest }
    get ExclusiveGroup() { return this.Addon.ExclusiveGroup }
    get RequiredMaxRep() { return this.Addon.MaxReputation; }
    get RequiredMinRep() { return this.Addon.MinReputation; }
    get RequiredSKill() { return this.Addon.RequiredSkill;}

    get ID() { return this.row.ID.get(); }
    get Questgiver() { return new QuestNPC(this); }
    get Rewards() { return new QuestReward(this); }
    get Objectives() { return new QuestObjective(this); }

    /** @deprecated use fields directly on Quest */
    get Text() { return new QuestText(this); }
    get AreaSort() { return this.wrap(this.row.QuestSortID); }
    get StartItem() { return this.wrap(this.row.StartItem); }
    get Flags() {
        return makeMaskCell32(QuestFlags,this, this.row.Flags);
    }
    get POIs() { return new QuestPOIs(this); }
    get GameEvents() { return new QuestGameEventsForward(this); }

    get RaceMask() {
        return makeMaskCell32(RaceMask, this, this.row.AllowableRaces, false);
    }

    readonly GameEventPoints = new QuestGameEventCondition(this);
}