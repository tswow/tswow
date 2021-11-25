import { finish } from "wotlkdata";
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { BuildArgs } from "wotlkdata/wotlkdata/Settings";
import { WorldSafeLocRef } from "../WorldSafeLocs/WorldSafeLocs";
import { Battleground, BattlegroundRegistry } from "./Battleground";

export class BattlegroundSafeLoc extends CellSystem<Battleground> {
    protected loc: WorldSafeLocRef<Battleground>
    protected o: Cell<number,any>

    constructor(owner: Battleground, loc: WorldSafeLocRef<Battleground>, o: Cell<number,any>) {
        super(owner);
        this.loc = loc;
        this.o = o;
    }

    get Loc() { return this.loc; }
    get O() { return this.o; }

    setSpread(x: number, y: number, z: number, o: number) {
        this.loc.setSimple({map:this.owner.Map.get(),x,y,z});
        this.o.set(o);
        return this.owner;
    }

    set(obj: {map?: number, x: number, y: number, z: number, o: number}) {
        if(obj.map !== undefined && this.owner.Map.get() !== obj.map) {
            throw new Error(
                  `Trying to set safe location on a different map `
                + `than the battleground map.`
            )
        }
        return this.setSpread(obj.x,obj.y,obj.z,obj.o);
    }
}

finish('bg-worldsafelocs',()=>{
    if(BuildArgs.READ_ONLY) return;
    BattlegroundRegistry.filter({})
        .forEach(x=>{
            if(x.HordeStart.Loc.get() === 0 ||x.AllianceStart.Loc.get() === 0) {
                throw new Error(
                      `Battlemaster ${x.ID} only has one map registered, `
                    + `but doesn't specify starting locations for both Horde and Alliance.`
                    + `Single battlegrounds must specify starting locations`
                )
            }

            let hordemap = x.HordeStart.Loc.getRef().Position.Map.get();
            let allymap = x.AllianceStart.Loc.getRef().Position.Map.get();
            let map = x.Map.get()

            if(hordemap !== map) {
                throw new Error(
                      `Battlemaster ${x.ID} is registered for map ${map}, `
                    + `but the horde starting location is on map ${hordemap}`
                )
            }

            if(allymap !== map) {
                throw new Error(
                      `Battlemaster ${x.ID} is registered for map ${map}, `
                    + `but the alliance starting location is on map ${hordemap}`
                )
            }

            if(x.Brackets.length === 0) {
                throw new Error(
                      `Battlemaster ${x.ID} has no difficulties `
                    + `registered for its map (${map}). `
                    + `Please add at least one difficulty bracket`
                )
            }
        });
})