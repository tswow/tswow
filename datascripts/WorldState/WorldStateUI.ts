import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { WorldStateUIQuery, WorldStateUIRow } from "wotlkdata/wotlkdata/dbc/types/WorldStateUI";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { RegistryDynamic } from "../Refs/Registry";
import { WorldState } from "./WorldState";

export class WorldStateLocation extends CellSystem<WorldStateUI> {
    get Map() { return this.ownerWrap(this.owner.row.MapID)}
    get Area() { return this.ownerWrap(this.owner.row.AreaID); }

    set(map: number = -1, area: number = 0) {
        this.Map.set(map);
        this.Area.set(area);
        return this.owner;
    }
}

export type CapturePointString = 'CAPTUREPOINT'|''

export class WorldStateUICapturePoint extends CellSystem<WorldStateUI> {
    get Enabled() {
        return this.ownerWrap<CapturePointString>
            (this.owner.row.ExtendedUI as Cell<CapturePointString,any>);
    }
    get FactionVar() { return this.ownerWrapIndex(this.owner.row.ExtendedUIStateVariable,0)}
    get GrayPercentVar() { return this.ownerWrapIndex(this.owner.row.ExtendedUIStateVariable,1)}
    get UnkVar() { return this.ownerWrapIndex(this.owner.row.ExtendedUIStateVariable,2)}

    set(
          enabled: CapturePointString
        , factionVar: WorldState | number = 0
        , grayPercentVar: WorldState | number = 0
        , unkVar: WorldState | number= 0
    ) {
        if(typeof(factionVar) == 'object') {
            factionVar = factionVar.ID
        }
        if(typeof(grayPercentVar) == 'object') {
            grayPercentVar = grayPercentVar.ID
        }
        if(typeof(unkVar) == 'object') {
            unkVar = unkVar.ID
        }
        this.Enabled.set(enabled);
        this.FactionVar.set(factionVar);
        this.GrayPercentVar.set(grayPercentVar);
        this.UnkVar.set(unkVar);
        return this.owner;
    }
}

export enum WorldStateType {
    DEFAULT            = 0,
    BATTLEGROUND_FIELD = 2,
}

export class WorldStateUI extends MainEntity<WorldStateUIRow> {
    get ID() { return this.row.ID.get(); }
    get Location() { return new WorldStateLocation(this) }
    get Icon() { return this.wrap(this.row.Icon); }
    get PhaseShift() { return this.wrap(this.row.PhaseShift); }

    get String() { return this.wrapLoc(this.row.String); }
    get Tooltip() { return this.wrapLoc(this.row.Tooltip); }

    get DynamicIcon() { return this.wrap(this.row.DynamicIcon); }
    get DynamicTooltip() { return this.wrapLoc(this.row.Tooltip); }
    get ExtendedUI() { return this.wrap(this.row.ExtendedUI); }
    get Type() {
        return makeEnumCell(WorldStateType, this, this.row.Type);
    }
    get Variable() { return this.wrap(this.row.StateVariable); }
    get Capture() { return new WorldStateUICapturePoint(this); }

    get ExtendedUIVariable() {
        return new SingleArraySystem(
              this
            , this.row.ExtendedUIStateVariable
            , 0
            );
    }
}

export class WorldStateUIRegistryClass
    extends RegistryDynamic<WorldStateUI,WorldStateUIRow,WorldStateUIQuery>
{
    protected Table(): Table<any, WorldStateUIQuery, WorldStateUIRow> & { add: (id: number) => WorldStateUIRow; } {
        return DBC.WorldStateUI
    }
    protected ids(): DynamicIDGenerator {
        return Ids.WorldStateUI
    }
    Clear(entity: WorldStateUI): void {
        entity
            .Capture.set('',0,0,0)
            .DynamicIcon.set('')
            .DynamicTooltip.clear()
            .ExtendedUI.set('')
            .ExtendedUIVariable.clearAll()
            .Icon.set('')
            .Location.set(0,0)
            .PhaseShift.set(0)
            .String.clear()
            .Tooltip.clear()
            .Type.DEFAULT.set()
            .Variable.set(0)
    }
    protected FindByID(id: number): WorldStateUIRow {
        return DBC.WorldStateUI.query({ID:id});
    }
    protected EmptyQuery(): WorldStateUIQuery {
        return {}
    }
    ID(e: WorldStateUI): number {
        return e.ID
    }
    protected Entity(r: WorldStateUIRow): WorldStateUI {
        return new WorldStateUI(r);
    }
}

export const WorldStateUIRegistry = new WorldStateUIRegistryClass();