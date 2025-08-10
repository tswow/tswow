/**
 * Contains utility functions that don't fit anywhere else.
 */
export declare namespace util {
    function isModuleOrParent(mod: string, parent: string): boolean;
    function intListArgument(prefix: string, args: string[]): number[];
    function intPairListArgument(prefix: string, args: string[]): [number, number][];
    function stringListArgument(prefix: string, args: string[]): string[];
    function stringArgument(prefix: string, def: string, args: string[]): string;
    /**
     * Converts a json with flat keys ({"a.b.c":"data"}) to a hierarchy ({"a":{"b":{"c":"data"}}})
     * from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
     * @param data Object to convert
     * @returns `data` converted to a hierarchy
     */
    function unflattenJson(data: any): any;
    /**
     * Transform a string to snake case
     * @param str
     */
    function toDashCase(str: string): string;
    /**
     * Converts a json hierarchy ({"a":{"b":{"c":"data"}}}) to flat keys ({"a.b.c":"data"})
     * from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
     * @param data Object to convert
     * @returns `data` converted to flat keys
     */
    function flattenJson(data: any): any;
    function getLocales(): string[];
}
