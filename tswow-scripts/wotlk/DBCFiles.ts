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
/* tslint:disable */
import { DBCFile } from "../data/dbc/DBCFile"
import { AchievementDBCFile } from "./dbc/Achievement"
import { Achievement_CategoryDBCFile } from "./dbc/Achievement_Category"
import { Achievement_CriteriaDBCFile } from "./dbc/Achievement_Criteria"
import { AnimationDataDBCFile } from "./dbc/AnimationData"
import { AreaGroupDBCFile } from "./dbc/AreaGroup"
import { AreaPOIDBCFile } from "./dbc/AreaPOI"
import { AreaTableDBCFile } from "./dbc/AreaTable"
import { AreaTriggerDBCFile } from "./dbc/AreaTrigger"
import { AttackAnimKitsDBCFile } from "./dbc/AttackAnimKits"
import { AttackAnimTypesDBCFile } from "./dbc/AttackAnimTypes"
import { AuctionHouseDBCFile } from "./dbc/AuctionHouse"
import { BankBagSlotPricesDBCFile } from "./dbc/BankBagSlotPrices"
import { BannedAddOnsDBCFile } from "./dbc/BannedAddOns"
import { BarberShopStyleDBCFile } from "./dbc/BarberShopStyle"
import { BattlemasterListDBCFile } from "./dbc/BattlemasterList"
import { CameraShakesDBCFile } from "./dbc/CameraShakes"
import { Cfg_CategoriesDBCFile } from "./dbc/Cfg_Categories"
import { Cfg_ConfigsDBCFile } from "./dbc/Cfg_Configs"
import { CharacterFacialHairStylesDBCFile } from "./dbc/CharacterFacialHairStyles"
import { CharBaseInfoDBCFile } from "./dbc/CharBaseInfo"
import { CharHairGeosetsDBCFile } from "./dbc/CharHairGeosets"
import { CharHairTexturesDBCFile } from "./dbc/CharHairTextures"
import { CharSectionsDBCFile } from "./dbc/CharSections"
import { CharStartOutfitDBCFile } from "./dbc/CharStartOutfit"
import { CharTitlesDBCFile } from "./dbc/CharTitles"
import { ChatChannelsDBCFile } from "./dbc/ChatChannels"
import { ChatProfanityDBCFile } from "./dbc/ChatProfanity"
import { ChrClassesDBCFile } from "./dbc/ChrClasses"
import { ChrRacesDBCFile } from "./dbc/ChrRaces"
import { CinematicCameraDBCFile } from "./dbc/CinematicCamera"
import { CinematicSequencesDBCFile } from "./dbc/CinematicSequences"
import { CreatureDisplayInfoDBCFile } from "./dbc/CreatureDisplayInfo"
import { CreatureDisplayInfoExtraDBCFile } from "./dbc/CreatureDisplayInfoExtra"
import { CreatureFamilyDBCFile } from "./dbc/CreatureFamily"
import { CreatureModelDataDBCFile } from "./dbc/CreatureModelData"
import { CreatureMovementInfoDBCFile } from "./dbc/CreatureMovementInfo"
import { CreatureSoundDataDBCFile } from "./dbc/CreatureSoundData"
import { CreatureSpellDataDBCFile } from "./dbc/CreatureSpellData"
import { CreatureTypeDBCFile } from "./dbc/CreatureType"
import { CurrencyCategoryDBCFile } from "./dbc/CurrencyCategory"
import { CurrencyTypesDBCFile } from "./dbc/CurrencyTypes"
import { DanceMovesDBCFile } from "./dbc/DanceMoves"
import { DeathThudLookupsDBCFile } from "./dbc/DeathThudLookups"
import { DeclinedWordDBCFile } from "./dbc/DeclinedWord"
import { DeclinedWordCasesDBCFile } from "./dbc/DeclinedWordCases"
import { DestructibleModelDataDBCFile } from "./dbc/DestructibleModelData"
import { DungeonEncounterDBCFile } from "./dbc/DungeonEncounter"
import { DungeonMapDBCFile } from "./dbc/DungeonMap"
import { DungeonMapChunkDBCFile } from "./dbc/DungeonMapChunk"
import { DurabilityCostsDBCFile } from "./dbc/DurabilityCosts"
import { DurabilityQualityDBCFile } from "./dbc/DurabilityQuality"
import { EmotesDBCFile } from "./dbc/Emotes"
import { EmotesTextDBCFile } from "./dbc/EmotesText"
import { EmotesTextDataDBCFile } from "./dbc/EmotesTextData"
import { EmotesTextSoundDBCFile } from "./dbc/EmotesTextSound"
import { EnvironmentalDamageDBCFile } from "./dbc/EnvironmentalDamage"
import { ExhaustionDBCFile } from "./dbc/Exhaustion"
import { FactionDBCFile } from "./dbc/Faction"
import { FactionGroupDBCFile } from "./dbc/FactionGroup"
import { FactionTemplateDBCFile } from "./dbc/FactionTemplate"
import { FileDataDBCFile } from "./dbc/FileData"
import { FootprintTexturesDBCFile } from "./dbc/FootprintTextures"
import { FootstepTerrainLookupDBCFile } from "./dbc/FootstepTerrainLookup"
import { GameObjectArtKitDBCFile } from "./dbc/GameObjectArtKit"
import { GameObjectDisplayInfoDBCFile } from "./dbc/GameObjectDisplayInfo"
import { GameTablesDBCFile } from "./dbc/GameTables"
import { GameTipsDBCFile } from "./dbc/GameTips"
import { GemPropertiesDBCFile } from "./dbc/GemProperties"
import { GlyphPropertiesDBCFile } from "./dbc/GlyphProperties"
import { GlyphSlotDBCFile } from "./dbc/GlyphSlot"
import { GMSurveyAnswersDBCFile } from "./dbc/GMSurveyAnswers"
import { GMSurveyCurrentSurveyDBCFile } from "./dbc/GMSurveyCurrentSurvey"
import { GMSurveyQuestionsDBCFile } from "./dbc/GMSurveyQuestions"
import { GMSurveySurveysDBCFile } from "./dbc/GMSurveySurveys"
import { GMTicketCategoryDBCFile } from "./dbc/GMTicketCategory"
import { GroundEffectDoodadDBCFile } from "./dbc/GroundEffectDoodad"
import { GroundEffectTextureDBCFile } from "./dbc/GroundEffectTexture"
import { GtBarberShopCostBaseDBCFile } from "./dbc/GtBarberShopCostBase"
import { GtChanceToMeleeCritDBCFile } from "./dbc/GtChanceToMeleeCrit"
import { GtChanceToMeleeCritBaseDBCFile } from "./dbc/GtChanceToMeleeCritBase"
import { GtChanceToSpellCritDBCFile } from "./dbc/GtChanceToSpellCrit"
import { GtChanceToSpellCritBaseDBCFile } from "./dbc/GtChanceToSpellCritBase"
import { GtCombatRatingsDBCFile } from "./dbc/GtCombatRatings"
import { GtNPCManaCostScalerDBCFile } from "./dbc/GtNPCManaCostScaler"
import { GtOCTClassCombatRatingScalarDBCFile } from "./dbc/GtOCTClassCombatRatingScalar"
import { GtOCTRegenHPDBCFile } from "./dbc/GtOCTRegenHP"
import { GtOCTRegenMPDBCFile } from "./dbc/GtOCTRegenMP"
import { GtRegenHPPerSptDBCFile } from "./dbc/GtRegenHPPerSpt"
import { GtRegenMPPerSptDBCFile } from "./dbc/GtRegenMPPerSpt"
import { HelmetGeosetVisDataDBCFile } from "./dbc/HelmetGeosetVisData"
import { HolidayDescriptionsDBCFile } from "./dbc/HolidayDescriptions"
import { HolidayNamesDBCFile } from "./dbc/HolidayNames"
import { HolidaysDBCFile } from "./dbc/Holidays"
import { ItemDBCFile } from "./dbc/Item"
import { ItemBagFamilyDBCFile } from "./dbc/ItemBagFamily"
import { ItemClassDBCFile } from "./dbc/ItemClass"
import { ItemCondExtCostsDBCFile } from "./dbc/ItemCondExtCosts"
import { ItemDisplayInfoDBCFile } from "./dbc/ItemDisplayInfo"
import { ItemExtendedCostDBCFile } from "./dbc/ItemExtendedCost"
import { ItemGroupSoundsDBCFile } from "./dbc/ItemGroupSounds"
import { ItemLimitCategoryDBCFile } from "./dbc/ItemLimitCategory"
import { ItemPetFoodDBCFile } from "./dbc/ItemPetFood"
import { ItemPurchaseGroupDBCFile } from "./dbc/ItemPurchaseGroup"
import { ItemRandomPropertiesDBCFile } from "./dbc/ItemRandomProperties"
import { ItemRandomSuffixDBCFile } from "./dbc/ItemRandomSuffix"
import { ItemSetDBCFile } from "./dbc/ItemSet"
import { ItemSubClassDBCFile } from "./dbc/ItemSubClass"
import { ItemSubClassMaskDBCFile } from "./dbc/ItemSubClassMask"
import { ItemVisualEffectsDBCFile } from "./dbc/ItemVisualEffects"
import { ItemVisualsDBCFile } from "./dbc/ItemVisuals"
import { LanguagesDBCFile } from "./dbc/Languages"
import { LanguageWordsDBCFile } from "./dbc/LanguageWords"
import { LfgDungeonExpansionDBCFile } from "./dbc/LfgDungeonExpansion"
import { LfgDungeonGroupDBCFile } from "./dbc/LfgDungeonGroup"
import { LfgDungeonsDBCFile } from "./dbc/LfgDungeons"
import { LightDBCFile } from "./dbc/Light"
import { LightfloatBandDBCFile } from "./dbc/LightfloatBand"
import { LightintBandDBCFile } from "./dbc/LightintBand"
import { LightParamsDBCFile } from "./dbc/LightParams"
import { LightSkyboxDBCFile } from "./dbc/LightSkybox"
import { LiquidMaterialDBCFile } from "./dbc/LiquidMaterial"
import { LiquidTypeDBCFile } from "./dbc/LiquidType"
import { LoadingScreensDBCFile } from "./dbc/LoadingScreens"
import { LoadingScreenTaxiSplinesDBCFile } from "./dbc/LoadingScreenTaxiSplines"
import { LockDBCFile } from "./dbc/Lock"
import { LockTypeDBCFile } from "./dbc/LockType"
import { MailTemplateDBCFile } from "./dbc/MailTemplate"
import { MapDBCFile } from "./dbc/Map"
import { MapDifficultyDBCFile } from "./dbc/MapDifficulty"
import { MaterialDBCFile } from "./dbc/Material"
import { MovieDBCFile } from "./dbc/Movie"
import { MovieFileDataDBCFile } from "./dbc/MovieFileData"
import { MovieVariationDBCFile } from "./dbc/MovieVariation"
import { NameGenDBCFile } from "./dbc/NameGen"
import { NamesProfanityDBCFile } from "./dbc/NamesProfanity"
import { NamesReservedDBCFile } from "./dbc/NamesReserved"
import { NPCSoundsDBCFile } from "./dbc/NPCSounds"
import { ObjectEffectDBCFile } from "./dbc/ObjectEffect"
import { ObjectEffectGroupDBCFile } from "./dbc/ObjectEffectGroup"
import { ObjectEffectModifierDBCFile } from "./dbc/ObjectEffectModifier"
import { ObjectEffectPackageDBCFile } from "./dbc/ObjectEffectPackage"
import { ObjectEffectPackageElemDBCFile } from "./dbc/ObjectEffectPackageElem"
import { OverrideSpellDataDBCFile } from "./dbc/OverrideSpellData"
import { PackageDBCFile } from "./dbc/Package"
import { PageTextMaterialDBCFile } from "./dbc/PageTextMaterial"
import { PaperDollItemFrameDBCFile } from "./dbc/PaperDollItemFrame"
import { ParticleColorDBCFile } from "./dbc/ParticleColor"
import { PetitionTypeDBCFile } from "./dbc/PetitionType"
import { PetPersonalityDBCFile } from "./dbc/PetPersonality"
import { PowerDisplayDBCFile } from "./dbc/PowerDisplay"
import { PvpDifficultyDBCFile } from "./dbc/PvpDifficulty"
import { QuestFactionRewardDBCFile } from "./dbc/QuestFactionReward"
import { QuestInfoDBCFile } from "./dbc/QuestInfo"
import { QuestSortDBCFile } from "./dbc/QuestSort"
import { QuestXPDBCFile } from "./dbc/QuestXP"
import { RandPropPointsDBCFile } from "./dbc/RandPropPoints"
import { ResistancesDBCFile } from "./dbc/Resistances"
import { ScalingStatDistributionDBCFile } from "./dbc/ScalingStatDistribution"
import { ScalingStatValuesDBCFile } from "./dbc/ScalingStatValues"
import { ScreenEffectDBCFile } from "./dbc/ScreenEffect"
import { ServerMessagesDBCFile } from "./dbc/ServerMessages"
import { SheatheSoundLookupsDBCFile } from "./dbc/SheatheSoundLookups"
import { SkillCostsDataDBCFile } from "./dbc/SkillCostsData"
import { SkillLineDBCFile } from "./dbc/SkillLine"
import { SkillLineAbilityDBCFile } from "./dbc/SkillLineAbility"
import { SkillLineCategoryDBCFile } from "./dbc/SkillLineCategory"
import { SkillRaceClassInfoDBCFile } from "./dbc/SkillRaceClassInfo"
import { SkillTiersDBCFile } from "./dbc/SkillTiers"
import { SoundAmbienceDBCFile } from "./dbc/SoundAmbience"
import { SoundEmittersDBCFile } from "./dbc/SoundEmitters"
import { SoundEntriesDBCFile } from "./dbc/SoundEntries"
import { SoundEntriesAdvancedDBCFile } from "./dbc/SoundEntriesAdvanced"
import { SoundFilterDBCFile } from "./dbc/SoundFilter"
import { SoundFilterElemDBCFile } from "./dbc/SoundFilterElem"
import { SoundProviderPreferencesDBCFile } from "./dbc/SoundProviderPreferences"
import { SoundSamplePreferencesDBCFile } from "./dbc/SoundSamplePreferences"
import { SoundWaterTypeDBCFile } from "./dbc/SoundWaterType"
import { SpamMessagesDBCFile } from "./dbc/SpamMessages"
import { SpellDBCFile } from "./dbc/Spell"
import { SpellCastTimesDBCFile } from "./dbc/SpellCastTimes"
import { SpellCategoryDBCFile } from "./dbc/SpellCategory"
import { SpellChainEffectsDBCFile } from "./dbc/SpellChainEffects"
import { SpellDescriptionVariablesDBCFile } from "./dbc/SpellDescriptionVariables"
import { SpellDifficultyDBCFile } from "./dbc/SpellDifficulty"
import { SpellDispelTypeDBCFile } from "./dbc/SpellDispelType"
import { SpellDurationDBCFile } from "./dbc/SpellDuration"
import { SpellEffectCameraShakesDBCFile } from "./dbc/SpellEffectCameraShakes"
import { SpellFocusObjectDBCFile } from "./dbc/SpellFocusObject"
import { SpellIconDBCFile } from "./dbc/SpellIcon"
import { SpellItemEnchantmentDBCFile } from "./dbc/SpellItemEnchantment"
import { SpellItemEnchantmentConditionDBCFile } from "./dbc/SpellItemEnchantmentCondition"
import { SpellMechanicDBCFile } from "./dbc/SpellMechanic"
import { SpellMissileDBCFile } from "./dbc/SpellMissile"
import { SpellMissileMotionDBCFile } from "./dbc/SpellMissileMotion"
import { SpellRadiusDBCFile } from "./dbc/SpellRadius"
import { SpellRangeDBCFile } from "./dbc/SpellRange"
import { SpellRuneCostDBCFile } from "./dbc/SpellRuneCost"
import { SpellShapeshiftFormDBCFile } from "./dbc/SpellShapeshiftForm"
import { SpellVisualDBCFile } from "./dbc/SpellVisual"
import { SpellVisualEffectNameDBCFile } from "./dbc/SpellVisualEffectName"
import { SpellVisualKitDBCFile } from "./dbc/SpellVisualKit"
import { SpellVisualKitAreaModelDBCFile } from "./dbc/SpellVisualKitAreaModel"
import { SpellVisualKitModelAttachDBCFile } from "./dbc/SpellVisualKitModelAttach"
import { SpellVisualPrecastTransitionsDBCFile } from "./dbc/SpellVisualPrecastTransitions"
import { StableSlotPricesDBCFile } from "./dbc/StableSlotPrices"
import { Startup_stringsDBCFile } from "./dbc/Startup_strings"
import { StationeryDBCFile } from "./dbc/Stationery"
import { StringLookupsDBCFile } from "./dbc/StringLookups"
import { SummonPropertiesDBCFile } from "./dbc/SummonProperties"
import { TalentDBCFile } from "./dbc/Talent"
import { TalentTabDBCFile } from "./dbc/TalentTab"
import { TaxiNodesDBCFile } from "./dbc/TaxiNodes"
import { TaxiPathDBCFile } from "./dbc/TaxiPath"
import { TaxiPathNodeDBCFile } from "./dbc/TaxiPathNode"
import { TeamContributionPointsDBCFile } from "./dbc/TeamContributionPoints"
import { TerraintypeDBCFile } from "./dbc/Terraintype"
import { TerraintypeSoundsDBCFile } from "./dbc/TerraintypeSounds"
import { TotemCategoryDBCFile } from "./dbc/TotemCategory"
import { TransportAnimationDBCFile } from "./dbc/TransportAnimation"
import { TransportPhysicsDBCFile } from "./dbc/TransportPhysics"
import { TransportRotationDBCFile } from "./dbc/TransportRotation"
import { UISoundLookupsDBCFile } from "./dbc/UISoundLookups"
import { UnitBloodDBCFile } from "./dbc/UnitBlood"
import { UnitBloodLevelsDBCFile } from "./dbc/UnitBloodLevels"
import { VehicleDBCFile } from "./dbc/Vehicle"
import { VehicleSeatDBCFile } from "./dbc/VehicleSeat"
import { VehicleUIIndicatorDBCFile } from "./dbc/VehicleUIIndicator"
import { VehicleUIIndSeatDBCFile } from "./dbc/VehicleUIIndSeat"
import { VideoHardwareDBCFile } from "./dbc/VideoHardware"
import { VocalUISoundsDBCFile } from "./dbc/VocalUISounds"
import { WeaponImpactSoundsDBCFile } from "./dbc/WeaponImpactSounds"
import { WeaponSwingSounds2DBCFile } from "./dbc/WeaponSwingSounds2"
import { WeatherDBCFile } from "./dbc/Weather"
import { WMOAreaTableDBCFile } from "./dbc/WMOAreaTable"
import { WorldChunkSoundsDBCFile } from "./dbc/WorldChunkSounds"
import { WorldMapAreaDBCFile } from "./dbc/WorldMapArea"
import { WorldMapContinentDBCFile } from "./dbc/WorldMapContinent"
import { WorldMapOverlayDBCFile } from "./dbc/WorldMapOverlay"
import { WorldMapTransformsDBCFile } from "./dbc/WorldMapTransforms"
import { WorldSafelocsDBCFile } from "./dbc/WorldSafelocs"
import { WorldStateUIDBCFile } from "./dbc/WorldStateUI"
import { WorldStateZoneSoundsDBCFile } from "./dbc/WorldStateZoneSounds"
import { WowError_StringsDBCFile } from "./dbc/WowError_Strings"
import { ZoneintroMusicTableDBCFile } from "./dbc/ZoneintroMusicTable"
import { ZoneMusicDBCFile } from "./dbc/ZoneMusic"

export const DBC = {

    /**
     * Defines an achievement. See Achievement_Criteria for how to actually earn achievements.
     */
    Achievement : new AchievementDBCFile(),

    /**
     * No comment (yet!)
     */
    Achievement_Category : new Achievement_CategoryDBCFile(),

    /**
     * No comment (yet!)
     */
    Achievement_Criteria : new Achievement_CriteriaDBCFile(),

    /**
     * No comment (yet!)
     */
    AnimationData : new AnimationDataDBCFile(),

    /**
     * NEEDS RESEARCH
     */
    AreaGroup : new AreaGroupDBCFile(),

    /**
     * Contains Points of Interests in the overhead map and battleground maps. Includes text, icons, positioning and other miscellaneous things related to POI.
     */
    AreaPOI : new AreaPOIDBCFile(),

    /**
     * Defines zones and sub-zones
     */
    AreaTable : new AreaTableDBCFile(),

    /**
     * No comment (yet!)
     */
    AreaTrigger : new AreaTriggerDBCFile(),

    /**
     * No comment (yet!)
     */
    AttackAnimKits : new AttackAnimKitsDBCFile(),

    /**
     * No comment (yet!)
     */
    AttackAnimTypes : new AttackAnimTypesDBCFile(),

    /**
     * No comment (yet!)
     */
    AuctionHouse : new AuctionHouseDBCFile(),

    /**
     * No comment (yet!)
     */
    BankBagSlotPrices : new BankBagSlotPricesDBCFile(),

    /**
     * No comment (yet!)
     */
    BannedAddOns : new BannedAddOnsDBCFile(),

    /**
     * No comment (yet!)
     */
    BarberShopStyle : new BarberShopStyleDBCFile(),

    /**
     * No comment (yet!)
     */
    BattlemasterList : new BattlemasterListDBCFile(),

    /**
     * No comment (yet!)
     */
    CameraShakes : new CameraShakesDBCFile(),

    /**
     * No comment (yet!)
     */
    Cfg_Categories : new Cfg_CategoriesDBCFile(),

    /**
     * No comment (yet!)
     */
    Cfg_Configs : new Cfg_ConfigsDBCFile(),

    /**
     * No comment (yet!)
     */
    CharacterFacialHairStyles : new CharacterFacialHairStylesDBCFile(),

    /**
     * No comment (yet!)
     */
    CharBaseInfo : new CharBaseInfoDBCFile(),

    /**
     * No comment (yet!)
     */
    CharHairGeosets : new CharHairGeosetsDBCFile(),

    /**
     * No comment (yet!)
     */
    CharHairTextures : new CharHairTexturesDBCFile(),

    /**
     * No comment (yet!)
     */
    CharSections : new CharSectionsDBCFile(),

    /**
     * Decides what outfit newly created characters start with
     */
    CharStartOutfit : new CharStartOutfitDBCFile(),

    /**
     * Defines displayed titles
     */
    CharTitles : new CharTitlesDBCFile(),

    /**
     * No comment (yet!)
     */
    ChatChannels : new ChatChannelsDBCFile(),

    /**
     * No comment (yet!)
     */
    ChatProfanity : new ChatProfanityDBCFile(),

    /**
     * Defines playable classes. Its easiest to clone a row for the class you want to resemble.
     */
    ChrClasses : new ChrClassesDBCFile(),

    /**
     * Defines races
     */
    ChrRaces : new ChrRacesDBCFile(),

    /**
     * No comment (yet!)
     */
    CinematicCamera : new CinematicCameraDBCFile(),

    /**
     * No comment (yet!)
     */
    CinematicSequences : new CinematicSequencesDBCFile(),

    /**
     * Defines the looks and sound of a creature
     */
    CreatureDisplayInfo : new CreatureDisplayInfoDBCFile(),

    /**
     * No comment (yet!)
     */
    CreatureDisplayInfoExtra : new CreatureDisplayInfoExtraDBCFile(),

    /**
     * No comment (yet!)
     */
    CreatureFamily : new CreatureFamilyDBCFile(),

    /**
     * No comment (yet!)
     */
    CreatureModelData : new CreatureModelDataDBCFile(),

    /**
     * No comment (yet!)
     */
    CreatureMovementInfo : new CreatureMovementInfoDBCFile(),

    /**
     * No comment (yet!)
     */
    CreatureSoundData : new CreatureSoundDataDBCFile(),

    /**
     * No comment (yet!)
     */
    CreatureSpellData : new CreatureSpellDataDBCFile(),

    /**
     * No comment (yet!)
     */
    CreatureType : new CreatureTypeDBCFile(),

    /**
     * No comment (yet!)
     */
    CurrencyCategory : new CurrencyCategoryDBCFile(),

    /**
     * No comment (yet!)
     */
    CurrencyTypes : new CurrencyTypesDBCFile(),

    /**
     * No comment (yet!)
     */
    DanceMoves : new DanceMovesDBCFile(),

    /**
     * No comment (yet!)
     */
    DeathThudLookups : new DeathThudLookupsDBCFile(),

    /**
     * No comment (yet!)
     */
    DeclinedWord : new DeclinedWordDBCFile(),

    /**
     * No comment (yet!)
     */
    DeclinedWordCases : new DeclinedWordCasesDBCFile(),

    /**
     * No comment (yet!)
     */
    DestructibleModelData : new DestructibleModelDataDBCFile(),

    /**
     * No comment (yet!)
     */
    DungeonEncounter : new DungeonEncounterDBCFile(),

    /**
     * No comment (yet!)
     */
    DungeonMap : new DungeonMapDBCFile(),

    /**
     * No comment (yet!)
     */
    DungeonMapChunk : new DungeonMapChunkDBCFile(),

    /**
     * No comment (yet!)
     */
    DurabilityCosts : new DurabilityCostsDBCFile(),

    /**
     * No comment (yet!)
     */
    DurabilityQuality : new DurabilityQualityDBCFile(),

    /**
     * No comment (yet!)
     */
    Emotes : new EmotesDBCFile(),

    /**
     * No comment (yet!)
     */
    EmotesText : new EmotesTextDBCFile(),

    /**
     * No comment (yet!)
     */
    EmotesTextData : new EmotesTextDataDBCFile(),

    /**
     * No comment (yet!)
     */
    EmotesTextSound : new EmotesTextSoundDBCFile(),

    /**
     * No comment (yet!)
     */
    EnvironmentalDamage : new EnvironmentalDamageDBCFile(),

    /**
     * No comment (yet!)
     */
    Exhaustion : new ExhaustionDBCFile(),

    /**
     * No comment (yet!)
     */
    Faction : new FactionDBCFile(),

    /**
     * No comment (yet!)
     */
    FactionGroup : new FactionGroupDBCFile(),

    /**
     * No comment (yet!)
     */
    FactionTemplate : new FactionTemplateDBCFile(),

    /**
     * No comment (yet!)
     */
    FileData : new FileDataDBCFile(),

    /**
     * No comment (yet!)
     */
    FootprintTextures : new FootprintTexturesDBCFile(),

    /**
     * No comment (yet!)
     */
    FootstepTerrainLookup : new FootstepTerrainLookupDBCFile(),

    /**
     * No comment (yet!)
     */
    GameObjectArtKit : new GameObjectArtKitDBCFile(),

    /**
     * No comment (yet!)
     */
    GameObjectDisplayInfo : new GameObjectDisplayInfoDBCFile(),

    /**
     * No comment (yet!)
     */
    GameTables : new GameTablesDBCFile(),

    /**
     * No comment (yet!)
     */
    GameTips : new GameTipsDBCFile(),

    /**
     * No comment (yet!)
     */
    GemProperties : new GemPropertiesDBCFile(),

    /**
     * No comment (yet!)
     */
    GlyphProperties : new GlyphPropertiesDBCFile(),

    /**
     * No comment (yet!)
     */
    GlyphSlot : new GlyphSlotDBCFile(),

    /**
     * No comment (yet!)
     */
    GMSurveyAnswers : new GMSurveyAnswersDBCFile(),

    /**
     * No comment (yet!)
     */
    GMSurveyCurrentSurvey : new GMSurveyCurrentSurveyDBCFile(),

    /**
     * No comment (yet!)
     */
    GMSurveyQuestions : new GMSurveyQuestionsDBCFile(),

    /**
     * No comment (yet!)
     */
    GMSurveySurveys : new GMSurveySurveysDBCFile(),

    /**
     * No comment (yet!)
     */
    GMTicketCategory : new GMTicketCategoryDBCFile(),

    /**
     * No comment (yet!)
     */
    GroundEffectDoodad : new GroundEffectDoodadDBCFile(),

    /**
     * No comment (yet!)
     */
    GroundEffectTexture : new GroundEffectTextureDBCFile(),

    /**
     * No comment (yet!)
     */
    GtBarberShopCostBase : new GtBarberShopCostBaseDBCFile(),

    /**
     * No comment (yet!)
     */
    GtChanceToMeleeCrit : new GtChanceToMeleeCritDBCFile(),

    /**
     * No comment (yet!)
     */
    GtChanceToMeleeCritBase : new GtChanceToMeleeCritBaseDBCFile(),

    /**
     * No comment (yet!)
     */
    GtChanceToSpellCrit : new GtChanceToSpellCritDBCFile(),

    /**
     * No comment (yet!)
     */
    GtChanceToSpellCritBase : new GtChanceToSpellCritBaseDBCFile(),

    /**
     * No comment (yet!)
     */
    GtCombatRatings : new GtCombatRatingsDBCFile(),

    /**
     * No comment (yet!)
     */
    GtNPCManaCostScaler : new GtNPCManaCostScalerDBCFile(),

    /**
     * No comment (yet!)
     */
    GtOCTClassCombatRatingScalar : new GtOCTClassCombatRatingScalarDBCFile(),

    /**
     * No comment (yet!)
     */
    GtOCTRegenHP : new GtOCTRegenHPDBCFile(),

    /**
     * No comment (yet!)
     */
    GtOCTRegenMP : new GtOCTRegenMPDBCFile(),

    /**
     * No comment (yet!)
     */
    GtRegenHPPerSpt : new GtRegenHPPerSptDBCFile(),

    /**
     * No comment (yet!)
     */
    GtRegenMPPerSpt : new GtRegenMPPerSptDBCFile(),

    /**
     * No comment (yet!)
     */
    HelmetGeosetVisData : new HelmetGeosetVisDataDBCFile(),

    /**
     * No comment (yet!)
     */
    HolidayDescriptions : new HolidayDescriptionsDBCFile(),

    /**
     * No comment (yet!)
     */
    HolidayNames : new HolidayNamesDBCFile(),

    /**
     * No comment (yet!)
     */
    Holidays : new HolidaysDBCFile(),

    /**
     * No comment (yet!)
     */
    Item : new ItemDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemBagFamily : new ItemBagFamilyDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemClass : new ItemClassDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemCondExtCosts : new ItemCondExtCostsDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemDisplayInfo : new ItemDisplayInfoDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemExtendedCost : new ItemExtendedCostDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemGroupSounds : new ItemGroupSoundsDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemLimitCategory : new ItemLimitCategoryDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemPetFood : new ItemPetFoodDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemPurchaseGroup : new ItemPurchaseGroupDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemRandomProperties : new ItemRandomPropertiesDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemRandomSuffix : new ItemRandomSuffixDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemSet : new ItemSetDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemSubClass : new ItemSubClassDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemSubClassMask : new ItemSubClassMaskDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemVisualEffects : new ItemVisualEffectsDBCFile(),

    /**
     * No comment (yet!)
     */
    ItemVisuals : new ItemVisualsDBCFile(),

    /**
     * No comment (yet!)
     */
    Languages : new LanguagesDBCFile(),

    /**
     * No comment (yet!)
     */
    LanguageWords : new LanguageWordsDBCFile(),

    /**
     * No comment (yet!)
     */
    LfgDungeonExpansion : new LfgDungeonExpansionDBCFile(),

    /**
     * No comment (yet!)
     */
    LfgDungeonGroup : new LfgDungeonGroupDBCFile(),

    /**
     * No comment (yet!)
     */
    LfgDungeons : new LfgDungeonsDBCFile(),

    /**
     * No comment (yet!)
     */
    Light : new LightDBCFile(),

    /**
     * No comment (yet!)
     */
    LightfloatBand : new LightfloatBandDBCFile(),

    /**
     * No comment (yet!)
     */
    LightintBand : new LightintBandDBCFile(),

    /**
     * No comment (yet!)
     */
    LightParams : new LightParamsDBCFile(),

    /**
     * No comment (yet!)
     */
    LightSkybox : new LightSkyboxDBCFile(),

    /**
     * No comment (yet!)
     */
    LiquidMaterial : new LiquidMaterialDBCFile(),

    /**
     * No comment (yet!)
     */
    LiquidType : new LiquidTypeDBCFile(),

    /**
     * No comment (yet!)
     */
    LoadingScreens : new LoadingScreensDBCFile(),

    /**
     * No comment (yet!)
     */
    LoadingScreenTaxiSplines : new LoadingScreenTaxiSplinesDBCFile(),

    /**
     * No comment (yet!)
     */
    Lock : new LockDBCFile(),

    /**
     * No comment (yet!)
     */
    LockType : new LockTypeDBCFile(),

    /**
     * No comment (yet!)
     */
    MailTemplate : new MailTemplateDBCFile(),

    /**
     * No comment (yet!)
     */
    Map : new MapDBCFile(),

    /**
     * No comment (yet!)
     */
    MapDifficulty : new MapDifficultyDBCFile(),

    /**
     * No comment (yet!)
     */
    Material : new MaterialDBCFile(),

    /**
     * No comment (yet!)
     */
    Movie : new MovieDBCFile(),

    /**
     * No comment (yet!)
     */
    MovieFileData : new MovieFileDataDBCFile(),

    /**
     * No comment (yet!)
     */
    MovieVariation : new MovieVariationDBCFile(),

    /**
     * No comment (yet!)
     */
    NameGen : new NameGenDBCFile(),

    /**
     * No comment (yet!)
     */
    NamesProfanity : new NamesProfanityDBCFile(),

    /**
     * No comment (yet!)
     */
    NamesReserved : new NamesReservedDBCFile(),

    /**
     * No comment (yet!)
     */
    NPCSounds : new NPCSoundsDBCFile(),

    /**
     * No comment (yet!)
     */
    ObjectEffect : new ObjectEffectDBCFile(),

    /**
     * No comment (yet!)
     */
    ObjectEffectGroup : new ObjectEffectGroupDBCFile(),

    /**
     * No comment (yet!)
     */
    ObjectEffectModifier : new ObjectEffectModifierDBCFile(),

    /**
     * No comment (yet!)
     */
    ObjectEffectPackage : new ObjectEffectPackageDBCFile(),

    /**
     * No comment (yet!)
     */
    ObjectEffectPackageElem : new ObjectEffectPackageElemDBCFile(),

    /**
     * No comment (yet!)
     */
    OverrideSpellData : new OverrideSpellDataDBCFile(),

    /**
     * No comment (yet!)
     */
    Package : new PackageDBCFile(),

    /**
     * No comment (yet!)
     */
    PageTextMaterial : new PageTextMaterialDBCFile(),

    /**
     * No comment (yet!)
     */
    PaperDollItemFrame : new PaperDollItemFrameDBCFile(),

    /**
     * No comment (yet!)
     */
    ParticleColor : new ParticleColorDBCFile(),

    /**
     * No comment (yet!)
     */
    PetitionType : new PetitionTypeDBCFile(),

    /**
     * No comment (yet!)
     */
    PetPersonality : new PetPersonalityDBCFile(),

    /**
     * No comment (yet!)
     */
    PowerDisplay : new PowerDisplayDBCFile(),

    /**
     * No comment (yet!)
     */
    PvpDifficulty : new PvpDifficultyDBCFile(),

    /**
     * No comment (yet!)
     */
    QuestFactionReward : new QuestFactionRewardDBCFile(),

    /**
     * No comment (yet!)
     */
    QuestInfo : new QuestInfoDBCFile(),

    /**
     * No comment (yet!)
     */
    QuestSort : new QuestSortDBCFile(),

    /**
     * No comment (yet!)
     */
    QuestXP : new QuestXPDBCFile(),

    /**
     * No comment (yet!)
     */
    RandPropPoints : new RandPropPointsDBCFile(),

    /**
     * No comment (yet!)
     */
    Resistances : new ResistancesDBCFile(),

    /**
     * No comment (yet!)
     */
    ScalingStatDistribution : new ScalingStatDistributionDBCFile(),

    /**
     * No comment (yet!)
     */
    ScalingStatValues : new ScalingStatValuesDBCFile(),

    /**
     * No comment (yet!)
     */
    ScreenEffect : new ScreenEffectDBCFile(),

    /**
     * No comment (yet!)
     */
    ServerMessages : new ServerMessagesDBCFile(),

    /**
     * No comment (yet!)
     */
    SheatheSoundLookups : new SheatheSoundLookupsDBCFile(),

    /**
     * No comment (yet!)
     */
    SkillCostsData : new SkillCostsDataDBCFile(),

    /**
     * No comment (yet!)
     */
    SkillLine : new SkillLineDBCFile(),

    /**
     * No comment (yet!)
     */
    SkillLineAbility : new SkillLineAbilityDBCFile(),

    /**
     * No comment (yet!)
     */
    SkillLineCategory : new SkillLineCategoryDBCFile(),

    /**
     * No comment (yet!)
     */
    SkillRaceClassInfo : new SkillRaceClassInfoDBCFile(),

    /**
     * No comment (yet!)
     */
    SkillTiers : new SkillTiersDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundAmbience : new SoundAmbienceDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundEmitters : new SoundEmittersDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundEntries : new SoundEntriesDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundEntriesAdvanced : new SoundEntriesAdvancedDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundFilter : new SoundFilterDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundFilterElem : new SoundFilterElemDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundProviderPreferences : new SoundProviderPreferencesDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundSamplePreferences : new SoundSamplePreferencesDBCFile(),

    /**
     * No comment (yet!)
     */
    SoundWaterType : new SoundWaterTypeDBCFile(),

    /**
     * No comment (yet!)
     */
    SpamMessages : new SpamMessagesDBCFile(),

    /**
     * No comment (yet!)
     */
    Spell : new SpellDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellCastTimes : new SpellCastTimesDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellCategory : new SpellCategoryDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellChainEffects : new SpellChainEffectsDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellDescriptionVariables : new SpellDescriptionVariablesDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellDifficulty : new SpellDifficultyDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellDispelType : new SpellDispelTypeDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellDuration : new SpellDurationDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellEffectCameraShakes : new SpellEffectCameraShakesDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellFocusObject : new SpellFocusObjectDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellIcon : new SpellIconDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellItemEnchantment : new SpellItemEnchantmentDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellItemEnchantmentCondition : new SpellItemEnchantmentConditionDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellMechanic : new SpellMechanicDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellMissile : new SpellMissileDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellMissileMotion : new SpellMissileMotionDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellRadius : new SpellRadiusDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellRange : new SpellRangeDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellRuneCost : new SpellRuneCostDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellShapeshiftForm : new SpellShapeshiftFormDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellVisual : new SpellVisualDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellVisualEffectName : new SpellVisualEffectNameDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellVisualKit : new SpellVisualKitDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellVisualKitAreaModel : new SpellVisualKitAreaModelDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellVisualKitModelAttach : new SpellVisualKitModelAttachDBCFile(),

    /**
     * No comment (yet!)
     */
    SpellVisualPrecastTransitions : new SpellVisualPrecastTransitionsDBCFile(),

    /**
     * No comment (yet!)
     */
    StableSlotPrices : new StableSlotPricesDBCFile(),

    /**
     * No comment (yet!)
     */
    Startup_strings : new Startup_stringsDBCFile(),

    /**
     * No comment (yet!)
     */
    Stationery : new StationeryDBCFile(),

    /**
     * No comment (yet!)
     */
    StringLookups : new StringLookupsDBCFile(),

    /**
     * No comment (yet!)
     */
    SummonProperties : new SummonPropertiesDBCFile(),

    /**
     * No comment (yet!)
     */
    Talent : new TalentDBCFile(),

    /**
     * No comment (yet!)
     */
    TalentTab : new TalentTabDBCFile(),

    /**
     * No comment (yet!)
     */
    TaxiNodes : new TaxiNodesDBCFile(),

    /**
     * No comment (yet!)
     */
    TaxiPath : new TaxiPathDBCFile(),

    /**
     * No comment (yet!)
     */
    TaxiPathNode : new TaxiPathNodeDBCFile(),

    /**
     * No comment (yet!)
     */
    TeamContributionPoints : new TeamContributionPointsDBCFile(),

    /**
     * No comment (yet!)
     */
    Terraintype : new TerraintypeDBCFile(),

    /**
     * No comment (yet!)
     */
    TerraintypeSounds : new TerraintypeSoundsDBCFile(),

    /**
     * No comment (yet!)
     */
    TotemCategory : new TotemCategoryDBCFile(),

    /**
     * No comment (yet!)
     */
    TransportAnimation : new TransportAnimationDBCFile(),

    /**
     * No comment (yet!)
     */
    TransportPhysics : new TransportPhysicsDBCFile(),

    /**
     * No comment (yet!)
     */
    TransportRotation : new TransportRotationDBCFile(),

    /**
     * No comment (yet!)
     */
    UISoundLookups : new UISoundLookupsDBCFile(),

    /**
     * No comment (yet!)
     */
    UnitBlood : new UnitBloodDBCFile(),

    /**
     * No comment (yet!)
     */
    UnitBloodLevels : new UnitBloodLevelsDBCFile(),

    /**
     * No comment (yet!)
     */
    Vehicle : new VehicleDBCFile(),

    /**
     * No comment (yet!)
     */
    VehicleSeat : new VehicleSeatDBCFile(),

    /**
     * No comment (yet!)
     */
    VehicleUIIndicator : new VehicleUIIndicatorDBCFile(),

    /**
     * No comment (yet!)
     */
    VehicleUIIndSeat : new VehicleUIIndSeatDBCFile(),

    /**
     * No comment (yet!)
     */
    VideoHardware : new VideoHardwareDBCFile(),

    /**
     * No comment (yet!)
     */
    VocalUISounds : new VocalUISoundsDBCFile(),

    /**
     * No comment (yet!)
     */
    WeaponImpactSounds : new WeaponImpactSoundsDBCFile(),

    /**
     * No comment (yet!)
     */
    WeaponSwingSounds2 : new WeaponSwingSounds2DBCFile(),

    /**
     * No comment (yet!)
     */
    Weather : new WeatherDBCFile(),

    /**
     * No comment (yet!)
     */
    WMOAreaTable : new WMOAreaTableDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldChunkSounds : new WorldChunkSoundsDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldMapArea : new WorldMapAreaDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldMapContinent : new WorldMapContinentDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldMapOverlay : new WorldMapOverlayDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldMapTransforms : new WorldMapTransformsDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldSafeLocs : new WorldSafelocsDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldStateUI : new WorldStateUIDBCFile(),

    /**
     * No comment (yet!)
     */
    WorldStateZoneSounds : new WorldStateZoneSoundsDBCFile(),

    /**
     * No comment (yet!)
     */
    WowError_Strings : new WowError_StringsDBCFile(),

    /**
     * No comment (yet!)
     */
    ZoneintroMusicTable : new ZoneintroMusicTableDBCFile(),

    /**
     * No comment (yet!)
     */
    ZoneMusic : new ZoneMusicDBCFile(),
}

export const DBCLoader = {
    Achievement : (path: string) => AchievementDBCFile.read(path),

    Achievement_Category : (path: string) => Achievement_CategoryDBCFile.read(path),

    Achievement_Criteria : (path: string) => Achievement_CriteriaDBCFile.read(path),

    AnimationData : (path: string) => AnimationDataDBCFile.read(path),

    AreaGroup : (path: string) => AreaGroupDBCFile.read(path),

    AreaPOI : (path: string) => AreaPOIDBCFile.read(path),

    AreaTable : (path: string) => AreaTableDBCFile.read(path),

    AreaTrigger : (path: string) => AreaTriggerDBCFile.read(path),

    AttackAnimKits : (path: string) => AttackAnimKitsDBCFile.read(path),

    AttackAnimTypes : (path: string) => AttackAnimTypesDBCFile.read(path),

    AuctionHouse : (path: string) => AuctionHouseDBCFile.read(path),

    BankBagSlotPrices : (path: string) => BankBagSlotPricesDBCFile.read(path),
    BannedAddOns : (path: string) => BannedAddOnsDBCFile.read(path),

    BarberShopStyle : (path: string) => BarberShopStyleDBCFile.read(path),

    BattlemasterList : (path: string) => BattlemasterListDBCFile.read(path),

    CameraShakes : (path: string) => CameraShakesDBCFile.read(path),

    Cfg_Categories : (path: string) => Cfg_CategoriesDBCFile.read(path),

    Cfg_Configs : (path: string) => Cfg_ConfigsDBCFile.read(path),

    CharacterFacialHairStyles : (path: string) => CharacterFacialHairStylesDBCFile.read(path),

    CharBaseInfo : (path: string) => CharBaseInfoDBCFile.read(path),

    CharHairGeosets : (path: string) => CharHairGeosetsDBCFile.read(path),

    CharHairTextures : (path: string) => CharHairTexturesDBCFile.read(path),

    CharSections : (path: string) => CharSectionsDBCFile.read(path),

    CharStartOutfit : (path: string) => CharStartOutfitDBCFile.read(path),

    CharTitles : (path: string) => CharTitlesDBCFile.read(path),

    ChatChannels : (path: string) => ChatChannelsDBCFile.read(path),

    ChatProfanity : (path: string) => ChatProfanityDBCFile.read(path),

    ChrClasses : (path: string) => ChrClassesDBCFile.read(path),

    ChrRaces : (path: string) => ChrRacesDBCFile.read(path),

    CinematicCamera : (path: string) => CinematicCameraDBCFile.read(path),

    CinematicSequences : (path: string) => CinematicSequencesDBCFile.read(path),

    CreatureDisplayInfo : (path: string) => CreatureDisplayInfoDBCFile.read(path),

    CreatureDisplayInfoExtra : (path: string) => CreatureDisplayInfoExtraDBCFile.read(path),

    CreatureFamily : (path: string) => CreatureFamilyDBCFile.read(path),

    CreatureModelData : (path: string) => CreatureModelDataDBCFile.read(path),
    CreatureMovementInfo : (path: string) => CreatureMovementInfoDBCFile.read(path),

    CreatureSoundData : (path: string) => CreatureSoundDataDBCFile.read(path),
    CreatureSpellData : (path: string) => CreatureSpellDataDBCFile.read(path),
    CreatureType : (path: string) => CreatureTypeDBCFile.read(path),

    CurrencyCategory : (path: string) => CurrencyCategoryDBCFile.read(path),

    CurrencyTypes : (path: string) => CurrencyTypesDBCFile.read(path),

    DanceMoves : (path: string) => DanceMovesDBCFile.read(path),

    DeathThudLookups : (path: string) => DeathThudLookupsDBCFile.read(path),

    DeclinedWord : (path: string) => DeclinedWordDBCFile.read(path),

    DeclinedWordCases : (path: string) => DeclinedWordCasesDBCFile.read(path),
    DestructibleModelData : (path: string) => DestructibleModelDataDBCFile.read(path),

    DungeonEncounter : (path: string) => DungeonEncounterDBCFile.read(path),

    DungeonMap : (path: string) => DungeonMapDBCFile.read(path),

    DungeonMapChunk : (path: string) => DungeonMapChunkDBCFile.read(path),

    DurabilityCosts : (path: string) => DurabilityCostsDBCFile.read(path),

    DurabilityQuality : (path: string) => DurabilityQualityDBCFile.read(path),
    Emotes : (path: string) => EmotesDBCFile.read(path),

    EmotesText : (path: string) => EmotesTextDBCFile.read(path),

    EmotesTextData : (path: string) => EmotesTextDataDBCFile.read(path),

    EmotesTextSound : (path: string) => EmotesTextSoundDBCFile.read(path),

    EnvironmentalDamage : (path: string) => EnvironmentalDamageDBCFile.read(path),

    Exhaustion : (path: string) => ExhaustionDBCFile.read(path),

    Faction : (path: string) => FactionDBCFile.read(path),

    FactionGroup : (path: string) => FactionGroupDBCFile.read(path),

    FactionTemplate : (path: string) => FactionTemplateDBCFile.read(path),

    FileData : (path: string) => FileDataDBCFile.read(path),

    FootprintTextures : (path: string) => FootprintTexturesDBCFile.read(path),
    FootstepTerrainLookup : (path: string) => FootstepTerrainLookupDBCFile.read(path),

    GameObjectArtKit : (path: string) => GameObjectArtKitDBCFile.read(path),

    GameObjectDisplayInfo : (path: string) => GameObjectDisplayInfoDBCFile.read(path),

    GameTables : (path: string) => GameTablesDBCFile.read(path),

    GameTips : (path: string) => GameTipsDBCFile.read(path),

    GemProperties : (path: string) => GemPropertiesDBCFile.read(path),

    GlyphProperties : (path: string) => GlyphPropertiesDBCFile.read(path),

    GlyphSlot : (path: string) => GlyphSlotDBCFile.read(path),

    GMSurveyAnswers : (path: string) => GMSurveyAnswersDBCFile.read(path),

    GMSurveyCurrentSurvey : (path: string) => GMSurveyCurrentSurveyDBCFile.read(path),

    GMSurveyQuestions : (path: string) => GMSurveyQuestionsDBCFile.read(path),
    GMSurveySurveys : (path: string) => GMSurveySurveysDBCFile.read(path),

    GMTicketCategory : (path: string) => GMTicketCategoryDBCFile.read(path),

    GroundEffectDoodad : (path: string) => GroundEffectDoodadDBCFile.read(path),

    GroundEffectTexture : (path: string) => GroundEffectTextureDBCFile.read(path),

    GtBarberShopCostBase : (path: string) => GtBarberShopCostBaseDBCFile.read(path),

    GtChanceToMeleeCrit : (path: string) => GtChanceToMeleeCritDBCFile.read(path),

    GtChanceToMeleeCritBase : (path: string) => GtChanceToMeleeCritBaseDBCFile.read(path),

    GtChanceToSpellCrit : (path: string) => GtChanceToSpellCritDBCFile.read(path),

    GtChanceToSpellCritBase : (path: string) => GtChanceToSpellCritBaseDBCFile.read(path),

    GtCombatRatings : (path: string) => GtCombatRatingsDBCFile.read(path),

    GtNPCManaCostScaler : (path: string) => GtNPCManaCostScalerDBCFile.read(path),

    GtOCTClassCombatRatingScalar : (path: string) => GtOCTClassCombatRatingScalarDBCFile.read(path),

    GtOCTRegenHP : (path: string) => GtOCTRegenHPDBCFile.read(path),

    GtOCTRegenMP : (path: string) => GtOCTRegenMPDBCFile.read(path),

    GtRegenHPPerSpt : (path: string) => GtRegenHPPerSptDBCFile.read(path),

    GtRegenMPPerSpt : (path: string) => GtRegenMPPerSptDBCFile.read(path),

    HelmetGeosetVisData : (path: string) => HelmetGeosetVisDataDBCFile.read(path),

    HolidayDescriptions : (path: string) => HolidayDescriptionsDBCFile.read(path),

    HolidayNames : (path: string) => HolidayNamesDBCFile.read(path),

    Holidays : (path: string) => HolidaysDBCFile.read(path),

    Item : (path: string) => ItemDBCFile.read(path),

    ItemBagFamily : (path: string) => ItemBagFamilyDBCFile.read(path),

    ItemClass : (path: string) => ItemClassDBCFile.read(path),

    ItemCondExtCosts : (path: string) => ItemCondExtCostsDBCFile.read(path),

    ItemDisplayInfo : (path: string) => ItemDisplayInfoDBCFile.read(path),

    ItemExtendedCost : (path: string) => ItemExtendedCostDBCFile.read(path),

    ItemGroupSounds : (path: string) => ItemGroupSoundsDBCFile.read(path),

    ItemLimitCategory : (path: string) => ItemLimitCategoryDBCFile.read(path),
    ItemPetFood : (path: string) => ItemPetFoodDBCFile.read(path),

    ItemPurchaseGroup : (path: string) => ItemPurchaseGroupDBCFile.read(path),
    ItemRandomProperties : (path: string) => ItemRandomPropertiesDBCFile.read(path),

    ItemRandomSuffix : (path: string) => ItemRandomSuffixDBCFile.read(path),

    ItemSet : (path: string) => ItemSetDBCFile.read(path),

    ItemSubClass : (path: string) => ItemSubClassDBCFile.read(path),

    ItemSubClassMask : (path: string) => ItemSubClassMaskDBCFile.read(path),

    ItemVisualEffects : (path: string) => ItemVisualEffectsDBCFile.read(path),
    ItemVisuals : (path: string) => ItemVisualsDBCFile.read(path),

    Languages : (path: string) => LanguagesDBCFile.read(path),

    LanguageWords : (path: string) => LanguageWordsDBCFile.read(path),

    LfgDungeonExpansion : (path: string) => LfgDungeonExpansionDBCFile.read(path),

    LfgDungeonGroup : (path: string) => LfgDungeonGroupDBCFile.read(path),

    LfgDungeons : (path: string) => LfgDungeonsDBCFile.read(path),

    Light : (path: string) => LightDBCFile.read(path),

    LightfloatBand : (path: string) => LightfloatBandDBCFile.read(path),

    LightintBand : (path: string) => LightintBandDBCFile.read(path),

    LightParams : (path: string) => LightParamsDBCFile.read(path),

    LightSkybox : (path: string) => LightSkyboxDBCFile.read(path),

    LiquidMaterial : (path: string) => LiquidMaterialDBCFile.read(path),

    LiquidType : (path: string) => LiquidTypeDBCFile.read(path),

    LoadingScreens : (path: string) => LoadingScreensDBCFile.read(path),

    LoadingScreenTaxiSplines : (path: string) => LoadingScreenTaxiSplinesDBCFile.read(path),

    Lock : (path: string) => LockDBCFile.read(path),

    LockType : (path: string) => LockTypeDBCFile.read(path),

    MailTemplate : (path: string) => MailTemplateDBCFile.read(path),

    Map : (path: string) => MapDBCFile.read(path),

    MapDifficulty : (path: string) => MapDifficultyDBCFile.read(path),

    Material : (path: string) => MaterialDBCFile.read(path),

    Movie : (path: string) => MovieDBCFile.read(path),

    MovieFileData : (path: string) => MovieFileDataDBCFile.read(path),

    MovieVariation : (path: string) => MovieVariationDBCFile.read(path),

    NameGen : (path: string) => NameGenDBCFile.read(path),

    NamesProfanity : (path: string) => NamesProfanityDBCFile.read(path),

    NamesReserved : (path: string) => NamesReservedDBCFile.read(path),

    NPCSounds : (path: string) => NPCSoundsDBCFile.read(path),

    ObjectEffect : (path: string) => ObjectEffectDBCFile.read(path),

    ObjectEffectGroup : (path: string) => ObjectEffectGroupDBCFile.read(path),
    ObjectEffectModifier : (path: string) => ObjectEffectModifierDBCFile.read(path),

    ObjectEffectPackage : (path: string) => ObjectEffectPackageDBCFile.read(path),

    ObjectEffectPackageElem : (path: string) => ObjectEffectPackageElemDBCFile.read(path),

    OverrideSpellData : (path: string) => OverrideSpellDataDBCFile.read(path),
    Package : (path: string) => PackageDBCFile.read(path),

    PageTextMaterial : (path: string) => PageTextMaterialDBCFile.read(path),

    PaperDollItemFrame : (path: string) => PaperDollItemFrameDBCFile.read(path),

    ParticleColor : (path: string) => ParticleColorDBCFile.read(path),

    PetitionType : (path: string) => PetitionTypeDBCFile.read(path),

    PetPersonality : (path: string) => PetPersonalityDBCFile.read(path),

    PowerDisplay : (path: string) => PowerDisplayDBCFile.read(path),

    PvpDifficulty : (path: string) => PvpDifficultyDBCFile.read(path),

    QuestFactionReward : (path: string) => QuestFactionRewardDBCFile.read(path),

    QuestInfo : (path: string) => QuestInfoDBCFile.read(path),

    QuestSort : (path: string) => QuestSortDBCFile.read(path),

    QuestXP : (path: string) => QuestXPDBCFile.read(path),

    RandPropPoints : (path: string) => RandPropPointsDBCFile.read(path),

    Resistances : (path: string) => ResistancesDBCFile.read(path),

    ScalingStatDistribution : (path: string) => ScalingStatDistributionDBCFile.read(path),

    ScalingStatValues : (path: string) => ScalingStatValuesDBCFile.read(path),
    ScreenEffect : (path: string) => ScreenEffectDBCFile.read(path),

    ServerMessages : (path: string) => ServerMessagesDBCFile.read(path),

    SheatheSoundLookups : (path: string) => SheatheSoundLookupsDBCFile.read(path),

    SkillCostsData : (path: string) => SkillCostsDataDBCFile.read(path),

    SkillLine : (path: string) => SkillLineDBCFile.read(path),

    SkillLineAbility : (path: string) => SkillLineAbilityDBCFile.read(path),

    SkillLineCategory : (path: string) => SkillLineCategoryDBCFile.read(path),
    SkillRaceClassInfo : (path: string) => SkillRaceClassInfoDBCFile.read(path),

    SkillTiers : (path: string) => SkillTiersDBCFile.read(path),

    SoundAmbience : (path: string) => SoundAmbienceDBCFile.read(path),

    SoundEmitters : (path: string) => SoundEmittersDBCFile.read(path),

    SoundEntries : (path: string) => SoundEntriesDBCFile.read(path),

    SoundEntriesAdvanced : (path: string) => SoundEntriesAdvancedDBCFile.read(path),

    SoundFilter : (path: string) => SoundFilterDBCFile.read(path),

    SoundFilterElem : (path: string) => SoundFilterElemDBCFile.read(path),

    SoundProviderPreferences : (path: string) => SoundProviderPreferencesDBCFile.read(path),

    SoundSamplePreferences : (path: string) => SoundSamplePreferencesDBCFile.read(path),

    SoundWaterType : (path: string) => SoundWaterTypeDBCFile.read(path),

    SpamMessages : (path: string) => SpamMessagesDBCFile.read(path),

    Spell : (path: string) => SpellDBCFile.read(path),

    SpellCastTimes : (path: string) => SpellCastTimesDBCFile.read(path),

    SpellCategory : (path: string) => SpellCategoryDBCFile.read(path),

    SpellChainEffects : (path: string) => SpellChainEffectsDBCFile.read(path),
    SpellDescriptionVariables : (path: string) => SpellDescriptionVariablesDBCFile.read(path),

    SpellDifficulty : (path: string) => SpellDifficultyDBCFile.read(path),

    SpellDispelType : (path: string) => SpellDispelTypeDBCFile.read(path),

    SpellDuration : (path: string) => SpellDurationDBCFile.read(path),

    SpellEffectCameraShakes : (path: string) => SpellEffectCameraShakesDBCFile.read(path),

    SpellFocusObject : (path: string) => SpellFocusObjectDBCFile.read(path),

    SpellIcon : (path: string) => SpellIconDBCFile.read(path),

    SpellItemEnchantment : (path: string) => SpellItemEnchantmentDBCFile.read(path),

    SpellItemEnchantmentCondition : (path: string) => SpellItemEnchantmentConditionDBCFile.read(path),

    SpellMechanic : (path: string) => SpellMechanicDBCFile.read(path),

    SpellMissile : (path: string) => SpellMissileDBCFile.read(path),

    SpellMissileMotion : (path: string) => SpellMissileMotionDBCFile.read(path),

    SpellRadius : (path: string) => SpellRadiusDBCFile.read(path),

    SpellRange : (path: string) => SpellRangeDBCFile.read(path),

    SpellRuneCost : (path: string) => SpellRuneCostDBCFile.read(path),

    SpellShapeshiftForm : (path: string) => SpellShapeshiftFormDBCFile.read(path),

    SpellVisual : (path: string) => SpellVisualDBCFile.read(path),

    SpellVisualEffectName : (path: string) => SpellVisualEffectNameDBCFile.read(path),

    SpellVisualKit : (path: string) => SpellVisualKitDBCFile.read(path),

    SpellVisualKitAreaModel : (path: string) => SpellVisualKitAreaModelDBCFile.read(path),

    SpellVisualKitModelAttach : (path: string) => SpellVisualKitModelAttachDBCFile.read(path),

    SpellVisualPrecastTransitions : (path: string) => SpellVisualPrecastTransitionsDBCFile.read(path),

    StableSlotPrices : (path: string) => StableSlotPricesDBCFile.read(path),

    Startup_strings : (path: string) => Startup_stringsDBCFile.read(path),

    Stationery : (path: string) => StationeryDBCFile.read(path),

    StringLookups : (path: string) => StringLookupsDBCFile.read(path),

    SummonProperties : (path: string) => SummonPropertiesDBCFile.read(path),

    Talent : (path: string) => TalentDBCFile.read(path),

    TalentTab : (path: string) => TalentTabDBCFile.read(path),

    TaxiNodes : (path: string) => TaxiNodesDBCFile.read(path),

    TaxiPath : (path: string) => TaxiPathDBCFile.read(path),

    TaxiPathNode : (path: string) => TaxiPathNodeDBCFile.read(path),

    TeamContributionPoints : (path: string) => TeamContributionPointsDBCFile.read(path),

    Terraintype : (path: string) => TerraintypeDBCFile.read(path),

    TerraintypeSounds : (path: string) => TerraintypeSoundsDBCFile.read(path),
    TotemCategory : (path: string) => TotemCategoryDBCFile.read(path),

    TransportAnimation : (path: string) => TransportAnimationDBCFile.read(path),

    TransportPhysics : (path: string) => TransportPhysicsDBCFile.read(path),

    TransportRotation : (path: string) => TransportRotationDBCFile.read(path),
    UISoundLookups : (path: string) => UISoundLookupsDBCFile.read(path),

    UnitBlood : (path: string) => UnitBloodDBCFile.read(path),

    UnitBloodLevels : (path: string) => UnitBloodLevelsDBCFile.read(path),

    Vehicle : (path: string) => VehicleDBCFile.read(path),

    VehicleSeat : (path: string) => VehicleSeatDBCFile.read(path),

    VehicleUIIndicator : (path: string) => VehicleUIIndicatorDBCFile.read(path),

    VehicleUIIndSeat : (path: string) => VehicleUIIndSeatDBCFile.read(path),

    VideoHardware : (path: string) => VideoHardwareDBCFile.read(path),

    VocalUISounds : (path: string) => VocalUISoundsDBCFile.read(path),

    WeaponImpactSounds : (path: string) => WeaponImpactSoundsDBCFile.read(path),

    WeaponSwingSounds2 : (path: string) => WeaponSwingSounds2DBCFile.read(path),

    Weather : (path: string) => WeatherDBCFile.read(path),

    WMOAreaTable : (path: string) => WMOAreaTableDBCFile.read(path),

    WorldChunkSounds : (path: string) => WorldChunkSoundsDBCFile.read(path),

    WorldMapArea : (path: string) => WorldMapAreaDBCFile.read(path),

    WorldMapContinent : (path: string) => WorldMapContinentDBCFile.read(path),
    WorldMapOverlay : (path: string) => WorldMapOverlayDBCFile.read(path),

    WorldMapTransforms : (path: string) => WorldMapTransformsDBCFile.read(path),

    WorldSafeLocs : (path: string) => WorldSafelocsDBCFile.read(path),

    WorldStateUI : (path: string) => WorldStateUIDBCFile.read(path),

    WorldStateZoneSounds : (path: string) => WorldStateZoneSoundsDBCFile.read(path),

    WowError_Strings : (path: string) => WowError_StringsDBCFile.read(path),

    ZoneintroMusicTable : (path: string) => ZoneintroMusicTableDBCFile.read(path),

    ZoneMusic : (path: string) => ZoneMusicDBCFile.read(path),
}

export type DBCNames = "Achievement" | "Achievement_Category" | "Achievement_Criteria" | "AnimationData" | "AreaGroup" | "AreaPOI" | "AreaTable" | "AreaTrigger" | "AttackAnimKits" | "AttackAnimTypes" | "AuctionHouse" | "BankBagSlotPrices" | "BannedAddOns" | "BarberShopStyle" | "BattlemasterList" | "CameraShakes" | "Cfg_Categories" | "Cfg_Configs" | "CharacterFacialHairStyles" | "CharBaseInfo" | "CharHairGeosets" | "CharHairTextures" | "CharSections" | "CharStartOutfit" | "CharTitles" | "ChatChannels" | "ChatProfanity" | "ChrClasses" | "ChrRaces" | "CinematicCamera" | "CinematicSequences" | "CreatureDisplayInfo" | "CreatureDisplayInfoExtra" | "CreatureFamily" | "CreatureModelData" | "CreatureMovementInfo" | "CreatureSoundData" | "CreatureSpellData" | "CreatureType" | "CurrencyCategory" | "CurrencyTypes" | "DanceMoves" | "DeathThudLookups" | "DeclinedWord" | "DeclinedWordCases" | "DestructibleModelData" | "DungeonEncounter" | "DungeonMap" | "DungeonMapChunk" | "DurabilityCosts" | "DurabilityQuality" | "Emotes" | "EmotesText" | "EmotesTextData" | "EmotesTextSound" | "EnvironmentalDamage" | "Exhaustion" | "Faction" | "FactionGroup" | "FactionTemplate" | "FileData" | "FootprintTextures" | "FootstepTerrainLookup" | "GameObjectArtKit" | "GameObjectDisplayInfo" | "GameTables" | "GameTips" | "GemProperties" | "GlyphProperties" | "GlyphSlot" | "GMSurveyAnswers" | "GMSurveyCurrentSurvey" | "GMSurveyQuestions" | "GMSurveySurveys" | "GMTicketCategory" | "GroundEffectDoodad" | "GroundEffectTexture" | "GtBarberShopCostBase" | "GtChanceToMeleeCrit" | "GtChanceToMeleeCritBase" | "GtChanceToSpellCrit" | "GtChanceToSpellCritBase" | "GtCombatRatings" | "GtNPCManaCostScaler" | "GtOCTClassCombatRatingScalar" | "GtOCTRegenHP" | "GtOCTRegenMP" | "GtRegenHPPerSpt" | "GtRegenMPPerSpt" | "HelmetGeosetVisData" | "HolidayDescriptions" | "HolidayNames" | "Holidays" | "Item" | "ItemBagFamily" | "ItemClass" | "ItemCondExtCosts" | "ItemDisplayInfo" | "ItemExtendedCost" | "ItemGroupSounds" | "ItemLimitCategory" | "ItemPetFood" | "ItemPurchaseGroup" | "ItemRandomProperties" | "ItemRandomSuffix" | "ItemSet" | "ItemSubClass" | "ItemSubClassMask" | "ItemVisualEffects" | "ItemVisuals" | "Languages" | "LanguageWords" | "LfgDungeonExpansion" | "LfgDungeonGroup" | "LfgDungeons" | "Light" | "LightfloatBand" | "LightintBand" | "LightParams" | "LightSkybox" | "LiquidMaterial" | "LiquidType" | "LoadingScreens" | "LoadingScreenTaxiSplines" | "Lock" | "LockType" | "MailTemplate" | "Map" | "MapDifficulty" | "Material" | "Movie" | "MovieFileData" | "MovieVariation" | "NameGen" | "NamesProfanity" | "NamesReserved" | "NPCSounds" | "ObjectEffect" | "ObjectEffectGroup" | "ObjectEffectModifier" | "ObjectEffectPackage" | "ObjectEffectPackageElem" | "OverrideSpellData" | "Package" | "PageTextMaterial" | "PaperDollItemFrame" | "ParticleColor" | "PetitionType" | "PetPersonality" | "PowerDisplay" | "PvpDifficulty" | "QuestFactionReward" | "QuestInfo" | "QuestSort" | "QuestXP" | "RandPropPoints" | "Resistances" | "ScalingStatDistribution" | "ScalingStatValues" | "ScreenEffect" | "ServerMessages" | "SheatheSoundLookups" | "SkillCostsData" | "SkillLine" | "SkillLineAbility" | "SkillLineCategory" | "SkillRaceClassInfo" | "SkillTiers" | "SoundAmbience" | "SoundEmitters" | "SoundEntries" | "SoundEntriesAdvanced" | "SoundFilter" | "SoundFilterElem" | "SoundProviderPreferences" | "SoundSamplePreferences" | "SoundWaterType" | "SpamMessages" | "Spell" | "SpellCastTimes" | "SpellCategory" | "SpellChainEffects" | "SpellDescriptionVariables" | "SpellDifficulty" | "SpellDispelType" | "SpellDuration" | "SpellEffectCameraShakes" | "SpellFocusObject" | "SpellIcon" | "SpellItemEnchantment" | "SpellItemEnchantmentCondition" | "SpellMechanic" | "SpellMissile" | "SpellMissileMotion" | "SpellRadius" | "SpellRange" | "SpellRuneCost" | "SpellShapeshiftForm" | "SpellVisual" | "SpellVisualEffectName" | "SpellVisualKit" | "SpellVisualKitAreaModel" | "SpellVisualKitModelAttach" | "SpellVisualPrecastTransitions" | "StableSlotPrices" | "Startup_strings" | "Stationery" | "StringLookups" | "SummonProperties" | "Talent" | "TalentTab" | "TaxiNodes" | "TaxiPath" | "TaxiPathNode" | "TeamContributionPoints" | "Terraintype" | "TerraintypeSounds" | "TotemCategory" | "TransportAnimation" | "TransportPhysics" | "TransportRotation" | "UISoundLookups" | "UnitBlood" | "UnitBloodLevels" | "Vehicle" | "VehicleSeat" | "VehicleUIIndicator" | "VehicleUIIndSeat" | "VideoHardware" | "VocalUISounds" | "WeaponImpactSounds" | "WeaponSwingSounds2" | "Weather" | "WMOAreaTable" | "WorldChunkSounds" | "WorldMapArea" | "WorldMapContinent" | "WorldMapOverlay" | "WorldMapTransforms" | "WorldSafeLocs" | "WorldStateUI" | "WorldStateZoneSounds" | "WowError_Strings" | "ZoneintroMusicTable" | "ZoneMusic"

export const DBCFiles : DBCFile<any,any,any>[] = Object.values(DBC);