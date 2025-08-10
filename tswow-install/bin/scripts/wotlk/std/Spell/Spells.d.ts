import { Table } from "../../../data/table/Table";
import { SpellQuery, SpellRow } from "../../dbc/Spell";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { Spell } from "./Spell";
export declare class SpellRegistryClass extends RegistryStatic<Spell, SpellRow, SpellQuery> {
    create(mod: string, id: string, parent?: number, cloneServerData?: boolean): Spell;
    protected Table(): Table<any, SpellQuery, SpellRow> & {
        add: (id: number) => SpellRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(r: SpellRow): Spell;
    protected FindByID(id: number): SpellRow;
    protected EmptyQuery(): SpellQuery;
    ID(e: Spell): number;
    Clear(r: Spell): void;
}
export declare const SpellRegistry: SpellRegistryClass;
