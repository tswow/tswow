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
import { loc_constructor } from "wotlkdata/primitives";
import { gossip_menu_optionRow } from "wotlkdata/sql/types/gossip_menu_option";
import { Ids } from "../Base/Ids";
import { BroadcastText } from "../BroadcastText/BroadcastText";
import { Condition } from "../Conditions/Condition";
import { Gossip } from "./Gossip";
import { GossipIconCell, GossipIcons } from "./GossipIcon";
import { GossipOptionType } from "./GossipOptionType";
import { Gossips } from "./Gossips";

export class GossipOption<T> extends Subsystem<Gossip<T>> {
    readonly Condition = new Condition(this,0,0,0,0,0);
    readonly row: gossip_menu_optionRow;

    constructor(owner: Gossip<T>, row: gossip_menu_optionRow) {
        super(owner);
        this.row = row;
    }

    get Icon(){return new GossipIconCell<T>(this); }
    get Type(){return new GossipOptionType<T>(this); }
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

export class GossipOptions<T> extends Subsystem<Gossip<T>> {
    get length() {
        return SQL.gossip_menu_option
            .filter({MenuID:this.owner.MenuID}).length;
    }

    getIndex(index: number) : GossipOption<T> {
        return new GossipOption(this.owner, SQL.gossip_menu_option
            .find({MenuID: this.owner.MenuID, OptionID: index}));
    }

    forEach(callback: (option: GossipOption<T>)=>any) {
        SQL.gossip_menu_option.filter({MenuID: this.owner.MenuID})
            .forEach(x=>callback(new GossipOption(this.owner, x)));
    }

    add() {
        let id = this.length+1;
        return new GossipOption(this.owner, 
            SQL.gossip_menu_option.add(this.owner.MenuID, id))
    }

    addSubmenu(icon: GossipIcons, optionText: loc_constructor) {
        const opt = this.add();
        const gossip = Gossips.create(this.owner);
        opt.Text.MaleText.set(optionText);
        opt.Icon.set(icon);
        opt.Type.setGossip();
        opt.MenuID.set(gossip.MenuID);
        return gossip;
    }
}
