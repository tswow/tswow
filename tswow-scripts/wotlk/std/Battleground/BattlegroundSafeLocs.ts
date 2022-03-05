import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { finish } from "../../../data/index";
import { DBC } from "../../DBCFiles";
import { SQL } from "../../SQLFiles";
import { WorldSafeLocRef } from "../WorldSafeLocs/WorldSafeLocs";

export class BattlegroundSafeLoc<T> extends CellSystem<T> {
    protected loc: WorldSafeLocRef<T>
    protected o: Cell<number,any>
    protected map: Cell<number,any>

    constructor(
          owner: T
        , loc: WorldSafeLocRef<T>
        , map: Cell<number,any>
        , o: Cell<number,any>
    ) {
        super(owner);
        this.loc = loc;
        this.o = o;
        this.map = map;
    }

    get Loc() { return this.loc; }
    get O() { return this.o; }

    setSpread(x: number, y: number, z: number, o: number) {
        this.loc.setSimple({map:this.map.get(),x,y,z});
        this.o.set(o);
        return this.owner;
    }

    set(obj: {map?: number, x: number, y: number, z: number, o: number}) {
        if(obj.map !== undefined && this.map.get() !== obj.map) {
            throw new Error(
                  `Trying to set safe location on a different map `
                + `than the battleground map.`
            )
        }
        return this.setSpread(obj.x,obj.y,obj.z,obj.o);
    }
}

finish('bg-worldsafelocs',()=>{
    SQL.battleground_template
        .queryAll({})
        .forEach(sql=>{
            const dbc = DBC.BattlemasterList.findById(sql.ID.get())
            if(dbc.MapID.get().filter(x=>x>=0).length>1) {
                return;
            }

            const bgMap = dbc.MapID.getIndex(0)
            const bgId = sql.ID.get()
            const idString = `{bg=${bgId},map=${bgMap}}`

            if(sql.HordeStartLoc.get() === 0 || sql.AllianceStartLoc.get() === 0) {
                throw new Error(
                      `Battlemaster ${idString} only has one map registered, `
                    + `but doesn't specify starting locations for both Horde and Alliance.`
                    + `Single battlegrounds must specify starting locations`
                )
            }

            const hordeLocId = sql.HordeStartLoc.get()
            const allyLocId = sql.AllianceStartLoc.get()
            const hordeLoc = DBC.WorldSafeLocs.findById(hordeLocId);
            const allyLoc = DBC.WorldSafeLocs.findById(allyLocId);

            if(hordeLoc === undefined) {
                throw new Error(
                    `Invalid battleground horde location ${hordeLocId}`
                  + ` in battleground ${idString}`
              )
            }

            if(allyLoc === undefined) {
                throw new Error(
                    `Invalid battleground alliance location ${allyLocId}`
                  + ` in battleground ${idString}`
                )
            }

            const map = dbc.MapID.getIndex(0)
            const hordeMap = hordeLoc.Continent.get()
            const allyMap = allyLoc.Continent.get()

            if(hordeMap !== map) {
                throw new Error(
                    `Battlemaster ${idString} is registered for map ${map}, `
                  + `but the horde starting location is on map ${hordeMap}`
              )
            }

            if(allyMap !== map) {
                throw new Error(
                    `Battlemaster ${idString} is registered for map ${map}, `
                  + `but the alliance starting location is on map ${allyMap}`
              )
            }
        })
})