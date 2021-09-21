import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { spell_custom_attrRow } from "wotlkdata/sql/types/spell_custom_attr";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";

export class SpellCustomAttrSQL extends MaybeSQLEntity<Spell,spell_custom_attrRow> {
    protected createSQL(): spell_custom_attrRow {
        return SQL.spell_custom_attr.add(this.owner.ID)
            .attributes.set(0)
    }
    protected findSQL(): spell_custom_attrRow {
        return SQL.spell_custom_attr.find({entry:this.owner.ID});
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
    sqlRow() { return this.sql.sqlRow(); }

    get EnchantProc()               { return this.bit(0); }
    get ConeBack()                  { return this.bit(1); }
    get ConeLine()                  { return this.bit(2); }
    get ShareDamage()               { return this.bit(3); }
    get NoInitialThreat()           { return this.bit(4); }
    get AuraCC()                    { return this.bit(5); }
    get DontBreakStealth()          { return this.bit(6); }
    get CanCrit()                   { return this.bit(7); }
    get DirectDamage()              { return this.bit(8); }
    get Charge()                    { return this.bit(9); }
    get Pickpocket()                { return this.bit(10); }
    get RollingPeriodic()           { return this.bit(11); }
    get NegativeEff0()              { return this.bit(12); }
    get NegativeEff1()              { return this.bit(13); }
    get NegativeEff2()              { return this.bit(14); }
    get IgnoreArmor()               { return this.bit(15); }
    get RequireTargetFaceCaster()   { return this.bit(16); }
    get RequireCasterBehindTarget() { return this.bit(17); }
    get AllowInflightTarget()       { return this.bit(18); }
    get NeedsAmmoData()             { return this.bit(19); }
    get BinarySpell()               { return this.bit(20); }
    get SchoolmaskNormalWithMagic() { return this.bit(21); }
    get LiquidAura()                { return this.bit(22); }
}