import { ipaths } from "./Paths";

export function ApplyTagMacros(contents: string, type: 'LIVESCRIPT'|'LUA') {
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
    return contents;
}