import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { ObjectifyOptions, Objects } from "../../../data/cell/serialization/ObjectIteration";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiFloatWrapper, MultiIntWrapper, MultiUIntWrapper } from "../../../data/dbc/DBCCell";
import { SpellVisualKitRow } from "../../dbc/SpellVisualKit";
import { SpellChainEffectRegistry } from "./SpellChainEffect";

export class CharacterProcedureType extends EnumCellTransform<SpellCharacterProcedure> 
{
    get CHAIN() { return this.value(0, x=>new ChainProcedure(this.owner.row,this.owner.index)) }
    get COLOR() { return this.value(1, x=>new ColorProcedure(this.owner.row,this.owner.index)) }
    get SCALE() { return this.value(2, x=>new ScaleProcedure(this.owner.row,this.owner.index)) }
    get EMISSIVE() { return this.value(4, x=>new EmissiveProcedure(this.owner.row,this.owner.index)) }
    get ECLIPSE() { return this.value(6, x=>new EclipseProcedure(this.owner.row,this.owner.index)) }
    get ANIMATION() { return this.value(7, x=>new SpellCharacterProcedurePlain(this.owner.row,this.owner.index)) }
    get WEAPON_TRAIL() { return this.value(8, x=>new WeaponTrail(this.owner.row,this.owner.index)) }
    get BLIZZARD() { return this.value(9, x=>new Blizzard(this.owner.row,this.owner.index)) }
    get FISHING_LINE() { return this.value(10, x=>new SpellCharacterProcedurePlain(this.owner.row,this.owner.index)) }
    get UNK_13() { return this.value(13, x=>new SpellCharacterProcedurePlain(this.owner.row,this.owner.index)) }
}

export class SpellCharacterProcedure extends CellSystemTop {
    @Transient
    row: SpellVisualKitRow;

    @Transient
    index: number

    constructor(row: SpellVisualKitRow, index: number) {
        super();
        this.row = row;
        this.index = index;
    }

    get Type() {
        return new CharacterProcedureType(this, this.wrapIndex(this.row.CharProc,this.index));
    }

    objectify(options?: ObjectifyOptions)
    {
        return Objects.objectifyObj(EnumCellTransform.getSelection(this.Type).cell.as());
    }
}

export class SpellCharacterProcedurePlain extends SpellCharacterProcedure
{
    get Param0() { return this.wrapIndex(this.row.CharParamZero, this.index); }
    get Param1() { return this.wrapIndex(this.row.CharParamOne, this.index); }
    get Param2() { return this.wrapIndex(this.row.CharParamTwo, this.index); }
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
        return new SpellCharacterProcedurePlain(this.row, index);
    }

    objectify(options?: ObjectifyOptions) {
        return this.row.CharProc.get()
            .filter((x)=>x>=0)
            .map((x,i)=>x < 0 ? '<empty>' : this.get(i).objectify())
    }

    get length() { return 4; }

    forEachValid(callback: (proc: SpellCharacterProcedurePlain) => void)
    {
        for(let i = 0; i < this.length; ++i)
        {
            if(this.row.CharProc.getIndex(i) >= 0)
            {
                callback(this.get(i));
            }
        }
        return this.owner;
    }

    addGet() {
        for(let i=0;i<this.length;++i) {
            if(this.row.CharProc.getIndex(i)<0) {
                return this.get(i);
            }
        }
        throw new Error(`Can't add more entries, array is full.`)
    }

    mod(index: number, callback: (proc: SpellCharacterProcedurePlain)=>void) {
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