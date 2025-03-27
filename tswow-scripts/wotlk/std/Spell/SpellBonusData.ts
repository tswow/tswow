import { spell_bonus_dataRow } from "../../sql/spell_bonus_data";
import { SQL } from "../../SQLFiles";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { SpellEffect } from "./SpellEffect";

export class SpellBonusData extends MaybeSQLEntity<SpellEffect,spell_bonus_dataRow> {
    protected createSQL(): spell_bonus_dataRow {
        return SQL.spell_bonus_data.add(this.owner.row.ID.get(), this.owner.index, {})
            .effect.set(this.owner.index)
            .ap.set(0)
            .sp.set(0)
            .comments.set(`${this.owner.row.Name.enGB.get()}`)
    }
    protected findSQL(): spell_bonus_dataRow {
        return SQL.spell_bonus_data.query({entry: this.owner.row.ID.get(), effect: this.owner.index});
    }
    protected isValidSQL(sql: spell_bonus_dataRow): boolean {
        return sql.entry.get() === this.owner.row.ID.get() && sql.effect.get() === this.owner.index;
    }

    get SPBonus() { return this.wrapSQL(0, sql=>sql.sp); }
    get APBonus() { return this.wrapSQL(0, sql=>sql.ap); }
}