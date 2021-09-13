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
import { util } from '../util/Util';
import { NodeConfig } from './NodeConfig';

/**
 * Contains functions for managing World of Warcraft clients
 */
export namespace Client {
    /**
     * Manages a single World of Warcraft process
     */
    export class Client {
        wowprocess = new Process();
        set: Datasets.Dataset;

        constructor(dataset: Datasets.Dataset) {
            this.set = dataset;
        }

        isRunning() {
            return this.wowprocess.isRunning();
        }

        get path() {
            return this.set.config.client_path;
        }

        get addonPath() {
            return mpath(this.path,'interface','addons');
        }

        get dataPath() {
            return mpath(this.path,'Data');
        }

        get realmlist() {
            return mpath(this.localePath,'realmlist.wtf');
        }

        get localePath() {
            const dirs = wfs.readDir(this.dataPath, false, 'directories')
                .filter(x => util.getLocales().includes(wfs.basename(x)))

            if (dirs.length === 0) {
                throw new Error('Error reading client locale path: No locale directory');
            }
            if (dirs.length > 1) {
                throw new Error('Error reading client locale path: Multiple locale directories in Data folder');
            }
            return dirs[0];
        }

        get exePath() {
            if(wfs.exists(mpath(this.path,'Wow.exe'))) {
                return mpath(this.path,'Wow.exe');
            } else {
                return mpath(this.path,'wow.exe');
            }
        }

        freePatchLetter(except: string[]) {
            let exceptNum = except.map(x=>x.charCodeAt(0));
            const CHARCODE_A = 'a'.charCodeAt(0);
            const CHARCODE_Z = 'z'.charCodeAt(0);
            for(let i = CHARCODE_A; i <= CHARCODE_Z; ++i) {
                if(exceptNum.includes(i)) continue;
                let dir = mpath(this.dataPath,`patch-${String.fromCharCode(i)}.MPQ`);
                if(!wfs.exists(dir)) {
                    return String.fromCharCode(i);
                }
            }
            throw new Error(`No free patch path in client ${this.dataPath}`);
        }

        get cachePath() {
            return mpath(this.path,'Cache');
        }

        verify() {
            if(!wfs.exists(this.path)) {
                throw new Error(`Missing client directory.`);
            }

            if(!wfs.exists(mpath(this.path,'Data'))) {
                throw new Error(`Missing data directory`);
            }
        }

        installAddons() {
            for(const addon of wfs.readDir(ipaths.addons, true)) {
                wfs.copy(mpath(ipaths.addons,addon),mpath(this.addonPath,addon),true);
            }
        }

        /**
         * Writes the following binary edits in the wow.exe:
         * - 0x415b5f: writes 0xb803000ebedc3 to enable login interface patches.
         * - 0xe0355: writes 0x78888888 to enable more than 10 classes per race.
         * @param clientPath
         */
        patchBinary() {
            const wowbin = wfs.readBin(this.exePath);

            const byteOffsets = [
                // Combo points fix
                {offset: 0x210B12, value: 0x90},
                {offset: 0x210B13, value: 0x90},
                {offset: 0x210B14, value: 0x90},
                {offset: 0x210B15, value: 0x90},
                {offset: 0x210B16, value: 0x90},
                {offset: 0x210B17, value: 0x90},
                {offset: 0x210B18, value: 0x90},
                {offset: 0x210B19, value: 0x90},

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

                // Gamebuild
                {offset: 0x4c99f0, value: this.set.config.game_build&0xff},
                {offset: 0x4c99f1, value: (this.set.config.game_build>>8)&0xff},
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

            wfs.makeBackup(this.exePath);

            for(const {offset,value} of byteOffsets) {
                wowbin.writeUInt8(value, offset);
            }

            wfs.writeBin(this.exePath, wowbin);
        }

        async start() {
            term.log(`Starting client for dataset ${this.set.id}`)
            await this.wowprocess.stop();

            this.patchBinary()
            this.installAddons();

            this.clearCache();

            if(NodeConfig.write_dev_realmlist) {
                const realmlist = wfs.read(this.realmlist);
                if(realmlist !== 'set realmlist localhost') {
                    wfs.makeBackup(this.realmlist);
                }
                wfs.write(this.realmlist, 'set realmlist localhost');
            }

            if(isWindows()) {
                this.wowprocess.start(this.exePath);
            } else {
                this.wowprocess.start('wine',[this.exePath]);
            }
        }

        clearCache() {
            wfs.remove(this.cachePath);
        }

        kill() {
            return this.wowprocess.stop();
        }
    }

    export const command = commands.addCommand('client');

    export function initialize() {
        command.addCommand(
              'start'
            , 'dataset'
            , 'Starts the World of Warcraft client for a particular dataset'
            , async(args) => {
                await Datasets.get(args[0]||'default').client.start();
            });
        command.addCommand(
              'kill'
            , 'dataset'
            , 'Stops the World of Warcraft client for a particular dataset'
            ,  async(args) => {
                await Datasets.get(args[0]||'default').client.kill();
            });
    }
}