import { Cell } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { DBC } from "../../DBCFiles";
import { Ids } from "../Misc/Ids";
import { HolidayBase } from "./Holiday";



export class HolidayName extends LocSystem<HolidayBase> {
    private row() {
        return DBC.HolidayNames
            .findById(this.owner.row.HolidayNameID.get())
    }
    lang(lang: Language): Cell<string, HolidayBase> & PendingCell {
        return this.ownerWrapExists(this.row().Name.lang(lang))
    }
    get mask(): Cell<number, HolidayBase> {
        return this.ownerWrap(this.row().Name.mask);
    }
    set(con: loc_constructor): HolidayBase {
        this.row().Name.set(con);
        return this.owner;
    }

    copy() {
        this.owner.row.HolidayNameID.set(
            this.row().clone(Ids.HolidayNames.id()).ID.get()
        );
        return this.owner;
    }
}

export class HolidayDescription extends LocSystem<HolidayBase> {
    private row() {
        return DBC.HolidayDescriptions
            .findById(this.owner.row.HolidayDescriptionID.get())
    }
    lang(lang: Language): Cell<string, HolidayBase> & PendingCell {
        return this.ownerWrapExists(this.row().Description.lang(lang))
    }
    get mask(): Cell<number, HolidayBase> {
        return this.ownerWrap(this.row().Description.mask);
    }
    set(con: loc_constructor): HolidayBase {
        this.row().Description.set(con);
        return this.owner;
    }

    copy() {
        this.owner.row.HolidayDescriptionID.set(
            this.row().clone(Ids.HolidayDescriptions.id()).ID.get()
        );
        return this.owner;
    }
}