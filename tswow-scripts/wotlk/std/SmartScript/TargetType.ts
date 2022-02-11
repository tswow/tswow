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
import { smart_scriptsRow } from "../../sql/smart_scripts"
import { Position } from "../Misc/Position"
import { SmartScript } from "./SmartScript"

const TARGET_TYPES : {[key:string]:string} = {
    '0': 'None',
    '1': 'Self',
    '2': 'Victim',
    '3': 'HostileSecondAggro',
    '4': 'HostileLastAggro',
    '5': 'HostileRandom',
    '6': 'HostileRandomNotTop',
    '7': 'ActionInvoker',
    '8': 'Position',
    '9': 'CreatureRange',
    '10': 'CreatureGuid',
    '11': 'CreatureDistance',
    '12': 'Stored',
    '13': 'GameobjectRange',
    '14': 'GameobjectGuid',
    '15': 'GameobjectDistance',
    '16': 'InvokerParty',
    '17': 'PlayerRange',
    '18': 'PlayerDistance',
    '19': 'ClosestCreature',
    '20': 'ClosestGameobject',
    '21': 'ClosestPlayer',
    '22': 'ActionInvokerVehicle',
    '23': 'OwnerOrSummoner',
    '24': 'ThreatList',
    '25': 'ClosestEnemy',
    '26': 'ClosestFriendly',
    '27': 'LootRecipients',
    '28': 'Farthest',
    '29': 'VehicleAccessory',
    '30': 'ClosestUnspawnedGameobject'
}

export const TARGET_ARGS: {[key:string]:string[]} = {
    '0': ['','','','','','','',''],
    '1': ['','','','','','','',''],
    '2': ['','','','','','','',''],
    '3': ['','','','','','','',''],
    '4': ['','','','','','','',''],
    '5': ['','','','','','','',''],
    '6': ['','','','','','','',''],
    '7': ['','','','','','','',''],
    '8': ['','','','','x','y','z','o'],
    '9': ['creature','minDist','maxDist','numOfTargets','','','',''],
    '10': ['guid','entry','','','','','',''],
    '11': ['creature','maxDist','targets','','','','',''],
    '12': ['id','','','','','','',''],
    '13': ['gObject','minDist','maxDist','targets','','','',''],
    '14': ['guid','entry','','','','','',''],
    '15': ['gObject','maxDist','all targets','','','','',''],
    '16': ['','','','','','','',''],
    '17': ['minDist','maxDist','','','','','',''],
    '18': ['maxDist','','','','','','',''],
    '19': ['creature','maxDist','isDead','','','','',''],
    '20': ['gObject','maxDist','','','','','',''],
    '21': ['maxDist','','','','','','',''],
    '22': ['','','','','','','',''],
    '23': ['','','','','','','',''],
    '24': ['','','','','','','',''],
    '25': ['maxDist','playerOnly','','','','','',''],
    '26': ['maxDist','playerOnly','','','','','',''],
    '27': ['','','','','','','',''],
    '28': ['maxDist','playerOnly','isInLos','','','','',''],
    '29': ['seat','','','','','','',''],
    '30': ['goEntry','maxDist','','','','','','']
}

export class TargetType {
    protected row : smart_scriptsRow
    protected main: SmartScript

    constructor(main: SmartScript, row: smart_scriptsRow) {
        this.row = row
        this.main = main
    }

    getType() {
        return TARGET_TYPES[this.row.target_type.get()]
    }

    getArguments() {
        const argmap : {[key:string]:number}= {}
        const arglist = TARGET_ARGS[this.row.target_type.get()]
        if(arglist[0].length>0) argmap[arglist[0]] = this.row.target_param1.get()
        if(arglist[1].length>0) argmap[arglist[1]] = this.row.target_param2.get()
        if(arglist[2].length>0) argmap[arglist[2]] = this.row.target_param3.get()
        if(arglist[3].length>0) argmap[arglist[3]] = this.row.target_param4.get()
        if(arglist[4].length>0) argmap[arglist[4]] = this.row.target_x.get()
        if(arglist[5].length>0) argmap[arglist[5]] = this.row.target_y.get()
        if(arglist[6].length>0) argmap[arglist[6]] = this.row.target_z.get()
        if(arglist[7].length>0) argmap[arglist[7]] = this.row.target_o.get()
        return argmap
    }

    objectify() {
        return {type: this.getType(), arguments: this.getArguments()}
    }

    /**
     *  None.
     */
    setNone() {
        this.row.target_type.set(0)
        return this.main
    }

    /**
     *  Self cast.
     */
    setSelf() {
        this.row.target_type.set(1)
        return this.main
    }

    /**
     *  Our current target. (ie: highest aggro)
     */
    setVictim() {
        this.row.target_type.set(2)
        return this.main
    }

    /**
     *  Second highest aggro.
     */
    setHostileSecondAggro() {
        this.row.target_type.set(3)
        return this.main
    }

    /**
     *  Dead last on aggro.
     */
    setHostileLastAggro() {
        this.row.target_type.set(4)
        return this.main
    }

    /**
     *  Just any random target on our threat list.
     */
    setHostileRandom() {
        this.row.target_type.set(5)
        return this.main
    }

    /**
     *  Any random target except top threat.
     */
    setHostileRandomNotTop() {
        this.row.target_type.set(6)
        return this.main
    }

    /**
     *  Unit who caused this Event to occur.
     */
    setActionInvoker() {
        this.row.target_type.set(7)
        return this.main
    }

    /**
     *  Use xyz from event params.
     *  @param x
     *  @param y
     *  @param z
     *  @param o
     */
    setPosition(pos: Position) {
        this.row.target_type.set(8)
        this.row.target_x.set(pos.x)
        this.row.target_y.set(pos.y)
        this.row.target_z.set(pos.z)
        this.row.target_o.set(pos.o)
        return this.main
    }

    /**
     *  (Random?) creature with specified ID within specified range.
     *  @param creature Entry (0 any)
     *  @param minDist
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setCreatureRange(creature : number, minDist : number, maxDist : number, num : number) {
        this.row.target_type.set(9)
        this.row.target_param1.set(creature)
        this.row.target_param2.set(minDist)
        this.row.target_param3.set(maxDist)
        this.row.target_param4.set(num)
        return this.main
    }

    /**
     *  Creature with specified GUID.
     *  @param guid
     *  @param entry
     */
    setCreatureGuid(guid : number, entry : number) {
        this.row.target_type.set(10)
        this.row.target_param1.set(guid)
        this.row.target_param2.set(entry)
        return this.main
    }

    /**
     *  Creature with specified ID within distance. (Different from #9?)
     *  @param creature Entry (0 any)
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setCreatureDistance(creature : number, maxDist : number, num : number) {
        this.row.target_type.set(11)
        this.row.target_param1.set(creature)
        this.row.target_param2.set(maxDist)
        this.row.target_param3.set(num)
        return this.main
    }

    /**
     *  Uses pre-stored target(list)
     *  @param id
     */
    setStored(id : number) {
        this.row.target_type.set(12)
        this.row.target_param1.set(id)
        return this.main
    }

    /**
     *  (Random?) object with specified ID within specified range.
     *  @param GO Entry (0 any)
     *  @param minDist
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setGameobjectRange(GO : number, minDist : number, maxDist : number, num : number) {
        this.row.target_type.set(13)
        this.row.target_param1.set(GO)
        this.row.target_param2.set(minDist)
        this.row.target_param3.set(maxDist)
        this.row.target_param4.set(num)
        return this.main
    }

    /**
     *  Object with specified GUID.
     *  @param guid
     *  @param entry
     */
    setGameobjectGuid(guid : number, entry : number) {
        this.row.target_type.set(14)
        this.row.target_param1.set(guid)
        this.row.target_param2.set(entry)
        return this.main
    }

    /**
     *  Object with specified ID within distance. (Different from #13?)
     *  @param GO Entry (0 any)
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setGameobjectDistance(GO : number, maxDist : number, num : number) {
        this.row.target_type.set(15)
        this.row.target_param1.set(GO)
        this.row.target_param2.set(maxDist)
        this.row.target_param3.set(num)
        return this.main
    }

    /**
     *  Invoker's party members
     */
    setInvokerParty() {
        this.row.target_type.set(16)
        return this.main
    }

    /**
     *  (Random?) player within specified range.
     *  @param minDist
     *  @param maxDist
     */
    setPlayerRange(minDist : number, maxDist : number) {
        this.row.target_type.set(17)
        this.row.target_param1.set(minDist)
        this.row.target_param2.set(maxDist)
        return this.main
    }

    /**
     *  (Random?) player within specified distance. (Different from #17?)
     *  @param maxDist
     */
    setPlayerDistance(maxDist : number) {
        this.row.target_type.set(18)
        this.row.target_param1.set(maxDist)
        return this.main
    }

    /**
     *  Closest creature with specified ID within specified range.
     *  @param creature Entry (0 any)
     *  @param maxDist (Can be from 0-100 yards)
     *  @param dead? (0/1)
     */
    setClosestCreature(creature : number, maxDist : number, dead : number) {
        this.row.target_type.set(19)
        this.row.target_param1.set(creature)
        this.row.target_param2.set(maxDist)
        this.row.target_param3.set(dead)
        return this.main
    }

    /**
     *  Closest object with specified ID within specified range.
     *  @param GO Entry (0 any)
     *  @param maxDist (Can be from 0-100 yards)
     */
    setClosestGameobject(GO : number, maxDist : number) {
        this.row.target_type.set(20)
        this.row.target_param1.set(GO)
        this.row.target_param2.set(maxDist)
        return this.main
    }

    /**
     *  Closest player within specified range.
     *  @param maxDist
     */
    setClosestPlayer(maxDist : number) {
        this.row.target_type.set(21)
        this.row.target_param1.set(maxDist)
        return this.main
    }

    /**
     *  Unit's vehicle who caused this Event to occur
     */
    setActionInvokerVehicle() {
        this.row.target_type.set(22)
        return this.main
    }

    /**
     *  Unit's owner or summoner
     */
    setOwnerOrSummoner() {
        this.row.target_type.set(23)
        return this.main
    }

    /**
     *  All units on creature's threat list
     */
    setThreatList() {
        this.row.target_type.set(24)
        return this.main
    }

    /**
     *  Any attackable target (creature or player) within maxDist
     *  @param maxDist
     *  @param playerOnly (0/1)
     */
    setClosestEnemy(maxDist : number, playerOnly : number) {
        this.row.target_type.set(25)
        this.row.target_param1.set(maxDist)
        this.row.target_param2.set(playerOnly)
        return this.main
    }

    /**
     *  Any friendly unit (creature, player or pet) within maxDist
     *  @param maxDist
     *  @param playerOnly (0/1)
     */
    setClosestFriendly(maxDist : number, playerOnly : number) {
        this.row.target_type.set(26)
        this.row.target_param1.set(maxDist)
        this.row.target_param2.set(playerOnly)
        return this.main
    }

    /**
     *  All tagging players
     */
    setLootRecipients() {
        this.row.target_type.set(27)
        return this.main
    }

    /**
     *  Farthest unit on the threat list
     *  @param maxDist
     *  @param playerOnly
     *  @param isInLos (0/1)
     */
    setFarthest(maxDist : number, playerOnly : number, isInLos : number) {
        this.row.target_type.set(28)
        this.row.target_param1.set(maxDist)
        this.row.target_param2.set(playerOnly)
        this.row.target_param3.set(isInLos)
        return this.main
    }

    /**
     *  Vehicle can target unit in given seat
     *  @param seat
     */
    setVehicleAccessory(seat : number) {
        this.row.target_type.set(29)
        this.row.target_param1.set(seat)
        return this.main
    }

    /**
     *  Closest unspawned object with specified ID within specified range. (to be used only with action 70 and gameobjects with negative respawn time in the DB)
     *  @param GO Entry (0 any)
     *  @param maxDist (Can be from 0-100 yards)
     */
    setClosestUnspawnedGameobject(GO : number, maxDist : number) {
        this.row.target_type.set(30)
        this.row.target_param1.set(GO)
        this.row.target_param2.set(maxDist)
        return this.main
    }
}