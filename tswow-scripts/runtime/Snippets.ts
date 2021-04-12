import { wfs } from "../util/FileSystem";
import { Modules } from "./Modules";
import { ipaths } from "../util/Paths";
import { Build } from "./Build";
import { Clean } from "./Clean";

export namespace Snippets {
    enum Mode {
        NONE,
        DESCRIPTION,
        CODE,
        CODE_COMMENT
    }

    export class Snippet {
        constructor(name: string) {
            this.name =  name;
        }
        name: string;
        description: string[] = []
        body: string[] = []
    }
    
    export function parseText(
          content: string
        , removeComments: boolean
        , noEmptyTrail: boolean
        , indentArg?: string
        ) {

        let curMode = Mode.NONE;
        let curSnippet: Snippet = new Snippet("");
        let allSnippets: Snippet[] = []

        content.split('\r\n').join('\n').split('\n').forEach(x=>{
            let nameMatch = x.match(/\* *Snippet: *(.+?) *(\*\/|) *$/)
            if(nameMatch) {
                curSnippet = new Snippet(nameMatch[1]);
                curMode = x.includes('*/') ? Mode.CODE : Mode.DESCRIPTION;
                return;
            } 
            
            if(curMode == Mode.DESCRIPTION) {
                let m = x.match(/\* *(.+?) *(\*\/|)$/)
                if(m && m[1].length>1) {
                    curSnippet.description.push(m[1]);
                }
                if(x.includes('*/')) {
                    curMode = Mode.CODE;
                }
            } else if (curMode == Mode.CODE || curMode == Mode.CODE_COMMENT){
                if(x.includes('end-snippet')) {
                    if(curSnippet.body[curSnippet.body.length-1]!=='' && !noEmptyTrail) {
                        curSnippet.body.push('');
                    }
                    allSnippets.push(curSnippet);
                    curSnippet = new Snippet('');
                    curMode = Mode.NONE;
                } else {
                    while(true) {
                        let m1 = x.match(/\/\*@(\d)+\*\/"(.+?)"\/\*\*\//)
                        let m2 = x.match(/\/\*@(\d)+\*\/'(.+?)'\/\*\*\//)
                        let m3 = x.match(/\/\*@(\d)+\*\/(.+?)\/\*\*\//)
                        if(m1) {
                            x = x.replace(m1[0],`"\${${m1[1]}:${m1[2]}}"`);
                        } else if(m2) {
                            x = x.replace(m2[0],`"\${${m2[1]}:${m2[2]}}"`);
                        } else if(m3){
                            x = x.replace(m3[0],`\${${m3[1]}:${m3[2]}}`);
                        } else {
                            break;
                        }
                    }

                    let hadComment = false;
                    if(removeComments) {
                        while(true) {
                            // Note: Order matters here

                            // Remove full block comments first
                            let m1 = x.match(/\/\*.+?\*\//)
                            if(m1) {
                                hadComment = true;
                                x = x.replace(m1[0],'')
                                curMode = Mode.CODE;
                                continue;
                            }

                            // Remove starting block comments
                            let m2 = x.match(/\/\*.*/)
                            if(m2) {
                                hadComment = true;
                                x = x.replace(m2[0],'');
                                curMode = Mode.CODE_COMMENT;
                                continue;
                            }

                            // Remove ending block comments
                            let m3 = x.match(/.*\*\//)
                            if(m3) {
                                hadComment = true;
                                x = x.replace(m3[0],'')
                                curMode = Mode.CODE;
                                continue;
                            }

                            // Remove line comments
                            let m4 = x.match(/\/\/.+/);
                            if(m4) {
                                hadComment = true;
                                x = x.replace(m4[0],'');
                                continue;
                            }

                            break;
                        }
                    }

                    // comment rows that are now empty should be skipped
                    if(curMode != Mode.CODE_COMMENT 
                        && (!hadComment || x.split(' ').join('').length>0)) {
                        x = x.trimRight();
                        // necessary because of json
                        curSnippet.body.push(x.split('\\').join('\\\\'));
                    }
                }
            }
        });

        if(indentArg!==undefined) {
            let indentVal = ''
            if(indentArg==='t') {
                indentVal = '\t';
            } else {
                let count = parseInt(indentArg);
                if(isNaN(count)) {
                    throw new Error(
                       `Invalid indention: ${indentArg}`
                     + `(not a number or 't')`);
                }
                indentVal = ' '.repeat(count);
            }

            allSnippets.forEach(x=>{
                let smallest = Number.MAX_SAFE_INTEGER;
                let usesTabs = false;

                function trim(str: string) {
                    if(!str.startsWith(' ')&&!str.startsWith('\t')) {
                        return str;
                    }
                    return str.split(usesTabs?'\t':'')
                        .slice(1)
                        .filter(x=>x.length>0)
                        .join('');

                }

                // First figure out if they indent with tabs,
                // so we can ignore all spaces (might be fewer of those)
                x.body.forEach(y=>{
                    if(y.startsWith('\t')) {
                        usesTabs = true;
                    }
                })

                x.body.forEach(y=>{
                    let trimmed = y.length - trim(y).length

                    // don't count single space indention 
                    // for things like comment blocks
                    if((trimmed > (usesTabs?0:1) && trimmed < smallest)) {
                        smallest = trimmed;
                    }
                })

                x.body = x.body.map(y=>{
                    let trimmed = trim(y)
                    let indent = y.length - trimmed.length;
                    if(indent>0) {
                        let indents = Math.round(indent/smallest);
                        let leftovers = ' '.repeat(indent%smallest);
                        return (indentVal.repeat(indents))+leftovers+trimmed;
                    } else {
                        return y;
                    }
            })});
        }

        return allSnippets;
    }

    export function cleanSnippets(modules: Modules.Module[]) {
        let json: any = JSON.parse(wfs.readOr(ipaths.generatedSnippetsOut,'{}'));
        
        // Delete removed modules
        let allModules = Modules.getModules().map(x=>x.id);
        Object.keys(json)
            .filter(x=>!allModules.find(y=>x.startsWith(`${y}--`)))
            .forEach(x=>{delete json[x]})

        // Delete matching and existing modules
        modules.forEach(x=>{
            Object.keys(json)
                .filter(y=>y.startsWith(`${x.id}--`))
                .forEach(y=>{delete json[y]})
        });
        return json;
    }

    export function generateSnippets(
          modules: Modules.Module[]
        , removeComments: boolean
        , noEmptyTrail: boolean
        , indention?: string
        ) {
        let allSnippets: Snippet[] = [];
        let jsonOut = cleanSnippets(modules);
        modules.forEach(x=>{
            wfs.iterate(ipaths.moduleSnippets(x.id),(name)=>{
                allSnippets.concat(parseText(
                      wfs.read(name)
                    , removeComments
                    , noEmptyTrail
                    , indention))
                    .forEach(y=>{
                        jsonOut[`${x.id}--${y.name}`] = {
                              prefix : y.name
                            , body : y.body
                            , description: y.description.join('\n')
                        }
                    });
            });
        });
        wfs.write(ipaths.generatedSnippetsOut,JSON.stringify(jsonOut,null,4));
    }

    export function initialize() {
        if(!wfs.exists(ipaths.generatedSnippetsOut)) {
            generateSnippets(Modules.getModules(),false,false);
        }

        Build.command.addCommand('snippets','--remove-comments --indent=x --no-empty-trail modules','Builds all snippets for specified or all modules',(args)=>{
            let modules = Modules.getModulesOrAll(args);

            let indention = args.find((x=>x.startsWith('--indent=')));
            if(indention) {
                indention = indention.split('=')[1];
            }

            generateSnippets(modules, args.includes('--remove-comments'),args.includes('--no-empty-trail'),indention);
        });

        Clean.command.addCommand('snippets','modules','Cleans snippets for a specified or all modules',(args)=>{
            if(args.length===0) {
                wfs.remove(ipaths.generatedSnippetsOut);
            } else {
                wfs.write(ipaths.generatedSnippetsOut,JSON.stringify(
                    cleanSnippets(Modules.getModulesOrAll(args)),null,4)
                );
            }
        });
    }
}