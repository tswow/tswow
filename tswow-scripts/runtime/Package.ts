import * as crypto from 'crypto';
import * as fs from 'fs';
import { commands } from "../util/Commands";
import { wfs } from "../util/FileSystem";
import { resfp } from '../util/FileTree';
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from '../util/Terminal';
import { util } from '../util/Util';
import { Addon } from "./Addon";
import { Datascripts } from "./Datascripts";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { NodeConfig } from "./NodeConfig";

export interface PackageMeta {
    size: number;
    md5s: string[];
    filename: string;
    chunkSize: number;
}

export class Package {
    static async packageClient(dataset: Dataset, fullDBC: boolean, fullInterface: boolean) {
        await Datascripts.build(dataset,['--no-shutdown']);
        await Addon.build(dataset);

        // Step 1: Resolve mappings
        let mapstr: [string,string[]][] = dataset.config.PackageMapping
            .map(x=>x.split(':'))
            .map(([mpq,modules])=>[mpq,modules.split(',')])
        let mappings: {[mod: string]: /*mpq*/ string } = {}
        let buildModules = dataset.modules().map(x=>x.fullName).concat('_build')
        buildModules.concat(['luaxml','dbc']).forEach(x=>{
            let bestMpq: string = "";
            let bestLen: number = 0;
            mapstr.forEach(([mpq,modules])=>{
                modules.forEach(mod=>{
                    if((mod == '*' || util.isModuleOrParent(x,mod)) && mod.length > bestLen) {
                        bestLen = mod.length;
                        bestMpq = mpq;
                    }
                });
            });
            if(bestLen != 0) {
                mappings[x] = bestMpq
            } else {
                term.log(
                      'dataset'
                    , `Module ${x} has no package mapping in dataset ${dataset.fullName}, will not build it`
                )
            }
        })

        // Step 2: Build MPQ
        let listfiles: {[mpq: string]: string} = {}
        const appendListfile = (mod: string,value: string) => {
            let listfile = listfiles[mappings[mod]] || ''
            listfile+=value;
            listfiles[mappings[mod]] = listfile;
        }

        if(mappings['dbc']) {
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
                appendListfile('dbc',`${node.abs().get()}\tDBFilesClient\\${node.basename().get()}\n`)
            });
        }

        if(mappings['luaxml']) {
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
                appendListfile('luaxml',`${node.abs().get()}\t${rel}\n`)
            });
        }

        dataset.modules()
            .filter(x=>mappings[x.fullName] && x.assets.exists())
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
                    appendListfile(x.fullName, `${node.abs()}\t${node.relativeTo(x.assets.path)}\n`)
                });
            })

        // Remove old
        ipaths.package.iterateDef(node=>{
            if(node.isFile() && node.basename().startsWith(dataset.fullName)) {
                node.remove();
            }
        })

        let metas: PackageMeta[] = []
        Object.entries(listfiles).forEach(([mpq,list])=>{
            let packageFile = ipaths.package.join(`${dataset.fullName}.${mpq}`)
            let listfile = ipaths.bin.package.file(packageFile.toString());
            listfile.write(list);
            ipaths.package.mkdir();
            wsys.exec(
                `"${ipaths.bin.mpqbuilder.mpqbuilder_exe.get()}"`
              + ` ${listfile.abs().get()}`
              + ` ${packageFile.abs().get()}`
              , 'inherit')

            const chunkSize = NodeConfig.LauncherPatchChunkSize;
            let meta: PackageMeta = {
                md5s: []
              , size: wfs.stat(packageFile).size
              , filename: packageFile.basename().toString()
              , chunkSize
            }
            metas.push(meta);

            const handle = fs.openSync(resfp(packageFile),'r');
            try {
                let buf = Buffer.alloc(chunkSize)
                while(true) {
                    let nread = fs.readSync(handle,buf,0,chunkSize,null);
                    if(nread === 0) {
                        break;
                    }
                    let data = nread < chunkSize
                        ? buf.slice(0,nread)
                        : buf;
                    meta.md5s.push(crypto.createHash('md5').update(data).digest('hex'))
                }
            } catch(err) {
                fs.closeSync(handle);
                throw err;
            }
            fs.closeSync(handle);
        })
        if(metas.length > 0) {
            ipaths.package.join(`${dataset.fullName}.meta.json`).toFile().writeJson(metas)
        }
    }

    static Command = commands.addCommand('package')

    static initialize() {
        this.Command.addCommand(
              'client'
            , 'dataset --fullDBC --fullInterface'
            , 'Packages client data for the specified dataset'
            , async args => {
                const lower = args.map(x=>x.toLowerCase())
                const fullDBC = lower.includes('--fulldbc');
                const fullInterface = lower.includes('--fullinterface');
                await Promise.all(Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                ).map(x=>this.packageClient(x,fullDBC,fullInterface)))
            }
        )
    }
}