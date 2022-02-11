import { Cell } from "../../../data/cell/cells/Cell";
import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { DBC } from "../../DBCFiles";
import { DungeonEncounterQuery, DungeonEncounterRow } from "../../dbc/DungeonEncounter";
import { instance_encountersQuery, instance_encountersRow } from "../../sql/instance_encounters";
import { SQL } from "../../SQLFiles";
import { CreatureTemplateRegistry } from "../Creature/Creatures";
import { MapRegistry } from "../Map/Maps";
import { Ids } from "../Misc/Ids";
import { SQLDBCEntity } from "../Misc/SQLDBCEntity";
import { SpellRegistry } from "../Spell/Spells";
import { LFGDungeonRegistry } from "./LFGDungeon";

export enum DungeonEncounterCreditType {
    KILL_CREATURE = 0,
    CAST_SPELL    = 1,
    COMPLETE_ENCOUNTER = 2,
}
export class DungeonEncounterIndexCell<T extends DungeonEncounter> extends Cell<number,T>{
    get(): number {
        return this.owner.getDBC().OrderIndex.get();
    }

    /**
     * @param value
     */
    set(value: number) {
        this.owner.getDBC().OrderIndex.set(value);
        return this.owner;
    }
}

export class DungeonEncounterType<T extends DungeonEncounter> extends EnumCellTransform<T> {
    get KILL_CREATURE() {
        return this.value(
              DungeonEncounterCreditType.KILL_CREATURE
            , (t)=>new DungeonEncounterCreature(t.ID)
        )
    }

    get CAST_SPELL() {
        return this.value(
              DungeonEncounterCreditType.CAST_SPELL
            , (t)=>new DungeonEncounterSpell(t.ID)
        )
    }

    get COMPLETE_ENCOUNTER() {
        return this.value(
              DungeonEncounterCreditType.COMPLETE_ENCOUNTER
            , (t)=>new DungeonEncounterBoss(t.ID)
        )
    }
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
        return DBC.DungeonEncounter.query({ID:this.id})
    }

    protected findSQL(): instance_encountersRow {
        return SQL.instance_encounters.query({entry:this.id})
    }

    protected isValidDBC(dbc: DungeonEncounterRow): boolean {
        return dbc.ID.get() === this.id;
    }

    protected isValidSQL(sql: instance_encountersRow): boolean {
        return sql.entry.get() === this.id;
    }

    get ID() { return this.id; }
    get Name() { return this.wrapLoc(this.getDBC().Name); }
    get Map() { return MapRegistry.ref(this, this.getDBC().MapID); }
    get Difficulty() { return this.wrap(this.getDBC().Difficulty); }
    get Index() { return new DungeonEncounterIndexCell(this); }
    get Type() {
        return new DungeonEncounterType(this,this.wrapSQL(-1,sql=>sql.creditType))
    }

    /**
     * The dungeon that this is the last encounter for
     */
    get LastEncounterFor() {
        return LFGDungeonRegistry.ref(this, this.wrapSQL(0,sql=>sql.lastEncounterDungeon));
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
    get CreatureTemplate() {
        return CreatureTemplateRegistry.ref(
              this
            , this.wrapSQL(0,sql=>sql.creditEntry)
        )
    }
}

export class DungeonEncounterSpell extends DungeonEncounter {
    get Spell() {
        return SpellRegistry.ref(
              this
            , this.wrapSQL(0,sql=>sql.creditEntry)
        )
    }
}

export class DungeonEncounterBoss extends DungeonEncounter {
    get Boss() {
        return this.wrapSQL(-1,sql=>sql.creditEntry);
    }
}

export class LFGDungeonEncounters<T> extends MultiRowSystem<DungeonEncounterPlain,T> {
    protected readonly mapId: number;

    constructor(owner: T, mapId: number) {
        super(owner);
        this.mapId = mapId;
    }

    protected getAllRows(): DungeonEncounterPlain[] {
        return DungeonEncounterRegistry.queryAllDBC({
              MapID:this.mapId
        })
        .sort((a,b)=>a.Index.get() < b.Index.get() ? 1 : -1)
    }

    addGet() {
        let rows = this.get();
        let newId = rows.length === 0 ? 0 : (rows[rows.length-1].Index.get() + 1)
        return DungeonEncounterRegistry.create(this.mapId,newId)
    }

    addMod(callback: (encounter: DungeonEncounterPlain)=>void) {
        callback(this.addGet());
        return this.owner;
    }

    protected isDeleted(value: DungeonEncounterPlain): boolean {
        // TODO: sql row?
        return value.getDBC().isDeleted();
    }
}

export const DungeonEncounterRegistry = {
    create(map: number, index: number) {
        const id = Ids.DungeonEncounter.id();
        DBC.DungeonEncounter.add(id)
            .MapID.set(map)
            .Name.clear()
            .OrderIndex.set(0)
            .SpellIconID.set(0)
            .Bit.set(0)
            .Difficulty.set(0)
        SQL.instance_encounters.add(id)
            .creditType.set(0)
            .creditEntry.set(0)
            .lastEncounterDungeon.set(0)
        return new DungeonEncounterPlain(id)
            .Map.set(map)
            .Index.set(index)
    },

    createCreature(map: number, index: number) {
        return this.create(map,index).Type.KILL_CREATURE.set()
    },

    createSpell(map: number, index: number) {
        return this.create(map,index).Type.CAST_SPELL.set()
    },

    load(id: number) {
        return DBC.DungeonEncounter.query({ID:id})
            ? new DungeonEncounter(id)
            : undefined
    },

    queryAllDBC(query: DungeonEncounterQuery) {
        return DBC.DungeonEncounter
            .queryAll(query)
            .map(x=>new DungeonEncounterPlain(x.ID.get()))
    },

    queryAllSQL(query: instance_encountersQuery) {
        return SQL.instance_encounters
            .queryAll(query)
            .map(x=>new DungeonEncounterPlain(x.entry.get()))
    },

    queryDBC(query: DungeonEncounterQuery) {
        let res = DBC.DungeonEncounter.query(query);
        return res ? new DungeonEncounterPlain(res.ID.get()) : undefined;
    },

    querySQL(query: instance_encountersQuery) {
        let res = SQL.instance_encounters.query(query);
        return res ? new DungeonEncounterPlain(res.entry.get()) : undefined;
    },
}