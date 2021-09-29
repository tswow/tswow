import { Cell, CPrim } from "wotlkdata/cell/cells/Cell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { WorldMapAreaRow } from "wotlkdata/dbc/types/WorldMapArea";
import { WorldMapContinentRow } from "wotlkdata/dbc/types/WorldMapContinent";
import { Ids } from "../Misc/Ids";
import { MaybeDBCEntity } from "../Misc/SQLDBCEntity";
import { Map } from "./Map";

export class MapTaxiBoundary extends CellSystem<Map> {
    get MinX()   { return MapContinent.wrap(this.owner,0,(c)=>c.TaxiMinX) }
    get MaxX()   { return MapContinent.wrap(this.owner,0,(c)=>c.TaxiMaxX) }
    get MinY()   { return MapContinent.wrap(this.owner,0,(c)=>c.TaxiMinY) }
    get MaxY()   { return MapContinent.wrap(this.owner,0,(c)=>c.TaxiMaxY) }

    set(minX: number, minY: number, maxX: number, maxY: number) {
        this.MinX.set(minX);
        this.MinY.set(minY);
        this.MaxX.set(maxX);
        this.MaxY.set(maxY);
        return this.owner;
    }

    /**
     * Sets the taxi boundary to match the adt boundary.
     *
     * You should set ADT boundary before using this function.
     *
     * @param padding how many yards to pad the resulting image
     * @returns
     */
    matchADTBoundary(padding: number = 0) {
        const boundary = this.owner.Continent.ADTBoundary
        this.MaxX.set(32-boundary.Left.get()*533.3333333-padding)
        this.MaxY.set(32-boundary.Top.get()*533.3333333-padding)
        this.MinX.set(31-boundary.Right.get()*533.3333333+padding)
        this.MinY.set(31-boundary.Bottom.get()*533.3333333+padding)
        return this.owner;
    }
}

export class MapContinentBoundary extends CellSystem<Map> {
    get Left()   { return MapContinent.wrap(this.owner,0,(c)=>c.LeftBoundary) }
    get Top()    { return MapContinent.wrap(this.owner,0,(c)=>c.TopBoundary) }
    get Right()  { return MapContinent.wrap(this.owner,0,(c)=>c.RightBoundary) }
    get Bottom() { return MapContinent.wrap(this.owner,0,(c)=>c.BottomBoundary) }

    set(left: number, top: number, right: number, bottom: number) {
        this.Left.set(left);
        this.Top.set(top);
        this.Right.set(right);
        this.Bottom.set(bottom);
        return this.owner;
    }
}

export class MapContinentOffset extends CellSystem<Map> {
    get X() { return MapContinent.wrap(this.owner,0,(c)=>c.ContinentOffsetX)}
    get Y() { return MapContinent.wrap(this.owner,0,(c)=>c.ContinentOffsetY)}
    set(x: number, y: number) {
        this.X.set(x);
        this.Y.set(y)
        return this.owner;
    }
}

export class MapContinentAreaBoundary extends CellSystem<Map> {
    get Left() { return MapContinent.wrap(this.owner,0,(_,a)=>a.LocLeft)}
    get Top() { return MapContinent.wrap(this.owner,0,(_,a)=>a.LocTop)}
    get Right() { return MapContinent.wrap(this.owner,0,(_,a)=>a.LocRight)}
    get Bottom() { return MapContinent.wrap(this.owner,0,(_,a)=>a.LocBottom)}

    set(left: number, top: number, right: number, bottom: number) {
        this.Left.set(left);
        this.Top.set(top);
        this.Right.set(right);
        this.Bottom.set(bottom);
        return this.owner;
    }

    /**
     * Sets the area boundary to match the continent adt boundary
     * @param padding
     */
    matchADTBoundary(padding: number = 0) {
        const boundary = this.owner.Continent.ADTBoundary
        this.Left.set(32-boundary.Left.get()*533.3333333-padding)
        this.Top.set(32-boundary.Top.get()*533.3333333-padding)
        this.Right.set(31-boundary.Right.get()*533.3333333+padding)
        this.Bottom.set(31-boundary.Bottom.get()*533.3333333+padding)
        return this.owner;
    }
}

type CGetter<T extends CPrim>
    = (continent: WorldMapContinentRow, area: WorldMapAreaRow)=>Cell<T,any>

export class MapContinent extends MaybeDBCEntity<Map,WorldMapContinentRow> {
    protected continentWrap<T extends CPrim>(def: T, safegetter: CGetter<T>)
    {
        return super.wrapDBC(
              def
            , (r)=>safegetter(this.continent_row,this.area_row)
        )
    }

    static wrap<T extends CPrim>(owner: Map, def: T, safegetter: CGetter<T>)
    {
        return owner.Continent.continentWrap(def,safegetter);
    }

    @Transient
    get continent_row() {
        return this.GetDBC();
    }

    @Transient
    get area_row() {
        return DBC.WorldMapArea.find({MapID:this.owner.ID,AreaID:0});
    }

    protected createDBC(): WorldMapContinentRow {
        const continent = DBC.WorldMapContinent.add(Ids.WorldMapContinent.id())
            .MapID.set(this.owner.ID)
            .WorldMapID.set(1) // todo: allow outland / arbitrary other worlds
            .TopBoundary.set(0)
            .BottomBoundary.set(0)
            .LeftBoundary.set(0)
            .RightBoundary.set(0)
            .TaxiMaxX.set(0)
            .TaxiMaxY.set(0)
            .TaxiMinX.set(0)
            .TaxiMinY.set(0)
            .ContinentOffsetX.set(0)
            .ContinentOffsetY.set(0)

        // IF the wmcm exists, we ensure the wma exists too
        DBC.WorldMapArea.add(Ids.WorldMapArea.id())
            .MapID.set(this.owner.ID)
            .LocLeft.set(0)
            .LocRight.set(0)
            .LocBottom.set(0)
            .LocTop.set(0)
            .AreaID.set(0)
            .AreaName.set(this.owner.Directory.get())
        return continent;
    }

    protected findDBC(): WorldMapContinentRow {
        return DBC.WorldMapContinent.find({MapID:this.owner.ID})
    }
    protected isValidDBC(dbc: WorldMapContinentRow): boolean {
        return dbc.MapID.get() === this.owner.ID
    }

    get AreaName() { return this.continentWrap('',(_,area)=>area.AreaName)}
    get Offset() { return new MapContinentOffset(this.owner); }
    get ADTBoundary() { return new MapContinentBoundary(this.owner); }
    get Scale() { return this.wrapDBC(0,x=>x.Scale)}
    get TaxiBoundary() { return new MapTaxiBoundary(this.owner); }
    get AreaBoundary() { return new MapContinentAreaBoundary(this.owner); }
    get ContinentID() { return this.exists() ? this.continent_row.ID.get() : 0}
    get AreaID() { return this.exists() ? this.area_row.ID.get() : 0}
}