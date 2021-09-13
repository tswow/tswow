import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SpellItemEnchantmentConditionQuery, SpellItemEnchantmentConditionRow } from "wotlkdata/dbc/types/SpellItemEnchantmentCondition";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class ConditionComparator extends EnumCellWrapper<EnchantmentCondition> {
    /** value = 2 */
    @EnumField(2)
    setLesserThan() { return this.set(2); }
    /** value = 3 */
    @EnumField(3)
    setGreaterThan() { return this.set(3); }
    /** value = 5 */
    @EnumField(5)
    setGreaterThanOrEqual() { return this.set(5); }
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

export class ConditionLogic extends EnumCellWrapper<EnchantmentCondition> {
}

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

export class EnchantmentConditions extends ArraySystem<EnchantmentCondition,EnchantmentConditions> {
    readonly row: SpellItemEnchantmentConditionRow;

    constructor(row: SpellItemEnchantmentConditionRow) {
        // @ts-ignore TODO: bad not good
        super(undefined);
        this.owner = this;
        this.row = row;
    }

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

export const EnchantmentConditionsRegistry = {
    create() {
        return new EnchantmentConditions(
            DBC.SpellItemEnchantmentCondition.add(
                Ids.SpellItemEnchantmentCondition.id()
            )
        )
    },

    load(id: number) {
        return new EnchantmentConditions(
            DBC.SpellItemEnchantmentCondition.findById(id)
        )
    },

    filter(query: SpellItemEnchantmentConditionQuery) {
        return DBC.SpellItemEnchantmentCondition.filter(query)
            .map(x=>new EnchantmentConditions(x));
    },

    find(query: SpellItemEnchantmentConditionQuery) {
        return new EnchantmentConditions(
            DBC.SpellItemEnchantmentCondition.find(query)
        )
    }
}

export class EnchantmentConditionRef<T> extends Ref<T,EnchantmentConditions> {
    protected create(): EnchantmentConditions {
        return EnchantmentConditionsRegistry.create();
    }
    protected clone(): EnchantmentConditions {
        return new EnchantmentConditions(this.resolve().row.clone(Ids.SpellItemEnchantmentCondition.id()))
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: EnchantmentConditions): number {
        return v.ID;
    }
    protected resolve(): EnchantmentConditions {
        return EnchantmentConditionsRegistry.load(this.cell.get());
    }
}