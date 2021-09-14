import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";

export class SpellGroupType<T> extends EnumCell<T> {
    /** Enum Value:                               0 */
    get Default()             { return this.value(0) }
    /** Enum Value:                               1 */
    get Exclusive()           { return this.value(1) }
    /** Enum Value:                               2 */
    get ExclusiveSameCaster() { return this.value(2) }
    /** Enum Value:                               3 */
    get ExclusiveSameEffect() { return this.value(3) }
    /** Enum Value:                               4 */
    get ExclusiveHighest()    { return this.value(4) }
}

export class SpellGroup {
    @Transient
    protected id: number;

    constructor(groupId: number) {
        this.id = groupId;
    }

    get ID() { return this.id; }
    get StackRule() { return new SpellGroupType(this, SQL.spell_group_stack_rules.find({group_id: this.ID}).stack_rule)}
}

export class SpellGroups<T> extends CellSystem<T> {
    @Transient
    protected spellId: number;

    constructor(owner: T, spellId: number) {
        super(owner);
        this.spellId = spellId;
    }

    get() {
        return SQL.spell_group.find({spell_id: this.spellId});
    }

    add(groupId: number) {
        SQL.spell_group.add(groupId, this.spellId);
    }
}