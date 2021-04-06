import { Subsystem } from "wotlkdata/cell/Subsystem";
import { gameobjectRow } from "wotlkdata/sql/types/gameobject";
import { MainEntity } from "../Base/MainEntity";
import { Position } from "../Misc/Position";

export class GameObjectPosition extends Subsystem<GameObjectInstance> {
    get Map() { return  this.ownerWrap(this.owner.row.map); }
    get X() { return  this.ownerWrap(this.owner.row.position_x); }
    get Y() { return  this.ownerWrap(this.owner.row.position_y); }
    get Z() { return  this.ownerWrap(this.owner.row.position_z); }
    get Orientation() { return  this.ownerWrap(this.owner.row.orientation); }

    set(pos: Position) {
        this.Map.set(pos.map)
        this.X.set(pos.x)
        this.Y.set(pos.y)
        this.Z.set(pos.z)
        this.Orientation.set(pos.o);
        return this.owner;
    }
}

export class GameObjectInstance extends MainEntity<gameobjectRow> {
    get Position() { return new GameObjectPosition(this); }
    get Rotation0() { return  this.wrap(this.row.rotation0); }
    get Rotation1() { return  this.wrap(this.row.rotation1); }
    get Rotation2() { return  this.wrap(this.row.rotation2); }
    get Rotation3() { return  this.wrap(this.row.rotation3); }
    get ZoneID() { return this.wrap(this.row.zoneId); }
    get AreaID() { return this.wrap(this.row.areaId); }
    get SpawnMask() { return this.wrap(this.row.spawnMask); }
    get PhaseMask() { return this.wrap(this.row.phaseMask); }
    get SpawnTimeSecs() { return this.wrap(this.row.spawntimesecs); }
    get State() { return this.wrap(this.row.state); }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
}