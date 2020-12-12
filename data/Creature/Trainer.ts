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
import { Ids } from "../Base/Ids";
import { SQLLocSystem } from "../Base/SQLLocSystem";
import { CreatureTemplate } from "./CreatureTemplate";

export class TrainerLoc extends SQLLocSystem<CreatureTemplate> {
    protected getMain(): Cell<string, any> {
        return this.owner.Trainer.row.Greeting;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        const old = SQL.trainer_locale.find({Id: this.owner.Trainer.ID, locale: loc})
        if(old!==undefined) {
            return old.Greeting_lang;
        }
        return SQL.trainer_locale.add(this.owner.Trainer.ID, loc).Greeting_lang;
    }
}

export class Trainer extends Subsystem<CreatureTemplate> {
    get ID() {
        return this.row.Id.get();
    }
    get row() { 
        const trainer = SQL.creature_default_trainer.find({CreatureId: this.owner.ID});
        if(trainer===undefined) {
            const trainerRow = SQL.trainer.add(Ids.Trainer.id())
                .Requirement.set(0)
            SQL.creature_default_trainer.add(this.owner.ID)
                .TrainerId.set(trainerRow.Id.get())
            return trainerRow;
        }
        return SQL.trainer.find({Id:trainer.TrainerId.get()});
    }

    constructor(owner: CreatureTemplate) {
        super(owner);
    }

    get Greeting() { return new TrainerLoc(this.owner); }
    get Class() { return this.ownerWrap(this.row.Requirement); }
    get Type() { return this.ownerWrap(this.row.Type); }

    addSpell(spellId: number,cost = 0, reqLevel = 0, reqSkillLine = 0, reqSkillRank = 0, reqAbility1 = 0, reqAbility2 = 0, reqAbility3 = 0) {
        SQL.trainer_spell.add(this.ID, spellId)
            .MoneyCost.set(cost)
            .ReqLevel.set(reqLevel)
            .ReqSkillLine.set(reqSkillLine)
            .ReqSkillRank.set(reqSkillRank)
            .ReqLevel.set(reqLevel)
            .ReqAbility1.set(reqAbility1)
            .ReqAbility2.set(reqAbility2)
            .ReqAbility3.set(reqAbility3);
        return this.owner;
    }
}