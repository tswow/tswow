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
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { SmartScript } from "./SmartScript";

export class EventFlags<T> extends MaskCell32<SmartScript<T>> {
    get NonRepeatable() {return this.bit(0)};
    get NormalDungeon(){return this.bit(1)};
    get HeroicDungeon(){return this.bit(2)};
    get NormalRaid(){return this.bit(3)};
    get HeroicRaid(){return this.bit(4)};
    get DebugOnly(){return this.bit(5)};
    get DontReset(){return this.bit(6)};
    get WorksCharmed(){return this.bit(7)};
}