import fs from "fs";
import path from "path";
import ts from "typescript";
import { finish } from "wotlkdata";
import { mpath, wfs } from "wotlkdata/util/FileSystem";
import { WDirectory, WNode } from "wotlkdata/util/FileTree";
import { datasetName } from "wotlkdata/wotlkdata/Settings";
import { getEventName, getEventNames } from "./InlineEventNames";
import { getTSChildren } from "./InlineTSHelpers";

const files: {
    [module: string]: {
        [filename: string]: string[]
    }
} = {}

function findModulePath(filename: string) {
    while(filename.length > 0 && path.basename(filename) !== 'datascripts') {
        filename = path.dirname(filename);
    }

    if(filename.length === 0) {
        throw new Error(`File ${filename} is not in a datascript directory!`);
    }

    return path.dirname(filename);
}

export function getInlineID(owner: any, id: number, type: string) {
    return getAny(owner,`${id},`,type);
}

export function getInline(owner: any, type: string) {
    return getAny(owner,'',type);
}

export const InlineScript: TSEvents = {} as any
Object.keys(getEventNames()).forEach(cls=>{
    (InlineScript as any)[cls] = getInline(InlineScript,cls)
})

export function getAny(owner: any, prefix: string,type: string) {
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
                throw new Error(
                      `Did not find function body`
                    + `(you **must** pass a direct lambda for this to work)`
                )
            }

            if(func.kind !== ts.SyntaxKind.ArrowFunction) {
                throw new Error
                (
                      `InlineScript syntax kind is not ArrowFunction,`
                    + ` you **must** pass a direct lambda for this to work`
                )
            }

            const fullText = `    events.${type}.${x}(${prefix}${func.getText()})`;

            const relativeFilename = new WNode(filename).relativeToParent('datascripts')
            const modname = findModulePath(filename);
            const modobj = (files[modname]||(files[modname] = {}));
            (modobj[relativeFilename]||(modobj[relativeFilename]=[])).push(fullText);

            // find all GetID declarations
            // temporarily disabled
            /*
            const block = func.getChildAt(func.getChildCount()-1);
            const ids: ts.Node[] = []
            block.forEachChild(c1=>{
                // just best effort
                try {
                    if(c1.kind !== ts.SyntaxKind.FirstStatement) return;
                    const c2 = c1.getChildAt(0);
                    if(c2.kind !== ts.SyntaxKind.VariableDeclarationList) return;
                    const c3a = c2.getChildAt(0)
                    if(c3a.kind !== ts.SyntaxKind.ConstKeyword) return;
                    const c3b = c2.getChildAt(1);
                    if(c3b.kind !== ts.SyntaxKind.SyntaxList) return;
                    const c4 = c3b.getChildAt(0)
                    if(c4.kind !== ts.SyntaxKind.VariableDeclaration) return;
                    const c5a = c4.getChildAt(0)
                    if(c5a.kind !== ts.SyntaxKind.Identifier) return;
                    const c5b = c4.getChildAt(1);
                    if(c5b.kind !== ts.SyntaxKind.FirstAssignment) return;
                    const c5c = c4.getChildAt(2);
                    if(c5c.kind !== ts.SyntaxKind.CallExpression) return;
                    const c6 = c5c.getChildAt(0);
                    if(c6.kind !== ts.SyntaxKind.Identifier) return;
                    if(c6.getText() === 'GetID') {
                        ids.unshift(c1);
                    }
                } catch(err){}
            })
            */
            return owner;
        }
    })
    return map;
}

finish('inline-scripts',()=>{
    Object.entries(files).forEach(([mod,files])=>{
        let inlinePath = new WDirectory(
            mpath(mod,'livescripts','build',datasetName,'inline')
        );

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
            let content =
                    `export function __inline_${file
                            .substr(0,file.length-3)
                            .split('-').join('_')
                            .split('\\').join('_')
                            .split('/').join('_')
                            .split('.').join('_')
                        }(events: TSEvents){\n`
                + `${funcs.join('\n\n')}\n}`
            inlinePath.join(file).toFile().write(content)
        })
    });
})