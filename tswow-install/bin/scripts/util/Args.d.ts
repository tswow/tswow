/**
 * Contains functions for parsing command-line arguments.
 */
export declare namespace Args {
    function hasFlag(flags: string | string[], args: (string[]) | (string[][])): boolean;
    function getString(flagname: string, defVal: string, args?: string[]): string;
    function getNumber(flagname: string, defVal: number, args?: string[]): number;
}
