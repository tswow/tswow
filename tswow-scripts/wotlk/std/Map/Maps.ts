import { DBC } from "wotlkdata";
import { MapQuery, MapRow } from "wotlkdata/wotlkdata/dbc/types/Map";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { Map } from "./Map";

export class MapRegistryClass
    extends RegistryStaticNoClone<Map,MapRow,MapQuery>
{
    // map 0 is a real map
    protected nullID = ()=>-1;

    protected Table(): Table<any, MapQuery, MapRow> & { add: (id: number) => MapRow; } {
        return DBC.Map
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Map
    }
    Clear(r: Map): void{
        r.Type.PLAIN.set()
        .AllianceDescription.clear()
        .AreaTable.set(0)
        .CorpseMap.set(-1)
        .CorpsePos.setSpread(0,0)
        .Directory.set('')
        .Expansion.set(0)
        .Flags.set(0)
        .HordeDescription.clear()
        .LoadingScreen.set(0)
        .MaxPlayers.set(0)
        .MinimapIconScale.set(0)
        .Name.clear()
        .RaidOffset.set(0)
        .TimeofDayOverride.set(-1)
        .row.PVP.set(0)
    }
    protected Entity(r: MapRow): Map {
        return new Map(r);
    }
    protected FindByID(id: number): MapRow {
        return DBC.Map.findById(id);
    }
    protected EmptyQuery(): MapQuery {
        return {}
    }
    ID(e: Map): number {
        return e.ID;
    }

    createBattleground(mod: string, id: string) {
        return this.create(mod,id)
            .Type.BATTLEGROUND.set(mod,`${id}-battleground`)
    }

    createArena(mod: string, id: string) {
        return this.create(mod,id)
            .Type.ARENA.set(mod,`${id}-arena`)
    }

    createDungeon(mod: string, id: string) {
        return this.create(mod,id)
            .Type.DUNGEON.set(mod,`${id}-dungeon`)
    }

    createRaid(mod: string, id: string) {
        return this.create(mod,id)
            .Type.RAID.set(mod,`${id}-raid`)
    }
}

export const MapRegistry = new MapRegistryClass();