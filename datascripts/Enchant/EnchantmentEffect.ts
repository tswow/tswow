import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { StatType } from "../Misc/StatTypes";
import { Enchantment } from "./Enchantment";

const all_effects : any = {}
export function EnchantmentTypeID(id: number) {
    return function(target: any) {
        all_effects[id] = target;
    }
}

export class EnchantmentType extends EnumCellWrapper<EnchantmentEffectBase> {
    /** value=0 */
    @EnumField(0)
    setMisc() { return this.set(0); }
    /** value=1 */
    @EnumField(1)
    setProc() { return new Proc(this.set(1)); }
    /** value=2 */
    @EnumField(2)
    setDamage() { return new Damage(this.set(2)); }
    /** value=3 */
    @EnumField(3)
    setBuffEquipped() { return new Buff(this.set(3)); }
    /** value=4 */
    @EnumField(4)
    setAddArmor() { return new Armor(this.set(4)); }
    /** value=5 */
    @EnumField(5)
    setStat() { return new Stat(this.set(5)); }
    /** value=6 */
    @EnumField(6)
    setTotem() { return new Totem(this.set(6)); }
    /** value=7 */
    @EnumField(7)
    setUseSpell() { return new UseSpell(this.set(7)); }
    /** value=8 */
    @EnumField(8)
    setPrismaticSocket() { return new PrismaticSocket(this.set(8)); }
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

    add() {
        return this.getFree();
    }

    mod(index: number, callback: (effect: EnchantmentEffectPlain)=>void)  {
        callback(this.get(index));
        return this.owner;
    }

    addMod(callback: (effect: EnchantmentEffectPlain)=>void)  {
        callback(this.add());
        return this.owner;
    }

    objectifyPlain() {
        return [this.get(0),this.get(1),this.get(2)]
            .map(x=>x.objectifyPlain())
    }
}