import { ZoneintroMusicTableQuery, ZoneintroMusicTableRow } from "wotlkdata/dbc/types/ZoneintroMusicTable";
import { DBC } from "wotlkdata";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";
import { SoundEntryPointer, SoundEntryRegistry } from "./SoundEntry";

export class ZoneIntroMusic extends MainEntity<ZoneintroMusicTableRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrap(this.row.Name); }
    get Sound() { return new SoundEntryPointer(this, this.row.SoundID); }
    get Priority() { return this.wrap(this.row.Priority); }
    get MinDelayMinutes() { return this.wrap(this.row.MinDelayMinutes); }
}

export const ZoneIntroMusicRegistry = {
    create(
          directoryBase: string = ""
        , songs: string[] = []
        , minDelay: number = 60
        , volume: number = 1
        , frequency: number = 1
    ) {
        let sound = SoundEntryRegistry.create(directoryBase,songs,volume,frequency)
        let zoneMusic = new ZoneIntroMusic(
            DBC.ZoneintroMusicTable
                .add(Ids.ZoneintroMusicTable.id())
        )
        return zoneMusic
            .Name.set(`ZoneIntroMusic-${zoneMusic.ID}`)
            .MinDelayMinutes.set(minDelay)
            .Priority.set(1)
            .Sound.setRefID(sound.row.ID.get())
    },

    load(id: number) {
        return new ZoneIntroMusic(DBC.ZoneintroMusicTable.findById(id))
    },

    filter(query: ZoneintroMusicTableQuery) {
        return DBC.ZoneintroMusicTable
            .filter(query)
            .map(x=>new ZoneIntroMusic(x))
    },

    find(query: ZoneintroMusicTableQuery) {
        return new ZoneIntroMusic(DBC.ZoneintroMusicTable.find(query))
    },
}

export class ZoneIntroMusicRef<T> extends Ref<T,ZoneIntroMusic> {
    protected create(): ZoneIntroMusic {
        return ZoneIntroMusicRegistry.create()
    }
    protected clone(): ZoneIntroMusic {
        return new ZoneIntroMusic(
            DBC.ZoneintroMusicTable.findById(this.cell.get())
                .clone(Ids.ZoneintroMusicTable.id())
        );
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: ZoneIntroMusic): number {
        return v.ID;
    }
    protected resolve(): ZoneIntroMusic {
        return ZoneIntroMusicRegistry.load(this.cell.get());
    }

    setSimple(
        directoryBase: string
      , songs: string[]
      , minDelay: number = 60
      , volume: number = 1
      , frequency: number = 1
    ) {
        this.setRefID(
            ZoneIntroMusicRegistry.create(
                    directoryBase
                , songs
                , minDelay
                , volume
                , frequency
                ).ID);
        return this.owner;
    }
}