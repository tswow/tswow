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
import { Cell } from "wotlkdata/cell/Cell";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { Talent } from "./Talent";

export class TalentRankWrap extends Cell<number, Talent> {
    protected index: number;

    constructor(owner: Talent, index: number) {
        super(owner);
        this.index = index;
    }

    get(): number {
        return this.owner.row.PrereqRank.getIndex(this.index);
    }

    set(value: number): Talent {
        this.owner.row.PrereqRank.setIndex(this.index,value>0?value-1:0);
        return this.owner;
    }
}

export class TalentRequirement extends ArrayEntry<Talent> {

    clear(): Talent {
        this.owner.row.PrereqTalent.setIndex(this.index, 0);
        this.owner.row.PrereqRank.setIndex(this.index, 0);
        return this.owner;
    }

    isClear(): boolean {
        return this.owner.row.PrereqTalent.getIndex(this.index) === 0;
    }

    get Talent() { return this.ownerWrapIndex(this.owner.row.PrereqTalent, this.index); }
    get Rank() { return new TalentRankWrap(this.owner, this.index); }

    set(talent: number, rank: number) {
        this.Talent.set(talent);
        this.Rank.set(rank);
        return this.owner;
    }
}

export class TalentRequirements extends SystemArray<TalentRequirement, Talent> {
    get length(): number {
        return 3;
    }

    get(index: number): TalentRequirement {
        return new TalentRequirement(this.owner, index);
    }

    add(talent: number, rank: number) {
        this.getFree().set(talent, rank);
        return this.owner;
    }
}