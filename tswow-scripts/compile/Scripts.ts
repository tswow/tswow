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
        const makeTsConfig = (outdir: FilePath, buildDir: FilePath, include: FilePath[]) => {
            const tsconfig = {
                compilerOptions: {
                    target: 'es2018',
                    module: 'commonjs',
                    esModuleInterop: true,
                    declaration: true,
                    sourceMap: true,
                    skipLibCheck: true,
                    experimentalDecorators: true,
                    allowJs: true,
                    outDir: resfp(outdir),
                    rootDir: spaths.tswow_scripts.abs().get()
                },
                include:include.map(x=>resfp(x))
            }

            wfs.write(
                  mpath(buildDir,'tsconfig.json')
                , JSON.stringify(tsconfig,null,4)
            )

            if(!isInteractive) {
                wsys.execIn(buildDir,'tsc','inherit')
            } else {
                watchTsc(
                      spaths.node_modules.typescript_js.abs().get()
                    , buildDir,termCustom('build',wfs.basename(buildDir))
                )
            }
        }

        makeTsConfig(
              ipaths.bin.scripts.runtime.abs()
            , bpaths.scripts_config.runtime.abs()
            , [spaths.tswow_scripts.runtime.abs(), spaths.tswow_scripts.util.abs()]
        )

        makeTsConfig(
            ipaths.bin.scripts.wow.abs()
          , bpaths.scripts_config.wow.abs()
          , [spaths.tswow_scripts.data.abs(), spaths.tswow_scripts.util.abs(), spaths.tswow_scripts.wotlk.abs()]
        )

        makeTsConfig(
            ipaths.bin.scripts.typescript2cxx.abs()
          , bpaths.scripts_config.typescript2cxx.abs()
          , [spaths.tswow_scripts.typescript2cxx.abs(), spaths.tswow_scripts.util.abs()]
        )

        makeTsConfig(
            ipaths.bin.scripts.addons.abs()
          , bpaths.scripts_config.addons.abs()
          , [spaths.tswow_scripts.addons.abs()]
        )

        spaths.tswow_scripts.data.package_json
            .copy(ipaths.bin.scripts.wow.package_json)

        spaths.tswow_scripts.wotlk.package_json
            .copy(ipaths.bin.scripts.wow.wotlk.package_json)
    }
}
