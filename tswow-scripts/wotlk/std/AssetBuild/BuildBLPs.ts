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
import { wfs } from "wotlkdata/util/FileSystem";
import { ipaths } from "wotlkdata/wotlkdata/Settings";
import { generateBLP } from "./BLP";
import { onDirtyPNG } from "./PNG";

finish('blps', () => {
    if(process.argv.includes('--no-blp')) return;
    const blpChanges = new FileChangeModule('blps');
    let files: {[key: string]: boolean} = {}
    ipaths.modules.module.all().forEach(basemod=>{
        basemod.endpoints().forEach(mod=>{
            if(!mod.assets.exists()) {
                return;
            }
            mod.assets.iterate('RECURSE','BOTH','FULL',node=>{
                if(node.isDirectory()) {
                    if(node.toDirectory().containsFile('noconvert')) {
                        return 'ENDPOINT'
                    } else {
                        return;
                    }
                }
                if(node.basename(2).toLowerCase().get() === 'worldmap') {
                    // worldmap file
                    if(node.basename().toFile().withExtension('').toLowerCase() === node.basename(1).toLowerCase()) {
                        return;
                    }

                    // overlay file
                    if(node.basename().toLowerCase().includes('overlay')) {
                        return;
                    }

                }

                // minimap files
                if(node.basename(1).toLowerCase().get() === 'minimap') {
                    return;
                }

                if(!node.isFile()) return;
                let noext = node.toFile().abs().withExtension('')
                if(files[noext.get()]) return;
                onDirtyPNG(noext,blpChanges,!wfs.exists(noext.withExtension('.blp')),png=>{
                    generateBLP(png);
                    if(!wfs.exists(png.withExtension('.blp'))) {
                        throw new Error(
                            `Failed to generate blp from ${png.abs().get()}`
                        );
                    }
                });
                files[noext.get()] = true;
            });
        })
    })
})