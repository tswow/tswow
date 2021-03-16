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
import { Datasets } from "./Dataset";
import { Modules } from "./Modules";

function defaultTsConfig(mod: string) {
return {
    "compilerOptions": {
      "target": "esnext",
      "lib": ["esnext", "dom"],
      "moduleResolution": "node",
      "rootDir": "../",
      "outDir": `./build`,
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
        wfs.copy(ipaths.addonIncludeGlobal,ipaths.addonDestGlobal(mod));
        wfs.write(ipaths.addonTsConfig(mod),JSON.stringify(defaultTsConfig(mod),null,4));
    }

    export function updateAddons(dataset: string) {
        let tocfile = wfs.readLines(ipaths.datasetLuaxmlToc(dataset));
        Modules.getModules()
            .filter(x=>wfs.exists(ipaths.addonBuild(x)))
            .forEach(x=>{
                addFilelistToToc(x,tocfile);
                wfs.remove(ipaths.luaxmlAddon(dataset,x));
                wfs.copy(ipaths.addonBuild(x),ipaths.luaxmlAddon(dataset,x));
            });
        wfs.writeLines(ipaths.datasetLuaxmlToc(dataset),tocfile);
        wsys.execIn(ipaths.addonInclude,'tstl','inherit');
        wfs.iterate(ipaths.addonInclude,(fpath)=>{
            if(!fpath.endsWith('.lua')) return;
            const fname = wfs.basename(fpath);
            if(fname==='lualib_bundle.lua') return;
            wfs.copy(fpath,mpath(ipaths.luaxmlFrameXML(dataset),fname));
        });
    }

    export function addFilelistToToc(mod: string, tocFile: string[]) {
        if(!wfs.exists(ipaths.addonBuild(mod))) {
            return;
        }

        let libBegin = tocFile.indexOf(`## tsaddon-begin-lib`);
        if(libBegin>=0) {
            let libEnd = tocFile.indexOf(`## tsaddon-end-lib`);
            if(libEnd<0) {
                throw new Error(
                      `Broken FrameXML.toc:`
                    + ` No matching tsaddon-end-lib clause for ts-addon-begin-lib`);
            }
            tocFile.splice(libBegin,libEnd-libBegin+1);
        }

        let newModules = tocFile.indexOf(`AnimationSystem.lua`);
        if(newModules < 0) {
            throw new Error(
                  `Broken FrameXML.toc:`
                + ` No 'AnimationSystem.lua' line`)
        }

        let libModules = wfs.readDir(ipaths.addonInclude)
            .filter(x=>x.endsWith('.lua'))
            .map(x=>wfs.basename(x))
            .filter(x=>x!=='lualib_bundle.lua')
    
        // These must be first for requires to work correctly
        const score = (a: string) => {
            if(a==='LualibBundle.lua') return 2;
            if(a==='RequireStub.lua') return 1;
            return 0;
        }
        libModules.sort((a,b)=>{
            return score(a) > score(b) ? -1 : 1;
        });

        tocFile.splice(newModules+1,0,
            '## tsaddon-begin-lib',
            ...libModules,
            '## tsaddon-end-lib')

        let begin = tocFile.indexOf(`## tsaddon-begin: ${mod}`);
        if(begin>=0) {
            let end = tocFile.indexOf(`## tsaddon-end: ${mod}`);
            if(end<0) {
                throw new Error(
                    `Broken FrameXML.toc:`
                  + ` No matching tsaddon-end clause for tsaddon-begin: ${mod}`)
            }
            tocFile.splice(begin,end-begin+1)
        } else {
            begin = tocFile.indexOf('## add new modules above here')-1;
            if(begin<0) {
                throw new Error(
                    `Broken FrameXML.toc:`
                  + ` No line '## add new modules above here'`)
            }
        }

        let names: string[] = [`TSAddons\\${mod}\\addons\\${mod}-addon.lua`];
        wfs.iterate(ipaths.addonBuild(mod),(name)=>{
            if(wfs.basename(name)!=`${mod}-addon.lua`) {
                names.unshift(
                      `TSAddons\\${mod}\\`
                    + `${wfs.relative(ipaths.addonBuild(mod),name)
                            .split('/').join('\\')}`);
            }
        });

        names.unshift(`## tsaddon-begin: ${mod}`);
        names.push(`## tsaddon-end: ${mod}`);
        tocFile.splice(begin,0,...names);
    }

    export function buildAll(dataset: Datasets.Dataset) {
        let str: string[] = [];
        dataset.config.modules.forEach(x=>{
            if(wfs.exists(ipaths.moduleAddons(x))) {
                build(x,dataset.id);
                str.push(ipaths.addonBuild(x));
            }
        });
        return str;
    }

    export function build(mod: string, dataset: string) {
        Datasets.get(dataset).installServerData();

        term.log(`Building addon ${mod} for dataset ${dataset}`);
        wfs.remove(ipaths.moduleAddonClasses(mod));

        // need to bypass the normal checks for decorators, 
        // so we inject a patch into tstl instead of maintaining a fork of their repository
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

        wsys.execIn(ipaths.moduleAddons(mod),
            `node ../../../node_modules/typescript-to-lua/dist/tstl.js`);

        // HACK: workaround to properly write require paths
        wfs.iterate(ipaths.addonBuild(mod),(name)=>{
            let rows = wfs.readLines(name);
            rows = rows.map(x=>{
                let m = x.match(/local .+? = require\("(.+?)"\)/)
                if(m) {
                    let p = m[1];
                    if(p.startsWith('addons.lib')) {
                        p = `${p.substring('addons.lib.'.length)}`;
                    } else {
                        p = `TSAddons.${mod}.${p}`;
                    }
                    x = x.replace(m[1],p);
                }
                return x; 
            });
            wfs.writeLines(name,rows);
        });

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
            mpath(Datasets.get(dataset).config.mpq_path));
        wfs.remove(ipaths.moduleAddonClasses(mod));
        wfs.remove(ipaths.addonLualibGarbage(mod));
        wfs.remove(ipaths.addonBuildLib(mod));
        updateAddons(dataset);
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