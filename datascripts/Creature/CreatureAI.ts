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
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureAI extends CellSystem<CreatureTemplate> {
    set(value: string) {
        this.owner.row.AIName.set(value);
        return this.owner;
    }

    get() {
        return this.owner.row.AIName.get();
    }

    NullAI() { return this.set("NullAI"); }
    AggressorAI() { return this.set("AggressorAI"); }
    ReactorAI() { return this.set("ReactorAI"); }
    GuardAI() { return this.set("GuardAI"); }
    PetAI() { return this.set("PetAI"); }
    TotemAI() { return this.set("TotemAI"); }
    EventAI() { return this.set("EventAI"); }
    SmartAI() { return this.set("SmartAI"); }

    objectify() { return this.get(); }
}
