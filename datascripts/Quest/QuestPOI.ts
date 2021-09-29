import { SQL } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { quest_poiRow } from "wotlkdata/sql/types/quest_poi";
import { quest_poi_pointsRow } from "wotlkdata/sql/types/quest_poi_points";
import { AreaRegistry } from "../Area/Area";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { Position } from "../Misc/Position";
import { PositionXYCell } from "../Misc/PositionCell";
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
            .filter({QuestID:this.owner.Index, Idx1: this.owner.Index})
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
    get WorldMapArea() { return this.wrap(this.row.WorldMapAreaId); }
    get Floor() { return this.wrap(this.row.Floor); }
    get Priority() { return this.wrap(this.row.Priority); }
    // TODO: figure out the flags
    get Flags() { return this.wrap(this.row.Flags); }
    get Points() { return new QuestPOIPoints(this); }
}

export class QuestPOIs extends MultiRowSystem<QuestPOI,Quest> {
    protected getAllRows(): QuestPOI[] {
        return SQL.quest_poi.filter(
            {QuestID:this.owner.ID})
        .map(x=>new QuestPOI(x))
        .sort((a,b)=>a.Index>b.Index?1:-1)
    }

    add(objective: number, area: number, points: Position[]) {
        if(points.length === 0) {
            throw new Error(`Quest POI must be made up of at least one point`)
        }

        points.forEach((v)=>{
            if(v.map!=points[0].map) {
                throw new Error(`Multiple maps in quest poi positions`)
            }
        });

        let map = points[0].map
        let rows = this.getAllRows();

        let wma = AreaRegistry.load(area).WorldMap;
        if(!wma.exists()) {
            throw new Error(
                  `Area ${area} has no WorldMap,`
                + ` please create it first!`
            )
        }

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
            .WorldMapArea.set(wma.WorldMapID)
        return this.owner;
    }

    protected isDeleted(value: QuestPOI): boolean {
        return value.row.isDeleted();
    }
}