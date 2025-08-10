import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { gossip_menu_optionRow } from "../../sql/gossip_menu_option";
import { Condition } from "../Conditions/Condition";
import { Gossip } from "./Gossip";
import { GossipIcon } from "./GossipIcon";
import { GossipOptionType as GossipOptionAction } from "./GossipOptionType";
export declare class GossipOption extends CellSystemTop {
    readonly Condition: Condition<this>;
    readonly row: gossip_menu_optionRow;
    constructor(row: gossip_menu_optionRow);
    get Icon(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof GossipIcon>;
    get OptionID(): number;
    get Action(): GossipOptionAction;
    get POI(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Gossip(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Text(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
}
export declare class GossipOptions extends MultiRowSystem<GossipOption, Gossip> {
    protected getAllRows(): GossipOption[];
    protected isDeleted(value: GossipOption): boolean;
    addGet(): GossipOption;
    addMod(callback: (option: GossipOption) => void): Gossip;
}
