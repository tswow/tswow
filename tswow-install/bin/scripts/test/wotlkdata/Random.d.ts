export type TransformFunction = (num: number, random: Random) => number;
/**
 * Used to generate pseudo-random numbers
 */
export declare class Random {
    constructor(seed?: string);
    static def: Random;
    static ALPHANUMERIC: string;
    state: [number, number, number, number, number];
    /**
     * Returns a linear transform function
     */
    static linear: TransformFunction;
    string(length: number, charset?: string, transform?: TransformFunction): string;
    scale(transform?: TransformFunction): number;
    int(min?: number, max?: number, transform?: TransformFunction): number;
    float(min?: number, max?: number, transform?: TransformFunction): number;
    item<T>(list: T[], transform?: TransformFunction): T;
    index(list: any[], transform?: TransformFunction): number;
    /**
     * Removes a random element in a list
     */
    selection<T>(list: T[], transform?: TransformFunction): T;
}
