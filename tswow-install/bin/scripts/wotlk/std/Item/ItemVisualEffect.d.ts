import { DummyCell } from "../../../data/cell/cells/DummyCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { Table } from "../../../data/table/Table";
import { ItemVisualsQuery, ItemVisualsRow } from "../../dbc/ItemVisuals";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare function pathToEffect(effectPath: string): import("../../dbc/ItemVisualEffects").ItemVisualEffectsRow;
export declare function effectToPath(effect: number): DummyCell<"", any> | import("../../../data/dbc/DBCCell").DBCStringCell<import("../../dbc/ItemVisualEffects").ItemVisualEffectsRow>;
export declare class ItemVisuals extends MainEntity<ItemVisualsRow> {
    get ID(): number;
    get length(): number;
    set(index: number, path: string): this;
    add(path: string): this;
    get(index: number): DummyCell<"", any> | import("../../../data/dbc/DBCCell").DBCStringCell<import("../../dbc/ItemVisualEffects").ItemVisualEffectsRow>;
    clearIndex(index: number): this;
    clearAll(): this;
    protected addGet(): number;
    objectify(options?: ObjectifyOptions): any[];
}
export declare class ItemVisualsRegistryClass extends RegistryDynamic<ItemVisuals, ItemVisualsRow, ItemVisualsQuery> {
    protected Table(): Table<any, ItemVisualsQuery, ItemVisualsRow> & {
        add: (id: number) => ItemVisualsRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: ItemVisuals): void;
    protected FindByID(id: number): ItemVisualsRow;
    protected EmptyQuery(): ItemVisualsQuery;
    ID(e: ItemVisuals): number;
    protected Entity(r: ItemVisualsRow): ItemVisuals;
}
export declare const ItemVisualsRegistry: ItemVisualsRegistryClass;
