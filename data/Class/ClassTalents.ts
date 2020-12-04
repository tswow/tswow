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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { TalentTabRow } from "wotlkdata/dbc/types/TalentTab";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
import { SpellIconCell } from "../Spell/SpellIcon";
import { Class } from "./Class";

export class ClassTalents extends Subsystem<Class> {
    get() {
        return DBC.TalentTab
            .filter({})
            .filter((x)=>x.ClassMask.get()&~(1<<this.owner.ID-1))
            .map(x=>new ClassTalent(this.owner, x))
    }

    add(mod: string, name: string) {
        let index = this.get().sort((a,b)=>
            b.row.OrderIndex.get()>
            a.row.OrderIndex.get() ? 1 : -1)[0]
            .row.OrderIndex.get()+1
        return new ClassTalent(this.owner, DBC.TalentTab.add(Ids.TalentTab.id(mod,name),{
            ClassMask: 1<<this.owner.ID,
            OrderIndex: index,
        }))
    }
}

export class ClassTalent extends MainEntity<TalentTabRow> {
    protected owner: Class;
    constructor(owner: Class, row: TalentTabRow) {
        super(row);
        this.owner = owner;
    }

    get Name() { return this.wrapLoc(this.row.Name); }
    get BackgroundImage() { return this.wrap(this.row.BackgroundFile); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }

    get up() {
        return this.owner;
    }

    addTalent() {
        return this;
    }
}