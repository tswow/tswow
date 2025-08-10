import { TextFile } from '../../data/luaxml/TextFile';
import { LUAXMLFiles } from './LUAXMLFiles';
/**
 * Contains functions for manipulating LUA and XML files.
 */
export declare class LUAXML {
    /**
     * Loads a LUA or XML text file from a file path local to the LUAXML_SOURCE setting.
     */
    static anyfile(filepath: string): TextFile;
    /**
     * Like LUAXML:anyfile, but argument has autocomplete for common filenames.
     * @param filepath
     */
    static file(filepath: LUAXMLFiles): TextFile;
}
