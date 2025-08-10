export declare class IDGeneratorBase {
    readonly table: string;
    readonly startId: number;
    constructor(table: string, startId: number);
}
export declare class StaticIDGenerator extends IDGeneratorBase {
    range(mod: string, id: string, size: number): import("../../../util/ids/Ids").IdRange;
    id(mod: string, id: string): number;
    dynamicId(): number;
}
export declare class DynamicIDGenerator {
    readonly table: string;
    protected curid: number;
    constructor(table: string, startId: number);
    range(size: number): number;
    id(): number;
}
export declare const Ids: {
    /** Creates a new static ID generator */
    CreateStatic: (table: string, startid: number) => StaticIDGenerator;
    CreateDynamic: (table: string, startId: number) => DynamicIDGenerator;
    /** Starts at 39 , Highest base value is 38 */
    Language: StaticIDGenerator;
    /** Start at 80900, Highest base value is 80864, capped at 1999999 */
    Spell: StaticIDGenerator;
    /** Starts at 16680, Highest base value is 16679*/
    SpellVisual: DynamicIDGenerator;
    /** Starts at 15543, Highest base value is 15542 */
    SpellKit: DynamicIDGenerator;
    /** Start at 21981, Highest base value is 21980 */
    SkillLineAbility: DynamicIDGenerator;
    /** Start at 789, Highest base value is 788 */
    SkillLine: StaticIDGenerator;
    /** Start at 971, Highest base value is 970 */
    SkillRaceClassInfo: DynamicIDGenerator;
    /** Start at 26100, Highest base value is 26034 */
    quest_template: StaticIDGenerator;
    /** Start at 178, Highest base value is 177 */
    CharTitles: DynamicIDGenerator;
    /** Starts at 143, Highest base value is 142. */
    CharTitleMask: StaticIDGenerator;
    /** Start at 4900, Highest base value is 4824 */
    Achievement: StaticIDGenerator;
    /** Start at 13500, Highest base value is 13470 */
    Achievement_Criteria: StaticIDGenerator;
    /** Starts at 15100, Highest base value is 15042 */
    Achievement_Category: DynamicIDGenerator;
    /** Starts at 506, Highest base value is 505 */
    AnimationData: DynamicIDGenerator;
    /** Start at 4376, Highest base value is 4375 */
    SpellIcon: DynamicIDGenerator;
    /** Starts at 200000, Highest base value is 100006 */
    creature_loot_template: DynamicIDGenerator;
    /** Starts at 200000, Highest base value is 195672 */
    gameobject_loot_template: DynamicIDGenerator;
    /** Starts at 200, Highest base value is 69 */
    disenchant_loot_template: DynamicIDGenerator;
    /** Starts at 35000, Highest base value is 34839 */
    pickpocketing_loot_template: DynamicIDGenerator;
    /** Starts at 200000, Highest base value is 100014 */
    skinning_loot_template: DynamicIDGenerator;
    /** Starts at 600000, Highest base value is 526760 */
    reference_loot_template: DynamicIDGenerator;
    /** Starts at 1161, Highest base value is 1160. */
    Faction: StaticIDGenerator;
    /** Starts at 2237, Highest base value is 2236. */
    FactionTemplate: DynamicIDGenerator;
    /** Starts at 105, Highest base value is 104. */
    ReputationIndex: StaticIDGenerator;
    /** Start at 60000 , Highest base value is 56807 */
    item_template: StaticIDGenerator;
    /** Starts at 12, Highest base value is 11 */
    Class: StaticIDGenerator;
    /** Starts at 45000, Highest base value is 43282 */
    creature_template: StaticIDGenerator;
    /** Starts at 220000, Highest base value is 213824 */
    creature: StaticIDGenerator;
    /** Starts at 401, Highest base value is 400*/
    TalentTab: StaticIDGenerator;
    /** Starts at 400, Highest base value is ?? */
    CharStartOutfit: DynamicIDGenerator;
    /** Starts at 128, Highest base value is 127 */
    Trainer: DynamicIDGenerator;
    /** Starts at 1000000, Highest base value is 16777215 (above start) */
    NPCText: StaticIDGenerator;
    /** Starts at 100000, Highest base value is 74294 */
    gossip_menu_option: DynamicIDGenerator;
    /** Starts at 58000, highest base value is 57019 */
    gossip_menu: StaticIDGenerator;
    /** Starts at 100000, highest base value is 77865 */
    BroadcastText: StaticIDGenerator;
    /** Starts at 210, highest base value is 209 */
    SpellCastTimes: DynamicIDGenerator;
    /** Starts at 2600, highest base value is 2513*/
    SpellRuneCost: DynamicIDGenerator;
    /** Starts at 3000, highest base value is 2935*/
    SummonProperties: DynamicIDGenerator;
    /** Starts at 191, highest base value is 190 */
    TotemCategory: StaticIDGenerator;
    /** Starts at 25, highest base value is 24 */
    TotemType: DynamicIDGenerator;
    /** Starts at 3000, highest base value is 2997 */
    ItemExtendedCost: DynamicIDGenerator;
    /** Starts at 10000000, highest base value is 9541001 */
    Waypoints: DynamicIDGenerator;
    /** Starts at 2300, highest base value is 2285*/
    Talent: StaticIDGenerator;
    /** Starts at 603, highest base value is 602*/
    SpellDuration: DynamicIDGenerator;
    /** Starts at 200, highest base value is 187*/
    SpellRange: DynamicIDGenerator;
    /** Starts at 66, highest base value is 65*/
    SpellRadius: DynamicIDGenerator;
    /** Starts at 2800, highest base value is 2706 */
    SpellMissile: DynamicIDGenerator;
    /** Starts at 182, highest base value is 181*/
    SpellDescriptionVariable: DynamicIDGenerator;
    /** Starts at 33, highest base value is 32 */
    SpellShapeshiftForm: DynamicIDGenerator;
    /** Starts at 33000, highest base value is 32754 */
    CreatureDisplayInfo: StaticIDGenerator;
    /** Starts at 70000, highest base value is 68742 */
    ItemDisplayInfo: StaticIDGenerator;
    /** Starts at 7100, highest base value is 7087 */
    SpellVisualEffectName: DynamicIDGenerator;
    /**
     * Starts at 5000000, highest base value is CreatureTemplate which grows up from 1000000.
     * Will collide if using more than 4000000 creature templates.
     */
    Vendor: DynamicIDGenerator;
    /**
     * Starts at 8000000, highest base value is Vendor which grows up from 4000000.
     * Will collide if using more than 4000000 Vendors.
     */
    TrainerCreature: DynamicIDGenerator;
    /** Starts at 2539, highest base value is 2538 */
    Light: DynamicIDGenerator;
    /** Starts at 918, highest base value is 917*/
    LightParam: DynamicIDGenerator;
    /** Starts at 4988, highest base value is 4987*/
    Area: StaticIDGenerator;
    /** Starts at 3000, highest base value is 2628 */
    AreaGroup: DynamicIDGenerator;
    /** Starts at 3000, highest base value is 2349 */
    AreaPOI: DynamicIDGenerator;
    /** Starts at 6000, highest base value is 5872 */
    AreaTrigger: StaticIDGenerator;
    /** Starts at 28, highest base value is 27 */
    AttackAnimKits: DynamicIDGenerator;
    /** Starts at 9, highest base value is 8 */
    AttackAnimTypes: DynamicIDGenerator;
    /** Starts at 8, highest base value is 7 */
    AuctionHouse: StaticIDGenerator;
    /** Starts at 13, highest base value is 12 */
    BankBagSlotPrices: StaticIDGenerator;
    /** Starts at 500, highest base value is 420 */
    BannedAddOns: DynamicIDGenerator;
    /** Starts at 1200, highest base value is 1149 */
    BarberShopStyle: DynamicIDGenerator;
    /** Starts at 40, highest base value is 32 */
    BattleMasterList: StaticIDGenerator;
    /** Starts at 40, highest base value is 37 */
    Cfg_Categories: DynamicIDGenerator;
    /** Starts at 14, highest base value is 13 */
    Cfg_Configs: StaticIDGenerator;
    /** Starts at 223, highest base value is 222 */
    CharacterFacialHairStyles: DynamicIDGenerator;
    /** Starts at 447, highest base value is 446 */
    CharHairGeosets: DynamicIDGenerator;
    /** Starts at 102, highest base value is 101 */
    CharHairTextures: DynamicIDGenerator;
    /** Starts at 15000, highest base value is 14078 */
    CharSections: StaticIDGenerator;
    /** Starts at 27, highest base value is 26 */
    ChatChannels: StaticIDGenerator;
    /** Starts at 13000, highest base value is 12533 */
    ChatProfanity: DynamicIDGenerator;
    /** Starts at 22, highest base value is 21 */
    ChrRaces: DynamicIDGenerator;
    /** Starts at 300, highest base value is 246 */
    CinematicCamera: StaticIDGenerator;
    /** Starts at 200, highest base value is 166 */
    CinematicSequences: StaticIDGenerator;
    /** Starts at 47, highest base value is 46 */
    CreatureFamily: StaticIDGenerator;
    /** Starts at 4000, highest base value is 3440 */
    CreatureModelData: DynamicIDGenerator;
    /** Starts at 900, highest base value is 821 */
    CreatureMovementInfo: StaticIDGenerator;
    /** Starts at 4000, highest base value is 3108 */
    CreatureSoundData: DynamicIDGenerator;
    /** Starts at 16000, highest base value is 15226 */
    CreatureSpellData: StaticIDGenerator;
    /** Starts at 14, highest base value is 13 */
    CreatureType: StaticIDGenerator;
    /** Starts at 50, highest base value is 41 */
    CurrencyCategory: DynamicIDGenerator;
    /** Starts at 400, highest base value is 341 */
    CurrencyTypes: StaticIDGenerator;
    CurrencyTypesBitIndex: StaticIDGenerator;
    /** Starts at 100, highest base value is 85 */
    DanceMoves: DynamicIDGenerator;
    /** Starts at 100, highest base value is 64 */
    DeathThudLookupes: DynamicIDGenerator;
    /** Starts at 40000, highest base value is 33985 */
    DeclinedWord: DynamicIDGenerator;
    /** Starts at 150000, highest base value is 146661 */
    DeclinedWordCases: DynamicIDGenerator;
    /** Starts at 100, highest base value is 68*/
    DestructibleModelData: DynamicIDGenerator;
    /** Starts at 1000, highest base value is 894 */
    DungeonEncounter: DynamicIDGenerator;
    /** Starts at 200, highest base value is 110 */
    DungeonMap: DynamicIDGenerator;
    /** Starts at 2000, highest base value is 1827 */
    DungeonMapChunk: DynamicIDGenerator;
    /** Starts at 3618, highest base value is 3617 */
    AreaBit: StaticIDGenerator;
    /** Starts at 725, highest base value is 724 */
    Map: StaticIDGenerator;
    /** Starts at 250000, highest base value is 244605 */
    gameobject_template: StaticIDGenerator;
    /** Starts at 200000, highest base value is 165990 */
    gameobject: StaticIDGenerator;
    /** Starts at  10000, highest base value is 9624 */
    GameObjectDisplayInfo: StaticIDGenerator;
    /**
     * Starts at 1000, highest base value is 21
     * (but some Spells use higher values, so 1000 is for safety)
     */
    LockType: DynamicIDGenerator;
    /**
     * Starts at 2000, highest base value is 1860
     */
    Lock: StaticIDGenerator;
    /**
     * Starts at 5000, highest base value is 5000
     */
    SpellVisualKitModelAttach: DynamicIDGenerator;
    /**
     * Starts at 4000, highest base value is 3440
     */
    creature_model_info: DynamicIDGenerator;
    /**
     * Starts at 4000, highest base value is 3627
     */
    SoundEntriesAdvanced: DynamicIDGenerator;
    /**
     * Starts at 20000, highest base value is 18019
     */
    SoundEntries: StaticIDGenerator;
    /**
     * Starts at 187, highest base value is 186
     */
    ItemVisuals: DynamicIDGenerator;
    /**
     * Starts at 216, highest base value is 215
     */
    ItemVisualEffects: DynamicIDGenerator;
    /**
     * Starts at 600, highest base value is 586
     */
    ParticleColors: DynamicIDGenerator;
    /**
     * Starts at 200, highest base value is 146
     */
    CameraShakes: DynamicIDGenerator;
    /**
     * Starts at 100, highest base value is 92
     */
    SpellEffectCameraShakes: DynamicIDGenerator;
    /**
     * Starts at 2000, highest base value is 1178
     */
    SpellChainEffects: DynamicIDGenerator;
    /**
     * Starts at 100000, highest base value is 68529
     */
    spell_group: DynamicIDGenerator;
    /**
     * Starts at 2000, highest base value is ~1000
     */
    game_tele: DynamicIDGenerator;
    /**
     * Starts at 22000, highest base value is 21381
     */
    CreatureDisplayInfoExtra: DynamicIDGenerator;
    /**
     * Starts at 2147483648, highest base value is 2147483647 (shared with CreatureDisplayInfo/creature_model_info)
     */
    creature_template_outfits: DynamicIDGenerator;
    /**
     * Starts at 600, highest base value is 575
     */
    ZoneMusic: StaticIDGenerator;
    /**
     * Starts at 300, highest base value is 291
     */
    MailTemplate: StaticIDGenerator;
    /**
     * Starts at 441, highest base value is 440. Max value is 2048
     */
    TaxiNodesFlightpath: StaticIDGenerator;
    /**
     * Starts at 2048, lower limit is "TaxiNodes" upper limit
     */
    TaxiNodesPlain: StaticIDGenerator;
    /**
     * Starts at 2000, highest base value is 1978
     */
    TaxiPath: StaticIDGenerator;
    /**
     * Starts at 50000, highest base value is 46874
     */
    TaxiPathNode: DynamicIDGenerator;
    /** Starts at 301, highest base value is 300 */
    DurabilityCosts: DynamicIDGenerator;
    /** Starts at 17, highest base value is 16 */
    DurabilityQuality: DynamicIDGenerator;
    /** Starts at 500, highest base value is 476 */
    Emotes: DynamicIDGenerator;
    /** Starts at 500, highest base value is 453 */
    EmotesText: DynamicIDGenerator;
    /** Starts at 1500, highest base value is 1402 */
    EmotesTextData: DynamicIDGenerator;
    /** Starts at 600, highest base value is 566 */
    EmotesTextSound: DynamicIDGenerator;
    /** Starts at 7, highest base value is 6 (cont) */
    EnvironmentalDamage: DynamicIDGenerator;
    /** Starts at 7, highest base value is 6 (cont) */
    Exhaustion: DynamicIDGenerator;
    /** Starts at 5, highest base value is 4 (cont) */
    FactionGroup: DynamicIDGenerator;
    /** Starts at 36000, highest base value is 356944 */
    FileData: DynamicIDGenerator;
    /** Starts at 10, highest base value is 7 */
    FootprintTextures: DynamicIDGenerator;
    /** Starts at 500, highest base value is 424 */
    FootstepTerrainLookup: DynamicIDGenerator;
    /** Starts at 200, highest base value is 175 */
    GMSurveyAnswers: StaticIDGenerator;
    /** Starts at 9, highest base value is 8 (cont) */
    GMSurveyCurrentSurvey: StaticIDGenerator;
    /** Starts at 50, highest base value is 41 */
    GMSurveyQuestions: StaticIDGenerator;
    /** Starts at 10, highest base value is 9 */
    GMSurveySurveys: StaticIDGenerator;
    /** Starts at 38, highest base value is 37 */
    GMTicketCategory: StaticIDGenerator;
    /** Starts at 200, highest base value is 122 */
    GameObjectArtKit: StaticIDGenerator;
    /** Starts at 600, highest base value is 509 */
    GameTips: DynamicIDGenerator;
    /** Starts at 2000, highest base value is 1629 */
    GemProperties: StaticIDGenerator;
    /** Starts at 1000, highest base value is 911 */
    GlyphProperties: StaticIDGenerator;
    /** Starts at 30, highest base value is 26 */
    GlyphSlot: DynamicIDGenerator;
    /** Starts at 800, highest base value is 798 */
    GroundEffectDoodad: StaticIDGenerator;
    /** Starts at 74000, highest base value is 73186 */
    GroundEffectTexture: DynamicIDGenerator;
    /** Starts at 400, highest base value is 376 */
    HelmetGeosetVisData: DynamicIDGenerator;
    /** Starts at 200, highest base value is 161 */
    HolidayDescriptions: DynamicIDGenerator;
    /** Starts at 200, highest base value is 161 */
    HolidayNames: DynamicIDGenerator;
    /** Starts at 500, highest base value is 424 */
    Holidays: StaticIDGenerator;
    /** Starts at 16, highest base value is 15 (cont) */
    ItemBagFamily: StaticIDGenerator;
    /** Starts at 1600, highest base value is 1546 */
    ItemCondExtCosts: DynamicIDGenerator;
    /** Starts at 25, highest base value is 24 (cont) */
    ItemGroupSounds: DynamicIDGenerator;
    /** Starts at 100, highest base value is 85 */
    ItemLimitCategory: DynamicIDGenerator;
    /** Starts at 9, highest base value is 8 (cont) */
    ItemPetFood: DynamicIDGenerator;
    /** Starts at 2, highest base value is 1 */
    ItemPurchaseGroup: DynamicIDGenerator;
    /** Starts at 3000, highest base value is 2164 */
    ItemRandomProperties: StaticIDGenerator;
    /** Starts at 100, highest base value is 99 (cont) */
    ItemRandomSuffix: StaticIDGenerator;
    /** Starts at 1000, highest base value is 901 */
    ItemSet: StaticIDGenerator;
    /** Starts at 2000, highest base value is 1677 */
    LanguageWords: DynamicIDGenerator;
    /** Starts at 300, highest base value is 220 */
    LfgDungeonExpansion: DynamicIDGenerator;
    /** Starts at 100, highest base value is 11 */
    LfgDungeonGroup: DynamicIDGenerator;
    /** Starts at 300, highest base value is 294 */
    LfgDungeons: StaticIDGenerator;
    /** Starts at 200, highest base value is 148 */
    LightSkybox: DynamicIDGenerator;
    /** Starts at 4, highest base value is 3 (cont) */
    LiquidMaterial: StaticIDGenerator;
    /** Starts at 200, highest base value is 181 */
    LiquidType: StaticIDGenerator;
    /** Starts at 200, highest base value is 181 */
    LoadingScreenTaxiSplines: DynamicIDGenerator;
    /** Starts at 300, highest base value is 254 */
    LoadingScreens: DynamicIDGenerator;
    /** Starts at 800, highest base value is 753 */
    MapDifficulty: StaticIDGenerator;
    /** Starts at 9, highest base value is 8 (cont) */
    Material: DynamicIDGenerator;
    /** Starts at 20, highest base value is 16 */
    Movie: DynamicIDGenerator;
    /** Starts at 360000, highest base value is 356944 */
    MovieFileData: DynamicIDGenerator;
    /** Starts at 200, highest base value is 104 */
    MovieVariation: DynamicIDGenerator;
    /** Starts at 400, highest base value is 336 */
    NPCSounds: DynamicIDGenerator;
    /** Starts at 7000, highest base value is 6793 */
    NameGen: DynamicIDGenerator;
    /** Starts at 30000, highest base value is 21465 */
    NamesProfanity: DynamicIDGenerator;
    /** Starts at 40000, highest base value is 32550 */
    NamesReserved: DynamicIDGenerator;
    /** Starts at 900, highest base value is 828 */
    ObjectEffect: DynamicIDGenerator;
    /** Starts at 700, highest base value is 611 */
    ObjectEffectGroup: DynamicIDGenerator;
    /** Starts at 300, highest base value is 202 */
    ObjectEffectModifier: DynamicIDGenerator;
    /** Starts at 500, highest base value is 491 */
    ObjectEffectPackage: DynamicIDGenerator;
    /** Starts at 900, highest base value is 844 */
    ObjectEffectPackageElem: DynamicIDGenerator;
    /** Starts at 300, highest base value is 271 */
    OverrideSpellData: DynamicIDGenerator;
    /** Starts at 3, highest base value is 2 (cont) */
    Package: DynamicIDGenerator;
    /** Starts at 8, highest base value is 7 */
    PageTextMaterial: StaticIDGenerator;
    /** Starts at 4, highest base value is 3 */
    PetPersonality: StaticIDGenerator;
    /** Starts at 2, highest base value is 1 */
    PetitionType: DynamicIDGenerator;
    /** Starts at 200, highest base value is 142 */
    PowerDisplay: DynamicIDGenerator;
    /** Starts at 109, highest base value is 108 (cont) */
    PvpDifficulty: StaticIDGenerator;
    /** Starts at 3, highest base value is 2 */
    QuestFactionReward: DynamicIDGenerator;
    /** Starts at 100, highest base value is 89 */
    QuestInfo: DynamicIDGenerator;
    /** Starts at 400, highest base value is 376 */
    QuestSort: DynamicIDGenerator;
    /** Starts at 101, highest base value is 100 (cont) */
    QuestXP: DynamicIDGenerator;
    /** Starts at 301, highest base value is 300 (cont) */
    RandPropPoints: DynamicIDGenerator;
    /** Starts at 7, highest base value is 6 (cont) */
    Resistances: StaticIDGenerator;
    /** Starts at 400, highest base value is 371 */
    ScalingStatDistribution: DynamicIDGenerator;
    /** Starts at 300, highest base value is 200 */
    ScalingStatValues: DynamicIDGenerator;
    /** Starts at 800, highest base value is 760 */
    ScreenEffect: StaticIDGenerator;
    /** Starts at 34, highest base value is 33 */
    SheatheSoundLookup: DynamicIDGenerator;
    /** Starts at 1501, highest base value is 1500 (cont) */
    SkillCostsData: DynamicIDGenerator;
    /** Starts at 13, highest base value is 12 */
    SkillLineCategory: DynamicIDGenerator;
    /** Starts at 300, highest base value is 223 */
    SkillTiers: DynamicIDGenerator;
    /** Starts at 600, highest base value is 505 */
    SoundAmbience: DynamicIDGenerator;
    /** Starts at 3000, highest base value is 2549 */
    SoundEmitters: DynamicIDGenerator;
    /** Starts at 21, highest base value is 20 (cont) */
    SoundFilter: DynamicIDGenerator;
    /** Starts at 52, highest base value is 51 (cont) */
    SoundFilterElem: DynamicIDGenerator;
    /** Starts at 100, highest base value is 92 */
    SoundProviderPreferences: DynamicIDGenerator;
    /** Starts at 3, highest base value is 2 (cont) */
    SoundSamplePreferences: DynamicIDGenerator;
    /** Starts at 100, highest base value is 29 */
    SoundWaterType: DynamicIDGenerator;
    /** Starts at 200, highest base value is 139 */
    SpamMessages: DynamicIDGenerator;
    /** Starts at 2000, highest base value is 1253 */
    SpellCategory: DynamicIDGenerator;
    /** Starts at 2500, highest base value is 2401 */
    SpellDifficulty: DynamicIDGenerator;
    /** Starts at 12, highest base value is 11 */
    SpellDispelType: DynamicIDGenerator;
    /** Starts at 2000, highest base value is 1650 */
    SpellFocusObject: DynamicIDGenerator;
    /** Starts at 4000, highest base value is 3883 */
    SpellItemEnchantment: StaticIDGenerator;
    /** Starts at 200, highest base value is 194 */
    SpellItemEnchantmentCondition: DynamicIDGenerator;
    /** Starts at 32, highest base value is 31 */
    SpellMechanic: DynamicIDGenerator;
    /** Starts at 3000, highest base value is 2853 */
    SpellMissileMotion: DynamicIDGenerator;
    /** Starts at 100, highest base value is 83 */
    SpellVisualKitAreaModel: DynamicIDGenerator;
    /** Starts at 4, highest base value is 3 (cont) */
    SpellVisualPrecastTransitions: DynamicIDGenerator;
    /** Starts at 5, highest base value is 4 (cont) */
    StableSlotPrices: DynamicIDGenerator;
    /** Starts at 6, highest base value is 100 */
    Startup_strings: DynamicIDGenerator;
    /** Starts at 100, highest base value is 67 */
    Stationery: DynamicIDGenerator;
    /** Starts at 10, highest base value is 9 (cont) */
    StringLookups: DynamicIDGenerator;
    /** Starts at 1401, highest base value is 1400 (cont) */
    TeamContributionPoints: DynamicIDGenerator;
    /** Starts at 13, highest base value is 12 (cont) */
    TerrainType: DynamicIDGenerator;
    /** Starts at 11, highest base value is 10 (cont) */
    TerrainTypeSounds: DynamicIDGenerator;
    /** Starts at 200000, highest base value is 179690 */
    TransportAnimation: DynamicIDGenerator;
    /** Starts at 100, highest base value is 61 */
    TransportPhysics: DynamicIDGenerator;
    /** Starts at 2000, highest base value is 1608 */
    TransportRotation: DynamicIDGenerator;
    /** Starts at 200, highest base value is 167 */
    UISoundLookups: DynamicIDGenerator;
    /** Starts at 5, highest base value is 4 */
    UnitBlood: DynamicIDGenerator;
    /** Starts at 5, highest base value is 4 */
    UnitBloodLevels: DynamicIDGenerator;
    /** Starts at 800, highest base value is 774 */
    Vehicle: DynamicIDGenerator;
    /** Starts at 8000, highest base value is 7770 */
    VehicleSeat: DynamicIDGenerator;
    /** Starts at 300, highest base value is 242 */
    VehicleUIIndSeat: DynamicIDGenerator;
    /** Starts at 300, highest bse value is 249 */
    VehicleUIIndicator: DynamicIDGenerator;
    /** Starts at 700, highest base value is 693 */
    VideoHardware: DynamicIDGenerator;
    /** Starts 900, highest base value is 900 */
    VocalUISounds: DynamicIDGenerator;
    /** Starts at 60000, highest base value is 51118 */
    WMOAreaTable: StaticIDGenerator;
    /** Starts at 100, highest base value is 88 */
    WeaponImpactSounds: DynamicIDGenerator;
    /** Starts at 7, highest base value is 6 */
    WeaponSwingSounds2: DynamicIDGenerator;
    /** Starts at 200, highest base value is 108 */
    Weather: StaticIDGenerator;
    /** Starts at 700, highest base value is 609 */
    WorldMapArea: DynamicIDGenerator;
    /** Starts at 5, highest base value is 4 (cont) */
    WorldMapContinent: DynamicIDGenerator;
    /** Starts at 2000, highest base value is 1641 */
    WorldMapOverlay: DynamicIDGenerator;
    /** Starts at 11, highest base value is 10 (cont) */
    WorldMapTransforms: DynamicIDGenerator;
    /** Starts at 2000, highest base value is 1720 */
    WorldSafelocs: DynamicIDGenerator;
    /** Starts at 6000, highest base value is slightly above 5000 */
    WorldState: StaticIDGenerator;
    /** Starts at 300, highest base value is 283*/
    WorldStateUI: DynamicIDGenerator;
    /** Starts at 14, highest base value is 13 (cont) */
    WowError_Strings: DynamicIDGenerator;
    /** Starts at 700, highest base value is 601 */
    ZoneintroMusicTable: DynamicIDGenerator;
    /** Starts at 5000, highest base value is 4785 */
    achievement_reward: DynamicIDGenerator;
    /** Starts at 1000, highest base value is 32 */
    battleground_template: DynamicIDGenerator;
    /** Starts at 100, highest base value is 84 */
    game_event: StaticIDGenerator;
    /** Starts at 1, highest base value is 0 */
    game_event_condition: StaticIDGenerator;
    /** Starts at 4000, highest base value is 3622 */
    page_text: StaticIDGenerator;
    /** Starts at 500, highest base value is 453 */
    points_of_interest: StaticIDGenerator;
    /** Starts at 700, highest base value is 20 (also used for the game object map id)*/
    transports: StaticIDGenerator;
    /**
     * Starts at 300, highest base value is 299
     * - value is hardcoded in server, see TSSmartScripts.h
     */
    smart_actions: StaticIDGenerator;
    /**
     * Starts at 300, highest base value is 299
     * - value is hardcoded in server, see TSSmartScripts.h
     */
    smart_events: StaticIDGenerator;
    /**
     * Starts at 0, no base values
     */
    instance_encounter_achievement: DynamicIDGenerator;
    /**
     * Starts at 1000, highest base value is 325
     */
    spawn_group_templates: StaticIDGenerator;
    /**
     * Starts at 100, highest base value is 52
     * - value is hardcoded in server, see TSSmartScripts.h
     */
    condition_types: StaticIDGenerator;
    /** Starts at 202500, highest base value is 202482 */
    pool_template: DynamicIDGenerator;
};
