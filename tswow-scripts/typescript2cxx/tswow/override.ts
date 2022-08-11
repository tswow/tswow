import { Emitter } from "../emitter";
import { set_tracy_category_color } from "./tracy-categories";
import ts = require("typescript");

function simpleModid(emt,node){
    emt.processExpression(node.expression);
    emt.writer.writeString(`(`);
    node.arguments.forEach((x,i)=>{
        emt.processExpression(x);
        if(i<node.arguments.length-1) {
            emt.writer.writeString(`,`);
        } else {
            emt.writer.writeString(`)`)
        }
    });
}

const TSWOW_OVERRIDE_FUNCTIONS : {[key: string]: (emitter: Emitter, node: ts.CallExpression|ts.NewExpression)=>void} = {
    "GetObject": (emt,node)=>{
        let type = emt.typeChecker.typeToString(
            emt.resolver.getTypeOf(node.arguments[node.arguments.length-1]));
        emt.processExpression(node.expression);
        emt.writer.writeString(`<${type}>(`);
        // key
        emt.processExpression(node.arguments[0]);
        // default value, wrapped in callback so we don't create it every time
        emt.writer.writeString(`,[&](){ return `)
        emt.processExpression(node.arguments[1]);
        emt.writer.writeString(`;})`);
    },

    "HasObject": (emt,node)=>{
        emt.processExpression(node.expression);
        emt.writer.writeString(`(`);
        // key
        emt.processExpression(node.arguments[0]);
        emt.writer.writeString(`)`);
    },

    "GetDBObject": (emt,node)=>{
        let type = emt.typeChecker.typeToString(
            emt.resolver.getTypeOf(node.arguments[node.arguments.length-1]));
        emt.processExpression(node.expression);
        emt.writer.writeString(`<${type}>(`);
        // argument
        emt.processExpression(node.arguments[0]);

        emt.writer.writeString(`,[&]()`);
        emt.writer.BeginBlock();
        emt.writer.writeString(`auto dbobj = LoadRows(`);
        emt.writer.writeString(`${type},`);
        emt.processExpression(node.arguments[1]);
        emt.writer.writeStringNewLine(`);`);
        emt.writer.writeString(`if(dbobj.get_length() == 0) return `);
        emt.processExpression(node.arguments[2]);
        emt.writer.writeStringNewLine(`;`);
        emt.writer.writeStringNewLine(`return dbobj[0];`);
        emt.writer.EndBlock(true);
        emt.writer.writeStringNewLine(`);`);
    },

    "SetObject": (emt,node)=>{
        let type = emt.typeChecker.typeToString(
            emt.resolver.getTypeOf(node.arguments[node.arguments.length-1]));
        emt.processExpression(node.expression);
        emt.writer.writeString(`<${type}>(`);
        // field
        emt.processExpression(node.arguments[0]);
        emt.writer.writeString(`,`);
        // db field
        emt.processExpression(node.arguments[1]);
        emt.writer.writeString(`)`);
    },

    //"AddTimer": simpleModid,
    //"AddNamedTimer": simpleModid,
    //"AddCollision": simpleModid,

    "CreateTSMutable": (emt,node)=>{
        emt.writer.writeString(`TSMutable<${node.typeArguments[0].getText()}>(&`)
        emt.processExpression(node.arguments[0]);
        emt.writer.writeString(')');
    },

    "TSJsonObject": (emt,node)=>{
        emt.writer.writeString(`TSJsonObject()`);
    },

    "TSJsonArray": (emt,node)=>{
        emt.writer.writeString(`TSJsonArray()`);
    },

    "TSMutex": (emt,node)=>{
        emt.writer.writeString(`TSMutex();`);
    },

    "TS_ZONE_CATEGORY": (emt,node)=>{
        const declaration = node.parent as ts.VariableDeclaration;
        set_tracy_category_color(declaration.name.getText(), node.arguments[0].getText());
        emt.writer.writeString(node.arguments[0].getText())
    },
}

export function handleTSWoWOverride(emitter: Emitter, node: ts.CallExpression|ts.NewExpression) {
    let text: string;
    try {
        text = node.getText();
    } catch(err) {
        return;
    }
    if(TSWOW_OVERRIDE_FUNCTIONS[text] !== undefined) {
        TSWOW_OVERRIDE_FUNCTIONS[text](emitter,node);
        return true;
    }

    if(node.getChildCount()>0) {
        let fsChild = node.getChildAt(0);

        if(fsChild.getText() == 'new') {
            fsChild = node.getChildAt(1);
            let text = fsChild.getText();
            if(TSWOW_OVERRIDE_FUNCTIONS[text] !== undefined) {
                TSWOW_OVERRIDE_FUNCTIONS[text](emitter, node);
                return true;
            }
        } else if(fsChild.getChildCount()>0) {
            const lsGrandchild = fsChild.getChildAt(fsChild.getChildCount()-1);
            const text = lsGrandchild.getText();
            if(TSWOW_OVERRIDE_FUNCTIONS[text] !== undefined && text !== 'toString') {
                TSWOW_OVERRIDE_FUNCTIONS[text](emitter, node);
                return true;
            }
        } else {
            const text = fsChild.getText();
            if(TSWOW_OVERRIDE_FUNCTIONS[text] !== undefined) {
                TSWOW_OVERRIDE_FUNCTIONS[text](emitter,node);
                return true;
            }
        }
    }
    return false;
}