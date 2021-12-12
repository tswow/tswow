/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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

enum termsettings {
    reset = "\x1b[0m",
    bright = "\x1b[1m",
    dim = "\x1b[2m",
    uscore = "\x1b[4m",
    blink = "\x1b[5m",
    rev = "\x1b[7m",
    hidden = "\x1b[8m",
    fgblack = "\x1b[30m",
    fgred = "\x1b[31m",
    fggreen = "\x1b[32m",
    fgyellow = "\x1b[33m",
    fgblue = "\x1b[34m",
    fgmagenta = "\x1b[35m",
    fgcyan = "\x1b[36m",
    fgwhite = "\x1b[37m",
    bgblack = "\x1b[40m",
    bfgred = "\x1b[41m",
    bfggreen = "\x1b[42m",
    bgyellow = "\x1b[43m",
    bgblue = "\x1b[44m",
    bgmagenta = "\x1b[45m",
    bgcyan = "\x1b[46m",
    bgwhite = "\x1b[47m"
}

export type TerminalColor =
      "BLACK"
    | "RED"
    | "GREEN"
    | "YELLOW"
    | "BLUE"
    | "MAGENTA"
    | "CYAN"
    | "WHITE"

function col2fg(color?: TerminalColor) {
    switch(color) {
        case 'BLACK':   return termsettings.fgblack
        case 'BLUE':    return termsettings.fgblue
        case 'CYAN':    return termsettings.fgcyan
        case 'GREEN':   return termsettings.fggreen
        case 'MAGENTA': return termsettings.fgmagenta
        case 'RED':     return termsettings.fgred
        case 'WHITE':   return termsettings.fgwhite
        case 'YELLOW':  return termsettings.fgyellow
        default: return ''
    }
}

function col2bg(color?: TerminalColor) {
    switch(color) {
        case 'BLACK':   return termsettings.bgblack
        case 'BLUE':    return termsettings.bgblue
        case 'CYAN':    return termsettings.bgcyan
        case 'GREEN':   return termsettings.bfggreen
        case 'MAGENTA': return termsettings.bgmagenta
        case 'RED':     return termsettings.bfgred
        case 'WHITE':   return termsettings.bgwhite
        case 'YELLOW':  return termsettings.bgyellow
        default: return ''
    }
}


export namespace termc {
    export function col(value: string, fg?: TerminalColor, bg?: TerminalColor) {
        return `${col2fg(fg)}${col2bg(bg)}${value}${termsettings.reset}`
    }

    export function red(value: string) {
        return col(value,'RED')
    }

    export function blue(value: string) {
        return col(value,'BLUE');
    }

    export function green(value: string) {
        return col(value,'GREEN')
    }

    export function magenta(value: string) {
        return col(value,'MAGENTA')
    }

    export function yellow(value: string) {
        return col(value, 'YELLOW')
    }

    export function cyan(value: string) {
        return col(value, 'CYAN')
    }
}