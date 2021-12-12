import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { Position } from "../Misc/Position";
import { CreatureInstance } from "./CreatureInstance";

export type PatrolPosition = Position & {
    delay?: number
}

export class CreaturePatrolPath extends CellSystem<CreatureInstance> {
    add(movementType: 'WALK'|'RUN'|'FLY', pos: PatrolPosition | PatrolPosition[]) {
        if(!Array.isArray(pos)) {
            pos = [pos];
        }

        this.owner.MovementType.WAYPOINT.set();
        this.owner.Path.set(this.owner.ID*10);

        const prev = SQL.waypoint_data.queryAll({id:this.owner.ID*10});

        const movementNum =
            movementType === 'WALK' ? 0 :
            movementType === 'RUN' ? 1 : 2;

        pos.forEach((x,i)=>
            SQL.waypoint_data.add(this.owner.ID*10,prev.length+1+i)
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