import { write } from "wotlkdata";
import { SystemStore } from "wotlkdata/cell/stores/SystemStore";
import * as path from 'path'
import * as fs from 'fs'

write('schemas',()=>{
    let schemas = SystemStore.generateSchemas();
    let schemaDir = path.join(process.cwd(),'modules','tswow-stdlib','schemas');

    if(!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir);
    }
    for(let name in schemas) {
        let schemaFile = path.join(schemaDir , name + '.schema.json');
        fs.writeFileSync(schemaFile,JSON.stringify(schemas[name],null,4));
    }
});