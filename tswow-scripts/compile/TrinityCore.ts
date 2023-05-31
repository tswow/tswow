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
import { Args } from '../util/Args';
import { BuildType } from '../util/BuildType';
import { wfs } from '../util/FileSystem';
import { ipaths, TDB_URL } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { copyExtLibs } from './CommonCore';
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
    // todo: currently globalOnly only stops sol headers
    // from building before sol is cloned, but it should
    // also stop other headers from generating.
    export function headers(globalOnly: boolean) {
        // todo: duplicate from
        spaths.tswow_core.Public.copy(ipaths.bin.include, true)

        if(!globalOnly) {
            let sol_sourcedir = [
                bpaths.AzerothCore.sol_headers,
                bpaths.TrinityCore.sol_headers
            ].find(x=>x.exists())

            if(!sol_sourcedir) {
                throw new Error(`Can't build headers: no sol2 headers found (you need to build a core first)`)
            }

            sol_sourcedir.copy(ipaths.bin.include);
            bpaths.TrinityCore.lua_headers.src.iterateDef(node=>{
                if(node.endsWith('.h')) {
                    node.copy(ipaths.bin.include.lua.join(node.basename()));
                }
            })

            bpaths.TrinityCore.tracy_source.tracy_header.copy(ipaths.bin.include.tracy.tracy_hpp);
            [bpaths.TrinityCore.tracy_source.common,bpaths.TrinityCore.tracy_source.client].forEach(x=>{
                x.iterateDef((node)=>{
                    if(node.endsWith('.hpp') || node.endsWith('.h')) {
                        node.copy(ipaths.bin.include.tracy.join(x.basename(),node.basename()))
                    }
                });
            });
        }

        spaths.misc.client_extensions.CustomPackets
            .readDir('ABSOLUTE')
            .filter(x=>x.endsWith('.h'))
            .forEach(x=>x.copy(ipaths.bin.include.join(x.basename())))

        // write enums
        let gdts = spaths.tswow_core.Public.global_d_ts.read('utf-8')
        let tcFiles: string[] = []
        spaths.cores.TrinityCore.src.iterate('RECURSE','FILES','FULL',name=>{
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

                            let numPrefix = longestPrefix.length > 0 ? longestPrefix : 'ENUM_'
                            content = content
                                .split('\n')
                                .map((x)=>x
                                    // hack: hardcoded UpdateFields offsets
                                    .split(/OBJECT_END *\+/).join('6 +')
                                    .split(/ITEM_END *\+/).join('64 +')
                                    .split(/CONTAINER_END *\+/).join('138 +')
                                    .split(/UNIT_END *\+/).join('148 +')
                                    .split(/PLAYER_END *\+/).join('1326 +')
                                    .split(/GAMEOBJECT_END *\+/).join('18 +')
                                    .split(/DYNAMICOBJECT_END *\+/).join('12 +')
                                    .split(/CORPSE_END *\+/).join('36 +')
                                )
                                .map((x)=>{
                                    let m = x.match(/^ *([a-zA-Z0-9_]+) *(= *(\d+)|)(?:,|) *(\/\/.+|)/)
                                    if(!m) return x;
                                    if(!isNaN(parseInt(m[1]))) {
                                        x = x.replace(m[1],`${numPrefix}${m[1]}`)
                                        // attempt to improve columns (doesn't always work)
                                        x = x.replace(`${numPrefix}${m[1]}${' '.repeat(numPrefix.length)}`,`${numPrefix}${m[1]}`)
                                    }
                                    return x;
                                })
                                .join('\n')
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

                if(ep.lua.exists()) {
                    ipaths.bin.include.global_d_ts
                        .copy(ep.lua.global_d_ts)
                }
            })
        })
    }

    export async function install(cmake: string, openssl: string, mysql: string, type: BuildType, args1: string[]) {
        //
        // Tracy
        //
        const tracyEnabled = Args.hasFlag(['tracy','tracy-enable'],[process.argv,args1])

        if(Args.hasFlag('notc',[process.argv,args1])) {
            return;
        }

        term.log('build','Building TrinityCore');
        bpaths.TrinityCore.mkdir()

        // We no longer make non-dynamic builds.
        const scripts = Args.hasFlag('minimal',[process.argv,args1])
            ? `minimal-dynamic`
            : args1.includes('noscripts')
            ? 'none'
            : 'dynamic';

        const tools = args1.includes('notools') ? '0' : '1';
        const generateOnly = args1.includes('--generate-only')

        let setupCommand: string;
        let buildCommand: string;

        if(!Args.hasFlag('no-compile',[process.argv,args1])) {
            if (isWindows()) {
                setupCommand = `${cmake} -G "Visual Studio 17 2022" -DTOOLS=${tools}`
                +` -DCMAKE_GENERATOR="Visual Studio 17 2022"`
                +` -DSCRIPTS=${scripts}`
                +` -DMYSQL_INCLUDE_DIR="${mysql}/include"`
                +` -DMYSQL_LIBRARY="${mysql}/lib/libmysql.lib"`
                +` -DOPENSSL_INCLUDE_DIR="${wfs.absPath(openssl)}/include"`
                +` -DOPENSSL_ROOT_DIR="${wfs.absPath(openssl)}"`
                +` -DBOOST_ROOT="${bpaths.boost.boost_1_74_0.abs().get()}"`
                +` -DTRACY_ENABLE="${tracyEnabled?'ON':'OFF'}"`
                +` -DBUILD_SHARED_LIBS="ON"`
                +` -DTRACY_TIMER_FALLBACK="${!Args.hasFlag('tracy-better-timer',[process.argv,args1])?'ON':'OFF'}"`
                +` -DBUILD_TESTING="OFF"`
                +` -S "${spaths.cores.TrinityCore.get()}"`
                +` -B "${bpaths.TrinityCore.get()}"`;
                buildCommand = `${cmake} --build ${bpaths.TrinityCore.get()} --config ${type}`;
                wsys.exec(setupCommand, 'inherit', {env: {BOOST_ROOT:`${bpaths.boost.boost_1_74_0.abs().get()}`,...process.env}});
                if(generateOnly) return;
                wsys.exec(buildCommand, 'inherit');
            } else {
                bpaths.TrinityCore.mkdir();
                const relSource = bpaths.TrinityCore
                    .relativeFrom(spaths.cores.TrinityCore)
                const relInstall = bpaths.TrinityCore
                    .relativeFrom(bpaths.TrinityCore.join('install','trinitycore'))
                // TODO: Set up optimization flags for o0 as debug and o3 as release
                setupCommand = `cmake ${relSource}`
                +` -DCMAKE_INSTALL_PREFIX=${relInstall}`
                +` -DCMAKE_C_COMPILER=/usr/bin/clang`
                +` -DCMAKE_CXX_COMPILER=/usr/bin/clang++`
                +` -DBUILD_SHARED_LIBS="ON"`
                +` -DBUILD_TESTING="OFF"`
                +` -DTRACY_ENABLED="${Args.hasFlag('tracy',[process.argv,args1])}"`
                +` -DTRACY_TIMER_FALLBACK="${!Args.hasFlag('tracy-timer-fallback',[process.argv,args1])?'ON':'OFF'}"`
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

        term.log('build','Copying libraries')
        if(isWindows()) {
            bpaths.TrinityCore.bin(type).scripts
                .copy(ipaths.bin.core.pick('trinitycore').build.pick(type).scripts)

            bpaths.TrinityCore.configs(type).iterate('FLAT','FILES','FULL',node=>{
                if(node.endsWith('.dll') || node.endsWith('.conf.dist') || node.endsWith('.pdb') || node.endsWith('.exe')) {
                    node.copy(ipaths.bin.core.pick('trinitycore').build.pick(type).configs.join(node.basename()))
                }
            })
            bpaths.TrinityCore.tracy_dll(type)
                .copy(ipaths.bin.core.pick('trinitycore').build.pick(type).tracy_client);
        } else {
            [
                  bpaths.TrinityCore.lib_linux
                , bpaths.TrinityCore.bin_linux
                , bpaths.TrinityCore.etc_linux
            ].forEach(x=>x.copy(ipaths.bin.core.pick('trinitycore').build.pick(type)))
        }

        bpaths.TrinityCore.libraries(type).forEach(x=>{
            x.copy(ipaths.bin.libraries.build.pick(type).join(x.basename()))
        });

        if(isWindows()) {
            [bpaths.boost.boost_1_74_0.lib64_msvc_14_2.fslib]
                .forEach(x=>{
                    x.copy(ipaths.bin.libraries.build.pick(type).join(x.basename()))
                })
        }

        // Copy mysql/ssl/cmake libraries
        copyExtLibs('trinitycore', type)

        // Move ts-module header files
        headers(false);

        const rev = wsys.execIn(
              spaths.cores.TrinityCore.get()
            , 'git rev-parse HEAD','pipe').split('\n').join('');
        ipaths.bin.revisions.trinitycore.write(rev)

        term.log('build','Copying sql patches')
        spaths.cores.TrinityCore.sql.updates.copy(ipaths.bin.sql.updates)
        spaths.cores.TrinityCore.sql.custom.copy(ipaths.bin.sql.custom)

        await DownloadFile(TDB_URL,bpaths.tdbArchive.get());
        if(!bpaths.tdbSql.exists()) {
            term.log('build','Extracting tdb')
            SevenZip.extract(
                  bpaths.sevenZip.sevenZa_exe.abs().get()
                , bpaths.tdbArchive.abs().get()
                , bpaths.abs().get()
            )
        }

        if(!ipaths.bin.tdb.exists())
        {
            term.log('build','Rewriting sql for MyISAM')
            bpaths.tdbSql.write(bpaths.tdbSql.readString().split('InnoDB').join('MyISAM')
                .split("ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Version Notes';")
                .join("ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Version Notes';")
            )
            term.log('build','Copying TDB')
            bpaths.tdbSql.copy(ipaths.bin.tdb);
        }
    }
}