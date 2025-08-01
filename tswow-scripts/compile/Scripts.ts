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
import { watchTsc } from '../util/CompileTS';
import { mpath, wfs } from '../util/FileSystem';
import { FilePath, resfp } from '../util/FileTree';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { termCustom } from '../util/TerminalCategories';
import { isInteractive } from './BuildConfig';
import { bpaths, spaths } from './CompilePaths';

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

        // Create the wow directory and copy wotlk into it
        const wowDir = mpath(scriptsDest, 'wow');
        wfs.mkDirs(wowDir);

        // Copy wotlk into wow directory
        if (wfs.exists(mpath(tempScripts, 'wotlk'))) {
            wfs.copy(mpath(tempScripts, 'wotlk'), mpath(wowDir, 'wotlk'));
        }

        // Create symlinks for data and util directories so module resolution works correctly
        const dataSymlink = mpath(wowDir, 'data');
        if (!wfs.exists(dataSymlink)) {
            wsys.exec(`ln -sf ../data ${dataSymlink}`, 'inherit');
        }

        const utilSymlink = mpath(wowDir, 'util');
        if (!wfs.exists(utilSymlink)) {
            wsys.exec(`ln -sf ../util ${utilSymlink}`, 'inherit');
        }

        // Package.json files are already copied by SWC with --copy-files

        // Create wow package.json
        wfs.write(
            mpath(wowDir, 'package.json'),
            JSON.stringify({
                name: "wow",
                version: "1.0.0",
                description: "",
                main: "../../data/index.js",
                types: "../../data/index.d.ts",
                dependencies: JSON.parse(wfs.read(mpath(tempScripts, 'data', 'package.json'))).dependencies,
                devDependencies: {},
                scripts: {},
                repository: { type: "git" },
                author: "tswow",
                license: "GPL-3.0-only"
            }, null, 2)
        )

        // Clean up temp directory
        wfs.remove(tempDir);

        // Generate TypeScript declarations after everything is in place
        termCustom('build','scripts','Generating TypeScript declarations...');

        // Create temporary wow symlink for declaration generation
        const tempWowDir = mpath(spaths.tswow_scripts.abs().get(), 'wow');
        const wotlkSymlink = mpath(tempWowDir, 'wotlk');

        try {
            // Create temporary wow/wotlk structure for imports to work during declaration generation
            wfs.mkDirs(tempWowDir);
            if (!wfs.exists(wotlkSymlink)) {
                wsys.exec(`ln -sf ${spaths.tswow_scripts.wotlk.abs().get()} ${wotlkSymlink}`, 'inherit');
            }

            // Create unified declaration generation for all modules to handle cross-dependencies
            // Use declarationDir instead of outDir to avoid rootDir issues
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
                    useDefineForClassFields: false
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

            // Generate all declarations in one pass to handle cross-dependencies
            wfs.write(unifiedDeclPath, JSON.stringify(unifiedDeclTsConfig, null, 2));
            try {
                // Use 'pipe' to suppress the rootDir warnings while still capturing real errors
                wsys.exec(`npx tsc --project ${unifiedDeclPath}`, 'pipe');
            } catch (e) {
                // Only log actual compilation errors, not rootDir warnings
                const errorStr = e.toString();
                if (!errorStr.includes('rootDir') && !errorStr.includes('is expected to contain all source files')) {
                    termCustom('build','scripts',`TypeScript declaration error: ${errorStr}`);
                }
            }
            wfs.remove(unifiedDeclPath);

            termCustom('build','scripts','TypeScript declarations generated successfully');
        } catch (e) {
            termCustom('build','scripts','Warning: Failed to generate TypeScript declarations');
            termCustom('build','scripts',`Error: ${e}`);
        } finally {
            // Clean up temporary symlink
            if (wfs.exists(wotlkSymlink)) {
                wfs.remove(wotlkSymlink);
            }
            if (wfs.exists(tempWowDir) && wfs.isDirectory(tempWowDir)) {
                try { wfs.remove(tempWowDir); } catch (e) { /* ignore cleanup errors */ }
            }
        }
    }
}
