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
import { GetId, GetIdRange, GetTempId, iterateIds } from "../../../util/ids/Ids";

// Swap this to check names in this file
// type TableNameType = SQLNames | DBCNames
type TableNameType = string;

let highestReserved: {[key: string]: number} = {}
iterateIds((idrange)=>{
    highestReserved[idrange.table] = Math.max(highestReserved[idrange.table]||0, idrange.high);
});

function randomString(size: number, charset: string) {
    let str = '';
    for(let i=0;i<size;++i) str+=charset[Math.floor(Math.random()*charset.length)]
    return str;
}

export class IDGeneratorBase {
    readonly table: string;
    readonly startId: number;

    constructor(table: string, startId: number) {
        this.table = table;
        this.startId = startId;
    }
}

export class StaticIDGenerator extends IDGeneratorBase {
    range(mod: string, id: string, size: number) {
        return GetIdRange(this.table,mod,id,size,this.startId)
    }

    id(mod: string, id: string) {
        return GetId(this.table,mod,id,this.startId);
    }

    dynamicId() {
        return GetTempId(this.table, this.startId);
    }
}

export class DynamicIDGenerator {
    readonly table: string
    protected curid: number

    constructor(table: string, startId: number) {
        this.table = table;
        this.curid = Math.max(((highestReserved[table]||(-1))+1),startId)
    }

    range(size: number) {
        let old = this.curid;
        this.curid+=size;
        return old;
    }

    id() { return this.curid++; }
}

const customTables: {[key: string]: boolean} = {}

export const Ids = {
    /** Creates a new static ID generator */
    CreateStatic: (table:string, startid: number) => {
        if(customTables[table] !== undefined) {
            throw new Error(`Custom table ${table} has already been registered!`)
        }
        return new StaticIDGenerator(table,startid)
    },

    CreateDynamic: (table: string, startId: number) => {
        if(customTables[table] !== undefined) {
            throw new Error(`Custom table ${table} has already been registered!`)
        }
        return new DynamicIDGenerator(table,startId);
    },

    /** Starts at 39 , Highest base value is 38 */
    Language: new StaticIDGenerator('Languages',39),

    /** Start at 80900, Highest base value is 80864, capped at 1999999 */
    Spell: new StaticIDGenerator('Spell',80900),

    /** Starts at 16680, Highest base value is 16679*/
    SpellVisual: new DynamicIDGenerator('SpellVisual',16680),

    /** Starts at 15543, Highest base value is 15542 */
    SpellKit: new DynamicIDGenerator('SpellVisualKit',15543),

    /** Start at 21981, Highest base value is 21980 */
    SkillLineAbility: new DynamicIDGenerator('SkillLineAbility',21981), // <-- these two are SWAPPED and this is wrong

    /** Start at 789, Highest base value is 788 */
    SkillLine: new StaticIDGenerator('SkillLine',789), // <-- these two are SWAPPED and this is wrong

    /** Start at 971, Highest base value is 970 */
    SkillRaceClassInfo: new DynamicIDGenerator('SkillRaceClassInfo',971),

    /** Start at 26100, Highest base value is 26034 */
    quest_template: new StaticIDGenerator('quest_template',26100),

    /** Start at 178, Highest base value is 177 */
    CharTitles: new DynamicIDGenerator('CharTitles',178),

    /** Starts at 143, Highest base value is 142. */
    CharTitleMask: new StaticIDGenerator('CharTitlesMask',143),

    /** Start at 4900, Highest base value is 4824 */
    Achievement: new StaticIDGenerator('Achievement',4900),

    /** Start at 13500, Highest base value is 13470 */
    Achievement_Criteria: new StaticIDGenerator('Achievement_Criteria',13500),

    /** Starts at 15100, Highest base value is 15042 */
    Achievement_Category: new DynamicIDGenerator('Achievement_Category',15100),

    /** Starts at 506, Highest base value is 505 */
    AnimationData: new DynamicIDGenerator('AnimationData',506),

    /** Start at 4376, Highest base value is 4375 */
    SpellIcon: new DynamicIDGenerator('SpellIcon',4376),

    /** Starts at 200000, Highest base value is 100006 */
    creature_loot_template: new DynamicIDGenerator('creature_loot_template',200000),

    /** Starts at 200000, Highest base value is 195672 */
    gameobject_loot_template: new DynamicIDGenerator('gameobject_loot_template',200000),

    /** Starts at 200, Highest base value is 69 */
    disenchant_loot_template: new DynamicIDGenerator('disenchant_loot_template',200),

    /** Starts at 35000, Highest base value is 34839 */
    pickpocketing_loot_template: new DynamicIDGenerator('pickpocketing_loot_template',35000),

    /** Starts at 200000, Highest base value is 100014 */
    skinning_loot_template: new DynamicIDGenerator('skinning_loot_template',200000),

    /** Starts at 600000, Highest base value is 526760 */
    reference_loot_template: new DynamicIDGenerator('reference_loot_template',600000),

    /** Starts at 1161, Highest base value is 1160. */
    Faction: new StaticIDGenerator('Faction',1161),

    /** Starts at 2237, Highest base value is 2236. */
    FactionTemplate: new DynamicIDGenerator('FactionTemplate',2237),

    /** Starts at 105, Highest base value is 104. */
    // @ts-ignore: ReputationIndex is not a real table
    ReputationIndex: new StaticIDGenerator('ReputationIndex',105),

    /** Start at 60000 , Highest base value is 56807 */
    item_template: new StaticIDGenerator('item_template',60000),

    /** Starts at 12, Highest base value is 11 */
    Class: new StaticIDGenerator('ChrClasses',12),

    /** Starts at 45000, Highest base value is 43282 */
    creature_template: new StaticIDGenerator('creature_template',45000),

    /** Starts at 220000, Highest base value is 213824 */
    creature: new StaticIDGenerator('creature',220000),

    /** Starts at 401, Highest base value is 400*/
    TalentTab: new StaticIDGenerator('TalentTab',415),

    /** Starts at 400, Highest base value is ?? */
    CharStartOutfit: new DynamicIDGenerator('CharStartOutfit',400),

    /** Starts at 128, Highest base value is 127 */
    Trainer: new DynamicIDGenerator('trainer',128),

    /** Starts at 1000000, Highest base value is 16777215 (above start) */
    NPCText: new StaticIDGenerator('npc_text',1000000),

    /** Starts at 100000, Highest base value is 74294 */
    gossip_menu_option: new DynamicIDGenerator('gossip_menu_option',100000),

    /** Starts at 58000, highest base value is 57019 */
    gossip_menu: new StaticIDGenerator('gossip_menu',58000),

    /** Starts at 100000, highest base value is 77865 */
    BroadcastText: new StaticIDGenerator('broadcast_text',78000),

    /** Starts at 210, highest base value is 209 */
    SpellCastTimes: new DynamicIDGenerator('SpellCastTimes',210),

    /** Starts at 2600, highest base value is 2513*/
    SpellRuneCost: new DynamicIDGenerator('SpellRuneCost',2600),

    /** Starts at 3000, highest base value is 2935*/
    SummonProperties: new DynamicIDGenerator('SummonProperties',3000),

    /** Starts at 191, highest base value is 190 */
    TotemCategory: new StaticIDGenerator('TotemCategory',191),

    /** Starts at 25, highest base value is 24 */
    TotemType: new DynamicIDGenerator('TotemType',25),

    /** Starts at 3000, highest base value is 2997 */
    ItemExtendedCost: new DynamicIDGenerator('ItemExtendedCost',3000),

    /** Starts at 10000000, highest base value is 9541001 */
    Waypoints: new DynamicIDGenerator('waypoints',10000000),

    /** Starts at 2300, highest base value is 2285*/
    Talent: new StaticIDGenerator('Talent',2300),

    /** Starts at 603, highest base value is 602*/
    SpellDuration: new DynamicIDGenerator('SpellDuration',603),

    /** Starts at 200, highest base value is 187*/
    SpellRange: new DynamicIDGenerator('SpellRange',200),

    /** Starts at 66, highest base value is 65*/
    SpellRadius: new DynamicIDGenerator('SpellRadius',66),

    /** Starts at 2800, highest base value is 2706 */
    SpellMissile: new DynamicIDGenerator('SpellMissile',2800),

    /** Starts at 182, highest base value is 181*/
    SpellDescriptionVariable: new DynamicIDGenerator('SpellDescriptionVariables',182),

    /** Starts at 33, highest base value is 32 */
    SpellShapeshiftForm: new DynamicIDGenerator('SpellShapeshiftForm',33),

    /** Starts at 33000, highest base value is 32754 */
    CreatureDisplayInfo: new StaticIDGenerator('CreatureDisplayInfo',33000),

    /** Starts at 70000, highest base value is 68742 */
    ItemDisplayInfo: new StaticIDGenerator('ItemDisplayInfo',70000),

    /** Starts at 7100, highest base value is 7087 */
    SpellVisualEffectName: new DynamicIDGenerator('SpellVisualEffectName',7100),

    /**
     * Starts at 5000000, highest base value is CreatureTemplate which grows up from 1000000.
     * Will collide if using more than 4000000 creature templates.
     */
    Vendor: new DynamicIDGenerator('npc_vendor',4000000),

    /**
     * Starts at 8000000, highest base value is Vendor which grows up from 4000000.
     * Will collide if using more than 4000000 Vendors.
     */
    TrainerCreature: new DynamicIDGenerator('creature_template',8000000),

    /** Starts at 2539, highest base value is 2538 */
    Light: new DynamicIDGenerator('Light',2539),

    /** Starts at 918, highest base value is 917*/
    LightParam: new DynamicIDGenerator('LightParams',918), // <-- this is also used by the band* files

    /** Starts at 4988, highest base value is 4987*/
    Area: new StaticIDGenerator('AreaTable',4988),

    /** Starts at 3000, highest base value is 2628 */
    AreaGroup: new DynamicIDGenerator('AreaGroup',3000),

    /** Starts at 3000, highest base value is 2349 */
    AreaPOI: new DynamicIDGenerator('AreaPOI',3000),

    /** Starts at 6000, highest base value is 5872 */
    AreaTrigger: new StaticIDGenerator('AreaTrigger',6000),

    /** Starts at 28, highest base value is 27 */
    AttackAnimKits: new DynamicIDGenerator('AttackAnimKits',28),

    /** Starts at 9, highest base value is 8 */
    AttackAnimTypes: new DynamicIDGenerator('AttackAnimTypes',9),

    /** Starts at 8, highest base value is 7 */
    AuctionHouse: new StaticIDGenerator('AuctionHouse',8),

    /** Starts at 13, highest base value is 12 */
    BankBagSlotPrices: new StaticIDGenerator('BankBagSlotPrices',13),

    /** Starts at 500, highest base value is 420 */
    BannedAddOns: new DynamicIDGenerator('BannedAddOns',14),

    /** Starts at 1200, highest base value is 1149 */
    BarberShopStyle: new DynamicIDGenerator('BarberShopStyle',1200),

    /** Starts at 40, highest base value is 32 */
    BattleMasterList: new StaticIDGenerator('BattlemasterList',40),

    /** Starts at 40, highest base value is 37 */
    Cfg_Categories: new DynamicIDGenerator('Cfg_Categories',40),

    /** Starts at 14, highest base value is 13 */
    Cfg_Configs: new StaticIDGenerator('Cfg_Configs',14),

    /** Starts at 223, highest base value is 222 */
    CharacterFacialHairStyles: new DynamicIDGenerator('CharacterFacialHairStyles',223),

    // NOTE: Do NOT enable CharBaseInfo, it does NOT have an ID field!
    // CharBaseInfo: new DynamicIDGenerator('CharBaseInfo',66),

    /** Starts at 447, highest base value is 446 */
    CharHairGeosets: new DynamicIDGenerator('CharHairGeosets',447),

    /** Starts at 102, highest base value is 101 */
    CharHairTextures: new DynamicIDGenerator('CharHairTextures',102),

    /** Starts at 15000, highest base value is 14078 */
    CharSections: new StaticIDGenerator('CharSections',15000),

    /** Starts at 27, highest base value is 26 */
    ChatChannels: new StaticIDGenerator('ChatChannels',30),

    /** Starts at 13000, highest base value is 12533 */
    ChatProfanity: new DynamicIDGenerator('ChatProfanity',13000),

    /** Starts at 22, highest base value is 21 */
    ChrRaces: new DynamicIDGenerator('ChrRaces',22),

    /** Starts at 300, highest base value is 246 */
    CinematicCamera: new StaticIDGenerator('CinematicCamera',300),

    /** Starts at 200, highest base value is 166 */
    CinematicSequences: new StaticIDGenerator('CinematicSequences',200),

    /** Starts at 47, highest base value is 46 */
    CreatureFamily: new StaticIDGenerator('CreatureFamily',47),

    /** Starts at 4000, highest base value is 3440 */
    CreatureModelData: new DynamicIDGenerator('CreatureModelData',4000),

    /** Starts at 900, highest base value is 821 */
    CreatureMovementInfo: new StaticIDGenerator('CreatureMovementInfo',900),

    /** Starts at 4000, highest base value is 3108 */
    CreatureSoundData: new DynamicIDGenerator('CreatureSoundData',4000),

    /** Starts at 16000, highest base value is 15226 */
    CreatureSpellData: new StaticIDGenerator('CreatureSpellData',16000),

    /** Starts at 14, highest base value is 13 */
    CreatureType: new StaticIDGenerator('CreatureType',14),

    /** Starts at 50, highest base value is 41 */
    CurrencyCategory: new DynamicIDGenerator('CurrencyCategory',50),

    /** Starts at 400, highest base value is 341 */
    CurrencyTypes: new StaticIDGenerator('CurrencyTypes',400),

    // @ts-ignore
    CurrencyTypesBitIndex: new StaticIDGenerator('CurrencyTypesBitIndex',30),

    /** Starts at 100, highest base value is 85 */
    DanceMoves: new DynamicIDGenerator('DanceMoves',100),

    /** Starts at 100, highest base value is 64 */
    DeathThudLookupes: new DynamicIDGenerator('DeathThudLookups',100),

    /** Starts at 40000, highest base value is 33985 */
    DeclinedWord: new DynamicIDGenerator('DeclinedWord',40000),

    /** Starts at 150000, highest base value is 146661 */
    DeclinedWordCases: new DynamicIDGenerator('DeclinedWordCases',150000),

    /** Starts at 100, highest base value is 68*/
    DestructibleModelData: new DynamicIDGenerator('DestructibleModelData',100),

    /** Starts at 1000, highest base value is 894 */
    DungeonEncounter: new DynamicIDGenerator('DungeonEncounter',1000),

    /** Starts at 200, highest base value is 110 */
    DungeonMap: new DynamicIDGenerator('DungeonMap',200),

    /** Starts at 2000, highest base value is 1827 */
    DungeonMapChunk: new DynamicIDGenerator('DungeonMapChunk',2000),

    /** Starts at 3618, highest base value is 3617 */
    // @ts-ignore
    AreaBit: new StaticIDGenerator('AreaTableExplore',3618),

    /** Starts at 725, highest base value is 724 */
    Map: new StaticIDGenerator('Map', 725),
    /** Starts at 250000, highest base value is 244605 */
    gameobject_template: new StaticIDGenerator('gameobject_template',250000),
    /** Starts at 200000, highest base value is 165990 */
    gameobject: new StaticIDGenerator('gameobject', 200000),
    /** Starts at  10000, highest base value is 9624 */
    GameObjectDisplayInfo: new StaticIDGenerator('GameObjectDisplayInfo',10000),
    /**
     * Starts at 1000, highest base value is 21
     * (but some Spells use higher values, so 1000 is for safety)
     */
    LockType: new DynamicIDGenerator('LockType',1000),

    /**
     * Starts at 2000, highest base value is 1860
     */
    Lock: new StaticIDGenerator('Lock',2000),

    /**
     * Starts at 5000, highest base value is 5000
     */
    SpellVisualKitModelAttach: new DynamicIDGenerator('SpellVisualKitModelAttach',5000),

    /**
     * Starts at 4000, highest base value is 3440
     */
    creature_model_info: new DynamicIDGenerator('creature_model_info',4000),

    /**
     * Starts at 4000, highest base value is 3627
     */
    SoundEntriesAdvanced: new DynamicIDGenerator('SoundEntriesAdvanced',4000),

    /**
     * Starts at 20000, highest base value is 18019
     */
    SoundEntries: new StaticIDGenerator('SoundEntries',20000),

    /**
     * Starts at 187, highest base value is 186
     */
    ItemVisuals: new DynamicIDGenerator('ItemVisuals',187),

    /**
     * Starts at 216, highest base value is 215
     */
    ItemVisualEffects: new DynamicIDGenerator('ItemVisualEffects',216),

    /**
     * Starts at 600, highest base value is 586
     */
    ParticleColors: new DynamicIDGenerator('ParticleColor',600),

    /**
     * Starts at 200, highest base value is 146
     */
    CameraShakes: new DynamicIDGenerator('CameraShakes',200),

    /**
     * Starts at 100, highest base value is 92
     */
    SpellEffectCameraShakes: new DynamicIDGenerator('SpellEffectCameraShakes',100),

    /**
     * Starts at 2000, highest base value is 1178
     */
    SpellChainEffects: new DynamicIDGenerator('SpellChainEffects',2000),

    /**
     * Starts at 100000, highest base value is 68529
     */
    spell_group: new DynamicIDGenerator('spell_group',100000),

    /**
     * Starts at 2000, highest base value is ~1000
     */
    game_tele: new DynamicIDGenerator('game_tele',2000),

    /**
     * Starts at 22000, highest base value is 21381
     */
    CreatureDisplayInfoExtra: new DynamicIDGenerator('CreatureDisplayInfoExtra',22000),

    /**
     * Starts at 2147483648, highest base value is 2147483647 (shared with CreatureDisplayInfo/creature_model_info)
     */
    creature_template_outfits: new DynamicIDGenerator('creature_template_outfits',2147483648),

    /**
     * Starts at 600, highest base value is 575
     */
    ZoneMusic: new StaticIDGenerator('ZoneMusic',600),

    /**
     * Starts at 300, highest base value is 291
     */
    MailTemplate: new StaticIDGenerator('MailTemplate', 300),

    /**
     * Starts at 441, highest base value is 440. Max value is 2048
     */
    TaxiNodesFlightpath: new StaticIDGenerator('TaxiNodes',441),

    /**
     * Starts at 2048, lower limit is "TaxiNodes" upper limit
     */
    TaxiNodesPlain: new StaticIDGenerator('TaxiNodes',2048),

    /**
     * Starts at 2000, highest base value is 1978
     */
    TaxiPath: new StaticIDGenerator('TaxiPath',2000),

    /**
     * Starts at 50000, highest base value is 46874
     */
    TaxiPathNode: new DynamicIDGenerator('TaxiPathNode',50000),

    /** Starts at 301, highest base value is 300 */
    DurabilityCosts: new DynamicIDGenerator('DurabilityCosts',301),

    /** Starts at 17, highest base value is 16 */
    DurabilityQuality: new DynamicIDGenerator('DurabilityQuality',17),

    /** Starts at 500, highest base value is 476 */
    Emotes: new DynamicIDGenerator('Emotes',500),

    /** Starts at 500, highest base value is 453 */
    EmotesText: new DynamicIDGenerator('EmotesText',500),

    /** Starts at 1500, highest base value is 1402 */
    EmotesTextData: new DynamicIDGenerator('EmotesText',1500),

    /** Starts at 600, highest base value is 566 */
    EmotesTextSound: new DynamicIDGenerator('EmotesText',600),

    /** Starts at 7, highest base value is 6 (cont) */
    EnvironmentalDamage: new DynamicIDGenerator('EnvironmentalDamage',7),

    /** Starts at 7, highest base value is 6 (cont) */
    Exhaustion: new DynamicIDGenerator('Exhaustion',7),

    /** Starts at 5, highest base value is 4 (cont) */
    FactionGroup: new DynamicIDGenerator('FactionGroup',5),

    /** Starts at 36000, highest base value is 356944 */
    FileData: new DynamicIDGenerator('FileData',36000),

    /** Starts at 10, highest base value is 7 */
    FootprintTextures: new DynamicIDGenerator('FootprintTextures',10),

    /** Starts at 500, highest base value is 424 */
    FootstepTerrainLookup: new DynamicIDGenerator('FootstepTerrainLookup',500),

    /** Starts at 200, highest base value is 175 */
    GMSurveyAnswers: new StaticIDGenerator('GMSurveyAnswers',200),

    /** Starts at 9, highest base value is 8 (cont) */
    GMSurveyCurrentSurvey: new StaticIDGenerator('GMSurveyCurrentSurvey',9),

    /** Starts at 50, highest base value is 41 */
    GMSurveyQuestions: new StaticIDGenerator('GMSurveyQuestions',50),

    /** Starts at 10, highest base value is 9 */
    GMSurveySurveys: new StaticIDGenerator('GMSurveySurveys',10),

    /** Starts at 38, highest base value is 37 */
    GMTicketCategory: new StaticIDGenerator('GMTicketCategory',38),

    /** Starts at 200, highest base value is 122 */
    GameObjectArtKit: new StaticIDGenerator('GameObjectArtKit',200),

    /** Starts at 600, highest base value is 509 */
    GameTips: new DynamicIDGenerator('GameTips',600),

    /** Starts at 2000, highest base value is 1629 */
    GemProperties: new StaticIDGenerator('GemProperties',2000),

    /** Starts at 1000, highest base value is 911 */
    GlyphProperties: new StaticIDGenerator('GlyphProperties',1000),

    /** Starts at 30, highest base value is 26 */
    GlyphSlot: new DynamicIDGenerator('GlyphSlot',30),

    /** Starts at 800, highest base value is 798 */
    GroundEffectDoodad: new StaticIDGenerator('GroundEffectDoodad',800),

    /** Starts at 74000, highest base value is 73186 */
    GroundEffectTexture: new DynamicIDGenerator('GroundEffectTexture',74000),

    /** Starts at 400, highest base value is 376 */
    HelmetGeosetVisData: new DynamicIDGenerator('HelmetGeosetVisData',400),

    /** Starts at 200, highest base value is 161 */
    HolidayDescriptions: new DynamicIDGenerator('HolidayDescriptions', 200),

    /** Starts at 200, highest base value is 161 */
    HolidayNames: new DynamicIDGenerator('HolidayNames',200),

    /** Starts at 500, highest base value is 424 */
    Holidays: new StaticIDGenerator('Holidays', 500),

    /** Starts at 16, highest base value is 15 (cont) */
    ItemBagFamily: new StaticIDGenerator('ItemBagFamily',16),

    /** Starts at 1600, highest base value is 1546 */
    ItemCondExtCosts: new DynamicIDGenerator('ItemCondExtCosts',1600),

    /** Starts at 25, highest base value is 24 (cont) */
    ItemGroupSounds: new DynamicIDGenerator('ItemGroupSounds',25),

    /** Starts at 100, highest base value is 85 */
    ItemLimitCategory: new DynamicIDGenerator('ItemLimitCategory',100),

    /** Starts at 9, highest base value is 8 (cont) */
    ItemPetFood: new DynamicIDGenerator('ItemPetFood',9),

    /** Starts at 2, highest base value is 1 */
    ItemPurchaseGroup: new DynamicIDGenerator('ItemPurchaseGroup',2),

    /** Starts at 3000, highest base value is 2164 */
    ItemRandomProperties: new StaticIDGenerator('ItemRandomProperties',3000),

    /** Starts at 100, highest base value is 99 (cont) */
    ItemRandomSuffix: new StaticIDGenerator('ItemRandomSuffix',100),

    /** Starts at 1000, highest base value is 901 */
    ItemSet: new StaticIDGenerator('ItemSet',1000),

    /** Starts at 2000, highest base value is 1677 */
    LanguageWords: new DynamicIDGenerator('LanguageWords',2000),

    /** Starts at 300, highest base value is 220 */
    LfgDungeonExpansion: new DynamicIDGenerator('LfgDungeonExpansion',300),

    /** Starts at 100, highest base value is 11 */
    LfgDungeonGroup: new DynamicIDGenerator('LfgDungeonGroup',100),

    /** Starts at 300, highest base value is 294 */
    LfgDungeons: new StaticIDGenerator('LfgDungeons',300),

    /** Starts at 200, highest base value is 148 */
    LightSkybox: new DynamicIDGenerator('LightSkybox',200),

    /** Starts at 4, highest base value is 3 (cont) */
    LiquidMaterial: new StaticIDGenerator('LiquidMaterial',4),

    /** Starts at 200, highest base value is 181 */
    LiquidType: new StaticIDGenerator('LiquidType',200),

    /** Starts at 200, highest base value is 181 */
    LoadingScreenTaxiSplines: new DynamicIDGenerator('LoadingScreenTaxiSplines', 200),

    /** Starts at 300, highest base value is 254 */
    LoadingScreens: new DynamicIDGenerator('LoadingScreens', 300),

    /** Starts at 800, highest base value is 753 */
    MapDifficulty: new StaticIDGenerator('MapDifficulty',800),

    /** Starts at 9, highest base value is 8 (cont) */
    Material: new DynamicIDGenerator('Material',9),

    /** Starts at 20, highest base value is 16 */
    Movie: new DynamicIDGenerator('Movie', 20),

    /** Starts at 360000, highest base value is 356944 */
    MovieFileData: new DynamicIDGenerator('MovieFileData',360000),

    /** Starts at 200, highest base value is 104 */
    MovieVariation: new DynamicIDGenerator('MovieVariation',200),

    /** Starts at 400, highest base value is 336 */
    NPCSounds: new DynamicIDGenerator('NPCSounds',336),

    /** Starts at 7000, highest base value is 6793 */
    NameGen: new DynamicIDGenerator('NameGen',7000),

    /** Starts at 30000, highest base value is 21465 */
    NamesProfanity: new DynamicIDGenerator('NamesProfanity',30000),

    /** Starts at 40000, highest base value is 32550 */
    NamesReserved: new DynamicIDGenerator('NamesReserved', 40000),

    /** Starts at 900, highest base value is 828 */
    ObjectEffect: new DynamicIDGenerator('ObjectEffect', 900),

    /** Starts at 700, highest base value is 611 */
    ObjectEffectGroup: new DynamicIDGenerator('ObjectEffectGroup', 700),

    /** Starts at 300, highest base value is 202 */
    ObjectEffectModifier: new DynamicIDGenerator('ObjectEffectModifier', 300),

    /** Starts at 500, highest base value is 491 */
    ObjectEffectPackage: new DynamicIDGenerator('ObjectEffectPackage', 500),

    /** Starts at 900, highest base value is 844 */
    ObjectEffectPackageElem: new DynamicIDGenerator('ObjectEffectPackageElem', 900),

    /** Starts at 300, highest base value is 271 */
    OverrideSpellData: new DynamicIDGenerator('OverrideSpellData', 300),

    /** Starts at 3, highest base value is 2 (cont) */
    Package: new DynamicIDGenerator('Package',3),

    /** Starts at 8, highest base value is 7 */
    PageTextMaterial: new StaticIDGenerator('PageTextMaterial',8),

    /** Starts at 4, highest base value is 3 */
    PetPersonality: new StaticIDGenerator('PetPersonality', 4),

    /** Starts at 2, highest base value is 1 */
    PetitionType: new DynamicIDGenerator('PetitionType',2),

    /** Starts at 200, highest base value is 142 */
    PowerDisplay: new DynamicIDGenerator('PowerDisplay',200),

    /** Starts at 109, highest base value is 108 (cont) */
    PvpDifficulty: new StaticIDGenerator('PvpDifficulty',109),

    /** Starts at 3, highest base value is 2 */
    QuestFactionReward: new DynamicIDGenerator('QuestFactionReward',3),

    /** Starts at 100, highest base value is 89 */
    QuestInfo: new DynamicIDGenerator('QuestInfo', 100),

    /** Starts at 400, highest base value is 376 */
    QuestSort: new DynamicIDGenerator('QuestSort',400),

    /** Starts at 101, highest base value is 100 (cont) */
    QuestXP: new DynamicIDGenerator('QuestXP',101),

    /** Starts at 301, highest base value is 300 (cont) */
    RandPropPoints: new DynamicIDGenerator('RandPropPoints',301),

    /** Starts at 7, highest base value is 6 (cont) */
    Resistances: new StaticIDGenerator('Resistances',7),

    /** Starts at 400, highest base value is 371 */
    ScalingStatDistribution: new DynamicIDGenerator('ScalingStatDistribution', 400),

    /** Starts at 300, highest base value is 200 */
    ScalingStatValues: new DynamicIDGenerator('ScalingStatValues', 300),

    /** Starts at 800, highest base value is 760 */
    ScreenEffect: new StaticIDGenerator('ScreenEffect', 800),

    /** Starts at 34, highest base value is 33 */
    SheatheSoundLookup: new DynamicIDGenerator('SheatheSoundLookups', 34),

    /** Starts at 1501, highest base value is 1500 (cont) */
    SkillCostsData: new DynamicIDGenerator('SkillCostsData', 1501),

    /** Starts at 13, highest base value is 12 */
    SkillLineCategory: new DynamicIDGenerator('SkillLineCategory', 13),

    /** Starts at 300, highest base value is 223 */
    SkillTiers: new DynamicIDGenerator('SkillTiers', 300),

    /** Starts at 600, highest base value is 505 */
    SoundAmbience: new DynamicIDGenerator('SoundAmbience', 600),

    /** Starts at 3000, highest base value is 2549 */
    SoundEmitters: new DynamicIDGenerator('SoundEmitters', 3000),

    /** Starts at 21, highest base value is 20 (cont) */
    SoundFilter: new DynamicIDGenerator('SoundFilter', 21),

    /** Starts at 52, highest base value is 51 (cont) */
    SoundFilterElem: new DynamicIDGenerator('SoundFilterElem', 52),

    /** Starts at 100, highest base value is 92 */
    SoundProviderPreferences: new DynamicIDGenerator('SoundProviderPreferences', 100),

    /** Starts at 3, highest base value is 2 (cont) */
    SoundSamplePreferences: new DynamicIDGenerator('SoundSamplePreferences', 3),

    /** Starts at 100, highest base value is 29 */
    SoundWaterType: new DynamicIDGenerator('SoundWaterType', 100),

    /** Starts at 200, highest base value is 139 */
    SpamMessages: new DynamicIDGenerator('SpamMessages', 200),

    /** Starts at 2000, highest base value is 1253 */
    SpellCategory: new DynamicIDGenerator('SpellCategory', 2000),

    /** Starts at 2500, highest base value is 2401 */
    SpellDifficulty: new DynamicIDGenerator('SpellDifficulty', 3000),

    /** Starts at 12, highest base value is 11 */
    SpellDispelType: new DynamicIDGenerator('SpellDispelType', 12),

    /** Starts at 2000, highest base value is 1650 */
    SpellFocusObject: new DynamicIDGenerator('SpellFocusObject', 2000),

    /** Starts at 4000, highest base value is 3883 */
    SpellItemEnchantment: new StaticIDGenerator('SpellItemEnchantment', 4000),

    /** Starts at 200, highest base value is 194 */
    SpellItemEnchantmentCondition: new DynamicIDGenerator('SpellItemEnchantmentCondition', 200),

    /** Starts at 32, highest base value is 31 */
    SpellMechanic: new DynamicIDGenerator('SpellMechanic',32),

    /** Starts at 3000, highest base value is 2853 */
    SpellMissileMotion: new DynamicIDGenerator('SpellMissileMotion', 3000),

    /** Starts at 100, highest base value is 83 */
    SpellVisualKitAreaModel: new DynamicIDGenerator('SpellVisualKitAreaModel', 100),

    /** Starts at 4, highest base value is 3 (cont) */
    SpellVisualPrecastTransitions: new DynamicIDGenerator('SpellVisualPrecastTransitions', 4),

    /** Starts at 5, highest base value is 4 (cont) */
    StableSlotPrices: new DynamicIDGenerator('StableSlotPrices', 5),

    /** Starts at 6, highest base value is 100 */
    Startup_strings: new DynamicIDGenerator('Startup_strings', 100),

    /** Starts at 100, highest base value is 67 */
    Stationery: new DynamicIDGenerator('Stationery', 100),

    /** Starts at 10, highest base value is 9 (cont) */
    StringLookups: new DynamicIDGenerator('StringLookups', 10),

    /** Starts at 1401, highest base value is 1400 (cont) */
    TeamContributionPoints: new DynamicIDGenerator('TeamContributionPoints', 1401),

    /** Starts at 13, highest base value is 12 (cont) */
    TerrainType: new DynamicIDGenerator('Terraintype', 13),

    /** Starts at 11, highest base value is 10 (cont) */
    TerrainTypeSounds: new DynamicIDGenerator('TerraintypeSounds', 11),

    /** Starts at 200000, highest base value is 179690 */
    TransportAnimation: new DynamicIDGenerator('TransportAnimation', 200000),

    /** Starts at 100, highest base value is 61 */
    TransportPhysics: new DynamicIDGenerator('TransportPhysics', 100),

    /** Starts at 2000, highest base value is 1608 */
    TransportRotation: new DynamicIDGenerator('TransportRotation', 2000),

    /** Starts at 200, highest base value is 167 */
    UISoundLookups: new DynamicIDGenerator('UISoundLookups', 200),

    /** Starts at 5, highest base value is 4 */
    UnitBlood: new DynamicIDGenerator('UnitBlood', 5),

    /** Starts at 5, highest base value is 4 */
    UnitBloodLevels: new DynamicIDGenerator('UnitBloodLevels', 5),

    /** Starts at 800, highest base value is 774 */
    Vehicle: new DynamicIDGenerator('Vehicle', 800),

    /** Starts at 8000, highest base value is 7770 */
    VehicleSeat: new DynamicIDGenerator('VehicleSeat', 8000),

    /** Starts at 300, highest base value is 242 */
    VehicleUIIndSeat: new DynamicIDGenerator('VehicleUIIndSeat', 300),

    /** Starts at 300, highest bse value is 249 */
    VehicleUIIndicator: new DynamicIDGenerator('VehicleUIIndicator', 300),

    /** Starts at 700, highest base value is 693 */
    VideoHardware: new DynamicIDGenerator('VideoHardware', 700),

    /** Starts 900, highest base value is 900 */
    VocalUISounds: new DynamicIDGenerator('VocalUISounds', 900),

    /** Starts at 60000, highest base value is 51118 */
    WMOAreaTable: new StaticIDGenerator('WMOAreaTable', 60000),

    /** Starts at 100, highest base value is 88 */
    WeaponImpactSounds: new DynamicIDGenerator('WeaponImpactSounds', 100),

    /** Starts at 7, highest base value is 6 */
    WeaponSwingSounds2: new DynamicIDGenerator('WeaponSwingSounds2', 7),

    /** Starts at 200, highest base value is 108 */
    Weather: new StaticIDGenerator('Weather', 200),

    /** Starts at 700, highest base value is 609 */
    WorldMapArea: new DynamicIDGenerator('WorldMapArea', 610),

    /** Starts at 5, highest base value is 4 (cont) */
    WorldMapContinent: new DynamicIDGenerator('WorldMapContinent', 5),

    /** Starts at 2000, highest base value is 1641 */
    WorldMapOverlay: new DynamicIDGenerator('WorldMapOverlay', 1642),

    /** Starts at 11, highest base value is 10 (cont) */
    WorldMapTransforms: new DynamicIDGenerator('WorldMapTransforms', 11),

    /** Starts at 2000, highest base value is 1720 */
    WorldSafelocs: new DynamicIDGenerator('WorldSafelocs', 2000),

    /** Starts at 6000, highest base value is slightly above 5000 */
    WorldState: new StaticIDGenerator('WorldState', 6000),

    /** Starts at 300, highest base value is 283*/
    WorldStateUI: new DynamicIDGenerator('WorldStateUI', 300),

    /** Starts at 14, highest base value is 13 (cont) */
    WowError_Strings: new DynamicIDGenerator('WowError_Strings', 14),

    /** Starts at 700, highest base value is 601 */
    ZoneintroMusicTable: new DynamicIDGenerator('ZoneintroMusicTable', 700),

    /** Starts at 5000, highest base value is 4785 */
    achievement_reward: new DynamicIDGenerator('achievement_reward', 5000),

    /** Starts at 1000, highest base value is 32 */
    battleground_template: new DynamicIDGenerator('battleground_template', 100),

    /** Starts at 100, highest base value is 84 */
    game_event: new StaticIDGenerator('game_event',100),

    /** Starts at 1, highest base value is 0 */
    game_event_condition: new StaticIDGenerator('game_event_condition',1),

    /** Starts at 4000, highest base value is 3622 */
    page_text: new StaticIDGenerator('page_text', 4000),

    /** Starts at 500, highest base value is 453 */
    points_of_interest: new StaticIDGenerator('points_of_interest', 500),

    /** Starts at 700, highest base value is 20 (also used for the game object map id)*/
    transports: new StaticIDGenerator('transports', 700),

    /**
     * Starts at 300, highest base value is 299
     * - value is hardcoded in server, see TSSmartScripts.h
     */
    smart_actions: new StaticIDGenerator('smart_actions',300),

    /**
     * Starts at 300, highest base value is 299
     * - value is hardcoded in server, see TSSmartScripts.h
     */
    smart_events: new StaticIDGenerator('smart_events',300),

    /**
     * Starts at 0, no base values
     */
    instance_encounter_achievement: new DynamicIDGenerator('instance_encounter_achievement',0),

    /**
     * Starts at 1000, highest base value is 325
     */
    spawn_group_templates: new StaticIDGenerator('spawn_group_template', 1000),

    /**
     * Starts at 100, highest base value is 52
     * - value is hardcoded in server, see TSSmartScripts.h
     */
    condition_types: new StaticIDGenerator('smart_events',100),

    /** Starts at 202500, highest base value is 202482 */
    pool_template: new DynamicIDGenerator('pool_template', 202500),
}