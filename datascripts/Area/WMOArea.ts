import { DBC } from "wotlkdata";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { WMOAreaTableQuery, WMOAreaTableRow } from "wotlkdata/wotlkdata/dbc/types/WMOAreaTable";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SoundAmbienceRegistry } from "../Sound/SoundAmbience";
import { SoundProviderPreferenceRegistry } from "../Sound/SoundProviderPreferences";
import { ZoneIntroMusicRegistry } from "../Sound/ZoneIntroMusic";
import { ZoneMusicRegistry } from "../Sound/ZoneMusic";
import { AreaRegistry } from "./Area";

export class WMOAreaSoundProviderPrefs extends CellSystem<WMOArea> {
    get Normal() {
        return SoundProviderPreferenceRegistry
            .ref(this.owner, this.owner.row.SoundProviderPref)
    }

    get Underwater() {
        return SoundProviderPreferenceRegistry
            .ref(this.owner, this.owner.row.SoundProviderPref)
    }
}

export class WMOArea extends MainEntity<WMOAreaTableRow> {
    get ID() { return this.row.ID.get(); }
    get WMO() { return this.wrap(this.row.WMOID); }
    get NameSet() { return this.wrap(this.row.NameSetID); }
    get Group() { return this.wrap(this.row.WMOGroupID); }
    get SoundProviderPreferences() {
        return new WMOAreaSoundProviderPrefs(this);
    }
    get Ambience() { return SoundAmbienceRegistry.ref(this, this.row.AmbienceID); }
    get ZoneMusic() { return ZoneMusicRegistry.ref(this, this.row.ZoneMusic); }
    get IntroSound() { return ZoneIntroMusicRegistry.ref(this, this.row.IntroSound); }
    get AreaTable() { return AreaRegistry.ref(this, this.row.AreaTableID); }
    get Name() { return this.wrapLoc(this.row.AreaName); }
}

export class WMOAreaRegistryClass
    extends RegistryStaticNoClone<WMOArea,WMOAreaTableRow,WMOAreaTableQuery>
{
    protected Table(): Table<any, WMOAreaTableQuery, WMOAreaTableRow> & { add: (id: number) => WMOAreaTableRow; } {
        return DBC.WMOAreaTable
    }
    protected IDs(): StaticIDGenerator {
        return Ids.WMOAreaTable
    }
    Clear(r: WMOArea): void {
        r.Ambience.set(0)
         .AreaTable.set(0)
         .Group.set(0)
         .IntroSound.set(0)
         .Name.clear()
         .NameSet.set(0)
         .SoundProviderPreferences.Normal.set(0)
         .SoundProviderPreferences.Underwater.set(0)
         .WMO.set(0)
         .ZoneMusic.set(0)
    }
    protected FindByID(id: number): WMOAreaTableRow {
        return DBC.WMOAreaTable.query({ID:id});
    }
    protected EmptyQuery(): WMOAreaTableQuery {
        return {}
    }
    ID(e: WMOArea): number {
        return e.ID
    }
    protected Entity(r: WMOAreaTableRow): WMOArea {
        return new WMOArea(r);
    }
}

export const WMOAreaRegistry = new WMOAreaRegistryClass();