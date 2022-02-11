import { DBC } from "wotlkdata";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { MapDifficultyQuery, MapDifficultyRow } from "wotlkdata/wotlkdata/dbc/types/MapDifficulty";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { AccessRequirement, AccessRequirementRegistry } from "../AccessRequirement/AccessRequirement";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { DungeonMap } from "./Map";
import { MapRegistry } from "./Maps";

// todo: not at all sure this is 100% correct

export const DUNGEON_DIFFICULTY_STRINGS = [
      'DUNGEON_DIFFICULTY_5PLAYER'
    , 'DUNGEON_DIFFICULTY_5PLAYER_HEROIC'
    , 'RAID_DIFFICULTY_10PLAYER'
    , 'RAID_DIFFICULTY_25PLAYER'
    , 'RAID_DIFFICULTY_40PLAYER'
    , ''
] as const

export type DungeonDifficultyString = typeof DUNGEON_DIFFICULTY_STRINGS[number]
export type DifficultyType = 'NORMAL'|'HEROIC'

class Diff {
    difficultyValue: number;
    playerCount: number;
    difficultyString: DungeonDifficultyString;
    type: DifficultyType
    defaultLockout: number

    constructor(
          difficultyValue: number
        , playerCount: number
        , difficultyString: DungeonDifficultyString
        , type: DifficultyType
        , defaultLockout: number
    ) {
        this.difficultyValue = difficultyValue;
        this.playerCount = playerCount;
        this.difficultyString = difficultyString;
        this.type = type
        this.defaultLockout = defaultLockout;
    }

    apply(row: MapDifficultyRow) {
        row.Difficulty.set(this.difficultyValue);
        row.MaxPlayers.set(this.playerCount)
        row.Difficultystring.set(this.difficultyString);
        row.RaidDuration.set(this.defaultLockout);
    }

    is(row: MapDifficultyRow) {
        return row.Difficulty.get() === this.difficultyValue
            && row.MaxPlayers.get() === this.playerCount
    }
}

const DIFFICULTY_VALUES: Diff[] = [
    // 5 man
      new Diff(0,5,'DUNGEON_DIFFICULTY_5PLAYER', 'NORMAL', 0)
    , new Diff(1,5,'DUNGEON_DIFFICULTY_5PLAYER_HEROIC', 'HEROIC',86400)

    // 10 man
    , new Diff(0,10,'RAID_DIFFICULTY_10PLAYER', 'NORMAL', 604800)
    , new Diff(2,10,'RAID_DIFFICULTY_10PLAYER', 'HEROIC', 604800)

    // 25 man
    , new Diff(1,25,'RAID_DIFFICULTY_25PLAYER', 'NORMAL', 604800)
    , new Diff(3,25,'RAID_DIFFICULTY_25PLAYER', 'HEROIC', 604800)

    // 40 man
    , new Diff(0, 40,'', 'NORMAL', 604800)
]

interface DifficultySearch {
    type?: DifficultyType
    playerCount?: number
    value?: number
}

function findDiff(search: DifficultySearch) {
    let values = DIFFICULTY_VALUES.filter(x=>
           (search.type === undefined
                || x.type === search.type)
        && (search.playerCount === undefined
                || x.playerCount === search.playerCount)
        && (search.value === undefined
                || x.difficultyValue === search.value)
    );

    if(values.length === 0) {
        throw new Error(
            `No valid difficulty found matching ${JSON.stringify(search)}`
        )
    }

    if(values.length > 1) {
        throw new Error(
            `Multiple valid difficulties found matching ${JSON.stringify(search)}`
        )
    }

    return values[0];
}


export class PVEDifficultyEnumValue extends CellSystem<PVEDifficulty> {
    protected type: DifficultyType

    constructor(owner: PVEDifficulty, type: DifficultyType) {
        super(owner);
        this.type = type;
    }

    is() {
        return DIFFICULTY_VALUES.find(x=>x.is(this.owner.row))?.type
            === this.type
    }

    set() {
        findDiff({
              playerCount:this.owner.row.MaxPlayers.get()
            , value: this.owner.row.Difficulty.get()
        }).apply(this.owner.row);
        return this.owner;
    }
}

export class PVEDifficultyEnum extends CellSystem<PVEDifficulty> {
    get Normal() { return new PVEDifficultyEnumValue(this.owner, 'NORMAL')}
    get Heroic() { return new PVEDifficultyEnumValue(this.owner, 'HEROIC')}
}


export class PVEDifficulty extends MainEntity<MapDifficultyRow> {
    get ID() { return this.row.ID.get(); }
    get Difficulty () { return new PVEDifficultyEnum(this); }
    get Map() { return MapRegistry.ref(this, this.row.MapID); }
    get MaxPlayers() {
        return new CellBasic(this,
            ()=>{
                return this.row.MaxPlayers.get()
            }
            ,
            (count)=>{
                let type: DifficultyType =
                      this.Difficulty.Heroic.is() ? 'HEROIC'
                    : this.Difficulty.Normal.is() ? 'NORMAL'
                    : (()=>{
                        throw new Error(
                            `Corrupt map difficulty: neither normal nor heroic`
                        )
                    })()
                findDiff({playerCount: count, type}).apply(this.row);
            }
        );
    }
    get ErrorMessage() { return this.wrapLoc(this.row.Message); }
    get ResetDuration() { return this.wrap(this.row.RaidDuration); }

    get Requirements() {
        return new AccessRequirement(
            this
          , AccessRequirementRegistry.get(
                this.Map.get()
              , this.row.Difficulty.get()
          )
          .row
      )
    }
}

export class PVEDifficultyRegistryClass extends
    RegistryStatic<PVEDifficulty,MapDifficultyRow,MapDifficultyQuery>
{
    protected Table(): Table<any, MapDifficultyQuery, MapDifficultyRow> & { add: (id: number) => MapDifficultyRow; } {
        return DBC.MapDifficulty
    }
    protected IDs(): StaticIDGenerator {
        return Ids.MapDifficulty
    }
    Clear(mapdifficulty: PVEDifficulty, mod: string, id: string): void {
        // operate on row to bootstrap past traps to valid difficulty
        mapdifficulty.row
                .MapID.set(-1)
                .MaxPlayers.set(5)
                .Difficulty.set(0)
                .Message.clear()
                .RaidDuration.set(0)
                .Difficultystring.set('')
    }
    protected FindByID(id: number): MapDifficultyRow {
        return DBC.MapDifficulty.query({ID:id})
    }
    ID(e: PVEDifficulty): number {
        return e.ID
    }
    protected EmptyQuery(): MapDifficultyQuery {
        return {}
    }
    protected Entity(r: MapDifficultyRow): PVEDifficulty {
        return new PVEDifficulty(r);
    }
}

export const PVEDifficultyRegistry = new PVEDifficultyRegistryClass()

export class PVEDifficulties extends MultiRowSystem<PVEDifficulty,DungeonMap> {
    protected getAllRows(): PVEDifficulty[] {
        return DBC.MapDifficulty
            .queryAll({MapID:this.owner.ID})
            .map(x=> new PVEDifficulty(x))
    }
    protected isDeleted(value: PVEDifficulty): boolean {
        return value.row.isDeleted()
    }

    addGet(mod: string, id: string) {
        if(DBC.PvpDifficulty.query({MapID:this.owner.ID}) !== undefined) {
            throw new Error(
                `Cannot add PVE difficulty to ${this.owner.ID},`
              + ` it already has PVP difficulties`
            )
        }
        return PVEDifficultyRegistry.create(mod,id)
            .Map.set(this.owner.ID)
            .Difficulty.Normal.set()
            .MaxPlayers.set(5)
    }

    addMod(mod: string, id: string, callback: (difficulty: PVEDifficulty)=>void) {
        callback(this.addGet(mod,id))
        return this.owner;
    }

    add(mod: string, id: string, playerCount: number, difficulty: DifficultyType, lockout?: number) {
        const md = this.addGet(mod,id);
        let type = DIFFICULTY_VALUES
            .find(x=>x.playerCount === playerCount && x.type === difficulty)
        type?.apply(md.row);
        if(lockout !== undefined) {
            md.ResetDuration.set(lockout);
        }
        return this.owner;
    }
}