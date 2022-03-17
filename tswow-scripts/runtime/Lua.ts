import { ipaths } from "../util/Paths"
import { wsys } from "../util/System"
import { term } from "../util/Terminal"
import { BuildCommand } from "./CommandActions"
import { Dataset } from "./Dataset"
import { Identifier } from "./Identifiers"
import { ModuleEndpoint } from "./Modules"
import { NodeConfig } from "./NodeConfig"

const lua_example =
`function Main(events: TSEvents) {
    // Register your events here!
}`

const lua_tsconfig_json = {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "sourceMap": true,
      "forceConsistentCasingInFileNames": true
    },
    "tstl": {
      "luaTarget": "5.1",
      "luaPlugins": [],
      "noImplicitSelf": true,
    }
}

export class Lua {
    readonly mod: ModuleEndpoint

    get path() {
        return this.mod.path.lua
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
    }

    exists() {
        return this.path.exists();
    }

    initialize() {
        if(!this.path.exists()) {
            this.path.mkdir();
            this.path.example.write(lua_example)
        }
        ipaths.bin.include.global_d_ts.copy(this.path.global_d_ts);
        return this;
    }

    static create(mod: ModuleEndpoint) {
        return new Lua(mod).initialize()
    }

    async build(dataset: Dataset, _args: string[]) {
        this.initialize();
        let config = Object.assign({},lua_tsconfig_json)
        config["compilerOptions"]["outDir"] = dataset.path.lib.lua.join(this.mod.fullName).abs().get();
        this.path.tsconfig_json.writeJson(config);

        let foundTs = false;
        this.path.iterateDef(node=>{
            if(node.isFile() && node.endsWith('.ts')) {
                foundTs = true;
                return 'HALT'
            }
        })

        if(foundTs) {
            wsys.execIn(
                this.path.get()
            , `node ${ipaths.node_modules.tstl_js.abs()}`
            )
        }

        this.path.iterateDef(node=>{
            if(node.isFile() && node.endsWith('.lua')) {
                node.copy(dataset.path.lib.lua.join(this.mod.fullName,node.relativeTo(this.path)))
            }
        })
        dataset.realms()
            .filter(x=>x.worldserver.isRunning())
            .forEach(x=>x.worldserver.send('reload lua'))

        term.success('lua',`Finished building lua for module ${this.mod.fullName}`)
    }

    static initialize() {
        BuildCommand.addCommand(
            'lua'
            , 'dataset'
            , 'Compiles and reloads lua scripts for select modules or modules within a dataset'
            , args => {
                const datasets = Identifier.getDatasets(
                    args,'MATCH_ANY', NodeConfig.DefaultDataset
                )
                return Promise.all(datasets.map(dataset=>{
                    dataset.path.lib.lua.remove();
                    let modules = dataset.modules().filter(x=>x.lua.exists())
                    if(modules.length === 0) {
                        throw new Error(`No modules with lua enabled in dataset ${dataset.fullName}`)
                    }
                    return Promise.all(modules.map(x=>{
                        return x.lua.build(dataset,args)
                    }));
                }))
            }
        )
    }
}