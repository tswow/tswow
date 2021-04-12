import { DBC } from "wotlkdata";
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { DummyCell } from "wotlkdata/cell/DummyCell";
import { Cell, CellIndexWrapper } from "wotlkdata/cell/Cell";
import { pathToIcon } from "../Spell/SpellIcon";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/systems/SystemArray";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { ItemVisualEffectsRow } from "wotlkdata/dbc/types/ItemVisualEffects";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { ItemVisualsRow } from "wotlkdata/dbc/types/ItemVisuals";

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

export class ItemEffects<T extends BaseSystem> extends SharedRef<T,ItemVisualsRow> {
    table(): SharedRefTable<ItemVisualsRow> {
        return DBC.ItemVisuals;
    }
    ids(): AutoIdGenerator {
        return Ids.ItemVisuals;
    }
    zeroFill(): this {
        this.clearAll();
        return this;
    }
    readonly id: Cell<number,any>

    constructor(owner: T, id: Cell<number,any>) {
        super(owner,[id]);
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

    clear(index: number) {
        this.get(index).clear();
        return this.owner;
    }

    clearAll() {
        for (let i = 0; i < this.length; ++i) {
            this.clear(i);
        }
        return this.owner;
    }

    protected getFree(): ItemEffectCell<T> {
        for (let i = 0; i < this.length; ++i) {
            const cur = this.get(i);
            if (cur.isClear()) {
                // Clear non-id fields
                cur.clear();
                return cur;
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    objectify() {
        const values: any[] = [];
        for (let i = 0; i < this.length; ++i) {
            const v = this.get(i);
            if (v.isClear()) {
                values.push('<empty>')
            } else {
                values.push(v.objectify());
            }
        }
        return values;
    }
}