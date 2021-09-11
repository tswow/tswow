import { LfgDungeonsQuery, LfgDungeonsRow } from "wotlkdata/dbc/types/LfgDungeons";
import { lfg_dungeon_templateQuery, lfg_dungeon_templateRow } from "wotlkdata/sql/types/lfg_dungeon_template";
import { SQLDBCChild, SQLDBCEntity } from "../Misc/SQLDBCEntity";
import { DBC } from "wotlkdata"
import { SQL } from "wotlkdata/sql/SQLFiles";
import { MapRef } from "../Map/Map";
import { Ids } from "../Misc/Ids";
import { RefBase, RefReadOnly } from "../Refs/Ref";
import { LFGDungeonRewards } from "./LFGDungeonRewards";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { FactionEnum } from "../Misc/FactionEnum";
import { LFGDungeonGroupRef } from "./LFGGroup";
import { AccessRequirement, AccessRequirementRegistry } from "../AccessRequirement/AccessRequirement";

export class LFGPos extends SQLDBCChild<LFGDungeon,LfgDungeonsRow,lfg_dungeon_templateRow,LFGDungeon> {
    get X() { return this.ownerWrapSQL(0, (row)=>row.position_x)}
    get Y() { return this.ownerWrapSQL(0, (row)=>row.position_y)}
    get Z() { return this.ownerWrapSQL(0, (row)=>row.position_z)}
    get O() { return this.ownerWrapSQL(0, (row)=>row.orientation)}

    setSpread(x: number, y: number, z: number, o: number) {
        this.X.set(x);
        this.Y.set(y);
        this.Z.set(z);
        this.O.set(o);
        return this.owner;
    }

    exists() { return this.owner.HasSQL(); }

    set(obj: {x: number, y: number, z: number, o: number, map?: number}) {
        if((obj.map !== undefined) && (obj.map !== this.owner.Map.getRefID())) {
            throw new Error(
                  `Attempting to set LFGPos on map (${obj.map}) `
                + `different from parent map (${this.owner.Map.getRefID()})`
            )
        }
        return this.setSpread(obj.x,obj.y,obj.z,obj.o)
    }
}

export class LFGLevels extends CellSystem<LFGDungeon> {
    get Min() { return this.ownerWrap(this.owner.GetDBC().MinLevel)}
    get Max() { return this.ownerWrap(this.owner.GetDBC().MaxLevel)}
    get TargetMin() { return this.ownerWrap(this.owner.GetDBC().Target_Level_Min)}
    get Target() { return this.ownerWrap(this.owner.GetDBC().Target_Level)}
    get TargetMax() { return this.ownerWrap(this.owner.GetDBC().Target_Level_Max)}

    set(min: number, max: number, targetMin: number, target: number, targetMax: number) {
        this.Min.set(min);
        this.Max.set(max);
        this.TargetMin.set(targetMin);
        this.Target.set(target);
        this.TargetMax.set(targetMax);
        return this.owner;
    }
}

export class LFGFlags extends MaskCell32<LFGDungeon> {
    /** If this is not set, it's a raid */
    get IsDungeon() { return this.multibits([0,1])}

    get IsHoliday() { return this.multibits([2,3])}
}

export class LFGDungeon extends SQLDBCEntity<LfgDungeonsRow, lfg_dungeon_templateRow> {
    protected id: number;
    constructor(id: number) {
        super();
        this.id = id;
    }

    protected createDBC(): LfgDungeonsRow {
        return DBC.LfgDungeons.add(this.id)
            .Name.clear()
            .Order_Index.set(0)
            .Target_Level.set(0)
            .Target_Level_Max.set(0)
            .Target_Level_Min.set(0)
            .TextureFilename.set('')
            .TypeID.set(0)
            .Description.clear()
            .Difficulty.set(0)
            .ExpansionLevel.set(0)
            .Faction.set(0)
            .Flags.set(0)
            .Group_Id.set(0)
            .MapID.set(0)
            .MaxLevel.set(0)
            .MinLevel.set(0)
    }

    protected createSQL(): lfg_dungeon_templateRow {
        return SQL.lfg_dungeon_template.add(this.id)
            .name.set('')
            .orientation.set(0)
            .position_x.set(0)
            .position_y.set(0)
            .position_z.set(0)
            .VerifiedBuild.set(17688)
    }

    protected findDBC(): LfgDungeonsRow {
        return DBC.LfgDungeons.find({ID:this.id});
    }

    protected findSQL(): lfg_dungeon_templateRow {
        return SQL.lfg_dungeon_template.find({dungeonId:this.id})
    }

    protected isValidDBC(dbc: LfgDungeonsRow): boolean {
        return dbc.ID.get() == this.id;
    }

    protected isValidSQL(sql: lfg_dungeon_templateRow): boolean {
        return sql.dungeonId.get() == this.id;
    }

    // dbc fields always exist for LFGDungeon
    get Name() { return this.wrapLoc(this.GetDBC().Name); }
    get ID() { return this.GetDBC().ID.get(); }
    get Map() { return new MapRef(this, this.GetDBC().MapID); }
    get Difficulty() { return this.wrap(this.GetDBC().Difficulty); }
    get Flags() { return new LFGFlags(this, this.GetDBC().Flags); }
    get Texture() { return this.wrap(this.GetDBC().TextureFilename); }
    get Description() { return this.wrapLoc(this.GetDBC().Description)}
    get Type() { return this.wrap(this.GetDBC().TypeID)}
    get SpawnPosOverride() { return new LFGPos(this,this); }
    get Rewards() { return new LFGDungeonRewards(this); }
    get Levels() { return new LFGLevels(this); }
    get Faction() { return new FactionEnum(this, this.GetDBC().Faction); }
    get OrderIndex() { return this.wrap(this.GetDBC().Order_Index); }
    get ExpansionLevel() { return this.wrap(this.GetDBC().Order_Index); }
    get Group() { return new LFGDungeonGroupRef(this, this.GetDBC().Group_Id)}
    get Requirements() {
        return new AccessRequirement(
              this
            , AccessRequirementRegistry.get(
                  this.Map.getRefID()
                , this.Difficulty.get()
            )
            .row
        )
    }
}

export class LFGDungeons<T> extends MultiRowSystem<LFGDungeon,T> {
    protected readonly mapId: number;

    constructor(owner: T, mapId: number) {
        super(owner);
        this.mapId = mapId;
    }

    addGet() {
        return LFGDungeonRegistry.create()
            .Map.setRefID(this.mapId)
    }

    addMod(callback: (dungeon: LFGDungeon)=>void) {
        callback(this.addGet());
        return this.owner;
    }

    protected getAllRows(): LFGDungeon[] {
        return LFGDungeonRegistry.filterDBC({MapID:this.mapId});
    }

    protected isDeleted(value: LFGDungeon): boolean {
        return value.GetDBC().isDeleted();
    }
}

export class LFGDungeonRefReadOnly<T> extends RefReadOnly<T,LFGDungeon> {
    getRef(): LFGDungeon {
        return new LFGDungeon(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}

export class LFGDungeonRef<T> extends RefBase<T,LFGDungeon> {
    exists(): boolean {
        return this.cell.get() > 0;
    }

    protected id(v: LFGDungeon): number {
        return v.ID;
    }

    protected resolve(): LFGDungeon {
        return LFGDungeonRegistry.load(this.cell.get()) as LFGDungeon;
    }
}


export const LFGDungeonRegistry = {
    create() {
        let dungeon = new LFGDungeon(Ids.LfgDungeons.id());
        dungeon.GetOrCreateDBC();
        return dungeon;
    },

    load(id: number) {
        return DBC.LfgDungeons.find({ID:id}) ? new LFGDungeon(id) : undefined;
    },

    filterDBC(query: LfgDungeonsQuery) {
        return DBC.LfgDungeons
            .filter(query)
            .map(x=>new LFGDungeon(x.ID.get()))
    },

    findDBC(query: LfgDungeonsQuery) {
        let res = DBC.LfgDungeons.find(query)
        return res ? new LFGDungeon(res.ID.get()) : undefined;
    },

    filterSQL(query: lfg_dungeon_templateQuery) {
        return SQL.lfg_dungeon_template
            .filter(query)
            .map(x=>new LFGDungeon(x.dungeonId.get()))
    },

    findSQL(query: lfg_dungeon_templateQuery) {
        let res = SQL.lfg_dungeon_template.find(query)
        return res ? new LFGDungeon(res.dungeonId.get()) : undefined;
    },
}