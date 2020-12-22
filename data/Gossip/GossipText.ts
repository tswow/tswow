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
import { Cell } from "wotlkdata/cell/Cell";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { WrappedLoc } from "wotlkdata/cell/WrappedLoc";
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { GOCreature } from "../Base/GOorCreature";
import { Ids } from "../Base/Ids";
import { SQLLocSystem } from "../Base/SQLLocSystem";
import { Gossip } from "./Gossip";

function getNpcText(id: number) {
    let text = SQL.npc_text.find({ID: id});
    if(text===undefined) {
        text = SQL.npc_text.add(Ids.NPCText.id())
            .BroadcastTextID0.set(0)
            .BroadcastTextID1.set(0)
            .BroadcastTextID2.set(0)
            .BroadcastTextID3.set(0)
            .BroadcastTextID4.set(0)
            .BroadcastTextID5.set(0)
            .BroadcastTextID6.set(0)
            .BroadcastTextID7.set(0)
    }
    return text;
}

function getNpcLocaleText(id: number, loc: Language) {
    let text = SQL.npc_text_locale.find({ID: id, Locale: loc});
    if(text===undefined) {
        text = SQL.npc_text_locale.add(Ids.NPCText.id(), loc);
    }
    return text;
}

function maleText(id: number, index: number, loc?: Language) {
    if(!loc) {
        const text = getNpcText(id);
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
        const text = getNpcLocaleText(id, loc);
        switch(index) {
            case 0: return text.Text0_0;
            case 1: return text.Text1_0;
            case 2: return text.Text2_0;
            case 3: return text.Text3_0;
            case 4: return text.Text4_0;
            case 5: return text.Text5_0;
            case 6: return text.Text6_0;
            case 7: return text.Text7_0;
            default: throw new Error(`Internal error: Invalid maleText index: (${index} (max is 7)`)
        }
    }
}

function femaleText(id: number, index: number, loc?: Language) {
    if(!loc) {
        const text = getNpcText(id);
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
        const text = getNpcLocaleText(id, loc);
        switch(index) {
            case 0: return text.Text0_1;
            case 1: return text.Text1_1;
            case 2: return text.Text2_1;
            case 3: return text.Text3_1;
            case 4: return text.Text4_1;
            case 5: return text.Text5_1;
            case 6: return text.Text6_1;
            case 7: return text.Text7_1;
            default: throw new Error(`Internal error: Invalid femaleText index: (${index} (max is 7)`)
        }
    }
}

function lang(id: number, index: number) {
    const text = getNpcText(id);
    switch(index) {
        case 0: return text.lang0;
        case 1: return text.lang1;
        case 2: return text.lang2;
        case 3: return text.lang3;
        case 4: return text.lang4;
        case 5: return text.lang5;
        case 6: return text.lang6;
        case 7: return text.lang7;
        default: throw new Error(`Internal error: Invalid femaleText index: ${index} (max is 7)`)
    }
}

function probability(id: number, index: number) {
    const text = getNpcText(id);
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

function emote(id: number, index: number) {
    const text = getNpcText(id);
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

function emoteDelay(id: number, index: number) {
    const text = getNpcText(id);
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

export class GossipText<S,G,T extends GOCreature<G>> extends SQLLocSystem<GossipTextEntry<S,G,T>> {
    protected index: number;
    protected isFemale: boolean;
    protected id: number;
    constructor(owner: GossipTextEntry<S,G,T>, id: number, index: number, isFemale: boolean) {
        super(owner);
        this.index = index;
        this.isFemale = isFemale;
        this.id = id;
    }

    protected getMain(): Cell<string, any> {
        return this.isFemale ? femaleText(this.id, this.index) : maleText(this.id, this.index);
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return this.isFemale ? femaleText(this.id, this.index, loc) : maleText(this.id, this.index, loc);
    }
}

export class GossipTextEntry<S,G,T extends GOCreature<G>> extends ArrayEntry<Gossip<S,G,T>> {
    clear(): Gossip<S,G,T> {
        this.Probability.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.Probability.get() === 0;
    }

    protected get ID() { return this.owner.menuRow.TextID.get(); }

    get MaleText() : WrappedLoc<this> { return this.wrapLoc(new GossipText(this, this.ID, this.index, false)); }
    get FemaleText() : WrappedLoc<this> { return this.wrapLoc(new GossipText(this, this.ID, this.index, true)); }

    get Lang() { return this.wrap(lang(this.ID, this.index)); }
    get Probability() { return this.wrap(probability(this.ID, this.index)); }
    get Emote() { return this.wrap(emote(this.ID, this.index)); }
    get EmoteDelay() { return this.wrap(emoteDelay(this.ID, this.index)); }
}

export class GossipTextArray<S,G,T extends GOCreature<G>> extends SystemArray<GossipTextEntry<S,G,T>,Gossip<S,G,T>> {
    get length(): number {
        return 8;
    }

    get(index: number): GossipTextEntry<S,G,T> {
        return new GossipTextEntry(this.owner, index);
    }

    addGendered(male: loc_constructor, female: loc_constructor, lang: number, emote = 0, emoteDelay = 0) {
        const entry = this.getFree();
        entry.MaleText.set(male);
        entry.FemaleText.set(female);
        entry.Lang.set(lang);
        entry.Emote.set(emote);
        entry.EmoteDelay.set(emoteDelay);
        entry.Probability.set(1);
        return this.owner;
    }

    add(text: loc_constructor, lang = 0, emote = 0,  emoteDelay = 0) {
        return this.addGendered(text,text,lang,emote,emoteDelay);
    }
}
