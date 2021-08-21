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
import { AreaTableRow } from "wotlkdata/dbc/types/AreaTable";
import { MainEntity } from "../Misc/Entity";
import { SoundEntryPointer } from "../Sound/SoundEntry";
import { ZoneMusicPointer } from "../Sound/ZoneMusic";

export class Area extends MainEntity<AreaTableRow> {
    get ExploreBit() { return this.row.ExploreFlag.get(); }
    get ID() { return this.row.ID.get(); }
    get MapID() { return this.wrap(this.row.MapID); }
    get ParentArea() { return this.wrap(this.row.ParentAreaID); }
    get Sound() { return new SoundEntryPointer(this, this.row.SoundProviderPref)}
    get SoundUnderwater() { return new SoundEntryPointer(this, this.row.SoundProviderPrefUnderwater)}
    get SoundAmbience() { return new SoundEntryPointer(this, this.row.AmbienceID)}
    get ZoneMusic() { return new ZoneMusicPointer(this, this.row.ZoneMusic); }
    get IntroMusic() { return this.wrap(this.row.IntroSound)}
    get ExplorationLevel() { return this.wrap(this.row.ExplorationLevel); }
    get Name() { return this.wrapLoc(this.row.AreaName); }
    get MinElevation() { return this.wrap(this.row.MinElevation); }
    get AmbientMultiplier() { return this.wrap(this.row.Ambient_Multiplier); }
    get Light() { return this.wrap(this.row.Lightid); }
}