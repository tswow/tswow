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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate"

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

export class SkillRequirement extends CellSystem<ItemTemplate> {
    get Skill() {
        return this.owner.row.RequiredSkill;
    }

    get Rank() {
        return this.owner.row.RequiredSkillRank;
    }


    constructor(owner: ItemTemplate) {
        super(owner);
    }

    clear() {
        this.Skill.set(0);
        this.Rank.set(0);
    }
}


export class ItemRequirements extends CellSystem<ItemTemplate> {
    protected row() { return this.owner.sqlRow; }

    get Level() { return this.ownerWrap(this.row().RequiredLevel); }
    get Spell() { return this.ownerWrap(this.row().requiredspell); }
    get HonorRank() { return this.ownerWrap(this.row().requiredhonorrank); }
    get CityRank() { return this.ownerWrap(this.row().RequiredCityRank); }
    get Reputation() { return new ReputationRequirement(this.owner); }
    get Skill() { return new SkillRequirement(this.owner); }

    clearAll() {
        this.CityRank.set(0);
        this.Skill.clear();
        this.Reputation.clear();
        return this.owner;
    }
}