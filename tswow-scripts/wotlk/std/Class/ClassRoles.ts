/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { SQL } from "../../SQLFiles";
import { player_class_rolesRow } from "../../sql/player_class_roles";
import { BoolCell } from "../Misc/BoolCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Class } from "./Class";

export class ClassRoles extends MaybeSQLEntity<Class,player_class_rolesRow> {
    protected createSQL(): player_class_rolesRow {
        return SQL.player_class_roles.add(this.owner.ID)
    }
    protected findSQL(): player_class_rolesRow {
        return SQL.player_class_roles.query({class:this.owner.ID})
    }
    protected isValidSQL(sql: player_class_rolesRow): boolean {
        return sql.class.get() === this.owner.ID
    }

    get Tank() {
        return new BoolCell(this.owner, this.wrapSQL(0,sql=>sql.tank))
    }

    get Healer() {
        return new BoolCell(this.owner, this.wrapSQL(0,sql=>sql.healer))
    }

    get Damage() {
        return new BoolCell(this.owner, this.wrapSQL(0,sql=>sql.damage))
    }

    // not yet implemented
    protected get Leader() {
        return new BoolCell(this.owner, this.wrapSQL(1,sql=>sql.leader))
    }

    set(tank: boolean, healer: boolean, damage: boolean) {
        this.Tank.set(tank);
        this.Healer.set(healer);
        this.Damage.set(damage);
        this.Leader.set(1)
        return this.owner;
    }

    clear() {
        this.Tank.set(0)
        this.Healer.set(0)
        this.Damage.set(0)
        this.Leader.set(1) // not yet implemented
        return this.owner;
    }
}