import { Bit, MaskCell, MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { spell_custom_attrRow } from "../../sql/spell_custom_attr";
import { SQL } from "../../SQLFiles";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";

export class SpellCustomAttrSQL extends MaybeSQLEntity<Spell,spell_custom_attrRow> {
    protected createSQL(): spell_custom_attrRow {
        return SQL.spell_custom_attr.add(this.owner.ID)
            .attributes.set(0)
            .attributes1.set(0);
    }
    protected findSQL(): spell_custom_attrRow {
        return SQL.spell_custom_attr.query({entry:this.owner.ID});
    }
    protected isValidSQL(sql: spell_custom_attrRow): boolean {
        return sql.entry.get() === this.owner.ID;
    }

    get Attribute() { return this.wrapSQL(0, (sql)=>sql.attributes); }

    get Attribute1() { return this.wrapSQL(0, (sql)=>sql.attributes1); }
}

export class SpellCustomAttr extends MaskCell<Spell> {
    @Transient
    private sql: SpellCustomAttrSQL;

    @Transient
    private mask: MaskCell32<any>;
    constructor(owner: Spell) {
        super(owner);
        this.sql = new SpellCustomAttrSQL(owner);
        this.mask = new MaskCell32(undefined,this.sql.Attribute,false);
    }

    get() {
        return this.mask.get();
    }
    getBit(bit: number): boolean {
        return this.mask.getBit(bit);
    }
    setBit(bit: number, value: Bit): Spell {
        this.mask.setBit(bit,value);
        return this.owner;
    }
    clearAll(): Spell {
        this.mask.clearAll();
        return this.owner;
    }
    toString(): string {
        return this.mask.toString();
    }
    protected deserialize(value: any): void {
        (this.mask as any).deserialize(value);
    }

    set(values: number | string[])
    {
        if(typeof(values) === 'number')
        {
            this.mask.set(values);
        }
        else
        {
            this.clearAll();
            return this.add(values);
        }
    }

    add(values: string[])
    {
        for(let value of values)
        {
            this[value].set(1);
        }
        return this.owner;
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

export class SpellCustomAttr1 extends MaskCell<Spell> {
    @Transient
    private sql: SpellCustomAttrSQL;

    @Transient
    private mask: MaskCell32<any>;
    constructor(owner: Spell) {
        super(owner);
        this.sql = new SpellCustomAttrSQL(owner);
        this.mask = new MaskCell32(undefined,this.sql.Attribute1,false);
    }

    get() {
        return this.mask.get();
    }
    getBit(bit: number): boolean {
        return this.mask.getBit(bit);
    }
    setBit(bit: number, value: Bit): Spell {
        this.mask.setBit(bit,value);
        return this.owner;
    }
    clearAll(): Spell {
        this.mask.clearAll();
        return this.owner;
    }
    toString(): string {
        return this.mask.toString();
    }
    protected deserialize(value: any): void {
        (this.mask as any).deserialize(value);
    }

    set(values: number | string[])
    {
        if(typeof(values) === 'number')
        {
            this.mask.set(values);
        }
        else
        {
            this.clearAll();
            return this.add(values);
        }
    }

    add(values: string[])
    {
        for(let value of values)
        {
            this[value].set(1);
        }
        return this.owner;
    }

    exists() { return this.sql.exists(); }
    sqlRow() { return this.sql.getSQL(); }

    get IGNORE_HIT_AVOIDANCE() { return this.bit(0); }
    get IGNORE_DMG_AVOIDANCE() { return this.bit(1); }
    get UNK2()                 { return this.bit(2); }
    get UNK3()                 { return this.bit(3); }
    get UNK4()                 { return this.bit(4); }
    get UNK5()                 { return this.bit(5); }
    get UNK6()                 { return this.bit(6); }
    get UNK7()                 { return this.bit(7); }
    get UNK8()                 { return this.bit(8); }
    get UNK9()                 { return this.bit(9); }
    get UNK10()                { return this.bit(10); }
    get UNK11()                { return this.bit(11); }
    get UNK12()                { return this.bit(12); }
    get UNK13()                { return this.bit(13); }
    get UNK14()                { return this.bit(14); }
    get UNK15()                { return this.bit(15); }
    get UNK16()                { return this.bit(16); }
    get UNK17()                { return this.bit(17); }
    get UNK18()                { return this.bit(18); }
    get UNK19()                { return this.bit(19); }
    get UNK20()                { return this.bit(20); }
    get UNK21()                { return this.bit(21); }
    get UNK22()                { return this.bit(22); }
    get UNK23()                { return this.bit(23); }
    get UNK24()                { return this.bit(22); }
}