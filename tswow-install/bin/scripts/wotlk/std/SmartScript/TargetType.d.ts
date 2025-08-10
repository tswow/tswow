import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { smart_scriptsRow } from "../../sql/smart_scripts";
import { Position } from "../Misc/Position";
import { SmartScript } from "./SmartScript";
export declare const TARGET_ARGS: {
    [key: string]: string[];
};
export declare class TargetType {
    protected row: smart_scriptsRow;
    protected main: SmartScript;
    constructor(main: SmartScript, row: smart_scriptsRow);
    getType(): string;
    getArguments(): {
        [key: string]: number;
    };
    objectify(options?: ObjectifyOptions): {
        type: string;
        arguments: {
            [key: string]: number;
        };
    };
    /**
     *  None.
     */
    setNone(): SmartScript;
    /**
     *  Self cast.
     */
    setSelf(): SmartScript;
    /**
     *  Our current target. (ie: highest aggro)
     */
    setVictim(): SmartScript;
    /**
     *  Second highest aggro.
     */
    setHostileSecondAggro(): SmartScript;
    /**
     *  Dead last on aggro.
     */
    setHostileLastAggro(): SmartScript;
    /**
     *  Just any random target on our threat list.
     */
    setHostileRandom(): SmartScript;
    /**
     *  Any random target except top threat.
     */
    setHostileRandomNotTop(): SmartScript;
    /**
     *  Unit who caused this Event to occur.
     */
    setActionInvoker(): SmartScript;
    /**
     *  Use xyz from event params.
     *  @param x
     *  @param y
     *  @param z
     *  @param o
     */
    setPosition(pos: Position): SmartScript;
    /**
     *  (Random?) creature with specified ID within specified range.
     *  @param creature Entry (0 any)
     *  @param minDist
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setCreatureRange(creature: number, minDist: number, maxDist: number, num: number): SmartScript;
    /**
     *  Creature with specified GUID.
     *  @param guid
     *  @param entry
     */
    setCreatureGuid(guid: number, entry: number): SmartScript;
    /**
     *  Creature with specified ID within distance. (Different from #9?)
     *  @param creature Entry (0 any)
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setCreatureDistance(creature: number, maxDist: number, num: number): SmartScript;
    /**
     *  Uses pre-stored target(list)
     *  @param id
     */
    setStored(id: number): SmartScript;
    /**
     *  (Random?) object with specified ID within specified range.
     *  @param GO Entry (0 any)
     *  @param minDist
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setGameobjectRange(GO: number, minDist: number, maxDist: number, num: number): SmartScript;
    /**
     *  Object with specified GUID.
     *  @param guid
     *  @param entry
     */
    setGameobjectGuid(guid: number, entry: number): SmartScript;
    /**
     *  Object with specified ID within distance. (Different from #13?)
     *  @param GO Entry (0 any)
     *  @param maxDist
     *  @param Number of target 0 = all targets
     */
    setGameobjectDistance(GO: number, maxDist: number, num: number): SmartScript;
    /**
     *  Invoker's party members
     */
    setInvokerParty(): SmartScript;
    /**
     *  (Random?) player within specified range.
     *  @param minDist
     *  @param maxDist
     */
    setPlayerRange(minDist: number, maxDist: number): SmartScript;
    /**
     *  (Random?) player within specified distance. (Different from #17?)
     *  @param maxDist
     */
    setPlayerDistance(maxDist: number): SmartScript;
    /**
     *  Closest creature with specified ID within specified range.
     *  @param creature Entry (0 any)
     *  @param maxDist (Can be from 0-100 yards)
     *  @param dead? (0/1)
     */
    setClosestCreature(creature: number, maxDist: number, dead: number): SmartScript;
    /**
     *  Closest object with specified ID within specified range.
     *  @param GO Entry (0 any)
     *  @param maxDist (Can be from 0-100 yards)
     */
    setClosestGameobject(GO: number, maxDist: number): SmartScript;
    /**
     *  Closest player within specified range.
     *  @param maxDist
     */
    setClosestPlayer(maxDist: number): SmartScript;
    /**
     *  Unit's vehicle who caused this Event to occur
     */
    setActionInvokerVehicle(): SmartScript;
    /**
     *  Unit's owner or summoner
     */
    setOwnerOrSummoner(): SmartScript;
    /**
     *  All units on creature's threat list
     */
    setThreatList(): SmartScript;
    /**
     *  Any attackable target (creature or player) within maxDist
     *  @param maxDist
     *  @param playerOnly (0/1)
     */
    setClosestEnemy(maxDist: number, playerOnly: number): SmartScript;
    /**
     *  Any friendly unit (creature, player or pet) within maxDist
     *  @param maxDist
     *  @param playerOnly (0/1)
     */
    setClosestFriendly(maxDist: number, playerOnly: number): SmartScript;
    /**
     *  All tagging players
     */
    setLootRecipients(): SmartScript;
    /**
     *  Farthest unit on the threat list
     *  @param maxDist
     *  @param playerOnly
     *  @param isInLos (0/1)
     */
    setFarthest(maxDist: number, playerOnly: number, isInLos: number): SmartScript;
    /**
     *  Vehicle can target unit in given seat
     *  @param seat
     */
    setVehicleAccessory(seat: number): SmartScript;
    /**
     *  Closest unspawned object with specified ID within specified range. (to be used only with action 70 and gameobjects with negative respawn time in the DB)
     *  @param GO Entry (0 any)
     *  @param maxDist (Can be from 0-100 yards)
     */
    setClosestUnspawnedGameobject(GO: number, maxDist: number): SmartScript;
}
