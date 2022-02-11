import { finish } from "wotlkdata";
import { makeMaskCell32, MaskCellWrite } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { BuildArgs } from "wotlkdata/wotlkdata/Settings";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { IDeletable } from "../Misc/Entity";
import { RaceMask } from "../Race/RaceType";
import { SpellRegistry } from "./Spells";

interface CastSpellRow extends IDeletable {
    raceMask : number
    classMask : number
    spell : number
    note: string
    deleted: boolean
}

let values: CastSpellRow[] = SQL.Databases.world_source
    .read(`SELECT * from \`playercreateinfo_cast_spell\`;`)
SQL.Databases.world_dest.read(`DELETE FROM \`playercreateinfo_cast_spell\`;`)

finish('playercreateinfo_cast_spell',()=>{
    if(BuildArgs.READ_ONLY) return;
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
    get ClassMask(): MaskCellWrite<this,typeof ClassMask> {
        // hack
        return makeMaskCell32(ClassMask, this, new CellBasic(this,
            ()=>this.row.classMask,
            (value)=>{
                this.row.classMask = value; return this;
            })
        )
    }
    get RaceMask(): MaskCellWrite<this,typeof RaceMask> {
        return makeMaskCell32(RaceMask, this, new CellBasic(this,
            ()=>this.row.raceMask,
            (value)=>{
                this.row.raceMask = value; return this;
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
        let v: CastSpellRow = {
              classMask
            , raceMask
            , note:''
            , spell:0
            , deleted: false
            , isDeleted: function() {
                return this.deleted;
            }
            , delete: function() {
                this.deleted = true;
            }
            , undelete: function() {
                this.deleted = false;
            }
        }
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