import { areatrigger_teleportRow } from "../../sql/areatrigger_teleport";
import { PositionMapXYZOCell } from "../Misc/PositionCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { AreaTriggerBase } from "./AreaTrigger";
export declare class AreaTriggerTeleport<T extends AreaTriggerBase> extends MaybeSQLEntity<T, areatrigger_teleportRow> {
    protected createSQL(): areatrigger_teleportRow;
    protected findSQL(): areatrigger_teleportRow;
    protected isValidSQL(sql: areatrigger_teleportRow): boolean;
    get Name(): import("../Misc/SQLDBCEntity").MaybeSQLCell<T, string, areatrigger_teleportRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<T, areatrigger_teleportRow>>;
    get Position(): PositionMapXYZOCell<this>;
}
