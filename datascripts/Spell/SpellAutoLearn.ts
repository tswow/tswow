import { SQL } from "wotlkdata/sql/SQLFiles";
import { SqlRow } from "wotlkdata/sql/SQLRow";
import { spell_autolearnRow } from "wotlkdata/sql/types/spell_autolearn";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMaskCon } from "../Class/ClassType";
import { ClassMask } from "../Misc/ClassMask";
import { RaceMask } from "../Misc/RaceMask";
import { RaceMaskCon } from "../Race/RaceType";
import { Spell } from "./Spell";
import { SpellRegistry } from "./Spells";

SQL.Databases.world_dest.read(`DELETE FROM \`spell_autolearn\`;`);
SQL.spell_autolearn.filter({})
    .forEach(x=>{
        SqlRow.markDirty(x);
    })

export class SpellAutoLearn extends ClassRaceMaskEntry<spell_autolearnRow> {
    get Spell() { return SpellRegistry.readOnlyRef(this, this.row.spell); }
    get Level() { return this.wrap(this.row.level); }
    get ClassMask() {
        return new ClassMask(this, this.wrapUnlock(this.row.classmask));
    }
    get RaceMask() {
        return new RaceMask(this, this.wrapUnlock(this.row.racemask));
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
        return SQL.spell_autolearn.filter({spell:this.owner.ID})
            .map(x=>new SpellAutoLearn(x));
    }
    protected isDeleted(value: SpellAutoLearn): boolean {
        return value.row.isDeleted();
    }

    add(level: number, classes?: ClassMaskCon, races?: RaceMaskCon) {
        this.addGet(classes,races).Level.set(level);
        return this.owner;
    }
}