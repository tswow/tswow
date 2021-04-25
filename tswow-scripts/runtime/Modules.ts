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
import { wfs, mpath } from '../util/FileSystem';
import { term } from '../util/Terminal';
import { commands } from './Commands';
import { wsys } from '../util/System';
import { Timer } from '../util/Timer';
import { destroyTSWatcher, getTSWatcher } from '../util/TSWatcher';
import { ipaths } from '../util/Paths';
import { Identifiers } from './Identifiers';
import { Livescripts } from './Livescripts';
import { Addon } from './Addon';
import { BUILD_TYPES } from '../util/BuildType';

/**
 * The default package.json that will be written to 'datalib' directory of new modules.
 */
const lib_package_json =
(name: string) => JSON.stringify({
    'name': name,
    'version': '1.0.0',
    'description': '',
    'main': `${name}-data.js`,
    'types': `${name}-data.d.ts`,
    'dependencies': {
    },
    'devDependencies': {},
    'scripts': {},
  }, null, 4);

/**
 * The tsconfig.json that will be used to compile 'datalib' directories
 */
export const data_tsconfig =
`{
    "compilerOptions": {
      "target": "es2018",
      "module": "commonjs",
      "outDir": "./build",
      "rootDir": "./",
      "strict": true,
      "esModuleInterop": true,
      "declaration": true,
      "skipLibCheck": true,
      "incremental": true,
      "forceConsistentCasingInFileNames": true,
      "experimentalDecorators": true,
      "sourceMap": true
    }
}`;

/**
 * This is just used for VSCodium, not compiling.
 * See "TypeScript2Cxx/src/wowts.ts" for the tsconfig actually used for compiling.
 */
const scripts_tsconfig_json =
`{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "outDir": "./build",
      "rootDir": "../",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "experimentalDecorators": true,
      "forceConsistentCasingInFileNames": true
    },
    "include":["./","../Ids.ts","../shared"],
    "exclude":["../data","../addons"]
}`;

/**
 * The example patch file that will be written to the 'datascripts' directory of new modules.
 */
const patch_example_ts = (name: string) =>
`import { std } from "tswow-stdlib";

console.log("Hello from ${name} data script!");
`;

const gitignores =
`*.blp
*.dbc
*.m2
*.wmo
*.skin
*.anim
*.phys
*.bone
*.skel
build/
tsconfig.json
symlinked
`;

/**
 * Contains functions for working with tswow modules.
 */
export namespace Modules {
    export const livescript_example =
`export function Main(events: TSEventHandlers) {
    // Register your events here!
}`;

    export class Module {
        id: string;

        constructor(id: string) {
            this.id = id;
        }

        getSourceFiles(types: ('data'|'scripts'|'shared'|'addons')[]) {
            let files: string[] = [];
            types.forEach(x=>{
                let rootdir = mpath(ipaths.moduleRoot(this.id),x);
                wfs.iterate(rootdir,(file)=>{
                    const rel = wfs.relative(rootdir,file);
                    if(rel.startsWith('build')) {
                        return;
                    } else {
                        files.push(file)
                    }
                })
            });
            return files;
        }

        createDataDir() {
            wfs.mkDirs(ipaths.moduleData(this.id));
            wfs.write(
                  ipaths.moduleDataMain(this.id)
                , patch_example_ts(this.id));

            wfs.write(
                  ipaths.moduleDataTsConfig(this.id)
                , data_tsconfig
            )
        }

        createAssets() {
            wfs.mkDirs(ipaths.moduleAssets(this.id));
        }

        createLivescripts() {
            wfs.mkDirs(ipaths.moduleScripts(this.id));
            wfs.mkDirs(ipaths.moduleShared(this.id));
            wfs.write(ipaths.moduleMainScript(this.id),livescript_example);
            wfs.copy(ipaths.binglobaldts,ipaths.moduleScriptsGlobaldts(this.id));
            wfs.write(ipaths.moduleScritpsTsConfig(this.id),scripts_tsconfig_json);
        }

        createSnippets() {
            wfs.mkDirs(ipaths.moduleSnippets(this.id));
            let mainPath = mpath(ipaths.moduleSnippets(this.id),'snippet.ts');
            if(wfs.readDir(ipaths.moduleSnippets(this.id)).length === 0) {
                wfs.copy(ipaths.snippetExampleBin,mainPath);
            }
        }

        createAddon() {
            Addon.initializeModule(this.id);
        }

        setEditable(editable: boolean) {
            if (editable) {
                wfs.remove(ipaths.moduleNoEdit(this.id));
                wfs.remove(ipaths.moduleData(this.id));
            } else {
                if (wfs.exists(ipaths.moduleData(this.id))) {
                    try {
                        wfs.write(
                              ipaths.moduleDataTsConfig(this.id)
                            , data_tsconfig);
                        wsys.execIn(
                              ipaths.moduleData(this.id)
                            , `node ../../../${ipaths.tsc}`);
                    } catch (error) {
                        term.error(error.message);
                        term.error(
                              `Can't noedit ${this.id}`
                            + `, there are compiler errors in it.`);
                        return;
                    }
                    destroyTSWatcher(ipaths.moduleData(this.id));
                    wfs.write(ipaths.moduleNoEdit(this.id), '');
                }
            }
        }

        isEditable() {
            return !wfs.exists(ipaths.moduleNoEdit(this.id));
        }

        async update() {
            if (!wfs.exists(ipaths.moduleGit(this.id))) {
                return;
            }

            try {
                const msg = wsys.execIn(
                    ipaths.moduleRoot(this.id), 'git pull', 'pipe');
                term.log(`${this.id}: ${msg}`);
                if (msg.includes('Already up to date.')) {
                    // Don't run tsc if we didn't update.
                    return;
                }
            } catch (err) {
                const msg = err.message as string;
                if (!msg.includes(
                    'There is no tracking information for the current branch')) {
                    term.error(`Error updating: ${err.message}`);
                } else {
                    // "no tracking information" is not an error for us
                    term.log(`${this.id}: No remotes, skipping.`);
                }
                // In either case, we shouldn't run tsc after this.
                return;
            }

            if (!this.isEditable()) {
                wsys.execIn(
                      ipaths.moduleData(this.id)
                    , `node ../../../${ipaths.tsc}`);
            }
            wfs.remove(ipaths.moduleNodeModule(this.id));
            await refreshModules(false);
        }
        
        linkModule() {
            wfs.write(
                  ipaths.moduleDataPackagePath(this.id)
                , lib_package_json(this.id));
            if(!wfs.exists(ipaths.moduleDataLink(this.id))) {
                wsys.exec(`npm i -S ${ipaths.moduleDataBuild(this.id)}`);
            }
        }
    }

    /**
     * Returns names of all installed modules.
     */
    export function getModules() {
        return wfs.readDir(ipaths.modules, true, 'directories')
            .map(x=>new Module(x));
    }

    export function getModule(mod: string) {
        return new Module(mod);
    }


    /**
     * Creates a new module
     * @param name - Name of the new module
     */
    export function addModule(name: string
                             , addData: boolean
                             , addLive: boolean
                             , addAssets: boolean
                             , addAddon: boolean
                             , addSnippets: boolean
                             ) {
        const timer = Timer.start();

        let url : string|undefined;
        if(name.endsWith('.git')) {
            url = name;
            let split = name.split('/');
            name = split[split.length-1].split('.git').join('');
        }

        Identifiers.assertUnused(name);

        // It's a git repository
        if(url) {
            wsys.execIn(ipaths.modules,`git clone ${url}`);
        } else {
            wfs.mkDirs(ipaths.moduleRoot(name));
            wsys.execIn(ipaths.moduleRoot(name), 'git init');
        }

        let mod = getModule(name);

        if(addData) {
            mod.createDataDir();
        }

        if(addAssets) {
            mod.createAssets();
        }

        if(addLive) {
            mod.createLivescripts();
        }

        if(addAddon) {
            mod.createAddon();
        }

        if(addSnippets) {
            mod.createSnippets();
        }

        // Initialize git repositories

        wfs.write(ipaths.moduleGitignore(name), gitignores);

        refreshModules(false);
        term.success(`Created module ${name} in ${timer.timeSec()}s`);
    }

    export function getModulesOrAll(candidates: string[]) {
        let names = Identifiers.getTypes('module',candidates);
        return names.length===0 ? getModules() : names.map(x=>getModule(x));
    }

    export async function refreshModules(force: boolean = false) {
        if (!wfs.exists(ipaths.nodeModulesWotlkdata)) {
            term.log(`Linking wotlkdata...`);
            wsys.exec(`npm i -S ${ipaths.wotlkdata}`);
        }

        for (const mod of wfs.readDir(ipaths.modules, true)) {
            if (wfs.isDirectory(ipaths.moduleData(mod))) {
                if (!wfs.exists(ipaths.moduleDataTsConfig(mod)) || force) {
                    wfs.write(ipaths.moduleDataTsConfig(mod), data_tsconfig);
                }

                if (!wfs.exists(ipaths.moduleNoEdit(mod))) {
                    await getTSWatcher(ipaths.moduleData(mod));
                }
                getModule(mod).linkModule();
            }

            if(wfs.isDirectory(ipaths.moduleShared(mod))) {
                wfs.copy(ipaths.addonIncludeSharedGlobal,ipaths.sharedGlobal(mod));
            }

            if (wfs.isDirectory(ipaths.moduleScripts(mod))) {
                wfs.copy(ipaths.binglobaldts, ipaths.moduleScriptsGlobaldts(mod));
                if (!wfs.exists(ipaths.moduleScritpsTsConfig(mod)) || force) {
                    wfs.write(ipaths.moduleScritpsTsConfig(mod), scripts_tsconfig_json);
                }
            }
        }
    }

    export function exists(name: string) {
        return wfs.exists(ipaths.moduleRoot(name));
    }

    export async function uninstallModule(name: string) {
        await destroyTSWatcher(ipaths.moduleData(name));
        term.log(`Uninstalling module ${name}`)
        wsys.exec(`npm uninstall ${ipaths.moduleDataBuild(name)}`);
        term.log(`Unlinking ${name} from node_modules`)
        wsys.exec(`npm unlink ${ipaths.moduleDataBuild(name)}`);
        // Delete all built libraries
        for (const p of BUILD_TYPES.map(x=>ipaths.tcScripts(x))) {
            wfs.readDir(p, true).forEach((x) => {
                const lname = Livescripts.getLibrary(name);
                if(x===lname) {
                    wfs.remove(mpath(p,lname));
                }
            });
        }

        if(!wfs.exists(ipaths.moduleRoot(name))) {
            return;
        }
        
        wfs.copy(ipaths.moduleRoot(name), ipaths.moduleFreeGarbage(name));

        // hackfix but this seems to be long enough for vscode to stop fucking around
        term.log(`Removing module directory`);
        for(let i=0;i<3;++i) {
            wfs.remove(ipaths.moduleRoot(name));
            await wsys.sleep(500);
            if(!wfs.exists(ipaths.moduleRoot(name))) {
                break;
            }
        }

        if(wfs.exists(ipaths.moduleRoot(name))) {
            throw new Error(
                 `Failed to remove module directory for ${name}.`
               + ` Please shut down TSWoW and/or VSCodium and remove it manually`);
        }
    }

    export function installModule(url: string) {
        const split = url.split('/');
        const name = split[split.length - 1]
            .split('.git').join('');
        if (name.length < 1) {
            throw new Error(`Tried to install module with invalid name: ${url}`);
        }

        wsys.exec(`git clone ${url} ./modules/${name}`);
        refreshModules();
    }

    export const command = commands.addCommand('module');

    /**
     * Initializes all modules and adds module-related commands.
     */
    export async function initialize() {
        if(wfs.isFile(ipaths.modules)) {
            throw new Error(`${ipaths.modules} is supposed to be a directory, not a file`);
        }

        if(!wfs.exists(ipaths.modules)) {
            wfs.mkDirs(ipaths.modules);
        }

        Modules.command.addCommand(
              'create'
            , 'name --datascripts --livescripts --addon --assets --all'
            , 'Create a new module from a name or git repository'
            , (args) => {
            if (args.length < 1) { 
                throw new Error('Please provide a name for the new module'); 
            }
            if(args.includes(('--all'))) {
                addModule(args[0],true,true,true,true,true);
            } else {
                addModule( args[0]
                        , args.includes('--datascripts')
                        , args.includes('--livescripts')
                        , args.includes('--assets')
                        , args.includes('--addon')
                        , args.includes('--snippets')
                        );
            }
        });

        Modules.command.addCommand(
              'install'
            , 'url'
            , 'Installs a module from a git repository'
            , (args) => {
            installModule(args.join(' '));
        });

        Modules.command.addCommand(
              'uninstall'
            , 'name force?'
            , 'Uninstalls a module'
            , async (args) => {

            await uninstallModule(args[0]);
        });

        Modules.command.addCommand(
              'editable'
            , 'module true|false'
            , 'Sets a data library to not compile its data'
            , async(args) => {

            switch (args[1]) {
                case 'true':
                    return getModule(args[0]).setEditable(true);
                case 'false':
                    return getModule(args[0]).setEditable(false);
                default:
                    term.error('This commands needs to specify true/false');
            }
        });

        Modules.command.addCommand(
              'refresh'
            , ''
            , 'Run this is your ts watchers wont start'
            , async() => {

            refreshModules(false);
        });

        Modules.command.addCommand(
              'list'
            , ''
            , 'Lists the available modules'
            ,  async()=>{

            term.log(`Listing all installed modules:`);
            for(const mod of getModules()) {
                term.log(mod.id);
            }
        });

        Modules.command.addCommand(
              'clear'
            , 'module'
            , 'Clears all built data for a module'
            , async(args) => {

            const result = await destroyTSWatcher(ipaths.moduleData(args[0]));
            wfs.remove(ipaths.moduleDataBuild(args[0]));
            if (result) {
                getTSWatcher(ipaths.moduleData(args[0]));
            }
        });

        Modules.command.addCommand(
              'add-feature'
            , 'module --livescripts --datascripts --addon --assets'
            , 'Adds a new feature to a module'
            , async(args)=>{
                Identifiers.getTypes('module',args).forEach(x=>{
                    let mod = getModule(x);
                    if(args.includes('--snippets')) mod.createSnippets();
                    if(args.includes('--livescripts')) mod.createLivescripts();
                    if(args.includes('--datascripts')) mod.createDataDir();
                    if(args.includes('--addon')) mod.createAddon();
                    if(args.includes('--assets')) mod.createAssets();
                });
                await refreshModules();
        });

        Modules.command.addCommand(
              'update'
            , 'module|all'
            , 'Updates any or all modules from their tracking git repositories'
            , async(args) => {

            await Promise.all(Modules.getModulesOrAll(args).map(x=>{
                return x.update();
            }))
        });

        await refreshModules(true);

        term.success('Modules initialized');
    }
}