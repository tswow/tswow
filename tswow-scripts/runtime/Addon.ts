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
import { FilePath } from "../util/FileTree";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { BuildCommand, ClearCommand, CreateCommand, ListCommand } from "./CommandActions";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { Module, ModuleEndpoint } from "./Modules";
import { NodeConfig } from "./NodeConfig";

const defaultTsConfig = (addon: Addon) => ({
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
        {     "name": ipaths.bin.scripts.addons.addons.require_preload
                        .relativeTo(addon.path).get()
            , 'import':'RequirePreload'
        },
      ],
      "noImplicitSelf": true,
    }
})

const addon_example_ts = (modName: string) => `console.log("Hello from ${modName!} AddOn!")`

export class Addon {
    mod: ModuleEndpoint

    get path() {
        return this.mod.path.addon
    }

    addFilelistToToc(tocFile: string[]) {
        if(!this.path.build.exists()) {
            // we haven't been built yet
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

        let libModules = ipaths.bin.include_addon.readDir()
            .filter(x=>x.endsWith('.lua'))
            .map(x=>x.basename().get())
            .filter(x=>x !== 'lualib_bundle.lua')

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
            ...libModules.map(x=>x),
            '## tsaddon-end-lib')

        let begin = tocFile.indexOf(`## tsaddon-begin: ${this.mod.fullName}`);
        if(begin>=0) {
            let end = tocFile.indexOf(`## tsaddon-end: ${this.mod.fullName}`);
            if(end<0) {
                throw new Error(
                    `Broken FrameXML.toc:`
                  + ` No matching tsaddon-end clause for tsaddon-begin: ${this.mod.fullName}`)
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

        const readToc = (tocPath: FilePath) => {
            if(!wfs.exists(tocPath)) return []
            return wfs.read(tocPath).split('/').join('\\').split('\n');
        }

        let beforelib = readToc(this.path.beforelib_toc);
        let before = readToc(this.path.before_toc);
        let after = readToc(this.path.after_toc);
        const all = beforelib.concat(before.concat(after));

        let modPath = this.mod.fullName.split('.').join('\\')
        const fixToc = (toc: string[]) => {
            return toc.map(x=>`TSAddons\\${modPath}\\addon\\${x}`);
        }

        beforelib = fixToc(beforelib);
        before = fixToc(before);
        after = fixToc(after);

        let names: string[] = before.concat([`TSAddons\\${modPath}\\addon\\${this.mod.subId}-addon.lua`]);
        wfs.iterate(this.path.build,(name)=>{
            let relative = wfs.relative(this.path.build.join('addon'),name)
            relative = relative.split('/').join('\\');
            if(all.includes(relative)) {
                return;
            }

            if(
                   name.endsWith('lualib_bundle.lua')
                || relative.split('\\').join('/').split('/')[0] === 'lib'
            ) {
                return;
            }

            if(wfs.basename(name)!=`${this.mod.subId}-addon.lua`) {
                names.unshift(
                      `TSAddons\\${modPath}\\`
                    + `${wfs.relative(this.path.build,name)
                            .split('/').join('\\')}`);
            }
        });

        names = beforelib.concat(names.concat(after));
        names.unshift(`## tsaddon-begin: ${this.mod.fullName}`);
        names.push(`## tsaddon-end: ${this.mod.fullName}`);
        tocFile.splice(begin,0,...names);
    }

    async build(dataset: Dataset) {
        // 1. Verify and set up environment
        if(!this.path.exists()) {
            throw new Error(`${this.mod.fullName} does not have an addon directory`)
        }
        this.path.build.remove();
        this.initialize();
        await dataset.setupClientData();
        term.log(`Building addon ${this.mod.fullName} for dataset ${dataset.name}`)

        // 2. Patch tstl to allow any kind of decorators (no longer needed?)
        let decoText = ipaths.node_modules.tstl_decorators.read('utf-8')
        let diagnosticsIndex = decoText.indexOf('context.diagnostics.push(');
        if(diagnosticsIndex==-1) {
            throw new Error(`Unable to find the "context.diagnostics" part`);
        }
        if(decoText[diagnosticsIndex-1]!='/') {
            decoText = decoText.substring(0,diagnosticsIndex)+'//'+decoText.substring(diagnosticsIndex,decoText.length);
            ipaths.node_modules.tstl_decorators.write(decoText);
        }

        // 3. Run tstl
        wsys.execIn(
              this.path.get()
            , `node ${ipaths.node_modules.tstl_js.abs()}`
        )

        // 4. Copy all lua files
        this.path.iterate('RECURSE','BOTH','FULL',(node)=>{
            if(node.isDirectory() && node.endsWith('build')) {
                return 'ENDPOINT'
            }
            if(!node.endsWith('.lua')) return;

            node.copy(this.path.build.join('addon',node.relativeTo(this.path)))
            if(node.endsWith(''))
            node.relativeTo(this.path)
        })

        // 5. Hack to write correct require paths
        this.path.build.iterate('RECURSE','FILES','FULL',node=>{
            let lines = node.toFile().readString().split('\n').map(x=>{
                let m = x.match(/local .+? = require\("(.+?)"\)/)
                if(m) {
                    let p = m[1];
                    if(p.startsWith('addon.lib')) {
                        p = `${p.substring('addon.lib.'.length)}`;
                    } else {
                        p = `TSAddons.${this.mod.fullName}.${p}`;
                    }
                    x = x.replace(m[1],p);
                }
                return x;
            }).join('\n')
            node.toFile().write(lines)
        })

        this.path.build.lib.remove();
        wsys.execIn(ipaths.bin.include_addon.get(),'tstl','inherit')
        // todo: copy to dataset directory
        ipaths.bin.include_addon.iterate('RECURSE','FILES','RELATIVE',file=>{
            if(!file.endsWith('.lua')) return;
            if(file.basename().get() == 'lualib_bundle.lua') return;
        })
    }

    initialize() {
        let exists = this.path.exists();
        this.path.tsconfig_json.writeJson(defaultTsConfig(this),4,'OVERWRITE')
        this.path.index_ts.write(addon_example_ts(this.mod.fullName),'DONT_OVERWRITE')
        ipaths.bin.include_addon.iterate('RECURSE','FILES','FULL',node=>{
            if(node.endsWith('.ts') && ! node.endsWith('.d.ts')) {
                node.copy(this.path.lib.join(node.basename()));
            }
        })
        ipaths.bin.include_addon.global_d_ts.copy(this.path.global_d_ts)
        if(!exists) {
            term.success(`Created addon component for module ${this.mod.fullName}`)
        }
        return this;
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
    }

    static create(mod: ModuleEndpoint) {
        return new Addon(mod).initialize();
    }

    exists() {
        return this.path.exists()
    }

    static all() {
        return Module.endpoints()
            .filter(x=>x.addon.exists())
            .map(x=>new Addon(x))
    }

    static updateAddons(dataset: Dataset) {
        wsys.execIn(ipaths.bin.include_addon,'tstl','inherit');
        wfs.iterate(ipaths.bin.include_addon,(fpath)=>{
            if(!fpath.endsWith('.lua')) return;
            const fname = wfs.basename(fpath);
            if(fname==='lualib_bundle.lua') return;
            wfs.copy(fpath,mpath(dataset.path.luaxml.Interface.FrameXML,fname));
        });
        let tocfile = wfs.readLines(dataset.path.luaxml_source.Interface.FrameXML.framexml_toc);
        Module.endpoints()
            .filter(mod=>mod.addon.path.build.exists())
            .forEach(mod=>{
                mod.addon.addFilelistToToc(tocfile);
                mod.addon.path.build.copy(
                    dataset.path.luaxml.Interface.FrameXML.TSAddons.mod
                        .pick(mod.relativePath.get()
                    )
                )
            })
        wfs.writeLines(dataset.path.luaxml.Interface.FrameXML.framexml_toc, tocfile);
        dataset.path.luaxml.copy(dataset.client.path.Data.devPatch)
    }

    static async build(dataset: Dataset) {
        const addons = dataset.modules()
            .map(x=>x.addon)
            .filter(x=>x.exists());
        for(const addon of addons) {
            await addon.build(dataset);
        }
        await this.updateAddons(dataset);
    }

    static clearDevBuild() {
        Dataset.all().forEach(x=>{
            const tsaddons = x.client.path.Data.devPatch.Interface.FrameXML.TSAddons
            x.client.path.Data.devPatch.Interface.FrameXML.TSAddons
                .iterate('RECURSE','DIRECTORIES','FULL',node=>{
                    if(node.basename().get() === 'addon' || node.basename().get() === 'shared')
                    {
                        return 'ENDPOINT'
                    }
                    let rel = node.relativeTo(tsaddons).get()
                    if(ModuleEndpoint.fromPath(rel) === undefined) {
                        node.remove();
                        return 'ENDPOINT'
                    }
                })
        })
    }

    static initialize() {
        ListCommand.addCommand(
            'addon'
          , 'module?'
          , ''
          , args => {
              let isModule = Identifier.isModule(args[0])
              Addon.all()
                  .filter(x=> !isModule || x.mod.mod.id === args[0])
                  .forEach(x=>term.log(x.path.get()))
          }
        ).addAlias('addons')

        CreateCommand.addCommand(
            'addon'
          , 'module'
          , 'Creates a new addon in the specified module'
          , args => {
              this.create(Identifier.getModule(args[0]))
          }
        ).addAlias('addons')

        BuildCommand.addCommand(
              'addon'
            , 'dataset? module?'
            , 'Creates addon data in the specified module(s)'
            , args => {
                this.clearDevBuild();
                return Promise.all(Identifier.getDatasets(args,'MATCH_ANY',NodeConfig.DefaultDataset)
                    .map(async dataset=>{
                        let mods = Identifier.getModules(args,'ALLOW_NONE')
                        if(mods.length === 0) mods = dataset.modules().filter(x=>x.addon.exists())
                        for(const mod of mods) {
                            await mod.addon.build(dataset);
                        }
                        await this.updateAddons(dataset);
                    }))
            }
        )

        ClearCommand.addCommand(
            'addon'
          , 'modules'
          , ''
          , args => {
                this.clearDevBuild();
                const modules = args.length === 0 ? Module.endpoints()
                    : Identifier.getModules(args,'MATCH_ALL')
                modules.forEach(mod=>{
                    mod.addon.path.build.remove();
                    Dataset.all().forEach(dataset=>{
                        dataset.client.path.Data.devPatch.Interface.FrameXML.TSAddons
                            .join(mod.fullName.split('.').join('/')).remove();
                    })
                })
        })
    }
}