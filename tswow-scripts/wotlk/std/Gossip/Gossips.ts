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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
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
    const text = Ids.NPCText.dynamicId();
    const gossipRow = SQL.gossip_menu.add(id, text)
        .VerifiedBuild.set(17688)
    SQL.npc_text.add(text)
        .text0_0.set('')
        .text0_1.set('')

        .text1_0.set('')
        .text1_1.set('')

        .text2_0.set('')
        .text2_1.set('')

        .text3_0.set('')
        .text3_1.set('')

        .text4_0.set('')
        .text4_1.set('')

        .text5_0.set('')
        .text5_1.set('')

        .text6_0.set('')
        .text6_1.set('')

        .text7_0.set('')
        .text7_1.set('')

        .Emote0_0.set(0)
        .Emote0_1.set(0)
        .Emote0_2.set(0)

        .Emote1_0.set(0)
        .Emote1_1.set(0)
        .Emote1_2.set(0)

        .Emote2_0.set(0)
        .Emote2_1.set(0)
        .Emote2_2.set(0)

        .Emote3_0.set(0)
        .Emote3_1.set(0)
        .Emote3_2.set(0)

        .Emote4_0.set(0)
        .Emote4_1.set(0)
        .Emote4_2.set(0)

        .Emote5_0.set(0)
        .Emote5_1.set(0)
        .Emote5_2.set(0)

        .Emote6_0.set(0)
        .Emote6_1.set(0)
        .Emote6_2.set(0)

        .Emote7_0.set(0)
        .Emote7_1.set(0)
        .Emote7_2.set(0)

        .EmoteDelay0_0.set(0)
        .EmoteDelay0_1.set(0)
        .EmoteDelay0_2.set(0)

        .EmoteDelay1_0.set(0)
        .EmoteDelay1_1.set(0)
        .EmoteDelay1_2.set(0)

        .EmoteDelay2_0.set(0)
        .EmoteDelay2_1.set(0)
        .EmoteDelay2_2.set(0)

        .EmoteDelay3_0.set(0)
        .EmoteDelay3_1.set(0)
        .EmoteDelay3_2.set(0)

        .EmoteDelay4_0.set(0)
        .EmoteDelay4_1.set(0)
        .EmoteDelay4_2.set(0)

        .EmoteDelay5_0.set(0)
        .EmoteDelay5_1.set(0)
        .EmoteDelay5_2.set(0)

        .EmoteDelay6_0.set(0)
        .EmoteDelay6_1.set(0)
        .EmoteDelay6_2.set(0)

        .Probability0.set(0)
        .Probability1.set(0)
        .Probability2.set(0)
        .Probability3.set(0)
        .Probability4.set(0)
        .Probability5.set(0)
        .Probability6.set(0)
        .Probability7.set(0)

        .lang0.set(0)
        .lang1.set(0)
        .lang2.set(0)
        .lang3.set(0)
        .lang4.set(0)
        .lang5.set(0)
        .lang6.set(0)
        .lang7.set(0)

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
        let value = SQL.gossip_menu.query({MenuID:id});
        return (value ? new Gossip(value) : undefined) as Gossip;
    }
}