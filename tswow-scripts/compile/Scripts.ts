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
import { mpath, wfs, rpath } from '../util/FileSystem';
import { getTSWatcher } from '../util/TSWatcher';
import { spaths, ipaths } from '../util/Paths';

export namespace Scripts {
    export async function build(buildLine: string, installLine: string) {
        // Scripts config
        const scripts_config_dir = mpath(buildLine, 'scripts-config');
        const scrips_out_dir = rpath(scripts_config_dir,
            mpath(installLine, 'bin', 'scripts', 'tswow'));
        const scripts_root_dir = rpath(scripts_config_dir, spaths.scripts);
        const scripts_tsconfig = {
            compilerOptions: {
                target: 'es2018',
                module: 'commonjs',
                outDir: scrips_out_dir,
                // TODO: https://github.com/tswow/tswow/issues/306
                //strict: true,
                esModuleInterop: true,
                declaration: true,
                sourceMap: true,
                skipLibCheck: true,
                experimentalDecorators: true,
                allowJs: true,
            },
            include: [scripts_root_dir]
        };

        wfs.copy(spaths.wotlkdataPackageJson,
            ipaths.wotlkdataPackageJson);
        wfs.write(mpath(buildLine, scripts_config_dir, 'tsconfig.json'),
            JSON.stringify(scripts_tsconfig, null, 4));

        await (await getTSWatcher(scripts_config_dir)).compile(-1);
    }
}
