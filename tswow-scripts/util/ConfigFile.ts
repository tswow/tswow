import * as fs from 'fs';
import { wfs } from './FileSystem';
import { FilePath } from './FileTree';

const PROPERTY_FIELD = '__properties'
const PROPERTIES_ORDER = '__properties_order'
const SECTIONS_MAPPINGS = '__sections_mappings'

type ConfigParse = {[key: string]: any};
export function parseConf(str: string) {
    type state = 'INIT'|'KEY'|'EQ'|'VALUE'|'STRING'|'LIST'|'ESCAPE'|'COMMENT';

    let stateStack : state[] = []
    let curState : state;
    curState  = 'INIT'

    interface ConfParseValue {
        key: string
        value: string
        line: number
    }

    let curLine = 1;

    let configFilePrelim : {[key: string]: ConfParseValue[]} = {}
    let curEntry: ConfParseValue = {
        key: '',
        value: '',
        line: 0
    };
    for(let i=0;i<str.length;++i) {
        let c = str[i];
        if(c === '\n') curLine++;
        if(c === '#' && curState!=='STRING' && curState !== 'COMMENT') {
            stateStack.push(curState);
            curState = 'COMMENT'
            continue;
        }

        switch(curState) {
            case 'COMMENT':
                if(c === '\n') {
                    curState = stateStack.pop() as state;
                    i--
                }
                break;
            case 'INIT':
                if(!c.match(/[\t\n\r ]/)) {
                    curState = 'KEY'
                    curEntry.line = curLine;
                    i--
                }
                break;
            case 'KEY':
                if(c === '=') {
                    curState = 'VALUE'
                    break;
                }
                if(c.match(/[\t\n\r ]/)) {
                    curState = 'EQ'
                    break;
                }
                curEntry.key+=c;
                break;
            case 'EQ':
                if(c === '=') {
                    curState = 'VALUE'
                }
                break;
            case 'VALUE':
                if(curEntry.value.split(' ').join('').split('\t').join('').length > 0 && (c.match(/[\n\r]/)||i===str.length-1)) {
                    curEntry.key = curEntry.key.trimLeft().trimRight()
                    curEntry.value = curEntry.value.trimLeft().trimRight()
                    if(configFilePrelim[curEntry.key] === undefined) {
                        configFilePrelim[curEntry.key] = []
                    }
                    configFilePrelim[curEntry.key].push(curEntry)
                    curState = 'INIT'
                    curEntry = {key:'',value:'',line:-1}
                    break;
                }

                if(c !== ' ' && c !== '\t' && c !== '\n' && c !== '\r') {
                    curEntry.value+=c
                }
                if(c === '"') {
                    stateStack.push(curState);
                    curState = 'STRING'
                }
                if(c === '[') {
                    stateStack.push(curState);
                    curState = 'LIST'
                }
                break;
            case 'STRING':
                if(c === '\\') curState = 'ESCAPE'
                if(c === '"') {
                    curState = stateStack.pop() as state;
                }
                curEntry.value+=c;
                break;
            case 'ESCAPE':
                curState = 'STRING'
                curEntry.value+=c
                break;
            case 'LIST':
                curEntry.value+=c
                if(c === '"') {
                    stateStack.push('LIST')
                    curState = 'STRING'
                }
                if(c === ']') {
                    curState = stateStack.pop() as any
                }
                break;
        }
    }

    if(curState === 'COMMENT') {
        curState = stateStack.pop() as state;
    }

    if(curState !== 'INIT') {
        throw new Error(`Unexpected end of file: ${curState} ${stateStack}`);
    }

    let duplicates = Object.entries(configFilePrelim)
        .filter(([key,value])=>value.length > 1);
    if(duplicates.length > 0) {
        throw new Error(
              `Duplicate keys in .conf file:\n`
            + duplicates
                .map(([key,values])=>`${key} at lines ${values.map(x=>x.line).join(',')}`)
                .join('\n')
        )
    }

    let configFile: ConfigParse = {}
    Object.entries(configFilePrelim).forEach(([key,value])=>{
        try {
            // hack, but eval is okay. we already load js files directly
            // from the same places
            configFile[key] = eval(value[0].value);
        } catch(err) {
            configFile[key] = value[0].value;
        }
    })

    return configFile
}

export function Section(name: string) {
    return function(obj: any, propname: any) {
        const con = obj.constructor
        let order = ((con[PROPERTIES_ORDER])||(con[PROPERTIES_ORDER] = []));
        if(!order.includes(propname)) {
            order.push(propname);
        }
        ((con[SECTIONS_MAPPINGS])||(con[SECTIONS_MAPPINGS] = {}))[propname] = name
    }
}

interface Property {
    fieldName: string
    fileName: string
    description: string
    note: string
    section: string
    orderIndex: number
    important?: string
    examples: [any,string][]
}

export function Property(
    props: {
          name: string
        , note?: string
        , important?: string
        , description: string
        , examples: [any,string][]
    }
) {
    return function(obj: any, field: any) {
        const con = obj.constructor
        let order = ((con[PROPERTIES_ORDER])||(con[PROPERTIES_ORDER] = []));
        if(!order.includes(field)) {
            order.push(field);
        }
        (con[PROPERTY_FIELD]||(con[PROPERTY_FIELD] = {}))[field] = {
              fieldName: field
            , fileName: props.name
            , important: props.important
            , description: props.description
            , note: props.note
            , examples: props.examples
        }
    }
}

export abstract class ConfigFile {
    protected abstract description(): string;

    protected getArrayAll(arr: string[], allValues: string[]): string[] {
        if(arr.includes('all')) {
            arr = arr.concat(allValues);
        }
        arr = arr.filter(x=> x != 'all'
            && !x.startsWith('!')
            && !arr.includes('!'+x)
        );
        return arr;
    }

    private properties() {
        return (this.constructor as any)[PROPERTY_FIELD] as {[key: string]: Property}
    }

    readonly filename: string;

    undefined() {
        return undefined as any;
    }

    private findProperty(field: string) {
        let prop = this.properties()[field];
        let def = prop.examples[0][0]
        if(!fs.existsSync(this.filename)) {
            this.generateIfNotExists();
        }
        let str = fs.readFileSync(this.filename,'utf-8');
        let value = parseConf(str)[prop.fileName];

        if(value === undefined) {
            if(!str.includes('# Added Configs')) {
                str+=`\n\n${'#'.repeat(80)}\n# Added Configs - New configurations automatically added`;
            }
            str = this.generateValue(str+'\n',prop);
            str = str.substr(0,str.length-1)
            wfs.write(this.filename,str);
        }
        return value === undefined || typeof(value) !== typeof(def) ? def : value
    }

    private generateValue(str: string, value: Property) {
        str+= `#\n`
        str+= `#    ${value.fileName}\n`
        let maxLen = value.examples.reduce((p,[k])=>Math.max(p,`${k}`.length),0)
        str+= `#        Description:${' '.repeat(maxLen)}${value.description}\n`
        if(value.important) {
            str+= `#        Important:  ${' '.repeat(maxLen)}${value.important}\n`
        }

        str+=`#        Default: ${value.examples[0][0]} ${' '.repeat(maxLen-`${value.examples[0][0]}`.length)}- ${value.examples[0][1]}\n`
        for(let i=1;i<value.examples.length;++i) {
            str+=`#                 ${value.examples[i][0]} ${' '.repeat(maxLen-`${value.examples[i][0]}`.length)}- ${value.examples[i][1]}\n`
        }
        if(value.note) {

            str+= `#\n#        Note:       ${' '.repeat(maxLen)}${value.note}\n`
        }
        str+=`# \n\n`;
        str+=`${value.fileName} = ${JSON.stringify(value.examples[0][0])}\n`
        str+=`\n`
        return str;
    }

    generateIfNotExists() {
        if(wfs.exists(this.filename)) return;
        let desc = this.description();
        let str = '#'.repeat(desc.length+4)+'\n'
        str+= `# ${desc} #\n`
        str+= '#'.repeat(desc.length+4)+'\n\n'

        let lastSection: string|undefined = undefined;
        Object
            .entries(this.properties())
            .sort(([_,a],[__,b])=>a.orderIndex > b.orderIndex ? 1 : -1)
            .forEach(([x,y],i,arr)=>{
                if(y.section !== lastSection) {
                    lastSection = y.section;
                    str+=`${'#'.repeat(80)}\n`
                    str+=`# ${y.section}\n`
                }
                str = this.generateValue(str, y);
                if(i===arr.length-1 || arr[i+1][1].section !== lastSection) {
                    str+=`#\n`;
                    str+='#'.repeat(80)
                }
            })
        wfs.write(this.filename,str);
        return this;
    }

    constructor(filename: string) {
        this.filename = filename;
        let props = (this.constructor as any)[PROPERTY_FIELD] as {[key: string]: Property}
        let mappings = (this.constructor as any)[SECTIONS_MAPPINGS] as {[key: string]: string}
        if(mappings === undefined) {
            throw new Error(`Config ${this.constructor.name} has no sections defined`)
        }
        let order = (this.constructor as any)[PROPERTIES_ORDER] as string[]
        let curSection: string|undefined = undefined;
        order.forEach((x,i)=>{
            let property = props[x];
            let mapping = mappings[x];

            if(mapping) {
                curSection = mapping;
            }

            if(curSection === undefined) {
                throw new Error(`Config field ${this.constructor.name}:${property.fieldName} is not inside any section`)
            }

            if(!property) return; // if we put SECTION on a non-property
            Object.defineProperty(this,property.fieldName,{
                get: ()=>this.findProperty(property.fieldName),
                set: ()=>{}
            })
            if(curSection === undefined) {
                throw new Error(`Property ${x} is not in a section`)
            }
            property.orderIndex = i
            property.section = curSection
        })
    }
}

export function patchTCConfig(file: FilePath, property: string, value: any) {
    const v = wfs.read(file)
    let start = v.indexOf(`\n${property}`);
    let end = v.indexOf('\n',start+1);
    if(start < 0) {
        throw new Error(`Tried patching TC config with non-existing key: ${property}`)
    }
    wfs.write(
          file
        , `${v.substring(0,start)}\n${property} = ${JSON.stringify(value)}${end >= 0 ? v.substring(end) : ''}`
    )
}