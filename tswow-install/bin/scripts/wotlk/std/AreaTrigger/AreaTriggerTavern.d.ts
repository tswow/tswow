import { areatrigger_tavernRow } from "../../sql/areatrigger_tavern";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { AreaTriggerBase } from "./AreaTrigger";
export declare class AreaTriggerTavern<T extends AreaTriggerBase> extends MaybeSQLEntity<T, areatrigger_tavernRow> {
    protected createSQL(): areatrigger_tavernRow;
    protected findSQL(): areatrigger_tavernRow;
    protected isValidSQL(sql: areatrigger_tavernRow): boolean;
}
