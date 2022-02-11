/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { finish } from "wotlkdata";
import { FileChangeModule } from "wotlkdata/util/FileChanges";
import { mpath, wfs } from "wotlkdata/util/FileSystem";
import { wsys } from "wotlkdata/util/System";
import { ipaths } from "wotlkdata/wotlkdata/Settings";
import { generateBLP } from "./BLP";
import { getEffectiveFile, onDirtyPNG, splitPng } from "./PNG";

function indexFiles(dir: string, mapname: string) {
    let files: string[] = []
    for(let i=1;i<=12;++i) {
        files.push(mpath(dir,`${mapname}${i}`));
    }
    return files;
}

function missingBlps(dir: string, mapname: string) {
    return indexFiles(dir,mapname)
        .find((x)=>!wfs.exists(`${x}.blp`)) !== undefined;
}

finish('worldmaps', () => {
    if(process.argv.includes('--no-blp')) return;
    const mapsChanges = new FileChangeModule('worldmaps');
    ipaths.modules.module.all().forEach(basemod=>{
        basemod.endpoints().forEach(mod=>{
            if(!mod.assets.Interface.WorldMap.exists()) return;
            if(mod.assets.Interface.WorldMap.toDirectory().containsFile('noconvert')) return;
            mod.assets.Interface.WorldMap.readDir('ABSOLUTE').forEach(worldmapdir=>{
                if(!worldmapdir.isDirectory()) return;
                if(worldmapdir.toDirectory().containsFile('noconvert')) return;
                let zonefile = worldmapdir.join('zone')
                onDirtyPNG(zonefile.toFile(),mapsChanges,missingBlps(worldmapdir.get(),worldmapdir.basename().get()),png=>{
                    splitPng(png, 256,256, `${png.basename(1)}%01d.png`)
                    for(let i=1;i<=12;++i) {
                        let pngi = png.dirname().join(`${png.basename(1)}${i}.png`)
                        generateBLP(pngi);
                        wfs.remove(pngi)
                    }
                });

                worldmapdir.toDirectory().readDir('ABSOLUTE')
                    .filter(overlay=>
                           overlay.isFile()
                        && overlay.basename().toLowerCase().includes('overlay')
                        && !overlay.basename().match(/[0-9]/)
                        && !overlay.endsWith('.blp')
                    )
                    .forEach(overlay=>{
                        let noext = overlay.toFile().withExtension('')
                        const file = getEffectiveFile(noext);
                        if(!file) {
                            return; // it's not a texture file
                        }
                        const ident = wsys.exec(
                              ` ${ipaths.bin.im.identify.abs().get()}`
                            + ` ${file.abs().get()}`
                            , 'pipe'
                        )

                        const [x,y] = ident.split(` ${file.extension().toUpperCase()} `)[1].split(' ')[0].split('x').map(x=>parseInt(x))
                        let texCount = Math.ceil(x/256)*Math.ceil(y/256);
                        // todo fix
                        let missing = false;
                        for(let i=1;i<=texCount;++i) {
                            let file = noext.withExtension(`${i}.blp`).get()
                            if(!wfs.exists(file)) {
                                console.log(file,"is missing");
                                missing = true;
                                break;
                            }
                        }
                        onDirtyPNG(noext,mapsChanges,missing,png=>{
                            splitPng(png,256,256,`${png.withExtension('').basename()}%01d.png`)
                            for(let i=1;i<=texCount;++i) {
                                let pngi = png.dirname()
                                    .join(`${png.basename().withExtension(`${i}.png`)}`)
                                generateBLP(pngi);
                                pngi.remove();
                            }
                        });
                    })
            });
        })
    })

});