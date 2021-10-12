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
import { BUILD_TYPES } from '../util/BuildType';
import { destroyTSWatcher, watchTsc } from '../util/CompileTS';
import { mpath, wfs } from '../util/FileSystem';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { Timer } from '../util/Timer';
import { yaml } from '../util/Yaml';
import { Addon } from './Addon';
import { commands } from './Commands';
import { Datasets } from './Dataset';
import { Identifiers } from './Identifiers';

/**
 * The default package.json that will be written to 'datalib' directory of new modules.
 */
export const lib_package_json =
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
    "emitDeclarationOnly": true,
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "skipLibCheck": true,
    "incremental": true,
    "allowJs": false,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "sourceMap": true
  },
  "exclude":["**/build/**","**/tswow/wotlkdata/**"]
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

export const datascripts_swcrc =
{
    "module": {
        "type":"commonjs"
    },
    "exclude":[".*.js$",".*\\.d.ts$"],
    "jsc": {
        "parser": {
            "syntax": "typescript",
            "tsx": false,
            "decorators": true,
            "dynamicImport": true
        },
        "transform":null,
        "target":"es2016",
        "loose":false
    },
    "sourceMaps": true
}

const datascripts_yaml =
`# Allows specifying whether to automatically output type files
# for this module, needed to reference it externally.
# possible values:
# - startup: will build type files on startup (used by stdlib)
# - watch: will use a tswatcher to build declaration files incrementally
# - none: will only build type files with "build types" command
# default: none
type_generation: none

# Allows specifying modules whose types this module depends on.
# Mostly this isn't necessary to fill in, but doing so might
# fix issues with build type declarations.
dependencies:
    - none
`

/**
 * The example patch file that will be written to the 'datascripts' directory of new modules.
 */
const patch_example_ts = (name: string) =>
`import { std } from "tswow-stdlib";

console.log("Hello from ${name} data script!");`;

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
tsconfig.json`;

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

        createDatascripts() {
            wfs.mkDirs(ipaths.moduleData(this.id));
            if(!wfs.exists(ipaths.moduleDataMain(this.id))) {
                wfs.write(
                    ipaths.moduleDataMain(this.id)
                    , patch_example_ts(this.id));
            }

            wfs.copy(
                  ipaths.binglobaldts
                , ipaths.moduleDataLiveGlobal(this.id)
            )

            wfs.write(
                  ipaths.moduleDataTsConfig(this.id)
                , data_tsconfig
            )

            wfs.write(
                  ipaths.moduleSwcRc(this.id)
                , JSON.stringify(datascripts_swcrc,null,4)
            )

            if(!wfs.exists(ipaths.moduleDataYaml(this.id))) {
                wfs.write(ipaths.moduleDataYaml(this.id),datascripts_yaml);
            }
        }

        /**
         * Returns all symlinks between this module and the target datasets client
         */
        getSymlinks(dataset: Datasets.Dataset) {
            if(!wfs.exists(ipaths.moduleAssets(this.id))) {
                return []
            }
            wfs.remove(ipaths.moduleSymlinkFile(this.id));
            const doDir = (dir: string) => {
                let mpqDirs = wfs.readDir(dir,false)
                    .filter(x=>!wfs.isFile(x) && x.toUpperCase().endsWith('.MPQ'))
                mpqDirs.forEach(x=>wfs.remove(ipaths.mpqSymlinkFile(x)));
                let num = `${Math.random()}`;
                wfs.write(ipaths.moduleSymlinkFile(this.id),num);
                let dirs = mpqDirs.filter(x=>wfs.readOr(ipaths.mpqSymlinkFile(x),'')==num);
                mpqDirs.forEach(x=>wfs.remove(ipaths.mpqSymlinkFile(x)));
                wfs.remove(ipaths.moduleSymlinkFile(this.id));
                return dirs;
            }
            return doDir(dataset.client.dataPath)
                .concat(doDir(dataset.client.localePath))
        }

        createAssets() {
            wfs.mkDirs(ipaths.moduleAssets(this.id));
        }

        createLivescripts() {
            wfs.mkDirs(ipaths.moduleScripts(this.id));
            wfs.mkDirs(ipaths.moduleShared(this.id));
            if(!wfs.exists(ipaths.moduleMainScript(this.id))) {
                wfs.write(ipaths.moduleMainScript(this.id),livescript_example);
            }
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
            } catch (err: any) {
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

        getDependencies() {
            return yaml<string[]>(ipaths.moduleDataYaml(this.id),[],'dependencies')
                .filter(x=>isModule(x)
                    && getModule(x).getDatascriptDeclarationType() !== 'none'
                )
                .map(x=>getModule(x))
        }

        getDatascriptDeclarationType(): 'startup'|'watch'|'none' {
            return yaml(ipaths.moduleDataYaml(this.id),'none','type_generation')
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
            mod.createDatascripts();
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

    export function isModule(id: string) {
        return wfs.exists(ipaths.moduleRoot(id));
    }

    export async function refreshModules(force: boolean = false) {
        if (!wfs.exists(ipaths.nodeModulesWotlkdata)) {
            term.log(`Linking wotlkdata...`);
            wsys.exec(`npm i -S ${ipaths.wotlkdata}`);
        }

        for (const mod of wfs.readDir(ipaths.modules, true)) {
            if (wfs.isDirectory(ipaths.moduleData(mod))) {
                wfs.write(ipaths.moduleDataTsConfig(mod), data_tsconfig);
                wfs.write(
                      ipaths.moduleSwcRc(mod)
                    , JSON.stringify(datascripts_swcrc,null,4));

                if(!wfs.exists(ipaths.moduleDataYaml(mod))) {
                    wfs.write(ipaths.moduleDataYaml(mod),datascripts_yaml)
                }

                let bt = new Module(mod).getDatascriptDeclarationType();
                if(bt === 'watch') {
                    watchTsc(ipaths.moduleData(mod),mod);
                }
                if(bt !== 'none') {
                    wfs.write(
                          ipaths.moduleDataPackagePath(mod)
                        , lib_package_json(mod)
                    )
                    getModule(mod).linkModule();
                }
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
        // Delete all built libraries
        BUILD_TYPES.forEach(x=>{
            wfs.remove(ipaths.tcModuleScript(x,name));
            wfs.remove(ipaths.tcModulePdb(x,name));
        })

        await destroyTSWatcher(ipaths.moduleData(name));
        term.log(`Uninstalling module ${name}`)
        wsys.exec(`npm uninstall ${ipaths.moduleDataBuild(name)}`);
        term.log(`Unlinking ${name} from node_modules`)
        wsys.exec(`npm unlink ${ipaths.moduleDataBuild(name)}`);

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

    export function checkSymlinks(dataset: Datasets.Dataset, trace: boolean, ...modules: Module[]) {
        const data = modules
            .filter(x=>wfs.exists(ipaths.moduleAssets(x.id)))
            .map(x=>{return {module:x,symlinks:x.getSymlinks(dataset)}})

        const nonSymlinked = data.filter(({symlinks})=>symlinks.length==0)
        const excess = data.filter(({symlinks})=>symlinks.length>1);
        let symlinkLetters: string[] = [dataset.config.dev_patch_letter]
        let helpString: string[] = []

        // clean these first so we have as many free modules as possible
        if (excess.length>0) {
            excess.forEach(({module,symlinks})=>{
                const removed = symlinks.slice(1);
                term.warn(
                      `Module ${module.id} had multiple symlinks to client ${dataset.client.dataPath}. `
                    + `Removing the following directories: ${removed.join(',')}...`
                );
                removed.forEach(x=>{
                    wfs.remove(x);
                });
            });
        }

        for(const {module} of nonSymlinked) {
            try {
                const letter = dataset.client.freePatchLetter(symlinkLetters);
                symlinkLetters.push(letter);
                helpString.push(
                        `mklink /J `
                    + `"${mpath(dataset.client.dataPath,`patch-${letter}.MPQ`)}" `
                    + `"${wfs.absPath(ipaths.moduleAssets(module.id))}" `
                    )
            } catch(err) {
                term.error(
                        `You have too many patches in client ${dataset.client.dataPath} `
                    + `to create symlinks for all your modules. Please look over them manually.`)
                return;
            }
        }

        if(helpString.length > 0) {
            term.warn(
                    `You have asset modules that are not symlinked to client ${dataset.client.dataPath}\n`
                + `Since this requires elevated (admin) permissions, we ask you to create these manually for security.\n\n`
                + `To set up symlinks, run the following command from an elevated (admin) command prompt: \n\n`
                + helpString.join(' && ')
            )
        } else if(data.length == 0 && trace) {
            term.warn(`You don't have any asset modules to symlink`);
        } else if(trace) {
            term.success(`All your asset modules are correctly symlinked to client ${dataset.client.dataPath}`);
        }

        // this should print as success even if we had errors
        if(trace) {
            // this can include excess symlinks, since the first element will still be valid after cleaning
            let correct = data.filter(({symlinks})=>symlinks.length!=0);
            if(correct.length>0) {
                term.success(`Existing symlinks:`)
            }
            correct.forEach(({module,symlinks})=>{
                term.success(`    ${module.id} -> ${wfs.basename(symlinks[0])}`)
            });
        }
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
              'add-feature'
            , 'module --livescripts --datascripts --addon --assets'
            , 'Adds a new feature to a module'
            , async(args)=>{
                Identifiers.getTypes('module',args).forEach(x=>{
                    let mod = getModule(x);
                    if(args.includes('--snippets')) mod.createSnippets();
                    if(args.includes('--livescripts')) mod.createLivescripts();
                    if(args.includes('--datascripts')) mod.createDatascripts();
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

        Modules.command.addCommand(
              'symlink'
            , 'module|all dataset|default'
            , 'Checks symlink status on provided modules against a dataset, and cleans duplicate links'
            , async(args)=>{
                let modules = Modules.getModulesOrAll(args);
                let datasets = Datasets.getDatasetsOrDefault(args);
                datasets.forEach(dataset=>{
                    checkSymlinks(dataset,true,...modules);
                });
            }
        ).addAlias('symlinks')

        await refreshModules(true);
        term.success('Modules initialized');
    }
}