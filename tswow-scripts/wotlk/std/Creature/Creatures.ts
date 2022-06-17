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
import { Table } from "../../../data/table/Table";
import { CreatureQuery, CreatureRow } from "../../custom_dbc/Creature";
import { CreatureTemplateQuery, CreatureTemplateRow } from "../../custom_dbc/CreatureTemplate";
import { DBC } from "../../DBCFiles";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { CREATURE_DEFAULT_SPAWNTIME } from "./CreatureDefines";
import { CreatureInstance } from "./CreatureInstance";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureTemplateRegistryClass
    extends RegistryStatic<
      CreatureTemplate
    , CreatureTemplateRow
    , CreatureTemplateQuery
    >
{
    protected Table(): Table<any, CreatureTemplateQuery, CreatureTemplateRow> & { add: (id: number) => CreatureTemplateRow; } {
        return DBC.CreatureTemplate
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
            .NormalLoot.set(0)
            .SkinningLoot.set(0)
            .PickpocketLoot.set(0)
    }
    protected Clone(mod: string, id: string, child: CreatureTemplate, parent: CreatureTemplate): void {
        if(parent.AddonRow.exists()) {
            parent.AddonRow.get().clone(child.ID);
        }
        parent.Vendor.forEach((item)=>{
            item.row.clone(child.ID,item.Item.get(),item.ExtendedCost.get())
        })
    }
    protected Entity(r: CreatureTemplateRow): CreatureTemplate {
        return new CreatureTemplate(r);
    }
    protected FindByID(id: number): CreatureTemplateRow {
        return DBC.CreatureTemplate.findById(id);
    }
    protected EmptyQuery(): CreatureTemplateQuery {
        return {}
    }
    ID(e: CreatureTemplate): number {
        return e.ID;
    }
}
export const CreatureTemplateRegistry = new CreatureTemplateRegistryClass()

export class CreatureInstanceRegistryClass
extends RegistryStatic<CreatureInstance,CreatureRow,CreatureQuery>
{
    protected Table(): Table<any, CreatureQuery, CreatureRow> & { add: (id: number) => CreatureRow; } {
        return DBC.Creature
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
    }
    protected Clone(mod: string, id: string, r: CreatureInstance, parent: CreatureInstance): void {
        if(parent.AddonRow.exists()) {
            parent.AddonRow.get().clone(r.ID);
        }
    }
    protected Entity(r: CreatureRow): CreatureInstance {
        return new CreatureInstance(r);
    }
    protected FindByID(id: number): CreatureRow {
        return DBC.Creature.findById(id)
    }
    protected EmptyQuery(): CreatureQuery {
        return {}
    }
    ID(e: CreatureInstance): number {
        return e.ID;
    }
}
export const CreatureInstanceRegistry = new CreatureInstanceRegistryClass();