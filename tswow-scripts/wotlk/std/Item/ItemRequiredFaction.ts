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
import { EnumCon, makeEnum, makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ReputationRank } from "../Misc/ReputationRank";
import { ItemTemplate } from "./ItemTemplate";

export class ItemRequiredFaction extends CellSystem<ItemTemplate> {
    get Faction() { return this.ownerWrap(this.owner.row.RequiredReputationFaction); }
    get Rank() {
        return makeEnumCell(ReputationRank,this, this.owner.row.RequiredReputationRank);
    }

    set(faction: number, rank: EnumCon<keyof typeof ReputationRank>) {
        this.Faction.set(faction);
        this.Rank.set(makeEnum(ReputationRank,rank));
        return this.owner;
    }

    setHated(faction: number) { return this.set(faction,0); }
    setHostile(faction: number) { return this.set(faction,1); }
    setUnfriendly(faction: number) { return this.set(faction,2); }
    setNeutral(faction: number) { return this.set(faction,3); }
    setFriendly(faction: number) { return this.set(faction,4); }
    setHonored(faction: number) { return this.set(faction,5); }
    setRevered(faction: number) { return this.set(faction,6); }
    setExalted(faction: number) { return this.set(faction,7); }
}