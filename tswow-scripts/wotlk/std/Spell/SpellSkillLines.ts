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
import { DBC } from "wotlkdata";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMask, makeMaskCell32, MaskCellWrite, MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { SkillLineAbilityQuery, SkillLineAbilityRow } from "wotlkdata/wotlkdata/dbc/types/SkillLineAbility";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { ClassRaceMaskEntry } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RaceMask } from "../Race/RaceType";
import { RegistryDynamic } from "../Refs/Registry";
import { SkillLineRegistry } from "../SkillLines/SkillLines";
import { Spell } from "./Spell";
import { SpellRegistry } from "./Spells";

export class TrivialSkillLineRank extends CellSystem<SkillLineAbility> {
    get High() { return this.ownerWrap(this.owner.row.TrivialSkillLineRankHigh); }
    get Low() { return this.ownerWrap(this.owner.row.TrivialSkillLineRankLow); }
    set(low: number, high: number) {
        this.Low.set(low);
        this.High.set(high);
        return this.owner;
    }
}

export enum AcquireMethod {
      TRAINER          = 0
    , LEARN_WITH_SKILL = 1
    , LEARN_ON_CREATE  = 2
}

export class SkillLineAbility extends ClassRaceMaskEntry<SkillLineAbilityRow> {
    get ClassMask(): MaskCellWrite<this,typeof ClassMask> {
        return makeMaskCell32(ClassMask, this, this.row.ClassMask);
    }
    get RaceMask(): MaskCellWrite<this,typeof RaceMask> {
        return makeMaskCell32(RaceMask, this, this.row.RaceMask);
    }
    get ID() { return this.row.ID.get(); }
    get ClassMaskForbidden() {
        return makeMaskCell32(ClassMask, this, this.row.ClassMaskForbidden);
    }
    get MinSkillRank() { return this.wrap(this.row.MinSkillLineRank); }

    /** The spell this spell is superceded by */
    get SupercededBy() { return this.wrap(this.row.SupercededBySpell); }
    get AcquireMethod() {
        return makeEnumCell(AcquireMethod, this, this.row.AcquireMethod)
    }
    get TrivialRank() { return new TrivialSkillLineRank(this); }
    get SkillLine() { return this.wrap(this.row.SkillLine); }
    get CharacterPoints() { return this.wrapArray(this.row.CharacterPoints); }
    get Spell() { return SpellRegistry.ref(this, this.row.Spell); }
}

export class SpellSkillLineAbilites extends MultiRowSystem<SkillLineAbility,Spell> {
    static getAllRows(slas: SpellSkillLineAbilites) {
        return slas.getAllRows();
    }

    protected getAllRows(): SkillLineAbility[] {
        return DBC.SkillLineAbility
            .queryAll({Spell: this.owner.ID})
            .map(x=>new SkillLineAbility(x));
    }

    protected isDeleted(value: SkillLineAbility): boolean {
        return value.row.isDeleted()
    }

    constructor(owner: Spell) {
        super(owner);
    }

    enable(cls: MaskCon<keyof typeof ClassMask>, race: MaskCon<keyof typeof RaceMask>) {
        let skills: number[] = []

        this.forEach(x=>{
            x.ClassMask.add(cls)
            x.ClassMaskForbidden.remove(cls)
            x.RaceMask.add(race)
            if(!skills.includes(x.SkillLine.get())) {
                skills.push(x.SkillLine.get())
            }
        })

        skills.forEach(x=>{
            SkillLineRegistry.load(x)
                .RaceClassInfos.forEach(x=>{
                    x.ClassMask.add(cls)
                     .RaceMask.add(race)
                })
        })
    }

    clearClass(cls: MaskCon<keyof typeof ClassMask>) {
        this.forEach(x=>{
            x.ClassMask.set(cls,'NOT')
        })
        return this;
    }

    clearRace(race: MaskCon<keyof typeof RaceMask>) {
        this.forEach(x=>{
            x.RaceMask.set(race,'NOT')
        })
        return this;
    }

    add(
          skillLine: number
        , classes?: MaskCon<keyof typeof ClassMask>
        , races?: MaskCon<keyof typeof RaceMask>
    ) {
        this.addGet(skillLine,classes,races)
        return this.owner;
    }

    addMod(
        skillLine: number
      , classes: MaskCon<keyof typeof ClassMask>
      , races: MaskCon<keyof typeof RaceMask>
      , callback: (sla: SkillLineAbility)=>void = ()=>{}
      )
      {
        callback(this.addGet(skillLine,classes,races));
        return this.owner;
      }

    addGet(
          skillLine: number = 0
        , classes?: MaskCon<keyof typeof ClassMask>
        , races?: MaskCon<keyof typeof RaceMask>
    ) {
        let row = DBC.SkillLineAbility.add(Ids.SkillLineAbility.id())
        let sla = new SkillLineAbility(row
            .SkillLine.set(skillLine)
            .ClassMask.set(makeMask(ClassMask,classes))
            .RaceMask.set(makeMask(RaceMask,races))
            .Spell.set(this.owner.ID));
        return sla;
    }
}

export class SkillLineAbilityRegistryClass
    extends RegistryDynamic<
          SkillLineAbility
        , SkillLineAbilityRow
        , SkillLineAbilityQuery
    >
{
    protected Table(): Table<any, SkillLineAbilityQuery, SkillLineAbilityRow> & { add: (id: number) => SkillLineAbilityRow; } {
        return DBC.SkillLineAbility
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SkillLineAbility
    }
    Clear(entity: SkillLineAbility): void {
        entity.AcquireMethod.set(1)
              .SkillLine.set(0)
              .CharacterPoints.fill(0)
              .ClassMask.set(0)
              .ClassMaskForbidden.set(0)
              .MinSkillRank.set(0)
              .RaceMask.set(0)
              .SkillLine.set(0)
              .Spell.set(0)
              .SupercededBy.set(0)
              .TrivialRank.set(0,0)
    }
    protected FindByID(id: number): SkillLineAbilityRow {
        return DBC.SkillLineAbility.query({ID:id});
    }
    protected EmptyQuery(): SkillLineAbilityQuery {
        return {}
    }
    ID(e: SkillLineAbility): number {
        return e.ID
    }
    protected Entity(r: SkillLineAbilityRow): SkillLineAbility {
        return new SkillLineAbility(r);
    }
}

export const SkillLineAbilityRegistry = new SkillLineAbilityRegistryClass();