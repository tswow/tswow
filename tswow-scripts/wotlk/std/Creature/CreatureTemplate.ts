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
import { Cell } from "../../../data/cell/cells/Cell";
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SQL } from "../../SQLFiles";
import { creature_templateRow } from "../../sql/creature_template";
import { creature_template_addonRow } from "../../sql/creature_template_addon";
import { CreatureTextRegistry } from "../BroadcastText/CreatureText";
import { FactionTemplateRegistry } from "../Faction/FactionTemplates";
import { GossipRegistry } from "../Gossip/Gossips";
import { getInlineID } from "../InlineScript/InlineScript";
import { LootSetPointer } from "../Loot/Loot";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { SchoolMask } from "../Misc/School";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { RefStatic } from "../Refs/Ref";
import { AttachedScript } from "../SmartScript/AttachedScript";
import { SmartScripts } from "../SmartScript/SmartScript";
import { VehicleRegistry } from "../Vehicle/Vehicle";
import { VehicleTemplateAccessories } from "../Vehicle/VehicleAccessory";
import { VendorItems } from "../Vendor/Vendor";
import { CreatureAI } from "./CreatureAI";
import { CreatureAttackTime } from "./CreatureAttackTime";
import { CreatureDamageSchool } from "./CreatureDamageSchool";
import { CreatureDefaultTrainer } from "./CreatureDefaultTrainer";
import { CREATURE_DEFAULT_SPAWNTIME } from "./CreatureDefines";
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
import { CreatureType } from "./CreatureType";
import { CreatureTypeFlags } from "./CreatureTypeFlags";
import { DynFlags } from "./DynFlags";
import { NPCFlags } from "./NPCFlags";
import { UnitClass } from "./UnitClass";
import { UnitFlags } from "./UnitFlags";

export class CreatureDifficultyRef extends RefStatic<CreatureTemplate,CreatureTemplate> {
    constructor(owner: CreatureTemplate, cell: Cell<number,any>) {
        super(owner,cell,CreatureTemplateRegistry)
    }

    getRefCopyRoot(mod: string, id: string) {
        this.cell.set(this.owner.ID);
        return this.getRefCopy(mod,id)
    }

    modRefCopyRoot(mod: string, id: string, callback: (template: CreatureTemplate)=>void) {
        callback(this.getRefCopyRoot(mod,id));
        return this.owner;
    }
}

export class CreatureDifficulties extends CellSystem<CreatureTemplate> {
    get Heroic5Man() {
        return new CreatureDifficultyRef(
            this.owner, this.owner.row.difficulty_entry_1
        )
    }

    get Normal25man() {
        return new CreatureDifficultyRef(
            this.owner, this.owner.row.difficulty_entry_1
        )
    }

    get Heroic10Man() {
        return new CreatureDifficultyRef(
            this.owner, this.owner.row.difficulty_entry_2
        )
    }

    get Heroic25Man() {
        return new CreatureDifficultyRef(
            this.owner, this.owner.row.difficulty_entry_3
        )
    }
}

export interface CreatureInstancePosition extends Position {
    spawnTime?: number
    wander?: number
}

export class CreatureTemplateInstances extends MultiRowSystem<CreatureInstance,CreatureTemplate>
{
    protected getAllRows(): CreatureInstance[] {
        return SQL.creature.queryAll({id:this.owner.ID})
            .map(x=>new CreatureInstance(x));
    }

    protected isDeleted(value: CreatureInstance): boolean {
        return value.row.isDeleted();
    }

    add(mod: string, id: string, pos: CreatureInstancePosition|CreatureInstancePosition[], callback?: (spawn: CreatureInstance)=>void) {
        this.addGet(mod,id,pos,callback)
        return this.owner;
    }

    addGet(mod: string, id: string, pos: CreatureInstancePosition|CreatureInstancePosition[], callback?: (spawn: CreatureInstance)=>void) {
        if(!Array.isArray(pos)) {
            pos = [pos];
        }
        return pos.map((x,i)=>{
            const inst = CreatureInstanceRegistry
                .create(mod,`${id}-${i}`)
                .Position.set(x)
                .Template.set(this.owner.ID)
                .SpawnTime.set(x.spawnTime || CREATURE_DEFAULT_SPAWNTIME)
                .WanderDistance.set(x.wander||0)
            if(x.wander) {
                inst.MovementType.RANDOM_MOVEMENT.set()
            } else {
                inst.MovementType.IDLE.set()
            }
            if(callback) callback(inst);
            return inst;
        })
    }

    addMod(mod: string, id: string, pos: Position|Position[], callback: (spawn: CreatureInstance)=>void) {
        this.addGet(mod,id,pos).forEach(callback);
        return this.owner;
    }
}

export class CreatureTemplateAddon extends MaybeSQLEntity<CreatureTemplate, creature_template_addonRow> {
    protected createSQL(): creature_template_addonRow {
        return SQL.creature_template_addon.add(this.owner.ID)
            .MountCreatureID.set(0)
            .auras.set('')
            .bytes1.set(0)
            .bytes2.set(0)
            .emote.set(0)
            .mount.set(0)
            .path_id.set(0)
            .visibilityDistanceType.set(0)
    }
    protected findSQL(): creature_template_addonRow {
        return SQL.creature_template_addon.query({entry:this.owner.ID});
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

export class CreatureTemplateAddonRow extends CellSystem<CreatureTemplate> {
    protected readonly Addon = new CreatureTemplateAddon(this.owner);

    get() { return this.Addon.getSQL(); }

    mod(callback: (row: creature_template_addonRow)=>void) {
        callback(this.get());
    }

    exists() { return this.Addon.exists(); }

    static addon(template: CreatureTemplate) {
        return template.AddonRow.Addon
    }
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

    @Transient
    protected get Addon() { return CreatureTemplateAddonRow.addon(this); }
    @Transient
    readonly AddonRow = new CreatureTemplateAddonRow(this);
    get Auras()   { return this.Addon.Auras; }
    get AddonBytes1()  { return this.Addon.Bytes1 }
    get AddonBytes2()  { return this.Addon.Bytes2 }
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
    get FactionTemplate() {
        return FactionTemplateRegistry.ref(this, this.row.faction);
    }

    get InlineScripts() { return getInlineID(this, this.ID, 'CreatureID') as _hidden.Creatures<this> }

    /**
     * - 0 = does not regenerate health
     * - 1 = regenerates health
     */
    get RegenHealth() { return this.wrap(this.row.RegenHealth); }

    get Questgiver() { return new CreatureQuestgiver(this);}
    get NPCFlags() {
        return makeMaskCell32(NPCFlags,this, this.row.npcflag);
    }
    get Type() {
        return makeEnumCell(CreatureType,this, this.row.type);
    }
    get TypeFlags() {
        return makeMaskCell32(CreatureTypeFlags,this, this.row.type_flags);
    }
    get DynFlags() {
        return makeMaskCell32(DynFlags,this, this.row.dynamicflags);
    }
    get UnitFlags() { return new UnitFlags(this); }
    get FlagsExtra() { return this.wrap(this.row.flags_extra); }
    get UnitClass() {
        return makeEnumCell(UnitClass,this, this.row.unit_class);
    }
    get DynamicFlags() { return CreatureTemplateRegistry.ref(this, this.row.dynamicflags); }
    get Difficulty() { return new CreatureDifficulties(this); }

    get Models() { return new CreatureModels(this, this.row); }
    get Icon() { return new CreatureIconNames(this); }
    get Gossip() {
        return GossipRegistry.ref(this, this.row.gossip_menu_id);
    }
    get Level() { return new CreatureLevel(this);}
    get MovementSpeed() { return new CreatureMovementSpeed(this); }
    get Scale() { return this.wrap(this.row.scale); }
    get Rank() {
        return makeEnumCell(CreatureRank,this, this.row.rank);
    }
    get DamageSchool() {
        return makeEnumCell(CreatureDamageSchool,this, this.row.dmgschool);
    }
    get AttackTime() { return new CreatureAttackTime(this); }
    get Family() {
        return makeEnumCell(CreatureFamily,this, this.row.family);
    }
    get PetSpells() { return this.wrap(this.row.PetSpellDataId); }
    get Vehicle() { return VehicleRegistry.ref(this, this.row.VehicleId); }
    get Gold() { return new CreatureGold(this); }
    get AIName() { return new CreatureAI(this); }
    get MovementType() {
        return makeEnumCell(CreatureMovementType,this, this.row.MovementType);
    }
    get HoverHeight() { return this.wrap(this.row.HoverHeight); }
    get Stats() { return new CreatureStats(this); }
    get RacialLeader() { return this.wrap(this.row.RacialLeader); }
    get Movement() { return this.wrap(this.row.movementId); }
    get MechanicImmunity() {
        return makeMaskCell32(MechanicImmunity,this, this.row.mechanic_immune_mask);
    }
    get SchoolImmunity() {
        return makeMaskCell32(SchoolMask,this, this.row.spell_school_immune_mask);
    }
    get Trainer() { return new CreatureDefaultTrainer(this); }
    get Vendor() { return new VendorItems(this, this.ID); }

    get Texts() { return CreatureTextRegistry.load(this.ID); }

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

    get Spawns() {
        return new CreatureTemplateInstances(this);
    }
}