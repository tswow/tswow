import { GetExistingId, IdPrivate, MatchID } from "../util/ids/Ids";
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

    do {
        m = contents
            .match(/MatchIDs\((.+),(.+),(.+)\)/)
        if(m) {
            let table = m[1].match("\"(.*)\"")[1];
            let modIsRegexp = m[2].startsWith('(new RegExp')
            let idIsRegexp = m[3].startsWith('(new RegExp')
            let mod = m[2].match("\"(.*)\"")[1];
            let id = m[3].match("\"(.*)\"")[1];

            let ids = MatchID(
                  table
                , modIsRegexp? new RegExp(mod) : mod
                , idIsRegexp ? new RegExp(id) : id
            );

            if(ids.length === 0) {
                throw new Error(
                    `table="${table}" mod="${mod}" id="${id}" does not match any ids, did you build datascripts?`
                )
            }
            contents = contents.replace(m[0],`{${ids.join(',')}}`)
        }
    } while(m != null);

    return contents;
}