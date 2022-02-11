import { MaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { spell_custom_attrRow } from "wotlkdata/wotlkdata/sql/types/spell_custom_attr";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";

export class SpellCustomAttrSQL extends MaybeSQLEntity<Spell,spell_custom_attrRow> {
    protected createSQL(): spell_custom_attrRow {
        return SQL.spell_custom_attr.add(this.owner.ID)
            .attributes.set(0)
    }
    protected findSQL(): spell_custom_attrRow {
        return SQL.spell_custom_attr.query({entry:this.owner.ID});
    }
    protected isValidSQL(sql: spell_custom_attrRow): boolean {
        return sql.entry.get() === this.owner.ID;
    }

    get Attribute() { return this.wrapSQL(0, (sql)=>sql.attributes); }
}

export class SpellCustomAttr extends MaskCell32<Spell> {
    @Transient
    private sql: SpellCustomAttrSQL;
    constructor(owner: Spell) {
        super(owner,
            new CellBasic(owner,
                ()=>{
                    return this.sql.Attribute.get();
                },
                (value: number)=>{
                    this.sql.Attribute.set(value);
                    return owner;
                }
            )
        );
        this.sql = new SpellCustomAttrSQL(owner);
    }

    exists() { return this.sql.exists(); }
    sqlRow() { return this.sql.getSQL(); }

    get ENCHANT_PROC()                  { return this.bit(0); }
    get CONE_BACK()                     { return this.bit(1); }
    get CONE_LINE()                     { return this.bit(2); }
    get SHARE_DAMAGE()                  { return this.bit(3); }
    get NO_INITIAL_THREAT()             { return this.bit(4); }
    get AURA_CC()                       { return this.bit(5); }
    get DONT_BREAK_STEALTH()            { return this.bit(6); }
    get CAN_CRIT()                      { return this.bit(7); }
    get DIRECT_DAMAGE()                 { return this.bit(8); }
    get CHARGE()                        { return this.bit(9); }
    get PICKPOCKET()                    { return this.bit(10); }
    get ROLLING_PERIODIC()              { return this.bit(11); }
    get NEGATIVE_EFFECT_0()             { return this.bit(12); }
    get NEGATIVE_EFFECT_1()             { return this.bit(13); }
    get NEGATIVE_EFFECT_2()             { return this.bit(14); }
    get IGNORE_ARMOR()                  { return this.bit(15); }
    get REQUIRE_TARGET_FACE_CASTER()    { return this.bit(16); }
    get REQUIRE_CASTER_BEHIND_TARGET()  { return this.bit(17); }
    get ALLOW_IN_FLIGHT_TARGET()        { return this.bit(18); }
    get NEEDS_AMMO_DATA()               { return this.bit(19); }
    get BINARY_SPELL()                  { return this.bit(20); }
    get SCHOOL_MASK_NORMAL_WITH_MAGIC() { return this.bit(21); }
    get LIQUID_AURA()                   { return this.bit(22); }
}