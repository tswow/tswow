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
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { GossipOption } from "./GossipOption";

export class GossipIconCell extends EnumCell<GossipOption> {
    /** Enum Value:                         0 */
    get Chat()          { return this.value(0) }
    /** Enum Value:                         1 */
    get Vendor()        { return this.value(1) }
    /** Enum Value:                         2 */
    get Taxi()          { return this.value(2) }
    /** Enum Value:                         3 */
    get Trainer()       { return this.value(3) }
    /** Enum Value:                         4 */
    get Cogwheel()      { return this.value(4) }
    /** Enum Value:                         5 */
    get Cogwheel2()     { return this.value(5) }
    /** Enum Value:                         6 */
    get MoneyBag()      { return this.value(6) }
    /** Enum Value:                         7 */
    get TalkBubble()    { return this.value(7) }
    /** Enum Value:                         8 */
    get Tabard()        { return this.value(8) }
    /** Enum Value:                         9 */
    get CrossedSwords() { return this.value(9) }
    /** Enum Value:                         10 */
    get YellowDot()     { return this.value(10) }
}