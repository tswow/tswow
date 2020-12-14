/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import termkit = require('terminal-kit');
import { wfs } from './FileSystem';

const t = termkit.terminal;
t.on('key', (name: string, data: any) => {
    if (name === 'CTRL_C') { t.processExit(0); }
});

// colors from https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const FgRed = 'red';
const FgGreen = 'green';
const FgYellow = 'yellow';
const FgMagenta = 'magenta';
const FgCyan = 'cyan';
const FgWhite = 'white';

// Overwrite old log
wfs.write('./log.txt','');
const logStream = wfs.writeStream('./log.txt');

/**
 * Contains functions for handling console output
 */
export namespace term {
    let history: string[] = [];
    let historyCounter = -1;
    let inputBuffer = '';
    let inputColor: string|number = 'white';
    let enabled = false;
    let callback: (args: string) => any;
    let xpos = 0;

    export function clearLine() {
        t.eraseLine();
        t.move(-999999999, 0);
    }

    export function setInput(text: string, moveXpos: boolean) {
        inputBuffer = text;
        clearLine();
        t.color(inputColor, `>${text}`);
        if (moveXpos) {
            xpos = text.length;
        }
    }

    export function setEnabled(newEnabled: boolean) {
        if (enabled === newEnabled) { return; }
        if (enabled) {
            clearLine();
            enabled = false;
        } else {
            setInput('', true);
        }
        enabled = newEnabled;
    }

    export function getEnabled() {
        return enabled;
    }

    export function setInputColor(color: string|number) {
        inputColor = color;
        setInput(inputBuffer, true);
    }

    export function pipe(color: string|number = 'white', texts: string[]) {
        let text = texts.join(' ');
        text = text.split('\r').join('');
        if (!text.endsWith('\n')) { text = text + '\n'; }

        text.split('\n').forEach((x)=>{
            let filterText = x.toLowerCase();
            let isForbidden = false;
            ['account create','password','2fa'].forEach(x=>{
                if(filterText.includes(x)) {
                    isForbidden = true;
                }
            });
        
            // remove paths
            x = x.split(/(?:[A-Z]:|)(?:\/|\\).+(?:\/|\\)/).join('/path/');

            if(!isForbidden) {
                logStream.write(x+'\n');
            } else {
                logStream.write('<removed>\n')
            }
        })

        if (!enabled) {
            t.color(color, text);
        } else {
            if (typeof(text) !== 'string') { text = `${text}`; }
            clearLine();
            t.color(color, text);
            t.color(inputColor, `>${inputBuffer}`);
        }
    }

    function setHistoryPtr(value: number) {
        const hsl = history.length;
        if (history.length === 0) {
            historyCounter = -1;
        } else {
            historyCounter = ((value % hsl) + hsl) % hsl;
        }
    }

    t.grabInput({mouse: 'button'});
    t.white('>');
    t.on( 'key' , function(key: any) {
        // First so we can always kill the process
        if (key === 'CTRL_C') {
            process.exit();
        }

        if (!enabled) {
            return;
        }

        switch (key) {
            case 'ENTER':
                if (inputBuffer.length === 0) {
                    break;
                }
                pipe(inputColor, [inputBuffer]);
                clearLine();
                history = history.filter(x => x !== inputBuffer);
                history.push(inputBuffer);
                if (callback) {
                    callback(inputBuffer);
                }
                inputBuffer = '';
                historyCounter = -1;
                if (enabled) {
                    t.color(inputColor, '>');
                }
                break;
            case 'BACKSPACE':
                if (inputBuffer.length === 0 || xpos === 0) {
                    break;
                }
                t.backDelete();
                inputBuffer =
                    inputBuffer.substring(0, xpos - 1) +
                    inputBuffer.substring(xpos, inputBuffer.length);
                --xpos;
                break;
            case 'DELETE':
                if (xpos >= inputBuffer.length) {
                    return;
                }
                t.delete(1);
                inputBuffer =
                    inputBuffer.substring(0, xpos) +
                    inputBuffer.substring(xpos + 1, inputBuffer.length);
                break;
            case 'LEFT':
                if (xpos === 0) {
                    return;
                }
                t.move(-1, 0);
                --xpos;
                break;
            case 'RIGHT':
                if (xpos >= inputBuffer.length) {
                    return;
                }
                ++xpos;
                t.move(1, 0);
                break;
            case 'UP':
                if (history.length === 0) {
                    break;
                }
                setHistoryPtr(historyCounter + 1);
                setInput(history[history.length - 1 - historyCounter], true);
                break;
            case 'DOWN':
                if (history.length === 0) {
                    break;
                }
                if (historyCounter === -1) {
                    setHistoryPtr(history.length - 1);
                } else {
                    setHistoryPtr(historyCounter - 1);
                }
                setInput(history[history.length - 1 - historyCounter], true);
                break;
            case 'TAB':
                break;
            case 'CTRL_W':
            case 'ESCAPE':
                setInput('', true);
                break;
            default:
                if (key.startsWith('CTRL') || key.startsWith('ALT')) {
                    return;
                }
                const nustring = key + inputBuffer.substring(xpos, inputBuffer
                    .length);
                inputBuffer = inputBuffer.substring(0, xpos) + nustring;
                t.color(inputColor, nustring);
                t.move(-(nustring.length - 1), 0);
                ++xpos;
        }
    });

    /**
     * Writes logging messages to the console
     * @param messages
     */
    export function log(...messages: string[]) {
        pipe(FgWhite, messages);
    }

    /**
     * Writes success messages to the console
     * @param messages
     */
    export function success(...messages: string[]) {
        pipe(FgGreen, messages);
    }

    /**
     * Writes warning messages to the console
     * @param messages
     */
    export function warn(...messages: string[]) {
        pipe(FgYellow, messages);
    }

    /**
     * Writes error messages to the console
     * @param messages
     */
    export function error(...messages: any[]) {
        pipe(FgRed, messages);
    }

    /**
     * Writes log messages to the console without a newline
     * @param messages
     */
    export function lognl(...messages: any[]) {
        pipe(FgWhite, messages);
    }

    /**
     * Writes success messages to the console without a newline
     * @param messages
     */
    export function successnl(...messages: any[]) {
        pipe(FgGreen, messages);
    }

    /**
     * Writes warning messages to the console without a newline
     * @param messages
     */
    export function warnnl(...messages: any[]) {
        pipe(FgYellow, messages);
    }

    /**
     * Writes error messages to the console without a newline
     * @param messages
     */
    export function errornl(...messages: any[]) {
        pipe(FgRed, messages);
    }

    /**
     * Writes cyan messages to the console
     */
    export function cyan(...messages: any[]) {
        pipe(FgCyan, messages);
    }

    /**
     * Writes white messages to the console
     */
    export function white(...messages: any[]) {
        pipe(FgWhite, messages);
    }

    /**
     * Writes magenta messages to the console
     */
    export function magenta(...messages: any[]) {
        pipe(FgMagenta, messages);
    }

    /**
     * Writes cyan messages to the console
     * @param messages
     */
    export function cyannl(...messages: any[]) {
        pipe(FgCyan, messages);
    }

    /**
     * Writes white messages to the console without a newline
     * @param messages
     */
    export function whitenl(...messages: any[]) {
        pipe(FgWhite, messages);
    }

    /**
     * Writes magenta messages to the console without a newline
     * @param messages
     */
    export function magentanl(...messages: any[]) {
        pipe(FgMagenta, messages);
    }

    export function setInputCallback(callbackIn: (args: string) => any) {
        callback = callbackIn;
    }
}
