/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SQL } from "../../SQLFiles";
import { instance_boss_boundaryRow } from "../../sql/instance_boss_boundary";
import { TransformedEntity } from "../Misc/Entity";
import { PositionXYCell } from "../Misc/PositionCell";

export type XYPos = {x: number, y: number}

export class MapBossBoundary extends TransformedEntity<instance_boss_boundaryRow,MapBossBoundary> {
    protected transformer(): EnumCellTransform<any> {
        return new MapBossBoundaryType(this, this.row.type);
    }
    protected default(): MapBossBoundary {
        return this;
    }

    get Map() { return this.row.map.get() }
    get Boss() { return this.row.boss.get() }
    get Index() { return this.row.index.get(); }
    get UnionGroup() {
        return this.wrap(this.row.unionGroup);
    }

    get Type() {
        return new MapBossBoundaryType(this, this.row.type);
    }
}

export class MapBossRectangle extends MapBossBoundary {

    get MinPos() {
        return new PositionXYCell(this, this.row.data0, this.row.data1)
    }

    get MaxPos() {
        return new PositionXYCell(this, this.row.data2, this.row.data3)
    }

    set(minPos: XYPos, maxPos: XYPos) {
        this.MinPos.set(minPos);
        this.MaxPos.set(maxPos);
        return this;
    }
}

export class MapBossCircle extends MapBossBoundary {
    get Position() {
        return new PositionXYCell(this,
            this.row.data0,
            this.row.data1)
    }

    get Radius() {
        return this.wrap(this.row.data3)
    }

    set(pos: XYPos, radius: number) {
        this.Position.set(pos)
        this.Radius.set(radius);
    }
}

export class MapBossEllipse extends MapBossBoundary {
    get Position() {
        return new PositionXYCell(this,
            this.row.data0,
            this.row.data1)
    }


    get Radius() {
        return new PositionXYCell(this,this.row.data0,this.row.data1)
    }

    set(radius: XYPos, position: XYPos) {
        this.Position.set(position);
        this.Radius.set(radius)
    }
}

export class MapBossTriangle extends MapBossBoundary {
    get Pos1() {
        return new PositionXYCell(this,
            this.row.data0,
            this.row.data1)
    }

    get Pos2() {
        return new PositionXYCell(this,
            this.row.data2,
            this.row.data3)
    }

    get Pos3() {
        return new PositionXYCell(this,
            this.row.data4,
            this.row.data5)
    }

    set(pos1: XYPos, pos2: XYPos, pos3: XYPos) {
        this.Pos1.set(pos1)
        this.Pos2.set(pos2)
        this.Pos3.set(pos3)
        return this;
    }
}

// They have the exact same parameters
export class MapBossParallelogram extends MapBossTriangle {}

export class MapBossZRange extends MapBossBoundary {
    get Min() { return this.wrap(this.row.data0)}
    get Max() { return this.wrap(this.row.data1)}

    set(min: number, max: number) {
        this.Min.set(min);
        this.Max.set(max);
        return this;
    }
}

export class MapBossBoundaryType<T extends MapBossBoundary> extends EnumCellTransform<T> {
    get RECTANGLE() { return this.value(0,t=>new MapBossRectangle(t.row))}
    get CIRCLE() { return this.value(1,t=>new MapBossCircle(t.row))}
    get ELLIPSE() { return this.value(2,t=>new MapBossEllipse(t.row))}
    get TRIANGLE() { return this.value(3,t=>new MapBossTriangle(t.row))}
    get PARALLELOGRAM() { return this.value(4,t=>new MapBossParallelogram(t.row))}
    get ZRANGE() { return this.value(5,t=>new MapBossZRange(t.row))}
}

export class MapBossBoundaries extends MultiRowSystem<MapBossBoundary,MapBossBoundaries> {
    protected getAllRows(): MapBossBoundary[] {
        return SQL.instance_boss_boundary
            .queryAll({map:this.instanceMap,boss:this.boss})
            .map(x=>new MapBossBoundary(x))
    }
    protected isDeleted(value: MapBossBoundary): boolean {
        return value.row.isDeleted();
    }
    protected instanceMap: number;
    protected boss: number;
    constructor(map: number, boss: number) {
        super(undefined as any);
        this.owner = this;
        this.instanceMap = map;
        this.boss = boss;
    }

    addGet(unionGroup: number = 0, inverted: boolean = false) {
        const newId = this.getAllRows()
            .reduce((p,c)=>c.row.index.get()>=p?c.row.index.get():p,0) + 1
        const row = SQL.instance_boss_boundary
            .add(this.instanceMap,this.boss,newId)
            .unionGroup.set(unionGroup)
            .type.set(0)
            .inverted.set(inverted ? 1 : 0)
            .data0.set(0)
            .data1.set(0)
            .data2.set(0)
            .data3.set(0)
            .data4.set(0)
            .data5.set(0)
        return new MapBossBoundary(row)
    }

    addMod(callback: (boundary: MapBossBoundary)=>void) {
        callback(this.addGet());
        return this.owner;
    }

    addRectangle(unionGroup: number, inverted: boolean, minPos: XYPos,maxPos: XYPos) {
        this.addGet(unionGroup,inverted)
            .Type.RECTANGLE.set()
            .set(minPos,maxPos)
        return this.owner;
    }

    addCircle(unionGroup: number, inverted: boolean, pos: XYPos, radius: number) {
        this.addGet(unionGroup,inverted)
            .Type.CIRCLE.set()
            .set(pos,radius)
        return this.owner;
    }

    addEllipse(unionGroup: number, inverted: boolean, pos: XYPos, radius: XYPos) {
        this.addGet(unionGroup,inverted)
            .Type.ELLIPSE.set()
            .set(pos,radius)
        return this.owner;
    }

    addTriangle(unionGroup: number, inverted: boolean, pos1: XYPos, pos2: XYPos, pos3: XYPos) {
        this.addGet(unionGroup,inverted)
            .Type.TRIANGLE.set()
            .set(pos1,pos2,pos3)
        return this.owner;
    }

    addParallelogram(unionGroup: number, inverted: boolean, pos1: XYPos, pos2: XYPos, pos3: XYPos) {
        this.addGet(unionGroup,inverted)
            .Type.PARALLELOGRAM.set()
            .set(pos1,pos2,pos3)
        return this.owner;
    }

    addZRange(unionGroup: number, inverted: boolean, minZ: number, maxZ: number) {
        this.addGet(unionGroup,inverted)
            .Type.ZRANGE.set()
            .set(minZ,maxZ)
        return this.owner;
    }
}