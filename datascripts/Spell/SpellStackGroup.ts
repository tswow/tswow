import { makeEnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { spell_groupRow } from "wotlkdata/sql/types/spell_group";
import { spell_group_stack_rulesQuery, spell_group_stack_rulesRow } from "wotlkdata/sql/types/spell_group_stack_rules";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { Spell } from "./Spell";
import { SpellRegistry } from "./Spells";

export enum SpellGroupType {
    DEFAULT               = 0,
    EXCLUSIVE             = 1,
    EXCLUSIVE_SAME_CASTER = 2,
    EXCLUSIVE_SAME_EFFECT = 3,
    EXCLUSIVE_HIGHEST     = 4,
}

export class SpellGroupMapping extends MainEntity<spell_groupRow> {
    get Spell() { return SpellRegistry.readOnlyRef(this, this.row.spell_id); }
    get Group() { return SpellStackGroupRegistry.readOnlyRef(this, this.row.id); }
}

export class SpellStackGroupSpells extends MultiRowSystem<SpellGroupMapping,SpellStackGroup> {
    protected getAllRows(): SpellGroupMapping[] {
        return SQL.spell_group
            .filter({id:this.owner.ID})
            .map(x=>new SpellGroupMapping(x))
    }
    protected isDeleted(value: SpellGroupMapping): boolean {
        return value.row.isDeleted();
    }
}

export class SpellSpellStackGroups extends MultiRowSystem<SpellGroupMapping,Spell> {
    protected getAllRows(): SpellGroupMapping[] {
        return SQL.spell_group
            .filter({spell_id:this.owner.ID})
            .map(x=>new SpellGroupMapping(x))
    }
    protected isDeleted(value: SpellGroupMapping): boolean {
        return value.row.isDeleted();
    }
}

// SpellGroups are defined by their stack rules
export class SpellStackGroup extends MainEntity<spell_group_stack_rulesRow> {
    get ID() { return this.row.group_id.get(); }
    get StackRule() {
        return makeEnumCell(SpellGroupType,this, this.row.stack_rule);
    }
}

export class SpellGroupRegistryClass
    extends RegistryDynamic<
          SpellStackGroup
        , spell_group_stack_rulesRow
        , spell_group_stack_rulesQuery
>
{
    protected Table(): Table<any, spell_group_stack_rulesQuery, spell_group_stack_rulesRow> & { add: (id: number) => spell_group_stack_rulesRow; } {
        return SQL.spell_group_stack_rules
    }
    protected ids(): DynamicIDGenerator {
        return Ids.spell_group
    }
    Clear(entity: SpellStackGroup): void {
        entity.StackRule.DEFAULT.set()
    }
    protected FindByID(id: number): spell_group_stack_rulesRow {
        return SQL.spell_group_stack_rules.find({group_id:id})
    }
    protected EmptyQuery(): spell_group_stack_rulesQuery {
        return {}
    }
    ID(e: SpellStackGroup): number {
        return e.ID
    }
    protected Entity(r: spell_group_stack_rulesRow): SpellStackGroup {
        return new SpellStackGroup(r);
    }
}

export const SpellStackGroupRegistry = new SpellGroupRegistryClass()