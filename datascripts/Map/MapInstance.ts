import { SQL } from "wotlkdata/sql/SQLFiles";
import { instance_templateRow } from "wotlkdata/sql/types/instance_template";
import { BoolCell } from "../Misc/BoolCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Map } from "./Map";

export class MapInstance extends MaybeSQLEntity<Map,instance_templateRow> {
    protected createSQL(): instance_templateRow {
        return SQL.instance_template.add(this.owner.ID)
            .allowMount.set(0)
            .script.set('')
    }
    protected findSQL(): instance_templateRow {
        return SQL.instance_template.find({map:this.owner.ID})
    }
    protected isValidSQL(sql: instance_templateRow): boolean {
        return sql.map.get() === this.owner.ID
    }

    get AllowMount() {
        return new BoolCell(this.owner, this.wrapSQL(0, sql=>sql.allowMount))
    }
}