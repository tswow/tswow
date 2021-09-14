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
import { Achievements } from "./Achievement/Achievement";
import { AreaRegistry } from "./Area/Area";
import { WMOAreaRegistry } from "./Area/WMOArea";
import { AreaTriggerRegistry } from "./AreaTrigger/AreaTrigger";
import { BattlegroundRegistry } from "./Battleground/Battleground";
import { BattlegroundPoolRegistry } from "./Battleground/BattlegroundPool";
import { Classes } from "./Class/Class";
import { CreatureInstances, CreatureTemplates } from "./Creature/Creatures";
import { CurrencyRegistry } from "./Currency/Currency";
import { CurrencyCategoryRegistry } from "./Currency/CurrencyCategory";
import { ElevatorRegistry } from "./Elevators/Elevators";
import { EnchantmentRegistry } from "./Enchant/Enchantment";
import { EnchantmentConditionsRegistry } from "./Enchant/EnchantmentCondition";
import { Factions } from "./Faction/Faction";
import { GameEventRegistry } from "./GameEvent/GameEvent";
import { HolidayRegistry } from "./GameEvent/Holiday";
import { GameObjectDisplays, GameObjectInstances, GameObjectTemplates } from "./GameObject/GameObjects";
import { GemRegistry } from "./Gem/Gem";
import { GlyphRegistry } from "./Glyph/Glyph";
import { Gossips } from "./Gossip/Gossips";
import { TSImages } from "./Images/Image";
import { Items } from "./Item/ItemTemplate";
import { Languages } from "./Languages/Languages";
import { Lights } from "./Light/Lights";
import { Locks, LockTypes } from "./Locks/Locks";
import { Loot } from "./Loot/Loot";
import { MailTemplateRegistry } from "./Mail/MailTemplate";
import { LoadingScreens } from "./Map/LoadingScreen";
import { Maps } from "./Map/Maps";
import { Compare } from "./Misc/Compare";
import { Ids } from "./Misc/Ids";
import { CompanionRegistry } from "./PetsCollectibles/Companion";
import { MountRegistry } from "./PetsCollectibles/Mount";
import { Professions } from "./Profession/Professions";
import { Quests } from "./Quest/Quests";
import { SkillLines } from "./SkillLines/SkillLines";
import { ClassSkills } from "./Skills/ClassSkill";
import { SkillTiersRegistry } from "./SkillTiers/SkillTiers";
import { SmartScripts } from "./SmartScript/SmartScript";
import { SoundAmbienceRegistry } from "./Sound/SoundAmbience";
import { SoundEntryRegistry } from "./Sound/SoundEntry";
import { ZoneIntroMusicRegistry } from "./Sound/ZoneIntroMusic";
import { ZoneMusicRegistry } from "./Sound/ZoneMusic";
import { SpellGroups, Spells } from "./Spell/Spells";
import { TalentTrees } from "./Talents/Talents";
import { TaxiPathRegistry } from "./Taxi/Taxi";
import { Titles } from "./Title/Titles";
import { TransportRegistry } from "./Transport/Transport";
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
    Spells : Spells,
    SpellGroups : SpellGroups,
    Languages : Languages,
    Quests : Quests,
    Titles: Titles,
    Achievements: Achievements,
    Loot: Loot,
    Items: Items,
    Creatures: CreatureInstances,
    Classes: Classes,
    UI: UI,
    ClassSkills: ClassSkills,
    SkillLines: SkillLines,
    /** Templates used by one or multiple creature instances */
    CreatureTemplates: CreatureTemplates,
    /** Individual creatures placed in the world */
    CreatureInstances: CreatureInstances,
    TalentTrees: TalentTrees,
    Factions: Factions,
    Scripts: SmartScripts,
    Gossip: Gossips,
    Lights: Lights,
    ScriptPaths: ScriptPaths,
    Areas: AreaRegistry,
    Maps: new Maps(),
    LoadingScreens: LoadingScreens,
    /** Templates used by one or multiple game object instances */
    GameObjectTemplates: GameObjectTemplates,
    /** Individual Game Objects placed in the world */
    GameObjectInstances: GameObjectInstances,
    /** Model, sound and bounding box data for GameObjects */
    GameObjectDisplays: GameObjectDisplays,
    /** Allows manipulating images programmatically */
    Image: TSImages,
    Professions: Professions,
    Locks: Locks,
    LockTypes: LockTypes,
    SoundEntries: SoundEntryRegistry,
    SoundAmbience: SoundAmbienceRegistry,
    ZoneMusic: ZoneMusicRegistry,
    ZoneIntroMusic: ZoneIntroMusicRegistry,
    MailTemplates: MailTemplateRegistry,
    Compare: Compare,
    SkillTiers: SkillTiersRegistry,
    Glyphs: GlyphRegistry,
    Enchantments: EnchantmentRegistry,
    EnchantmentConditions: EnchantmentConditionsRegistry,
    Gems: GemRegistry,
    Currency: CurrencyRegistry,
    CurrencyCategory: CurrencyCategoryRegistry,
    Taxi: TaxiPathRegistry,
    Transports: TransportRegistry,
    Elevators: ElevatorRegistry,
    Mounts: MountRegistry,
    Companions: CompanionRegistry,
    WorldSafeLocs: WorldSafeLocRegistry,
    Battlegrounds: BattlegroundRegistry,
    BattlegroundPools: BattlegroundPoolRegistry,
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
    AreaTriggers: AreaTriggerRegistry
}