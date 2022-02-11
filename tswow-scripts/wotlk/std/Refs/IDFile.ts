import * as fs from 'fs';
import { finish } from "../../../data/index";
import { iterateIds } from "../../../util/ids/Ids";
import { BuildArgs } from '../../../data/Settings';

// Patch ID files
finish('build-idfiles',()=>{
    if(BuildArgs.READ_ONLY) return;
    if(process.argv.includes('--no-id-defs')) {
        return;
    }

    let modulemap : {[key:string]: string}= {};

    iterateIds((r)=>{
        const uMod = r.mod.toUpperCase().split('-').join('_').split(' ').join('_');
        const uName = r.name.toUpperCase().split('-').join('_').split(' ').join('_');

        if(!modulemap[r.mod]) modulemap[r.mod] = ""

        if(r.size==1) {
            modulemap[r.mod]+= `export const ${uMod}_${uName} : uint32 = GetID("${r.table}","${r.mod}","${r.name}");\n`
        } else {
            modulemap[r.mod]+= `export const ${uMod}_${uName} : IDRange = GetIDRange("${r.table}", "${r.mod}", "${r.name}");\n`
        }
    });

    let allOut = "// @ts-nocheck\n"
    allOut+=`// To use these IDs in your live scripts\n`
    allOut+=`// simply copy the line into your script.\n`
    for(const mod in modulemap) {
        allOut += modulemap[mod]
    }
    fs.writeFileSync('coredata/IDs.ts',allOut);
});