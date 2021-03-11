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
import { term } from '../util/Terminal';
import { Timer } from '../util/Timer';
import { isWindows } from '../util/Platform';
import { ipaths } from '../util/Paths';
import { Datasets } from './Dataset';

/**
 * Contains functions for extracting map data from the client that TrinityCore uses for its AI.
 * If you're familiar with wow server emulation from before, this module
 * runs `mapextractor`, `vmap4extractor`, `vmap4assembler` etc. and installs the results to TrinityCore.
 */
export namespace MapData {
    function prepareBuild(dataset: string) {
        const copiedFiles = isWindows() ?
            ['mapextractor.exe', 'mmaps_generator.exe', 'vmap4assembler.exe', 'vmap4extractor.exe', 'common.dll']
            : ['mapextractor', 'mmaps_generator', 'vmap4assembler', 'vmap4extractor'];

        // TODO: move to Paths.ts
        const copiedLibraries = isWindows() ? ['libcrypto-1_1-x64.dll', 'libmysql.dll', 'libmysqld.dll'] : [];

        // TODO: Let user choose which to use
        const inDir = wfs.exists(ipaths.tc('Release')) ? ipaths.tc('Release'): ipaths.tc('Debug');

        // Copy over all necessary library files
        for (const file of copiedFiles) {
            wfs.copy(mpath(inDir, file), mpath(ipaths.client(dataset), file));
        }

        for (const file of copiedLibraries) {
            wfs.copy(mpath(inDir,file), mpath(ipaths.client(dataset), file));
        }
    }

    export async function buildMaps(dataset: string) {
        prepareBuild(dataset);
        wfs.remove(ipaths.clientMaps(dataset));
        await wsys.execIn(ipaths.client(dataset), `${isWindows() ? '' : './'}mapextractor`);
        wfs.copy(ipaths.clientMaps(dataset),ipaths.datasetMaps(dataset), true);
        wfs.copy(ipaths.clientDbc(dataset), ipaths.datasetDBC(dataset), true);
    }

    export async function buildVmaps(dataset: string) {
        wfs.remove(ipaths.clientVmaps(dataset));
        wfs.remove(ipaths.clientBuildings(dataset));
        await wsys.execIn(ipaths.client(dataset), `${isWindows() ? '' : './'}vmap4extractor`);
        wfs.mkDirs(ipaths.clientVmaps(dataset));
        await wsys.execIn(ipaths.client(dataset), `${isWindows() ? '' : './'}vmap4assembler Buildings vmaps`);
        wfs.copy(ipaths.clientVmaps(dataset), ipaths.datasetVmaps(dataset), true);
    }

    export async function buildMMaps(dataset: string) {
        term.log('Building MMAPS (this will take a very long time)');
        const timer = Timer.start();
        if(!wfs.exists(ipaths.clientMaps(dataset))) {
            buildMaps(dataset);
        }

        if(!wfs.exists(ipaths.clientVmaps(dataset))) {
            buildVmaps(ipaths.clientVmaps(dataset));
        }

        await wsys.execIn(ipaths.client(dataset), `${isWindows() ? '' : './'}mmaps_generator`);
        wfs.copy(ipaths.clientMmaps(dataset), ipaths.datasetMmaps(dataset));
        term.success(`Rebuilt mmaps in ${timer.timeSec()}s`);
    }

    export async function buildLuaXML(dataset: string) {
        wsys.exec(`"${ipaths.luaxmlExe}" ${wfs.absPath(ipaths.datasetLuaxmlSource(dataset))} ${ipaths.clientData(dataset)}`, 'inherit');
    }

    /**
     * Prepares the module for startup.
     */
    export async function initialize() {
        term.success('Initialized Game Data');
    }
}
