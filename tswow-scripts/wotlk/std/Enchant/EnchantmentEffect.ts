import { EnumCellTransform, makeEnumCell, TransformedClass } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { ArraySystemBase } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
import { SpellItemEnchantmentRow } from "wotlkdata/wotlkdata/dbc/types/SpellItemEnchantment";
import { StatType } from "../Misc/StatTypes";

const all_effects : any = {}
export function EnchantmentTypeID(id: number) {
    return function(target: any) {
        all_effects[id] = target;
    }
}

export class EnchantmentType extends EnumCellTransform<EnchantmentEffectBase> {
    get MISC()             { return this.plain_value(0) }
    get PROC()             { return this.value(1,t=>new Proc(this.r(t),t.index)) }
    get DAMAGE()           { return this.value(2,t=>new Damage(this.r(t),t.index)) }
    get BUFF_EQUIPPED()    { return this.value(3,t=>new Buff(this.r(t),t.index)) }
    get ADD_ARMOR()        { return this.value(4,t=>new Armor(this.r(t),t.index)) }
    get STAT()             { return this.value(5,t=>new Stat(this.r(t),t.index)) }
    get TOTEM()            { return this.value(6,t=>new Totem(this.r(t),t.index)) }
    get USE_SPELL()        { return this.value(7,t=>new UseSpell(this.r(t),t.index)) }
    get PRISMATIC_SOCKET() { return this.value(8,t=>new PrismaticSocket(this.r(t),t.index)) }

    private r(t: EnchantmentEffectBase) {
        return EnchantmentEffectBase.row(t)
    }
}
export class EnchantmentEffectBase extends TransformedClass<EnchantmentEffectPlain> {
    readonly index: number;
    protected row: SpellItemEnchantmentRow;
    static row(ench: EnchantmentEffectBase) {
        return ench.row;
    }

    constructor(row: SpellItemEnchantmentRow, index: number) {
        super();
        this.row = row;
        this.index = index;
    }

    protected transformer(): EnumCellTransform<any> {
        return this.Type
    }
    protected default(): EnchantmentEffectPlain {
        return new EnchantmentEffectPlain(this.row,this.index);
    }

    get Type() {
        return new EnchantmentType(
          this
        , this.wrapIndex(this.row.Effect,this.index)
        )
    }

    clear() {
        this.row
            .Effect.setIndex(this.index,0)
            .EffectArg.setIndex(this.index,0)
            .EffectPointsMin.setIndex(this.index,0)
            .EffectPointsMax.setIndex(this.index,0)
        return new EnchantmentEffectPlain(this.row,this.index);
    }

    isClear(): boolean {
        return this.row.Effect.getIndex(this.index) == 0
    }

    static container(base: EnchantmentEffectBase) {
        return base.row;
    }

    objectifyPlain() {
        return super.objectify();
    }
}

export class EnchantmentEffectPlain extends EnchantmentEffectBase {
    get MinAmount() { return this.wrapIndex(this.row.EffectPointsMin,this.index); }
    /** @deprecated Not used in TrinityCore, use "MinAmount" as basevalue */
    get MaxAmount() { return this.wrapIndex(this.row.EffectPointsMax,this.index); }
    get Arg() { return this.wrapIndex(this.row.EffectArg,this.index); }

    objectify() {
        if(all_effects[this.Type.get()]) {
            return new all_effects[this.Type.get()](this).objectify();
        }
        return super.objectify();
    }
}

@EnchantmentTypeID(1)
export class Proc extends EnchantmentEffectBase {
    get Spell() { return this.wrapIndex(this.row.EffectArg, this.index); }
}

@EnchantmentTypeID(2)
export class Damage extends EnchantmentEffectBase {
    get MinDamage() { return this.wrapIndex(this.row.EffectPointsMin,this.index); }
    /** @deprecated Not used in TrinityCore, use "MinDamage" as base */
    get MaxDamage() { return this.wrapIndex(this.row.EffectPointsMax,this.index); }
}

@EnchantmentTypeID(3)
export class Buff extends EnchantmentEffectBase {
}

@EnchantmentTypeID(4)
export class Armor extends EnchantmentEffectBase {
    get MinArmor() { return this.wrapIndex(this.row.EffectPointsMin,this.index); }
    /** @deprecated Not used in TrinityCore, use "MinArmor" as base value */
    get MaxArmor() { return this.wrapIndex(this.row.EffectPointsMax,this.index); }
}

@EnchantmentTypeID(5)
export class Stat extends EnchantmentEffectBase {
    get MinStat() { return this.wrapIndex(this.row.EffectPointsMin,this.index); }
    /** @deprecated Not used in TrinityCore, use "MinStat" as base value */
    get MaxStat() { return this.wrapIndex(this.row.EffectPointsMax,this.index); }
    get Stat() {
        return makeEnumCell(StatType, this, this.wrapIndex(this.row.EffectArg,this.index));
    }
}

@EnchantmentTypeID(6)
export class Totem extends EnchantmentEffectBase {
}

@EnchantmentTypeID(7)
export class UseSpell extends EnchantmentEffectBase {
    get Spell() { return this.wrapIndex(this.row.EffectArg, this.index); }
}

@EnchantmentTypeID(8)
export class PrismaticSocket extends EnchantmentEffectBase {
}

export class EnchantmentEffects<T> extends ArraySystemBase<EnchantmentEffectPlain,T> {
    @Transient
    protected row: SpellItemEnchantmentRow;

    constructor(owner: T, row: SpellItemEnchantmentRow) {
        super(owner);
        this.row = row;
    }

    protected isClearValue(a: EnchantmentEffectPlain): boolean {
        return a.isClear();
    }
    protected clearValue(a: EnchantmentEffectPlain): void {
        a.clear();
    }
    get length(): number {
        return 3;
    }
    get(index: number): EnchantmentEffectPlain {
        return new EnchantmentEffectPlain(this.row, index);
    }
}