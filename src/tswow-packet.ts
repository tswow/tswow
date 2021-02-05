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

export function handlePacketClass(node: ts.ClassDeclaration, writer: CodeWriter) {
    const wsnl = (str: string)=>writer.writeStringNewLine(str);
    
    const message = registerMessage(node);
    if(!message) {
        return;
    }

    wsnl('');
    wsnl('')
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
                wsnl(`r.Write<${field.type}>(${ctr},${field.name});`);
                break
            case 'MsgPrimitiveArray':
                wsnl(`r.WriteArray<${field.innerType}>(${ctr},${field.name},${field.capacity});`);
                break
            case 'MsgString':
                wsnl(`r.WriteString(${ctr},${field.name},${field.indSize});`);
                break
            case 'MsgStringArray':
                wsnl(`r.WriteStringArray(${ctr},${field.name},${field.capacity},${field.indSize});`);
                break
            default:
                console.log('failed vartype is ',field.vartype);
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
                wsnl(`r.ReadClassArray(${ctr},${field.name},${field.capacity},${field.indSize});`);
                break;
            case 'MsgPrimitive':
                wsnl(`${field.name} = r.Read<${field.type}>(${ctr});`);
                break;
            case 'MsgPrimitiveArray':
                wsnl(`r.ReadArray<${field.innerType}>(${ctr},${field.name},${field.capacity});`);
                break;
            case 'MsgString':
                wsnl(`${field.name} = r.ReadString(${ctr},${field.capacity});`);
                break;
            case 'MsgStringArray':
                wsnl(`r.ReadStringArray(${ctr},${field.name},${field.capacity},${field.indSize});`);
                break;
        }
        ctr+=field.size;
    }
    writer.EndBlock();
    wsnl('');
}