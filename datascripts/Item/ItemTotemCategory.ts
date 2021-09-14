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
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { ItemTemplate } from "./ItemTemplate";

export class ItemTotemCategory extends EnumCell<ItemTemplate> {
    /** Enum Value:                                  1 */
    get SkinningKnife()          { return this.value(1) }
    /** Enum Value:                                  2 */
    get EarthTotem()             { return this.value(2) }
    /** Enum Value:                                  3 */
    get AirTotem()               { return this.value(3) }
    /** Enum Value:                                  4 */
    get FireTotem()              { return this.value(4) }
    /** Enum Value:                                  5 */
    get WaterTotem()             { return this.value(5) }
    /** Enum Value:                                  6 */
    get RunedCopperRod()         { return this.value(6) }
    /** Enum Value:                                  7 */
    get RunedSilverRod()         { return this.value(7) }
    /** Enum Value:                                  8 */
    get RunedGoldenRod()         { return this.value(8) }
    /** Enum Value:                                  9 */
    get RunedTruesilverRod()     { return this.value(9) }
    /** Enum Value:                                  10 */
    get RunedArcaniteRod()       { return this.value(10) }
    /** Enum Value:                                  11 */
    get MiningPick()             { return this.value(11) }
    /** Enum Value:                                  12 */
    get PhilosophersStone()      { return this.value(12) }
    /** Enum Value:                                  13 */
    get BlacksmithHammer()       { return this.value(13) }
    /** Enum Value:                                  14 */
    get ArclightSpanner()        { return this.value(14) }
    /** Enum Value:                                  15 */
    get GyromaticMicroAdjustor() { return this.value(15) }
    /** Enum Value:                                  21 */
    get MasterTotem()            { return this.value(21) }
    /** Enum Value:                                  41 */
    get RunedFelIronRod()        { return this.value(41) }
    /** Enum Value:                                  62 */
    get RunedAdamantiteRod()     { return this.value(62) }
    /** Enum Value:                                  63 */
    get RunedEterniumRod()       { return this.value(63) }
    /** Enum Value:                                  81 */
    get HollowQuill()            { return this.value(81) }
    /** Enum Value:                                  101 */
    get RunedAzuriteRod()        { return this.value(101) }
    /** Enum Value:                                  121 */
    get VirtuosoInkingSet()      { return this.value(121) }
    /** Enum Value:                                  141 */
    get Drums()                  { return this.value(141) }
    /** Enum Value:                                  161 */
    get GnomishArmyKnife()       { return this.value(161) }
    /** Enum Value:                                  162 */
    get BlacksmithHammer2()      { return this.value(162) }
    /** Enum Value:                                  165 */
    get MiningPick2()            { return this.value(165) }
    /** Enum Value:                                  166 */
    get SkinningKnife2()         { return this.value(166) }
    /** Enum Value:                                  167 */
    get HammerPick()             { return this.value(167) }
    /** Enum Value:                                  168 */
    get BladedPickaxe()          { return this.value(168) }
    /** Enum Value:                                  169 */
    get FlintAndTinder()         { return this.value(169) }
    /** Enum Value:                                  189 */
    get RunedCobaltRod()         { return this.value(189) }
    /** Enum Value:                                  190 */
    get RunedTitaniumRod()       { return this.value(190) }
}