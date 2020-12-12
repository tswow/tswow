import { DBC } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SpellCastTimesRow } from "wotlkdata/dbc/types/SpellCastTimes";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";

export class SpellCastTime extends Subsystem<Spell> {
    readonly row: SpellCastTimesRow;
    constructor(owner: Spell) {
        super(owner);
        this.row = DBC.SpellCastTimes
            .findById(this.owner.row.CastingTimeIndex.get())
            .clone(Ids.SpellCastTimes.id())
        this.owner.row.CastingTimeIndex.set(this.row.ID.get());
    }

    get Base() { return this.wrap(this.row.Base); }
    get PerLevel() { return this.wrap(this.row.PerLevel); }
    get Minimum() { return this.wrap(this.row.Minimum); }

    set(base: number, perLevel: number, minimum: number) {
        this.Base.set(base);
        this.PerLevel.set(perLevel);
        this.Minimum.set(minimum)
    }
}
