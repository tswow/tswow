import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { spell_groupRow } from "../../sql/spell_group";
import { spell_group_stack_rulesQuery, spell_group_stack_rulesRow } from "../../sql/spell_group_stack_rules";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { Spell } from "./Spell";
export declare enum SpellGroupType {
    DEFAULT = 0,
    EXCLUSIVE = 1,
    EXCLUSIVE_SAME_CASTER = 2,
    EXCLUSIVE_SAME_EFFECT = 3,
    EXCLUSIVE_HIGHEST = 4
}
export declare class SpellGroupMapping extends MainEntity<spell_groupRow> {
    get Spell(): import("../Refs/Ref").RefReadOnly<this, Spell>;
    get Group(): import("../Refs/Ref").RefReadOnly<this, SpellStackGroup>;
}
export declare class SpellStackGroupSpells extends MultiRowSystem<SpellGroupMapping, SpellStackGroup> {
    protected getAllRows(): SpellGroupMapping[];
    protected isDeleted(value: SpellGroupMapping): boolean;
    add(...spells: number[]): SpellStackGroup;
}
export declare class SpellSpellStackGroups extends MultiRowSystem<SpellGroupMapping, Spell> {
    protected getAllRows(): SpellGroupMapping[];
    protected isDeleted(value: SpellGroupMapping): boolean;
    add(...groups: number[]): Spell;
}
export declare class SpellStackGroup extends MainEntity<spell_group_stack_rulesRow> {
    get ID(): number;
    get StackRule(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellGroupType>;
    get Spells(): SpellStackGroupSpells;
}
export declare class SpellGroupRegistryClass extends RegistryDynamic<SpellStackGroup, spell_group_stack_rulesRow, spell_group_stack_rulesQuery> {
    protected Table(): Table<any, spell_group_stack_rulesQuery, spell_group_stack_rulesRow> & {
        add: (id: number) => spell_group_stack_rulesRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellStackGroup): void;
    protected FindByID(id: number): spell_group_stack_rulesRow;
    protected EmptyQuery(): spell_group_stack_rulesQuery;
    ID(e: SpellStackGroup): number;
    protected Entity(r: spell_group_stack_rulesRow): SpellStackGroup;
}
export declare const SpellStackGroupRegistry: SpellGroupRegistryClass;
