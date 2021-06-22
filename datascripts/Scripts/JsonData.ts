import * as path from 'path'
import * as fs from 'fs'
import { finish } from 'wotlkdata';
import { SystemStore } from 'wotlkdata/cell/serialization/SystemStore';

function scanDir(dir: string, callback: (file: string)=>void) {
    fs.readdirSync(dir).forEach(x=>{
        x = path.join(dir,x);
        if(fs.lstatSync(x).isDirectory()) scanDir(x,callback);
        else callback(x);
    });
}

finish('deserialize', () => {
    let modsDir = path.join(process.cwd(),'modules');
    let amount = 0;
    fs.readdirSync(modsDir).forEach(x=>{
        let dsDir = path.join(modsDir,x,'datascripts');
        if(!fs.existsSync(dsDir)) return;
        scanDir(dsDir,(file: string)=>{
            if(file.endsWith('.data.json')) {
                try {
                    SystemStore.deserialize(JSON.parse(fs.readFileSync(file,'utf-8')))
                    ++amount;
                } catch(error) {
                    error.message = `Error when deserializing ${file}:\n${error.message}`;
                    throw error;
                }
            }
        });
    });
});