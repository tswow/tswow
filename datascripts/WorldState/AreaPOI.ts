import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AreaPOIQuery, AreaPOIRow } from "wotlkdata/dbc/types/AreaPOI";
import { AreaRegistry } from "../Area/Area";
import { FactionRegistry } from "../Faction/Faction";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { WorldStateRegistry } from "./WorldState";

export class AreaPOIFlags extends MaskCell32<AreaPOI> {
    get ShowMinimapArrow() { return this.bit(0); }
    get ShowMinimapIcon() { return this.bit(1); }
    /** Map Zoom (current map) */
    get ShowOnMap() { return this.bit(2); }
    /** Continent zoom (Kalimdor, Eastern Kingdoms, Northrend) */
    get ShowOnContinent() { return this.bit(3); }
    /** Furthest zoom (Azeroth/Outland) */
    get ShowOnWorld() { return this.bit(4); }
}

export class AreaPOI extends MainEntity<AreaPOIRow> {
    get Flags() { return new AreaPOIFlags(this, this.row.Flags); }
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
}

export const AreaPOIRegistry = {
    create(parent?: number) {
        return new AreaPOI(
            parent
            ? DBC.AreaPOI.find({ID:parent}).clone(Ids.AreaPOI.id())
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
        return new AreaPOI(DBC.AreaPOI.find({ID:id}));
    },

    filter(query: AreaPOIQuery) {
        return DBC.AreaPOI.filter(query).map(x=>new AreaPOI(x))
    },

    find(query: AreaPOIQuery) {
        return new AreaPOI(DBC.AreaPOI.find(query))
    },
}