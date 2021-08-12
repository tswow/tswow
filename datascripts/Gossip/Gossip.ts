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
import { gossip_menuRow } from "wotlkdata/sql/types/gossip_menu";
import { addGossipLabel } from "./GossipLabels";
import { GossipOptions } from "./GossipOption";
import { GossipTextArray } from "./GossipText";
import { MainEntity } from "../Misc/Entity";
import { Pointer } from "../Refs/Pointer";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Misc/Ids";

export class Gossip extends MainEntity<gossip_menuRow> {
    addLabel(mod: string, label: string) {
        addGossipLabel(mod, label, this);
        return this;
    }

    get Text() : GossipTextArray { 
        return new GossipTextArray(this); 
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

export class GossipPointer<T> extends Pointer<T, Gossip> {
    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): Gossip {
        return new Gossip(SQL.gossip_menu.add(Ids.GossipMenu.id(),Ids.NPCText.id()))
    }
    protected clone(): Gossip {
        throw new Error(`Gossip cloning is not yet implemented`);
    }
    protected id(v: Gossip): number {
        return v.ID;
    }
    protected resolve(): Gossip {
        return new Gossip(SQL.gossip_menu.find({MenuID:this.cell.get()}));
    }
}