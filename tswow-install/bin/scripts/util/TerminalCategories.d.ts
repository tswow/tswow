export declare class CustomCategory {
    orig: TerminalCategory;
    custom: string;
    constructor(orig: TerminalCategory | undefined, custom: string);
    toString(): any;
}
export type TerminalCategory = 'mysql' | 'authserver' | 'addon' | 'realm' | 'dataset' | 'modules' | 'datascripts' | 'livescripts' | 'tests' | 'build' | 'process' | 'commands' | 'misc' | 'client' | 'lua' | 'launcher' | CustomCategory;
export declare function termCustom(custom: string): any;
export declare function termCustom(cat: TerminalCategory, custom: string): any;
export declare function getTerminalCategory(cat: TerminalCategory): any;
