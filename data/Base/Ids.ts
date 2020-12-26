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
import { GetIdRange, GetId } from "wotlkdata/ids/Ids"
import { SQLNames } from "wotlkdata/sql/SQLFiles"
import { DBCNames } from "wotlkdata/dbc/DBCFiles"

class IdGenerator {
    table : SQLNames | DBCNames
    startId : number;
    constructor(table : SQLNames | DBCNames, startId : number) {
        this.table = table;
        this.startId = startId;
    }

    id(mod: string, name: string) {
        return GetId(this.table,mod,name,this.startId);
    }
}

export class AutoIdGenerator {
    curid: number;
    constructor(startId: number) {
        this.curid = startId;
    }

    id() {
        return this.curid++;
    }
}

export const Ids = {
    /** Starts at 39 , Highest base value is 38 */
    Language: new IdGenerator('Languages',39),
    /** Start at 200000, Highest base value is 80864 */
    Spell: new IdGenerator('Spell',200000),
    /** Starts at 16680, Highest base value is 16679*/
    SpellVisual: new AutoIdGenerator(16680),
    /** Starts at 15543, Highest base value is 15542 */
    SpellKit: new AutoIdGenerator(15543),
    /** Start at 21981, Highest base value is 21980 */
    SkillLineAbility: new AutoIdGenerator(21981),
    /** Start at 789, Highest base value is 788 */
    SkillLine: new IdGenerator('SkillLineAbility',789),
    /** Start at 971, Highest base value is 970 */
    SkillRaceClassInfo: new AutoIdGenerator(971),
    /** Start at 27000 , Highest base value is 26034 */
    Quest: new IdGenerator('quest_template',27000),
    /** Start at 178, Highest base value is 177 */
    Title: new IdGenerator('CharTitles',178),
    /** Start at 5000, Highest base value is 4824 */
    Achievement: new IdGenerator('Achievement',5000),
    /** Start at 20000, Highest base value is 13470 */
    AchievementCriteria: new IdGenerator('Achievement_Criteria',20000),
    /** Start at 4376, Highest base value is 4375 */
    SpellIcon: new AutoIdGenerator(4376),
    /** Starts at 1000000, Highest base value is 3479*/
    FishingLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 100006 */
    CreatureLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 195672 */
    GameObjectLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 54537 */
    ItemLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 69 */
    DisenchantLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 36912 */
    ProspectingLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 36912 */
    MillingLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 34839 */
    PickPocketLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 100014 */
    SkinningLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 287 */
    MailLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 526760 */
    ReferenceLoot: new AutoIdGenerator(1000000),
    /** Starts at 1000000, Highest base value is 69412 */
    SpellLoot: new AutoIdGenerator(1000000),
    /** Starts at 1161, Highest base value is 1160. */
    Faction: new IdGenerator('Faction',1161),
    /** Starts at 2237, Highest base value is 2236. */
    FactionTemplate: new AutoIdGenerator(2237),
    /** Starts at 105, Highest base value is 104. */
    // @ts-ignore: ReputationIndex is not a real table
    ReputationIndex: new IdGenerator('ReputationIndex',105),
    /** Start at 100000 , Highest base value is 56807 */
    Item: new IdGenerator('item_template',100000),
    /** Starts at 12, Highest base value is 11 */
    Class: new IdGenerator('ChrClasses',12),
    /** Starts at 100000, Highest base value is 43282 */
    CreatureTemplate: new IdGenerator('creature_template',1000000),
    /** Starts at 1000000, Highest base value is 213824 */
    CreatureInstance: new IdGenerator('creature',1000000),
    /** Starts at 401, Highest base value is 400*/
    TalentTab: new IdGenerator('TalentTab',401),
    /** Starts at 500, Highest base value is ?? */
    CharStartOutfit: new AutoIdGenerator(400),
    /** Starts at 128, Highest base value is 127 */
    Trainer: new AutoIdGenerator(128),
    /** Starts at 16777215, Highest base value is 1000000 (Below highest) */
    NPCText: new AutoIdGenerator(1000000),
    /** Starts at 100000, Highest base value is 74294 */
    GossipMenuOption: new AutoIdGenerator(100000),
    /** Starts at 58000, highest base value is 57019 */
    GossipMenu: new AutoIdGenerator(58000),
    /** Starts at 100000, highest base value is 77865 */
    BroadcastText: new AutoIdGenerator(100000),
    /** Starts at 210, highest base value is 209 */
    SpellCastTimes: new AutoIdGenerator(210),
    /** Starts at 2600, highest base value is 2513*/
    SpellRuneCost: new AutoIdGenerator(2600),
    /** Starts at 3000, highest base value is 2935*/
    SummonProperties: new AutoIdGenerator(3000),
    /** Starts at 191, highest base value is 190 */
    TotemCategory: new AutoIdGenerator(191),
    /** Starts at 3000, highest base value is 2997 */
    ItemExtendedCost: new AutoIdGenerator(3000),
    /** Starts at 10000000, highest base value is 9541001 */
    Waypoints: new AutoIdGenerator(10000000),
    /** Starts at 3000, highest base value is 2285*/
    Talent: new IdGenerator('Talent',3000),
    /** Starts at 603, highest base value is 602*/
    SpellDuration: new AutoIdGenerator(603),
    /** Starts at 200, highest base value is 187*/
    SpellRange: new AutoIdGenerator(200),
    /** Starts at 66, highest base value is 65*/
    SpellRadius: new AutoIdGenerator(66),
    /** Starts at 3000, highest base value is 2706 */
    SpellMissile: new AutoIdGenerator(3000),
    /** Starts at 182, highest base value is 181*/
    SpellDescriptionVariable: new AutoIdGenerator(182),
    /** Starts at 2500, highest base value is 2401 */
    SpellDifficulty: new AutoIdGenerator(2500),
    /** Starts at 33, highest base value is 32 */
    SpellShapeshiftForm: new AutoIdGenerator(33),
    /** Starts at 33000, highest base value is 32754 */
    CreatureDisplayInfo: new AutoIdGenerator(33000),
    /** Starts at 70000, highest base value is 68742 */
    ItemDisplayInfo: new AutoIdGenerator(70000),
    /** Starts at 8000, highest base value is 7087 */
    SpellVisualEffectName: new AutoIdGenerator(8000),
    /** 
     * Starts at 5000000, highest base value is CreatureTemplate which grows up from 1000000.
     * Will collide if using more than 4000000 creature templates.
     */
    Vendor: new AutoIdGenerator(4000000),
    /** 
     * Starts at 8000000, highest base value is Vendor which grows up from 4000000.
     * Will collide if using more than 4000000 Vendors.
     */
    TrainerCreature: new AutoIdGenerator(8000000),
    /** Starts at 2539, highest base value is 2538 */
    Light: new AutoIdGenerator(2539),
    /** Starts at 918, highest base value is 917*/
    LightParam: new AutoIdGenerator(918),
    /** Starts at 4988, highest base value is 4987*/
    Area: new IdGenerator('AreaTable',4988),
    /** Starts at 3618, highest base value is 3617 */
    // @ts-ignore
    AreaBit: new IdGenerator('AreaTableExplore',3618),
    /** Starts at 255, highest base value is 254 */
    LoadingScreens: new AutoIdGenerator(255),
    /** Starts at 725, highest base value is 724 */
    Map: new IdGenerator('Map', 725)
}
