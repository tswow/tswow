/*
 * MIT License
 * Copyright (c) 2021 TSWoW
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
function or(a: number, b: number) {
    let p = 1;
    let c = 0;
    while(a+b>0) {
        let ra = a%2;
        let rb = b%2;
        if(ra+rb>0) c+=p;
        a = (a-ra)/2;
        b = (b-rb)/2;
        p = p*2;
    }
    return c;
}

function and(a: number, b: number) {
    let p = 1;
    let c = 0;
    while(a+b>0) {
        let ra = a%2;
        let rb = b%2;
        if(ra+rb>1) c+=p;
        a = (a-ra)/2;
        b = (b-rb)/2;
        p = p*2;
    }
    return c;
}

export class BinReader {
    str: string;

    constructor(size: number|string)  {
        if(typeof(size) == 'string') {
            this.str = size;
        } else {
            this.str = '';
            for(let i=0;i<size;++i) {
                this.str+=String.fromCharCode(1);
            }
        }
    }

    insert(offset: number, str: string) {
        this.str = this.str.substring(0,offset)+str+this.str.substring(offset+str.length,this.str.length);
    }

    WriteU8(offset: number, val: number) { 
        this.insert(offset,String.fromCharCode(val));
    }

    WriteI8(offset: number, val: number) {
        this.insert(offset,String.fromCharCode(val<0?256+val:val));
    }

    WriteU16(offset: number, val: number) {
        let v2 = Math.floor(val/256);
        let v1 = and(val,255);
        this.insert(offset,String.fromCharCode(v1,v2));
    }

    WriteI16(offset: number, val: number) {
        this.WriteU16(offset,val<0?65536+val:val);
    }

    WriteU32(offset: number, val: number) {
        let v4 = Math.floor(and(val,4278190080)/16777216);
        let v3 = Math.floor(and(val,16711680)/65536);
        let v2 = Math.floor(and(val,65280)/256);
        let v1 = and(val,255);
        this.insert(offset,String.fromCharCode(v1,v2,v3,v4));
    }

    WriteI32(offset: number, val: number) {
        this.WriteU32(offset,val<0?4294967296+val:val);
    }

    ReadU8(offset: number) {
        return this.str.charCodeAt(offset);
    }

    ReadI8(offset: number) {
        let val = this.ReadU8(offset)
        return val > 127 ? val-256 : val;
    }

    ReadU16(offset: number) {
        let v2 = this.str.charCodeAt(offset);
        let v1 = this.str.charCodeAt(offset+1);
        let vout = (v1*256);
        vout = or(vout,v2);
        return vout;
    }

    ReadI16(offset: number) {
        let val = this.ReadU16(offset);
        return val > 32767 ? val-65536:val;
    }

    ReadU32(offset: number) {
        let v4 = this.str.charCodeAt(offset);
        let v3 = this.str.charCodeAt(offset+1);
        let v2 = this.str.charCodeAt(offset+2);
        let v1 = this.str.charCodeAt(offset+3);
        let vout = (v1*16777216);
        vout = or(vout,v2*65536);
        vout = or(vout,v3*256);
        vout = or(vout,v4);
        return vout;
    }

    ReadI32(offset: number) {
        let val = this.ReadU32(offset);
        return val > 2147483647 ? val - 4294967296 : val;
    }

    WriteDouble(offset: number, value: number) {
        let disc = Math.floor(value);
        let frac = Math.round((value-disc)*100000);
        this.WriteI32(offset,disc);
        this.WriteI32(offset+4,frac)
    }

    ReadDouble(offset: number) {
        let disc = this.ReadI32(offset);
        let frac = (this.ReadI32(offset+4)/100000);
        return disc+frac;
    }

    WriteArray(offset: number, value: number[],ind_size: number,max: number, func: (offset: number, value: number)=>void) {
        const len = Math.min(value.length,max);
        this.WriteU8(offset,len);
        for(let i=0;i<len;++i) {
            func(offset+1+i*ind_size,value[i]);
        }
    }

    ReadArray(offset: number, value: number[], ind_size: number, max: number, func: (offset: number)=>number) {
        const len = Math.min(this.ReadU8(offset),max);
        for(let i=0;i<len;++i) {
            value[i] = func(offset+1+i*ind_size);
        }
        // @ts-ignore allowed in lua
        value[len] = null;
    }

    WriteString(offset: number, str: string, max: number) {
        let len = Math.min(str.length,max);
        this.WriteU8(offset,len);
        this.insert(offset+1,str.substring(0,len));
    }

    ReadString(offset: number, max: number) {
        let len = Math.min(max,this.ReadU8(offset));
        return this.str.substring(offset+1,offset+len+1);
    }

    WriteStringArray(offset: number, strs: string[], ind_size: number, max: number) {
        let len = Math.min(strs.length,max);
        this.WriteU8(offset,len);
        for(let i=0;i<len;++i) {
            this.WriteString(offset+1+i*(ind_size+1),strs[i],ind_size);
        }
    }

    ReadStringArray(offset: number, strs: string[], ind_size: number, max: number) {
        let len = Math.min(max,this.ReadU8(offset));
        for(let i=0;i<len;++i) {
            strs[i] = this.ReadString(offset+1+i*(ind_size+1),ind_size);
        }
        // @ts-ignore allowed in lua
        strs[len] = null;
    }

    ReadClass(offset: number, fun: ()=>any) {
        let g = fun();
        g.Read(this,offset);
        return g;
    }
    
    WriteClass(offset: number, cls: any) {
        cls.Write(this,offset);
    }

    ReadClassArray(offset: number, cls: any[], ind_size: number, max: number, fun: ()=>any) {
        let len = Math.min(this.ReadU8(offset),max);
        for(let i=0;i<len;++i) {
            cls[i] = this.ReadClass(offset+1+i*ind_size,fun);
        }
        cls[len] = null;
    }

    WriteClassArray(offset: number, cls: any[], ind_size: number, max: number) {
        let len = Math.min(cls.length,max);
        this.WriteU8(offset,len);
        for(let i=0;i<len;++i) {
            this.WriteClass(offset+1+i*ind_size,cls[i]);
        }
    }
}