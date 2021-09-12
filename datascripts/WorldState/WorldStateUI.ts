import { WorldStateUIQuery, WorldStateUIRow } from "wotlkdata/dbc/types/WorldStateUI";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { MainEntity } from "../Misc/Entity";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { DBC } from "wotlkdata"
import { Ids } from "../Misc/Ids";
import { Ref, RefStatic } from "../Refs/Ref";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { WorldState } from "./WorldState";
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";

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
    }
}

export class WorldStateType extends EnumCellWrapper<WorldStateUI> {
    @EnumField(0)
    setDefault() { return this.set(0); }

    @EnumField(2)
    setBattlegroundField() { return this.set(2); }
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
    get Type() { return new WorldStateType(this, this.row.Type); }
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

export const WorldStateUIRegistry = {
    create() {
        let nid = Ids.WorldStateUI.id();
        return new WorldStateUI(DBC.WorldStateUI.add(nid))
            .DynamicIcon.set('')
            .DynamicTooltip.clear()
            .ExtendedUI.set('')
            .ExtendedUIVariable.clearAll()
            .Icon.set('')
            .Location.set(-1,0)
            .PhaseShift.set(0)
            .String.clear()
            .Tooltip.clear()
            .Type.set(0)
            .Variable.set(0)
    },

    load(id: number) {
        return new WorldStateUI(DBC.WorldStateUI.find({ID:id}));
    },

    filter(query: WorldStateUIQuery) {
        return DBC.WorldStateUI
            .filter(query)
            .map(x=>new WorldStateUI(x))
    },

    find(query: WorldStateUIQuery) {
        return new WorldStateUI(DBC.WorldStateUI.find(query));
    }
}

export class WorldStateUIRef<T> extends Ref<T,WorldStateUI> {
    protected create(): WorldStateUI {
        return WorldStateUIRegistry.create()
    }
    protected clone(): WorldStateUI {
        return new WorldStateUI(DBC.WorldStateUI
            .find({ID:this.cell.get()})
            .clone(Ids.WorldStateUI.id())
        )
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldStateUI): number {
        return v.ID;
    }
    protected resolve(): WorldStateUI {
        return WorldStateUIRegistry.load(this.cell.get());
    }
}