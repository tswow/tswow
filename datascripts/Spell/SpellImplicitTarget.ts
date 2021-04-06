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
import { Cell } from "wotlkdata/cell/Cell";
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { DBCUIntArrayCell } from "wotlkdata/dbc/DBCCell";
import { SpellEffect } from "./SpellEffect";

export class SpellImplicitTarget extends Enum<SpellEffect> {
    constructor(owner: SpellEffect, cell: DBCUIntArrayCell<any>, index: number) {
        super(owner, Cell.wrapIndex(cell, index));
    }

    /** No Comment (yet!) */
    @EnumField(1)
    setUnitCaster() { return this.set(1); }

    /** No Comment (yet!) */
    @EnumField(2)
    setUnitNearbyEnemy() { return this.set(2); }

    /** No Comment (yet!) */
    @EnumField(3)
    setUnitNearbyAlly() { return this.set(3); }

    /** No Comment (yet!) */
    @EnumField(4)
    setUnitNearbyParty() { return this.set(4); }

    /** No Comment (yet!) */
    @EnumField(5)
    setUnitPet() { return this.set(5); }

    /** No Comment (yet!) */
    @EnumField(6)
    setUnitTargetEnemy() { return this.set(6); }

    /** No Comment (yet!) */
    @EnumField(7)
    setUnitSrcAreaEntry() { return this.set(7); }

    /** No Comment (yet!) */
    @EnumField(8)
    setUnitDestAreaEntry() { return this.set(8); }

    /** No Comment (yet!) */
    @EnumField(9)
    setDestHome() { return this.set(9); }

    /** No Comment (yet!) */
    @EnumField(11)
    setUnitSrcAreaUnk11() { return this.set(11); }

    /** No Comment (yet!) */
    @EnumField(15)
    setUnitSrcAreaEnemy() { return this.set(15); }

    /** No Comment (yet!) */
    @EnumField(16)
    setUnitDestAreaEnemy() { return this.set(16); }

    /** No Comment (yet!) */
    @EnumField(17)
    setDestDb() { return this.set(17); }

    /** No Comment (yet!) */
    @EnumField(18)
    setDestCaster() { return this.set(18); }

    /** No Comment (yet!) */
    @EnumField(20)
    setUnitCasterAreaParty() { return this.set(20); }

    /** No Comment (yet!) */
    @EnumField(21)
    setUnitTargetAlly() { return this.set(21); }

    /** No Comment (yet!) */
    @EnumField(22)
    setSrcCaster() { return this.set(22); }

    /** No Comment (yet!) */
    @EnumField(23)
    setGameobjectTarget() { return this.set(23); }

    /** No Comment (yet!) */
    @EnumField(24)
    setUnitConeEnemy24() { return this.set(24); }

    /** No Comment (yet!) */
    @EnumField(25)
    setUnitTargetAny() { return this.set(25); }

    /** No Comment (yet!) */
    @EnumField(26)
    setGameobjectItemTarget() { return this.set(26); }

    /** No Comment (yet!) */
    @EnumField(27)
    setUnitMaster() { return this.set(27); }

    /** No Comment (yet!) */
    @EnumField(28)
    setDestDynobjEnemy() { return this.set(28); }

    /** No Comment (yet!) */
    @EnumField(29)
    setDestDynobjAlly() { return this.set(29); }

    /** No Comment (yet!) */
    @EnumField(30)
    setUnitSrcAreaAlly() { return this.set(30); }

    /** No Comment (yet!) */
    @EnumField(31)
    setUnitDestAreaAlly() { return this.set(31); }

    /** No Comment (yet!) */
    @EnumField(32)
    setDestCasterSummon() { return this.set(32); }

    /** No Comment (yet!) */
    @EnumField(33)
    setUnitSrcAreaParty() { return this.set(33); }

    /** No Comment (yet!) */
    @EnumField(34)
    setUnitDestAreaParty() { return this.set(34); }

    /** No Comment (yet!) */
    @EnumField(35)
    setUnitTargetParty() { return this.set(35); }

    /** No Comment (yet!) */
    @EnumField(36)
    setDestCasterUnk36() { return this.set(36); }

    /** No Comment (yet!) */
    @EnumField(37)
    setUnitLasttargetAreaParty() { return this.set(37); }

    /** No Comment (yet!) */
    @EnumField(38)
    setUnitNearbyEntry() { return this.set(38); }

    /** No Comment (yet!) */
    @EnumField(39)
    setDestCasterFishing() { return this.set(39); }

    /** No Comment (yet!) */
    @EnumField(40)
    setGameobjectNearbyEntry() { return this.set(40); }

    /** No Comment (yet!) */
    @EnumField(41)
    setDestCasterFrontRight() { return this.set(41); }

    /** No Comment (yet!) */
    @EnumField(42)
    setDestCasterBackRight() { return this.set(42); }

    /** No Comment (yet!) */
    @EnumField(43)
    setDestCasterBackLeft() { return this.set(43); }

    /** No Comment (yet!) */
    @EnumField(44)
    setDestCasterFrontLeft() { return this.set(44); }

    /** No Comment (yet!) */
    @EnumField(45)
    setUnitTargetChainhealAlly() { return this.set(45); }

    /** No Comment (yet!) */
    @EnumField(46)
    setDestNearbyEntry() { return this.set(46); }

    /** No Comment (yet!) */
    @EnumField(47)
    setDestCasterFront() { return this.set(47); }

    /** No Comment (yet!) */
    @EnumField(48)
    setDestCasterBack() { return this.set(48); }

    /** No Comment (yet!) */
    @EnumField(49)
    setDestCasterRight() { return this.set(49); }

    /** No Comment (yet!) */
    @EnumField(50)
    setDestCasterLeft() { return this.set(50); }

    /** No Comment (yet!) */
    @EnumField(51)
    setGameobjectSrcArea() { return this.set(51); }

    /** No Comment (yet!) */
    @EnumField(52)
    setGameobjectDestArea() { return this.set(52); }

    /** No Comment (yet!) */
    @EnumField(53)
    setDestTargetEnemy() { return this.set(53); }

    /** No Comment (yet!) */
    @EnumField(54)
    setUnitConeEnemy54() { return this.set(54); }

    /** No Comment (yet!) */
    @EnumField(55)
    setDestCasterFrontLeap() { return this.set(55); }

    /** No Comment (yet!) */
    @EnumField(56)
    setUnitCasterAreaRaid() { return this.set(56); }

    /** No Comment (yet!) */
    @EnumField(57)
    setUnitTargetRaid() { return this.set(57); }

    /** No Comment (yet!) */
    @EnumField(58)
    setUnitNearbyRaid() { return this.set(58); }

    /** No Comment (yet!) */
    @EnumField(59)
    setUnitConeAlly() { return this.set(59); }

    /** No Comment (yet!) */
    @EnumField(60)
    setUnitConeEntry() { return this.set(60); }

    /** No Comment (yet!) */
    @EnumField(61)
    setUnitTargetAreaRaidClass() { return this.set(61); }

    /** No Comment (yet!) */
    @EnumField(62)
    setUnk62() { return this.set(62); }

    /** No Comment (yet!) */
    @EnumField(63)
    setDestTargetAny() { return this.set(63); }

    /** No Comment (yet!) */
    @EnumField(64)
    setDestTargetFront() { return this.set(64); }

    /** No Comment (yet!) */
    @EnumField(65)
    setDestTargetBack() { return this.set(65); }

    /** No Comment (yet!) */
    @EnumField(66)
    setDestTargetRight() { return this.set(66); }

    /** No Comment (yet!) */
    @EnumField(67)
    setDestTargetLeft() { return this.set(67); }

    /** No Comment (yet!) */
    @EnumField(68)
    setDestTargetFrontRight() { return this.set(68); }

    /** No Comment (yet!) */
    @EnumField(69)
    setDestTargetBackRight() { return this.set(69); }

    /** No Comment (yet!) */
    @EnumField(70)
    setDestTargetBackLeft() { return this.set(70); }

    /** No Comment (yet!) */
    @EnumField(71)
    setDestTargetFrontLeft() { return this.set(71); }

    /** No Comment (yet!) */
    @EnumField(72)
    setDestCasterRandom() { return this.set(72); }

    /** No Comment (yet!) */
    @EnumField(73)
    setDestCasterRadius() { return this.set(73); }

    /** No Comment (yet!) */
    @EnumField(74)
    setDestTargetRandom() { return this.set(74); }

    /** No Comment (yet!) */
    @EnumField(75)
    setDestTargetRadius() { return this.set(75); }

    /** No Comment (yet!) */
    @EnumField(76)
    setDestChannelTarget() { return this.set(76); }

    /** No Comment (yet!) */
    @EnumField(77)
    setUnitChannelTarget() { return this.set(77); }

    /** No Comment (yet!) */
    @EnumField(78)
    setDestDestFront() { return this.set(78); }

    /** No Comment (yet!) */
    @EnumField(79)
    setDestDestBack() { return this.set(79); }

    /** No Comment (yet!) */
    @EnumField(80)
    setDestDestRight() { return this.set(80); }

    /** No Comment (yet!) */
    @EnumField(81)
    setDestDestLeft() { return this.set(81); }

    /** No Comment (yet!) */
    @EnumField(82)
    setDestDestFrontRight() { return this.set(82); }

    /** No Comment (yet!) */
    @EnumField(83)
    setDestDestBackRight() { return this.set(83); }

    /** No Comment (yet!) */
    @EnumField(84)
    setDestDestBackLeft() { return this.set(84); }

    /** No Comment (yet!) */
    @EnumField(85)
    setDestDestFrontLeft() { return this.set(85); }

    /** No Comment (yet!) */
    @EnumField(86)
    setDestDestRandom() { return this.set(86); }

    /** No Comment (yet!) */
    @EnumField(87)
    setDestDest() { return this.set(87); }

    /** No Comment (yet!) */
    @EnumField(88)
    setDestDynobjNone() { return this.set(88); }

    /** No Comment (yet!) */
    @EnumField(89)
    setDestTraj() { return this.set(89); }

    /** No Comment (yet!) */
    @EnumField(90)
    setUnitTargetMinipet() { return this.set(90); }

    /** No Comment (yet!) */
    @EnumField(91)
    setDestDestRadius() { return this.set(91); }

    /** No Comment (yet!) */
    @EnumField(92)
    setUnitSummoner() { return this.set(92); }

    /** No Comment (yet!) */
    @EnumField(93)
    setCorpseSrcAreaEnemy() { return this.set(93); }

    /** No Comment (yet!) */
    @EnumField(94)
    setUnitVehicle() { return this.set(94); }

    /** No Comment (yet!) */
    @EnumField(95)
    setUnitTargetPassenger() { return this.set(95); }

    /** No Comment (yet!) */
    @EnumField(96)
    setUnitPassenger0() { return this.set(96); }

    /** No Comment (yet!) */
    @EnumField(97)
    setUnitPassenger1() { return this.set(97); }

    /** No Comment (yet!) */
    @EnumField(98)
    setUnitPassenger2() { return this.set(98); }

    /** No Comment (yet!) */
    @EnumField(99)
    setUnitPassenger3() { return this.set(99); }

    /** No Comment (yet!) */
    @EnumField(100)
    setUnitPassenger4() { return this.set(100); }

    /** No Comment (yet!) */
    @EnumField(101)
    setUnitPassenger5() { return this.set(101); }

    /** No Comment (yet!) */
    @EnumField(102)
    setUnitPassenger6() { return this.set(102); }

    /** No Comment (yet!) */
    @EnumField(103)
    setUnitPassenger7() { return this.set(103); }

    /** No Comment (yet!) */
    @EnumField(104)
    setUnitConeEnemy104() { return this.set(104); }

    /** No Comment (yet!) */
    @EnumField(105)
    setUnitUnk105() { return this.set(105); }

    /** No Comment (yet!) */
    @EnumField(106)
    setDestChannelCaster() { return this.set(106); }

    /** No Comment (yet!) */
    @EnumField(107)
    setUnkDestAreaUnk107() { return this.set(107); }

    /** No Comment (yet!) */
    @EnumField(108)
    setGameobjectCone() { return this.set(108); }

    /** No Comment (yet!) */
    @EnumField(110)
    setUnitConeEntry110() { return this.set(110); }
}