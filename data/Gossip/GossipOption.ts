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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { gossip_menu_optionRow } from "wotlkdata/sql/types/gossip_menu_option";
import { GOCreature } from "../Base/GOorCreature";
import { Ids } from "../Base/Ids";
import { BroadcastText } from "../BroadcastText/BroadcastText";
import { Condition } from "../Conditions/Condition";
import { Gossip } from "./Gossip";
import { GossipIconCell } from "./GossipIcon";
import { GossipOptionType as GossipOptionAction } from "./GossipOptionType";

export class GossipOption<G,T extends GOCreature<G>> extends Subsystem<Gossip<G,T>> {
    readonly Condition: Condition<this>;
    //readonly Condition = new Condition(this,15,this.up().ID,this.row.OptionID.get(),0,0);
    readonly row: gossip_menu_optionRow;

    constructor(owner: Gossip<G,T>, row: gossip_menu_optionRow) {
        super(owner);
        this.row = row;
        this.Condition = new Condition(this, 15, this.up().ID,this.row.OptionID.get(),0);
    }

    get Icon(){return new GossipIconCell<G,T>(this); }
    get Action(){return new GossipOptionAction<G,T>(this); }
    get POI() { return this.wrap(this.row.ActionPoiID); }
    get MenuID() { return this.wrap(this.row.ActionMenuID); }
        
    get Text(){
        const id = this.row.OptionBroadcastTextID;
        if(id.get()>0) {
            return new BroadcastText(this,
                SQL.broadcast_text.find({ID:id.get()}));
        } else {
            id.set(Ids.BroadcastText.id());
            return new BroadcastText(this,
                SQL.broadcast_text.add(id.get()))
        }
    }
}

export class GossipOptions<G,T extends GOCreature<G>> extends Subsystem<Gossip<G,T>> {
    get length() {
        return SQL.gossip_menu_option
            .filter({MenuID:this.owner.ID}).length;
    }

    getIndex(index: number) : GossipOption<G,T> {
        return new GossipOption(this.owner, SQL.gossip_menu_option
            .find({MenuID: this.owner.ID, OptionID: index}));
    }

    forEach(callback: (option: GossipOption<G,T>)=>any) {
        SQL.gossip_menu_option.filter({MenuID: this.owner.ID})
            .forEach(x=>callback(new GossipOption(this.owner, x)));
    }

    add() : GossipOption<G,T> {
        return new GossipOption(this.owner, 
            SQL.gossip_menu_option.add(this.owner.ID, this.length)
                .OptionType.set(1)
                .OptionNpcFlag.set(1)
            )
    }
}
