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
import { Transient } from "../../../data/cell/serialization/Transient";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { SQL } from "../../SQLFiles";
import { npc_textRow } from "../../sql/npc_text";
import { GenderedText } from "../Misc/GenderedText";
import { Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Gossip } from "./Gossip";

function getNpcLocaleText(id: number, loc: Language) {
    let text = SQL.npc_text_locale.query({ID: id, Locale: loc});
    if(text===undefined) {
        text = SQL.npc_text_locale.add(Ids.NPCText.dynamicId(), loc)
            .Text0_0.set(null as any)
            .Text0_1.set(null as any)

            .Text1_0.set(null as any)
            .Text1_1.set(null as any)

            .Text2_0.set(null as any)
            .Text2_1.set(null as any)

            .Text3_0.set(null as any)
            .Text3_1.set(null as any)

            .Text4_0.set(null as any)
            .Text4_1.set(null as any)

            .Text5_0.set(null as any)
            .Text5_1.set(null as any)

            .Text6_0.set(null as any)
            .Text6_1.set(null as any)

            .Text7_0.set(null as any)
            .Text7_1.set(null as any)
    }
    return text;
}

function maleText(text: npc_textRow, index: number, loc?: Language) {
    if(!loc) {
        switch(index) {
            case 0: return text.text0_0;
            case 1: return text.text1_0;
            case 2: return text.text2_0;
            case 3: return text.text3_0;
            case 4: return text.text4_0;
            case 5: return text.text5_0;
            case 6: return text.text6_0;
            case 7: return text.text7_0;
            default: throw new Error(`Internal error: Invalid maleText index: ${index} (max is 7)`)
        }
    } else {
        const locText = getNpcLocaleText(text.ID.get(), loc);
        switch(index) {
            case 0: return locText.Text0_0;
            case 1: return locText.Text1_0;
            case 2: return locText.Text2_0;
            case 3: return locText.Text3_0;
            case 4: return locText.Text4_0;
            case 5: return locText.Text5_0;
            case 6: return locText.Text6_0;
            case 7: return locText.Text7_0;
            default: throw new Error(`Internal error: Invalid maleText index: (${index} (max is 7)`)
        }
    }
}

function femaleText(text: npc_textRow, index: number, loc?: Language) {
    if(!loc) {
        switch(index) {
            case 0: return text.text0_1;
            case 1: return text.text1_1;
            case 2: return text.text2_1;
            case 3: return text.text3_1;
            case 4: return text.text4_1;
            case 5: return text.text5_1;
            case 6: return text.text6_1;
            case 7: return text.text7_1;
            default: throw new Error(`Internal error: Invalid femaleText index: ${index} (max is 7)`)
        }
    } else {
        const locText = getNpcLocaleText(text.ID.get(), loc);
        switch(index) {
            case 0: return locText.Text0_1;
            case 1: return locText.Text1_1;
            case 2: return locText.Text2_1;
            case 3: return locText.Text3_1;
            case 4: return locText.Text4_1;
            case 5: return locText.Text5_1;
            case 6: return locText.Text6_1;
            case 7: return locText.Text7_1;
            default: throw new Error(`Internal error: Invalid femaleText index: (${index} (max is 7)`)
        }
    }
}

function lang(text: npc_textRow, index: number) {
    switch(index) {
        case 0: return text.lang0;
        case 1: return text.lang1;
        case 2: return text.lang2;
        case 3: return text.lang3;
        case 4: return text.lang4;
        case 5: return text.lang5;
        case 6: return text.lang6;
        case 7: return text.lang7;
        default: throw new Error(`Internal error: Invalid lang index: ${index} (max is 7)`)
    }
}

function probability(text: npc_textRow, index: number) {
    switch(index) {
        case 0: return text.Probability0;
        case 1: return text.Probability1;
        case 2: return text.Probability2;
        case 3: return text.Probability3;
        case 4: return text.Probability4;
        case 5: return text.Probability5;
        case 6: return text.Probability6;
        case 7: return text.Probability7;
        default: throw new Error(`Internal error: Invalid probability index: ${index} (max is 7)`)
    }
}

function broadcastID(text: npc_textRow, index: number) {
    switch(index) {
        case 0: return text.BroadcastTextID0;
        case 1: return text.BroadcastTextID1;
        case 2: return text.BroadcastTextID2;
        case 3: return text.BroadcastTextID3;
        case 4: return text.BroadcastTextID4;
        case 5: return text.BroadcastTextID5;
        case 6: return text.BroadcastTextID6;
        case 7: return text.BroadcastTextID7;
        default: throw new Error(`Internal error: Invalid emote index: ${index} (max is 7)`)
    }
}

function emote(text: npc_textRow, index: number) {
    switch(index) {
        case 0: return text.Emote0_0;
        case 1: return text.Emote1_0;
        case 2: return text.Emote2_0;
        case 3: return text.Emote3_0;
        case 4: return text.Emote4_0;
        case 5: return text.Emote5_0;
        case 6: return text.Emote6_0;
        case 7: return text.Emote7_0;
        default: throw new Error(`Internal error: Invalid emote index: ${index} (max is 7)`)
    }
}

function emoteDelay(text: npc_textRow, index: number) {
    switch(index) {
        case 0: return text.EmoteDelay0_0;
        case 1: return text.EmoteDelay1_0;
        case 2: return text.EmoteDelay2_0;
        case 3: return text.EmoteDelay3_0;
        case 4: return text.EmoteDelay4_0;
        case 5: return text.EmoteDelay5_0;
        case 6: return text.EmoteDelay6_0;
        case 7: return text.EmoteDelay7_0;
        default: throw new Error(`Internal error: Invalid emoteDelay index: ${index} (max is 7)`)
    }
}

export class GossipText<T> extends SQLLocSystem<T> {
    protected index: number;
    protected isFemale: boolean;
    protected row: npc_textRow
    constructor(owner: T, row: npc_textRow, index: number, isFemale: boolean) {
        super(owner);
        this.index = index;
        this.isFemale = isFemale;
        this.row = row;
    }

    protected getMain(): Cell<string, any> {
        return this.isFemale ? femaleText(this.row, this.index) : maleText(this.row, this.index);
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return this.isFemale ? femaleText(this.row, this.index, loc) : maleText(this.row, this.index, loc);
    }
}

export class GossipTextEntry<T> extends ArrayEntry<T> {
    protected row: npc_textRow

    constructor(gossip: T, row: npc_textRow, index: number) {
        super(gossip,index);
        this.row = row;
    }

    clear() {
        this.Probability.set(0);
        this.Text.clear();
        this.Emote.set(0);
        this.EmoteDelay.set(0);
        this.Probability.set(0);
        this.Broadcast.set(0);
        return this;
    }
    isClear(): boolean {
        return this.Probability.get() === 0;
    }

    get Text() {
        return new GenderedText(
              this
            , 'WRITE_MALE'
            , this.wrapLoc(new GossipText(this, this.row, this.index, false))
            , this.wrapLoc(new GossipText(this, this.row, this.index, true))
        )
    }
    get Lang() { return this.wrap(lang(this.row, this.index)); }
    get Probability() { return this.wrap(probability(this.row, this.index)); }
    get Emote() { return this.wrap(emote(this.row, this.index)); }
    get EmoteDelay() { return this.wrap(emoteDelay(this.row, this.index)); }

    @Transient
    protected get Broadcast() { return this.wrap(broadcastID(this.row, this.index))}
}

export class GossipTextArray extends ArraySystem<GossipTextEntry<Gossip>, Gossip> {
    readonly row: npc_textRow;

    constructor(gossip: Gossip, row: npc_textRow) {
        super(gossip);
        this.row = row;
    }

    get length(): number {
        return 8;
    }

    get(index: number): GossipTextEntry<Gossip> {
        return new GossipTextEntry(this.owner, this.row, index);
    }

    addGendered(male: loc_constructor, female: loc_constructor, lang: number, emote = 0, emoteDelay = 0) {
        this.addGet()
            .Text.Male.set(male)
            .Text.Female.set(female)
            .Lang.set(lang)
            .Emote.set(emote)
            .EmoteDelay.set(emoteDelay)
            .Probability.set(1)
        return this.owner;
    }

    add(text: loc_constructor, lang = 0, emote = 0,  emoteDelay = 0) {
        return this.addGendered(text,text,lang,emote,emoteDelay);
    }

    get ID() {
        return this.row.ID.get();
    }
}

export class NPCText extends ArraySystem<
    GossipTextEntry<NPCText>,NPCText>
{
    readonly row: npc_textRow;

    constructor(row: npc_textRow) {
        // hack: set owner to self for correct return value
        super(undefined as any);
        this.owner = this;
        this.row = row;
    }

    get length(): number {
        return 8;
    }
    get(index: number): GossipTextEntry<NPCText> {
        return new GossipTextEntry(this, this.row, index);
    }

    addGendered(male: loc_constructor, female: loc_constructor, lang: number, emote = 0, emoteDelay = 0) {
        this.addGet()
            .Text.Male.set(male)
            .Text.Female.set(female)
            .Lang.set(lang)
            .Emote.set(emote)
            .EmoteDelay.set(emoteDelay)
            .Probability.set(1)
        return this.owner;
    }

    add(text: loc_constructor, lang = 0, emote = 0,  emoteDelay = 0) {
        return this.addGendered(text,text,lang,emote,emoteDelay);
    }

    get ID() {
        return this.row.ID.get();
    }
}