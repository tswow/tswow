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
process.argv.push('--ipaths=./')
import { commands } from "../util/Commands";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { term } from "../util/Terminal";
import { Timer } from "../util/Timer";
import { Addon } from "./Addon";
import { AuthServer } from "./AuthServer";
import { Client } from "./Client";
import { CleanCommand } from "./CommandActions";
import { Crashes } from "./Crashes";
import { Datascripts } from "./Datascripts";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { Launcher } from "./Launcher";
import { Livescripts } from "./Livescripts";
import { Tests } from "./Tests";
import { MapData } from "./MapData";
import { MiscCommands } from "./MiscCommands";
import { Module } from "./Modules";
import { mysql } from "./MySQL";
import { NodeConfig } from "./NodeConfig";
import { Package } from "./Package";
import { PositionsFile } from "./PositionsFile";
import { Realm } from "./Realm";
import { Snippets } from "./Snippets";
import { applyTSTLHack } from "./TSTLHack";
import * as path from 'path'

const timer = Timer.start();

// can be called from multiple places
async function initTerminal()
{
    term.debug('misc', `Initializing terminal`)
    await term.Initialize(
        ipaths.coredata.terminal_history_txt.get(),
        NodeConfig.TerminalHistory,
        NodeConfig.TerminalTimestamps,
        NodeConfig.TerminalNames,
    )
    term.log('mysql',`TSWoW started up in ${timer.timeSec()}s`)
    CleanCommand.addCommand('filecache','','Removes TSWoW file change cache',args=>{
        ipaths.bin.changes.remove();
        term.log('mysql',`Removed ${ipaths.bin.changes.abs().get()}`)
    });

    CleanCommand.addCommand(
          'all'
        , '(see arguments to clean datascripts/addon/livescripts)'
        , 'Cleans all build artifacts: datascripts, addons, livescripts, and filecache'
    , async args=>{
        let modules = Identifier.getModulesOrAll(args);

        // Clean all component types
        await commands.sendCommand(`clean datascripts ${modules.map(m => m.fullName).join(' ')}`);
        await commands.sendCommand(`clean addon ${modules.map(m => m.fullName).join(' ')}`);
        await commands.sendCommand(`clean livescripts ${modules.map(m => m.fullName).join(' ')}`);
        await commands.sendCommand(`clean filecache`);

        term.success('misc', 'Cleaned all build artifacts successfully');
    });
    await commands.enterLoop((input: string)=>{
        Module.cacheEndpoints(true);
        commands.sendCommand(input);
        Module.cacheEndpoints(false);
    });
}

export async function main() {
    term.log('mysql',`TSWoW Starting Up`)
    term.debug('tswow', `Process arguments: ${process.argv.join(' ')}`)

    if(process.argv.includes('terminal-only'))
    {
        console.log('[DEBUG] Terminal only mode');
        return initTerminal();
    }

    let wd = wfs.absPath('./')

    if(wd.includes(' ')) {
        term.error(
              'misc'
            , `Invalid installation path: ${wd}\n`
            + `You cannot have spaces in the path leading up to your tswow installation,`
            + `please move it and try again.\n`
        )
        process.exit(0)
    }

    const isServerMode = process.argv.includes('server-mode');

    if (isWindows() && path.resolve(NodeConfig.DefaultClient).charAt(0) != path.resolve(process.cwd()).charAt(0) && !isServerMode)
    {
        term.error(
            'client'
          , `Invalid client: ${NodeConfig.DefaultClient} is on different drive from TSWoW installation.\n\n`
          + `TSWoW must be installed on the same drive as the client,`
          + ` please move TSWoW and the WoW client to the same drive.`
      )
      process.exit(0)
    }

    if(!wfs.exists(NodeConfig.DefaultClient) && !isServerMode) {
        term.error(
              'client'
            , `Invalid client: ${NodeConfig.DefaultClient} does not exist.\n\n`
            + `TSWoW requires a valid client to be able to function,`
            + ` please enter one out in node.conf`
        )
        process.exit(0)
    }

    if(NodeConfig.DefaultClient.includes(' ') && !isServerMode) {
        term.error(
            'client'
          , `Invalid client path: ${wd}\n`
          + `You cannot have spaces in the path leading up to your client,`
          + `please move it and try again.\n`
        )
        process.exit(0)
    }

    applyTSTLHack();
    Module.cacheEndpoints(true);
    try {
        await mysql.initialize();
    } catch (err) {
        term.error('mysql', `Failed to initialize MySQL: ${err.message}`);
        term.error('mysql', `Please ensure MySQL is running and accessible.`);
        process.exit(1);
    }
    if(process.argv.includes('mysql-only'))
    {
        return initTerminal();
    }
    if (process.argv.includes('auth-only'))
    {
        await AuthServer.initializeDatabase()
        await AuthServer.initializeServer()
        return initTerminal();
    }
    await Dataset.initialize()
    await Client.initialize();
    await Module.initialize();
    await Snippets.initialize();
    try {
        await AuthServer.initializeDatabase()
    } catch (err) {
        term.error('authserver', `Failed to initialize AuthServer database: ${err.message}`);
        if (err.code === 'ECONNREFUSED') {
            term.error('authserver', `MySQL server is not running. Please start MySQL and try again.`);
        }
        process.exit(1);
    }
    await Realm.initialize()
    await AuthServer.initializeServer()
    term.log('tswow', 'AuthServer initialized');
    if (process.argv.includes('realm-only'))
    {
        return initTerminal();
    }
    term.log('tswow', 'Initializing Datascripts...');
    await Datascripts.initialize();
    term.debug('tswow', 'Datascripts.initialize() completed');
    if (process.argv.includes('data-only'))
    {
        term.debug('tswow', 'data-only mode detected, calling initTerminal()');
        return initTerminal();
    }
    term.debug('tswow', 'Datascripts initialized, now initializing Tests...');
    await Tests.initialize();
    term.debug('tswow', 'Tests initialized, now initializing Livescripts...');
    await Livescripts.initialize();
    term.debug('tswow', 'Livescripts initialized');
    if (process.argv.includes('scripts-only'))
    {
        return initTerminal();
    }
    await Addon.initialize();
    if (process.argv.includes('addon-only'))
    {
        return initTerminal();
    }
    await MapData.initialize();
    await Package.initialize();
    await Crashes.initialize();
    await PositionsFile.initialize();
    await MiscCommands.initialize();
    await Launcher.initialize();
    Module.cacheEndpoints(false);
    term.debug('tswow', 'All initializations complete, calling initTerminal()');
    return initTerminal();
}
main().catch(err => {
    term.error('tswow', `Fatal error in main(): ${err}`);
    console.error(err);
    process.exit(1);
});
