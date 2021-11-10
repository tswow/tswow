export class CustomCategory {
    orig: TerminalCategory
    custom: string;

    constructor(orig: TerminalCategory, custom: string) {
        this.orig = orig;
        this.custom = custom;
    }
}

export type TerminalCategory =
      'mysql'
    | 'auth'
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
    | CustomCategory

export function termCustom(cat: TerminalCategory, custom: string) {
    return new CustomCategory(cat,custom);
}

export function getTerminalCategory(cat: TerminalCategory) {
    return typeof(cat) === 'string' ? cat : `${cat.orig}/${cat.custom}`
}