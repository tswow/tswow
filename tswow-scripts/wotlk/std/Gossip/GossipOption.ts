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
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { gossip_menu_optionRow } from "../../sql/gossip_menu_option";
import { BroadcastTextRegistry } from "../BroadcastText/BroadcastText";
import { Condition } from "../Conditions/Condition";
import { Gossip } from "./Gossip";
import { GossipIcon } from "./GossipIcon";
import { GossipOptionType as GossipOptionAction } from "./GossipOptionType";

export class GossipOption extends CellSystemTop {
    readonly Condition: Condition<this>;
    @Transient
    readonly row: gossip_menu_optionRow;
    constructor(row: gossip_menu_optionRow) {
        super();
        this.row = row;
        this.Condition = new Condition(this, 15, this.row.MenuID.get(),this.row.OptionID.get(),0);
    }
    get Icon() {
        return makeEnumCell(GossipIcon, this, this.row.OptionIcon);
    }
    get Action(){return new GossipOptionAction(this); }
    get POI() { return this.wrap(this.row.ActionPoiID); }
    get Gossip() { return this.wrap(this.row.ActionMenuID); }
    get Text() {
        return BroadcastTextRegistry.ref(this, this.row.OptionBroadcastTextID);
    }
}

export class GossipOptions extends MultiRowSystem<GossipOption,Gossip> {
    protected getAllRows(): GossipOption[] {
        return SQL.gossip_menu_option.queryAll({MenuID:this.owner.ID})
            .sort((a,b)=>a.OptionID.get()>b.OptionID.get() ? 1 : -1)
            .map(x=>new GossipOption(x));
    }

    protected isDeleted(value: GossipOption): boolean {
        return value.row.isDeleted();
    }

    addGet() {
        return new GossipOption(
             SQL.gossip_menu_option.add(this.owner.ID, this.length)
            .OptionType.set(1)
            .OptionNpcFlag.set(1)
            .VerifiedBuild.set(17688)
        )
    }

    addMod(callback: (option: GossipOption)=>void) {
        callback(this.addGet());
        return this.owner;
    }
}