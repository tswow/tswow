export declare const CLASS_TYPES: {
    readonly WARRIOR: 1;
    readonly PALADIN: 2;
    readonly HUNTER: 3;
    readonly ROGUE: 4;
    readonly PRIEST: 5;
    readonly DEATH_KNIGHT: 6;
    readonly SHAMAN: 7;
    readonly MAGE: 8;
    readonly WARLOCK: 9;
    readonly DRUID: 11;
};
export type ClassType = keyof typeof CLASS_TYPES | number;
export declare function resolveClassType(type: ClassType): number;
export declare function getClassType(type: ClassType): ClassType;
export type ClassMaskCon = ClassType | ClassType[] | undefined;
export declare function makeClassmask(classes: ClassMaskCon): number;
