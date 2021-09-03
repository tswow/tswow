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

// Swap this to check names in this file
// type TableNameType = SQLNames | DBCNames
type TableNameType = string;

export class IdGenerator {
    table : TableNameType
    startId : number;
    constructor(table : TableNameType, startId : number) {
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
    constructor(tableName: TableNameType, startId: number) {
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
    SkillLineAbility: new AutoIdGenerator('SkillLineAbility',21981), // <-- these two are SWAPPED and this is wrong

    /** Start at 789, Highest base value is 788 */
    SkillLine: new IdGenerator('SkillLine',789), // <-- these two are SWAPPED and this is wrong

    /** Start at 971, Highest base value is 970 */
    SkillRaceClassInfo: new AutoIdGenerator('SkillRaceClassInfo',971),

    /** Start at 27000 , Highest base value is 26034 */
    quest_template: new IdGenerator('quest_template',27000),

    /** Start at 178, Highest base value is 177 */
    CharTitles: new IdGenerator('CharTitles',178),

    /** Start at 5000, Highest base value is 4824 */
    Achievement: new IdGenerator('Achievement',5000),

    /** Start at 20000, Highest base value is 13470 */
    Achievement_Criteria: new IdGenerator('Achievement_Criteria',20000),

    /** Starts at 16000, Highest base value is 15042 */
    Achievement_Category: new AutoIdGenerator('Achievement_Category',16000),

    /** Starts at 506, Highest base value is 505 */
    AnimationData: new AutoIdGenerator('AnimationData',506),

    /** Start at 4376, Highest base value is 4375 */
    SpellIcon: new AutoIdGenerator('SpellIcon',4376),

    /** Starts at 1000000, Highest base value is 3479*/
    fishing_loot_template: new AutoIdGenerator('fishing_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 100006 */
    creature_loot_template: new AutoIdGenerator('creature_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 195672 */
    gameobject_loot_template: new AutoIdGenerator('gameobject_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 54537 */
    item_loot_template: new AutoIdGenerator('item_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 69 */
    disenchant_loot_template: new AutoIdGenerator('disenchant_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 36912 */
    prospecting_loot_template: new AutoIdGenerator('prospecting_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 36912 */
    milling_loot_template: new AutoIdGenerator('milling_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 34839 */
    pickpocketing_loot_template: new AutoIdGenerator('pickpocketing_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 100014 */
    skinning_loot_template: new AutoIdGenerator('skinning_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 526760 */
    reference_loot_template: new AutoIdGenerator('reference_loot_template',1000000),

    /** Starts at 1000000, Highest base value is 69412 */
    spell_loot_template: new AutoIdGenerator('spell_loot_template',1000000),

    /** Starts at 1161, Highest base value is 1160. */
    Faction: new IdGenerator('Faction',1161),

    /** Starts at 2237, Highest base value is 2236. */
    FactionTemplate: new AutoIdGenerator('FactionTemplate',2237),

    /** Starts at 105, Highest base value is 104. */
    // @ts-ignore: ReputationIndex is not a real table
    ReputationIndex: new IdGenerator('ReputationIndex',105),

    /** Start at 100000 , Highest base value is 56807 */
    item_template: new IdGenerator('item_template',100000),

    /** Starts at 12, Highest base value is 11 */
    Class: new IdGenerator('ChrClasses',12),

    /** Starts at 100000, Highest base value is 43282 */
    creature_template: new IdGenerator('creature_template',1000000),

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
    gossip_menu_option: new AutoIdGenerator('gossip_menu_option',100000),

    /** Starts at 58000, highest base value is 57019 */
    gossip_menu: new AutoIdGenerator('gossip_menu',58000),

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
    SpellDescriptionVariable: new AutoIdGenerator('SpellDescriptionVariables',182),

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

    /** Starts at 3000, highest base value is 2628 */
    AreaGroup: new AutoIdGenerator('AreaGroup',3000),

    /** Starts at 3000, highest base value is 2349 */
    AreaPOI: new AutoIdGenerator('AreaPOI',3000),

    /** Starts at 6000, highest base value is 5872 */
    AreaTrigger: new IdGenerator('AreaTrigger',6000),

    /** Starts at 28, highest base value is 27 */
    AttackAnimKits: new AutoIdGenerator('AttackAnimKits',28),

    /** Starts at 9, highest base value is 8 */
    AttackAnimTypes: new AutoIdGenerator('AttackAnimTypes',9),

    /** Starts at 8, highest base value is 7 */
    AuctionHouse: new IdGenerator('AuctionHouse',8),

    /** Starts at 13, highest base value is 12 */
    BankBagSlotPrices: new IdGenerator('BankBagSlotPrices',13),

    /** Starts at 500, highest base value is 420 */
    BannedAddOns: new AutoIdGenerator('BannedAddOns',14),

    /** Starts at 1200, highest base value is 1149 */
    BarberShopStyle: new AutoIdGenerator('BarberShopStyle',1200),

    /** Starts at 40, highest base value is 32 */
    BattleMasterList: new AutoIdGenerator('BattlemasterList',40),

    /** Starts at 40, highest base value is 37 */
    Cfg_Categories: new AutoIdGenerator('Cfg_Categories',40),

    /** Starts at 14, highest base value is 13 */
    Cfg_Configs: new IdGenerator('Cfg_Configs',14),

    /** Starts at 223, highest base value is 222 */
    CharacterFacialHairStyles: new AutoIdGenerator('CharacterFacialHairStyles',223),

    // NOTE: Do NOT enable CharBaseInfo, it does NOT have an ID field!
    // CharBaseInfo: new AutoIdGenerator('CharBaseInfo',66),

    /** Starts at 447, highest base value is 446 */
    CharHairGeosets: new AutoIdGenerator('CharHairGeosets',447),

    /** Starts at 102, highest base value is 101 */
    CharHairTextures: new AutoIdGenerator('CharHairTextures',102),

    /** Starts at 15000, highest base value is 14078 */
    CharSections: new IdGenerator('CharSections',15000),

    /** Starts at 27, highest base value is 26 */
    ChatChannels: new IdGenerator('ChatChannels',30),

    /** Starts at 13000, highest base value is 12533 */
    ChatProfanity: new AutoIdGenerator('ChatProfanity',13000),

    /** Starts at 22, highest base value is 21 */
    ChrRaces: new AutoIdGenerator('ChrRaces',22),

    /** Starts at 300, highest base value is 246 */
    CinematicCamera: new AutoIdGenerator('CinematicCamera',300),

    /** Starts at 200, highest base value is 166 */
    CinematicSequences: new AutoIdGenerator('CinematicSequences',200),

    /** Starts at 47, highest base value is 46 */
    CreatureFamily: new IdGenerator('CreatureFamily',47),

    /** Starts at 4000, highest base value is 3440 */
    CreatureModelData: new IdGenerator('CreatureModelData',4000),

    /** Starts at 900, highest base value is 821 */
    CreatureMovementInfo: new AutoIdGenerator('CreatureMovementInfo',900),

    /** Starts at 4000, highest base value is 3108 */
    CreatureSoundData: new AutoIdGenerator('CreatureSoundData',4000),

    /** Starts at 16000, highest base value is 15226 */
    CreatureSpellData: new IdGenerator('CreatureSpellData',16000),

    /** Starts at 14, highest base value is 13 */
    CreatureType: new IdGenerator('CreatureType',14),

    /** Starts at 50, highest base value is 41 */
    CurrencyCategory: new AutoIdGenerator('CurrencyCategory',50),

    /** Starts at 400, highest base value is 341 */
    CurrencyTypes: new IdGenerator('CurrencyTypes',400),

    // @ts-ignore
    CurrencyTypesBitIndex: new IdGenerator('CurrencyTypesBitIndex',30),

    /** Starts at 100, highest base value is 85 */
    DanceMoves: new AutoIdGenerator('DanceMoves',100),

    /** Starts at 100, highest base value is 64 */
    DeathThudLookupes: new AutoIdGenerator('DeathThudLookups',100),

    /** Starts at 40000, highest base value is 33985 */
    DeclinedWord: new AutoIdGenerator('DeclinedWord',40000),

    /** Starts at 150000, highest base value is 146661 */
    DeclinedWordCases: new AutoIdGenerator('DeclinedWordCases',150000),

    /** Starts at 100, highest base value is 68*/
    DestructibleModelData: new AutoIdGenerator('DestructibleModelData',100),

    /** Starts at 1000, highest base value is 894 */
    DungeonEncounter: new IdGenerator('DungeonEncounter',1000),

    /** Starts at 200, highest base value is 110 */
    DungeonMap: new AutoIdGenerator('DungeonMap',200),

    /** Starts at 2000, highest base value is 1827 */
    DungeonMapChunk: new AutoIdGenerator('DungeonMapChunk',2000),

    /** Starts at 3618, highest base value is 3617 */
    // @ts-ignore
    AreaBit: new IdGenerator('AreaTableExplore',3618),

    /** Starts at 725, highest base value is 724 */
    Map: new IdGenerator('Map', 725),
    /** Starts at 250000, highest base value is 244605 */
    gameobject_template: new IdGenerator('gameobject_template',250000),
    /** Starts at 300000, highest base value is 165990 */
    gameobject: new IdGenerator('gameobject', 300000),
    /** Starts at  10000, highest base value is 9624 */
    GameObjectDisplayInfo: new AutoIdGenerator('GameObjectDisplayInfo',10000),
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
    creature_model_info: new AutoIdGenerator('creature_model_info',4000),

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
    SpellChainEffects: new AutoIdGenerator('SpellChainEffects',2000),

    /**
     * Starts at 100000, highest base value is 68529
     */
    spell_group: new AutoIdGenerator('spell_group',100000),

    /**
     * Starts at 1000000, highest base value is ~1000
     */
    game_tele: new AutoIdGenerator('game_tele',1000000),

    /**
     * Starts at 22000, highest base value is 21381
     */
    CreatureDisplayInfoExtra: new AutoIdGenerator('CreatureDisplayInfoExtra',22000),

    /**
     * Starts at 2147483648, highest base value is 2147483647 (shared with CreatureDisplayInfo/creature_model_info)
     */
    creature_template_outfits: new AutoIdGenerator('creature_template_outfits',2147483648),

    /**
     * Starts at 600, highest base value is 575
     */
    ZoneMusic: new AutoIdGenerator('ZoneMusic',600),

    /**
     * Starts at 300, highest base value is 291
     */
    MailTemplate: new AutoIdGenerator('MailTemplate', 300),

    /**
     * Starts at 500, highest base value is 440
     */
    TaxiNodes: new AutoIdGenerator('TaxiNodes',500),

    /**
     * Starts at 2000, highest base value is 1978
     */
    TaxiPath: new IdGenerator('TaxiPath',2000),

    /**
     * Starts at 50000, highest base value is 46874
     */
    TaxiPathNode: new AutoIdGenerator('TaxiPathNode',50000),

    /** Starts at 301, highest base value is 300 */
    DurabilityCosts: new AutoIdGenerator('DurabilityCosts',301),

    /** Starts at 17, highest base value is 16 */
    DurabilityQuality: new AutoIdGenerator('DurabilityQuality',17),

    /** Starts at 500, highest base value is 476 */
    Emotes: new AutoIdGenerator('Emotes',500),

    /** Starts at 500, highest base value is 453 */
    EmotesText: new AutoIdGenerator('EmotesText',500),

    /** Starts at 1500, highest base value is 1402 */
    EmotesTextData: new AutoIdGenerator('EmotesText',1500),

    /** Starts at 600, highest base value is 566 */
    EmotesTextSound: new AutoIdGenerator('EmotesText',600),

    /** Starts at 7, highest base value is 6 (cont) */
    EnvironmentalDamage: new AutoIdGenerator('EnvironmentalDamage',7),

    /** Starts at 7, highest base value is 6 (cont) */
    Exhaustion: new AutoIdGenerator('Exhaustion',7),

    /** Starts at 5, highest base value is 4 (cont) */
    FactionGroup: new AutoIdGenerator('FactionGroup',5),

    /** Starts at 36000, highest base value is 356944 */
    FileData: new AutoIdGenerator('FileData',36000),

    /** Starts at 10, highest base value is 7 */
    FootprintTextures: new AutoIdGenerator('FootprintTextures',10),

    /** Starts at 500, highest base value is 424 */
    FootstepTerrainLookup: new AutoIdGenerator('FootstepTerrainLookup',500),

    /** Starts at 200, highest base value is 175 */
    GMSurveyAnswers: new AutoIdGenerator('GMSurveyAnswers',200),

    /** Starts at 9, highest base value is 8 (cont) */
    GMSurveyCurrentSurvey: new AutoIdGenerator('GMSurveyCurrentSurvey',9),

    /** Starts at 50, highest base value is 41 */
    GMSurveyQuestions: new AutoIdGenerator('GMSurveyQuestions',50),

    /** Starts at 10, highest base value is 9 */
    GMSurveySurveys: new AutoIdGenerator('GMSurveySurveys',10),

    /** Starts at 38, highest base value is 37 */
    GMTicketCategory: new AutoIdGenerator('GMTicketCategory',38),

    /** Starts at 200, highest base value is 122 */
    GameObjectArtKit: new AutoIdGenerator('GameObjectArtKit',200),

    /** Starts at 600, highest base value is 509 */
    GameTips: new AutoIdGenerator('GameTips',600),

    /** Starts at 2000, highest base value is 1629 */
    GemProperties: new AutoIdGenerator('GemProperties',2000),

    /** Starts at 1000, highest base value is 911 */
    GlyphProperties: new AutoIdGenerator('GlyphProperties',1000),

    /** Starts at 30, highest base value is 26 */
    GlyphSlot: new AutoIdGenerator('GlyphSlot',30),

    /** Starts at 800, highest base value is 798 */
    GroundEffectDoodad: new AutoIdGenerator('GroundEffectDoodad',800),

    /** Starts at 80000, highest base value is 73186 */
    GroundEffectTexture: new AutoIdGenerator('GroundEffectTexture',80000),

    /** Starts at 400, highest base value is 376 */
    HelmetGeosetVisData: new AutoIdGenerator('HelmetGeosetVisData',400),

    /** Starts at 200, highest base value is 161 */
    HolidayDescriptions: new AutoIdGenerator('HolidayDescriptions', 200),

    /** Starts at 200, highest base value is 161 */
    HolidayNames: new AutoIdGenerator('HolidayNames',200),

    /** Starts at 500, highest base value is 424 */
    Holidays: new AutoIdGenerator('Holidays', 500),

    /** Starts at 16, highest base value is 15 (cont) */
    ItemBagFamily: new AutoIdGenerator('ItemBagFamily',16),

    /** Starts at 1600, highest base value is 1546 */
    ItemCondExtCosts: new AutoIdGenerator('ItemCondExtCosts',1600),

    /** Starts at 25, highest base value is 24 (cont) */
    ItemGroupSounds: new AutoIdGenerator('ItemGroupSounds',25),

    /** Starts at 100, highest base value is 85 */
    ItemLimitCategory: new AutoIdGenerator('ItemLimitCategory',100),

    /** Starts at 9, highest base value is 8 (cont) */
    ItemPetFood: new AutoIdGenerator('ItemPetFood',9),

    /** Starts at 2, highest base value is 1 */
    ItemPurchaseGroup: new AutoIdGenerator('ItemPurchaseGroup',2),

    /** Starts at 3000, highest base value is 2164 */
    ItemRandomProperties: new IdGenerator('ItemRandomProperties',3000),

    /** Starts at 100, highest base value is 99 (cont) */
    ItemRandomSuffix: new IdGenerator('ItemRandomSuffix',100),

    /** Starts at 1000, highest base value is 901 */
    ItemSet: new AutoIdGenerator('ItemSet',901),

    /** Starts at 2000, highest base value is 1677 */
    LanguageWords: new AutoIdGenerator('LanguageWords',2000),

    /** Starts at 300, highest base value is 220 */
    LfgDungeonExpansion: new AutoIdGenerator('LfgDungeonExpansion',300),

    /** Starts at 100, highest base value is 11 */
    LfgDungeonGroup: new AutoIdGenerator('LfgDungeonGroup',100),

    /** Starts at 300, highest base value is 294 */
    LfgDungeons: new AutoIdGenerator('LfgDungeons',300),

    /** Starts at 200, highest base value is 148 */
    LightSkybox: new AutoIdGenerator('LightSkybox',200),

    /** Starts at 4, highest base value is 3 (cont) */
    LiquidMaterial: new IdGenerator('LiquidMaterial',4),

    /** Starts at 200, highest base value is 181 */
    LiquidType: new IdGenerator('LiquidType',200),

    /** Starts at 200, highest base value is 181 */
    LoadingScreenTaxiSplines: new AutoIdGenerator('LoadingScreenTaxiSplines', 200),

    /** Starts at 300, highest base value is 254 */
    LoadingScreens: new AutoIdGenerator('LoadingScreens', 300),

    /** Starts at 800, highest base value is 753 */
    MapDifficulty: new IdGenerator('MapDifficulty',800),

    /** Starts at 9, highest base value is 8 (cont) */
    Material: new AutoIdGenerator('Material',9),

    /** Starts at 20, highest base value is 16 */
    Movie: new AutoIdGenerator('Movie', 20),

    /** Starts at 360000, highest base value is 356944 */
    MovieFileData: new AutoIdGenerator('MovieFileData',360000),

    /** Starts at 200, highest base value is 104 */
    MovieVariation: new AutoIdGenerator('MovieVariation',200),

    /** Starts at 400, highest base value is 336 */
    NPCSounds: new AutoIdGenerator('NPCSounds',336),

    /** Starts at 7000, highest base value is 6793 */
    NameGen: new AutoIdGenerator('NameGen',7000),

    /** Starts at 30000, highest base value is 21465 */
    NamesProfanity: new AutoIdGenerator('NamesProfanity',30000),

    /** Starts at 40000, highest base value is 32550 */
    NamesReserved: new AutoIdGenerator('NamesReserved', 40000),

    /** Starts at 900, highest base value is 828 */
    ObjectEffect: new AutoIdGenerator('ObjectEffect', 900),

    /** Starts at 700, highest base value is 611 */
    ObjectEffectGroup: new AutoIdGenerator('ObjectEffectGroup', 700),

    /** Starts at 300, highest base value is 202 */
    ObjectEffectModifier: new AutoIdGenerator('ObjectEffectModifier', 300),

    /** Starts at 500, highest base value is 491 */
    ObjectEffectPackage: new AutoIdGenerator('ObjectEffectPackage', 500),

    /** Starts at 900, highest base value is 844 */
    ObjectEffectPackageElem: new AutoIdGenerator('ObjectEffectPackageElem', 900),

    /** Starts at 300, highest base value is 271 */
    OverrideSpellData: new AutoIdGenerator('OverrideSpellData', 300),

    /** Starts at 3, highest base value is 2 (cont) */
    Package: new AutoIdGenerator('Package',3),

    /** Starts at 8, highest base value is 7 */
    PageTextMaterial: new AutoIdGenerator('PageTextMaterial',8),

    /** Starts at 4, highest base value is 3 */
    PetPersonality: new IdGenerator('PetPersonality', 4),

    /** Starts at 2, highest base value is 1 */
    PetitionType: new AutoIdGenerator('PetitionType',2),

    /** Starts at 200, highest base value is 142 */
    PowerDisplay: new AutoIdGenerator('PowerDisplay',200),

    /** Starts at 109, highest base value is 108 (cont) */
    PvpDifficulty: new AutoIdGenerator('PvpDifficulty',109),

    /** Starts at 3, highest base value is 2 */
    QuestFactionReward: new AutoIdGenerator('QuestFactionReward',3),

    /** Starts at 100, highest base value is 89 */
    QuestInfo: new AutoIdGenerator('QuestInfo', 100),

    /** Starts at 400, highest base value is 376 */
    QuestSort: new AutoIdGenerator('QuestSort',400),

    /** Starts at 101, highest base value is 100 (cont) */
    QuestXP: new AutoIdGenerator('QuestXP',101),

    /** Starts at 301, highest base value is 300 (cont) */
    RandPropPoints: new AutoIdGenerator('RandPropPoints',301),

    /** Starts at 7, highest base value is 6 (cont) */
    Resistances: new IdGenerator('Resistances',7),

    /** Starts at 400, highest base value is 371 */
    ScalingStatDistribution: new AutoIdGenerator('ScalingStatDistribution', 400),

    /** Starts at 300, highest base value is 200 */
    ScalingStatValues: new AutoIdGenerator('ScalingStatValues', 300),

    /** Starts at 800, highest base value is 760 */
    ScreenEffect: new IdGenerator('ScreenEffect', 800),

    /** Starts at 34, highest base value is 33 */
    SheatheSoundLookup: new AutoIdGenerator('SheatheSoundLookups', 34),

    /** Starts at 1501, highest base value is 1500 (cont) */
    SkillCostsData: new AutoIdGenerator('SkillCostsData', 1501),

    /** Starts at 13, highest base value is 12 */
    SkillLineCategory: new AutoIdGenerator('SkillLineCategory', 13),

    /** Starts at 300, highest base value is 223 */
    SkillTiers: new AutoIdGenerator('SkillTiers', 300),

    /** Starts at 600, highest base value is 505 */
    SoundAmbience: new AutoIdGenerator('SoundAmbience', 600),

    /** Starts at 3000, highest base value is 2549 */
    SoundEmitters: new AutoIdGenerator('SoundEmitters', 3000),

    /** Starts at 21, highest base value is 20 (cont) */
    SoundFilter: new AutoIdGenerator('SoundFilter', 21),

    /** Starts at 52, highest base value is 51 (cont) */
    SoundFilterElem: new AutoIdGenerator('SoundFilterElem', 52),

    /** Starts at 100, highest base value is 92 */
    SoundProviderPreferences: new AutoIdGenerator('SoundProviderPreferences', 100),

    /** Starts at 3, highest base value is 2 (cont) */
    SoundSamplePreferences: new AutoIdGenerator('SoundSamplePreferences', 3),

    /** Starts at 100, highest base value is 29 */
    SoundWaterType: new AutoIdGenerator('SoundWaterType', 100),

    /** Starts at 200, highest base value is 139 */
    SpamMessages: new AutoIdGenerator('SpamMessages', 200),

    /** Starts at 2000, highest base value is 1253 */
    SpellCategory: new AutoIdGenerator('SpellCategory', 2000),

    /** Starts at 2500, highest base value is 2401 */
    SpellDifficulty: new AutoIdGenerator('SpellDifficulty', 3000),

    /** Starts at 12, highest base value is 11 */
    SpellDispelType: new AutoIdGenerator('SpellDispelType', 12),

    /** Starts at 2000, highest base value is 1650 */
    SpellFocusObject: new AutoIdGenerator('SpellFocusObject', 2000),

    /** Starts at 4000, highest base value is 3883 */
    SpellItemEnchantment: new IdGenerator('SpellItemEnchantment', 4000),

    /** Starts at 200, highest base value is 194 */
    SpellItemEnchantmentCondition: new AutoIdGenerator('SpellItemEnchantmentCondition', 200),

    /** Starts at 32, highest base value is 31 */
    SpellMechanic: new AutoIdGenerator('SpellMechanic',32),

    /** Starts at 3000, highest base value is 2853 */
    SpellMissileMotion: new AutoIdGenerator('SpellMissileMotion', 3000),

    /** Starts at 100, highest base value is 83 */
    SpellVisualKitAreaModel: new AutoIdGenerator('SpellVisualKitAreaModel', 100),

    /** Starts at 4, highest base value is 3 (cont) */
    SpellVisualPrecastTransitions: new AutoIdGenerator('SpellVisualPrecastTransitions', 4),

    /** Starts at 5, highest base value is 4 (cont) */
    StableSlotPrices: new AutoIdGenerator('StableSlotPrices', 5),

    /** Starts at 6, highest base value is 100 */
    Startup_strings: new AutoIdGenerator('Startup_strings', 100),

    /** Starts at 100, highest base value is 67 */
    Stationery: new AutoIdGenerator('Stationery', 100),

    /** Starts at 10, highest base value is 9 (cont) */
    StringLookups: new AutoIdGenerator('StringLookups', 10),

    /** Starts at 1401, highest base value is 1400 (cont) */
    TeamContributionPoints: new AutoIdGenerator('TeamContributionPoints', 1401),

    /** Starts at 11, highest base value is 10 (cont) */
    TerrainTypeSounds: new AutoIdGenerator('TerraintypeSounds', 11),

    /** Starts at 200000, highest base value is 179690 */
    TransportAnimation: new AutoIdGenerator('TransportAnimation', 200000),

    /** Starts at 100, highest base value is 61 */
    TransportPhysics: new AutoIdGenerator('TransportPhysics', 100), 

    /** Starts at 2000, highest base value is 1608 */
    TransportRotation: new AutoIdGenerator('TransportRotation', 2000),

    /** Starts at 200, highest base value is 167 */
    UISoundLookups: new AutoIdGenerator('UISoundLookups', 200),

    /** Starts at 5, highest base value is 4 */
    UnitBlood: new AutoIdGenerator('UnitBlood', 5),

    /** Starts at 5, highest base value is 4 */
    UnitBloodLevels: new AutoIdGenerator('UnitBloodLevels', 5),

    /** Starts at 800, highest base value is 774 */
    Vehicle: new AutoIdGenerator('Vehicle', 800),

    /** Starts at 8000, highest base value is 7770 */
    VehicleSeat: new AutoIdGenerator('VehicleSeat', 8000),

    /** Starts at 300, highest base value is 242 */
    VehicleUIIndSeat: new AutoIdGenerator('VehicleUIIndSeat', 300),

    /** Starts at 300, highest bse value is 249 */
    VehicleUIIndicator: new AutoIdGenerator('VehicleUIIndicator', 300),

    /** Starts at 700, highest base value is 693 */
    VideoHardware: new AutoIdGenerator('VideoHardware', 700),

    /** Starts 900, highest base value is 900 */
    VocalUISounds: new AutoIdGenerator('VocalUISounds', 900),

    /** Starts at 60000, highest base value is 51118 */
    WMOAreaTable: new AutoIdGenerator('WMOAreaTable', 60000),

    /** Starts at 100, highest base value is 88 */
    WeaponImpactSounds: new AutoIdGenerator('WeaponImpactSounds', 100),

    /** Starts at 7, highest base value is 6 */
    WeaponSwingSounds2: new AutoIdGenerator('WeaponSwingSounds2', 7),

    /** Starts at 200, highest base value is 108 */
    Weather: new IdGenerator('Weather', 200),

    /** Starts at 700, highest base value is 609 */
    WorldMapArea: new AutoIdGenerator('WorldMapArea', 700),

    /** Starts at 5, highest base value is 4 (cont) */
    WorldMapContinent: new AutoIdGenerator('WorldMapContinent', 5),

    /** Starts at 2000, highest base value is 1641 */
    WorldMapOverlay: new AutoIdGenerator('WorldMapOverlay', 2000),

    /** Starts at 11, highest base value is 10 (cont) */
    WorldMapTransforms: new AutoIdGenerator('WorldMapTransforms', 11),

    /** Starts at 2000, highest base value is 1720 */
    WorldSafelocs: new AutoIdGenerator('WorldSafelocs', 2000),

    /** Starts at 300, highest base value is 283*/
    WorldStateUI: new AutoIdGenerator('WorldStateUI', 300),

    /** Starts at 14, highest base value is 13 (cont) */
    WowError_Strings: new AutoIdGenerator('WowError_Strings', 14),

    /** Starts at 700, highest base value is 601 */
    ZoneintroMusicTable: new AutoIdGenerator('ZoneintroMusicTable', 700),

    /** Starts at 5000, highest base value is 4785 */
    achievement_reward: new AutoIdGenerator('achievement_reward', 5000),

    /** Starts at 1000, highest base value is 32 */
    battleground_template: new AutoIdGenerator('battleground_template', 100),

    /** Starts at 100, highest base value is 84 */
    game_event: new AutoIdGenerator('game_event',100),

    /** Starts at 4000, highest base value is 3622 */
    page_text: new IdGenerator('page_text', 4000),

    /** Starts at 500, highest base value is 453 */
    points_of_interest: new IdGenerator('points_of_interest', 500),

    /** Starts at 100, highest base value is 20 */
    transports: new IdGenerator('transports', 100)
}