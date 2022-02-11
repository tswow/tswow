import fs from "fs";
import ts from "typescript";
import { ipaths } from "../../../util/Paths";
import { getTSChild, getTSChildren } from "./InlineTSHelpers";

const eventNames: {[key: string] /*functions*/: string[]} = {}

let hiddens = fs.readFileSync(
        ipaths.bin.include.global_d_ts.abs().get()
    , 'utf-8'
);
hiddens = hiddens.substring(hiddens.indexOf('@hidden-begin'));
hiddens = hiddens.substring(hiddens.indexOf('\n'))
hiddens = hiddens.substring(0,hiddens.indexOf('@hidden-end'))
const script = ts.createSourceFile('dummy.ts',hiddens,ts.ScriptTarget.Latest,false,ts.ScriptKind.TS)

const modDecl = getTSChild(script,0,ts.SyntaxKind.ModuleDeclaration);
const body = getTSChild(modDecl,2,ts.SyntaxKind.ModuleBlock)
body.forEachChild(cls=>{
    if(cls.kind !== ts.SyntaxKind.ClassDeclaration) return;
    const className = (getTSChild(cls,1,ts.SyntaxKind.Identifier) as ts.Identifier).text
    const methods: string[] = eventNames[className] = []
    getTSChildren(cls).slice(2)
        .filter(x=>x.kind === ts.SyntaxKind.MethodDeclaration)
        .forEach(x=>{
            let text = ((x as ts.MethodDeclaration).name as ts.Identifier).text
            methods.push(text);
        })
})

export function getEventNames() { return eventNames; }

export function getEventName(name: string) { return eventNames[name]; }