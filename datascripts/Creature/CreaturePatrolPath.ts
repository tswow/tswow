import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Position } from "../Misc/Position";
import { CreatureInstance } from "./CreatureInstance";

export class CreaturePatrolPath extends CellSystem<CreatureInstance> {
    add(movementType: 'WALK'|'RUN'|'FLY', pos: Position | Position[]) {
        if(!Array.isArray(pos)) {
            pos = [pos];
        }

        this.owner.MovementType.setWaypoint();
        this.owner.addonRow.path_id.set(this.owner.GUID*10);

        const prev = SQL.waypoint_data.filter({id:this.owner.GUID*10});

        const movementNum = 
            movementType === 'WALK' ? 0 : 
            movementType === 'RUN' ? 1 : 2;

        pos.forEach((x,i)=>
            SQL.waypoint_data.add(this.owner.GUID*10,prev.length+1+i)
                .position_x.set(x.x)
                .position_y.set(x.y)
                .position_z.set(x.z)
                .action_chance.set(100)
                .delay.set(x.delay||0)
                .move_type.set(movementNum)
        )

        return this.owner;
    }
}