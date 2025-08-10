import { Cell } from "../../../data/cell/cells/Cell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { Table } from "../../../data/table/Table";
import { broadcast_textQuery, broadcast_textRow } from "../../sql/broadcast_text";
import { DurationCell, TimeUnit } from "../Misc/DurationCell";
import { MainEntity } from "../Misc/Entity";
import { GenderedText } from "../Misc/GenderedText";
import { StaticIDGenerator } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
export declare class BroadcastTextContent extends SQLLocSystem<BroadcastText> {
    protected isFemale: boolean;
    constructor(owner: BroadcastText, isFemale: boolean);
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare function emote(row: broadcast_textRow, index: number): import("../../../data/sql/SQLCell").SQLCell<number, broadcast_textRow>;
export declare function emoteDelay(row: broadcast_textRow, index: number): import("../../../data/sql/SQLCell").SQLCell<number, broadcast_textRow>;
export declare class BroadcastTextEmote extends ArrayEntry<BroadcastText> {
    clear(): this;
    isClear(): boolean;
    get Emote(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Delay(): DurationCell<this>;
    set(emote: number, delay: number, fmt?: TimeUnit): this;
}
export declare class BroadcastTextEmotes extends ArraySystem<BroadcastTextEmote, BroadcastText> {
    get length(): number;
    get(index: number): BroadcastTextEmote;
    add(emote: number, delay: number, fmt?: TimeUnit): void;
}
export declare class BroadcastText extends MainEntity<broadcast_textRow> {
    constructor(row: broadcast_textRow);
    get ID(): number;
    get Text(): GenderedText<this>;
    get SoundEntry(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Emotes(): BroadcastTextEmotes;
    setGendered(maleText: loc_constructor, femaleText: loc_constructor, emote?: number, emoteDelay?: number, emoteFmt?: TimeUnit): undefined;
    set(text: loc_constructor, emote?: number, emoteDelay?: number, emoteFmt?: TimeUnit): undefined;
}
export declare class BroadcastTextRef<T> extends RefStatic<T, BroadcastText> {
    setSimple(langMale: loc_constructor, langFemale?: loc_constructor): T;
}
export declare class BroadcastTextRegistryClass extends RegistryStatic<BroadcastText, broadcast_textRow, broadcast_textQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): BroadcastTextRef<T>;
    protected Table(): Table<any, broadcast_textQuery, broadcast_textRow> & {
        add: (id: number) => broadcast_textRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: BroadcastText): void;
    createSimple(maleText: loc_constructor, femaleText?: loc_constructor): BroadcastText;
    createDynamic(parent?: number): BroadcastText;
    protected Clone(mod: string, id: string, r: BroadcastText, parent: BroadcastText): void;
    protected FindByID(id: number): broadcast_textRow;
    protected EmptyQuery(): broadcast_textQuery;
    ID(e: BroadcastText): number;
    protected Entity(r: broadcast_textRow): BroadcastText;
}
export declare const BroadcastTextRegistry: BroadcastTextRegistryClass;
