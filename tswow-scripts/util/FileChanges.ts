// Todo: remake

import * as crypto from "crypto";
import * as fs from "fs";
import { wfs } from "./FileSystem";
import { FilePath, resfp, WNode } from "./FileTree";
import { ipaths } from "./Paths";

function md5 (value: Buffer|string) {
    return crypto
    .createHash('md5')
    .update(value)
    .digest('hex')
}

export class ChangeMap<T> {
    constructor(filepath: string) {
        this.filepath = filepath;
        if(wfs.exists(this.filepath)) {
            this.values = JSON.parse(wfs.read(this.filepath));
        } else {
            this.values = {}
        }
    }

    beginCache() {
        if(!this.cached) {
            this.changed = false;
        }
        this.cached = true;
    }

    endCache() {
        this.cached = false;
        if(this.changed) {
            this.save();
        }
    }

    doCached(callback: ()=>void) {
        this.beginCache();
        callback();
        this.endCache();
    }

    read(filepath: string) {
        return this.values[filepath];
    }

    write(filepath: string, value: T) {
        this.values[filepath] = value;
        if(!this.cached) {
            this.save();
        } else {
            this.changed = true;
        }
    }

    clear() {
        this.values = {}
        this.cached = false
        wfs.remove(this.filepath);
    }

    protected values: {[filepath: string]: T} = undefined;
    protected filepath: string;
    protected cached: boolean;
    protected changed: boolean;
    protected save() {
        wfs.write(this.filepath, JSON.stringify(this.values,null,4));
    }
}

export class FileChangeModule {
    readonly filepath: string;

    protected hashes: ChangeMap<string>;
    protected modifies: ChangeMap<number>;

    constructor(name: string) {
        this.filepath = ipaths.bin.changes.join(name).get()
        this.hashes = new ChangeMap(this.filepath+'.hashes');
        this.modifies = new ChangeMap(this.filepath+'.modifies');
    }

    beginCache() {
        this.hashes.beginCache();
        this.modifies.beginCache();
    }

    endCache() {
        this.hashes.endCache();
        this.modifies.endCache();
    }

    doCached(callback: (self: this)=>void) {
        this.hashes.doCached(()=>{
            this.modifies.doCached(()=>{
                callback(this);
            });
        })
    }

    // primarily used by transpiler

    writeIfChanged(filepath: FilePath, value: Buffer, encoding?: BufferEncoding);
    writeIfChanged(filepath: FilePath, value: string)
    writeIfChanged(filepath: FilePath, value: string|Buffer, encoding?: BufferEncoding) {
        filepath = wfs.absPath(filepath);
        let oldHash = this.hashes.read(filepath);
        let newHash = md5(value);
        if(oldHash === undefined || !wfs.exists(filepath) || oldHash !== newHash) {
            if(typeof(value) === 'object') {
                wfs.write(filepath, value, encoding);
            } else {
                wfs.write(filepath,value);
            }
            this.hashes.write(filepath,newHash);
        }
    }

    isChanged(input: FilePath) {
        return !fs.existsSync(resfp(input))
            || fs.statSync(resfp(input)).mtimeMs !== this.modifies.read(resfp(input))
    }

    markChanged(input: FilePath) {
        this.modifies.write(resfp(input), fs.statSync(resfp(input)).mtimeMs);
    }

    onChanged(input: FilePath, outputs: string[], callback: (filepath: WNode)=>void) {
        input = wfs.absPath(input);
        let newMtime = fs.statSync(input).mtimeMs;
        let oldMtime = this.modifies.read(input);
        if(newMtime !== oldMtime || outputs.find(x=>!wfs.exists(x))) {
            callback(new WNode(input));
            this.modifies.write(input,newMtime);
        }
    }
}