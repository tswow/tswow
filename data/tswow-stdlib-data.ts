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
import { Creatures } from "./Creature/Creatures";
import { Trainers } from "./Creature/Trainer";
import { Items } from "./Item/Item";
import { Languages } from "./Languages/Languages";
import { Loot } from "./Loot/Loot";
import { Quests } from "./Quest/Quests";
import { ClassSkills } from "./Skills/ClassSkill";
import { Spells } from "./Spell/Spell";
import { Titles } from "./Title/Titles";
import { UI } from "./UI/UI";

export const std = {
    Spells : Spells,
    Languages : Languages,
    Quests : Quests,
    Titles: Titles,
    Achievements: Achievements,
    Loot: Loot,
    Items: Items,
    Creatures: Creatures,
    Classes: Classes,
    UI: UI,
    ClassSkills: ClassSkills,
    Trainers: Trainers
}