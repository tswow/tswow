import { DBC } from "wotlkdata";
import { MulticastCell } from "wotlkdata/wotlkdata/cell/cells/MulticastCell";
import { CellSystemTop } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { BattlemasterListQuery, BattlemasterListRow } from "wotlkdata/wotlkdata/dbc/types/BattlemasterList";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { battleground_templateRow } from "wotlkdata/wotlkdata/sql/types/battleground_template";
import { Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { BattlegroundDescription } from "./BattleroundDescriptions";

export class BattlegroundBase extends CellSystemTop {
    dbc_row: BattlemasterListRow
    sql_row: battleground_templateRow;
    get ID() { return this.sql_row.ID.get(); }
    get Name() { return this.wrapLoc(this.dbc_row.Name); }
    get Description() { return new BattlegroundDescription(this, this.sql_row.ID); }
    get MaxGroupSize() { return this.wrap(this.dbc_row.MaxGroupSize); }
    get HolidayWorldState() { return this.wrap(this.dbc_row.HolidayWorldState); }
    get Weight() { return this.wrap(this.sql_row.Weight); }
    get Level() {
        return new MinMaxCell(this,
          new MulticastCell(this,
            [this.sql_row.MinLvl, this.dbc_row.Minlevel])
        , new MulticastCell(this,
            [this.sql_row.MaxLvl, this.dbc_row.Maxlevel])
        );
    }
    get PlayersPerTeam() {
        return new MinMaxCell(this,
            this.sql_row.MinPlayersPerTeam,
            this.sql_row.MaxPlayersPerTeam
        );
    }

    constructor(
          dbc_row: BattlemasterListRow
        , sql_row: battleground_templateRow
    ) {
        super();
        this.dbc_row = dbc_row;
        this.sql_row = sql_row;
    }
}

export function filterBgsBase(query: BattlemasterListQuery) {
    return DBC.BattlemasterList
        .queryAll(query)
        .map(dbc=>
            ({dbc,sql:SQL.battleground_template.query({ID:dbc.ID.get()})})
        )
        .filter(({sql,dbc})=>sql!==undefined)
}

export function createBgBase(mod: string, id: string) {
    let nid = Ids.BattleMasterList.id(mod,id)
    let bg = new BattlegroundBase(
           DBC.BattlemasterList.add(nid)
        ,  SQL.battleground_template.add(nid)
    )
    .MaxGroupSize.set(5)
    .Level.set(1,80)
    .HolidayWorldState.set(0)
    bg.dbc_row.InstanceType.set(0)
    bg.dbc_row.MapID.set([-1,-1,-1,-1,-1,-1,-1,-1])
    bg.sql_row.MinPlayersPerTeam.set(0)
    bg.sql_row.MaxPlayersPerTeam.set(10)
    bg.sql_row
        .HordeStartLoc.set(0)
        .HordeStartO.set(0)
        .AllianceStartLoc.set(0)
        .AllianceStartO.set(0)
    return {dbc:bg.dbc_row,sql:bg.sql_row};
}