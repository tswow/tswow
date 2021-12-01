import { SQL } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { gt, lt } from "wotlkdata/wotlkdata/query/Relations";
import { quest_poiRow } from "wotlkdata/wotlkdata/sql/types/quest_poi";
import { quest_poi_pointsRow } from "wotlkdata/wotlkdata/sql/types/quest_poi_points";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { Position } from "../Misc/Position";
import { PositionXYCell } from "../Misc/PositionCell";
import { WorldMapArea, WorldMapAreaRegistry } from "../Worldmap/WorldMapArea";
import { Quest } from "./Quest";
import { QuestRegistry } from "./Quests";

export class QuestPOIPoint extends MainEntity<quest_poi_pointsRow> {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.row.QuestID); }
    get Index() { return this.row.Idx2.get(); }
    get Position() {
        return new PositionXYCell(
              this
            , this.row.X
            , this.row.Y
        )
    }
}

export class QuestPOIPoints extends MultiRowSystem<QuestPOIPoint,QuestPOI> {
    protected getAllRows(): QuestPOIPoint[] {
        return SQL.quest_poi_points
            .queryAll({QuestID:this.owner.Index, Idx1: this.owner.Index})
            .map(x=>new QuestPOIPoint(x))
            .sort((a,b)=>a.Index > b.Index ? 1 : -1)
    }
    protected isDeleted(value: QuestPOIPoint): boolean {
        return value.row.isDeleted();
    }

    add(values: Position[]) {
        let rows = this.getAllRows();
        let lastIndex = rows.length === 0 ? 0 : (rows[rows.length-1].Index - 1)
        values.forEach((pos,i)=>{
            SQL.quest_poi_points.add(
                  this.owner.Quest.get()
                , this.owner.Index
                , lastIndex+i
            )
            .X.set(pos.x)
            .Y.set(pos.y)
        });
        return this.owner;
    }
}

export class QuestPOI extends MainEntity<quest_poiRow> {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.row.QuestID); }
    get Index() { return this.row.id.get(); }
    get ObjectiveIndex() { return this.wrap(this.row.ObjectiveIndex); }
    get Map() { return MapRegistry.ref(this, this.row.MapID); }
    get WorldMapArea() {
        return WorldMapAreaRegistry.ref(this, this.row.WorldMapAreaId);
    }
    get Floor() { return this.wrap(this.row.Floor); }
    get Priority() { return this.wrap(this.row.Priority); }
    // TODO: figure out the flags
    get Flags() { return this.wrap(this.row.Flags); }
    get Points() { return new QuestPOIPoints(this); }
}

export class QuestPOIs extends MultiRowSystem<QuestPOI,Quest> {
    protected getAllRows(): QuestPOI[] {
        return SQL.quest_poi.queryAll(
            {QuestID:this.owner.ID})
        .map(x=>new QuestPOI(x))
        .sort((a,b)=>a.Index>b.Index?1:-1)
    }

    add(objective: number, points: Position[], worldMapArea?: number) {
        if(points.length === 0) {
            throw new Error(`Quest POI must be made up of at least one point`)
        }

        points.forEach((v)=>{
            if(v.map!=points[0].map) {
                throw new Error(`Multiple maps in quest poi positions`)
            }
        });

        let map = points[0].map
        let area: WorldMapArea;

        if(!worldMapArea) {
            // Need to flip x/y for world map points
            let {x,y} = points
                .reduce(({x,y},c)=>({x:x+c.y,y:y+c.x}),{x:0,y:0})
            x /= points.length;
            y /= points.length;
            area = WorldMapAreaRegistry.queryAll({
                  MapID:map
                , LocLeft:gt(x)
                , LocRight:lt(x)
                , LocBottom:lt(y)
                , LocTop:gt(y)
            })
            .sort((a,b)=>{
                let {x:ax,y:ay} = a.Boundary.GetMiddle();
                let {x:bx,y:by} = b.Boundary.GetMiddle();
                let da = Math.sqrt(Math.pow(ax-x,2)+Math.pow(ay-y,2))
                let db = Math.sqrt(Math.pow(bx-x,2)+Math.pow(by-y,2))
                return da > db ? 1 : -1
            })[0]
            if(!area) {
                throw new Error(`No WorldMapArea found for coordinates, please specify one`)
            }
        } else {
            area = WorldMapAreaRegistry.load(worldMapArea);
        }

        let rows = this.getAllRows();

        new QuestPOI(SQL.quest_poi.add(
            this.owner.ID,rows.length === 0
                ? 0
                : (rows[rows.length-1].Index + 1)
        ))
            .ObjectiveIndex.set(objective)
            .Flags.set(3)
            .Floor.set(0)
            .Map.set(map)
            .Points.add(points)

        return this.owner;
    }

    protected isDeleted(value: QuestPOI): boolean {
        return value.row.isDeleted();
    }
}