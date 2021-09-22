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
import child_process from "child_process";
import fs from "fs";
import path from "path";
import { DBC, finish } from "wotlkdata";
import { MapRow } from "wotlkdata/dbc/types/Map";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { LFGDungeonEncounters } from "../Dungeon/Encounter";
import { LFGDungeons } from "../Dungeon/LFGDungeon";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionXYCell } from "../Misc/PositionCell";
import { MapInstanceType } from "./MapInstanceType";
import { MapRegistry } from "./Maps";
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

    get CorpseMap() { return MapRegistry.ref(this, this.row.CorpseMapID); }
    get CorpsePos() { return new PositionXYCell(this, this.row.CorpseX, this.row.CorpseY); }
    get TimeofDayOverride() { return this.wrap(this.row.TimeOfDayOverride); }
    get Expansion() { return this.wrap(this.row.ExpansionID); }
    get MaxPlayers() { return this.wrap(this.row.MaxPlayers); }
    get RaidOffset() { return this.wrap(this.row.RaidOffset); }
    get AreaTable() { return this.wrap(this.row.AreaTableID); }

    GenerateADT(sizeX: number, sizeY: number, module: string, createTeleport = true) {
        if(this.Directory.get() === '') {
            throw new Error(
                  `No valid directory set when generating adts,`
                + `please set 'Directory' property before calling this`
            )
        }

        let transform = (v: number) => 17066.7 - (v*533.333);

        let miny = transform(0);
        let minx = transform(0);
        let maxx = transform(sizeX);
        let maxy = transform(sizeY);

        let cx = minx+(maxx-minx)/2
        let cy = miny+(maxy-miny)/2

        if(createTeleport) {
            SQL.game_tele.add(Ids.game_tele.id())
               .map.set(this.ID)
               .position_x.set(cx)
               .position_y.set(cy)
               .position_z.set(500)
               .name.set(`map:${this.Directory.get()}`)
        }

        let mapdir = path
            .join(
                'modules',module,'assets','world','maps'
                , this.Directory.get()
            );

        let files = fs.existsSync(mapdir) ? fs.readdirSync(mapdir) : []
        if(files.length > 0) {
            let files = fs.readdirSync(mapdir);
            for(let x=0;x<=sizeX;++x) {
                for(let y=0;y<=sizeY;++y) {
                    let filename = `${this.Directory.get()}_${x}_${y}.adt`
                    let index = files.indexOf(filename);
                    if(index < 0) {
                        throw new Error(`Missing map file: ${filename}`)
                    }
                    files.splice(index,1);
                }
            }
            let wdt = `${this.Directory.get()}.wdt`
            if(files.length !== 1 || files[0] !== wdt) {
                throw new Error(
                      `Trying to re-generate adts with unknown files in directory, `
                    + `please fix your map files manually: ${files.join(',')}`
                )
            }
            return;
        }

        child_process.execSync(
              `${path.join('bin','adt-creator','adt-creator')}`
            + ` ${path.join('bin','source.adt')}`
            + ` ${mapdir}`
            + ` ${this.Directory.get()}`
            + ` 0 0 ${sizeX} ${sizeY}`
        );
        return this;
    }


    /**
     * TODO: Unknown flags, all flags on wowdev looks like wod+
     */
    get Flags() { return this.wrap(this.row.Flags); }

    get IsPVP() { return this.wrap(this.row.PVP); }

    get WorldStateUIs() { return new MapWorldStateUIs(this); }

    get LFGDungeons() { return new LFGDungeons(this, this.ID); }
    get Encounters() { return new LFGDungeonEncounters(this, this.ID); }
}

finish('build-maps',()=>{
    // workaround to allow noggit workspaces in asset directories
    fs.readdirSync('modules').forEach(x=>{
        let assetsdir = path.join('modules',x,'assets')
        let mapsdir = path.join(assetsdir,'world','maps')
        let dbfilesdir = path.join(assetsdir,'DBFilesClient')
        if(fs.existsSync(mapsdir)) {
            fs.mkdirSync(dbfilesdir,{recursive:true});
            DBC.Map.write(path.join(dbfilesdir,'Map.dbc'))
            DBC.Light.write(path.join(dbfilesdir,'Light.dbc'))
            DBC.LightParams.write(path.join(dbfilesdir,'LightParams.dbc'))
            DBC.LightSkybox.write(path.join(dbfilesdir,'LightSkybox.dbc'))
            DBC.LightfloatBand.write(path.join(dbfilesdir,'LightfloatBand.dbc'))
            DBC.LightintBand.write(path.join(dbfilesdir,'LightintBand.dbc'))
            fs.writeFileSync(path.join(dbfilesdir,'WHY_THESE_FILES_HERE.txt'),
                  `These files are written here so you can set your`
                + ` noggit project directory to your modules 'assets'.`
                + `\n\nThey are updated any time datascripts build,`
                + ` so you can safely leave them here and ignore them.`
                + `\n\nSymlinks are also safe, so don't worry.`
            )
        }
    })
});