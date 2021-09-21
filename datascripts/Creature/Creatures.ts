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
import { SQL } from "wotlkdata/sql/SQLFiles";
import { creatureQuery, creatureRow } from "wotlkdata/sql/types/creature";
import { creature_templateQuery, creature_templateRow } from "wotlkdata/sql/types/creature_template";
import { Table } from "wotlkdata/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase, RegistryStatic } from "../Refs/Registry";
import { CreatureInstance } from "./CreatureInstance";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureTemplateRegistryClass
    extends RegistryStatic<
      CreatureTemplate
    , creature_templateRow
    , creature_templateQuery
    >
{
    protected Table(): Table<any, creature_templateQuery, creature_templateRow> & { add: (id: number) => creature_templateRow; } {
        return SQL.creature_template
    }
    protected IDs(): StaticIDGenerator {
        return Ids.creature_template
    }
    Clear(r: CreatureTemplate): void {
        r
            .Icon.setNone()
            .Level.set(1,1)
            .MechanicImmunity.clearAll()
            .Models.clearAll()
            .Movement.set(0)
            .MovementSpeed.set(1,1.14)
            .MovementType.Idle.set()
            .NPCFlags.clearAll()
            .PetSpells.set(0)
            .RacialLeader.set(0)
            .RaidHeroic10.set(0)
            .RaidHeroic25.set(0)
            .RaidNormal25.set(0)
            .Rank.setNormal()
            .RegenHealth.set(1)
            .Scale.set(1)
            .SpellSchoolImmunity.clearAll()
            .Stats.set(1,1,1,1,1)
            .Subname.enGB.set('')
            .Type.Humanoid.set()
            .TypeFlags.clearAll()
            .UnitClass.Warrior.set()
            .UnitFlags.clearAll()
            .Vehicle.set(0)
            .AIName.ReactorAI()
            .AttackTime.set(1,1,1,1)
            .DamageSchool.Normal.set()
            .DungeonHeroic.set(0)
            .DynFlags.clearAll()
            .DynamicFlags.set(0)
            .FactionTemplate.NeutralPassive.set()
            .Family.set(0)
            .FlagsExtra.set(0)
            .Gold.set(0)
            .HealthExpansion.set(0)
            .HoverHeight.set(0)
    }
    protected Clone(mod: string, id: string, r: CreatureTemplate, parent: CreatureTemplate): void {
        if(parent.addonExists()) {
            parent.addonRow().clone(r.ID);
        }
    }
    protected Entity(r: creature_templateRow): CreatureTemplate {
        return new CreatureTemplate(r);
    }
    protected FindByID(id: number): creature_templateRow {
        return SQL.creature_template.find({entry:id});
    }
    protected EmptyQuery(): creature_templateQuery {
        return {}
    }
    ID(e: CreatureTemplate): number {
        return e.ID;
    }
}
export const CreatureTemplateRegistry = new CreatureTemplateRegistryClass()

export class CreatureInstanceRegistryGreg
    extends RegistryRowBase<CreatureInstance,creatureRow,creatureQuery>
    {
    protected FindByID(id: number): creatureRow {
        return SQL.creature.find({guid:id});
    }
    protected EmptyQuery(): creatureQuery {
        return {}
    }
    ID(e: CreatureInstance): number {
        return e.ID
    }
    protected Table(): Table<any, creatureQuery, creatureRow> {
        return SQL.creature
    }
    protected Entity(r: creatureRow): CreatureInstance {
        return new CreatureInstance(r);
    }

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this)
    }

    private create(id: number, parent: number, build: number) {
        let row: creatureRow
        if(parent > 0) {
            row = SQL.creature.find({guid:parent}).clone(id)
        } else {
            row = SQL.creature.add(id)
                .curhealth.set(1)
                .curmana.set(0)
                .currentwaypoint.set(0)
                .MovementType.set(0)
                .modelid.set(0)
                .npcflag.set(0)
                .wander_distance.set(0)
                .spawnMask.set(1)
                .VerifiedBuild.set(build)
        }
        return new CreatureInstance(row);
    }

    createStatic(mod: string, id: string, parent = 0) {
        return this.create(Ids.CreatureInstance.id(mod,id),parent,17688);
    }

    createDynamic(parent = 0) {
        return this.create(Ids.CreatureInstance.dynamicId(),parent,17689);
    }
}

export const CreatureInstanceRegistry = new CreatureInstanceRegistryGreg();