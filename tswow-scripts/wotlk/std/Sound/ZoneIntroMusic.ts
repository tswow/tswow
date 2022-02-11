import { DBC } from "../../DBCFiles";
import { Cell } from "../../../data/cell/cells/Cell";
import { ZoneintroMusicTableQuery, ZoneintroMusicTableRow } from "../../dbc/ZoneintroMusicTable";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "./SoundEntry";

export class ZoneIntroMusic extends MainEntity<ZoneintroMusicTableRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrap(this.row.Name); }
    get Sound() { return SoundEntryRegistry.ref(this, this.row.SoundID); }
    get Priority() { return this.wrap(this.row.Priority); }
    get MinDelayMinutes() { return this.wrap(this.row.MinDelayMinutes); }
}

export class ZoneIntroMusicRef<T> extends RefDynamic<T,ZoneIntroMusic>
{
    createSimple(
        directoryBase: string = ""
      , songs: string[] = []
      , minDelay: number = 60
      , volume: number = 1
      , frequency: number = 1
    ) {
        let music = ZoneIntroMusicRegistry
            .createSimple(directoryBase,songs,minDelay,volume,frequency);
        this.cell.set(music.ID)
        return this.owner;
    }
}

export class ZoneIntroMusicRegistryClass
    extends RegistryDynamic<
                  ZoneIntroMusic
                , ZoneintroMusicTableRow
                , ZoneintroMusicTableQuery
            >
{
    ref<T>(owner:T, cell: Cell<number,any>): ZoneIntroMusicRef<T> {
        return new ZoneIntroMusicRef(owner,cell,this);
    }

    protected Table(): Table<any, ZoneintroMusicTableQuery, ZoneintroMusicTableRow> & { add: (id: number) => ZoneintroMusicTableRow; } {
        return DBC.ZoneintroMusicTable;
    }
    protected ids(): DynamicIDGenerator {
        return Ids.ZoneintroMusicTable
    }
    Clear(entity: ZoneIntroMusic): void {
        entity.MinDelayMinutes.set(0)
            .Name.set('')
            .Priority.set(0)
            .Sound.set(0)
    }
    protected Entity(r: ZoneintroMusicTableRow): ZoneIntroMusic {
        return new ZoneIntroMusic(r);
    }
    protected FindByID(id: number): ZoneintroMusicTableRow {
        return DBC.ZoneintroMusicTable.findById(id);
    }
    protected EmptyQuery(): ZoneintroMusicTableQuery {
        return {}
    }
    ID(e: ZoneIntroMusic): number {
        return e.ID;
    }

    createSimple(
        directoryBase: string = ""
      , songs: string[] = []
      , minDelay: number = 60
      , volume: number = 1
      , frequency: number = 1
    ) {
        let sound = SoundEntryRegistry
            .createSimple(directoryBase,songs,volume,frequency)
        let introMusic = this.create()
        introMusic
            .Name.set(`ZoneIntroMusic-${introMusic.ID}`)
            .MinDelayMinutes.set(minDelay)
            .Priority.set(1)
            .Sound.set(sound.ID)
        return introMusic;
    }
}

export const ZoneIntroMusicRegistry = new ZoneIntroMusicRegistryClass();

export const ZoneIntroMusicRegistryold = {
    create(
          directoryBase: string = ""
        , songs: string[] = []
        , minDelay: number = 60
        , volume: number = 1
        , frequency: number = 1
    ) {
        let sound = SoundEntryRegistry
            .createSimple(directoryBase,songs,volume,frequency)
        let zoneMusic = new ZoneIntroMusic(
            DBC.ZoneintroMusicTable
                .add(Ids.ZoneintroMusicTable.id())
        )
        return zoneMusic
            .Name.set(`ZoneIntroMusic-${zoneMusic.ID}`)
            .MinDelayMinutes.set(minDelay)
            .Priority.set(1)
            .Sound.set(sound.row.ID.get())
    },

    load(id: number) {
        return new ZoneIntroMusic(DBC.ZoneintroMusicTable.findById(id))
    },

    filter(query: ZoneintroMusicTableQuery) {
        return DBC.ZoneintroMusicTable
            .queryAll(query)
            .map(x=>new ZoneIntroMusic(x))
    },

    find(query: ZoneintroMusicTableQuery) {
        return new ZoneIntroMusic(DBC.ZoneintroMusicTable.query(query))
    },
}