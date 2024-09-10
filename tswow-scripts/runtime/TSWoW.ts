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
import { Launcher } from "./Launcher";
import { Livescripts } from "./Livescripts";
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
    await term.Initialize(
        ipaths.coredata.terminal_history_txt.get(),
        NodeConfig.TerminalHistory,
        NodeConfig.TerminalTimestamps,
        NodeConfig.TerminalNames,
    )
    term.log('mysql',`TSWoW started up in ${timer.timeSec()}s`)
    CleanCommand.addCommand('filecache','','',args=>{
        ipaths.bin.changes.remove();
        term.log('mysql',`Removed ${ipaths.bin.changes.abs().get()}`)
    });
    await commands.enterLoop((input: string)=>{
        Module.cacheEndpoints(true);
        commands.sendCommand(input);
        Module.cacheEndpoints(false);
    });
}

export async function main() {
    term.log('mysql',`TSWoW Starting Up`)

    if(process.argv.includes('terminal-only'))
    {
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
    await mysql.initialize();
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
    await AuthServer.initializeDatabase()
    await Realm.initialize()
    await AuthServer.initializeServer()
    if (process.argv.includes('realm-only'))
    {
        return initTerminal();
    }
    await Datascripts.initialize();
    if (process.argv.includes('data-only'))
    {
        return initTerminal();
    }
    await Livescripts.initialize();
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
    return initTerminal();
}
main();