import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { CellSystem, CellSystemTop } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { MultiFloatWrapper, MultiIntWrapper, MultiUIntWrapper } from "wotlkdata/wotlkdata/dbc/DBCCell";
import { SpellVisualKitRow } from "wotlkdata/wotlkdata/dbc/types/SpellVisualKit";
import { SpellChainEffectRegistry } from "./SpellChainEffect";

export class SpellCharacterProcedure extends CellSystemTop {
    @Transient
    row: SpellVisualKitRow;

    @Transient
    index: number

    constructor(row: SpellVisualKitRow, index: number, type = -2) {
        super();
        this.row = row;
        this.index = index;
        if(type>-1) {
            this.row.CharProc.setIndex(this.index, type);
        }
    }

    static As(proc: SpellCharacterProcedure, id: number) {
        return proc.As(id);
    }

    protected As(id: number): SpellCharacterProcedure {
        switch(id) {
            case 0:
                return this.SetChain()
            case 1:
                return this.SetColor()
            case 2:
                return this.SetScale()
            case 4:
                return this.SetEmissive()
            case 6:
                return this.SetEclipse()
            case 7:
                return this.SetAnimation()
            case 8:
                return this.SetWeaponTrail()
            case 9:
                return this.SetBlizzard()
            case 10:
                return this.SetFishingLine()
            default:
                return this;
        }
    }

    SetChain() { return new ChainProcedure(this.row,this.index,0) }
    SetColor() { return new ColorProcedure(this.row,this.index,1) }
    SetScale() { return new ScaleProcedure(this.row,this.index,2) }
    SetEmissive() { return new EmissiveProcedure(this.row,this.index,4) }
    SetEclipse() { return new EclipseProcedure(this.row,this.index,6) }
    SetAnimation() { return new StandWalkAnim(this.row,this.index,7) }
    SetWeaponTrail() { return new WeaponTrail(this.row,this.index,8) }
    SetBlizzard() { return new Blizzard(this.row,this.index,9) }
    SetFishingLine() { return new SpellCharacterProcedure(this.row, this.index, 10); }
}

export class ChainProcedure extends SpellCharacterProcedure {
    get ChainEffect() {
        return SpellChainEffectRegistry.ref(
            this
            , new MultiFloatWrapper(this, this.row.CharParamZero, this.index)
        )
    }
    get TargetCount() {
        return new MultiFloatWrapper(this, this.row.CharParamOne, this.index)
    }
    get Forever() {
        return new MultiFloatWrapper(this, this.row.CharParamTwo, this.index)
    }
}

export class ColorProcedure extends SpellCharacterProcedure {
    get Color() {
        return new MultiFloatWrapper(this, this.row.CharParamZero, this.index);
    }
    get Period() {
        return new MultiFloatWrapper(this, this.row.CharParamOne, this.index);
    }
    get EndTime() {
        return new MultiFloatWrapper(this, this.row.CharParamTwo, this.index);
    }
    get FadeOutTime() {
        return new MultiFloatWrapper(this, this.row.CharParamThree, this.index);
    }
}

export class ScaleProcedure extends SpellCharacterProcedure {
    get Scale() { return new MultiFloatWrapper(this, this.row.CharParamZero, this.index); }
}

export class EmissiveProcedure extends SpellCharacterProcedure {
    get Color() { return new MultiFloatWrapper(this, this.row.CharParamZero, this.index); }
}

export class EclipseProcedure extends SpellCharacterProcedure {
    get Color() { return new MultiFloatWrapper(this, this.row.CharParamZero, this.index); }
    get FadeInTime() { return new MultiFloatWrapper(this, this.row.CharParamOne, this.index); }
}

export class StandWalkAnim extends SpellCharacterProcedure {
    get StandAnim() { return new MultiUIntWrapper(this, this.row.CharParamZero, 0); }
    get WalkAnim() { return new MultiUIntWrapper(this, this.row.CharParamOne, 1); }
}

export class WeaponTrail extends SpellCharacterProcedure {
    get Color() { return new MultiUIntWrapper(this, this.row.CharParamZero, 0); }
    get FadeOutRate() { return new MultiIntWrapper(this, this.row.CharParamOne, 1); }
    get Duration() { return new MultiUIntWrapper(this, this.row.CharParamTwo, 2); }
    get Alpha() { return new MultiUIntWrapper(this, this.row.CharParamThree, 3); }
}

export class Blizzard extends SpellCharacterProcedure {
    get ModelName() { return new MultiUIntWrapper(this, this.row.CharParamZero, 0); }
    get EmissionRate() { return new MultiFloatWrapper(this, this.row.CharParamOne, 1); }
}

export class SpellCharacterProcedures<T> extends CellSystem<T> {
    @Transient
    protected row: SpellVisualKitRow;

    get(index: number) {
        return new SpellCharacterProcedure(this.row, index);
    }

    objectify() {
        return this.row.CharProc.get()
            .filter((x)=>x>=0)
            .map((x,i)=> SpellCharacterProcedure.As(this.get(i),x).objectify())
    }

    get length() { return 4; }

    addGet() {
        for(let i=0;i<this.length;++i) {
            if(this.row.CharProc.getIndex(i)<0) {
                return this.get(i);
            }
        }
        throw new Error(`Can't add more entries, array is full.`)
    }

    mod(index: number, callback: (proc: SpellCharacterProcedure)=>void) {
        callback(this.get(index));
        return this.owner;
    }

    addMod(callback: (proc: SpellCharacterProcedure)=>void) {
        callback(this.addGet());
        return this.owner;
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