import { SQL } from "../../SQLFiles";
import { areatrigger_teleportRow } from "../../sql/areatrigger_teleport";
import { PositionMapXYZOCell } from "../Misc/PositionCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { AreaTriggerBase } from "./AreaTrigger";

export class AreaTriggerTeleport<T extends AreaTriggerBase> extends MaybeSQLEntity<T,areatrigger_teleportRow> {
    protected createSQL(): areatrigger_teleportRow {
        return SQL.areatrigger_teleport.add(this.owner.ID)
            .Name.set('')
            .target_map.set(0)
            .target_position_x.set(0)
            .target_position_y.set(0)
            .target_position_z.set(0)
            .target_orientation.set(0)
    }

    protected findSQL(): areatrigger_teleportRow {
        return SQL.areatrigger_teleport.query({ID:this.owner.ID})
    }
    protected isValidSQL(sql: areatrigger_teleportRow): boolean {
        return sql.ID.get() === this.owner.ID
    }

    get Name() { return this.wrapSQL('', sql=>sql.Name); }
    get Position() {
        return new PositionMapXYZOCell(
              this
            , this.wrapSQL(-1,sql=>sql.target_map)
            , this.wrapSQL(0,sql=>sql.target_position_x)
            , this.wrapSQL(0,sql=>sql.target_position_y)
            , this.wrapSQL(0,sql=>sql.target_position_z)
            , this.wrapSQL(0,sql=>sql.target_orientation)
        )
    }
}