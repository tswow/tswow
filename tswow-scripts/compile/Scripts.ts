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
import { symlinkSync, unlinkSync, existsSync } from 'fs';
import { watchTsc } from '../util/CompileTS';
import { mpath, wfs } from '../util/FileSystem';
import { FilePath, resfp } from '../util/FileTree';
import { ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { isInteractive } from './BuildConfig';
import { bpaths, spaths } from './CompilePaths';
import { NodeExecutable } from '../runtime/Node';

export namespace Scripts {
    export async function build() {
        // Create a temporary directory for compilation
        const tempDir = mpath(bpaths.abs().get(), 'temp-scripts');
        wfs.mkDirs(tempDir);

        // Compile everything to temp directory first
        const swcCmd = [
            'npx',
            'swc',
            mpath(process.cwd(), 'tswow-scripts'),
            '-d', tempDir,
            '--config-file', mpath(process.cwd(), '.swcrc'),
            '--copy-files'
        ];

        wsys.exec(swcCmd.join(' '), 'inherit');

        // Generate declaration files with tsc after moving files
        // This needs to happen after the files are in place to avoid circular dependencies

        // Now move the compiled files to the correct locations
        const tempScripts = mpath(tempDir, 'tswow-scripts');

        // Copy each subdirectory to its target location
        const scriptsDest = ipaths.bin.scripts.abs().get();

        if (wfs.exists(mpath(tempScripts, 'runtime'))) {
            wfs.copy(mpath(tempScripts, 'runtime'), mpath(scriptsDest, 'runtime'));
        }
        if (wfs.exists(mpath(tempScripts, 'util'))) {
            wfs.copy(mpath(tempScripts, 'util'), mpath(scriptsDest, 'util'));
        }
        if (wfs.exists(mpath(tempScripts, 'data'))) {
            wfs.copy(mpath(tempScripts, 'data'), mpath(scriptsDest, 'data'));
        }
        // Note: We'll copy wotlk after creating the wow directory
        if (wfs.exists(mpath(tempScripts, 'typescript2cxx'))) {
            wfs.copy(mpath(tempScripts, 'typescript2cxx'), mpath(scriptsDest, 'typescript2cxx'));
        }
        if (wfs.exists(mpath(tempScripts, 'test'))) {
            wfs.copy(mpath(tempScripts, 'test'), mpath(scriptsDest, 'test'));
        }
        if (wfs.exists(mpath(tempScripts, 'addons'))) {
            wfs.copy(mpath(tempScripts, 'addons'), mpath(scriptsDest, 'addons'));
        }

        // Package.json files are already copied by SWC with --copy-files

        // Create the wow directory in both locations:
        // 1. node_modules/wow (where module resolution expects it)
        const wowNodeModulesDir = ipaths.node_modules.wow.abs().get();
        wfs.mkDirs(wowNodeModulesDir);
        
        // 2. bin/scripts/wow (where npm install expects to find it as a local package)
        const wowBinDir = mpath(scriptsDest, 'wow');
        wfs.mkDirs(wowBinDir);

        // Copy wotlk into both wow directories
        if (wfs.exists(mpath(tempScripts, 'wotlk'))) {
            wfs.copy(mpath(tempScripts, 'wotlk'), mpath(wowNodeModulesDir, 'wotlk'));
            wfs.copy(mpath(tempScripts, 'wotlk'), mpath(wowBinDir, 'wotlk'));
        }

        // Create symlinks for data and util directories so module resolution works correctly
        const createSymlink = (target: string, link: string, name: string) => {
            try {
                // Remove existing symlink if it exists
                if (existsSync(link)) {
                    try {
                        unlinkSync(link);
                    } catch (e) {
                        // If unlink fails, it might be a directory junction on Windows
                        // Try to remove it as a directory
                        if (isWindows() && wfs.exists(link)) {
                            wfs.remove(link);
                        }
                    }
                }
                
                // Create new symlink
                // On Windows, use 'junction' for directories (doesn't require admin)
                // On Unix, use 'dir' for directory symlinks
                symlinkSync(target, link, isWindows() ? 'junction' : 'dir');
                term.log('build', `Created ${name} symlink: ${link} -> ${target}`);
            } catch (err: any) {
                // If symlink already exists and points to the right place, that's fine
                if (err.code === 'EEXIST') {
                    term.log('build', `${name} symlink already exists: ${link}`);
                } else {
                    term.error('build', `Failed to create ${name} symlink: ${err.message}`);
                    throw err;
                }
            }
        };

        // Create symlinks for both wow directories
        
        // For node_modules/wow (relative paths from node_modules/wow to bin/scripts)
        const nodeModulesDataTarget = '../../bin/scripts/data';
        const nodeModulesDataSymlink = mpath(wowNodeModulesDir, 'data');
        createSymlink(nodeModulesDataTarget, nodeModulesDataSymlink, 'node_modules data');

        const nodeModulesUtilTarget = '../../bin/scripts/util';
        const nodeModulesUtilSymlink = mpath(wowNodeModulesDir, 'util');
        createSymlink(nodeModulesUtilTarget, nodeModulesUtilSymlink, 'node_modules util');
        
        // For bin/scripts/wow (relative paths from bin/scripts/wow to bin/scripts)
        const binDataTarget = '../data';
        const binDataSymlink = mpath(wowBinDir, 'data');
        createSymlink(binDataTarget, binDataSymlink, 'bin data');

        const binUtilTarget = '../util';
        const binUtilSymlink = mpath(wowBinDir, 'util');
        createSymlink(binUtilTarget, binUtilSymlink, 'bin util');

        // Package.json files are already copied by SWC with --copy-files

        // Create wow package.json for both directories
        const wowPackageJson = {
            name: "wow",
            version: "1.0.0",
            description: "",
            main: "./data/index.js",
            types: "./data/index.d.ts",
            dependencies: JSON.parse(wfs.read(mpath(tempScripts, 'data', 'package.json'))).dependencies,
            devDependencies: {},
            scripts: {},
            repository: { type: "git" },
            author: "tswow",
            license: "GPL-3.0-only"
        };

        // Create package.json for node_modules/wow
        wfs.write(
            mpath(wowNodeModulesDir, 'package.json'),
            JSON.stringify(wowPackageJson, null, 2)
        );

        // Create package.json for bin/scripts/wow
        wfs.write(
            mpath(wowBinDir, 'package.json'),
            JSON.stringify(wowPackageJson, null, 2)
        );

        // Clean up temp directory
        wfs.remove(tempDir);

        // Generate TypeScript declarations after everything is in place
        term.log('build', 'Generating TypeScript declarations...');

        try {

            // Generate declarations for all modules
            const unifiedDeclTsConfig = {
                compilerOptions: {
                    target: "es2021",
                    module: "commonjs",
                    declaration: true,
                    emitDeclarationOnly: true,
                    declarationDir: scriptsDest,
                    strict: false,
                    esModuleInterop: true,
                    skipLibCheck: true,
                    forceConsistentCasingInFileNames: true,
                    experimentalDecorators: true,
                    useDefineForClassFields: false,
                    rootDir: spaths.tswow_scripts.abs().get(),
                },
                include: [
                    spaths.tswow_scripts.data.abs().get() + "/**/*.ts",
                    spaths.tswow_scripts.wotlk.abs().get() + "/**/*.ts",
                    spaths.tswow_scripts.util.abs().get() + "/**/*.ts",
                    spaths.tswow_scripts.runtime.abs().get() + "/**/*.ts",
                    spaths.tswow_scripts.test.abs().get() + "/**/*.ts"
                ],
                exclude: [
                    "**/node_modules",
                    "**/build"
                ]
            };

            const unifiedDeclPath = mpath(bpaths.get(), 'tsconfig.unified-decl.json');
            wfs.write(unifiedDeclPath, JSON.stringify(unifiedDeclTsConfig, null, 2));
            
            try {
                wsys.exec(`"${NodeExecutable}" "${mpath(bpaths.get(), 'node_modules', 'typescript', 'lib', 'tsc.js')}" --project "${unifiedDeclPath}"`, 'pipe');
            } catch (e) {
                const errorStr = e.toString();
                term.error('build', `TypeScript declaration error: ${errorStr}`);
                // Previously filtered out 'rootDir' and 'is expected to contain all source files' errors
                // but hiding errors is bad practice - we should fix them instead
            }
            wfs.remove(unifiedDeclPath);

            // Move wotlk declarations to the correct location
            const wotlkDeclSrc = mpath(scriptsDest, 'wotlk');
            const wotlkDeclDest = mpath(scriptsDest, 'wow', 'wotlk');
            
            if (wfs.exists(wotlkDeclSrc)) {
                // Ensure destination exists
                wfs.mkDirs(wotlkDeclDest);
                
                // Move all .d.ts files
                wfs.iterate(wotlkDeclSrc, (filePath) => {
                    if (filePath.endsWith('.d.ts')) {
                        const relativePath = filePath.substring(wotlkDeclSrc.length + 1);
                        const destPath = mpath(wotlkDeclDest, relativePath);
                        wfs.mkDirs(wfs.dirname(destPath));
                        wfs.move(filePath, destPath);
                    }
                });
                
                // Remove the now-empty directory structure
                wfs.remove(wotlkDeclSrc);
            }

            term.log('build', 'TypeScript declarations generated successfully');
        } catch (e) {
            term.error('build', 'Warning: Failed to generate TypeScript declarations');
            term.error('build', `Error: ${e}`);
        }
    }
}
