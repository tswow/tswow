import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { Table } from "../../../data/table/Table";
import { SpellDescriptionVariablesQuery, SpellDescriptionVariablesRow } from "../../dbc/SpellDescriptionVariables";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellDescriptionVariable extends MainEntity<SpellDescriptionVariablesRow> {
    clear(): this;
    objectify(options?: ObjectifyOptions): string;
    get(): string;
    set(value: string): undefined;
    get ID(): number;
}
export declare class SpellDescriptionVariableRef<T> extends RefDynamic<T, SpellDescriptionVariable> {
    setSimple(variables: string): T;
}
export declare class SpellDescriptionVariableRegistryClass extends RegistryDynamic<SpellDescriptionVariable, SpellDescriptionVariablesRow, SpellDescriptionVariablesQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellDescriptionVariableRef<T>;
    protected Table(): Table<any, SpellDescriptionVariablesQuery, SpellDescriptionVariablesRow> & {
        add: (id: number) => SpellDescriptionVariablesRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellDescriptionVariable): void;
    protected FindByID(id: number): SpellDescriptionVariablesRow;
    protected EmptyQuery(): SpellDescriptionVariablesQuery;
    ID(e: SpellDescriptionVariable): number;
    protected Entity(r: SpellDescriptionVariablesRow): SpellDescriptionVariable;
}
export declare const SpellDescriptionVariableRegistry: SpellDescriptionVariableRegistryClass;
