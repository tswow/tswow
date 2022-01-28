import { commands } from "../util/Commands";
import { ipaths } from "../util/Paths";
import { BuildCommand } from "./CommandActions";

export class MiscCommands {
    static initialize() {
        BuildCommand.addCommand(
              'all'
            , '(see arguments to build datscripts/addon/livescripts)'
            , 'Builds datascripts/addons/livescripts'
        , async args=>{
            await commands.sendCommand(`build data ${args}`);
            await commands.sendCommand(`build addon ${args}`)
            // we've already built inlinescripts, skip them
            await commands.sendCommand(`build scripts ${args} --no-inline`)
        })

        commands.addCommand('check','','',()=>{
            return commands.sendCommand(`build data --readonly`)
        });

        commands.addCommand('revision','','',()=>{
            console.log(
                  `TSWoW Revision: ${ipaths.bin.revisions.tswow.readString().slice(0,7)}\n`
                + `TrinityCore Revision: ${ipaths.bin.revisions.trinitycore.readString().slice(0,7)}`
            )
        }).addAlias('version')
    }
}