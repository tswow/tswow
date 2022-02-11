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
type map = {[key:string]:number};

type arrmap = {[key:string]:number[]};

/** Descripes all lua/xml rows of settings for base classes */
export const BaseClassData = {
    CHARACTERCREATE_ICON_TCOORD_ROWS : <map> {
        "WARRIOR" : 53,
        "MAGE" : 54,
        "ROGUE" : 55,
        "DRUID" : 56,
        "HUNTER" : 57,
        "SHAMAN" : 58,
        "PRIEST" : 59,
        "WARLOCK" : 60,
        "PALADIN" : 61,
        "DEATHKNIGHT" : 62,
    },

    WORLDSTATEFRAME_TCOORDS_ROWS: <map> {
        "WARRIOR":     34,
        "MAGE":        35,
        "ROGUE":       36,
        "DRUID":       37,
        "HUNTER":      38,
        "SHAMAN":      39,
        "PRIEST":      40,
        "WARLOCK":     41,
        "PALADIN":     42,
        "DEATHKNIGHT": 43,
    },

    CONSTANT_ICON_TCOORDS_ROWS : <map> {
        "WARRIOR" : 92,
        "MAGE" : 93,
        "ROGUE" : 94,
        "DRUID" : 95,
        "HUNTER" : 96,
        "SHAMAN" : 97,
        "PRIEST" : 98,
        "WARLOCK" : 99,
        "PALADIN" : 100,
        "DEATHKNIGHT": 101
    },

    XML_ROWS : <map> {
        "WARRIOR": 539,
        "PALADIN" : 544,
        "HUNTER" : 549,
        "ROGUE" : 554,
        "PRIEST" : 559,
        "DEATHKNIGHT" : 564,
        "SHAMAN" : 569,
        "MAGE" : 574,
        "WARLOCK" : 579,
        "DRUID" : 584,
    },

    CLASS_COLOR_ROWS : <map> {
        "HUNTER" : 55,
        "WARLOCK" : 56,
        "PRIEST" : 57,
        "PALADIN" : 58,
        "MAGE" : 59,
        "ROGUE" : 60,
        "DRUID" : 61,
        "SHAMAN" : 62,
        "WARRIOR" : 63,
        "DEATHKNIGHT": 64
    },

    CLASS_SORT_ORDER_ROWS : <map> {
        "WARRIOR": 72,
        "DEATHKNIGHT": 73,
        "PALADIN": 74,
        "PRIEST" : 75,
        "SHAMAN" : 76,
        "DRUID" : 77,
        "ROGUE" : 78,
        "MAGE" : 79,
        "WARLOCK" : 80,
        "HUNTER" : 81
    },

    /** Remale rows are row+1 */
    CLASS_DESCRIPTION_ROW : <map> {
        "DEATHKNIGHT" : 252,
        "DRUID" : 254,
        "MAGE" : 314,
        "PALADIN" : 316,
        "PRIEST" : 318,
        "ROGUE" : 320,
        "SHAMAN" : 322,
        "WARLOCK" : 324,
        "WARRIOR" : 326,
        "HUNTER" : 256
    },

    /** No gendered difference, second number is row count */
    CLASS_INFO_ROW : <arrmap> {
        "DEATHKNIGHT": [258,6],
        "DRUID": [264,5],
        "HUNTER":[269,5],
        "MAGE":[274,6],
        "PALADIN":[280,6],
        "PRIEST":[286,5],
        "ROGUE":[291,6],
        "SHAMAN":[297,6],
        "WARLOCK":[303,6],
        "WARRIOR":[309,5]
    },

    CLASS_DISABLED_ROW: <map> {
        "DEATHKNIGHT": 371,
        "DRUID": 394,
        "HUNTER": 478,
        "MAGE": 550,
        "PALADIN": 643,
        "PRIEST": 654,
        "ROGUE": 737,
        "SHAMAN": 796,
        "WARLOCK": 860,
        "WARRIOR": 861,
    }
}