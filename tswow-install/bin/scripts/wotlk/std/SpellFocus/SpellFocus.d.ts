import { Table } from "../../../data/table/Table";
import { SpellFocusObjectQuery, SpellFocusObjectRow } from "../../dbc/SpellFocusObject";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellFocus extends MainEntity<SpellFocusObjectRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
}
export declare class SpellFocusRegistryClass extends RegistryDynamic<SpellFocus, SpellFocusObjectRow, SpellFocusObjectQuery> {
    protected Table(): Table<any, SpellFocusObjectQuery, SpellFocusObjectRow> & {
        add: (id: number) => SpellFocusObjectRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellFocus): void;
    protected FindByID(id: number): SpellFocusObjectRow;
    ID(e: SpellFocus): number;
    protected EmptyQuery(): SpellFocusObjectQuery;
    protected Entity(r: SpellFocusObjectRow): SpellFocus;
}
export declare const SpellFocusRegistry: SpellFocusRegistryClass;
