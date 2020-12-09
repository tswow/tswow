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
import { GossipOptions } from "./GossipOption";
import { GossipTextArray } from "./GossipText";

export class Gossip<T> extends Subsystem<T> {
    readonly menuRow: gossip_menuRow;
    readonly textRow: npc_textRow;

    constructor(owner: T, menu: gossip_menuRow, text: npc_textRow) {
        super(owner);
        this.menuRow = menu;
        this.textRow = text;
    }

    get Text() : GossipTextArray<T> { 
        return new GossipTextArray(this); 
    }

    get Options() : GossipOptions<T> {
        return new GossipOptions(this);
    }

    get MenuID() {
        return this.menuRow.MenuID.get();
    }

    get TextID() {
        return this.menuRow.TextID.get();
    }
}
