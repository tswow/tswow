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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { gossip_menuRow } from "wotlkdata/sql/types/gossip_menu";
import { npc_textRow } from "wotlkdata/sql/types/npc_text";
import { addGossipLabel } from "./GossipLabels";
import { GossipOptions } from "./GossipOption";
import { GossipTextArray } from "./GossipText";
import { Cell } from "wotlkdata/cell/Cell";
import { Transient } from "wotlkdata/cell/Transient";
import { SQL } from "wotlkdata";
import { GOCreature } from "../Base/GOorCreature";
import { Ids } from "../Base/Ids";

export class Gossip<S,G,T extends GOCreature<G>> extends Subsystem<S> {
    @Transient
    protected _menuRow: gossip_menuRow|undefined;
    @Transient
    protected _textRow: npc_textRow|undefined;
    @Transient
    readonly topOwner: T;
    @Transient
    protected cell: Cell<number,any>;

    @Transient
    get textRow() {
        // this ensures the text row is created
        let menuTextId = this.menuRow.TextID.get();
        if(menuTextId !== this._textRow?.ID.get()) {
            this._textRow = SQL.npc_text.find({ID:menuTextId})
        }
        return this._textRow as npc_textRow;
    }

    @Transient
    get menuRow() {
        if(this.cell.get() === 0) {
            this.createFromNull()
        } else if (this._menuRow === undefined || this.cell.get() != this._menuRow.MenuID.get()) {
            this._menuRow = SQL.gossip_menu.find({MenuID:this.cell.get()});
            this._textRow = SQL.npc_text.find({ID:this._menuRow.TextID.get()});
            this.cell.set(this._menuRow.MenuID.get());
        }

        return this._menuRow as gossip_menuRow;
    }

    protected createFromNull() {
        this._menuRow = SQL.gossip_menu.add(Ids.GossipMenu.id(),Ids.NPCText.id());
        this._textRow = SQL.npc_text.add(this._menuRow.TextID.get());
        this.cell.set(this._menuRow.MenuID.get());
        this.Text.clearAll();
    }

    constructor(curOwner: S, topOwner: T, cell: Cell<number,any>) {
        super(curOwner);
        this.topOwner = topOwner;
        this.cell = cell;
    }

    addLabel(mod: string, label: string) {
        addGossipLabel(mod, label, this);
        return this;
    }

    setID(id: number) {
        this.cell.set(id);
        return this.owner;
    }

    get Text() : GossipTextArray<S,G,T> { 
        return new GossipTextArray(this); 
    }

    get Options() : GossipOptions<S,G,T> {
        return new GossipOptions(this);
    }

    get ID() {
        return this.menuRow.MenuID.get();
    }

    get TextID() {
        return this.menuRow.TextID.get();
    }
}
