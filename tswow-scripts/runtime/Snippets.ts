import { Args } from "../util/Args";
import { ipaths } from "../util/Paths";
import { term } from "../util/Terminal";
import { BuildCommand } from "./CommandActions";
import { Identifier } from "./Identifiers";
import { Module, ModuleEndpoint } from "./Modules";

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

    export function cleanSnippets(modules: ModuleEndpoint[]) {
        let json: any = ipaths.vscode.snippets_out.readJson({})

        // Delete removed modules
        let allModules = Module.endpoints()
        Object.keys(json)
            .filter(x=>!allModules.find(y=>x.startsWith(`${y}--`)))
            .forEach(x=>{delete json[x]})

        // Delete matching and existing modules
        modules.forEach(x=>{
            Object.keys(json)
                .filter(y=>y.startsWith(`${x.fullName}--`))
                .forEach(y=>{delete json[y]})
        });
        return json;
    }

    export function generateSnippets(
          modules: ModuleEndpoint[]
        , removeComments: boolean
        , noEmptyTrail: boolean
        , indention?: string
    ) {
        let allSnippets: Snippet[] = [];
        let jsonOut = cleanSnippets(modules);
        modules.forEach(x=>{
            x.path.snippets.iterate('RECURSE','FILES','FULL',name=>{
                allSnippets.concat(parseText(
                      name.toFile().readString()
                    , removeComments
                    , noEmptyTrail
                    , indention))
                    .forEach(y=>{
                        jsonOut[`${x.fullName}--${y.name}`] = {
                              prefix : y.name
                            , body : y.body
                            , description: y.description.join('\n')
                        }
                    });
            });
        });
        ipaths.vscode.snippets_out.writeJson(jsonOut)
    }

    export function initialize() {
        term.debug('misc', `Initializing snippets`)
        if(!ipaths.vscode.snippets_out.exists()) {
            generateSnippets(Module.endpoints(),false,false);
        }

        BuildCommand.addCommand('snippets','module[]? --remove-comments --no-empty-trail','Generates VSCode snippets from module code comments', args => {
            generateSnippets(Identifier.getModulesOrAll(args),
                Args.hasFlag('remove-comments', args),
                Args.hasFlag('no-empty-trail',args),
                // todo: broken
                //Args.getString('indention','4',args)
            )
        })
    }
}
