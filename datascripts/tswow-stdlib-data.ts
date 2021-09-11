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
import { Classes } from "./Class/Class";
import { CreatureInstances, CreatureTemplates } from "./Creature/Creatures";
import { Items } from "./Item/ItemTemplate";
import { Languages } from "./Languages/Languages";
import { Loot } from "./Loot/Loot";
import { Quests } from "./Quest/Quests";
import { SkillLines } from "./SkillLines/SkillLines";
import { ClassSkills } from "./Skills/ClassSkill";
import { Spells, SpellGroups } from "./Spell/Spells";
import { TalentTrees } from "./Talents/Talents";
import { Titles } from "./Title/Titles";
import { UI } from "./UI/UI";
import { Factions } from "./Faction/Faction";
import { SmartScripts } from "./SmartScript/SmartScript";
import { Gossips } from "./Gossip/Gossips";
import { Lights } from "./Light/Lights";
import { ScriptPaths } from "./Waypoints/ScriptPaths";
import { AreaRegistry } from "./Area/Area";
import { Maps } from "./Map/Maps";
import { LoadingScreens } from "./Map/LoadingScreen";
import { GameObjectDisplays, GameObjectInstances, GameObjectTemplates } from "./GameObject/GameObjects";
import { TSImages } from "./Images/Image";
import { Professions } from "./Profession/Professions";
import { Locks, LockTypes } from "./Locks/Locks";
import { ZoneMusicRegistry } from "./Sound/ZoneMusic";
import { SoundEntryRegistry } from "./Sound/SoundEntry";
import { MailTemplateRegistry } from "./Mail/MailTemplate";
import { Compare } from "./Misc/Compare";
import { SkillTiersRegistry } from "./SkillTiers/SkillTiers";
import { GlyphRegistry } from "./Glyph/Glyph";
import { EnchantmentRegistry } from "./Enchant/Enchantment";
import { EnchantmentConditionsRegistry } from "./Enchant/EnchantmentCondition";
import { GemRegistry } from "./Gem/Gem";
import { CurrencyRegistry } from "./Currency/Currency";
import { CurrencyCategoryRegistry } from "./Currency/CurrencyCategory";
import { TaxiPathRegistry } from "./Taxi/Taxi";
import { TransportRegistry } from "./Transport/Transport";
import { ElevatorRegistry } from "./Elevators/Elevators";
import { MountRegistry } from "./PetsCollectibles/Mount";
import { CompanionRegistry } from "./PetsCollectibles/Companion";
import { WorldSafeLocRegistry } from "./WorldSafeLocs/WorldSafeLocs";
import { BattlegroundRegistry } from "./Battleground/Battleground";
import { BattlegroundPoolRegistry } from "./Battleground/BattlegroundPool";
import { WorldStateUIRegistry } from "./WorldState/WorldStateUI";
import { WorldStateRegistry } from "./WorldState/WorldState";
import { WMOAreaRegistry } from "./Area/WMOArea";
import { SoundAmbienceRegistry } from "./Sound/SoundAmbience";
import { ZoneIntroMusicRegistry } from "./Sound/ZoneIntroMusic";
import { WorldMapAreaRegistry } from "./Worldmap/WorldMapArea";
import { WorldMapOverlayRegistry } from "./Worldmap/WorldMapOverlay";
import { WorldMapTransformRegistry } from "./Worldmap/WorldMapTransform";
import { DungeonMapRegistry } from "./Worldmap/DungeonMap";
import { AreaPOIRegistry } from "./WorldState/AreaPOI";
import { WorldMapContinentRegistry } from "./Worldmap/WorldMapContinent";
import { VehicleRegistry } from "./Vehicle/Vehicle";
import { HolidayRegistry } from "./GameEvent/Holiday";
import { GameEventRegistry } from "./GameEvent/GameEvent";

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
}