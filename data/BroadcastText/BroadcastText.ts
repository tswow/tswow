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
import { Cell } from "wotlkdata/cell/Cell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";
import { broadcast_textRow } from "wotlkdata/sql/types/broadcast_text";
import { SQLLocSystem } from "../Base/SQLLocSystem";

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

export class BroadcastText<T> extends Subsystem<T> {
    readonly row;

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

    set(maleText: loc_constructor, femaleText: loc_constructor, emote: number, emoteDelay: number) {
        this.MaleText.set(maleText);
        this.FemaleText.set(femaleText);
        this.Emote1.set(emote);
        this.EmoteDelay1.set(emoteDelay);
        return this.owner;
    }

    setUnisex(text: loc_constructor, emote: number, emoteDelay: number) {
        return this.set(text,text,emote,emoteDelay);
    }
}