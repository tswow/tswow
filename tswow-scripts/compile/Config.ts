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
import { NodeConfigClass } from '../util/NodeConfig';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { bpaths, spaths } from './CompilePaths';
import { TrinityCore } from './TrinityCore';

export namespace Config {

    export async function create() {
        term.log('build','Creating config files');

        // Create node package
        const package_json = {
            name: 'tswow',
            version: '0.13.0',
            description: '',
            dependencies: spaths.package_json.readJson({}).dependencies,
            scripts: {
                  start:
                      `node -r source-map-support/register `
                    + ipaths.bin.scripts.runtime.runtime.TSWoW_js.relativeTo(ipaths)
            },
            author:'tswow',
            license: "GPL-3.0-only",
        }
        ipaths.package_json.writeJson(package_json)
        if(!ipaths.package_lock_json.exists()) {
            spaths.package_lock_json.copy(ipaths.package_lock_json)
        }
        wsys.execIn(ipaths.get(), 'npm i');

        ipaths.modules.mkdir();

        spaths.tswow_core.Public.global_d_ts
            .copy(ipaths.bin.include.global_d_ts)

        spaths.misc.install_config.vscode_install
            .copy(ipaths.vscode)

        new NodeConfigClass(ipaths.node_conf.get()).generateIfNotExists();

        spaths.misc.install_config.addons.copy(ipaths.bin.addons);
        spaths.cores.TrinityCore.sql.updates.copy(ipaths.bin.sql.updates)
        spaths.cores.TrinityCore.sql.custom.copy(ipaths.bin.sql.custom)

        // Serverside lua includes
        spaths.misc.install_config.include_lua.copy(bpaths.include_lua),
        wsys.execIn(bpaths.include_lua,'tstl')
        bpaths.include_lua.iterate('RECURSE','FILES','FULL', node => {
            if(['.ts','.json'].find(x=>node.endsWith(x))) {
                return;
            }
            node.copy(ipaths.bin.include_lua.join(node.relativeTo(bpaths.include_lua)))
        })

        // Addon includes
        spaths.misc.install_config.include_addon.copy(ipaths.bin.include_addon)
        ipaths.bin.include_addon.join('Events.ts').remove();
        spaths.misc.install_config.include_addon.Events_ts
            .copy(bpaths.lua_events.events_ts)
        spaths.misc.install_config.include_addon.global_d_ts
            .copy(bpaths.lua_events.global_d_ts)
        bpaths.lua_events.tsconfig_json.writeJson({
            "compilerOptions": {
                "target": "es5",
                "module": "commonjs",
                "strict": true,
                "esModuleInterop": true,
                "skipLibCheck": true,
                "forceConsistentCasingInFileNames": true,
                "declaration": true
            } , "tstl": {
                "luaTarget": "5.1",
                "noImplicitSelf": true,
            }
        })
        wsys.execIn(bpaths.lua_events, 'tstl')
        bpaths.lua_events.events_lua.copy(
            ipaths.bin.include_addon.Events_lua)
        bpaths.lua_events.lualib_bundle.copy(
            ipaths.bin.include_addon.lualib_bundle)
        
        let lualib_bundle = ipaths.bin.include_addon.lualib_bundle.read('utf-8')
        let index = lualib_bundle.lastIndexOf('return {')
        lualib_bundle = lualib_bundle.substring(0,index) + 'local ___lualib_bundle = ' + lualib_bundle.substring(index + 'return '.length)
        lualib_bundle += `tstl_register_module('lualib_bundle',function() return ___lualib_bundle end)`
        ipaths.bin.include_addon.lualib_bundle.write(
            lualib_bundle
        )

        ipaths.bin.include_addon.global_d_ts.toFile().write(
            bpaths.lua_events.global_d_ts.readString()
            + '\n' +
            bpaths.lua_events.events_d_ts.readString()
        )

        ipaths.bin.include_addon.tsconfig_json.writeJson({
            "compilerOptions": {
              "target": "esnext",
              "lib": ["esnext", "dom"],
              "moduleResolution": "node",
              "typeRoots": [
                "node_modules/@wartoshika/wow-declarations",
                "node_modules/lua-types/5.1",
                "node_modules/@types"
              ],
              "experimentalDecorators":true,
              "skipLibCheck": true,
              "types": []
            },
            "tstl": {
              "luaTarget": "5.1",
              "luaPlugins": [
                {"name":
                      ipaths.bin.scripts.addons.addons.require_preload.relativeTo(
                          ipaths.bin.include_addon
                      )
                    , "import":"RequirePreload"
                },
              ],
              "noImplicitSelf": true,
            }
        })
        spaths.misc.install_config.characters_create
            .copy(ipaths.bin.sql.characters_create_sql)
        spaths.misc.install_config.auth_create
            .copy(ipaths.bin.sql.auth_create_sql)
        ipaths.modules.module.all().forEach(x=>{
            x.endpoints().forEach(x=>{
                if(x.addon.exists()) {
                    ipaths.bin.include_addon.global_d_ts
                        .copy(x.addon.global_d_ts)
                }
            })
        })

        TrinityCore.headers(false);
        spaths.misc.install_config.snippet_example.copy(ipaths.vscode.snippets_out)

        let commit = wsys.exec('git rev-parse HEAD','pipe').split('\n').join('');
        let h = wsys.exec('git status --porcelain')
            .split(' ').join('')
            .split('\n').join('')
            .split('\r').join('');

        ipaths.bin.revisions.tswow.write(`${commit}${h.length>0?'+':''}`)

        ipaths.startBat.write(`./bin/node/npm run start %*`)
        // todo: realm/dataset configs
    }
}
