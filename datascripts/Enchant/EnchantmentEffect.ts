import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { StatType } from "../Misc/StatTypes";
import { Enchantment } from "./Enchantment";

const all_effects : any = {}
export function EnchantmentTypeID(id: number) {
    return function(target: any) {
        all_effects[id] = target;
    }
}

export class EnchantmentType extends EnumCell<EnchantmentEffectBase> {
    /** Enum Value = 0 */
    get Misc()            { return this.value(0) }
    /** Enum Value = 1 */
    get Proc()            { return this.value(1) }
    /** Enum Value = 2 */
    get Damage()          { return this.value(2) }
    /** Enum Value = 3 */
    get BuffEquipped()    { return this.value(3) }
    /** Enum Value = 4 */
    get AddArmor()        { return this.value(4) }
    /** Enum Value = 5 */
    get Stat()            { return this.value(5) }
    /** Enum Value = 6 */
    get Totem()           { return this.value(6) }
    /** Enum Value = 7 */
    get UseSpell()        { return this.value(7) }
    /** Enum Value = 8 */
    get PrismaticSocket() { return this.value(8) }
}

export class EnchantmentEffectBase extends ArrayEntry<Enchantment> {
    get Type() {
        return new EnchantmentType(
          this
        , this.wrapIndex(this.container.row.Effect,this.index)
        )
    }

    clear(): this {
        this.container.row
            .Effect.setIndex(this.index,0)
            .EffectArg.setIndex(this.index,0)
            .EffectPointsMin.setIndex(this.index,0)
            .EffectPointsMax.setIndex(this.index,0)
        return this;
    }

    isClear(): boolean {
        return this.container.row.Effect.getIndex(this.index) == 0
            && this.container.row.EffectArg.getIndex(this.index) == 0
            && this.container.row.EffectPointsMin.getIndex(this.index) == 0
            && this.container.row.EffectPointsMax.getIndex(this.index) == 0
    }

    static container(base: EnchantmentEffectBase) {
        return base.container;
    }

    objectifyPlain() {
        return super.objectify();
    }
}

export class EnchantmentEffectPlain extends EnchantmentEffectBase {
    get MinAmount() { return this.wrapIndex(this.container.row.EffectPointsMin,this.index); }
    get MaxAmount() { return this.wrapIndex(this.container.row.EffectPointsMax,this.index); }
    get Arg() { return this.wrapIndex(this.container.row.EffectArg,this.index); }

    objectify() {
        if(all_effects[this.Type.get()]) {
            return new all_effects[this.Type.get()](this).objectify();
        }
        return super.objectify();
    }
}

export class EnchantmentEffectWrap extends EnchantmentEffectBase {
    constructor(owner: EnchantmentEffectBase) {
        super(EnchantmentEffectBase.container(owner), owner.index)
    }
    ToPlain() { return new EnchantmentEffectPlain(this.container, this.index); }
}

@EnchantmentTypeID(1)
export class Proc extends EnchantmentEffectWrap {
    get Spell() { return this.wrapIndex(this.container.row.EffectArg, this.index); }
}

@EnchantmentTypeID(2)
export class Damage extends EnchantmentEffectWrap {
    get MinDamage() { return this.wrapIndex(this.container.row.EffectPointsMin,this.index); }
    get MaxDamage() { return this.wrapIndex(this.container.row.EffectPointsMax,this.index); }
}

@EnchantmentTypeID(3)
export class Buff extends EnchantmentEffectWrap {
}

@EnchantmentTypeID(4)
export class Armor extends EnchantmentEffectWrap {
    get MinArmor() { return this.wrapIndex(this.container.row.EffectPointsMin,this.index); }
    get MaxArmor() { return this.wrapIndex(this.container.row.EffectPointsMax,this.index); }
}

@EnchantmentTypeID(5)
export class Stat extends EnchantmentEffectWrap {
    get MinStat() { return this.wrapIndex(this.container.row.EffectPointsMin,this.index); }
    get MaxStat() { return this.wrapIndex(this.container.row.EffectPointsMax,this.index); }
    get Stat() { return new StatType(this, this.wrapIndex(this.container.row.EffectArg,this.index))}
}

@EnchantmentTypeID(6)
export class Totem extends EnchantmentEffectWrap {
}

@EnchantmentTypeID(7)
export class UseSpell extends EnchantmentEffectWrap {
    get Spell() { return this.wrapIndex(this.container.row.EffectArg, this.index); }
}

@EnchantmentTypeID(8)
export class PrismaticSocket extends EnchantmentEffectWrap {
}

export class EnchantmentEffects extends ArraySystem<EnchantmentEffectPlain,Enchantment> {
    get length(): number {
        return 3;
    }

    get(index: number): EnchantmentEffectPlain {
        return new EnchantmentEffectPlain(this.owner, index);
    }

    mod(index: number, callback: (effect: EnchantmentEffectPlain)=>void)  {
        callback(this.get(index));
        return this.owner;
    }

    addMod(callback: (effect: EnchantmentEffectPlain)=>void)  {
        callback(this.addGet());
        return this.owner;
    }

    objectifyPlain() {
        return [this.get(0),this.get(1),this.get(2)]
            .map(x=>x.objectifyPlain())
    }
}