/*
 * Copyright (C) 2024 tswow <https://github.com/tswow/>
 * and Duskhaven <https://github.com/orgs/Duskhaven-Reforged>
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

/* tslint:disable */
import { int, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCKeyCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { CDBCFile } from './CDBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'
import { SQL } from '../SQLFiles'

/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export class LFGRolesRow extends DBCRow<LFGRolesCreator,LFGRolesQuery> {
    /**
     * Primary Key
     *
     * Spell id, from to Spell.dbc
     */
    @PrimaryKey()
    get ClassID() { return new DBCKeyCell(this,this.buffer,this.offset+0) }

    /**
     * Resource name, this is what's showing in spell tooltip in cost row
     */
    get Roles() { return new DBCUIntCell(this,this.buffer,this.offset+4) }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ClassID : int, c? : LFGRolesCreator) : this {
        return this.cloneInternal([ClassID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LFGRolesCreator = {
    Roles?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type LFGRolesQuery = {
    ClassID? : Relation<int>
    Roles? : Relation<int>
}

export class LFGRolesCDBCFile extends CDBCFile<
    LFGRolesCreator,
    LFGRolesQuery,
    LFGRolesRow> {
    protected defaultRow = [0, 0]; //TODO: it requires stock classes to be defined by default

    constructor() {
        super('LFGRoles',(t,b,o)=> new LFGRolesRow(t,b,o))
    }
    /** Loads a new LFGRoles.cdbc from a file. */
    static read(path: string): LFGRolesCDBCFile {
        return new LFGRolesCDBCFile().read(path)
    }
    add(ClassID : int, c? : LFGRolesCreator) : LFGRolesRow {
        return this.makeRow(0).clone(ClassID,c)
    }
    findByID(id : number) {
        return this.fastSearch(id);
    }
    
    override fileWork(): void {
        const defaultClassRoles: Record<number, { tank: number, healer: number, damage: number, leader: number }> = {
            1: { tank: 1, healer: 0, damage: 1, leader: 1 },
            2: { tank: 1, healer: 1, damage: 1, leader: 1 },
            3: { tank: 0, healer: 0, damage: 1, leader: 1 },
            4: { tank: 0, healer: 0, damage: 1, leader: 1 },
            5: { tank: 0, healer: 1, damage: 1, leader: 1 },
            6: { tank: 1, healer: 0, damage: 1, leader: 1 },
            7: { tank: 0, healer: 1, damage: 1, leader: 1 },
            8: { tank: 0, healer: 0, damage: 1, leader: 1 },
            9: { tank: 0, healer: 0, damage: 1, leader: 1 },
            11: { tank: 1, healer: 1, damage: 1, leader: 1 },
        };
    
        for (const v of SQL.player_class_roles.queryAll({})) {
            defaultClassRoles[v.class.get()] = {
                tank: v.tank.get(),
                healer: v.healer.get(),
                damage: v.damage.get(),
                leader: v.leader.get(),
            };
        }
    
        for (const [classID, val] of Object.entries(defaultClassRoles)) {
            const classIDNum = Number(classID);
            const rolemask = (val.leader << 0) | (val.tank << 1) | (val.healer << 2) | (val.damage << 3);
    
            const row = this.findByID(classIDNum) ? this.getRow(classIDNum) : this.add(classIDNum);
            row.Roles.set(rolemask);
        }
    }    
}
