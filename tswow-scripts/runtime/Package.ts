import { commands } from "../util/Commands";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { Addon } from "./Addon";
import { Datascripts } from "./Datascripts";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { NodeConfig } from "./NodeConfig";

export class Package {
    static async packageClient(dataset: Dataset, fullDBC: boolean, fullInterface: boolean) {
        await Datascripts.build(dataset);
        await Addon.build(dataset);

        let outFile = ``;
        dataset.path.dbc.iterate('FLAT','FILES','FULL',node=>{
            if(!fullDBC) {
                const rel = node.relativeTo(dataset.path.dbc);
                const src = dataset.path.dbc_source.join(rel);
                if(src.exists()) {
                    if(wfs.readBin(node).equals(wfs.readBin(src))) {
                        return;
                    }
                }
            }
            outFile+=`${node.abs().get()}\tDBFilesClient\\${node.basename().get()}\n`
        });

        dataset.path.luaxml.iterate('RECURSE','FILES','FULL',node=>{
            const rel = node.relativeTo(dataset.path.luaxml);
            if(!fullInterface) {
                const src = dataset.path.luaxml_source.join(rel);
                if(src.exists()) {
                    if(wfs.readBin(node).equals(wfs.readBin(src))) {
                        return;
                    }
                }
            }
            outFile+=`${node.abs().get()}\t${rel}\n`
        });

        dataset.modules()
            .filter(x=>x.assets.exists())
            .forEach(x=>{
                x.path.assets.iterate('RECURSE','FILES','FULL',node=>{
                    let lower = node.toLowerCase();
                    if(
                           lower.endsWith('.png')
                        || lower.endsWith('.blend')
                        || lower.endsWith('.psd')
                        || lower.endsWith('.json')
                        || lower.endsWith('.dbc')
                    ) return;
                    outFile+=`${node.abs()}\t${node.relativeTo(x.assets.path)}\n`
                });
            })

        const listPath = ipaths.bin.package.file(dataset.fullName)
        ipaths.package.mkdir()
        listPath.write(outFile);
        wsys.exec(
              `"${ipaths.bin.mpqbuilder.mpqbuilder_exe.get()}"`
            + ` ${listPath.abs().get()}`
            + ` ${ipaths.package.file(dataset.fullName).abs().get()}`
            , 'inherit')
    }

    static Command = commands.addCommand('package')

    static initialize() {
        this.Command.addCommand(
              'client'
            , 'dataset --fullDBC --fullInterface'
            , 'Packages client data for the specified dataset'
            , args => {
                const lower = args.map(x=>x.toLowerCase())
                const fullDBC = lower.includes('--fulldbc');
                const fullInterface = lower.includes('--fullinterface');
                Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                ).forEach(x=>{
                    this.packageClient(x,fullDBC,fullInterface)
                })
            }
        )
    }
}