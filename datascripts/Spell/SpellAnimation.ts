import { EnumCell } from "wotlkdata/cell/cells/EnumCell"

export class SpellAnimation<T> extends EnumCell<T> {
    /** Enum Value:                                        0 */
    get Stand()                        { return this.value(0) }
    /** Enum Value:                                        1 */
    get Death()                        { return this.value(1) }
    /** Enum Value:                                        2 */
    get Spell()                        { return this.value(2) }
    /** Enum Value:                                        3 */
    get Stop()                         { return this.value(3) }
    /** Enum Value:                                        4 */
    get Walk()                         { return this.value(4) }
    /** Enum Value:                                        5 */
    get Run()                          { return this.value(5) }
    /** Enum Value:                                        6 */
    get Dead()                         { return this.value(6) }
    /** Enum Value:                                        7 */
    get Rise()                         { return this.value(7) }
    /** Enum Value:                                        8 */
    get StandWound()                   { return this.value(8) }
    /** Enum Value:                                        9 */
    get CombatWound()                  { return this.value(9) }
    /** Enum Value:                                        10 */
    get CombatCritical()               { return this.value(10) }
    /** Enum Value:                                        11 */
    get ShuffleLeft()                  { return this.value(11) }
    /** Enum Value:                                        12 */
    get ShuffleRight()                 { return this.value(12) }
    /** Enum Value:                                        13 */
    get Walkbackwards()                { return this.value(13) }
    /** Enum Value:                                        14 */
    get Stun()                         { return this.value(14) }
    /** Enum Value:                                        15 */
    get HandsClosed()                  { return this.value(15) }
    /** Enum Value:                                        16 */
    get AttackUnarmed()                { return this.value(16) }
    /** Enum Value:                                        17 */
    get Attack1H()                     { return this.value(17) }
    /** Enum Value:                                        18 */
    get Attack2H()                     { return this.value(18) }
    /** Enum Value:                                        19 */
    get Attack2HL()                    { return this.value(19) }
    /** Enum Value:                                        20 */
    get ParryUnarmed()                 { return this.value(20) }
    /** Enum Value:                                        21 */
    get Parry1H()                      { return this.value(21) }
    /** Enum Value:                                        22 */
    get Parry2H()                      { return this.value(22) }
    /** Enum Value:                                        23 */
    get Parry2HL()                     { return this.value(23) }
    /** Enum Value:                                        24 */
    get ShieldBlock()                  { return this.value(24) }
    /** Enum Value:                                        25 */
    get ReadyUnarmed()                 { return this.value(25) }
    /** Enum Value:                                        26 */
    get Ready1H()                      { return this.value(26) }
    /** Enum Value:                                        27 */
    get Ready2H()                      { return this.value(27) }
    /** Enum Value:                                        28 */
    get Ready2HL()                     { return this.value(28) }
    /** Enum Value:                                        29 */
    get ReadyBow()                     { return this.value(29) }
    /** Enum Value:                                        30 */
    get Dodge()                        { return this.value(30) }
    /** Enum Value:                                        31 */
    get SpellPrecast()                 { return this.value(31) }
    /** Enum Value:                                        32 */
    get SpellCast()                    { return this.value(32) }
    /** Enum Value:                                        33 */
    get SpellCastArea()                { return this.value(33) }
    /** Enum Value:                                        34 */
    get NPCWelcome()                   { return this.value(34) }
    /** Enum Value:                                        35 */
    get NPCGoodbye()                   { return this.value(35) }
    /** Enum Value:                                        36 */
    get Block()                        { return this.value(36) }
    /** Enum Value:                                        37 */
    get JumpStart()                    { return this.value(37) }
    /** Enum Value:                                        38 */
    get Jump()                         { return this.value(38) }
    /** Enum Value:                                        39 */
    get JumpEnd()                      { return this.value(39) }
    /** Enum Value:                                        40 */
    get Fall()                         { return this.value(40) }
    /** Enum Value:                                        41 */
    get SwimIdle()                     { return this.value(41) }
    /** Enum Value:                                        42 */
    get Swim()                         { return this.value(42) }
    /** Enum Value:                                        43 */
    get SwimLeft()                     { return this.value(43) }
    /** Enum Value:                                        44 */
    get SwimRight()                    { return this.value(44) }
    /** Enum Value:                                        45 */
    get SwimBackwards()                { return this.value(45) }
    /** Enum Value:                                        46 */
    get AttackBow()                    { return this.value(46) }
    /** Enum Value:                                        47 */
    get FireBow()                      { return this.value(47) }
    /** Enum Value:                                        48 */
    get ReadyRifle()                   { return this.value(48) }
    /** Enum Value:                                        49 */
    get AttackRifle()                  { return this.value(49) }
    /** Enum Value:                                        50 */
    get Loot()                         { return this.value(50) }
    /** Enum Value:                                        51 */
    get ReadySpellDirected()           { return this.value(51) }
    /** Enum Value:                                        52 */
    get ReadySpellOmni()               { return this.value(52) }
    /** Enum Value:                                        53 */
    get SpellCastDirected()            { return this.value(53) }
    /** Enum Value:                                        54 */
    get SpellCastOmni()                { return this.value(54) }
    /** Enum Value:                                        55 */
    get BattleRoar()                   { return this.value(55) }
    /** Enum Value:                                        56 */
    get ReadyAbility()                 { return this.value(56) }
    /** Enum Value:                                        57 */
    get Special1H()                    { return this.value(57) }
    /** Enum Value:                                        58 */
    get Special2H()                    { return this.value(58) }
    /** Enum Value:                                        59 */
    get ShieldBash()                   { return this.value(59) }
    /** Enum Value:                                        60 */
    get EmoteTalk()                    { return this.value(60) }
    /** Enum Value:                                        61 */
    get EmoteEat()                     { return this.value(61) }
    /** Enum Value:                                        62 */
    get EmoteWork()                    { return this.value(62) }
    /** Enum Value:                                        63 */
    get EmoteUseStanding()             { return this.value(63) }
    /** Enum Value:                                        64 */
    get EmoteTalkExclamation()         { return this.value(64) }
    /** Enum Value:                                        65 */
    get EmoteTalkQuestion()            { return this.value(65) }
    /** Enum Value:                                        66 */
    get EmoteBow()                     { return this.value(66) }
    /** Enum Value:                                        67 */
    get EmoteWave()                    { return this.value(67) }
    /** Enum Value:                                        68 */
    get EmoteCheer()                   { return this.value(68) }
    /** Enum Value:                                        69 */
    get EmoteDance()                   { return this.value(69) }
    /** Enum Value:                                        70 */
    get EmoteLaugh()                   { return this.value(70) }
    /** Enum Value:                                        71 */
    get EmoteSleep()                   { return this.value(71) }
    /** Enum Value:                                        72 */
    get EmoteSitGround()               { return this.value(72) }
    /** Enum Value:                                        73 */
    get EmoteRude()                    { return this.value(73) }
    /** Enum Value:                                        74 */
    get EmoteRoar()                    { return this.value(74) }
    /** Enum Value:                                        75 */
    get EmoteKneel()                   { return this.value(75) }
    /** Enum Value:                                        76 */
    get EmoteKiss()                    { return this.value(76) }
    /** Enum Value:                                        77 */
    get EmoteCry()                     { return this.value(77) }
    /** Enum Value:                                        78 */
    get EmoteChicken()                 { return this.value(78) }
    /** Enum Value:                                        79 */
    get EmoteBeg()                     { return this.value(79) }
    /** Enum Value:                                        80 */
    get EmoteApplaud()                 { return this.value(80) }
    /** Enum Value:                                        81 */
    get EmoteShout()                   { return this.value(81) }
    /** Enum Value:                                        82 */
    get EmoteFlex()                    { return this.value(82) }
    /** Enum Value:                                        83 */
    get EmoteShy()                     { return this.value(83) }
    /** Enum Value:                                        84 */
    get EmotePoint()                   { return this.value(84) }
    /** Enum Value:                                        85 */
    get Attack1HPierce()               { return this.value(85) }
    /** Enum Value:                                        86 */
    get Attack2HLoosePierce()          { return this.value(86) }
    /** Enum Value:                                        87 */
    get AttackOff()                    { return this.value(87) }
    /** Enum Value:                                        88 */
    get AttackOffPierce()              { return this.value(88) }
    /** Enum Value:                                        89 */
    get Sheath()                       { return this.value(89) }
    /** Enum Value:                                        90 */
    get HipSheath()                    { return this.value(90) }
    /** Enum Value:                                        91 */
    get Mount()                        { return this.value(91) }
    /** Enum Value:                                        92 */
    get RunRight()                     { return this.value(92) }
    /** Enum Value:                                        93 */
    get RunLeft()                      { return this.value(93) }
    /** Enum Value:                                        94 */
    get MountSpecial()                 { return this.value(94) }
    /** Enum Value:                                        95 */
    get Kick()                         { return this.value(95) }
    /** Enum Value:                                        96 */
    get SitGroundDown()                { return this.value(96) }
    /** Enum Value:                                        97 */
    get SitGround()                    { return this.value(97) }
    /** Enum Value:                                        98 */
    get SitGroundUp()                  { return this.value(98) }
    /** Enum Value:                                        99 */
    get SleepDown()                    { return this.value(99) }
    /** Enum Value:                                        100 */
    get Sleep()                        { return this.value(100) }
    /** Enum Value:                                        101 */
    get SleepUp()                      { return this.value(101) }
    /** Enum Value:                                        102 */
    get SitChairLow()                  { return this.value(102) }
    /** Enum Value:                                        103 */
    get SitChairMed()                  { return this.value(103) }
    /** Enum Value:                                        104 */
    get SitChairHigh()                 { return this.value(104) }
    /** Enum Value:                                        105 */
    get LoadBow()                      { return this.value(105) }
    /** Enum Value:                                        106 */
    get LoadRifle()                    { return this.value(106) }
    /** Enum Value:                                        107 */
    get AttackThrown()                 { return this.value(107) }
    /** Enum Value:                                        108 */
    get ReadyThrown()                  { return this.value(108) }
    /** Enum Value:                                        109 */
    get HoldBow()                      { return this.value(109) }
    /** Enum Value:                                        110 */
    get HoldRifle()                    { return this.value(110) }
    /** Enum Value:                                        111 */
    get HoldThrown()                   { return this.value(111) }
    /** Enum Value:                                        112 */
    get LoadThrown()                   { return this.value(112) }
    /** Enum Value:                                        113 */
    get EmoteSalute()                  { return this.value(113) }
    /** Enum Value:                                        114 */
    get KneelStart()                   { return this.value(114) }
    /** Enum Value:                                        115 */
    get KneelLoop()                    { return this.value(115) }
    /** Enum Value:                                        116 */
    get KneelEnd()                     { return this.value(116) }
    /** Enum Value:                                        117 */
    get AttackUnarmedOff()             { return this.value(117) }
    /** Enum Value:                                        118 */
    get SpecialUnarmed()               { return this.value(118) }
    /** Enum Value:                                        119 */
    get StealthWalk()                  { return this.value(119) }
    /** Enum Value:                                        120 */
    get StealthStand()                 { return this.value(120) }
    /** Enum Value:                                        121 */
    get Knockdown()                    { return this.value(121) }
    /** Enum Value:                                        122 */
    get EatingLoop()                   { return this.value(122) }
    /** Enum Value:                                        123 */
    get UseStandingLoop()              { return this.value(123) }
    /** Enum Value:                                        124 */
    get ChannelCastDirected()          { return this.value(124) }
    /** Enum Value:                                        125 */
    get ChannelCastOmni()              { return this.value(125) }
    /** Enum Value:                                        126 */
    get Whirlwind()                    { return this.value(126) }
    /** Enum Value:                                        127 */
    get Birth()                        { return this.value(127) }
    /** Enum Value:                                        128 */
    get UseStandingStart()             { return this.value(128) }
    /** Enum Value:                                        129 */
    get UseStandingEnd()               { return this.value(129) }
    /** Enum Value:                                        130 */
    get CreatureSpecial()              { return this.value(130) }
    /** Enum Value:                                        131 */
    get Drown()                        { return this.value(131) }
    /** Enum Value:                                        132 */
    get Drowned()                      { return this.value(132) }
    /** Enum Value:                                        133 */
    get FishingCast()                  { return this.value(133) }
    /** Enum Value:                                        134 */
    get FishingLoop()                  { return this.value(134) }
    /** Enum Value:                                        135 */
    get Fly()                          { return this.value(135) }
    /** Enum Value:                                        136 */
    get EmoteWorkNoSheathe()           { return this.value(136) }
    /** Enum Value:                                        137 */
    get EmoteStunNoSheathe()           { return this.value(137) }
    /** Enum Value:                                        138 */
    get EmoteUseStandingNoSheathe()    { return this.value(138) }
    /** Enum Value:                                        139 */
    get SpellSleepDown()               { return this.value(139) }
    /** Enum Value:                                        140 */
    get SpellKneelStart()              { return this.value(140) }
    /** Enum Value:                                        141 */
    get SpellKneelLoop()               { return this.value(141) }
    /** Enum Value:                                        142 */
    get SpellKneelEnd()                { return this.value(142) }
    /** Enum Value:                                        143 */
    get Sprint()                       { return this.value(143) }
    /** Enum Value:                                        144 */
    get InFlight()                     { return this.value(144) }
    /** Enum Value:                                        145 */
    get Spawn()                        { return this.value(145) }
    /** Enum Value:                                        146 */
    get Close()                        { return this.value(146) }
    /** Enum Value:                                        147 */
    get Closed()                       { return this.value(147) }
    /** Enum Value:                                        148 */
    get Open()                         { return this.value(148) }
    /** Enum Value:                                        149 */
    get Opened()                       { return this.value(149) }
    /** Enum Value:                                        150 */
    get Destroy()                      { return this.value(150) }
    /** Enum Value:                                        151 */
    get Destroyed()                    { return this.value(151) }
    /** Enum Value:                                        152 */
    get Rebuild()                      { return this.value(152) }
    /** Enum Value:                                        153 */
    get Custom0()                      { return this.value(153) }
    /** Enum Value:                                        154 */
    get Custom1()                      { return this.value(154) }
    /** Enum Value:                                        155 */
    get Custom2()                      { return this.value(155) }
    /** Enum Value:                                        156 */
    get Custom3()                      { return this.value(156) }
    /** Enum Value:                                        157 */
    get Despawn()                      { return this.value(157) }
    /** Enum Value:                                        158 */
    get Hold()                         { return this.value(158) }
    /** Enum Value:                                        159 */
    get Decay()                        { return this.value(159) }
    /** Enum Value:                                        160 */
    get BowPull()                      { return this.value(160) }
    /** Enum Value:                                        161 */
    get BowRelease()                   { return this.value(161) }
    /** Enum Value:                                        162 */
    get ShipStart()                    { return this.value(162) }
    /** Enum Value:                                        163 */
    get ShipMoving()                   { return this.value(163) }
    /** Enum Value:                                        164 */
    get ShipStop()                     { return this.value(164) }
    /** Enum Value:                                        165 */
    get GroupArrow()                   { return this.value(165) }
    /** Enum Value:                                        166 */
    get Arrow()                        { return this.value(166) }
    /** Enum Value:                                        167 */
    get CorpseArrow()                  { return this.value(167) }
    /** Enum Value:                                        168 */
    get GuideArrow()                   { return this.value(168) }
    /** Enum Value:                                        169 */
    get Sway()                         { return this.value(169) }
    /** Enum Value:                                        170 */
    get DruidCatPounce()               { return this.value(170) }
    /** Enum Value:                                        171 */
    get DruidCatRip()                  { return this.value(171) }
    /** Enum Value:                                        172 */
    get DruidCatRake()                 { return this.value(172) }
    /** Enum Value:                                        173 */
    get DruidCatRavage()               { return this.value(173) }
    /** Enum Value:                                        174 */
    get DruidCatClaw()                 { return this.value(174) }
    /** Enum Value:                                        175 */
    get DruidCatCower()                { return this.value(175) }
    /** Enum Value:                                        176 */
    get DruidBearSwipe()               { return this.value(176) }
    /** Enum Value:                                        177 */
    get DruidBearBite()                { return this.value(177) }
    /** Enum Value:                                        178 */
    get DruidBearMaul()                { return this.value(178) }
    /** Enum Value:                                        179 */
    get DruidBearBash()                { return this.value(179) }
    /** Enum Value:                                        180 */
    get DragonTail()                   { return this.value(180) }
    /** Enum Value:                                        181 */
    get DragonStomp()                  { return this.value(181) }
    /** Enum Value:                                        182 */
    get DragonSpit()                   { return this.value(182) }
    /** Enum Value:                                        183 */
    get DragonSpitHover()              { return this.value(183) }
    /** Enum Value:                                        184 */
    get DragonSpitFly()                { return this.value(184) }
    /** Enum Value:                                        185 */
    get EmoteYes()                     { return this.value(185) }
    /** Enum Value:                                        186 */
    get EmoteNo()                      { return this.value(186) }
    /** Enum Value:                                        187 */
    get JumpLandRun()                  { return this.value(187) }
    /** Enum Value:                                        188 */
    get LootHold()                     { return this.value(188) }
    /** Enum Value:                                        189 */
    get LootUp()                       { return this.value(189) }
    /** Enum Value:                                        190 */
    get StandHigh()                    { return this.value(190) }
    /** Enum Value:                                        191 */
    get Impact()                       { return this.value(191) }
    /** Enum Value:                                        192 */
    get LiftOff()                      { return this.value(192) }
    /** Enum Value:                                        193 */
    get Hover()                        { return this.value(193) }
    /** Enum Value:                                        194 */
    get SuccubusEntice()               { return this.value(194) }
    /** Enum Value:                                        195 */
    get EmoteTrain()                   { return this.value(195) }
    /** Enum Value:                                        196 */
    get EmoteDead()                    { return this.value(196) }
    /** Enum Value:                                        197 */
    get EmoteDanceOnce()               { return this.value(197) }
    /** Enum Value:                                        198 */
    get Deflect()                      { return this.value(198) }
    /** Enum Value:                                        199 */
    get EmoteEatNoSheathe()            { return this.value(199) }
    /** Enum Value:                                        200 */
    get Land()                         { return this.value(200) }
    /** Enum Value:                                        201 */
    get Submerge()                     { return this.value(201) }
    /** Enum Value:                                        202 */
    get Submerged()                    { return this.value(202) }
    /** Enum Value:                                        203 */
    get Cannibalize()                  { return this.value(203) }
    /** Enum Value:                                        204 */
    get ArrowBirth()                   { return this.value(204) }
    /** Enum Value:                                        205 */
    get GroupArrowBirth()              { return this.value(205) }
    /** Enum Value:                                        206 */
    get CorpseArrowBirth()             { return this.value(206) }
    /** Enum Value:                                        207 */
    get GuideArrowBirth()              { return this.value(207) }
    /** Enum Value:                                        208 */
    get EmoteTalkNoSheathe()           { return this.value(208) }
    /** Enum Value:                                        209 */
    get EmotePointNoSheathe()          { return this.value(209) }
    /** Enum Value:                                        210 */
    get EmoteSaluteNoSheathe()         { return this.value(210) }
    /** Enum Value:                                        211 */
    get EmoteDanceSpecial()            { return this.value(211) }
    /** Enum Value:                                        212 */
    get Mutilate()                     { return this.value(212) }
    /** Enum Value:                                        213 */
    get CustomSpell01()                { return this.value(213) }
    /** Enum Value:                                        214 */
    get CustomSpell02()                { return this.value(214) }
    /** Enum Value:                                        215 */
    get CustomSpell03()                { return this.value(215) }
    /** Enum Value:                                        216 */
    get CustomSpell04()                { return this.value(216) }
    /** Enum Value:                                        217 */
    get CustomSpell05()                { return this.value(217) }
    /** Enum Value:                                        218 */
    get CustomSpell06()                { return this.value(218) }
    /** Enum Value:                                        219 */
    get CustomSpell07()                { return this.value(219) }
    /** Enum Value:                                        220 */
    get CustomSpell08()                { return this.value(220) }
    /** Enum Value:                                        221 */
    get CustomSpell09()                { return this.value(221) }
    /** Enum Value:                                        222 */
    get CustomSpell10()                { return this.value(222) }
    /** Enum Value:                                        223 */
    get StealthRun()                   { return this.value(223) }
    /** Enum Value:                                        224 */
    get Emerge()                       { return this.value(224) }
    /** Enum Value:                                        225 */
    get Cower()                        { return this.value(225) }
    /** Enum Value:                                        226 */
    get Grab()                         { return this.value(226) }
    /** Enum Value:                                        227 */
    get GrabClosed()                   { return this.value(227) }
    /** Enum Value:                                        228 */
    get GrabThrown()                   { return this.value(228) }
    /** Enum Value:                                        229 */
    get FlyStand()                     { return this.value(229) }
    /** Enum Value:                                        230 */
    get FlyDeath()                     { return this.value(230) }
    /** Enum Value:                                        231 */
    get FlySpell()                     { return this.value(231) }
    /** Enum Value:                                        232 */
    get FlyStop()                      { return this.value(232) }
    /** Enum Value:                                        233 */
    get FlyWalk()                      { return this.value(233) }
    /** Enum Value:                                        234 */
    get FlyRun()                       { return this.value(234) }
    /** Enum Value:                                        235 */
    get FlyDead()                      { return this.value(235) }
    /** Enum Value:                                        236 */
    get FlyRise()                      { return this.value(236) }
    /** Enum Value:                                        237 */
    get FlyStandWound()                { return this.value(237) }
    /** Enum Value:                                        238 */
    get FlyCombatWound()               { return this.value(238) }
    /** Enum Value:                                        239 */
    get FlyCombatCritical()            { return this.value(239) }
    /** Enum Value:                                        240 */
    get FlyShuffleLeft()               { return this.value(240) }
    /** Enum Value:                                        241 */
    get FlyShuffleRight()              { return this.value(241) }
    /** Enum Value:                                        242 */
    get FlyWalkbackwards()             { return this.value(242) }
    /** Enum Value:                                        243 */
    get FlyStun()                      { return this.value(243) }
    /** Enum Value:                                        244 */
    get FlyHandsClosed()               { return this.value(244) }
    /** Enum Value:                                        245 */
    get FlyAttackUnarmed()             { return this.value(245) }
    /** Enum Value:                                        246 */
    get FlyAttack1H()                  { return this.value(246) }
    /** Enum Value:                                        247 */
    get FlyAttack2H()                  { return this.value(247) }
    /** Enum Value:                                        248 */
    get FlyAttack2HL()                 { return this.value(248) }
    /** Enum Value:                                        249 */
    get FlyParryUnarmed()              { return this.value(249) }
    /** Enum Value:                                        250 */
    get FlyParry1H()                   { return this.value(250) }
    /** Enum Value:                                        251 */
    get FlyParry2H()                   { return this.value(251) }
    /** Enum Value:                                        252 */
    get FlyParry2HL()                  { return this.value(252) }
    /** Enum Value:                                        253 */
    get FlyShieldBlock()               { return this.value(253) }
    /** Enum Value:                                        254 */
    get FlyReadyUnarmed()              { return this.value(254) }
    /** Enum Value:                                        255 */
    get FlyReady1H()                   { return this.value(255) }
    /** Enum Value:                                        256 */
    get FlyReady2H()                   { return this.value(256) }
    /** Enum Value:                                        257 */
    get FlyReady2HL()                  { return this.value(257) }
    /** Enum Value:                                        258 */
    get FlyReadyBow()                  { return this.value(258) }
    /** Enum Value:                                        259 */
    get FlyDodge()                     { return this.value(259) }
    /** Enum Value:                                        260 */
    get FlySpellPrecast()              { return this.value(260) }
    /** Enum Value:                                        261 */
    get FlySpellCast()                 { return this.value(261) }
    /** Enum Value:                                        262 */
    get FlySpellCastArea()             { return this.value(262) }
    /** Enum Value:                                        263 */
    get FlyNPCWelcome()                { return this.value(263) }
    /** Enum Value:                                        264 */
    get FlyNPCGoodbye()                { return this.value(264) }
    /** Enum Value:                                        265 */
    get FlyBlock()                     { return this.value(265) }
    /** Enum Value:                                        266 */
    get FlyJumpStart()                 { return this.value(266) }
    /** Enum Value:                                        267 */
    get FlyJump()                      { return this.value(267) }
    /** Enum Value:                                        268 */
    get FlyJumpEnd()                   { return this.value(268) }
    /** Enum Value:                                        269 */
    get FlyFall()                      { return this.value(269) }
    /** Enum Value:                                        270 */
    get FlySwimIdle()                  { return this.value(270) }
    /** Enum Value:                                        271 */
    get FlySwim()                      { return this.value(271) }
    /** Enum Value:                                        272 */
    get FlySwimLeft()                  { return this.value(272) }
    /** Enum Value:                                        273 */
    get FlySwimRight()                 { return this.value(273) }
    /** Enum Value:                                        274 */
    get FlySwimBackwards()             { return this.value(274) }
    /** Enum Value:                                        275 */
    get FlyAttackBow()                 { return this.value(275) }
    /** Enum Value:                                        276 */
    get FlyFireBow()                   { return this.value(276) }
    /** Enum Value:                                        277 */
    get FlyReadyRifle()                { return this.value(277) }
    /** Enum Value:                                        278 */
    get FlyAttackRifle()               { return this.value(278) }
    /** Enum Value:                                        279 */
    get FlyLoot()                      { return this.value(279) }
    /** Enum Value:                                        280 */
    get FlyReadySpellDirected()        { return this.value(280) }
    /** Enum Value:                                        281 */
    get FlyReadySpellOmni()            { return this.value(281) }
    /** Enum Value:                                        282 */
    get FlySpellCastDirected()         { return this.value(282) }
    /** Enum Value:                                        283 */
    get FlySpellCastOmni()             { return this.value(283) }
    /** Enum Value:                                        284 */
    get FlyBattleRoar()                { return this.value(284) }
    /** Enum Value:                                        285 */
    get FlyReadyAbility()              { return this.value(285) }
    /** Enum Value:                                        286 */
    get FlySpecial1H()                 { return this.value(286) }
    /** Enum Value:                                        287 */
    get FlySpecial2H()                 { return this.value(287) }
    /** Enum Value:                                        288 */
    get FlyShieldBash()                { return this.value(288) }
    /** Enum Value:                                        289 */
    get FlyEmoteTalk()                 { return this.value(289) }
    /** Enum Value:                                        290 */
    get FlyEmoteEat()                  { return this.value(290) }
    /** Enum Value:                                        291 */
    get FlyEmoteWork()                 { return this.value(291) }
    /** Enum Value:                                        292 */
    get FlyEmoteUseStanding()          { return this.value(292) }
    /** Enum Value:                                        293 */
    get FlyEmoteTalkExclamation()      { return this.value(293) }
    /** Enum Value:                                        294 */
    get FlyEmoteTalkQuestion()         { return this.value(294) }
    /** Enum Value:                                        295 */
    get FlyEmoteBow()                  { return this.value(295) }
    /** Enum Value:                                        296 */
    get FlyEmoteWave()                 { return this.value(296) }
    /** Enum Value:                                        297 */
    get FlyEmoteCheer()                { return this.value(297) }
    /** Enum Value:                                        298 */
    get FlyEmoteDance()                { return this.value(298) }
    /** Enum Value:                                        299 */
    get FlyEmoteLaugh()                { return this.value(299) }
    /** Enum Value:                                        300 */
    get FlyEmoteSleep()                { return this.value(300) }
    /** Enum Value:                                        301 */
    get FlyEmoteSitGround()            { return this.value(301) }
    /** Enum Value:                                        302 */
    get FlyEmoteRude()                 { return this.value(302) }
    /** Enum Value:                                        303 */
    get FlyEmoteRoar()                 { return this.value(303) }
    /** Enum Value:                                        304 */
    get FlyEmoteKneel()                { return this.value(304) }
    /** Enum Value:                                        305 */
    get FlyEmoteKiss()                 { return this.value(305) }
    /** Enum Value:                                        306 */
    get FlyEmoteCry()                  { return this.value(306) }
    /** Enum Value:                                        307 */
    get FlyEmoteChicken()              { return this.value(307) }
    /** Enum Value:                                        308 */
    get FlyEmoteBeg()                  { return this.value(308) }
    /** Enum Value:                                        309 */
    get FlyEmoteApplaud()              { return this.value(309) }
    /** Enum Value:                                        310 */
    get FlyEmoteShout()                { return this.value(310) }
    /** Enum Value:                                        311 */
    get FlyEmoteFlex()                 { return this.value(311) }
    /** Enum Value:                                        312 */
    get FlyEmoteShy()                  { return this.value(312) }
    /** Enum Value:                                        313 */
    get FlyEmotePoint()                { return this.value(313) }
    /** Enum Value:                                        314 */
    get FlyAttack1HPierce()            { return this.value(314) }
    /** Enum Value:                                        315 */
    get FlyAttack2HLoosePierce()       { return this.value(315) }
    /** Enum Value:                                        316 */
    get FlyAttackOff()                 { return this.value(316) }
    /** Enum Value:                                        317 */
    get FlyAttackOffPierce()           { return this.value(317) }
    /** Enum Value:                                        318 */
    get FlySheath()                    { return this.value(318) }
    /** Enum Value:                                        319 */
    get FlyHipSheath()                 { return this.value(319) }
    /** Enum Value:                                        320 */
    get FlyMount()                     { return this.value(320) }
    /** Enum Value:                                        321 */
    get FlyRunRight()                  { return this.value(321) }
    /** Enum Value:                                        322 */
    get FlyRunLeft()                   { return this.value(322) }
    /** Enum Value:                                        323 */
    get FlyMountSpecial()              { return this.value(323) }
    /** Enum Value:                                        324 */
    get FlyKick()                      { return this.value(324) }
    /** Enum Value:                                        325 */
    get FlySitGroundDown()             { return this.value(325) }
    /** Enum Value:                                        326 */
    get FlySitGround()                 { return this.value(326) }
    /** Enum Value:                                        327 */
    get FlySitGroundUp()               { return this.value(327) }
    /** Enum Value:                                        328 */
    get FlySleepDown()                 { return this.value(328) }
    /** Enum Value:                                        329 */
    get FlySleep()                     { return this.value(329) }
    /** Enum Value:                                        330 */
    get FlySleepUp()                   { return this.value(330) }
    /** Enum Value:                                        331 */
    get FlySitChairLow()               { return this.value(331) }
    /** Enum Value:                                        332 */
    get FlySitChairMed()               { return this.value(332) }
    /** Enum Value:                                        333 */
    get FlySitChairHigh()              { return this.value(333) }
    /** Enum Value:                                        334 */
    get FlyLoadBow()                   { return this.value(334) }
    /** Enum Value:                                        335 */
    get FlyLoadRifle()                 { return this.value(335) }
    /** Enum Value:                                        336 */
    get FlyAttackThrown()              { return this.value(336) }
    /** Enum Value:                                        337 */
    get FlyReadyThrown()               { return this.value(337) }
    /** Enum Value:                                        338 */
    get FlyHoldBow()                   { return this.value(338) }
    /** Enum Value:                                        339 */
    get FlyHoldRifle()                 { return this.value(339) }
    /** Enum Value:                                        340 */
    get FlyHoldThrown()                { return this.value(340) }
    /** Enum Value:                                        341 */
    get FlyLoadThrown()                { return this.value(341) }
    /** Enum Value:                                        342 */
    get FlyEmoteSalute()               { return this.value(342) }
    /** Enum Value:                                        343 */
    get FlyKneelStart()                { return this.value(343) }
    /** Enum Value:                                        344 */
    get FlyKneelLoop()                 { return this.value(344) }
    /** Enum Value:                                        345 */
    get FlyKneelEnd()                  { return this.value(345) }
    /** Enum Value:                                        346 */
    get FlyAttackUnarmedOff()          { return this.value(346) }
    /** Enum Value:                                        347 */
    get FlySpecialUnarmed()            { return this.value(347) }
    /** Enum Value:                                        348 */
    get FlyStealthWalk()               { return this.value(348) }
    /** Enum Value:                                        349 */
    get FlyStealthStand()              { return this.value(349) }
    /** Enum Value:                                        350 */
    get FlyKnockdown()                 { return this.value(350) }
    /** Enum Value:                                        351 */
    get FlyEatingLoop()                { return this.value(351) }
    /** Enum Value:                                        352 */
    get FlyUseStandingLoop()           { return this.value(352) }
    /** Enum Value:                                        353 */
    get FlyChannelCastDirected()       { return this.value(353) }
    /** Enum Value:                                        354 */
    get FlyChannelCastOmni()           { return this.value(354) }
    /** Enum Value:                                        355 */
    get FlyWhirlwind()                 { return this.value(355) }
    /** Enum Value:                                        356 */
    get FlyBirth()                     { return this.value(356) }
    /** Enum Value:                                        357 */
    get FlyUseStandingStart()          { return this.value(357) }
    /** Enum Value:                                        358 */
    get FlyUseStandingEnd()            { return this.value(358) }
    /** Enum Value:                                        359 */
    get FlyCreatureSpecial()           { return this.value(359) }
    /** Enum Value:                                        360 */
    get FlyDrown()                     { return this.value(360) }
    /** Enum Value:                                        361 */
    get FlyDrowned()                   { return this.value(361) }
    /** Enum Value:                                        362 */
    get FlyFishingCast()               { return this.value(362) }
    /** Enum Value:                                        363 */
    get FlyFishingLoop()               { return this.value(363) }
    /** Enum Value:                                        364 */
    get FlyFly()                       { return this.value(364) }
    /** Enum Value:                                        365 */
    get FlyEmoteWorkNoSheathe()        { return this.value(365) }
    /** Enum Value:                                        366 */
    get FlyEmoteStunNoSheathe()        { return this.value(366) }
    /** Enum Value:                                        367 */
    get FlyEmoteUseStandingNoSheathe() { return this.value(367) }
    /** Enum Value:                                        368 */
    get FlySpellSleepDown()            { return this.value(368) }
    /** Enum Value:                                        369 */
    get FlySpellKneelStart()           { return this.value(369) }
    /** Enum Value:                                        370 */
    get FlySpellKneelLoop()            { return this.value(370) }
    /** Enum Value:                                        371 */
    get FlySpellKneelEnd()             { return this.value(371) }
    /** Enum Value:                                        372 */
    get FlySprint()                    { return this.value(372) }
    /** Enum Value:                                        373 */
    get FlyInFlight()                  { return this.value(373) }
    /** Enum Value:                                        374 */
    get FlySpawn()                     { return this.value(374) }
    /** Enum Value:                                        375 */
    get FlyClose()                     { return this.value(375) }
    /** Enum Value:                                        376 */
    get FlyClosed()                    { return this.value(376) }
    /** Enum Value:                                        377 */
    get FlyOpen()                      { return this.value(377) }
    /** Enum Value:                                        378 */
    get FlyOpened()                    { return this.value(378) }
    /** Enum Value:                                        379 */
    get FlyDestroy()                   { return this.value(379) }
    /** Enum Value:                                        380 */
    get FlyDestroyed()                 { return this.value(380) }
    /** Enum Value:                                        381 */
    get FlyRebuild()                   { return this.value(381) }
    /** Enum Value:                                        382 */
    get FlyCustom0()                   { return this.value(382) }
    /** Enum Value:                                        383 */
    get FlyCustom1()                   { return this.value(383) }
    /** Enum Value:                                        384 */
    get FlyCustom2()                   { return this.value(384) }
    /** Enum Value:                                        385 */
    get FlyCustom3()                   { return this.value(385) }
    /** Enum Value:                                        386 */
    get FlyDespawn()                   { return this.value(386) }
    /** Enum Value:                                        387 */
    get FlyHold()                      { return this.value(387) }
    /** Enum Value:                                        388 */
    get FlyDecay()                     { return this.value(388) }
    /** Enum Value:                                        389 */
    get FlyBowPull()                   { return this.value(389) }
    /** Enum Value:                                        390 */
    get FlyBowRelease()                { return this.value(390) }
    /** Enum Value:                                        391 */
    get FlyShipStart()                 { return this.value(391) }
    /** Enum Value:                                        392 */
    get FlyShipMoving()                { return this.value(392) }
    /** Enum Value:                                        393 */
    get FlyShipStop()                  { return this.value(393) }
    /** Enum Value:                                        394 */
    get FlyGroupArrow()                { return this.value(394) }
    /** Enum Value:                                        395 */
    get FlyArrow()                     { return this.value(395) }
    /** Enum Value:                                        396 */
    get FlyCorpseArrow()               { return this.value(396) }
    /** Enum Value:                                        397 */
    get FlyGuideArrow()                { return this.value(397) }
    /** Enum Value:                                        398 */
    get FlySway()                      { return this.value(398) }
    /** Enum Value:                                        399 */
    get FlyDruidCatPounce()            { return this.value(399) }
    /** Enum Value:                                        400 */
    get FlyDruidCatRip()               { return this.value(400) }
    /** Enum Value:                                        401 */
    get FlyDruidCatRake()              { return this.value(401) }
    /** Enum Value:                                        402 */
    get FlyDruidCatRavage()            { return this.value(402) }
    /** Enum Value:                                        403 */
    get FlyDruidCatClaw()              { return this.value(403) }
    /** Enum Value:                                        404 */
    get FlyDruidCatCower()             { return this.value(404) }
    /** Enum Value:                                        405 */
    get FlyDruidBearSwipe()            { return this.value(405) }
    /** Enum Value:                                        406 */
    get FlyDruidBearBite()             { return this.value(406) }
    /** Enum Value:                                        407 */
    get FlyDruidBearMaul()             { return this.value(407) }
    /** Enum Value:                                        408 */
    get FlyDruidBearBash()             { return this.value(408) }
    /** Enum Value:                                        409 */
    get FlyDragonTail()                { return this.value(409) }
    /** Enum Value:                                        410 */
    get FlyDragonStomp()               { return this.value(410) }
    /** Enum Value:                                        411 */
    get FlyDragonSpit()                { return this.value(411) }
    /** Enum Value:                                        412 */
    get FlyDragonSpitHover()           { return this.value(412) }
    /** Enum Value:                                        413 */
    get FlyDragonSpitFly()             { return this.value(413) }
    /** Enum Value:                                        414 */
    get FlyEmoteYes()                  { return this.value(414) }
    /** Enum Value:                                        415 */
    get FlyEmoteNo()                   { return this.value(415) }
    /** Enum Value:                                        416 */
    get FlyJumpLandRun()               { return this.value(416) }
    /** Enum Value:                                        417 */
    get FlyLootHold()                  { return this.value(417) }
    /** Enum Value:                                        418 */
    get FlyLootUp()                    { return this.value(418) }
    /** Enum Value:                                        419 */
    get FlyStandHigh()                 { return this.value(419) }
    /** Enum Value:                                        420 */
    get FlyImpact()                    { return this.value(420) }
    /** Enum Value:                                        421 */
    get FlyLiftOff()                   { return this.value(421) }
    /** Enum Value:                                        422 */
    get FlyHover()                     { return this.value(422) }
    /** Enum Value:                                        423 */
    get FlySuccubusEntice()            { return this.value(423) }
    /** Enum Value:                                        424 */
    get FlyEmoteTrain()                { return this.value(424) }
    /** Enum Value:                                        425 */
    get FlyEmoteDead()                 { return this.value(425) }
    /** Enum Value:                                        426 */
    get FlyEmoteDanceOnce()            { return this.value(426) }
    /** Enum Value:                                        427 */
    get FlyDeflect()                   { return this.value(427) }
    /** Enum Value:                                        428 */
    get FlyEmoteEatNoSheathe()         { return this.value(428) }
    /** Enum Value:                                        429 */
    get FlyLand()                      { return this.value(429) }
    /** Enum Value:                                        430 */
    get FlySubmerge()                  { return this.value(430) }
    /** Enum Value:                                        431 */
    get FlySubmerged()                 { return this.value(431) }
    /** Enum Value:                                        432 */
    get FlyCannibalize()               { return this.value(432) }
    /** Enum Value:                                        433 */
    get FlyArrowBirth()                { return this.value(433) }
    /** Enum Value:                                        434 */
    get FlyGroupArrowBirth()           { return this.value(434) }
    /** Enum Value:                                        435 */
    get FlyCorpseArrowBirth()          { return this.value(435) }
    /** Enum Value:                                        436 */
    get FlyGuideArrowBirth()           { return this.value(436) }
    /** Enum Value:                                        437 */
    get FlyEmoteTalkNoSheathe()        { return this.value(437) }
    /** Enum Value:                                        438 */
    get FlyEmotePointNoSheathe()       { return this.value(438) }
    /** Enum Value:                                        439 */
    get FlyEmoteSaluteNoSheathe()      { return this.value(439) }
    /** Enum Value:                                        440 */
    get FlyEmoteDanceSpecial()         { return this.value(440) }
    /** Enum Value:                                        441 */
    get FlyMutilate()                  { return this.value(441) }
    /** Enum Value:                                        442 */
    get FlyCustomSpell01()             { return this.value(442) }
    /** Enum Value:                                        443 */
    get FlyCustomSpell02()             { return this.value(443) }
    /** Enum Value:                                        444 */
    get FlyCustomSpell03()             { return this.value(444) }
    /** Enum Value:                                        445 */
    get FlyCustomSpell04()             { return this.value(445) }
    /** Enum Value:                                        446 */
    get FlyCustomSpell05()             { return this.value(446) }
    /** Enum Value:                                        447 */
    get FlyCustomSpell06()             { return this.value(447) }
    /** Enum Value:                                        448 */
    get FlyCustomSpell07()             { return this.value(448) }
    /** Enum Value:                                        449 */
    get FlyCustomSpell08()             { return this.value(449) }
    /** Enum Value:                                        450 */
    get FlyCustomSpell09()             { return this.value(450) }
    /** Enum Value:                                        451 */
    get FlyCustomSpell10()             { return this.value(451) }
    /** Enum Value:                                        452 */
    get FlyStealthRun()                { return this.value(452) }
    /** Enum Value:                                        453 */
    get FlyEmerge()                    { return this.value(453) }
    /** Enum Value:                                        454 */
    get FlyCower()                     { return this.value(454) }
    /** Enum Value:                                        455 */
    get FlyGrab()                      { return this.value(455) }
    /** Enum Value:                                        456 */
    get FlyGrabClosed()                { return this.value(456) }
    /** Enum Value:                                        457 */
    get FlyGrabThrown()                { return this.value(457) }
    /** Enum Value:                                        458 */
    get ToFly()                        { return this.value(458) }
    /** Enum Value:                                        459 */
    get ToHover()                      { return this.value(459) }
    /** Enum Value:                                        460 */
    get ToGround()                     { return this.value(460) }
    /** Enum Value:                                        461 */
    get FlyToFly()                     { return this.value(461) }
    /** Enum Value:                                        462 */
    get FlyToHover()                   { return this.value(462) }
    /** Enum Value:                                        463 */
    get FlyToGround()                  { return this.value(463) }
    /** Enum Value:                                        464 */
    get Settle()                       { return this.value(464) }
    /** Enum Value:                                        465 */
    get FlySettle()                    { return this.value(465) }
    /** Enum Value:                                        466 */
    get DeathStart()                   { return this.value(466) }
    /** Enum Value:                                        467 */
    get DeathLoop()                    { return this.value(467) }
    /** Enum Value:                                        468 */
    get DeathEnd()                     { return this.value(468) }
    /** Enum Value:                                        469 */
    get FlyDeathStart()                { return this.value(469) }
    /** Enum Value:                                        470 */
    get FlyDeathLoop()                 { return this.value(470) }
    /** Enum Value:                                        471 */
    get FlyDeathEnd()                  { return this.value(471) }
    /** Enum Value:                                        472 */
    get DeathEndHold()                 { return this.value(472) }
    /** Enum Value:                                        473 */
    get FlyDeathEndHold()              { return this.value(473) }
    /** Enum Value:                                        474 */
    get Strangulate()                  { return this.value(474) }
    /** Enum Value:                                        475 */
    get FlyStrangulate()               { return this.value(475) }
    /** Enum Value:                                        476 */
    get ReadyJoust()                   { return this.value(476) }
    /** Enum Value:                                        477 */
    get LoadJoust()                    { return this.value(477) }
    /** Enum Value:                                        478 */
    get HoldJoust()                    { return this.value(478) }
    /** Enum Value:                                        479 */
    get FlyReadyJoust()                { return this.value(479) }
    /** Enum Value:                                        480 */
    get FlyLoadJoust()                 { return this.value(480) }
    /** Enum Value:                                        481 */
    get FlyHoldJoust()                 { return this.value(481) }
    /** Enum Value:                                        482 */
    get AttackJoust()                  { return this.value(482) }
    /** Enum Value:                                        483 */
    get FlyAttackJoust()               { return this.value(483) }
    /** Enum Value:                                        484 */
    get ReclinedMount()                { return this.value(484) }
    /** Enum Value:                                        485 */
    get FlyReclinedMount()             { return this.value(485) }
    /** Enum Value:                                        486 */
    get ToAltered()                    { return this.value(486) }
    /** Enum Value:                                        487 */
    get FromAltered()                  { return this.value(487) }
    /** Enum Value:                                        488 */
    get FlyToAltered()                 { return this.value(488) }
    /** Enum Value:                                        489 */
    get FlyFromAltered()               { return this.value(489) }
    /** Enum Value:                                        490 */
    get InStocks()                     { return this.value(490) }
    /** Enum Value:                                        491 */
    get FlyInStocks()                  { return this.value(491) }
    /** Enum Value:                                        492 */
    get VehicleGrab()                  { return this.value(492) }
    /** Enum Value:                                        493 */
    get VehicleThrow()                 { return this.value(493) }
    /** Enum Value:                                        494 */
    get FlyVehicleGrab()               { return this.value(494) }
    /** Enum Value:                                        495 */
    get FlyVehicleThrow()              { return this.value(495) }
    /** Enum Value:                                        496 */
    get ToAlteredPostSwap()            { return this.value(496) }
    /** Enum Value:                                        497 */
    get FromAlteredPostSwap()          { return this.value(497) }
    /** Enum Value:                                        498 */
    get FlyToAlteredPostSwap()         { return this.value(498) }
    /** Enum Value:                                        499 */
    get FlyFromAlteredPostSwap()       { return this.value(499) }
    /** Enum Value:                                        500 */
    get ReclinedMountPassenger()       { return this.value(500) }
    /** Enum Value:                                        501 */
    get FlyReclinedMountPassenger()    { return this.value(501) }
    /** Enum Value:                                        502 */
    get Carry2H()                      { return this.value(502) }
    /** Enum Value:                                        503 */
    get Carried2H()                    { return this.value(503) }
    /** Enum Value:                                        504 */
    get FlyCarry2H()                   { return this.value(504) }
    /** Enum Value:                                        505 */
    get FlyCarried2H()                 { return this.value(505) }
}