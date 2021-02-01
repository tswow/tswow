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
import { cfg } from '../util/Config';
import { mysql } from '../util/MySQL';
import { term } from '../util/Terminal';
import { Modules } from './Modules';
import { commands } from './Commands';
import { MapData } from './MapData';
import { Timer } from '../util/Timer';
import { TrinityCore } from './TrinityCore';
import { args } from '../util/Args';
import { Client } from './Client';
import { Test } from './Test';
import { Assets } from './Assets';
import { InstallPaths, ipaths } from '../util/Paths';
import { wfs } from '../util/FileSystem';
import { Clean } from './Clean';
import { Addon } from './Addon';

InstallPaths.setInstallBase('./');

export async function main() {
    wfs.copy(ipaths.startjsBin,ipaths.startjsCore);
    try {
        term.log('~tswow starting up~');
        const timer = Timer.start();

        try{
            Client.verify();
        } catch(error) {
            term.error(
                `${error.message}: ` +
                `Check your settings in ` +
                `config/tswow.yaml.`
            );
            process.exit(0);
        }

        // Setup Config and data files
        cfg.trinitycore.updateAcConfigs();
        await MapData.initialize();

        await mysql.initialize();

        await Addon.initialize();

        if(!process.argv.includes('minimal')) {
            // Initialize Modules
            await Modules.initialize();

            // Initialize client
            Client.initialize(!args.hasAnyFlag('noac'));

            // Initialize MPQ
            Assets.initialize();

            // Initialize tests
            Test.initialize();
        }

        // Initialize Azerothcore
        TrinityCore.initialize();
        if (!args.hasAnyFlag('noac')) {
            await TrinityCore.start(process.argv.includes('debug')?'debug':'release');
        }

        term.success(`Initialized tswow in ${timer.timeSec()}s`);
    } catch (error) {
        console.error('Failed to start tswow:', error);
    }

    Clean.initialize();

    if(!process.argv.includes('minimal')) {
        await commands.enterLoop();
    }
}