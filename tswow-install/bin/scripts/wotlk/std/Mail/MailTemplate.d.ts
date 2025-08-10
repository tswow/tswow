import { Table } from "../../../data/table/Table";
import { MailTemplateQuery, MailTemplateRow } from "../../dbc/MailTemplate";
import { LootSet } from "../Loot/Loot";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
export declare class MailTemplate extends MainEntity<MailTemplateRow> {
    get Body(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Subject(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ID(): number;
    get Loot(): LootSet;
}
export declare class MailTemplateRegistryClass extends RegistryStatic<MailTemplate, MailTemplateRow, MailTemplateQuery> {
    protected Table(): Table<any, MailTemplateQuery, MailTemplateRow> & {
        add: (id: number) => MailTemplateRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: MailTemplate): void;
    protected Entity(r: MailTemplateRow): MailTemplate;
    protected FindByID(id: number): MailTemplateRow;
    protected EmptyQuery(): MailTemplateQuery;
    ID(e: MailTemplate): number;
}
export declare const MailTemplateRegistry: MailTemplateRegistryClass;
