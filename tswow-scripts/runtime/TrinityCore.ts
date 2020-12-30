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
import { commands } from './Commands';
import { Process } from '../util/Process';
import { wfs, mpath } from '../util/FileSystem';
import { isWindows } from '../util/Platform';
import { ipaths } from '../util/Paths';
import { term } from '../util/Terminal';

/**
 * Contains functions to handle the `worldserver` (main process) of TrinityCore.
 */
export namespace TrinityCore {
    const worldserver = new Process().showOutput(true);
    const authserver = new Process().showOutput(true);

    export function isStarted() {
        // TODO: Should wait for it to have finished loading
        return worldserver.isRunning();
    }

    export function sendToWorld(message: string, useNewline: boolean = true) {
        worldserver.send(message, useNewline);
    }

    export async function start(type: 'debug' | 'release' = 'release') {
        await stop();
        if (worldserver.isRunning() || authserver.isRunning()) {
            throw new Error('Something else started the world and auth server!');
        }

        const buildDir = type === 'debug' ? ipaths.tcDebug : ipaths.tcRelease;
        if (!wfs.exists(buildDir)) {
            throw new Error(`Unable to start TrinityCore in ${type} mode becuase it has not been built`);
        }

        // Copy over dll files
        if (isWindows()) {
            wfs.readDir(ipaths.tcRoot, true)
                .filter(x => x.endsWith('.dll'))
                .forEach(x => wfs.copy(mpath(ipaths.tcRoot, x), mpath(buildDir, x)));
        }

        // Copy over ID files
        if(wfs.exists(ipaths.configIds)) {
            wfs.copy(ipaths.configIds, ipaths.coreIds);
        }

        // Copy over config files
        wfs.readDir(ipaths.config, true)
            .filter(x => x.endsWith('.conf'))
            .map(x => wfs.copy(mpath(ipaths.config, x), mpath(ipaths.coreData, x)));

        // Copy dbc files if no patch has been applied or build directory is corrupt
        if (!wfs.exists(ipaths.dbcBuild) || wfs.readDir(ipaths.dbcBuild).length === 0) {
            wfs.copy(ipaths.dbcSource, ipaths.dbcBuild);
        }

        term.log('Worldserver starting... (Output is a little delayed, hold on)')

        // TODO: linux
        worldserver.startIn(ipaths.coreData,
            wfs.absPath(mpath(buildDir, 'worldserver.exe')));
        await worldserver.waitFor('(worldserver-daemon) ready...');

        authserver.startIn(ipaths.coreData,
            wfs.absPath(mpath(buildDir, 'authserver.exe')));
    }

    /**
     * Stops both the authserver and worldserver
     */
    export async function stop() {
        await Promise.all([worldserver.stop(), authserver.stop()]);
    }

    /**
     * Registers commands for managing the `worldserver`.
     */
    export function initialize() {
        const ws = commands.addCommand('ws', 'subcommand,[args]?', 'Pipes a command to the worldserver',
            async(args) => worldserver.send(args.join(' ')));
        ws.addCommand('start', 'release|debug', 'Start or restarts the worldserver', async(args) => await start(args[0] as 'debug'|'release'));
        ws.addCommand('stop', '', 'Stop the worldserver', async() => await stop());
        ws.addCommand('hide', '', 'Hides worldserver output', async() => worldserver.showOutput(false));
        ws.addCommand('show', '', 'Hides worldserver output', async() => worldserver.showOutput(true));
        ws.addCommand('help', '[args]?', 'Displays help for worldserver commands (run "ws show" first if nothing shows)',
            async(args) => await worldserver.send(`help ${args.join(' ')}`));
    }
}
