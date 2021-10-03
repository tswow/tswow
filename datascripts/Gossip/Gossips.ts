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
import { SQL } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Ids } from "../Misc/Ids";
import { Gossip } from "./Gossip";

export class GossipRef<T> extends CellSystem<T> {
    protected cell: Cell<number,any>;

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }

    get() {
        return this.cell.get();
    }

    set(value: number) {
        this.cell.set(value);
        return this.owner;
    }

    getRef() {
        if(this.cell.get() <= 0) {
            let gossip = GossipRegistry.create()
            this.cell.set(gossip.ID);
            return gossip;
        } else {
            return GossipRegistry.load(this.cell.get());
        }
    }

    modRef(callback: (gossip: Gossip)=>void) {
        callback(this.getRef())
        return this.owner;
    }

    getNew() {
        let gossip = GossipRegistry.create();
        this.cell.set(gossip.ID);
        return gossip;
    }

    modNew(callback: (gossip: Gossip)=>void) {
        callback(this.getNew());
        return this.owner;
    }

    getNewStatic(mod: string, value: string) {
        let gossip = GossipRegistry.createStatic(mod,value)
        this.cell.set(gossip.ID);
        return gossip;
    }

    modNewStatic(mod: string, value: string, callback: (gossip: Gossip)=>void) {
        callback(this.getNewStatic(mod,value));
        return this.owner;
    }
}

function makeGossip(id: number) {
    const text = Ids.NPCText.id();
    const gossipRow = SQL.gossip_menu.add(id, text)
        .VerifiedBuild.set(17688)
    SQL.npc_text.add(text)
        .BroadcastTextID0.set(0)
        .BroadcastTextID1.set(0)
        .BroadcastTextID2.set(0)
        .BroadcastTextID3.set(0)
        .BroadcastTextID4.set(0)
        .BroadcastTextID5.set(0)
        .BroadcastTextID6.set(0)
        .BroadcastTextID7.set(0)
        .VerifiedBuild.set(17688)
    return new Gossip(gossipRow);
}

// needs special handling since the constructor is different
export const GossipRegistry = {
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new GossipRef(owner, cell);
    },

    ID(gossip: Gossip) {
        return gossip.ID
    },

    Exists(value: number) {
        return value > 0;
    },

    create(){
        return makeGossip(Ids.gossip_menu.dynamicId());
    },

    createStatic(mod: string, id: string) {
        return makeGossip(Ids.gossip_menu.id(mod,id));
    },

    load(id: number) {
        let value = SQL.gossip_menu.find({MenuID:id});
        return (value ? new Gossip(value) : undefined) as Gossip;
    }
}