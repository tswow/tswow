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
import { SQL } from "wotlkdata/sql/SQLFiles";
import { creature_templateRow } from "wotlkdata/sql/types/creature_template";
import { creature_template_addonRow } from "wotlkdata/sql/types/creature_template_addon";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { GossipRegistry } from "../Gossip/Gossips";
import { LootSetPointer } from "../Loot/Loot";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { SchoolMask } from "../Misc/School";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { AttachedScript } from "../SmartScript/AttachedScript";
import { SmartScripts } from "../SmartScript/SmartScript";
import { TrainerRegistry } from "../Trainer/Trainer";
import { VehicleRegistry } from "../Vehicle/Vehicle";
import { VehicleTemplateAccessories } from "../Vehicle/VehicleAccessory";
import { CreatureAI } from "./CreatureAI";
import { CreatureAttackTime } from "./CreatureAttackTime";
import { CreatureDamageSchool } from "./CreatureDamageSchool";
import { CreatureFactionTemplate } from "./CreatureFactionTemplate";
import { CreatureFamily } from "./CreatureFamily";
import { CreatureGold } from "./CreatureGold";
import { CreatureIconNames } from "./CreatureIconNames";
import { CreatureInstance } from "./CreatureInstance";
import { CreatureLevel } from "./CreatureLevel";
import { CreatureName, CreatureSubname } from "./CreatureLoc";
import { MechanicImmunity } from "./CreatureMechanicImmunity";
import { CreatureModels } from "./CreatureModels";
import { CreatureMovementSpeed } from "./CreatureMovementSpeed";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreatureQuestgiver } from "./CreatureQuestGiver";
import { CreatureRank } from "./CreatureRank";
import { CreatureInstanceRegistry, CreatureTemplateRegistry } from "./Creatures";
import { CreatureStats } from "./CreatureStats";
import { CreatureTypeEnum } from "./CreatureType";
import { CreatureTypeFlags } from "./CreatureTypeFlags";
import { CreatureVendor } from "./CreatureVendor";
import { DynFlags } from "./DynFlags";
import { NPCFlags } from "./NPCFlags";
import { UnitClass } from "./UnitClass";
import { UnitFlags } from "./UnitFlags";

export class CreatureTemplateAddon extends MaybeSQLEntity<CreatureTemplate, creature_template_addonRow> {
    protected createSQL(): creature_template_addonRow {
        return SQL.creature_template_addon.add(this.owner.ID);
    }
    protected findSQL(): creature_template_addonRow {
        return SQL.creature_template_addon.find({entry:this.owner.ID});
    }
    protected isValidSQL(sql: creature_template_addonRow): boolean {
        return sql.entry.get() === this.owner.ID;
    }

    get Auras()  { return this.wrapSQL('',sql=>sql.auras); }
    get Bytes1() { return this.wrapSQL(0,sql=>sql.bytes1); }
    get Bytes2() { return this.wrapSQL(0,sql=>sql.bytes2); }
    get Emote()  { return this.wrapSQL(0,sql=>sql.emote); }
    get Mount()  { return this.wrapSQL(0,sql=>sql.mount); }
    get Path()   { return this.wrapSQL(0,sql=>sql.path_id); }
    get VisibilityDistanceType() { return this.wrapSQL(0,sql=>sql.visibilityDistanceType); }
}

export class CreatureTemplate extends MainEntity<creature_templateRow> {
    get ID() { return this.row.entry.get(); }
    get Name() { return new CreatureName(this); }
    get Subname() { return new CreatureSubname(this); }
    get Scripts() {
        return new AttachedScript(this, ()=>{
            this.row.AIName.set('SmartAI');
            return SmartScripts.creature(this.ID);
        })
    }

    protected readonly Addon = new CreatureTemplateAddon(this);
    addonExists() { return this.Addon.exists() }
    addonRow()    { return this.Addon.sqlRow() }
    get Auras()   { return this.Addon.Auras; }
    get Bytes1()  { return this.Addon.Bytes1 }
    get Bytes2()  { return this.Addon.Bytes2 }
    get Emote()   { return this.Addon.Emote }
    get Mount()   { return this.Addon.Mount }
    get Path()    { return this.Addon.Path }
    get VisibilityDistanceType() {
        return this.Addon.VisibilityDistanceType
    }


    /**
     * What expansion the creatures health is taken from, values are from 0-2
     */
    get HealthExpansion() { return this.wrap(this.row.exp); }

    /**
     * ID of the Faction template this creature belongs to
     */
    get FactionTemplate() { return new CreatureFactionTemplate(this, this.row.faction); }

    /**
     * - 0 = does not regenerate health
     * - 1 = regenerates health
     */
    get RegenHealth() { return this.wrap(this.row.RegenHealth); }

    get Questgiver() { return new CreatureQuestgiver(this);}
    get NPCFlags() { return new NPCFlags(this, this.row.npcflag); }
    get Type() { return new CreatureTypeEnum(this, this.row.type); }
    get TypeFlags() { return new CreatureTypeFlags(this, this.row.type_flags); }
    get DynFlags() { return new DynFlags(this, this.row.dynamicflags); }
    get UnitFlags() { return new UnitFlags(this); }
    get FlagsExtra() { return this.wrap(this.row.flags_extra); }
    get UnitClass() { return new UnitClass(this, this.row.unit_class); }
    get DynamicFlags() { return CreatureTemplateRegistry.ref(this, this.row.dynamicflags); }
    get DungeonHeroic() { return CreatureTemplateRegistry.ref(this, this.row.difficulty_entry_1); }
    get RaidNormal25() { return CreatureTemplateRegistry.ref(this, this.row.difficulty_entry_1); }
    get RaidHeroic10() { return CreatureTemplateRegistry.ref(this, this.row.difficulty_entry_2); }
    get RaidHeroic25() { return CreatureTemplateRegistry.ref(this, this.row.difficulty_entry_3); }
    get Models() { return new CreatureModels(this); }
    get Icon() { return new CreatureIconNames(this); }
    get Gossip() {
        return GossipRegistry.ref(this, this.row.gossip_menu_id);
    }
    get Level() { return new CreatureLevel(this);}
    get MovementSpeed() { return new CreatureMovementSpeed(this); }
    get Scale() { return this.wrap(this.row.scale); }
    get Rank() { return new CreatureRank(this); }
    get DamageSchool() { return new CreatureDamageSchool(this, this.row.dmgschool); }
    get AttackTime() { return new CreatureAttackTime(this); }
    get Family() { return new CreatureFamily(this, this.row.family); }
    get PetSpells() { return this.wrap(this.row.PetSpellDataId); }
    get Vehicle() { return VehicleRegistry.ref(this, this.row.VehicleId); }
    get Gold() { return new CreatureGold(this); }
    get AIName() { return new CreatureAI(this); }
    get MovementType() { return new CreatureMovementType(this, this.row.MovementType); }
    get HoverHeight() { return this.wrap(this.row.HoverHeight); }
    get Stats() { return new CreatureStats(this); }
    get RacialLeader() { return this.wrap(this.row.RacialLeader); }
    get Movement() { return this.wrap(this.row.movementId); }
    get MechanicImmunity() { return new MechanicImmunity(this, this.row.mechanic_immune_mask); }
    get SpellSchoolImmunity() { return new SchoolMask(this,this.row.spell_school_immune_mask); }
    get Trainer() {
        let ctrow = SQL.creature_default_trainer.find({CreatureId:this.ID});
        let trainerRow : trainerRow;
        if(ctrow === undefined) {
            trainerRow = SQL.trainer.add(Ids.Trainer.id())
            ctrow = SQL.creature_default_trainer.add(this.ID)
                .TrainerId.set(trainerRow.Id.get());
        } else {
            trainerRow = SQL.trainer.find({Id: ctrow.TrainerId.get()});
        }
        return TrainerRegistry.readOnlyRef(this,ctrow.TrainerId);
    }
    get Vendor() { return new CreatureVendor(this); }

    get NormalLoot() {
        return new LootSetPointer(
              this
            , this.row.lootid
            , SQL.creature_loot_template
            , Ids.creature_loot_template
            )
    }

    get PickpocketLoot() {
        return new LootSetPointer(
            this
          , this.row.pickpocketloot
          , SQL.pickpocketing_loot_template
          , Ids.pickpocketing_loot_template
          )
    }

    get SkinningLoot() {
        return new LootSetPointer(
            this
          , this.row.skinloot
          , SQL.skinning_loot_template
          , Ids.skinning_loot_template
          )
    }

    get VehicleAccessories() {
        return new VehicleTemplateAccessories(this)
    }

    spawn(mod: string, id: string, pos: Position) {
        return CreatureInstanceRegistry.create(mod, id, this.ID).Position.set(pos);
    }

    spawnMod(mod: string, id: string, pos: Position, callback: (instance: CreatureInstance)=>void = ()=>{}) {
        callback(this.spawn(mod,id,pos));
        return this;
    }

    protected isCreature(): boolean {
        return true;
    }

    protected isGameObject(): boolean {
        return false;
    }
}