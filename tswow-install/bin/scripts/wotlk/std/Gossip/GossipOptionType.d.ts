import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { TrainerPlain } from "../Trainer/Trainer";
import { Vendor } from "../Vendor/Vendor";
import { Gossip } from "./Gossip";
import { GossipOption } from "./GossipOption";
export declare class OptionCellBase extends CellSystem<GossipOption> {
    protected type: number;
    protected flag: number;
    constructor(owner: GossipOption, type: number, flag: number);
    is(): boolean;
    on(callback: (option: GossipOption) => void): GossipOption;
    protected _set(): GossipOption;
}
export declare class VendorCell extends OptionCellBase {
    set(): GossipOption;
    set(creatureId: number, callback?: (vendor: Vendor) => void): GossipOption;
    setNew(callback: (vendor: Vendor) => void): GossipOption;
}
export declare class TrainerCell extends OptionCellBase {
    private __set;
    setOwner(): GossipOption;
    set(trainerId: number, callback?: (trainer: TrainerPlain) => void): GossipOption;
    setNew(callback: (trainer: TrainerPlain) => void): GossipOption;
}
export declare class GossipLinkCell extends OptionCellBase {
    setLink(id: number): GossipOption;
    setNew(callback: (gossip: Gossip) => void): GossipOption;
    setNewStatic(mod: string, id: string, callback: (gossip: Gossip) => void): GossipOption;
}
export declare class OptionCellPlain extends OptionCellBase {
    set(): GossipOption;
}
export declare class GossipOptionType extends CellSystem<GossipOption> {
    protected set(value: number, npcValue: number, action?: number): GossipOption;
    protected value(type: number, flag: number): OptionCellPlain;
    get VENDOR(): VendorCell;
    get GOSSIP(): GossipLinkCell;
    get TRAINER(): TrainerCell;
    get SPIRIT_HEALER(): OptionCellPlain;
    get SPIRIT_GUIDE(): OptionCellPlain;
    get INNKEEPER(): OptionCellPlain;
    get BANKER(): OptionCellPlain;
    get PETITION(): OptionCellPlain;
    get TABARD_DESIGNER(): OptionCellPlain;
    get AUCTIONEER(): OptionCellPlain;
    get STABLE_MASTER(): OptionCellPlain;
    get UNLEARN_TALENTS(): OptionCellPlain;
    get UNLEARN_PET_TALENTS(): OptionCellPlain;
    get DUAL_SPEC(): OptionCellPlain;
    get(): number;
    objectify(options?: ObjectifyOptions): "VENDOR" | "GOSSIP" | "TRAINER" | "SPIRIT_HEALER" | "SPIRIT_GUIDE" | "INNKEEPER" | "BANKER" | "PETITION" | "TABARD_DESIGNER" | "AUCTIONEER" | "STABLE_MASTER" | "UNLEARN_TALENTS" | "UNLEARN_PET_TALENTS" | "DUAL_SPECS" | "INVALID";
}
