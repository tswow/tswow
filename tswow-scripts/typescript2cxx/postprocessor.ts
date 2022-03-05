import * as mysql from 'mysql2';
import { NodeConfig } from "../runtime/NodeConfig";
import { GetExistingId, IdPrivate } from "../util/ids/Ids";
import { ipaths } from "../util/Paths";
import { dataset } from "./tswow-dataset";
import deasync = require('deasync');

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

    while(true) {
        let m = contents.match(/GetIDTagUnique\(JSTR\("(.+?)"\), JSTR\("(.+?)"\)\)/)
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

        if(values.length == 0) {
            throw new Error(`ID tag ${mod}:${id} has 0 values`);
        }

        if(values.length > 1) {
            throw new Error(`ID tag ${mod}:${id} is not unique (shared by ${values.length} ids)`);
        }

        contents = contents.replace(m[0],`${values[0]}`);
    }

    let checks: {table: string, cols: string}[] = []
    while(true) {
        let m = contents.match(/ASSERT_WORLD_TABLE\(JSTR\("(.+?)"\), JSTR\("(.+?)"\)\);/)
        if(!m) m = contents.match(/ASSERT_WORLD_TABLE\(JSTR\("(.+?)"\)\);/)
        if(!m) break;
        contents = contents.replace(m[0],'')
        checks.push({table:m[1],cols:m[2]||""})
    }

    if(checks.length > 0) {
        const datasetName = process.argv.find(x=>x.startsWith('--datasetName=')).substring('--datasetName='.length)
        let settings = NodeConfig.DatabaseSettings('world',datasetName)
        let connection = mysql.createConnection(settings);
        const syncQuery = deasync(connection.query.bind(connection))

        const errors: string[] = []

        checks.forEach(({table,cols})=>{
            const tableRes = syncQuery(`
                SELECT * from \`information_schema\`.\`TABLES\`
                    WHERE \`TABLE_SCHEMA\` = "${settings.database}"
                        AND \`TABLE_NAME\` = "${table}";
            `);
            if(tableRes.length===0) {
                errors.push(`Missing table "${table}"`);
                return;
            }

            if(cols.length == 0) {
                return;
            }

            const colRes = syncQuery(`
                SELECT * FROM \`information_schema\`.\`COLUMNS\`
                    WHERE \`TABLE_SCHEMA\` = "${settings.database}"
                        AND \`TABLE_NAME\` = "${table}";
            `)

            cols.split('').forEach((colTok,i)=>{
                i++;
                let arg = colRes.find(x=>x.ORDINAL_POSITION == i);
                let argName = {i:'int',f:'float',s:'string',b:'bool','*':'blank'}[colTok]
                if(!argName) {
                    throw new Error(`Invalid type character: ${colTok} (expected i, f, s, b or *)`)
                }

                if(!arg) {
                    errors.push(`Missing ${argName} column ${i} in "${table}"`)
                    return;
                }

                if(colTok==='*') {
                    return;
                }

                let matches = {
                      i:['tinyint','smallint','mediumint','int','bigint','bit']
                    , f:['float','double','decimal']
                    , s:['varchar','char','tinytext','text','text','mediumtext','longtext','json']
                }
                matches.f = matches.f.concat(matches.i)

                let match = matches[colTok];
                let datatype = arg.DATA_TYPE.toLowerCase();
                if(!match.includes(datatype)) {
                    errors.push(`Column type mismatch ${i} in "${table}" (expected ${argName}, but is ${datatype})`)
                }
            })

            if(errors.length > 0) {
                throw new Error(
                    `Database Assert Errors:\n    ${errors.join('\n    ')}\n`)
            }
        })
        connection.end();
    }

    return contents;
}