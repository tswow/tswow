/**
 * TODO: relies on terrible regex patterns, they can't even handle newlines or anything.
 *
 * We should use some kind of actual agnostic parser for this
 *
 * @note This function assumes you already called IdPrivate#readFile
 */
export declare function ApplyTagMacros(contents: string, datasetName: string, type: 'LIVESCRIPT' | 'LUA'): Promise<string>;
