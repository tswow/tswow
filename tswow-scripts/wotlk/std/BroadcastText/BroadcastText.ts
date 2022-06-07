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
import { Cell } from "../../../data/cell/cells/Cell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { loc_constructor } from "../../../data/primitives";
import { Table } from "../../../data/table/Table";
import { BroadcastTextQuery, BroadcastTextRow } from "../../custom_dbc/BroadcastText";
import { DBC } from "../../DBCFiles";
import { DurationCell, TimeUnit } from "../Misc/DurationCell";
import { MainEntity } from "../Misc/Entity";
import { GenderedText } from "../Misc/GenderedText";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";

export function emote(row: BroadcastTextRow, index: number) {
    switch(index) {
        case 0: return row.EmoteID1;
        case 1: return row.EmoteID2;
        case 2: return row.EmoteID3;
        default: throw new Error(`Invalid emote index: ${index}`)
    }
}

export function emoteDelay(row: BroadcastTextRow, index: number) {
    switch(index) {
        case 0: return row.EmoteDelay1;
        case 1: return row.EmoteDelay2;
        case 2: return row.EmoteDelay3;
        default: throw new Error(`Invalid emote delay index: ${index}`)
    }
}

export class BroadcastTextEmote extends ArrayEntry<BroadcastText> {
    clear(): this {
        this.Emote.set(0);
        this.Delay.set(0)
        return this;
    }
    isClear(): boolean {
        return this.Emote.get() === 0;
    }

    get Emote() { return this.wrap(emote(this.container.row, this.index)); }
    get Delay() {
        return new DurationCell(
              this
            , 'MILLISECONDS'
            , false
            , emoteDelay(this.container.row, this.index)
        );
    }

    set(emote: number, delay: number, fmt: TimeUnit = 'MILLISECONDS') {
        this.Emote.set(emote)
        this.Delay.set(delay,fmt);
        return this;
    }
}

export class BroadcastTextEmotes extends ArraySystem<BroadcastTextEmote,BroadcastText> {
    get length(): number {
        return 3;
    }
    get(index: number): BroadcastTextEmote {
        return new BroadcastTextEmote(this.owner,index);
    }

    add(emote: number, delay: number, fmt: TimeUnit = 'MILLISECONDS') {
        this.addGet()
            .Emote.set(emote)
            .Delay.set(delay,fmt);
    }
}

export class BroadcastText extends MainEntity<BroadcastTextRow> {
    constructor(row: BroadcastTextRow) {
        super(row);
    }

    get ID() { return this.row.ID.get(); }

    get Text() {
        return new GenderedText(
              this
            , 'WRITE_MALE'
            , this.row.Text
            , this.row.Text1
        )
    }

    get SoundEntry() { return this.wrap(this.row.SoundEntriesID); }
    get Flags() { return this.wrap(this.row.Flags); }

    get Emotes() { return new BroadcastTextEmotes(this); }

    setGendered(
          maleText: loc_constructor
        , femaleText: loc_constructor
        , emote: number = 0
        , emoteDelay: number = 0
        , emoteFmt: TimeUnit = 'MILLISECONDS'
    ) {
        this.Text.Male.set(maleText)
        this.Text.Female.set(maleText)
        this.Emotes.add(emote,emoteDelay,emoteFmt)
        return this.owner;
    }

    set(
          text: loc_constructor
        , emote = 0
        , emoteDelay = 0
        , emoteFmt: TimeUnit = 'MILLISECONDS'
    ) {
        return this.setGendered(text,text,emote,emoteDelay,emoteFmt);
    }
}

export class BroadcastTextRef<T> extends RefStatic<T,BroadcastText> {
    setSimple(langMale: loc_constructor, langFemale?: loc_constructor) {
        let v = new BroadcastText(
                    DBC.BroadcastText.add(Ids.BroadcastText.dynamicId())
                )
        v.Text.Male.set(langMale)
        if(langFemale) {
            v.Text.Female.set(langFemale)
        }
        this.cell.set(v.ID)
        return this.owner;
    }
}

export class BroadcastTextRegistryClass
    extends RegistryStatic<BroadcastText,BroadcastTextRow,BroadcastTextQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new BroadcastTextRef(owner, cell, this);
    }
    protected Table(): Table<any, BroadcastTextQuery, BroadcastTextRow> & { add: (id: number) => BroadcastTextRow; } {
        return DBC.BroadcastText
    }
    protected IDs(): StaticIDGenerator {
        return Ids.BroadcastText
    }

    Clear(r: BroadcastText): void {
        r.Emotes.clearAll()
         .Text.clear()
         .Flags.set(0)
         .SoundEntry.set(0)
    }

    createSimple(
          maleText: loc_constructor
        , femaleText?: loc_constructor
    ) {
        let v = this.createDynamic()
            .Text.Male.set(maleText)
        if(femaleText) v.Text.Female.set(femaleText)
        return v;
    }

    createDynamic(parent: number = this.nullID()) {
        let nid = this.IDs().dynamicId()
        if(parent !== this.nullID()) {
            let parentEntity = this.Entity(this.FindByID(parent));
            let entity = this.Entity(parentEntity.row.clone(nid));
            entity.Text.Male.set(parentEntity.Text.Male.objectify());
            entity.Text.Female.set(parentEntity.Text.Female.objectify());
            return entity;
        } else {
            let entity = this.Entity(this.Table().add(nid));
            this.Clear(entity);
            return entity;
        }
    }

    protected Clone(mod: string, id: string, r: BroadcastText, parent: BroadcastText): void {
        // copy over all localization
        r.Text.Male.set(parent.Text.Male.objectify())
        r.Text.Female.set(parent.Text.Female.objectify())
    }
    protected FindByID(id: number): BroadcastTextRow {
        return DBC.BroadcastText.query({ID:id})
    }
    protected EmptyQuery(): BroadcastTextQuery {
        return {}
    }
    ID(e: BroadcastText): number {
        return e.ID
    }
    protected Entity(r: BroadcastTextRow): BroadcastText {
        return new BroadcastText(r);
    }
}
export const BroadcastTextRegistry = new BroadcastTextRegistryClass();