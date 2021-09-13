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
import ts from "typescript";
import { Plugin } from "typescript-to-lua";
import { GetId, IdPrivate } from "../wotlkdata/ids/Ids";
import { registerMessage } from "./tswow-data-def";
import * as path from 'path';
import * as fs from 'fs'

/**
 *  This file contains a plugin for typescript-to-lua
 *  to generate messages
 */

function getList() {
    if(!fs.existsSync('./classes.json')) {
        return {}
    }
    return JSON.parse(fs.readFileSync('./classes.json').toString());
}

function saveList(list: any) {
    fs.writeFileSync('./classes.json',JSON.stringify(list));
}

function primName(type: string) {
    if(type==='double') {
        return 'Double';
    }

    if(type==='float') {
        throw new Error(`Floats are unsupported as message fields.`);
    }

    let fst = type.charAt(0).toUpperCase();
    let lst = type.charAt(type.length-1);
    if(lst=='8') return fst+lst;
    return fst+type.charAt(type.length-2)+lst;
}

function primWriteName(type: string) {
    return `Write${primName(type)}`;
}

function primReadName(type: string) {
    return `Read${primName(type)}`;
}

class IdPublic extends IdPrivate {
    static writeFile(filename: string) { return super.writeFile(filename); }
    static readFile(filename: string) { return super.readFile(filename); }
}

function handle(node: ts.ClassDeclaration) {
    const messages = registerMessage(node);
    if(!messages) {
        return;
    }

    let str = `\n`;
    const w = (s: string) => str+=s;
    const wnl = (s: string) => str+=s+'\n';

    let modname = path.basename(path.resolve(`../`))

    IdPublic.readFile('../../../ids.txt');
    // @ts-ignore
    const opcode = GetId('Messages',modname,messages.className,1);
    IdPublic.writeFile('../../../ids.txt');

    wnl(`function ${messages.className}.GetID() return ${opcode} end`)
    wnl(`function ${messages.className}.prototype.GetID() return ${opcode} end`)
    wnl(`function ${messages.className}.prototype.GetSize() return ${messages.size} end`)

    wnl(`function ${messages.className}.prototype.Read(self,r,o)`);
    let ctr = 0;
    for(const field of messages.fields) {
        switch(field.vartype) {
            case 'MsgPrimitive':
                wnl(`    self.${field.name} = r:${primReadName(field.type)}(o+${ctr});`);
                break;
            case 'MsgPrimitiveArray':
                w(`    r:ReadArray(o+${ctr},`)
                w(`self.${field.name},${field.indSize},${field.capacity},`)
                wnl(`function(oo) return r:${primReadName(field.innerType)}(oo) end);`)
                break;
            case 'MsgClass':
                w(`    self.${field.name} = r:ReadClass(`);
                wnl(`o+${ctr},function() return __TS__New(${field.type}) end);`)
                break;
            case 'MsgClassArray':
                w(`    r:ReadClassArray(`)
                w(`o+${ctr},self.${field.name},${field.indSize},${field.capacity},`)
                wnl(`function() return __TS__New(${field.innerType}) end);`)
                break;
            case 'MsgString':
                w(`    self.${field.name} = `)
                wnl(`r:ReadString(o+${ctr},${field.indSize});`)
                break;
            case 'MsgStringArray':
                w(`    r:ReadStringArray(`)
                wnl(`o+${ctr},self.${field.name},${field.indSize-1},${field.capacity});`)
                break;
        }
        ctr+=field.size;
    }
    wnl('end\n');

    ctr = 0;
    wnl(`function ${messages.className}.prototype.Write(self,r,o)`)
    for(const field of messages.fields) {
        switch(field.vartype) {
            case 'MsgPrimitive':
                w(`    r:${primWriteName(field.type)}`)
                wnl(`(${ctr}+o,self.${field.name});`);
                break;
            case 'MsgPrimitiveArray':
                w(`    r:WriteArray(`)
                w(`${ctr}+o,self.${field.name},${field.indSize},${field.capacity},`)
                wnl(`function(oo,v) return r:${primWriteName(field.innerType)}(oo,v) end);`)
                break;
            case 'MsgString':
                w(`    r:WriteString(`)
                wnl(`${ctr}+o,self.${field.name},${field.indSize});`);
                break;
            case 'MsgStringArray':
                w(`    r:WriteStringArray(`)
                wnl(`${ctr}+o,self.${field.name},${field.indSize-1},${field.capacity});`)
                break;
            case 'MsgClass':
                w(`    r:WriteClass(`)
                wnl(`${ctr}+o,self.${field.name});`)
                break;
            case 'MsgClassArray':
                w(`    r:WriteClassArray(`)
                wnl(`${ctr}+o,self.${field.name},${field.indSize},${field.capacity});`)
                break;
        }
        ctr+=field.size;
    }
    wnl('end\n')

    wnl(`require('Events').addConstructor(${messages.className});`);

    let fn = node.getSourceFile().fileName
    let lst = getList();
    if(lst[fn]===undefined) {
        lst[fn] = {};
    }
    lst[fn][messages.className] = str;
    saveList(lst);
}

export const MessagePlugin: Plugin = {
    visitors: {
        // @ts-ignore
        [ts.SyntaxKind.ClassDeclaration]: (node, context) => {
            handle(node);
            return context.superTransformNode(node);
        }
    }
}