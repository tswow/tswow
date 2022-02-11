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
import { DBC } from "../../DBCFiles";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { AreaTableQuery, AreaTableRow } from "../../dbc/AreaTable";
import { Table } from "../../../data/table/Table";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SoundAmbienceRegistry } from "../Sound/SoundAmbience";
import { SoundProviderPreferenceRegistry } from "../Sound/SoundProviderPreferences";
import { ZoneIntroMusicRegistry } from "../Sound/ZoneIntroMusic";
import { ZoneMusicRegistry } from "../Sound/ZoneMusic";
import { AreaFishingSkill } from "./AreaFishingSkill";
import { AreaFlags } from "./AreaFlags";
import { AreaWorldStateSounds, AreaWorldStateUIs } from "./AreaWorldStates";

export class AreaSoundProviderPreferences extends CellSystem<Area> {
    get Normal() {
        return SoundProviderPreferenceRegistry
            .ref(this.owner, this.owner.row.SoundProviderPref)
    }
    get Underwater() {
        return SoundProviderPreferenceRegistry
            .ref(this.owner, this.owner.row.SoundProviderPrefUnderwater)
    }
}

export class Area extends MainEntity<AreaTableRow> {
    get ExploreBit() { return this.row.ExploreFlag.get(); }
    get ID() { return this.row.ID.get(); }
    get Map() { return MapRegistry.ref(this, this.row.MapID) }
    get ParentArea() { return this.wrap(this.row.ParentAreaID); }
    get SoundProviderPreferences() { return new AreaSoundProviderPreferences(this); }
    get SoundAmbience() {
        return SoundAmbienceRegistry.ref(this, this.row.AmbienceID)
    }
    get ZoneMusic() {
        return ZoneMusicRegistry.ref(this, this.row.ZoneMusic);
    }
    get IntroMusic() {
        return ZoneIntroMusicRegistry.ref(this, this.row.IntroSound)
    }
    get ExplorationLevel() { return this.wrap(this.row.ExplorationLevel); }
    get Name() { return this.wrapLoc(this.row.AreaName); }
    get MinElevation() { return this.wrap(this.row.MinElevation); }
    get AmbientMultiplier() { return this.wrap(this.row.Ambient_Multiplier); }
    get Light() { return this.wrap(this.row.Lightid); }
    get WorldStateUIs() { return new AreaWorldStateUIs(this); }
    get WorldStateSounds() { return new AreaWorldStateSounds(this); }
    get Flags() {
        return makeMaskCell32(AreaFlags, this, this.row.Flags);
    }
    get Children() { return new AreaChildren(this); }
    get Fishing() { return new AreaFishingSkill(this); }
}

export class AreaChildren extends MultiRowSystem<Area,Area> {
    protected getAllRows(): Area[] {
        return AreaRegistry.queryAll({ParentAreaID:this.owner.ID})
    }
    protected isDeleted(value: Area): boolean {
        return value.row.isDeleted()
    }

    protected recurse(curDepth = 1, cur: Area[]) {
        let nxt = (super.get().filter(x=>!cur.find(y=>y.ID===x.ID)));
        cur = cur.concat(nxt);
        if(curDepth !== 1) {
            nxt.forEach(x=>cur = x.Children.recurse(curDepth-1,cur));
        };
        return cur;
    }

    get(depth = 1) {
        return this.recurse(depth,[]);
    }
}

export const registeredAreas: {[key: string]: number} = {}
export class AreaRegistryClass
    extends RegistryStaticNoClone<Area,AreaTableRow,AreaTableQuery>
{
    protected Table(): Table<any, AreaTableQuery, AreaTableRow> & { add: (id: number) => AreaTableRow; } {
        return DBC.AreaTable
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Area
    }
    Clear(r: Area, mod: string, id: string): void {
        registeredAreas[`${mod}:${id}`] = r.ID
        r.row.ExploreFlag.set(Ids.AreaBit.id(mod,`${id}-bit`))
            .AmbienceID.set(0)
            .Ambient_Multiplier.set(0)
            .AreaName.clear()
            .ExplorationLevel.set(0)
            .FactionGroupMask.set(0)
            .Flags.set(0)
            .IntroSound.set(0)
            .Lightid.set(0)
            .LiquidTypeID.fill(0)
            .MapID.set(0)
            .MinElevation.set(0)
            .ParentAreaID.set(0)
            .SoundProviderPref.set(0)
            .SoundProviderPrefUnderwater.set(0)
            .ZoneMusic.set(0)
    }
    protected Entity(r: AreaTableRow): Area {
        return new Area(r);
    }
    protected FindByID(id: number): AreaTableRow {
        return DBC.AreaTable.findById(id);
    }
    protected EmptyQuery(): AreaTableQuery {
        return {}
    }
    ID(e: Area): number {
        return e.ID;
    }
}
export const AreaRegistry = new AreaRegistryClass();