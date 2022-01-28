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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { EnumCellTransform, makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMaskCell32, MaskCellWrite } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { Language } from "wotlkdata/wotlkdata/dbc/Localization";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { trainerQuery, trainerRow } from "wotlkdata/wotlkdata/sql/types/trainer";
import { trainer_spellRow } from "wotlkdata/wotlkdata/sql/types/trainer_spell";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { ClassRaceMaskSystemBase, IClassRaceMaskEntry } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask, ClassRegistry } from "../Class/ClassRegistry";
import { ArrayRefSystem } from "../Misc/ArrayRefSystem";
import { MainEntity, TransformedEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MoneyCell } from "../Misc/MoneyCell";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RaceIDs, RaceMask } from "../Race/RaceType";
import { RegistryDynamic } from "../Refs/Registry";
import { SkillLineRegistry } from "../SkillLines/SkillLines";
import { SpellRegistry } from "../Spell/Spells";
import { SkillLineAbilityRegistry } from "../Spell/SpellSkillLines";

export class TrainerLoc extends SQLLocSystem<TrainerBase> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.Greeting;
    }

    protected getLoc(loc: Language): Cell<string, any> {
        const old = SQL.trainer_locale.query({Id: this.owner.ID, locale: loc})
        if(old!==undefined) {
            return old.Greeting_lang;
        }
        return SQL.trainer_locale.add(this.owner.ID, loc).Greeting_lang;
    }
}

export class TrainerRequirementType extends EnumCellTransform<TrainerBase> {
    private clearRow() {
        return this.owner.row.Requirement.set(0)
    }
    get CLASS()      {
        return this.value(0,()=>new TrainerClass(this.clearRow()))
    }
    /**
     * Used for mounts. Sometimes referred to as "Mount" trainers.
     */
    get RACE()      {
        return this.value(1,()=>new TrainerRace(this.clearRow()))
    }
    get SPELL()      {
        return this.value(2,()=>new TrainerSpellReq(this.clearRow()))
    }
}

export class SkillRequirement extends CellSystem<TrainerSpell> {
    get Skill() {
        return SkillLineRegistry.ref(this.owner, this.owner.row.ReqSkillLine)
    }

    get Rank() {
        return this.ownerWrap(this.owner.row.ReqSkillRank);
    }

    set(skill: number, rank: number = 0) {
        this.Skill.set(skill);
        this.Rank.set(rank);
        return this.owner;
    }
}

export class TrainerSpell extends MainEntity<trainer_spellRow> implements IClassRaceMaskEntry {
    get Spell() { return SpellRegistry.readOnlyRef(this, this.row.SpellId); }
    get Trainer() { return TrainerRegistry.readOnlyRef(this, this.row.TrainerId); }
    get Cost() { return new MoneyCell(this, 'COPPER', this.row.MoneyCost); }
    get RequiredLevel() { return this.wrap(this.row.ReqLevel); }

    get ClassMask(): MaskCellWrite<this,typeof ClassMask> {
        return makeMaskCell32(ClassMask, this,this.wrapUnlock(this.row.classMask));
    }
    get RaceMask(): MaskCellWrite<this,typeof RaceMask> {
        return makeMaskCell32(RaceMask, this,this.wrapUnlock(this.row.raceMask));
    }

    get RequiredSkill() {
        return new SkillRequirement(this);
    }

    get ReqAbilities() {
        return new ArrayRefSystem(this, 0, 3
            , (i)=> {
                if(i<0||i>2) {
                    throw new Error(
                          `Required ability index out of range:`
                        + ` must be between 0 and 2`
                    )
                }
                return SkillLineAbilityRegistry
                    .ref(this
                        ,     i==0
                            ? this.row.ReqAbility1
                            : i==1
                            ? this.row.ReqAbility2
                            : this.row.ReqAbility3
                        )
            }
        )
    }
}

export class TrainerSpells extends ClassRaceMaskSystemBase<TrainerSpell,TrainerBase> {
    protected getAllRows(): TrainerSpell[] {
        return SQL.trainer_spell
            .queryAll({TrainerId:this.owner.ID})
            .map(x=>new TrainerSpell(x))
    }
    protected isDeleted(value: TrainerSpell): boolean {
        return value.row.isDeleted();
    }

    add(spellId: number,cost = 0, reqLevel = 0, reqSkillLine = 0, reqSkillRank = 0, reqAbilities: number[] = []) {
        if(reqSkillLine===0) {
            const sla = SpellRegistry.load(spellId).SkillLines.getIndex(0);
            if(sla!==undefined) {
                reqSkillLine = sla.SkillLine.get();
            }
        }
        SQL.trainer_spell.add(this.owner.ID, spellId)
            .MoneyCost.set(cost)
            .ReqLevel.set(reqLevel)
            .ReqSkillLine.set(reqSkillLine)
            .ReqSkillRank.set(reqSkillRank)
            .ReqLevel.set(reqLevel)
            .ReqAbility1.set(reqAbilities[0]||0)
            .ReqAbility2.set(reqAbilities[1]||0)
            .ReqAbility3.set(reqAbilities[2]||0)
            .VerifiedBuild.set(17688);
        return this.owner;
    }

    addGet(spellId: number) {
        return new TrainerSpell(
                SQL.trainer_spell.add(this.owner.ID,spellId)
                   .VerifiedBuild.set(17688)
            )
            .Cost.set(0)
            .ReqAbilities.clearAll()
            .RequiredLevel.set(0)
    }

    addMod(spellId: number, callback: (spells: TrainerSpell)=>void) {
        callback(this.addGet(spellId));
        return this.owner;
    }
}

export class TrainerBase extends TransformedEntity<trainerRow,TrainerPlain> {
    protected transformer(): EnumCellTransform<any> {
        return this.RequirementType;
    }
    protected default(): TrainerPlain {
        return new TrainerPlain(this.row);
    }

    get ID() { return this.row.Id.get(); }
    get Greeting(): TrainerLoc { return new TrainerLoc(this); }
    /**
     * What type of primary requirement this trainer has. None by defualt.
     *
     * - Note that ClassMask/RaceMask fields can be used and
     *   will be applied regardless of trainer type.
     */
    get RequirementType() { return new TrainerRequirementType(this,this.row.Type); }
    get Spells() { return new TrainerSpells(this); }
    get ClassMask() {
        return makeMaskCell32(ClassMask, this,this.row.classMask);
    }
    get RaceMask() {
        return makeMaskCell32(RaceMask, this,this.row.raceMask);
    }
}

export class TrainerPlain extends TrainerBase {
    get Requirement() { return this.wrap(this.row.Requirement); }
}

export class TrainerClass extends TrainerBase {
    get RequiredClass() {
        return ClassRegistry.ref(this, this.row.Requirement);
    }
}

export class TrainerRace extends TrainerBase {
    get RequiredRace() {
        return makeEnumCell(RaceIDs, this, this.row.Requirement);
    }
}

export class TrainerSpellReq extends TrainerBase {
    get RequiredSpell() {
        return SpellRegistry.ref(this, this.row.Requirement);
    }
}

export class TrainerRegistryClass
    extends RegistryDynamic<TrainerPlain,trainerRow,trainerQuery>
{
    protected Table(): Table<any, trainerQuery, trainerRow> & { add: (id: number) => trainerRow; } {
        return SQL.trainer
    }
    protected ids(): DynamicIDGenerator {
        return Ids.Trainer
    }
    Clear(entity: TrainerPlain): void {
        entity
            .Greeting.clear()
            .RequirementType.SPELL.set()
            .RequiredSpell.set(0)
            .row
                .Requirement.set(0)
    }
    protected Clone(entity: TrainerPlain, parent: TrainerPlain): void {
        parent.Spells.forEach(x=>x.row.clone(entity.ID,x.Spell.get()))
    }
    protected FindByID(id: number): trainerRow {
        return SQL.trainer.query({Id:id});
    }
    protected EmptyQuery(): trainerQuery {
        return {}
    }
    ID(e: TrainerPlain): number {
        return e.ID
    }
    protected Entity(r: trainerRow): TrainerPlain {
        return new TrainerPlain(r);
    }
}

export const TrainerRegistry = new TrainerRegistryClass();