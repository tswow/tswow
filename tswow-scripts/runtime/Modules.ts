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
import * as chokidar from 'chokidar';
import path from 'path';
import { commands } from '../util/Commands';
import { destroyTSWatcher } from '../util/CompileTS';
import { wfs } from '../util/FileSystem';
import { WDirectory } from '../util/FileTree';
import { ipaths } from '../util/Paths';
import { term } from '../util/Terminal';
import { Addon } from './Addon';
import { Assets } from './Assets';
import { ListCommand } from './CommandActions';
import { Datascripts } from './Datascripts';
import { Dataset, Datasets } from './Dataset';
import { Identifier } from './Identifiers';
import { Livescripts } from './Livescripts';
import { Realm, Realms } from './Realm';
import { Shared } from './Shared';

const gitignores =
`# Build/Garbage
build/
DBFilesClient/
global.d.ts
tsconfig.json
Crashes/
logs/
Server.log
DBErrors.log
*.conf.dist
*_backup/

# Assets
*.blp
*.m2
*.wmo
*.skin
*.anim

# Extracted client data
dbc_source/
dbc/
maps/
mmaps/
vmaps/
Buildings/
Cameras/
luaxml/
luaxml_source/`;

const initializedEndpoints = [
    'datascripts'
  , 'livescripts'
  , 'addon'
  , 'shared'
] as const
type EndpointType = typeof initializedEndpoints[number];

export class ModuleEndpoint {
    readonly mod: Module;
    readonly subdir: string;

    constructor(mod: Module, subdir: string) {
        this.mod = mod;
        this.subdir = subdir;
    }

    // returns all end
    endpoints() {
        return this.mod
            .endpoints()
            .filter(x=>!x.path.relativeTo(this.path).startsWith('..'))
    }

    get subId() {
        return this.path.basename().get();
    }

    get relativePath() {
        return this.path.relativeTo(this.mod.path.dirname());
    }

    get fullName() {
        let parts = this.relativePath.split(/[\\\\/]/)
            .filter(x=>x.length > 0)
        return parts.join('.')
    }

    get realms() {
        return new Realms(this);
    }

    get datasets() {
        return new Datasets(this)
    }

    get datascripts() {
        return new Datascripts(this);
    }

    get shared() {
        return new Shared(this);
    }

    get livescripts() {
        return new Livescripts(this);
    }

    get addon() {
        return new Addon(this);
    }

    get assets() {
        return new Assets(this);
    }

    // never hack: typescript doesn't allow us to infer
    // types by function returns, so we cannot track the real type.
    // but if we retreive it dynamically, we do get the correct type out
    get path() {
        if(this._path !== undefined) return this._path;
        return ( this._path as any ) = this.mod.path.endpoints()
            .find(x=>this.mod.path.relativeFrom(x).get() == this.subdir)
    }
    private _path: never;

    static fromPath(pathIn: string) {
        let parts = wfs.relative(ipaths.modules.get(),pathIn).split(/\\|\//)
        if(parts[0] === '.') parts = parts.slice(1);
        return new ModuleEndpoint(
              new Module(parts[0])
            , parts.slice(1).join(path.sep)
        )
    }
}

export class Module {
    static modules() {
        return ipaths.modules.module.all().map(x=>new Module(x.basename().get()));
    }
    static endpoints(identifier?: string): ModuleEndpoint[] {
        let modules = identifier ? [ipaths.modules.module.pick(identifier)]
            : ipaths.modules.module.all()
        return modules.reduce((p,c)=>{
            return p.concat(c.endpoints()
                .map(x=>
                    new ModuleEndpoint(
                          new Module(c.basename().get())
                        , x.relativeTo(c).get()
                    )
                ))
        },[])
    }

    async destroy() {
        // destroy all watcher processes
        await Promise.all(this.endpoints().map(x=>{
            if(x.datascripts.path.exists()) {
                return destroyTSWatcher(x.fullName);
            }
        }))
        this.path.remove()
    }

    initialize(initializedTypes: EndpointType[] = []) {
        if(!this.path.gitignore.exists()) {
            this.path.gitignore.write(gitignores)
        }

        initializedTypes
            .filter((x,i,a)=>a.indexOf(x) === i)
            .forEach(x=>{
                switch(x) {
                    case 'addon':
                        this.asEndpoint().addon.initialize()
                        break
                    case 'datascripts':
                        this.asEndpoint().datascripts.initialize()
                        break;
                    case 'livescripts':
                        this.asEndpoint().livescripts.initialize()
                        break;
                    case 'shared':
                        this.asEndpoint().shared.initialize()
                        break
                }
            })
        return this;
    }

    asEndpoint() {
        return new ModuleEndpoint(this, '');
    }

    static create(name: string, initializedTypes: EndpointType[] = []) {
        return new Module(name).initialize(initializedTypes);
    }

    static getEndpoint(p: string) {
        return this.endpoints()
            .find(x=>x.path.get() === p)
    }

    readonly id: string;

    get path() {
        return ipaths.modules.module.pick(this.id);
    }

    endpoints() {
        return this.path.endpoints()
            .map(x=>new ModuleEndpoint(this,this.path.relativeFrom(x).get()))
    }

    constructor(id: string) {
        this.id = id;
    }

    static command = commands.addCommand('module')

    static initialize() {
        ListCommand.addCommand('module','','',_=>{
            this.endpoints()
                .filter(x=>term.log(`${x.fullName}: ${x.path.get()}`))
        })
        .addAlias('modules')

        this.command.addCommand(
              'create'
            , 'name --livescripts? --datascripts? --addons? --shared?'
            , ''
            , args => {
                Identifier.assertUnused(args[0],'name');
                let types: EndpointType[] = []
                if(args.includes('--livescripts')) {
                    types.push('livescripts')
                }

                if(args.includes('--datascirpts')) {
                    types.push('datascripts')
                }

                if(args.includes('--addon')) {
                    types.push('addon')
                }

                if(args.includes('shared')) {
                    types.push('shared')
                }

                this.create(args[0],types);
            });

        if(Dataset.all().length === 0 || Realm.all().length === 0) {
            const module = this.create('default')
            module.asEndpoint().realms.create('realm')
            module.asEndpoint().datasets.create('dataset')
        }

        chokidar
            .watch(ipaths.modules.get(),{
                ignored: [
                      /build$/
                    , /Buildings$/
                    , /maps$/
                    , /vmaps$/
                    , /mmaps$/
                    , /dbc$/
                    , /(^|[\/\\])\../
                ]
            })
            .addListener('addDir',_dir=>{
                const dir = new WDirectory(_dir)
                if(dir.dirname().basename().get() == 'modules') {
                    return;
                }

                let endpointType = initializedEndpoints
                    .find(x=>x === dir.basename().get())
                if(endpointType) {
                    let endpoint = this.getEndpoint(dir.dirname().get());
                    if(!endpoint) return;
                    switch(endpointType) {
                        case 'datascripts':
                            Datascripts.create(endpoint)
                            break;
                        case 'livescripts':
                            Livescripts.create(endpoint)
                            break;
                        case 'addon':
                            Addon.create(endpoint)
                            break;
                        case 'shared':
                            Shared.create(endpoint)
                            break;
                    }
                }
            })
    }
}