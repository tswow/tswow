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
import { DBC, DBCLoader, LUAXML, SQL } from "wotlkdata";
import { BuildArgs } from "wotlkdata/wotlkdata/Settings";
import { AchievementRegistry } from "./Achievement/Achievement";
import { AchievementCategoryRegistry } from "./Achievement/AchievementCategory";
import { AreaRegistry } from "./Area/Area";
import { AreaGroupRegistry } from "./Area/AreaGroup";
import { WMOAreaRegistry } from "./Area/WMOArea";
import { AreaTriggerRegistry } from "./AreaTrigger/AreaTrigger";
import { BroadcastTextRegistry } from "./BroadcastText/BroadcastText";
import { CreatureTextRegistry } from "./BroadcastText/CreatureText";
import { ClassRegistry } from "./Class/ClassRegistry";
import { CreatureInstanceRegistry, CreatureTemplateRegistry } from "./Creature/Creatures";
import { CreatureOutfitsRegistry } from "./CreatureOutfits/CreatureOutfitsRegistry";
import { CurrencyRegistry } from "./Currency/Currency";
import { CurrencyCategoryRegistry } from "./Currency/CurrencyCategory";
import { EnchantmentRegistry } from "./Enchant/Enchantment";
import { EnchantmentConditionRegistry } from "./Enchant/EnchantmentCondition";
import { ExtendedCostRegistry } from "./ExtendedCost/ExtendedCost";
import { FactionRegistry } from "./Faction/Faction";
import { GameEventRegistry } from "./GameEvent/GameEvent";
import { HolidayRegistry } from "./GameEvent/Holiday";
import { GORegistry } from "./GameObject/GameObjectRegistries";
import { GameObjectDisplayRegistry, GameObjectInstances } from "./GameObject/GameObjects";
import { GemRegistry } from "./Gem/Gem";
import { GlyphRegistry } from "./Glyph/Glyph";
import { GMTeleportRegistry } from "./GMTeleport/GMTeleport";
import { GossipRegistry } from "./Gossip/Gossips";
import { NPCTextRegistry } from "./Gossip/NPCTextRegistry";
import { TSImages } from "./Images/Image";
import { InlineScript } from "./InlineScript/InlineScript";
import { ItemDisplayinfoRegistry } from "./Item/ItemDisplayInfo";
import { ItemSetRegistry } from "./Item/ItemSet";
import { ItemTemplateRegistry } from "./Item/ItemTemplate";
import { KeyRegistry } from "./Key/Key";
import { LanguageRegistry } from "./Languages/Languages";
import { Lights } from "./Light/Lights";
import { LockRegistry, LockTypeRegistry } from "./Locks/Locks";
import { Loot } from "./Loot/Loot";
import { MailTemplateRegistry } from "./Mail/MailTemplate";
import { LoadingScreens } from "./Map/LoadingScreen";
import { MapRegistry } from "./Map/Maps";
import { Colors } from "./Misc/Color";
import { Compare } from "./Misc/Compare";
import { Ids } from "./Misc/Ids";
import { CompanionRegistry } from "./PetsCollectibles/Companion";
import { MountRegistry } from "./PetsCollectibles/Mount";
import { ProfessionRegistry } from "./Profession/Professions";
import { QuestRegistry } from "./Quest/Quests";
import { EquipSkills } from "./SkillLines/EquipSkills";
import { SkillLineRegistry } from "./SkillLines/SkillLines";
import { SkillTiersRegistry } from "./SkillTiers/SkillTiers";
import { SmartScripts } from "./SmartScript/SmartScript";
import { SoundAmbienceRegistry } from "./Sound/SoundAmbience";
import { SoundEntryRegistry } from "./Sound/SoundEntry";
import { ZoneIntroMusicRegistry } from "./Sound/ZoneIntroMusic";
import { ZoneMusicRegistry } from "./Sound/ZoneMusic";
import { SpawnGroupRegistry } from "./SpawnGroup/SpawnGroupRegistry";
import { SpellRegistry } from "./Spell/Spells";
import { SpellStackGroupRegistry } from "./Spell/SpellStackGroup";
import { SpellFocusRegistry } from "./SpellFocus/SpellFocus";
import { TalentTreeRegistry } from "./Talents/Talents";
import { TaxiPathRegistry } from "./Taxi/Taxi";
import { TaxiEndNodeRegistry } from "./Taxi/TaxiEndNode";
import { TitleRegistry } from "./Title/Titles";
import { TotemCategoryRegistry } from "./TotemCategory/TotemCategory";
import { TotemTypeRegistry } from "./TotemCategory/TotemType";
import { UI } from "./UI/UI";
import { VehicleRegistry } from "./Vehicle/Vehicle";
import { ScriptPaths } from "./Waypoints/ScriptPaths";
import { DungeonMapRegistry } from "./Worldmap/DungeonMap";
import { WorldMapAreaRegistry } from "./Worldmap/WorldMapArea";
import { WorldMapContinentRegistry } from "./Worldmap/WorldMapContinent";
import { WorldMapOverlayRegistry } from "./Worldmap/WorldMapOverlay";
import { WorldMapTransformRegistry } from "./Worldmap/WorldMapTransform";
import { WorldSafeLocRegistry } from "./WorldSafeLocs/WorldSafeLocs";
import { AreaPOIRegistry } from "./WorldState/AreaPOI";
import { WorldStateRegistry } from "./WorldState/WorldState";
import { WorldStateUIRegistry } from "./WorldState/WorldStateUI";

export const std = {
    Spells : SpellRegistry,
    Languages : LanguageRegistry,
    Quests : QuestRegistry,
    Titles: TitleRegistry,
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
    isReadOnly: BuildArgs.READ_ONLY,
    DBC: DBC,
    /** Used to load external dbc files for conversion purposes. */
    DBCLoader: DBCLoader,
    SQL: SQL,
    LUAXML: LUAXML
}