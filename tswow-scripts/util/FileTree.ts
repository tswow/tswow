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

type NodeType =
      'DIR'
    | 'DIR_NAME'
    | 'DYNAMIC_FILE'
    | 'FILE'
    | 'DYNAMIC_DIR'
    | 'DIR_RECURSIVE'
    | 'CUSTOM'

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

class RecursiveDir extends TreeConstructor {
    callback: (strIn: string)=>any
    excludedNames: string[]
    constructor(excludedNames: string[], callback: (strIn: string)=>any) {
        super('DIR_RECURSIVE')
        this.callback = callback;
        this.excludedNames = excludedNames;
    }
}

class Custom extends TreeConstructor {
    value: any;
    constructor(value: any) {
        super('CUSTOM');
        this.value = value;
    }
}

class GeneratedNode {
    protected path: string;
    constructor(path: string) {
        this.path = path;
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
        return new GeneratedFile(this.path);
    }

    toDirectory() {
        return new GeneratedDirectory(this.path);
    }
}

class GeneratedFile extends GeneratedNode {
    write(text: string): void;
    write(buffer: Buffer, encoding?: BufferEncoding): void;
    write(bufferOrText: string|Buffer, encoding?: BufferEncoding) {
        if(!fs.existsSync(this.path)) {
            fs.mkdirSync(path.dirname(this.path),{recursive:true});
        }
        if(typeof(bufferOrText) == 'string') {
            fs.writeFileSync(this.path, bufferOrText);
        } else {
            fs.writeFileSync(this.path, encoding
                ? bufferOrText.toString(encoding)
                : bufferOrText);
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
    remove() {
        if(fs.existsSync(this.path)) {
            fs.rmSync(this.path);
            return true;
        }
        return false;
    }
    lastEdited() {
        return fs.statSync(this.path).mtime;
    }
}

class GeneratedDirectory extends GeneratedNode {
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

    iterate(
          rec: 'RECURSE'|'FLAT'
        , targets: 'FILES'|'DIRECTORIES'|'BOTH'
        , pathType: 'RELATIVE'|'FULL'|'ABSOLUTE'
        , callback: (node: GeneratedNode)=>'HALT'|'ENDPOINT'|void
    ) {
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
                        switch(callback(new GeneratedNode(cbPath(node)))) {
                            case 'HALT': {
                                halt = true;
                                return true;
                            }
                            case 'ENDPOINT': {
                                return true;
                            }
                        }
                    }

                    if(rec == 'RECURSE') {
                        recurse(node);
                    }
                }

                if(stat.isFile()) {
                    if(targets == 'FILES' || targets == 'BOTH') {
                        if(callback(new GeneratedNode(cbPath(node))) == 'HALT') {
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

export function custom<T>(value: T): T {
    return new Custom(value) as any;
}

export function dir<T>(value: T): T & GeneratedNode {
    return new Dir(value) as any;
}

export function dirn<T>(name: string, value: T): T & GeneratedNode {
    return new DirName(name, value) as any;
}

export function dynfile(callback: (name: string)=>string): (name: string)=> GeneratedNode {
    return new DynamicFile(callback) as any;
}

export function file(name: string): GeneratedNode {
    return new File(name) as any;
}

export function recursive<T>(excludedNames: string[], callback: (key: string)=>T): ()=>(T&GeneratedNode)[] {
    return new RecursiveDir(excludedNames, callback) as any
}

export function dyndir<T>(callback: (key: string) => T): (key: string)=>(T&GeneratedNode) {
    return new DynamicDir(callback) as any;
}

export type EnumType<T,Type> = {
    [Property in keyof Type]: T
}

export function enumDir<T,S,U extends keyof EnumType<T,S>>(key: S, child: T): (index: U)=>(T&GeneratedNode) {
    return new DynamicDir((key: string)=>dirn(key,child)) as any;
}

export function generateTree<T>(pathIn: string, tree: T, nameIn: string = ''): T {
    const con = tree as any as TreeConstructor;
    switch(con.type) {
        case 'DIR':
        case 'DIR_NAME':
            pathIn = path.join(pathIn,con.type == 'DIR_NAME' ? (con as DirName).dir : nameIn);
            const out = new GeneratedNode(pathIn) as any;
            Object.entries((con as Dir).child).forEach(([k,v])=>{
                out[k] = generateTree(pathIn,v,k);
            });
            out.get = ()=>pathIn;
            return out;
        case 'DYNAMIC_DIR':
            return ((name: string) => generateTree(
                  path.join(pathIn,name)
                , dir((con as DynamicDir).callback(name))
            )) as any
        case 'DYNAMIC_FILE':
            return ((str: string) => (con as DynamicFile).callback(path.join(pathIn,str))) as any
        case 'FILE':
            return new GeneratedNode(path.join(pathIn, (con as File).name)) as any
        case 'DIR_RECURSIVE':
            return (() => {
                const rec = con as RecursiveDir;
                let dirs: any[] = []
                const recurse = (cur: string) => {
                    dirs.push(generateTree(cur,dir(rec.callback(path.basename(cur)))))
                    fs.readdirSync(cur)
                        .filter(x=>!rec.excludedNames.includes(x))
                        .map(x=>path.join(cur,x))
                        .filter(x=>fs.statSync(x).isDirectory()
                            && fs.readdirSync(x).find(y=>rec.excludedNames.includes(y))
                        )
                        .forEach(x=>recurse(x))
                }
                recurse(pathIn);
                return dirs
            })  as any
        case 'CUSTOM':
            // todo: fix this
            return (con as Custom).value
        default:
            throw new Error(`Invalid tree constructor type: ${con.type} in path ${path.join(pathIn,nameIn)}`);
    }
}