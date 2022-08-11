import { IdPrivate } from "../util/ids/Ids";
import { ApplyTagMacros } from '../util/TagMacros';
import { dataset } from "./tswow/dataset";
import { get_tracy_category_color } from './tswow/tracy-categories';

class IdPublic extends IdPrivate {
    static readFile = () => IdPrivate.readFile(dataset.ids_txt.get());
    static writeFile = () => IdPrivate.writeFile(dataset.ids_txt.get());
}
export function loadIDFile() {
    return IdPublic.readFile();
}

// https://www.delftstack.com/howto/javascript/wildcard-string-comparison-in-javascript/
function match(first, second)
{
    if (first.length == 0 && second.length == 0)
        return true;

    if (first.length > 1 && first[0] == '*' &&
        second.length == 0)
        return false;

    if ((first.length > 1 && first[0] == '?') ||
        (first.length != 0 && second.length != 0 &&
        first[0] == second[0]))
        return match(first.substring(1),
                    second.substring(1));

    if (first.length > 0 && first[0] == '*')
        return match(first.substring(1), second) ||
            match(first, second.substring(1));

    return false;
}

export function postprocess(contents: string): string {
    // ======================================
    //  Tracy
    // ======================================
    const USE_TRACY = process.argv.find(x=>x.startsWith('tracy'))
    {
        const TRACY_OPT_PREFIX = 'tracy='
        let categories =
            (process.argv.find(x=>x.startsWith(TRACY_OPT_PREFIX)) || `${TRACY_OPT_PREFIX}*`)
            .substring(TRACY_OPT_PREFIX.length)
            .split(',')

        while(true) {
            let m = contents.match(/TS_ZONE_SCOPED *\( *(.+?) *\)/)
            if(!m) break;

            if(USE_TRACY && categories.find(x=>match(x,m[1]))) {
                contents = contents.replace(m[0],`ZoneScopedC(${get_tracy_category_color(m[1])})`);
            } else {
                contents = contents.replace(m[0],'')
            }
        }

        [
            /TS_ZONE_SCOPED_N *\( *(.+?) *, *\( *"(.+?)" *\) *\)/,
            /TS_ZONE_SCOPED_N *\( *(.+?) *, *"(.+?)" *\)/,
            /TS_ZONE_SCOPED_N *\( *(.+?) *, *'(.+?)' *\)/,
        ].forEach(regex=>{
            while(true) {
                let m = contents.match(regex)
                if(!m) break;
                if(USE_TRACY && categories.find(x=>match(x,m[1]))) {
                    contents = contents.replace(m[0], `ZoneScopedNC("${m[2]}", ${get_tracy_category_color(m[1])})`)
                } else {
                    contents = contents.replace(m[0],'')
                }
            }
        })
    }

    // ======================================
    //  ID Tags
    // ======================================
    contents = ApplyTagMacros(contents, process.argv.find(x=>x.startsWith('--datasetName=')).substring('--datasetName='.length), 'LIVESCRIPT')
    return contents;
}