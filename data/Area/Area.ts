import { AreaTableRow } from "wotlkdata/dbc/types/AreaTable";
import { MainEntity } from "../Base/MainEntity";

export class Area extends MainEntity<AreaTableRow> {


    get ExploreBit() { return this.row.ExploreFlag.get(); }
    get ID() { return this.row.ID.get(); }

    get IntroSound() { return this.wrap(this.row.IntroSound); }
    get MapID() { return this.wrap(this.row.MapID); }
    get ParentArea() { return this.wrap(this.row.ParentAreaID); }
}