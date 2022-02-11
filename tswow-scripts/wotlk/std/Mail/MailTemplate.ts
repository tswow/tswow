import { Table } from "../../../data/table/Table";
import { MailTemplateQuery, MailTemplateRow } from "../../dbc/MailTemplate";
import { DBC } from "../../DBCFiles";
import { SQL } from "../../SQLFiles";
import { LootSet } from "../Loot/Loot";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class MailTemplate extends MainEntity<MailTemplateRow> {
    get Body() { return this.wrapLoc(this.row.Body); }
    get Subject() { return this.wrapLoc(this.row.Subject); }
    get ID() { return this.row.ID.get(); }
    get Loot() { return new LootSet(this.ID,SQL.mail_loot_template) }
}

export class MailTemplateRegistryClass
    extends RegistryDynamic<MailTemplate,MailTemplateRow,MailTemplateQuery>
{
    protected Table(): Table<any, MailTemplateQuery, MailTemplateRow> & { add: (id: number) => MailTemplateRow; } {
        return DBC.MailTemplate
    }
    protected ids(): DynamicIDGenerator {
        return Ids.MailTemplate
    }
    Clear(entity: MailTemplate): void {
        entity
            .Body.clear()
            .Subject.clear()
    }
    protected Entity(r: MailTemplateRow): MailTemplate {
        return new MailTemplate(r);
    }
    protected FindByID(id: number): MailTemplateRow {
        return DBC.MailTemplate.findById(id);
    }
    protected EmptyQuery(): MailTemplateQuery {
        return {}
    }
    ID(e: MailTemplate): number {
        return e.ID
    }
}

export const MailTemplateRegistry = new MailTemplateRegistryClass();