import * as mysql from 'mysql2';
import { NodeConfig } from "../runtime/NodeConfig";
import { GetExistingId } from './ids/Ids';
import { ipaths } from "./Paths";
// deasync removed - using async/await instead

/**
 * TODO: relies on terrible regex patterns, they can't even handle newlines or anything.
 *
 * We should use some kind of actual agnostic parser for this
 *
 * @note This function assumes you already called IdPrivate#readFile
 */
export async function ApplyTagMacros(contents: string, datasetName: string, type: 'LIVESCRIPT'|'LUA') {
    // ======================================
    //  GetID
    // ======================================
    [
        /GetID *\( *JSTR *\("(.+?)" *\) *, *JSTR *\( *"(.+?)" *\) *, *JSTR *\( *"(.+?)" *\) *\)/,
        /GetID *\( *"(.+?)" *, *"(.+?)" *, *"(.+?)" *\)/,
        /GetID *\( *"(.+?)" *, *"(.+?)" *, *'(.+?)' *\)/,

        /GetID *\( *"(.+?)" *, *'(.+?)' *, *"(.+?)" *\)/,
        /GetID *\( *"(.+?)" *, *'(.+?)' *, *'(.+?)' *\)/,

        /GetID *\( *'(.+?)' *, *"(.+?)" *, *"(.+?)" *\)/,
        /GetID *\( *'(.+?)' *, *"(.+?)" *, *'(.+?)' *\)/,

        /GetID *\( *'(.+?)' *, *'(.+?)' *, *"(.+?)" *\)/,
        /GetID *\( *'(.+?)' *, *'(.+?)' *, *'(.+?)' *\)/,
    ].forEach(regex=>{
        while(true) {
            let m = contents
                .match(regex)
            if(!m) break;
            const [_,table,mod,name] = m;
            let id = GetExistingId(table,mod,name);
            contents = contents.replace(m[0],`${id}`)
        }
    });


    [
        /(?:GetIDTagUnique|UTAG) *\( *JSTR *\( *"(.+?)" *\) *, *JSTR *\( *"(.+?)" *\) *\)/,
        /(?:GetIDTagUnique|UTAG) *\( *"(.+?)" *, *"(.+?)" *\)/,
        /(?:GetIDTagUnique|UTAG) *\( *'(.+?)' *, *'(.+?)' *\)/,
        /(?:GetIDTagUnique|UTAG) *\( *'(.+?)' *, *"(.+?)" *\)/,
        /(?:GetIDTagUnique|UTAG) *\( *"(.+?)" *, *'(.+?)' *\)/,
    ].forEach(regex=>{
        while(true) {
            let m = contents.match(regex)
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
    });

    [
        /(?:GetIDTag|TAG) *\(JSTR\("(.+?)"\), JSTR\("(.+?)"\)\)/,
        /(?:GetIDTag|TAG) *\( *"(.+?)" *, *"(.+?)" *\)/,
        /(?:GetIDTag|TAG) *\( *'(.+?)' *, *"(.+?)" *\)/,
        /(?:GetIDTag|TAG) *\( *"(.+?)" *, *'(.+?)' *\)/,
        /(?:GetIDTag|TAG) *\( *'(.+?)' *, *'(.+?)' *\)/,
    ].forEach(regex=>{
        while(true) {
            let m = contents.match(regex)
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

            switch(type) {
                case 'LIVESCRIPT':
                    contents = contents.replace(m[0],`TSArray<uint32>({${values.join(',')}})`);
                    break;
                case 'LUA':
                    contents = contents.replace(m[0],`{${values.join(',')}}`);
                    break;
            }
        }
    });

    [
        /HAS_TAG *\( *(.+), *JSTR *\( *"(.+?)" *\), *JSTR *\( *"(.+?) *" *\) *\)/,
        /HAS_TAG *\( *(.+), *"(.+?)" *, *"(.+?)" *\)/,
        /HAS_TAG *\( *(.+), *'(.+?)' *, *'(.+?)' *\)/,
        /HAS_TAG *\( *(.+), *'(.+?)' *, *"(.+?)" *\)/,
        /HAS_TAG *\( *(.+), *"(.+?)" *, *'(.+?)' *\)/,
    ].forEach(regex=>{
        while(true) {
            let m = contents.match(regex);
            if(!m) break;
            let item = m[1]
            let mod = m[2];
            let id = m[3];
            let fullName = `${mod}.${id}`
            let file = ipaths.coredata.tags.tagfile(fullName)
            if(!file.exists()) {
                throw new Error(`No ids are tagged ${fullName}, did you run datascripts?`)
            }
            let values = file.readJson(undefined);
            if(!values) {
                throw new Error(`Corrupt json for tag ${fullName}, try rebuilding datascripts`)
            }
            contents = contents.replace(m[0],`HAS_TAG(${item}, {${values.join(',')}})`);
        }
    })

    // ======================================
    //  World table asserts
    // ======================================
    let checks: {table: string, cols: string}[] = [];
    [
        /ASSERT_WORLD_TABLE *\( *"(.+?)" *, *"(.+?)" *\)/,
        /ASSERT_WORLD_TABLE *\( *'(.+?)' *, *'(.+?)' *\)/,
        /ASSERT_WORLD_TABLE *\( *"(.+?)" *, *'(.+?)' *\)/,
        /ASSERT_WORLD_TABLE *\( *'(.+?)' *, *"(.+?)" *\)/,
        /ASSERT_WORLD_TABLE *\( *"(.+?)" *\)/,
        /ASSERT_WORLD_TABLE *\( *'(.+?)' *\)/,
        /ASSERT_WORLD_TABLE *\( *JSTR *\( *"(.+?)" *\) *, *JSTR *\( *"(.+?)" *\) *\)/,
        /ASSERT_WORLD_TABLE *\( *JSTR *\( *"(.+?)" *\) *\)/,
    ].forEach((check)=>{
        while(true) {
            let m = contents.match(check)
            if(!m) break;
            contents = contents.replace(m[0],'')
            checks.push({table:m[1],cols:m[2]||""})
        }
    })

    if(checks.length > 0) {
        const settings = NodeConfig.DatabaseSettings('world',datasetName)
        // Create connection with only the necessary settings to avoid pool-specific options
        const connectionSettings = {
            host: settings.host,
            port: settings.port,
            user: settings.user,
            password: settings.password,
            database: settings.database,
            multipleStatements: true
        };
        const connection = mysql.createConnection(connectionSettings);
        const queryAsync = (query: string): Promise<any[]> => {
            return new Promise((resolve, reject) => {
                connection.query(query, (err, results) => {
                    if (err) reject(err);
                    else resolve(results as any[]);
                });
            });
        };
        const errors: string[] = []

        for (const {table, cols} of checks) {
            const tableRes = await queryAsync(`
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

            const colRes = await queryAsync(`
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
        }
        if(errors.length > 0) {
            throw new Error(
                `Database Assert Errors:\n    ${errors.join('\n    ')}\n`)
        }
        connection.end();
    }

    return contents;
}
