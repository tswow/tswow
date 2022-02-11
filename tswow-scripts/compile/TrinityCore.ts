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
import { SevenZip } from '../util/7zip';
import { BuildType } from '../util/BuildType';
import { wfs } from '../util/FileSystem';
import { ipaths, TDB_URL } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { bpaths, spaths } from './CompilePaths';
import { DownloadFile } from './Downloader';

// https://stackoverflow.com/a/68703218/17188274
function prefix(words: string[]){
    // check border cases size 1 array and empty first word)
    if (!words[0] || words.length ==  1) return words[0] || "";
    let i = 0;
    // while all words have the same character at position i, increment i
    while(words[0][i] && words.every(w => w[i] === words[0][i]))
      i++;

    // prefix is the substring from the beginning to the last successfully checked i
    return words[0].substr(0, i);
}

function suffix(words: string[]) {
    return prefix(words.map(x=>x.split('').reverse().join(''))).split('').reverse().join('')
}

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
                        let match = file.match(new RegExp(`enum +(?:class +|)${realname} *((?:.|[\r\n])*?){((?:.|[\r\n])*?)};`))
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
                            let cs = content.split('\n')
                                .map(x=>x.match(/^ *([a-zA-Z0-9_]+) *(= *(\d+)|)(?:,|) *(\/\/.+|)/))
                                .filter(x=>x!=null)
                                .map(x=>({name:x[1],num:x[2]||'',comment:x[4]}))
                            if(cs.length === 0) {
                                throw new Error(`Broken enum: can't parse ${realname} in file ${x}`)
                            }

                            let last = cs[cs.length-1].name
                            let end: {name: string, num: string, comment: string}[] = []
                            if(last.startsWith('MAX') || last.startsWith('TOTAL')) {
                                end.push(cs.pop());
                            }
                            let longestPrefix = prefix(cs.map(x=>x.name))
                            let longestSuffix = suffix(cs.map(x=>x.name))
                            if(longestPrefix.length>0 && longestPrefix.includes('_')) {
                                content = content.split(longestPrefix).join('')
                            }
                            if(longestSuffix.length > 0 && longestSuffix.startsWith('_')) {
                                content = content.split(longestSuffix).join('')
                            }
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
        spaths.tswow_scripts.wotlk.global_d_ts.write(gdts);

        ipaths.modules.module.all().forEach(mod=>{
            mod.endpoints().forEach(ep=>{
                if(ep.livescripts.exists()) {
                    ipaths.bin.include.global_d_ts
                        .copy(ep.livescripts.global_d_ts)
                }

                if(ep.datascripts.exists()) {
                    ipaths.bin.include.global_d_ts
                        .copy(ep.datascripts.global_d_ts)
                }
            })
        })
    }

    export async function install(cmake: string, openssl: string, mysql: string, type: BuildType, args1: string[]) {
        term.log('build','Building TrinityCore');
        bpaths.TrinityCore.mkdir()

        // We no longer make non-dynamic builds.
        const compileType = 'dynamic';
        const scripts = args1.includes('minimal') ?
            `minimal-${compileType}` :
                args1.includes('noscripts') ? 'none' : compileType;

        const tools = args1.includes('notools') ? '0' : '1';
        const generateOnly = args1.includes('--generate-only')

        let setupCommand: string;
        let buildCommand: string;

        if(!args1.includes('--no-compile') && !process.argv.includes('no-compile-tc')) {
            if (isWindows()) {
                setupCommand = `${cmake} -DTOOLS=${tools}`
                +` -DCMAKE_GENERATOR="Visual Studio 16 2019"`
                +` -DSCRIPTS=${scripts}`
                +` -DMYSQL_INCLUDE_DIR="${mysql}/include"`
                +` -DMYSQL_LIBRARY="${mysql}/lib/libmysql.lib"`
                +` -DOPENSSL_INCLUDE_DIR="${wfs.absPath(openssl)}/include"`
                +` -DOPENSSL_ROOT_DIR="${wfs.absPath(openssl)}"`
                +` -DBOOST_ROOT="${bpaths.boost.boost_1_72_0.abs().get()}"`
                +` -S "${spaths.TrinityCore.get()}"`
                +` -B "${bpaths.TrinityCore.get()}"`;
                buildCommand = `${cmake} --build ${bpaths.TrinityCore.get()} --config ${type}`;
                wsys.exec(setupCommand, 'inherit');
                if(generateOnly) return;
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
                    if(generateOnly) return;
                    wsys.exec(buildCommand, 'inherit');
                    wsys.exec('make install', 'inherit');
                })
                if(generateOnly) return;
            }
        } else {
            term.log('build','Skipped compiling TrinityCore')
        }

        if(isWindows()) {
            bpaths.TrinityCore.bin(type).scripts
                .copy(ipaths.bin.core.pick('trinitycore').build.pick(type).scripts)

            bpaths.TrinityCore.configs(type).iterate('FLAT','FILES','FULL',node=>{
                if(node.endsWith('.dll') || node.endsWith('.conf.dist') || node.endsWith('.pdb') || node.endsWith('.exe')) {
                    node.copy(ipaths.bin.core.pick('trinitycore').build.pick(type).configs.join(node.basename()))
                }
            })
        } else {
            [
                  bpaths.TrinityCore.lib_linux
                , bpaths.TrinityCore.bin_linux
                , bpaths.TrinityCore.etc_linux
            ].forEach(x=>x.copy(ipaths.bin.core.pick('trinitycore').build.pick(type)))
        }

        bpaths.TrinityCore.libraries(type).forEach(x=>{
            x.copy(ipaths.bin.libraries.build.pick(type).join(x.basename()))
        })

        // Copy mysql/ssl/cmake libraries
        if (isWindows()) {
            [
                bpaths.mysql.find_subdir().lib.libmysql_dll,
                bpaths.mysql.find_subdir().lib.libmysqld_dll
            ].forEach(x=>{
                x.copy(ipaths.bin.core.pick('trinitycore').build.pick(type).join(x.basename()))
            })

            bpaths.openssl.libcrypto
                .copy(ipaths.bin.core.pick('trinitycore').build.pick(type).libcrypto)
        }

        // Move ts-module header files
        headers();

        const rev = wsys.execIn(
              spaths.TrinityCore.get()
            , 'git rev-parse HEAD','pipe').split('\n').join('');
        ipaths.bin.revisions.trinitycore.write(rev)

        spaths.TrinityCore.sql.updates.copy(ipaths.bin.sql.updates)
        spaths.TrinityCore.sql.custom.copy(ipaths.bin.sql.custom)

        await DownloadFile(TDB_URL,bpaths.tdbArchive.get());
        if(!bpaths.tdbSql.exists()) {
            SevenZip.extract(
                  bpaths.sevenZip.sevenZa_exe.abs().get()
                , bpaths.tdbArchive.abs().get()
                , bpaths.abs().get()
            )
        }

        if(!ipaths.bin.tdb.exists()) {
            bpaths.tdbSql.copy(ipaths.bin.tdb);
        }
    }
}