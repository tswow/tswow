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
import { mysql } from '../util/MySQL';
import { cfg } from '../util/Config';
import { Timer } from '../util/Timer';
import { TrinityCore } from './TrinityCore';
import { compileAll, destroyTSWatcher, getTSWatcher, hasWatcher } from '../util/TSWatcher';
import { Client } from './Client';
import { isWindows } from '../util/Platform';
import { Wrap } from '../util/Wrap';
import { Assets } from './Assets';
import { FileChanges } from '../util/FileChanges';
import { ipaths } from '../util/Paths';
import { reputation_reward_rateRow } from '../wotlkdata/sql/types/reputation_reward_rate';

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
    "include":["./","../Ids.ts"],
    "exclude":["../data"]
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
import { SQL, DBC } from "wotlkdata";

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
`;

/**
 * Contains functions for working with tswow modules.
 */
export namespace Modules {
    /**
     * Returns names of all installed modules.
     */
    export function getModules() {
        return wfs.readDir('./modules', true, 'directories');
    }

    /**
     * Returns the path to a module, relative to the tswow installation folder.
     * @param module - Name of module
     */
    function modulePath(module: string) {
        return `./modules/${module}`;
    }

    export function setEditable(mod: string, editable: boolean) {
        if (editable) {
            wfs.remove(mpath('modules', mod, 'noedit'));
        } else {
            const datadir = mpath('modules', mod, 'data');
            if (wfs.exists(datadir)) {
                try {
                    wsys.execIn(datadir, `node ../../../${ipaths.tsc}`);
                } catch (error) {
                    term.error(error.message);
                    term.error(`Can't noedit ${mod}, there are compiler errors in it.`);
                    return;
                }
                destroyTSWatcher(datadir);
                wfs.write(mpath('modules', mod, 'noedit'), '');
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
    }

    /**
     * Returns the name of the 'data' directory in modules.
     */
    export function dataDir() {
        return 'data';
    }

    /**
     * Creates a new module
     * @param name - Name of the new module
     */
    export function addModule(name: string) {
        const timer = Timer.start();
        const modpath = modulePath(name);
        if (wfs.exists(modpath)) {
            throw new Error('Module already exists:' + name);
        }

        wfs.mkDirs(modpath);
        wfs.mkDirs(mpath(modpath, 'data'));
        wfs.write(mpath(modpath, 'data', `${name}-data.ts`), patch_example_ts(name));
        wfs.mkDirs(mpath(modpath, 'assets'));
        wfs.mkDirs(mpath(modpath, 'scripts'));

        // Initialize git repositories
        wfs.write(mpath(modpath, '.gitignore'), gitignores);
        wfs.write(mpath(modpath, 'scripts', `${name}scripts.ts`), livescript_example);

        wsys.execIn(modpath, 'git init');
        refreshModules(false);
        term.success(`Created module ${name} in ${timer.timeSec()}s`);
    }

    /**
     * Builds dbc and sql data for all modules.
     * @param fast  - if false and on windows, SQL tables are completely flushed.
     * @returns Double wrapped promise.
     * The inner promise need to be waited separately waited for if fast = false
     * to ensure SQL data was copied successfully.
     */
    export async function rebuildPatch(fast: boolean = false): Promise<Wrap<Promise<void>>> {
        await compileAll();
        wfs.mkDirs(ipaths.dbcBuild, true);

        const indexpath = mpath('./node_modules', 'wotlkdata', 'wotlkdata');
        const program = `node -r source-map-support/register ${indexpath} db`;

        let wrap: Wrap<Promise<void>>;
        if (!fast && isWindows()) {
            wrap = await mysql.loadWorldBackup();
        } else {
            wrap = new Wrap(new Promise((res) => res()));
        }

        // More helpful error message
        try {
            wsys.exec(program, 'inherit');
        } catch (error) {
            throw new Error(`Failed to rebuild patches`);
        }

        return wrap;
    }

    /**
     * Builds and reloads the server code for a specific module.
     * @param name - Name of the module to rebuild.
     */
    export function rebuildScripts(name: string) {
        const scriptsDir = ipaths.moduleScripts(name);

        const files = wfs.readDir(scriptsDir, true, 'both');

        // Don't build if the entry point doesn't exist or its livescript is just the template.
        if (!files.includes(`${name}scripts.ts`)) { return; }
        if (wfs.read(mpath(scriptsDir, `${name}scripts.ts`)) === livescript_example) {
            return false;
        }

        const timer = Timer.start();
        wsys.exec(`node ${ipaths.transpilerEntry} ${name}`);

        wfs.copy(
            mpath('modules', name, 'scripts', 'build', 'lib', 'Release', `${name}.dll`),
            mpath('bin', 'trinitycore', 'release', 'scripts', `scripts_${name}_ts.dll`)
        );
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
    export async function buildMpq(folder: boolean = false, fast: boolean = false) {
        const timer = Timer.start();

        // Build output dbc
        const wrap = await rebuildPatch(fast);
        Assets.check();

        const mpqPath = mpath(cfg.client.directory(), 'data', `patch-${cfg.client.mpq_suffix()}.MPQ`);
        const paths = getModules()
            .map(x => mpath('./modules', x, 'assets'))
            .filter(x => wfs.exists(x))
            .map(x => `"${x}"`);
        const oldStarted = Client.isRunning();
        await Client.kill();

        if (folder !== wfs.isDirectory(mpqPath)) {
            wfs.remove(mpqPath);
        }

        if (folder) {
            wfs.mkDirs(mpqPath);
            const allpaths = paths.map(x => `./${x.substring(1, x.length - 1)}`).concat([ipaths.dbcBuild, ipaths.luaxmlBuild]);
            const ignored = cfg.build.mpq_ignore();
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
                const out = mpath(mpqPath, rel);

                if (FileChanges.isChanged(path, 'mpq') || !wfs.exists(out)) {
                    wfs.copy(path, out);
                }
                FileChanges.tagChange(path, 'mpq');
            }));
            FileChanges.endCache();
        } else {
            wsys.exec(`"${ipaths.mpqBuilderExe}" "${mpqPath}" "${wfs.removeDot(ipaths.dbcBuild)}" "${wfs.removeDot(ipaths.luaxmlBuild)}" ${paths.join(' ')}`, 'inherit');
        }

        term.success(`Built SQL/DBC/MPQ data in ${timer.timeSec()}s`);
        if (oldStarted) {
            Client.start();
        }

        // Finally, we wait for the SQL files to copy if we moved them.
        return wrap;
    }

    export async function refreshModules(force: boolean = false) {
        if (!wfs.exists('./node_modules/wotlkdata')) {
            term.log(`Linking wotlkdata...`);
            wsys.exec('npm link bin/scripts/tswow/wotlkdata');
        }

        for (const xx of wfs.readDir('./modules', true)) {
            const x = mpath('./modules', xx);

            const data_path = mpath(x, 'data');
            const data_build_path = mpath(data_path, 'build');
            const data_package_path = mpath(data_build_path, 'package.json');
            const data_tsconfig_path = mpath(data_path, 'tsconfig.json');
            const nodemodule_path = mpath('node_modules', xx);

            if (wfs.isDirectory(data_path)) {
                if (!wfs.exists(data_tsconfig_path) || force) {
                    wfs.write(data_tsconfig_path, data_tsconfig);
                }

                wfs.write(data_package_path, lib_package_json(xx));

                if (!wfs.exists(mpath(x, 'noedit'))) {
                    await getTSWatcher(data_path);
                }

                if (!wfs.exists(nodemodule_path)) {
                    wsys.exec(`npm link ${mpath(x, 'data', 'build')}`);
                }
            }

            const scripts_path = mpath(x, 'scripts');
            const scripts_tsconfig_path = mpath(x, 'scripts' , 'tsconfig.json');
            const scripts_globaldts_path = mpath(x, 'scripts' , 'global.d.ts');
            if (wfs.isDirectory(scripts_path)) {
                wfs.copy(mpath('bin', 'include', 'global.d.ts'), mpath(scripts_globaldts_path));
                if (!wfs.exists(scripts_tsconfig_path) || force) {
                    wfs.write(scripts_tsconfig_path, scripts_tsconfig_json);
                }
            }
        }
    }

    export async function uninstallModule(name: string) {
        destroyTSWatcher(mpath('modules', name, 'data'));

        // Delete all built libraries
        for (const p of [ipaths.tcReleaseScripts, ipaths.tcDebugScripts]) {
            wfs.readDir(p, true).forEach((x) => {
                if (x.startsWith(`scripts_${name}_ts`)) {
                    wfs.remove(mpath(p, x));
                }
            });
        }

        // Store a copy of the module in our garbage bin
        function garbagePath(j: number) {
            return mpath(ipaths.coreData, 'module_garbage', `${name}_${j}`);
        }
        let i = 0;
        while (wfs.exists(garbagePath(i))) {
            ++i;
        }
        wfs.copy(`./modules/${name}`, garbagePath(i));

        wfs.remove(`./modules/${name}`);
    }

    export function installModule(url: string) {
        const split = url.split('/');
        const name = split[split.length - 1]
            .split('.git').join('');
        if (name.length < 1) {
            throw new Error(`Tried to install module with invalid name: ${url}`);
        }

        wsys.exec(`git clone ${url} ./modules/${name}`);
        setEditable(name, false);
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

        moduleC.addCommand('create', 'name', 'Create a new module', (args) => {
            if (args.length < 1) { throw new Error('Please provide a name for the new module'); }
            addModule(args[0]);
        });

        moduleC.addCommand('install', 'url', 'Installs a module from a git repository', (args) => {
            installModule(args.join(' '));
        });


        moduleC.addCommand('uninstall', 'name force?', 'Uninstalls a module', (args) => {
            uninstallModule(args[0]);
        });

        moduleC.addCommand('data', 'folder? readonly? fast?', 'Build server SQL and client DBC/MPQ from all modules',
            async(args: string[]) => {
            if (args.includes('readonly')) {
                await (await rebuildPatch(args.includes('fast'))).unwrap();
            } else {
                await buildMpq(args.includes('folder'), args.includes('fast'));
            }
        });

        const buildC = commands.addCommand('build');
        buildC.addCommand('data', 'clientonly? rebuild? package?',
            'Builds data patches and then restarts the affected processes', async(args) => {
            if (args.includes('clientonly') && args.includes('rebuild')) {
                throw new Error(`Can't both rebuild and restart only the client, rebuilding requires restarting the server.`);
            }
            const wrap = await buildMpq(!args.includes('package'), !args.includes('rebuild'));
            await Client.start();
            if (!args.includes('clientonly')) {
                await TrinityCore.start();
            }
            await wrap.unwrap();
        });

        buildC.addCommand('scripts', 'module', 'Build and loads the server scripts of a module', (args) => {
            const count = 0;
            let modules = args;
            if (modules.length === 0) {
                modules = getModules();
            }

            let ctr = 0;
            for (const mod of modules) {
                if (rebuildScripts(mod)) {
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

        moduleC.addCommand('fixremoved', 'module', 'Tries to manually remove unused script files, because sometimes the manual check bugs up', async(args) => {
            const p = mpath('modules', args[0], 'data');
            if (hasWatcher(p)) {
                await (await getTSWatcher(p)).fixRemoved();
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

        commands.addCommand('check', '', '', async() => {
            await rebuildPatch(true);
        });

        await refreshModules(true);

        term.success('Modules initialized');
    }
}
