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
import { EventsTS } from "../addons/events";
import { LualibBundle } from "../addons/lualib_bundle";
import { RequireStub } from "../addons/RequireStub";
import { cfg } from "../util/Config";
import { mpath, wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { BuildCommand } from "./BuildCommand";
import { Client } from "./Client";
import { commands } from "./Commands";
import { Modules } from "./Modules";

const defaultToc = (name: string) => 
`## Interface: 30300
## Title: ${name}
## Version: 1.0
## Notes: Something
## Author: Someone`

const defaultTsConfig = {
    "compilerOptions": {
      "target": "esnext",
      "lib": ["esnext", "dom"],
      "moduleResolution": "node",
      "rootDir": "./",
      "outDir": "./build",
      "typeRoots": [
        "node_modules/@wartoshika/wow-declarations",
        "node_modules/lua-types/5.1",
        "node_modules/@types"
      ],
      "skipLibCheck": true,
      "types": []
    },
    "tstl": {
      "luaTarget": "5.1",
      "luaPlugins": [ 
        {"name": "../../../bin/scripts/tswow/addons/RequirePreload.js",'import':'RequirePreload'},
      ],
      "noImplicitSelf": true,
    }
  }

export namespace Addon {
    export function getAddons(mod: string) {
        return wfs.readDir(ipaths.moduleAddons(mod),true,'directories');
    }

    export function initializeModule(mod: string) {
        if(!wfs.exists(ipaths.addonIndex(mod))) {
            wfs.write(ipaths.addonIndex(mod),'console.log("Hello world!");');
        }

        wfs.write(ipaths.addonEventsDest(mod),EventsTS);
        wfs.write(ipaths.addonToc(mod),defaultToc(mod));
        wfs.write(ipaths.addonRequireStub(mod),RequireStub);
        wfs.copy(ipaths.addonSourceGlobal,ipaths.addonDestGlobal(mod));

        wfs.write(ipaths.addonTsConfig(mod),JSON.stringify(defaultTsConfig,null,4));
    }

    export function build(mod: string) {
        if(!wfs.exists(ipaths.moduleAddons(mod))) {
            throw new Error(`${mod} does not have an addon directory`);
        }

        wfs.remove(ipaths.addonBuild(mod));

        initializeModule(mod);
        wsys.execIn(ipaths.moduleAddons(mod),`tstl.cmd`);

        let generatedSources : string[] = ['lualib_bundle.lua','RequireStub.lua'];
        let xmlSources : string[] = []
        wfs.iterate(ipaths.moduleAddons(mod),(name)=>{
            name = wfs.relative(ipaths.moduleAddons(mod),name);
            if((name.endsWith('.ts') || name.endsWith('.tsx')) && !name.endsWith('-addon.ts')) {
                generatedSources.push(name.substring(0,name.length-2)+'lua');
            }

            if(name.endsWith('.xml')) {
                xmlSources.push(name);
                wfs.copy(mpath(ipaths.moduleAddons(mod),name),mpath(ipaths.addonBuild(mod),name));
            }
        });

        wfs.write(ipaths.lualibDest(mod),LualibBundle);

        wfs.copy(ipaths.addonToc(mod),ipaths.addonBuildToc(mod));
        let text = wfs.read(ipaths.addonBuildToc(mod));
        text+='\n'+generatedSources.join('\n');
        text+=`\n${mod}-addon.lua`;
        text+=`\n${xmlSources.join('\n')}`
        wfs.write(ipaths.addonBuildToc(mod),text);

        wfs.copy(ipaths.addonBuild(mod),
            mpath(cfg.client.directory(),'Interface','Addons',mod));
    }

    export function initialize() {
        const addonCommand = commands.addCommand('addon');

        addonCommand.addCommand('create','module','Creates addon data in a module',((args)=>{
            if(!wfs.exists(ipaths.moduleRoot(args[0]))) {
                throw new Error(`"${args[0]}" is not an existing module.`);
            }
            initializeModule(args[0]);
        }));

        BuildCommand.addCommand('addon','...modules','Builds addons for one, multiple or all moduels',((args)=>{
            Client.kill();
            (args.length != 0 ? args : 
                    Modules.getModules()
                        .filter(x=>wfs.exists(ipaths.moduleAddons(x))))
                .forEach(x=>build(x));
            Client.start();
        }));
    }
}