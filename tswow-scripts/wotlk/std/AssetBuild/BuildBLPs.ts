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
import { finish } from "../../../data/index";
import { ipaths } from "../../../data/Settings";
import { Args } from "../../../util/Args";
import { FileChangeModule } from "../../../util/FileChanges";
import { wfs } from "../../../util/FileSystem";
import { generateBLP } from "./BLP";
import { BuildTaxiMaps } from "./BuildTaxiMaps";
import { onDirtyPNG } from "./PNG";

finish('blps', () => {
    if(!Args.hasFlag('build-blp',[process.argv])) {
        return;
    }
    const blpChanges = new FileChangeModule('blps');
    let files: {[key: string]: boolean} = {}
    let totalProcessed = 0;
    let totalConverted = 0;
    
    const isDebug = Args.hasFlag('debug', [process.argv]);
    if(isDebug) {
        console.log('[DATASCRIPTS] Starting BLP asset processing...');
    }
    
    ipaths.modules.module.all().forEach(basemod=>{
        basemod.endpoints().forEach(mod=>{
            if(!mod.assets.exists()) {
                return;
            }
            
            if(isDebug) {
                console.log(`[DATASCRIPTS] Processing assets in module: ${mod.get()}`);
            }
            mod.assets.iterate('RECURSE','BOTH','FULL',node=>{
                // Skip the root assets directory itself
                if(node.get() === mod.assets.get()) {
                    return;
                }

                if(node.isDirectory()) {
                    if(node.toDirectory().containsFile('noconvert')) {
                        return 'ENDPOINT'
                    }
                    return;
                }

                // Skip non-file nodes
                if(!node.isFile()) {
                    return;
                }

                // Skip git-related files and other non-image files
                const basename = node.basename().toLowerCase();
                const skipPatterns = [
                    '.git',
                    '.gitignore',
                    '.gitattributes',
                    '.gitmodules',
                    'readme',
                    'license',
                    'changelog',
                    '.md',
                    '.txt',
                    '.yml',
                    '.yaml',
                    '.json',
                    '.xml',
                    '.cfg',
                    '.conf',
                    '.ini',
                    '.toml',
                    '.lock',
                    '.log'
                ];

                if (skipPatterns.some(pattern => basename.includes(pattern))) {
                    return;
                }

                // Only process files with image extensions
                const imageExtensions = ['.png', '.psd', '.xcf', '.jpg', '.jpeg', '.bmp', '.tga'];
                const hasImageExtension = imageExtensions.some(ext => basename.endsWith(ext));

                if (!hasImageExtension) {
                    // Check if there's a file with the same name but with an image extension
                    const baseNameNoExt = node.toFile().abs().withExtension('').get();
                    const hasRelatedImageFile = imageExtensions.some(ext =>
                        wfs.exists(baseNameNoExt + ext)
                    );

                    if (!hasRelatedImageFile) {
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

                // Extra safety check before processing
                if(!node.isFile()) {
                    return;
                }

                // Check if the path ends with a directory separator
                const nodePath = node.get();
                if (nodePath.endsWith('/') || nodePath.endsWith('\\')) {
                    return;
                }

                let noext = node.toFile().abs().withExtension('')

                // Another safety check on the processed path
                const noextPath = noext.get();
                if (!noextPath || noextPath.endsWith('/') || noextPath.endsWith('\\')) {
                    return;
                }

                if(files[noext.get()]) return;

                totalProcessed++;
                onDirtyPNG(noext,blpChanges,!wfs.exists(noext.withExtension('.blp')),png=>{
                    if(isDebug) {
                        console.log(`[DATASCRIPTS]   Converting: ${png.relativeTo(mod.assets).get()} → BLP`);
                    }
                    generateBLP(png);
                    if(!wfs.exists(png.withExtension('.blp'))) {
                        throw new Error(
                            `Failed to generate blp from ${png.abs().get()}`
                        );
                    }
                    totalConverted++;
                });
                files[noext.get()] = true;
            });
        })
    })
    
    if(isDebug && totalProcessed > 0) {
        console.log(`[DATASCRIPTS] BLP conversion complete: ${totalConverted} files converted, ${totalProcessed} files processed`);
    }
    
    BuildTaxiMaps();
})
