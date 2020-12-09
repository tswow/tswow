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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Enum, EnumField } from "wotlkdata/cell/Systems/Enum";
import { ItemBase } from "./Item";

export class ReputationRank extends Enum<ItemBase> {
    @EnumField(0)
    Hated() {return this.set(0); }

    @EnumField(1)
    Hostile() {return this.set(1); }

    @EnumField(2)
    Unfriendly() {return this.set(2); }

    @EnumField(3)
    Neutral() {return this.set(3); }

    @EnumField(4)
    Friendly() {return this.set(4); }

    @EnumField(5)
    Honored() {return this.set(5); }

    @EnumField(6)
    Revered() {return this.set(6); }

    @EnumField(7)
    Exalted() {return this.set(7); }
}

export class ItemRequiredFaction extends Subsystem<ItemBase> {
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