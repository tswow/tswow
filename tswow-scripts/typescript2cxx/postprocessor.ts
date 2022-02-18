import { GetExistingId, IdPrivate } from "../util/ids/Ids";
import { ipaths } from "../util/Paths";
import { dataset } from "./tswow-dataset";

class IdPublic extends IdPrivate {
    static readFile = () => IdPrivate.readFile(dataset.ids_txt.get());
    static writeFile = () => IdPrivate.writeFile(dataset.ids_txt.get());
}
export function loadIDFile() {
    return IdPublic.readFile();
}

export function postprocess(contents: string): string {
    let m: RegExpMatchArray;
    do {
        m = contents
            .match(
                /GetID\(JSTR\("(.+?)"\), JSTR\("(.+?)"\), JSTR\("(.+?)"\)\)/)
        if(m) {
            const [_,table,mod,name] = m;
            let id = GetExistingId(table,mod,name);
            contents = contents.replace(m[0],`${id}`)
        }
    } while(m != null);
    const parseDataFile = (mod: string, id: string, expectedType: string): {values: any} => {
        let file = ipaths.coredata.datatables.datafile(`${mod}.${id}`).toFile();
        if(!file.exists()) {
            throw new Error(`Data table ${file.get()} does not exist, did you build datascripts?`);
        }
        let table = file.readJson(undefined);
        if(!table || typeof(table) !== 'object' || Array.isArray(table)) {
            throw new Error(`Data table ${file.get()} had a generic json parse error, try rebuilding datascripts.`)
        }

        if(table.type !== expectedType) {
            throw new Error(`Data table ${file.get()} is a ${table.type}, not a ${expectedType}`)
        }

        return table;
    }

    // todo: fix hardcoded shared_ptr handling if we ever make non-shared ptr user classes!
    do {
        m = contents.match(/DataDictionary<(.+), std::shared_ptr<(.+)>>\(JSTR\("(.+)"\), JSTR\("(.+)"\)\)/)
        if(m) {
            let keyType = m[1]
            let valueType = m[2];
            let mod = m[3];
            let id = m[4];
            let datatable = parseDataFile(
                  mod
                , id
                , keyType == 'TSString' ? 'StringMap' : 'NumberMap'
            );
            let tableString = Object
                .entries(datatable.values)
                .map(([key,value])=>`{${keyType==='TSString'?`JSTR("${key}")`:key}, std::make_shared<${valueType}>(${(value as any).join(',')})}`)
                .join(',\n    ')
            contents = contents.replace(m[0],`CreateDictionary<${keyType},std::shared_ptr<${valueType}>>({\n    ${tableString}\n})`)
        }
    } while (m != null);

    do {
        m = contents.match(/DataArray<std::shared_ptr<(.+)>>\(JSTR\("(.+)"\), JSTR\("(.+)"\)\)/);
        if(m) {
            let valueType = m[1];
            let mod = m[2];
            let id = m[3];
            let datatable = parseDataFile(
                  mod
                , id
                , "List"
            ) as any as {values: number[][]}
            let tableString = datatable.values
                .map(x=>`std::make_shared<${valueType}>(${x.join(',')})`)
                .join(',\n    ')
            contents = contents.replace(m[0],`CreateArray<std::shared_ptr<${valueType}>>({\n    ${tableString}\n})`)
        }
    } while(m != null);

    return contents;
}