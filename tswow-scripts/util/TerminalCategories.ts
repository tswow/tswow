export class CustomCategory {
    orig: TerminalCategory
    custom: string;

    constructor(orig: TerminalCategory|undefined, custom: string) {
        this.orig = orig;
        this.custom = custom;
    }

    toString() {
        return this.orig !== undefined
            ? `${getTerminalCategory(this.orig)}/${this.custom}`
            : this.custom
    }
}

export type TerminalCategory =
      'mysql'
    | 'authserver'
    | 'addon'
    | 'realm'
    | 'dataset'
    | 'modules'
    | 'datascripts'
    | 'livescripts'
    | 'build'
    | 'process'
    | 'commands'
    | 'misc'
    | 'client'
    | 'lua'
    | 'launcher'
    | CustomCategory

export function termCustom(custom: string);
export function termCustom(cat: TerminalCategory, custom: string);
export function termCustom(catOrCustom: TerminalCategory|string, custom?: string) {
    if(custom === undefined) {
        return new CustomCategory(undefined,catOrCustom as string);
    } else {
        return new CustomCategory(catOrCustom as TerminalCategory,custom)
    }
}

export function getTerminalCategory(cat: TerminalCategory) {
    return typeof(cat) === 'string' ? cat : cat.toString()
}