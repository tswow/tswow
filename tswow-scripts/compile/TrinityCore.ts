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
import { BuildType } from '../util/BuildType';
import { wfs } from '../util/FileSystem';
import { ipaths, TDB_URL } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { bpaths, spaths } from './CompilePaths';

export namespace TrinityCore {
    export function headers() {
        // todo: duplicate from
        spaths.tswow_core.Public.copy(ipaths.bin.include, true)

        spaths.client_extensions.CustomPackets
            .readDir('ABSOLUTE')
            .filter(x=>x.endsWith('.h'))
            .forEach(x=>x.copy(ipaths.bin.include.join(x.basename())))

        // write enums
        let gdts = spaths.tswow_core.Public.global_d_ts.read('utf-8')
        let tcFiles: string[] = []
        spaths.TrinityCore.src.iterate('RECURSE','FILES','FULL',name=>{
            tcFiles.push(name.get());
        })
        spaths.tswow_core.iterate('RECURSE','FILES','FULL',name=>{
            tcFiles.push(name.get());
        })

        let readFiles: {[key: string]: string} = {}
        let missingEnums: string[] = []
        gdts = gdts.split('\n').map(x=>{
            let match = x.match(/declare +const +enum +([a-zA-Z_][a-zA-Z_0-9]*) +{.*?} +\/\*\* +(.+?):([a-zA-Z_][a-zA-Z_0-9]*).*/)
            if(match) {
                let declName = match[1]
                let filename = match[2];
                let realname = match[3];

                let typeStr = "/**@realType:uint32*/";
                let content = "{}";
                let found = false;

                tcFiles.filter(x=>x.endsWith(filename))
                    .forEach(x=>{
                        let file = readFiles[x] === undefined ? (readFiles[x] = wfs.read(x)) : readFiles[x]
                        // TODO: will break on comments containing "{", "}" or anything between ":" and a type specifier
                        let match = file.match(new RegExp(`enum +${realname} *((?:.|[\r\n])*?){((?:.|[\r\n])*?)};`))
                        if(match) {
                            if(found) {
                                throw new Error(`Multiple definitions of ${realname}, specified to search in filenames ${filename}`)
                            }
                            found = true;
                            let typeHeader = match[1];
                            if(typeHeader.startsWith(':')) {
                                let typeMatch = typeHeader.match(/\: *([a-zA-Z_][a-zA-Z_0-9]*)/);
                                if(typeMatch) {
                                    let type = typeMatch[1];
                                    typeStr = `/**@realType:${type}*/`;
                                }
                            }
                            content = `${match[2]}`;
                        }
                    });
                if(!found) {
                    missingEnums.push(declName);
                }
                return x.replace(match[0],`declare const enum ${declName} ${typeStr} {${content}}`);
            }
            return x;
        }).join('\n');
        if(missingEnums.length>0) {
            throw new Error(`Missing enum declarations: ${missingEnums.join(',')}`)
        }

        ipaths.bin.include.global_d_ts.write(gdts);

        // why is this done in TrinityCore?
        spaths.install_config.include_addon.copy(ipaths.bin.include_addon);

        ipaths.modules.module.all().forEach(mod=>{
            mod.endpoints().forEach(ep=>{
                if(ep.livescripts.exists()) {
                    ipaths.bin.include.global_d_ts
                        .copy(ep.livescripts.global_d_ts)
                }

                if(ep.addon.exists()) {
                    ipaths.bin.include_addon.global_d_ts
                        .copy(ep.addon.global_d_ts)
                }

                if(ep.datascripts.exists()) {
                    ipaths.bin.include.global_d_ts
                        .copy(ep.datascripts.global_d_ts)
                }
            })
        })
    }

    export async function install(cmake: string, openssl: string, mysql: string, type: BuildType, args1: string[]) {
        term.log("MYSQL IS ",mysql);
        term.log('Building TrinityCore');
        bpaths.TrinityCore.mkdir()

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
                +` -S "${spaths.TrinityCore.get()}"`
                +` -B "${bpaths.TrinityCore.get()}"`;
                buildCommand = `${cmake} --build ${bpaths.TrinityCore.get()} --config ${type}`;
                wsys.exec(setupCommand, 'inherit');
                wsys.exec(buildCommand, 'inherit');
            } else {
                bpaths.TrinityCore.mkdir();
                const relSource = bpaths.TrinityCore
                    .relativeFrom(spaths.TrinityCore)
                const relInstall = bpaths.TrinityCore
                    .relativeFrom(bpaths.TrinityCore.join('install','trinitycore'))
                // TODO: Set up optimization flags for o0 as debug and o3 as release
                setupCommand = `cmake ${relSource}`
                +` -DCMAKE_INSTALL_PREFIX=${relInstall}`
                +` -DCMAKE_C_COMPILER=/usr/bin/clang`
                +` -DCMAKE_CXX_COMPILER=/usr/bin/clang++`
                +` -DWITH_WARNINGS=1`
                +` -DSCRIPTS=${scripts}`;
                buildCommand = 'make -j 4';
                await bpaths.TrinityCore.doIn(() => {
                    wsys.exec(setupCommand, 'inherit');
                    wsys.exec(buildCommand, 'inherit');
                    wsys.exec('make install', 'inherit');
                })
            }
        }

        bpaths.TrinityCore.bin(type).scripts
            .copy(ipaths.bin.trinitycore.build.pick(type).scripts)

        bpaths.TrinityCore.configs(type).iterate('FLAT','FILES','FULL',node=>{
            if(node.endsWith('.dll') || node.endsWith('.conf.dist') || node.endsWith('.pdb') || node.endsWith('.exe')) {
                node.copy(ipaths.bin.trinitycore.build.pick(type).configs.join(node.basename()))
            }
        })

        bpaths.TrinityCore.libraries(type).forEach(x=>{
            x.copy(ipaths.bin.libraries.build.pick(type).join(x.basename()))
        })

        // Copy mysql/ssl/cmake libraries
        if (isWindows()) {
            [
                bpaths.mysql.find_subdir().lib.libmysql_dll,
                bpaths.mysql.find_subdir().lib.libmysqld_dll
            ].forEach(x=>{
                x.copy(ipaths.bin.trinitycore.build.pick(type).join(x.basename()))
            })

            bpaths.openssl.libcrypto
                .copy(ipaths.bin.trinitycore.build.pick(type).libcrypto)
        }

        // Move ts-module header files
        headers();

        const rev = wsys.execIn(
              spaths.TrinityCore.get()
            , 'git rev-parse HEAD','pipe').split('\n').join('');
        ipaths.bin.revisions.trinitycore.write(rev)

        spaths.TrinityCore.sql.updates.copy(ipaths.bin.sql.updates)
        spaths.TrinityCore.sql.custom.copy(ipaths.bin.sql.custom)

        if(!ipaths.bin.tdb.exists()) {
            while(!bpaths.tdb.exists()) {
                await wsys.userInput(
                    `Could not find valid tdb.`
                    + `Please download it from ${TDB_URL}\n`
                    + `and place it in ${bpaths.tdb.get()}`
                )
            }
            bpaths.tdb.copy(ipaths.bin.tdb);
        }
    }
}