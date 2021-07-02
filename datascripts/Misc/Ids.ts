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
import { GetId, iterateIds } from "wotlkdata/ids/Ids"
import { SQLNames } from "wotlkdata/sql/SQLFiles"
import { DBCNames } from "wotlkdata/dbc/DBCFiles"

class IdGenerator {
    table : SQLNames | DBCNames
    startId : number;
    constructor(table : SQLNames | DBCNames, startId : number) {
        this.table = table;
        this.startId = startId;
    }

    id(mod: string, name: string) {
        return GetId(this.table,mod,name,this.startId);
    }
}

let highestReserved: {[key: string]: number} = {}
iterateIds((idrange)=>{
    highestReserved[idrange.table] = Math.max(highestReserved[idrange.table]||0, idrange.high);
});

export class AutoIdGenerator {
    curid: number;
    startId: number;
    constructor(tableName: string, startId: number) {
        let usedId = Math.max(startId,(highestReserved[tableName]||-1)+1)
        this.curid = usedId;
        this.startId = usedId;
    }

    static isCustom(gen: AutoIdGenerator, id: number) {
        return id>=gen.startId;
    }

    id() {
        return this.curid++;
    }
}

export const Ids = {
    /** Starts at 39 , Highest base value is 38 */
    Language: new IdGenerator('Languages',39),
    /** Start at 200000, Highest base value is 80864, capped at 1999999 */
    Spell: new IdGenerator('Spell',200000),

    /** Starts at 20000 */
    SpellAuto: new AutoIdGenerator('Spell',2000000),

    /** Starts at 16680, Highest base value is 16679*/
    SpellVisual: new AutoIdGenerator('SpellVisual',16680),
    /** Starts at 15543, Highest base value is 15542 */
    SpellKit: new AutoIdGenerator('SpellVisualKit',15543),
    /** Start at 21981, Highest base value is 21980 */
    SkillLineAbility: new AutoIdGenerator('SkillLine',21981), // <-- these two are SWAPPED and this is wrong
    /** Start at 789, Highest base value is 788 */
    SkillLine: new IdGenerator('SkillLineAbility',789), // <-- these two are SWAPPED and this is wrong
    /** Start at 971, Highest base value is 970 */
    SkillRaceClassInfo: new AutoIdGenerator('SkillRaceClassInfo',971),
    /** Start at 27000 , Highest base value is 26034 */
    Quest: new IdGenerator('quest_template',27000),
    /** Start at 178, Highest base value is 177 */
    Title: new IdGenerator('CharTitles',178),
    /** Start at 5000, Highest base value is 4824 */
    Achievement: new IdGenerator('Achievement',5000),
    /** Start at 20000, Highest base value is 13470 */
    AchievementCriteria: new IdGenerator('Achievement_Criteria',20000),
    /** Start at 4376, Highest base value is 4375 */
    SpellIcon: new AutoIdGenerator('SpellIcon',4376),
    /** Starts at 1000000, Highest base value is 3479*/
    FishingLoot: new AutoIdGenerator('fishing_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 100006 */
    CreatureLoot: new AutoIdGenerator('creature_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 195672 */
    GameObjectLoot: new AutoIdGenerator('gameobject_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 54537 */
    ItemLoot: new AutoIdGenerator('item_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 69 */
    DisenchantLoot: new AutoIdGenerator('disenchant_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 36912 */
    ProspectingLoot: new AutoIdGenerator('prospecting_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 36912 */
    MillingLoot: new AutoIdGenerator('milling_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 34839 */
    PickPocketLoot: new AutoIdGenerator('pickpocketing_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 100014 */
    SkinningLoot: new AutoIdGenerator('skinning_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 287 */
    MailLoot: new AutoIdGenerator('mail_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 526760 */
    ReferenceLoot: new AutoIdGenerator('reference_loot_template',1000000),
    /** Starts at 1000000, Highest base value is 69412 */
    SpellLoot: new AutoIdGenerator('spell_loot_template',1000000),
    /** Starts at 1161, Highest base value is 1160. */
    Faction: new IdGenerator('Faction',1161),
    /** Starts at 2237, Highest base value is 2236. */
    FactionTemplate: new AutoIdGenerator('FactionTemplate',2237),
    /** Starts at 105, Highest base value is 104. */
    // @ts-ignore: ReputationIndex is not a real table
    ReputationIndex: new IdGenerator('ReputationIndex',105),
    /** Start at 100000 , Highest base value is 56807 */
    Item: new IdGenerator('item_template',100000),
    /** Starts at 12, Highest base value is 11 */
    Class: new IdGenerator('ChrClasses',12),
    /** Starts at 100000, Highest base value is 43282 */
    CreatureTemplate: new IdGenerator('creature_template',1000000),
    /** Starts at 1000000, Highest base value is 213824 */
    CreatureInstance: new IdGenerator('creature',1000000),
    /** Starts at 401, Highest base value is 400*/
    TalentTab: new IdGenerator('TalentTab',401),
    /** Starts at 500, Highest base value is ?? */
    CharStartOutfit: new AutoIdGenerator('CharStartOutfit',400),
    /** Starts at 128, Highest base value is 127 */
    Trainer: new AutoIdGenerator('trainer',128),
    /** Starts at 16777215, Highest base value is 1000000 (Below highest) */
    NPCText: new AutoIdGenerator('npc_text',1000000),
    /** Starts at 100000, Highest base value is 74294 */
    GossipMenuOption: new AutoIdGenerator('gossip_menu_option',100000),
    /** Starts at 58000, highest base value is 57019 */
    GossipMenu: new AutoIdGenerator('gossip_menu',58000),
    /** Starts at 100000, highest base value is 77865 */
    BroadcastText: new AutoIdGenerator('broadcast_text',100000),
    /** Starts at 210, highest base value is 209 */
    SpellCastTimes: new AutoIdGenerator('SpellCastTimes',210),
    /** Starts at 2600, highest base value is 2513*/
    SpellRuneCost: new AutoIdGenerator('SpellRuneCost',2600),
    /** Starts at 3000, highest base value is 2935*/
    SummonProperties: new AutoIdGenerator('SummonProperties',3000),
    /** Starts at 191, highest base value is 190 */
    TotemCategory: new AutoIdGenerator('TotemCategory',191),
    /** Starts at 3000, highest base value is 2997 */
    ItemExtendedCost: new AutoIdGenerator('ItemExtendedCost',3000),
    /** Starts at 10000000, highest base value is 9541001 */
    Waypoints: new AutoIdGenerator('waypoints',10000000),
    /** Starts at 3000, highest base value is 2285*/
    Talent: new IdGenerator('Talent',3000),
    /** Starts at 603, highest base value is 602*/
    SpellDuration: new AutoIdGenerator('SpellDuration',603),
    /** Starts at 200, highest base value is 187*/
    SpellRange: new AutoIdGenerator('SpellRange',200),
    /** Starts at 66, highest base value is 65*/
    SpellRadius: new AutoIdGenerator('SpellRadius',66),
    /** Starts at 3000, highest base value is 2706 */
    SpellMissile: new AutoIdGenerator('SpellMissile',3000),
    /** Starts at 182, highest base value is 181*/
    SpellDescriptionVariable: new AutoIdGenerator('SpellDescriptionVariable',182),
    /** Starts at 2500, highest base value is 2401 */
    SpellDifficulty: new AutoIdGenerator('SpellDifficulty',2500),
    /** Starts at 33, highest base value is 32 */
    SpellShapeshiftForm: new AutoIdGenerator('SpellShapeshiftForm',33),
    /** Starts at 33000, highest base value is 32754 */
    CreatureDisplayInfo: new AutoIdGenerator('CreatureDisplayInfo',33000),
    /** Starts at 70000, highest base value is 68742 */
    ItemDisplayInfo: new AutoIdGenerator('ItemDisplayInfo',70000),
    /** Starts at 8000, highest base value is 7087 */
    SpellVisualEffectName: new AutoIdGenerator('SpellVisualEffectName',8000),
    /** 
     * Starts at 5000000, highest base value is CreatureTemplate which grows up from 1000000.
     * Will collide if using more than 4000000 creature templates.
     */
    Vendor: new AutoIdGenerator('npc_vendor',4000000),
    /** 
     * Starts at 8000000, highest base value is Vendor which grows up from 4000000.
     * Will collide if using more than 4000000 Vendors.
     */
    TrainerCreature: new AutoIdGenerator('creature_template',8000000),
    /** Starts at 2539, highest base value is 2538 */
    Light: new AutoIdGenerator('Light',2539),
    /** Starts at 918, highest base value is 917*/
    LightParam: new AutoIdGenerator('LightParams',918), // <-- this is also used by the band* files
    /** Starts at 4988, highest base value is 4987*/
    Area: new IdGenerator('AreaTable',4988),
    /** Starts at 3618, highest base value is 3617 */
    // @ts-ignore
    AreaBit: new IdGenerator('AreaTableExplore',3618),
    /** Starts at 255, highest base value is 254 */
    LoadingScreens: new AutoIdGenerator('LoadingScreens',255),
    /** Starts at 725, highest base value is 724 */
    Map: new IdGenerator('Map', 725),
    /** Starts at 250000, highest base value is 244605 */
    GameObjectTemplate: new IdGenerator('gameobject_template',250000),
    /** Starts at 300000, highest base value is 165990 */
    GameObjectInstance: new IdGenerator('gameobject', 300000),
    /** Starts at  10000, highest base value is 9624 */
    GameObjectDisplay: new AutoIdGenerator('GameObjectDisplayInfo',10000),
    /** 
     * Starts at 1000, highest base value is 21 
     * (but some Spells use higher values, so 1000 is for safety) 
     */
    LockType: new AutoIdGenerator('LockType',1000),

    /**
     * Starts at 2000, highest base value is 1860
     */
    Lock: new AutoIdGenerator('Lock',2000),

    /**
     * Starts at 5000, highest base value is 5000
     */
    SpellVisualKitModelAttach: new AutoIdGenerator('SpellVisualKitModelAttach',5000),

    /**
     * Starts at 4000, highest base value is 3440
     */
    CreatureModel: new AutoIdGenerator('creature_model_info',4000),

    /**
     * Starts at 4000, highest base value is 3627
     */
    SoundEntriesAdvanced: new AutoIdGenerator('SoundEntriesAdvanced',4000),

    /**
     * Starts at 20000, highest base value is 18019
     */
    SoundEntries: new AutoIdGenerator('SoundEntries',20000),

    /**
     * Starts at 187, highest base value is 186
     */
    ItemVisuals: new AutoIdGenerator('ItemVisuals',187),

    /**
     * Starts at 216, highest base value is 215
     */
    ItemVisualEffects: new AutoIdGenerator('ItemVisualEffects',216),

    /**
     * Starts at 600, highest base value is 586
     */
    ParticleColors: new AutoIdGenerator('ParticleColor',600),

    /**
     * Starts at 200, highest base value is 146
     */
    CameraShakes: new AutoIdGenerator('CameraShakes',200),

    /** 
     * Starts at 100, highest base value is 92
     */
    SpellEffectCameraShakes: new AutoIdGenerator('SpellEffectCameraShakes',100),

    /** 
     * Starts at 2000, highest base value is 1178 
     */
    SpellChainEffects: new AutoIdGenerator('SpellEffectChains',2000),

    /**
     * Starts at 100000, highest base value is 68529
     */
    SpellGroups: new AutoIdGenerator('spell_group',100000),

    /**
     * Starts at 1000000, highest base value is ~1000
     */
    GameTele: new AutoIdGenerator('game_tele',1000000),

    /**
     * Starts at 22000, highest base value is 21381
     */
    CreatureDisplayInfoExtra: new AutoIdGenerator('CreatureDisplayInfoExtra',22000),

    /**
     * Starts at 10000, highest base value is 7050
     */
    CreatureModelData: new AutoIdGenerator('CreatureModelData',10000),

    /**
     * Starts at 2147483648, highest base value is 2147483647 (shared with CreatureDisplayInfo/creature_model_info)
     */
    CreatureTemplateOutfits: new AutoIdGenerator('creature_template_outfits',2147483648),
}