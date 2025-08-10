import { TextFile } from './TextFile';
export declare function loadLuaxml(filepath: string): TextFile;
/**
 * Internal function for clearing the LUAXML loaded file data.
 * @warn Erases all edits from memory without writing them to disk
 */
export declare function _clearLUAXML(): void;
/**
 * Internal function for writing LUAXML edits to disk.
 * @param indir
 * @param outdir
 * @warn indiscriminately removes anything previously in the target directory
 */
export declare function _writeLUAXML(): void;
