import * as fs from 'fs';
import * as path from 'path';
import { write } from "wotlkdata";
import { SystemStore } from "wotlkdata/cell/serialization/SystemStore";

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