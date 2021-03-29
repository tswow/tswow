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
import { CodeWriter } from "./codewriter";
import { registerMessage } from "./tswow-packet-def";
import { GetId, IdPrivate } from "./tswow/Ids";
import * as path from 'path';
import * as fs from 'fs';

class IdPublic extends IdPrivate {
    static writeFile(filename: string) { return super.writeFile(filename); }
    static readFile(filename: string) { return super.readFile(filename); }
}

const files : {[key:string]:string[]} = {}

export function handlePacketClass(node: ts.ClassDeclaration, writer: CodeWriter) {
    const wsnl = (str: string)=>writer.writeStringNewLine(str);
    
    const message = registerMessage(node);
    if(!message) {
        return;
    }

    wsnl('\n');

    IdPublic.readFile('../../ids.txt');
    let modname = path.basename(path.resolve('./'))
    let opcode = GetId('Messages',modname,node.name.text,1);
    writer.writeString(`static uint32_t GetID() { return ${opcode};}`)
    IdPublic.writeFile('../../ids.txt');


    let fn = node.getSourceFile().fileName
    fn = path.relative('./scripts',fn.substring(0,fn.length-2)+'h')

    const cn = node.name.text;
    if(files[fn]===undefined) {
        files[fn] = []
    }
    files[fn].push(`RegisterMessage(ModID(),${opcode},${message.size},[](uint8_t *arr){auto v = std::make_shared<${cn}>();v->Read(arr); return v;});`);

    wsnl('\n')
    writer.writeString(`void Write(uint8_t *arr)`)
    writer.BeginBlock();
    writer.writeStringNewLine(`BinReader<uint8_t> r(arr,${message.size});`);
    let ctr = 0;
    for(const field of message.fields) {
        switch(field.vartype) {
            case 'MsgClass':
                wsnl(`r.WriteClass(${ctr},${field.name});`);
                break
            case 'MsgClassArray':
                wsnl(`r.WriteClassArray(${ctr},${field.name},${field.capacity},${field.indSize});`);
                break
            case 'MsgPrimitive':
                if(field.type==='double') {
                    wsnl(`r.WriteDouble(${ctr},${field.name});`);
                } else {
                    wsnl(`r.Write<${field.type}>(${ctr},${field.name});`);
                }
                break
            case 'MsgPrimitiveArray':
                if(field.innerType==='double') {
                    wsnl(`r.WriteArrayDouble(${ctr},${field.name},${field.capacity});`)
                } else {
                    wsnl(`r.WriteArray<${field.innerType}>(${ctr},${field.name},${field.capacity});`);
                }
                break
            case 'MsgString':
                wsnl(`r.WriteString(${ctr},${field.name},${field.indSize});`);
                break
            case 'MsgStringArray':
                wsnl(`r.WriteStringArray(${ctr},${field.name},${field.capacity},${field.indSize-1});`);
                break
            default:
                throw new Error(`Failed packet vartype: ${field.vartype} with type ${field.type}`);
        }
        ctr+=field.size;
    }
    writer.EndBlock();
    writer.writeStringNewLine(``)
    writer.writeString(`void Read(uint8_t *arr)`);
    writer.BeginBlock();
    wsnl(`BinReader<uint8_t> r(arr,${message.size});`);
    ctr = 0;
    for(const field of message.fields) {
        switch(field.vartype) {
            case 'MsgClass':
                wsnl(`r.ReadClass(${ctr},${field.name});`);
                break;
            case 'MsgClassArray':
                wsnl(`r.ReadClassArray<${field.innerType}>(${ctr},${field.name},${field.capacity},${field.indSize},[]()->std::shared_ptr<${field.innerType}>{return std::make_shared<${field.innerType}>();});`);
                break;
            case 'MsgPrimitive':
                if(field.type==='double') {
                    wsnl(`${field.name} = r.ReadDouble(${ctr});`);
                } else {
                    wsnl(`${field.name} = r.Read<${field.type}>(${ctr});`);
                }
                break;
            case 'MsgPrimitiveArray':
                if(field.innerType==='double') {
                    wsnl(`r.ReadArrayDouble(${ctr},${field.name},${field.capacity});`);
                } else {
                    wsnl(`r.ReadArray<${field.innerType}>(${ctr},${field.name},${field.capacity});`);
                }
                break;
            case 'MsgString':
                wsnl(`${field.name} = r.ReadString(${ctr},${field.indSize});`);
                break;
            case 'MsgStringArray':
                wsnl(`r.ReadStringArray(${ctr},${field.name},${field.capacity},${field.indSize-1});`);
                break;
        }
        ctr+=field.size;
    }
    writer.EndBlock();
    wsnl('');

    writer.writeStringNewLine(`uint16_t opcode() { return ${opcode}; }`)
    writer.writeStringNewLine(`uint8_t GetSize() { return ${message.size}; }`)
}

export function writePacketCreationFile(outDir: string) {
    const writer = new CodeWriter();
    writer.writeStringNewLine(`#pragma once`);
    writer.writeStringNewLine(`#include "ModID.h"`)
    for(let file in files) {
        writer.writeStringNewLine(`#include "${file}"`);
    }

    writer.writeString(`void WritePackets()`)
    writer.BeginBlock();
    for(const file of Object.values(files)) {
        for(const type of file) {
            writer.writeStringNewLine(type);
        }
    }
    writer.EndBlock();

    const tableFile = path.join(outDir,'livescripts','PacketCreator.cpp');
    fs.writeFileSync(tableFile,writer.getText());
}