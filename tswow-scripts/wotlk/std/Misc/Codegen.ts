export type CodegenSettings = {indention?: number, space_per_indent?: number, indent_last_block_line?: boolean, include_registry?: boolean};

interface Codifiable
{
    codify(settings: any): string
}

export function GenerateCode(settings: CodegenSettings, regLine: string, callback: (gen: Codegen)=>void)
{
    let gen = new Codegen(settings);
    if(gen.include_registry())
    {
        gen.line(`// Note:`);
        gen.line(`// Codegen is an experimental feature.`)
        gen.line(`// Generated entities may not perfectly match the original entity.`) 
        gen.line(`// Please report issues to our tracker: https://github.com/tswow/tswow/issues`)
        gen.begin_block(regLine);
    }
    callback(gen);
    if(gen.include_registry())
    {
        gen.end_block('')
    }
    return gen.get();
}

export class Codegen
{
    constructor(settings: CodegenSettings)
    {
        this.indention = settings.indention || 0;
        this.spacePerIndention = settings.space_per_indent || 4;
        this.indentLastBlockLine = settings.indent_last_block_line === undefined ? false : settings.indent_last_block_line;
        this.includeRegistry = settings.include_registry === undefined ? true : settings.include_registry;
    }

    raw_objectify(obj: any)
    {
        let objectified = obj.objectify();
        for(let key in objectified)
        {
            let value = objectified[key];
            this.line(`.${key}.set(${JSON.stringify(value)})`)
        }
    }

    raw_objectify_non_zero(obj: any)
    {
        let objectified = obj.objectify();
        for(let key in objectified)
        {
            let value = objectified[key];
            if(value !== 0)
            {
                this.line(`.${key}.set(${JSON.stringify(value)})`)
            }
        }
    }

    non_zero_bitmask(key: string, value: any)
    {
        if(value.get())
        {
            this.bitmask(key,value);
        }
    }

    non_zero_enum(key: string, value: any)
    {
        if(value.get())
        {
            this.enum_line(key,value);
        }
    }

    num(key: string, value: any)
    {
        if(typeof(value.get()) === 'bigint')
        {
            this.line(`.${key}.set(BigInt(${value.get()}))`)
        }
        else
        {
            this.line(`.${key}.set(${value.get()})`)
        }
    }

    non_def_num(key: string, value: any, def = 0)
    {
        if(value.get() != def)
        {
            this.num(key,value);
        }
    }

    enum_line(propertyName: string, obj: any)
    {
        let objectifyVal = obj.objectify();
        let tryInt = parseInt(objectifyVal);
        if(!isNaN(tryInt))
        {
            this.line(`.${propertyName}.set(${tryInt})`)
        }
        else
        {
            this.line(`.${propertyName}.${objectifyVal}.set()`)
        }
    }

    line(text: string)
    {
        this.str += this.nextIndent;
        this.str += text;
        this.nextIndent = "\n" + ' '.repeat(this.indention * this.spacePerIndention);
    }

    write(text: string)
    {
        this.str += this.nextIndent;
        this.str += text;
        this.nextIndent = "";
    }

    begin_block(text: string)
    {
        this.str += this.nextIndent;
        this.str += text;
        this.indention++;
        this.nextIndent = "\n" + ' '.repeat(this.indention * this.spacePerIndention);
    }

    bitmask(attribName: string, obj: any)
    {
        let value = obj.objectify();
        if(!value)
        {
            this.line(`.${attribName}.set([])`)
            return;
        }

        if(!Array.isArray(value))
        {
            throw new Error(`Codegen: Expected output of objectify to be an array!`)
        }
        this.write(`.${attribName}.set([`)
        for(let i = 0; i < value.length; ++i)
        {
            let entry = value[i];
            if(typeof(entry) === 'number')
            {
                this.write(`0x${(entry).toString(16)}`)
            }
            else if(typeof(entry) === 'string')
            {
                if(entry.startsWith('Bit'))
                {
                    let intVal = parseInt(entry.substring(3));
                    if(isNaN(intVal))
                    {
                        throw new Error(`Codegen: Failed to parse bit value from ${entry}`)
                    }
                    this.write(`0x${(1 << intVal).toString(16)}`)
                }
                else
                {
                    this.write(`'${entry}'`)
                }
            }
            else
            {
                throw new Error(`Codegen: Unexpected bitmask entry type: ${typeof(entry)}`)
            }
            if(i < value.length-1)
            {
                this.write(',')
            }
        }
        this.line(`])`)
    }

    lowercase(name: string, cell: any)
    {
        let obj = cell.objectify();
        let keys = Object.keys(obj);
        keys.forEach(x=>{
            let lower = x.toLowerCase();
            if(x == lower)
            {
                return;
            }
            obj[lower] = obj[x];
            delete obj[x];
        })
        this.line(`.${name}.set(${JSON.stringify(obj)})`)
    }

    loc(key: string, loc: any)
    {
        let value = loc.objectify ? loc.objectify() : loc;
        delete value.mask;
        this.line(`.${key}.set(${JSON.stringify(value)})`)
    }

    end_block(text: string)
    {
        if(this.indentLastBlockLine)
        {
            this.str += this.nextIndent;
        }
        else
        {
            this.str += "\n" + ' '.repeat((this.indention-1) * (this.spacePerIndention));
        }
        this.str += text;
        this.indention--;
        this.nextIndent = "\n" + ' '.repeat(this.indention * this.spacePerIndention);
    }

    get(): string
    {
        return this.str;
    }

    include_registry()
    {
        return this.includeRegistry;
    }

    substruct(sub: Codifiable, settings: any)
    {
        this.line(sub.codify(Object.assign({},settings,{indention:this.indention,include_registry:false})))
    }
    private indention: number = 0;
    private str: string = "";
    private nextIndent: string = "";
    private spacePerIndention: number;
    private indentLastBlockLine: boolean;
    private includeRegistry: boolean;
}