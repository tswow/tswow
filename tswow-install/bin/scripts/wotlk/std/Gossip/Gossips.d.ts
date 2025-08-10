import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Gossip } from "./Gossip";
export declare class GossipRef<T> extends CellSystem<T> {
    protected cell: Cell<number, any>;
    constructor(owner: T, cell: Cell<number, any>);
    get(): number;
    set(value: number): T;
    getRef(): Gossip;
    modRef(callback: (gossip: Gossip) => void): T;
    getNew(): Gossip;
    modNew(callback: (gossip: Gossip) => void): T;
    getNewStatic(mod: string, value: string): Gossip;
    modNewStatic(mod: string, value: string, callback: (gossip: Gossip) => void): T;
}
export declare const GossipRegistry: {
    ref<T>(owner: T, cell: Cell<number, any>): GossipRef<T>;
    ID(gossip: Gossip): number;
    Exists(value: number): boolean;
    create(): Gossip;
    createStatic(mod: string, id: string): Gossip;
    load(id: number): Gossip;
};
