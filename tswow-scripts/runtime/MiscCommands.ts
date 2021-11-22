import { commands } from "../util/Commands";
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
    }
}