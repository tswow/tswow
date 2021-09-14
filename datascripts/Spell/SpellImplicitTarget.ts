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
import { CellIndexWrapper } from "wotlkdata/cell/cells/CellArray";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { DBCUIntArrayCell } from "wotlkdata/dbc/DBCCell";

export class SpellImplicitTarget<T> extends EnumCell<T> {
    constructor(owner: T, cell: DBCUIntArrayCell<any>, index: number) {
        super(owner, new CellIndexWrapper(undefined, cell, index));
    }

    /** Enum Value:                                   1 */
    get UnitCaster()              { return this.value(1) }
    /** Enum Value:                                   2 */
    get UnitNearbyEnemy()         { return this.value(2) }
    /** Enum Value:                                   3 */
    get UnitNearbyAlly()          { return this.value(3) }
    /** Enum Value:                                   4 */
    get UnitNearbyParty()         { return this.value(4) }
    /** Enum Value:                                   5 */
    get UnitPet()                 { return this.value(5) }
    /** Enum Value:                                   6 */
    get UnitTargetEnemy()         { return this.value(6) }
    /** Enum Value:                                   7 */
    get UnitSrcAreaEntry()        { return this.value(7) }
    /** Enum Value:                                   8 */
    get UnitDestAreaEntry()       { return this.value(8) }
    /** Enum Value:                                   9 */
    get DestHome()                { return this.value(9) }
    /** Enum Value:                                   11 */
    get UnitSrcAreaUnk11()        { return this.value(11) }
    /** Enum Value:                                   15 */
    get UnitSrcAreaEnemy()        { return this.value(15) }
    /** Enum Value:                                   16 */
    get UnitDestAreaEnemy()       { return this.value(16) }
    /** Enum Value:                                   17 */
    get DestDb()                  { return this.value(17) }
    /** Enum Value:                                   18 */
    get DestCaster()              { return this.value(18) }
    /** Enum Value:                                   20 */
    get UnitCasterAreaParty()     { return this.value(20) }
    /** Enum Value:                                   21 */
    get UnitTargetAlly()          { return this.value(21) }
    /** Enum Value:                                   22 */
    get SrcCaster()               { return this.value(22) }
    /** Enum Value:                                   23 */
    get GameobjectTarget()        { return this.value(23) }
    /** Enum Value:                                   24 */
    get UnitConeEnemy24()         { return this.value(24) }
    /** Enum Value:                                   25 */
    get UnitTargetAny()           { return this.value(25) }
    /** Enum Value:                                   26 */
    get GameobjectItemTarget()    { return this.value(26) }
    /** Enum Value:                                   27 */
    get UnitMaster()              { return this.value(27) }
    /** Enum Value:                                   28 */
    get DestDynobjEnemy()         { return this.value(28) }
    /** Enum Value:                                   29 */
    get DestDynobjAlly()          { return this.value(29) }
    /** Enum Value:                                   30 */
    get UnitSrcAreaAlly()         { return this.value(30) }
    /** Enum Value:                                   31 */
    get UnitDestAreaAlly()        { return this.value(31) }
    /** Enum Value:                                   32 */
    get DestCasterSummon()        { return this.value(32) }
    /** Enum Value:                                   33 */
    get UnitSrcAreaParty()        { return this.value(33) }
    /** Enum Value:                                   34 */
    get UnitDestAreaParty()       { return this.value(34) }
    /** Enum Value:                                   35 */
    get UnitTargetParty()         { return this.value(35) }
    /** Enum Value:                                   36 */
    get DestCasterUnk36()         { return this.value(36) }
    /** Enum Value:                                   37 */
    get UnitLasttargetAreaParty() { return this.value(37) }
    /** Enum Value:                                   38 */
    get UnitNearbyEntry()         { return this.value(38) }
    /** Enum Value:                                   39 */
    get DestCasterFishing()       { return this.value(39) }
    /** Enum Value:                                   40 */
    get GameobjectNearbyEntry()   { return this.value(40) }
    /** Enum Value:                                   41 */
    get DestCasterFrontRight()    { return this.value(41) }
    /** Enum Value:                                   42 */
    get DestCasterBackRight()     { return this.value(42) }
    /** Enum Value:                                   43 */
    get DestCasterBackLeft()      { return this.value(43) }
    /** Enum Value:                                   44 */
    get DestCasterFrontLeft()     { return this.value(44) }
    /** Enum Value:                                   45 */
    get UnitTargetChainhealAlly() { return this.value(45) }
    /** Enum Value:                                   46 */
    get DestNearbyEntry()         { return this.value(46) }
    /** Enum Value:                                   47 */
    get DestCasterFront()         { return this.value(47) }
    /** Enum Value:                                   48 */
    get DestCasterBack()          { return this.value(48) }
    /** Enum Value:                                   49 */
    get DestCasterRight()         { return this.value(49) }
    /** Enum Value:                                   50 */
    get DestCasterLeft()          { return this.value(50) }
    /** Enum Value:                                   51 */
    get GameobjectSrcArea()       { return this.value(51) }
    /** Enum Value:                                   52 */
    get GameobjectDestArea()      { return this.value(52) }
    /** Enum Value:                                   53 */
    get DestTargetEnemy()         { return this.value(53) }
    /** Enum Value:                                   54 */
    get UnitConeEnemy54()         { return this.value(54) }
    /** Enum Value:                                   55 */
    get DestCasterFrontLeap()     { return this.value(55) }
    /** Enum Value:                                   56 */
    get UnitCasterAreaRaid()      { return this.value(56) }
    /** Enum Value:                                   57 */
    get UnitTargetRaid()          { return this.value(57) }
    /** Enum Value:                                   58 */
    get UnitNearbyRaid()          { return this.value(58) }
    /** Enum Value:                                   59 */
    get UnitConeAlly()            { return this.value(59) }
    /** Enum Value:                                   60 */
    get UnitConeEntry()           { return this.value(60) }
    /** Enum Value:                                   61 */
    get UnitTargetAreaRaidClass() { return this.value(61) }
    /** Enum Value:                                   62 */
    get Unk62()                   { return this.value(62) }
    /** Enum Value:                                   63 */
    get DestTargetAny()           { return this.value(63) }
    /** Enum Value:                                   64 */
    get DestTargetFront()         { return this.value(64) }
    /** Enum Value:                                   65 */
    get DestTargetBack()          { return this.value(65) }
    /** Enum Value:                                   66 */
    get DestTargetRight()         { return this.value(66) }
    /** Enum Value:                                   67 */
    get DestTargetLeft()          { return this.value(67) }
    /** Enum Value:                                   68 */
    get DestTargetFrontRight()    { return this.value(68) }
    /** Enum Value:                                   69 */
    get DestTargetBackRight()     { return this.value(69) }
    /** Enum Value:                                   70 */
    get DestTargetBackLeft()      { return this.value(70) }
    /** Enum Value:                                   71 */
    get DestTargetFrontLeft()     { return this.value(71) }
    /** Enum Value:                                   72 */
    get DestCasterRandom()        { return this.value(72) }
    /** Enum Value:                                   73 */
    get DestCasterRadius()        { return this.value(73) }
    /** Enum Value:                                   74 */
    get DestTargetRandom()        { return this.value(74) }
    /** Enum Value:                                   75 */
    get DestTargetRadius()        { return this.value(75) }
    /** Enum Value:                                   76 */
    get DestChannelTarget()       { return this.value(76) }
    /** Enum Value:                                   77 */
    get UnitChannelTarget()       { return this.value(77) }
    /** Enum Value:                                   78 */
    get DestDestFront()           { return this.value(78) }
    /** Enum Value:                                   79 */
    get DestDestBack()            { return this.value(79) }
    /** Enum Value:                                   80 */
    get DestDestRight()           { return this.value(80) }
    /** Enum Value:                                   81 */
    get DestDestLeft()            { return this.value(81) }
    /** Enum Value:                                   82 */
    get DestDestFrontRight()      { return this.value(82) }
    /** Enum Value:                                   83 */
    get DestDestBackRight()       { return this.value(83) }
    /** Enum Value:                                   84 */
    get DestDestBackLeft()        { return this.value(84) }
    /** Enum Value:                                   85 */
    get DestDestFrontLeft()       { return this.value(85) }
    /** Enum Value:                                   86 */
    get DestDestRandom()          { return this.value(86) }
    /** Enum Value:                                   87 */
    get DestDest()                { return this.value(87) }
    /** Enum Value:                                   88 */
    get DestDynobjNone()          { return this.value(88) }
    /** Enum Value:                                   89 */
    get DestTraj()                { return this.value(89) }
    /** Enum Value:                                   90 */
    get UnitTargetMinipet()       { return this.value(90) }
    /** Enum Value:                                   91 */
    get DestDestRadius()          { return this.value(91) }
    /** Enum Value:                                   92 */
    get UnitSummoner()            { return this.value(92) }
    /** Enum Value:                                   93 */
    get CorpseSrcAreaEnemy()      { return this.value(93) }
    /** Enum Value:                                   94 */
    get UnitVehicle()             { return this.value(94) }
    /** Enum Value:                                   95 */
    get UnitTargetPassenger()     { return this.value(95) }
    /** Enum Value:                                   96 */
    get UnitPassenger0()          { return this.value(96) }
    /** Enum Value:                                   97 */
    get UnitPassenger1()          { return this.value(97) }
    /** Enum Value:                                   98 */
    get UnitPassenger2()          { return this.value(98) }
    /** Enum Value:                                   99 */
    get UnitPassenger3()          { return this.value(99) }
    /** Enum Value:                                   100 */
    get UnitPassenger4()          { return this.value(100) }
    /** Enum Value:                                   101 */
    get UnitPassenger5()          { return this.value(101) }
    /** Enum Value:                                   102 */
    get UnitPassenger6()          { return this.value(102) }
    /** Enum Value:                                   103 */
    get UnitPassenger7()          { return this.value(103) }
    /** Enum Value:                                   104 */
    get UnitConeEnemy104()        { return this.value(104) }
    /** Enum Value:                                   105 */
    get UnitUnk105()              { return this.value(105) }
    /** Enum Value:                                   106 */
    get DestChannelCaster()       { return this.value(106) }
    /** Enum Value:                                   107 */
    get UnkDestAreaUnk107()       { return this.value(107) }
    /** Enum Value:                                   108 */
    get GameobjectCone()          { return this.value(108) }
    /** Enum Value:                                   110 */
    get UnitConeEntry110()        { return this.value(110) }
}