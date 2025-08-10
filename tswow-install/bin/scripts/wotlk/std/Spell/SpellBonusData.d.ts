import { spell_bonus_dataRow } from "../../sql/spell_bonus_data";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";
export declare class SpellBonusData extends MaybeSQLEntity<Spell, spell_bonus_dataRow> {
    protected createSQL(): spell_bonus_dataRow;
    protected findSQL(): spell_bonus_dataRow;
    protected isValidSQL(sql: spell_bonus_dataRow): boolean;
    get DirectBonus(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_bonus_dataRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_bonus_dataRow>>;
    get DotBonus(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_bonus_dataRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_bonus_dataRow>>;
    get APBonus(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_bonus_dataRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_bonus_dataRow>>;
    get APDotBonus(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_bonus_dataRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_bonus_dataRow>>;
}
