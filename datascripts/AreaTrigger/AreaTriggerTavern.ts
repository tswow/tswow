import { SQL } from "wotlkdata/sql/SQLFiles";
import { areatrigger_tavernRow } from "wotlkdata/sql/types/areatrigger_tavern";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { AreaTriggerBase } from "./AreaTrigger";

export class AreaTriggerTavern<T extends AreaTriggerBase> extends MaybeSQLEntity<T,areatrigger_tavernRow> {
    protected createSQL(): areatrigger_tavernRow {
        return SQL.areatrigger_tavern.add(this.owner.ID)
    }
    protected findSQL(): areatrigger_tavernRow {
        return SQL.areatrigger_tavern.find({id:this.owner.ID})
    }
    protected isValidSQL(sql: areatrigger_tavernRow): boolean {
        return sql.id.get() === this.owner.ID;
    }
}