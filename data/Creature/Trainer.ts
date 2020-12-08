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
import { loc_constructor } from "wotlkdata/primitives";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { trainer_spellRow } from "wotlkdata/sql/types/trainer_spell";
import { Ids } from "../Base/Ids";
import { SQLLocSystem } from "../Base/SQLLocSystem";

export class RequiredAbilities extends Subsystem<TrainerSpell> {
    readonly length = 4;

    protected getCell(index: number) {
        switch(index) {
            case 0:
                return this.owner.row.ReqAbility1;
            case 1:
                return this.owner.row.ReqAbility2;
            case 3:
                return this.owner.row.ReqAbility3;
        }
        throw new Error(`Invalid ability index: ${index} (max is 3)`);
    }

    clear() {
        this.owner.row.ReqAbility1.set(0);
        this.owner.row.ReqAbility2.set(0);
        this.owner.row.ReqAbility3.set(0);
    }

    add(ability: number) {
        if(this.owner.row.ReqAbility1.get()===0) {
            this.owner.row.ReqAbility1.set(ability);
        } else if(this.owner.row.ReqAbility2.get()===0) {
            this.owner.row.ReqAbility2.set(ability);
        } else if(this.owner.row.ReqAbility3.get()===0) {
            this.owner.row.ReqAbility3.set(ability);
        } else {
            throw new Error(`No more slots for Required abilities (Max is 3)`);
        }
        return this.owner;
    }

    getIndex(index: number) {
        return this.getCell(index).get();
    }

    setIndex(index: number, value: number) {
        this.getCell(index).set(value);
        return this.owner;
    }
}

export class TrainerSpell extends Subsystem<Trainer>{
    readonly row: trainer_spellRow

    constructor(owner: Trainer, row: trainer_spellRow) {
        super(owner);
        this.row = row;

    }

    get Spell() { return this.row.SpellId.get(); }
    get Cost() { return this.wrap(this.row.MoneyCost); }
    get RequiredSkillLine() { return this.wrap(this.row.ReqSkillLine); }
    get RequiredSkillRank() { return this.wrap(this.row.ReqSkillRank); }
    get RequiredAbilites() { return new RequiredAbilities(this); }
    get RequiredLevel() { return this.wrap(this.row.ReqLevel); }
}

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

export class Trainer {
    get ID() { return this.row.Id.get(); }
    readonly row: trainerRow;
    constructor(row: trainerRow) {
        this.row = row;
    }

    get Spells() { return SQL.trainer_spell.filter({TrainerId: this.ID}).map(x=>new TrainerSpell(this, x)); }
    get Greeting() { return new TrainerLoc(this); }
    addSpell(spellId: number,cost = 0, reqLevel = 0, reqSkillLine = 0, reqSkillRank = 0, reqAbility1 = 0, reqAbility2 = 0, reqAbility3 = 0) {
        return new TrainerSpell(this, SQL.trainer_spell.add(this.ID, spellId)
            .MoneyCost.set(cost)
            .ReqLevel.set(reqLevel)
            .ReqSkillLine.set(reqSkillLine)
            .ReqSkillRank.set(reqSkillRank)
            .ReqLevel.set(reqLevel)
            .ReqAbility1.set(reqAbility1)
            .ReqAbility2.set(reqAbility2)
            .ReqAbility3.set(reqAbility3));
    }
}

export const Trainers = {
    /**
     * @param classRequired Set to 0 for no class requirement
     */
    create(classRequired = 0, type = 0, loc: loc_constructor = {}) {
        return new Trainer(SQL.trainer.add(Ids.Trainer.id())
                .Requirement.set(classRequired)
                .Type.set(type))
            .Greeting.read(loc)
    },

    load(id: number) {
        return new Trainer(SQL.trainer.find({Id:id}));
    }
}