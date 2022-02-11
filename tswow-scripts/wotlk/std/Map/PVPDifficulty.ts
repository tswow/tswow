import { DBC, sort } from "../../../data/index";
import { CellReadOnly } from "../../../data/cell/cells/CellReadOnly";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { PvpDifficultyRow } from "../../dbc/PvpDifficulty";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { RegistryBase } from "../Refs/RegistryBase";
import { Map } from "./Map";
import { MapRegistry } from "./Maps";

export class PVPDifficulty extends MainEntity<PvpDifficultyRow> {
    get Map() { return MapRegistry.ref(this, this.row.MapID); }

    get Levels() {
        return new MinMaxCell(this, this.row.MinLevel, this.row.MaxLevel)
    }

    get Difficulty() { return this.wrap(this.row.Difficulty); }
    // This should just be sorted by map and level brackets
    //get RangeIndex() { return this.wrap(this.row.RangeIndex); }
    //get ID()
}

export class PVPDifficultyRegistryClass
    extends RegistryBase<PVPDifficulty,PvpDifficultyRow>
{
    protected getAll(): PVPDifficulty[] {
        return DBC.PvpDifficulty.queryAll({}).map(x=>new PVPDifficulty(x))
    }
    protected Entity(r: PvpDifficultyRow): PVPDifficulty {
        return new PVPDifficulty(r);
    }
    ID(e: PVPDifficulty): number {
        return e.row.ID.get();
    }

    create(map: number) {
        return new PVPDifficulty(
            DBC.PvpDifficulty.add(Ids.PvpDifficulty.id())
                .MapID.set(map)
                .MinLevel.set(1)
                .MaxLevel.set(80)
                .Difficulty.set(0)
        )

    }

    createSimple(map: number, minLevel: number, maxLevel: number, difficulty: number) {
        return new PVPDifficulty(
            DBC.PvpDifficulty.add(Ids.PvpDifficulty.id())
                .MapID.set(map)
                .MinLevel.set(minLevel)
                .MaxLevel.set(maxLevel)
                .Difficulty.set(difficulty)
        )
    }
}

export const PVPDifficultyRegistry = new PVPDifficultyRegistryClass();

export class PVPDifficulties extends MultiRowSystem<PVPDifficulty,Map> {
    protected getAllRows(): PVPDifficulty[] {
        return DBC.PvpDifficulty.queryAll({MapID:this.owner.ID})
            .map(x=>new PVPDifficulty(x))
    }
    protected isDeleted(value: PVPDifficulty): boolean {
        return value.isDeleted();
    }

    addGet() {
        if(DBC.MapDifficulty.query({MapID:this.owner.ID}) !== undefined) {
            throw new Error(
                  `Cannot add PVP difficulty to ${this.owner.ID},`
                + ` it already has PVE difficulties`
            )
        }
        return PVPDifficultyRegistry.create(this.owner.ID)
    }

    add(minLevel: number, maxLevel: number, difficulty: number = 0) {
        this.addGet()
            .Levels.set(minLevel,maxLevel)
            .Difficulty.set(difficulty)
        return this.owner;
    }
}

sort('PvpDifficulty',()=>{
    DBC.PvpDifficulty.quickSort((row1,row2)=>{
        let map1 = row1.MapID.get();
        let map2 = row2.MapID.get();
        if(map1 !== map2) {
            return map1 >= map2 ? 1 : -1
        }

        let min1 = row1.MinLevel.get();
        let min2 = row2.MinLevel.get();

        if(min1 !== min2) {
            return min1 >= min2 ? 1 : -1
        }

        let max1 = row1.MaxLevel.get();
        let max2 = row2.MaxLevel.get();

        if(max1 !== max2) {
            return max1 >= max2 ? 1 : -1
        }

        throw new Error(
            `PVPDifficulty: Multiple entries for identical level brackets`
            + ` in map ${map1} and levels ${min1},${max1}`
        )
    });

    let perMap: {[key: number]: PvpDifficultyRow[]} = {}
    DBC.PvpDifficulty.queryAll({})
        .forEach((x,i)=>{
            CellReadOnly.set(x.ID,i+1);
            ((perMap[x.MapID.get()])||(perMap[x.MapID.get()] = []))
                .push(x)
        })
    Object.values(perMap).forEach(x=>x.forEach((y,i)=>y.RangeIndex.set(i)));
});