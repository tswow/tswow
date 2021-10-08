import { finish, isReadOnly } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { BattlemasterListQuery } from "wotlkdata/dbc/types/BattlemasterList";
import { MapRegistry } from "../Map/Maps";
import { WorldSafeLocRef, WorldSafeLocRegistry } from "../WorldSafeLocs/WorldSafeLocs";
import { BattlegroundBase, createBgBase, filterBgsBase } from "./BattlegroundBase";
import { BattlegroundBrackets } from "./BattlegroundBracket";

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

export class Battleground extends BattlegroundBase {
    get Map() { return MapRegistry.ref(this, this.wrapIndex(this.dbc_row.MapID,0)) }
    get HordeStart() {
        return new BattlegroundSafeLoc(
              this
            , WorldSafeLocRegistry.ref(this, this.sql_row.HordeStartLoc)
            , this.sql_row.HordeStartO
        );
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
        )
        .map(({dbc,sql})=>new Battleground(dbc,sql))
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

finish('bg-worldsafelocs',()=>{
    if(isReadOnly()) return;
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