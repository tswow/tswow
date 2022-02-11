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
import { creature_templateRow } from "wotlkdata/wotlkdata/sql/types/creature_template";
import { ChildEntity } from "../Misc/Entity";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureStats extends ChildEntity<creature_templateRow,CreatureTemplate> {
    get HealthMod() { return this.ownerWrap(this.row.HealthModifier); }
    get ManaMod() { return this.ownerWrap(this.row.ManaModifier); }
    get ArmorMod() { return this.ownerWrap(this.row.ArmorModifier); }
    get DamageMod() { return this.ownerWrap(this.row.DamageModifier); }
    get ExperienceMod() { return this.ownerWrap(this.row.ExperienceModifier); }

    set(health: number, mana: number, armor: number, damage: number, experience: number) {
        this.HealthMod.set(health);
        this.ManaMod.set(mana);
        this.ArmorMod.set(armor);
        this.DamageMod.set(damage);
        this.ExperienceMod.set(experience);
        return this.owner;
    }
}