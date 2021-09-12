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
import { DBC, SQL } from "wotlkdata"
import { CellSystem } from "wotlkdata/cell/systems/CellSystem"
import { SkillLineAbilityRow } from "wotlkdata/dbc/types/SkillLineAbility"
import { SkillRaceClassInfoRow } from "wotlkdata/dbc/types/SkillRaceClassInfo"
import { Ids } from "../Misc/Ids"
import { Class } from "./Class"

export class EquipSystem extends CellSystem<Class> {
    protected row: SkillLineAbilityRow;
    protected rcRow: SkillRaceClassInfoRow;

    constructor(owner: Class, row: SkillLineAbilityRow, rcRow: SkillRaceClassInfoRow) {
        super(owner);
        this.row = row;
        this.rcRow = rcRow;
    }

    setTrainer() {
        this.row.ClassMask.mark(this.owner.ID-1);
        this.row.RaceMask.set(0xffffffff);
        this.rcRow.RaceMask.set(0xffffffff);
        this.row.AcquireMethod.set(1);
        return this.owner;
    }

    setAuto() {
        this.row.ClassMask.mark(this.owner.ID-1);
        this.row.RaceMask.set(0xffffffff);
        this.rcRow.RaceMask.set(0xffffffff);
        this.row.AcquireMethod.set(1);
        SQL.playercreateinfo_skills.add(0,1<<(this.owner.ID-1),
            this.row.SkillLine.get())

        return this.owner;
    }
}

export class EquipSkills extends CellSystem<Class> {
    protected getRow(spellId: number) {
        const slas = DBC.SkillLineAbility.filter({Spell: spellId});
        const existingSla = slas
            .filter(x=>x.ClassMask.get()&(1<<(this.owner.ID-1)));

        const sla = existingSla.length === 0 ? slas[0]
            .clone(Ids.SkillLineAbility.id())
            .ClassMask.set(1<<(this.owner.ID-1))
            : existingSla[0];

        const rcis = DBC.SkillRaceClassInfo.filter({SkillID: sla.SkillLine.get()});
        const existingRci = rcis.filter(x=>x.ClassMask.get()&(1<<(this.owner.ID-1)));
        const rci = existingRci.length === 0 ? rcis[0]
            .clone(Ids.SkillRaceClassInfo.id())
            .ClassMask.set(1<<(this.owner.ID-1))
            : existingRci[0];
        return new EquipSystem(this.owner, sla, rci);
    }

    get Maces() { return this.getRow(198); }
    get TwoHandedMaces() { return this.getRow(199); }
    get Daggers() { return this.getRow(1180); }
    get OneHandedSwords() { return this.getRow(201); }
    get TwoHandedSwords() { return this.getRow(202); }
    get OneHandedAxes() { return this.getRow(196); }
    get TwoHandedAxes() { return this.getRow(197); }
    get Polearms() { return this.getRow(200); }
    get FistWeapons() { return this.getRow(15590); }
    get Bows() { return this.getRow(264); }
    get Crossbows() { return this.getRow(5011); }
    get Guns() { return this.getRow(266); }
    get Staves() { return this.getRow(227); }
    get Thrown() { return this.getRow(2567); }
    get Wand() { return this.getRow(5009); }
    get Shield() { return this.getRow(9116); }

    get Cloth() { return this.getRow(9078); }
    get Leather() { return this.getRow(9077); }
    get Mail() { return this.getRow(8737); }
    get Plate() { return this.getRow(750); }
}