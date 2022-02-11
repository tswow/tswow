import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { spell_threatRow } from "wotlkdata/wotlkdata/sql/types/spell_threat";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";

export class SpellThreat extends MaybeSQLEntity<Spell,spell_threatRow> {
    protected createSQL(): spell_threatRow {
        return SQL.spell_threat.add(this.owner.ID)
            .flatMod.set(0)
            .pctMod.set(0)
            .apPctMod.set(0)
    }
    protected findSQL(): spell_threatRow {
        return SQL.spell_threat.query({entry:this.owner.ID})
    }

    protected isValidSQL(sql: spell_threatRow ): boolean {
        return sql.entry.get() === this.owner.ID
    }

    get FlatMod()      { return this.wrapSQL(0, sql=>sql.flatMod)}
    get PercentMod()   { return this.wrapSQL(0, sql=>sql.pctMod)}
    get APPercentMod() { return this.wrapSQL(0, sql=>sql.apPctMod)}

    set(flat: number, percent = 0, apPercent = 0) {
        this.FlatMod.set(flat);
        this.PercentMod.set(percent);
        this.APPercentMod.set(apPercent);
        return this.owner;
    }
}