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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Enum } from "../Base/Enum";
import { GOCreature } from "../Base/GOorCreature";
import { GossipOption } from "./GossipOption";

export const GOSSIP_ICONS = new Enum({
    CHAT: 0,
    VENDOR: 1,
    TAXI: 2,
    TRAINER: 3,
    COGWHEEL: 4,
    COGWHEEL_2: 5,
    MONEY_BAG: 6,
    TALK_BUBBLE: 7,
    TABARD: 8,
    CROSSED_SWORDS: 9,
    YELLOW_DOT: 10
});
export type GossipIcons = keyof typeof GOSSIP_ICONS.values;

export class GossipIconCell<S,G,T extends GOCreature<G>> extends Subsystem<GossipOption<S,G,T>> {
    protected get icon() { return this.owner.row.OptionIcon; }
    get() : GossipIcons {
        return GOSSIP_ICONS.reverse<GossipIcons>(this.icon.get());
    }
    set(icon: GossipIcons) : GossipOption<S,G,T> {
        this.icon.set(GOSSIP_ICONS.get(icon));
        return this.owner;
    }
}
