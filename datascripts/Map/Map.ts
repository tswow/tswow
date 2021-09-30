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
import fs from "fs";
import path from "path";
import { DBC, finish } from "wotlkdata";
import { MapRow } from "wotlkdata/dbc/types/Map";
import { Settings } from "wotlkdata/Settings";
import { registeredAreas } from "../Area/Area";
import { LFGDungeonEncounters } from "../Dungeon/Encounter";
import { LFGDungeons } from "../Dungeon/LFGDungeon";
import { TSImages } from "../Images/Image";
import { Colors } from "../Misc/Color";
import { MainEntity } from "../Misc/Entity";
import { PositionXYCell } from "../Misc/PositionCell";
import { WorldMapAreaRegistry } from "../Worldmap/WorldMapArea";
import { LoadingScreens } from "./LoadingScreen";
import { MapADT } from "./MapADT";
import { MapInstanceType } from "./MapInstanceType";
import { MapRegistry } from "./Maps";
import { MapWorldStateUIs } from "./MapWorldStates";

export class Map extends MainEntity<MapRow> {
    get ID() { return this.row.ID.get(); }

    /**
     * @note changing this will automatically update the AreaName
     * of any WorldMapArea connected to this Map via a
     * WorldMapContinent entry.
     */
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
    get MapFiles() { return new MapADT(this); }

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
    let allMaps: string[] = []
    Settings.PATCH_DIRECTORY.forEach((mod: string)=>{
        // workaround to allow noggit workspaces in asset directories
        let mapsDir = path.join('modules',mod,'assets','world','maps')
        if(fs.existsSync(mapsDir)) {
            storeAreaMappings(mod,mapsDir);
            copyMapDBCs(mod);
            allMaps = allMaps.concat(fs.readdirSync(mapsDir)
                .filter(x=>!allMaps.includes(x))
            )
        }
    })
    allMaps.forEach(x=>{
        generateZmp(x);
    })
});

function copyMapDBCs(mod: string) {
    let assetsdir = path.join('modules',mod,'assets')
    let dbfilesdir = path.join(assetsdir,'DBFilesClient')
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
}

/**
 * This algorithm will create mod/id pair <-> area id mappings
 * for all adts so that adts can be automatically updated / moved to projects
 * with alternative id mappings.
 */
function storeAreaMappings(mod: string, mapsDir: string) {
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
    fs.readdirSync(mapsDir)
        .map(x=>path.join(mapsDir,x))
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

function generateZmp(map: string) {
    if(!process.argv.includes('--zmp')) return;

    const mapObj = DBC.Map.find({Directory:map});
    if(mapObj === undefined) {
        // don't error, non-maps are allowed in that directory
        return;
    }

    const mapId = mapObj.ID.get()
    const areas = WorldMapAreaRegistry
            .queryAll({MapID:mapId})
            .map(x=>x.Area.getRef())
            // no duplicate/null areas
            .filter(x=>x)
            .filter((x,index,arr)=>arr.findIndex(y=>x.ID===y.ID)===index)

    // the area that should be written to zmp
    const areaLookup: {[key: number]: number} = {}
    const allChildren: number[] = []
    areas.forEach(x=>{
        areaLookup[x.ID] = x.ID
        x.Children.get(0).forEach(y=>{
            if(allChildren.indexOf(y.ID)>=0) {
                throw new Error(
                      `Area ${y.ID} is child to multiple zones in`
                    + `${map}, this can happen if you have WorldMapArea`
                    + ` entries for areas that have parents set`
                )
            }
            allChildren.push(y.ID)
            areaLookup[y.ID] = x.ID

        });
    });

    let moduleOut: string|undefined
    let adtPaths: string[] = []
    const oldZmpPath = path.join(Settings.LUAXML_SOURCE,'Interface','WorldMap',map+'.zmp')
    const zmp = fs.existsSync(oldZmpPath)
        ? fs.readFileSync(oldZmpPath)
        : Buffer.alloc(65536)

    Settings.PATCH_DIRECTORY.forEach((mod: string)=>{
        const mapsdir = path.join('modules',mod,'assets','world','maps',map)
        if(fs.existsSync(mapsdir)) {
            adtPaths = adtPaths.concat(fs.readdirSync(mapsdir)
                .map(x=>path.join(mapsdir,x))
                .filter(x=>x.endsWith('.adt') && fs.statSync(x).isFile()))
            if(fs.existsSync(path.join(mapsdir,`${map}.wdt`))) {
                moduleOut = mod;
            }
        }
    });

    if(moduleOut === undefined) {
        throw new Error(`${map}.wdt not found in any modules!`)
    }

    // note: duplicate adts / modules should be handled by asset bundler

    adtPaths.forEach(file=>{
        const [_,x,y] = path
            .basename(file)
            .split('.')[0]
            .split('_')
            .map(x=>parseInt(x))
        const adt = fs.readFileSync(file);
        const mcin = adt.readUInt32LE(0x10)+0x14
        const quads: {[key: number]: number}[] = [{},{},{},{}]
        for(let i=0;i<256;++i){
            const mcnk = adt.readUInt32LE(8+mcin+16*i);
            const area = areaLookup[adt.readUInt32LE(mcnk+0x3c)]||0
            const indexX = adt.readUInt32LE(mcnk+0xc);
            const indexY = adt.readUInt32LE(mcnk+0x10);
            const quad = quads[
                (Math.round(indexX/15)) | (Math.round(indexY/15)) << 1
            ]
            if(quad[area] === undefined) quad[area] = 1;
            else quad[area]++;
        }
        const sums = quads.map(x=>Object.entries(x)
            .reduce(([pk,pv],[k,v])=>v>pv?[k,v]:[pk,pv],['0',0])
        ).map(([k])=>parseInt(k))

        zmp.writeUInt32LE((sums[0]),(y*128+x%128)*8);     // tl
        zmp.writeUInt32LE((sums[1]),(y*128+x%128)*8+4);   // tr
        zmp.writeUInt32LE((sums[2]),(y*128+x%128)*8+512); // bl
        zmp.writeUInt32LE((sums[3]),(y*128+x%128)*8+516); // br
    })

    // create image so users can visualize how their zmp turns out
    const image = TSImages.create(128,128);
    const colorMap: {[areaID: number]: /*color:*/number} = {}
    image.addFilter((_,x,y)=>{
        let area = zmp.readUInt32LE((y*128+x%128)*4);
        if(area === 0) return 0;
        if(colorMap[area] === undefined) {
            // take golden angle to make similar ids dissimilar
            let hue = (2.39996322972865332*area)/6.28319;
            if(hue > 1) hue = hue - Math.floor(hue);
            return colorMap[area] = Colors.hsv(hue,1,1).asRGBA();
        }
        return colorMap[area];
    });

    const zmpPath = path.join(
        'modules',moduleOut,'assets','Interface','WorldMap',`${map}.zmp`
    )

    image.write(zmpPath+'.png','PNG');
    fs.writeFileSync(zmpPath,zmp);
}