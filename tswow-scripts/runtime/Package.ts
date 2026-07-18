import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
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
    static async packageClient(dataset: Dataset, fullDBC: boolean, fullInterface: boolean, folder: boolean) {
        term.log('client', `Packaging client for ${dataset.name}`)
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

        // Step 2: Build list of (src path, path inside archive) per MPQ — same layout as build-data patches
        type Entry = { src: string; dst: string };
        let entriesByMpq: { [mpq: string]: Entry[] } = {};
        const addEntry = (mod: string, src: string, dst: string) => {
            const mpq = mappings[mod];
            if (!mpq) return;
            // WoW MPQ archived names conventionally use backslashes.
            const dstNorm = dst.replace(/\//g, '\\').trim();
            if (!entriesByMpq[mpq]) entriesByMpq[mpq] = [];
            entriesByMpq[mpq].push({ src, dst: dstNorm });
        };

        if (mappings['dbc']) {
            dataset.path.dbc.iterate('FLAT', 'FILES', 'FULL', node => {
                if (!fullDBC) {
                    const rel = node.relativeTo(dataset.path.dbc);
                    const src = dataset.path.dbc_source.join(rel);
                    if (src.exists() && wfs.readBin(node).equals(wfs.readBin(src))) return;
                }
                addEntry('dbc', node.abs().get(), `DBFilesClient\\${node.basename().get()}`);
            });
        }

        if (mappings['luaxml']) {
            dataset.path.luaxml.iterate('RECURSE', 'FILES', 'FULL', node => {
                const rel = node.relativeTo(dataset.path.luaxml);
                if (!fullInterface) {
                    const src = dataset.path.luaxml_source.join(rel);
                    if (src.exists() && wfs.readBin(node).equals(wfs.readBin(src))) return;
                }
                addEntry('luaxml', node.abs().get(), rel.get());
            });
        }

        dataset.modules()
            .filter(x => mappings[x.fullName] && x.assets.exists())
            .forEach(x => {
                x.path.assets.iterate('RECURSE', 'FILES', 'FULL', node => {
                    const lower = node.toLowerCase();
                    if (lower.endsWith('.png') || lower.endsWith('.blend') || lower.endsWith('.psd') || lower.endsWith('.json') || lower.endsWith('.dbc')) return;
                    addEntry(x.fullName, node.abs().get(), node.relativeTo(x.assets.path).get());
                });
            });

        // Remove old package outputs (MPQ and folder)
        ipaths.package.iterateDef(node => {
            if (node.basename().get().startsWith(dataset.fullName)) node.remove();
        });

        let metas: PackageMeta[] = [];
        term.debug('client', `Packaging ${Object.keys(entriesByMpq).length} MPQ(s)`);
        for (const [mpq, entries] of Object.entries(entriesByMpq)) {
            term.debug('client', `Packaging ${mpq}`);
            const packageFile = ipaths.package.file(`${dataset.fullName}.${mpq}`);
            const listfilePath = ipaths.bin.package.file(packageFile.get());
            const listfileContent = entries.map(e => `${e.src}\t${e.dst}`).join('\n') + (entries.length ? '\n' : '');
            listfilePath.write(listfileContent);
            ipaths.package.mkdir();

            wsys.exec(
                `"${ipaths.bin.mpqbuilder.mpqbuilder_exe.get()}" "${listfilePath.abs().get()}" "${packageFile.abs().get()}"`,
                'inherit'
            );

            if (folder) {
                // Mirror layout into a folder (same hierarchy as MPQ / build-data patches) when explicitly requested.
                const folderName = packageFile.basename().get().replace(/\.[^.]+$/, '');
                const mirrorDirPath = path.join(resfp(ipaths.package), folderName);
                wfs.mkDirs(mirrorDirPath, true);
                for (const e of entries) {
                    const destPath = path.join(mirrorDirPath, e.dst);
                    wfs.mkDirs(path.dirname(destPath));
                    wfs.copy(e.src, destPath);
                }
            }

            const chunkSize = NodeConfig.LauncherPatchChunkSize;
            const meta: PackageMeta = { md5s: [], size: wfs.stat(packageFile).size, filename: packageFile.basename().get(), chunkSize };
            metas.push(meta);

            const handle = fs.openSync(resfp(packageFile), 'r');
            try {
                const buf = Buffer.alloc(chunkSize);
                while (true) {
                    const nread = fs.readSync(handle, buf, 0, chunkSize, null);
                    if (nread === 0) break;
                    meta.md5s.push(crypto.createHash('md5').update(nread < chunkSize ? buf.slice(0, nread) : buf).digest('hex'));
                }
            } finally {
                fs.closeSync(handle);
            }
        }
        if(metas.length > 0) {
            ipaths.package.join(`${dataset.fullName}.meta.json`).toFile().writeJson(metas)
        }
    }

    static Command = commands.addCommand('package')

    static initialize() {
        term.debug('misc', `Initializing packages`)
        this.Command.addCommand(
              'client'
            , 'dataset --fullDBC --fullInterface --folder'
            , 'Packages client data for the specified dataset'
            , async args => {
                const lower = args.map(x=>x.toLowerCase())
                const fullDBC = lower.includes('--fulldbc');
                const fullInterface = lower.includes('--fullinterface');
                const folder = lower.includes('--folder');
                await Promise.all(Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                ).map(x=>this.packageClient(x,fullDBC,fullInterface,folder)))
            }
        )
    }
}