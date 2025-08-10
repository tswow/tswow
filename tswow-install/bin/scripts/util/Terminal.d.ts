import { TerminalCategory } from './TerminalCategories';
/**
 * Contains functions for handling console output
 */
export declare namespace term {
    function clearLine(): void;
    function setInput(text: string, moveXpos: boolean): void;
    function setEnabled(newEnabled: boolean): void;
    function getEnabled(): boolean;
    function setInputColor(color: string | number): void;
    function raw(message: string): void;
    function pipe(nameIn: TerminalCategory, text: string): void;
    /**
     * Writes logging messages to the console
     * @param messages
     */
    function log(cat: TerminalCategory, message: string): void;
    function error(cat: TerminalCategory, message: string): void;
    function success(cat: TerminalCategory, message: string): void;
    function warn(cat: TerminalCategory, message: string): void;
    function debug(cat: TerminalCategory, message: string): void;
    function setInputCallback(callbackIn: (args: string) => any): void;
    function Initialize(historyPathIn: string, historyCountIn: number, showTimestampIn: boolean, showNameIn: boolean): void;
}
