import { Cell } from "../../../data/cell/cells/Cell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { npc_textRow } from "../../sql/npc_text";
import { GenderedText } from "../Misc/GenderedText";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Gossip } from "./Gossip";
export declare class GossipText<T> extends SQLLocSystem<T> {
    protected index: number;
    protected isFemale: boolean;
    protected row: npc_textRow;
    constructor(owner: T, row: npc_textRow, index: number, isFemale: boolean);
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class GossipTextEntry<T> extends ArrayEntry<T> {
    protected row: npc_textRow;
    constructor(gossip: T, row: npc_textRow, index: number);
    clear(): this;
    isClear(): boolean;
    get Text(): GenderedText<this>;
    get Lang(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Probability(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Emote(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EmoteDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    protected get Broadcast(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class GossipTextArray extends ArraySystem<GossipTextEntry<Gossip>, Gossip> {
    readonly row: npc_textRow;
    constructor(gossip: Gossip, row: npc_textRow);
    get length(): number;
    get(index: number): GossipTextEntry<Gossip>;
    addGendered(male: loc_constructor, female: loc_constructor, lang: number, emote?: number, emoteDelay?: number): Gossip;
    add(text: loc_constructor, lang?: number, emote?: number, emoteDelay?: number): Gossip;
    get ID(): number;
}
export declare class NPCText extends ArraySystem<GossipTextEntry<NPCText>, NPCText> {
    readonly row: npc_textRow;
    constructor(row: npc_textRow);
    get length(): number;
    get(index: number): GossipTextEntry<NPCText>;
    addGendered(male: loc_constructor, female: loc_constructor, lang: number, emote?: number, emoteDelay?: number): NPCText;
    add(text: loc_constructor, lang?: number, emote?: number, emoteDelay?: number): NPCText;
    get ID(): number;
}
