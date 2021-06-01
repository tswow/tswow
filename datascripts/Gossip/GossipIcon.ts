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
import { EnumCellWrapper } from "wotlkdata/cell/cells/EnumCell";
import { GOCreature } from "../Misc/GOorCreature";
import { GossipOption } from "./GossipOption";

export class GossipIconCell<S,G,T extends GOCreature<G>> extends EnumCellWrapper<GossipOption<S,G,T>> {
    setChat() { return this.set(0); }
    setVendor() { return this.set(1); }
    setTaxi() { return this.set(2); }
    setTrainer() { return this.set(3); }
    setCogwheel() { return this.set(4); }
    setCogwheel2() { return this.set(5); }
    setMoneyBag() { return this.set(6); }
    setTalkBubble() { return this.set(7); }
    setTabard() { return this.set(8); }
    setCrossedSwords() { return this.set(9); }
    setYellowDot() { return this.set(10); }
}