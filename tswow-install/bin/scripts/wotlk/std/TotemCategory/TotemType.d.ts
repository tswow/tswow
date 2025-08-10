import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { DynamicRegistry } from "../Refs/Ref";
export declare class TotemType extends CellSystemTop {
    protected readonly _id: number;
    constructor(id: number);
    get ID(): number;
}
export declare enum TotemTypes {
    SKINNING_KNIFE_OLD = 1,
    SHAMAN_TOTME = 2,
    ENCHANTING = 3,
    MINING_PICK_OLD = 21,
    ALCHEMY = 22,
    BLACKSMITH_HAMMER_OLD = 23,
    TOOL = 24
}
export declare class TotemTypeRegistryClass implements DynamicRegistry<TotemType> {
    ref<T>(owner: T, cell: Cell<number, any>): import("../Refs/Ref").RefDynamicTT<T, TotemType, typeof TotemTypes>;
    create(): TotemType;
    ID(entity: TotemType): number;
    load(id: number): TotemType;
    Exists(num: number): boolean;
}
export declare const TotemTypeRegistry: TotemTypeRegistryClass;
