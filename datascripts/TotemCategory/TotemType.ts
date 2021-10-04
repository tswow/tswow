import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { Ids } from "../Misc/Ids";
import { DynamicRegistry, RefDynamic } from "../Refs/Ref";

export class TotemType extends CellSystemTop {
    protected readonly _id: number
    constructor(id: number) {
        super();
        this._id = id;
    }

    get ID() { return this._id; }
}

export const BUILTIN_TOTEM_TYPES = {
      SKINNING_KNIFE_OLD : 1
    , SHAMAN_TOTME: 2
    , ENCHANTING: 3
    , MINING_PICK_OLD: 21
    , ALCHEMY: 22
    , BLACKSMITH_HAMMER_OLD: 23
    , TOOL: 24
} as const;

export type BuiltinTotemType = keyof typeof BUILTIN_TOTEM_TYPES | number

export function resolveBuiltinTotemType(type: BuiltinTotemType) {
    return typeof(type) === 'number' ? type : BUILTIN_TOTEM_TYPES[type]
}

export class TotemTypeRef<T> extends RefDynamic<TotemType,T> {
    set(type: BuiltinTotemType) {
        return super.set(resolveBuiltinTotemType(type));
    }
}

export class TotemTypeRegistryClass implements DynamicRegistry<TotemType> {
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefDynamic(owner, cell, this);
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