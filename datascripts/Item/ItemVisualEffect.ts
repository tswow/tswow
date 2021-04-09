import { DBC } from "wotlkdata";
import { Ids } from "../Base/Ids";
import { DummyCell } from "wotlkdata/cell/DummyCell";
import { Cell, CellIndexWrapper } from "wotlkdata/cell/Cell";
import { pathToIcon } from "../Spell/SpellIcon";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/systems/SystemArray";

export function pathToEffect(effectPath: string) {
    effectPath = effectPath.split('/').join('\\');
    let old = DBC.ItemVisualEffects.find({Model:effectPath});
    if(old===undefined) {
        return DBC.ItemVisualEffects.add(
            Ids.ItemVisualEffects.id(),
            {Model:effectPath});
    }
}

export function effectToPath(effect: number) {
    if(effect===0) return new DummyCell(undefined,"");
    return DBC.ItemVisualEffects.findById(effect).Model;
}

export class ItemEffectCell<T> extends ArrayEntry<T> {
    clear(): T {
        this.id.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.id.get()===0;
    }
    protected id: Cell<number,any>

    constructor(owner: T, index: number, id: Cell<number,any>) {
        super(owner,index);
        this.id = id;
    }

    get(): string {
        return effectToPath(this.id.get()).get();
    }

    set(value: string): T {
        this.id.set(pathToIcon(value).ID.get());
        return this.owner;
    }
}

export class ItemEffects<T> extends SystemArray<ItemEffectCell<T>,T> {
    readonly id: Cell<number,any>

    constructor(owner: T, id: Cell<number,any>) {
        super(owner);
        this.id = id;
    }

    get length(): number {
        return 5;
    }

    get row() { 
        return DBC.ItemVisuals.findById(this.id.get());
    }

    get(index: number): ItemEffectCell<T> {
        return new ItemEffectCell(this.owner, index, 
            new CellIndexWrapper(undefined,this.row.Slot,index));
    }

    makeUnique() {
        let id = Ids.ItemVisuals.id();
        this.row.clone(id);
        this.id.set(id)
    }
}