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
import { wsys } from '../util/System';
import { cfg } from '../util/Config';
import { term } from '../util/Terminal';
import { Timer } from '../util/Timer';
import { isWindows } from '../util/Platform';
import { ipaths } from '../util/Paths';
import { BuildCommand } from './BuildCommand';

/**
 * Contains functions for extracting map data from the client that TrinityCore uses for its AI.
 * If you're familiar with wow server emulation from before, this module
 * runs `mapextractor`, `vmap4extractor`, `vmap4assembler` etc. and installs the results to TrinityCore.
 */
export namespace MapData {
    const cdir = cfg.client.directory();

    const clientMaps = mpath(cdir, 'maps');
    const clientVmaps = mpath(cdir, 'vmaps');
    const clientDbc = mpath(cdir, 'dbc');
    const clientBuildings = mpath(cdir, 'Buildings');
    const clientMmaps = mpath(cdir, 'mmaps');

    function prepareBuild() {
        const copiedFiles = isWindows() ?
            ['mapextractor.exe', 'mmaps_generator.exe', 'vmap4assembler.exe', 'vmap4extractor.exe', 'common.dll']
            : ['mapextractor', 'mmaps_generator', 'vmap4assembler', 'vmap4extractor'];

        const copiedLibraries = isWindows() ? ['libcrypto-1_1-x64.dll', 'libmysql.dll', 'libmysqld.dll'] : [];

        // TODO: Let user choose which to use
        const inDir = wfs.exists(ipaths.tcRelease) ? ipaths.tcRelease : ipaths.tcDebug;

        // Copy over all necessary library files
        for (const file of copiedFiles) {
            wfs.copy(mpath(inDir, file), mpath(cdir, file));
        }

        for (const file of copiedLibraries) {
            wfs.copy(mpath(ipaths.tcRoot, file), mpath(cfg.client.directory(), file));
        }
    }

    export async function buildMaps() {
        prepareBuild();
        wfs.remove(clientMaps);
        await wsys.execIn(cdir, `${isWindows() ? '' : './'}mapextractor`);
        wfs.copy(clientMaps,ipaths.maps, true);
        wfs.copy(clientDbc, ipaths.dbcSource, true);
    }

    export async function buildVmaps() {
        // we need it back now
        if(!wfs.exists(clientMaps)) {
            wfs.copy(ipaths.maps, clientMaps);
        }
        wfs.remove(clientVmaps);
        wfs.remove(clientBuildings);
        await wsys.execIn(cdir, `${isWindows() ? '' : './'}vmap4extractor`);
        wfs.mkDirs(mpath(cdir, 'vmaps'));
        await wsys.execIn(cdir, `${isWindows() ? '' : './'}vmap4assembler Buildings vmaps`);
        wfs.copy(clientVmaps, ipaths.vmaps, true);
    }

    export async function buildMMaps() {
        term.log('Building MMAPS (this will take a very long time)');
        const timer = Timer.start();
        if(!wfs.exists(clientMaps)) {
            wfs.copy(ipaths.maps,clientMaps);
        }

        if(!wfs.exists(clientVmaps)) {
            wfs.copy(ipaths.vmaps, clientVmaps);
        }

        wfs.remove(clientMmaps);
        await wsys.execIn(cdir, `${isWindows() ? '' : './'}mmaps_generator`);
        wfs.copy(clientMmaps, ipaths.mmaps);
        term.success(`Rebuilt mmaps in ${timer.timeSec()}s`);
    }

    export async function buildLuaXML() {
        wsys.exec(`"${ipaths.luaxmlExe}" ${
            wfs.absPath(ipaths.luaxmlSource)} ${
            mpath(cfg.client.directory(), 'Data')}`, 'inherit');
    }

    export async function rebuild(clean?: boolean) {
        if(clean) {
            wfs.remove(ipaths.maps);
            wfs.remove(ipaths.vmaps);
            wfs.remove(ipaths.dbcSource);
            wfs.remove(ipaths.mmaps);
            wfs.remove(ipaths.luaxmlSource);
        }

        if(!wfs.exists(ipaths.maps)) {
            await buildMaps();
        }

        if(!wfs.exists(ipaths.vmaps)) {
            await buildVmaps();
        }

        if(cfg.generation.generate_mmaps() && !wfs.exists(ipaths.mmaps)) {
            await buildMMaps();
        }

        if (!wfs.exists(ipaths.luaxmlSource)) {
            await buildLuaXML();
        }

    }

    /**
     * Prepares the module for startup.
     */
    export async function initialize() {
        await rebuild(process.argv.includes('clean_clientdata'));

        BuildCommand.addCommand('clientdata', 'maps? vmaps? mmaps? luaxml?','Rebuilds client data', async (args)=>{
            if(args.includes('maps')) {
                await buildMaps();
            }

            if(args.includes('vmaps')) {
                await buildVmaps();
            }

            if(args.includes('mmaps')) {
                await buildMMaps();
            }

            if(args.includes('luaxml')) {
                await buildLuaXML();
            }
        });

        term.success('Initialized Game Data');
    }
}
