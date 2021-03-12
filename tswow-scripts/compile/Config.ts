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
import { term } from '../util/Terminal';
import { wfs } from '../util/FileSystem';
import { install_path } from './BuildConfig';
import { wsys } from '../util/System';
import { ipaths, spaths } from '../util/Paths';

export namespace Config {
    export async function create() {
        term.log('Creating config files');

        // Copy configuration/misc files
        if (!wfs.exists(ipaths.nodeYaml)) {
            wfs.copy(spaths.installNodeYaml,ipaths.nodeYaml);
        }

        wfs.copy(spaths.installPackageJson,ipaths.packageJson)

        wsys.execIn(install_path(), 'npm i');

        wfs.copy(spaths.scriptsSql, ipaths.binSql, true)

        if (!wfs.exists(ipaths.modules)) {
            wfs.mkDirs(ipaths.modules);
        }

        if(!wfs.exists(ipaths.moduleRoot('tswow-stdlib'))) {
            wsys.execIn(ipaths.modules, `git clone https://github.com/tswow/tswow-stdlib.git`);
        }

        wfs.copy(spaths.tcGlobaldts,ipaths.binglobaldts);
        wfs.copy(spaths.installVscodeSettings, ipaths.vscodeWorkspace);
        wfs.copy(spaths.installAddons, ipaths.addons);
        wfs.copy(spaths.installSymlinkMaker, ipaths.symlinkMaker);
        wfs.copy(spaths.sqlUpdates,ipaths.sqlUpdates);
        wfs.copy(spaths.installAddonInclude, ipaths.addonInclude);
    }
}
