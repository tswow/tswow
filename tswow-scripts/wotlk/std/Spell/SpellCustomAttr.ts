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
            .attributesEx.set(0)
    }
    protected findSQL(): spell_custom_attrRow {
        return SQL.spell_custom_attr.query({entry:this.owner.ID});
    }
    protected isValidSQL(sql: spell_custom_attrRow): boolean {
        return sql.entry.get() === this.owner.ID;
    }

    get Attribute() { return this.wrapSQL(0, (sql)=>sql.attributes); }
    get AttributeEx() { return this.wrapSQL(0, (sql)=>sql.attributesEx); }
}

export class SpellCustomAttr extends MaskCell<Spell> {
    @Transient
    private sql: SpellCustomAttrSQL;

    protected deserialize(value: any) {
        throw new Error(`Deserialize not implemented for SpellAttributes`);
    }

    clearAll() {
        this.cells().forEach((x)=>x.set(0));
        return this.owner;
    }

    protected cells() {
        return [
            this.sql.Attribute,
            this.sql.AttributeEx,
        ]
    }

    protected cell(no: number) {
        return this.cells()[Math.floor(no/32)]
    }

    protected bitno(no: number) { return no%32; }

    constructor(owner: Spell) {
        super(owner);
        this.sql = new SpellCustomAttrSQL(owner);
    }

    setBit(no: number, value: boolean)  {
        if(value) {
            const cell = this.cell(no);
            cell.set((cell.get()|1<<this.bitno(no))>>>0);
        } else {
            const cell = this.cell(no);
            cell.set((cell.get()&~(1<<this.bitno(no)))>>>0);
        }
        return this.owner;
    }

    toString() {
        return this.cells().reduce((p,c)=>p+c.get().toString(2),"");
    }

    getBit(no: number): boolean {
        const cell = this.cell(no);
        return ((cell.get()&1<<this.bitno(no))>>>0) !== 0;
    }

    // todo: fix autocompletion
    set(keys: string[])
    {
        this.clearAll();
        this.add(keys);
        return this.owner;
    }
    add(keys: string[])
    {
        for(let key of keys)
        {
            this[key].set(1);
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
    get IS_TALENT()                     { return this.bit(23); }
    get DONT_RESTART_P_TIMER()          { return this.bit(25); }
    get USE_RANGED_NO_AMMO()            { return this.bit(26); }

    get CANNOT_BE_SAVED()               { return this.bit(31); }
    get REQUIRES_COMBAT()               { return this.bit(32); }
    get NO_ATTACK_BLOCK()               { return this.bit(33); }
    get SCALE_DAMAGE_EFFECTS_ONLY()     { return this.bit(34); }
    get SCALE_HEALING_EFFECTS_ONLY()    { return this.bit(35); }
    get USE_TARGETS_LEVEL_FOR_SPELL_SCALING() { return this.bit(36); }
    get REMOVE_OUTSIDE_DUNGEONS_AND_RAIDS() { return this.bit(37); }
    get NOT_USABLE_IN_INSTANCES()       { return this.bit(38); }
    get USABLE_IN_INSTANCES_ONLY()      { return this.bit(39); }
    get PERIODIC_CAN_CRIT()             { return this.bit(40); }
    get IGNORES_CASTER_LEVEL()          { return this.bit(41); }
    get ONLY_PROC_FROM_CLASS_ABILITIES(){ return this.bit(42); }
    get ACTIVATES_REQUIRED_SHAPESHIFT() { return this.bit(43); }
    get REAPPLY_NO_REFRESH_DURATION()   { return this.bit(44); }
    get SPECIAL_DELAY_CALCULATION()     { return this.bit(45); }
    get CAST_TIME_UNAFFECTED_BY_HASTE() { return this.bit(46); }
    get LOW_CAST_TIME_DONT_INTERRUPT()  { return this.bit(47); }
}
