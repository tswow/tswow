/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
 * 
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
import ts = require("typescript");

const PrimitiveSizes = {
    'uint8': 1,
    'uint16': 2,
    'uint32': 4,
    'uint64': 8,
    'int8': 1,
    'int16': 2,
    'int32': 4,
    'int64': 8,
    'float': 4,
    'double': 8,
    'int': 4
}

export type VarType = 'MsgPrimitive' | 'MsgPrimitiveArray' | 'MsgString' | 'MsgStringArray' | 'MsgClass' | 'MsgClassArray'

export class MessageField {
    vartype: VarType|undefined = undefined;
    name: string = "";
    type: string = "";
    padding: number = 0;
    capacity: number = 1;
    indSize: number = 0;
    get size() { return this.padding + this.indSize * this.capacity }
    get innerType() { return this.type.split('<')[1].split('>')[0]; }
}

export class MessageData {
    fields: MessageField[] = [];
    get size() { return this.fields.reduce((p,x)=>x.size+p,0)}
}

export const messages : {[key:string]:MessageData} = {}

export function registerMessage(node: ts.ClassDeclaration) {
    if(!node.decorators) {
        return;
    }

    let isMessage = false;
    node.decorators.forEach(x=>{
        const ft = x.getText(x.getSourceFile());
        if(ft=='@Message') {
            isMessage = true;
        }
    });

    if(!isMessage) {
        return;
    }

    const message = new MessageData();

    node.members.forEach((memberRaw)=>{
        if(memberRaw.kind!==ts.SyntaxKind.PropertyDeclaration) {
            return;
        }

        const member = memberRaw as ts.PropertyDeclaration;

        if(!member.decorators) return;

        const field = new MessageField();
        field.type = member.type.getText(member.getSourceFile());
        field.name = member.name.getText(member.getSourceFile());

        member.decorators.forEach((x)=>{
            let decoText = x.getText(x.getSourceFile()) as VarType;
            if(decoText.startsWith('@MsgPrimitiveArray')) {
                field.vartype = 'MsgPrimitiveArray';
                field.indSize = PrimitiveSizes[field.innerType];
                field.capacity = parseInt(decoText.split('(')[1].split(')')[0]);
                field.padding = 1;
            }
            else if(decoText.startsWith('@MsgPrimitive')) {
                field.vartype = 'MsgPrimitive';
                field.indSize = PrimitiveSizes[field.type];
            }
            else if(decoText.startsWith('@MsgStringArray')) {
                field.vartype = 'MsgStringArray';
                field.capacity = parseInt(decoText.split('(')[1].split(',')[0]);
                field.indSize = 1+parseInt(decoText.split('(')[1].split(',')[1].split(')')[0]);
                field.padding = 1;
            }
            else if(decoText.startsWith('@MsgString')) {
                field.vartype = 'MsgString';
                field.indSize = parseInt(decoText.split('(')[1].split(')')[0]);
                field.padding = 1;
            }
            else if(decoText.startsWith('@MsgClassArray')) {
                field.vartype = 'MsgClassArray';
                field.capacity = parseInt(decoText.split('(')[1].split(')')[0]);
                field.indSize = messages[field.innerType].size;
                field.padding = 1
            }
            else if(decoText.startsWith('@MsgClass')) {
                field.vartype = 'MsgClass';
                field.indSize = messages[field.type].size;
            }
        });

        message.fields.push(field);
    });

    const className = node.name.getText(node.getSourceFile());
    messages[className] = message;

    if(message.size>180) {
        throw new Error(`Message ${className} is ${message.size} bytes long (maximum is 180)`)
    }
    
    return message;
}