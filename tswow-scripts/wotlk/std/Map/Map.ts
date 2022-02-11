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
import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { MulticastCell } from "../../../data/cell/cells/MulticastCell";
import { CellSystem, LocSystem, MulticastLocCell } from "../../../data/cell/systems/CellSystem";
import { finish } from "../../../data/index";
import { BattlemasterListRow } from "../../dbc/BattlemasterList";
import { MapRow } from "../../dbc/Map";
import { DBC } from "../../DBCFiles";
import { battleground_templateRow } from "../../sql/battleground_template";
import { instance_addonRow } from "../../sql/instance_addon";
import { instance_templateRow } from "../../sql/instance_template";
import { SQL } from "../../SQLFiles";
import { createBgBase } from "../Battleground/BattlegroundBase";
import { BattlegroundBrackets } from "../Battleground/BattlegroundBracket";
import { BattlegroundSafeLoc } from "../Battleground/BattlegroundSafeLocs";
import { BattlegroundDescription } from "../Battleground/BattleroundDescriptions";
import { LFGDungeons } from "../Dungeon/LFGDungeon";
import { LFGDungeonEncounters } from "../Dungeon/LFGEncounter";
import { getInlineID } from "../InlineScript/InlineScript";
import { BoolCell } from "../Misc/BoolCell";
import { TransformedEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { WorldSafeLocRegistry } from "../WorldSafeLocs/WorldSafeLocs";
import { LoadingScreens } from "./LoadingScreen";
import { MapADT } from "./MapADT";
import { MapBossBoundaries } from "./MapBossBoundary";
import { CUSTOM_SCRIPT_NAME, MapInstanceScriptCell } from "./MapInstance";
import { MapInstanceType } from "./MapInstanceType";
import { MapRegistry } from "./Maps";
import { MapWorldStateUIs } from "./MapWorldStates";
import { PVEDifficulties } from "./PVEDifficulty";

export class Map extends TransformedEntity<MapRow,MapPlain> {
    protected transformer(): EnumCellTransform<any> {
        return new MapInstanceTypee(this, this.row.InstanceType)
    }
    protected default(): MapPlain {
        return new MapPlain(this.row);
    }

    get ID() { return this.row.ID.get(); }

    /**
     * @note changing this will automatically update the AreaName
     * of any WorldMapArea connected to this Map via a
     * WorldMapContinent entry.
     */
    get Directory() { return this.wrap(this.row.Directory); }

    get Type() { return new MapInstanceTypee(this, this.row.InstanceType)}

    get Name(): LocSystem<this> {
        return this.wrapLoc(this.row.MapName);
    }

    get HordeDescription() { return this.wrapLoc(this.row.MapDescription0); }
    get AllianceDescription() { return this.wrapLoc(this.row.MapDescription1); }

    get LoadingScreen() {
        return LoadingScreens.ref(this, this.row.LoadingScreenID);
    }
    get MinimapIconScale() { return this.wrap(this.row.MinimapIconScale); }

    get CorpseMap() { return MapRegistry.ref(this, this.row.CorpseMapID); }
    get CorpsePos() { return new PositionXYCell(this, this.row.CorpseX, this.row.CorpseY); }
    get TimeofDayOverride() { return this.wrap(this.row.TimeOfDayOverride); }
    get Expansion() { return this.wrap(this.row.ExpansionID); }
    get MaxPlayers() { return this.wrap(this.row.MaxPlayers); }
    get RaidOffset() { return this.wrap(this.row.RaidOffset); }
    get AreaTable() { return this.wrap(this.row.AreaTableID); }
    get Tiles() { return new MapADT(this); }

    /**
     * TODO: Unknown flags, all flags on wowdev looks like wod+
     */
    get Flags() { return this.wrap(this.row.Flags); }

    get WorldStateUIs() { return new MapWorldStateUIs(this); }

    get Encounters() { return new LFGDungeonEncounters(this, this.ID); }

    get InlineScripts() {
        return getInlineID(
              this
            , this.ID
            , 'MapID'
        ) as _hidden.Maps<this>
    }
}

export class MapPlain extends Map {}

export class BattlegroundMap extends Map {
    protected bg_dbc: BattlemasterListRow;
    protected bg_sql: battleground_templateRow;

    constructor(
          row: MapRow
        , bgDbc: BattlemasterListRow
        , bgSql: battleground_templateRow
    ) {
        super(row)
        this.bg_dbc = bgDbc
        this.bg_sql = bgSql
    }

    get Name() {
        return new MulticastLocCell(
              this
            , [this.row.MapName,this.bg_dbc.Name]
        )
    }

    get Description() {
        return new BattlegroundDescription(this, this.bg_sql.ID);
    }

    get BattlegroundID() {
        return this.bg_sql.ID.get();
    }

    get HolidayWorldstate() {
        return this.wrap(this.bg_dbc.HolidayWorldState);
    }

    get Level() {
        return new MinMaxCell(this,
            new MulticastCell(this,
              [this.bg_sql.MinLvl, this.bg_dbc.Minlevel])
          , new MulticastCell(this,
              [this.bg_sql.MaxLvl, this.bg_dbc.Maxlevel])
          );
    }

    get PlayersPerTeam() {
        return new MinMaxCell(this,
            this.bg_sql.MinPlayersPerTeam,
            new MulticastCell(this,[
                this.bg_sql.MaxPlayersPerTeam,
                this.bg_dbc.MaxGroupSize
            ])
        );
    }

    get HordeStart() {
        return new BattlegroundSafeLoc(
            this
          , WorldSafeLocRegistry.ref(this, this.bg_sql.HordeStartLoc)
          , this.wrapIndex(this.bg_dbc.MapID,0)
          , this.bg_sql.HordeStartO
        );
    }

    get AllianceStart() {
        return new BattlegroundSafeLoc(
            this
          , WorldSafeLocRegistry.ref(this, this.bg_sql.AllianceStartLoc)
          , this.wrapIndex(this.bg_dbc.MapID,0)
          , this.bg_sql.AllianceStartO
        );
    }

    get StartMaxDist() {
        return this.wrap(this.bg_sql.StartMaxDist)
    }

    get Brackets() {
        return new BattlegroundBrackets(this, this.wrapIndex(this.bg_dbc.MapID,0))
    }

    get InlineScriptsBG() {
        return getInlineID(
              this
            , this.BattlegroundID
            , 'BattlegroundID'
        ) as _hidden.Battlegrounds<this>
    }
}

export class DungeonAddon extends MaybeSQLEntity<DungeonMap,instance_addonRow> {
    protected createSQL(): instance_addonRow {
        return SQL.instance_addon.add(this.owner.ID)
            .boss_count.set(0)
    }
    protected findSQL(): instance_addonRow {
        return SQL.instance_addon.query({map:this.owner.ID})
    }
    protected isValidSQL(sql: instance_addonRow): boolean {
        return sql.map.get() === this.owner.ID
    }

    get BossCount() { return this.wrapSQL(0,sql=>sql.boss_count)}
}

export class Boundaries<T extends Map> extends CellSystem<T> {
    get(boss: number) {
        return new MapBossBoundaries(this.owner.ID,boss)
    }

    mod(boss: number, callback: (boundaries: MapBossBoundaries)=>void) {
        callback(this.get(boss));
        return this.owner;
    }
}

export class DungeonMap extends Map {
    protected sql: instance_templateRow
    protected addon() {
        return new DungeonAddon(this);
    }

    get BossCount() { return this.addon().BossCount }
    get Boundaries() { return new Boundaries(this); }

    constructor(row: MapRow, sql: instance_templateRow) {
        super(row);
        this.sql = sql;
    }

    get AllowMount() {
        return new BoolCell(this, this.sql.allowMount)
    }

    get Difficulties() { return new PVEDifficulties(this); }

    get InlineScriptsDungeon() {
        return getInlineID(
            this
          , this.ID
          , 'InstanceID'
      ) as _hidden.Instances<this>
    }

    get Script() {
        return new MapInstanceScriptCell(
              this
            , this.sql.script
        );
    }

    get LFGDungeons() { return new LFGDungeons(this, this.ID); }
}

export class MapInstanceTypee<T extends Map> extends EnumCellTransform<T> {
    get PLAIN() {
        return this.value(MapInstanceType.NONE,(owner)=>{
            owner.row.PVP.set(0)
            return new MapPlain(owner.row)
        })
    }

    get ARENA() {
        return this.value_static(MapInstanceType.ARENA,(owner,mod,name)=>{
            const bg = createBgBase(mod,name);
            bg.dbc.MapID.setIndex(0,owner.ID)
            bg.dbc.InstanceType.set(MapInstanceType.ARENA)
            owner.row.PVP.set(1)
            return new BattlegroundMap(owner.row,bg.dbc,bg.sql);
        })
    }

    get BATTLEGROUND() {
        return this.value_static(MapInstanceType.PVP,(owner,mod,name)=>{
            const bg = createBgBase(mod,name);
            bg.dbc.MapID.setIndex(0,owner.ID)
            bg.dbc.InstanceType.set(MapInstanceType.PVP)
            owner.row.PVP.set(1)
            return new BattlegroundMap(owner.row,bg.dbc,bg.sql);
        })
    }

    private instance(owner: T) {
        return SQL.instance_template.add(owner.ID)
            .allowMount.set(0)
            .parent.set(0)
            .script.set(CUSTOM_SCRIPT_NAME)
    }

    get DUNGEON() {
        return this.value_static(MapInstanceType.PARTY,(owner,mod,name)=>{
            owner.row.PVP.set(0)
            return new DungeonMap(owner.row,this.instance(owner))
        })
    }

    get RAID() {
        return this.value_static(MapInstanceType.RAID,(owner,mod,name)=>{
            owner.row.PVP.set(0)
            return new DungeonMap(owner.row,this.instance(owner))
        })
    }
}

// add a default difficulty for overworld maps with no difficulties
finish('map-default-difficulty',()=>{
    DBC.Map
        .queryAll({})
        .forEach(x=>{
            if(!DBC.MapDifficulty.query({MapID:x.ID.get()})) {
                DBC.MapDifficulty.add(Ids.MapDifficulty.dynamicId())
                   .MapID.set(x.ID.get())
                   .MaxPlayers.set(0)
                   .Message.clear()
                   .RaidDuration.set(0)
                   .Difficulty.set(0)
                   .Difficultystring.set('')
            }
        })
})