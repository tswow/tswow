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
import { SQL } from "../../SQLFiles";
import { gossip_menuRow } from "../../sql/gossip_menu";
import { MainEntity } from "../Misc/Entity";
import { addGossipLabel } from "./GossipLabels";
import { GossipOptions } from "./GossipOption";
import { GossipTextArray } from "./GossipText";

export class Gossip extends MainEntity<gossip_menuRow> {
    addLabel(mod: string, label: string) {
        addGossipLabel(mod, label, this);
        return this;
    }

    get Text() {
        return new GossipTextArray(this, SQL.npc_text.query({ID:this.row.TextID.get()}));
    }

    get Options() : GossipOptions {
        return new GossipOptions(this);
    }

    get ID() {
        return this.row.MenuID.get();
    }

    get TextID() {
        return this.row.TextID.get();
    }
}