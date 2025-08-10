import { Cell } from "../../../data/cell/cells/Cell";
import { EnumCell } from "../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { SpellItemEnchantmentConditionQuery, SpellItemEnchantmentConditionRow } from "../../dbc/SpellItemEnchantmentCondition";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare enum ConditionComparator {
    LESSER_THAN = 2,
    GREATER_THAN = 3,
    GREATER_THAN_OR_EQ = 5
}
export declare class Operand extends CellSystem<EnchantmentCondition> {
    readonly Type: Cell<number, EnchantmentCondition>;
    readonly Value: Cell<number, EnchantmentCondition>;
    constructor(owner: EnchantmentCondition, type: Cell<number, EnchantmentCondition>, value: Cell<number, EnchantmentCondition>);
    set(type: number, value: number): EnchantmentCondition;
}
export declare class ConditionLogic extends EnumCell<EnchantmentCondition> {
}
export declare class EnchantmentCondition extends ArrayEntry<EnchantmentConditions> {
    static container(condition: EnchantmentCondition): EnchantmentConditions;
    get Comparator(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ConditionComparator>;
    get Left(): Operand;
    get Right(): Operand;
    get Logic(): ConditionLogic;
    clear(): this;
    isClear(): boolean;
}
export declare class EnchantmentConditionConditions extends ArraySystem<EnchantmentCondition, EnchantmentConditions> {
    get length(): number;
    get(index: number): EnchantmentCondition;
}
export declare class EnchantmentConditions extends MainEntity<SpellItemEnchantmentConditionRow> {
    get ID(): number;
    get Conditions(): EnchantmentConditionConditions;
}
export declare class EnchantmentConditionRegistryClass extends RegistryDynamic<EnchantmentConditions, SpellItemEnchantmentConditionRow, SpellItemEnchantmentConditionQuery> {
    protected Table(): Table<any, SpellItemEnchantmentConditionQuery, SpellItemEnchantmentConditionRow> & {
        add: (id: number) => SpellItemEnchantmentConditionRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: EnchantmentConditions): void;
    protected Entity(r: SpellItemEnchantmentConditionRow): EnchantmentConditions;
    protected FindByID(id: number): SpellItemEnchantmentConditionRow;
    protected EmptyQuery(): SpellItemEnchantmentConditionQuery;
    ID(e: EnchantmentConditions): number;
}
export declare const EnchantmentConditionRegistry: EnchantmentConditionRegistryClass;
