import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { BattlemasterListQuery } from "wotlkdata/wotlkdata/dbc/types/BattlemasterList";
import { getInlineID } from "../InlineScript/InlineScript";
import { MapRegistry } from "../Map/Maps";
import { WorldSafeLocRegistry } from "../WorldSafeLocs/WorldSafeLocs";
import { BattlegroundBase, createBgBase, filterBgsBase } from "./BattlegroundBase";
import { BattlegroundBrackets } from "./BattlegroundBracket";
import { BattlegroundSafeLoc } from "./BattlegroundSafeLocs";

export enum BattlegroundType {
    BATTLEGROUND = 3,
    ARENA        = 4
}

export class Battleground extends BattlegroundBase {
    get Map() { return MapRegistry.ref(this, this.wrapIndex(this.dbc_row.MapID,0)) }
    get HordeStart() {
        return new BattlegroundSafeLoc(
              this
            , WorldSafeLocRegistry.ref(this, this.sql_row.HordeStartLoc)
            , this.sql_row.HordeStartO
        );
    }

    get Type() {
        return makeEnumCell(BattlegroundType, this, this.dbc_row.InstanceType)
    }

    get InlineScripts() {
        return getInlineID(
              this
            , this.ID
            , 'BattlegroundID'
        ) as _hidden.Battlegrounds<this>
    }

    get AllianceStart() {
        return new BattlegroundSafeLoc(
              this
            , WorldSafeLocRegistry.ref(this, this.sql_row.AllianceStartLoc)
            , this.sql_row.AllianceStartO
        );
    }
    get StartMaxDist() { return this.wrap(this.sql_row.StartMaxDist); }
    get Brackets() { return new BattlegroundBrackets(this); }
}

function filterBgs(query: BattlemasterListQuery) {
    return filterBgsBase(query)
        .filter(({dbc})=>
               dbc.MapID.getIndex(1)==-1
            && dbc.MapID.getIndex(2)==-1
            && dbc.MapID.getIndex(3)==-1
            && dbc.MapID.getIndex(4)==-1
            && dbc.MapID.getIndex(5)==-1
            && dbc.MapID.getIndex(6)==-1
            && dbc.MapID.getIndex(7)==-1
        ).map(({dbc,sql})=>new Battleground(dbc,sql))
}

export const BattlegroundRegistry = {
    create(mod: string, id: string, map: number) {
        let {dbc,sql} = createBgBase(mod,id);
        dbc.MapID.setIndex(0,map)
        return new Battleground(dbc,sql)
    },

    load(id: number) {
        return filterBgs({ID:id})[0]
    },

    filter(query: BattlemasterListQuery) {
        return filterBgs(query)
    },

    find(query: BattlemasterListQuery) {
        return filterBgs(query)[0];
    }
}