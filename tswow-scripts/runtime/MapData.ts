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
import { mpq } from '../util/MPQ';
import { wfs, mpath } from '../util/FileSystem';
import { wsys } from '../util/System';
import { cfg } from '../util/Config';
import { term } from '../util/Terminal';
import { Timer } from '../util/Timer';
import { isWindows } from '../util/Platform';
import { Client } from './Client';
import { ipaths } from './RuntimePaths';

/**
 * Contains functions for extracting map data from the client that TrinityCore uses for its AI.
 * If you're familiar with wow server emulation from before, this module
 * runs `mapextractor`, `vmap4extractor`, `vmap4assembler` etc. and installs the results to TrinityCore.
 */
export namespace MapData {
    /**
     * Builds map data if necessary or if forced.
     * @param force - Forces the program to build even if TrinityCore contains the necessary data to start.
     */
    export async function build(force = false) {
        const copiedFiles = isWindows() ?
            ['mapextractor.exe', 'mmaps_generator.exe', 'vmap4assembler.exe', 'vmap4extractor.exe']
            : ['mapextractor', 'mmaps_generator', 'vmap4assembler', 'vmap4extractor'];
        const cdir = cfg.client.directory();

        // TODO: Let user choose which to use
        const inDir = wfs.exists(ipaths.tcRelease) ? ipaths.tcRelease : ipaths.tcDebug;

        // Copy over all necessary library files
        for (const file of copiedFiles) {
            wfs.copy(mpath(inDir, file), mpath(cdir, file));
        }

        const clientMaps = mpath(cdir, 'maps');
        const clientVmaps = mpath(cdir, 'vmaps');
        const clientDbc = mpath(cdir, 'dbc');
        const clientBuildings = mpath(cdir, 'Buildings');

        wfs.remove(clientMaps);
        wfs.remove(clientVmaps);
        wfs.remove(clientDbc);
        wfs.remove(clientBuildings);

        if (force || !wfs.exists(ipaths.maps, ipaths.vmaps, ipaths.dbcSource)) {
            const timer = Timer.start();
            await wsys.execIn(cdir, `${isWindows() ? '' : './'}mapextractor`);
            await wsys.execIn(cdir, `${isWindows() ? '' : './'}vmap4extractor`);

            wfs.mkDirs(mpath(cdir, 'vmaps'));
            await wsys.execIn(cdir, `${isWindows() ? '' : './'}vmap4assembler Buildings vmaps`);

            // Copy to server and clean up
            wfs.move(clientMaps, ipaths.maps);
            wfs.move(clientVmaps, ipaths.vmaps);
            wfs.remove(clientBuildings);

            // TODO: DBC should not be sourced from this. We should build our own dbc extractor.
            if (!wfs.exists(ipaths.dbcSource)) {
                wfs.copy(clientDbc, ipaths.dbcSource);
            } else {
                wfs.remove(clientDbc);
            }

            mpq.tagChanges('maps');
            term.success(`Rebuild maps/vmaps in ${timer.timeSec()}s`);
        } else {
            term.log('Maps alrady built, skipping');
        }

        if (cfg.generation.generate_mmaps() && mpq.changed('mmaps')) {
            const timer = Timer.start();
            term.log('Building MMAPS (this will take a very long time)');
            await wsys.execIn(cdir, `${isWindows() ? '' : './'}mmaps_generator`);
            wfs.move(mpath(cdir, 'mmaps'), ipaths.mmaps);
            term.success(`Rebuilt mmaps in ${timer.timeSec()}s`);
        } else if (!mpq.changed('mmaps')) {
            term.log('MMAPS already built, skipping');
        } else {
            term.log('MMAPS disabled, skipping');
        }

        if (force || ! wfs.exists(ipaths.luaxmlSource)) {
            wsys.exec(`"${ipaths.luaxmlExe}" ${
                wfs.absPath(ipaths.luaxmlSource)} ${
                mpath(cfg.client.directory(), 'Data')}`, 'inherit');
        }

        // Remove all previously copied files
        for (const file of copiedFiles) {
            wfs.remove(mpath(cdir, file));
        }
    }

    /**
     * Prepares the module for startup.
     */
    export function initialize() {
        // If we lack even the bare minimum files to run trinitycore we need to build map data.
        build(false);
        Client.command.addCommand('mapdata', '', 'Builds all map/vmap data (currently also builds dbc files)',
            async() => build(true));
        term.success('Initialized Game Data');
    }
}
