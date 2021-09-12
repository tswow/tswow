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
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";
import { broadcast_textRow } from "wotlkdata/sql/types/broadcast_text";
import { Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";

function getLocRow(id: number, lang: Language) {
    const row = SQL.broadcast_text_locale.find({ID: id});
    if(row!==undefined) {
        return row;
    } else {
        return SQL.broadcast_text_locale.add(id, lang);
    }
}

export class BroadcastTextContent<T> extends SQLLocSystem<T> {
    protected isFemale: boolean;
    protected text: BroadcastText<T>;

    constructor(owner: T, text: BroadcastText<T>, isFemale: boolean){
        super(owner);
        this.isFemale = isFemale;
        this.text = text;
    }

    protected getMain(): Cell<string, any> {
        return this.isFemale ?
            this.text.row.Text1 : this.text.row.Text
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return this.isFemale ?
            getLocRow(this.text.row.ID.get(),loc).Text1 :
            getLocRow(this.text.row.ID.get(),loc).Text
    }

}

export class BroadcastText<T> extends CellSystem<T> {
    readonly row: broadcast_textRow;

    constructor(owner: T, row: broadcast_textRow) {
        super(owner);
        this.row = row;
    }

    get MaleText() {
        return new BroadcastTextContent<T>(this.owner, this, false);
    }

    get FemaleText() {
        return new BroadcastTextContent<T>(this.owner, this, true);
    }

    get Emote1() { return this.wrap(this.row.EmoteID1); }
    get Emote2() { return this.wrap(this.row.EmoteID2); }
    get Emote3() { return this.wrap(this.row.EmoteID3); }

    get EmoteDelay1() { return this.wrap(this.row.EmoteDelay1); }
    get EmoteDelay2() { return this.wrap(this.row.EmoteDelay2); }
    get EmoteDelay3() { return this.wrap(this.row.EmoteDelay3); }

    get SoundEntry() { return this.wrap(this.row.SoundEntriesID); }
    get Flags() { return this.wrap(this.row.Flags); }

    setGendered(maleText: loc_constructor, femaleText: loc_constructor, emote: number, emoteDelay: number) {
        this.MaleText.set(maleText);
        this.FemaleText.set(femaleText);
        this.Emote1.set(emote);
        this.EmoteDelay1.set(emoteDelay);
        return this.owner;
    }

    set(text: loc_constructor, emote = 0, emoteDelay = 0) {
        return this.setGendered(text,text,emote,emoteDelay);
    }
}

export function getBroadcast<T>(owner: T, cell: Cell<number,any>) {
    let row: broadcast_textRow;
    if(cell.get()<=0) {
        cell.set(Ids.BroadcastText.id());
        row = SQL.broadcast_text.add(cell.get());
    } else {
        row = SQL.broadcast_text.find({ID: cell.get()});
    }

    return new BroadcastText(owner, row);
}