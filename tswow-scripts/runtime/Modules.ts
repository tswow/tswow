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
import { watchTs } from '../util/TSWatcher';
import { Client } from './Client';
import { isWindows } from '../util/Platform';
import { Wrap } from '../util/Wrap';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { Assets } from './Assets';
import { FileChanges } from '../util/FileChanges';

/**
 * The default package.json that will be written to 'datalib' directory of new modules.
 */
const lib_package_json =
(name: string) => JSON.stringify({
    'name': name,
    'version': '1.0.0',
    'description': '',
    'main': 'index.js',
    'types': 'index.d.ts',
    'dependencies': {
    },
    'devDependencies': {},
    'scripts': {},
  }, null, 4);

/**
 * The tsconfig.json that will be used to compile 'datalib' directories
 */
const datalib_tsconfig =
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
      "forceConsistentCasingInFileNames": true,
      "experimentalDecorators": true,
      "sourceMap": true
    }
}`;

/**
 * The tsconfig.json that will be used to compile 'data' directories of modules.
 */
const data_tsconfig =
`{
    "compilerOptions": {
      "target": "es2018",
      "module": "commonjs",
      "outDir": "./build",
      "rootDir": "./",
      "strict": true,
      "sourceMap": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "experimentalDecorators": true,
      "sourceMap": true
    },
    "include":["./","../Ids.ts"],
    "exclude":["../scripts/","../datalib"]
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
const patch_example_ts = `
import { SQL, DBC, patch } from "wotlkdata";

patch("test", async()=>{
    console.log("Hello world from patch!");
});
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
`;

/**
 * Contains functions for working with tswow modules.
 */
export namespace Modules {
    const listens: {[key: string]: ChildProcessWithoutNullStreams} = {};

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
    export function addModule(name: string, libraryOnly?: string) {
        const timer = Timer.start();
        const modpath = modulePath(name);
        if (wfs.exists(modpath)) {
            throw new Error('Module already exists:' + name);
        }

        wfs.mkDirs(modpath);

        if (libraryOnly === 'lib') {
            wfs.mkDirs(mpath(modpath, 'datalib'));
        } else {
            wfs.mkDirs(mpath(modpath, 'data'));
            wfs.write(mpath(modpath, 'data', 'patch.ts'), patch_example_ts);
            wfs.mkDirs(mpath(modpath, 'assets'));
            wfs.mkDirs(mpath(modpath, 'scripts'));
            wfs.copy('./bin/scripts/global.d.ts.template', mpath(modpath, 'scripts', 'global.d.ts'));
            // wfs.write(mpath(modpath, 'ids.ts'), ids_ts(name));
        }

        // Initialize git repositories
        wfs.write(mpath(modpath, '.gitignore'), gitignores);
        wsys.execIn(modpath, 'git init');
        wsys.exec(`git submodule add ./modules/${name} ./modules/${name}`);
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
        wfs.mkDirs('./bin/dbc_work/DBFilesClient', true);

        const indexpath = mpath('./node_modules', 'wotlkdata', 'index');
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
    export function rebuildModule(name: string) {
        const timer = Timer.start();
        wsys.exec(`node ./bin/scripts/transpiler/wowts.js ${name}`)

        wfs.copy(
            mpath('modules',name,'scripts','build','lib','Release',`${name}.dll`),
            mpath('bin','trinitycore','scripts',`scripts_${name}_ts.dll`)
        )
        //TrinityCore.sendToWorld(`tsreload ${name}.dll`);
        // TODO We need to wait for output from trinitycore to continue here
        term.log(`Rebuilt code for ${name} in ${timer.timeSec()}s`);
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
            const allpaths = paths.map(x => `./${x.substring(1, x.length - 1)}`).concat(['bin/dbc_work', 'bin/luaxml_work']);
            const ignored = cfg.build.mpq_ignore();
            FileChanges.startCache();
            allpaths.forEach(x => wfs.iterate(x, path => {
                for (const ig of ignored) {
                    if (path.endsWith(ig))  {
                        return;
                    }
                }

                const rel = wfs.relative(x, path);
                const out = mpath(mpqPath, rel);

                if (FileChanges.isChanged(path, 'mpq') || !wfs.exists(out)) {
                    wfs.copy(path, out);
                }
                FileChanges.tagChange(path, 'mpq');
            }));
            FileChanges.endCache();
        } else {
            wsys.exec(`"bin/mpqbuilder/mpqbuilder.exe" "${mpqPath}" "bin/dbc_work" "bin/luaxml_work" ${paths.join(' ')}`, 'inherit');
        }

        term.success(`Built SQL/DBC/MPQ data in ${timer.timeSec()}s`);
        if (oldStarted) {
            Client.start();
        }

        // Finally, we wait for the SQL files to copy if we moved them.
        return wrap;
    }

    export function refreshModules(force: boolean = false) {
        wfs.readDir('./modules', true).forEach(xx => {
            const x = mpath('./modules', xx);

            const datalib_path = mpath(x, 'datalib');
            const datalib_build_path = mpath(datalib_path, 'build');
            const datalib_package_path = mpath(datalib_build_path, 'package.json');
            const datalib_tsconfig_path = mpath(datalib_path, 'tsconfig.json');
            const data_path = mpath(x, 'data');
            const data_tsconfig_path = mpath(data_path, 'tsconfig.json');
            const nodemodule_path = mpath('node_modules', xx);

            if (wfs.exists(datalib_path)) {
                if (!wfs.exists(datalib_tsconfig_path) || force) {
                    wfs.write(datalib_tsconfig_path, datalib_tsconfig);
                }

                wfs.write(datalib_package_path, lib_package_json(xx));

                if (!listens[datalib_path] || force) {
                    listens[datalib_path] = watchTs(datalib_path, false);
                }

                if (!wfs.exists(nodemodule_path) || force) {
                    wsys.exec(`npm link ${mpath(x, 'datalib', 'build')}`);
                }
            }

            if (wfs.exists(data_path)) {
                if (!wfs.exists(data_tsconfig_path) || force) {
                    wfs.write(data_tsconfig_path, data_tsconfig);
                }

                if (!listens[data_path] || force) {
                    listens[data_path] = watchTs(data_path, false);
                }
            }

            const scripts_path = mpath(x, 'scripts');
            const scripts_tsconfig_path = mpath(x, 'scripts' , 'tsconfig.json');
            const scripts_globaldts_path = mpath(x, 'scripts' , 'global.d.ts');
            if (wfs.exists(scripts_path)) {
                wfs.copy(mpath('bin','include','global.d.ts'),mpath(scripts_globaldts_path));
                if (!wfs.exists(scripts_tsconfig_path) || force) {
                    wfs.write(scripts_tsconfig_path, scripts_tsconfig_json);
                }
            }
        });
    }

    export function uninstallModule(name: string, force: boolean) {
        try {
            wsys.exec(`git submodule deinit ${name}`);
        } catch (error) {}
        const listen = listens[name];
        if (listen) {
            listen.kill();
        }

        if (wfs.exists(`./modules/${name}`)) {
            if (force) {
                try {
                    wsys.exec(`git rm ./modules/${name} -f`);
                } catch (err) {}
            } else {
                wsys.exec(`git rm ./modules/${name}`);
            }
        }

        wfs.remove(`./.git/modules/modules/${name}`);
        wfs.remove(`./modules/${name}`);
    }

    export function installModule(url: string) {
        const split = url.split('/');
        const name = split[split.length - 1]
            .split('.git').join('');
        if (name.length < 1) {
            throw new Error(`Tried to install module with invalid name: ${url}`);
        }
        wsys.exec(`git submodule add ${url} ./modules/${name} --force`);
    }

    /**
     * Initializes all modules and adds module-related commands.
     */
    export function initialize() {
        if (wfs.isFile('./modules')) {
            throw new Error('"modules" is supposed to be a directory, not a file');
        }

        if (!wfs.exists('./modules')) {
            wfs.mkDirs('./modules');
        }

        const moduleC = commands.addCommand('module');

        moduleC.addCommand('add', 'name', 'Create a new module', (args) => {
            if (args.length < 1) { throw new Error('Please provide a name for the new module'); }
            addModule(args[0], args[1]);
        });

        moduleC.addCommand('install', 'url', 'Installs a module from a git repository', (args) => {
            installModule(args.join(' '));
        });

        moduleC.addCommand('script', 'moduleName', 'Build and loads the server scripts of a module', (args) => {
            if (args.length < 1) { throw new Error('Please provide the name of the module to rebuild'); }
            rebuildModule(args[0]);
        });

        moduleC.addCommand('uninstall', 'name force?', 'Uninstalls a module', (args) => {
            uninstallModule(args[0], args.includes('force'));
        });

        moduleC.addCommand('data', 'folder? readonly? fast?', 'Build server SQL and client DBC/MPQ from all modules',
            async(args: string[]) => {
            if (args.includes('readonly')) {
                await (await rebuildPatch(args.includes('fast'))).unwrap();
            } else {
                await buildMpq(args.includes('folder'), args.includes('fast'));
            }
        });

        commands.addCommand('bd', '' , 'Builds data to folder (fast) and restarts client/server', async() => {
            const wrap = await buildMpq(true);
            await Client.start();
            await TrinityCore.start();
            await wrap.unwrap();
        });

        commands.addCommand('bdf', '' , 'Builds data to folder (fast) and restarts client/server', async() => {
            const wrap = await buildMpq(true, true);
            await Client.start();
            await TrinityCore.start();
            await wrap.unwrap();
        });

        commands.addCommand('check', '', '', async() => {
            rebuildPatch(true);
        });

        setInterval(() => {
            refreshModules();
        }, 2000);
        refreshModules(true);

        term.success('Modules initialized');
    }
}
