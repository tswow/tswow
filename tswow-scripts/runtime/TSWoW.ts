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
import { ipaths } from "../util/Paths";
import { term } from "../util/Terminal";
import { Timer } from "../util/Timer";
import { Addon } from "./Addon";
import { AuthServer } from "./AuthServer";
import { Client } from "./Client";
import { ClearCommand } from "./CommandActions";
import { Crashes } from "./Crashes";
import { Datascripts } from "./Datascripts";
import { Dataset } from "./Dataset";
import { Livescripts } from "./Livescripts";
import { MapData } from "./MapData";
import { Module } from "./Modules";
import { mysql } from "./MySQL";
import { NodeConfig } from "./NodeConfig";
import { Package } from "./Package";
import { PositionsFile } from "./PositionsFile";
import { Realm } from "./Realm";

export async function main() {
    term.log(`TSWoW Starting Up`)
    const timer = Timer.start();
    await mysql.initialize();
    await AuthServer.initialize()
    await Dataset.initialize()
    await Client.initialize();
    await Module.initialize();
    await Realm.initialize()
    await Datascripts.initialize();
    await Livescripts.initialize();
    await Addon.initialize();
    await MapData.initialize();
    await Package.initialize();
    await Crashes.initialize();
    await PositionsFile.initialize();
    await term.Initialize(
        ipaths.coredata.terminal_history_txt.get(),
        NodeConfig.TerminalHistory,
    )
    term.log(`TSWoW started up in ${timer.timeSec()}s`)
    ClearCommand.addCommand('filecache','','',args=>{
        ipaths.bin.changes.remove();
        term.log(`Removed ${ipaths.bin.changes.abs().get()}`)
    });
    await commands.enterLoop();
}
main();