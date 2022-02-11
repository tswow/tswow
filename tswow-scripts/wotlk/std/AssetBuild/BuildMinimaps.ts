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
import { finish, LUAXML } from "../../../data/index";
import { FileChangeModule } from "../../../util/FileChanges";
import { wfs } from "../../../util/FileSystem";
import { wsys } from "../../../util/System";
import { ipaths } from "../../../data/Settings";
import { generateBLP } from "./BLP";
import { getEffectiveFile, onDirtyPNG, splitPng } from "./PNG";

finish('minimaps', () => {
    if(process.argv.includes('--no-blp')) return;
    const minimapChanges = new FileChangeModule('minimaps');
    ipaths.modules.module.all().forEach(basemod=>{
        basemod.endpoints().forEach(mod=>{
            if(!mod.assets.textures.minimap.exists()) return;
            mod.assets.textures.minimap
                .iterate('FLAT','BOTH','FULL',node=>{
                    if(node.isDirectory()) {
                        if(node.toDirectory().containsFile('noconvert')) {
                            return 'ENDPOINT'
                        } else {
                            return;
                        }
                    }
                    if(node.basename().match(/[0-9]/)) return;
                    let noext = node.toFile().withExtension('')
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
                    const xCount = Math.ceil(x/256)
                    const yCount = Math.ceil(y/256)
                    let missingFile = false;
                    xloop:
                    for(let x=1;x<=xCount;++x) {
                        for(let y=1;y<=yCount;++y) {
                            let file = node.toFile().withExtension(
                                  `_${x.toString().padStart(2,'0')}`
                                + `_${y.toString().padStart(2,'0')}.blp`
                            )
                            if(!file.exists()) {
                                missingFile = true;
                                break xloop;
                            }
                        }
                    }

                    onDirtyPNG(file.withExtension(''),minimapChanges,missingFile,png=>{
                        splitPng(png,256,256,'temp%01d.png')
                        for(let i=0;i<xCount*yCount;++i) {
                            let x = 1 + (i % xCount);
                            let y = 1 + Math.floor(i / yCount);
                            let filein = png.dirname().join(`temp${i+1}.png`)
                            let fileout = `${node.abs().withExtension(
                                  `_${x.toString().padStart(2,'0')}`
                                + `_${y.toString().padStart(2,'0')}.png`
                            )}`
                            wfs.move(filein,fileout);
                            generateBLP(fileout);
                            wfs.remove(fileout);
                        }
                    })
                })
        })
    })

    const minimaps: {[key: string]: string[]} = {}
    ipaths.modules.module.all().forEach(basemod=>{
        basemod.endpoints().forEach(mod=>{
            if(!mod.assets.textures.minimap.exists()) return;
            mod.assets.textures.minimap.iterate('FLAT','FILES','FULL',node=>{
                if(!node.endsWith('.blp')) return;

                const texture = node.basename();
                const map = texture.split('_')[0];
                (minimaps[map] || (minimaps[map] = [])).push(texture.get());
            })
        })
    })

    for(let key in minimaps) {
        minimaps[key] = minimaps[key].sort();
    }

    // nothing else should touch this file
    LUAXML.anyfile('textures/Minimap/md5translate.trs').modInPlace(source=>{
        let lines = source.split('\r').join('').split('\n');
        Object.entries(minimaps).forEach(([map,files])=>{
            let index = lines.findIndex(x=>{
                if(x.startsWith('dir:')) {
                    let dir = x.substring('dir: '.length);
                    if(map.toLowerCase() < dir.toLowerCase()) {
                        return true;
                    }
                }
            })
            if(index < 0) index = lines.length;
            const linesOut = files.map(x=>
                `${map}\\map${x.split('_').slice(1).map((x,i)=>
                    // md5translate quirk:
                    // only y padded with 0 (mapx_0y), we must remove it from x
                    i==0&&x.startsWith('0') ? x.substring(1) : x
                ).join('_')}\t${x}`)
            lines.splice(index,0,...[
                 `dir:\t${map}`,
                 ...linesOut
            ])
        });
        return lines.join('\r\n');
    })
})

