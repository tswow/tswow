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
import { mpath, wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { commands } from "./Commands";
import { term } from "../util/Terminal";

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
      "rootDir": "../",
      "outDir": "./build",
      "typeRoots": [
        "node_modules/@wartoshika/wow-declarations",
        "node_modules/lua-types/5.1",
        "node_modules/@types"
      ],
      "experimentalDecorators":true,
      "skipLibCheck": true,
      "types": []
    },
    "include":['./','../shared'],
    "exclude":['../scripts','../assets','../data'],
    "tstl": {
      "luaTarget": "5.1",
      "luaPlugins": [ 
        {"name": "../../../bin/scripts/tswow/addons/RequirePreload.js",'import':'RequirePreload'},
        {"name": "../../../bin/scripts/tswow/addons/MessagePlugin.js",'import':'MessagePlugin'},
      ],
      "noImplicitSelf": true,
    }
  }

/**
 * Contains functions for managing addon development in TSWoW modules.
 */
export namespace Addon {
    export function getAddons(mod: string) {
        return wfs.readDir(ipaths.moduleAddons(mod),true,'directories');
    }

    export function initializeModule(mod: string) {
        if(!wfs.exists(ipaths.addonIndex(mod))) {
            wfs.write(ipaths.addonIndex(mod),'console.log("Hello world!");');
        }

        wfs.copy(ipaths.addonIncludeBinReader,ipaths.addonBinReader(mod));
        wfs.copy(ipaths.addonIncludeEventsTs,ipaths.addonEventsDest(mod));
        wfs.write(ipaths.addonToc(mod),defaultToc(mod));
        wfs.copy(ipaths.addonIncludeRequireStub,ipaths.addonRequireStub(mod));
        wfs.copy(ipaths.addonIncludeGlobal,ipaths.addonDestGlobal(mod));

        wfs.write(ipaths.addonTsConfig(mod),JSON.stringify(defaultTsConfig,null,4));
    }

    export function build(mod: string, dataset: string) {
        term.log(`Building addon ${mod} for dataset ${dataset}`);
        wfs.remove(ipaths.moduleAddonClasses(mod));

        // need to bypass the normal checks for decorators, 
        // so we inject a patch instead of cloning and building the entire repository
        let decoText = wfs.read(ipaths.tstlDecorators);
        let diagnosticsIndex = decoText.indexOf('context.diagnostics.push(');
        if(diagnosticsIndex==-1) {
            throw new Error(`Unable to find the "context.diagnostics" part`);
        }
        if(decoText[diagnosticsIndex-1]!='/') {
            decoText = decoText.substring(0,diagnosticsIndex)+'//'+decoText.substring(diagnosticsIndex,decoText.length);
            wfs.write(ipaths.tstlDecorators,decoText);
        }

        if(!wfs.exists(ipaths.moduleAddons(mod))) {
            throw new Error(`${mod} does not have an addon directory`);
        }

        wfs.remove(ipaths.addonBuild(mod));

        initializeModule(mod);

        wsys.execIn(ipaths.moduleAddons(mod),`node ../../../node_modules/typescript-to-lua/dist/tstl.js`);

        let generatedShared: string[] = [];
        wfs.iterate(ipaths.moduleShared(mod),(name)=>{
            name = wfs.relative(ipaths.moduleShared(mod),name);
            if((name.endsWith('.ts'))&&!name.endsWith('d.ts')) {
                generatedShared.push(`shared\\`+name.substring(0,name.length-2)+'lua');
            }
        });

        let generatedSources : string[] = ['base64.lua','lualib_bundle.lua','RequireStub.lua'];
        let xmlSources : string[] = []
        wfs.iterate(ipaths.moduleAddons(mod),(name)=>{
            name = wfs.relative(ipaths.moduleAddons(mod),name);
            if((
                name.endsWith('.ts') 
                || name.endsWith('.tsx')) 
                && !name.endsWith('-addon.ts')
                && !name.endsWith('d.ts')) {
                generatedSources.push(`addons\\`+name.substring(0,name.length-2)+'lua');
            }

            if(name.endsWith('.xml')) {
                xmlSources.push("addons\\"+name);
                wfs.copy(ipaths.moduleAddonSourceFile(mod,name), ipaths.moduleAddonDestFile(mod,name));
            }
        });

        generatedSources = generatedSources.map(x=>x.split('/').join('\\'));
        xmlSources = xmlSources.map(x=>x.split('/').join('\\'));
        generatedShared = generatedShared.map(x=>x.split('/').join('\\'));

        wfs.copy(ipaths.addonIncludeLualib,ipaths.lualibDest(mod));
        wfs.copy(ipaths.addonIncludeBase64,ipaths.addonBase64Dest(mod));

        wfs.copy(ipaths.addonToc(mod),ipaths.addonBuildToc(mod));
        let text = wfs.read(ipaths.addonBuildToc(mod));
        text+='\n'+generatedSources.join('\n');
        text+='\n'+generatedShared.join('\n');
        text+=`\naddons\\${mod}-addon.lua`;
        text+=`\n${xmlSources.join('\n')}`
        wfs.write(ipaths.addonBuildToc(mod),text);

        if(wfs.exists(ipaths.moduleAddonClasses(mod))) {
            const messages = JSON.parse(wfs.read(ipaths.moduleAddonClasses(mod)));
            for(let path in messages) {
                let message= messages[path];
                let luapath = wfs.relative(ipaths.moduleRoot(mod),path);
                luapath = luapath.substring(0,luapath.length-2)+'lua'
                luapath = mpath(ipaths.addonBuild(mod),luapath);
                let luatext = wfs.read(luapath).split('\n');

                for(let cname in message) {
                    let cls = message[cname];
                    let line = luatext.findIndex(
                        x=>x.includes(`function ${cname}.prototype.____constructor`))
                    luatext[line] = cls+'\n'+luatext[line];
                    if(line === -1) {
                        throw new Error(`Cannot find constructor for message class ${cname}`);
                    }
                }
                wfs.write(luapath,luatext.join('\n'));
            }
        }

        wfs.copy(ipaths.addonBuild(mod),
            mpath(ipaths.clientAddonBuild(dataset,mod)));

        wfs.remove(ipaths.moduleAddonClasses(mod));
    }

    export const command = commands.addCommand('addon');

    export function initialize() {
        Addon.command.addCommand('create','module','Creates addon data in a module',((args)=>{
            if(!wfs.exists(ipaths.moduleRoot(args[0]))) {
                throw new Error(`"${args[0]}" is not an existing module.`);
            }
            initializeModule(args[0]);
        }));
    }
}