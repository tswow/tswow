import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { game_teleQuery, game_teleRow } from "wotlkdata/wotlkdata/sql/types/game_tele";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { PositionMapXYZOCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";

export class GMTeleport extends MainEntity<game_teleRow> {
    get ID() { return this.row.id.get() }
    get Position() {
        return new PositionMapXYZOCell(
              this
            , this.row.map
            , this.row.position_x
            , this.row.position_y
            , this.row.position_z
            , this.row.orientation
        )
    }
    get Name() { return this.wrap(this.row.name); }
}

export class GMTeleportRegistryClass
    extends RegistryDynamic<GMTeleport,game_teleRow,game_teleQuery>
{
    protected Table(): Table<any, game_teleQuery, game_teleRow> & { add: (id: number) => game_teleRow; } {
        return SQL.game_tele
    }
    protected ids(): DynamicIDGenerator {
        return Ids.game_tele
    }
    Clear(entity: GMTeleport): void {
        entity.Position.setSpread(0,0,0,0,0)
              .Name.set('')
    }
    protected FindByID(id: number): game_teleRow {
        return SQL.game_tele.query({id})
    }
    protected EmptyQuery(): game_teleQuery {
        return {}
    }
    ID(e: GMTeleport): number {
        return e.ID

    }
    protected Entity(r: game_teleRow): GMTeleport {
        return new GMTeleport(r)
    }

    createSimple(name: string, pos: Position) {
        return this.create()
            .Name.set(name)
            .Position.set(pos)
    }
}
export const GMTeleportRegistry = new GMTeleportRegistryClass()