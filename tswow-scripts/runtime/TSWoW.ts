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
import { InstallPaths } from '../util/Paths';
import { term } from '../util/Terminal';
import { Timer } from '../util/Timer';
import { setContext } from '../util/TSWoWContext';
import { Addon } from './Addon';
import { Assets } from './Assets';
import { AuthServer } from './AuthServer';
import { Build } from './Build';
import { Clean } from './Clean';
import { Client } from './Client';
import { commands } from './Commands';
import { Datascripts } from './Datascripts';
import { Datasets } from './Dataset';
import { MapData } from './MapData';
import { Modules } from './Modules';
import { mysql } from './MySQL';
import { PositionsFile } from './PositionsFile';
import { Realm } from './Realm';
import { Snippets } from './Snippets';
import { Test } from './Test';
setContext('install');
InstallPaths.setInstallBase('./');

export async function main() {
    try {
        term.log('~tswow starting up~');
        const timer = Timer.start();

        await mysql.initialize();
        await Addon.initialize();

        if(!process.argv.includes('minimal')) {
            await Modules.initialize();
            await Build.initialize();
            await Client.initialize();
            await Assets.initialize();
            await Test.initialize();
        }

        await Datascripts.initialize();
        await Datasets.initialize();
        await AuthServer.initialize();
        await Realm.initialize();

        await Clean.initialize();

        await Snippets.initialize();
        await PositionsFile.initialize();
        await MapData.initialize();
        await term.Initialize();

        term.success(`Initialized tswow in ${timer.timeSec()}s`);
    } catch (error) {
        console.error('Failed to start tswow:', error);
    }

    if(!process.argv.includes('minimal')) {
        await commands.enterLoop();
    }
}
main();