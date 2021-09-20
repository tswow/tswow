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
import { Cell } from "wotlkdata/cell/cells/Cell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { MailTemplateRegistry } from "../Mail/MailTemplate";
import { Quest } from "./Quest";

export class QuestRequiredReputation extends CellSystem<Quest> {
    @Transient
    private facCell: Cell<number,any>;
    @Transient
    private repCell: Cell<number,any>;

    constructor(owner: Quest, facCell: Cell<number,any>, repCell: Cell<number,any>) {
        super(owner);
        this.facCell = facCell;
        this.repCell = repCell;
    }

    get Faction() { return this.ownerWrap(this.facCell)}
    get Reputation() { return this.ownerWrap(this.repCell)}

    set(faction: number, reputation: number) {
        this.Faction.set(faction);
        this.Reputation.set(reputation);
        return this.owner;
    }
}

export class QuestRequiredSkill extends CellSystem<Quest> {
    @Transient
    private skillCell: Cell<number,any>;
    @Transient
    private pointsCell: Cell<number,any>;

    constructor(owner: Quest, facCell: Cell<number,any>, repCell: Cell<number,any>) {
        super(owner);
        this.skillCell = facCell;
        this.pointsCell = repCell;
    }

    get Skill() { return this.ownerWrap(this.skillCell)}
    get Points() { return this.ownerWrap(this.pointsCell)}

    set(skill: number, points: number) {
        this.Skill.set(skill);
        this.Points.set(points);
        return this.owner;
    }
}

export class QuestRewardMail extends CellSystem<Quest> {
    @Transient
    private templateCell: Cell<number,any>;
    @Transient
    private delayCell: Cell<number,any>;

    constructor(owner: Quest, templateCell: Cell<number,any>, delayCell: Cell<number,any>) {
        super(owner);
        this.templateCell = templateCell;
        this.delayCell = delayCell;
    }

    get MailTemplate() { return MailTemplateRegistry.ref(this.owner, this.templateCell); }
    get Delay() { return this.ownerWrap(this.delayCell)}

    set(skill: number, points: number) {
        this.templateCell.set(skill);
        this.delayCell.set(points);
        return this.owner;
    }
}