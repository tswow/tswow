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
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { bpaths, spaths } from './CompilePaths';
import { TrinityCore } from './TrinityCore';
import { wfs, mpath } from '../util/FileSystem';

export namespace Config {

    export async function create(buildType?: string) {
        term.log('build','Creating config files');

        // Create node package by combining template with current dependencies
        const template_package = spaths.misc.install_config.package_json.readJson({});
        const root_package = spaths.package_json.readJson({});

        // Use template as base but update dependencies from root package.json
        const package_json = {
            ...template_package,
            dependencies: root_package.dependencies,
            devDependencies: root_package.devDependencies,
        }
        ipaths.package_json.writeJson(package_json)
        if(!ipaths.package_lock_json.exists()) {
            spaths.package_lock_json.copy(ipaths.package_lock_json)
        }

        term.log('build','Installing npm dependencies...');
        if (isWindows()) {
            wsys.execIn(ipaths.get(), `${ipaths.bin.node.npm_exe.abs().get()} i`);
        } else {
            wsys.execIn(ipaths.get(), 'npm i');
        }

        term.log('build','Creating modules directory...');
        ipaths.modules.mkdir();
        term.log('build','Modules directory created');

        term.log('build','Copying global TypeScript definitions...');
        spaths.tswow_core.Public.global_d_ts
            .copy(ipaths.bin.include.global_d_ts)

        term.log('build','Copying VSCode configuration...');
        spaths.misc.install_config.vscode_install
            .copy(ipaths.vscode)

        term.log('build','Generating node configuration...');
        term.log('build',`Config path: ${ipaths.node_conf.get()}`);

        // Use the new ModernNodeConfig implementation
        try {
            const nodeConfig = new NodeConfigClass(ipaths.node_conf.get(), buildType);
            nodeConfig.generateIfNotExists();

            if (ipaths.node_conf.exists()) {
                term.log('build','Node configuration generated successfully');
            }
        } catch (e) {
            term.error('build',`Failed to generate node config: ${e}`);
            term.log('build','Stack trace:', (e as Error).stack);
            // Don't throw - allow build to continue without config
            term.log('build','Continuing build without node config generation...');
        }

        spaths.misc.install_config.addons.copy(ipaths.bin.addons);
        spaths.cores.TrinityCore.sql.updates.copy(ipaths.bin.sql.updates)
        spaths.cores.TrinityCore.sql.custom.copy(ipaths.bin.sql.custom)

        // Serverside lua includes
        term.log('build','Building serverside Lua includes...');
        spaths.misc.install_config.include_lua.copy(bpaths.include_lua)
        term.log('build',`Copied Lua includes to ${bpaths.include_lua.get()}`);

        if (!bpaths.include_lua.exists()) {
            term.error('build',`Directory ${bpaths.include_lua.get()} does not exist!`);
            return;
        }

        term.log('build',`Running tstl in ${bpaths.include_lua.get()}...`);
        try {
            wsys.execIn(bpaths.include_lua,'npx tstl', 'inherit')
            term.log('build','Serverside Lua includes built successfully');
        } catch (e) {
            term.error('build',`Failed to build Lua includes: ${e}`);
            term.log('build','Continuing without serverside Lua build...');
        }
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
        term.log('build','Building addon event system...');
        term.log('build',`Running tstl in ${bpaths.lua_events.get()}...`);
        try {
            wsys.execIn(bpaths.lua_events, 'npx tstl', 'inherit')
            term.log('build','Addon event system built successfully');
        } catch (e) {
            term.error('build',`Failed to build addon events: ${e}`);
            term.log('build','Continuing without addon event system build...');
        }
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
                      ipaths.bin.scripts.addons.require_preload.relativeTo(
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

        term.log('build','Generating TrinityCore headers...');
        TrinityCore.headers(false);
        spaths.misc.install_config.snippet_example.copy(ipaths.vscode.snippets_out)

        let commit = wsys.exec('git rev-parse HEAD','pipe').split('\n').join('');
        let h = wsys.exec('git status --porcelain')
            .split(' ').join('')
            .split('\n').join('')
            .split('\r').join('');

        ipaths.bin.revisions.tswow.write(`${commit}${h.length>0?'+':''}`)

        ipaths.startBat.write(`./bin/node/npm run start %*`)

        // Create the wrapper script that sets --ipaths
        const wrapperScript = `#!/usr/bin/env node
// This wrapper ensures --ipaths is set before any modules are loaded
process.argv.push('--ipaths=./');
require('./bin/scripts/runtime/TSWoW.js');`;

        ipaths.startJs.write(wrapperScript);


        // Copy mise.toml for Node.js version management
        spaths.misc.install_config.mise_toml.copy(ipaths.mise_toml)

        // todo: realm/dataset configs
        term.log('build','Config files created successfully');
    }
}
