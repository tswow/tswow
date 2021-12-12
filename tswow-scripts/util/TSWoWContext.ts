export type TSWoWContext = 'build'|'install'|'typescript2cxx';

let context: TSWoWContext = 'install';

export function setContext(contextIn: TSWoWContext) {
    context = contextIn;
}

export function getContext() {
    return context;
}