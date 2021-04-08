import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";

export class SpellAnimation<T> extends Enum<T> {
    @EnumField(0)
    setStand() { return this.set(0) }
    
    @EnumField(1)
    setDeath() { return this.set(1) }
    
    @EnumField(2)
    setSpell() { return this.set(2) }
    
    @EnumField(3)
    setStop() { return this.set(3) }
    
    @EnumField(4)
    setWalk() { return this.set(4) }
    
    @EnumField(5)
    setRun() { return this.set(5) }
    
    @EnumField(6)
    setDead() { return this.set(6) }
    
    @EnumField(7)
    setRise() { return this.set(7) }
    
    @EnumField(8)
    setStandWound() { return this.set(8) }
    
    @EnumField(9)
    setCombatWound() { return this.set(9) }
    
    @EnumField(10)
    setCombatCritical() { return this.set(10) }
    
    @EnumField(11)
    setShuffleLeft() { return this.set(11) }
    
    @EnumField(12)
    setShuffleRight() { return this.set(12) }
    
    @EnumField(13)
    setWalkbackwards() { return this.set(13) }
    
    @EnumField(14)
    setStun() { return this.set(14) }
    
    @EnumField(15)
    setHandsClosed() { return this.set(15) }
    
    @EnumField(16)
    setAttackUnarmed() { return this.set(16) }
    
    @EnumField(17)
    setAttack1H() { return this.set(17) }
    
    @EnumField(18)
    setAttack2H() { return this.set(18) }
    
    @EnumField(19)
    setAttack2HL() { return this.set(19) }
    
    @EnumField(20)
    setParryUnarmed() { return this.set(20) }
    
    @EnumField(21)
    setParry1H() { return this.set(21) }
    
    @EnumField(22)
    setParry2H() { return this.set(22) }
    
    @EnumField(23)
    setParry2HL() { return this.set(23) }
    
    @EnumField(24)
    setShieldBlock() { return this.set(24) }
    
    @EnumField(25)
    setReadyUnarmed() { return this.set(25) }
    
    @EnumField(26)
    setReady1H() { return this.set(26) }
    
    @EnumField(27)
    setReady2H() { return this.set(27) }
    
    @EnumField(28)
    setReady2HL() { return this.set(28) }
    
    @EnumField(29)
    setReadyBow() { return this.set(29) }
    
    @EnumField(30)
    setDodge() { return this.set(30) }
    
    @EnumField(31)
    setSpellPrecast() { return this.set(31) }
    
    @EnumField(32)
    setSpellCast() { return this.set(32) }
    
    @EnumField(33)
    setSpellCastArea() { return this.set(33) }
    
    @EnumField(34)
    setNPCWelcome() { return this.set(34) }
    
    @EnumField(35)
    setNPCGoodbye() { return this.set(35) }
    
    @EnumField(36)
    setBlock() { return this.set(36) }
    
    @EnumField(37)
    setJumpStart() { return this.set(37) }
    
    @EnumField(38)
    setJump() { return this.set(38) }
    
    @EnumField(39)
    setJumpEnd() { return this.set(39) }
    
    @EnumField(40)
    setFall() { return this.set(40) }
    
    @EnumField(41)
    setSwimIdle() { return this.set(41) }
    
    @EnumField(42)
    setSwim() { return this.set(42) }
    
    @EnumField(43)
    setSwimLeft() { return this.set(43) }
    
    @EnumField(44)
    setSwimRight() { return this.set(44) }
    
    @EnumField(45)
    setSwimBackwards() { return this.set(45) }
    
    @EnumField(46)
    setAttackBow() { return this.set(46) }
    
    @EnumField(47)
    setFireBow() { return this.set(47) }
    
    @EnumField(48)
    setReadyRifle() { return this.set(48) }
    
    @EnumField(49)
    setAttackRifle() { return this.set(49) }
    
    @EnumField(50)
    setLoot() { return this.set(50) }
    
    @EnumField(51)
    setReadySpellDirected() { return this.set(51) }
    
    @EnumField(52)
    setReadySpellOmni() { return this.set(52) }
    
    @EnumField(53)
    setSpellCastDirected() { return this.set(53) }
    
    @EnumField(54)
    setSpellCastOmni() { return this.set(54) }
    
    @EnumField(55)
    setBattleRoar() { return this.set(55) }
    
    @EnumField(56)
    setReadyAbility() { return this.set(56) }
    
    @EnumField(57)
    setSpecial1H() { return this.set(57) }
    
    @EnumField(58)
    setSpecial2H() { return this.set(58) }
    
    @EnumField(59)
    setShieldBash() { return this.set(59) }
    
    @EnumField(60)
    setEmoteTalk() { return this.set(60) }
    
    @EnumField(61)
    setEmoteEat() { return this.set(61) }
    
    @EnumField(62)
    setEmoteWork() { return this.set(62) }
    
    @EnumField(63)
    setEmoteUseStanding() { return this.set(63) }
    
    @EnumField(64)
    setEmoteTalkExclamation() { return this.set(64) }
    
    @EnumField(65)
    setEmoteTalkQuestion() { return this.set(65) }
    
    @EnumField(66)
    setEmoteBow() { return this.set(66) }
    
    @EnumField(67)
    setEmoteWave() { return this.set(67) }
    
    @EnumField(68)
    setEmoteCheer() { return this.set(68) }
    
    @EnumField(69)
    setEmoteDance() { return this.set(69) }
    
    @EnumField(70)
    setEmoteLaugh() { return this.set(70) }
    
    @EnumField(71)
    setEmoteSleep() { return this.set(71) }
    
    @EnumField(72)
    setEmoteSitGround() { return this.set(72) }
    
    @EnumField(73)
    setEmoteRude() { return this.set(73) }
    
    @EnumField(74)
    setEmoteRoar() { return this.set(74) }
    
    @EnumField(75)
    setEmoteKneel() { return this.set(75) }
    
    @EnumField(76)
    setEmoteKiss() { return this.set(76) }
    
    @EnumField(77)
    setEmoteCry() { return this.set(77) }
    
    @EnumField(78)
    setEmoteChicken() { return this.set(78) }
    
    @EnumField(79)
    setEmoteBeg() { return this.set(79) }
    
    @EnumField(80)
    setEmoteApplaud() { return this.set(80) }
    
    @EnumField(81)
    setEmoteShout() { return this.set(81) }
    
    @EnumField(82)
    setEmoteFlex() { return this.set(82) }
    
    @EnumField(83)
    setEmoteShy() { return this.set(83) }
    
    @EnumField(84)
    setEmotePoint() { return this.set(84) }
    
    @EnumField(85)
    setAttack1HPierce() { return this.set(85) }
    
    @EnumField(86)
    setAttack2HLoosePierce() { return this.set(86) }
    
    @EnumField(87)
    setAttackOff() { return this.set(87) }
    
    @EnumField(88)
    setAttackOffPierce() { return this.set(88) }
    
    @EnumField(89)
    setSheath() { return this.set(89) }
    
    @EnumField(90)
    setHipSheath() { return this.set(90) }
    
    @EnumField(91)
    setMount() { return this.set(91) }
    
    @EnumField(92)
    setRunRight() { return this.set(92) }
    
    @EnumField(93)
    setRunLeft() { return this.set(93) }
    
    @EnumField(94)
    setMountSpecial() { return this.set(94) }
    
    @EnumField(95)
    setKick() { return this.set(95) }
    
    @EnumField(96)
    setSitGroundDown() { return this.set(96) }
    
    @EnumField(97)
    setSitGround() { return this.set(97) }
    
    @EnumField(98)
    setSitGroundUp() { return this.set(98) }
    
    @EnumField(99)
    setSleepDown() { return this.set(99) }
    
    @EnumField(100)
    setSleep() { return this.set(100) }
    
    @EnumField(101)
    setSleepUp() { return this.set(101) }
    
    @EnumField(102)
    setSitChairLow() { return this.set(102) }
    
    @EnumField(103)
    setSitChairMed() { return this.set(103) }
    
    @EnumField(104)
    setSitChairHigh() { return this.set(104) }
    
    @EnumField(105)
    setLoadBow() { return this.set(105) }
    
    @EnumField(106)
    setLoadRifle() { return this.set(106) }
    
    @EnumField(107)
    setAttackThrown() { return this.set(107) }
    
    @EnumField(108)
    setReadyThrown() { return this.set(108) }
    
    @EnumField(109)
    setHoldBow() { return this.set(109) }
    
    @EnumField(110)
    setHoldRifle() { return this.set(110) }
    
    @EnumField(111)
    setHoldThrown() { return this.set(111) }
    
    @EnumField(112)
    setLoadThrown() { return this.set(112) }
    
    @EnumField(113)
    setEmoteSalute() { return this.set(113) }
    
    @EnumField(114)
    setKneelStart() { return this.set(114) }
    
    @EnumField(115)
    setKneelLoop() { return this.set(115) }
    
    @EnumField(116)
    setKneelEnd() { return this.set(116) }
    
    @EnumField(117)
    setAttackUnarmedOff() { return this.set(117) }
    
    @EnumField(118)
    setSpecialUnarmed() { return this.set(118) }
    
    @EnumField(119)
    setStealthWalk() { return this.set(119) }
    
    @EnumField(120)
    setStealthStand() { return this.set(120) }
    
    @EnumField(121)
    setKnockdown() { return this.set(121) }
    
    @EnumField(122)
    setEatingLoop() { return this.set(122) }
    
    @EnumField(123)
    setUseStandingLoop() { return this.set(123) }
    
    @EnumField(124)
    setChannelCastDirected() { return this.set(124) }
    
    @EnumField(125)
    setChannelCastOmni() { return this.set(125) }
    
    @EnumField(126)
    setWhirlwind() { return this.set(126) }
    
    @EnumField(127)
    setBirth() { return this.set(127) }
    
    @EnumField(128)
    setUseStandingStart() { return this.set(128) }
    
    @EnumField(129)
    setUseStandingEnd() { return this.set(129) }
    
    @EnumField(130)
    setCreatureSpecial() { return this.set(130) }
    
    @EnumField(131)
    setDrown() { return this.set(131) }
    
    @EnumField(132)
    setDrowned() { return this.set(132) }
    
    @EnumField(133)
    setFishingCast() { return this.set(133) }
    
    @EnumField(134)
    setFishingLoop() { return this.set(134) }
    
    @EnumField(135)
    setFly() { return this.set(135) }
    
    @EnumField(136)
    setEmoteWorkNoSheathe() { return this.set(136) }
    
    @EnumField(137)
    setEmoteStunNoSheathe() { return this.set(137) }
    
    @EnumField(138)
    setEmoteUseStandingNoSheathe() { return this.set(138) }
    
    @EnumField(139)
    setSpellSleepDown() { return this.set(139) }
    
    @EnumField(140)
    setSpellKneelStart() { return this.set(140) }
    
    @EnumField(141)
    setSpellKneelLoop() { return this.set(141) }
    
    @EnumField(142)
    setSpellKneelEnd() { return this.set(142) }
    
    @EnumField(143)
    setSprint() { return this.set(143) }
    
    @EnumField(144)
    setInFlight() { return this.set(144) }
    
    @EnumField(145)
    setSpawn() { return this.set(145) }
    
    @EnumField(146)
    setClose() { return this.set(146) }
    
    @EnumField(147)
    setClosed() { return this.set(147) }
    
    @EnumField(148)
    setOpen() { return this.set(148) }
    
    @EnumField(149)
    setOpened() { return this.set(149) }
    
    @EnumField(150)
    setDestroy() { return this.set(150) }
    
    @EnumField(151)
    setDestroyed() { return this.set(151) }
    
    @EnumField(152)
    setRebuild() { return this.set(152) }
    
    @EnumField(153)
    setCustom0() { return this.set(153) }
    
    @EnumField(154)
    setCustom1() { return this.set(154) }
    
    @EnumField(155)
    setCustom2() { return this.set(155) }
    
    @EnumField(156)
    setCustom3() { return this.set(156) }
    
    @EnumField(157)
    setDespawn() { return this.set(157) }
    
    @EnumField(158)
    setHold() { return this.set(158) }
    
    @EnumField(159)
    setDecay() { return this.set(159) }
    
    @EnumField(160)
    setBowPull() { return this.set(160) }
    
    @EnumField(161)
    setBowRelease() { return this.set(161) }
    
    @EnumField(162)
    setShipStart() { return this.set(162) }
    
    @EnumField(163)
    setShipMoving() { return this.set(163) }
    
    @EnumField(164)
    setShipStop() { return this.set(164) }
    
    @EnumField(165)
    setGroupArrow() { return this.set(165) }
    
    @EnumField(166)
    setArrow() { return this.set(166) }
    
    @EnumField(167)
    setCorpseArrow() { return this.set(167) }
    
    @EnumField(168)
    setGuideArrow() { return this.set(168) }
    
    @EnumField(169)
    setSway() { return this.set(169) }
    
    @EnumField(170)
    setDruidCatPounce() { return this.set(170) }
    
    @EnumField(171)
    setDruidCatRip() { return this.set(171) }
    
    @EnumField(172)
    setDruidCatRake() { return this.set(172) }
    
    @EnumField(173)
    setDruidCatRavage() { return this.set(173) }
    
    @EnumField(174)
    setDruidCatClaw() { return this.set(174) }
    
    @EnumField(175)
    setDruidCatCower() { return this.set(175) }
    
    @EnumField(176)
    setDruidBearSwipe() { return this.set(176) }
    
    @EnumField(177)
    setDruidBearBite() { return this.set(177) }
    
    @EnumField(178)
    setDruidBearMaul() { return this.set(178) }
    
    @EnumField(179)
    setDruidBearBash() { return this.set(179) }
    
    @EnumField(180)
    setDragonTail() { return this.set(180) }
    
    @EnumField(181)
    setDragonStomp() { return this.set(181) }
    
    @EnumField(182)
    setDragonSpit() { return this.set(182) }
    
    @EnumField(183)
    setDragonSpitHover() { return this.set(183) }
    
    @EnumField(184)
    setDragonSpitFly() { return this.set(184) }
    
    @EnumField(185)
    setEmoteYes() { return this.set(185) }
    
    @EnumField(186)
    setEmoteNo() { return this.set(186) }
    
    @EnumField(187)
    setJumpLandRun() { return this.set(187) }
    
    @EnumField(188)
    setLootHold() { return this.set(188) }
    
    @EnumField(189)
    setLootUp() { return this.set(189) }
    
    @EnumField(190)
    setStandHigh() { return this.set(190) }
    
    @EnumField(191)
    setImpact() { return this.set(191) }
    
    @EnumField(192)
    setLiftOff() { return this.set(192) }
    
    @EnumField(193)
    setHover() { return this.set(193) }
    
    @EnumField(194)
    setSuccubusEntice() { return this.set(194) }
    
    @EnumField(195)
    setEmoteTrain() { return this.set(195) }
    
    @EnumField(196)
    setEmoteDead() { return this.set(196) }
    
    @EnumField(197)
    setEmoteDanceOnce() { return this.set(197) }
    
    @EnumField(198)
    setDeflect() { return this.set(198) }
    
    @EnumField(199)
    setEmoteEatNoSheathe() { return this.set(199) }
    
    @EnumField(200)
    setLand() { return this.set(200) }
    
    @EnumField(201)
    setSubmerge() { return this.set(201) }
    
    @EnumField(202)
    setSubmerged() { return this.set(202) }
    
    @EnumField(203)
    setCannibalize() { return this.set(203) }
    
    @EnumField(204)
    setArrowBirth() { return this.set(204) }
    
    @EnumField(205)
    setGroupArrowBirth() { return this.set(205) }
    
    @EnumField(206)
    setCorpseArrowBirth() { return this.set(206) }
    
    @EnumField(207)
    setGuideArrowBirth() { return this.set(207) }
    
    @EnumField(208)
    setEmoteTalkNoSheathe() { return this.set(208) }
    
    @EnumField(209)
    setEmotePointNoSheathe() { return this.set(209) }
    
    @EnumField(210)
    setEmoteSaluteNoSheathe() { return this.set(210) }
    
    @EnumField(211)
    setEmoteDanceSpecial() { return this.set(211) }
    
    @EnumField(212)
    setMutilate() { return this.set(212) }
    
    @EnumField(213)
    setCustomSpell01() { return this.set(213) }
    
    @EnumField(214)
    setCustomSpell02() { return this.set(214) }
    
    @EnumField(215)
    setCustomSpell03() { return this.set(215) }
    
    @EnumField(216)
    setCustomSpell04() { return this.set(216) }
    
    @EnumField(217)
    setCustomSpell05() { return this.set(217) }
    
    @EnumField(218)
    setCustomSpell06() { return this.set(218) }
    
    @EnumField(219)
    setCustomSpell07() { return this.set(219) }
    
    @EnumField(220)
    setCustomSpell08() { return this.set(220) }
    
    @EnumField(221)
    setCustomSpell09() { return this.set(221) }
    
    @EnumField(222)
    setCustomSpell10() { return this.set(222) }
    
    @EnumField(223)
    setStealthRun() { return this.set(223) }
    
    @EnumField(224)
    setEmerge() { return this.set(224) }
    
    @EnumField(225)
    setCower() { return this.set(225) }
    
    @EnumField(226)
    setGrab() { return this.set(226) }
    
    @EnumField(227)
    setGrabClosed() { return this.set(227) }
    
    @EnumField(228)
    setGrabThrown() { return this.set(228) }
    
    @EnumField(229)
    setFlyStand() { return this.set(229) }
    
    @EnumField(230)
    setFlyDeath() { return this.set(230) }
    
    @EnumField(231)
    setFlySpell() { return this.set(231) }
    
    @EnumField(232)
    setFlyStop() { return this.set(232) }
    
    @EnumField(233)
    setFlyWalk() { return this.set(233) }
    
    @EnumField(234)
    setFlyRun() { return this.set(234) }
    
    @EnumField(235)
    setFlyDead() { return this.set(235) }
    
    @EnumField(236)
    setFlyRise() { return this.set(236) }
    
    @EnumField(237)
    setFlyStandWound() { return this.set(237) }
    
    @EnumField(238)
    setFlyCombatWound() { return this.set(238) }
    
    @EnumField(239)
    setFlyCombatCritical() { return this.set(239) }
    
    @EnumField(240)
    setFlyShuffleLeft() { return this.set(240) }
    
    @EnumField(241)
    setFlyShuffleRight() { return this.set(241) }
    
    @EnumField(242)
    setFlyWalkbackwards() { return this.set(242) }
    
    @EnumField(243)
    setFlyStun() { return this.set(243) }
    
    @EnumField(244)
    setFlyHandsClosed() { return this.set(244) }
    
    @EnumField(245)
    setFlyAttackUnarmed() { return this.set(245) }
    
    @EnumField(246)
    setFlyAttack1H() { return this.set(246) }
    
    @EnumField(247)
    setFlyAttack2H() { return this.set(247) }
    
    @EnumField(248)
    setFlyAttack2HL() { return this.set(248) }
    
    @EnumField(249)
    setFlyParryUnarmed() { return this.set(249) }
    
    @EnumField(250)
    setFlyParry1H() { return this.set(250) }
    
    @EnumField(251)
    setFlyParry2H() { return this.set(251) }
    
    @EnumField(252)
    setFlyParry2HL() { return this.set(252) }
    
    @EnumField(253)
    setFlyShieldBlock() { return this.set(253) }
    
    @EnumField(254)
    setFlyReadyUnarmed() { return this.set(254) }
    
    @EnumField(255)
    setFlyReady1H() { return this.set(255) }
    
    @EnumField(256)
    setFlyReady2H() { return this.set(256) }
    
    @EnumField(257)
    setFlyReady2HL() { return this.set(257) }
    
    @EnumField(258)
    setFlyReadyBow() { return this.set(258) }
    
    @EnumField(259)
    setFlyDodge() { return this.set(259) }
    
    @EnumField(260)
    setFlySpellPrecast() { return this.set(260) }
    
    @EnumField(261)
    setFlySpellCast() { return this.set(261) }
    
    @EnumField(262)
    setFlySpellCastArea() { return this.set(262) }
    
    @EnumField(263)
    setFlyNPCWelcome() { return this.set(263) }
    
    @EnumField(264)
    setFlyNPCGoodbye() { return this.set(264) }
    
    @EnumField(265)
    setFlyBlock() { return this.set(265) }
    
    @EnumField(266)
    setFlyJumpStart() { return this.set(266) }
    
    @EnumField(267)
    setFlyJump() { return this.set(267) }
    
    @EnumField(268)
    setFlyJumpEnd() { return this.set(268) }
    
    @EnumField(269)
    setFlyFall() { return this.set(269) }
    
    @EnumField(270)
    setFlySwimIdle() { return this.set(270) }
    
    @EnumField(271)
    setFlySwim() { return this.set(271) }
    
    @EnumField(272)
    setFlySwimLeft() { return this.set(272) }
    
    @EnumField(273)
    setFlySwimRight() { return this.set(273) }
    
    @EnumField(274)
    setFlySwimBackwards() { return this.set(274) }
    
    @EnumField(275)
    setFlyAttackBow() { return this.set(275) }
    
    @EnumField(276)
    setFlyFireBow() { return this.set(276) }
    
    @EnumField(277)
    setFlyReadyRifle() { return this.set(277) }
    
    @EnumField(278)
    setFlyAttackRifle() { return this.set(278) }
    
    @EnumField(279)
    setFlyLoot() { return this.set(279) }
    
    @EnumField(280)
    setFlyReadySpellDirected() { return this.set(280) }
    
    @EnumField(281)
    setFlyReadySpellOmni() { return this.set(281) }
    
    @EnumField(282)
    setFlySpellCastDirected() { return this.set(282) }
    
    @EnumField(283)
    setFlySpellCastOmni() { return this.set(283) }
    
    @EnumField(284)
    setFlyBattleRoar() { return this.set(284) }
    
    @EnumField(285)
    setFlyReadyAbility() { return this.set(285) }
    
    @EnumField(286)
    setFlySpecial1H() { return this.set(286) }
    
    @EnumField(287)
    setFlySpecial2H() { return this.set(287) }
    
    @EnumField(288)
    setFlyShieldBash() { return this.set(288) }
    
    @EnumField(289)
    setFlyEmoteTalk() { return this.set(289) }
    
    @EnumField(290)
    setFlyEmoteEat() { return this.set(290) }
    
    @EnumField(291)
    setFlyEmoteWork() { return this.set(291) }
    
    @EnumField(292)
    setFlyEmoteUseStanding() { return this.set(292) }
    
    @EnumField(293)
    setFlyEmoteTalkExclamation() { return this.set(293) }
    
    @EnumField(294)
    setFlyEmoteTalkQuestion() { return this.set(294) }
    
    @EnumField(295)
    setFlyEmoteBow() { return this.set(295) }
    
    @EnumField(296)
    setFlyEmoteWave() { return this.set(296) }
    
    @EnumField(297)
    setFlyEmoteCheer() { return this.set(297) }
    
    @EnumField(298)
    setFlyEmoteDance() { return this.set(298) }
    
    @EnumField(299)
    setFlyEmoteLaugh() { return this.set(299) }
    
    @EnumField(300)
    setFlyEmoteSleep() { return this.set(300) }
    
    @EnumField(301)
    setFlyEmoteSitGround() { return this.set(301) }
    
    @EnumField(302)
    setFlyEmoteRude() { return this.set(302) }
    
    @EnumField(303)
    setFlyEmoteRoar() { return this.set(303) }
    
    @EnumField(304)
    setFlyEmoteKneel() { return this.set(304) }
    
    @EnumField(305)
    setFlyEmoteKiss() { return this.set(305) }
    
    @EnumField(306)
    setFlyEmoteCry() { return this.set(306) }
    
    @EnumField(307)
    setFlyEmoteChicken() { return this.set(307) }
    
    @EnumField(308)
    setFlyEmoteBeg() { return this.set(308) }
    
    @EnumField(309)
    setFlyEmoteApplaud() { return this.set(309) }
    
    @EnumField(310)
    setFlyEmoteShout() { return this.set(310) }
    
    @EnumField(311)
    setFlyEmoteFlex() { return this.set(311) }
    
    @EnumField(312)
    setFlyEmoteShy() { return this.set(312) }
    
    @EnumField(313)
    setFlyEmotePoint() { return this.set(313) }
    
    @EnumField(314)
    setFlyAttack1HPierce() { return this.set(314) }
    
    @EnumField(315)
    setFlyAttack2HLoosePierce() { return this.set(315) }
    
    @EnumField(316)
    setFlyAttackOff() { return this.set(316) }
    
    @EnumField(317)
    setFlyAttackOffPierce() { return this.set(317) }
    
    @EnumField(318)
    setFlySheath() { return this.set(318) }
    
    @EnumField(319)
    setFlyHipSheath() { return this.set(319) }
    
    @EnumField(320)
    setFlyMount() { return this.set(320) }
    
    @EnumField(321)
    setFlyRunRight() { return this.set(321) }
    
    @EnumField(322)
    setFlyRunLeft() { return this.set(322) }
    
    @EnumField(323)
    setFlyMountSpecial() { return this.set(323) }
    
    @EnumField(324)
    setFlyKick() { return this.set(324) }
    
    @EnumField(325)
    setFlySitGroundDown() { return this.set(325) }
    
    @EnumField(326)
    setFlySitGround() { return this.set(326) }
    
    @EnumField(327)
    setFlySitGroundUp() { return this.set(327) }
    
    @EnumField(328)
    setFlySleepDown() { return this.set(328) }
    
    @EnumField(329)
    setFlySleep() { return this.set(329) }
    
    @EnumField(330)
    setFlySleepUp() { return this.set(330) }
    
    @EnumField(331)
    setFlySitChairLow() { return this.set(331) }
    
    @EnumField(332)
    setFlySitChairMed() { return this.set(332) }
    
    @EnumField(333)
    setFlySitChairHigh() { return this.set(333) }
    
    @EnumField(334)
    setFlyLoadBow() { return this.set(334) }
    
    @EnumField(335)
    setFlyLoadRifle() { return this.set(335) }
    
    @EnumField(336)
    setFlyAttackThrown() { return this.set(336) }
    
    @EnumField(337)
    setFlyReadyThrown() { return this.set(337) }
    
    @EnumField(338)
    setFlyHoldBow() { return this.set(338) }
    
    @EnumField(339)
    setFlyHoldRifle() { return this.set(339) }
    
    @EnumField(340)
    setFlyHoldThrown() { return this.set(340) }
    
    @EnumField(341)
    setFlyLoadThrown() { return this.set(341) }
    
    @EnumField(342)
    setFlyEmoteSalute() { return this.set(342) }
    
    @EnumField(343)
    setFlyKneelStart() { return this.set(343) }
    
    @EnumField(344)
    setFlyKneelLoop() { return this.set(344) }
    
    @EnumField(345)
    setFlyKneelEnd() { return this.set(345) }
    
    @EnumField(346)
    setFlyAttackUnarmedOff() { return this.set(346) }
    
    @EnumField(347)
    setFlySpecialUnarmed() { return this.set(347) }
    
    @EnumField(348)
    setFlyStealthWalk() { return this.set(348) }
    
    @EnumField(349)
    setFlyStealthStand() { return this.set(349) }
    
    @EnumField(350)
    setFlyKnockdown() { return this.set(350) }
    
    @EnumField(351)
    setFlyEatingLoop() { return this.set(351) }
    
    @EnumField(352)
    setFlyUseStandingLoop() { return this.set(352) }
    
    @EnumField(353)
    setFlyChannelCastDirected() { return this.set(353) }
    
    @EnumField(354)
    setFlyChannelCastOmni() { return this.set(354) }
    
    @EnumField(355)
    setFlyWhirlwind() { return this.set(355) }
    
    @EnumField(356)
    setFlyBirth() { return this.set(356) }
    
    @EnumField(357)
    setFlyUseStandingStart() { return this.set(357) }
    
    @EnumField(358)
    setFlyUseStandingEnd() { return this.set(358) }
    
    @EnumField(359)
    setFlyCreatureSpecial() { return this.set(359) }
    
    @EnumField(360)
    setFlyDrown() { return this.set(360) }
    
    @EnumField(361)
    setFlyDrowned() { return this.set(361) }
    
    @EnumField(362)
    setFlyFishingCast() { return this.set(362) }
    
    @EnumField(363)
    setFlyFishingLoop() { return this.set(363) }
    
    @EnumField(364)
    setFlyFly() { return this.set(364) }
    
    @EnumField(365)
    setFlyEmoteWorkNoSheathe() { return this.set(365) }
    
    @EnumField(366)
    setFlyEmoteStunNoSheathe() { return this.set(366) }
    
    @EnumField(367)
    setFlyEmoteUseStandingNoSheathe() { return this.set(367) }
    
    @EnumField(368)
    setFlySpellSleepDown() { return this.set(368) }
    
    @EnumField(369)
    setFlySpellKneelStart() { return this.set(369) }
    
    @EnumField(370)
    setFlySpellKneelLoop() { return this.set(370) }
    
    @EnumField(371)
    setFlySpellKneelEnd() { return this.set(371) }
    
    @EnumField(372)
    setFlySprint() { return this.set(372) }
    
    @EnumField(373)
    setFlyInFlight() { return this.set(373) }
    
    @EnumField(374)
    setFlySpawn() { return this.set(374) }
    
    @EnumField(375)
    setFlyClose() { return this.set(375) }
    
    @EnumField(376)
    setFlyClosed() { return this.set(376) }
    
    @EnumField(377)
    setFlyOpen() { return this.set(377) }
    
    @EnumField(378)
    setFlyOpened() { return this.set(378) }
    
    @EnumField(379)
    setFlyDestroy() { return this.set(379) }
    
    @EnumField(380)
    setFlyDestroyed() { return this.set(380) }
    
    @EnumField(381)
    setFlyRebuild() { return this.set(381) }
    
    @EnumField(382)
    setFlyCustom0() { return this.set(382) }
    
    @EnumField(383)
    setFlyCustom1() { return this.set(383) }
    
    @EnumField(384)
    setFlyCustom2() { return this.set(384) }
    
    @EnumField(385)
    setFlyCustom3() { return this.set(385) }
    
    @EnumField(386)
    setFlyDespawn() { return this.set(386) }
    
    @EnumField(387)
    setFlyHold() { return this.set(387) }
    
    @EnumField(388)
    setFlyDecay() { return this.set(388) }
    
    @EnumField(389)
    setFlyBowPull() { return this.set(389) }
    
    @EnumField(390)
    setFlyBowRelease() { return this.set(390) }
    
    @EnumField(391)
    setFlyShipStart() { return this.set(391) }
    
    @EnumField(392)
    setFlyShipMoving() { return this.set(392) }
    
    @EnumField(393)
    setFlyShipStop() { return this.set(393) }
    
    @EnumField(394)
    setFlyGroupArrow() { return this.set(394) }
    
    @EnumField(395)
    setFlyArrow() { return this.set(395) }
    
    @EnumField(396)
    setFlyCorpseArrow() { return this.set(396) }
    
    @EnumField(397)
    setFlyGuideArrow() { return this.set(397) }
    
    @EnumField(398)
    setFlySway() { return this.set(398) }
    
    @EnumField(399)
    setFlyDruidCatPounce() { return this.set(399) }
    
    @EnumField(400)
    setFlyDruidCatRip() { return this.set(400) }
    
    @EnumField(401)
    setFlyDruidCatRake() { return this.set(401) }
    
    @EnumField(402)
    setFlyDruidCatRavage() { return this.set(402) }
    
    @EnumField(403)
    setFlyDruidCatClaw() { return this.set(403) }
    
    @EnumField(404)
    setFlyDruidCatCower() { return this.set(404) }
    
    @EnumField(405)
    setFlyDruidBearSwipe() { return this.set(405) }
    
    @EnumField(406)
    setFlyDruidBearBite() { return this.set(406) }
    
    @EnumField(407)
    setFlyDruidBearMaul() { return this.set(407) }
    
    @EnumField(408)
    setFlyDruidBearBash() { return this.set(408) }
    
    @EnumField(409)
    setFlyDragonTail() { return this.set(409) }
    
    @EnumField(410)
    setFlyDragonStomp() { return this.set(410) }
    
    @EnumField(411)
    setFlyDragonSpit() { return this.set(411) }
    
    @EnumField(412)
    setFlyDragonSpitHover() { return this.set(412) }
    
    @EnumField(413)
    setFlyDragonSpitFly() { return this.set(413) }
    
    @EnumField(414)
    setFlyEmoteYes() { return this.set(414) }
    
    @EnumField(415)
    setFlyEmoteNo() { return this.set(415) }
    
    @EnumField(416)
    setFlyJumpLandRun() { return this.set(416) }
    
    @EnumField(417)
    setFlyLootHold() { return this.set(417) }
    
    @EnumField(418)
    setFlyLootUp() { return this.set(418) }
    
    @EnumField(419)
    setFlyStandHigh() { return this.set(419) }
    
    @EnumField(420)
    setFlyImpact() { return this.set(420) }
    
    @EnumField(421)
    setFlyLiftOff() { return this.set(421) }
    
    @EnumField(422)
    setFlyHover() { return this.set(422) }
    
    @EnumField(423)
    setFlySuccubusEntice() { return this.set(423) }
    
    @EnumField(424)
    setFlyEmoteTrain() { return this.set(424) }
    
    @EnumField(425)
    setFlyEmoteDead() { return this.set(425) }
    
    @EnumField(426)
    setFlyEmoteDanceOnce() { return this.set(426) }
    
    @EnumField(427)
    setFlyDeflect() { return this.set(427) }
    
    @EnumField(428)
    setFlyEmoteEatNoSheathe() { return this.set(428) }
    
    @EnumField(429)
    setFlyLand() { return this.set(429) }
    
    @EnumField(430)
    setFlySubmerge() { return this.set(430) }
    
    @EnumField(431)
    setFlySubmerged() { return this.set(431) }
    
    @EnumField(432)
    setFlyCannibalize() { return this.set(432) }
    
    @EnumField(433)
    setFlyArrowBirth() { return this.set(433) }
    
    @EnumField(434)
    setFlyGroupArrowBirth() { return this.set(434) }
    
    @EnumField(435)
    setFlyCorpseArrowBirth() { return this.set(435) }
    
    @EnumField(436)
    setFlyGuideArrowBirth() { return this.set(436) }
    
    @EnumField(437)
    setFlyEmoteTalkNoSheathe() { return this.set(437) }
    
    @EnumField(438)
    setFlyEmotePointNoSheathe() { return this.set(438) }
    
    @EnumField(439)
    setFlyEmoteSaluteNoSheathe() { return this.set(439) }
    
    @EnumField(440)
    setFlyEmoteDanceSpecial() { return this.set(440) }
    
    @EnumField(441)
    setFlyMutilate() { return this.set(441) }
    
    @EnumField(442)
    setFlyCustomSpell01() { return this.set(442) }
    
    @EnumField(443)
    setFlyCustomSpell02() { return this.set(443) }
    
    @EnumField(444)
    setFlyCustomSpell03() { return this.set(444) }
    
    @EnumField(445)
    setFlyCustomSpell04() { return this.set(445) }
    
    @EnumField(446)
    setFlyCustomSpell05() { return this.set(446) }
    
    @EnumField(447)
    setFlyCustomSpell06() { return this.set(447) }
    
    @EnumField(448)
    setFlyCustomSpell07() { return this.set(448) }
    
    @EnumField(449)
    setFlyCustomSpell08() { return this.set(449) }
    
    @EnumField(450)
    setFlyCustomSpell09() { return this.set(450) }
    
    @EnumField(451)
    setFlyCustomSpell10() { return this.set(451) }
    
    @EnumField(452)
    setFlyStealthRun() { return this.set(452) }
    
    @EnumField(453)
    setFlyEmerge() { return this.set(453) }
    
    @EnumField(454)
    setFlyCower() { return this.set(454) }
    
    @EnumField(455)
    setFlyGrab() { return this.set(455) }
    
    @EnumField(456)
    setFlyGrabClosed() { return this.set(456) }
    
    @EnumField(457)
    setFlyGrabThrown() { return this.set(457) }
    
    @EnumField(458)
    setToFly() { return this.set(458) }
    
    @EnumField(459)
    setToHover() { return this.set(459) }
    
    @EnumField(460)
    setToGround() { return this.set(460) }
    
    @EnumField(461)
    setFlyToFly() { return this.set(461) }
    
    @EnumField(462)
    setFlyToHover() { return this.set(462) }
    
    @EnumField(463)
    setFlyToGround() { return this.set(463) }
    
    @EnumField(464)
    setSettle() { return this.set(464) }
    
    @EnumField(465)
    setFlySettle() { return this.set(465) }
    
    @EnumField(466)
    setDeathStart() { return this.set(466) }
    
    @EnumField(467)
    setDeathLoop() { return this.set(467) }
    
    @EnumField(468)
    setDeathEnd() { return this.set(468) }
    
    @EnumField(469)
    setFlyDeathStart() { return this.set(469) }
    
    @EnumField(470)
    setFlyDeathLoop() { return this.set(470) }
    
    @EnumField(471)
    setFlyDeathEnd() { return this.set(471) }
    
    @EnumField(472)
    setDeathEndHold() { return this.set(472) }
    
    @EnumField(473)
    setFlyDeathEndHold() { return this.set(473) }
    
    @EnumField(474)
    setStrangulate() { return this.set(474) }
    
    @EnumField(475)
    setFlyStrangulate() { return this.set(475) }
    
    @EnumField(476)
    setReadyJoust() { return this.set(476) }
    
    @EnumField(477)
    setLoadJoust() { return this.set(477) }
    
    @EnumField(478)
    setHoldJoust() { return this.set(478) }
    
    @EnumField(479)
    setFlyReadyJoust() { return this.set(479) }
    
    @EnumField(480)
    setFlyLoadJoust() { return this.set(480) }
    
    @EnumField(481)
    setFlyHoldJoust() { return this.set(481) }
    
    @EnumField(482)
    setAttackJoust() { return this.set(482) }
    
    @EnumField(483)
    setFlyAttackJoust() { return this.set(483) }
    
    @EnumField(484)
    setReclinedMount() { return this.set(484) }
    
    @EnumField(485)
    setFlyReclinedMount() { return this.set(485) }
    
    @EnumField(486)
    setToAltered() { return this.set(486) }
    
    @EnumField(487)
    setFromAltered() { return this.set(487) }
    
    @EnumField(488)
    setFlyToAltered() { return this.set(488) }
    
    @EnumField(489)
    setFlyFromAltered() { return this.set(489) }
    
    @EnumField(490)
    setInStocks() { return this.set(490) }
    
    @EnumField(491)
    setFlyInStocks() { return this.set(491) }
    
    @EnumField(492)
    setVehicleGrab() { return this.set(492) }
    
    @EnumField(493)
    setVehicleThrow() { return this.set(493) }
    
    @EnumField(494)
    setFlyVehicleGrab() { return this.set(494) }
    
    @EnumField(495)
    setFlyVehicleThrow() { return this.set(495) }
    
    @EnumField(496)
    setToAlteredPostSwap() { return this.set(496) }
    
    @EnumField(497)
    setFromAlteredPostSwap() { return this.set(497) }
    
    @EnumField(498)
    setFlyToAlteredPostSwap() { return this.set(498) }
    
    @EnumField(499)
    setFlyFromAlteredPostSwap() { return this.set(499) }
    
    @EnumField(500)
    setReclinedMountPassenger() { return this.set(500) }
    
    @EnumField(501)
    setFlyReclinedMountPassenger() { return this.set(501) }
    
    @EnumField(502)
    setCarry2H() { return this.set(502) }
    
    @EnumField(503)
    setCarried2H() { return this.set(503) }
    
    @EnumField(504)
    setFlyCarry2H() { return this.set(504) }
    
    @EnumField(505)
    setFlyCarried2H() { return this.set(505) }
}