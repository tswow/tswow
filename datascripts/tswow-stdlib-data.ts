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
import { Areas } from "./Area/Areas";
import { Maps } from "./Map/Maps";
import { LoadingScreens } from "./Map/LoadingScreen";
import { GameObjectDisplays, GameObjectInstances, GameObjectTemplates } from "./GameObject/GameObjects";
import { TSImages } from "./Images/Image";
import { Professions } from "./Profession/Professions";
import { Locks } from "./Locks/Locks";
import { ZoneMusicRegistry } from "./Sound/ZoneMusic";
import { SoundEntryRegistry } from "./Sound/SoundEntry";
import { MailTemplateRegistry } from "./Mail/MailTemplate";

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
    Areas: Areas,
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
    ZoneMusic: ZoneMusicRegistry,
    SoundEntries: SoundEntryRegistry,
    MailTemplates: MailTemplateRegistry
}
