import { Cell } from "wotlkdata/cell/cells/Cell";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { DungeonEncounterQuery, DungeonEncounterRow } from "wotlkdata/dbc/types/DungeonEncounter";
import { instance_encountersQuery, instance_encountersRow } from "wotlkdata/sql/types/instance_encounters";
import { SQL } from "wotlkdata/wotlkdata";
import { CreatureTemplateRef } from "../Creature/CreatureTemplate";
import { MapRef } from "../Map/Map";
import { Ids } from "../Misc/Ids";
import { SQLDBCEntity } from "../Misc/SQLDBCEntity";
import { SpellRef } from "../Spell/Spell";
import { LFGDungeonRef } from "./LFGDungeon";

export class DungeonEncounterCreditType extends EnumCell<DungeonEncounter> {
    /** Enum Value = 0 */
    get KillCreature() { return this.value(0) }
    /** Enum Value = 1 */
    get CastSpell()    { return this.value(1) }
}

export class DungeonEncounterIndexCell<T extends DungeonEncounter> extends Cell<number,T>{
    get(): number {
        return this.owner.GetDBC().OrderIndex.get();
    }

    /**
     * @deprecated changing this value manually will corrupt `lfg_data`
     * in the characters database.
     * @param value
     */
    set(value: number) {
        this.owner.GetDBC().OrderIndex.set(value);
        return this.owner;
    }

}

export class DungeonEncounterCredit extends EnumCell<DungeonEncounter> {
    /** Enum Value = 0 */
    get KillCreature() { return this.value(0) }
    /** Enum Value = 1 */
    get CastSpell()    { return this.value(1) }
}

export class DungeonEncounter extends SQLDBCEntity<DungeonEncounterRow, instance_encountersRow> {
    protected readonly id: number;

    constructor(id: number) {
        super();
        this.id = id;
    }

    protected createDBC(): DungeonEncounterRow {
        return DBC.DungeonEncounter.add(this.id)
    }
    protected createSQL(): instance_encountersRow {
        return SQL.instance_encounters.add(this.id)
    }

    protected findDBC(): DungeonEncounterRow {
        return DBC.DungeonEncounter.find({ID:this.id})
    }

    protected findSQL(): instance_encountersRow {
        return SQL.instance_encounters.find({entry:this.id})
    }

    protected isValidDBC(dbc: DungeonEncounterRow): boolean {
        return dbc.ID.get() === this.id;
    }

    protected isValidSQL(sql: instance_encountersRow): boolean {
        return sql.entry.get() === this.id;
    }

    get ID() { return this.id; }
    get Name() { return this.wrapLoc(this.GetDBC().Name); }
    get Map() { return new MapRef(this, this.GetDBC().MapID); }
    get Difficulty() { return this.wrap(this.GetDBC().Difficulty); }
    get Index() { return new DungeonEncounterIndexCell(this); }
    get Type() {
        return new DungeonEncounterCreditType(
              this
            , this.wrapSQL(0,(sql)=>sql.creditType)
        )
    }

    /**
     * The dungeon that this is the last encounter for
     */
    get LastEncounterFor() {
        return new LFGDungeonRef(this, this.wrapSQL(0,sql=>sql.lastEncounterDungeon));
    }

    objectify(): any {
        switch(this.Type.get()) {
            case 0:
                return new DungeonEncounterCreature(this.id).objectify();
            case 1:
                return new DungeonEncounterSpell(this.id).objectify();
            default:
                return new DungeonEncounterPlain(this.id).objectify();
        }
    }
}

export class DungeonEncounterPlain extends DungeonEncounter {
    get Entry() { return this.wrapSQL(0,sql=>sql.creditType); }
}

export class DungeonEncounterCreature extends DungeonEncounter {
    get Creature() {
        return new CreatureTemplateRef(
              this
            , this.wrapSQL(0,sql=>sql.creditEntry)
        )
    }
}

export class DungeonEncounterSpell extends DungeonEncounter {
    get Spell() {
        return new SpellRef(
              this
            , this.wrapSQL(0,sql=>sql.creditEntry)
        )
    }
}

export class LFGDungeonEncounters<T> extends MultiRowSystem<DungeonEncounter,T> {
    protected readonly mapId: number;

    constructor(owner: T, mapId: number) {
        super(owner);
        this.mapId = mapId;
    }

    protected getAllRows(): DungeonEncounter[] {
        return DungeonEncounterRegistry.filterDBC({
              MapID:this.mapId
        })
        .sort((a,b)=>a.Index.get() < b.Index.get() ? 1 : -1)
    }

    addGet() {
        let rows = this.get();
        let newId = rows.length === 0 ? 0 : (rows[rows.length-1].Index.get() + 1)
        return DungeonEncounterRegistry.create(this.mapId,newId)
    }

    addMod(callback: (encounter: DungeonEncounter)=>void) {
        callback(this.addGet());
        return this.owner;
    }

    protected isDeleted(value: DungeonEncounter): boolean {
        // TODO: sql row?
        return value.GetDBC().isDeleted();
    }
}

export const DungeonEncounterRegistry = {
    create(map: number, index: number) {
        return new DungeonEncounterPlain(Ids.DungeonEncounter.id())
            .Map.setRefID(map)
            .Index.set(index)
    },

    createCreature(map: number, index: number) {
        return this.create(map,index).Type.KillCreature.set()
    },

    createSpell(map: number, index: number) {
        return this.create(map,index).Type.CastSpell.set()
    },

    load(id: number) {
        return DBC.DungeonEncounter.find({ID:id})
            ? new DungeonEncounter(id)
            : undefined
    },

    filterDBC(query: DungeonEncounterQuery) {
        return DBC.DungeonEncounter
            .filter(query)
            .map(x=>new DungeonEncounterPlain(x.ID.get()))
    },

    filterSQL(query: instance_encountersQuery) {
        return SQL.instance_encounters
            .filter(query)
            .map(x=>new DungeonEncounterPlain(x.entry.get()))
    },

    findDBC(query: DungeonEncounterQuery) {
        let res = DBC.DungeonEncounter.find(query);
        return res ? new DungeonEncounterPlain(res.ID.get()) : undefined;
    },

    findSQL(query: instance_encountersQuery) {
        let res = SQL.instance_encounters.find(query);
        return res ? new DungeonEncounterPlain(res.entry.get()) : undefined;
    },
}