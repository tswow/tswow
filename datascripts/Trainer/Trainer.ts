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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Language } from "wotlkdata/dbc/Localization";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { creature_default_trainerRow } from "wotlkdata/sql/types/creature_default_trainer";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Spells } from "../Spell/Spells";
import { Transient } from "wotlkdata/cell/serialization/Transient";

export class TrainerLoc<T> extends SQLLocSystem<T> {
    @Transient
    protected trainer: Trainer<any>;
    
    constructor(owner: T, trainer: Trainer<any>) {
        super(owner);
        this.trainer = trainer;
    }

    protected getMain(): Cell<string, any> {
        return this.trainer.trainerRow.Greeting;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        const old = SQL.trainer_locale.find({Id: this.trainer.ID, locale: loc})
        if(old!==undefined) {
            return old.Greeting_lang;
        }
        return SQL.trainer_locale.add(this.trainer.ID, loc).Greeting_lang;
    }
}

export class Trainer<T> extends CellSystem<T> {
    get ID() {
        return this.trainerRow.Id.get();
    }

    readonly trainerRow: trainerRow;
    readonly creatureRow: creature_default_trainerRow;

    constructor(owner: T, trainerRow: trainerRow, creatureRow: creature_default_trainerRow) {
        super(owner);
        this.trainerRow = trainerRow;
        this.creatureRow = creatureRow;
    }

    get Greeting(): TrainerLoc<this> { return new TrainerLoc<this>(this, this); }
    get Class() { return this.wrap(this.trainerRow.Requirement); }
    get Type() { return this.wrap(this.trainerRow.Type); }

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