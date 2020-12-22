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
import { ipaths } from '../util/Paths';

export namespace Client {
    const wowpath = mpath(cfg.client.directory(), 'wow.exe');
    const wowprocess = new Process();

    wowprocess.showOutput(false);

    export function isRunning() {
        return wowprocess.isRunning();
    }

    /**
     * Verifies that the client exists
     * @throws if some client file can't be found
     */
    export function verify() {
        const cpath = cfg.client.directory();
        if(!wfs.exists(cpath)) {
            throw new Error(`Missing client directory.`);
        }

        if(!wfs.exists(mpath(cpath, 'wow.exe'))) {
            throw new Error(`Missing wow.exe`);
        }

        if(!wfs.exists(mpath(cpath,'Data'))) {
            throw new Error(`Missing data directory`);
        }
    }

    export function installAddons() {
        for(const addon of wfs.readDir(ipaths.addons, true)) {
            const clientAddons = mpath(cfg.client.directory(),'Interface','Addons')
            const dst = mpath(clientAddons,addon);
            const src = mpath(ipaths.addons,addon);
            if(!wfs.exists(dst)) {
                wfs.copy(src,dst);
            }
        }
    }

    /**
     * Writes the bytes 0xb803000ebedc3 to 0x415b5f in the wow.exe binary to enable interface patches.
     * 
     * This fixes the client crash: "Your login interface files are corrupt. Please reinstall the game"
     * 
     * @param clientPath 
     */
    export function fixClientBinary(clientPath: string) {
        const wowbin = wfs.readBin(clientPath);

        const byteOffsets = [
            {offset: 0x126, value: 0x23},
            {offset: 0x1f41bf, value: 0xeb},
            {offset: 0x415a25, value: 0xeb},
            {offset: 0x415a3f, value: 0x3},
            {offset: 0x415a95, value: 0x3},
            {offset: 0x415b46, value: 0xeb},
            {offset: 0x415b5f, value: 0xb8},
            {offset: 0x415b60, value: 0x03},
            {offset: 0x415b61, value: 0},
            {offset: 0x415b62, value: 0},
            {offset: 0x415b63, value: 0},
            {offset: 0x415b64, value: 0xeb},
            {offset: 0x415b65, value: 0xed},
        ]

        let found = false;
        for(const {offset,value} of byteOffsets) {
            if(wowbin.readUInt8(offset)!==value) {
                found = true;
                break;
            }
        }

        if(!found) {
            return;
        }
        
        wfs.makeBackup(clientPath, `${clientPath}.backup`);

        for(const {offset,value} of byteOffsets) {
            wowbin.writeUInt8(value, offset);
        }

        wfs.writeBin(clientPath, wowbin);
    }

    export async function start() {
        await wowprocess.stop();

        fixClientBinary(wowpath);
        installAddons();

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
