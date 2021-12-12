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
import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { ArrayEntry, ArraySystem } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
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

    clear() {
        this.container.row.PrereqTalent.setIndex(this.index, 0);
        this.container.row.PrereqRank.setIndex(this.index, 0);
        return this;
    }

    isClear(): boolean {
        return this.container.row.PrereqTalent.getIndex(this.index) === 0;
    }

    get Talent() { return this.wrapIndex(this.container.row.PrereqTalent, this.index); }
    get Rank() { return this.wrap(new TalentRankWrap(this.container, this.index)); }

    set(talent: number, rank: number) {
        this.Talent.set(talent);
        this.Rank.set(rank);
        return this;
    }
}

export class TalentRequirements extends ArraySystem<TalentRequirement, Talent> {
    get length(): number {
        return 3;
    }

    get(index: number): TalentRequirement {
        return new TalentRequirement(this.owner, index);
    }

    add(talent: number, rank: number) {
        this.addGet().set(talent, rank);
        return this.owner;
    }

    addPos(row: number, column: number, rank: number) {
        let talent = DBC.Talent.query({
              TierID:row
            , ColumnIndex:column
            ,TabID:this.owner.Tab.get()
        })
        return this.add(talent.ID.get(),rank);
    }
}