import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { EnumCell, makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SpellItemEnchantmentConditionQuery, SpellItemEnchantmentConditionRow } from "wotlkdata/wotlkdata/dbc/types/SpellItemEnchantmentCondition";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export enum ConditionComparator {
    LESSER_THAN        = 2,
    GREATER_THAN       = 3,
    GREATER_THAN_OR_EQ = 5,
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
        return makeEnumCell(ConditionComparator, this, this.wrapIndex(this.container.row.Operator,this.index));
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

export class EnchantmentConditionConditions extends ArraySystem<
      EnchantmentCondition
    , EnchantmentConditions
>{
    get length(): number {
        return 5;
    }

    get(index: number): EnchantmentCondition {
        return new EnchantmentCondition(this.owner, index);
    }
}

export class EnchantmentConditions extends MainEntity<SpellItemEnchantmentConditionRow>
{
    get ID() {
        return this.row.ID.get();
    }

    get Conditions() {
        return new EnchantmentConditionConditions(this)
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
        entity.Conditions.clearAll()
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
    ID(e: EnchantmentConditions): number {
        return e.ID;
    }
}

export const EnchantmentConditionRegistry = new EnchantmentConditionRegistryClass()