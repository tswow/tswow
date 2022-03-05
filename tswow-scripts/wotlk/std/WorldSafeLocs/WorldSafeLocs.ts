import { Cell } from "../../../data/cell/cells/Cell";
import { EnumCon, makeEnum } from "../../../data/cell/cells/EnumCell";
import { Table } from "../../../data/table/Table";
import { WorldSafelocsQuery, WorldSafelocsRow } from "../../dbc/WorldSafelocs";
import { DBC } from "../../DBCFiles";
import { SQL } from "../../SQLFiles";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { Team } from "../Misc/TeamEnum";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { Graveyards } from "./Graveyard";

export class WorldSafeLoc extends MainEntity<WorldSafelocsRow> {
    get ID() { return this.row.ID.get(); }
    get Position() { return new PositionMapXYZCell(this, this.row.Continent, this.row.LocX, this.row.LocY, this.row.LocZ); }
    get Name() { return this.wrapLoc(this.row.AreaName); }
    get Graveyards() { return new Graveyards(this); }
}


export class WorldSafeLocRef<T> extends RefDynamic<T,WorldSafeLoc>
{
    setSimple(obj: {map: number, x: number, y: number, z: number}) {
        this.cell.set(WorldSafeLocRegistry.createSimple(obj).ID);
        return this.owner;
    }
}

export class WorldSafeLocsRegistryClass
    extends RegistryDynamic<WorldSafeLoc,WorldSafelocsRow,WorldSafelocsQuery>
{
    ref<T>(owner: T, value: Cell<number,any>): WorldSafeLocRef<T> {
        return new WorldSafeLocRef(owner,value,this);
    }

    protected Table(): Table<any, WorldSafelocsQuery, WorldSafelocsRow> & { add: (id: number) => WorldSafelocsRow; } {
        return DBC.WorldSafeLocs
    }

    protected ids(): DynamicIDGenerator {
        return Ids.WorldSafelocs
    }

    Clear(entity: WorldSafeLoc): void {
        entity
            .Name.clear()
            .Position.setSpread(0,0,0,0)
    }

    protected Clone(entity: WorldSafeLoc, parent: WorldSafeLoc): void {
        entity.Name.set(parent.Name.objectify())
        entity.Position.setSpread(
              parent.Position.X.get()
            , parent.Position.Y.get()
            , parent.Position.Z.get()
            , parent.Position.Map.get()
        )
    }

    protected Entity(r: WorldSafelocsRow): WorldSafeLoc {
        return new WorldSafeLoc(r);
    }

    protected FindByID(id: number): WorldSafelocsRow {
        return DBC.WorldSafeLocs.findById(id);
    }

    protected EmptyQuery(): WorldSafelocsQuery {
        return {}
    }

    ID(e: WorldSafeLoc): number {
        return e.ID
    }

    createSimple(obj: {map: number, x: number, y: number, z: number, o?: any}) {
        return this.create().Position.set(obj);
    }

    createGraveyard(area: number|number[], faction: EnumCon<Team>|'BOTH', obj: {map: number, x: number, y: number, z: number, o?: any}) {
        let wsl = this.create().Position.set(obj);
        if(typeof(area) === 'number') area = [area]
        area.forEach(x=>{
            SQL.graveyard_zone.add(wsl.ID,x)
                .Comment.set('tswow')
                .Faction.set(faction === 'BOTH' ? 0 : makeEnum(Team,faction))
        })
    }
}

export const WorldSafeLocRegistry = new WorldSafeLocsRegistryClass();