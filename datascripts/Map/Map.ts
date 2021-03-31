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
import { MapRow } from "wotlkdata/dbc/types/Map";
import { MainEntity } from "../Base/MainEntity";
import { XYCell } from "../Misc/XYCell";
import { MapInstanceType } from "./MapInstanceType";

export class Map extends MainEntity<MapRow> {
    get ID() { return this.row.ID.get(); }
    get Directory() { return this.wrap(this.row.Directory); }
    get InstanceType() { return new MapInstanceType(this, this.row.InstanceType); }

    get Name() { return this.wrapLoc(this.row.MapName); }

    get HordeDescription() { return this.wrapLoc(this.row.MapDescription0); }
    get AllianceDescription() { return this.wrapLoc(this.row.MapDescription1); }

    get LoadingScreen() { return this.wrap(this.row.LoadingScreenID); }
    get MinimapIconScale() { return this.wrap(this.row.MinimapIconScale); }

    get CorpseMapID() { return this.wrap(this.row.CorpseMapID); }
    get CorpsePos() { return new XYCell(this, this.row.CorpseX, this.row.CorpseY); }
    get TimeofDayOverride() { return this.wrap(this.row.TimeOfDayOverride); }
    get ExpansionID() { return this.wrap(this.row.ExpansionID); }
    get MaxPlayers() { return this.wrap(this.row.MaxPlayers); }
    get RaidOffset() { return this.wrap(this.row.RaidOffset); }
    get AreaTable() { return this.wrap(this.row.AreaTableID); }


    /**
     * TODO: Unknown flags, all flags on wowdev looks like wod+
     */
    get Flags() { return this.wrap(this.row.Flags); }

    get IsPVP() { return this.wrap(this.row.PVP); }
}