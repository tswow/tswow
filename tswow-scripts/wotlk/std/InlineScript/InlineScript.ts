import fs from "fs";
import path from "path";
import ts from "typescript";
import { finish } from "../../../data/index";
import { datasetName } from "../../../data/Settings";
import { mpath, wfs } from "../../../util/FileSystem";
import { WDirectory, WNode } from "../../../util/FileTree";
import { getEventName, getEventNames } from "./InlineEventNames";
import { getTSChildren } from "./InlineTSHelpers";

const filesLivescript: {
    [module: string]: {
        [filename: string]: string[]
    }
} = {}

const filesLua: {
    [module: string]: {
        [filename: string]: string[]
    }
} = {}

export type InlineType = 'livescript'|'lua'

function findModulePath(filename: string) {
    while(filename.length > 0 && path.basename(filename) !== 'datascripts') {
        filename = path.dirname(filename);
    }

    if(filename.length === 0) {
        throw new Error(`File ${filename} is not in a datascript directory!`);
    }

    return path.dirname(filename);
}

export function getInlineID(owner: any, id: number, type: string, inlineType: InlineType) {
    return getAny(owner,`${id},`,type, inlineType);
}

export function getInline(owner: any, type: string, inlineType: InlineType) {
    return getAny(owner,'',type, inlineType);
}

export const InlineScript: TSEvents = {} as any
Object.keys(getEventNames()).forEach(cls=>{
    (InlineScript as any)[cls] = getInline(InlineScript,cls,'livescript')
})

export function getAny(owner: any, prefix: string,type: string, inlineType: InlineType) {
    const map: any = {}
    getEventName(type).forEach(x=>{
        map[x] = ()=>{
            const ident = (new Error().stack as string)
                .split(' at ')[2]
                .split('(')[1]
                .split(')')[0]
                .trimLeft()
                .trimRight()

            let filename: string;
            // todo: this is terrible but will work unless stacktrace is completely fucked
            if(ident.split('\\').join('/').split('/').pop()?.match(/\.js:\d+:\d+/)) {
                filename = ident?.substring(0,ident.lastIndexOf('.js')+3)
                let relpath = new WNode(filename).relativeToParent('build')
                let pardir = new WNode(filename);
                while(pardir.basename().get() !== 'datascripts'
                    && pardir.dirname().get() !== pardir.get()
                ) {
                    pardir = pardir.dirname()
                }
                filename = pardir.join(relpath).withExtension('.ts').get();
            } else {
                filename = ident?.substring(0,ident.lastIndexOf('.ts')+3)
            }
            const [_,line,col] = ident
                .substring(ident.lastIndexOf('.ts'))
                .split(':')
                .map(x=>parseInt(x)) as [number,number,number]
            if(!wfs.exists(filename) || !wfs.isFile(filename)) {
                throw new Error(`Internal error: ${filename} is not a valid file (from ${ident})`)
            }
            let file = fs.readFileSync(filename,'utf-8')
                .split('\n')
                .slice(line-1)
                .join('\n')
                .substring((col-1))
                .trimLeft()

            // the typescript parser won't read this normally, so we hack it
            let func: ts.Node = undefined as any
            function findLambda(node: ts.Node) {
                getTSChildren(node).find((child,i,arr)=>{
                    if(child.getText() === x && child.pos === 0) {
                        func = arr[i+1];
                        return true;
                    }
                    return findLambda(child);
                });
            }
            ts.createSourceFile('dummy.ts',file,ts.ScriptTarget.Latest,true)
                .forEachChild(findLambda)

            if(func === undefined) {
                throw new Error
                (
                      `Did not find function body, make sure you pass a direct lambda and don't use multiline comments/strings in the file (they cause bugs like this)`
                )
            }

            if(func.kind !== ts.SyntaxKind.ArrowFunction) {
                throw new Error
                (
                      `InlineScript syntax kind is not ArrowFunction,`
                    + ` you **must** pass a direct lambda for this to work`
                )
            }

            const relativeFilename = new WNode(filename).relativeToParent('datascripts')
            const modname = findModulePath(filename);

            switch(inlineType) {
                case 'livescript': {
                    const modobj = (filesLivescript[modname]||(filesLivescript[modname] = {}));
                    const fullText = `    events.${type}.${x}(${prefix}${func.getText()})`;
                    (modobj[relativeFilename]||(modobj[relativeFilename]=[])).push(fullText);
                    break;
                }
            }

            return owner;
        }
    })
    return map;
}

finish('inline-scripts',()=>{
    Object.entries(filesLivescript).forEach(([mod,files])=>{
        let inlinePath = new WDirectory(
            mpath(mod,'livescripts','build',datasetName,'inline')
        );

        let inlineHeader = ``
        let inlineBody = `export function __InlineMain(events: TSEvents) {\n`

        // update deleted scripts
        if(inlinePath.exists()) {
            inlinePath.iterate('RECURSE','FILES','FULL',(node)=>{
                let rel = node.relativeTo(inlinePath)
                if(files[rel.get()] === undefined) {
                    node.remove();
                }
            })
        }
        Object.entries(files).forEach(([file,funcs])=>{
            let funcName = '__inline_' + file
                .substring(0,file.lastIndexOf('.'))
                .split('-').join('_')
                .split('\\').join('_')
                .split('/').join('_')
                .split('.').join('_')
            let content = `export function ${funcName}(events: TSEvents){\n`
                + `${funcs.join('\n\n')}\n}`

            inlinePath.join(file).toFile().write(content)
            inlineHeader += `import { ${funcName} } from "./${file.substring(0,file.lastIndexOf('.')).split('\\').join('/')}"\n`
            inlineBody += `    ${funcName}(events);\n`;
        })
        inlineBody += '}'
        inlinePath.join('__inline_main.ts').toFile().write(inlineHeader+'\n'+inlineBody)
    });
})