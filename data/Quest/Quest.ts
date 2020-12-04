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
import { quest_templateRow } from "wotlkdata/sql/types/quest_template";
import { MainEntity } from "../Base/MainEntity";
import { QuestNPC } from "./QuestGiver";
import { QuestObjective } from "./QuestObjective";
import { QuestReward } from "./QuestReward";
import { QuestText } from "./QuestText";

export class Quest extends MainEntity<quest_templateRow> {
    get ID() { return this.row.ID.get(); }
    get questgiver() { return new QuestNPC(this); }
    get rewards() { return new QuestReward(this); }
    get objectives() { return new QuestObjective(this); }
    get text() { return new QuestText(this); }
    get SortID() { return this.wrap(this.row.QuestSortID); }
    get MinLevel() { return this.wrap(this.row.MinLevel); }
    get QuestLevel() { return this.wrap(this.row.QuestLevel); }
    get StartItem() { return this.wrap(this.row.StartItem); }
}