import { makeMaskCell32, MaskCellWrite, MaskCon } from "../../../data/cell/cells/MaskCell";
import { SQL } from "../../SQLFiles";
import { SqlRow } from "../../../data/sql/SQLRow";
import { spell_autolearnRow } from "../../sql/spell_autolearn";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
import { Spell } from "./Spell";
import { SpellRegistry } from "./Spells";

SQL.Databases.world_dest.read(`DELETE FROM \`spell_autolearn\`;`);
SQL.spell_autolearn.queryAll({})
    .forEach(x=>{
        SqlRow.markDirty(x);
    })

export class SpellAutoLearn extends ClassRaceMaskEntry<spell_autolearnRow> {
    get Spell() { return SpellRegistry.readOnlyRef(this, this.row.spell); }
    get Level() { return this.wrap(this.row.level); }
    get ClassMask(): MaskCellWrite<this,typeof ClassMask> {
        return makeMaskCell32(ClassMask, this, this.wrapUnlock(this.row.classmask)) as any;
    }
    get RaceMask() {
        return makeMaskCell32(RaceMask, this, this.wrapUnlock(this.row.racemask)) as any;
    }
}

export class SpellAutoLearns extends ClassRaceMaskSystem<SpellAutoLearn,spell_autolearnRow,Spell> {
    protected _addGet(classmask: number, racemask: number): SpellAutoLearn {
        return new SpellAutoLearn(
            SQL.spell_autolearn.add(this.owner.ID,racemask,classmask)
                .level.set(1)
        )
    }

    protected getAllRows(): SpellAutoLearn[] {
        return SQL.spell_autolearn.queryAll({spell:this.owner.ID})
            .map(x=>new SpellAutoLearn(x));
    }
    protected isDeleted(value: SpellAutoLearn): boolean {
        return value.row.isDeleted();
    }

    add(level: number, classes?: MaskCon<keyof typeof ClassMask>, races?: MaskCon<keyof typeof RaceMask>) {
        this.addGet(classes,races).Level.set(level);
        return this.owner;
    }
}