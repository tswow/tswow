import { DBC } from "wotlkdata";
import { DummyCell } from "wotlkdata/cell/cells/DummyCell";
import { ItemVisualsRow } from "wotlkdata/dbc/types/ItemVisuals";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export function pathToEffect(effectPath: string) {
    effectPath = effectPath.split('/').join('\\');
    let old = DBC.ItemVisualEffects.find({Model:effectPath});
    if(old===undefined) {
        return DBC.ItemVisualEffects.add(
            Ids.ItemVisualEffects.id(),
            {Model:effectPath});
    } else {
        return old;
    }
}

export function effectToPath(effect: number) {
    if(effect===0) return new DummyCell(undefined,"");
    return DBC.ItemVisualEffects.findById(effect).Model;
}

// TODO: This should be called "ItemVisuals", not "ItemEffects"
export class ItemEffects extends MainEntity<ItemVisualsRow> {
    get length(): number {
        return 5;
    }

    set(index: number, path: string) {
        this.row.Slot.setIndex(index,pathToEffect(path).ID.get());
        return this;
    }

    add(path: string) {
        this.set(this.getFree(),path);
        return this;
    }

    get(index: number) {
        return effectToPath(this.row.Slot.getIndex(index));
    }

    clearIndex(index: number) {
        this.row.Slot.setIndex(index,0);
        return this;
    }

    clearAll() {
        for (let i = 0; i < this.length; ++i) {
            this.clearIndex(i);
        }
        return this;
    }

    protected getFree() {
        for (let i = 0; i < this.length; ++i) {
            const cur = this.row.Slot.getIndex(i);
            if(cur == 0) {
                return i;
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    objectify() {
        const values: any[] = [];
        for (let i = 0; i < this.length; ++i) {
            if(this.row.Slot.getIndex(i) == 0) {
                values.push('<empty>')
            } else {
                values.push(this.get(i));
            }
        }
        return values;
    }
}

export class ItemEffectsPointer<T> extends Ref<T,ItemEffects> {
    exists(): boolean {
        return this.cell.get() == 0;
    }
    protected create(): ItemEffects {
        return new ItemEffects(DBC.ItemVisuals.add(Ids.ItemVisuals.id()))
    }
    protected clone(): ItemEffects {
        return new ItemEffects(this.resolve().row.clone(Ids.ItemVisuals.id()));
    }
    protected id(v: ItemEffects): number {
        return v.row.ID.get()
    }
    protected resolve(): ItemEffects {
        return new ItemEffects(DBC.ItemVisuals.findById(this.cell.get()));
    }
}