import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { ArrayEntry } from "wotlkdata/cell/systems/ArraySystem";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SpellItemEnchantmentConditionQuery, SpellItemEnchantmentConditionRow } from "wotlkdata/dbc/types/SpellItemEnchantmentCondition";
import { Table } from "wotlkdata/table/Table";
import { ArrayEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class ConditionComparator extends EnumCell<EnchantmentCondition> {
    /** Enum Value = 2 */
    get LesserThan()         { return this.value(2) }
    /** Enum Value = 3 */
    get GreaterThan()        { return this.value(3) }
    /** Enum Value = 5 */
    get GreaterThanOrEqual() { return this.value(5) }
}

export class Operand extends CellSystem<EnchantmentCondition> {
    readonly Type: Cell<number,EnchantmentCondition>
    readonly Value: Cell<number,EnchantmentCondition>

    constructor(
          owner: EnchantmentCondition
        , type: Cell<number,EnchantmentCondition>
        , value: Cell<number,EnchantmentCondition>)
    {
        super(owner);
        this.Type = type;
        this.Value = value;
    }

    set(type: number, value: number) {
        this.Type.set(type);
        this.Value.set(value);
        return this.owner;
    }
}

export class ConditionLogic extends EnumCell<EnchantmentCondition> {}

export class EnchantmentCondition extends ArrayEntry<EnchantmentConditions> {
    static container(condition: EnchantmentCondition) {
        return condition.container;
    }

    get Comparator() {
        return new ConditionComparator(
            this, this.wrapIndex(this.container.row.Operator,this.index)
        );
    }

    get Left(): Operand {
        return new Operand(this
            , this.wrapIndex(this.container.row.Lt_OperandType,this.index)
            , this.wrapIndex(this.container.row.Lt_Operand,this.index)
        );
    }

    get Right(): Operand {
        return new Operand(this
            , this.wrapIndex(this.container.row.Rt_OperandType,this.index)
            , this.wrapIndex(this.container.row.Rt_Operand,this.index)
        );
    }

    get Logic() {
        return new ConditionLogic(
              this
            , this.wrapIndex(this.container.row.Logic,this.index)
        )
    }

    clear(): this {
        this.Comparator.set(0)
            .Left.set(0,0)
            .Right.set(0,0)
            .Logic.set(0)
        return this;
    }


    isClear(): boolean {
        return this.Comparator.get() === 0
            && this.Left.Type.get() === 0
            && this.Left.Value.get() === 0
            && this.Right.Type.get() === 0
            && this.Right.Value.get() === 0
            && this.Logic.get() === 0
    }
}

export class EnchantmentConditions extends ArrayEntity<
      SpellItemEnchantmentConditionRow
    , EnchantmentConditions
    , EnchantmentCondition
    >
{
    get length(): number {
        return 5;
    }

    get(index: number): EnchantmentCondition {
        return new EnchantmentCondition(this, index);
    }

    get ID() {
        return this.row.ID.get();
    }
}

export class EnchantmentConditionRegistryClass
    extends RegistryDynamic<
          EnchantmentConditions
        , SpellItemEnchantmentConditionRow
        , SpellItemEnchantmentConditionQuery
    >
{
    protected Table(): Table<any, SpellItemEnchantmentConditionQuery, SpellItemEnchantmentConditionRow> & { add: (id: number) => SpellItemEnchantmentConditionRow; } {
        return DBC.SpellItemEnchantmentCondition
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellItemEnchantmentCondition
    }
    Clear(entity: EnchantmentConditions): void {
        entity.clearAll()
    }
    protected Clone(entity: EnchantmentConditions, parent: EnchantmentConditions): void {
        throw new Error("Method not implemented.");
    }
    protected Entity(r: SpellItemEnchantmentConditionRow): EnchantmentConditions {
        return new EnchantmentConditions(r);
    }
    protected FindByID(id: number): SpellItemEnchantmentConditionRow {
        return DBC.SpellItemEnchantmentCondition.findById(id);
    }
    protected EmptyQuery(): SpellItemEnchantmentConditionQuery {
        return {}
    }
    protected ID(e: EnchantmentConditions): number {
        return e.ID;
    }
}

export const EnchantmentConditionRegistry = new EnchantmentConditionRegistryClass()