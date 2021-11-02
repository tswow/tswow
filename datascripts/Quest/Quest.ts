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
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { quest_templateRow } from "wotlkdata/wotlkdata/sql/types/quest_template";
import { QuestGameEventsForward } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { RaceMask } from "../Race/RaceType";
import { QuestAddon } from "./QuestAddon";
import { QuestFlags } from "./QuestFlags";
import { QuestGameEventCondition } from "./QuestGameEventPoints";
import { QuestNPC } from "./QuestGiver";
import { QuestObjective } from "./QuestObjective";
import { QuestPOIs } from "./QuestPOI";
import { QuestReward } from "./QuestReward";
import { QuestText } from "./QuestText";

export class Quest extends MainEntity<quest_templateRow> {
    protected Addon = new QuestAddon(this);

    addonExists() {
        return this.Addon.exists();
    }

    addonRow() {
        return this.Addon.getSQL();
    }

    get SpecialFlags() { return this.Addon.SpecialFlags; }
    get MaxLevel() { return this.Addon.MaxLevel; }
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
    get Text() { return new QuestText(this); }
    get AreaSort() { return this.wrap(this.row.QuestSortID); }
    get MinLevel() { return this.wrap(this.row.MinLevel); }
    get QuestLevel() { return this.wrap(this.row.QuestLevel); }
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