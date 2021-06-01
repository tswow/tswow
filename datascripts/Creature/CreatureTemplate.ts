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
import { Language } from "wotlkdata/dbc/Localization";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { creature_templateRow } from "wotlkdata/sql/types/creature_template";
import { Position } from "../Misc/Position";
import { AttachedScript } from "../SmartScript/AttachedScript";
import { SmartScripts } from "../SmartScript/SmartScript";
import { CreatureAI } from "./CreatureAI";
import { CreatureAttackTime } from "./CreatureAttackTime";
import { CreatureDamageSchool } from "./CreatureDamageSchool";
import { CreatureFamily } from "./CreatureFamily";
import { CreatureGold } from "./CreatureGold";
import { CreatureIconNames } from "./CreatureIconNames";
import { CreatureLevel } from "./CreatureLevel";
import { CreatureName, CreatureSubname } from "./CreatureLoc";
import { MechanicImmunity } from "./CreatureMechanicImmunity";
import { CreatureModels } from "./CreatureModels";
import { CreatureMovementSpeed } from "./CreatureMovementSpeed";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreatureQuestgiver } from "./CreatureQuestGiver";
import { CreatureRank } from "./CreatureRank";
import { CreatureInstances } from "./Creatures";
import { CreatureStats } from "./CreatureStats";
import { CreatureTypeEnum } from "./CreatureType";
import { CreatureTypeFlags } from "./CreatureTypeFlags";
import { DynFlags } from "./DynFlags";
import { NPCFlags } from "./NPCFlags";
import { Trainer, TrainerLoc } from "../Trainer/Trainer";
import { UnitClass } from "./UnitClass";
import { CreatureVendor } from "./CreatureVendor";
import { GOCreature } from "../Misc/GOorCreature";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { Ids } from "../Misc/Ids";
import { Gossips } from "../Gossip/Gossips";
import { UnitFlags } from "./UnitFlags";
import { SchoolMask } from "../Misc/School";
import { CreatureFactionTemplate } from "./CreatureFactionTemplate";
import { SharedRefs } from "../Refs/SharedRefs";
import { AttachedLootSet } from "../Loot/Loot";
import { CreatureInstance } from "./CreatureInstance";
import { Gossip } from "../Gossip/Gossip";

function creatureLoc(id: number, lang: Language) {
    const old = SQL.creature_template_locale.find({entry:id, locale:lang});
    if(old) {
        return old;
    }
    return SQL.creature_template_locale.add(id, lang);
}

export class CreatureTemplate extends GOCreature<creature_templateRow> {
    get ID() { return this.row.entry.get(); }
    get Name() { return new CreatureName(this); }
    get Subname() { return new CreatureSubname(this); }

    get Scripts() { 
        return new AttachedScript(()=>{
            this.row.AIName.set('SmartAI');
            return SmartScripts.creature(this.ID, this);
        })
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
    get DynamicFlags() { return this.wrap(this.row.dynamicflags); }
    get DungeonHeroicID() { return this.wrap(this.row.difficulty_entry_1); }
    get RaidNormal25ID() { return this.wrap(this.row.difficulty_entry_1); }
    get RaidHeroic10ID() { return this.wrap(this.row.difficulty_entry_2); }
    get RaidHeroic25ID() { return this.wrap(this.row.difficulty_entry_3); }
    get Models() { return new CreatureModels(this); }
    get Icon() { return new CreatureIconNames(this); }
    get Gossip() { 
        return new Gossip(this, this, this.row.gossip_menu_id);
    }
    get Level() { return new CreatureLevel(this);}
    get MovementSpeed() { return new CreatureMovementSpeed(this); }
    get Scale() { return this.wrap(this.row.scale); }
    get Rank() { return new CreatureRank(this); }
    get DamageSchool() { return new CreatureDamageSchool(this, this.row.dmgschool); }
    get AttackTime() { return new CreatureAttackTime(this); }
    get Family() { return new CreatureFamily(this, this.row.family); }
    get PetSpells() { return this.wrap(this.row.PetSpellDataId); }
    get VehicleID() { return this.wrap(this.row.VehicleId); }
    get Gold() { return new CreatureGold(this); }
    get AIName() { return new CreatureAI(this); }
    get MovementType() { return new CreatureMovementType(this, this.row.MovementType); }
    get HoverHeight() { return this.wrap(this.row.HoverHeight); }
    get Stats() { return new CreatureStats(this); }
    get RacialLeader() { return this.wrap(this.row.RacialLeader); }
    get MovementID() { return this.wrap(this.row.movementId); }
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
        return new Trainer(this,trainerRow, ctrow); 
    }
    get Vendor() { return new CreatureVendor(this); }

    get NormalLoot() { return SharedRefs.getOrCreateLoot(this, 
        new AttachedLootSet(this, 
            this.row.lootid, 
            Ids.CreatureLoot, 
            SQL.creature_loot_template))
    }

    get PickpocketLoot() { return SharedRefs.getOrCreateLoot(this,
        new AttachedLootSet(this,
            this.row.pickpocketloot,
            Ids.PickPocketLoot,
            SQL.pickpocketing_loot_template))
    }

    get SkinningLoot() { return SharedRefs.getOrCreateLoot(this,
        new AttachedLootSet(this, 
            this.row.skinloot, 
            Ids.SkinningLoot, 
            SQL.skinning_loot_template))
    }

    addVendorItem(item: number, maxcount = 0, incrTime = 0, extendedCostId = 0) {
        this.NPCFlags.Vendor.mark();
        this.Vendor.addItem(item,maxcount,incrTime,extendedCostId);
        return this;
    }

    addTrainerSpell(spellId: number, cost = 0, reqLevel = 0, reqSkillLine = 0, reqSkillRank = 0, reqAbilities: number[] = []) {
        this.NPCFlags.Trainer.mark();
        this.Trainer.addSpell(spellId,cost,reqLevel,reqSkillLine,reqSkillRank,reqAbilities);
        return this;
    }

    get TrainerClass() { return this.wrap(this.Trainer.trainerRow.Requirement); }
    get TrainerType() { return this.wrap(this.Trainer.trainerRow.Type); }
    get TrainerGreeting() { return new TrainerLoc<this>(this, this.Trainer); }

    spawn(mod: string, id: string, pos: Position) {
        return new CreatureInstance(this, CreatureInstances.create(mod, id, this.ID, pos).row);
    }

    protected isCreature(): boolean {
        return true;
    }

    protected isGameObject(): boolean {
        return false;
    }
}