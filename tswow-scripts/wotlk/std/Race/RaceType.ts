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

export enum RaceIDs {
  HUMAN       = 1,
  ORC         = 2,
  DWARF       = 3,
  NIGHTELF    = 4,
  UNDEAD      = 5,
  TAUREN      = 6,
  GNOME       = 7,
  TROLL       = 8,
  VULPERA     = 9,
  BLOODELF    = 10,
  DRAENEI     = 11,
  WORGEN      = 12,
  NIGHTBORNE  = 13,
  HIGHELF    = 14,
  VOIDELF     = 15,
  EREDAR      = 16,
  DRACTHYRH    = 17,
  ZANDALARI_TROLL = 18,
  //OGRE        = 19,
  LIGHTFORGED_DRAENEI = 20,
  GOBLIN      = 21,
  PANDARENH        = 22,
  BROKEN      = 23,
  //TUSKARR     = 24,
  //FOREST_TROLL = 25,
  PANDARENA    = 26,
  DEMONHUNTERH = 27,
  //ARAKKOA     = 28,
  DARKIRON_DWARF      = 29,
  DRACTHYRA      = 30,
  KULTIRAN    = 31,
  DEMONHUNTERA = 32,
}

export enum RaceMask {
  HUMAN       = 0x1,
  ORC         = 0x2,
  DWARF       = 0x4,
  NIGHTELF    = 0x8,
  UNDEAD      = 0x10,
  TAUREN      = 0x20,
  GNOME       = 0x40,
  TROLL       = 0x80,
  VULPERA     = 0x100,
  BLOODELF    = 0x200,
  DRAENEI     = 0x400,
  //WORGEN      = 0x800,
  //NIGHTBORNE  = 0x1000,
  //HIGHELF    = 0x2000,
  //VOIDELF     = 0x4000,
  //EREDAR      = 0x8000,
  //DRACTHYRH    = 0x10000,
  //ZANDALARI_TROLL = 0x20000,
  //OGRE        = 0x40000,
  //LIGHTFORGED_DRAENEI = 0x80000,  
  //GOBLIN      = 0x100000,
  //PANDARENH        = 0x200000,
  //BROKEN      = 0x400000,
  //TUSKARR     = 0x800000,
  //FOREST_TROLL = 0x1000000,
  //PANDARENA    = 0x2000000,
  //DEMONHUNTERH = 0x4000000,
  //ARAKKOA     = 0x8000000,
  //DARKIRON_DWARF      = 0x10000000,
  //DRACTHYRA      = 0x20000000,
  //KULTIRAN    = 0x40000000,
  //DEMONHUNTERA = 0x80000000,

  HORDE = ORC + UNDEAD + TAUREN + TROLL + BLOODELF,
  ALLIANCE = HUMAN + DWARF + NIGHTELF + GNOME + DRAENEI,
  ALL = HORDE + ALLIANCE 
}
