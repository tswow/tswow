import { commands } from "../util/Commands";
import { ipaths } from "../util/Paths";
import { term } from "../util/Terminal";
import { BuildCommand } from "./CommandActions";
import { Identifier } from "./Identifiers";
import { NodeConfig } from "./NodeConfig";

export class MiscCommands {
    static initialize() {
        term.debug('misc', `Initializing misc commands`)
        BuildCommand.addCommand(
              'all'
            , '(see arguments to build datscripts/addon/livescripts)'
            , 'Builds datascripts/addons/livescripts'
        , async args=>{
            let datasets = Identifier.getDatasets(args,'MATCH_ANY',NodeConfig.DefaultDataset)
            for(const dataset of datasets) {
                let runningClients = [dataset.client]
                let runningWorldservers = dataset.realms()

                await commands.sendCommand(`build data ${dataset.name} ${args} --no-restart`);
                await commands.sendCommand(`build addon ${dataset.name} ${args}`)
                // we've already built inlinescripts, skip them
                await commands.sendCommand(`build scripts ${dataset.name} ${args} --no-inline`)
                await commands.sendCommand(`build lua ${dataset.name} ${args} --no-inline`)

                await Promise.all(runningClients.map(x=>x.startup(NodeConfig.AutoStartClient)))
                let autorealms = NodeConfig.AutoStartRealms
                .map(x=>Identifier.getRealm(x))
                await Promise.all(runningWorldservers
                    .filter(x=>autorealms.find(y=>y.fullName===x.fullName))
                    .map(x=>x.start(x.lastBuildType)))
            }
        })

        commands.addCommand('check','','',(args)=>{
            return commands.sendCommand(`build data ${args} --readonly`)
        });

        commands.addCommand('revision','','',()=>{
            console.log(
                  `TSWoW Revision: ${ipaths.bin.revisions.tswow.readString().slice(0,7)}\n`
                + `TrinityCore Revision: ${ipaths.bin.revisions.trinitycore.readString().slice(0,7)}`
            )
        }).addAlias('version')
    }
}