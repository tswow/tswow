import { ipaths } from "../util/Paths";
import { term } from "../util/Terminal";

/**
 * Patch tstl to allow any kind of decorators (no longer needed?)
 */
export function applyTSTLHack() {
    term.debug('misc', `Applying TSTL hack`)
    let decoText = ipaths.node_modules.tstl_decorators.read('utf-8')
    let diagnosticsIndex = decoText.indexOf('context.diagnostics.push(');
    if(diagnosticsIndex==-1) {
        throw new Error(`Unable to find the "context.diagnostics" part`);
    }
    if(decoText[diagnosticsIndex-1]!='/') {
        decoText = decoText.substring(0,diagnosticsIndex)+'//'+decoText.substring(diagnosticsIndex,decoText.length);
        ipaths.node_modules.tstl_decorators.write(decoText);
    }
}