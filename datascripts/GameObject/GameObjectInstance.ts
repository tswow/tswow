import { gameobjectRow } from "wotlkdata/sql/types/gameobject";
import { AreaRegistry } from "../Area/Area";
import { GameObjectGameEventsForward } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZOCell, QuaternionCell } from "../Misc/PositionCell";

export class GameObjectInstance extends MainEntity<gameobjectRow> {
    get ID() { return this.row.guid.get(); }
    get Position() { return new PositionMapXYZOCell(
          this
        , this.row.map
        , this.row.position_x
        , this.row.position_y
        , this.row.position_z
        , this.row.orientation
        ); }

    // TODO: order
    get Rotation() { return new QuaternionCell(
          this
        , this.row.rotation0
        , this.row.rotation1
        , this.row.rotation2
        , this.row.rotation3
        )}

    get Zone() { return AreaRegistry.ref(this, this.row.zoneId); }
    get Area() { return AreaRegistry.ref(this, this.row.areaId); }
    get SpawnMask() { return this.wrap(this.row.spawnMask); }
    get PhaseMask() { return this.wrap(this.row.phaseMask); }
    get SpawnTimeSecs() { return this.wrap(this.row.spawntimesecs); }
    get State() { return this.wrap(this.row.state); }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
    get GameEvents() { return new GameObjectGameEventsForward(this); }
}