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
import { wfs, mpath } from '../util/FileSystem';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { bpaths, ipaths, spaths, TDB_URL } from '../util/Paths';
import * as fs from 'fs';
import request from 'request';
import progress from 'request-progress';
import { SevenZip } from '../util/7zip';
import { BuildType } from '../util/BuildType';

export namespace TrinityCore {
    export function headers() {
        wfs.copy(spaths.liveScriptHeaders, ipaths.binInclude, true);
        wfs.copy(spaths.installAddonInclude, ipaths.addonInclude, true);

        wfs.readDir(ipaths.modules,true,'directories').forEach(x=>{
            if(wfs.exists(ipaths.moduleScripts(x))) {
                wfs.copy(ipaths.binglobaldts,ipaths.moduleScriptsGlobaldts(x));
            }
        });

        wfs.readDir(ipaths.modules,true,'directories').forEach(x=>{
            if(wfs.exists(ipaths.moduleAddons(x))) {
                wfs.copy(ipaths.addonIncludeGlobal,ipaths.addonDestGlobal(x))
            }
        });
    }

    export async function install(cmake: string, openssl: string, mysql: string, type: BuildType, args1: string[]) {
        term.log('Compiling TrinityCore');

        wfs.mkDirs(bpaths.trinitycore);

        // We no longer make non-dynamic builds.
        const compileType = 'dynamic';
        const scripts = args1.includes('minimal') ?
            `minimal-${compileType}` :
                args1.includes('noscripts') ? 'none' : compileType;

        const tools = args1.includes('notools') ? '0' : '1';

        let setupCommand: string;
        let buildCommand: string;

        if(!args1.includes('--no-compile')) {
            if (isWindows()) {
                setupCommand = `${cmake} -DTOOLS=${tools}`
                +` -DSCRIPTS=${scripts}`
                +` -DMYSQL_INCLUDE_DIR="${mysql}/include"`
                +` -DMYSQL_LIBRARY="${mysql}/lib/libmysql.lib"`
                +` -DOPENSSL_INCLUDE_DIR="${openssl}/include"`
                +` -DOPENSSL_ROOT_DIR="${openssl}"`
                +` -S "${spaths.trinityCore}"`
                +` -B "${bpaths.trinitycore}"`;
                buildCommand = `${cmake} --build ${bpaths.trinitycore} --config ${type}`;
                wsys.exec(setupCommand, 'inherit');
                wsys.exec(buildCommand, 'inherit');
            } else {
                wfs.mkDirs(bpaths.trinitycore);
                const relativeSourcePath = wfs.relative(
                    bpaths.trinitycore,
                    spaths.trinityCore);
                const relativeInstallPath = wfs.relative(
                    bpaths.trinitycore,
                    mpath(bpaths.trinitycore, 'install/trinitycore'));
                // TODO: Set up optimization flags for o0 as debug and o3 as release
                setupCommand = `cmake ${relativeSourcePath}`
                +` -DCMAKE_INSTALL_PREFIX=${relativeInstallPath}`
                +` -DCMAKE_C_COMPILER=/usr/bin/clang`
                +` -DCMAKE_CXX_COMPILER=/usr/bin/clang++`
                +` -DWITH_WARNINGS=1`
                +` -DSCRIPTS=${scripts}`;
                buildCommand = 'make -j 4';
                await wsys.inDirectory(bpaths.trinitycore, () => {
                    wsys.exec(setupCommand, 'inherit');
                    wsys.exec(buildCommand, 'inherit');
                    wsys.exec('make install', 'inherit');
                });
            }
        }

        // Copy TrinityCore Binaries
        if (!wfs.exists(bpaths.trinitycoreBin(type))) {
            return;
        }

        // copy static libraries
        bpaths.tcStaticLibraries(type)
            .forEach(x => wfs.copy(x,mpath(ipaths.binLibraries(type),wfs.basename(x))));

        // copy executables
        wfs.copy(bpaths.trinitycoreBin(type), ipaths.tc(type), true);

        // copy conf files
        if(!isWindows()) {
            wfs.copy(bpaths.trinitycoreConf(type),ipaths.tc(type),false)
        }

        // Copy mysql/ssl/cmake libraries
        if (isWindows()) {
            bpaths.mysqlLibs(mysql)
                .forEach(x=>wfs.copy(x,mpath(ipaths.tc(type),wfs.basename(x))))
            wfs.copy(bpaths.libcrypto(openssl), 
                mpath(ipaths.tc(type),wfs.basename(bpaths.libcrypto(openssl))))
        }

        // Move ts-module header files
        headers();

        const rev = wsys.execIn(spaths.trinityCore,'git rev-parse HEAD','pipe').split('\n').join('');
        wfs.write(ipaths.tcRevision,rev);

        wfs.copy(spaths.sqlUpdates,ipaths.sqlUpdates);
        wfs.copy(spaths.sqlCustom,ipaths.sqlCustom)

        if(wfs.exists(ipaths.tdb)) {
            return;
        }

        if(!wfs.exists(bpaths.tdbSql)) {
            if(!wfs.exists(bpaths.tdb7z)) {
                term.log(`Downloading tdb from ${TDB_URL}...`);
                await new Promise<void>((res,rej)=>{
                progress(request(TDB_URL))
                    .on('progress',function(data: any){
                        term.log(`Download progress: ${(data.percent*100).toFixed(2)}%`);
                    })

                    .on('error', function(err: any){
                        rej(err);
                    })

                    .on('end', function() {
                        // TODO: workaround because the download doesn't release the file handle in time
                        term.success('Finished download, sleeping for 2 seconds to fix file handles (workaround)')
                        setTimeout((x)=>{
                            res();
                        },2000);
                    })
                    .pipe(fs.createWriteStream(bpaths.tdb7z));
                });
            }
            term.log("Extracting tdb");
            SevenZip.extract(bpaths.tdb7z,bpaths.base);
            if(!wfs.exists(bpaths.tdbSql)) {
                throw new Error(`Failed to extract tdb from 7z`);
            }
        }

        term.log("Copying tdb");
        wfs.copy(bpaths.tdbSql,ipaths.tdb);
    }
}