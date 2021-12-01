import { DBC } from "wotlkdata";
import { DummyCell } from "wotlkdata/wotlkdata/cell/cells/DummyCell";
import { ItemVisualsQuery, ItemVisualsRow } from "wotlkdata/wotlkdata/dbc/types/ItemVisuals";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export function pathToEffect(effectPath: string) {
    effectPath = effectPath.split('/').join('\\');
    let old = DBC.ItemVisualEffects.query({Model:effectPath});
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

export class ItemVisuals extends MainEntity<ItemVisualsRow> {
    get ID() { return this.row.ID.get(); }

    get length(): number {
        return 5;
    }

    set(index: number, path: string) {
        this.row.Slot.setIndex(index,pathToEffect(path).ID.get());
        return this;
    }

    add(path: string) {
        this.set(this.addGet(),path);
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

    protected addGet() {
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

export class ItemVisualsRegistryClass
    extends RegistryDynamic<ItemVisuals,ItemVisualsRow,ItemVisualsQuery>
{
    protected Table(): Table<any, ItemVisualsQuery, ItemVisualsRow> & { add: (id: number) => ItemVisualsRow; } {
        return DBC.ItemVisuals
    }
    protected ids(): DynamicIDGenerator {
        return Ids.ItemVisuals
    }
    Clear(entity: ItemVisuals): void {
        entity.clearAll();
    }
    protected FindByID(id: number): ItemVisualsRow {
        return DBC.ItemVisuals.findById(id);
    }
    protected EmptyQuery(): ItemVisualsQuery {
        return {}
    }
    ID(e: ItemVisuals): number {
        return e.ID
    }
    protected Entity(r: ItemVisualsRow): ItemVisuals {
        return new ItemVisuals(r);
    }
}

export const ItemVisualsRegistry = new ItemVisualsRegistryClass();