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
import { Process } from '../util/Process';
import { ipaths } from '../util/Paths';
import { Datasets } from './Dataset';
import { commands } from './Commands';
import { term } from '../util/Terminal';

export class Client {
    wowprocess = new Process();
    set: Datasets.Dataset;

    constructor(dataset: Datasets.Dataset) {
        this.set = dataset;
    }

    isRunning() {
        return this.wowprocess.isRunning();
    }

    verify() {
        if(!wfs.exists(ipaths.client(this.set.id))) {
            throw new Error(`Missing client directory.`);
        }

        if(!wfs.exists(ipaths.clientExe(this.set.id))) {
            throw new Error(`Missing wow.exe`);
        }

        if(!wfs.exists(ipaths.clientData(this.set.id))) {
            throw new Error(`Missing data directory`);
        }
    }

    installAddons() {
        for(const addon of wfs.readDir(ipaths.addons, true)) {
            if(!wfs.exists(ipaths.clientAddon(this.set.id,addon))) {
                wfs.copy(mpath(ipaths.addons,addon),ipaths.clientAddon(this.set.id,addon));
            }
        }
    }

    /**
     * Writes the following binary edits in the wow.exe:
     * - 0x415b5f: writes 0xb803000ebedc3 to enable login interface patches.
     * - 0xe0355: writes 0x78888888 to enable more than 10 classes per race.
     * @param clientPath 
     */
    patchBinary() {
        const wowbin = wfs.readBin(ipaths.clientExe(this.set.id));

        const byteOffsets = [
            // Custom interface patch
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

            // Unlimited race/class pairs patch
            {offset: 0xe0355, value: 0x78},
            {offset: 0xe038e, value: 0x88},
            {offset: 0xe03A3, value: 0x88},
            {offset: 0xe03C3, value: 0x88},
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
        
        wfs.makeBackup(ipaths.clientExe(this.set.id), `${ipaths.clientExe}.backup`);

        for(const {offset,value} of byteOffsets) {
            wowbin.writeUInt8(value, offset);
        }

        wfs.writeBin(ipaths.clientExe(this.set.id), wowbin);
    }

    async start() {
        term.log(`Starting client for dataset ${this.set.id}`)
        await this.wowprocess.stop();

        this.patchBinary()
        this.installAddons();

        if (isWindows()) {
            this.clearCache();
            const realmlist = wfs.read(ipaths.clientRealmlist(this.set.id));
            if(realmlist !== 'set realmlist localhost') {
                wfs.makeBackup(ipaths.clientRealmlist(this.set.id));
            }
            wfs.write(ipaths.clientRealmlist(this.set.id), 'set realmlist localhost');
            this.wowprocess.start(ipaths.clientExe(this.set.id));
        }
    }

    clearCache() {
        wfs.remove(ipaths.clientCache(this.set.id));
    }

    kill() {
        return this.wowprocess.stop();
    }
}

export namespace Client {
    export const command = commands.addCommand('client');
    export function initialize() {
        command.addCommand('start', 'dataset = default', 'Starts the World of Warcraft client for a particular dataset',
            async(args) => await Datasets.get(args[0]||'default').client.start());
        command.addCommand('kill', 'dataset = default', 'Stops the World of Warcraft client for a particular dataset', 
            async(args) => await Datasets.get(args[0]||'default').client.kill());
    }
}
