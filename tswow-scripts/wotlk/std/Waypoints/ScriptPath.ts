import { SQL } from "../../SQLFiles";
import { waypointsRow } from "../../sql/waypoints";
import { MainEntity } from "../Misc/Entity";
import { Position } from "../Misc/Position";
import { PositionXYZOCell } from "../Misc/PositionCell";

export type ScriptPathPosition = Position & {
    delay?: number
}

export class Waypoint extends MainEntity<waypointsRow> {
    get Position() {
        return new PositionXYZOCell(
              this
            , this.row.position_x
            , this.row.position_y
            , this.row.position_z
            , this.row.orientation
        )
    }

    get index() {
        return this.row.pointid.get();
    }
}

export class ScriptPath {
    protected pathId: number;

    constructor(pathId: number) {
        this.pathId = pathId;
    }

    get ID() { return this.pathId; }

    get length() { return SQL.waypoints.queryAll({entry:this.pathId}).length }

    get() {
        return SQL.waypoints
            .queryAll({entry:this.pathId})
            .map(x=>new Waypoint(x))
            .sort((a,b)=>a.index>b.index?1:-1)
    }

    first() {
        return this.get()[0]
    }

    last() {
        let v = this.get();
        return v[v.length-1];
    }

    add(points: ScriptPathPosition|ScriptPathPosition[]) {
        if(!Array.isArray(points)) {
            points = [points];
        }
        const oldPoints = SQL.waypoints.queryAll({entry:this.pathId});
        points.forEach((x,i)=>
            SQL.waypoints.add(this.pathId,oldPoints.length+1+i)
                .position_x.set(x.x)
                .position_y.set(x.y)
                .position_z.set(x.z)
                .orientation.set(x.o)
                .delay.set(x.delay||0)
                .point_comment.set('tswow')
            )
        return this;
    }
}