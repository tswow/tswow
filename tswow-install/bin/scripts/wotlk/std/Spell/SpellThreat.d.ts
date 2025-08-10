import { spell_threatRow } from "../../sql/spell_threat";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";
export declare class SpellThreat extends MaybeSQLEntity<Spell, spell_threatRow> {
    protected createSQL(): spell_threatRow;
    protected findSQL(): spell_threatRow;
    protected isValidSQL(sql: spell_threatRow): boolean;
    get FlatMod(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_threatRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_threatRow>>;
    get PercentMod(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_threatRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_threatRow>>;
    get APPercentMod(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_threatRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_threatRow>>;
    set(flat: number, percent?: number, apPercent?: number): Spell;
}
