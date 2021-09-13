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
import { datasetYaml, realmYaml } from '../util/ConfigFiles';
import { wfs } from '../util/FileSystem';
import { ipaths, spaths } from '../util/Paths';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { install_path } from './BuildConfig';

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
        wfs.copy(spaths.sqlUpdates,ipaths.sqlUpdates);
        wfs.copy(spaths.sqlCustom,ipaths.sqlCustom);
        wfs.copy(spaths.installAddonInclude, ipaths.addonInclude);
        wfs.copy(spaths.liveScriptHeaders, ipaths.binInclude);
        wfs.copy(spaths.snippetExample,ipaths.snippetExampleBin);

        wfs.readDir(ipaths.modules,true,'directories').forEach(x=>{
            if(wfs.exists(ipaths.moduleScripts(x))) {
                wfs.copy(ipaths.binglobaldts,ipaths.moduleScriptsGlobaldts(x));
            }
            if(wfs.exists(ipaths.moduleAddons(x))) {
                wfs.copy(ipaths.addonIncludeGlobal,ipaths.addonDestGlobal(x));
            }
        });

        let commit = wsys.exec('git rev-parse HEAD','pipe').split('\n').join('');

        let h = wsys.exec('git status --porcelain')
            .split(' ').join('')
            .split('\n').join('')
            .split('\r').join('');
        wfs.write(ipaths.tswowRevision,commit+(h.length>0?'+':''));

        if(!wfs.exists(ipaths.datasetYaml('default'))) {
            wfs.write(ipaths.datasetYaml('default'),datasetYaml('default'));
        }

        if(!wfs.exists(ipaths.realmYaml('tswow'))) {
            wfs.write(ipaths.realmYaml('tswow'),realmYaml('tswow'));
        }
    }
}
