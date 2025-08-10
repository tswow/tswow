import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Table } from "../../../data/table/Table";
import { ItemSetQuery, ItemSetRow } from "../../dbc/ItemSet";
import { ArrayRefSystemStatic } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { SkillRequirement } from "./ItemRequirements";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemSetSpell extends ArrayEntry<ItemSet> {
    get Spell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
    get Threshold(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemSetSpells extends ArraySystem<ItemSetSpell, ItemSet> {
    get length(): number;
    get(index: number): ItemSetSpell;
    add(spell: number, threshold: number): ItemSet;
}
export declare class ItemSet extends MainEntity<ItemSetRow> {
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ID(): number;
    get Spells(): ItemSetSpells;
    get SkillRequirement(): SkillRequirement<this>;
    get Items(): ArrayRefSystemStatic<this, ItemTemplate>;
}
export declare class ItemSetRegistryClass extends RegistryStatic<ItemSet, ItemSetRow, ItemSetQuery> {
    protected Table(): Table<any, ItemSetQuery, ItemSetRow> & {
        add: (id: number) => ItemSetRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: ItemSet): void;
    protected FindByID(id: number): ItemSetRow;
    protected EmptyQuery(): ItemSetQuery;
    ID(e: ItemSet): number;
    protected Entity(r: ItemSetRow): ItemSet;
}
export declare const ItemSetRegistry: ItemSetRegistryClass;
