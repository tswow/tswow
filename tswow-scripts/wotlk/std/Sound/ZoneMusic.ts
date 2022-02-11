import { DBC } from "../../DBCFiles";
import { Cell } from "../../../data/cell/cells/Cell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { ZoneMusicQuery, ZoneMusicRow } from "../../dbc/ZoneMusic";
import { Table } from "../../../data/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
import { SoundEntryRegistry } from "./SoundEntry";

export class ZoneMusicEntry extends CellSystem<ZoneMusic> {
    @Transient
    private index: number;

    constructor(owner: ZoneMusic, index: number) {
        super(owner);
        this.index = index;
    }

    get SilenceIntervalMin() {
        return this.ownerWrapIndex(this.owner.row.SilenceintervalMin,this.index)
    }
    get SilenceIntervalMax() {
        return this.ownerWrapIndex(this.owner.row.SilenceintervalMax,this.index)
    }
    get Sound() {
        return SoundEntryRegistry.ref(this.owner,this.ownerWrapIndex(this.owner.row.Sounds,this.index));
    }
}

export class ZoneMusic extends CellSystemTop {
    @Transient
    readonly row: ZoneMusicRow;

    constructor(row : ZoneMusicRow) {
        super();
        this.row = row;
    }

    get ID() { return this.row.ID.get(); }
    get SoundDay() { return new ZoneMusicEntry(this,0); }
    get SoundNight() { return new ZoneMusicEntry(this,1); }
    get SetName() { return this.wrap(this.row.SetName); }
}

export class ZoneMusicRef<T> extends RefStatic<T,ZoneMusic> {
    setSimple
    (
          directoryBase = ""
        , songs: string[] = []
        , silenceMin = 0
        , silenceMax = 0
        , volume = 1
        , frequency = 1
    ) {
        let music = ZoneMusicRegistry
            .createSimple(
                  directoryBase
                , songs
                , silenceMin
                , silenceMax
                , volume
                , frequency
                )
        this.cell.set(music.ID)
        return this.owner;
    }
}

export class ZoneMusicRegistryClass
    extends RegistryStatic<ZoneMusic,ZoneMusicRow,ZoneMusicQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>): ZoneMusicRef<T> {
        return new ZoneMusicRef(owner,cell,this);
    }

    protected Table(): Table<any, ZoneMusicQuery, ZoneMusicRow> & { add: (id: number) => ZoneMusicRow; } {
        return DBC.ZoneMusic
    }
    protected IDs(): StaticIDGenerator {
        return Ids.ZoneMusic
    }
    Clear(r: ZoneMusic): void {
        r.SetName.set('')
         .SoundDay.SilenceIntervalMax.set(0)
         .SoundDay.SilenceIntervalMin.set(0)
         .SoundDay.Sound.set(0)
         .SoundNight.SilenceIntervalMin.set(0)
         .SoundNight.SilenceIntervalMax.set(0)
    }
    protected Entity(r: ZoneMusicRow): ZoneMusic {
        return new ZoneMusic(r);
    }
    protected FindByID(id: number): ZoneMusicRow {
        return DBC.ZoneMusic.findById(id);
    }
    protected EmptyQuery(): ZoneMusicQuery {
        return {}
    }
    ID(e: ZoneMusic): number {
        return e.ID;
    }

    createSimple
    (
          directoryBase = ""
        , songs: string[] = []
        , silenceMin = 0
        , silenceMax = 0
        , volume = 1
        , frequency = 1
    ) {
        let sound = SoundEntryRegistry
        .createSimpleLoop(directoryBase,songs,volume,frequency)
        let zoneMusic =
            new ZoneMusic(DBC.ZoneMusic.add(Ids.ZoneMusic.dynamicId()))
        return zoneMusic
            .SetName.set(`ZoneMusic-${zoneMusic.ID}`)
            .SoundDay.SilenceIntervalMin.set(silenceMin)
            .SoundDay.SilenceIntervalMax.set(silenceMax)
            .SoundNight.SilenceIntervalMin.set(silenceMin)
            .SoundNight.SilenceIntervalMax.set(silenceMax)
            .SoundDay.Sound.set(sound.row.ID.get())
            .SoundNight.Sound.set(sound.row.ID.get());
    }
}
export const ZoneMusicRegistry = new ZoneMusicRegistryClass();