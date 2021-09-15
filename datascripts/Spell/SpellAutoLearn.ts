import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { spell_autolearnRow } from "wotlkdata/sql/types/spell_autolearn";
import { ClassType, makeClassmask } from "../Class/ClassType";
import { ClassMaskReadOnly } from "../Misc/ClassMask";
import { MainEntity } from "../Misc/Entity";
import { makeRacemask, RaceType } from "../Race/RaceType";
import { Spell, SpellRefReadOnly } from "./Spell";

export class SpellAutoLearn extends MainEntity<spell_autolearnRow> {
    get Spell() { return new SpellRefReadOnly(this, this.row.spell); }
    get ClassMask() { return new ClassMaskReadOnly(this, this.row.classmask); }
    get RaceMask() { return new ClassMaskReadOnly(this, this.row.racemask); }
    get Level() { return this.wrap(this.row.level); }
}

export class SpellAutoLearns extends MultiRowSystem<SpellAutoLearn,Spell> {
    protected getAllRows(): SpellAutoLearn[] {
        return SQL.spell_autolearn.filter({spell:this.owner.ID})
            .map(x=>new SpellAutoLearn(x));
    }
    protected isDeleted(value: SpellAutoLearn): boolean {
        return value.row.isDeleted();
    }

    add(classes: ClassType[]|number, races: RaceType[]|number, level: number) {
        if(typeof(classes) === 'object') {
            classes = makeClassmask(classes);
        }

        if(typeof(races) === 'object') {
            races = makeRacemask(races);
        }

        SQL.spell_autolearn
            .add(this.owner.ID, races, classes)
            .level.set(level);
        return this.owner;
    }
}