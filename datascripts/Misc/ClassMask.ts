import { Cell } from "wotlkdata/cell/cells/Cell";
import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";
import { ClassMaskCon, ClassType, CLASS_TYPES, getClassType, makeClassmask, resolveClassType } from "../Class/ClassType";

export class ClassMask<T> extends MaskCell32<T> {
    protected permitZero: boolean;

    constructor(owner: T, cell: Cell<number,any>, signed = false, permitZero = true) {
        super(owner, cell, signed);
        this.permitZero = permitZero;
    }

    setClass(classId: ClassType, value: boolean) {
        return this.setBit(resolveClassType(classId)-1,value);
    }
    getClass(classId: ClassType) {
        return (this.permitZero&&this.get() === 0) || this.getBit(resolveClassType(classId)-1)
    }

    add(classes: ClassMaskCon) {
        return this.or(makeClassmask(classes));
    }

    remove(classes: ClassMaskCon) {
        return this.not(makeClassmask(classes));
    }

    private classBit(bit: number) {
        return this.bit(bit-1);
    }

    forEach(callback: (cls: ClassType)=>void) {
        for(let i=0;i<31;++i) {
            if(this.getClass(i)) callback(getClassType(i+1))
        }
    }

    filter(callback: (cls: ClassType)=>boolean): ClassType[] {
        return this.map(x=>x)
            .filter(callback);
    }

    map<T>(callback: (cls: ClassType)=>T) {
        let values: T[] = []
        this.forEach(x=>values.push(callback(x)))
        return values;
    }

    get Warrior()     { return this.classBit(CLASS_TYPES.WARRIOR); }
    get Paladin()     { return this.classBit(CLASS_TYPES.PALADIN); }
    get Hunter()      { return this.classBit(CLASS_TYPES.HUNTER); }
    get Rogue()       { return this.classBit(CLASS_TYPES.ROGUE); }
    get Priest()      { return this.classBit(CLASS_TYPES.PRIEST); }
    get DeathKnight() { return this.classBit(CLASS_TYPES.DEATH_KNIGHT); }
    get Shaman()      { return this.classBit(CLASS_TYPES.SHAMAN); }
    get Mage()        { return this.classBit(CLASS_TYPES.MAGE); }
    get Warlock()     { return this.classBit(CLASS_TYPES.WARLOCK); }
    get Druid()       { return this.classBit(CLASS_TYPES.DRUID); }
}

export class ClassMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    getClass(classId: number) {
        return this.getBit(classId-1)
    }
    private classBit(bit: number) {
        return this.bit(bit-1);
    }

    forEach(callback: (cls: number)=>void) {
        for(let i=1;i<=32;++i) {
            if(this.getClass(i)) callback(i)
        }
    }

    filter(callback: (cls: number)=>boolean) {
        return this.map(x=>x)
            .filter(callback);
    }

    map<T>(callback: (cls: number)=>T) {
        let values: T[] = []
        this.forEach(x=>values.push(callback(x)))
        return values;
    }

    get Warrior()     { return this.classBit(CLASS_TYPES.WARRIOR); }
    get Paladin()     { return this.classBit(CLASS_TYPES.PALADIN); }
    get Hunter()      { return this.classBit(CLASS_TYPES.HUNTER); }
    get Rogue()       { return this.classBit(CLASS_TYPES.ROGUE); }
    get Priest()      { return this.classBit(CLASS_TYPES.PRIEST); }
    get DeathKnight() { return this.classBit(CLASS_TYPES.DEATH_KNIGHT); }
    get Shaman()      { return this.classBit(CLASS_TYPES.SHAMAN); }
    get Mage()        { return this.classBit(CLASS_TYPES.MAGE); }
    get Warlock()     { return this.classBit(CLASS_TYPES.WARLOCK); }
    get Druid()       { return this.classBit(CLASS_TYPES.DRUID); }
}