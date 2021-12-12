import { makeMaskCell32, MaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { gameobjectRow } from "wotlkdata/wotlkdata/sql/types/gameobject";
import { gameobject_addonRow } from "wotlkdata/wotlkdata/sql/types/gameobject_addon";
import { AreaRegistry } from "../Area/Area";
import { GameObjectGameEventsForward } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZOCell, QuaternionCell } from "../Misc/PositionCell";
import { SpawnMask } from "../Misc/SpawnMask";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { implicitGameObjectState } from "../SpawnGroup/ImplicitBossGroup";
import { GORegistry } from "./GameObjectRegistries";

export enum InvisibilityTypes {
    GENERAL = 0
  , TRAP    = 3
  , DRUNK   = 6
}

export class GameObjectInstanceAddon extends MaybeSQLEntity<GameObjectInstance,gameobject_addonRow> {
  protected createSQL(): gameobject_addonRow {
    return SQL.gameobject_addon.add(this.owner.ID);
  }
  protected findSQL(): gameobject_addonRow {
    return SQL.gameobject_addon.query({guid:this.owner.ID});
  }
  protected isValidSQL(sql: gameobject_addonRow): boolean {
    return sql.guid.get() === this.owner.ID;
  }

  get Invisibility() {
    let thiz = this;
    return {
        Type: makeMaskCell32(InvisibilityTypes, this.owner, this.wrapSQL(0,sql=>sql.invisibilityType))
      , Value: this.wrapSQL(0,sql=>sql.invisibilityValue)
      , set(type: InvisibilityTypes, value: number) {
        this.Type.set(type);
        this.Value.set(value);
        return thiz.owner;
      }
    }
  }

  /** TODO: order */
  get ParentRotation() {
    return new QuaternionCell(
        this.owner
      , this.wrapSQL(0,sql=>sql.parent_rotation0)
      , this.wrapSQL(0,sql=>sql.parent_rotation1)
      , this.wrapSQL(0,sql=>sql.parent_rotation2)
      , this.wrapSQL(0,sql=>sql.parent_rotation3)
    )
  }
}

export class GameObjectAddonRow extends CellSystem<GameObjectInstance> {
  protected readonly Addon = new GameObjectInstanceAddon(this.owner);

  get() { return this.Addon.getSQL(); }

  mod(callback: (row: gameobject_addonRow)=>void) {
      callback(this.get());
  }

  exists() { return this.Addon.exists(); }

  static addon(template: GameObjectInstance) {
      return template.AddonRow.Addon
  }
}

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
    get SpawnMask() {
      return makeMaskCell32(SpawnMask,this, this.row.spawnMask);
    }
    get PhaseMask() { return new MaskCell32(this, this.row.phaseMask); }
    get SpawnTimeSecs() { return this.wrap(this.row.spawntimesecs); }
    get State() { return this.wrap(this.row.state); }
    get EncounterSpawn() { return implicitGameObjectState(this) }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
    get GameEvents() { return new GameObjectGameEventsForward(this); }
    get Template() { return GORegistry.Plain.ref(this, this.row.id); }
    @Transient
    protected get Addon() { return GameObjectAddonRow.addon(this); }
    @Transient
    readonly AddonRow = new GameObjectAddonRow(this);
    get Invisibility()   { return this.Addon.Invisibility; }
    get ParentRotation() { return this.Addon.ParentRotation; }
}