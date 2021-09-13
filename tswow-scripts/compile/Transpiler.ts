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
import { mpath, wfs } from '../util/FileSystem';
import { spaths } from '../util/Paths';
import { wsys } from '../util/System';
import { getTSWatcher } from '../util/TSWatcher';
import path = require('path');

export namespace Transpiler {
    export async function buildTranspiler(buildLine: string, installLine: string) {
        const transpiler_config_dir = path.join(buildLine, 'transpiler-config');
        const transpiler_out_dir = path.relative(transpiler_config_dir, path.join(installLine, 'bin', 'scripts', 'transpiler'));
        const transpiler_root_dir = path.relative(transpiler_config_dir, './TypeScript2Cxx');
        const transpiler_type_roots = path.join(transpiler_root_dir, 'node_modules/@types');
        const transpiler_src_dir = path.join(transpiler_root_dir, 'src');
        const transpiler_tsconfig = {
            compileOnSave: false,
            compilerOptions: {
                module: 'commonjs',
                target: 'es2018',
                outDir: (transpiler_out_dir),
                sourceMap: true,
                declaration: false,
                moduleResolution: 'node',
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                alwaysStrict: true,
                typeRoots: [
                    transpiler_type_roots
                ],
                lib: [
                    'es2018',
                    'dom'
                ]
            },
            include: [(transpiler_src_dir)]
        };
        wfs.write(mpath(transpiler_config_dir, 'tsconfig.json'),
            JSON.stringify(transpiler_tsconfig, null, 4));

        wsys.execIn(spaths.typeScript2Cxx,'npm i','inherit');
        await (await getTSWatcher(mpath(transpiler_config_dir))).compile(-1);
    }
}