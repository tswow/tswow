import { SQL } from "../../SQLFiles";
import { spell_bonus_dataRow } from "../../sql/spell_bonus_data";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";

export class SpellBonusData extends MaybeSQLEntity<Spell,spell_bonus_dataRow> {
    protected createSQL(): spell_bonus_dataRow {
        return SQL.spell_bonus_data.add(this.owner.ID)
            .ap_bonus.set(0)
            .ap_dot_bonus.set(0)
            .direct_bonus.set(0)
            .dot_bonus.set(0)
            .comments.set('tswow')
    }
    protected findSQL(): spell_bonus_dataRow {
        return SQL.spell_bonus_data.query({entry:this.owner.ID});
    }
    protected isValidSQL(sql: spell_bonus_dataRow): boolean {
        return sql.entry.get() === this.owner.ID;
    }

    get DirectBonus() { return this.wrapSQL(0, sql=>sql.direct_bonus); }
    get DotBonus()    { return this.wrapSQL(0, sql=>sql.dot_bonus); }
    get APBonus()     { return this.wrapSQL(0, sql=>sql.ap_bonus); }
    get APDotBonus()  { return this.wrapSQL(0, sql=>sql.ap_dot_bonus); }
}