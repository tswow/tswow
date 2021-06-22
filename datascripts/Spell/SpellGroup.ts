import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { EnumCellWrapper } from "wotlkdata/cell/cells/EnumCell";

export class SpellGroupType<T> extends EnumCellWrapper<T> {
    setDefault() { return this.set(0); }
    setExclusive() { return this.set(1); }
    setExclusiveSameCaster() { return this.set(2); }
    setExclusiveSameEffect() { return this.set(3); }
    setExclusiveHighest() { return this.set(4); }
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