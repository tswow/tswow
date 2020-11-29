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
import { DBCFile } from "./DBCFile"
import { DBC_Achievement } from "./types/Achievement"
import { DBC_Achievement_Category } from "./types/Achievement_Category"
import { DBC_Achievement_Criteria } from "./types/Achievement_Criteria"
import { DBC_AnimationData } from "./types/AnimationData"
import { DBC_AreaGroup } from "./types/AreaGroup"
import { DBC_AreaPOI } from "./types/AreaPOI"
import { DBC_AreaTable } from "./types/AreaTable"
import { DBC_AreaTrigger } from "./types/AreaTrigger"
import { DBC_AttackAnimKits } from "./types/AttackAnimKits"
import { DBC_AttackAnimTypes } from "./types/AttackAnimTypes"
import { DBC_AuctionHouse } from "./types/AuctionHouse"
import { DBC_BankBagSlotPrices } from "./types/BankBagSlotPrices"
import { DBC_BannedAddOns } from "./types/BannedAddOns"
import { DBC_BarberShopStyle } from "./types/BarberShopStyle"
import { DBC_BattlemasterList } from "./types/BattlemasterList"
import { DBC_CameraShakes } from "./types/CameraShakes"
import { DBC_Cfg_Categories } from "./types/Cfg_Categories"
import { DBC_Cfg_Configs } from "./types/Cfg_Configs"
import { DBC_CharacterFacialHairStyles } from "./types/CharacterFacialHairStyles"
import { DBC_CharBaseInfo } from "./types/CharBaseInfo"
import { DBC_CharHairGeosets } from "./types/CharHairGeosets"
import { DBC_CharHairTextures } from "./types/CharHairTextures"
import { DBC_CharSections } from "./types/CharSections"
import { DBC_CharStartOutfit } from "./types/CharStartOutfit"
import { DBC_CharTitles } from "./types/CharTitles"
import { DBC_ChatChannels } from "./types/ChatChannels"
import { DBC_ChatProfanity } from "./types/ChatProfanity"
import { DBC_ChrClasses } from "./types/ChrClasses"
import { DBC_ChrRaces } from "./types/ChrRaces"
import { DBC_CinematicCamera } from "./types/CinematicCamera"
import { DBC_CinematicSequences } from "./types/CinematicSequences"
import { DBC_CreatureDisplayInfo } from "./types/CreatureDisplayInfo"
import { DBC_CreatureDisplayInfoExtra } from "./types/CreatureDisplayInfoExtra"
import { DBC_CreatureFamily } from "./types/CreatureFamily"
import { DBC_CreatureModelData } from "./types/CreatureModelData"
import { DBC_CreatureMovementInfo } from "./types/CreatureMovementInfo"
import { DBC_CreatureSoundData } from "./types/CreatureSoundData"
import { DBC_CreatureSpellData } from "./types/CreatureSpellData"
import { DBC_CreatureType } from "./types/CreatureType"
import { DBC_CurrencyCategory } from "./types/CurrencyCategory"
import { DBC_CurrencyTypes } from "./types/CurrencyTypes"
import { DBC_DanceMoves } from "./types/DanceMoves"
import { DBC_DeathThudLookups } from "./types/DeathThudLookups"
import { DBC_DeclinedWord } from "./types/DeclinedWord"
import { DBC_DeclinedWordCases } from "./types/DeclinedWordCases"
import { DBC_DestructibleModelData } from "./types/DestructibleModelData"
import { DBC_DungeonEncounter } from "./types/DungeonEncounter"
import { DBC_DungeonMap } from "./types/DungeonMap"
import { DBC_DungeonMapChunk } from "./types/DungeonMapChunk"
import { DBC_DurabilityCosts } from "./types/DurabilityCosts"
import { DBC_DurabilityQuality } from "./types/DurabilityQuality"
import { DBC_Emotes } from "./types/Emotes"
import { DBC_EmotesText } from "./types/EmotesText"
import { DBC_EmotesTextData } from "./types/EmotesTextData"
import { DBC_EmotesTextSound } from "./types/EmotesTextSound"
import { DBC_EnvironmentalDamage } from "./types/EnvironmentalDamage"
import { DBC_Exhaustion } from "./types/Exhaustion"
import { DBC_Faction } from "./types/Faction"
import { DBC_FactionGroup } from "./types/FactionGroup"
import { DBC_FactionTemplate } from "./types/FactionTemplate"
import { DBC_FileData } from "./types/FileData"
import { DBC_FootprintTextures } from "./types/FootprintTextures"
import { DBC_FootstepTerrainLookup } from "./types/FootstepTerrainLookup"
import { DBC_GameObjectArtKit } from "./types/GameObjectArtKit"
import { DBC_GameObjectDisplayInfo } from "./types/GameObjectDisplayInfo"
import { DBC_GameTables } from "./types/GameTables"
import { DBC_GameTips } from "./types/GameTips"
import { DBC_GemProperties } from "./types/GemProperties"
import { DBC_GlyphProperties } from "./types/GlyphProperties"
import { DBC_GlyphSlot } from "./types/GlyphSlot"
import { DBC_GMSurveyAnswers } from "./types/GMSurveyAnswers"
import { DBC_GMSurveyCurrentSurvey } from "./types/GMSurveyCurrentSurvey"
import { DBC_GMSurveyQuestions } from "./types/GMSurveyQuestions"
import { DBC_GMSurveySurveys } from "./types/GMSurveySurveys"
import { DBC_GMTicketCategory } from "./types/GMTicketCategory"
import { DBC_GroundEffectDoodad } from "./types/GroundEffectDoodad"
import { DBC_GroundEffectTexture } from "./types/GroundEffectTexture"
import { DBC_GtBarberShopCostBase } from "./types/GtBarberShopCostBase"
import { DBC_GtChanceToMeleeCrit } from "./types/GtChanceToMeleeCrit"
import { DBC_GtChanceToMeleeCritBase } from "./types/GtChanceToMeleeCritBase"
import { DBC_GtChanceToSpellCrit } from "./types/GtChanceToSpellCrit"
import { DBC_GtChanceToSpellCritBase } from "./types/GtChanceToSpellCritBase"
import { DBC_GtCombatRatings } from "./types/GtCombatRatings"
import { DBC_GtNPCManaCostScaler } from "./types/GtNPCManaCostScaler"
import { DBC_GtOCTClassCombatRatingScalar } from "./types/GtOCTClassCombatRatingScalar"
import { DBC_GtOCTRegenHP } from "./types/GtOCTRegenHP"
import { DBC_GtOCTRegenMP } from "./types/GtOCTRegenMP"
import { DBC_GtRegenHPPerSpt } from "./types/GtRegenHPPerSpt"
import { DBC_GtRegenMPPerSpt } from "./types/GtRegenMPPerSpt"
import { DBC_HelmetGeosetVisData } from "./types/HelmetGeosetVisData"
import { DBC_HolidayDescriptions } from "./types/HolidayDescriptions"
import { DBC_HolidayNames } from "./types/HolidayNames"
import { DBC_Holidays } from "./types/Holidays"
import { DBC_Item } from "./types/Item"
import { DBC_ItemBagFamily } from "./types/ItemBagFamily"
import { DBC_ItemClass } from "./types/ItemClass"
import { DBC_ItemCondExtCosts } from "./types/ItemCondExtCosts"
import { DBC_ItemDisplayInfo } from "./types/ItemDisplayInfo"
import { DBC_ItemExtendedCost } from "./types/ItemExtendedCost"
import { DBC_ItemGroupSounds } from "./types/ItemGroupSounds"
import { DBC_ItemLimitCategory } from "./types/ItemLimitCategory"
import { DBC_ItemPetFood } from "./types/ItemPetFood"
import { DBC_ItemPurchaseGroup } from "./types/ItemPurchaseGroup"
import { DBC_ItemRandomProperties } from "./types/ItemRandomProperties"
import { DBC_ItemRandomSuffix } from "./types/ItemRandomSuffix"
import { DBC_ItemSet } from "./types/ItemSet"
import { DBC_ItemSubClass } from "./types/ItemSubClass"
import { DBC_ItemSubClassMask } from "./types/ItemSubClassMask"
import { DBC_ItemVisualEffects } from "./types/ItemVisualEffects"
import { DBC_ItemVisuals } from "./types/ItemVisuals"
import { DBC_Languages } from "./types/Languages"
import { DBC_LanguageWords } from "./types/LanguageWords"
import { DBC_LfgDungeonExpansion } from "./types/LfgDungeonExpansion"
import { DBC_LfgDungeonGroup } from "./types/LfgDungeonGroup"
import { DBC_LfgDungeons } from "./types/LfgDungeons"
import { DBC_Light } from "./types/Light"
import { DBC_LightfloatBand } from "./types/LightfloatBand"
import { DBC_LightintBand } from "./types/LightintBand"
import { DBC_LightParams } from "./types/LightParams"
import { DBC_LightSkybox } from "./types/LightSkybox"
import { DBC_LiquidMaterial } from "./types/LiquidMaterial"
import { DBC_LiquidType } from "./types/LiquidType"
import { DBC_LoadingScreens } from "./types/LoadingScreens"
import { DBC_LoadingScreenTaxiSplines } from "./types/LoadingScreenTaxiSplines"
import { DBC_Lock } from "./types/Lock"
import { DBC_LockType } from "./types/LockType"
import { DBC_MailTemplate } from "./types/MailTemplate"
import { DBC_Map } from "./types/Map"
import { DBC_MapDifficulty } from "./types/MapDifficulty"
import { DBC_Material } from "./types/Material"
import { DBC_Movie } from "./types/Movie"
import { DBC_MovieFileData } from "./types/MovieFileData"
import { DBC_MovieVariation } from "./types/MovieVariation"
import { DBC_NameGen } from "./types/NameGen"
import { DBC_NamesProfanity } from "./types/NamesProfanity"
import { DBC_NamesReserved } from "./types/NamesReserved"
import { DBC_NPCSounds } from "./types/NPCSounds"
import { DBC_ObjectEffect } from "./types/ObjectEffect"
import { DBC_ObjectEffectGroup } from "./types/ObjectEffectGroup"
import { DBC_ObjectEffectModifier } from "./types/ObjectEffectModifier"
import { DBC_ObjectEffectPackage } from "./types/ObjectEffectPackage"
import { DBC_ObjectEffectPackageElem } from "./types/ObjectEffectPackageElem"
import { DBC_OverrideSpellData } from "./types/OverrideSpellData"
import { DBC_Package } from "./types/Package"
import { DBC_PageTextMaterial } from "./types/PageTextMaterial"
import { DBC_PaperDollItemFrame } from "./types/PaperDollItemFrame"
import { DBC_ParticleColor } from "./types/ParticleColor"
import { DBC_PetitionType } from "./types/PetitionType"
import { DBC_PetPersonality } from "./types/PetPersonality"
import { DBC_PowerDisplay } from "./types/PowerDisplay"
import { DBC_PvpDifficulty } from "./types/PvpDifficulty"
import { DBC_QuestFactionReward } from "./types/QuestFactionReward"
import { DBC_QuestInfo } from "./types/QuestInfo"
import { DBC_QuestSort } from "./types/QuestSort"
import { DBC_QuestXP } from "./types/QuestXP"
import { DBC_RandPropPoints } from "./types/RandPropPoints"
import { DBC_Resistances } from "./types/Resistances"
import { DBC_ScalingStatDistribution } from "./types/ScalingStatDistribution"
import { DBC_ScalingStatValues } from "./types/ScalingStatValues"
import { DBC_ScreenEffect } from "./types/ScreenEffect"
import { DBC_ServerMessages } from "./types/ServerMessages"
import { DBC_SheatheSoundLookups } from "./types/SheatheSoundLookups"
import { DBC_SkillCostsData } from "./types/SkillCostsData"
import { DBC_SkillLine } from "./types/SkillLine"
import { DBC_SkillLineAbility } from "./types/SkillLineAbility"
import { DBC_SkillLineCategory } from "./types/SkillLineCategory"
import { DBC_SkillRaceClassInfo } from "./types/SkillRaceClassInfo"
import { DBC_SkillTiers } from "./types/SkillTiers"
import { DBC_SoundAmbience } from "./types/SoundAmbience"
import { DBC_SoundEmitters } from "./types/SoundEmitters"
import { DBC_SoundEntries } from "./types/SoundEntries"
import { DBC_SoundEntriesAdvanced } from "./types/SoundEntriesAdvanced"
import { DBC_SoundFilter } from "./types/SoundFilter"
import { DBC_SoundFilterElem } from "./types/SoundFilterElem"
import { DBC_SoundProviderPreferences } from "./types/SoundProviderPreferences"
import { DBC_SoundSamplePreferences } from "./types/SoundSamplePreferences"
import { DBC_SoundWaterType } from "./types/SoundWaterType"
import { DBC_SpamMessages } from "./types/SpamMessages"
import { DBC_Spell } from "./types/Spell"
import { DBC_SpellCastTimes } from "./types/SpellCastTimes"
import { DBC_SpellCategory } from "./types/SpellCategory"
import { DBC_SpellChainEffects } from "./types/SpellChainEffects"
import { DBC_SpellDescriptionVariables } from "./types/SpellDescriptionVariables"
import { DBC_SpellDifficulty } from "./types/SpellDifficulty"
import { DBC_SpellDispelType } from "./types/SpellDispelType"
import { DBC_SpellDuration } from "./types/SpellDuration"
import { DBC_SpellEffectCameraShakes } from "./types/SpellEffectCameraShakes"
import { DBC_SpellFocusObject } from "./types/SpellFocusObject"
import { DBC_SpellIcon } from "./types/SpellIcon"
import { DBC_SpellItemEnchantment } from "./types/SpellItemEnchantment"
import { DBC_SpellItemEnchantmentCondition } from "./types/SpellItemEnchantmentCondition"
import { DBC_SpellMechanic } from "./types/SpellMechanic"
import { DBC_SpellMissile } from "./types/SpellMissile"
import { DBC_SpellMissileMotion } from "./types/SpellMissileMotion"
import { DBC_SpellRadius } from "./types/SpellRadius"
import { DBC_SpellRange } from "./types/SpellRange"
import { DBC_SpellRuneCost } from "./types/SpellRuneCost"
import { DBC_SpellShapeshiftForm } from "./types/SpellShapeshiftForm"
import { DBC_SpellVisual } from "./types/SpellVisual"
import { DBC_SpellVisualEffectName } from "./types/SpellVisualEffectName"
import { DBC_SpellVisualKit } from "./types/SpellVisualKit"
import { DBC_SpellVisualKitAreaModel } from "./types/SpellVisualKitAreaModel"
import { DBC_SpellVisualKitModelAttach } from "./types/SpellVisualKitModelAttach"
import { DBC_SpellVisualPrecastTransitions } from "./types/SpellVisualPrecastTransitions"
import { DBC_StableSlotPrices } from "./types/StableSlotPrices"
import { DBC_Startup_strings } from "./types/Startup_strings"
import { DBC_Stationery } from "./types/Stationery"
import { DBC_StringLookups } from "./types/StringLookups"
import { DBC_SummonProperties } from "./types/SummonProperties"
import { DBC_Talent } from "./types/Talent"
import { DBC_TalentTab } from "./types/TalentTab"
import { DBC_TaxiNodes } from "./types/TaxiNodes"
import { DBC_TaxiPath } from "./types/TaxiPath"
import { DBC_TaxiPathNode } from "./types/TaxiPathNode"
import { DBC_TeamContributionPoints } from "./types/TeamContributionPoints"
import { DBC_Terraintype } from "./types/Terraintype"
import { DBC_TerraintypeSounds } from "./types/TerraintypeSounds"
import { DBC_TotemCategory } from "./types/TotemCategory"
import { DBC_TransportAnimation } from "./types/TransportAnimation"
import { DBC_TransportPhysics } from "./types/TransportPhysics"
import { DBC_TransportRotation } from "./types/TransportRotation"
import { DBC_UISoundLookups } from "./types/UISoundLookups"
import { DBC_UnitBlood } from "./types/UnitBlood"
import { DBC_UnitBloodLevels } from "./types/UnitBloodLevels"
import { DBC_Vehicle } from "./types/Vehicle"
import { DBC_VehicleSeat } from "./types/VehicleSeat"
import { DBC_VehicleUIIndicator } from "./types/VehicleUIIndicator"
import { DBC_VehicleUIIndSeat } from "./types/VehicleUIIndSeat"
import { DBC_VideoHardware } from "./types/VideoHardware"
import { DBC_VocalUISounds } from "./types/VocalUISounds"
import { DBC_WeaponImpactSounds } from "./types/WeaponImpactSounds"
import { DBC_WeaponSwingSounds2 } from "./types/WeaponSwingSounds2"
import { DBC_Weather } from "./types/Weather"
import { DBC_WMOAreaTable } from "./types/WMOAreaTable"
import { DBC_WorldChunkSounds } from "./types/WorldChunkSounds"
import { DBC_WorldMapArea } from "./types/WorldMapArea"
import { DBC_WorldMapContinent } from "./types/WorldMapContinent"
import { DBC_WorldMapOverlay } from "./types/WorldMapOverlay"
import { DBC_WorldMapTransforms } from "./types/WorldMapTransforms"
import { DBC_WorldSafelocs } from "./types/WorldSafelocs"
import { DBC_WorldStateUI } from "./types/WorldStateUI"
import { DBC_WorldStateZoneSounds } from "./types/WorldStateZoneSounds"
import { DBC_WowError_Strings } from "./types/WowError_Strings"
import { DBC_ZoneintroMusicTable } from "./types/ZoneintroMusicTable"
import { DBC_ZoneMusic } from "./types/ZoneMusic"

export const DBC = {

    /**
     * Defines an achievement. See Achievement_Criteria for how to actually earn achievements.
     */
    Achievement : DBC_Achievement,

    /**
     * No comment (yet!)
     */
    Achievement_Category : DBC_Achievement_Category,

    /**
     * No comment (yet!)
     */
    Achievement_Criteria : DBC_Achievement_Criteria,

    /**
     * No comment (yet!)
     */
    AnimationData : DBC_AnimationData,

    /**
     * NEEDS RESEARCH
     */
    AreaGroup : DBC_AreaGroup,

    /**
     * Contains Points of Interests in the overhead map and battleground maps. Includes text, icons, positioning and other miscellaneous things related to POI.
     */
    AreaPOI : DBC_AreaPOI,

    /**
     * Defines zones and sub-zones
     */
    AreaTable : DBC_AreaTable,

    /**
     * No comment (yet!)
     */
    AreaTrigger : DBC_AreaTrigger,

    /**
     * No comment (yet!)
     */
    AttackAnimKits : DBC_AttackAnimKits,

    /**
     * No comment (yet!)
     */
    AttackAnimTypes : DBC_AttackAnimTypes,

    /**
     * No comment (yet!)
     */
    AuctionHouse : DBC_AuctionHouse,

    /**
     * No comment (yet!)
     */
    BankBagSlotPrices : DBC_BankBagSlotPrices,

    /**
     * No comment (yet!)
     */
    BannedAddOns : DBC_BannedAddOns,

    /**
     * No comment (yet!)
     */
    BarberShopStyle : DBC_BarberShopStyle,

    /**
     * No comment (yet!)
     */
    BattlemasterList : DBC_BattlemasterList,

    /**
     * No comment (yet!)
     */
    CameraShakes : DBC_CameraShakes,

    /**
     * No comment (yet!)
     */
    Cfg_Categories : DBC_Cfg_Categories,

    /**
     * No comment (yet!)
     */
    Cfg_Configs : DBC_Cfg_Configs,

    /**
     * No comment (yet!)
     */
    CharacterFacialHairStyles : DBC_CharacterFacialHairStyles,

    /**
     * No comment (yet!)
     */
    CharBaseInfo : DBC_CharBaseInfo,

    /**
     * No comment (yet!)
     */
    CharHairGeosets : DBC_CharHairGeosets,

    /**
     * No comment (yet!)
     */
    CharHairTextures : DBC_CharHairTextures,

    /**
     * No comment (yet!)
     */
    CharSections : DBC_CharSections,

    /**
     * Decides what outfit newly created characters start with
     */
    CharStartOutfit : DBC_CharStartOutfit,

    /**
     * Defines displayed titles
     */
    CharTitles : DBC_CharTitles,

    /**
     * No comment (yet!)
     */
    ChatChannels : DBC_ChatChannels,

    /**
     * No comment (yet!)
     */
    ChatProfanity : DBC_ChatProfanity,

    /**
     * Defines playable classes. Its easiest to clone a row for the class you want to resemble.
     */
    ChrClasses : DBC_ChrClasses,

    /**
     * Defines races
     */
    ChrRaces : DBC_ChrRaces,

    /**
     * No comment (yet!)
     */
    CinematicCamera : DBC_CinematicCamera,

    /**
     * No comment (yet!)
     */
    CinematicSequences : DBC_CinematicSequences,

    /**
     * Defines the looks and sound of a creature
     */
    CreatureDisplayInfo : DBC_CreatureDisplayInfo,

    /**
     * No comment (yet!)
     */
    CreatureDisplayInfoExtra : DBC_CreatureDisplayInfoExtra,

    /**
     * No comment (yet!)
     */
    CreatureFamily : DBC_CreatureFamily,

    /**
     * No comment (yet!)
     */
    CreatureModelData : DBC_CreatureModelData,

    /**
     * No comment (yet!)
     */
    CreatureMovementInfo : DBC_CreatureMovementInfo,

    /**
     * No comment (yet!)
     */
    CreatureSoundData : DBC_CreatureSoundData,

    /**
     * No comment (yet!)
     */
    CreatureSpellData : DBC_CreatureSpellData,

    /**
     * No comment (yet!)
     */
    CreatureType : DBC_CreatureType,

    /**
     * No comment (yet!)
     */
    CurrencyCategory : DBC_CurrencyCategory,

    /**
     * No comment (yet!)
     */
    CurrencyTypes : DBC_CurrencyTypes,

    /**
     * No comment (yet!)
     */
    DanceMoves : DBC_DanceMoves,

    /**
     * No comment (yet!)
     */
    DeathThudLookups : DBC_DeathThudLookups,

    /**
     * No comment (yet!)
     */
    DeclinedWord : DBC_DeclinedWord,

    /**
     * No comment (yet!)
     */
    DeclinedWordCases : DBC_DeclinedWordCases,

    /**
     * No comment (yet!)
     */
    DestructibleModelData : DBC_DestructibleModelData,

    /**
     * No comment (yet!)
     */
    DungeonEncounter : DBC_DungeonEncounter,

    /**
     * No comment (yet!)
     */
    DungeonMap : DBC_DungeonMap,

    /**
     * No comment (yet!)
     */
    DungeonMapChunk : DBC_DungeonMapChunk,

    /**
     * No comment (yet!)
     */
    DurabilityCosts : DBC_DurabilityCosts,

    /**
     * No comment (yet!)
     */
    DurabilityQuality : DBC_DurabilityQuality,

    /**
     * No comment (yet!)
     */
    Emotes : DBC_Emotes,

    /**
     * No comment (yet!)
     */
    EmotesText : DBC_EmotesText,

    /**
     * No comment (yet!)
     */
    EmotesTextData : DBC_EmotesTextData,

    /**
     * No comment (yet!)
     */
    EmotesTextSound : DBC_EmotesTextSound,

    /**
     * No comment (yet!)
     */
    EnvironmentalDamage : DBC_EnvironmentalDamage,

    /**
     * No comment (yet!)
     */
    Exhaustion : DBC_Exhaustion,

    /**
     * No comment (yet!)
     */
    Faction : DBC_Faction,

    /**
     * No comment (yet!)
     */
    FactionGroup : DBC_FactionGroup,

    /**
     * No comment (yet!)
     */
    FactionTemplate : DBC_FactionTemplate,

    /**
     * No comment (yet!)
     */
    FileData : DBC_FileData,

    /**
     * No comment (yet!)
     */
    FootprintTextures : DBC_FootprintTextures,

    /**
     * No comment (yet!)
     */
    FootstepTerrainLookup : DBC_FootstepTerrainLookup,

    /**
     * No comment (yet!)
     */
    GameObjectArtKit : DBC_GameObjectArtKit,

    /**
     * No comment (yet!)
     */
    GameObjectDisplayInfo : DBC_GameObjectDisplayInfo,

    /**
     * No comment (yet!)
     */
    GameTables : DBC_GameTables,

    /**
     * No comment (yet!)
     */
    GameTips : DBC_GameTips,

    /**
     * No comment (yet!)
     */
    GemProperties : DBC_GemProperties,

    /**
     * No comment (yet!)
     */
    GlyphProperties : DBC_GlyphProperties,

    /**
     * No comment (yet!)
     */
    GlyphSlot : DBC_GlyphSlot,

    /**
     * No comment (yet!)
     */
    GMSurveyAnswers : DBC_GMSurveyAnswers,

    /**
     * No comment (yet!)
     */
    GMSurveyCurrentSurvey : DBC_GMSurveyCurrentSurvey,

    /**
     * No comment (yet!)
     */
    GMSurveyQuestions : DBC_GMSurveyQuestions,

    /**
     * No comment (yet!)
     */
    GMSurveySurveys : DBC_GMSurveySurveys,

    /**
     * No comment (yet!)
     */
    GMTicketCategory : DBC_GMTicketCategory,

    /**
     * No comment (yet!)
     */
    GroundEffectDoodad : DBC_GroundEffectDoodad,

    /**
     * No comment (yet!)
     */
    GroundEffectTexture : DBC_GroundEffectTexture,

    /**
     * No comment (yet!)
     */
    GtBarberShopCostBase : DBC_GtBarberShopCostBase,

    /**
     * No comment (yet!)
     */
    GtChanceToMeleeCrit : DBC_GtChanceToMeleeCrit,

    /**
     * No comment (yet!)
     */
    GtChanceToMeleeCritBase : DBC_GtChanceToMeleeCritBase,

    /**
     * No comment (yet!)
     */
    GtChanceToSpellCrit : DBC_GtChanceToSpellCrit,

    /**
     * No comment (yet!)
     */
    GtChanceToSpellCritBase : DBC_GtChanceToSpellCritBase,

    /**
     * No comment (yet!)
     */
    GtCombatRatings : DBC_GtCombatRatings,

    /**
     * No comment (yet!)
     */
    GtNPCManaCostScaler : DBC_GtNPCManaCostScaler,

    /**
     * No comment (yet!)
     */
    GtOCTClassCombatRatingScalar : DBC_GtOCTClassCombatRatingScalar,

    /**
     * No comment (yet!)
     */
    GtOCTRegenHP : DBC_GtOCTRegenHP,

    /**
     * No comment (yet!)
     */
    GtOCTRegenMP : DBC_GtOCTRegenMP,

    /**
     * No comment (yet!)
     */
    GtRegenHPPerSpt : DBC_GtRegenHPPerSpt,

    /**
     * No comment (yet!)
     */
    GtRegenMPPerSpt : DBC_GtRegenMPPerSpt,

    /**
     * No comment (yet!)
     */
    HelmetGeosetVisData : DBC_HelmetGeosetVisData,

    /**
     * No comment (yet!)
     */
    HolidayDescriptions : DBC_HolidayDescriptions,

    /**
     * No comment (yet!)
     */
    HolidayNames : DBC_HolidayNames,

    /**
     * No comment (yet!)
     */
    Holidays : DBC_Holidays,

    /**
     * No comment (yet!)
     */
    Item : DBC_Item,

    /**
     * No comment (yet!)
     */
    ItemBagFamily : DBC_ItemBagFamily,

    /**
     * No comment (yet!)
     */
    ItemClass : DBC_ItemClass,

    /**
     * No comment (yet!)
     */
    ItemCondExtCosts : DBC_ItemCondExtCosts,

    /**
     * No comment (yet!)
     */
    ItemDisplayInfo : DBC_ItemDisplayInfo,

    /**
     * No comment (yet!)
     */
    ItemExtendedCost : DBC_ItemExtendedCost,

    /**
     * No comment (yet!)
     */
    ItemGroupSounds : DBC_ItemGroupSounds,

    /**
     * No comment (yet!)
     */
    ItemLimitCategory : DBC_ItemLimitCategory,

    /**
     * No comment (yet!)
     */
    ItemPetFood : DBC_ItemPetFood,

    /**
     * No comment (yet!)
     */
    ItemPurchaseGroup : DBC_ItemPurchaseGroup,

    /**
     * No comment (yet!)
     */
    ItemRandomProperties : DBC_ItemRandomProperties,

    /**
     * No comment (yet!)
     */
    ItemRandomSuffix : DBC_ItemRandomSuffix,

    /**
     * No comment (yet!)
     */
    ItemSet : DBC_ItemSet,

    /**
     * No comment (yet!)
     */
    ItemSubClass : DBC_ItemSubClass,

    /**
     * No comment (yet!)
     */
    ItemSubClassMask : DBC_ItemSubClassMask,

    /**
     * No comment (yet!)
     */
    ItemVisualEffects : DBC_ItemVisualEffects,

    /**
     * No comment (yet!)
     */
    ItemVisuals : DBC_ItemVisuals,

    /**
     * No comment (yet!)
     */
    Languages : DBC_Languages,

    /**
     * No comment (yet!)
     */
    LanguageWords : DBC_LanguageWords,

    /**
     * No comment (yet!)
     */
    LfgDungeonExpansion : DBC_LfgDungeonExpansion,

    /**
     * No comment (yet!)
     */
    LfgDungeonGroup : DBC_LfgDungeonGroup,

    /**
     * No comment (yet!)
     */
    LfgDungeons : DBC_LfgDungeons,

    /**
     * No comment (yet!)
     */
    Light : DBC_Light,

    /**
     * No comment (yet!)
     */
    LightfloatBand : DBC_LightfloatBand,

    /**
     * No comment (yet!)
     */
    LightintBand : DBC_LightintBand,

    /**
     * No comment (yet!)
     */
    LightParams : DBC_LightParams,

    /**
     * No comment (yet!)
     */
    LightSkybox : DBC_LightSkybox,

    /**
     * No comment (yet!)
     */
    LiquidMaterial : DBC_LiquidMaterial,

    /**
     * No comment (yet!)
     */
    LiquidType : DBC_LiquidType,

    /**
     * No comment (yet!)
     */
    LoadingScreens : DBC_LoadingScreens,

    /**
     * No comment (yet!)
     */
    LoadingScreenTaxiSplines : DBC_LoadingScreenTaxiSplines,

    /**
     * No comment (yet!)
     */
    Lock : DBC_Lock,

    /**
     * No comment (yet!)
     */
    LockType : DBC_LockType,

    /**
     * No comment (yet!)
     */
    MailTemplate : DBC_MailTemplate,

    /**
     * No comment (yet!)
     */
    Map : DBC_Map,

    /**
     * No comment (yet!)
     */
    MapDifficulty : DBC_MapDifficulty,

    /**
     * No comment (yet!)
     */
    Material : DBC_Material,

    /**
     * No comment (yet!)
     */
    Movie : DBC_Movie,

    /**
     * No comment (yet!)
     */
    MovieFileData : DBC_MovieFileData,

    /**
     * No comment (yet!)
     */
    MovieVariation : DBC_MovieVariation,

    /**
     * No comment (yet!)
     */
    NameGen : DBC_NameGen,

    /**
     * No comment (yet!)
     */
    NamesProfanity : DBC_NamesProfanity,

    /**
     * No comment (yet!)
     */
    NamesReserved : DBC_NamesReserved,

    /**
     * No comment (yet!)
     */
    NPCSounds : DBC_NPCSounds,

    /**
     * No comment (yet!)
     */
    ObjectEffect : DBC_ObjectEffect,

    /**
     * No comment (yet!)
     */
    ObjectEffectGroup : DBC_ObjectEffectGroup,

    /**
     * No comment (yet!)
     */
    ObjectEffectModifier : DBC_ObjectEffectModifier,

    /**
     * No comment (yet!)
     */
    ObjectEffectPackage : DBC_ObjectEffectPackage,

    /**
     * No comment (yet!)
     */
    ObjectEffectPackageElem : DBC_ObjectEffectPackageElem,

    /**
     * No comment (yet!)
     */
    OverrideSpellData : DBC_OverrideSpellData,

    /**
     * No comment (yet!)
     */
    Package : DBC_Package,

    /**
     * No comment (yet!)
     */
    PageTextMaterial : DBC_PageTextMaterial,

    /**
     * No comment (yet!)
     */
    PaperDollItemFrame : DBC_PaperDollItemFrame,

    /**
     * No comment (yet!)
     */
    ParticleColor : DBC_ParticleColor,

    /**
     * No comment (yet!)
     */
    PetitionType : DBC_PetitionType,

    /**
     * No comment (yet!)
     */
    PetPersonality : DBC_PetPersonality,

    /**
     * No comment (yet!)
     */
    PowerDisplay : DBC_PowerDisplay,

    /**
     * No comment (yet!)
     */
    PvpDifficulty : DBC_PvpDifficulty,

    /**
     * No comment (yet!)
     */
    QuestFactionReward : DBC_QuestFactionReward,

    /**
     * No comment (yet!)
     */
    QuestInfo : DBC_QuestInfo,

    /**
     * No comment (yet!)
     */
    QuestSort : DBC_QuestSort,

    /**
     * No comment (yet!)
     */
    QuestXP : DBC_QuestXP,

    /**
     * No comment (yet!)
     */
    RandPropPoints : DBC_RandPropPoints,

    /**
     * No comment (yet!)
     */
    Resistances : DBC_Resistances,

    /**
     * No comment (yet!)
     */
    ScalingStatDistribution : DBC_ScalingStatDistribution,

    /**
     * No comment (yet!)
     */
    ScalingStatValues : DBC_ScalingStatValues,

    /**
     * No comment (yet!)
     */
    ScreenEffect : DBC_ScreenEffect,

    /**
     * No comment (yet!)
     */
    ServerMessages : DBC_ServerMessages,

    /**
     * No comment (yet!)
     */
    SheatheSoundLookups : DBC_SheatheSoundLookups,

    /**
     * No comment (yet!)
     */
    SkillCostsData : DBC_SkillCostsData,

    /**
     * No comment (yet!)
     */
    SkillLine : DBC_SkillLine,

    /**
     * No comment (yet!)
     */
    SkillLineAbility : DBC_SkillLineAbility,

    /**
     * No comment (yet!)
     */
    SkillLineCategory : DBC_SkillLineCategory,

    /**
     * No comment (yet!)
     */
    SkillRaceClassInfo : DBC_SkillRaceClassInfo,

    /**
     * No comment (yet!)
     */
    SkillTiers : DBC_SkillTiers,

    /**
     * No comment (yet!)
     */
    SoundAmbience : DBC_SoundAmbience,

    /**
     * No comment (yet!)
     */
    SoundEmitters : DBC_SoundEmitters,

    /**
     * No comment (yet!)
     */
    SoundEntries : DBC_SoundEntries,

    /**
     * No comment (yet!)
     */
    SoundEntriesAdvanced : DBC_SoundEntriesAdvanced,

    /**
     * No comment (yet!)
     */
    SoundFilter : DBC_SoundFilter,

    /**
     * No comment (yet!)
     */
    SoundFilterElem : DBC_SoundFilterElem,

    /**
     * No comment (yet!)
     */
    SoundProviderPreferences : DBC_SoundProviderPreferences,

    /**
     * No comment (yet!)
     */
    SoundSamplePreferences : DBC_SoundSamplePreferences,

    /**
     * No comment (yet!)
     */
    SoundWaterType : DBC_SoundWaterType,

    /**
     * No comment (yet!)
     */
    SpamMessages : DBC_SpamMessages,

    /**
     * No comment (yet!)
     */
    Spell : DBC_Spell,

    /**
     * No comment (yet!)
     */
    SpellCastTimes : DBC_SpellCastTimes,

    /**
     * No comment (yet!)
     */
    SpellCategory : DBC_SpellCategory,

    /**
     * No comment (yet!)
     */
    SpellChainEffects : DBC_SpellChainEffects,

    /**
     * No comment (yet!)
     */
    SpellDescriptionVariables : DBC_SpellDescriptionVariables,

    /**
     * No comment (yet!)
     */
    SpellDifficulty : DBC_SpellDifficulty,

    /**
     * No comment (yet!)
     */
    SpellDispelType : DBC_SpellDispelType,

    /**
     * No comment (yet!)
     */
    SpellDuration : DBC_SpellDuration,

    /**
     * No comment (yet!)
     */
    SpellEffectCameraShakes : DBC_SpellEffectCameraShakes,

    /**
     * No comment (yet!)
     */
    SpellFocusObject : DBC_SpellFocusObject,

    /**
     * No comment (yet!)
     */
    SpellIcon : DBC_SpellIcon,

    /**
     * No comment (yet!)
     */
    SpellItemEnchantment : DBC_SpellItemEnchantment,

    /**
     * No comment (yet!)
     */
    SpellItemEnchantmentCondition : DBC_SpellItemEnchantmentCondition,

    /**
     * No comment (yet!)
     */
    SpellMechanic : DBC_SpellMechanic,

    /**
     * No comment (yet!)
     */
    SpellMissile : DBC_SpellMissile,

    /**
     * No comment (yet!)
     */
    SpellMissileMotion : DBC_SpellMissileMotion,

    /**
     * No comment (yet!)
     */
    SpellRadius : DBC_SpellRadius,

    /**
     * No comment (yet!)
     */
    SpellRange : DBC_SpellRange,

    /**
     * No comment (yet!)
     */
    SpellRuneCost : DBC_SpellRuneCost,

    /**
     * No comment (yet!)
     */
    SpellShapeshiftForm : DBC_SpellShapeshiftForm,

    /**
     * No comment (yet!)
     */
    SpellVisual : DBC_SpellVisual,

    /**
     * No comment (yet!)
     */
    SpellVisualEffectName : DBC_SpellVisualEffectName,

    /**
     * No comment (yet!)
     */
    SpellVisualKit : DBC_SpellVisualKit,

    /**
     * No comment (yet!)
     */
    SpellVisualKitAreaModel : DBC_SpellVisualKitAreaModel,

    /**
     * No comment (yet!)
     */
    SpellVisualKitModelAttach : DBC_SpellVisualKitModelAttach,

    /**
     * No comment (yet!)
     */
    SpellVisualPrecastTransitions : DBC_SpellVisualPrecastTransitions,

    /**
     * No comment (yet!)
     */
    StableSlotPrices : DBC_StableSlotPrices,

    /**
     * No comment (yet!)
     */
    Startup_strings : DBC_Startup_strings,

    /**
     * No comment (yet!)
     */
    Stationery : DBC_Stationery,

    /**
     * No comment (yet!)
     */
    StringLookups : DBC_StringLookups,

    /**
     * No comment (yet!)
     */
    SummonProperties : DBC_SummonProperties,

    /**
     * No comment (yet!)
     */
    Talent : DBC_Talent,

    /**
     * No comment (yet!)
     */
    TalentTab : DBC_TalentTab,

    /**
     * No comment (yet!)
     */
    TaxiNodes : DBC_TaxiNodes,

    /**
     * No comment (yet!)
     */
    TaxiPath : DBC_TaxiPath,

    /**
     * No comment (yet!)
     */
    TaxiPathNode : DBC_TaxiPathNode,

    /**
     * No comment (yet!)
     */
    TeamContributionPoints : DBC_TeamContributionPoints,

    /**
     * No comment (yet!)
     */
    Terraintype : DBC_Terraintype,

    /**
     * No comment (yet!)
     */
    TerraintypeSounds : DBC_TerraintypeSounds,

    /**
     * No comment (yet!)
     */
    TotemCategory : DBC_TotemCategory,

    /**
     * No comment (yet!)
     */
    TransportAnimation : DBC_TransportAnimation,

    /**
     * No comment (yet!)
     */
    TransportPhysics : DBC_TransportPhysics,

    /**
     * No comment (yet!)
     */
    TransportRotation : DBC_TransportRotation,

    /**
     * No comment (yet!)
     */
    UISoundLookups : DBC_UISoundLookups,

    /**
     * No comment (yet!)
     */
    UnitBlood : DBC_UnitBlood,

    /**
     * No comment (yet!)
     */
    UnitBloodLevels : DBC_UnitBloodLevels,

    /**
     * No comment (yet!)
     */
    Vehicle : DBC_Vehicle,

    /**
     * No comment (yet!)
     */
    VehicleSeat : DBC_VehicleSeat,

    /**
     * No comment (yet!)
     */
    VehicleUIIndicator : DBC_VehicleUIIndicator,

    /**
     * No comment (yet!)
     */
    VehicleUIIndSeat : DBC_VehicleUIIndSeat,

    /**
     * No comment (yet!)
     */
    VideoHardware : DBC_VideoHardware,

    /**
     * No comment (yet!)
     */
    VocalUISounds : DBC_VocalUISounds,

    /**
     * No comment (yet!)
     */
    WeaponImpactSounds : DBC_WeaponImpactSounds,

    /**
     * No comment (yet!)
     */
    WeaponSwingSounds2 : DBC_WeaponSwingSounds2,

    /**
     * No comment (yet!)
     */
    Weather : DBC_Weather,

    /**
     * No comment (yet!)
     */
    WMOAreaTable : DBC_WMOAreaTable,

    /**
     * No comment (yet!)
     */
    WorldChunkSounds : DBC_WorldChunkSounds,

    /**
     * No comment (yet!)
     */
    WorldMapArea : DBC_WorldMapArea,

    /**
     * No comment (yet!)
     */
    WorldMapContinent : DBC_WorldMapContinent,

    /**
     * No comment (yet!)
     */
    WorldMapOverlay : DBC_WorldMapOverlay,

    /**
     * No comment (yet!)
     */
    WorldMapTransforms : DBC_WorldMapTransforms,

    /**
     * No comment (yet!)
     */
    WorldSafelocs : DBC_WorldSafelocs,

    /**
     * No comment (yet!)
     */
    WorldStateUI : DBC_WorldStateUI,

    /**
     * No comment (yet!)
     */
    WorldStateZoneSounds : DBC_WorldStateZoneSounds,

    /**
     * No comment (yet!)
     */
    WowError_Strings : DBC_WowError_Strings,

    /**
     * No comment (yet!)
     */
    ZoneintroMusicTable : DBC_ZoneintroMusicTable,

    /**
     * No comment (yet!)
     */
    ZoneMusic : DBC_ZoneMusic,
}

export type DBCNames = "Achievement" | "Achievement_Category" | "Achievement_Criteria" | "AnimationData" | "AreaGroup" | "AreaPOI" | "AreaTable" | "AreaTrigger" | "AttackAnimKits" | "AttackAnimTypes" | "AuctionHouse" | "BankBagSlotPrices" | "BannedAddOns" | "BarberShopStyle" | "BattlemasterList" | "CameraShakes" | "Cfg_Categories" | "Cfg_Configs" | "CharacterFacialHairStyles" | "CharBaseInfo" | "CharHairGeosets" | "CharHairTextures" | "CharSections" | "CharStartOutfit" | "CharTitles" | "ChatChannels" | "ChatProfanity" | "ChrClasses" | "ChrRaces" | "CinematicCamera" | "CinematicSequences" | "CreatureDisplayInfo" | "CreatureDisplayInfoExtra" | "CreatureFamily" | "CreatureModelData" | "CreatureMovementInfo" | "CreatureSoundData" | "CreatureSpellData" | "CreatureType" | "CurrencyCategory" | "CurrencyTypes" | "DanceMoves" | "DeathThudLookups" | "DeclinedWord" | "DeclinedWordCases" | "DestructibleModelData" | "DungeonEncounter" | "DungeonMap" | "DungeonMapChunk" | "DurabilityCosts" | "DurabilityQuality" | "Emotes" | "EmotesText" | "EmotesTextData" | "EmotesTextSound" | "EnvironmentalDamage" | "Exhaustion" | "Faction" | "FactionGroup" | "FactionTemplate" | "FileData" | "FootprintTextures" | "FootstepTerrainLookup" | "GameObjectArtKit" | "GameObjectDisplayInfo" | "GameTables" | "GameTips" | "GemProperties" | "GlyphProperties" | "GlyphSlot" | "GMSurveyAnswers" | "GMSurveyCurrentSurvey" | "GMSurveyQuestions" | "GMSurveySurveys" | "GMTicketCategory" | "GroundEffectDoodad" | "GroundEffectTexture" | "GtBarberShopCostBase" | "GtChanceToMeleeCrit" | "GtChanceToMeleeCritBase" | "GtChanceToSpellCrit" | "GtChanceToSpellCritBase" | "GtCombatRatings" | "GtNPCManaCostScaler" | "GtOCTClassCombatRatingScalar" | "GtOCTRegenHP" | "GtOCTRegenMP" | "GtRegenHPPerSpt" | "GtRegenMPPerSpt" | "HelmetGeosetVisData" | "HolidayDescriptions" | "HolidayNames" | "Holidays" | "Item" | "ItemBagFamily" | "ItemClass" | "ItemCondExtCosts" | "ItemDisplayInfo" | "ItemExtendedCost" | "ItemGroupSounds" | "ItemLimitCategory" | "ItemPetFood" | "ItemPurchaseGroup" | "ItemRandomProperties" | "ItemRandomSuffix" | "ItemSet" | "ItemSubClass" | "ItemSubClassMask" | "ItemVisualEffects" | "ItemVisuals" | "Languages" | "LanguageWords" | "LfgDungeonExpansion" | "LfgDungeonGroup" | "LfgDungeons" | "Light" | "LightfloatBand" | "LightintBand" | "LightParams" | "LightSkybox" | "LiquidMaterial" | "LiquidType" | "LoadingScreens" | "LoadingScreenTaxiSplines" | "Lock" | "LockType" | "MailTemplate" | "Map" | "MapDifficulty" | "Material" | "Movie" | "MovieFileData" | "MovieVariation" | "NameGen" | "NamesProfanity" | "NamesReserved" | "NPCSounds" | "ObjectEffect" | "ObjectEffectGroup" | "ObjectEffectModifier" | "ObjectEffectPackage" | "ObjectEffectPackageElem" | "OverrideSpellData" | "Package" | "PageTextMaterial" | "PaperDollItemFrame" | "ParticleColor" | "PetitionType" | "PetPersonality" | "PowerDisplay" | "PvpDifficulty" | "QuestFactionReward" | "QuestInfo" | "QuestSort" | "QuestXP" | "RandPropPoints" | "Resistances" | "ScalingStatDistribution" | "ScalingStatValues" | "ScreenEffect" | "ServerMessages" | "SheatheSoundLookups" | "SkillCostsData" | "SkillLine" | "SkillLineAbility" | "SkillLineCategory" | "SkillRaceClassInfo" | "SkillTiers" | "SoundAmbience" | "SoundEmitters" | "SoundEntries" | "SoundEntriesAdvanced" | "SoundFilter" | "SoundFilterElem" | "SoundProviderPreferences" | "SoundSamplePreferences" | "SoundWaterType" | "SpamMessages" | "Spell" | "SpellCastTimes" | "SpellCategory" | "SpellChainEffects" | "SpellDescriptionVariables" | "SpellDifficulty" | "SpellDispelType" | "SpellDuration" | "SpellEffectCameraShakes" | "SpellFocusObject" | "SpellIcon" | "SpellItemEnchantment" | "SpellItemEnchantmentCondition" | "SpellMechanic" | "SpellMissile" | "SpellMissileMotion" | "SpellRadius" | "SpellRange" | "SpellRuneCost" | "SpellShapeshiftForm" | "SpellVisual" | "SpellVisualEffectName" | "SpellVisualKit" | "SpellVisualKitAreaModel" | "SpellVisualKitModelAttach" | "SpellVisualPrecastTransitions" | "StableSlotPrices" | "Startup_strings" | "Stationery" | "StringLookups" | "SummonProperties" | "Talent" | "TalentTab" | "TaxiNodes" | "TaxiPath" | "TaxiPathNode" | "TeamContributionPoints" | "Terraintype" | "TerraintypeSounds" | "TotemCategory" | "TransportAnimation" | "TransportPhysics" | "TransportRotation" | "UISoundLookups" | "UnitBlood" | "UnitBloodLevels" | "Vehicle" | "VehicleSeat" | "VehicleUIIndicator" | "VehicleUIIndSeat" | "VideoHardware" | "VocalUISounds" | "WeaponImpactSounds" | "WeaponSwingSounds2" | "Weather" | "WMOAreaTable" | "WorldChunkSounds" | "WorldMapArea" | "WorldMapContinent" | "WorldMapOverlay" | "WorldMapTransforms" | "WorldSafelocs" | "WorldStateUI" | "WorldStateZoneSounds" | "WowError_Strings" | "ZoneintroMusicTable" | "ZoneMusic"

export const DBCFiles : DBCFile<any,any,any>[] = Object.values(DBC);
