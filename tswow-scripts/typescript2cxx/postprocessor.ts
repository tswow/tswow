import { GetExistingId, IdPrivate } from "../util/ids/Ids";
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
    return contents;
}