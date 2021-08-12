import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SpellVisualKitRow } from "wotlkdata/dbc/types/SpellVisualKit";
import { MultiUIntWrapper, MultiFloatWrapper, MultiIntWrapper } from "wotlkdata/dbc/DBCCell";
import { SpellChainEffect, SpellChainEffectPointer } from "./SpellChainEffect";

export class SpellCharacterProcedure<T> extends CellSystem<T> {
    @Transient
    row: SpellVisualKitRow;

    @Transient
    index: number

    constructor(owner: T, row: SpellVisualKitRow, index: number, type = -2) {
        super(owner);
        this.row = row;
        this.index = index;
        if(type>-1) {
            this.row.CharProc.setIndex(this.index, type);
        }
    }

    As(id: number): SpellCharacterProcedure<T> {
        switch(id) {
            case 0:
                return this.AsChain()
            case 1:
                return this.AsColor()
            case 2:
                return this.AsScale()
            case 4:
                return this.AsEmissive()
            case 6:
                return this.AsEclipse()
            case 7:
                return this.AsAnimation()
            case 8:
                return this.AsWeaponTrail()
            case 9:
                return this.AsBlizzard()
            case 10:
                return this.AsFishingLIne()
            default:
                return this;
        }
    }

    AsChain() { return new ChainProcedure(this.owner,this.row,this.index,0) }
    AsColor() { return new ColorProcedure(this.owner,this.row,this.index,1) }
    AsScale() { return new ScaleProcedure(this.owner,this.row,this.index,2) }
    AsEmissive() { return new EmissiveProcedure(this.owner,this.row,this.index,4) }
    AsEclipse() { return new EclipseProcedure(this.owner,this.row,this.index,6) }
    AsAnimation() { return new StandWalkAnim(this.owner,this.row,this.index,7) }
    AsWeaponTrail() { return new WeaponTrail(this.owner,this.row,this.index,8) }
    AsBlizzard() { return new Blizzard(this.owner,this.row,this.index,9) }
    AsFishingLIne() { return new SpellCharacterProcedure(this.owner, this.row, this.index, 10); }
}

export class ChainProcedure<T> extends SpellCharacterProcedure<T> {
    get ChainEffect() { return new SpellChainEffectPointer(this, new MultiFloatWrapper(this, this.row.CharParamZero, this.index))}
    get TargetCount() { return new MultiFloatWrapper(this, this.row.CharParamOne, this.index)}
    get Forever() { return new MultiFloatWrapper(this, this.row.CharParamTwo, this.index)}
}

export class ColorProcedure<T> extends SpellCharacterProcedure<T> {
    get Color() { return new MultiFloatWrapper(this, this.row.CharParamZero, this.index); }
    get Period() { return new MultiFloatWrapper(this, this.row.CharParamOne, this.index); }
    get EndTime() { return new MultiFloatWrapper(this, this.row.CharParamTwo, this.index); }
    get FadeOutTime() { return new MultiFloatWrapper(this, this.row.CharParamThree, this.index); }
}

export class ScaleProcedure<T> extends SpellCharacterProcedure<T> {
    get Scale() { return new MultiFloatWrapper(this, this.row.CharParamZero, this.index); }
}

export class EmissiveProcedure<T> extends SpellCharacterProcedure<T> {
    get Color() { return new MultiFloatWrapper(this, this.row.CharParamZero, this.index); }
}

export class EclipseProcedure<T> extends SpellCharacterProcedure<T> {
    get Color() { return new MultiFloatWrapper(this, this.row.CharParamZero, this.index); }
    get FadeInTime() { return new MultiFloatWrapper(this, this.row.CharParamOne, this.index); }
}

export class StandWalkAnim<T> extends SpellCharacterProcedure<T> {
    get StandAnim() { return new MultiUIntWrapper(this, this.row.CharParamZero, 0); }
    get WalkAnim() { return new MultiUIntWrapper(this, this.row.CharParamOne, 1); }
}

export class WeaponTrail<T> extends SpellCharacterProcedure<T> {
    get Color() { return new MultiUIntWrapper(this, this.row.CharParamZero, 0); }
    get FadeOutRate() { return new MultiIntWrapper(this, this.row.CharParamOne, 1); }
    get Duration() { return new MultiUIntWrapper(this, this.row.CharParamTwo, 2); }
    get Alpha() { return new MultiUIntWrapper(this, this.row.CharParamThree, 3); }
}

export class Blizzard<T> extends SpellCharacterProcedure<T> {
    get ModelName() { return new MultiUIntWrapper(this, this.row.CharParamZero, 0); }
    get EmissionRate() { return new MultiFloatWrapper(this, this.row.CharParamOne, 1); }
}

export class SpellCharacterProcedures<T> extends CellSystem<T> {
    @Transient
    protected row: SpellVisualKitRow;

    get(index: number) {
        return new SpellCharacterProcedure(this.owner, this.row, index);
    }

    objectify() {
        return this.row.CharProc.get()
            .filter((x)=>x>=0)
            .map((x,i)=> this.get(i).As(x).objectify())
    }

    get length() { return 4; }

    add() {
        for(let i=0;i<this.length;++i) {
            if(this.row.CharProc.getIndex(i)<0) {
                return this.get(i);
            }
        }
        throw new Error(`Can't add more entries, array is full.`)
    }

    clearAll() {
        for(let i=0;i<this.length;++i) {
            this.clear(i);
        }
        return this.owner;
    }

    clear(index: number) {
        this.row.CharProc.setIndex(index,-1);
        this.row.CharParamZero.setIndex(index,0);
        this.row.CharParamOne.setIndex(index,0);
        this.row.CharParamTwo.setIndex(index,0);
        this.row.CharParamThree.setIndex(index,0);
        return this.owner;
    }

    constructor(owner: T, row: SpellVisualKitRow) {
        super(owner);
        this.row = row;
    }
}