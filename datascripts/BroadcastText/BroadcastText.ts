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
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";
import { broadcast_textQuery, broadcast_textRow } from "wotlkdata/sql/types/broadcast_text";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Ref } from "../Refs/RefOld";

function getLocRow(id: number, lang: Language) {
    const row = SQL.broadcast_text_locale.find({ID: id, locale: lang});
    if(row!==undefined) {
        return row;
    } else {
        return SQL.broadcast_text_locale.add(id, lang)
            .Text.set('')
            .Text1.set('')
    }
}

export class BroadcastTextContent extends SQLLocSystem<BroadcastText> {
    protected isFemale: boolean;

    constructor(owner: BroadcastText, isFemale: boolean){
        super(owner);
        this.isFemale = isFemale;
    }

    protected getMain(): Cell<string, any> {
        return this.isFemale ?
            this.owner.row.Text1 : this.owner.row.Text
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return this.isFemale ?
            getLocRow(this.owner.row.ID.get(),loc).Text1 :
            getLocRow(this.owner.row.ID.get(),loc).Text
    }
}

export class BroadcastText extends MainEntity<broadcast_textRow> {
    constructor(row: broadcast_textRow) {
        super(row);
    }

    get ID() { return this.row.ID.get(); }

    get MaleText() {
        return new BroadcastTextContent(this, false);
    }

    get FemaleText() {
        return new BroadcastTextContent(this, true);
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

export const BroadcastTextRegistry = {
    create(parent = 0) {
        return new BroadcastText(
            parent > 0
                ? SQL.broadcast_text
                    .find({ID:parent})
                    .clone(Ids.BroadcastText.id())
                : SQL.broadcast_text.add(Ids.BroadcastText.id())
        )
    },

    load(id: number) {
        let v = SQL.broadcast_text.find({ID:id});
        return (v ? new BroadcastText(v) : undefined) as BroadcastText;
    },

    filter(query: broadcast_textQuery) {
        return SQL.broadcast_text
            .filter(query)
            .map(x=>new BroadcastText(x))
    },

    find(query: broadcast_textQuery) {
        let v = SQL.broadcast_text.find(query)
        return (v ? new BroadcastText(v) : undefined) as BroadcastText;
    }
}

export class BroadcastTextRef<T> extends Ref<T,BroadcastText> {
    protected create(): BroadcastText {
        return BroadcastTextRegistry.create();
    }
    protected clone(): BroadcastText {
        return BroadcastTextRegistry.create(this.cell.get())
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: BroadcastText): number {
        return v.ID;
    }
    protected resolve(): BroadcastText {
        return BroadcastTextRegistry.load(this.cell.get());
    }

    setSimple(langMale: loc_constructor, langFemale?: loc_constructor) {
        let v = this.getRefCopy();
        v.MaleText.set(langMale);
        if(langFemale) {
            v.FemaleText.set(langFemale);
        }
        return this.owner;
    }
}