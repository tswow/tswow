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
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { SpellRow } from "../../dbc/Spell";
export class SpellItemEquips<T> extends CellSystem<T> {
    @Transient
    protected row: SpellRow;

    constructor(owner: T, row: SpellRow) {
        super(owner);
        this.row = row;
    }

    get Class() { return this.ownerWrap(this.row.EquippedItemClass);}
    get Subclass() { return this.ownerWrap(this.row.EquippedItemSubclass);}
    get InvTypes() { return this.ownerWrap(this.row.EquippedItemInvTypes);}

    setMeleeWeapon() { return this.set(2,189939,0) }
    set2HWeapon() { return this.set(2,1378,0) }
    setBoots() { return this.set(4,30,256) }
    setBracers() { return this.set(4,30,512) }
    setChest() { return this.set(4,31,1048608) }
    setStaff() { return this.set(2,1024,0) }
    setRing() { return this.set(4,0,2048) }
    setShield() { return this.set(4,64,0) }
    setGloves() { return this.set(4,31,1024) }
    setCloak() { return this.set(4,30,65536) }

    set(cls: number, subcls: number, invTypes: number) {
        this.Class.set(cls);
        this.Subclass.set(subcls);
        this.InvTypes.set(invTypes);
        return this.owner;
    }
}

export const enum ItemSubclassWeapon
{
    AXE            = 0x1,
    AXE2           = 0x2,
    BOW            = 0x4,
    GUN            = 0x8,
    MACE           = 0x10,
    MACE2          = 0x20,
    POLEARM        = 0x40,
    SWORD          = 0x80,
    SWORD2         = 0x100,
    WARGLAIVE      = 0x200,
    STAFF          = 0x400,
    EXOTIC         = 0x800,
    EXOTIC2        = 0x1000,
    FIST           = 0x2000,
    MISC           = 0x4000,
    DAGGER         = 0x8000,
    THROWN         = 0x10000,
    SPEAR          = 0x20000,
    CROSSBOW       = 0x40000,
    WAND           = 0x80000,
    FISHING_POLE   = 0x100000,
};