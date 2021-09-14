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
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";

export class ReputationRank extends EnumCell<ItemTemplate> {
    /** Enum Value:                      0 */
    get Hated()      { return this.value(0) }
    /** Enum Value:                      1 */
    get Hostile()    { return this.value(1) }
    /** Enum Value:                      2 */
    get Unfriendly() { return this.value(2) }
    /** Enum Value:                      3 */
    get Neutral()    { return this.value(3) }
    /** Enum Value:                      4 */
    get Friendly()   { return this.value(4) }
    /** Enum Value:                      5 */
    get Honored()    { return this.value(5) }
    /** Enum Value:                      6 */
    get Revered()    { return this.value(6) }
    /** Enum Value:                      7 */
    get Exalted()    { return this.value(7) }
}

export class ItemRequiredFaction extends CellSystem<ItemTemplate> {
    get Faction() { return this.ownerWrap(this.owner.row.RequiredReputationFaction); }
    get Rank() { return new ReputationRank(this.owner, this.owner.row.RequiredReputationRank); }

    set(faction: number, rank: number) {
        this.Faction.set(faction);
        this.Rank.set(rank);
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