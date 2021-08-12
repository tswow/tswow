import { CellSystem, CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { ZoneMusicRow } from "wotlkdata/dbc/types/ZoneMusic";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SoundEntryPointer, SoundEntryRegistry } from "./SoundEntry";
import { DBC } from "wotlkdata"
import { Ids } from "../Misc/Ids";
import { Pointer } from "../Refs/Pointer";

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
        return new SoundEntryPointer(this.owner,this.ownerWrapIndex(this.owner.row.Sounds,this.index));
    }
}

export class ZoneMusicPointer<T> extends Pointer<T,ZoneMusic> {
    protected exists(): boolean {
        return this.cell.get() > 0;
    }

    protected create(): ZoneMusic {
        return ZoneMusicRegistry.create()
    }

    protected clone(): ZoneMusic {
        return new ZoneMusic(this.resolve().row.clone(Ids.ZoneMusic.id()));
    }

    protected id(v: ZoneMusic): number {
        return v.ID;
    }
    protected resolve(): ZoneMusic {
        return ZoneMusicRegistry.load(this.cell.get());
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

export const ZoneMusicRegistry = {
    create() {
        return new ZoneMusic(DBC.ZoneMusic.add(Ids.ZoneMusic.id()));
    },

    createSimple(directoryBase: string, songs: string[], silenceIntervalMin: number = 0, silenceIntervalMax: number = 0, volume: number = 1, frequency: number = 1) {
        let sound = SoundEntryRegistry.createSimple(directoryBase,songs,volume,frequency)
        let zoneMusic = new ZoneMusic(DBC.ZoneMusic.add(Ids.ZoneMusic.id()))
        return zoneMusic
            .SetName.set(`ZoneMusic-${zoneMusic.ID}`)
            .SoundDay.SilenceIntervalMin.set(silenceIntervalMin)
            .SoundDay.SilenceIntervalMax.set(silenceIntervalMax)
            .SoundNight.SilenceIntervalMin.set(silenceIntervalMin)
            .SoundNight.SilenceIntervalMax.set(silenceIntervalMax)
            .SoundDay.Sound.set(sound.row.ID.get())
            .SoundNight.Sound.set(sound.row.ID.get());
    },

    load(id: number) {
        return new ZoneMusic(DBC.ZoneMusic.findById(id));
    }
}