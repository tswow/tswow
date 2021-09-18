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
import { DBC } from "wotlkdata";
import { MapRow } from "wotlkdata/dbc/types/Map";
import { LFGDungeonEncounters } from "../Dungeon/Encounter";
import { LFGDungeons } from "../Dungeon/LFGDungeon";
import { MainEntity } from "../Misc/Entity";
import { PositionXYCell } from "../Misc/PositionCell";
import { RefReadOnly, RefStatic } from "../Refs/RefOld";
import { MapInstanceType } from "./MapInstanceType";
import { Maps } from "./Maps";
import { MapWorldStateUIs } from "./MapWorldStates";

export class Map extends MainEntity<MapRow> {
    get ID() { return this.row.ID.get(); }
    get Directory() { return this.wrap(this.row.Directory); }
    get InstanceType() { return new MapInstanceType(this, this.row.InstanceType); }

    get Name() { return this.wrapLoc(this.row.MapName); }

    get HordeDescription() { return this.wrapLoc(this.row.MapDescription0); }
    get AllianceDescription() { return this.wrapLoc(this.row.MapDescription1); }

    get LoadingScreen() { return this.wrap(this.row.LoadingScreenID); }
    get MinimapIconScale() { return this.wrap(this.row.MinimapIconScale); }

    get CorpseMap() { return new MapRef(this, this.row.CorpseMapID); }
    get CorpsePos() { return new PositionXYCell(this, this.row.CorpseX, this.row.CorpseY); }
    get TimeofDayOverride() { return this.wrap(this.row.TimeOfDayOverride); }
    get Expansion() { return this.wrap(this.row.ExpansionID); }
    get MaxPlayers() { return this.wrap(this.row.MaxPlayers); }
    get RaidOffset() { return this.wrap(this.row.RaidOffset); }
    get AreaTable() { return this.wrap(this.row.AreaTableID); }


    /**
     * TODO: Unknown flags, all flags on wowdev looks like wod+
     */
    get Flags() { return this.wrap(this.row.Flags); }

    get IsPVP() { return this.wrap(this.row.PVP); }

    get WorldStateUIs() { return new MapWorldStateUIs(this); }

    get LFGDungeons() { return new LFGDungeons(this, this.ID); }
    get Encounters() { return new LFGDungeonEncounters(this, this.ID); }
}

export class MapRefReadOnly<T> extends RefReadOnly<T,Map> {
    getRef(): Map {
        return new Map(DBC.Map.findById(this.cell.get()));
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}

export class MapRef<T> extends RefStatic<T,Map> {
    protected create(mod: string, id: string): Map {
        return new Maps().create(mod,id)
    }
    protected clone(mod: string, id: string): Map {
        return new Maps().create(mod,id,this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Map): number {
        return v.ID;
    }
    protected resolve(): Map {
        return new Maps().load(this.cell.get());
    }
}