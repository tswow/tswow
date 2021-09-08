/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { AreaTableQuery, AreaTableRow } from "wotlkdata/dbc/types/AreaTable";
import { DBC } from "wotlkdata"
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { SoundEntryPointer } from "../Sound/SoundEntry";
import { ZoneMusicRef } from "../Sound/ZoneMusic";
import { AreaWorldStateUIs, AreaWorldStateSounds } from "./AreaWorldStates";
import { MapRef } from "../Map/Map";
import { ZoneIntroMusicRef } from "../Sound/ZoneIntroMusic";
import { AreaFlags } from "./AreaFlags";

export class Area extends MainEntity<AreaTableRow> {
    get ExploreBit() { return this.row.ExploreFlag.get(); }
    get ID() { return this.row.ID.get(); }
    get Map() { return new MapRef(this, this.row.MapID) }
    get ParentArea() { return this.wrap(this.row.ParentAreaID); }
    get Sound() { return new SoundEntryPointer(this, this.row.SoundProviderPref)}
    get SoundUnderwater() { return new SoundEntryPointer(this, this.row.SoundProviderPrefUnderwater)}
    get SoundAmbience() { return new SoundEntryPointer(this, this.row.AmbienceID)}
    get ZoneMusic() { return new ZoneMusicRef(this, this.row.ZoneMusic); }
    get IntroMusic() { return new ZoneIntroMusicRef(this, this.row.ZoneMusic)}
    get ExplorationLevel() { return this.wrap(this.row.ExplorationLevel); }
    get Name() { return this.wrapLoc(this.row.AreaName); }
    get MinElevation() { return this.wrap(this.row.MinElevation); }
    get AmbientMultiplier() { return this.wrap(this.row.Ambient_Multiplier); }
    get Light() { return this.wrap(this.row.Lightid); }
    get WorldStateUIs() { return new AreaWorldStateUIs(this); }
    get WorldStateSounds() { return new AreaWorldStateSounds(this); }
    get Flags() { return new AreaFlags(this, this.row.Flags); }
}

export const AreaRegistry = {
    load(id: number) {
        return new Area(DBC.AreaTable.findById(id))
    },

    create(mod: string, name: string) {
        return new Area(DBC.AreaTable
            .add(Ids.Area.id(mod,name))
                .ExploreFlag.set(Ids.AreaBit.id(mod,name+'_areabit')))
    },

    filter(query: AreaTableQuery) {
        return DBC.AreaTable.filter(query).map(x=>new Area(x));
    },

    find(query: AreaTableQuery) {
        return AreaRegistry.filter(query);
    },
}

export class AreaRef<T> extends RefStatic<T,Area> {
    protected create(mod: string, id: string): Area {
        return AreaRegistry.create(mod,id);
    }
    protected clone(mod: string, id: string): Area {
        return new Area(DBC.AreaTable.findById(this.cell.get())
            .clone(Ids.Area.id(mod,id)))
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Area): number {
        return v.ID;
    }
    protected resolve(): Area {
        return AreaRegistry.load(this.cell.get());
    }
}