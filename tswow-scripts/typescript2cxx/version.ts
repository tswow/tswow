import * as fs from "fs";
import md5 = require("md5");

const VERSION_FILE = 'livescripts/build/fileversion.json'
const NO_INCREMENTAL_FLAG = '--no-incremental'

let versions: {
      time: {[key: string]: number}
    , md5: {[key: string]:string}} =
{
      time: {}
    , md5: {}
}

if(!process.argv.includes(NO_INCREMENTAL_FLAG) && fs.existsSync(VERSION_FILE)) {
    versions = JSON.parse(fs.readFileSync(VERSION_FILE,'utf-8'));
    if(!versions.time) versions.time = {}
    if(!versions.md5) versions.md5 = {}
}

export function onFileOutdated(file: string, callback: ()=>void) {
    if(process.argv.includes(NO_INCREMENTAL_FLAG)) {
        return callback();
    }

    let oldVer = versions.time[file]
    let mtime = fs.statSync(file).mtime.getTime();
    if(oldVer === mtime) {
        return;
    }
    versions.time[file] = mtime;
    callback();
    writeVersions();
}

export function onMD5Changed(file: string, str: string,callback: ()=>void) {
    if(process.argv.includes(NO_INCREMENTAL_FLAG)) {
        return callback();
    }
    let old = versions.md5[file];
    let strMd5 = md5(str);
    if(old === strMd5) {
        return;
    }
    versions.md5[file] = strMd5
    callback();
    writeVersions();
    return;
}

export function writeVersions() {
    fs.writeFileSync(VERSION_FILE,JSON.stringify(versions));
}