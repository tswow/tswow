import { DBC } from "wotlkdata";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { LfgDungeonsQuery, LfgDungeonsRow } from "wotlkdata/wotlkdata/dbc/types/LfgDungeons";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { lfg_dungeon_templateRow } from "wotlkdata/wotlkdata/sql/types/lfg_dungeon_template";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { AccessRequirement, AccessRequirementRegistry } from "../AccessRequirement/AccessRequirement";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { FactionEnum } from "../Misc/FactionEnum";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { RegistryDynamic } from "../Refs/Registry";
import { LFGDungeonRewards } from "./LFGDungeonRewards";
import { LFGDungeonEncounters } from "./LFGEncounter";
import { LFGDungeonGroupRegistry } from "./LFGGroup";

export class LFGPos extends MaybeSQLEntity<LFGDungeon,lfg_dungeon_templateRow> {
    protected createSQL(): lfg_dungeon_templateRow {
        return SQL.lfg_dungeon_template.add(this.owner.ID)
            .position_x.set(0)
            .position_y.set(0)
            .position_z.set(0)
            .orientation.set(0)
            .name.set('LFGPos')
            .VerifiedBuild.set(17688)
    }
    protected findSQL(): lfg_dungeon_templateRow {
        return SQL.lfg_dungeon_template.query({dungeonId:this.owner.ID})
    }

    protected isValidSQL(sql: lfg_dungeon_templateRow): boolean {
        return sql.dungeonId.get() === this.owner.ID
    }

    get X() { return this.wrapSQL(0, row=>row.position_x); }
    get Y() { return this.wrapSQL(0, row=>row.position_y); }
    get Z() { return this.wrapSQL(0, row=>row.position_z); }
    get O() { return this.wrapSQL(0, row=>row.orientation); }

    setSpread(x: number, y: number, z: number, o: number) {
        this.X.set(x);
        this.Y.set(y);
        this.Z.set(z);
        this.O.set(o);
        return this.owner;
    }

    set(obj: {x: number, y: number, z: number, o: number, map?: number}) {
        if((obj.map !== undefined) && (obj.map !== this.owner.Map.get())) {
            throw new Error(
                  `Attempting to set LFGPos on map (${obj.map}) `
                + `different from parent map (${this.owner.Map.get()})`
            )
        }
        return this.setSpread(obj.x,obj.y,obj.z,obj.o)
    }
}

export class LFGLevels extends CellSystem<LFGDungeon> {
    get Min() { return this.ownerWrap(this.owner.row.MinLevel)}
    get Max() { return this.ownerWrap(this.owner.row.MaxLevel)}
    get TargetMin() { return this.ownerWrap(this.owner.row.Target_Level_Min)}
    get Target() { return this.ownerWrap(this.owner.row.Target_Level)}
    get TargetMax() { return this.ownerWrap(this.owner.row.Target_Level_Max)}

    set(min: number, max: number, targetMin: number, target: number, targetMax: number) {
        this.Min.set(min);
        this.Max.set(max);
        this.TargetMin.set(targetMin);
        this.Target.set(target);
        this.TargetMax.set(targetMax);
        return this.owner;
    }
}

export enum LFGFlags {
      IS_DUNGEON = 0x3
    , IS_HOLIDAY = 0xC
}

export class LFGDungeon extends MainEntity<LfgDungeonsRow> {
    // dbc fields always exist for LFGDungeon
    get Name() { return this.wrapLoc(this.row.Name); }
    get ID() { return this.row.ID.get(); }
    get Map() { return MapRegistry.ref(this, this.row.MapID); }
    get Difficulty() { return this.wrap(this.row.Difficulty); }
    get Flags() {
        return makeMaskCell32(LFGFlags,this, this.row.Flags);
    }

    get Encounters() { return new LFGDungeonEncounters(this, this.Map.get())}

    get Texture() { return this.wrap(this.row.TextureFilename); }
    get Description() { return this.wrapLoc(this.row.Description)}
    get Type() { return this.wrap(this.row.TypeID)}
    get SpawnPosOverride() { return new LFGPos(this); }
    get Rewards() { return new LFGDungeonRewards(this); }
    get Levels() { return new LFGLevels(this); }
    get Faction() {
        return makeEnumCell(FactionEnum,this, this.row.Faction);
    }
    get OrderIndex() { return this.wrap(this.row.Order_Index); }
    get ExpansionLevel() { return this.wrap(this.row.Order_Index); }
    get Group() { return LFGDungeonGroupRegistry.ref(this, this.row.Group_Id)}
    get Requirements() {
        return new AccessRequirement(
              this
            , AccessRequirementRegistry.get(
                  this.Map.get()
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
            .Map.set(this.mapId)
    }

    addMod(callback: (dungeon: LFGDungeon)=>void) {
        callback(this.addGet());
        return this.owner;
    }

    protected getAllRows(): LFGDungeon[] {
        return LFGDungeonRegistry.queryAll({MapID:this.mapId});
    }

    protected isDeleted(value: LFGDungeon): boolean {
        return value.row.isDeleted();
    }
}

export class LFGDungeonRegistryClass
    extends RegistryDynamic<LFGDungeon,LfgDungeonsRow,LfgDungeonsQuery>
{
    protected Table(): Table<any, LfgDungeonsQuery, LfgDungeonsRow> & { add: (id: number) => LfgDungeonsRow; } {
        return DBC.LfgDungeons
    }
    protected ids(): DynamicIDGenerator {
        return Ids.LfgDungeons
    }
    Clear(entity: LFGDungeon): void {
        entity
            .Levels.set(0,0,0,0,0)
            .Map.set(0)
            .Name.clear()
            .OrderIndex.set(0)
            .Texture.set('')
            .Type.set(0)
            .Description.clear()
            .Difficulty.set(0)
            .ExpansionLevel.set(0)
            .Faction.NONE.set()
            .Flags.set(0)
            .Group.set(0)
    }
    protected FindByID(id: number): LfgDungeonsRow {
        return DBC.LfgDungeons.query({ID:id});
    }
    protected EmptyQuery(): LfgDungeonsQuery {
        return {}
    }
    ID(e: LFGDungeon): number {
        return e.ID
    }
    protected Entity(r: LfgDungeonsRow): LFGDungeon {
        return new LFGDungeon(r);
    }
}

export const LFGDungeonRegistry = new LFGDungeonRegistryClass();