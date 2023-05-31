/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import * as fs from "fs";
import path from "path";
import { wfs } from "./FileSystem";
import { wsys } from "./System";

type NodeType =
      'DIR'
    | 'DIR_NAME'
    | 'DYNAMIC_FILE'
    | 'FILE'
    | 'DYNAMIC_DIR'
    | 'CUSTOM'
    | 'DYNAMIC_CUSTOM'

abstract class TreeConstructor {
    type: NodeType
    constructor(type: NodeType) {
        this.type = type;
    }
}

class Dir extends TreeConstructor {
    child: any
    constructor(child: any) {
        super('DIR')
        this.child =  child;
    }
}

class DirName extends TreeConstructor {
    dir: string
    child: any
    constructor(dir: string, child: any ) {
        super('DIR_NAME')
        this.child = child;
        this.dir = dir;
    }
}

class DynamicFile extends TreeConstructor {
    callback: (strIn: string)=>string;
    constructor(callback: (strIn: string)=>string) {
        super('DYNAMIC_FILE')
        this.callback = callback;
    }
}

class File extends TreeConstructor {
    name: string
    constructor(name: string) {
        super('FILE')
        this.name = name;
    }
}

class DynamicDir extends TreeConstructor {
    callback: (strIn: string)=>any
    constructor(callback: (strIn: string)=>any) {
        super('DYNAMIC_DIR')
        this.callback = callback
    }
}

class Custom extends TreeConstructor {
    callback: (pathIn: string, nameIn: string)=>any;
    constructor(callback: (pathIn: string, nameIn: string)=>any) {
        super('CUSTOM');
        this.callback = callback;
    }
}

class DynamicCustom extends TreeConstructor {
    callback: (pathIn: string, nameIn: string)=>any;
    constructor(callback: (pathIn: string, nameIn: string)=>any) {
        super('DYNAMIC_CUSTOM');
        this.callback = callback;
    }
}

function toStr(path: string|WNode) {
    return typeof(path) === 'object' ? path.get() : path;
}

export type FilePath = WNode|string
export function resfp(pathIn: FilePath) {
    return typeof(pathIn) === 'string' ? pathIn : pathIn.get()
}

export class WNode {
    protected path: string;
    constructor(path: string|WNode) {
        this.path = typeof(path) === 'string' ? path : path.path;
    }

    relativeToParent(parent: string) {
        let cur = this as WNode;
        while(cur.dirname().get() !== cur.get()) {
            if(cur.basename(1).get() === parent) {
                return this.relativeTo(cur.dirname());
            }
            cur = cur.dirname()
        }
        throw new Error(
            `${this.abs().get()} has no parent directory called ${parent}`
        )
    }

    isSymlink() {
        return wfs.isSymlink(this.path);
    }

    withExtension(newExtension: string, removeOld = true) {
        if(removeOld && this.path.indexOf('.') > 0) {
            return this.construct(this.path.replace(/\.[^/.]+$/,newExtension));
        } else {
            return this.construct(this.path+newExtension);
        }
    }

    protected construct(pathIn: string): this {
        return new WNode(pathIn) as this;
    }

    includes(value: string) {
        return this.path.includes(value);
    }

    filter(callback: (v: WNode)=>void) {
        return fs.readdirSync(this.path)
            .map(x=>this.join(x))
            .filter(callback)
    }

    ctime() {
        return fs.statSync(this.path).ctime;
    }

    mtime() {
        return fs.statSync(this.path).mtime;
    }

    mtimeMs() {
        return fs.statSync(this.path).mtimeMs;
    }

    abs(slashType: 'UNCHANGED'|'FORWARD'|'BACKWARD' = 'UNCHANGED') {
        let abs = wfs.absPath(this.path);
        switch(slashType) {
            case 'BACKWARD':
                abs = abs.split('/').join('\\')
                break;
            case 'FORWARD':
                abs = abs.split('\\').join('/')
                break;
        }
        return this.construct(abs);
    }

    substring(start: number, end?: number) {
        return this.path.substring(start,end);
    }

    toLowerCase() {
        return this.construct(this.path.toLowerCase())
    }

    toUpperCase() {
        return this.construct(this.path.toUpperCase())
    }

    match(regex: RegExp) {
        return this.path.match(regex);
    }

    get length() {
        return this.path.length
    }

    split(str: string|RegExp) {
        return this.path.split(str);
    }

    startsWith(start: string) {
        return this.path.startsWith(start);
    }

    endsWith(ending: string) {
        return this.path.endsWith(ending);
    }

    relativeTo(pathIn: string|WNode) {
        return this.construct(wfs.relative(toStr(pathIn),this.path));
    }

    relativeFrom(pathIn: string|WNode) {
        return this.construct(wfs.relative(this.path,toStr(pathIn)));
    }

    dirname() {
        return new WDirectory(wfs.dirname(this.path));
    }

    doIn(callback: (pathIn: this)=>any) {
        return wsys.inDirectory(this.path,()=>callback(this));
    }

    concat(...strings: string[]) {
        return new WNode(this.path.concat(...strings));
    }

    join(...paths: (WNode|string)[]) {
        paths = paths.map(x=>typeof(x) === 'object' ? x.get() : x)
        paths.unshift(this.path);
        return this.construct(path.join.apply(path,paths));
    }

    basename(parent: number = 0) {
        let p = this.path;
        for(let i=0;i<parent;++i) {
            p = wfs.dirname(p);
        }
        return this.construct(wfs.basename(p));
    }

    copy(dest: WNode|string, flushFolders?: boolean) {
        wfs.copy(this.get(),toStr(dest),flushFolders);
        return this;
    }

    copyOnNoTarget(dest: WNode) {
        if(!dest.exists()) {
            wfs.copy(this.get(), dest.get())
        }
        return this;
    }

    get() { return this.path; }
    exists() { return fs.existsSync(this.path); }

    isFile() {
        return this.exists() && fs.statSync(this.path).isFile()
    }
    isDirectory() {
        return this.exists() && fs.statSync(this.path).isDirectory()
    }

    toFile() {
        return new WFile(this.path);
    }

    toDirectory() {
        return new WDirectory(this.path);
    }

    unlink() {
        fs.unlinkSync(this.path);
    }

    remove() {
        if(fs.existsSync(this.path)) {
            fs.rmSync(this.path,{recursive:true,force:true,maxRetries:1});
            return true;
        }
        return false;
    }

    protected toString() {
        return this.path;
    }

    protected toJson() {
        return this.path;
    }
}

export type Overwrite = 'OVERWRITE'|'DONT_OVERWRITE'
export class WFile extends WNode {
    protected construct(pathIn: string): this {
        return new WFile(pathIn) as this;
    }

    extension() {
        return this.path.split('.').pop();
    }

    writeBuffer(buffer: Buffer, encoding?: BufferEncoding, overwrite: Overwrite = 'OVERWRITE') {
        wfs.mkDirs(this.dirname().get());
        if(overwrite === 'OVERWRITE' || ! this.exists() ) {
            fs.writeFileSync(this.path,buffer,encoding);
            return true;
        }
        return false;
    }

    append(text: string) {
        wfs.mkDirs(this.dirname());
        fs.appendFileSync(this.path,text,{encoding:'utf-8'});
    }

    write(text: string, overwrite: Overwrite = 'OVERWRITE') {
        wfs.mkDirs(this.dirname());
        if(overwrite === 'OVERWRITE' || ! this.exists()) {
            fs.writeFileSync(this.path,text,{encoding:'utf-8'})
            return true;
        }
        return false;
    }
    writeJson(obj: any, indents: number = 4, overwrite: Overwrite = 'OVERWRITE') {
        wfs.mkDirs(this.dirname());
        if(overwrite === 'OVERWRITE' || ! this.exists()) {
            fs.writeFileSync(this.path,JSON.stringify(obj,null,indents),{encoding:'utf-8'});
            return true;
        }
        return false;
    }

    readBuffer(def?: Buffer) {
        if(!this.exists()) {
            return def;
        } else {
            return fs.readFileSync(this.path);
        }
    }

    readString(def?: string) {
        if(!this.exists()) {
            return def;
        } else {
            return fs.readFileSync(this.path,'utf-8')
        }
    }

    readJson(def?: any) {
        if(!this.exists()) {
            return def;
        } else {
            return JSON.parse(fs.readFileSync(this.path,'utf-8'))
        }
    }

    read(): Buffer;
    read(encoding: BufferEncoding): string;
    read(encoding?: BufferEncoding) {
        if(encoding) {
            return fs.readFileSync(this.path,encoding);
        } else {
            return fs.readFileSync(this.path);
        }
    }
    lastEdited() {
        return fs.statSync(this.path).mtime;
    }
}

export class WDirectory extends WNode {
    protected construct(pathIn: string): this {
        return new WDirectory(pathIn) as this;
    }

    containsFile(file: string) {
        return this.readDir('ABSOLUTE')
            .find(x=>x.basename().get() === file) !== undefined;
    }

    readDir(rel: 'RELATIVE'|'ABSOLUTE' = 'RELATIVE') {
        return fs.readdirSync(this.path)
            .map(x=>rel === 'ABSOLUTE' ? path.join(this.path,x) : x)
            .map(x=>new WNode(x))
    }

    remove() {
        if(fs.existsSync(this.path)) {
            fs.rmSync(this.path,{recursive:true,force:true});
            return true;
        }
        return false;
    }

    lastEdited() {
        return fs.statSync((this.path)).mtime;
    }

    mkdir() {
        return wfs.mkDirs(this.path,false);
    }

    iterateDef(callback: (node: WNode)=>'HALT'|'ENDPOINT'|void) {
        return this.iterate('FLAT','BOTH','FULL',callback);
    }

    iterate(
          rec: 'RECURSE'|'FLAT'
        , targets: 'FILES'|'DIRECTORIES'|'BOTH'
        , pathType: 'RELATIVE'|'FULL'|'ABSOLUTE'
        , callback: (node: WNode)=>'HALT'|'ENDPOINT'|void
    ) {
        if(!this.exists()) return;
        const cbPath = (node: string) => {
            return pathType == 'RELATIVE'
                ? node
                : pathType == 'FULL'
                ? path.join(this.path,node)
                : path.resolve(path.join(this.path,node))
        }

        const recurse = (cur: string) => {
            const curDir = path.join(this.path,cur);
            let halt = false;
            fs.readdirSync(curDir).find(x=>{
                let node = path.join(cur,x);
                let full = path.join(this.path,node)
                let stat = fs.statSync(full);

                if(stat.isDirectory()) {
                    if(targets == 'DIRECTORIES' || targets == 'BOTH') {
                        switch(callback(new WNode(cbPath(node)))) {
                            case 'HALT': {
                                halt = true;
                                return true;
                            }
                            case 'ENDPOINT': {
                                return false;
                            }
                        }
                    }

                    if(rec == 'RECURSE') {
                        recurse(node);
                    }
                }

                if(stat.isFile()) {
                    if(targets == 'FILES' || targets == 'BOTH') {
                        if(callback(new WNode(cbPath(node))) == 'HALT') {
                            halt = true;
                            return true;
                        }
                    }
                }
            })
            return halt;
        }
        recurse('');
    }
}

export class WDynDirectory<T> {
    protected path: string;
    protected callback: (p: string)=>any;

    constructor(path: string, callback: (p: string)=>any) {
        this.path = path;
        this.callback = callback;
    }

    pick(name: string): WDirectory & T {
        const pout = path.join(this.path,name);
        return generateTree(pout,dir(this.callback(name)));
    }

    all(): (WNode&T)[] {
        if(!fs.existsSync(this.path)) return []
        return fs.readdirSync(this.path).map(x=>this.pick(x))
    }
}

export function custom<T>(callback: (value: string)=>T): T {
    return new Custom(callback) as any;
}

export function dynCustom<T>(callback: (pathIn: string, nameIn: string)=>T): WDynDirectory<T> {
    return new DynamicCustom(callback) as any;
}

export function dir<T>(value: T): T & WDirectory {
    return new Dir(value) as any;
}

export function dirn<T>(name: string, value: T): T & WDirectory {
    return new DirName(name, value) as any;
}

export function dynfile(callback: (name: string)=>string): (name: string)=> WFile {
    return new DynamicFile(callback) as any;
}

// TODO: fix
export function multifile(names: string[]): WFile[] {
    return undefined;
}

export function file(name: string): WFile {
    return new File(name) as any;
}

export function dyndir<T>(callback: (key: string) => T)
    : WDynDirectory<T>
{
    return new DynamicDir(callback) as any;
}

export type EnumType<T,Type> = {
    [Property in keyof Type]: T
}

export function enumDir<T,S,U extends keyof EnumType<T,S>>(key: S, callback: (key: U) => T)
    : WDynDirectory<T> {
    return new DynamicDir(callback as any) as any
}

export function generateTree<T>(pathIn: string, tree: T, nameIn: string = ''): T {
    const con = tree as any as TreeConstructor;
    if(typeof(con) !== 'object' || con.type === undefined) {
        return con as any;
    }

    switch(con.type) {
        case 'DIR':
        case 'DIR_NAME':
            pathIn = path.join(pathIn,con.type == 'DIR_NAME' ? (con as DirName).dir : nameIn);
            const out = new WDirectory(pathIn) as any;
            Object.entries((con as Dir).child).forEach(([k,v])=>{
                out[k] = generateTree(pathIn,v,k);
            });
            out.get = ()=>pathIn;
            return out;
        case 'DYNAMIC_DIR':
            return new WDynDirectory(
                pathIn,(con as DynamicDir).callback) as any;
        case 'DYNAMIC_FILE':
            return ((str: string) => new WFile((con as DynamicFile).callback(path.join(pathIn,str)))) as any
        case 'FILE':
            return new WFile(path.join(pathIn, (con as File).name)) as any
        case 'CUSTOM':
            // todo: fix this
            return (con as Custom).callback(pathIn, nameIn)
        case 'DYNAMIC_CUSTOM':
            return new WDynDirectory(
                pathIn,(nameIn: string)=>(con as DynamicCustom).callback(pathIn,nameIn)) as any
        default:
            throw new Error(`Invalid tree constructor type: ${con.type} in path ${path.join(pathIn,nameIn)}`);
    }
}