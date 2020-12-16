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
import { isWindows } from '../util/Platform';
import { mpath, wfs } from '../util/FileSystem';
import { cfg } from '../util/Config';
import { commands } from './Commands';
import { Process } from '../util/Process';

export namespace Client {
    const wowpath = mpath(cfg.client.directory(), 'wow.exe');
    const wowprocess = new Process();
    wowprocess.showOutput(false);

    export function isRunning() {
        return wowprocess.isRunning();
    }

    export async function start() {
        await wowprocess.stop();

        if (isWindows()) {
            clearCache();
            const localepath = mpath(localePath());
            const realmlistPath = mpath(localepath, 'realmlist.wtf');

            const realmlist = wfs.read(realmlistPath);
            if (realmlist !== 'set realmlist localhost' && realmlist !== 'set realmlist 127.0.0.1') {
                const backupPath = (i: number) => mpath(localepath, `realmlist.wtf.backup${i}`);
                let curI = 0;
                while (wfs.exists(backupPath(curI))) {
                    ++curI;
                }
                wfs.copy(realmlistPath, backupPath(curI));
            }
            wfs.write(realmlistPath, 'set realmlist localhost');
            wowprocess.start(wowpath);
        }
    }

    export function kill() {
        return wowprocess.stop();
    }

    export function clearCache() {
        wfs.remove(mpath(cfg.client.directory(), 'Cache'));
    }

    export function localePath() {
        const dirs = wfs.readDir(mpath(cfg.client.directory(), 'Data') , false, 'directories')
            .filter(x => !x.toLowerCase().endsWith('mpq'));

        if (dirs.length === 0) {
            throw new Error('Error reading client locale path: No locale directory');
        }

        if (dirs.length > 1) {
            throw new Error('Error reading client locale path: Multiple non-mpq directories in Data folder');
        }

        return dirs[0];
    }

    export const command = commands.addCommand('client');

    export function initialize(autostartClient: boolean) {
        const dir = cfg.client.directory();
        const wowexe = mpath(dir, 'wow.exe');
        const data = mpath(dir, 'Data');
        if (!wfs.exists(cfg.client.directory())) {
            throw new Error(`No client at ${dir}`);
        }

        if (!wfs.exists(wowexe)) {
            throw new Error(`No wow.exe in ${dir} (Check client.directory in config.yaml)`);
        }

        if (!wfs.exists(data)) {
            throw new Error(`No data directory in ${dir}, but wow.exe exists (broken installation?)`);
        }

        command.addCommand('start', '', 'Starts the World of Warcraft client', async() => start());
        command.addCommand('kill', '', 'Stops the World of Warcraft client', async() => stop());

        if (autostartClient) {
            start();
        }
    }
}
