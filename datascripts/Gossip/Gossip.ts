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
import { SQL } from "wotlkdata/sql/SQLFiles";
import { gossip_menuRow } from "wotlkdata/sql/types/gossip_menu";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/RefOld";
import { addGossipLabel } from "./GossipLabels";
import { GossipOptions } from "./GossipOption";
import { GossipTextArray } from "./GossipText";

export class Gossip extends MainEntity<gossip_menuRow> {
    addLabel(mod: string, label: string) {
        addGossipLabel(mod, label, this);
        return this;
    }

    get Text() {
        return new GossipTextArray(this, SQL.npc_text.find({ID:this.row.TextID.get()}));
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

export class GossipPointer<T> extends Ref<T, Gossip> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): Gossip {
        let gossipId = Ids.gossip_menu.id();
        let textId = Ids.NPCText.id();
        SQL.npc_text.add(textId);
        return new Gossip(SQL.gossip_menu.add(gossipId,textId));
    }
    protected clone(): Gossip {
        let gossipRow = SQL.gossip_menu.find({MenuID:this.cell.get()});
        let gossipId = Ids.gossip_menu.id();
        let textId = Ids.NPCText.id();
        SQL.npc_text.find({ID:gossipRow.TextID.get()})
            .clone(textId);
        return new Gossip(gossipRow.clone(gossipId,textId));
    }
    protected id(v: Gossip): number {
        return v.ID;
    }
    protected resolve(): Gossip {
        return new Gossip(SQL.gossip_menu.find({MenuID:this.cell.get()}));
    }
}