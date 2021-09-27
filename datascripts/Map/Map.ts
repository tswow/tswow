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
import { registeredAreas } from "../Area/Area";
import { LFGDungeonEncounters } from "../Dungeon/Encounter";
import { LFGDungeons } from "../Dungeon/LFGDungeon";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionXYCell } from "../Misc/PositionCell";
import { LoadingScreens } from "./LoadingScreen";
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

    GenerateADT(sizeX: number, sizeY: number, module: string, createTeleport = true) {
        if(this.Directory.get() === '') {
            throw new Error(
                  `No valid directory set when generating adts,`
                + `please set 'Directory' property before calling this`
            )
        }

        let transform = (v: number) => 17066.7 - (v*533.333);

        let miny = transform(1);
        let minx = transform(1);
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
        files = files.filter(x=>x.endsWith('.adt'))
        if(files.length > 0) {
            for(let x=1;x<=sizeX;++x) {
                for(let y=1;y<=sizeY;++y) {
                    let filename = `${this.Directory.get()}_${x}_${y}.adt`
                    let index = files.indexOf(filename);
                    if(index < 0) {
                        throw new Error(`Missing map file: ${filename}`)
                    }
                    files.splice(index,1);
                }
            }
            if(files.length > 0) {
                throw new Error(
                      `Trying to re-generate adts with unknown adts in directory, `
                    + `please fix your map files manually: ${files.join(',')}`
                )
            }
            return this;
        }

        child_process.execSync(
              `${path.join('bin','adt-creator','adt-creator')}`
            + ` ${path.join('bin','source.adt')}`
            + ` ${mapdir}`
            + ` ${this.Directory.get()}`
            + ` 1 1 ${sizeX} ${sizeY}`
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
    fs.readdirSync('modules').forEach(mod=>{
        // workaround to allow noggit workspaces in asset directories
        let assetsdir = path.join('modules',mod,'assets')
        let mapsdir = path.join(assetsdir,'world','maps')
        let dbfilesdir = path.join(assetsdir,'DBFilesClient')
        if(fs.existsSync(mapsdir)) {
            fs.mkdirSync(dbfilesdir,{recursive:true});
            DBC.Map.write(path.join(dbfilesdir,'Map.dbc'))
            DBC.AreaTable.write(path.join(dbfilesdir,'AreaTable.dbc'))
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
            storeAreaMappings(mod,mapsdir);
        }
    })
});

/**
 * This algorithm will create mod/id pair <-> area id mappings
 * for all adts so that adts can be automatically updated / moved to projects
 * with alternative id mappings.
 */
function storeAreaMappings(mod: string, mapsdir: string) {
    if(process.argv.includes('--no-area-mapping')) return;
    let areasPath = path.join('modules',mod,'areas.json');
    let adtAreaMap: {[key: string]: number} = fs.existsSync(areasPath)
        ? JSON.parse(fs.readFileSync(areasPath,'utf-8'))
        : {}

    /**
     * Before we start scanning adts, we need to find all existing id mappings
     * and find the outdated ones
     */
    let replaces: {[key: number]: number}= {}
    for(const identifier in adtAreaMap) {
        const oldAreaId = adtAreaMap[identifier];
        const newAreaId = registeredAreas[identifier];
        if(newAreaId !== undefined && newAreaId !== oldAreaId) {
            adtAreaMap[identifier] = replaces[oldAreaId] = newAreaId;
        }
    }

    let anyChanges = false
    if(Object.entries(replaces).length > 0) {
        anyChanges = true
        console.log(`ADT area inconsistent with id registry`)
        console.log(
              `The following adt areas will be replaced:`
            + `${Object.entries(replaces)
                    .map(([old,nu])=>`${old}->${nu}`).join(',')
                }`
        )
    }

    let cachedSkips: number[] = []
    let stagedFiles: string[] = []
    fs.readdirSync(mapsdir)
        .map(x=>path.join(mapsdir,x))
        .filter(x=>fs.statSync(x).isDirectory())
        .reduce<string[]>(
              (files,dir)=>files
                .concat(fs.readdirSync(dir)
                    .map(file=>path.join(dir,file))
                    .filter(x=>x.endsWith('.adt') && fs.statSync(x).isFile())
                )
            , [])
        .forEach(file=>{
            const adt = fs.readFileSync(file);
            const mcin = adt.readUInt32LE(0x10)+0x14;
            let anyFileChanges = false;
            for(let i=0;i<256;++i) {
                const mcnk = adt.readUInt32LE(8+mcin+16*i)
                // safety check for if this is even a valid adt
                if(adt.toString('ascii',mcnk,mcnk+4) !== 'KNCM') {
                    console.log(`Error reading adt ${file}, invalid mcnk pointer ${mcnk} at mcin index ${i}`)
                    process.exit(-1)
                }
                const areaOffset = mcnk+0x3c;

                // First, we see if this is already a known new mapping so we can skip it
                const adtArea = adt.readUInt32LE(areaOffset);
                if(cachedSkips.includes(adtArea)) {
                    continue;
                }

                // Secondly, we see if we should replace the value in the adt
                const replacement = replaces[adtArea];
                if(replacement !== undefined) {
                    adt.writeUInt32LE(replacement,areaOffset);
                    anyFileChanges = true;
                    continue;
                }

                // Finally, we check if this is a new unknown mapping
                const areaMapping = Object.entries(registeredAreas).find(([key,value])=>value === adtArea);
                if(areaMapping !== undefined) {
                    const [identifier] = areaMapping;
                    if(adtAreaMap[identifier] === undefined) {
                        // we already know it's not out of date, so it's safe to just overwrite this
                        // even if it previously existed.
                        console.log(`Storing area mapping ${identifier}->${adtArea}`)
                        adtAreaMap[areaMapping[0]] = adtArea;
                        anyChanges = true;
                    }
                }
                // we no longer need to check this area, since
                // it's not a replacement and we already made the mapping
                cachedSkips.push(adtArea);
            }
            if(anyFileChanges) {
                stagedFiles.push(file);
                fs.writeFileSync(file+'.tmp',adt);
            }
        })
    if(!anyChanges) return;

    // save to temporary file in case of failure
    fs.writeFileSync(areasPath+'.tmp',JSON.stringify(adtAreaMap, null, 4));
    stagedFiles.forEach(x=>{
        try {
            fs.renameSync(x+'.tmp',x)
        } catch (error) {
            console.log(
                  `Failed to rename area patches:`
                + `this is dangerous. Please manually review the remaining`
                + ` '.tmp' files and decide what to keep`
            )
            process.exit(1)
        }
    })
    fs.renameSync(areasPath+'.tmp',areasPath);
}