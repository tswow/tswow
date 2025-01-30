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
import { finish, luaxml, patch, read, setup, sort, write } from "../data";
import { BuildArgs, EmulatorCore } from "../data/Settings";
import { DBC as _DBC, DBCLoader } from "./DBCFiles";
import { LUAXML as _LUAXML } from "./luaxml/LUAXML";
import { SQL as _SQL } from "./SQLFiles";
import { AccessRequirement, AccessRequirementRegistry } from "./std/AccessRequirement/AccessRequirement";
import { AchievementRegistry } from "./std/Achievement/Achievement";
import { AchievementCategoryRegistry } from "./std/Achievement/AchievementCategory";
import { AreaRegistry } from "./std/Area/Area";
import { AreaGroupRegistry } from "./std/Area/AreaGroup";
import { WMOAreaRegistry } from "./std/Area/WMOArea";
import { AreaTriggerRegistry } from "./std/AreaTrigger/AreaTrigger";
import { BattlegroundStatInfoRegistry } from "./std/Battleground/BattlegroundStatInfo";
import { BroadcastTextRegistry } from "./std/BroadcastText/BroadcastText";
import { CreatureTextRegistry } from "./std/BroadcastText/CreatureText";
import { ClassRegistry } from "./std/Class/ClassRegistry";
import { CreatureDisplayInfoRegistry, CreatureModelRegistry } from "./std/Creature/CreatureDisplayInfo";
import { CreatureInstanceRegistry, CreatureTemplateRegistry } from "./std/Creature/Creatures";
import { CreatureSoundDataRegistry } from "./std/Creature/CreatureSoundData";
import { FootstepTerrainLookupRegistry } from "./std/Creature/FootstepTerrainLookup";
import { NPCSoundsRegistry } from "./std/Creature/NPCSounds";
import { CreatureOutfitsRegistry } from "./std/CreatureOutfits/CreatureOutfitsRegistry";
import { CurrencyRegistry } from "./std/Currency/Currency";
import { CurrencyCategoryRegistry } from "./std/Currency/CurrencyCategory";
import { EnchantmentRegistry } from "./std/Enchant/Enchantment";
import { EnchantmentConditionRegistry } from "./std/Enchant/EnchantmentCondition";
import { ExtendedCostRegistry } from "./std/ExtendedCost/ExtendedCost";
import { FactionRegistry } from "./std/Faction/Faction";
import { GameEventRegistry } from "./std/GameEvent/GameEvent";
import { HolidayRegistry } from "./std/GameEvent/Holiday";
import { GORegistry } from "./std/GameObject/GameObjectRegistries";
import { GameObjectDisplayRegistry, GameObjectInstances } from "./std/GameObject/GameObjects";
import { GemRegistry } from "./std/Gem/Gem";
import { GlyphRegistry } from "./std/Glyph/Glyph";
import { GMTeleportRegistry } from "./std/GMTeleport/GMTeleport";
import { GossipRegistry } from "./std/Gossip/Gossips";
import { NPCTextRegistry } from "./std/Gossip/NPCTextRegistry";
import { GroundEffectDoodadRegistry } from "./std/GroundEffect/GroundEffectDoodad";
import { TSImages } from "./std/Images/Image";
import { InlineScript } from "./std/InlineScript/InlineScript";
import { ItemDisplayinfoRegistry } from "./std/Item/ItemDisplayInfo";
import { ItemSetRegistry } from "./std/Item/ItemSet";
import { ItemTemplateRegistry } from "./std/Item/ItemTemplate";
import { KeyRegistry } from "./std/Key/Key";
import { LanguageRegistry } from "./std/Languages/Languages";
import { Lights } from "./std/Light/Lights";
import { LockRegistry, LockTypeRegistry } from "./std/Locks/Locks";
import { Loot } from "./std/Loot/Loot";
import { MailTemplateRegistry } from "./std/Mail/MailTemplate";
import { LoadingScreens } from "./std/Map/LoadingScreen";
import { MapRegistry } from "./std/Map/Maps";
import { Colors } from "./std/Misc/Color";
import { Compare } from "./std/Misc/Compare";
import { Ids } from "./std/Misc/Ids";
import { ParticleColorRegistry } from "./std/Misc/ParticleColor";
import { CompanionRegistry } from "./std/PetsCollectibles/Companion";
import { MountRegistry } from "./std/PetsCollectibles/Mount";
import { ProfessionRegistry } from "./std/Profession/Professions";
import { QuestRegistry } from "./std/Quest/Quests";
import { EquipSkills } from "./std/SkillLines/EquipSkills";
import { SkillLineRegistry } from "./std/SkillLines/SkillLines";
import { SkillTiersRegistry } from "./std/SkillTiers/SkillTiers";
import { SmartScripts } from "./std/SmartScript/SmartScript";
import { ActionListRegistry } from "./std/SmartScript/TimedActionList";
import { SoundAmbienceRegistry } from "./std/Sound/SoundAmbience";
import { SoundEntryRegistry } from "./std/Sound/SoundEntry";
import { ZoneIntroMusicRegistry } from "./std/Sound/ZoneIntroMusic";
import { ZoneMusicRegistry } from "./std/Sound/ZoneMusic";
import { SpawnGroupRegistry } from "./std/SpawnGroup/SpawnGroupRegistry";
import { SpellMissileRegistry } from "./std/Spell/SpellMissile";
import { SpellRuneCostRegistry } from "./std/Spell/SpellPower";
import { SpellRangeRegistry } from "./std/Spell/SpellRange";
import { SpellRegistry } from "./std/Spell/Spells";
import { SpellStackGroupRegistry } from "./std/Spell/SpellStackGroup";
import { SpellVisualKitRegistry, SpellVisualRegistry } from "./std/Spell/SpellVisual";
import { SpellVisualEffectRegistry } from "./std/Spell/SpellVisualEffect";
import { SpellFocusRegistry } from "./std/SpellFocus/SpellFocus";
import { Tags } from "./std/Tags/Tags";
import { TalentTreeRegistry } from "./std/Talents/Talents";
import { TaxiPathRegistry } from "./std/Taxi/Taxi";
import { TaxiEndNodeRegistry } from "./std/Taxi/TaxiEndNode";
import { TerrainTypeRegistry, TerrainTypeSoundRegistry } from "./std/TerrainType/TerrainType";
import { TitleRegistry } from "./std/Title/Titles";
import { TotemCategoryRegistry } from "./std/TotemCategory/TotemCategory";
import { TotemTypeRegistry } from "./std/TotemCategory/TotemType";
import { UI } from "./std/UI/UI";
import { VehicleRegistry } from "./std/Vehicle/Vehicle";
import { ScriptPaths } from "./std/Waypoints/ScriptPaths";
import { DungeonMapRegistry } from "./std/Worldmap/DungeonMap";
import { WorldMapAreaRegistry } from "./std/Worldmap/WorldMapArea";
import { WorldMapContinentRegistry } from "./std/Worldmap/WorldMapContinent";
import { WorldMapOverlayRegistry } from "./std/Worldmap/WorldMapOverlay";
import { WorldMapTransformRegistry } from "./std/Worldmap/WorldMapTransform";
import { WorldSafeLocRegistry } from "./std/WorldSafeLocs/WorldSafeLocs";
import { AreaPOIRegistry } from "./std/WorldState/AreaPOI";
import { WorldStateRegistry } from "./std/WorldState/WorldState";
import { WorldStateUIRegistry } from "./std/WorldState/WorldStateUI";

export const std = {
    Spells : SpellRegistry,
    SpellVisuals: SpellVisualRegistry,
    SpellVisualKits: SpellVisualKitRegistry,
    SpellVisualEffects: SpellVisualEffectRegistry,
    SpellMissile: SpellMissileRegistry,
    SpellRuneCost: SpellRuneCostRegistry,
    SpellRange: SpellRangeRegistry,
    Languages : LanguageRegistry,
    Quests : QuestRegistry,
    Titles: TitleRegistry,
    AccessRequirement: AccessRequirementRegistry,
    Achievements: AchievementRegistry,
    Loot: Loot,
    Items: ItemTemplateRegistry,
    Classes: ClassRegistry,
    UI: UI,
    SkillLines: SkillLineRegistry,
    /** Templates used by one or multiple creature instances */
    CreatureTemplates: CreatureTemplateRegistry,
    /** Individual creatures placed in the world */
    CreatureInstances: CreatureInstanceRegistry,
    CreatureOutfits: CreatureOutfitsRegistry,
    CreatureDisplayInfo: CreatureDisplayInfoRegistry,
    CreatureSoundData: CreatureSoundDataRegistry,
    CreatureModels: CreatureModelRegistry,
    FootstepTerrainLookup: FootstepTerrainLookupRegistry,
    NPCSounds: NPCSoundsRegistry,
    GroundEffectDoodad: GroundEffectDoodadRegistry,
    TerrainType: TerrainTypeRegistry,
    TerrainTypeSound: TerrainTypeSoundRegistry,
    TalentTrees: TalentTreeRegistry,
    Factions: FactionRegistry,
    Scripts: SmartScripts,
    Gossip: GossipRegistry,
    NPCText: NPCTextRegistry,
    Lights: Lights,
    ScriptPaths: ScriptPaths,
    Areas: AreaRegistry,
    AreaGroups: AreaGroupRegistry,
    Maps: MapRegistry,
    LoadingScreens: LoadingScreens,
    /** Templates used by one or multiple game object instances */
    GameObjectTemplates: GORegistry,
    /** Individual Game Objects placed in the world */
    GameObjectInstances: GameObjectInstances,
    /** Model, sound and bounding box data for GameObjects */
    GameObjectDisplays: GameObjectDisplayRegistry,
    /** Allows manipulating images programmatically */
    Image: TSImages,
    Professions: ProfessionRegistry,
    Locks: LockRegistry,
    LockTypes: LockTypeRegistry,
    SoundEntries: SoundEntryRegistry,
    SoundAmbience: SoundAmbienceRegistry,
    ZoneMusic: ZoneMusicRegistry,
    ZoneIntroMusic: ZoneIntroMusicRegistry,
    MailTemplates: MailTemplateRegistry,
    Compare: Compare,
    SkillTiers: SkillTiersRegistry,
    Glyphs: GlyphRegistry,
    Enchantments: EnchantmentRegistry,
    EnchantmentConditions: EnchantmentConditionRegistry,
    Gems: GemRegistry,
    Currency: CurrencyRegistry,
    CurrencyCategory: CurrencyCategoryRegistry,
    Taxi: TaxiPathRegistry,
    TaxiEndNodes: TaxiEndNodeRegistry,
    Mounts: MountRegistry,
    Companions: CompanionRegistry,
    WorldSafeLocs: WorldSafeLocRegistry,
    WorldStateUIs: WorldStateUIRegistry,
    WorldStates: WorldStateRegistry,
    WMOArea: WMOAreaRegistry,
    WorldMapAreas: WorldMapAreaRegistry,
    WorldMapContinents: WorldMapContinentRegistry,
    WorldMapOverlays: WorldMapOverlayRegistry,
    WorldMapTransforms: WorldMapTransformRegistry,
    DungeonMaps: DungeonMapRegistry,
    AreaPOI: AreaPOIRegistry,
    Vehicles: VehicleRegistry,
    Holidays: HolidayRegistry,
    GameEvents: GameEventRegistry,
    IDs: Ids,
    AreaTriggers: AreaTriggerRegistry,
    SpellStackGroups: SpellStackGroupRegistry,
    GMTeleports: GMTeleportRegistry,
    Colors: Colors,
    AchievementCategory: AchievementCategoryRegistry,
    ItemSet: ItemSetRegistry,
    ItemDisplayInfo: ItemDisplayinfoRegistry,
    ParticleColors: ParticleColorRegistry,
    ExtendedCost: ExtendedCostRegistry,
    EquipSkills: EquipSkills,
    SpellFocus: SpellFocusRegistry,
    TotemType: TotemTypeRegistry,
    TotemCategory: TotemCategoryRegistry,
    BroadcastTexts: BroadcastTextRegistry,
    CreatureTexts: CreatureTextRegistry,
    Keys: KeyRegistry,
    SpawnGroups: SpawnGroupRegistry,
    InlineScripts: InlineScript,
    Tags: Tags,
    TimedActionListBuilder: ActionListRegistry,
    isReadOnly: BuildArgs.READ_ONLY,
    DBC: _DBC,
    BattlegroundStats: BattlegroundStatInfoRegistry,
    /** Used to load external dbc files for conversion purposes. */
    DBCLoader: DBCLoader,
    SQL: _SQL,
    LUAXML: _LUAXML,
    Events: {
        setup: setup,
        read: read,
        write: write,
        patch: patch,
        finish: finish,
        luaxml: luaxml,
        sort: sort,
    },
    Core: EmulatorCore,
    isTrinityCore: EmulatorCore === 'trinitycore',
}

export const wotlk = std;
export const SQL = _SQL;
export const DBC = _DBC;
export const LUAXML = _LUAXML;
