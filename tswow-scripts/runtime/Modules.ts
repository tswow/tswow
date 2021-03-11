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
import { compileAll, destroyTSWatcher, getTSWatcher } from '../util/TSWatcher';
import { isWindows } from '../util/Platform';
import { FileChanges } from '../util/FileChanges';
import { ipaths } from '../util/Paths';
import { BuildCommand } from './BuildCommand';
import { NodeConfig } from './NodeConfig';
import { Realm } from './Realm';
import { Datasets } from './Dataset';

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
const data_tsconfig =
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

const ids_ts = (modname: string) =>
`import { GetId, GetIdRange } from "wotlkdata"

export namespace ${modname} {
    // Do NOT change this, even if you rename the mod directory
    const MODNAME = "${modname}";

    // Example for ID registration
    // export const MY_UNIT_ID = GetId("creature_template",MODNAME,"my_unit");
}`;

/**
 * The example patch file that will be written to the 'data' directory of new modules.
 */
const patch_example_ts = (name: string) => `
import { std } from "tswow-stdlib";

console.log("Hello from ${name} data script!");
`;

const livescript_example =
`export function Main(events: TSEventHandlers) {
    // Register your events here!
}`;

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
    /**
     * Returns names of all installed modules.
     */
    export function getModules() {
        return wfs.readDir(ipaths.modules, true, 'directories');
    }

    export function setEditable(mod: string, editable: boolean) {
        if (editable) {
            wfs.remove(ipaths.moduleNoEdit(mod));
            wfs.remove(ipaths.moduleData(mod));
        } else {
            if (wfs.exists(ipaths.moduleData(mod))) {
                try {
                    wfs.write(ipaths.moduleDataTsConfig(mod), data_tsconfig);
                    wsys.execIn(ipaths.moduleData(mod), `node ../../../${ipaths.tsc}`);
                } catch (error) {
                    term.error(error.message);
                    term.error(`Can't noedit ${mod}, there are compiler errors in it.`);
                    return;
                }
                destroyTSWatcher(ipaths.moduleData(mod));
                wfs.write(ipaths.moduleNoEdit(mod), '');
            }
        }
    }

    export function isEditable(mod: string) {
        return !wfs.exists(ipaths.moduleNoEdit(mod));
    }

    export function update(mod: string) {
        if (mod === 'all') {
            term.log(`Updating all modules...`);
            return getModules().forEach(update);
        }
        if (!wfs.exists(ipaths.moduleGit(mod))) {
            return;
        }

        try {
            const msg = wsys.execIn(ipaths.moduleRoot(mod), 'git pull', 'pipe');
            term.log(`${mod}: ${msg}`);
            if (msg.includes('Already up to date.')) {
                // Don't run tsc if we didn't update.
                return;
            }
        } catch (err) {
            const msg = err.message as string;
            if (!msg.includes('There is no tracking information for the current branch')) {
                term.error(`Error updating: ${err.message}`);
            } else {
                // "no tracking information" is not an error for us
                term.log(`${mod}: No remotes, skipping.`);
            }
            // In either case, we shouldn't run tsc after this.
            return;
        }

        if (!isEditable(mod)) {
            wsys.execIn(ipaths.moduleData(mod), `node ../../../${ipaths.tsc}`);
        }
        wfs.remove(ipaths.moduleNodeModule(mod));
        refreshModules(false);
    }

    /**
     * Creates a new module
     * @param name - Name of the new module
     */
    export function addModule(name: string) {
        const timer = Timer.start();

        let url : string|undefined;
        if(name.endsWith('.git')) {
            url = name;
            let split = name.split('/');
            name = split[split.length-1].split('.git').join('');
        }

        if (wfs.exists(ipaths.moduleRoot(name))) {
            throw new Error('Module already exists:' + name);
        }

        // It's a git repository
        if(url) {
            wsys.execIn(ipaths.modules,`git clone ${url}`);
        } else {
            wfs.mkDirs(ipaths.moduleRoot(name));
            wsys.execIn(ipaths.moduleRoot(name), 'git init');
        }

        wfs.mkDirs(ipaths.moduleData(name));
        wfs.mkDirs(ipaths.moduleData(name));
        wfs.write(ipaths.moduleDataMain(name), patch_example_ts(name));
        wfs.mkDirs(ipaths.moduleAssets(name));
        wfs.mkDirs(ipaths.moduleScripts(name));
        wfs.mkDirs(ipaths.moduleShared(name));

        // Initialize git repositories

        wfs.write(ipaths.moduleGitignore(name), gitignores);
        wfs.write(ipaths.moduleMainScript(name),livescript_example);

        refreshModules(false);
        term.success(`Created module ${name} in ${timer.timeSec()}s`);
    }

    export function getBuiltLibraryName(mod: string) {
        mod = `scripts_${mod.split(' ').join('_').split('-').join('_')}_ts`;
        if(isWindows()) {
            return `${mod}.dll`;
        } else {
            return `${mod}.so`;
        }
    }

    /**
     * Builds dbc and sql data for all modules.
     */
    export async function rebuildPatch(dataset: string = 'default', args: string[]) {
        await refreshModules();
        const ct = Date.now();
        await compileAll(8000);
        term.log(`Compiled scripts in ${((Date.now()-ct)/1000).toFixed(2)} seconds.`)
        wfs.mkDirs(ipaths.datasetDBC(dataset), true);

        const set = Datasets.get(dataset);

        set.installServerData();

        const settings = {
            auth : NodeConfig.database_settings('auth'),
            world : NodeConfig.database_settings('world',dataset),
            world_source : NodeConfig.database_settings('world_source',dataset),
            use_pooling : NodeConfig.use_pooling,
            dbc_source : ipaths.datasetDBCSource(dataset),
            dbc_out : ipaths.datasetDBC(dataset),
            luaxml_source : ipaths.datasetLuaxmlSource(dataset),
            luaxml_out : ipaths.datasetLuaXML(dataset),
            modules: set.config.modules,
            id_path: ipaths.datasetIds(dataset),
            readonly: args.includes('readonly'),
        }
        const program = `node -r source-map-support/register ${ipaths.wotlkdataIndex} `
            + `${JSON.stringify(settings).split('\"').join('\'')}`
        try {
            wsys.exec(program, 'inherit');
        } catch (error) {
            throw new Error(`Failed to rebuild patches: ${error.message}`);
        }
    }

    /**
     * Builds and reloads the server code for a specific module.
     * @param name - Name of the module to rebuild.
     */
    export async function rebuildScripts(name: string, type: 'Release'|'Debug') {
        await refreshModules();
        const scriptsDir = ipaths.moduleScripts(name);

        const files = wfs.readDir(scriptsDir, true, 'both');

        // Don't build if the entry point doesn't exist or its livescript is just the template.
        const mainScript = ipaths.moduleMainScriptName(name);
        if (!files.includes(mainScript)) { return false; }

        // TODO: terrible check
        if(wfs.read(ipaths.moduleMainScript(name)) === livescript_example) {
            return false;
        }

        const timer = Timer.start();
        wsys.exec(`node ${ipaths.transpilerEntry} ${name} ${type}`,'inherit');

        wfs.copy(ipaths.moduleScriptsBuiltLibrary(name,type),ipaths.tcModuleScript(type,name))
        if(wfs.exists(ipaths.moduleScriptsBuiltPdb(name,type))) {
            wfs.copy(ipaths.moduleScriptsBuiltPdb(name,type),ipaths.tcModulePdb(type,name));
        }

        // TrinityCore.sendToWorld(`tsreload ${name}.dll`);
        // TODO We need to wait for output from trinitycore to continue here
        term.log(`Rebuilt code for ${name} in ${timer.timeSec()}s`);
        return true;
    }

    /**
     * Builds an mpq file from module data scripts and assets, and places it in the client data directory.
     *
     * @warn - **OVERWRITES** any previously named mpq file at the configured location.
     */
    export async function buildMpq(dataset: string, folder: boolean = false, args: string[] = []) {
        const timer = Timer.start();
        const ds = Datasets.get(dataset);

        // Build output dbc
        await rebuildPatch(dataset, args);
        const modules = Realm.getRealm(dataset).config.modules;

        const sectionTimer = Timer.start();
        const time = (str: string) => 
            console.log(`${str} in ${(sectionTimer.timeRestart()/1000).toFixed(2)}`)

        const paths = getModules()
            .filter(x => !wfs.exists(ipaths.moduleSymlink(x)) && modules.includes(x))
            .map(x => ipaths.moduleAssets(x))
            .filter(x => wfs.exists(x))
            .map(x => `"${x}"`);
        
        await ds.client.kill();
        time(`Killed client`);

        if (folder !== wfs.isDirectory(ds.config.mpq_path)) {
            wfs.remove(ds.config.mpq_path);
        }

        if (folder) {
            wfs.mkDirs(ds.config.mpq_path);
            const allpaths = paths.map(x => `./${x.substring(1, x.length - 1)}`)
                .concat([
                    ipaths.datasetDBC(dataset), 
                    ipaths.datasetLuaXML(dataset)
                ]);
            const ignored = ds.config.ignore_assets;
            FileChanges.startCache();
            allpaths.forEach(x => wfs.iterate(x, path => {
                for (const ig of ignored) {
                    if (path.endsWith(ig))  {
                        return;
                    }
                }

                let rel = wfs.relative(x, path);
                if (rel.endsWith('.dbc')) {
                    rel = mpath('DBFilesClient', rel);
                }
                const out = mpath(ds.config.mpq_path, rel);

                if (
                    FileChanges.isChanged(path, 'mpq') 
                    || !wfs.exists(out) 
                    || rel.endsWith('.dbc')
                    || rel.endsWith('.lua')
                    || rel.endsWith('.xml')
                    ) {
                        wfs.copy(path, out);
                }
                FileChanges.tagChange(path, 'mpq');
            })); 
            FileChanges.endCache();
        } else {
            wsys.exec(`"${ipaths.mpqBuilderExe}"`
            +` "${ds.config.mpq_path}"`
            +` "${wfs.removeDot(ipaths.datasetDBC(ds.id))}"`
            +` "${wfs.removeDot(ipaths.datasetLuaxml(ds.id))}"`
            +` "${paths.join(' ')}`, 'inherit');
        }

        time(`Wrote file changes`);

        term.success(`Built SQL/DBC/MPQ data in ${timer.timeSec()}s`);
    }

    export function linkModule(mod: string) {
        wfs.write(ipaths.moduleDataPackagePath(mod), lib_package_json(mod));
        if(!wfs.exists(ipaths.moduleDataLink(mod))) {
            wsys.exec(`npm link ${ipaths.moduleDataBuild(mod)}`);
            wsys.exec(`npm i -S ${ipaths.moduleDataBuild(mod)}`);
        }
    }

    export async function refreshModules(force: boolean = false) {
        if (!wfs.exists(ipaths.nodeModulesWotlkdata)) {
            term.log(`Linking wotlkdata...`);
            wsys.exec(`npm link ${ipaths.wotlkdata}`)
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
                linkModule(mod);
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


    export async function uninstallModule(name: string) {
        await destroyTSWatcher(ipaths.moduleData(name));
        term.log(`Uninstalling module ${name}`)
        wsys.exec(`npm uninstall ${ipaths.moduleDataBuild(name)}`);
        term.log(`Unlinking ${name} from node_modules`)
        wsys.exec(`npm unlink ${ipaths.moduleDataBuild(name)}`);
        // Delete all built libraries
        for (const p of [ipaths.tcScripts('Release'), ipaths.tcScripts('Debug')]) {
            wfs.readDir(p, true).forEach((x) => {
                const lname = getBuiltLibraryName(name);
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
            throw new Error(`Failed to remove module directory for ${name}. Please shut down TSWoW and/or VSCodium and remove it manually`);
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

    /**
     * Initializes all modules and adds module-related commands.
     */
    export async function initialize() {
        if (wfs.isFile('./modules')) {
            throw new Error('"modules" is supposed to be a directory, not a file');
        }

        if (!wfs.exists('./modules')) {
            wfs.mkDirs('./modules');
        }

        const moduleC = commands.addCommand('module');

        moduleC.addCommand('create', 'name', 'Create a new module from a name or git repository', (args) => {
            if (args.length < 1) { throw new Error('Please provide a name for the new module'); }
            addModule(args[0]);
        });

        moduleC.addCommand('install', 'url', 'Installs a module from a git repository', (args) => {
            installModule(args.join(' '));
        });

        moduleC.addCommand('uninstall', 'name force?', 'Uninstalls a module', async (args) => {
            await uninstallModule(args[0]);
        });

        BuildCommand.addCommand('data', 'clientonly? rebuild? package?',
            'Builds data patches and then restarts the affected processes', async(args) => {
            if (args.includes('clientonly') && args.includes('rebuild')) {
                throw new Error(`Can't both rebuild and restart only the client, rebuilding requires restarting the server.`);
            }
            let datasets = args.filter(x=>x!='clientonly'&&x!='rebuild');
            let dataset = datasets.length === 0 ? 'default': datasets[0];
            await buildMpq(dataset, true, args);
            Datasets.get(dataset).client.start();
        });

        BuildCommand.addCommand('scripts', 'module? debug?', 'Build and loads the server scripts of a module', async (args) => {
            let isDebug = args.indexOf('debug')!==-1;
            let modules = args.filter(x=>x!=='debug');
            if (modules.length === 0) {
                modules = getModules();
            }

            let ctr = 0;
            for (const mod of modules) {
                if (await rebuildScripts(mod, isDebug? 'Debug': 'Release')) {
                    ++ctr;
                }
            }

            term.success(`Built ${ctr} scripts`);
        });

        moduleC.addCommand('editable', 'module true|false', 'Sets a data library to not compile its data', async(args) => {
            switch (args[1]) {
                case 'true':
                    return setEditable(args[0], true);
                case 'false':
                    return setEditable(args[0], false);
                default:
                    term.error('This commands needs to specify true/false');
            }
        });

        moduleC.addCommand('refresh', '', 'Run this is your ts watchers wont start', async() => {
            refreshModules(false);
        });

        moduleC.addCommand('list','','Lists the available modules', async()=>{
            term.log(`Listing all installed modules:`);
            for(const mod of getModules()) {
                term.log(mod);
            }
        });

        moduleC.addCommand('clear', 'module', 'Clears all built data for a module', async(args) => {
            const result = await destroyTSWatcher(ipaths.moduleData(args[0]));
            wfs.remove(ipaths.moduleDataBuild(args[0]));
            if (result) {
                getTSWatcher(ipaths.moduleData(args[0]));
            }
        });

        moduleC.addCommand('update', 'module|all', 'Updates any or all modules from their tracking git repositories', async(args) => {
            if (args.length === 0) {
                throw new Error(`update requires at least one argument (module OR "all")`);
            }
            update(args[0]);
        });

        commands.addCommand('check', '', '', async(args) => {
            await rebuildPatch(args[0],args.slice(1));
        });

        await refreshModules(true);

        term.success('Modules initialized');
    }
}