import { NodeConfig } from "../runtime/NodeConfig";
import { ClientPatches, EXTENSION_DLL_PATCH_NAME, FIX_COMBO_POINT_PATCH_NAME, ITEM_DBC_DISABLER_PATCH_NAME } from "./ClientPatches";
import { ConfigFile, Property, Section } from "./ConfigFile";
import { EmulatorCore } from "./EmulatorCore";
import { ipaths, modulePathToName } from "./Paths";

export const GAME_BUILD_FIELD = 'Dataset.GameBuild';

export class DatasetConfig extends ConfigFile {
    protected description(): string {
        return "Dataset Configurations"
    }

    @Section('Dataset')
    @Property({
          name: 'Dataset.Modules'
        , description: 'What modules are used to build this dataset'
        , examples: [[['all'],'']]
    })
    private _modules: string[] = this.undefined();
    get modules() {
        if(this._modules.includes('!all')) {
            throw new Error(`!all is not a valid module identifier: can't explicitly exclude all modules!`)
        }

        let hasAll = this._modules.includes('all')
        let declaredRoots = this._modules.filter(x=>x!=='all')
        if(hasAll) {
            declaredRoots = declaredRoots
                .concat(ipaths.modules.module.all()
                    .map(x=>modulePathToName(x.abs().get())))
        }

        let declaredPositives = declaredRoots.filter(x=>!x.startsWith('!'))
        let declaredNegatives = declaredRoots
            .filter(x=>x.startsWith('!'))
            .map(x=>x.substring(1))

        const findChildren = (arr: string[]) => arr
            .map(x=>ipaths.modules.module.pick(x).endpoints())
            .reduce((c,p)=>c.concat(p),[])
            .map(x=>modulePathToName(x.abs().get()))
            .filter((x,i,a)=>a.indexOf(x) === i)

        let impPosChildren = findChildren(declaredPositives);
        let impNegChildren = findChildren(declaredNegatives);
        let final = impPosChildren.filter(x=>!impNegChildren.includes(x))
        return final;
    }

    @Property({
          name: GAME_BUILD_FIELD
        , description:
              'The game build id you want for this dataset. '
            + 'Different game builds makes it possible '
            + 'to make realms appear as "offline" to clients '
            + 'on a different build than the worldserver running this '
            + 'dataset.'
        , examples: [
              [12340,'The normal 3.3.5a game build']
            , [12341,'A custom game build']
        ]
        , note:
                  "This is mostly useful if you're going to host multiple "
                + "realms with different datasets through a single authserver"
    })
    DatasetGameBuild: number = this.undefined()

    @Section('Client')
    @Property({
          name: 'Client.Patches'
        , description: 'What client binary patches should be applied'
        , examples: [
            [['all',`!${EXTENSION_DLL_PATCH_NAME}`,`!${ITEM_DBC_DISABLER_PATCH_NAME}`,`!${FIX_COMBO_POINT_PATCH_NAME}`],'']
        ]
        , note: 'Values prepended with "!" are excluded.'
    })
    private _client_patches: string[] = this.undefined();
    get client_patches() {
        return this.getArrayAll(this._client_patches,
            ClientPatches(0,[]).map(x=>x.name)
        )
    }

    @Property({
          name: 'Client.Path'
        , description: 'The filepath to the development client for this dataset'
        , examples: [
            ['','Defaults to config in node.conf'],
            ['C:\\dev\\wow\\client','Overrides the value in node.conf for this dataset']
        ]
    })
    private _client_path: string = this.undefined();
    get client_path() {
        let p = this._client_path;
        return p.length > 0 ? p : NodeConfig.DefaultClient
    }

    @Property({
           name: 'Client.DevPatchLetter'
        ,  description: 'The letter in your development patch name'
        ,  examples: [
              ['A','Will work for most uses'],
        ]
    })
    ClientDevPatchLetter: string = this.undefined()

    @Property({
           name: 'Client.Patch.UseLocale'
        ,  description:
              'Whether to use the locale directory when applying '
            + 'development patches'
        , examples: [
              [false,'Almost always used with enUS clients']
            , [true, 'Common with chinese clients']
        ]
    })
    ClientPatchUseLocale: boolean = this.undefined()

    @Property({
          name: 'Emulator.Core'
        , description: 'What emulator base to use for this dataset'
        , examples: [
            ['trinitycore','']
        ]
    })
    EmulatorCore: EmulatorCore = this.undefined()

    @Property({
          name: 'Package.Mapping'
        , description: ''
        , examples: [
            [['A.MPQ:*'],'Maps all data into A.MPQ'],
            [['A.MPQ:module-a,module-b','B.MPQ:*'],'Maps "module-a" and "module-b" into A.MPQ and everything else into B.MPQ'],
            [['A.MPQ:luaxml,dbc','B.MPQ:*'],'Maps dbc/lua data into A.MPQ and all assets into B.MPQ']
        ]
    })
    PackageMapping!: string[]
}