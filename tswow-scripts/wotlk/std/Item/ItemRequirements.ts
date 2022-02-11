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
import { Cell } from "../../../data/cell/cells/Cell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";

export class ReputationRequirement extends CellSystem<ItemTemplate> {
    get Faction() {
        return this.owner.row.RequiredReputationRank;
    };
    get Rank() {
        return this.owner.row.RequiredReputationRank;
    }

    constructor(owner: ItemTemplate) {
        super(owner);
    }

    clear() {
        this.Faction.set(0);
        this.Rank.set(0);
    }
}

export class SkillRequirement<T> extends CellSystem<T> {
    @Transient
    private _skill: Cell<number,any>

    @Transient
    private _rank: Cell<number,any>

    get Skill() {
        return this._skill;
    }

    get Rank() {
        return this._rank;
    }

    constructor(owner: T , skill: Cell<number,any>, rank: Cell<number,any>) {
        super(owner);
        this._skill = skill;
        this._rank = rank;
    }

    set(skill: number, rank: number) {
        this.Skill.set(skill);
        this.Rank.set(rank);
        return this.owner;
    }

    clear() {
        this.Skill.set(0);
        this.Rank.set(0);
        return this.owner;
    }
}


export class ItemRequirements extends CellSystem<ItemTemplate> {
    protected row() { return this.owner.row; }

    get Level() { return this.ownerWrap(this.row().RequiredLevel); }
    get Spell() { return this.ownerWrap(this.row().requiredspell); }
    get HonorRank() { return this.ownerWrap(this.row().requiredhonorrank); }
    get CityRank() { return this.ownerWrap(this.row().RequiredCityRank); }
    get Reputation() { return new ReputationRequirement(this.owner); }
    get Skill() {
        return new SkillRequirement(this.owner, this.owner.row.RequiredSkill, this.owner.row.RequiredSkillRank);
    }

    clearAll() {
        this.CityRank.set(0);
        this.Skill.clear();
        this.Reputation.clear();
        return this.owner;
    }
}