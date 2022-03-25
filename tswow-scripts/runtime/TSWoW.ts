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
import { Lua } from "./Lua";
import { MapData } from "./MapData";
import { MiscCommands } from "./MiscCommands";
import { Module } from "./Modules";
import { mysql } from "./MySQL";
import { NodeConfig } from "./NodeConfig";
import { Package } from "./Package";
import { PositionsFile } from "./PositionsFile";
import { Realm } from "./Realm";

export async function main() {
    term.log('mysql',`TSWoW Starting Up`)

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

    const timer = Timer.start();

    if(!wfs.exists(NodeConfig.DefaultClient) && !process.argv.includes('server-mode')) {
        term.error(
              'client'
            , `Invalid client: ${NodeConfig.DefaultClient} does not exist.\n\n`
            + `TSWoW requires a valid client to be able to function,`
            + ` please enter one out in node.conf`
        )
        process.exit(0)
    }

    if(NodeConfig.DefaultClient.includes(' ')) {
        term.error(
            'client'
          , `Invalid client path: ${wd}\n`
          + `You cannot have spaces in the path leading up to your client,`
          + `please move it and try again.\n`
        )
        process.exit(0)
    }


    await mysql.initialize();
    await Dataset.initialize()
    await Client.initialize();
    await Module.initialize();
    await Realm.initialize()
    await AuthServer.initialize()
    await Datascripts.initialize();
    await Livescripts.initialize();
    await Addon.initialize();
    await MapData.initialize();
    await Package.initialize();
    await Crashes.initialize();
    await PositionsFile.initialize();
    await MiscCommands.initialize();
    await Lua.initialize();
    await Launcher.initialize();
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
    await commands.enterLoop();
}
main();