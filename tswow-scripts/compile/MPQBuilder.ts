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

export namespace MPQBuilder {
    export async function create(cmake: string) {
        if (isWindows()) {
            wsys.exec(`${cmake} `
                + ` -S "${spaths.misc.mpqbuilder.get()}" `
                + ` -B "${bpaths.mpqbuilder.get()}"`
                + ` -DBOOST_ROOT="${bpaths.boost.boost_1_82_0.abs().get()}"`
                , 'inherit');
            wsys.exec(`${cmake}`
                + ` --build "${bpaths.mpqbuilder.get()}"`
                + ` --config Release`, 'inherit');
        } else {
            bpaths.mpqbuilder.mkdir()
            const relativeMpqSource = bpaths.mpqbuilder.relativeFrom(spaths.misc.mpqbuilder.get());
            const cc = process.env.TSWOW_CC || '/usr/bin/gcc';
            const cxx = process.env.TSWOW_CXX || '/usr/bin/g++';
            const jobs = require('os').cpus().length;
            await wsys.inDirectory(bpaths.mpqbuilder.get()
                , () => {
                    wsys.exec(
                        `${cmake} "${relativeMpqSource}"`
                        + ` -DCMAKE_C_COMPILER=${cc}`
                        + ` -DCMAKE_CXX_COMPILER=${cxx}`
                        + ` -DCMAKE_POLICY_VERSION_MINIMUM=3.5`
                        ,  'inherit');
                    wsys.exec(`make -j ${jobs}`,'inherit');
                });
        }
        bpaths.mpqbuilder.mpqbuilder_exe.copy(ipaths.bin.mpqbuilder.mpqbuilder_exe)
        bpaths.mpqbuilder.luaxml_exe.copy(ipaths.bin.mpqbuilder.luaxml_exe)
    }
}
