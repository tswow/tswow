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
import { getTerminalCategory, TerminalCategory } from './TerminalCategories';
import { termc } from './TerminalColors';
import * as fs from 'fs';

const t = termkit.terminal;
// Overwrite old log
fs.writeFileSync('./log.txt', '');
const logStream = fs.createWriteStream('./log.txt', {flags: 'a'});

/**
 * Contains functions for handling console output
 */
export namespace term {
    let historyPath: string = undefined;
    let historyCount: number = 100;

    let history: string[] = [];
    let historyCounter = -1;
    let inputBuffer = '';
    let inputColor: string|number = 'white';
    let enabled = false;
    let callback: (args: string) => any;
    let xpos = 0;
    let showName: boolean = false;
    let showTimestamp: boolean = false;

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

    export function raw(message: string) {
        clearLine()
        if(!message.endsWith('\n')) message += '\n'
        t.white(message)
        if(enabled) {
            `>${inputBuffer}`
        }
    }

    export function pipe(
          nameIn: TerminalCategory
        , text: string
    ) {
        const name = getTerminalCategory(nameIn)

        text = text.split('\r').join('');
        if (!text.endsWith('\n')) {
            text = text + '\n';
        }
        const d = new Date();
        let time =
              `${d.getHours().toString().padStart(2,'0')}`
            + `:${d.getMinutes().toString().padStart(2,'0')}`
            + `:${d.getSeconds().toString().padStart(2,'0')}`

        text.split('\n').forEach((x) => {
            const filterText = x.toLowerCase();
            let isForbidden = false;
            ['account create', 'create account', 'password', '2fa'].forEach(y => {
                if (filterText.includes(y)) {
                    isForbidden = true;
                }
            });

            if (!isForbidden) {
                logStream.write(`[${time}][${name}]: ${x}\n`)
            } else {
                logStream.write(`[${time}][${name}]: <removed>\n`)
            }
        });

        clearLine();
        if (typeof(text) !== 'string') { text = `${text}`; }
        let str = "";
        if(showTimestamp) {
            str+=`[${termc.magenta(time)}]`
        }
        if(showName) {
            str+=`[${termc.cyan(name)}]`
        }
        if(showName || showTimestamp) {
            str+=' ';
        }
        t.white(`${str}${text}`)
        if (enabled) {
            t.white(`>${inputBuffer}`);
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
                clearLine()
                t.white(inputBuffer+'\n')
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

                history.splice(0,Math.max(0,history.length - historyCount))
                if(historyPath !== undefined) {
                    fs.writeFileSync(historyPath,history.join('\n'));
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
    export function log(cat: TerminalCategory, message: string) {
        pipe(cat,message)
    }

    export function error(cat: TerminalCategory, message: string) {
        pipe(cat,termc.red(message))
    }

    export function success(cat: TerminalCategory, message: string) {
        pipe(cat,termc.green(message))
    }

    export function warn(cat: TerminalCategory, message: string) {
        pipe(cat,termc.yellow(message))
    }

    export function debug(cat: TerminalCategory, message: string) {
        if (process.argv.includes('log-debug'))
        {
            pipe(cat,termc.magenta(message))
        }
    }

    export function setInputCallback(callbackIn: (args: string) => any) {
        callback = callbackIn;
    }

    export function Initialize(
          historyPathIn: string
        , historyCountIn: number
        , showTimestampIn: boolean
        , showNameIn: boolean
    ) {
        historyPath = historyPathIn
        historyCount = historyCountIn
        showTimestamp = showTimestampIn
        showName = showNameIn
        // load history file
        if(historyPath !== undefined) {
            if (fs.existsSync(historyPath)) {
                history = fs.readFileSync(historyPath, 'utf-8')
                    .split('\n')
                    .filter(x=>x.length>0)
            }
        }

        t.on('key', (name: string, data: any) => {
            if (name === 'CTRL_C') { t.processExit(0); }
        });

    }
}
