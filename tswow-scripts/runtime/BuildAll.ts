import { commands } from "../util/Commands";
import { BuildCommand } from "./CommandActions";

export class BuildAll {
    static initialize() {
        BuildCommand.addCommand('all','','ok',async args=>{
            await commands.sendCommand(`build data ${args}`);
            await commands.sendCommand(`build addon ${args}`)
            await commands.sendCommand(`build scripts ${args}`)
        })
    }
}