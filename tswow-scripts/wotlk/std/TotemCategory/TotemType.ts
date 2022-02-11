import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { Ids } from "../Misc/Ids";
import { DynamicRegistry, makeRefDynamic } from "../Refs/Ref";

export class TotemType extends CellSystemTop {
    protected readonly _id: number
    constructor(id: number) {
        super();
        this._id = id;
    }

    get ID() { return this._id; }
}

export enum TotemTypes {
      SKINNING_KNIFE_OLD = 1
    , SHAMAN_TOTME = 2
    , ENCHANTING = 3
    , MINING_PICK_OLD = 21
    , ALCHEMY = 22
    , BLACKSMITH_HAMMER_OLD = 23
    , TOOL = 24
}

export class TotemTypeRegistryClass implements DynamicRegistry<TotemType> {
    ref<T>(owner: T, cell: Cell<number,any>) {
        return makeRefDynamic(TotemTypes,owner,cell,this);
    }

    create(): TotemType {
        return new TotemType(Ids.TotemType.id())
    }
    ID(entity: TotemType): number {
        return entity.ID
    }
    load(id: number): TotemType {
        return new TotemType(id);
    }
    Exists(num: number): boolean {
        return num > 0;
    }
}

export const TotemTypeRegistry = new TotemTypeRegistryClass();