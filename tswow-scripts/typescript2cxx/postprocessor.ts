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

    while(true) {
        let m = contents.match(/GetIDTag\(JSTR\("(.+?)"\), JSTR\("(.+?)"\)\)/)
        if(!m) break;

        let mod = m[1];
        let id = m[2];
        let fullName = `${mod}.${id}`
        let file = ipaths.coredata.tags.tagfile(fullName)
        if(!file.exists()) {
            throw new Error(`No ids are tagged ${fullName}, did you run datascripts?`)
        }
        let values = file.readJson(undefined);
        if(!values) {
            throw new Error(`Corrupt json for tag ${fullName}, try rebuilding datascripts`)
        }
        contents = contents.replace(m[0],`TSArray<uint32>({${values.join(',')}})`);
    }

    return contents;
}