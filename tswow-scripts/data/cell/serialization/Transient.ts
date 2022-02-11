class TransientTag {
    field: string;
    conditions: {key:string,value:any}[];

    constructor(field: string, conditions: {key:string,value:any}[]) {
        this.field = field;
        this.conditions = conditions;
    }
}

function transient(target: any, field: any, conditions: {key:string,value:any}[]) {
    let con = target.constructor;
    let name = target.constructor.name;
    if(con.transient === undefined) {
        con.transient = {}
    }
    if(con.transient[name] === undefined) {
        con.transient[name] = []
    }
    con.transient[name].push(new TransientTag(field,conditions));
}

export function Transient(target: any, field: any) {
    transient(target,field,[]);
}

export function TransientOn(key: string, value: any) {
    return function(target: any, field: any) {
        transient(target,field,[{key,value}])
    }
}

export function getTransient(obj: any) {
    let curConstructor = obj.constructor;
    let allTransient: string[] = []
    while(true) {
        if(curConstructor === undefined) break;
        let name = curConstructor.name;
        if(name===undefined||name.length===0) break;
        let trans = curConstructor.transient;
        if(!trans) break;
        let values: TransientTag[] = trans[curConstructor.name];
        if(values !== undefined) {
            values = values.filter((x)=>{
                return x.conditions.length === 0 || x.conditions.filter(y=>{
                    if(obj[y.key] === y.value || (obj[y.key].get && obj[y.key].get() === y.value)) {
                        return true;
                    } else {
                        return false;
                    }
                }).length==x.conditions.length;
            });

            allTransient = allTransient.concat(values.map(x=>x.field));
        }

        let nxConstructor = Object.getPrototypeOf(curConstructor);
        if(nxConstructor===curConstructor) break;
        curConstructor = nxConstructor;
    }
    return allTransient;
}