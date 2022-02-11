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
import { SQL } from "../../SQLFiles";
import { creatureQuery, creatureRow } from "../../sql/creature";
import { creature_templateQuery, creature_templateRow } from "../../sql/creature_template";
import { Table } from "../../../data/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { CREATURE_DEFAULT_SPAWNTIME } from "./CreatureDefines";
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
            .MovementType.IDLE.set()
            .NPCFlags.clearAll()
            .PetSpells.set(0)
            .RacialLeader.set(0)
            .Rank.NORMAL.set()
            .RegenHealth.set(1)
            .Scale.set(1)
            .SchoolImmunity.clearAll()
            .Stats.set(1,1,1,1,1)
            .Subname.enGB.set('')
            .Type.HUMANOID.set()
            .TypeFlags.clearAll()
            .UnitClass.WARRIOR.set()
            .UnitFlags.clearAll()
            .Vehicle.set(0)
            .AIName.ReactorAI()
            .AttackTime.set(2000,2000,1,1)
            .DamageSchool.Normal.set()
            .DynFlags.clearAll()
            .DynamicFlags.set(0)
            .FactionTemplate.NEUTRAL_PASSIVE.set()
            .Family.set(0)
            .FlagsExtra.set(0)
            .Gold.set(0)
            .HealthExpansion.set(0)
            .HoverHeight.set(0)
    }
    protected Clone(mod: string, id: string, child: CreatureTemplate, parent: CreatureTemplate): void {
        if(parent.AddonRow.exists()) {
            parent.AddonRow.get().clone(child.ID);
        }
        parent.Vendor.forEach((item)=>{
            item.row.clone(child.ID,item.Item.get(),item.ExtendedCost.get())
        })
    }
    protected Entity(r: creature_templateRow): CreatureTemplate {
        return new CreatureTemplate(r);
    }
    protected FindByID(id: number): creature_templateRow {
        return SQL.creature_template.query({entry:id});
    }
    protected EmptyQuery(): creature_templateQuery {
        return {}
    }
    ID(e: CreatureTemplate): number {
        return e.ID;
    }
}
export const CreatureTemplateRegistry = new CreatureTemplateRegistryClass()

export class CreatureInstanceRegistryClass
extends RegistryStatic<CreatureInstance,creatureRow,creatureQuery>
{
    protected Table(): Table<any, creatureQuery, creatureRow> & { add: (id: number) => creatureRow; } {
        return SQL.creature
    }
    protected IDs(): StaticIDGenerator {
        return Ids.creature
    }
    Clear(r: CreatureInstance): void {
        r.Position.set({map:0,x:0,y:0,z:0,o:0})
        r.row
         .curhealth.set(1)
         .curmana.set(0)
         .currentwaypoint.set(0)
         .MovementType.set(0)
         .modelid.set(0)
         .npcflag.set(0)
         .wander_distance.set(0)
         .spawnMask.set(1)
         .map.set(0)
         .id.set(0)
         .spawntimesecs.set(CREATURE_DEFAULT_SPAWNTIME)
         .unit_flags.set(0)
         .dynamicflags.set(0)
         .zoneId.set(0)
         .areaId.set(0)
         .ScriptName.set('')
         .phaseMask.set(1)
         .equipment_id.set(0)
         .VerifiedBuild.set(17688)
    }
    protected Clone(mod: string, id: string, r: CreatureInstance, parent: CreatureInstance): void {
        if(parent.AddonRow.exists()) {
            parent.AddonRow.get().clone(r.ID);
        }
    }
    protected Entity(r: creatureRow): CreatureInstance {
        return new CreatureInstance(r);
    }
    protected FindByID(id: number): creatureRow {
        return SQL.creature.query({guid:id});
    }
    protected EmptyQuery(): creatureQuery {
        return {}
    }
    ID(e: CreatureInstance): number {
        return e.ID;
    }
}
export const CreatureInstanceRegistry = new CreatureInstanceRegistryClass();