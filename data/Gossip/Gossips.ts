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
import { Ids } from "../Base/Ids"
import { Gossip } from "./Gossip";

export const Gossips = {
    create<T>(owner?: T){
        const id = Ids.GossipMenu.id();
        const text = Ids.NPCText.id();
        const gossipRow = SQL.gossip_menu.add(id, text)
        const textRow = SQL.npc_text.add(text);
        return new Gossip<T>(owner as T,gossipRow,textRow);
    }
}
