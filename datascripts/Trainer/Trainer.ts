/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
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
import { Cell } from "wotlkdata/cell/cells/Cell";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { Language } from "wotlkdata/dbc/Localization";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { ClassType, resolveClassType } from "../Class/ClassType";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RaceType, resolveRaceType } from "../Race/RaceType";
import { Ref } from "../Refs/Ref";
import { Spells } from "../Spell/Spells";

export class TrainerLoc extends SQLLocSystem<Trainer> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.Greeting;
    }

    protected getLoc(loc: Language): Cell<string, any> {
        const old = SQL.trainer_locale.find({Id: this.owner.ID, locale: loc})
        if(old!==undefined) {
            return old.Greeting_lang;
        }
        return SQL.trainer_locale.add(this.owner.ID, loc).Greeting_lang;
    }
}

export class TrainerType extends EnumCell<Trainer> {
    /** Enum Value:                             0 */
    get ClassTrainer()      { return this.value(0) }
    /** Enum Value:                             1 */
    get MountTrainer()      { return this.value(1) }
    /** Enum Value:                             2 */
    get TradeskillTrainer() { return this.value(2) }
}

export class Trainer extends MainEntity<trainerRow> {
    get ID() {
        return this.row.Id.get();
    }

    get Greeting(): TrainerLoc { return new TrainerLoc(this); }
    get Requirement() { return this.wrap(this.row.Requirement); }
    get Type() { return new TrainerType(this,this.row.Type); }

    setClassTrainer(cls: ClassType) {
        this.Type.ClassTrainer.set()
        this.Requirement.set(resolveClassType(cls));
        return this;
    }

    setMountTrainer(race: RaceType) {
        this.Type.MountTrainer.set()
        this.Requirement.set(resolveRaceType(race));
        return this;
    }

    setTradeskillTrainer(requiredSpell: number = 0) {
        this.Type.TradeskillTrainer.set()
        this.Requirement.set(requiredSpell);
        return this;
    }

    addSpell(spellId: number,cost = 0, reqLevel = 0, reqSkillLine = 0, reqSkillRank = 0, reqAbilities: number[] = []) {
        if(reqSkillLine===0) {
            const sla = Spells.load(spellId).SkillLines.getIndex(0);
            if(sla!==undefined) {
                reqSkillLine = sla.SkillLine.get();
            }
        }
        SQL.trainer_spell.add(this.ID, spellId)
            .MoneyCost.set(cost)
            .ReqLevel.set(reqLevel)
            .ReqSkillLine.set(reqSkillLine)
            .ReqSkillRank.set(reqSkillRank)
            .ReqLevel.set(reqLevel)
            .ReqAbility1.set(reqAbilities[0]||0)
            .ReqAbility2.set(reqAbilities[1]||0)
            .ReqAbility3.set(reqAbilities[2]||0)
            .VerifiedBuild.set(17688);
        return this;
    }
}

export class TrainerPointer<T> extends Ref<T,Trainer> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): Trainer {
        return new Trainer(SQL.trainer.add(Ids.Trainer.id()));
    }
    protected clone(): Trainer {
        return new Trainer(this.resolve().row.clone(Ids.Trainer.id()));
    }
    protected id(v: Trainer): number {
        return v.ID;
    }
    protected resolve(): Trainer {
        return new Trainer(SQL.trainer.find({Id:this.cell.get()}));
    }
}