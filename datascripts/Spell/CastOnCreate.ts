import { finish } from "wotlkdata";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { ClassMask } from "../Misc/ClassMask";
import { RaceMask } from "../Misc/RaceMask";
import { SpellRegistry } from "./Spells";

interface CastSpellRow {
    raceMask : number
    classMask : number
    spell : number
    note: string
    deleted?: boolean
}

let values: CastSpellRow[] = SQL.Databases.world_source
    .read(`SELECT * from \`playercreateinfo_cast_spell\`;`)
SQL.Databases.world_dest.read(`DELETE FROM \`playercreateinfo_cast_spell\`;`)

finish('playercreateinfo_cast_spell',()=>{
    values.forEach(({classMask,note,raceMask,spell,deleted})=>{
        if(deleted) return;
        SQL.Databases.world_dest.write(
              `INSERT INTO \`playercreateinfo_cast_spell\` VALUES`
            + ` (${raceMask},${classMask},${spell},"${note}");`
        )
    })
});

export class CastSpell extends ClassRaceMaskEntry<CastSpellRow> {
    get Spell() {
        return SpellRegistry.ref(this
            , new CellBasic(this,()=>this.row.classMask,(v)=>{
                this.row.raceMask = v;
                return this;
            })
        )
    }
    get Note() {
        return new CellBasic(this, ()=>this.row.note, (v)=>{
            this.row.note = v;
            return this;
        })
    }
    get ClassMask(): ClassMask<this> {
        return new ClassMask(this, new CellBasic(this,
            ()=>this.row.classMask,
            (value)=>{
                this.row.classMask = value; return this;
            })
        )
    }
    get RaceMask(): RaceMask<this> {
        return new RaceMask(this, new CellBasic(this,
            ()=>this.row.raceMask,
            (value)=>{
                this.row.raceMask= value; return this;
            })
        )
    }
}

export class CastSpells<T> extends ClassRaceMaskSystem<CastSpell,CastSpellRow,T> {
    @Transient
    protected spell: number;

    constructor(owner: T, spell: number) {
        super(owner);
        this.spell = spell;
    }

    protected _addGet(classMask: number, raceMask: number): CastSpell {
        let v: CastSpellRow = {classMask,raceMask,note:'',spell:0}
        values.push(v);
        return new CastSpell(v);
    }
    protected getAllRows(): CastSpell[] {
        return values.map(x=>new CastSpell(x));
    }
    protected isDeleted(value: CastSpell): boolean {
        return value.row.deleted === true;
    }
}