import { SQL } from "wotlkdata";
import { playercreateinfoRow } from "wotlkdata/wotlkdata/sql/types/playercreateinfo";
import { Position } from "../../Misc/Position";
import { MaybeSQLEntity } from "../../Misc/SQLDBCEntity";
import { ClassRacePair } from "./ClassRaces";

export class ClassRaceSpawn extends MaybeSQLEntity<ClassRacePair,playercreateinfoRow> {
    protected createSQL(): playercreateinfoRow {
        return SQL.playercreateinfo
            .add(this.owner.row.RaceID.get(),this.owner.row.ClassID.get())
            .position_x.set(0)
            .position_y.set(0)
            .position_z.set(0)
            .zone.set(0)
    }
    protected findSQL(): playercreateinfoRow {
        return SQL.playercreateinfo
            .query({
                  class:this.owner.row.ClassID.get()
                , race:this.owner.row.RaceID.get()
            })
    }
    protected isValidSQL(sql: playercreateinfoRow): boolean {
        return sql.isDeleted();
    }

    get Map()    { return this.wrapSQL(0, sql=>sql.map)}
    get X()      { return this.wrapSQL(0, sql=>sql.position_x)}
    get Y()      { return this.wrapSQL(0, sql=>sql.position_y)}
    get Z()      { return this.wrapSQL(0, sql=>sql.position_z)}
    get O()      { return this.wrapSQL(0, sql=>sql.orientation)}
    get Zone()   { return this.wrapSQL(0, sql=>sql.zone)}

    set(zone: number, pos: Position) {
        this.Zone.set(zone);
        this.Map.set(pos.map)
        this.X.set(pos.x)
        this.Y.set(pos.y)
        this.Z.set(pos.z)
        this.O.set(pos.o)
        return this.owner;
    }
}
