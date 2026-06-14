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
import { ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { bpaths, spaths } from './CompilePaths';

export namespace BLPConverter {
    export async function install(cmake: string) {
        if (isWindows()) {
            wsys.exec(`${cmake} `
                + ` -S "${spaths.misc.blpconverter.get()}" `
                + ` -B "${bpaths.blpconverter.get()}"`
                , 'inherit');
            wsys.exec(`${cmake}`
                + ` --build "${bpaths.blpconverter.get()}"`
                + ` --config Release`, 'inherit');
        } else {
            bpaths.blpconverter.mkdir()
            const relativeBlpConverterSource = bpaths.blpconverter
                .relativeFrom(spaths.misc.blpconverter.get());
            const cc = process.env.TSWOW_CC || '/usr/bin/gcc';
            const cxx = process.env.TSWOW_CXX || '/usr/bin/g++';
            const jobs = require('os').cpus().length;
            await wsys.inDirectory(bpaths.blpconverter.get()
                , () => {
                    wsys.exec(
                        `${cmake} "${relativeBlpConverterSource}"`
                        + ` -DCMAKE_C_COMPILER=${cc}`
                        + ` -DCMAKE_CXX_COMPILER=${cxx}`
                        + ` -DCMAKE_POLICY_VERSION_MINIMUM=3.5`
                        ,  'inherit');
                    wsys.exec(`make -j ${jobs}`,'inherit');
                });
        }
        bpaths.blpconverter.blpconverter_exe.copy(ipaths.bin.BLPConverter.blpconverter)
    }
}
