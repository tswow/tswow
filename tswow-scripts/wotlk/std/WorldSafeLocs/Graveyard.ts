import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SQL } from "../../SQLFiles";
import { graveyard_zoneRow } from "../../sql/graveyard_zone";
import { MainEntity } from "../Misc/Entity";
import { Team } from "../Misc/TeamEnum";
import { WorldSafeLoc, WorldSafeLocRegistry } from "./WorldSafeLocs";

export class Graveyard extends MainEntity<graveyard_zoneRow> {

    get WorldSafeLoc() {
        return WorldSafeLocRegistry.readOnlyRef(this, this.row.ID)
    }

    get Area() {
        return WorldSafeLocRegistry.readOnlyRef(this, this.row.GhostZone);
    }

    get Faction() {
        return makeMaskCell32(Team,this, this.row.Faction)
    }
}

export class Graveyards extends MultiRowSystem<Graveyard,WorldSafeLoc> {
    protected getAllRows(): Graveyard[] {
        return SQL.graveyard_zone.queryAll({ID:this.owner.ID})
            .map(x=>new Graveyard(x))
    }
    protected isDeleted(value: Graveyard): boolean {
        return value.row.isDeleted();
    }

    add(area: number, faction: Team) {
        SQL.graveyard_zone.add(this.owner.ID,area)
            .Faction.set(faction)
            .Comment.set('tswow')
        return this.owner;
    }
}