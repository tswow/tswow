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
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RefStatic } from "../Refs/Ref";
import { RegistryStaticNoRef } from "../Refs/Registry";

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

export class BroadcastTextRef<T> extends RefStatic<T,BroadcastText> {
    setSimple(langMale: loc_constructor, langFemale?: loc_constructor) {
        let v = new BroadcastText(
                    SQL.broadcast_text.add(Ids.BroadcastText.dynamicId())
                )
        v.MaleText.set(langMale);
        if(langFemale) {
            v.FemaleText.set(langFemale);
        }
        return this.owner;
    }
}

export class BroadcastTextRegistryClass
    extends RegistryStaticNoRef<BroadcastText,broadcast_textRow,broadcast_textQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new BroadcastTextRef(owner, cell, this);
    }
    protected Table(): Table<any, broadcast_textQuery, broadcast_textRow> & { add: (id: number) => broadcast_textRow; } {
        return SQL.broadcast_text
    }
    protected IDs(): StaticIDGenerator {
        return Ids.BroadcastText
    }

    Clear(r: BroadcastText): void {
        r.Emote1.set(0)
         .Emote2.set(0)
         .Emote3.set(0)
         .EmoteDelay1.set(0)
         .EmoteDelay2.set(0)
         .EmoteDelay3.set(0)
         .FemaleText.clear()
         .Flags.set(0)
         .MaleText.clear()
         .SoundEntry.set(0)
    }

    protected Clone(mod: string, id: string, r: BroadcastText, parent: BroadcastText): void {
        // copy over all localization
        r.MaleText.set(parent.MaleText.objectify());
        r.FemaleText.set(parent.FemaleText.objectify());
    }
    protected FindByID(id: number): broadcast_textRow {
        return SQL.broadcast_text.find({ID:id})
    }
    protected EmptyQuery(): broadcast_textQuery {
        return {}
    }
    ID(e: BroadcastText): number {
        return e.ID
    }
    protected Entity(r: broadcast_textRow): BroadcastText {
        return new BroadcastText(r);
    }
}
export const BroadcastTextRegistry = new BroadcastTextRegistryClass();