import { Args } from "../util/Args";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { ApplyTagMacros } from "../util/TagMacros";
import { term } from "../util/Terminal";
import { BuildCommand, SendCommand, StartCommand, StopCommand } from "./CommandActions";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { ModuleEndpoint } from "./Modules";
import { NodeConfig } from "./NodeConfig";

const botTSConfig = {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "sourceMap": true,
      "experimentalDecorators": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "./build",
      "rootDir": "./"
    },
    "tstl": {
      "luaTarget": "5.4",
      "noImplicitSelf": true,
    },
    "exclude": [
        "**/build/**",
        "**/tswow/wotlkdata/**"
    ]
}

export class Bots {

    mod: ModuleEndpoint

    constructor(module: ModuleEndpoint) {
        this.mod = module;
    }

    get path() {
        return this.mod.path.bots
    }

    exists() {
        return this.path.exists()
    }

    initialize() {
        this.path.profiles.tsconfig_json.writeJson(botTSConfig)
        this.path.commands.tsconfig_json.writeJson(botTSConfig)
        ipaths.bin.include_bots.profiles_global_d_ts.copy(this.path.profiles.global_d_ts)
        ipaths.bin.include_bots.commands_global_d_ts.copy(this.path.commands.global_d_ts)
    }

    static build(dataset: Dataset, args: string[]) {
        dataset.path.lib.bots.remove();
        dataset.modules()
            .map(x=>x.bots)
            .filter(x=>x.exists())
            .forEach(x=>{
                x.initialize();
                const buildSubProject = (name: string) => {
                    let foundTS = false;
                    let subPath = x.path.join(name)
                    let buildPath = subPath.join('build')

                    subPath.iterate('RECURSE','FILES','FULL', node => {
                        if(node.endsWith('.ts')) {
                            foundTS = true;
                            return 'HALT'
                        }
                    })

                    term.log('bots',`Building ${x.mod.fullName}/${name} for dataset ${dataset.fullName}`)
                    if(foundTS) {
                        wsys.execIn(subPath.get(), `node ${ipaths.node_modules.tstl_js.abs()}`) 
                    }

                    subPath.iterate('RECURSE','BOTH','FULL',node=>{
                        if(node.basename().get() === 'build') {
                            return 'ENDPOINT'
                        }

                        if(node.isFile() && node.endsWith('.lua')) {
                            node.copy(buildPath.join(node.relativeTo(subPath)))
                        }
                    })

                    if(buildPath.exists()) {
                        buildPath.iterate('RECURSE','FILES','FULL', node => {
                            let rel = node.relativeTo(buildPath)
                            let file = subPath.join(rel)
                            if(node.endsWith('.lua') && !file.withExtension('.ts',true).exists() && !file.withExtension('.lua',true).exists()) {
                                term.log('bots',`Cleaning up removed lua file ${rel.get()}`)
                                node.remove();
                            }
                        })
                        let installPath = dataset.path.lib.bots.join(name,x.mod.fullName)
                        buildPath.copy(installPath);
                        installPath.iterate('RECURSE','FILES','ABSOLUTE',(node)=>{
                            if(!node.isFile() || !node.endsWith('.lua')) {
                                return;
                            }
                            let lines = node
                                .toFile()
                                .readString()
                                .split('\r').join('')
                                .split('\n')
                                .map(contents=>{
                                    return ApplyTagMacros(contents, dataset.fullName, 'LUA');
                                })
                                .join('\n');
                            node.toFile().write(lines,'OVERWRITE');
                        });
                    }
                }

                if(!Args.hasFlag('commands-only',args)) {
                    buildSubProject('profiles')
                }

                if(!Args.hasFlag('profiles-only',args)) {
                    buildSubProject('commands')
                }
            });

            dataset.realms().forEach(x=>{
                if(x.bots.isRunning()) {
                    x.bots.send('reload')
                }
            })
    }

    static create(mod: ModuleEndpoint) {
        return new Bots(mod).initialize();
    }

    static initialize() {
        BuildCommand.addCommand(
            'bots',
            'dataset',
            'Builds bots for the selected dataset',
            async args => {
                for(const value of Identifier.getDatasets(args, 'MATCH_ANY', NodeConfig.DefaultDataset)) {
                  await this.build(value,args)
              }
            })

        StartCommand.addCommand(
            'bots',
            'realm name',
            'Starts a bot process',
            async args => {
                await Promise.all(Identifier.getRealms(args,'MATCH_ANY',NodeConfig.DefaultRealm)
                .map(x=>{
                    return x.startBots(Identifier.getBuildType(args,NodeConfig.DefaultBuildType))
                }))
            }
        )

        StopCommand.addCommand(
            'bots',
            'realm name',
            'Stops a bot process',
            async args => {
                await Promise.all(Identifier.getRealms(args,'MATCH_ANY',NodeConfig.DefaultRealm)
                    .map(x=>x.bots.stop())
                )
            }
        )

        SendCommand.addCommand(
            'bots',
            'realm name',
            'Sends a command to a running bot process',
            async args => {
                let realm = Identifier.getRealm(args[0]);
                let message = args.slice(1);
                realm.bots.send(message.join(' '),true);
            }
        )
    }
}