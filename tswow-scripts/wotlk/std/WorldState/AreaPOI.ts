import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { DBC } from "../../DBCFiles";
import { AreaPOIQuery, AreaPOIRow } from "../../dbc/AreaPOI";
import { AreaRegistry } from "../Area/Area";
import { FactionRegistry } from "../Faction/Faction";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { WorldStateRegistry } from "./WorldState";

export enum AreaPOIFlags {
    SHOW_MINIMAP_ARROW = 0x1,
    SHOW_MINIMAP_ICON  = 0x2,
    SHOW_ON_CONTINENT  = 0x8,
    SHOW_ON_WORLD      = 0x10,
    SHOW_ON_MAP        = 0x84,
}

export class AreaPOI extends MainEntity<AreaPOIRow> {
    get Flags() { return makeMaskCell32(AreaPOIFlags, this, this.row.Flags); }
    get Position() {
        return new PositionMapXYZCell(
              this
            , this.row.MapID
            , this.row.X
            , this.row.Y
            , this.row.Z
        )
    }

    get Importance() {
        return this.wrap(this.row.Importance);
    }
    get Icons() {
        return new SingleArraySystem(this, this.row.Icon, 0)
    }
    get Faction() {
        return FactionRegistry.ref(this, this.row.FactionID);
    }
    get Area() {
        return AreaRegistry.ref(this, this.row.AreaID);
    }
    get Name() {
        return this.wrapLoc(this.row.Name);
    }
    get Description() {
        return this.wrapLoc(this.row.Description);
    }
    get WorldState() {
        return WorldStateRegistry.refCreate(this, this.row.WorldStateID)
    }

    get Map() {
        return MapRegistry.ref(this, this.row.MapID);
    }
}

export const AreaPOIRegistry = {
    create(parent?: number) {
        return new AreaPOI(
            parent
            ? DBC.AreaPOI.query({ID:parent}).clone(Ids.AreaPOI.id())
            : DBC.AreaPOI.add(Ids.AreaPOI.id())
        )
        .Area.set(0)
        .Description.clear()
        .Faction.set(0)
        .Flags.set(0)
        .Icons.clearAll()
        .Importance.set(0)
        .Name.clear()
        .Position.setSpread(0,0,0,0)
        .WorldState.set(0)
    },

    load(id: number) {
        return new AreaPOI(DBC.AreaPOI.query({ID:id}));
    },

    filter(query: AreaPOIQuery) {
        return DBC.AreaPOI.queryAll(query).map(x=>new AreaPOI(x))
    },

    find(query: AreaPOIQuery) {
        return new AreaPOI(DBC.AreaPOI.query(query))
    },
}