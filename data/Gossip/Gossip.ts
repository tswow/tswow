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
import { gossip_menuRow } from "wotlkdata/sql/types/gossip_menu";
import { npc_textRow } from "wotlkdata/sql/types/npc_text";
import { GOCreature } from "../Base/GOorCreature";
import { GossipOptions } from "./GossipOption";
import { GossipTextArray } from "./GossipText";

export class Gossip<S,G,T extends GOCreature<G>> extends Subsystem<S> {
    readonly menuRow: gossip_menuRow;
    readonly textRow: npc_textRow;
    readonly topOwner: T;

    constructor(curOwner: S, topOwner: T, menu: gossip_menuRow, text: npc_textRow) {
        super(curOwner);
        this.menuRow = menu;
        this.textRow = text;
        this.topOwner = topOwner;
    }

    get Text() : GossipTextArray<S,G,T> { 
        return new GossipTextArray(this); 
    }

    get Options() : GossipOptions<S,G,T> {
        return new GossipOptions(this);
    }

    get ID() {
        return this.menuRow.MenuID.get();
    }

    get TextID() {
        return this.menuRow.TextID.get();
    }
}
