import { WMOAreaTableQuery, WMOAreaTableRow } from "wotlkdata/dbc/types/WMOAreaTable";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata"
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { SoundProviderPreferenceRef } from "../Sound/SoundProviderPreferences";
import { AreaRef } from "./Area";
import { SoundAmbienceRef } from "../Sound/SoundAmbience";
import { ZoneMusicRef } from "../Sound/ZoneMusic";
import { ZoneIntroMusicRef } from "../Sound/ZoneIntroMusic";

export class WMOAreaSoundProviderPrefs extends CellSystem<WMOArea> {
    get Normal() {
        return new SoundProviderPreferenceRef(this.owner,
            this.owner.row.SoundProviderPref)
    }

    get Underwater() {
        return new SoundProviderPreferenceRef(this.owner,
            this.owner.row.SoundProviderPrefUnderwater)
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
    get Ambience() { return new SoundAmbienceRef(this, this.row.AmbienceID); }
    get ZoneMusic() { return new ZoneMusicRef(this, this.row.ZoneMusic); }
    get IntroSound() { return new ZoneIntroMusicRef(this, this.row.IntroSound); }
    get AreaTable() { return new AreaRef(this, this.row.AreaTableID); }
    get Name() { return this.wrapLoc(this.row.AreaName); }
}

export const WMOAreaRegistry = {
    create(mod: string, id: string, parent = 0) {
        if(parent != 0) {
            return new WMOArea(DBC.WMOAreaTable
                .find({ID:parent})
                .clone(Ids.WMOAreaTable.id(mod,id))
            )
        } else {
            return new WMOArea(DBC.WMOAreaTable.add(Ids.WMOAreaTable.id(mod,id)))
                .WMO.set(0)
                .NameSet.set(0)
                .Group.set(0)
                .SoundProviderPreferences.Normal.setRefID(0)
                .SoundProviderPreferences.Underwater.setRefID(0)
                .Ambience.setRefID(0)
                .ZoneMusic.setRefID(0)
                .IntroSound.setRefID(0)
                .AreaTable.setRefID(0)
                .Name.clear()
        }
    },

    load(id: number) {
        return new WMOArea(DBC.WMOAreaTable.find({ID:id}))
    },

    filter(query: WMOAreaTableQuery) {
        return DBC.WMOAreaTable
            .filter(query)
            .map(x=>new WMOArea(x))
    },

    find(query: WMOAreaTableQuery) {
        return new WMOArea(DBC.WMOAreaTable.find(query))
    }
}

export class WMOAreaRef<T> extends RefStatic<T,WMOArea> {
    protected create(mod: string, id: string): WMOArea {
        return WMOAreaRegistry.create(mod,id);
    }
    protected clone(mod: string, id: string): WMOArea {
        return WMOAreaRegistry.create(mod,id,this.cell.get());
    }
    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WMOArea): number {
        return v.ID;
    }
    protected resolve(): WMOArea {
        return WMOAreaRegistry.load(this.cell.get())
    }
}