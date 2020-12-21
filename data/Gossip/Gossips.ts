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
import { GOCreature } from "../Base/GOorCreature";
import { Ids } from "../Base/Ids"
import { Gossip } from "./Gossip";

export const Gossips = {
    create<G,T extends GOCreature<G>>(owner?: T){
        const id = Ids.GossipMenu.id();
        const text = Ids.NPCText.id();
        const gossipRow = SQL.gossip_menu.add(id, text)
        const textRow = SQL.npc_text.add(text)
            .BroadcastTextID0.set(0)
            .BroadcastTextID1.set(0)
            .BroadcastTextID2.set(0)
            .BroadcastTextID3.set(0)
            .BroadcastTextID4.set(0)
            .BroadcastTextID5.set(0)
            .BroadcastTextID6.set(0)
            .BroadcastTextID7.set(0)
        return new Gossip<G,T>(owner as T,gossipRow,textRow);
    },

    load<G,T extends GOCreature<G>>(id: number, owner?: T) {
        const gossip = SQL.gossip_menu.find({MenuID:id});
        const text = SQL.npc_text.find({ID:gossip.TextID.get()});
        return new Gossip<G,T>(owner as T, gossip, text);
    }
}