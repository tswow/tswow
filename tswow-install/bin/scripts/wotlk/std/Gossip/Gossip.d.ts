import { gossip_menuRow } from "../../sql/gossip_menu";
import { MainEntity } from "../Misc/Entity";
import { GossipOptions } from "./GossipOption";
import { GossipTextArray } from "./GossipText";
export declare class Gossip extends MainEntity<gossip_menuRow> {
    addLabel(mod: string, label: string): this;
    get Text(): GossipTextArray;
    get Options(): GossipOptions;
    get ID(): number;
    get TextID(): number;
}
