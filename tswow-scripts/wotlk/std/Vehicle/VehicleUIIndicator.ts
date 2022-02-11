import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { VehicleUIIndSeatRow } from "wotlkdata/wotlkdata/dbc/types/VehicleUIIndSeat";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionXYCell } from "../Misc/PositionCell";

export class VehicleUIIndicatorCell<T> extends Cell<string,T> {
    protected id: Cell<number,any>

    constructor(owner: T, id: Cell<number,any>) {
        super(owner);
        this.id = id;
    }

    get(): string {
        let row = DBC.VehicleUIIndicator.findById(this.id.get())
        return row ? row.BackgroundTexture.get() : '';
    }

    set(value: string) {
        let row = DBC.VehicleUIIndicator.query({BackgroundTexture:value})
        if(row) {
            this.id.set(row.ID.get())
        } else {
            this.id.set(DBC.VehicleUIIndicator.add(
                Ids.VehicleUIIndicator.id()
                )
                .BackgroundTexture.set(value)
                .ID.get()
            )
        }
        return this.owner;
    }
}

// TODO: how is this used?
export class VehicleUIIndSeat extends MainEntity<VehicleUIIndSeatRow> {
    get ID() { return this.row.ID.get(); }
    get Texture() {
        return new VehicleUIIndicatorCell(this, this.row.VehicleUIIndicatorID);
    }
    get VirtualSeatIndex() {
        return this.wrap(this.row.VirtualSeatIndex);
    }

    get Position() {
        return new PositionXYCell(
              this
            , this.row.XPos
            , this.row.YPos
            )
    }
}