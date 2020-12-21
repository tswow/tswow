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
import { Cell } from "wotlkdata/cell/Cell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Language } from "wotlkdata/dbc/Localization";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { creature_default_trainerRow } from "wotlkdata/sql/types/creature_default_trainer";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { SQLLocSystem } from "../Base/SQLLocSystem";
import { Spells } from "../Spell/Spells";

export class TrainerLoc<T> extends SQLLocSystem<Trainer<T>> {
    protected getMain(): Cell<string, any> {
        return this.owner.trainerRow.Greeting;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        const old = SQL.trainer_locale.find({Id: this.owner.ID, locale: loc})
        if(old!==undefined) {
            return old.Greeting_lang;
        }
        return SQL.trainer_locale.add(this.owner.ID, loc).Greeting_lang;
    }
}

export class Trainer<T> extends Subsystem<T> {
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

    get Greeting() { return new TrainerLoc<T>(this); }
    get Class() { return this.wrap(this.trainerRow.Requirement); }
    get Type() { return this.wrap(this.trainerRow.Type); }

    addSpell(spellId: number,cost = 0, reqLevel = 0, reqSkillRank = 0, reqAbilities: number[] = [], reqSkillLine: number = 0) {
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
            .ReqAbility3.set(reqAbilities[2]||0);
        return this;
    }
}