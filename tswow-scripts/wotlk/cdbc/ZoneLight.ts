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
import { DBCKeyCell, DBCStringCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { CDBCFile } from './CDBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export class ZoneLightRow extends DBCRow<ZoneLightCreator,ZoneLightQuery> {
    /**
     * Primary Key
     *
     * Id
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0) }

    /**
     * Name, it's not really used anywhere, just a comment allowing to identify light info easily
     */
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+4) }

    /**
     * Map ID, from Map.dbc
     */
    get MapID() { return new DBCUIntCell(this,this.buffer,this.offset+8) }

    /**
     * Light ID, from Light.dbc
     */
    get LightID() { return new DBCUIntCell(this,this.buffer,this.offset+12) }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ZoneLightCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ZoneLightCreator = {
    Name?: string
    MapID?: uint
    LightID?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type ZoneLightQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    MapID? : Relation<uint>
    LightID? : Relation<uint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ZoneLightCDBCFile extends CDBCFile<
    ZoneLightCreator,
    ZoneLightQuery,
    ZoneLightRow> {
    protected defaultRow = [1, "UnusedMap", 2, 1];

    constructor() {
        super('ZoneLight',(t,b,o)=> new ZoneLightRow(t,b,o))
    }
    /** Loads a new SpellAdditionalCostData.dbc from a file. */
    static read(path: string): ZoneLightCDBCFile {
        return new ZoneLightCDBCFile().read(path)
    }
    add(ID : int, c? : ZoneLightCreator) : ZoneLightRow {
        return this.makeRow(0).clone(ID,c)
    }
    findByID(id : number) {
        return this.fastSearch(id);
    }

    // Aleist3r: Duskhaven doesn't need Northrend
    /*override fileWork(): void {
        const defaultZoneLights: Record<number, {Name: string, MapID: number, LightID: number}> = {
            1: { Name: "BoreanThundra", MapID: 571, LightID: 914 },
            2: { Name: "Dragonblight", MapID: 571, LightID: 825 },
            3: { Name: "GrizzlyHills", MapID: 571, LightID: 959 },
            4: { Name: "HowlingFjord", MapID: 571, LightID: 862 },
            5: { Name: "HowlingGrizzly", MapID: 571, LightID: 1847 },
            6: { Name: "Icecrown", MapID: 571, LightID: 1703 },
            7: { Name: "Sholazar", MapID: 571, LightID: 1796 },
            8: { Name: "StormPeaks", MapID: 571, LightID: 1777 },
            9: { Name: "Wintergrasp", MapID: 571, LightID: 1792 },
            10: { Name: "ZulDrak", MapID: 571, LightID: 1589 },
            11: { Name: "Crystalsong", MapID: 571, LightID: 1740 },
        };
    }*/
}
